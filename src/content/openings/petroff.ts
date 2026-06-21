import type { Opening } from "./types";

// Petroff Defence — original prose; lines are standard public theory.
export const petroff: Opening = {
  id: "petroff",
  name: "Petroff Defence",
  eco: "C42–C43",
  family: "1e4-e5",
  trainerColor: "black",
  firstMoves: "1.e4 e5 2.Nf3 Nf6",
  character:
    "Instead of defending the e5-pawn, Black immediately counterattacks White's " +
    "e4-pawn with 2...Nf6 — meeting a threat with a threat. The result is " +
    "famously solid and symmetrical, a favourite of players who want a reliable, " +
    "low-risk answer to 1.e4. It trades early fireworks for clarity and balance.",
  whitePlan:
    "Grab the e5-pawn, then retreat the knight in good order; build a small " +
    "central edge with d4 and natural development, and try to make Black's " +
    "symmetry slightly passive.",
  blackPlan:
    "Recover the pawn by counterattacking e4, develop quickly and harmoniously, " +
    "and reach a sound, symmetrical middlegame where there are no weaknesses to " +
    "target.",
  tabiyaFen:
    "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
  lines: [
    {
      label: "Classical Variation",
      sans: [
        "e4", "e5", "Nf3", "Nf6", "Nxe5", "d6",
        "Nf3", "Nxe4", "d4", "d5", "Bd3", "Be7",
        "O-O", "O-O",
      ],
      notes: [
        "White claims the centre.",
        "Black answers symmetrically.",
        "Attacking e5.",
        "The Petroff move: counterattacking e4 rather than defending e5.",
        "White grabs the pawn — but the knight is now loose.",
        "Kicking the knight back before recapturing on e4.",
        "Retreating in good order (taking on f7 would be a famous trap).",
        "Now Black regains the pawn, restoring the material balance.",
        "Striking in the centre and gaining space.",
        "Black supports the e4-knight and stakes a central claim.",
        "Developing and challenging the strong knight on e4.",
        "Calm development, preparing to castle.",
        "King safety.",
        "Black castles too — a balanced, healthy position for both sides.",
      ],
    },
    {
      label: "Steinitz Variation (3.d4)",
      sans: [
        "e4", "e5", "Nf3", "Nf6", "d4", "exd4",
        "e5", "Ne4", "Qxd4", "d5", "exd6", "Nxd6",
      ],
      notes: [
        "White claims the centre.",
        "Black answers symmetrically.",
        "Attacking e5.",
        "The Petroff counterattack on e4.",
        "Striking in the centre instead of grabbing e5 — the Steinitz idea.",
        "Black captures the d4-pawn.",
        "Pushing past to gain space and harass the f6-knight.",
        "The knight jumps forward rather than retreat.",
        "Recapturing and centralising the queen.",
        "Black blunts the centre and gains a foothold.",
        "Capturing en passant to open lines.",
        "Recapturing with the knight; a lively, roughly balanced middlegame.",
      ],
    },
  ],
};
