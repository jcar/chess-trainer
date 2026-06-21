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
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === activity.correctIndex;

  // Shuffle answer order so the correct option isn't always in the same slot.
  const order = useMemo(
    () => seededOrder(activity.options.length, activity.id),
    [activity.options.length, activity.id],
  );

  function choose(index: number) {
    if (answered) return;
    setSelected(index);
    const isRight = index === activity.correctIndex;
    if (kidMode) playSound(isRight ? "success" : "tryAgain");
    onComplete(isRight ? 100 : 50);
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
          const isChosen = origIdx === selected;
          let cls = kidMode
            ? "flex w-full items-center gap-4 rounded-2xl border-4 px-5 py-5 text-left text-xl font-semibold transition active:scale-[0.98]"
            : "w-full rounded-xl border px-4 py-4 text-left text-base transition active:scale-[0.99]";
          if (!answered) {
            cls += kidMode
              ? " border-kid-teal/30 bg-card text-ink hover:border-kid-teal"
              : " border-line bg-card text-ink hover:border-primary/40";
          } else if (isCorrect) {
            cls += " border-sage bg-sage/10 text-sage";
          } else if (isChosen) {
            cls += " border-clay bg-clay/10 text-clay";
          } else {
            cls += " border-line bg-surface text-ink-soft/60";
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
                    !answered
                      ? "bg-kid-teal/15 text-kid-teal"
                      : isCorrect
                        ? "bg-sage text-on-accent"
                        : isChosen
                          ? "bg-clay text-on-accent"
                          : "bg-ink/8 text-ink-soft/60"
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

      {answered && (
        <div
          className={`rounded-2xl p-4 ${kidMode ? "text-lg" : "text-sm"} ${
            correct ? "bg-sage/10 text-sage" : "bg-accent/10 text-primary-strong"
          }`}
        >
          <div className="mb-1 flex items-center gap-2">
            <p className="font-bold">
              {correct ? (kidMode ? "Yay, correct!" : "Correct!") : (kidMode ? "Good try!" : "Not quite.")}
            </p>
            {kidMode && <SpeakButton text={activity.explanation} size="sm" />}
          </div>
          <p>{activity.explanation}</p>
        </div>
      )}
    </div>
  );
}
