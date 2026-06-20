"use client";

import { useState } from "react";
import type { QuizActivity } from "@/content/types";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";

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

  function choose(index: number) {
    if (answered) return;
    setSelected(index);
    const isRight = index === activity.correctIndex;
    if (kidMode) playSound(isRight ? "success" : "tryAgain");
    onComplete(isRight ? 100 : 50);
  }

  const readAloud = `${activity.question}. ${activity.options
    .map((o, i) => `${BADGES[i]}. ${o}`)
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
        {activity.options.map((option, i) => {
          const isCorrect = i === activity.correctIndex;
          const isChosen = i === selected;
          let cls = kidMode
            ? "flex w-full items-center gap-4 rounded-2xl border-4 px-5 py-5 text-left text-xl font-semibold transition active:scale-[0.98]"
            : "w-full rounded-xl border px-4 py-4 text-left text-base transition active:scale-[0.99]";
          if (!answered) {
            cls += kidMode
              ? " border-kid-teal/30 bg-card text-ink hover:border-kid-teal"
              : " border-line bg-card text-ink hover:border-walnut/40";
          } else if (isCorrect) {
            cls += " border-sage bg-sage/10 text-sage";
          } else if (isChosen) {
            cls += " border-clay bg-clay/10 text-clay";
          } else {
            cls += " border-line bg-surface text-ink-soft/60";
          }
          return (
            <button
              key={i}
              type="button"
              className={cls}
              onClick={() => choose(i)}
              disabled={answered}
            >
              {kidMode && (
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-extrabold ${
                    !answered
                      ? "bg-kid-teal/15 text-kid-teal"
                      : isCorrect
                        ? "bg-sage text-[#fffdf7]"
                        : isChosen
                          ? "bg-clay text-[#fffdf7]"
                          : "bg-ink/8 text-ink-soft/60"
                  }`}
                >
                  {answered && isCorrect ? "✓" : BADGES[i]}
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
            correct ? "bg-sage/10 text-sage" : "bg-brass/10 text-walnut-deep"
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
