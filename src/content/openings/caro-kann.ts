import type { Opening } from "./types";

// Caro-Kann Defence — original prose; lines are standard public theory.
export const caroKann: Opening = {
  id: "caro-kann",
  name: "Caro-Kann Defence",
  eco: "B10–B19",
  family: "1e4-other",
  trainerColor: "black",
  firstMoves: "1.e4 c6",
  character:
    "As solid as the French but more harmonious. Black plays 1...c6 to prepare " +
    "...d5, and crucially gets the problem light-squared bishop out to f5 BEFORE " +
    "playing ...e6 — so it never gets trapped behind its own pawns. The result is " +
    "a rock-solid pawn structure with no bad pieces.",
  whitePlan:
    "Use the central pawns and lead in development for a space advantage, often " +
    "gaining kingside room and chasing Black's light-squared bishop, then play " +
    "for a long-term squeeze against the slightly passive Black set-up.",
  blackPlan:
    "Develop the light-squared bishop outside the pawn chain to f5 or g6, then " +
    "play ...e6 with a sound, harmonious position, completing development and " +
    "aiming for a safe, resilient middlegame.",
  tabiyaFen:
    "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
  lines: [
    {
      label: "Classical Variation",
      sans: [
        "e4", "c6", "d4", "d5", "Nc3", "dxe4", "Nxe4", "Bf5",
        "Ng3", "Bg6", "h4", "h6", "Nf3", "Nd7",
      ],
      notes: [
        "White grabs the centre.",
        "The Caro-Kann: Black prepares ...d5 with pawn support.",
        "Reinforcing the centre.",
        "Black challenges e4 at once.",
        "Developing and defending the e4-pawn.",
        "Black resolves the tension and opens lines.",
        "Recapturing with the knight in the centre.",
        "The whole point: the bishop develops OUTSIDE the pawn chain.",
        "Chasing the bishop to gain a tempo.",
        "The bishop steps back to a safe, active diagonal.",
        "Gaining space and threatening to trap the bishop with h5.",
        "Making luft so the bishop keeps its retreat square.",
        "Calm development, getting ready to castle.",
        "Developing the knight flexibly toward f6 or b6.",
      ],
    },
    {
      label: "Advance Variation",
      sans: [
        "e4", "c6", "d4", "d5", "e5", "Bf5", "Nf3", "e6", "Be2", "c5",
      ],
      notes: [
        "White grabs the centre.",
        "The Caro-Kann.",
        "Reinforcing the centre.",
        "Black challenges e4.",
        "The Advance: White pushes past for space and fixes the centre.",
        "The key Caro-Kann idea — the bishop comes out before ...e6 locks it in.",
        "Developing and eyeing the centre.",
        "Now ...e6 is fine because the bishop is already outside the chain.",
        "A modest, flexible developing move.",
        "Black's thematic break against the base of the chain on d4.",
      ],
    },
  ],
};
