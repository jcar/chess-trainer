"use client";

// Inline-SVG character portraits for "Pip & the Grey" — one friendly face per
// cast member, built in the same grammar as PipMascot (a chess-piece silhouette
// with eyes + a mood mouth). No image assets. A `colorAmount` (0 grey … 1 full)
// drives a grayscale filter so a piece can render asleep/grey and "wake" into
// color as the child restores its land.

import type { CharacterId } from "@/content/kids/characters";
import { CHARACTERS } from "@/content/kids/characters";
import { CHARACTER_IMAGES } from "@/lib/art/portraitManifest";
import { withBasePath } from "@/lib/basePath";

type Mood = "idle" | "happy" | "worried" | "sly";

interface Props {
  id: CharacterId;
  size?: number;
  mood?: Mood;
  /** 0 = fully grey (asleep), 1 = full color. Defaults to 1. */
  colorAmount?: number;
  /** Shorthand for colorAmount = 0. */
  desaturated?: boolean;
  className?: string;
}

/** Eyes + a mouth that changes with mood. Shared by every (non-bird) portrait. */
function Face({ mood, cx = 50, cy = 40 }: { mood: Mood; cx?: number; cy?: number }) {
  return (
    <>
      <circle cx={cx - 6} cy={cy} r="2.6" fill="#0f172a" />
      <circle cx={cx + 6} cy={cy} r="2.6" fill="#0f172a" />
      {mood === "happy" ? (
        <path
          d={`M${cx - 7} ${cy + 6} Q${cx} ${cy + 14} ${cx + 7} ${cy + 6}`}
          fill="none"
          stroke="#0f172a"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      ) : mood === "worried" ? (
        <path
          d={`M${cx - 6} ${cy + 10} Q${cx} ${cy + 5} ${cx + 6} ${cy + 10}`}
          fill="none"
          stroke="#0f172a"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      ) : mood === "sly" ? (
        <path
          d={`M${cx - 7} ${cy + 7} Q${cx + 2} ${cy + 11} ${cx + 8} ${cy + 5}`}
          fill="none"
          stroke="#0f172a"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      ) : (
        <path
          d={`M${cx - 6} ${cy + 7} Q${cx} ${cy + 11} ${cx + 6} ${cy + 7}`}
          fill="none"
          stroke="#0f172a"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      )}
    </>
  );
}

