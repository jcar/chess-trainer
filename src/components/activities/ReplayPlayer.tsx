"use client";

import { useMemo, useState } from "react";
import type { ReplayActivity } from "@/content/types";
import { buildReplayFens, replayMoveSquares } from "@/lib/chess/game";
import { Board } from "@/components/board/Board";
import { EvalBar } from "@/components/board/EvalBar";
import { StudyLayout } from "@/components/activities/StudyLayout";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { useAutoRead } from "@/lib/audio/useAutoRead";
import { playSound } from "@/lib/audio/sounds";
import { buttonClasses } from "@/components/ui/Button";
import { AdvanceButton } from "@/components/ui/AdvanceButton";
import { ArrowLeftIcon } from "@/components/icons";

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

  const curStep = step === 0 ? null : activity.steps[step - 1];
  const note = curStep ? curStep.note : activity.intro;
  useAutoRead(note, { enabled: kidMode });

  // Strategy Lab (adult): live eval bar, key-idea callouts, and per-step arrows /
  // highlights pointing out the strategic feature (a hole, an outpost, a file).
  const isLab = !!activity.eval;
  const moveArrow =
    (kidMode || isLab) && step > 0 && moveSquares[step - 1] ? [moveSquares[step - 1]] : [];
  const arrows = [...moveArrow, ...(curStep?.arrows ?? [])];

  const boardEl = (
    <Board
      fen={fens[step]}
      orientation={activity.orientation}
      interactive={false}
      arrows={arrows}
      highlightSquares={curStep?.highlights ?? []}
    />
  );

  function go(next: number) {
    const clamped = Math.max(0, Math.min(lastStep, next));
    if (clamped !== step && kidMode) {
      playSound(clamped === lastStep ? "success" : "step");
    }
    setStep(clamped);
    if (clamped === lastStep) onComplete(100);
  }

  return (
    <StudyLayout
      stack={kidMode}
      caption={isLab ? activity.source : undefined}
      board={
        isLab ? (
          <div className="flex items-stretch gap-2 sm:gap-3">
            <EvalBar fen={fens[step]} orientation={activity.orientation} />
            <div className="min-w-0 flex-1">{boardEl}</div>
          </div>
        ) : (
          boardEl
        )
      }
      ledger={
        <>
          {curStep?.keyIdea && (
            <div className="rounded-2xl border border-accent/30 bg-accent/8 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                Key idea
              </p>
              <p className="mt-1 font-display text-base font-semibold text-primary-strong">
                {curStep.keyIdea}
              </p>
            </div>
          )}
          <div
            className={`flex items-start gap-3 rounded-2xl bg-surface p-4 leading-relaxed shadow-soft ${
              kidMode ? "text-lg" : "text-sm"
            }`}
          >
            <p className="flex-1 text-ink">
              {step > 0 && (
                <span className="mr-2 font-mono font-semibold text-accent">
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
            <AdvanceButton
              onClick={() => go(step + 1)}
              disabled={step === lastStep}
              size={kidMode ? "kid" : "lg"}
              label="Next"
            />
          </div>
        </>
      }
    />
  );
}
