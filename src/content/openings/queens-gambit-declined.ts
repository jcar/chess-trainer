import type { Opening } from "./types";

// Queen's Gambit Declined — original prose; lines are standard public theory.
export const queensGambitDeclined: Opening = {
  id: "queens-gambit-declined",
  name: "Queen's Gambit Declined",
  eco: "D30–D69",
  family: "1d4",
  firstMoves: "1.d4 d5 2.c4 e6",
  character:
    "The classical, rock-solid way to meet 1.d4. Instead of grabbing the " +
    "offered c4-pawn, Black props up the d5-pawn with ...e6 and builds a " +
    "sturdy wall in the centre. The position is hard to crack: Black unravels " +
    "patiently, completes development, and only then looks for activity. It has " +
    "been a dependable choice at the very highest level for over a century.",
  whitePlan:
    "Develop with Nc3, Bg5 and e3, keep the small space edge the c4/d4 pawns " +
    "give, and pressure Black's slightly cramped position — often with a " +
    "minority attack on the queenside or a central break.",
  blackPlan:
    "Hold the d5-point solidly, finish development with ...Be7, ...O-O and " +
    "...Nf6, then free the position with ...b6 and ...Bb7 (or an eventual " +
    "...c5 / ...dxc4) once the pieces are out.",
  tabiyaFen:
    "rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
  lines: [
    {
      label: "Classical main line",
      sans: [
        "d4", "d5", "c4", "e6", "Nc3", "Nf6", "Bg5", "Be7",
        "e3", "O-O", "Nf3", "h6", "Bh4", "b6",
      ],
      notes: [
        "White claims the centre and prepares c4.",
        "Black contests the centre at once.",
        "The Queen's Gambit: White offers the c-pawn to deflect d5.",
        "Declining — ...e6 supports d5 instead of capturing on c4.",
        "Developing and adding a second attacker to d5.",
        "Defending d5 and developing naturally.",
        "Pinning the knight to pressure the d5-pawn.",
        "Breaking the pin's sting and preparing to castle.",
        "A solid, classical set-up that frees the light bishop.",
        "King safety first.",
        "Completing the kingside development.",
        "Putting the question to the bishop before it gets annoying.",
        "Maintaining the pin rather than conceding the bishop.",
        "Preparing ...Bb7 to free the queenside and challenge the long diagonal.",
      ],
    },
    {
      label: "Exchange Variation",
      sans: [
        "d4", "d5", "c4", "e6", "Nc3", "Nf6", "cxd5", "exd5",
        "Bg5", "c6", "e3", "Bf5",
      ],
      notes: [
        "White takes the centre.",
        "Black contests it.",
        "Offering the gambit.",
        "Declining with ...e6.",
        "Developing toward d5.",
        "Developing and guarding d5.",
        "The Exchange: clarifying the centre and fixing Black's structure.",
        "Recapturing toward the centre, leaving Black a slightly rigid pawn.",
        "Pinning the knight to add pressure on d5.",
        "Bolstering d5 and giving the queen a route out.",
        "A solid set-up, eyeing the minority attack with b4–b5.",
        "Developing the bishop actively outside the pawn chain — a key point of this line.",
      ],
    },
  ],
};
