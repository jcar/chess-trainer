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
      type: "quiz",
      id: "bvn-open",
      title: "Open positions",
      blurb: "Which minor piece shines?",
      question:
        "In open positions with pawns on both wings, which is usually better?",
      options: [
        "The knight, thanks to its forking ability.",
        "The bishop, thanks to its long range.",
        "They are always exactly equal.",
      ],
      correctIndex: 1,
      explanation:
        "When the position is open and there are targets on both sides of the " +
        "board, the bishop's long range lets it switch wings in a single move. " +
        "A knight, slow and short-stepping, can't keep up.",
    },
    {
      type: "sort",
      id: "bvn-position",
      title: "Bishop or knight here?",
      blurb: "Read the structure.",
      prompt:
        "The position is wide open with targets on both sides. Bishop or knight?",
      fen: "4k3/pp4p1/2p5/8/3P4/2P5/PP4P1/4K3 w - - 0 1",
      orientation: "white",
      options: [{ label: "Bishop" }, { label: "Knight" }],
      correctIndex: 0,
      explanation:
        "Few pawns, open lines, and weaknesses on both wings — this is the " +
        "bishop's playground. It can hit targets on opposite sides of the board " +
        "without losing a tempo.",
    },
    {
      type: "quiz",
      id: "bvn-pair",
      title: "The bishop pair",
      blurb: "Why two bishops are special.",
      question: "Why is the 'bishop pair' an advantage?",
      options: [
        "Two bishops can give check at the same time.",
        "Two bishops cover both colours and dominate open boards.",
        "Bishops are worth more points than knights.",
      ],
      correctIndex: 1,
      explanation:
        "A lone bishop only ever controls one colour of square. A pair covers " +
        "both, so together they sweep the whole board. On open lines that combined " +
        "reach is a real, lasting plus.",
    },
    {
      type: "sort",
      id: "bvn-use-pair",
      title: "Using the bishop pair",
      blurb: "Play to your strength.",
      prompt: "You hold the bishop pair. What do you want?",
      fen: "4k3/pp3ppp/2p5/3p4/3P4/2P5/PP3PPP/4K3 w - - 0 1",
      orientation: "white",
      options: [{ label: "Open the position" }, { label: "Lock the pawns" }],
      correctIndex: 0,
      explanation:
        "Bishops crave space. With the pair, open files and diagonals so both " +
        "bishops can stretch out. Locking the pawns would only help the enemy " +
        "knights and waste your advantage.",
    },
    {
      type: "sort",
      id: "bishop-vs-knight-apply1",
      title: "Which minor to keep?",
      blurb: "Trade the right piece for the structure.",
      prompt:
        "The pawns are locked across the board and you may swap one minor piece. Which do you keep?",
      fen: "r3k2r/pp3ppp/2n1p3/2ppP3/2PP1B2/2N5/PP3PPP/R3K2R w KQkq - 0 1",
      orientation: "white",
      options: [
        { label: "Keep the knight, trade the bishop" },
        { label: "Keep the bishop, trade the knight" },
      ],
      correctIndex: 0,
      explanation:
        "In a closed, locked position the bishop bumps into its own pawn chains while the knight hops over them to good squares. Keep the knight here and let the bishop go — the piece that fits the structure is the one worth holding on to.",
    },
    {
      type: "sort",
      id: "bishop-vs-knight-apply2",
      title: "Play to your bishops",
      blurb: "You hold the pair.",
      prompt:
        "You have the two bishops against bishop and knight. Offered a pawn break that opens the centre, do you take it?",
      fen: "r3k2r/pp3ppp/2b1p3/3p4/3P4/2P1B3/PP3PPP/R3K2R w KQkq - 0 1",
      orientation: "white",
      options: [
        { label: "No — keep the centre closed and safe" },
        { label: "Yes — open lines so both bishops stretch out" },
      ],
      correctIndex: 1,
      explanation:
        "The bishop pair is at its strongest on an open board, where the two bishops sweep squares of both colours from a distance. Take the break and open lines. Keeping the centre shut would only blunt your bishops and help the enemy knight find a foothold.",
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
    {
      type: "quiz",
      id: "bvn-review",
      title: "Review: which piece, which position",
      blurb: "The pawns are the tiebreaker.",
      question:
        "Bishop and knight are roughly equal in value. What decides which is actually stronger in a given game?",
      options: [
        "The pawn structure — open positions favour the bishop, locked ones favour the knight.",
        "Which piece has moved more often.",
        "The bishop is always stronger because it is worth more points.",
      ],
      correctIndex: 0,
      explanation:
        "Neither piece is better in the abstract. Open lines and targets on both wings suit the bishop; locked pawn chains suit the knight. Read the pawns, then judge.",
    },
  ],
};
