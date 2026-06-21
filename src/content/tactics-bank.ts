// Standalone tactics bank — engine-verified, explicitly-tagged puzzles that feed
// the Tactics Trainer + Daily Puzzle pool WITHOUT living inside a lesson module.
// Every entry is verified sound + uniquely-best by `npm run validate` (which runs
// the same Stockfish soundness/uniqueness checks as for module puzzles). Add more
// here over time to grow the pool; tags are explicit (no heuristic derivation).
//
// All positions are original/generic tactical motifs (public chess knowledge).

import type { PuzzleTheme, Difficulty } from "./puzzles";
import type { Orientation, PuzzleGoal } from "./types";

export interface BankPuzzle {
  id: string;
  fen: string;
  orientation: Orientation;
  solution: string[];
  goal: PuzzleGoal;
  theme: PuzzleTheme;
  difficulty: Difficulty;
  prompt: string;
}

export const TACTICS_BANK: BankPuzzle[] = [
  {
    id: "tb-backrank-1",
    fen: "6k1/5ppp/8/8/8/8/3R2PP/6K1 w - - 0 1",
    orientation: "white",
    solution: ["d2d8"],
    goal: { type: "mate", inMoves: 1 },
    theme: "back-rank",
    difficulty: 1,
    prompt: "White to play and mate in one — the back rank is fatally weak.",
  },
  {
    id: "tb-backrank-2",
    fen: "6k1/5ppp/8/8/8/8/4R1PP/6K1 w - - 0 1",
    orientation: "white",
    solution: ["e2e8"],
    goal: { type: "mate", inMoves: 1 },
    theme: "back-rank",
    difficulty: 1,
    prompt: "White to play and mate in one.",
  },
  {
    id: "tb-royal-fork-1",
    fen: "2q3k1/pp3ppp/8/3N4/8/8/PP3PPP/6K1 w - - 0 1",
    orientation: "white",
    solution: ["d5e7", "g8f8", "e7c8"],
    goal: { type: "win-material", minGain: 3 },
    theme: "fork",
    difficulty: 2,
    prompt: "White to play and win the queen with a knight fork.",
  },
  {
    id: "tb-hanging-queen-1",
    fen: "6k1/6pp/8/q7/8/8/5PPP/R5K1 w - - 0 1",
    orientation: "white",
    solution: ["a1a5"],
    goal: { type: "win-material", minGain: 3 },
    theme: "win-material",
    difficulty: 1,
    prompt: "White to play — the black queen is undefended. Win it.",
  },
  {
    id: "tb-skewer-queen-1",
    fen: "k7/8/8/q7/8/8/8/R6K w - - 0 1",
    orientation: "white",
    solution: ["a1a5"],
    goal: { type: "win-material", minGain: 3 },
    theme: "skewer",
    difficulty: 1,
    prompt: "White to play and win the queen down the open file.",
  },
  {
    id: "tb-hanging-rook-1",
    fen: "4k3/8/8/8/r7/8/8/R3K3 w - - 0 1",
    orientation: "white",
    solution: ["a1a4"],
    goal: { type: "win-material", minGain: 3 },
    theme: "win-material",
    difficulty: 1,
    prompt: "White to play and win the rook.",
  },
  {
    id: "tb-discovered-1",
    fen: "3qk3/8/8/4N3/8/8/8/4R1K1 w - - 0 1",
    orientation: "white",
    solution: ["e5c6", "e8d7", "c6d8"],
    goal: { type: "win-material", minGain: 3 },
    theme: "discovered",
    difficulty: 2,
    prompt: "White to play — a discovered check wins the queen.",
  },
  {
    id: "tb-skewer-rook-1",
    fen: "6k1/6pp/8/8/8/r7/6PP/R5K1 w - - 0 1",
    orientation: "white",
    solution: ["a1a3"],
    goal: { type: "win-material", minGain: 3 },
    theme: "skewer",
    difficulty: 1,
    prompt: "White to play and win the rook on the open file.",
  },
  {
    id: "tb-hanging-bishop-1",
    fen: "6k1/6pp/8/8/8/2b5/2R3PP/6K1 w - - 0 1",
    orientation: "white",
    solution: ["c2c3"],
    goal: { type: "win-material", minGain: 2 },
    theme: "win-material",
    difficulty: 1,
    prompt: "White to play and win the undefended bishop.",
  },
  {
    id: "tb-knight-grabs-queen-1",
    fen: "q3k3/8/1N6/8/8/8/PP3PPP/4K3 w - - 0 1",
    orientation: "white",
    solution: ["b6a8"],
    goal: { type: "win-material", minGain: 3 },
    theme: "fork",
    difficulty: 1,
    prompt: "White to play — the knight wins the queen.",
  },
  {
    id: "tb-kr-mate-1",
    fen: "6k1/8/6K1/8/8/8/8/R7 w - - 0 1",
    orientation: "white",
    solution: ["a1a8"],
    goal: { type: "mate", inMoves: 1 },
    theme: "mate",
    difficulty: 1,
    prompt: "White to play and mate in one — king and rook box the enemy in.",
  },
  {
    id: "tb-kr-mate-2",
    fen: "k7/8/1K6/8/8/8/8/7R w - - 0 1",
    orientation: "white",
    solution: ["h1h8"],
    goal: { type: "mate", inMoves: 1 },
    theme: "mate",
    difficulty: 1,
    prompt: "White to play and mate in one.",
  },
  {
    id: "tb-hanging-knight-1",
    fen: "4k3/8/4n3/8/8/8/4R3/4K3 w - - 0 1",
    orientation: "white",
    solution: ["e2e6"],
    goal: { type: "win-material", minGain: 2 },
    theme: "win-material",
    difficulty: 1,
    prompt: "White to play and win the knight with check.",
  },
];
