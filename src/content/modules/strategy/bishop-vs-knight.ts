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
        "Open board: the bishop's range usually wins out.",
        "Closed board: the knight's hops shine.",
        "Hold the bishop pair? Open lines to set both bishops free.",
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
      type: "replay",
      id: "bvn-demo",
      title: "Letting the bishops breathe",
      blurb: "Winning the pair and opening the board.",
      orientation: "white",
      intro:
        "Here White wins the bishop pair and then opens the centre to set the " +
        "two bishops free. Watch how grabbing the pair and clearing lines go " +
        "hand in hand.",
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
          note:
            "Black gives up his bishop for White's knight — and now White holds " +
            "the bishop pair. With the centre about to open, those two bishops " +
            "will have long, clear diagonals to dominate the board.",
        },
      ],
    },
  ],
};
