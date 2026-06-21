import type { Opening } from "./types";

// Sicilian Defence — original prose; lines are standard public theory.
export const sicilianDefence: Opening = {
  id: "sicilian-defence",
  name: "Sicilian Defence",
  eco: "B20–B99",
  family: "1e4-other",
  trainerColor: "black",
  tier: "core",
  firstMoves: "1.e4 c5",
  character:
    "The most popular and ambitious answer to 1.e4. Instead of mirroring with " +
    "1...e5, Black strikes at the centre from the side and refuses a symmetrical " +
    "game. Black accepts an asymmetrical fight from the very first move and plays " +
    "for the full point rather than easy equality.",
  whitePlan:
    "Open the centre with an early d4, trade the c-pawn for Black's, and use the " +
    "space and lead in development to attack — often by castling and storming " +
    "the kingside while Black is busy on the other wing.",
  blackPlan:
    "Take on d4 to trade a flank pawn for a central pawn, then develop flexibly " +
    "and counterattack on the queenside with the half-open c-file, aiming for an " +
    "unbalanced position with real winning chances.",
  tabiyaFen:
    "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
  lines: [
    {
      label: "Open Sicilian — Najdorf",
      sans: [
        "e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6",
        "Nc3", "a6", "Be2", "e5", "Nb3", "Be7", "O-O", "O-O",
      ],
      notes: [
        "White grabs the centre.",
        "The Sicilian: Black challenges from the wing instead of with ...e5.",
        "Developing and preparing the central break d4.",
        "A flexible move that supports a later ...e5 or ...e6.",
        "The defining Open Sicilian break, opening the position.",
        "Black trades the flank c-pawn for White's central d-pawn.",
        "Recapturing with the knight, which sits proudly in the centre.",
        "Developing and attacking the e4-pawn.",
        "Defending e4 and developing toward the centre.",
        "The Najdorf move: a tiny luft that controls b5 and prepares ...e5 or ...b5.",
        "A quiet, solid development of the bishop.",
        "Black seizes central space and chases the knight.",
        "Retreating to an active square that eyes the d5-hole and a5.",
        "Calm development, getting ready to castle.",
        "King safety.",
        "Black castles too; a rich, unbalanced middlegame lies ahead.",
      ],
    },
    {
      label: "Alapin Variation (2.c3)",
      sans: [
        "e4", "c5", "c3", "Nf6", "e5", "Nd5", "d4", "cxd4",
        "Nf3", "e6", "cxd4", "d6",
      ],
      notes: [
        "White grabs the centre.",
        "The Sicilian.",
        "The Alapin: White prepares d4 supported by a pawn, avoiding the Open lines.",
        "Hitting the e4-pawn at once to provoke a decision.",
        "Pushing past and gaining space, kicking the knight.",
        "The knight hops to a good central square.",
        "Building the broad pawn centre the Alapin is after.",
        "Black strikes back, trading on d4.",
        "Developing and reinforcing the centre before recapturing.",
        "A solid move that prepares to undermine White's centre.",
        "Recapturing to keep the strong d4/e5 pawn duo.",
        "Challenging the e5-pawn and opening lines for Black's pieces.",
      ],
    },
  ],
};
