"use client";

// A shared "someone is talking" panel: a character portrait, a name chip in the
// character's color, the line of text, and a tap-to-hear SpeakButton (in that
// character's voice). Used by ScenePlayer (story scenes) and ActivityPlayer
// (in-character intro/cheer/taunt around an activity).

import type { DialogueLine } from "@/content/types";
import { CHARACTERS } from "@/content/kids/characters";
import { CharacterPortrait } from "@/components/kids/CharacterPortrait";
import { SpeakButton } from "@/components/kids/SpeakButton";

interface Props {
  line: DialogueLine;
  /** Portrait size. */
  size?: number;
  /** Tone of the panel background — neutral card, or a soft warn tint for taunts. */
  tone?: "card" | "warn";
  className?: string;
}

export function SpeakingCharacter({ line, size = 64, tone = "card", className = "" }: Props) {
  const c = CHARACTERS[line.speaker];
  const bg = tone === "warn" ? "bg-kid-coral/10" : "bg-card";
  return (
    <div className={`flex items-start gap-3 rounded-2xl p-4 shadow-soft ${bg} ${className}`}>
      <CharacterPortrait id={line.speaker} size={size} mood={line.mood} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
            style={{ backgroundColor: c.color }}
          >
            {c.name}
          </span>
          <SpeakButton text={line.text} size="sm" characterId={line.speaker} />
        </div>
        <p className="mt-1.5 text-lg font-semibold leading-snug text-primary-strong">
          {line.text}
        </p>
      </div>
    </div>
  );
}
