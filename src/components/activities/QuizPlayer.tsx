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
              ? " border-sky-200 bg-white text-neutral-900 hover:border-sky-400"
              : " border-neutral-300 bg-white text-neutral-900 hover:border-emerald-400";
          } else if (isCorrect) {
            cls += " border-emerald-500 bg-emerald-50 text-emerald-900";
          } else if (isChosen) {
            cls += " border-red-400 bg-red-50 text-red-900";
          } else {
            cls += " border-neutral-200 bg-neutral-50 text-neutral-400";
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
                      ? "bg-sky-100 text-sky-700"
                      : isCorrect
                        ? "bg-emerald-500 text-white"
                        : isChosen
                          ? "bg-red-400 text-white"
                          : "bg-neutral-200 text-neutral-400"
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
            correct
              ? "bg-emerald-50 text-emerald-900"
              : "bg-amber-50 text-amber-900"
          }`}
        >
          <div className="mb-1 flex items-center gap-2">
            <p className="font-bold">
              {correct ? (kidMode ? "Yay, correct! 🎉" : "Correct!") : (kidMode ? "Good try!" : "Not quite.")}
            </p>
            {kidMode && <SpeakButton text={activity.explanation} size="sm" />}
          </div>
          <p>{activity.explanation}</p>
        </div>
      )}
    </div>
  );
}
