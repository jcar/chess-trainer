"use client";

// A tactics session (a real route) built from the catalog's filters in the query
// string. The queue is built once at mount; the puzzle index stays component state
// (Back must not rewind a puzzle). Back returns to /tactics.

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  getAllPuzzles,
  selectPuzzles,
  type PuzzleTheme,
  type Difficulty,
  type TacticsPuzzle,
} from "@/content/puzzles";
import { srsStore } from "@/lib/srs/useSrs";
import { partitionQueue } from "@/lib/srs/store";
import { tacticsRatingStore } from "@/lib/tactics/rating";
import { recordDailyActivity } from "@/lib/rewards/daily";
import { shuffled } from "@/lib/shuffle";
import { PuzzleRunner } from "@/components/tools/PuzzleRunner";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClasses } from "@/components/ui/Button";
import { CheckIcon, StarIcon } from "@/components/icons";
import { useToolBack } from "@/lib/nav/useToolBack";

const SESSION_SIZE = 10;
const fenKey = (fen: string) => fen.split(" ").slice(0, 2).join(" ");

const THEME_LABEL: Record<PuzzleTheme, string> = {
  mate: "Mates", fork: "Forks", pin: "Pins", skewer: "Skewers", discovered: "Discovered",
  sacrifice: "Sacrifices", "back-rank": "Back-rank", defense: "Defense",
  "win-material": "Win material", endgame: "Endgames",
};

function interleaveForVariety(puzzles: TacticsPuzzle[]): TacticsPuzzle[] {
  const groups = new Map<string, TacticsPuzzle[]>();
  for (const p of shuffled(puzzles)) {
    const g = groups.get(p.theme) ?? [];
    g.push(p);
    groups.set(p.theme, g);
  }
  for (const [, g] of groups) {
    const keyed = g.map((p) => ({ p, k: p.difficulty + Math.random() * 1.5 }));
    keyed.sort((a, b) => a.k - b.k);
    g.splice(0, g.length, ...keyed.map((x) => x.p));
  }
  const themeOrder = shuffled([...groups.keys()]);
  const out: TacticsPuzzle[] = [];
  for (let i = 0; ; i++) {
    let added = false;
    for (const t of themeOrder) {
      const g = groups.get(t)!;
      if (i < g.length) { out.push(g[i]); added = true; }
    }
    if (!added) break;
  }
  return out;
}

function buildQueue(theme: PuzzleTheme | null, maxDifficulty: Difficulty, kidOnly: boolean, adaptive: boolean): TacticsPuzzle[] {
  const byId = new Map<string, TacticsPuzzle>();
  for (const p of getAllPuzzles()) byId.set(p.id, p);
  const candidates = selectPuzzles({ themes: theme ? [theme] : undefined, maxDifficulty, kidOnly });
  const ids = candidates.map((p) => p.id);
  const { due, fresh } = partitionQueue(srsStore.getSnapshot(), ids, Date.now());
  const duePuzzles = due.map((id) => byId.get(id)!).filter(Boolean);
  const freshAll = fresh.map((id) => byId.get(id)!).filter(Boolean);
  const rating = tacticsRatingStore.getSnapshot().rating;
  const freshPuzzles = adaptive
    ? (() => {
        const rated = freshAll.filter((p) => p.rating != null);
        for (const band of [120, 200, 300, 600, Infinity]) {
          const near = rated.filter((p) => Math.abs((p.rating as number) - rating) <= band);
          if (near.length >= SESSION_SIZE || band === Infinity) return shuffled(near);
        }
        return shuffled(rated);
      })()
    : interleaveForVariety(freshAll);
  const seen = new Set<string>();
  const pick: TacticsPuzzle[] = [];
  for (const p of [...duePuzzles, ...freshPuzzles]) {
    const k = fenKey(p.fen);
    if (seen.has(k)) continue;
    seen.add(k);
    pick.push(p);
    if (pick.length >= SESSION_SIZE) break;
  }
  return pick;
}

export default function TacticsPlayPage() {
  return (
    <Suspense fallback={<main className="space-y-6" />}>
      <TacticsPlay />
    </Suspense>
  );
}

function TacticsPlay() {
  const params = useSearchParams();
  const back = useToolBack("/tactics");
  const theme = (() => { const t = params.get("theme"); return t && t in THEME_LABEL ? (t as PuzzleTheme) : null; })();
  const maxDifficulty = (() => { const m = Number(params.get("max")); return m === 1 || m === 2 ? (m as Difficulty) : 3; })();
  const kidOnly = params.get("kid") === "1";
  const adaptive = params.get("adaptive") === "1";

  // Build the session once (queue is stable for its lifetime).
  const [queue] = useState<TacticsPuzzle[]>(() => buildQueue(theme, maxDifficulty, kidOnly, adaptive));
  const [idx, setIdx] = useState(0);
  const [solvedClean, setSolvedClean] = useState(0);
  const [doneState, setDoneState] = useState<null | { clean: boolean }>(null);

  if (queue.length === 0) {
    return (
      <main className="space-y-5 text-center">
        <PageHeader eyebrow="Tactics" title="No puzzles match" />
        <Card className="space-y-4 p-6">
          <p className="text-ink-soft">Try a different filter.</p>
          <button type="button" onClick={back} className={buttonClasses("primary", "lg")}>Back to tactics</button>
        </Card>
      </main>
    );
  }

  const done = idx >= queue.length;
  if (done) {
    return (
      <main className="space-y-5 text-center">
        <PageHeader eyebrow="Tactics" title="Session complete" />
        <Card className="space-y-4 p-6">
          <p className="font-display text-2xl font-semibold text-primary-strong">{solvedClean} / {queue.length} clean</p>
          <p className="text-ink-soft">Missed ones will resurface in a future session until they stick.</p>
          <button type="button" onClick={back} className={buttonClasses("primary", "lg")}>Back to tactics</button>
        </Card>
      </main>
    );
  }

  const current = queue[idx];
  return (
    <main className="space-y-5">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-sm text-ink-soft">
          <span className="font-semibold">{idx + 1} / {queue.length}</span>
          <button type="button" onClick={back} className="font-medium transition hover:text-ink">End session</button>
        </div>
        <ProgressBar pct={(idx / queue.length) * 100} />
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Chip tone="neutral">{THEME_LABEL[current.theme]}</Chip>
        {current.rating != null && <Chip tone="amber">Rating {current.rating}</Chip>}
      </div>

      <PuzzleRunner
        key={current.id + idx}
        puzzle={current}
        onDone={(clean) => {
          srsStore.record(current.id, clean);
          tacticsRatingStore.record(current.rating, clean);
          recordDailyActivity();
          if (clean) setSolvedClean((n) => n + 1);
          setDoneState({ clean });
        }}
      />

      {doneState && (
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface p-4 shadow-soft">
          <span className={`text-sm font-semibold ${doneState.clean ? "text-sage" : "text-primary-strong"}`}>
            {doneState.clean ? (<><StarIcon className="mr-1 inline h-4 w-4" /> Clean solve!</>) : (<><CheckIcon className="mr-1 inline h-4 w-4" /> Solved — we&apos;ll bring it back</>)}
          </span>
          <button type="button" onClick={() => { setDoneState(null); setIdx((i) => i + 1); }} className={buttonClasses("primary", "md")}>
            {idx + 1 >= queue.length ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </main>
  );
}
