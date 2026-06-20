"use client";

// Pip — an original, friendly pawn-with-a-face guide for young learners.
// Three moods change the expression; "cheer" adds a happy bounce. Pure inline
// SVG (no assets). Pip is our own character (not from any book).

type Mood = "idle" | "cheer" | "think";

interface Props {
  mood?: Mood;
  /** Pixel size of the mascot. */
  size?: number;
  /** Optional speech-bubble text shown beside Pip. */
  says?: string;
}

export function PipMascot({ mood = "idle", size = 72, says }: Props) {
  return (
    <div className="flex items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label="Pip the pawn"
        style={
          mood === "cheer"
            ? { animation: "kidBounce 0.5s ease-in-out 3" }
            : undefined
        }
      >
        {/* Body */}
        <ellipse cx="50" cy="86" rx="30" ry="9" fill="#0ea5e9" opacity="0.25" />
        <path
          d="M30 84 Q34 60 42 54 Q34 48 42 40 Q34 30 50 24 Q66 30 58 40 Q66 48 58 54 Q66 60 70 84 Z"
          fill="#38bdf8"
          stroke="#0284c7"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Head */}
        <circle cx="50" cy="26" r="15" fill="#7dd3fc" stroke="#0284c7" strokeWidth="3" />
        {/* Eyes */}
        <circle cx="44" cy="24" r="2.6" fill="#0f172a" />
        <circle cx="56" cy="24" r="2.6" fill="#0f172a" />
        {/* Mouth changes with mood */}
        {mood === "cheer" ? (
          <path d="M43 30 Q50 38 57 30" fill="none" stroke="#0f172a" strokeWidth="2.6" strokeLinecap="round" />
        ) : mood === "think" ? (
          <circle cx="50" cy="32" r="2" fill="#0f172a" />
        ) : (
          <path d="M44 31 Q50 35 56 31" fill="none" stroke="#0f172a" strokeWidth="2.6" strokeLinecap="round" />
        )}
        {/* Cheeks when cheering */}
        {mood === "cheer" && (
          <>
            <circle cx="39" cy="29" r="2.4" fill="#fda4af" opacity="0.8" />
            <circle cx="61" cy="29" r="2.4" fill="#fda4af" opacity="0.8" />
          </>
        )}
      </svg>
      {says && (
        <div className="relative rounded-2xl bg-white px-4 py-2 text-lg font-bold text-sky-900 shadow">
          {says}
        </div>
      )}
    </div>
  );
}
