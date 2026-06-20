"use client";

import { useMemo, useState } from "react";
import type { ReplayActivity } from "@/content/types";
import { buildReplayFens, replayMoveSquares } from "@/lib/chess/game";
import { Board } from "@/components/board/Board";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";
import { buttonClasses } from "@/components/ui/Button";
import { ArrowLeftIcon, ChevronRightIcon } from "@/components/icons";

interface Props {
  activity: ReplayActivity;
  onComplete: (score: number) => void;
  kidMode?: boolean;
}

export function ReplayPlayer({ activity, onComplete, kidMode = false }: Props) {
  // Precompute the FEN at each step. Index 0 = before any move (intro shown).
  const fens = useMemo(
    () => buildReplayFens(activity.steps.map((s) => s.san), activity.startFen),
    [activity],
  );
  const moveSquares = useMemo(
    () => replayMoveSquares(activity.steps.map((s) => s.san), activity.startFen),
    [activity],
  );

  // step 0..steps.length, where step n shows the position after n moves.
  const [step, setStep] = useState(0);
  const lastStep = activity.steps.length;

  const note = step === 0 ? activity.intro : activity.steps[step - 1].note;

  function go(next: number) {
    const clamped = Math.max(0, Math.min(lastStep, next));
    if (clamped !== step && kidMode) {
      playSound(clamped === lastStep ? "success" : "step");
    }
    setStep(clamped);
    if (clamped === lastStep) onComplete(100);
  }

  return (
    <div className="space-y-4">
      <Board
        fen={fens[step]}
        orientation={activity.orientation}
        interactive={false}
        arrows={
          kidMode && step > 0 && moveSquares[step - 1]
            ? [moveSquares[step - 1]]
            : []
        }
      />

      <div
        className={`flex items-start gap-3 rounded-2xl bg-surface p-4 leading-relaxed shadow-soft ${
          kidMode ? "text-lg" : "text-sm"
        }`}
      >
        <p className="flex-1 text-ink">
          {step > 0 && (
            <span className="mr-2 font-mono font-semibold text-brass">
              {activity.steps[step - 1].san}
            </span>
          )}
          {note}
        </p>
        {kidMode && <SpeakButton text={note} size="sm" />}
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(step - 1)}
          disabled={step === 0}
          className={buttonClasses("secondary", kidMode ? "kid" : "lg", "disabled:opacity-40")}
        >
          <ArrowLeftIcon className="h-5 w-5" /> Back
        </button>
        <span className={kidMode ? "text-base font-bold text-ink-soft" : "text-sm text-ink-soft"}>
          {step} / {lastStep}
        </span>
        <button
          type="button"
          onClick={() => go(step + 1)}
          disabled={step === lastStep}
          className={buttonClasses("primary", kidMode ? "kid" : "lg", "disabled:opacity-40")}
        >
          Next <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
