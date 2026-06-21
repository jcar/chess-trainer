"use client";

// Tactics Trainer — a spaced-repetition puzzle stream drawn from the whole
// curriculum's puzzle pool. Due/missed puzzles resurface first (mistake bank),
// then fresh ones. Solving feeds the SRS + the daily streak. Filter by theme /
// difficulty / kid-friendly. A no-params static route.

import { useMemo, useState } from "react";
import {
  getAllPuzzles,
  selectPuzzles,
  themeCounts,
  type PuzzleTheme,
  type Difficulty,
  type TacticsPuzzle,
} from "@/content/puzzles";
import { useSrs, srsStore } from "@/lib/srs/useSrs";
import { partitionQueue, dueCount } from "@/lib/srs/store";
import { recordDailyActivity } from "@/lib/rewards/daily";
import { shuffled } from "@/lib/shuffle";
import { PuzzleRunner } from "@/components/tools/PuzzleRunner";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClasses } from "@/components/ui/Button";
import { CheckIcon, StarIcon } from "@/components/icons";

const SESSION_SIZE = 10;

const fenKey = (fen: string) => fen.split(" ").slice(0, 2).join(" ");

/** Order fresh puzzles for variety: shuffle, give each a light easy→harder lean
 *  (difficulty + jitter), then round-robin across themes so no two consecutive
 *  puzzles share a pattern. Different every session. */
function interleaveForVariety(puzzles: TacticsPuzzle[]): TacticsPuzzle[] {
  const groups = new Map<string, TacticsPuzzle[]>();
  for (const p of shuffled(puzzles)) {
    const g = groups.get(p.theme) ?? [];
    g.push(p);
    groups.set(p.theme, g);
  }
  for (const [, g] of groups) {
    // Stable key computed once (Math.random in a comparator is unsafe).
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
      if (i < g.length) {
        out.push(g[i]);
        added = true;
      }
    }
    if (!added) break;
  }
  return out;
}
const THEME_LABEL: Record<PuzzleTheme, string> = {
  mate: "Mates",
  fork: "Forks",
  pin: "Pins",
  skewer: "Skewers",
  discovered: "Discovered",
  sacrifice: "Sacrifices",
  "back-rank": "Back-rank",
  defense: "Defense",
  "win-material": "Win material",
};

