"use client";

// Concept card: a short read-only teaching screen shown first in a lesson, so
// the idea is explained before it's quizzed. Renders a couple of short
// paragraphs, optional key points, and optional display-only diagrams, then a
// "Got it" button that marks it complete. In kid mode the text is bigger and a
// SpeakButton reads it aloud (pre-readers).

import type { ConceptActivity } from "@/content/types";
import { MiniBoard } from "@/components/board/MiniBoard";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { buttonClasses } from "@/components/ui/Button";
import { CheckIcon } from "@/components/icons";

interface Props {
  activity: ConceptActivity;
  onComplete: (score: number) => void;
  kidMode?: boolean;
}

export function ConceptPlayer({ activity, onComplete, kidMode = false }: Props) {
  const paragraphs = activity.body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  const speakText = [activity.body, ...(activity.points ?? [])].join(". ");

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
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brass"
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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onComplete(100)}
          className={buttonClasses("primary", kidMode ? "kid" : "lg")}
        >
          Got it <CheckIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
