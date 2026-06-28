"use client";

// Reusable retry-until-right multiple-choice check for kids: a wrong tap teaches
// and stays live; `onSolved(clean)` fires once the right answer is tapped (clean =
// no wrong tries). Used by the concept check-for-understanding (ConceptPlayer) and
// the Pip's Challenge review items (PipChallengePlayer).

import { useMemo, useState } from "react";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";
import { seededOrder } from "@/lib/shuffle";
import { useAutoRead } from "@/lib/audio/useAutoRead";

interface Props {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  /** Stable seed for shuffling option order (e.g. the activity/item id). */
  seed: string;
  onSolved: (clean: boolean) => void;
  /** Kid styling (chunky tiles, read-aloud, "Yay!"). Adults get the trim look. */
  kidMode?: boolean;
}

const BADGES = ["A", "B", "C", "D"];

export function ChoiceCheck({
  question,
  options,
  correctIndex,
  explanation,
  seed,
  onSolved,
  kidMode = false,
}: Props) {
  const [solved, setSolved] = useState(false);
  const [missed, setMissed] = useState(false);
  const [wrong, setWrong] = useState<number[]>([]);
  const showTeach = solved || wrong.length > 0;
  const order = useMemo(() => seededOrder(options.length, seed), [options.length, seed]);
  useAutoRead(question, { enabled: kidMode });

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
        <p className={kidMode ? "text-xl font-bold leading-snug" : "text-base font-semibold leading-snug"}>
          {question}
        </p>
        {kidMode && <SpeakButton text={question} size="sm" />}
      </div>

      <div className="space-y-2.5">
        {order.map((origIdx, pos) => {
          const isCorrect = origIdx === correctIndex;
          const isWrongPick = wrong.includes(origIdx);
          const showCorrect = solved && isCorrect;

          const tile = kidMode
            ? "gap-4 rounded-2xl border-4 px-5 py-4 text-lg font-semibold"
            : "gap-3.5 rounded-xl border px-4 py-3 text-[15px]";
          let state: string;
          if (showCorrect) state = "border-sage bg-sage/12 text-ink pop";
          else if (isWrongPick) state = "border-clay bg-clay/12 text-ink";
          else if (solved) state = "border-line bg-surface text-ink-soft/55";
          else
            state = kidMode
              ? "border-kid-teal/35 bg-card text-ink hover:border-kid-teal hover:bg-kid-teal/[0.06]"
              : "border-line bg-card text-ink hover:border-primary/55 hover:bg-primary/[0.05]";

          const badge = kidMode ? "h-9 w-9 rounded-full text-base" : "h-7 w-7 rounded-lg text-xs";
          let badgeState: string;
          if (showCorrect) badgeState = "bg-sage text-on-accent";
          else if (isWrongPick) badgeState = "bg-clay text-on-accent";
          else if (solved) badgeState = "bg-ink/8 text-ink-soft/50";
          else
            badgeState = kidMode
              ? "bg-kid-teal/15 text-kid-teal"
              : "bg-primary/12 text-primary-strong group-hover:bg-primary/20";

          return (
            <button
              key={origIdx}
              type="button"
              disabled={solved}
              onClick={() => choose(origIdx)}
              className={`group flex w-full items-center text-left transition active:scale-[0.99] ${tile} ${state}`}
            >
              <span className={`flex shrink-0 items-center justify-center font-extrabold transition ${badge} ${badgeState}`}>
                {showCorrect ? "✓" : isWrongPick ? "✕" : BADGES[pos]}
              </span>
              <span className="min-w-0 flex-1">{options[origIdx]}</span>
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
              {kidMode && <SpeakButton text={explanation} size="sm" />}
            </div>
            <p>{explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
