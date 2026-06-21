"use client";

// A "why" checkpoint interleaved into a trainer session: instead of recalling a
// move, the learner recalls the PLAN. Shows the opening's tabiya and asks for the
// plan, then reveals it (self-check flashcard). Reinforces understanding, not just
// memorized moves. Reuses the opening data already authored.

import { useState } from "react";
import type { Opening } from "@/content/openings/types";
import { Board } from "@/components/board/Board";
import { buttonClasses } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

interface Props {
  opening: Opening;
  onContinue: () => void;
}

export function WhyCheckpoint({ opening, onContinue }: Props) {
  const [revealed, setRevealed] = useState(false);
  const color = opening.trainerColor;
  const plan = color === "white" ? opening.whitePlan : opening.blackPlan;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Chip tone="amber">Why?</Chip>
        <p className="text-sm font-semibold text-ink-soft">
          {opening.name} — playing {color === "white" ? "White" : "Black"}
        </p>
      </div>

      <Board fen={opening.tabiyaFen} orientation={color} interactive={false} />

      <div className="rounded-2xl bg-surface p-4 shadow-soft">
        <p className="font-display text-lg font-semibold text-primary-strong">
          What&apos;s your plan in this position?
        </p>
        {revealed ? (
          <p className="mt-2 leading-relaxed text-ink">{plan}</p>
        ) : (
          <p className="mt-2 text-sm text-ink-soft">
            Think it through, then reveal to check yourself.
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        {!revealed ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className={buttonClasses("accent", "md")}
          >
            Reveal plan
          </button>
        ) : (
          <button
            type="button"
            onClick={onContinue}
            className={buttonClasses("primary", "md")}
          >
            Got it — continue
          </button>
        )}
      </div>
    </div>
  );
}
