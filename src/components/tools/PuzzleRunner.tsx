"use client";

// A single-puzzle solver for the tools (daily puzzle, Tactics Trainer). Tap-to-move
// AND drag always on (iPad-first), neutral adult styling, and it reports whether
// the solve was "clean" (no wrong move, no "Show me") so the SRS can schedule it.
// Same validate-against-solution + auto-reply mechanic as PuzzlePlayer/OpeningDrill.

import { useMemo, useState } from "react";
import type { TacticsPuzzle } from "@/content/puzzles";
import { ChessGame, uciToMove, kingInCheckSquare } from "@/lib/chess/game";
import { Board } from "@/components/board/Board";
import { buttonClasses } from "@/components/ui/Button";

interface Props {
  puzzle: TacticsPuzzle;
  onDone: (clean: boolean) => void;
}

type Feedback = { kind: "info" | "error" | "success"; text: string };

export function PuzzleRunner({ puzzle, onDone }: Props) {
  const [fen, setFen] = useState(puzzle.fen);
  const [solIndex, setSolIndex] = useState(0);
  const [solved, setSolved] = useState(false);
  const [clean, setClean] = useState(true);
  const [arrowHint, setArrowHint] = useState<{ from: string; to: string }[]>([]);
  const [highlight, setHighlight] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Feedback>({
    kind: "info",
    text: puzzle.prompt,
  });

  // Reset when the puzzle changes (derive from id, don't clear in an effect).
  const [seenId, setSeenId] = useState(puzzle.id);
  if (seenId !== puzzle.id) {
    setSeenId(puzzle.id);
    setFen(puzzle.fen);
    setSolIndex(0);
    setSolved(false);
    setClean(true);
    setArrowHint([]);
    setHighlight([]);
    setFeedback({ kind: "info", text: puzzle.prompt });
  }

  const danger = useMemo(() => kingInCheckSquare(fen), [fen]);
  const learnerToMove = !solved;

  function showMe() {
    const expected = puzzle.solution[solIndex];
    if (!expected || solved) return;
    setClean(false);
    const from = expected.slice(0, 2);
    const to = expected.slice(2, 4);
    setHighlight([from, to]);
    setArrowHint([{ from, to }]);
    setTimeout(() => {
      setHighlight([]);
      setArrowHint([]);
    }, 2200);
  }

  function handleMove(from: string, to: string): boolean {
    if (solved) return false;
    const expected = puzzle.solution[solIndex];
    if (!expected || expected.slice(0, 4) !== `${from}${to}`) {
      setClean(false);
      const legal = new ChessGame(fen).tryMove({ from, to }).ok;
      setFeedback({
        kind: "error",
        text: legal
          ? "Legal — but not the move the puzzle wants. Try again, or use Show me."
          : "That move isn't legal here. Try again.",
      });
      return false;
    }
    const res = new ChessGame(fen).tryMove(uciToMove(expected));
    if (!res.ok) return false;
    setArrowHint([]);
    setHighlight([]);
    setFen(res.fen);

    const next = solIndex + 1;
    if (next >= puzzle.solution.length) {
      setSolIndex(next);
      setSolved(true);
      setFeedback({ kind: "success", text: puzzle.successText ?? "Solved!" });
      onDone(clean);
      return true;
    }
    // auto-play opponent reply
    const reply = puzzle.solution[next];
    setFeedback({ kind: "info", text: "Good — keep going." });
    setTimeout(() => {
      const r2 = new ChessGame(res.fen).tryMove(uciToMove(reply));
      if (r2.ok) {
        setFen(r2.fen);
        const after = next + 1;
        setSolIndex(after);
        if (after >= puzzle.solution.length) {
          setSolved(true);
          setFeedback({ kind: "success", text: puzzle.successText ?? "Solved!" });
          onDone(clean);
        }
      }
    }, 420);
    setSolIndex(next);
    return true;
  }

  const feedbackCls =
    feedback.kind === "success"
      ? "bg-sage/10 text-sage"
      : feedback.kind === "error"
        ? "bg-clay/10 text-clay"
        : "bg-surface text-ink-soft shadow-soft";

  return (
    <div className="space-y-4">
      <Board
        fen={fen}
        orientation={puzzle.orientation}
        interactive={learnerToMove}
        onDrop={learnerToMove ? handleMove : undefined}
        getLegalMoves={
          learnerToMove
            ? (sq) => new ChessGame(fen).legalDestinations(sq)
            : undefined
        }
        onMove={learnerToMove ? (f, t) => void handleMove(f, t) : undefined}
        arrows={arrowHint}
        highlightSquares={highlight}
        dangerSquares={danger ? [danger] : []}
      />

      <div className={`rounded-2xl p-4 text-sm leading-relaxed ${feedbackCls}`}>
        {feedback.text}
      </div>

      {!solved && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={showMe}
            className={buttonClasses("secondary", "md")}
          >
            Show me
          </button>
        </div>
      )}
    </div>
  );
}
