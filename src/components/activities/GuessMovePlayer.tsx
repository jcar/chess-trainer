"use client";

// Guess the Move (adult "Try"): step a real master game forward; at chosen plies
// the learner predicts the move before it's revealed, and Stockfish scores the
// guess (exact/engine-best = full; small eval loss = partial). Then the game move
// and its idea are shown, and play continues. Teaches active calculation, not
// passive watching.

import { useMemo, useState } from "react";
import type { GuessMoveActivity } from "@/content/types";
import {
  ChessGame,
  buildReplayFens,
  replayMoveSquares,
  uciToMove,
} from "@/lib/chess/game";
import { getEngine, type Analysis } from "@/lib/chess/stockfish";
import { Board } from "@/components/board/Board";
import { StudyLayout } from "@/components/activities/StudyLayout";
import { AdvanceButton } from "@/components/ui/AdvanceButton";

interface Props {
  activity: GuessMoveActivity;
  onComplete: (score: number) => void;
}

type Tier = "full" | "good" | "ok" | "off";
interface Guess {
  san: string; // the learner's move (SAN)
  tier: Tier;
  bestSan: string | null; // engine's top move, for teaching
  matchedGame: boolean; // played the same move the master did
}

const ANALYZE_DEPTH = 12;
const TIER_PCT: Record<Tier, number> = { full: 100, good: 85, ok: 65, off: 40 };
const TIER_META: Record<Tier, { stars: string; label: string; cls: string }> = {
  full: { stars: "★★★", label: "Master move", cls: "text-sage" },
  good: { stars: "★★", label: "Strong", cls: "text-sage" },
  ok: { stars: "★", label: "Playable", cls: "text-accent" },
  off: { stars: "—", label: "Inaccurate", cls: "text-clay" },
};

/** Analysis → a single comparable centipawn number (mate mapped to a large cp). */
function cpOf(a: Analysis): number {
  if (a.mate != null) return a.mate > 0 ? 100000 - a.mate * 100 : -100000 - a.mate * 100;
  return a.cp ?? 0;
}

