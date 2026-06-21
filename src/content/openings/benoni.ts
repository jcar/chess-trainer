import type { Opening } from "./types";

// Benoni Defence — original prose; lines are standard public theory.
export const benoni: Opening = {
  id: "benoni",
  name: "Benoni Defence",
  eco: "A60–A79",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 Nf6 2.c4 c5 3.d5 e6",
  character:
    "A fighting, asymmetrical defence for players who hate dull positions. " +
    "Black willingly hands White more space in the centre, accepting a " +
    "cramped but spring-loaded position. In return Black gets a queenside pawn " +
    "majority, a powerful fianchettoed bishop, and the dynamic breaks ...c5 " +
    "(already played) and ...b5 to generate counterplay.",
  whitePlan:
    "Use the extra central space: keep the d5-pawn as a wedge, develop " +
    "harmoniously, and try to clamp down on Black's queenside before the " +
    "counterplay gets rolling.",
  blackPlan:
    "Embrace the imbalance: fianchetto on g7, push the queenside majority with " +
    "...a6 and ...b5, and use the half-open e-file and active pieces to make " +
    "the cramped position bite back.",
  tabiyaFen:
    "rnbqkb1r/pp1p1ppp/4pn2/2pP4/2P5/8/PP2PPPP/RNBQKBNR w KQkq - 0 4",
  lines: [
    {
      label: "Modern Benoni",
      sans: [
        "d4", "Nf6", "c4", "c5", "d5", "e6",
        "Nc3", "exd5", "cxd5", "d6", "e4", "g6", "Nf3", "Bg7",
      ],
      notes: [
        "White claims the centre.",
        "A flexible developing move.",
        "Striking at the centre right away — the Benoni's calling card.",
        "White pushes past, gaining space with a central wedge.",
        "Challenging the d5-pawn and opening the e-file.",
        "Developing and supporting the centre.",
        "Trading to fix the structure and open the e-file for Black.",
        "Recapturing; White keeps the spatial edge.",
        "Setting up the classic Benoni pawn chain with d6 and c5.",
        "Building the broad pawn front — extra space for White.",
        "Preparing the all-important fianchetto.",
        "Developing toward the centre and kingside.",
        "The key Benoni bishop reaches g7, raking the long diagonal.",
      ],
    },
    {
      label: "Fianchetto Variation",
      sans: [
        "d4", "Nf6", "c4", "c5", "d5", "e6",
        "Nc3", "exd5", "cxd5", "d6", "Nf3", "g6", "g3", "Bg7",
      ],
      notes: [
        "White claims the centre.",
        "Flexible development.",
        "The Benoni strike at the centre.",
        "Gaining space with the wedge.",
        "Challenging d5 and opening the e-file.",
        "Developing and supporting.",
        "Trading to fix the structure.",
        "Recapturing with the spatial edge.",
        "The classic Benoni chain.",
        "Developing the knight before deciding the kingside plan.",
        "Preparing the fianchetto.",
        "White chooses g3, heading for a Fianchetto set-up of his own.",
        "Black's bishop takes the long diagonal — fianchetto against fianchetto.",
      ],
    },
  ],
};
