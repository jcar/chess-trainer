// Curated must-know endgame positions for the Endgame Trainer. Each is played
// out against Stockfish (which defends), reusing the DrillPlayer loop. All are
// engine-verified as winning for the side to move (white).

import type { DrillObjective, Orientation } from "@/content/types";

export interface EndgamePosition {
  id: string;
  name: string;
  category: string;
  fen: string;
  orientation: Orientation;
  objective: DrillObjective;
  /** Stockfish skill 0–20 for the defender. */
  engineSkill: number;
  instructions: string;
  successText: string;
}

export const ENDGAMES: EndgamePosition[] = [
  // ---- Basic Checkmates ----
  {
    id: "kq-mate",
    name: "King + Queen vs King",
    category: "Basic Checkmates",
    fen: "4k3/8/8/8/8/8/8/3QK3 w - - 0 1",
    orientation: "white",
    objective: "checkmate",
    engineSkill: 16,
    instructions:
      "Walk the enemy king to the edge using your queen a knight's-move away, bring your king up, then mate. Careful not to stalemate — always leave the king one square until the mating move.",
    successText: "Checkmate! That's the fundamental queen technique — every player must own it.",
  },
  {
    id: "kr-mate",
    name: "King + Rook vs King",
    category: "Basic Checkmates",
    fen: "4k3/8/8/8/8/8/8/R3K3 w - - 0 1",
    orientation: "white",
    objective: "checkmate",
    engineSkill: 16,
    instructions:
      "Box the king toward the edge with your rook, march your own king up to oppose it, then deliver mate on the back rank.",
    successText: "Checkmate! King + rook is the most important mate to know cold.",
  },
  {
    id: "two-rooks-mate",
    name: "Two Rooks vs King (the ladder)",
    category: "Basic Checkmates",
    fen: "4k3/8/8/8/8/8/8/R3K2R w KQ - 0 1",
    orientation: "white",
    objective: "checkmate",
    engineSkill: 14,
    instructions:
      "Roll the king up the board with a rook 'ladder' — cut it off on one rank, check on the next, and repeat until mate.",
    successText: "Mate! The two-rook ladder is the quickest checkmate to learn.",
  },
  // ---- King & Pawn ----
  {
    id: "kp-opposition",
    name: "King + Pawn vs King",
    category: "King & Pawn",
    fen: "4k3/8/4K3/4P3/8/8/8/8 w - - 0 1",
    orientation: "white",
    objective: "promote",
    engineSkill: 16,
    instructions:
      "Escort the pawn to promotion. Lead with your KING, not the pawn, and take the opposition to force a path through.",
    successText: "Promoted! Leading with the king and using the opposition is the key to all pawn endings.",
  },
  {
    id: "connected-passers",
    name: "Two Connected Passed Pawns",
    category: "King & Pawn",
    fen: "8/8/8/8/3k4/8/3PP3/4K3 w - - 0 1",
    orientation: "white",
    objective: "promote",
    engineSkill: 14,
    instructions:
      "Two connected passed pawns beat a lone king. Advance them side by side so they defend each other, and never let the king win one for free — promote one.",
    successText: "Promoted! Connected passers are a powerhouse — advance them as a team.",
  },
];

export const ENDGAME_CATEGORIES: string[] = [
  ...new Set(ENDGAMES.map((e) => e.category)),
];
