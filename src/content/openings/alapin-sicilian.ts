import type { Opening } from "./types";

// Alapin Sicilian (2.c3) — original prose; lines are standard public theory.
export const alapinSicilian: Opening = {
  id: "alapin-sicilian",
  name: "Alapin Sicilian (2.c3)",
  eco: "B22",
  family: "1e4-other",
  trainerColor: "white",
  tier: "explorer",
  firstMoves: "1.e4 c5 2.c3",
  character:
    "An anti-Sicilian for players who'd rather build a big centre than memorize " +
    "razor-sharp main lines. With 2.c3 White prepares d2–d4 fully supported, " +
    "reaching open, classical positions — often an isolated-queen-pawn middlegame " +
    "where White's freer development and central space give an easy game.",
  whitePlan:
    "Play c3 and d4 to occupy the centre, develop quickly (Nf3, Bishops out, " +
    "castle), and use the central space and active pieces to press — frequently " +
    "in IQP-style positions with kingside attacking chances.",
  blackPlan:
    "Strike at the centre early — with ...d5 to trade White's e-pawn, or ...Nf6 " +
    "to hit e4 — and aim to blockade or win the isolated d-pawn in the endgame.",
  tabiyaFen:
    "rnbqkbnr/pp1ppppp/8/2p5/4P3/2P5/PP1P1PPP/RNBQKBNR b KQkq - 0 2",
  lines: [
    {
      label: "vs 2...d5",
      sans: ["e4", "c5", "c3", "d5", "exd5", "Qxd5", "d4", "Nc6", "Nf3"],
      notes: [
        "Claiming the centre.",
        "The Sicilian.",
        "The Alapin: prepare d2–d4 with full pawn support.",
        "A principled try — hitting the centre before White completes it.",
        "Capturing.",
        "Black recaptures with the queen.",
        "Building the centre with tempo; the queen will be harried later.",
        "Black develops.",
        "Developing and preparing to chase the queen with tempo — easy play for White.",
      ],
    },
    {
      label: "vs 2...Nf6",
      sans: ["e4", "c5", "c3", "Nf6", "e5", "Nd5", "d4", "cxd4", "Nf3"],
      notes: [
        "Claiming the centre.",
        "The Sicilian.",
        "The Alapin.",
        "Attacking e4 immediately.",
        "Push! The knight must move and White grabs central space.",
        "The knight hops to its best square.",
        "Building the broad centre.",
        "Black trades to relieve the tension.",
        "Developing and preparing to recapture on d4, with a pleasant space edge.",
      ],
    },
  ],
};
