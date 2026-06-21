import type { Opening } from "./types";

// Pirc Defence — original prose; lines are standard public theory.
export const pirc: Opening = {
  id: "pirc",
  name: "Pirc Defence",
  eco: "B07–B09",
  family: "1e4-other",
  trainerColor: "black",
  firstMoves: "1.e4 d6 2.d4 Nf6 3.Nc3 g6",
  character:
    "A flexible, hypermodern defence. Black lets White build a big pawn centre, " +
    "fianchettoes the dark-squared bishop on g7, and castles quickly behind it. " +
    "Rather than meet the centre head-on, Black waits and then strikes back with " +
    "...e5 or ...c5, counterattacking the moment the position invites it.",
  whitePlan:
    "Take the centre with e4 and d4, develop actively, and choose how hard to " +
    "press — from a calm, classical build-up to an all-out kingside pawn storm — " +
    "trying to use the extra central space before Black breaks free.",
  blackPlan:
    "Fianchetto the bishop to g7, castle, and stay compact, then hit the centre " +
    "with a well-timed ...e5 or ...c5 to free the position and turn White's " +
    "space into overextension.",
  tabiyaFen:
    "rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4",
  lines: [
    {
      label: "Classical Variation",
      sans: [
        "e4", "d6", "d4", "Nf6", "Nc3", "g6",
        "Nf3", "Bg7", "Be2", "O-O", "O-O",
      ],
      notes: [
        "White takes the centre.",
        "Black stays flexible, preparing a kingside fianchetto.",
        "Grabbing the full centre.",
        "Developing and pressuring e4.",
        "Defending e4 and developing.",
        "The Pirc set-up: clearing the way to fianchetto the bishop.",
        "The Classical, natural approach: simple development.",
        "The fianchetto — the bishop bears down the long diagonal at the centre.",
        "A solid, flexible developing move.",
        "King safety; Black is compact and ready to counter.",
        "White castles too — a balanced, classical position where the fight is on.",
      ],
    },
    {
      label: "Austrian Attack",
      sans: [
        "e4", "d6", "d4", "Nf6", "Nc3", "g6",
        "f4", "Bg7", "Nf3", "O-O", "Bd3", "Nc6",
      ],
      notes: [
        "White takes the centre.",
        "Black stays flexible.",
        "Grabbing the centre.",
        "Developing with pressure on e4.",
        "Defending and developing.",
        "Preparing the fianchetto.",
        "The Austrian Attack: White grabs maximum space and eyes a pawn storm.",
        "The bishop fianchettoes, aiming at the big centre.",
        "Developing the knight.",
        "Castling into safety behind the fianchetto.",
        "An aggressive developing square for the bishop.",
        "Developing with pressure on d4 — Black prepares the ...e5 break.",
      ],
    },
  ],
};
