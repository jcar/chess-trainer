"use client";

import { useMemo, useState } from "react";
import type { ReplayActivity } from "@/content/types";
import { buildReplayFens, replayMoveSquares } from "@/lib/chess/game";
import { Board } from "@/components/board/Board";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";

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
        className={`flex items-start gap-3 rounded-2xl bg-neutral-50 p-4 leading-relaxed ${
          kidMode ? "text-lg" : "text-sm"
        }`}
      >
        <p className="flex-1">
          {step > 0 && (
            <span className="mr-2 font-mono font-semibold text-emerald-700">
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
          className={
            kidMode
              ? "rounded-2xl border-4 border-neutral-300 px-6 py-4 text-lg font-bold disabled:opacity-40 active:scale-95"
              : "rounded-xl border border-neutral-300 px-5 py-3 text-base font-medium disabled:opacity-40"
          }
        >
          ← Back
        </button>
        <span className={kidMode ? "text-base font-bold text-neutral-500" : "text-sm text-neutral-500"}>
          {step} / {lastStep}
        </span>
        <button
          type="button"
          onClick={() => go(step + 1)}
          disabled={step === lastStep}
          className={
            kidMode
              ? "rounded-2xl bg-emerald-500 px-7 py-4 text-xl font-extrabold text-white shadow-md disabled:opacity-40 active:scale-95"
              : "rounded-xl bg-emerald-600 px-5 py-3 text-base font-medium text-white disabled:opacity-40"
          }
        >
          Next →
        </button>
      </div>
    </div>
  );
}
