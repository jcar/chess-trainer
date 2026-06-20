"use client";

import { useState } from "react";
import type { PuzzleActivity } from "@/content/types";
import { ChessGame, uciToMove, kingInCheckSquare } from "@/lib/chess/game";
import { Board } from "@/components/board/Board";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";

interface Props {
  activity: PuzzleActivity;
  onComplete: (score: number) => void;
  onAttempt: () => void;
  kidMode?: boolean;
}

type Feedback = { kind: "info" | "error" | "success"; text: string };

export function PuzzlePlayer({
  activity,
  onComplete,
  onAttempt,
  kidMode = false,
}: Props) {
  const [fen, setFen] = useState(activity.fen);
  const [solIndex, setSolIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>({
    kind: "info",
    text: activity.prompt,
  });
  const [solved, setSolved] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [highlight, setHighlight] = useState<string[]>([]);
  const [arrowHint, setArrowHint] = useState<{ from: string; to: string }[]>([]);

  // King-in-check flash (kid mode) — also catches the final checkmate position.
  const danger = kidMode ? kingInCheckSquare(fen) : null;

  function reset() {
    setFen(activity.fen);
    setSolIndex(0);
    setSolved(false);
    setHighlight([]);
    setArrowHint([]);
    setFeedback({ kind: "info", text: activity.prompt });
  }

  // "Show me!" — flash the from/to squares of the next correct move.
  function showMe() {
    const expected = activity.solution[solIndex];
    if (!expected) return;
    if (kidMode) playSound("select");
    const from = expected.slice(0, 2);
    const to = expected.slice(2, 4);
    setHighlight([from, to]);
    setArrowHint([{ from, to }]);
    setTimeout(() => {
      setHighlight([]);
      setArrowHint([]);
    }, 2500);
  }

  function handleMove(from: string, to: string): boolean {
    if (solved) return false;

    const expected = activity.solution[solIndex];
    if (!expected || expected.slice(0, 4) !== `${from}${to}`) {
      onAttempt();
      if (kidMode) playSound("tryAgain");
      const probe = new ChessGame(fen).tryMove({ from, to });
      setFeedback({
        kind: "error",
        text: probe.ok
          ? kidMode
            ? "Good try! That move is allowed, but it's not the answer here. Tap a piece to see where it can go!"
            : "Legal move — but not the one this puzzle is looking for. Try again."
          : kidMode
            ? "Oops — that piece can't go there. Try another move!"
            : "That move isn't legal here. Try again.",
      });
      return false;
    }

    const game = new ChessGame(fen);
    const result = game.tryMove(uciToMove(expected));
    if (!result.ok) return false;
    setHighlight([]);
    setArrowHint([]);
    setFen(result.fen);
    if (kidMode) playSound(result.san?.includes("x") ? "capture" : "move");

    const nextIndex = solIndex + 1;
    if (nextIndex >= activity.solution.length) {
      setSolIndex(nextIndex);
      setSolved(true);
      setFeedback({ kind: "success", text: activity.successText });
      if (kidMode) playSound("success");
      onComplete(100);
      return true;
    }

    const reply = activity.solution[nextIndex];
    setFeedback({
      kind: "info",
      text: kidMode ? "Great move! Keep going…" : "Good. Keep going…",
    });
    setTimeout(() => {
      const g2 = new ChessGame(result.fen);
      const r2 = g2.tryMove(uciToMove(reply));
      if (r2.ok) {
        setFen(r2.fen);
        if (kidMode) playSound(r2.san?.includes("x") ? "capture" : "move");
        const afterReply = nextIndex + 1;
        setSolIndex(afterReply);
        if (afterReply >= activity.solution.length) {
          setSolved(true);
          setFeedback({ kind: "success", text: activity.successText });
          if (kidMode) playSound("success");
          onComplete(100);
        }
      }
    }, 450);

    setSolIndex(nextIndex);
    return true;
  }

  const feedbackCls =
    feedback.kind === "success"
      ? "bg-emerald-50 text-emerald-900"
      : feedback.kind === "error"
        ? "bg-red-50 text-red-900"
        : "bg-neutral-50 text-neutral-700";

  return (
    <div className="space-y-4">
      <Board
        fen={fen}
        orientation={activity.orientation}
        onDrop={handleMove}
        interactive={!solved}
        highlightSquares={highlight}
        arrows={arrowHint}
        dangerSquares={danger ? [danger] : []}
        // Tap-to-move (kid mode): light up a piece's legal squares, tap to move.
        getLegalMoves={
          kidMode && !solved
            ? (square) => new ChessGame(fen).legalDestinations(square)
            : undefined
        }
        onMove={kidMode ? (from, to) => void handleMove(from, to) : undefined}
        onSelect={kidMode ? () => playSound("select") : undefined}
      />

      <div
        className={`flex items-start gap-3 rounded-2xl p-4 leading-relaxed ${kidMode ? "text-lg" : "text-sm"} ${feedbackCls}`}
      >
        <p className="flex-1">{feedback.text}</p>
        {kidMode && <SpeakButton text={feedback.text} size="sm" />}
      </div>

      {!kidMode && activity.hints && hintsShown > 0 && (
        <ul className="list-disc space-y-1 rounded-xl bg-amber-50 p-4 pl-8 text-sm text-amber-900">
          {activity.hints.slice(0, hintsShown).map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className={
            kidMode
              ? "rounded-2xl border-4 border-neutral-300 px-5 py-3 text-lg font-bold active:scale-95"
              : "rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-medium"
          }
        >
          ↺ Reset
        </button>

        {kidMode
          ? !solved && (
              <button
                type="button"
                onClick={showMe}
                className="rounded-2xl border-4 border-amber-300 bg-amber-100 px-5 py-3 text-lg font-bold text-amber-900 active:scale-95"
              >
                💡 Show me!
              </button>
            )
          : activity.hints &&
            hintsShown < activity.hints.length &&
            !solved && (
              <button
                type="button"
                onClick={() => setHintsShown((n) => n + 1)}
                className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-900"
              >
                Show a hint
              </button>
            )}
      </div>
    </div>
  );
}
