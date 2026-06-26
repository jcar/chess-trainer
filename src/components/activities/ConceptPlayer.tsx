"use client";

// Concept card: a short read-only teaching screen shown first in a lesson, so
// the idea is explained before it's quizzed. Renders a couple of short
// paragraphs, optional key points, and optional display-only diagrams, then a
// "Got it" button that marks it complete. In kid mode the text is bigger and a
// SpeakButton reads it aloud (pre-readers).

import Link from "next/link";
import { useState } from "react";
import type { ConceptActivity } from "@/content/types";
import { MiniBoard } from "@/components/board/MiniBoard";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { conceptSpeech } from "@/lib/audio/narration";
import { ChoiceCheck } from "@/components/kids/ChoiceCheck";
import { buttonClasses } from "@/components/ui/Button";
import { ChevronRightIcon, PuzzleIcon } from "@/components/icons";

/** Build the "Practice now" href for a concept's optional handoff. */
function practiceHref(p: NonNullable<ConceptActivity["practice"]>): string {
  if (p.tool === "endgames") return "/endgames";
  if (p.tool === "play") return "/play";
  const q = new URLSearchParams();
  if (p.theme) q.set("theme", p.theme);
  if (p.maxDifficulty) q.set("max", String(p.maxDifficulty));
  const s = q.toString();
  return s ? `/tactics?${s}` : "/tactics";
}

interface Props {
  activity: ConceptActivity;
  onComplete: (score: number) => void;
  /** Where the single forward button goes — completes AND advances in one tap. */
  advanceHref: string;
  /** Label for the forward button (e.g. "Got it" mid-lesson, "All done!" at the end). */
  advanceLabel: string;
  kidMode?: boolean;
}

export function ConceptPlayer({
  activity,
  onComplete,
  advanceHref,
  advanceLabel,
  kidMode = false,
}: Props) {
  const paragraphs = activity.body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const speakText = conceptSpeech(activity);

  // Check-for-understanding (active recall) gates the advance button until
  // answered right — for every learner, not just kid mode.
  const hasCheck = !!activity.check;
  const [checkSolved, setCheckSolved] = useState(false);
  const gateOpen = !hasCheck || checkSolved;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-surface p-5 shadow-soft">
        {kidMode && (
          <div className="mb-2 flex justify-end">
            <SpeakButton text={speakText} />
          </div>
        )}
        <div className={`space-y-3 leading-relaxed text-ink ${kidMode ? "text-xl" : "text-base"}`}>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {activity.points && activity.points.length > 0 && (
          <ul className={`mt-4 space-y-2 ${kidMode ? "text-lg" : "text-sm"}`}>
            {activity.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  aria-hidden
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <span className="text-ink-soft">{pt}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {activity.diagrams && activity.diagrams.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {activity.diagrams.map((d, i) => (
            <figure key={i} className="space-y-1.5">
              <div className="mx-auto max-w-[18rem]">
                <MiniBoard fen={d.fen} orientation={d.orientation} />
              </div>
              {d.caption && (
                <figcaption className="text-center text-sm text-ink-soft">
                  {d.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {hasCheck && activity.check && (
        <div className="rounded-2xl bg-card p-5 shadow-soft">
          <ChoiceCheck
            question={activity.check.question}
            options={activity.check.options}
            correctIndex={activity.check.correctIndex}
            explanation={activity.check.explanation}
            seed={`${activity.id}:check`}
            onSolved={() => setCheckSolved(true)}
          />
        </div>
      )}

      <div className="flex flex-wrap items-center justify-end gap-3">
        {activity.practice && (
          <Link
            href={practiceHref(activity.practice)}
            className={buttonClasses("accent", kidMode ? "kid" : "lg")}
          >
            <PuzzleIcon className="h-5 w-5" /> {activity.practice.label ?? "Practice now"}
          </Link>
        )}
        {gateOpen ? (
          <Link
            href={advanceHref}
            onClick={() => onComplete(100)}
            data-testid="advance"
            className={buttonClasses("primary", kidMode ? "kid" : "lg")}
          >
            {advanceLabel} <ChevronRightIcon className="h-5 w-5" />
          </Link>
        ) : (
          <span className="text-sm font-medium text-ink-soft/70">
            Answer the question to keep going!
          </span>
        )}
      </div>
    </div>
  );
}
