// "Chess Fundamentals" (Beginner). Eight original lessons; every position
// engine-verified by `npm run validate`. The Intermediate module continues it.

import type { Module } from "../../types";
import { ch1 } from "./ch1";
import { ch2 } from "./ch2";
import { ch3 } from "./ch3";
import { ch4 } from "./ch4";
import { ch5 } from "./ch5";
import { pawnEndgames } from "./pawn-endgames";
import { ch6 } from "./ch6";
import { ch7 } from "./ch7";
import { ch8 } from "./ch8";
import { defense } from "./defense";
import { review1, review2, review3 } from "./reviews";

export const fundamentals: Module = {
  id: "fundamentals",
  title: "Chess Fundamentals",
  description:
    "The beginner's path: how to win, opening principles, the basic checkmates, draws, tactics, and strategy. Hands-on, with engine-verified puzzles.",
  level: "Beginner",
  // pawnEndgames inserted after the basic mates (ch5) — king-and-pawn technique is
  // a core beginner essential. Existing lesson ids are unchanged (progress safe);
  // only the visible chapter numbers in titles shift (Draws→7, Tactics→8, Strategy→9).
  // review1/2/3 are spaced-retrieval checkpoints interleaved between lessons (they
  // re-test earlier ideas from fresh angles; they carry no chapter number).
  lessons: [
    ch1, ch2, ch3,
    review1,
    ch4, ch5, pawnEndgames, ch6,
    review2,
    ch7, ch8,
    review3,
    defense,
  ],
};
