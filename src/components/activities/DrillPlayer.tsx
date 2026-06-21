"use client";

import { useEffect, useRef, useState } from "react";
import type { DrillActivity } from "@/content/types";
import {
  ChessGame,
  uciToMove,
  kingInCheckSquare,
  type SimpleMove,
} from "@/lib/chess/game";
import { getEngine } from "@/lib/chess/stockfish";
import { Board } from "@/components/board/Board";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";
import { buttonClasses } from "@/components/ui/Button";

interface Props {
  activity: DrillActivity;
  onComplete: (score: number) => void;
  kidMode?: boolean;
  /** Enable tap-to-move without kid styling (e.g. the Endgame Trainer). */
  tapToMove?: boolean;
}

type Phase = "playing" | "thinking" | "won" | "lost";

/** Apply a learner move, retrying with queen-promotion if the plain move is illegal. */
function applyLearnerMove(fen: string, move: SimpleMove) {
  const direct = new ChessGame(fen).tryMove(move);
  if (direct.ok) return direct;
  return new ChessGame(fen).tryMove({ ...move, promotion: "q" });
}

export function DrillPlayer({
  activity,
  onComplete,
  kidMode = false,
  tapToMove = false,
}: Props) {
  const tap = tapToMove || kidMode;
  const [fen, setFen] = useState(activity.fen);
  const [phase, setPhase] = useState<Phase>("playing");
  const [message, setMessage] = useState(activity.instructions);
  const [lastMove, setLastMove] = useState<{ from: string; to: string; mine: boolean } | null>(null);
  // Guard against acting on a stale board after reset/unmount.
  const epoch = useRef(0);

  useEffect(() => {
    return () => {
      epoch.current += 1;
    };
  }, []);

  function reset() {
    epoch.current += 1;
    setFen(activity.fen);
    setPhase("playing");
    setMessage(activity.instructions);
    setLastMove(null);
  }

  function settle(status: string, mover: "learner" | "engine"): boolean {
    if (status === "checkmate") {
      if (mover === "learner" && activity.objective === "checkmate") {
        setPhase("won");
        setMessage(activity.successText);
        if (kidMode) playSound("success");
        onComplete(100);
      } else {
        setPhase("lost");
        setMessage("Your king was checkmated. Reset and try again.");
        if (kidMode) playSound("tryAgain");
      }
      return true;
    }
    if (status === "stalemate") {
      setPhase("lost");
      setMessage(
        kidMode
          ? "Oh no — that's stalemate, a tie! The king has no move but isn't in check. Tap Reset and leave it one escape square next time."
          : "Stalemate — that's only a draw. You trapped the king while it was NOT in check, so it has no legal move. Reset and try again.",
      );
      if (kidMode) playSound("tryAgain");
      return true;
    }
    return false;
  }

  async function handleMove(from: string, to: string): Promise<void> {
    if (phase !== "playing") return;

    const result = applyLearnerMove(fen, { from, to });
    if (!result.ok) return;

    setFen(result.fen);
    setLastMove({ from, to, mine: true });
    if (kidMode) playSound(result.san?.includes("x") ? "capture" : "move");
    // Pawn-race / promotion goal: the learner wins by promoting a pawn.
    if (activity.objective === "promote" && result.san?.includes("=")) {
      setPhase("won");
      setMessage(activity.successText);
      if (kidMode) playSound("success");
      onComplete(100);
      return;
    }
    if (settle(result.status, "learner")) return;

    const myEpoch = epoch.current;
    setPhase("thinking");
    setMessage(kidMode ? "The computer is thinking…" : "Engine is thinking…");

    const best = await getEngine().getBestMove(result.fen, activity.engineSkill, 400);
    if (myEpoch !== epoch.current) return;

    if (!best) {
      setPhase("playing");
      return;
    }

    const afterEngine = new ChessGame(result.fen).tryMove(uciToMove(best));
    if (afterEngine.ok) {
      setFen(afterEngine.fen);
      setLastMove({ from: best.slice(0, 2), to: best.slice(2, 4), mine: false });
      if (kidMode) playSound(afterEngine.san?.includes("x") ? "capture" : "move");
      if (!settle(afterEngine.status, "engine")) {
        setPhase("playing");
        setMessage(activity.instructions);
      }
    } else {
      setPhase("playing");
    }
  }

  // react-chessboard expects a sync boolean for drops; we kick off async work
  // and optimistically accept legal moves (fen updates either way).
  function onDrop(from: string, to: string): boolean {
    const legal = applyLearnerMove(fen, { from, to }).ok;
    if (legal) void handleMove(from, to);
    return legal;
  }

  const bannerCls =
    phase === "won"
      ? "bg-sage/10 text-sage"
      : phase === "lost"
        ? "bg-accent/10 text-primary-strong"
        : "bg-surface text-ink-soft shadow-soft";

  return (
    <div className="space-y-4">
      <Board
        fen={fen}
        orientation={activity.orientation}
        onDrop={onDrop}
        interactive={phase === "playing"}
        dangerSquares={
          kidMode && kingInCheckSquare(fen) ? [kingInCheckSquare(fen) as string] : []
        }
        getLegalMoves={
          tap && phase === "playing"
            ? (square) => new ChessGame(fen).legalDestinations(square)
            : undefined
        }
        onMove={tap ? (from, to) => void handleMove(from, to) : undefined}
        onSelect={kidMode ? () => playSound("select") : undefined}
        lastMove={lastMove ?? undefined}
      />

      <div
        className={`flex items-start gap-3 rounded-2xl p-4 leading-relaxed ${kidMode ? "text-lg" : "text-sm"} ${bannerCls}`}
      >
        <p className="flex-1">{message}</p>
        {kidMode && <SpeakButton text={message} size="sm" />}
      </div>

      <button
        type="button"
        onClick={reset}
        className={buttonClasses("secondary", kidMode ? "kid" : "md")}
      >
        Reset position
      </button>
    </div>
  );
}
