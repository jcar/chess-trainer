"use client";

// Reusable retry-until-right multiple-choice check for kids: a wrong tap teaches
// and stays live; `onSolved(clean)` fires once the right answer is tapped (clean =
// no wrong tries). Used by the concept check-for-understanding (ConceptPlayer) and
// the Pip's Challenge review items (PipChallengePlayer).

import { useMemo, useState } from "react";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";
import { seededOrder } from "@/lib/shuffle";

interface Props {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  /** Stable seed for shuffling option order (e.g. the activity/item id). */
  seed: string;
  onSolved: (clean: boolean) => void;
}

export function ChoiceCheck({
  question,
  options,
  correctIndex,
  explanation,
  seed,
  onSolved,
}: Props) {
  const [solved, setSolved] = useState(false);
  const [missed, setMissed] = useState(false);
  const [wrong, setWrong] = useState<number[]>([]);
  const showTeach = solved || wrong.length > 0;
  const order = useMemo(() => seededOrder(options.length, seed), [options.length, seed]);

  function choose(i: number) {
    if (solved) return;
    if (i === correctIndex) {
      playSound("success");
      setSolved(true);
      onSolved(!missed);
    } else {
      playSound("tryAgain");
      setMissed(true);
      setWrong((w) => (w.includes(i) ? w : [...w, i]));
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <p className="text-xl font-bold leading-snug">{question}</p>
        <SpeakButton text={question} size="sm" />
      </div>

      <div className="space-y-3">
        {order.map((origIdx) => {
          const isCorrect = origIdx === correctIndex;
          const isWrongPick = wrong.includes(origIdx);
          let cls =
            "flex w-full items-center gap-3 rounded-2xl border-4 px-5 py-4 text-left text-lg font-semibold transition active:scale-[0.98]";
          if (solved && isCorrect) cls += " border-sage bg-sage/10 text-sage";
          else if (isWrongPick) cls += " border-clay bg-clay/10 text-clay";
          else if (solved) cls += " border-line bg-surface text-ink-soft/60";
          else cls += " border-kid-teal/30 bg-card text-ink";
          return (
            <button
              key={origIdx}
              type="button"
              disabled={solved}
              onClick={() => choose(origIdx)}
              className={cls}
            >
              {options[origIdx]}
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
            <SpeakButton text={explanation} size="sm" />
          </div>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  );
}
