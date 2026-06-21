"use client";

// Daily Puzzle — one engine-verified puzzle per day, the same for the whole day
// (deterministic by date). Solving it feeds the spaced-repetition store and the
// persistent daily streak. A no-params static route.

import { useState } from "react";
import Link from "next/link";
import { puzzleOfTheDay } from "@/content/puzzles";
import { srsStore } from "@/lib/srs/useSrs";
import { recordDailyActivity, useDailyStreak, useToday } from "@/lib/rewards/daily";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { buttonClasses } from "@/components/ui/Button";
import { FlameIcon, CheckIcon } from "@/components/icons";
import { PuzzleRunner } from "@/components/tools/PuzzleRunner";

export default function DailyPage() {
  const today = useToday();
  const streak = useDailyStreak();
  const [solved, setSolved] = useState(false);

  return (
    <main className="space-y-6">
      <PageHeader
        backHref="/"
        backLabel="Home"
        eyebrow="Daily"
        title="Puzzle of the Day"
        subtitle="One puzzle a day keeps the rust away. Come back tomorrow for a new one."
        right={
          streak.current > 0 ? (
            <Chip tone="amber">
              <FlameIcon className="mr-1 inline h-4 w-4" /> {streak.current}-day streak
            </Chip>
          ) : undefined
        }
      />

      {!today ? (
        <Card className="p-6 text-center text-ink-soft">Loading today&apos;s puzzle…</Card>
      ) : solved ? (
        <Card className="space-y-4 p-6 text-center">
          <p className="font-display text-2xl font-semibold text-walnut-deep">
            Solved! <CheckIcon className="inline h-6 w-6 text-sage" />
          </p>
          <p className="text-ink-soft">
            {streak.current > 1
              ? `That's a ${streak.current}-day streak — your best is ${streak.best}.`
              : "Streak started! Come back tomorrow to keep it going."}
          </p>
          <div className="flex justify-center gap-3">
            <Link href="/tactics" className={buttonClasses("primary", "lg")}>
              Train more tactics
            </Link>
            <Link href="/" className={buttonClasses("secondary", "lg")}>
              Home
            </Link>
          </div>
        </Card>
      ) : (
        <DailyPuzzle
          dateStr={today}
          onSolved={() => {
            recordDailyActivity();
            setSolved(true);
          }}
        />
      )}
    </main>
  );
}

function DailyPuzzle({
  dateStr,
  onSolved,
}: {
  dateStr: string;
  onSolved: () => void;
}) {
  const puzzle = puzzleOfTheDay(dateStr);
  return (
    <PuzzleRunner
      puzzle={puzzle}
      onDone={(clean) => {
        srsStore.record(puzzle.id, clean);
        onSolved();
      }}
    />
  );
}
