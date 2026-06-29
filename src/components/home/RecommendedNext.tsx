"use client";

// The Hall's smart "what next?" card. Replaces the old naive "first incomplete
// activity" continue button with a recommendation that weighs due spaced-repetition
// reviews (aggregated across every tool) against continuing the module you most
// recently studied. The brain lives in lib/learner/recommend.

import Link from "next/link";
import { useState } from "react";
import { useProgress } from "@/lib/progress/useProgress";
import { useSrs } from "@/lib/srs/useSrs";
import { recommendNext, type Recommendation } from "@/lib/learner/recommend";
import { Card } from "@/components/ui/Card";
import { ChevronRightIcon, PlayIcon, PuzzleIcon, FlameIcon } from "@/components/icons";

const STYLE: Record<
  Recommendation["kind"],
  { tone: string; Icon: (p: { className?: string }) => React.ReactNode; eyebrow: string }
> = {
  review: { tone: "accent", Icon: FlameIcon, eyebrow: "Recommended — reviews due" },
  continue: { tone: "sage", Icon: PlayIcon, eyebrow: "Recommended — pick up" },
  start: { tone: "primary", Icon: PlayIcon, eyebrow: "Recommended — start here" },
  sharpen: { tone: "amber", Icon: PuzzleIcon, eyebrow: "Recommended — keep sharp" },
};

export function RecommendedNext() {
  const { snapshot } = useProgress();
  const srs = useSrs();
  // Capture "now" once at mount (lazy init) — calling Date.now() during render is
  // impure. Due-review counts don't need second-by-second precision.
  const [now] = useState(() => Date.now());
  // Both stores share an empty server/first-client snapshot, so SSR and hydration
  // agree (recommendation resolves to "start"); it fills in once data loads.
  const { rec } = recommendNext(snapshot(), srs, now);
  const s = STYLE[rec.kind];

  return (
    <Link href={rec.href} className="block">
      <Card interactive className="flex h-full items-center gap-3.5 p-4">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-on-accent"
          style={{ backgroundColor: `var(--color-${s.tone})` }}
        >
          <s.Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            {s.eyebrow}
          </p>
          <p className="truncate font-display text-lg font-semibold text-ink">{rec.title}</p>
          <p className="truncate text-sm text-ink-soft">{rec.detail}</p>
        </div>
        <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
      </Card>
    </Link>
  );
}
