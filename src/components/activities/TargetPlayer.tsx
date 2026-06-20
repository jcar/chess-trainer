"use client";

// "Move to the ⭐" / "Collect the stars" — a single piece and one or more target
// squares. Tap the piece to light up its moves, tap a gold target to move there.
// Collect them all to finish. Geometric movement (display-only board).

import { useState } from "react";
import type { TargetActivity } from "@/content/types";
import { pieceTargets, singlePieceFen } from "@/lib/chess/moves";
import { Board } from "@/components/board/Board";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";

interface Props {
  activity: TargetActivity;
  onComplete: (score: number) => void;
}

const TARGET_STYLE: React.CSSProperties = {
  background: "rgba(250, 204, 21, 0.45)",
  boxShadow: "inset 0 0 0 4px rgba(234, 179, 8, 0.95)",
};

export function TargetPlayer({ activity, onComplete }: Props) {
  const [square, setSquare] = useState(activity.square);
  const [collected, setCollected] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const remaining = activity.targets.filter((t) => !collected.includes(t));
  const fen = singlePieceFen(activity.piece, square);

  const squareStyles: Record<string, React.CSSProperties> = {};
  for (const t of remaining) squareStyles[t] = TARGET_STYLE;

  function handleMove(from: string, to: string) {
    setSquare(to);
    if (activity.targets.includes(to) && !collected.includes(to)) {
      const next = [...collected, to];
      setCollected(next);
      playSound("star");
      if (next.length === activity.targets.length) {
        setDone(true);
        playSound("success");
        onComplete(100);
      }
    } else {
      playSound("move");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 text-lg text-amber-900">
        <p className="flex-1">{done ? activity.successText : activity.intro}</p>
        <SpeakButton text={done ? activity.successText : activity.intro} size="sm" />
      </div>

      <Board
        fen={fen}
        orientation={activity.orientation}
        interactive={false}
        squareStyles={squareStyles}
        getLegalMoves={(sq) =>
          !done && sq === square ? pieceTargets(activity.piece, square) : []
        }
        onMove={(from, to) => handleMove(from, to)}
        onSelect={() => playSound("select")}
      />

      <p className="text-center text-base font-bold text-neutral-600">
        {done
          ? "You got them all! ⭐"
          : `Tap the piece, then tap a gold star! (${collected.length}/${activity.targets.length})`}
      </p>
    </div>
  );
}
