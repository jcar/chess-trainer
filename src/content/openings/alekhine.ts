import type { Opening } from "./types";

// Alekhine Defence — original prose; lines are standard public theory.
export const alekhine: Opening = {
  id: "alekhine",
  name: "Alekhine Defence",
  eco: "B02–B05",
  family: "1e4-other",
  trainerColor: "black",
  firstMoves: "1.e4 Nf6",
  character:
    "A daring, hypermodern reply to 1.e4. Black ignores the centre and instead " +
    "pokes White's e-pawn with the knight, inviting the pawns forward. The plan " +
    "is to let White build an impressive-looking pawn front, then attack and " +
    "undermine it from the wings — if the centre overextends, it becomes a " +
    "target rather than a strength.",
  whitePlan:
    "Accept the invitation to expand: chase the knight with pawns, occupy the " +
    "centre with broad gains of space, and try to convert that space into a " +
    "lasting bind before Black can chip the pawns away.",
  blackPlan:
    "Provoke the pawns forward, retreat the knight to safe squares, and then " +
    "strike at the overextended centre with breaks like ...d6 and ...c5 or " +
    "...f6, proving the pawns are weak and winning them as targets.",
  tabiyaFen:
    "rnbqkb1r/pppppppp/8/3nP3/8/8/PPPP1PPP/RNBQKBNR w KQkq - 1 3",
  lines: [
    {
      label: "Modern Variation",
      sans: [
        "e4", "Nf6", "e5", "Nd5", "d4", "d6",
        "Nf3", "dxe5", "Nxe5", "g6", "Be2", "Bg7",
      ],
      notes: [
        "White takes the centre.",
        "The Alekhine: the knight pokes the e-pawn instead of fighting for the centre.",
        "Chasing the knight — exactly what Black invited.",
        "Retreating to a safe, active outpost.",
        "Building the broad centre.",
        "Striking at the head of the pawn chain at once.",
        "The Modern, calm approach: simple development over more pawn pushes.",
        "Black resolves the centre tension.",
        "Recapturing with the knight.",
        "Preparing to fianchetto and pressure the long diagonal.",
        "A flexible, solid developing move.",
        "The bishop bears down on White's centre — Black is ready to undermine it.",
      ],
    },
    {
      label: "Four Pawns Attack",
      sans: [
        "e4", "Nf6", "e5", "Nd5", "d4", "d6",
        "c4", "Nb6", "f4", "dxe5", "fxe5", "Nc6",
      ],
      notes: [
        "White takes the centre.",
        "The Alekhine.",
        "Chasing the knight.",
        "Retreating to d5.",
        "Building the centre.",
        "Hitting the chain at its head.",
        "The most ambitious try: kicking the knight again to grab even more space.",
        "The knight steps back to b6, eyeing c4 and d5.",
        "The Four Pawns Attack: a huge, aggressive but loose pawn front.",
        "Black challenges the centre, opening the d-file.",
        "Recapturing and keeping the big chain.",
        "Developing with pressure on the overextended d4 and e5 pawns.",
      ],
    },
  ],
};
