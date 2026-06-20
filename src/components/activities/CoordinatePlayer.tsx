"use client";

// Coordinates game: "Find e4." An empty board with notation hidden; the child
// taps the named square. A few rounds, then done. Builds board vision.

import { useState } from "react";
import type { CoordinateActivity } from "@/content/types";
import { Board } from "@/components/board/Board";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { playSound } from "@/lib/audio/sounds";

const EMPTY_FEN = "8/8/8/8/8/8/8/8 w - - 0 1";

interface Props {
  activity: CoordinateActivity;
  onComplete: (score: number) => void;
}

export function CoordinatePlayer({ activity, onComplete }: Props) {
  const [round, setRound] = useState(0);
  const [wrong, setWrong] = useState<string[]>([]);
  const done = round >= activity.rounds.length;
  const target = done ? null : activity.rounds[round];

  function handleTap(square: string) {
    if (done || !target) return;
    if (square === target) {
      playSound("star");
      setWrong([]);
      const next = round + 1;
      setRound(next);
      if (next >= activity.rounds.length) {
        playSound("success");
        onComplete(100);
      }
    } else {
      playSound("tryAgain");
      setWrong([square]);
    }
  }

  const prompt = done
    ? activity.successText
    : `Find the square: ${target}`;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-2xl bg-kid-teal/10 p-4 text-2xl font-extrabold text-walnut-deep">
        <p className="flex-1 font-display">{done ? activity.successText : `Find: ${target}`}</p>
        <SpeakButton text={prompt} />
      </div>

      <Board
        fen={EMPTY_FEN}
        orientation={activity.orientation}
        interactive={false}
        showNotation={false}
        onSquareTap={handleTap}
        dangerSquares={wrong}
      />

      <p className="text-center text-base font-bold text-ink-soft">
        {done
          ? "Great job — you know your squares!"
          : `Round ${round + 1} of ${activity.rounds.length} — tap square ${target}!`}
      </p>
    </div>
  );
}
