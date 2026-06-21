import type { Opening } from "./types";

// Semi-Slav Defence — original prose; lines are standard public theory.
export const semiSlav: Opening = {
  id: "semi-slav",
  name: "Semi-Slav Defence",
  eco: "D43–D49",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 e6",
  character:
    "A rock-solid yet ambitious answer to the Queen's Gambit. Black props up " +
    "the d5-pawn with BOTH ...c6 and ...e6, building a sturdy wall in the " +
    "centre. From this fortress Black can grab the c4-pawn and expand on the " +
    "queenside with ...b5, leading to some of the richest play in all of chess.",
  whitePlan:
    "Develop the pieces, decide between quiet pressure and a sharp pawn storm " +
    "(g4 ideas in the Botvinnik/Anti-Meran), and use the central majority and " +
    "space to keep Black slightly cramped.",
  blackPlan:
    "Hold the d5 strongpoint with ...c6 and ...e6, then unwind: capture on c4, " +
    "play ...b5 to gain queenside space, develop the light-squared bishop " +
    "actively, and aim for a freeing ...c5 or ...e5 break.",
  tabiyaFen:
    "rnbqkb1r/pp3ppp/2p1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5",
  lines: [
    {
      label: "Meran Variation",
      sans: [
        "d4", "d5", "c4", "c6", "Nf3", "Nf6", "Nc3",
        "e6", "e3", "Nbd7", "Bd3", "dxc4", "Bxc4", "b5",
      ],
      notes: [
        "White claims the centre.",
        "Black challenges it.",
        "The Queen's Gambit, pressuring d5.",
        "The Slav move — supporting d5 with the c-pawn.",
        "Developing and eyeing the centre.",
        "A natural developer defending d5.",
        "Adding a third attacker to d5.",
        "The Semi-Slav move — now d5 is backed by both ...c6 and ...e6.",
        "Modest but solid, opening the bishop and locking the centre.",
        "Developing toward the queenside and preparing ...dxc4.",
        "Recapturing-square ready: the bishop sits on its natural diagonal.",
        "Now is the moment — grabbing the c4-pawn.",
        "White regains the pawn with an active bishop.",
        "The Meran's signature — gaining space and hitting the bishop.",
      ],
    },
    {
      label: "Botvinnik Variation (5.Bg5)",
      sans: [
        "d4", "d5", "c4", "c6", "Nf3", "Nf6", "Nc3",
        "e6", "Bg5", "dxc4", "e4", "b5",
      ],
      notes: [
        "White claims the centre.",
        "Black challenges it.",
        "The gambit, pressuring d5.",
        "Supporting d5 with the c-pawn.",
        "Developing and eyeing the centre.",
        "Defending d5.",
        "Piling onto d5.",
        "The Semi-Slav move — d5 now has two pawn defenders.",
        "The sharpest try — pinning the knight and inviting complications.",
        "Black grabs the pawn before White can solidify.",
        "Striking in the centre and intending to gain more with e5.",
        "The fearless main line — clutching the extra pawn and gaining space.",
      ],
    },
  ],
};
