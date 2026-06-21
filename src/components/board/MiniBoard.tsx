"use client";

// A small, non-interactive board for picture-answer options. Renders a display
// FEN plus optional arrows. Pointer events are disabled so taps fall through to
// a wrapping button.

import { Chessboard } from "react-chessboard";
import type { Orientation } from "@/content/types";

interface Props {
  fen: string;
  orientation?: Orientation;
  arrows?: { from: string; to: string; color?: string }[];
}

export function MiniBoard({ fen, orientation = "white", arrows = [] }: Props) {
  return (
    <div className="pointer-events-none w-full">
      <Chessboard
        options={{
          position: fen,
          boardOrientation: orientation,
          allowDragging: false,
          showAnimations: false,
          showNotation: false,
          darkSquareStyle: { backgroundColor: "#7c93b5" },
          lightSquareStyle: { backgroundColor: "#e6ecf5" },
          arrows: arrows.map((a) => ({
            startSquare: a.from,
            endSquare: a.to,
            color: a.color ?? "#3b82f6",
          })),
        }}
      />
    </div>
  );
}