/** Strip decoration (+ # ! ?) so content SAN and chess.js SAN compare equal. */
function normalSan(s: string): string {
  return s.replace(/[+#!?]/g, "");
}

export function GuessMovePlayer({ activity, onComplete }: Props) {
  const sans = useMemo(() => activity.moves, [activity]);
  const fens = useMemo(
    () => buildReplayFens(sans, activity.startFen),
    [sans, activity.startFen],
  );
  const moveSquares = useMemo(
    () => replayMoveSquares(sans, activity.startFen),
    [sans, activity.startFen],
  );
  const guessSet = useMemo(() => new Set(activity.guessAt), [activity.guessAt]);

  // step = plies played so far; the position shown is fens[step].
  const [step, setStep] = useState(0);
  const [scoring, setScoring] = useState(false);
  // The revealed guess for the CURRENT step (cleared on advance).
  const [guess, setGuess] = useState<Guess | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  const total = sans.length;
  const atGuessPly = step < total && guessSet.has(step) && !guess;
  const note = step === 0 ? activity.intro : (activity.notes?.[step - 1] ?? "");

  async function handleMove(from: string, to: string): Promise<boolean> {
    if (!atGuessPly || scoring) return false;
    const before = fens[step];
    const probe = new ChessGame(before).tryMove({ from, to, promotion: "q" });
    if (!probe.ok || !probe.san) return false;

    setScoring(true);
    const engine = getEngine();
    const [bestA, afterA] = await Promise.all([
      engine.analyze(before, ANALYZE_DEPTH),
      engine.analyze(probe.fen, ANALYZE_DEPTH),
    ]);
    const bestCp = cpOf(bestA);
    const moveCp = -cpOf(afterA); // afterA is from the opponent's side to move
    const loss = Math.max(0, bestCp - moveCp);

    const matchedGame = normalSan(probe.san) === normalSan(sans[step]);
    const matchedEngine = bestA.bestMove === `${from}${to}` || bestA.bestMove === `${from}${to}q`;
    let tier: Tier;
    if (matchedGame || matchedEngine || loss <= 25) tier = "full";
    else if (loss <= 90) tier = "good";
    else if (loss <= 200) tier = "ok";
    else tier = "off";

    let bestSan: string | null = null;
    if (bestA.bestMove) {
      const r = new ChessGame(before).tryMove(uciToMove(bestA.bestMove));
      bestSan = r.ok ? (r.san ?? null) : null;
    }

    setGuess({ san: probe.san, tier, bestSan, matchedGame });
    setScores((s) => [...s, TIER_PCT[tier]]);
    setScoring(false);
    return true;
  }

  function advance() {
    if (step >= total) return;
    const nextStep = step + 1;
    setGuess(null);
    setStep(nextStep);
    if (nextStep >= total && !done) {
      setDone(true);
      const finalScores = scores.length ? scores : [100];
      const avg = Math.round(finalScores.reduce((a, b) => a + b, 0) / finalScores.length);
      onComplete(avg);
    }
  }

  // Arrows: at a guess ply, none (don't telegraph); otherwise the move just made.
  const arrows = !atGuessPly && step > 0 && moveSquares[step - 1] ? [moveSquares[step - 1]] : [];
  const turn = new ChessGame(fens[step]).turn === "w" ? "White to move" : "Black to move";
  const finished = step >= total;

  return (
    <StudyLayout
      caption={activity.source}
      board={
        <Board
          fen={fens[step]}
          orientation={activity.orientation}
          interactive={atGuessPly && !scoring}
          arrows={arrows}
          onDrop={
            atGuessPly
              ? (f, t) => {
                  void handleMove(f, t);
                  return false; // keep the board on the pre-move position; the reveal panel explains
                }
              : undefined
          }
          getLegalMoves={
            atGuessPly && !scoring
              ? (square) => new ChessGame(fens[step]).legalDestinations(square)
              : undefined
          }
          onMove={atGuessPly ? (f, t) => void handleMove(f, t) : undefined}
        />
      }
      ledger={
        <>
          {/* Prompt / note panel. */}
          <div className="rounded-2xl bg-surface p-4 text-sm leading-relaxed text-ink shadow-soft">
            {atGuessPly ? (
              <p>
                <span className="font-semibold text-primary-strong">Your move.</span>{" "}
                {scoring
                  ? "Scoring your move…"
                  : `Predict what was played here — ${turn.toLowerCase()}.`}
              </p>
            ) : (
              <p>
                {step > 0 && sans[step - 1] && (
                  <span className="mr-2 font-mono font-semibold text-accent">{sans[step - 1]}</span>
                )}
                {note || (finished ? activity.successText : "Step through the game.")}
              </p>
            )}
          </div>

          {/* Guess result. */}
          {guess && (
            <div className="rounded-2xl border border-line bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm font-semibold text-ink">
                  You played {guess.san}
                </span>
                <span className={`text-base font-bold ${TIER_META[guess.tier].cls}`}>
                  {TIER_META[guess.tier].stars} {TIER_META[guess.tier].label}
                </span>
              </div>
              <p className="mt-2 text-sm text-ink-soft">
                {guess.matchedGame
                  ? "That's the move the master chose."
                  : `The game continued ${sans[step]}.`}
                {guess.bestSan && !guess.matchedGame && guess.tier !== "full" && (
                  <> The engine prefers <span className="font-mono text-ink">{guess.bestSan}</span>.</>
                )}
              </p>
              {activity.notes?.[step] && (
                <p className="mt-2 border-t border-line pt-2 text-sm text-ink">
                  {activity.notes[step]}
                </p>
              )}
            </div>
          )}

          {/* Running score. */}
          {scores.length > 0 && (
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
              Guesses: {scores.length} / {activity.guessAt.length} · avg{" "}
              {Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)}%
            </p>
          )}

          {/* Advance. Disabled while awaiting a guess. */}
          {!finished && (
            <AdvanceButton
              onClick={advance}
              disabled={atGuessPly || scoring}
              size="lg"
              label={guess ? "Continue" : step === 0 ? "Start" : "Next"}
            />
          )}
          {finished && (
            <div className="rounded-2xl bg-sage/10 p-4 text-sm text-sage">
              {activity.successText}
            </div>
          )}
        </>
      }
    />
  );
}