/** Per-character silhouette. `c` is the accent color; `tint` a lighter head fill. */
function Body({ id, c, tint, mood }: { id: CharacterId; c: string; tint: string; mood: Mood }) {
  const stroke = c;
  switch (id) {
    case "pip":
    case "caller":
      // A pawn: round head on a flared base (Pip is our hero; the Caller shares
      // the friendly pawn look with a little sparkle topper).
      return (
        <>
          <path
            d="M32 86 Q36 62 44 56 Q36 50 44 42 Q36 34 50 30 Q64 34 56 42 Q64 50 56 56 Q64 62 68 86 Z"
            fill={tint}
            stroke={stroke}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="32" r="15" fill={tint} stroke={stroke} strokeWidth="3" />
          {id === "caller" && (
            <path
              d="M50 6 l2.2 5 5.2.6 -3.9 3.6 1 5.1 -4.5-2.5 -4.5 2.5 1-5.1 -3.9-3.6 5.2-.6z"
              fill={c}
            />
          )}
          <Face mood={mood} cx={50} cy={30} />
        </>
      );
    case "rookwell":
      // A rook: castle tower with crenellations.
      return (
        <>
          <path
            d="M30 86 L32 50 H68 L70 86 Z"
            fill={tint}
            stroke={stroke}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M30 50 V36 H37 V42 H45 V36 H55 V42 H63 V36 H70 V50 Z"
            fill={tint}
            stroke={stroke}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <Face mood={mood} cx={50} cy={62} />
        </>
      );
    case "belle":
      // A bishop: mitre with the classic slit.
      return (
        <>
          <path
            d="M34 86 Q38 60 50 26 Q62 60 66 86 Z"
            fill={tint}
            stroke={stroke}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="50" cy="24" r="5" fill={tint} stroke={stroke} strokeWidth="3" />
          <path d="M46 44 L54 52" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          <Face mood={mood} cx={50} cy={60} />
        </>
      );
    case "nim":
      // A knight: the classic chess horse-head profile (facing left), with an
      // ear, a flowing mane down the neck, a muzzle, eye and nostril.
      return (
        <>
          <path
            d="M36 88 L38 58 Q31 58 26 62 Q19 56 28 50 Q33 47 40 46 L42 38 Q44 27 55 25 L50 14 L60 26 Q73 33 69 56 L70 88 Z"
            fill={tint}
            stroke={stroke}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* mane down the back of the neck */}
          <path d="M56 26 Q66 32 64 54" fill="none" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
          {/* eye */}
          <circle cx="46" cy="43" r="2.6" fill="#0f172a" />
          {/* nostril / mouth on the muzzle */}
          <path d="M29 55 Q34 58 39 56" fill="none" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" />
        </>
      );
    case "aurora":
      // A queen: rounded crown with points + beads.
      return (
        <>
          <path
            d="M32 86 Q36 60 44 54 H56 Q64 60 68 86 Z"
            fill={tint}
            stroke={stroke}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M38 54 L34 34 L42 44 L50 30 L58 44 L66 34 L62 54 Z"
            fill={tint}
            stroke={stroke}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="34" cy="33" r="2.6" fill={c} />
          <circle cx="50" cy="29" r="2.6" fill={c} />
          <circle cx="66" cy="33" r="2.6" fill={c} />
          <Face mood={mood} cx={50} cy={64} />
        </>
      );
    case "cedric":
      // A king: crown topped with a cross.
      return (
        <>
          <path
            d="M32 86 Q36 60 44 54 H56 Q64 60 68 86 Z"
            fill={tint}
            stroke={stroke}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M36 54 L34 38 L43 46 L50 38 L57 46 L66 38 L64 54 Z"
            fill={tint}
            stroke={stroke}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path d="M50 38 V26 M45 31 H55" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          <Face mood={mood} cx={50} cy={64} />
        </>
      );
    case "murk":
      // The trickster magpie (facing left): round body, white belly, a long
      // pointed tail behind, a head with a sharp beak, and a beady eye.
      return (
        <>
          {/* tail, behind to the lower right */}
          <path d="M66 56 L88 86 L62 70 Z" fill="#111827" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
          {/* body */}
          <ellipse cx="52" cy="58" rx="20" ry="16" fill="#1f2937" stroke={stroke} strokeWidth="3" />
          {/* white belly patch */}
          <path d="M43 50 Q57 49 61 65 Q52 71 43 67 Z" fill="#e5e7eb" />
          {/* head */}
          <circle cx="40" cy="39" r="13" fill="#1f2937" stroke={stroke} strokeWidth="3" />
          {/* beak, pointing left */}
          <path d="M27 38 L12 35 L27 45 Z" fill="#f59e0b" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
          {/* eye */}
          <circle cx="41" cy="36" r="3" fill="#fde68a" />
          <circle cx="40.5" cy="36.5" r="1.3" fill="#0f172a" />
        </>
      );
  }
}

export function CharacterPortrait({
  id,
  size = 72,
  mood = "idle",
  colorAmount,
  desaturated,
  className = "",
}: Props) {
  const c = CHARACTERS[id];
  const amount = desaturated ? 0 : colorAmount ?? 1;
  // A lighter tint of the accent color for head/body fills.
  const tint = lighten(c.color, 0.55);
  const imageFile = CHARACTER_IMAGES[id];

  return (
    <span
      className={`inline-flex shrink-0 ${className}`}
      style={{
        filter: amount < 1 ? `grayscale(${Math.round((1 - amount) * 100)}%)` : undefined,
        transition: "filter 700ms ease",
      }}
    >
      {imageFile ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={withBasePath(`/images/characters/${imageFile}`)}
          alt={`${c.name}, ${c.role}`}
          width={size}
          height={size}
          className="rounded-full object-cover ring-2 ring-white/70"
          style={{ width: size, height: size }}
        />
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          role="img"
          aria-label={`${c.name}, ${c.role}`}
        >
          <ellipse cx="50" cy="90" rx="30" ry="7" fill={c.color} opacity="0.18" />
          <Body id={id} c={c.color} tint={tint} mood={mood} />
        </svg>
      )}
    </span>
  );
}

/** Mix a hex color toward white by `amount` (0..1). Keeps portraits soft. */
function lighten(hex: string, amount: number): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const mix = (ch: number) => Math.round(ch + (255 - ch) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}
