"use client";

// Practice set: solve many short puzzles in a row. Master the skill by getting
// `requiredCorrect` right. Lots of varied reps in one activity — the rigor
// backbone. Each item plays like a mini puzzle (tap-to-move + Show me! + sounds).

import { useState } from "react";
import type { PracticeSetActivity } from "@/content/types";
import { ChessGame, uciToMove, kingInCheckSquare } from "@/lib/chess/game";
import { Board } from "@/components/board/Board";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";
import { buttonClasses } from "@/components/ui/Button";
import { StarIcon } from "@/components/icons";

interface Props {
  activity: PracticeSetActivity;
  onComplete: (score: number) => void;
}

export function PracticeSetPlayer({ activity, onComplete }: Props) {
  const items = activity.items;
  const [itemIdx, setItemIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [fen, setFen] = useState(items[0]?.fen ?? "");
  const [solIdx, setSolIdx] = useState(0);
  const [arrowHint, setArrowHint] = useState<{ from: string; to: string }[]>([]);
  const [feedback, setFeedback] = useState(items[0]?.prompt ?? "");
  const [mastered, setMastered] = useState(false);

  const item = items[itemIdx];
  const needed = activity.requiredCorrect;

  function loadItem(idx: number) {
    const it = items[idx % items.length];
    setItemIdx(idx % items.length);
    setFen(it.fen);
    setSolIdx(0);
    setArrowHint([]);
    setFeedback(it.prompt);
  }

  function showMe() {
    const expected = item.solution[solIdx];
    if (!expected) return;
    playSound("select");
    setArrowHint([{ from: expected.slice(0, 2), to: expected.slice(2, 4) }]);
    setTimeout(() => setArrowHint([]), 2200);
  }

  function handleMove(from: string, to: string): boolean {
    if (mastered) return false;
    const expected = item.solution[solIdx];
    if (!expected || expected.slice(0, 4) !== `${from}${to}`) {
      playSound("tryAgain");
      setFeedback("Good try — tap a piece to see its moves, or use Show me!");
      return false;
    }

    const game = new ChessGame(fen);
    const result = game.tryMove(uciToMove(expected));
    if (!result.ok) return false;
    setArrowHint([]);
    setFen(result.fen);
    playSound(result.san?.includes("x") ? "capture" : "move");

    const next = solIdx + 1;
    if (next >= item.solution.length) {
      // Item solved.
      const nowCorrect = correct + 1;
      setCorrect(nowCorrect);
      if (nowCorrect >= needed) {
        setMastered(true);
        setFeedback("You mastered it! ⭐");
        playSound("success");
        onComplete(100);
      } else {
        playSound("success");
        setFeedback("Nice! Here's another one…");
        setTimeout(() => loadItem(itemIdx + 1), 700);
      }
      return true;
    }

    // Auto-play the opponent's reply.
    const reply = item.solution[next];
    setFeedback("Good move! Keep going…");
    setTimeout(() => {
      const r2 = new ChessGame(result.fen).tryMove(uciToMove(reply));
      if (r2.ok) {
        setFen(r2.fen);
        playSound(r2.san?.includes("x") ? "capture" : "move");
        setSolIdx(next + 1);
      }
    }, 400);
    setSolIdx(next);
    return true;
  }

  const danger = kingInCheckSquare(fen);

  return (
    <div className="space-y-4">
      {/* Progress pips */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: needed }, (_, i) => (
          <StarIcon
            key={i}
            className={`h-6 w-6 ${i < correct ? "text-accent" : "text-ink/15"}`}
          />
        ))}
        <span className="ml-2 text-base font-bold text-ink-soft">
          {correct}/{needed} to master!
        </span>
      </div>

      <Board
        fen={fen}
        orientation={item.orientation}
        onDrop={handleMove}
        interactive={!mastered}
        arrows={arrowHint}
        dangerSquares={danger ? [danger] : []}
        getLegalMoves={
          !mastered ? (sq) => new ChessGame(fen).legalDestinations(sq) : undefined
        }
        onMove={(from, to) => void handleMove(from, to)}
        onSelect={() => playSound("select")}
      />

      <div className="flex items-start gap-3 rounded-2xl bg-surface p-4 text-lg shadow-soft">
        <p className="flex-1 text-ink">{feedback}</p>
        <SpeakButton text={feedback} size="sm" />
      </div>

      {!mastered && (
        <button
          type="button"
          onClick={showMe}
          className={buttonClasses("accent", "kid")}
        >
          Show me!
        </button>
      )}
    </div>
  );
}
