"use client";

// Sparring — setup. Pick a color, an opponent, and Game vs Practice mode, then
// start a coached game from a random opening at /trainer/sparring/game (a real
// route, so Back returns here). You don't get to see which line you're facing —
// that's the point; the coach reveals it as you go.

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Orientation } from "@/content/types";
import { OPPONENTS } from "@/lib/play/opponents";
import { usePlayRating } from "@/lib/play/rating";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { buttonClasses } from "@/components/ui/Button";

export default function SparringSetupPage() {
  const rating = usePlayRating();
  const router = useRouter();

  const [color, setColor] = useState<Orientation>("white");
  const [adaptive, setAdaptive] = useState(true);
  const [pickElo, setPickElo] = useState(1500);
  const [mode, setMode] = useState<"game" | "practice">("practice");

  function start() {
    const elo = adaptive ? rating.rating : pickElo;
    const qs = new URLSearchParams({
      color,
      elo: String(elo),
      adaptive: adaptive ? "1" : "0",
      mode,
    });
    router.push(`/trainer/sparring/game?${qs.toString()}`);
  }

  return (
    <main className="space-y-6">
      <PageHeader
        backHref="/trainer"
        backLabel="Trainer"
        eyebrow="Trainer · Sparring"
        title="Sparring"
        subtitle="Play a real game from a random opening — you don't know which line you're facing. React to it, and the coach tells you where you are, whether you're still in book, and when the middlegame begins."
      />
      <Card className="space-y-4 p-5">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">You play</p>
          <div className="flex gap-2">
            {(["white", "black"] as Orientation[]).map((c) => (
              <Pick key={c} active={color === c} onClick={() => setColor(c)}>
                {c === "white" ? "White" : "Black"}
              </Pick>
            ))}
          </div>
          <p className="text-xs text-ink-soft">
            {color === "white"
              ? "The bot will answer 1.e4/1.d4/… with a different defence each game."
              : "The bot will open with a different first move each game — meet whatever comes."}
          </p>
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
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">Mode</p>
          <div className="grid gap-2 sm:grid-cols-2">
            <ModeCard
              active={mode === "practice"}
              onClick={() => setMode("practice")}
              title="Practice"
              sub="Blunders and off-book slips pause with a take-back so you can find the right move."
            />
            <ModeCard
              active={mode === "game"}
              onClick={() => setMode("game")}
              title="Game"
              sub="Moves stand — no take-backs. Slips are flagged for the review afterwards."
            />
          </div>
        </div>

        <button type="button" onClick={start} className={buttonClasses("primary", "lg")}>Start sparring</button>
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

function ModeCard({ active, onClick, title, sub }: { active: boolean; onClick: () => void; title: string; sub: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-3 text-left transition ${active ? "border-primary bg-primary/5" : "border-line bg-card hover:border-primary/40"}`}
    >
      <span className="block font-display text-base font-semibold text-primary-strong">{title}</span>
      <span className="block text-sm text-ink-soft">{sub}</span>
    </button>
  );
}
