"use client";

// A speaker on/off toggle for kid mode, bound to the readAloud preference
// (default ON). When on, the story + prompts read themselves aloud (useAutoRead);
// SpeakButton remains for manual replay. Turning off stops any clip; turning on
// primes audio (it's a user gesture) so it works immediately.

import { useKidsPrefs, setKidsPrefs } from "@/lib/kids/prefs";
import { stopSpeaking, primeAudio, speechSupported } from "@/lib/audio/speech";

export function ReadAloudToggle({ size = "sm" }: { size?: "lg" | "sm" }) {
  const { readAloud } = useKidsPrefs();
  if (!speechSupported()) return null;
  const dim = size === "lg" ? "h-12 w-12" : "h-9 w-9";
  const icon = size === "lg" ? "h-6 w-6" : "h-5 w-5";

  function toggle() {
    const next = !readAloud;
    setKidsPrefs({ readAloud: next });
    if (next) primeAudio();
    else stopSpeaking();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={readAloud}
      aria-label={readAloud ? "Turn read-aloud off" : "Turn read-aloud on"}
      title={readAloud ? "Pip reads aloud — on" : "Read aloud — off"}
      className={`grid ${dim} shrink-0 place-items-center rounded-full transition active:scale-95 ${
        readAloud
          ? "bg-kid-teal text-white shadow-soft"
          : "border border-line bg-card text-ink-soft hover:text-ink"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={icon} aria-hidden>
        <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
        {readAloud ? (
          <>
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 6a9 9 0 0 1 0 12" />
          </>
        ) : (
          <path d="M22 9l-6 6M16 9l6 6" />
        )}
      </svg>
    </button>
  );
}
