import type { Opening } from "./types";

// Queen's Gambit Accepted — original prose; lines are standard public theory.
export const queensGambitAccepted: Opening = {
  id: "queens-gambit-accepted",
  name: "Queen's Gambit Accepted",
  eco: "D20–D29",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 d5 2.c4 dxc4",
  character:
    "Black accepts the gambit pawn on c4 — but the point is not greed. The " +
    "captured pawn is hard to hold, so Black treats it as a loan: grab it, " +
    "develop the pieces freely, and hand it back at the right moment in " +
    "exchange for an easy, active game and the freeing ...c5 break.",
  whitePlan:
    "Recapture the c4-pawn at leisure (usually with the bishop), build a broad " +
    "centre with e3 and pieces on natural squares, and use the extra central " +
    "space to press for the initiative.",
  blackPlan:
    "Don't cling to the extra pawn — develop quickly, complete kingside " +
    "castling, and strike at White's centre with a well-timed ...c5 (and often " +
    "...a6 to gain queenside space), giving the pawn back for free play.",
  tabiyaFen:
    "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
  lines: [
    {
      label: "Main Line",
      sans: [
        "d4", "d5", "c4", "dxc4", "Nf3", "Nf6",
        "e3", "e6", "Bxc4", "c5", "O-O", "a6",
      ],
      notes: [
        "White claims the centre and opens lines.",
        "Black challenges the centre at once.",
        "The Queen's Gambit — offering the c-pawn to deflect Black's d-pawn.",
        "Black accepts, planning to return the pawn for easy development.",
        "Developing and stopping any ...e5 freeing break for now.",
        "A natural developing move that eyes the centre.",
        "Opening the bishop's path to recapture on c4.",
        "Solidly supporting the centre and freeing the bishop.",
        "White regains the gambit pawn with a well-placed bishop.",
        "The thematic break — striking at White's centre immediately.",
        "King safety first.",
        "Gaining queenside space and preparing ...b5 to chase the bishop.",
      ],
    },
    {
      label: "Central Variation (3.e4)",
      sans: [
        "d4", "d5", "c4", "dxc4", "e4", "e5",
        "Nf3", "exd4", "Bxc4", "Nc6",
      ],
      notes: [
        "White claims the centre.",
        "Black challenges it immediately.",
        "The gambit, deflecting the d-pawn.",
        "Black accepts the pawn.",
        "The ambitious central try — grabbing the whole centre at once.",
        "Black hits back in the centre before White gets settled.",
        "Developing and attacking the e5-pawn.",
        "Capturing rather than defending — opening the position.",
        "Regaining the gambit pawn with active development.",
        "Developing and pressing the loose d4-pawn.",
      ],
    },
  ],
};
