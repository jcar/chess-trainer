"use client";

// Dependency-free confetti burst. Bump `fireKey` (a counter) to celebrate.
// Pure render (no effect/state): pieces are positioned deterministically from
// `fireKey`, and the burst is keyed by `fireKey` so each celebration remounts
// and replays its CSS animation. `fireKey <= 0` renders nothing (and matches SSR).

const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#a855f7", "#ec4899"];
const COUNT = 60;

// Deterministic pseudo-random in [0,1) from a seed (stable across SSR/client).
function rand(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function Confetti({ fireKey }: { fireKey: number }) {
  if (fireKey <= 0) return null;

  return (
    <div
      key={fireKey}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden
    >
      {Array.from({ length: COUNT }, (_, i) => {
        const s = fireKey * 131 + i * 17;
        const left = rand(s) * 100;
        const delay = rand(s + 1) * 0.3;
        const duration = 1.2 + rand(s + 2) * 1.1;
        const color = COLORS[Math.floor(rand(s + 3) * COLORS.length)];
        const size = 8 + rand(s + 4) * 8;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: `${left}%`,
              width: size,
              height: size * 0.6,
              backgroundColor: color,
              borderRadius: 2,
              animation: `kidConfettiFall ${duration}s ease-in ${delay}s forwards`,
            }}
          />
        );
      })}
    </div>
  );
}
