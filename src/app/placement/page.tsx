"use client";

// Placement diagnostic flow: a short graduated quiz that estimates the learner's
// level and weak areas, then points them at the right room. Static client route
// (no params) — prerenders fine under output: export.

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Board } from "@/components/board/Board";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { buttonClasses } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ChevronRightIcon, SearchIcon, CheckIcon } from "@/components/icons";
import {
  PLACEMENT_ITEMS,
  scorePlacement,
  THEME_LABEL,
  type PlacementResult,
} from "@/lib/learner/placement";
import { placementStore } from "@/lib/learner/placementStore";

const BADGES = ["A", "B", "C", "D"];

export default function PlacementPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"intro" | "quiz" | "results">("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<PlacementResult | null>(null);
  // Timestamp captured once (lazy) — calling Date.now() in a component is flagged
  // impure; a 2-minute test makes mount-time a fine "taken at".
  const [takenAt] = useState(() => Date.now());

  const total = PLACEMENT_ITEMS.length;
  const item = PLACEMENT_ITEMS[idx];

  function choose(optionIdx: number) {
    const next = { ...answers, [item.id]: optionIdx };
    setAnswers(next);
    if (idx + 1 < total) {
      setIdx(idx + 1);
    } else {
      setResult(scorePlacement(next, takenAt));
      setPhase("results");
    }
  }

  function finish(r: PlacementResult) {
    placementStore.save(r);
    router.push(r.recommendedHref);
  }

  if (phase === "intro") {
    return (
      <main className="space-y-6">
        <PageHeader
          backHref="/"
          backLabel="Home"
          eyebrow="Find your level"
          title="Placement test"
          subtitle="About two minutes, eleven questions — from the rules to advanced ideas. We'll find your level and point you to the right room. No score to stress over; wrong answers just tell us where to help."
        />
        <Card className="space-y-4 p-5">
          <ul className="space-y-2 text-sm text-ink-soft">
            <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-sage" /> Multiple choice — tap an answer to move on.</li>
            <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-sage" /> Some show a board; just pick the best move or call.</li>
            <li className="flex items-center gap-2"><CheckIcon className="h-4 w-4 text-sage" /> Not sure? Make your best guess — it all helps place you.</li>
          </ul>
          <button type="button" onClick={() => setPhase("quiz")} className={buttonClasses("primary", "lg")}>
            Start the test
          </button>
        </Card>
      </main>
    );
  }

  if (phase === "results" && result) {
    return (
      <main className="space-y-6">
        <PageHeader eyebrow="Your result" title={`Level: ${result.level}`} backHref="/" backLabel="Home" />
        <Card className="space-y-5 p-5">
          <div className="flex items-center gap-4">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-primary/10 font-display text-2xl font-bold text-primary-strong">
              {result.scorePct}%
            </span>
            <div className="min-w-0">
              <p className="font-display text-xl font-semibold text-ink">{result.level}</p>
              <p className="text-sm text-ink-soft">{result.correct} of {result.total} correct, weighted by difficulty.</p>
            </div>
          </div>
          <ProgressBar pct={result.scorePct} tone="primary" />

          {result.weakThemes.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Areas to shore up</p>
              <div className="flex flex-wrap gap-2">
                {result.weakThemes.map((t) => (
                  <Chip key={t} tone="clay">{THEME_LABEL[t]}</Chip>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-2xl bg-surface p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">We recommend starting in</p>
            <p className="mt-1 font-display text-lg font-semibold text-primary-strong">{result.recommendedLabel}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => finish(result)} className={buttonClasses("primary", "lg")}>
              Start there <ChevronRightIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => { placementStore.save(result); router.push("/"); }}
              className={buttonClasses("secondary", "lg")}
            >
              Save &amp; see my path
            </button>
          </div>
        </Card>
      </main>
    );
  }

  // quiz phase
  return (
    <main className="space-y-5">
      <div className="flex items-center gap-3">
        <SearchIcon className="h-5 w-5 text-accent" />
        <ProgressBar pct={Math.round((idx / total) * 100)} tone="primary" className="min-w-0 flex-1" />
        <span className="shrink-0 font-mono text-xs text-ink-soft">{idx + 1} / {total}</span>
      </div>

      {item.board && (
        <div className="mx-auto max-w-sm">
          <Board fen={item.board.fen} orientation={item.board.orientation} interactive={false} />
        </div>
      )}

      <p className="font-display text-lg font-semibold leading-snug text-ink">{item.question}</p>

      <div className="space-y-2.5">
        {item.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => choose(i)}
            className="group flex w-full items-center gap-3.5 rounded-xl border border-line bg-card px-4 py-3 text-left text-[15px] text-ink transition hover:border-primary/55 hover:bg-primary/[0.05] active:scale-[0.99]"
          >
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-primary/12 text-xs font-extrabold text-primary-strong transition group-hover:bg-primary/20">
              {BADGES[i]}
            </span>
            <span className="min-w-0 flex-1">{opt}</span>
          </button>
        ))}
      </div>

      <Link href="/" className="inline-block text-sm text-ink-soft transition hover:text-ink">
        Quit
      </Link>
    </main>
  );
}
