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
  {
    id: "kp-key-squares",
    name: "King + Pawn: the key squares",
    category: "King & Pawn",
    fen: "2k5/8/2K5/2P5/8/8/8/8 w - - 0 1",
    orientation: "white",
    objective: "promote",
    engineSkill: 16,
    instructions:
      "With your king two ranks ahead of the pawn, you control the 'key squares' and win no matter who has the move. Lead with the king, grab the opposition, and promote.",
    successText: "Promoted! When your king reaches the key squares ahead of the pawn, the win is automatic.",
  },
  // ---- Rook Endgames ----
  {
    id: "rook-vs-pawn",
    name: "Rook vs a Runner",
    category: "Rook Endgames",
    fen: "8/8/8/8/8/1k6/1p6/4K2R w - - 0 1",
    orientation: "white",
    objective: "checkmate",
    engineSkill: 16,
    instructions:
      "A rook beats a lone passed pawn. Use the rook to control the queening square and round the pawn up, bring your king, then mate.",
    successText: "Won! Rook behind (or in front of) the runner stops it cold — then king and rook mate.",
  },
  {
    id: "lucena-bridge",
    name: "Rook + Pawn vs Rook (the Lucena bridge)",
    category: "Rook Endgames",
    fen: "2K4r/2P5/5k2/8/8/8/8/3R4 w - - 0 1",
    orientation: "white",
    objective: "promote",
    engineSkill: 16,
    instructions:
      "The most important rook ending. 'Build a bridge': use your rook to shelter your king from the checks so the pawn can promote. (The Lucena position.)",
    successText: "Promoted! Building a bridge is THE winning technique in rook-and-pawn endings.",
  },
  // ---- Minor Pieces ----
  {
    id: "bishop-pawn-escort",
    name: "Bishop + Pawn vs King",
    category: "Minor Pieces",
    fen: "8/8/8/8/4k3/8/4PB2/4K3 w - - 0 1",
    orientation: "white",
    objective: "promote",
    engineSkill: 14,
    instructions:
      "Escort the pawn with your king and bishop. The bishop covers squares the enemy king can't, so it can never blockade you — promote.",
    successText: "Promoted! A bishop is a perfect escort — it controls squares from a distance.",
  },
  {
    id: "two-bishops-mate",
    name: "Two Bishops vs King",
    category: "Minor Pieces",
    fen: "8/8/8/4k3/8/8/3BB3/4K3 w - - 0 1",
    orientation: "white",
    objective: "checkmate",
    engineSkill: 10,
    instructions:
      "Two bishops force mate by working as a team. Keep them on neighbouring diagonals to build a wall, march your king up, and drive the enemy king into a CORNER (any corner) to deliver mate.",
    successText:
      "Checkmate! Two bishops mate in any corner — keep them side by side and let your king do the herding.",
  },
  {
    id: "bishop-knight-mate",
    name: "Bishop + Knight vs King",
    category: "Minor Pieces",
    fen: "8/8/8/4k3/8/8/4BN2/4K3 w - - 0 1",
    orientation: "white",
    objective: "checkmate",
    engineSkill: 6,
    instructions:
      "The hardest basic mate. You can only mate in a corner the BISHOP controls. Use the knight's 'W' path to herd the king along the edge to the right-coloured corner, with your king and bishop in support. Take your time.",
    successText:
      "Checkmate! Bishop + knight is the toughest fundamental mate — pulling it off means your technique is sharp.",
  },
];

export const ENDGAME_CATEGORIES: string[] = [
  ...new Set(ENDGAMES.map((e) => e.category)),
];
