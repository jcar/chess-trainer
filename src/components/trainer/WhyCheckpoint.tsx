"use client";

// A "why" checkpoint interleaved into a trainer session: instead of recalling a
// move, the learner recalls the IDEA. If the opening has an `ideaQuiz` it's a real
// multiple-choice question; otherwise it falls back to a self-check flashcard that
// reveals the plan. Either way it shows the concrete middlegame plan, reinforcing
// understanding over memorized moves. Reuses the opening data already authored.

import { useMemo, useState } from "react";
import type { Opening } from "@/content/openings/types";
import { Board } from "@/components/board/Board";
import { buttonClasses } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { seededOrder } from "@/lib/shuffle";

interface Props {
  opening: Opening;
  onContinue: () => void;
}

export function WhyCheckpoint({ opening, onContinue }: Props) {
  const color = opening.trainerColor;
  // Concrete "now what do I do" plan, falling back to the opening's side plan.
  const plan =
    opening.middlegamePlan ??
    (color === "white" ? opening.whitePlan : opening.blackPlan);
  const quiz = opening.ideaQuiz;

  const [revealed, setRevealed] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);

  // Shuffle quiz options so the answer isn't always in the same slot (stable per opening).
  const order = useMemo(
    () => (quiz ? seededOrder(quiz.options.length, opening.id) : []),
    [quiz, opening.id],
  );
  const answered = picked !== null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Chip tone="amber">Idea check</Chip>
        <p className="text-sm font-semibold text-ink-soft">
          {opening.name} — playing {color === "white" ? "White" : "Black"}
        </p>
      </div>

      <Board fen={opening.tabiyaFen} orientation={color} interactive={false} />

      {quiz ? (
        <>
          <div className="rounded-2xl bg-surface p-4 shadow-soft">
            <p className="font-display text-lg font-semibold text-primary-strong">
              {quiz.question}
            </p>
          </div>
          <div className="space-y-2">
            {order.map((origIdx) => {
              const isCorrect = origIdx === quiz.correctIndex;
              const isPicked = origIdx === picked;
              let cls =
                "block w-full rounded-2xl border px-4 py-3 text-left text-sm transition";
              if (!answered) cls += " border-line bg-card hover:border-primary/40";
              else if (isCorrect) cls += " border-sage bg-sage/10 text-sage";
              else if (isPicked) cls += " border-clay bg-clay/10 text-clay";
              else cls += " border-line bg-card text-ink-soft/60";
              return (
                <button
                  key={origIdx}
                  type="button"
                  disabled={answered}
                  onClick={() => setPicked(origIdx)}
                  className={cls}
                >
                  {quiz.options[origIdx]}
                </button>
              );
            })}
          </div>
          {answered && (
            <div className="rounded-2xl bg-surface p-4 text-sm shadow-soft">
              <p className="leading-relaxed text-ink">{quiz.explanation}</p>
              <p className="mt-2 leading-relaxed text-ink-soft">
                <span className="font-semibold text-primary-strong">The plan: </span>
                {plan}
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="rounded-2xl bg-surface p-4 shadow-soft">
          <p className="font-display text-lg font-semibold text-primary-strong">
            What&apos;s your plan in this position?
          </p>
          {revealed ? (
            <p className="mt-2 leading-relaxed text-ink">{plan}</p>
          ) : (
            <p className="mt-2 text-sm text-ink-soft">
              Think it through, then reveal to check yourself.
            </p>
          )}
        </div>
      )}

      <div className="flex justify-end gap-3">
        {quiz ? (
          answered && (
            <button type="button" onClick={onContinue} className={buttonClasses("primary", "md")}>
              Got it — continue
            </button>
          )
        ) : !revealed ? (
          <button type="button" onClick={() => setRevealed(true)} className={buttonClasses("accent", "md")}>
            Reveal plan
          </button>
        ) : (
          <button type="button" onClick={onContinue} className={buttonClasses("primary", "md")}>
            Got it — continue
          </button>
        )}
      </div>
    </div>
  );
}
