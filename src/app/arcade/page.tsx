"use client";

// The Arcade lobby — a neon cabinet grid. Each live cabinet is a real route
// (/arcade/<game>) so Back returns here instead of leaving the section.

import Link from "next/link";
import { ArcadeShell } from "@/components/arcade/ArcadeShell";
import { useArcadeScores } from "@/lib/arcade/scores";

interface Cabinet {
  id: string;
  name: string;
  tag: string;
  glyph: string;
  blurb: string;
  href?: string; // set = playable
}

const CABINETS: Cabinet[] = [
  { id: "gauntlet", name: "Knight's Gauntlet", tag: "Dodge & dash", glyph: "♞", href: "/arcade/gauntlet", blurb: "Pilot a piece to the crown, dodging glowing enemy lanes." },
  { id: "tactic-rush", name: "Tactic Rush", tag: "60-sec blitz", glyph: "⚡", blurb: "Solve one-move tactics fast — build a combo." },
  { id: "square-snap", name: "Square Snap", tag: "Board vision", glyph: "◎", blurb: "Tap the called square before the timer drains." },
  { id: "hungry-knight", name: "Hungry Knight", tag: "Chess × Snake", glyph: "🍎", blurb: "Eat, grow a trail, survive." },
];

export default function ArcadePage() {
  const scores = useArcadeScores();

  return (
    <div className="space-y-5">
      <ArcadeShell>
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
          {CABINETS.map((c) => {
            const inner = (
              <>
                <div className="flex items-start justify-between">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-xl text-2xl"
                    style={{
                      background: "var(--arc-bg)",
                      border: "1px solid var(--arc-edge)",
                      color: c.href ? "#bdf3ff" : "var(--arc-dim)",
                      textShadow: c.href ? "0 0 10px var(--arc-cyan)" : undefined,
                    }}
                  >
                    {c.glyph}
                  </span>
                  <span
                    className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider"
                    style={{
                      color: c.href ? "#04121a" : "var(--arc-dim)",
                      background: c.href ? "var(--arc-lime)" : "transparent",
                      border: c.href ? undefined : "1px solid var(--arc-edge)",
                    }}
                  >
                    {c.href ? "Play" : "Soon"}
                  </span>
                </div>
                <h2 className="mt-3 font-display text-xl font-bold" style={{ color: "var(--arc-text)" }}>{c.name}</h2>
                <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: "var(--arc-magenta)" }}>{c.tag}</p>
                <p className="mt-1.5 text-sm" style={{ color: "var(--arc-dim)" }}>{c.blurb}</p>
              </>
            );
            const cls = "group relative block overflow-hidden rounded-2xl p-5 text-left transition active:scale-[0.99]";
            const style: React.CSSProperties = {
              background: "var(--arc-panel)",
              border: `1px solid ${c.href ? "var(--arc-cyan)" : "var(--arc-edge)"}`,
              boxShadow: c.href ? "0 0 22px rgba(34,227,255,0.18)" : undefined,
              opacity: c.href ? 1 : 0.62,
            };
            return c.href ? (
              <Link key={c.id} href={c.href} className={cls} style={style}>{inner}</Link>
            ) : (
              <div key={c.id} className={cls} style={{ ...style, cursor: "default" }}>{inner}</div>
            );
          })}
        </div>

        <p className="mt-6 font-mono text-xs" style={{ color: "var(--arc-dim)" }}>
          High score {scores.bestScore.toLocaleString()} · best Level {scores.bestLevel}
        </p>
      </ArcadeShell>
    </div>
  );
}
