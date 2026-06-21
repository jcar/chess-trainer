import type { Opening } from "./types";

// English Opening — original prose; lines are standard public theory.
export const englishOpening: Opening = {
  id: "english-opening",
  name: "English Opening",
  eco: "A10–A39",
  family: "flank",
  trainerColor: "white",
  firstMoves: "1.c4",
  character:
    "A flexible, fianchetto-friendly flank opening. Instead of planting pawns " +
    "in the middle right away, White controls the centre from the side and " +
    "fights especially hard for the d5-square. It can transpose into many " +
    "other structures and often resembles a Sicilian with the colours " +
    "reversed and an extra tempo, so it rewards understanding over " +
    "memorization.",
  whitePlan:
    "Press on d5 with the c-pawn, a knight on c3, and a bishop fianchettoed " +
    "to g2. Develop flexibly, castle, and keep transpositional options open — " +
    "expanding on the queenside or breaking in the centre when the moment is " +
    "right.",
  blackPlan:
    "Contest the centre and the d5-square in return — either mirror White " +
    "symmetrically or grab the centre with ...e5 and play for a reversed " +
    "Sicilian, developing harmoniously before committing the structure.",
  tabiyaFen:
    "rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1",
  lines: [
    {
      label: "Symmetrical Variation",
      sans: [
        "c4", "c5", "Nc3", "Nc6", "g3", "g6",
        "Bg2", "Bg7", "Nf3", "Nf6", "O-O", "O-O",
      ],
      notes: [
        "Controlling the centre from the flank and fighting for d5.",
        "Black answers symmetrically, contesting d4 in return.",
        "Developing and adding a second guard to d5.",
        "Black mirrors, eyeing d4.",
        "Preparing the fianchetto that defines the English.",
        "Black follows suit on the kingside.",
        "The bishop takes the long diagonal, bearing down on d5 and the centre.",
        "Black completes a matching fianchetto.",
        "Developing the knight and controlling the central squares.",
        "Black keeps the symmetry, contesting the centre.",
        "King safety first.",
        "Both sides are castled with mirrored set-ups; the subtle fight begins.",
      ],
    },
    {
      label: "Reversed Sicilian",
      sans: [
        "c4", "e5", "Nc3", "Nf6",
        "Nf3", "Nc6", "g3", "Bb4", "Bg2", "O-O",
      ],
      notes: [
        "The English advance, fighting for d5 from the flank.",
        "Black grabs the centre — a Sicilian set-up with colours reversed.",
        "Developing and pressing on d5.",
        "Defending e5 and developing toward the centre.",
        "Adding pressure to e5 with natural development.",
        "Black defends e5 again and develops.",
        "Preparing the trademark fianchetto.",
        "Pinning the knight to ease the pressure on e5.",
        "The bishop takes the long diagonal, aiming at d5 and beyond.",
        "King safety, with a comfortable reversed-Sicilian middlegame ahead.",
      ],
    },
  ],
};
