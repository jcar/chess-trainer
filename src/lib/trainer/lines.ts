// Enumerates the trainable lines for a repertoire from the shared OPENINGS data,
// and computes mastery summaries / the due queue. A "trainable line" = one
// OpeningLine drilled from the opening's trainerColor. Sibling lines of the same
// opening (e.g. the Sicilian's Najdorf vs Alapin) cover different opponent
// decision points, so interleaving them gives real opponent-branch coverage.

import type { Opening, OpeningLine } from "@/content/openings/types";
import { OPENINGS, getOpening } from "@/content/openings";
import type { SrsData } from "../srs/store";
import { isDue } from "../srs/store";

/** SRS namespace for opening lines (kept distinct from tactics-puzzle ids). */
export const srsKey = (lineKey: string): string => `ol:${lineKey}`;
/** Leitner box at which a line counts as "mastered" (retained over ~weeks). */
const MASTER_BOX = 3;

export interface TrainerLine {
  opening: Opening;
  line: OpeningLine;
  lineIdx: number;
  /** Stable key matching the store: `<openingId>:<color>:<lineSlug>`. */
  key: string;
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function lineKey(
  openingId: string,
  color: string,
  lineLabel: string,
): string {
  return `${openingId}:${color}:${slug(lineLabel)}`;
}

export function openingLines(o: Opening): TrainerLine[] {
  return o.lines.map((line, lineIdx) => ({
    opening: o,
    line,
    lineIdx,
    key: lineKey(o.id, o.trainerColor, line.label),
  }));
}

export function repertoireLines(openingIds: string[]): TrainerLine[] {
  return openingIds
    .map((id) => getOpening(id))
    .filter((o): o is Opening => !!o)
    .flatMap(openingLines);
}

/** Round-robin interleave so a session alternates between openings. */
export function interleave<T>(groups: T[][]): T[] {
  const out: T[] = [];
  const max = groups.reduce((m, g) => Math.max(m, g.length), 0);
  for (let i = 0; i < max; i++) {
    for (const g of groups) if (g[i] !== undefined) out.push(g[i]);
  }
  return out;
}

export type LineStatus = "new" | "learning" | "mastered";

export interface LineState {
  status: LineStatus;
  /** Leitner box (0–5); a coarse "how good are you at this line" meter. */
  box: number;
  reps: number;
  lapses: number;
}

/** Per-line skill state for the opening page's line list. */
export function lineState(srs: SrsData, l: TrainerLine): LineState {
  const it = srs[srsKey(l.key)];
  if (!it) return { status: "new", box: 0, reps: 0, lapses: 0 };
  return {
    status: it.box >= MASTER_BOX ? "mastered" : "learning",
    box: it.box,
    reps: it.reps,
    lapses: it.lapses,
  };
}

export interface MasteryCounts {
  mastered: number;
  learning: number;
  total: number;
  /** Lines not yet mastered. */
  due: number;
}

export function masteryCounts(srs: SrsData, openingIds: string[]): MasteryCounts {
  const lines = repertoireLines(openingIds);
  const now = Date.now();
  let mastered = 0;
  let learning = 0;
  let due = 0;
  for (const l of lines) {
    const it = srs[srsKey(l.key)];
    if (it && it.box >= MASTER_BOX) mastered++;
    else if (it) learning++;
    if (isDue(srs, srsKey(l.key), now)) due++;
  }
  return { mastered, learning, total: lines.length, due };
}

/** The session queue (true spaced repetition): lines whose review is DUE now
 *  (most-overdue / missed first via the SRS), then never-seen lines, interleaved
 *  across openings so a session mixes them. */
export function dueQueue(srs: SrsData, openingIds: string[]): TrainerLine[] {
  const now = Date.now();
  const byOpening = openingIds
    .map((id) => getOpening(id))
    .filter((o): o is Opening => !!o)
    .map((o) => {
      const ls = openingLines(o);
      const dueLines = ls
        .filter((l) => {
          const it = srs[srsKey(l.key)];
          return !!it && it.due <= now;
        })
        .sort((a, b) => {
          const A = srs[srsKey(a.key)]!;
          const B = srs[srsKey(b.key)]!;
          if (B.lapses !== A.lapses) return B.lapses - A.lapses; // mistakes first
          return A.due - B.due;
        });
      const fresh = ls.filter((l) => !srs[srsKey(l.key)]);
      return [...dueLines, ...fresh];
    });
  return interleave(byOpening);
}

/**
 * A bounded daily-review session: every line whose SRS review is DUE now (most
 * overdue / most-missed first — the "mistake bank"), then up to `newLimit`
 * never-seen lines so a session also introduces fresh material without
 * overwhelming. This is the queue behind "Review due today".
 */
export function reviewQueue(
  srs: SrsData,
  openingIds: string[],
  newLimit = 8,
): TrainerLine[] {
  const now = Date.now();
  const all = repertoireLines(openingIds);
  const due = all
    .filter((l) => {
      const it = srs[srsKey(l.key)];
      return !!it && it.due <= now;
    })
    .sort((a, b) => {
      const A = srs[srsKey(a.key)]!;
      const B = srs[srsKey(b.key)]!;
      if (B.lapses !== A.lapses) return B.lapses - A.lapses; // mistakes first
      return A.due - B.due; // then most overdue
    });
  const fresh = all.filter((l) => !srs[srsKey(l.key)]).slice(0, newLimit);
  return [...due, ...fresh];
}

/** Counts for the daily-review entry point: reviews actually due vs never-seen. */
export function reviewStats(
  srs: SrsData,
  openingIds: string[],
): { due: number; fresh: number } {
  const now = Date.now();
  let due = 0;
  let fresh = 0;
  for (const l of repertoireLines(openingIds)) {
    const it = srs[srsKey(l.key)];
    if (!it) fresh++;
    else if (it.due <= now) due++;
  }
  return { due, fresh };
}

/** All lines for a "train everything" pass, ordered worst-known first: due /
 *  most-missed, then never-seen, then not-yet-due last (interleaved across
 *  openings). Unlike reviewQueue this drops nothing. */
export function orderedLines(srs: SrsData, openingIds: string[]): TrainerLine[] {
  const now = Date.now();
  const rank = (l: TrainerLine): number => {
    const it = srs[srsKey(l.key)];
    if (!it) return 1; // fresh: after due, before not-yet-due
    return it.due <= now ? 0 : 2;
  };
  const byOpening = openingIds
    .map((id) => getOpening(id))
    .filter((o): o is Opening => !!o)
    .map((o) =>
      [...openingLines(o)].sort((a, b) => {
        const ra = rank(a);
        const rb = rank(b);
        if (ra !== rb) return ra - rb;
        const A = srs[srsKey(a.key)];
        const B = srs[srsKey(b.key)];
        if (A && B) {
          if (B.lapses !== A.lapses) return B.lapses - A.lapses;
          return A.due - B.due;
        }
        return 0; // keep registry order among fresh
      }),
    );
  return interleave(byOpening);
}

/** All openings available to add to a repertoire (registry order). */
export function allOpenings(): Opening[] {
  return OPENINGS;
}
