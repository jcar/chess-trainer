// Strategy lesson 6 — Bishop vs Knight & the Two Bishops. Original prose.

import type { Lesson } from "../../types";

export const bishopVsKnightLesson: Lesson = {
  id: "bishop-vs-knight",
  title: "Bishop vs Knight & the Two Bishops",
  summary:
    "Open positions love bishops; closed ones love knights — and the bishop pair is a lasting edge.",
  activities: [
    {
      type: "concept",
      id: "bishop-vs-knight-concept",
      title: "Bishop, knight, and the pair",
      blurb: "Which minor piece fits the position?",
      body:
        "Neither minor piece is simply better — it depends on the pawns. Open positions with targets on both wings favour the long-range bishop, which can switch sides in a single move. Closed positions with locked pawns favour the knight, which hops over the blockade to reach squares a bishop can't.\n\nHaving both bishops — the 'bishop pair' — is a lasting plus, since together they cover squares of both colours. To use the pair, open the position so the bishops can stretch out.",
      points: [
        "On paper they're equal — the pawn structure decides which is stronger.",
        "Open board: the bishop's range usually wins out.",
        "Closed board: the knight's hops shine.",
        "Facing the two bishops? Trade one off to ease the pressure.",
      ],
      diagrams: [
        {
          fen: "r3k2r/pp3ppp/2b1p3/3p4/3P4/2P1B3/PP3PPP/R3K2R w KQkq - 0 1",
          orientation: "white",
          caption:
            "An open position with pawns on both wings: the bishops rake long diagonals and switch flanks in a move. Here the long-range pieces are in their element — a knight would struggle to keep up.",
        },
      ],
    },
    {
      type: "replay",
      id: "bvn-demo",
      title: "Letting the bishops breathe",
      blurb: "Winning the pair and opening the board.",
      orientation: "white",
      eval: true,
      source: "Ruy Lopez, Exchange Variation",
      intro:
        "Here White wins the bishop pair and then opens the centre to set the " +
        "two bishops free. Watch how grabbing the pair and clearing lines go " +
        "hand in hand. The eval barely moves — the bishop pair is a slow asset " +
        "that pays off once the board opens.",
      steps: [
        { san: "e4", note: "White takes the centre." },
        { san: "e5", note: "Black stakes a symmetrical claim." },
        { san: "Nf3", note: "Attacking e5 and developing." },
        { san: "Nc6", note: "Black defends." },
        { san: "Bb5", note: "The Ruy Lopez — pinning the knight that guards e5." },
        { san: "a6", note: "Black questions the bishop." },
        {
          san: "Bxc6",
          note:
            "White voluntarily trades bishop for knight — the Exchange Variation. " +
            "Black recaptures with a pawn, but White is happy to give one bishop to " +
            "double Black's pawns and keep play flowing.",
        },
        {
          san: "dxc6",
          note: "Black's pawns are doubled on the c-file.",
        },
        {
          san: "Nc3",
          note: "White develops, keeping his remaining bishop and the knight pair.",
        },
        {
          san: "Bg4",
          note: "Black develops his light-squared bishop actively.",
        },
        {
          san: "h3",
          note: "Asking the bishop to declare itself.",
        },
        {
          san: "Bxf3",
          keyIdea: "Hold the pair, then open the board",
          note:
            "Black gives up his bishop for White's knight — and now White holds " +
            "the bishop pair. With the centre about to open, those two bishops " +
            "will have long, clear diagonals to dominate the board.",
        },
      ],
    },
    {
      type: "guessMove",
      id: "bvn-guess",
      title: "Guess the Move: open it for the bishops",
      blurb: "Predict the moves that suit long-range pieces.",
      orientation: "white",
      source: "Scotch Game",
      intro:
        "You're White. Predict the moves. The thread: with bishops to develop, you want the centre open and your pieces on active diagonals — not a locked, knight-friendly structure.",
      moves: [
        "e4", "e5", "Nf3", "Nc6", "d4", "exd4", "Nxd4", "Bc5", "Be3", "Qf6", "c3", "Nge7",
      ],
      guessAt: [4, 8],
      notes: [
        undefined, undefined, undefined, undefined,
        "Strike in the centre. Opening lines is exactly what a bishop-based game wants — locked pawns would only help the knights.",
        undefined, undefined, undefined,
        "Develop the bishop to an active diagonal while guarding the knight. Both bishops will get open lines.",
        undefined, undefined, undefined,
      ],
      successText:
        "Open centre, bishops on active diagonals — you've set the stage where long-range pieces outshine short-stepping knights.",
    },
    {
      type: "plan",
      id: "bvn-plan-apply",
      title: "Find the plan, then convert",
      blurb: "Back the bishops, then bring it home.",
      fen: "5rk1/1p3ppp/2p5/3p4/3P1B2/8/PP3PPP/2R1R1K1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "The board is open, your bishop sweeps long diagonals, and you're up material. How do you proceed?",
      options: [
        "Keep the position open, use the bishop's range and the rooks together, and convert the extra material.",
        "Close the centre with pawn moves to limit the play.",
        "Trade your active bishop for a pawn to simplify.",
      ],
      correctIndex: 0,
      explanation:
        "An open board is the bishop's habitat. Keep the lines clear, combine the bishop with your rooks, and the extra material wins comfortably.",
      convert: {
        kind: "drill",
        drill: {
          fen: "5rk1/1p3ppp/2p5/3p4/3P1B2/8/PP3PPP/2R1R1K1 w - - 0 1",
          orientation: "white",
          objective: "checkmate",
          engineSkill: 2,
          instructions:
            "White to play. Keep the board open for your bishop, invade with the rooks, and convert into checkmate.",
          successText: "Converted — an open board lets the bishop and rooks overwhelm.",
        },
      },
    },
  ],
};
