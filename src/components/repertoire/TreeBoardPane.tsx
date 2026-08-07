"use client";

// The board beside the repertoire outline. Selecting a row does NOT jump the
// board to that position — it plays through the intervening moves at reading
// speed. Watching the order arrive is the training; a jump would hide it.

import { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Board } from "@/components/board/Board";
import { Chip } from "@/components/ui/Chip";
import type { Orientation } from "@/content/types";

const STEP_MS = 130;

function fensFor(path: string[]): { fens: string[]; moves: { from: string; to: string }[] } {
  const game = new Chess();
  const fens = [game.fen()];
  const moves: { from: string; to: string }[] = [];
  for (const san of path) {
    try {
      const mv = game.move(san);
      moves.push({ from: mv.from, to: mv.to });
      fens.push(game.fen());
    } catch {
      break;
    }
  }
  return { fens, moves };
}

export function TreeBoardPane({
  path,
  orientation,
  note,
  caption,
  onCrumb,
}: {
  path: string[];
  orientation: Orientation;
  note?: string;
  caption?: string;
  onCrumb?: (upTo: number) => void;
}) {
  const { fens, moves } = fensFor(path);
  const target = fens.length - 1;
  const [shown, setShown] = useState(target);
  const prevPath = useRef<string>(path.join(" "));

  // Animate toward the target position one ply at a time. setState lives in a
  // timer callback (not the effect body) — the same shape as EvalBar's debounce,
  // which keeps react-hooks/set-state-in-effect happy.
  useEffect(() => {
    const sig = path.join(" ");
    const changed = sig !== prevPath.current;
    prevPath.current = sig;
    if (changed) {
      // Start from the deepest shared prefix so a sibling switch doesn't rewind
      // all the way to the initial position.
      setShown((cur) => Math.min(cur, target));
    }
  }, [path, target]);

  useEffect(() => {
    if (shown === target) return;
    const t = setTimeout(() => {
      setShown((s) => (s < target ? s + 1 : s > target ? s - 1 : s));
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [shown, target]);

  const idx = Math.max(0, Math.min(shown, fens.length - 1));
  const last = idx > 0 ? moves[idx - 1] : undefined;

  return (
    <div className="space-y-3">
      <Board
        fen={fens[idx]}
        orientation={orientation}
        interactive={false}
        lastMove={last ? { from: last.from, to: last.to, mine: false } : undefined}
      />

      {path.length > 0 && (
        <div className="flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-ink-soft">
          {path.map((san, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onCrumb?.(i + 1)}
              className={`transition hover:text-primary-strong ${
                i + 1 === idx ? "font-bold text-primary-strong" : ""
              }`}
            >
              {i % 2 === 0 ? `${Math.ceil((i + 1) / 2)}.` : ""}
              {san}
            </button>
          ))}
        </div>
      )}

      {caption && (
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="primary">{caption}</Chip>
        </div>
      )}
      {note && <p className="text-sm leading-relaxed text-ink-soft">{note}</p>}
    </div>
  );
}
