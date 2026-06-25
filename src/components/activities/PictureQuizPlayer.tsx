"use client";

// A quiz whose answers are little board pictures (with arrows) instead of
// sentences — so pre-readers can play by looking, not reading.

import { useMemo, useState } from "react";
import type { PictureQuizActivity } from "@/content/types";
import { MiniBoard } from "@/components/board/MiniBoard";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";
import { seededOrder } from "@/lib/shuffle";

interface Props {
  activity: PictureQuizActivity;
  onComplete: (score: number) => void;
  /** Reports a wrong tap — lets ActivityPlayer fire a Murk taunt. */
  onAttempt?: () => void;
}

export function PictureQuizPlayer({ activity, onComplete, onAttempt }: Props) {
  // Retry-until-right (kids): wrong taps teach and stay live; lock + complete
  // only on the correct picture, so exploring is never punished.
  const [solved, setSolved] = useState(false);
  const [missed, setMissed] = useState(false);
  const [wrongPicks, setWrongPicks] = useState<number[]>([]);
  const showTeach = solved || wrongPicks.length > 0;

  // Shuffle picture order so the correct one isn't always in the same slot.
  const order = useMemo(
    () => seededOrder(activity.options.length, activity.id),
    [activity.options.length, activity.id],
  );

  function choose(index: number) {
    if (solved) return;
    if (index === activity.correctIndex) {
      playSound("success");
      setSolved(true);
      onComplete(missed ? 90 : 100);
    } else {
      playSound("tryAgain");
      setMissed(true);
      setWrongPicks((w) => (w.includes(index) ? w : [...w, index]));
      onAttempt?.();
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <p className="text-2xl font-bold leading-snug">{activity.question}</p>
        <SpeakButton text={activity.question} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {order.map((origIdx) => {
          const opt = activity.options[origIdx];
          const isCorrect = origIdx === activity.correctIndex;
          const isWrongPick = wrongPicks.includes(origIdx);
          let ring = "border-kid-teal/30";
          if (solved) ring = isCorrect ? "border-sage" : "border-line opacity-60";
          else if (isWrongPick) ring = "border-clay";
          return (
            <button
              key={origIdx}
              type="button"
              data-testid="picture-option"
              onClick={() => choose(origIdx)}
              disabled={solved}
              className={`flex flex-col items-center gap-2 rounded-2xl border-4 bg-card p-2 transition active:scale-[0.97] ${ring}`}
            >
              <MiniBoard
                fen={opt.fen}
                orientation={opt.orientation}
                arrows={opt.arrows}
              />
              <span className="flex items-center gap-1 text-base font-bold">
                {opt.caption}
              </span>
            </button>
          );
        })}
      </div>

      {showTeach && (
        <div
          className={`rounded-2xl p-4 text-lg ${
            solved ? "bg-sage/10 text-sage" : "bg-accent/10 text-primary-strong"
          }`}
        >
          <div className="mb-1 flex items-center gap-2">
            <p className="font-bold">{solved ? "Yay, correct!" : "Good try — try again!"}</p>
            <SpeakButton text={activity.explanation} size="sm" />
          </div>
          <p>{activity.explanation}</p>
        </div>
      )}
    </div>
  );
}
