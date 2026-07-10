"use client";

// The daily-review entry on the trainer home: how many lines are due today +
// the current streak, linking into the spaced-repetition session. Reads the SRS
// client-side (empty on first paint, then the real count after hydration).

import Link from "next/link";
import { allOpenings, reviewStats } from "@/lib/trainer/lines";
import { useTrainer } from "@/lib/trainer/useTrainer";
import { useDailyStreak } from "@/lib/rewards/daily";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ChevronRightIcon } from "@/components/icons";

const ALL_IDS = allOpenings().map((o) => o.id);

export function ReviewDueBanner() {
  const { srs } = useTrainer();
  const { due } = reviewStats(srs, ALL_IDS);
  const { current } = useDailyStreak();

  return (
    <Link href="/trainer/review" className="block">
      <Card interactive className="flex items-center gap-3.5 p-4">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-2xl"
          style={{ backgroundColor: "var(--color-surface)" }}
          aria-hidden
        >
          🔁
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            Daily review
            {current > 0 && <Chip tone="amber">🔥 {current}</Chip>}
          </p>
          <p className="text-sm text-ink-soft">
            {due > 0
              ? `${due} ${due === 1 ? "line is" : "lines are"} due — spaced repetition to keep them sharp.`
              : "Keep your streak going — review what's due, or learn a new line."}
          </p>
        </div>
        {due > 0 && <Chip tone="primary">{due}</Chip>}
        <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
      </Card>
    </Link>
  );
}
