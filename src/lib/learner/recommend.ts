// The learner model + "what should I do next?" brain. Pure functions over the
// data the app already stores (progress + SRS in localStorage) — no backend.
//
// This is the connective tissue the audit flagged as missing: the SRS store is a
// single global keyed map, but reviews only ever surfaced INSIDE each tool. Here
// we aggregate due reviews across the whole app and pick the single best next
// action (review → continue → start → sharpen), so the Hall can coach, not just list.

import { MODULES, getModule, getModuleActivities } from "@/content";
import { PATH_START_MODULE_ID } from "@/content/path";
import type { ProgressData } from "@/lib/progress/store";
import type { SrsData } from "@/lib/srs/store";

/** Due-review counts by tool. SRS ids are namespaced by their writers:
 *  `eg:` endgames, `ol:` openings, `kc:` lesson-concepts (surfaced inside modules,
 *  not here), and bare ids = tactics/daily puzzles. */
export interface DueReviews {
  total: number; // across the routable training tools (tactics + endgames + openings)
  tactics: number;
  endgames: number;
  openings: number;
}

export function classifyDueReviews(srs: SrsData, now: number): DueReviews {
  const d: DueReviews = { total: 0, tactics: 0, endgames: 0, openings: 0 };
  for (const id in srs) {
    const it = srs[id];
    if (!it || it.due > now) continue; // not yet due
    if (id.startsWith("eg:")) d.endgames++;
    else if (id.startsWith("ol:")) d.openings++;
    else if (id.startsWith("kc:")) continue; // lesson reviews live inside their module
    else d.tactics++;
  }
  d.total = d.tactics + d.endgames + d.openings;
  return d;
}

const REVIEW_TOOLS = {
  tactics: { href: "/tactics", label: "Tactics Trainer" },
  endgames: { href: "/endgames", label: "Endgame Trainer" },
  openings: { href: "/trainer", label: "Openings Trainer" },
} as const;

type ReviewKey = keyof typeof REVIEW_TOOLS;

/** Which review tool has the most due (for routing the headline review action). */
export function topReviewTool(
  d: DueReviews,
): { key: ReviewKey; href: string; label: string; count: number } | null {
  let best: ReviewKey | null = null;
  let bestN = 0;
  for (const k of Object.keys(REVIEW_TOOLS) as ReviewKey[]) {
    if (d[k] > bestN) {
      bestN = d[k];
      best = k;
    }
  }
  if (best === null) return null;
  const key: ReviewKey = best;
  return { key, href: REVIEW_TOOLS[key].href, label: REVIEW_TOOLS[key].label, count: d[key] };
}

export interface ModuleSnapshot {
  id: string;
  title: string;
  total: number;
  done: number;
  pct: number;
  /** Most recent completion time (epoch ms) within this module, 0 if none. */
  lastAt: number;
  /** First not-yet-completed activity id, or null if the module is finished. */
  nextActivityId: string | null;
}

export function moduleSnapshots(p: ProgressData): ModuleSnapshot[] {
  return MODULES.map((mod) => {
    const acts = getModuleActivities(mod);
    let done = 0;
    let lastAt = 0;
    let nextActivityId: string | null = null;
    for (const a of acts) {
      const st = p[a.id];
      if (st?.completed) {
        done++;
        if (st.completedAt) {
          const t = Date.parse(st.completedAt);
          if (Number.isFinite(t) && t > lastAt) lastAt = t;
        }
      } else if (nextActivityId === null) {
        nextActivityId = a.id;
      }
    }
    return {
      id: mod.id,
      title: mod.title,
      total: acts.length,
      done,
      pct: acts.length ? Math.round((done / acts.length) * 100) : 0,
      nextActivityId,
      lastAt,
    };
  });
}

export type Recommendation =
  | { kind: "review"; href: string; title: string; detail: string; reviewCount: number }
  | { kind: "continue"; href: string; title: string; detail: string; pct: number }
  | { kind: "start"; href: string; title: string; detail: string }
  | { kind: "sharpen"; href: string; title: string; detail: string };

export interface LearnerState {
  rec: Recommendation;
  due: DueReviews;
  snapshots: ModuleSnapshot[];
}

/** The heart of the learner layer: pick the single best next action. Priority:
 *  spaced reviews that are due → continue the most recently-studied module →
 *  start (brand new) → sharpen (everything done). */
export function recommendNext(p: ProgressData, srs: SrsData, now: number): LearnerState {
  const due = classifyDueReviews(srs, now);
  const snapshots = moduleSnapshots(p);

  // 1. Due spaced-repetition reviews come first — retention beats new material.
  if (due.total > 0) {
    const top = topReviewTool(due)!;
    const others = due.total - top.count;
    const detail =
      `${top.count} due in the ${top.label}` +
      (others > 0 ? ` (+${others} more across your training)` : "");
    return {
      rec: { kind: "review", href: top.href, title: `Review — ${due.total} due`, detail, reviewCount: due.total },
      due,
      snapshots,
    };
  }

  // 2. Continue the module you most recently worked on (not just the first one).
  const inProgress = snapshots.filter((s) => s.pct > 0 && s.nextActivityId);
  if (inProgress.length) {
    const m = inProgress.slice().sort((a, b) => b.lastAt - a.lastAt)[0];
    return {
      rec: {
        kind: "continue",
        href: `/modules/${m.id}/${m.nextActivityId}`,
        title: `Continue ${m.title}`,
        detail: `Pick up where you left off — ${m.pct}% complete`,
        pct: m.pct,
      },
      due,
      snapshots,
    };
  }

  // 3. Brand-new learner → start at the beginning of the adult path (Fundamentals),
  //    NOT MODULES[0] (Chess for Kids, a separate young-learners on-ramp). A learner
  //    who took the placement test is redirected by RecommendedNext to their level.
  const anyStarted = snapshots.some((s) => s.done > 0);
  if (!anyStarted) {
    const firstMod = getModule(PATH_START_MODULE_ID) ?? MODULES[0];
    const firstAct = getModuleActivities(firstMod)[0];
    return {
      rec: {
        kind: "start",
        href: `/modules/${firstMod.id}/${firstAct.id}`,
        title: `Start: ${firstMod.title}`,
        detail: "Begin your chess journey",
        pct: 0,
      } as Recommendation,
      due,
      snapshots,
    };
  }

  // 4. Some progress but no in-progress module with a next step — find any
  //    unfinished module, else everything's done: sharpen your skills.
  const anyIncomplete = snapshots.find((s) => s.nextActivityId);
  if (anyIncomplete) {
    return {
      rec: {
        kind: "continue",
        href: `/modules/${anyIncomplete.id}/${anyIncomplete.nextActivityId}`,
        title: `Continue ${anyIncomplete.title}`,
        detail: `${anyIncomplete.pct}% complete`,
        pct: anyIncomplete.pct,
      },
      due,
      snapshots,
    };
  }

  return {
    rec: {
      kind: "sharpen",
      href: "/tactics",
      title: "Sharpen your skills",
      detail: "You've completed every lesson — keep your edge in the Tactics Trainer",
    },
    due,
    snapshots,
  };
}
