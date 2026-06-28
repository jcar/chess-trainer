"use client";

// Tactics Trainer catalog — pick filters, then start a session at /tactics/play
// (a real route, so Back returns here). Accepts ?theme=&max= so a lesson's
// "Practice now" can deep-link a pre-filtered catalog (Suspense for static export).

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  selectPuzzles,
  themeCounts,
  type PuzzleTheme,
  type Difficulty,
} from "@/content/puzzles";
import { useSrs } from "@/lib/srs/useSrs";
import { dueCount } from "@/lib/srs/store";
import { useTacticsRating } from "@/lib/tactics/rating";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { buttonClasses } from "@/components/ui/Button";

const SESSION_SIZE = 10;

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
  endgame: "Endgames",
};

export default function TacticsPage() {
  return (
    <Suspense fallback={<main className="space-y-6" />}>
      <TacticsCatalog />
    </Suspense>
  );
}

function TacticsCatalog() {
  const srs = useSrs();
  const router = useRouter();
  const params = useSearchParams();
  const themes = useMemo(() => themeCounts().sort((a, b) => b.count - a.count), []);

  const initialTheme = ((): PuzzleTheme | null => {
    const t = params.get("theme");
    return t && t in THEME_LABEL ? (t as PuzzleTheme) : null;
  })();
  const initialMax = ((): Difficulty => {
    const m = Number(params.get("max"));
    return m === 1 || m === 2 || m === 3 ? (m as Difficulty) : 3;
  })();

  const tactics = useTacticsRating();
  const [theme, setTheme] = useState<PuzzleTheme | null>(initialTheme);
  const [maxDifficulty, setMaxDifficulty] = useState<Difficulty>(initialMax);
  const [kidOnly, setKidOnly] = useState(false);
  const [adaptive, setAdaptive] = useState(false);

  const candidates = useMemo(
    () => selectPuzzles({ themes: theme ? [theme] : undefined, maxDifficulty, kidOnly }),
    [theme, maxDifficulty, kidOnly],
  );

  function start() {
    const qs = new URLSearchParams();
    if (theme) qs.set("theme", theme);
    qs.set("max", String(maxDifficulty));
    if (kidOnly) qs.set("kid", "1");
    if (adaptive) qs.set("adaptive", "1");
    router.push(`/tactics/play?${qs.toString()}`);
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
          {candidates.length} puzzles match your filter. A session is up to {SESSION_SIZE}, due/missed first.
        </p>
      </Card>

      <button
        type="button"
        onClick={() => setAdaptive((a) => !a)}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition ${
          adaptive ? "border-primary bg-primary/5" : "border-line bg-card hover:border-primary/40"
        }`}
      >
        <span className="min-w-0">
          <span className="block font-display text-base font-semibold text-primary-strong">Adaptive difficulty</span>
          <span className="block text-sm text-ink-soft">Serves puzzles near your level and adjusts as you solve</span>
        </span>
        <Chip tone="sage">{tactics.rating}</Chip>
        <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${adaptive ? "bg-primary" : "bg-ink/20"}`} aria-hidden>
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${adaptive ? "left-[1.375rem]" : "left-0.5"}`} />
        </span>
      </button>

      <div className={`space-y-2 ${adaptive ? "opacity-50" : ""}`}>
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
          <FilterChip active={kidOnly} onClick={() => setKidOnly((v) => !v)}>Kid-friendly only</FilterChip>
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

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
        active ? "border-primary bg-primary text-on-accent" : "border-line bg-card text-ink-soft hover:border-primary/40"
      }`}
    >
      {children}
    </button>
  );
}
