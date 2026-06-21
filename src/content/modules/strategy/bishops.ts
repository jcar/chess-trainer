// Strategy lesson 4 — Good Bishops & Bad Bishops. Original prose.

import type { Lesson } from "../../types";

export const bishopsLesson: Lesson = {
  id: "bishops",
  title: "Good Bishops & Bad Bishops",
  summary:
    "A bishop is only as good as its diagonals — keep your pawns off its colour.",
  activities: [
    {
      type: "quiz",
      id: "bishops-bad",
      title: "What is a bad bishop?",
      blurb: "Not all bishops are created equal.",
      question: "What makes a bishop 'bad'?",
      options: [
        "It is worth fewer points than a good bishop.",
        "Its own pawns sit on its colour, blocking its diagonals.",
        "It has not captured anything yet.",
      ],
      correctIndex: 1,
      explanation:
        "A 'bad' bishop is one whose own pawns are stuck on the same colour of " +
        "square it travels on. Those pawns block its diagonals, so it has no open " +
        "lines and ends up shuffling behind its own army doing nothing.",
    },
    {
      type: "sort",
      id: "bishops-fix",
      title: "Freeing a bad bishop",
      blurb: "What to do with a piece that's boxed in.",
      prompt:
        "You have a bad bishop hemmed in by your pawns. What's the plan?",
      fen: "4k3/3p1p2/4p3/3pB3/3P1P2/4P3/8/4K3 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Trade it off, or free it with a pawn break" },
        { label: "Keep it home to defend" },
      ],
      correctIndex: 0,
      explanation:
        "A bad bishop won't get better on its own. Either swap it for an enemy " +
        "piece, or push a pawn break to open a diagonal so the bishop can finally " +
        "breathe. Hiding it at home just leaves you a piece short.",
    },
    {
      type: "quiz",
      id: "bishops-pawns",
      title: "Pawns and your bishop",
      blurb: "A simple rule of thumb.",
      question:
        "Where should you usually place your pawns relative to your bishop?",
      options: [
        "On the same colour as the bishop.",
        "On the opposite colour to the bishop.",
        "All on the edge of the board.",
      ],
      correctIndex: 1,
      explanation:
        "Put your pawns on the opposite colour to your bishop. Then the pawns " +
        "and the bishop guard different squares, the diagonals stay clear, and " +
        "the bishop has room to roam.",
    },
    {
      type: "sort",
      id: "bishops-which-good",
      title: "Spot the good bishop",
      blurb: "One bishop is free, the other is stuck.",
      prompt: "Which bishop is the 'good' one?",
      fen: "4k3/pp3ppp/2p5/3p4/3P4/2P5/PP2BPPP/4K1B1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "The one with open diagonals" },
        { label: "The one behind its own pawns" },
      ],
      correctIndex: 0,
      explanation:
        "The good bishop is the active one, with open diagonals and real targets. " +
        "A bishop stuck behind its own fixed pawns may look safe, but it can't " +
        "influence the game.",
    },
    {
      type: "replay",
      id: "bishops-good-demo",
      title: "The better bishop",
      blurb: "Watch one side end up with the superior bishop.",
      orientation: "white",
      intro:
        "Here's how a small choice in the opening can leave you with a far better " +
        "bishop than your opponent. Watch how White keeps his pawns off the light " +
        "squares while Black's bishop gets walled in.",
      steps: [
        { san: "d4", note: "White claims the centre." },
        { san: "d5", note: "Black answers symmetrically." },
        { san: "c4", note: "The Queen's Gambit — pressuring d5." },
        {
          san: "e6",
          note:
            "Black supports d5 — but this pawn sits on a light square, the same " +
            "colour as Black's light-squared bishop on c8.",
        },
        { san: "Nc3", note: "Developing and adding pressure to d5." },
        { san: "Nf6", note: "Black develops naturally." },
        {
          san: "Bg5",
          note:
            "White's dark-squared bishop comes out to an open, active diagonal.",
        },
        {
          san: "Be7",
          note: "Black's dark-squared bishop is fine, but the c8 bishop is the problem.",
        },
        { san: "e3", note: "Opening a path for White's light-squared bishop." },
        {
          san: "c6",
          note:
            "Black bolsters d5 again — another pawn on a light square, hemming " +
            "in the c8 bishop even more.",
        },
        {
          san: "Bd3",
          note:
            "White's light-squared bishop sits on an open diagonal aimed at the " +
            "kingside.",
        },
        {
          san: "Nbd7",
          note:
            "Black's c8 bishop is now a classic bad bishop: its own pawns on e6, " +
            "d5, and c6 block its only diagonals. White's bishops both roam freely " +
            "— the better minor pieces are White's.",
        },
      ],
    },
  ],
};
