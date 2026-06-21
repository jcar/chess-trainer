"use client";

// "Move to the ⭐" / "Collect the stars" — a single piece and one or more target
// squares. Tap the piece to light up its moves, tap a target to move there.
// Collect them all to finish. Geometric movement (display-only board).
//
// Optional arcade extras (all backward-compatible — absent = classic behavior):
//   • prey: an emoji shown on each target ("gobble the 🍎").
//   • avoidSquares: red squares that end the attempt if landed on.
//   • moveBudget: "do it in N hops!"; running out resets the attempt.

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
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const budget = activity.moveBudget;
  const avoid = activity.avoidSquares ?? [];
  const remaining = activity.targets.filter((t) => !collected.includes(t));

  // Render the hero piece; if prey is configured we don't need extra pieces
  // (prey shows as an emoji overlay on the target squares instead).
  const fen = singlePieceFen(activity.piece, square);

  const squareStyles: Record<string, React.CSSProperties> = {};
  for (const t of remaining) squareStyles[t] = TARGET_STYLE;

  function reset(message: string) {
    setSquare(activity.square);
    setCollected([]);
    setMoves(0);
    setNote(message);
    playSound("tryAgain");
  }

  function handleMove(from: string, to: string) {
    if (done) return;

    // Stepped on a red "avoid" square → reset the attempt.
    if (avoid.includes(to)) {
      reset("Oops — that square wasn't safe! Try again. 🙂");
      return;
    }

    setSquare(to);
    const usedMoves = moves + 1;
    setMoves(usedMoves);
    setNote(null);

    const gotTarget = activity.targets.includes(to) && !collected.includes(to);
    let nextCollected = collected;
    if (gotTarget) {
      nextCollected = [...collected, to];
      setCollected(nextCollected);
      playSound("star");
    } else {
      playSound("move");
    }

    if (nextCollected.length === activity.targets.length) {
      setDone(true);
      playSound("success");
      onComplete(100);
      return;
    }

    // Out of moves without finishing → reset.
    if (budget && usedMoves >= budget) {
      reset(`Out of hops! You have ${budget}. Give it another go!`);
    }
  }

  const headerText = done ? activity.successText : note ?? activity.intro;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-2xl bg-accent/10 p-4 text-lg text-primary-strong">
        <p className="flex-1">{headerText}</p>
        <SpeakButton text={headerText} size="sm" />
      </div>

      <div className="relative">
        <Board
          fen={fen}
          orientation={activity.orientation}
          interactive={false}
          squareStyles={squareStyles}
          dangerSquares={avoid}
          getLegalMoves={(sq) =>
            !done && sq === square ? pieceTargets(activity.piece, square) : []
          }
          onMove={(from, to) => handleMove(from, to)}
          onSelect={() => playSound("select")}
        />
        {/* Prey emoji overlay on uncollected targets (cosmetic). */}
        {activity.prey && !done && (
          <PreyOverlay
            targets={remaining}
            orientation={activity.orientation}
            emoji={activity.prey}
          />
        )}
      </div>

      <div className="space-y-2 text-center">
        <p className="text-base font-bold text-ink-soft">
          {done
            ? "You got them all!"
            : activity.prey
              ? `Gobble them all! (${collected.length}/${activity.targets.length})`
              : `Tap the piece, then tap a target! (${collected.length}/${activity.targets.length})`}
        </p>
        {budget && !done && (
          <p className="flex items-center justify-center gap-2 text-base font-bold text-kid-teal">
            <span className="flex gap-1" aria-hidden>
              {Array.from({ length: budget }, (_, i) => (
                <span
                  key={i}
                  className={`h-3 w-3 rounded-full ${i < moves ? "bg-ink/15" : "bg-kid-teal"}`}
                />
              ))}
            </span>
            <span>{budget - moves} hops left</span>
          </p>
        )}
      </div>
    </div>
  );
}

// Positions an emoji over each target square. The board is a square grid; with
// 8 files/ranks each cell is 12.5% of the board. Mirrors react-chessboard's
// orientation handling.
function PreyOverlay({
  targets,
  orientation,
  emoji,
}: {
  targets: string[];
  orientation: "white" | "black";
  emoji: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {targets.map((sq) => {
        const file = "abcdefgh".indexOf(sq[0]);
        const rank = Number(sq[1]) - 1;
        const col = orientation === "white" ? file : 7 - file;
        const row = orientation === "white" ? 7 - rank : rank;
        return (
          <span
            key={sq}
            className="absolute flex items-center justify-center text-2xl"
            style={{
              left: `${col * 12.5}%`,
              top: `${row * 12.5}%`,
              width: "12.5%",
              height: "12.5%",
            }}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
}
