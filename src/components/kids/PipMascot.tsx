"use client";

// Pip — an original, friendly pawn-with-a-face guide for young learners.
// Three moods change the expression; "cheer" adds a happy bounce. An unlockable
// outfit (from kids prefs) adds a little accessory. Pure inline SVG (no assets).
// Pip is our own character (not from any book).

import { useKidsPrefs } from "@/lib/kids/prefs";
import { getPipOutfit } from "@/lib/kids/cosmetics";

type Mood = "idle" | "cheer" | "think";

interface Props {
  mood?: Mood;
  /** Pixel size of the mascot. */
  size?: number;
  /** Optional speech-bubble text shown beside Pip. */
  says?: string;
}

export function PipMascot({ mood = "idle", size = 72, says }: Props) {
  const outfit = getPipOutfit(useKidsPrefs().pipOutfitId);
  return (
    <div className="flex items-center gap-3">
      <span className="relative inline-flex shrink-0">
        {outfit.accessory && (
          <span
            aria-hidden
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 leading-none"
            style={{ fontSize: size * 0.32 }}
          >
            {outfit.accessory}
          </span>
        )}
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
        <ellipse cx="50" cy="86" rx="30" ry="9" fill="#16959c" opacity="0.25" />
        <path
          d="M30 84 Q34 60 42 54 Q34 48 42 40 Q34 30 50 24 Q66 30 58 40 Q66 48 58 54 Q66 60 70 84 Z"
          fill="#3fc3bb"
          stroke="#0f766e"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Head */}
        <circle cx="50" cy="26" r="15" fill="#8fded7" stroke="#0f766e" strokeWidth="3" />
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
      </span>
      {says && (
        <div className="relative rounded-2xl bg-card px-4 py-2 text-lg font-bold text-primary-strong shadow-soft">
          {says}
        </div>
      )}
    </div>
  );
}
