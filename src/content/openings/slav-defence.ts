import type { Opening } from "./types";

// Slav Defence — original prose; lines are standard public theory.
export const slavDefence: Opening = {
  id: "slav-defence",
  name: "Slav Defence",
  eco: "D10–D19",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 d5 2.c4 c6",
  character:
    "As solid as the Queen's Gambit Declined, but with a twist: Black supports " +
    "d5 with ...c6 instead of ...e6, leaving the light-squared bishop free to " +
    "develop actively to f5 or g4 before locking in the centre. That blend of " +
    "rock-solid structure and an active bishop has made it a favourite of " +
    "world champions.",
  whitePlan:
    "Develop the pieces, decide whether to allow ...dxc4 and chase the pawn " +
    "back with a4 and e3/Bxc4, and use the central space to press for an edge.",
  blackPlan:
    "Keep d5 supported by ...c6, get the light bishop out to f5 (or g4) before " +
    "playing ...e6, and complete development comfortably while staying solid.",
  tabiyaFen:
    "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
  lines: [
    {
      label: "Main line (4...dxc4)",
      sans: [
        "d4", "d5", "c4", "c6", "Nf3", "Nf6", "Nc3", "dxc4",
        "a4", "Bf5", "e3", "e6", "Bxc4", "Bb4",
      ],
      notes: [
        "White takes the centre.",
        "Black contests it.",
        "The Queen's Gambit.",
        "The Slav: ...c6 supports d5 and keeps the c8-bishop's diagonal open.",
        "Developing and eyeing the centre.",
        "Developing and guarding d5.",
        "Adding pressure to d5.",
        "Grabbing the pawn now that the bishop's diagonal is clear.",
        "Stopping ...b5 and preparing to round up the c4-pawn.",
        "The whole point: the bishop gets out actively before ...e6.",
        "Opening lines and preparing to recapture on c4.",
        "Now ...e6 is safe — the bishop is already outside the chain.",
        "Regaining the pawn with a healthy development edge.",
        "Pinning the knight and fighting for the centre.",
      ],
    },
    {
      label: "Exchange Variation",
      sans: [
        "d4", "d5", "c4", "c6", "cxd5", "cxd5", "Nc3", "Nf6",
        "Nf3", "Nc6", "Bf4",
      ],
      notes: [
        "White takes the centre.",
        "Black contests it.",
        "The Queen's Gambit.",
        "The Slav set-up.",
        "The Exchange: clarifying into a symmetrical structure.",
        "Recapturing, restoring the balance.",
        "Developing toward the centre.",
        "Developing and guarding d5.",
        "Natural development.",
        "Developing actively to pressure d4.",
        "Developing the bishop to its best diagonal — a quiet, solid line.",
      ],
    },
  ],
};
