"use client";

// Responsive wrapper around react-chessboard v5. Centralizes the v5 `options`
// API and our board styling. Supports two input modes:
//   • drag (always, when interactive) via onDrop
//   • tap-to-move (when getLegalMoves + onMove are provided) — tap a piece to
//     light up its legal squares as dots, then tap a square to move. This is the
//     friendly path for young children / small fingers.

import { useEffect, useMemo, useState } from "react";
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
  /**
   * The most recent move — its from + to squares get a soft "last move" tint so
   * you can see what just changed after looking away. `mine` picks the color:
   * warm gold for your move, cool slate for the opponent's.
   */
  lastMove?: { from: string; to: string; mine?: boolean };
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

// Last-move tint: electric blue for your move, violet for the opponent's
// (both clearly distinct from the slate board, the green move-dots, and each other).
const LAST_MOVE_SELF: React.CSSProperties = { background: "rgba(59,130,246,0.45)" };
const LAST_MOVE_OPP: React.CSSProperties = { background: "rgba(168,85,247,0.42)" };

// react-chessboard (via @dnd-kit) restores focus to the moved piece after a
// drag/tap using element.focus() WITHOUT { preventScroll: true }, which scrolls
// the window to the board on every move — jarring when you've scrolled down to
// play. The library exposes no option for it, so once (globally) we make focus()
// skip the scroll for elements inside a board. Scoped via the data-chessboard
// marker, so focus behaviour everywhere else is untouched. This prevents the jump
// at the source rather than undoing it afterward (no flicker / double-bounce).
let boardFocusPatched = false;
function patchBoardFocusScroll(): void {
  if (boardFocusPatched || typeof HTMLElement === "undefined") return;
  boardFocusPatched = true;
  const original = HTMLElement.prototype.focus;
  HTMLElement.prototype.focus = function focus(
    this: HTMLElement,
    options?: FocusOptions,
  ): void {
    if (this.closest?.("[data-chessboard]")) {
      original.call(this, { ...options, preventScroll: true });
    } else {
      original.call(this, options);
    }
  };
}

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
  lastMove,
  dangerSquares,
  onSquareTap,
  showNotation = true,
}: BoardProps) {
  const tapEnabled = Boolean(getLegalMoves && onMove);

  // Stop react-chessboard's post-move focus from scrolling the page to the board.
  useEffect(() => {
    patchBoardFocusScroll();
  }, []);
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
    // Last-move tint sits at the base layer so selection / hints / dots show on top.
    if (lastMove) {
      const tint = lastMove.mine ? LAST_MOVE_SELF : LAST_MOVE_OPP;
      styles[lastMove.from] = { ...styles[lastMove.from], ...tint };
      styles[lastMove.to] = { ...styles[lastMove.to], ...tint };
    }
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
  }, [squareStyles, selectedDests, selected, highlightSquares, dangerSquares, fen, lastMove]);

  const boardArrows = useMemo(
    () =>
      (arrows ?? []).map((a) => ({
        startSquare: a.from,
        endSquare: a.to,
        color: a.color ?? "#3b82f6", // accent blue
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
    <div
      data-chessboard
      className="mx-auto w-full max-w-[min(92vw,560px,72svh)] touch-none select-none"
    >
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
          darkSquareStyle: { backgroundColor: "#7c93b5" },
          lightSquareStyle: { backgroundColor: "#e6ecf5" },
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
