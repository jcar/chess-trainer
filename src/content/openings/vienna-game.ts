import type { Opening } from "./types";

// Vienna Game — original prose; lines are standard public theory.
export const viennaGame: Opening = {
  id: "vienna-game",
  name: "Vienna Game",
  eco: "C25–C29",
  family: "1e4-e5",
  trainerColor: "white",
  tier: "explorer",
  firstMoves: "1.e4 e5 2.Nc3",
  character:
    "A flexible 1.e4 e5 weapon that develops the queen's knight first and keeps " +
    "the f-pawn free. White can play it quietly, Italian-style, or strike with " +
    "an early f4 — the Vienna Gambit — which is sound precisely because the " +
    "knight already guards e4. Low on forced theory, rich in practical chances.",
  whitePlan:
    "Develop with Nc3 and Bc4, eyeing d5 and the f7-square. Choose between a " +
    "calm build-up with d3 and Nf3, or the aggressive f4 break to open lines " +
    "toward the black king.",
  blackPlan:
    "Develop naturally and contest the centre. Against the quiet lines mirror " +
    "with ...Nc6, ...Nf6 and ...Bc5; against f4, hit back in the centre with " +
    "...d5 rather than grabbing the pawn.",
  tabiyaFen:
    "rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2",
  lines: [
    {
      label: "Quiet main line",
      sans: ["e4", "e5", "Nc3", "Nc6", "Bc4", "Nf6", "d3", "Bc5", "Nf3"],
      notes: [
        "Claiming the centre.",
        "Black answers symmetrically.",
        "The Vienna: develop the knight, eye d5, and keep f2–f4 in reserve.",
        "Black develops the queen's knight.",
        "Aiming the bishop at the f7 weak spot.",
        "Developing and hitting the e4-pawn.",
        "Defending e4 solidly and opening the c1-bishop.",
        "Black mirrors, targeting f2.",
        "Completing development into a comfortable, Italian-like game.",
      ],
    },
    {
      label: "Vienna Gambit",
      sans: ["e4", "e5", "Nc3", "Nf6", "f4", "d5", "fxe5", "Nxe4", "Nf3"],
      notes: [
        "Claiming the centre.",
        "Black answers symmetrically.",
        "The Vienna.",
        "Black develops and pressures e4.",
        "The gambit! Sound because the knight already guards e4.",
        "Black's best — counterstrike in the centre instead of grabbing on f4.",
        "Taking the e-pawn.",
        "Black regains the pawn on e4.",
        "Developing and fighting for the initiative in a lively position.",
      ],
    },
  ],
};
