"use client";

// Illustrated storybook backdrops for story scenes (Pip & the Grey). Pure inline
// SVG (no assets, CSP-safe). One scene per land. A `colorAmount` (0 grey … 1
// full) drives a grayscale filter so a "hook" scene can open in the drained Grey
// and a "resolve" scene blooms back into color.

import type { SceneBackdropId } from "@/content/types";

export const SCENE_BACKDROPS: SceneBackdropId[] = [
  "kingdom",
  "meadow",
  "heights",
  "road",
  "forest",
  "throne",
];

export function isKnownBackdrop(id: string): id is SceneBackdropId {
  return (SCENE_BACKDROPS as string[]).includes(id);
}

interface Props {
  backdrop: SceneBackdropId;
  /** 0 = fully grey, 1 = full color. Defaults to 1. */
  colorAmount?: number;
  className?: string;
}

/** A soft checkerboard ground strip — the kingdom is made of 64 squares. */
function Checker({ y, light, dark }: { y: number; light: string; dark: string }) {
  const cells = [];
  for (let i = 0; i < 8; i++) {
    cells.push(
      <rect key={i} x={i * 40} y={y} width="40" height="40" fill={i % 2 === 0 ? light : dark} />,
    );
  }
  return <g>{cells}</g>;
}

function Scene({ backdrop }: { backdrop: SceneBackdropId }) {
  switch (backdrop) {
    case "kingdom":
      return (
        <>
          <rect width="320" height="180" fill="#bfe3ff" />
          <circle cx="262" cy="40" r="20" fill="#ffe08a" />
          <Checker y={140} light="#f1e7d2" dark="#c7a973" />
          {/* castle */}
          <g fill="#9aa6c4" stroke="#5b6b8f" strokeWidth="2">
            <rect x="120" y="70" width="80" height="72" />
            <rect x="108" y="58" width="20" height="84" />
            <rect x="192" y="58" width="20" height="84" />
            <path d="M108 58h20v-10h-20zM192 58h20v-10h-20zM120 70h80v-10h-80z" />
          </g>
          <rect x="150" y="104" width="20" height="38" fill="#5b6b8f" />
          <path d="M118 48l6-14 6 14zM194 48l6-14 6 14z" fill="#e86a5c" />
        </>
      );
    case "meadow":
      return (
        <>
          <rect width="320" height="180" fill="#cdeffb" />
          <circle cx="58" cy="42" r="18" fill="#ffe08a" />
          <path d="M0 150 Q80 120 160 148 T320 150 V180 H0 Z" fill="#9bce6f" />
          <path d="M0 165 Q90 150 200 168 T320 166 V180 H0 Z" fill="#7fb457" />
          {/* flowers */}
          <g>
            <circle cx="60" cy="160" r="4" fill="#e86a5c" />
            <circle cx="120" cy="170" r="4" fill="#f2b705" />
            <circle cx="240" cy="162" r="4" fill="#d6669e" />
            <circle cx="290" cy="172" r="4" fill="#e86a5c" />
          </g>
        </>
      );
    case "heights":
      return (
        <>
          <rect width="320" height="180" fill="#d7e9ff" />
          {/* mountain ramparts */}
          <path d="M0 180 L70 70 L120 120 L180 50 L240 110 L320 60 V180 Z" fill="#8fa0c6" />
          <path d="M0 180 L60 110 L130 150 L210 95 L320 140 V180 Z" fill="#6c7fae" />
          {/* clouds */}
          <g fill="#ffffff" opacity="0.9">
            <ellipse cx="80" cy="40" rx="26" ry="12" />
            <ellipse cx="250" cy="34" rx="30" ry="13" />
          </g>
          {/* flag at the peak */}
          <rect x="180" y="30" width="3" height="24" fill="#5b6b8f" />
          <path d="M183 30h18l-5 6 5 6h-18z" fill="#e86a5c" />
        </>
      );
    case "road":
      return (
        <>
          <rect width="320" height="180" fill="#ffe9c7" />
          <circle cx="260" cy="44" r="20" fill="#ffd166" />
          <path d="M0 180 L120 90 H200 L320 180 Z" fill="#d9b173" />
          <path d="M150 90 L150 180 M130 130 H190 M120 160 H210" stroke="#b98a4a" strokeWidth="4" fill="none" />
          {/* banners along the road */}
          <g>
            <rect x="60" y="120" width="3" height="40" fill="#5b6b8f" />
            <path d="M63 120h16l-4 6 4 6h-16z" fill="#5aa469" />
            <rect x="255" y="120" width="3" height="40" fill="#5b6b8f" />
            <path d="M258 120h16l-4 6 4 6h-16z" fill="#d6669e" />
          </g>
        </>
      );
    case "forest":
      return (
        <>
          <rect width="320" height="180" fill="#c7e6d8" />
          <path d="M0 180 H320 V150 Q160 130 0 150 Z" fill="#5f8f6e" />
          {/* layered trees */}
          <g>
            {[30, 90, 150, 210, 270].map((x, i) => (
              <g key={i}>
                <rect x={x - 4} y={110} width="8" height="40" fill="#7a5230" />
                <path d={`M${x - 26} 120 L${x} 60 L${x + 26} 120 Z`} fill="#3f7a55" />
                <path d={`M${x - 22} 100 L${x} 56 L${x + 22} 100 Z`} fill="#4f9269" />
              </g>
            ))}
          </g>
          {/* peeking eyes in the shadows */}
          <circle cx="184" cy="96" r="3" fill="#fde68a" />
          <circle cx="196" cy="96" r="3" fill="#fde68a" />
        </>
      );
    case "throne":
      return (
        <>
          <rect width="320" height="180" fill="#f3e0ff" />
          <Checker y={150} light="#efe3d0" dark="#c9ab78" />
          {/* carpet */}
          <path d="M130 150 L150 90 H170 L190 150 Z" fill="#c0506a" />
          {/* throne */}
          <g fill="#caa45a" stroke="#a07d33" strokeWidth="2">
            <rect x="138" y="60" width="44" height="60" rx="4" />
            <rect x="132" y="108" width="56" height="12" />
            <path d="M138 60 L142 38 L150 56 L160 34 L170 56 L178 38 L182 60 Z" />
          </g>
          {/* sparkles */}
          <g fill="#f6c454">
            <path d="M70 50l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
            <path d="M250 60l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
          </g>
        </>
      );
  }
}

export function SceneArt({ backdrop, colorAmount = 1, className = "" }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-2xl shadow-soft ${className}`}
      style={{
        filter: colorAmount < 1 ? `grayscale(${Math.round((1 - colorAmount) * 100)}%)` : undefined,
        transition: "filter 700ms ease",
      }}
    >
      <svg
        viewBox="0 0 320 180"
        width="100%"
        role="img"
        aria-label={`A storybook scene: ${backdrop}`}
        className="block"
      >
        <Scene backdrop={backdrop} />
      </svg>
    </div>
  );
}
