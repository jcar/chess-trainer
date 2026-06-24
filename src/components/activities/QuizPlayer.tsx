"use client";

import { useMemo, useState } from "react";
import type { QuizActivity } from "@/content/types";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";
import { seededOrder } from "@/lib/shuffle";

interface Props {
  activity: QuizActivity;
  onComplete: (score: number) => void;
  kidMode?: boolean;
}

const BADGES = ["A", "B", "C", "D"];

export function QuizPlayer({ activity, onComplete, kidMode = false }: Props) {
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
      }
      return;
    }
    if (selected !== null) return;
    setSelected(index);
    onComplete(index === activity.correctIndex ? 100 : 50);
  }

  const readAloud = `${activity.question}. ${order
    .map((origIdx, pos) => `${BADGES[pos]}. ${activity.options[origIdx]}`)
    .join(". ")}`;

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <p className={kidMode ? "text-2xl font-bold leading-snug" : "text-lg font-medium"}>
          {activity.question}
        </p>
        {kidMode && <SpeakButton text={readAloud} />}
      </div>

      <div className="space-y-3">
        {order.map((origIdx, pos) => {
          const option = activity.options[origIdx];
          const isCorrect = origIdx === activity.correctIndex;
          const isWrongPick = kidMode
            ? wrong.includes(origIdx)
            : answered && origIdx === selected && !isCorrect;
          let cls = kidMode
            ? "flex w-full items-center gap-4 rounded-2xl border-4 px-5 py-5 text-left text-xl font-semibold transition active:scale-[0.98]"
            : "w-full rounded-xl border px-4 py-4 text-left text-base transition active:scale-[0.99]";
          if (answered && isCorrect) {
            cls += " border-sage bg-sage/10 text-sage";
          } else if (isWrongPick) {
            cls += " border-clay bg-clay/10 text-clay";
          } else if (answered) {
            cls += " border-line bg-surface text-ink-soft/60";
          } else {
            cls += kidMode
              ? " border-kid-teal/30 bg-card text-ink hover:border-kid-teal"
              : " border-line bg-card text-ink hover:border-primary/40";
          }
          return (
            <button
              key={origIdx}
              type="button"
              className={cls}
              onClick={() => choose(origIdx)}
              disabled={answered}
            >
              {kidMode && (
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-extrabold ${
                    answered && isCorrect
                      ? "bg-sage text-on-accent"
                      : isWrongPick
                        ? "bg-clay text-on-accent"
                        : answered
                          ? "bg-ink/8 text-ink-soft/60"
                          : "bg-kid-teal/15 text-kid-teal"
                  }`}
                >
                  {answered && isCorrect ? "✓" : BADGES[pos]}
                </span>
              )}
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {showTeach && (
        <div
          className={`rounded-2xl p-4 ${kidMode ? "text-lg" : "text-sm"} ${
            correct ? "bg-sage/10 text-sage" : "bg-accent/10 text-primary-strong"
          }`}
        >
          <div className="mb-1 flex items-center gap-2">
            <p className="font-bold">
              {correct
                ? kidMode
                  ? "Yay, correct!"
                  : "Correct!"
                : kidMode
                  ? "Good try — try again!"
                  : "Not quite."}
            </p>
            {kidMode && <SpeakButton text={activity.explanation} size="sm" />}
          </div>
          <p>{activity.explanation}</p>
        </div>
      )}
    </div>
  );
}
