"use client";

// A quiz whose answers are little board pictures (with arrows) instead of
// sentences — so pre-readers can play by looking, not reading.

import { useState } from "react";
import type { PictureQuizActivity } from "@/content/types";
import { MiniBoard } from "@/components/board/MiniBoard";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";

interface Props {
  activity: PictureQuizActivity;
  onComplete: (score: number) => void;
}

export function PictureQuizPlayer({ activity, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === activity.correctIndex;

  function choose(index: number) {
    if (answered) return;
    setSelected(index);
    const isRight = index === activity.correctIndex;
    playSound(isRight ? "success" : "tryAgain");
    onComplete(isRight ? 100 : 50);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <p className="text-2xl font-bold leading-snug">{activity.question}</p>
        <SpeakButton text={activity.question} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {activity.options.map((opt, i) => {
          const isCorrect = i === activity.correctIndex;
          const isChosen = i === selected;
          let ring = "border-kid-teal/30";
          if (answered) {
            ring = isCorrect
              ? "border-sage"
              : isChosen
                ? "border-clay"
                : "border-line opacity-60";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => choose(i)}
              disabled={answered}
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

      {answered && (
        <div
          className={`rounded-2xl p-4 text-lg ${
            correct ? "bg-sage/10 text-sage" : "bg-brass/10 text-walnut-deep"
          }`}
        >
          <div className="mb-1 flex items-center gap-2">
            <p className="font-bold">{correct ? "Yay, correct!" : "Good try!"}</p>
            <SpeakButton text={activity.explanation} size="sm" />
          </div>
          <p>{activity.explanation}</p>
        </div>
      )}
    </div>
  );
}
