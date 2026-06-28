"use client";

// Sort game: show a board/diagram, the child taps the right label. Powers
// "Checkmate or Stalemate?", "Legal or Illegal?", "Which piece?", "Is it safe?".

import { useMemo, useState } from "react";
import type { SortActivity } from "@/content/types";
import { MiniBoard } from "@/components/board/MiniBoard";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";
import { seededOrder } from "@/lib/shuffle";
import { useAutoRead } from "@/lib/audio/useAutoRead";

interface Props {
  activity: SortActivity;
  onComplete: (score: number) => void;
  /** Reports a wrong tap — lets ActivityPlayer fire a Murk taunt. */
  onAttempt?: () => void;
  kidMode?: boolean;
}

export function SortPlayer({ activity, onComplete, onAttempt, kidMode = false }: Props) {
  // Retry-until-right (kids): a wrong tap teaches and lets them try again; we
  // only lock + complete on the correct answer, so exploring is never punished.
  const [solved, setSolved] = useState(false);
  const [missed, setMissed] = useState(false);
  const [wrongPicks, setWrongPicks] = useState<number[]>([]);
  const showTeach = solved || wrongPicks.length > 0;
  useAutoRead(activity.prompt, { enabled: kidMode });

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
        <p className={kidMode ? "text-2xl font-bold leading-snug" : "text-lg font-semibold leading-snug"}>
          {activity.prompt}
        </p>
        {kidMode && <SpeakButton text={activity.prompt} />}
      </div>

      <div className={kidMode ? "mx-auto max-w-xs" : "mx-auto max-w-[18rem]"}>
        <MiniBoard
          fen={activity.fen}
          orientation={activity.orientation}
          arrows={activity.arrows}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {order.map((origIdx) => {
          const opt = activity.options[origIdx];
          const isCorrect = origIdx === activity.correctIndex;
          const isWrongPick = wrongPicks.includes(origIdx);
          const showCorrect = solved && isCorrect;

          const tile = kidMode
            ? "rounded-2xl border-4 px-3 py-5 text-lg font-extrabold sm:px-4 sm:text-xl"
            : "rounded-xl border px-4 py-3.5 text-[15px] font-medium";
          let state: string;
          if (showCorrect) state = "border-sage bg-sage/12 text-ink pop";
          else if (isWrongPick) state = "border-clay bg-clay/12 text-ink";
          else if (solved) state = "border-line bg-surface text-ink-soft/55";
          else
            state = kidMode
              ? "border-kid-teal/35 bg-card text-ink hover:border-kid-teal hover:bg-kid-teal/[0.06]"
              : "border-line bg-card text-ink hover:border-primary/55 hover:bg-primary/[0.05]";

          return (
            <button
              key={origIdx}
              type="button"
              onClick={() => choose(origIdx)}
              disabled={solved}
              className={`flex items-center justify-center gap-2 text-center transition active:scale-[0.98] ${tile} ${state}`}
            >
              {showCorrect && <span aria-hidden className="text-sage">✓</span>}
              {isWrongPick && <span aria-hidden className="text-clay">✕</span>}
              {opt.emoji && <span aria-hidden>{opt.emoji}</span>}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {showTeach && (
        <div
          className={`pop flex items-start gap-3 rounded-2xl p-4 ${kidMode ? "text-lg" : "text-sm"} ${
            solved ? "bg-sage/10 text-sage" : "bg-accent/10 text-primary-strong"
          }`}
        >
          <span
            className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
              solved ? "bg-sage text-on-accent" : "bg-primary/20 text-primary-strong"
            }`}
          >
            {solved ? "✓" : "!"}
          </span>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <p className="font-bold">
                {solved ? (kidMode ? "Yay, correct!" : "Correct") : kidMode ? "Good try — try again!" : "Not quite"}
              </p>
              {kidMode && <SpeakButton text={activity.explanation} size="sm" />}
            </div>
            <p>{activity.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
