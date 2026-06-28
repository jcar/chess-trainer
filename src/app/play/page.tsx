"use client";

// Play & Review — setup. Pick color, opponent, and coach, then start a game at
// /play/game (a real route, so Back returns here). Reads ?fen=&color= so the
// Openings Trainer can "Spar vs engine" from a position (Suspense for static export).

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Orientation } from "@/content/types";
import { ChessGame } from "@/lib/chess/game";
import { OPPONENTS } from "@/lib/play/opponents";
import { usePlayRating } from "@/lib/play/rating";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { buttonClasses } from "@/components/ui/Button";

const START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export default function PlayPage() {
  return (
    <Suspense fallback={<main className="space-y-5" />}>
      <PlaySetup />
    </Suspense>
  );
}

function PlaySetup() {
  const rating = usePlayRating();
  const router = useRouter();
  const params = useSearchParams();

  const startFen = useMemo(() => {
    const f = params.get("fen");
    if (f) {
      try { new ChessGame(f); return f; } catch { /* ignore invalid */ }
    }
    return START;
  }, [params]);
  const custom = startFen !== START;
  const startColor: Orientation =
    params.get("color") === "black" ? "black"
      : params.get("color") === "white" ? "white"
        : new ChessGame(startFen).turn === "b" ? "black" : "white";

  const [color, setColor] = useState<Orientation>(startColor);
  const [adaptive, setAdaptive] = useState(true);
  const [pickElo, setPickElo] = useState(1100);
  const [coach, setCoach] = useState(true);

  function start() {
    const elo = adaptive ? rating.rating : pickElo;
    const qs = new URLSearchParams({
      color,
      elo: String(elo),
      adaptive: adaptive ? "1" : "0",
      coach: coach ? "1" : "0",
    });
    if (custom) qs.set("fen", startFen);
    router.push(`/play/game?${qs.toString()}`);
  }

  return (
    <main className="space-y-6">
      <PageHeader
        backHref="/"
        backLabel="Home"
        eyebrow="Play"
        title="Play & Review"
        subtitle="Play a full game against the engine, then get a review that flags your biggest mistakes and shows the better move."
      />
      {custom && (
        <Card className="flex items-center gap-2 p-4 text-sm text-ink-soft">
          <Chip tone="sage">From your opening</Chip>
          Starting from the position you set up — play out the middlegame.
        </Card>
      )}
      <Card className="space-y-4 p-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Your color</p>
          <div className="flex gap-2">
            {(["white", "black"] as Orientation[]).map((c) => (
              <Pick key={c} active={color === c} onClick={() => setColor(c)}>{c === "white" ? "White" : "Black"}</Pick>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Opponent</p>
          <button
            type="button"
            onClick={() => setAdaptive(true)}
            className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3 text-left transition ${adaptive ? "border-primary bg-primary/5" : "border-line bg-card hover:border-primary/40"}`}
          >
            <span className="min-w-0">
              <span className="block font-display text-base font-semibold text-primary-strong">Adaptive</span>
              <span className="block text-sm text-ink-soft">Matches your level and adjusts as you play</span>
            </span>
            <Chip tone="sage">{rating.rating}</Chip>
          </button>
          <p className="pt-1 text-xs text-ink-soft">…or pick a fixed rating:</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {OPPONENTS.map((o) => {
              const on = !adaptive && pickElo === o.elo;
              return (
                <button
                  key={o.elo}
                  type="button"
                  onClick={() => { setAdaptive(false); setPickElo(o.elo); }}
                  className={`rounded-xl border px-3 py-2 text-left transition ${on ? "border-primary bg-primary text-on-accent" : "border-line bg-card text-ink hover:border-primary/40"}`}
                >
                  <span className="block text-base font-bold">{o.approx ? "~" : ""}{o.elo}</span>
                  <span className={`block text-xs ${on ? "text-on-accent/80" : "text-ink-soft"}`}>{o.name}</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-ink-soft/70">~ ratings below 1320 are approximate (the engine plays faster, weaker moves).</p>
        </div>
        <button
          type="button"
          onClick={() => setCoach((c) => !c)}
          className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3 text-left transition ${coach ? "border-primary bg-primary/5" : "border-line bg-card hover:border-primary/40"}`}
        >
          <span className="min-w-0">
            <span className="block font-display text-base font-semibold text-primary-strong">Move coach</span>
            <span className="block text-sm text-ink-soft">Flags a blunder the moment you play it, with a chance to take it back</span>
          </span>
          <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${coach ? "bg-sage" : "bg-ink/20"}`} aria-hidden>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${coach ? "left-[1.375rem]" : "left-0.5"}`} />
          </span>
        </button>
        <button type="button" onClick={start} className={buttonClasses("primary", "lg")}>Start game</button>
      </Card>
    </main>
  );
}

function Pick({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${active ? "border-primary bg-primary text-on-accent" : "border-line bg-card text-ink-soft hover:border-primary/40"}`}
    >
      {children}
    </button>
  );
}