export default function TacticsPage() {
  const srs = useSrs();
  const byId = useMemo(() => {
    const m = new Map<string, TacticsPuzzle>();
    for (const p of getAllPuzzles()) m.set(p.id, p);
    return m;
  }, []);
  const themes = useMemo(() => themeCounts().sort((a, b) => b.count - a.count), []);

  const [theme, setTheme] = useState<PuzzleTheme | null>(null);
  const [maxDifficulty, setMaxDifficulty] = useState<Difficulty>(3);
  const [kidOnly, setKidOnly] = useState(false);
  const [queue, setQueue] = useState<TacticsPuzzle[] | null>(null);

  const candidates = useMemo(
    () =>
      selectPuzzles({
        themes: theme ? [theme] : undefined,
        maxDifficulty,
        kidOnly,
      }),
    [theme, maxDifficulty, kidOnly],
  );

  function start() {
    const ids = candidates.map((p) => p.id);
    const { due, fresh } = partitionQueue(srs, ids, Date.now());
    // Due/missed keep their spaced-repetition priority; fresh puzzles are shuffled
    // and theme-interleaved for variety (no repeated pattern, different each time).
    const duePuzzles = due.map((id) => byId.get(id)!).filter(Boolean);
    const freshPuzzles = interleaveForVariety(
      fresh.map((id) => byId.get(id)!).filter(Boolean),
    );
    // Build the session, never repeating a position.
    const seen = new Set<string>();
    const pick: TacticsPuzzle[] = [];
    for (const p of [...duePuzzles, ...freshPuzzles]) {
      const key = fenKey(p.fen);
      if (seen.has(key)) continue;
      seen.add(key);
      pick.push(p);
      if (pick.length >= SESSION_SIZE) break;
    }
    if (pick.length) setQueue(pick);
  }

  if (queue) {
    return <TacticsSession queue={queue} onExit={() => setQueue(null)} />;
  }

  const due = dueCount(srs, candidates.map((p) => p.id));

  return (
    <main className="space-y-6">
      <PageHeader
        backHref="/"
        backLabel="Home"
        eyebrow="Trainer"
        title="Tactics Trainer"
        subtitle="Pattern reps with spaced repetition — the fastest way to gain rating. Missed puzzles come back until they stick."
      />

      <Card className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-primary-strong">Ready to train</span>
          <Chip tone={due > 0 ? "amber" : "sage"}>{due} due now</Chip>
        </div>
        <p className="text-sm text-ink-soft">
          {candidates.length} puzzles match your filter. A session is up to {SESSION_SIZE},
          due/missed first.
        </p>
      </Card>

      <div className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Theme</h2>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={theme === null} onClick={() => setTheme(null)}>All</FilterChip>
          {themes.map(({ theme: t, count }) => (
            <FilterChip key={t} active={theme === t} onClick={() => setTheme(t)}>
              {THEME_LABEL[t]} ({count})
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Difficulty</h2>
        <div className="flex flex-wrap gap-2">
          {([1, 2, 3] as Difficulty[]).map((d) => (
            <FilterChip key={d} active={maxDifficulty === d} onClick={() => setMaxDifficulty(d)}>
              {d === 1 ? "Easy" : d === 2 ? "Up to medium" : "All levels"}
            </FilterChip>
          ))}
          <FilterChip active={kidOnly} onClick={() => setKidOnly((v) => !v)}>
            Kid-friendly only
          </FilterChip>
        </div>
      </div>

      <button
        type="button"
        onClick={start}
        disabled={candidates.length === 0}
        className={buttonClasses("primary", "lg", "disabled:opacity-40")}
      >
        Start session ({Math.min(candidates.length, SESSION_SIZE)})
      </button>
    </main>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
        active
          ? "border-primary bg-primary text-on-accent"
          : "border-line bg-card text-ink-soft hover:border-primary/40"
      }`}
    >
      {children}
    </button>
  );
}

function TacticsSession({
  queue,
  onExit,
}: {
  queue: TacticsPuzzle[];
  onExit: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [solvedClean, setSolvedClean] = useState(0);
  const [doneState, setDoneState] = useState<null | { clean: boolean }>(null);

  const done = idx >= queue.length;
  const current = queue[idx];

  if (done) {
    return (
      <main className="space-y-5 text-center">
        <PageHeader eyebrow="Tactics" title="Session complete" />
        <Card className="space-y-4 p-6">
          <p className="font-display text-2xl font-semibold text-primary-strong">
            {solvedClean} / {queue.length} clean
          </p>
          <p className="text-ink-soft">
            Missed ones will resurface in a future session until they stick.
          </p>
          <div className="flex justify-center gap-3">
            <button type="button" onClick={onExit} className={buttonClasses("primary", "lg")}>
              Back to tactics
            </button>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="space-y-5">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-sm text-ink-soft">
          <span className="font-semibold">{idx + 1} / {queue.length}</span>
          <button type="button" onClick={onExit} className="font-medium transition hover:text-ink">
            End session
          </button>
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
          recordDailyActivity();
          if (clean) setSolvedClean((n) => n + 1);
          setDoneState({ clean });
        }}
      />

      {doneState && (
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface p-4 shadow-soft">
          <span className={`text-sm font-semibold ${doneState.clean ? "text-sage" : "text-primary-strong"}`}>
            {doneState.clean ? (
              <><StarIcon className="mr-1 inline h-4 w-4" /> Clean solve!</>
            ) : (
              <><CheckIcon className="mr-1 inline h-4 w-4" /> Solved — we&apos;ll bring it back</>
            )}
          </span>
          <button
            type="button"
            onClick={() => {
              setDoneState(null);
              setIdx((i) => i + 1);
            }}
            className={buttonClasses("primary", "md")}
          >
            {idx + 1 >= queue.length ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </main>
  );
}
