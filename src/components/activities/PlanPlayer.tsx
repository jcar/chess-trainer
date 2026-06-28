"use client";

// Find the Plan → convert (adult "Apply"): the learner reads the imbalances and
// picks the right plan (a retry-until-right multiple choice over the position),
// then immediately executes it — playing the line (puzzle) or converting against
// the engine (drill). Closes the loop from understanding to doing.

import { useState } from "react";
import type { PlanActivity, PuzzleActivity, DrillActivity } from "@/content/types";
import { Board } from "@/components/board/Board";
import { StudyLayout } from "@/components/activities/StudyLayout";
import { ChoiceCheck } from "@/components/kids/ChoiceCheck";
import { PuzzlePlayer } from "@/components/activities/PuzzlePlayer";
import { DrillPlayer } from "@/components/activities/DrillPlayer";
import { ChessGame } from "@/lib/chess/game";

interface Props {
  activity: PlanActivity;
  onComplete: (score: number) => void;
}

export function PlanPlayer({ activity, onComplete }: Props) {
  const [phase, setPhase] = useState<"plan" | "convert">("plan");
  const [planClean, setPlanClean] = useState(true);

  // Reconstruct a full sub-activity from `convert` (it carries everything but
  // identity, which we supply here).
  const sub: PuzzleActivity | DrillActivity =
    activity.convert.kind === "puzzle"
      ? { ...activity.convert.puzzle, type: "puzzle", id: `${activity.id}-convert`, title: activity.title }
      : { ...activity.convert.drill, type: "drill", id: `${activity.id}-convert`, title: activity.title };

  function finishConvert(score: number) {
    // A missed plan pick gently caps the reward; a clean run scores full.
    onComplete(planClean ? score : Math.min(score, 80));
  }

  if (phase === "convert") {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-accent/30 bg-accent/8 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Now execute the plan
          </p>
          <p className="mt-1 text-sm text-ink">{activity.explanation}</p>
        </div>
        {sub.type === "puzzle" ? (
          <PuzzlePlayer activity={sub} onComplete={finishConvert} onAttempt={() => {}} />
        ) : (
          <DrillPlayer activity={sub} onComplete={finishConvert} />
        )}
      </div>
    );
  }

  const turn = new ChessGame(activity.fen).turn === "w" ? "White to move" : "Black to move";

  return (
    <StudyLayout
      caption={turn}
      board={
        <Board fen={activity.fen} orientation={activity.orientation} interactive={false} />
      }
      ledger={
        <ChoiceCheck
          question={activity.planQuestion}
          options={activity.options}
          correctIndex={activity.correctIndex}
          explanation={activity.explanation}
          seed={activity.id}
          onSolved={(clean) => {
            setPlanClean(clean);
            // Brief beat so the learner reads the confirmation, then convert.
            setTimeout(() => setPhase("convert"), 900);
          }}
        />
      }
    />
  );
}
