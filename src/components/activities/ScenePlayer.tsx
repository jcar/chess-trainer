"use client";

// Story scene player (Pip & the Grey). Plays a short sequence of character lines
// over an illustrated backdrop, each spoken in its character's voice. Display-
// only — no board, no chess rules. Like the concept card, its final button
// completes AND advances in one tap (so ActivityPlayer hides its own footer
// forward button for scenes).
//
// iOS-safe: speech only ever fires from a tap (the per-line SpeakButton, or the
// Back/Next buttons, which are themselves taps). No autoplay, no effects — all
// state changes happen in event handlers (keeps react-hooks/set-state-in-effect
// happy).

import { useState } from "react";
import type { SceneActivity } from "@/content/types";
import { SceneArt } from "@/components/kids/SceneArt";
import { SpeakingCharacter } from "@/components/kids/SpeakingCharacter";
import { useAutoRead } from "@/lib/audio/useAutoRead";
import { playSound, unlockAudio } from "@/lib/audio/sounds";
import { AdvanceButton } from "@/components/ui/AdvanceButton";
import { ArrowLeftIcon } from "@/components/icons";

interface Props {
  activity: SceneActivity;
  onComplete: (score: number) => void;
  /** Where the final button goes — completes AND advances in one tap. */
  advanceHref: string;
  /** Label for the final button (defaults to the activity's `cta`). */
  advanceLabel?: string;
}

export function ScenePlayer({ activity, onComplete, advanceHref, advanceLabel }: Props) {
  const lines = activity.lines;
  const [idx, setIdx] = useState(0);
  const line = lines[idx];
  const isLast = idx >= lines.length - 1;

  // Read each line aloud as it appears (the first on entry, the rest as the child
  // taps Next). Stays the story's native voice; SpeakButton remains for replay.
  useAutoRead(line.text, { characterId: line.speaker });

  function go(to: number) {
    const n = Math.max(0, Math.min(to, lines.length - 1));
    unlockAudio();
    playSound("blip");
    setIdx(n);
  }

  return (
    <div className="space-y-5">
      <SceneArt
        backdrop={activity.backdrop}
        colorAmount={activity.colorAmount ?? 1}
        sceneId={activity.id}
        alt={activity.title}
      />

      <SpeakingCharacter line={line} size={76} />

      {/* line dots */}
      <div className="flex items-center justify-center gap-1.5" aria-hidden>
        {lines.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition ${
              i === idx ? "bg-accent" : i < idx ? "bg-accent/40" : "bg-line"
            }`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => go(idx - 1)}
          disabled={idx === 0}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold transition ${
            idx === 0 ? "invisible" : "text-ink-soft hover:text-ink"
          }`}
        >
          <ArrowLeftIcon className="h-4 w-4" /> Back
        </button>

        {isLast ? (
          <AdvanceButton
            href={advanceHref}
            kind="next"
            size="kid"
            label={advanceLabel ?? activity.cta}
            testId="advance"
            onClick={() => {
              unlockAudio();
              playSound("step");
              onComplete(100);
            }}
          />
        ) : (
          <AdvanceButton
            kind="next"
            size="kid"
            label="Next"
            onClick={() => go(idx + 1)}
          />
        )}
      </div>
    </div>
  );
}
