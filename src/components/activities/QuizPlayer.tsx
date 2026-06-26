"use client";

import { useMemo, useState } from "react";
import type { QuizActivity } from "@/content/types";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";
import { seededOrder } from "@/lib/shuffle";
import { quizReadAloud } from "@/lib/audio/narration";

interface Props {
  activity: QuizActivity;
  onComplete: (score: number) => void;
  /** Reports a wrong answer (kid mode) — lets ActivityPlayer fire a Murk taunt. */
  onAttempt?: () => void;
  kidMode?: boolean;
}

const BADGES = ["A", "B", "C", "D"];

export function QuizPlayer({ activity, onComplete, onAttempt, kidMode = false }: Props) {
  // Non-kid: lock on first answer (score 100/50). Kid: retry-until-right — a
  // wrong tap teaches and stays live; we lock + complete only on the correct
  // answer (100 first try → 3 stars, 90 after a miss → 2), so exploring is free.
  const [selected, setSelected] = useState<number | null>(null); // non-kid
  const [solved, setSolved] = useState(false);
  const [missed, setMissed] = useState(false);
  const [wrong, setWrong] = useState<number[]>([]);

  const answered = kidMode ? solved : selected !== null;
  const correct = kidMode ? solved : selected === activity.correctIndex;
  const showTeach = answered || (kidMode && wrong.length > 0);

  // Shuffle answer order so the correct option isn't always in the same slot.
  const order = useMemo(
    () => seededOrder(activity.options.length, activity.id),
    [activity.options.length, activity.id],
  );

  function choose(index: number) {
    if (kidMode) {
      if (solved) return;
      if (index === activity.correctIndex) {
        playSound("success");
        setSolved(true);
        onComplete(missed ? 90 : 100);
      } else {
        playSound("tryAgain");
        setMissed(true);
        setWrong((w) => (w.includes(index) ? w : [...w, index]));
        onAttempt?.();
      }
      return;
    }
    if (selected !== null) return;
    setSelected(index);
    onComplete(index === activity.correctIndex ? 100 : 50);
  }

  const readAloud = quizReadAloud(activity);

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <p className={kidMode ? "text-2xl font-bold leading-snug" : "text-lg font-medium"}>
          {activity.question}
        </p>
        {kidMode && <SpeakButton text={readAloud} />}
      </div>

      <div className="space-y-2.5">
        {order.map((origIdx, pos) => {
          const option = activity.options[origIdx];
          const isCorrect = origIdx === activity.correctIndex;
          const isWrongPick = kidMode
            ? wrong.includes(origIdx)
            : answered && origIdx === selected && !isCorrect;
          const showCorrect = answered && isCorrect;

          const tile = kidMode
            ? "gap-4 rounded-2xl border-4 px-5 py-5 text-xl font-semibold"
            : "gap-3.5 rounded-xl border px-4 py-3.5 text-base";
          let state: string;
          if (showCorrect) state = "border-sage bg-sage/12 text-ink pop";
          else if (isWrongPick) state = "border-clay bg-clay/12 text-ink";
          else if (answered) state = "border-line bg-surface text-ink-soft/55";
          else
            state = kidMode
              ? "border-kid-teal/35 bg-card text-ink hover:border-kid-teal hover:bg-kid-teal/[0.06]"
              : "border-line bg-card text-ink hover:border-primary/55 hover:bg-primary/[0.05]";

          const badge = kidMode ? "h-10 w-10 rounded-full text-lg" : "h-8 w-8 rounded-lg text-sm";
          let badgeState: string;
          if (showCorrect) badgeState = "bg-sage text-on-accent";
          else if (isWrongPick) badgeState = "bg-clay text-on-accent";
          else if (answered) badgeState = "bg-ink/8 text-ink-soft/50";
          else
            badgeState = kidMode
              ? "bg-kid-teal/15 text-kid-teal"
              : "bg-primary/12 text-primary-strong group-hover:bg-primary/20";

          return (
            <button
              key={origIdx}
              type="button"
              className={`group flex w-full items-center text-left transition active:scale-[0.99] ${tile} ${state}`}
              onClick={() => choose(origIdx)}
              disabled={answered}
            >
              <span className={`flex shrink-0 items-center justify-center font-extrabold transition ${badge} ${badgeState}`}>
                {showCorrect ? "✓" : isWrongPick ? "✕" : BADGES[pos]}
              </span>
              <span className="min-w-0 flex-1">{option}</span>
            </button>
          );
        })}
      </div>

      {showTeach && (
        <div
          className={`pop flex items-start gap-3 rounded-2xl p-4 ${kidMode ? "text-lg" : "text-sm"} ${
            correct ? "bg-sage/10 text-sage" : "bg-accent/10 text-primary-strong"
          }`}
        >
          <span
            className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
              correct ? "bg-sage text-on-accent" : "bg-primary/20 text-primary-strong"
            }`}
          >
            {correct ? "✓" : "!"}
          </span>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2">
              <p className="font-bold">
                {correct
                  ? kidMode
                    ? "Yay, correct!"
                    : "Correct"
                  : kidMode
                    ? "Good try — try again!"
                    : "Not quite"}
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
