// "Chess Fundamentals" (Beginner). Eight original lessons; every position
// engine-verified by `npm run validate`. The Intermediate module continues it.

import type { Module } from "../../types";
import { ch1 } from "./ch1";
import { ch2 } from "./ch2";
import { ch3 } from "./ch3";
import { ch4 } from "./ch4";
import { ch5 } from "./ch5";
import { ch6 } from "./ch6";
import { ch7 } from "./ch7";
import { ch8 } from "./ch8";

export const fundamentals: Module = {
  id: "fundamentals",
  title: "Chess Fundamentals",
  description:
    "The beginner's path: how to win, opening principles, the basic checkmates, draws, tactics, and strategy. Hands-on, with engine-verified puzzles.",
  level: "Beginner",
  lessons: [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8],
};
