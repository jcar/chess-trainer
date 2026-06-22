import type { Opening } from "./types";

// Queen's Gambit (a White 1.d4 repertoire). Original prose; lines are standard
// public theory. Gives a 1.d4 player a real main-line weapon against Black's
// three principal replies — declining (...e6), accepting (...dxc4), and the Slav
// (...c6) — to complement the system-based London already in the catalog.
export const queensGambit: Opening = {
  id: "queens-gambit",
  name: "Queen's Gambit (for White)",
  eco: "D06–D69",
  family: "1d4",
  trainerColor: "white",
  tier: "core",
  firstMoves: "1.d4 d5 2.c4",
  character:
    "The classical way to fight for the centre with 1.d4. White offers the c-pawn " +
    "not as a true sacrifice — Black can't comfortably hold it — but to deflect the " +
    "d5-pawn and build a big pawn centre with a later e4. It leads to rich, " +
    "principled middlegames and is the backbone of a sound White repertoire.",
  whitePlan:
    "Pressure d5 with c4 and Nc3, develop naturally (Bg5/Bf4, e3, Nf3, Bd3 or Be2), " +
    "castle, and aim for the central break e4 or the minority attack (b4-b5) " +
    "depending on Black's setup.",
  blackPlan:
    "Decide how to meet the gambit: support d5 with ...e6 (solid but passive bishop) " +
    "or ...c6 (the Slav, freeing the bishop), or grab the pawn with ...dxc4 and give " +
    "back the centre. In each case, complete development and strike with ...c5 or ...e5.",
  tabiyaFen:
    "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
  lines: [
    {
      label: "Declined (2...e6)",
      sans: [
        "d4", "d5", "c4", "e6", "Nc3", "Nf6", "Bg5", "Be7",
        "e3", "O-O", "Nf3", "h6", "Bh4",
      ],
      notes: [
        "Claim the centre.",
        "Black stakes a symmetrical claim.",
        "The Queen's Gambit — pressure d5 and offer the c-pawn.",
        "Declined: Black supports d5, accepting a slightly passive light bishop.",
        "Develop and pile onto d5.",
        "Defend d5 and develop.",
        "Pin the knight to increase the pressure on d5.",
        "Break the pin and prepare to castle.",
        "Open the f1-bishop and reinforce the centre.",
        "Black castles into safety.",
        "Complete development; the plan is a later minority attack (b4-b5) or e4 break.",
        "Black gains the bishop pair option with ...h6.",
        "Keep the bishop on the h4-d8 diagonal, holding the pin's pressure.",
      ],
    },
    {
      label: "Accepted (2...dxc4)",
      sans: [
        "d4", "d5", "c4", "dxc4", "Nf3", "Nf6", "e3", "e6",
        "Bxc4", "c5", "O-O",
      ],
      notes: [
        "Centre.",
        "Symmetry.",
        "The gambit.",
        "Accepted — but Black can't keep the pawn, so this mainly cedes the centre.",
        "Develop and control e5; don't rush to recapture on c4.",
        "Black develops and eyes the centre.",
        "Open the bishop's path to recapture on c4.",
        "Black prepares ...c5 and development.",
        "Recover the pawn with a well-placed bishop aiming at f7.",
        "Black strikes at the centre — the standard freeing break.",
        "Castle; White has an easy, harmonious game with a lead in development.",
      ],
    },
    {
      label: "Slav (2...c6)",
      sans: [
        "d4", "d5", "c4", "c6", "Nf3", "Nf6", "Nc3", "dxc4",
        "a4", "Bf5", "e3",
      ],
      notes: [
        "Centre.",
        "Symmetry.",
        "The gambit.",
        "The Slav — support d5 with the c-pawn, keeping the light bishop free.",
        "Develop and control e5.",
        "Black develops and defends d5.",
        "Add a third attacker to d5; now ...dxc4 is Black's main try.",
        "Black grabs the pawn, planning ...b5 to hold it.",
        "Stop ...b5 cold before recovering the pawn.",
        "The point of the Slav — the bishop comes out before ...e6 locks it in.",
        "Solid development; White will regain c4 with Bxc4 and enjoy the freer game.",
      ],
    },
  ],
};
