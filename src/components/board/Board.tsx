"use client";

// Responsive wrapper around react-chessboard v5. Centralizes the v5 `options`
// API and our board styling. Supports two input modes:
//   • drag (always, when interactive) via onDrop
//   • tap-to-move (when getLegalMoves + onMove are provided) — tap a piece to
//     light up its legal squares as dots, then tap a square to move. This is the
//     friendly path for young children / small fingers.

import { useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import type { Orientation } from "@/content/types";

export interface BoardProps {
  /** Current position as a FEN string. */
  fen: string;
  orientation: Orientation;
  /**
   * Called when the user drops a piece. Return true to accept the move, false
   * to snap it back.
   */
  onDrop?: (sourceSquare: string, targetSquare: string) => boolean;
  /** When false, pieces can't be dragged (e.g. guided replay). */
  interactive?: boolean;
  /** Optional square highlights merged under selection/hint styling. */
  squareStyles?: Record<string, React.CSSProperties>;
  /**
   * Enables tap-to-move. Given a square, return the legal destination squares
   * for the piece there (empty array if none / not movable).
   */
  getLegalMoves?: (square: string) => string[];
  /** Called when a tap-to-move completes. */
  onMove?: (from: string, to: string) => void;
  /** Called when a piece is selected by tapping (e.g. to play a sound). */
  onSelect?: (square: string) => void;
  /** Squares to emphasize as a hint (e.g. the correct move's from/to). */
  highlightSquares?: string[];
  /** Arrows to draw, e.g. a move (from→to) or a piece's movement pattern. */
  arrows?: { from: string; to: string; color?: string }[];
  /** Squares to flash red as a "danger!" cue (e.g. a king in check). */
  dangerSquares?: string[];
  /**
   * Raw square-tap handler (used by the coordinates game). When provided it
   * takes precedence over tap-to-move.
   */
  onSquareTap?: (square: string) => void;
  /** Show file/rank notation (default true). Hidden for the coordinates game. */
  showNotation?: boolean;
}

/** Which squares are occupied, parsed from a FEN's piece-placement field. */
function occupiedSquares(fen: string): Set<string> {
  const out = new Set<string>();
  const placement = fen.split(" ")[0] ?? "";
  const ranks = placement.split("/");
  for (let r = 0; r < ranks.length; r++) {
    let file = 0;
    for (const ch of ranks[r]) {
      if (/\d/.test(ch)) {
        file += Number(ch);
      } else {
        const sq = "abcdefgh"[file] + (8 - r);
        out.add(sq);
        file += 1;
      }
    }
  }
  return out;
}

const DOT_STYLE: React.CSSProperties = {
  background:
    "radial-gradient(circle, rgba(16,185,129,0.65) 24%, transparent 26%)",
};
const CAPTURE_STYLE: React.CSSProperties = {
  background:
    "radial-gradient(circle, transparent 62%, rgba(16,185,129,0.7) 64%)",
  borderRadius: "50%",
};
const SELECTED_STYLE: React.CSSProperties = {
  background: "rgba(250, 204, 21, 0.55)",
};
const HINT_STYLE: React.CSSProperties = {
  background: "rgba(251, 146, 60, 0.7)",
  boxShadow: "inset 0 0 0 4px rgba(234,88,12,0.9)",
};

const DANGER_STYLE: React.CSSProperties = {
  animation: "kidDanger 0.8s ease-in-out infinite",
};

export function Board({
  fen,
  orientation,
  onDrop,
  interactive = true,
  squareStyles,
  getLegalMoves,
  onMove,
  onSelect,
  highlightSquares,
  arrows,
  dangerSquares,
  onSquareTap,
  showNotation = true,
}: BoardProps) {
  const tapEnabled = Boolean(getLegalMoves && onMove);
  // The selection is tied to the position it was made on; if the FEN changes
  // (a move was played, or Reset), the selection is treated as cleared. This
  // derives the cleared state instead of clearing it in an effect.
  const [sel, setSel] = useState<{ square: string; fen: string } | null>(null);
  const selected = sel && sel.fen === fen ? sel.square : null;

  const selectedDests = useMemo(
    () => (selected && getLegalMoves ? getLegalMoves(selected) : []),
    [selected, getLegalMoves],
  );

  const computedStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = { ...(squareStyles ?? {}) };
    const occupied = selectedDests.length ? occupiedSquares(fen) : null;
    for (const sq of selectedDests) {
      styles[sq] = occupied?.has(sq) ? CAPTURE_STYLE : DOT_STYLE;
    }
    if (selected) styles[selected] = { ...styles[selected], ...SELECTED_STYLE };
    for (const sq of highlightSquares ?? []) {
      styles[sq] = { ...styles[sq], ...HINT_STYLE };
    }
    for (const sq of dangerSquares ?? []) {
      styles[sq] = { ...styles[sq], ...DANGER_STYLE };
    }
    return styles;
  }, [squareStyles, selectedDests, selected, highlightSquares, dangerSquares, fen]);

  const boardArrows = useMemo(
    () =>
      (arrows ?? []).map((a) => ({
        startSquare: a.from,
        endSquare: a.to,
        color: a.color ?? "#f97316", // friendly orange
      })),
    [arrows],
  );

  function handleSquareClick(square: string) {
    if (!tapEnabled || !getLegalMoves || !onMove) return;
    if (selected && selectedDests.includes(square)) {
      const from = selected;
      setSel(null);
      onMove(from, square);
      return;
    }
    const dests = getLegalMoves(square);
    if (dests.length) {
      setSel({ square, fen });
      onSelect?.(square);
    } else {
      setSel(null);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[min(92vw,560px)] touch-none select-none">
      <Chessboard
        options={{
          position: fen,
          boardOrientation: orientation,
          allowDragging: interactive,
          showAnimations: true,
          animationDurationInMs: 200,
          squareStyles: computedStyles,
          arrows: boardArrows,
          showNotation,
          darkSquareStyle: { backgroundColor: "#769656" },
          lightSquareStyle: { backgroundColor: "#eeeed2" },
          onSquareClick: onSquareTap
            ? ({ square }) => onSquareTap(square)
            : tapEnabled
              ? ({ square }) => handleSquareClick(square)
              : undefined,
          onPieceDrop: ({ sourceSquare, targetSquare }) => {
            if (!onDrop || !targetSquare) return false;
            return onDrop(sourceSquare, targetSquare);
          },
        }}
      />
    </div>
  );
}
