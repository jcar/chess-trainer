"use client";

// Sort game: show a board/diagram, the child taps the right label. Powers
// "Checkmate or Stalemate?", "Legal or Illegal?", "Which piece?", "Is it safe?".

import { useState } from "react";
import type { SortActivity } from "@/content/types";
import { MiniBoard } from "@/components/board/MiniBoard";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";

interface Props {
  activity: SortActivity;
  onComplete: (score: number) => void;
}

export function SortPlayer({ activity, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const correct = selected === activity.correctIndex;

  function choose(i: number) {
    if (answered) return;
    setSelected(i);
    const isRight = i === activity.correctIndex;
    playSound(isRight ? "success" : "tryAgain");
    onComplete(isRight ? 100 : 50);
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
        {activity.options.map((opt, i) => {
          const isCorrect = i === activity.correctIndex;
          const isChosen = i === selected;
          let cls =
            "flex items-center justify-center gap-2 rounded-2xl border-4 px-4 py-5 text-xl font-extrabold transition active:scale-[0.98]";
          if (!answered) cls += " border-kid-teal/30 bg-card text-ink";
          else if (isCorrect) cls += " border-sage bg-sage/10 text-sage";
          else if (isChosen) cls += " border-clay bg-clay/10 text-clay";
          else cls += " border-line bg-surface text-ink-soft/60";
          return (
            <button key={i} type="button" onClick={() => choose(i)} disabled={answered} className={cls}>
              {opt.emoji && <span aria-hidden>{opt.emoji}</span>}
              <span>{opt.label}</span>
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
