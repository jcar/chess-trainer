import type { Opening } from "./types";

// King's Gambit — original prose; lines are standard public theory.
export const kingsGambit: Opening = {
  id: "kings-gambit",
  name: "King's Gambit",
  eco: "C30–C39",
  family: "1e4-e5",
  trainerColor: "white",
  firstMoves: "1.e4 e5 2.f4",
  character:
    "One of the boldest and oldest openings: White offers a pawn on the very " +
    "second move to blow open the f-file and grab the centre. It is romantic, " +
    "attacking chess where the initiative matters more than material. Risky and " +
    "double-edged, it rewards courage and sharp calculation.",
  whitePlan:
    "Tempt Black into ...exf4, then build a big pawn centre and open the f-file " +
    "for the rook. Develop the kingside fast, often castle, and throw pieces at " +
    "Black's king before the extra pawn can be consolidated.",
  blackPlan:
    "Either grab the gambit pawn and try to hold it with ...g5, returning it " +
    "later for a good game, or simply decline with ...Bc5 and develop soundly " +
    "while White's kingside stays loose.",
  tabiyaFen:
    "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq - 0 2",
  lines: [
    {
      label: "Kieseritzky Gambit",
      sans: [
        "e4", "e5", "f4", "exf4", "Nf3", "g5",
        "h4", "g4", "Ne5", "Nf6",
      ],
      notes: [
        "White claims the centre.",
        "Black answers symmetrically.",
        "The gambit: offering the f-pawn to open lines and seize the centre.",
        "Black accepts the pawn.",
        "Developing and stopping the annoying ...Qh4+.",
        "Black grabs space and tries to hold the extra pawn.",
        "Striking at the pawn chain before it gets comfortable.",
        "The pawn advances, kicking the knight.",
        "The knight leaps into the centre — the Kieseritzky.",
        "Black develops and hits e4, keeping a tense, double-edged fight.",
      ],
    },
    {
      label: "King's Gambit Declined",
      sans: [
        "e4", "e5", "f4", "Bc5", "Nf3", "d6",
        "Nc3", "Nf6", "Bc4", "Nc6",
      ],
      notes: [
        "White claims the centre.",
        "Black answers symmetrically.",
        "The gambit offer.",
        "Declining: the bishop eyes f2 and discourages an easy fxe5.",
        "Developing and guarding against ...Qh4+.",
        "Solidly supporting e5 and opening the bishop.",
        "Developing the second knight and supporting the centre.",
        "Black develops naturally.",
        "Aiming the bishop at f7.",
        "Black completes development; a tense but more positional game.",
      ],
    },
  ],
};
