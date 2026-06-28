"use client";

// "Meet the Piece" — a single piece on an empty board. The child taps it to
// light up every square it can reach (dots) plus arrows showing the pattern,
// then can tap a lit square to move it there and explore from the new spot.
// Pure visual/tactile learning; no reading needed.

import { useState } from "react";
import type { MoveMapActivity } from "@/content/types";
import { pieceTargets, pieceArrows, singlePieceFen } from "@/lib/chess/moves";
import { Board } from "@/components/board/Board";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { moveMapSpeech } from "@/lib/audio/narration";
import { playSound } from "@/lib/audio/sounds";
import { useAutoRead } from "@/lib/audio/useAutoRead";

interface Props {
  activity: MoveMapActivity;
  onComplete: (score: number) => void;
}

export function MoveMapPlayer({ activity, onComplete }: Props) {
  const [square, setSquare] = useState(activity.square);
  const [showArrows, setShowArrows] = useState(false);
  const [explored, setExplored] = useState(false);

  const fen = singlePieceFen(activity.piece, square);
  useAutoRead(moveMapSpeech(activity));

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-2xl bg-kid-teal/10 p-4 text-lg leading-relaxed text-primary-strong">
        <p className="flex-1">
          {explored ? activity.funFact : activity.intro}
        </p>
        <SpeakButton text={moveMapSpeech(activity)} size="sm" />
      </div>

      <Board
        fen={fen}
        orientation={activity.orientation}
        interactive={false}
        arrows={showArrows ? pieceArrows(activity.piece, square) : []}
        getLegalMoves={(sq) =>
          sq === square ? pieceTargets(activity.piece, square) : []
        }
        onSelect={() => {
          setShowArrows(true);
          playSound("select");
          if (!explored) {
            setExplored(true);
            onComplete(100);
          }
        }}
        onMove={(_from, to) => {
          setSquare(to);
          setShowArrows(false);
          playSound("move");
        }}
      />

      <p className="text-center text-base font-semibold text-ink-soft">
        {showArrows
          ? "Now tap a glowing dot to move there!"
          : "Tap the piece to see where it can go!"}
      </p>
    </div>
  );
}
