"use client";

// Sort game: show a board/diagram, the child taps the right label. Powers
// "Checkmate or Stalemate?", "Legal or Illegal?", "Which piece?", "Is it safe?".

import { useMemo, useState } from "react";
import type { SortActivity } from "@/content/types";
import { MiniBoard } from "@/components/board/MiniBoard";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";
import { seededOrder } from "@/lib/shuffle";

interface Props {
  activity: SortActivity;
  onComplete: (score: number) => void;
  /** Reports a wrong tap — lets ActivityPlayer fire a Murk taunt. */
  onAttempt?: () => void;
}

export function SortPlayer({ activity, onComplete, onAttempt }: Props) {
  // Retry-until-right (kids): a wrong tap teaches and lets them try again; we
  // only lock + complete on the correct answer, so exploring is never punished.
  const [solved, setSolved] = useState(false);
  const [missed, setMissed] = useState(false);
  const [wrongPicks, setWrongPicks] = useState<number[]>([]);
  const showTeach = solved || wrongPicks.length > 0;

  // Shuffle label order so the correct one isn't always in the same slot.
  const order = useMemo(
    () => seededOrder(activity.options.length, activity.id),
    [activity.options.length, activity.id],
  );

  function choose(i: number) {
    if (solved) return;
    if (i === activity.correctIndex) {
      playSound("success");
      setSolved(true);
      onComplete(missed ? 90 : 100); // 100 first try → 3 stars; 90 after a miss → 2
    } else {
      playSound("tryAgain");
      setMissed(true);
      setWrongPicks((w) => (w.includes(i) ? w : [...w, i]));
      onAttempt?.();
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <p className="text-2xl font-bold leading-snug">{activity.prompt}</p>
        <SpeakButton text={activity.prompt} />
      </div>

      <div className="mx-auto max-w-xs">
        <MiniBoard
          fen={activity.fen}
          orientation={activity.orientation}
          arrows={activity.arrows}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {order.map((origIdx) => {
          const opt = activity.options[origIdx];
          const isCorrect = origIdx === activity.correctIndex;
          const isWrongPick = wrongPicks.includes(origIdx);
          let cls =
            "flex items-center justify-center gap-2 rounded-2xl border-4 px-3 py-5 text-lg font-extrabold transition active:scale-[0.98] sm:px-4 sm:text-xl";
          if (solved && isCorrect) cls += " border-sage bg-sage/10 text-sage";
          else if (solved) cls += " border-line bg-surface text-ink-soft/60";
          else if (isWrongPick) cls += " border-clay bg-clay/10 text-clay";
          else cls += " border-kid-teal/30 bg-card text-ink";
          return (
            <button key={origIdx} type="button" onClick={() => choose(origIdx)} disabled={solved} className={cls}>
              {opt.emoji && <span aria-hidden>{opt.emoji}</span>}
              <span>{opt.label}</span>
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
