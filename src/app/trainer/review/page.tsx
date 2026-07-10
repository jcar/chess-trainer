"use client";

// Daily review — the spaced-repetition session across your whole opening
// catalog. Reviews that are due (mistakes first) come first, then a few new
// lines. A real route so Back returns to the trainer. Fully static.

import { useState } from "react";
import Link from "next/link";
import {
  allOpenings,
  reviewQueue,
  reviewStats,
  type TrainerLine,
} from "@/lib/trainer/lines";
import { useTrainer } from "@/lib/trainer/useTrainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { buttonClasses } from "@/components/ui/Button";
import { TrainerSession } from "@/components/trainer/TrainerSession";

const ALL_IDS = allOpenings().map((o) => o.id);
const NEW_PER_SESSION = 8;

export default function TrainerReviewPage() {
  const { srs, recordLineResult } = useTrainer();
  const [queue, setQueue] = useState<TrainerLine[] | null>(null);

  if (queue) {
    return (
      <main className="space-y-5">
        <PageHeader eyebrow="Trainer · Review" title="Daily review" />
        <TrainerSession
          queue={queue}
          recordLineResult={recordLineResult}
          onExit={() => setQueue(null)}
        />
      </main>
    );
  }

  const stats = reviewStats(srs, ALL_IDS);
  const newToday = Math.min(stats.fresh, NEW_PER_SESSION);
  const total = stats.due + newToday;

  return (
    <main className="space-y-5">
      <PageHeader
        backHref="/trainer"
        backLabel="Trainer"
        eyebrow="Trainer · Review"
        title="Daily review"
        subtitle="Spaced repetition brings each line back right as you're about to forget it. Lines you've missed come first, then a few new ones."
      />
      <Card className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone={stats.due > 0 ? "amber" : "sage"}>{stats.due} to review</Chip>
          <Chip tone="neutral">{newToday} new</Chip>
        </div>
        {total > 0 ? (
          <>
            <p className="text-ink-soft">
              Today&apos;s session: <b>{total}</b> {total === 1 ? "line" : "lines"} —{" "}
              {stats.due} due for review and {newToday} new.
            </p>
            <button
              type="button"
              onClick={() => setQueue(reviewQueue(srs, ALL_IDS, NEW_PER_SESSION))}
              className={buttonClasses("primary", "lg")}
            >
              Start review
            </button>
          </>
        ) : (
          <>
            <p className="text-ink-soft">
              You&apos;re all caught up — nothing is due right now. Come back tomorrow, or
              browse the catalog to start a new opening.
            </p>
            <Link href="/trainer" className={buttonClasses("secondary", "lg")}>
              Browse openings
            </Link>
          </>
        )}
      </Card>
    </main>
  );
}
