"use client";

// The Arcade — a neon cabinet lobby. Knight's Gauntlet is live; the other cabinets
// are teasers the lobby is already built to host. Top-level room (in the rail).

import { useState } from "react";
import { ArcadeShell } from "@/components/arcade/ArcadeShell";
import { GauntletGame } from "@/components/arcade/GauntletGame";
import { useArcadeScores } from "@/lib/arcade/scores";

interface Cabinet {
  id: string;
  name: string;
  tag: string;
  glyph: string;
  blurb: string;
  live: boolean;
}

const CABINETS: Cabinet[] = [
  { id: "gauntlet", name: "Knight's Gauntlet", tag: "Dodge & dash", glyph: "♞", live: true, blurb: "Pilot a piece to the crown, dodging glowing enemy lanes." },
  { id: "tactic-rush", name: "Tactic Rush", tag: "60-sec blitz", glyph: "⚡", live: false, blurb: "Solve one-move tactics fast — build a combo." },
  { id: "square-snap", name: "Square Snap", tag: "Board vision", glyph: "◎", live: false, blurb: "Tap the called square before the timer drains." },
  { id: "hungry-knight", name: "Hungry Knight", tag: "Chess × Snake", glyph: "🍎", live: false, blurb: "Eat, grow a trail, survive." },
];

export default function ArcadePage() {
  const [game, setGame] = useState<string | null>(null);
  const scores = useArcadeScores();

  return (
    <div className="space-y-5">
      <ArcadeShell>
        {game === "gauntlet" ? (
          <GauntletGame onExit={() => setGame(null)} />
        ) : (
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "var(--arc-cyan)" }}>
              Insert coin
            </p>
            <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight" style={{ color: "var(--arc-text)", textShadow: "0 0 18px rgba(34,227,255,0.35)" }}>
              The Arcade
            </h1>
            <p className="mt-2 max-w-lg text-sm" style={{ color: "var(--arc-dim)" }}>
              Chess, but a real arcade. Score-chase cabinets that sharpen your board
              vision while you go for the high score.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {CABINETS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  disabled={!c.live}
                  onClick={() => c.live && setGame(c.id)}
                  className="group relative overflow-hidden rounded-2xl p-5 text-left transition active:scale-[0.99]"
                  style={{
                    background: "var(--arc-panel)",
                    border: `1px solid ${c.live ? "var(--arc-cyan)" : "var(--arc-edge)"}`,
                    boxShadow: c.live ? "0 0 22px rgba(34,227,255,0.18)" : undefined,
                    cursor: c.live ? "pointer" : "default",
                    opacity: c.live ? 1 : 0.62,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-xl text-2xl"
                      style={{
                        background: "var(--arc-bg)",
                        border: "1px solid var(--arc-edge)",
                        color: c.live ? "#bdf3ff" : "var(--arc-dim)",
                        textShadow: c.live ? "0 0 10px var(--arc-cyan)" : undefined,
                      }}
                    >
                      {c.glyph}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
                      style={{
                        color: c.live ? "#04121a" : "var(--arc-dim)",
                        background: c.live ? "var(--arc-lime)" : "transparent",
                        border: c.live ? undefined : "1px solid var(--arc-edge)",
                      }}
                    >
                      {c.live ? "Play" : "Soon"}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-xl font-bold" style={{ color: "var(--arc-text)" }}>
                    {c.name}
                  </h2>
                  <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--arc-magenta)" }}>
                    {c.tag}
                  </p>
                  <p className="mt-1.5 text-sm" style={{ color: "var(--arc-dim)" }}>{c.blurb}</p>
                </button>
              ))}
            </div>

            <p className="mt-6 font-mono text-xs" style={{ color: "var(--arc-dim)" }}>
              High score {scores.bestScore.toLocaleString()} · best Level {scores.bestLevel}
            </p>
          </div>
        )}
      </ArcadeShell>
    </div>
  );
}
