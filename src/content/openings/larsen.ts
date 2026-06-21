import type { Opening } from "./types";

// Larsen's Opening (Nimzo-Larsen Attack) — original prose; lines are standard
// public theory.
export const larsen: Opening = {
  id: "larsen",
  name: "Larsen's Opening",
  eco: "A01",
  family: "flank",
  trainerColor: "white",
  firstMoves: "1.b3",
  character:
    "A flexible flank opening (the Nimzo-Larsen Attack): White fianchettoes the " +
    "queen's bishop to b2 to rake the long dark-squared diagonal a1–h8, " +
    "pressuring e5 and the centre from the wing. It sidesteps mainstream theory " +
    "and leads to original, hypermodern middlegames where understanding the plans " +
    "matters more than memorizing moves.",
  whitePlan:
    "Fianchetto with b3 and Bb2, control the long diagonal, restrain Black's " +
    "centre with e3 and pieces, and choose a central break (c4, d4, or f4 with " +
    "Nf3) once developed.",
  blackPlan:
    "Grab the centre with ...e5/...d5 and develop naturally; challenge the b2 " +
    "bishop's diagonal (e.g. defending e5 solidly) and aim to prove the " +
    "fianchetto is slow.",
  tabiyaFen:
    "r1bqkbnr/pppp1ppp/2n5/4p3/8/1P2P3/PBPP1PPP/RN1QKBNR b KQkq - 0 3",
  lines: [
    {
      label: "Classical (1...e5)",
      sans: [
        "b3", "e5", "Bb2", "Nc6", "e3", "Nf6",
        "Bb5", "Bd6", "Nf3", "e4", "Nd4", "O-O",
      ],
      notes: [
        "The Nimzo-Larsen move: White prepares to fianchetto the queen's bishop.",
        "Black grabs the centre.",
        "The point — the bishop rakes the long diagonal toward e5.",
        "Developing and defending e5.",
        "A restrained, flexible setup for the centre.",
        "Black develops and contests the centre.",
        "Pinning/pressuring the e5-defender, Spanish-style.",
        "Black supports e5 and develops actively.",
        "Developing with pressure on e5.",
        "Black gains space and kicks the knight.",
        "The knight reroutes instead of retreating passively.",
        "Black castles; a rich, original middlegame lies ahead.",
      ],
    },
    {
      label: "Reversed setup (1...d5)",
      sans: [
        "b3", "d5", "Bb2", "Nf6", "e3", "e6",
        "f4", "Be7", "Nf3", "O-O", "Be2", "c5",
      ],
      notes: [
        "1.b3 again, aiming the bishop down the long diagonal.",
        "Black takes the centre with the d-pawn.",
        "Fianchettoing onto the a1–h8 diagonal.",
        "Black develops the kingside knight.",
        "Supporting a flexible centre.",
        "Black builds a solid pawn chain.",
        "A Bird-like clamp on e5, gaining kingside space.",
        "Black develops and prepares to castle.",
        "Completing the kingside and eyeing e5.",
        "Black tucks the king away.",
        "A modest, flexible bishop developing move.",
        "Black strikes at the centre — the middlegame battle begins.",
      ],
    },
  ],
};
