"use client";

// A big, friendly "read it to me" button for young children. Tapping it reads
// the supplied text aloud (Web Speech API) and unlocks audio for sound effects.

import { speak, speechSupported } from "@/lib/audio/speech";
import { unlockAudio } from "@/lib/audio/sounds";

interface Props {
  /** The text to read aloud. */
  text: string;
  /** Optional extra classes for positioning. */
  className?: string;
  /** Smaller variant for inline use next to a line of text. */
  size?: "lg" | "sm";
}

export function SpeakButton({ text, className = "", size = "lg" }: Props) {
  // Render nothing if the browser can't speak (keeps the UI honest).
  if (typeof window !== "undefined" && !speechSupported()) return null;

  const dim = size === "lg" ? "h-12 w-12 text-2xl" : "h-9 w-9 text-lg";

  return (
    <button
      type="button"
      aria-label="Read aloud"
      onClick={() => {
        unlockAudio();
        speak(text);
      }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-amber-300 text-amber-900 shadow-sm transition active:scale-90 ${dim} ${className}`}
    >
      <span aria-hidden>🔊</span>
    </button>
  );
}
