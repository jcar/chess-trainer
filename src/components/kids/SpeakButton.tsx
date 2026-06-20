"use client";

// A big, friendly "read it to me" button for young children. Tapping it reads
// the supplied text aloud (Web Speech API) and unlocks audio for sound effects.

import { speak, speechSupported } from "@/lib/audio/speech";
import { unlockAudio } from "@/lib/audio/sounds";
import { SpeakerIcon } from "@/components/icons";

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

  const dim = size === "lg" ? "h-12 w-12" : "h-9 w-9";
  const icon = size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <button
      type="button"
      aria-label="Read aloud"
      onClick={() => {
        unlockAudio();
        speak(text);
      }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-brass/15 text-brass shadow-sm transition hover:bg-brass/25 active:scale-90 ${dim} ${className}`}
    >
      <SpeakerIcon className={icon} />
    </button>
  );
}
