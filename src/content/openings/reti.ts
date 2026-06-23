import type { Opening } from "./types";

// Réti Opening — original prose; lines are standard public theory.
export const reti: Opening = {
  id: "reti",
  name: "Réti Opening",
  eco: "A04–A09",
  family: "flank",
  trainerColor: "white",
  firstMoves: "1.Nf3 d5 2.c4",
  character:
    "A flexible, hypermodern flank opening. Instead of planting a pawn in the " +
    "centre, White develops the knight and attacks Black's d5-pawn from the " +
    "wing with c4, often adding a fianchetto. The Réti frequently transposes " +
    "into other systems, so it is as much a way of thinking — pressure the " +
    "centre from a distance — as a fixed set of moves.",
  whitePlan:
    "Pressure d5 from the flank with c4 and a kingside fianchetto, castle " +
    "quickly, and keep the structure flexible so you can choose the most " +
    "favourable central break or transposition once Black commits.",
  blackPlan:
    "Decide how to meet the c4 pressure — support d5, exchange on c4, or push " +
    "...d4 to gain space — then develop soundly and contest the long diagonal " +
    "White is fighting over.",
  middlegamePlan:
    "The Réti is a way of thinking: pressure the centre from the wings, stay flexible, and " +
    "transpose into whatever favours you. Fianchetto Bg2, castle, and keep options open — " +
    "trade on d5 and pressure it, expand with b3/Bb2 (double fianchetto), or play d4 and " +
    "slide into a Catalan/QGD a tempo up. If Black overextends with ...d4, undermine it " +
    "(e3, the c-pawn, or a quick b4) rather than blockading. Let Black commit the structure " +
    "first, then pick the one that suits you.",
  ideaQuiz: {
    question: "What is the core Réti idea behind 1.Nf3 and 2.c4?",
    options: [
      "Pressure Black's centre (especially d5) from the flank and stay flexible to transpose.",
      "Build a big pawn centre with e4 and d4 immediately.",
      "Launch a direct attack on f7.",
    ],
    correctIndex: 0,
    explanation:
      "The Réti is hypermodern: rather than occupy the centre, White attacks it from a distance with c4 and a g2-fianchetto, keeping the pawns flexible. Its strength is transpositional — White lets Black commit, then steers into the most favourable structure (often a reversed/extra-tempo Catalan or QGD).",
  },
  tabiyaFen:
    "rnbqkbnr/ppp1pppp/8/3p4/2P5/5N2/PP1PPPPP/RNBQKB1R b KQkq - 0 2",
  lines: [
    {
      label: "Main Line",
      sans: [
        "Nf3", "d5", "c4", "e6",
        "g3", "Nf6", "Bg2", "Be7", "O-O", "O-O",
      ],
      notes: [
        "Developing the knight and eyeing the centre from afar.",
        "Black stakes a central claim.",
        "The Réti idea: attacking d5 from the flank instead of with e4 or d4.",
        "Supporting d5 and opening a path for the dark-squared bishop.",
        "Preparing the fianchetto, the heart of the Réti.",
        "Natural development to the best square.",
        "The bishop takes the long diagonal, adding pressure to d5 and the centre.",
        "Calm development, getting ready to castle.",
        "King safety first.",
        "Black castles too — a flexible, harmonious position with the fight ahead.",
      ],
    },
    {
      label: "Advance (2...d4)",
      branch: { from: "Main Line", atPly: 3, tryMove: "d4" },
      sans: [
        "Nf3", "d5", "c4", "d4",
        "e3", "Nc6", "exd4", "Nxd4", "Nxd4", "Qxd4",
      ],
      notes: [
        "Developing and eyeing the centre.",
        "Black grabs space in the centre.",
        "The Réti, pressuring d5 from the flank.",
        "Black pushes past, claiming space instead of holding the tension.",
        "Immediately questioning the advanced d4-pawn.",
        "Defending d4 with a developing move.",
        "Opening the centre to challenge the pawn.",
        "Recapturing toward the centre.",
        "Trading the knights.",
        "Black recaptures with the queen, reaching a balanced, open position.",
      ],
    },
  ],
};
