// Chess Strategy — Lesson 10: Weak Squares & Holes. Original prose.

import type { Lesson } from "../../types";

export const weakSquaresLesson: Lesson = {
  id: "weak-squares",
  title: "Weak Squares & Holes",
  summary:
    "A square no pawn can ever defend is a permanent home for an enemy piece.",
  activities: [
    {
      type: "quiz",
      id: "ws-hole",
      title: "What is a hole?",
      blurb: "A square for keeps.",
      question: "What is a 'hole' (weak square)?",
      options: [
        "A square with a pawn sitting on it.",
        "A square your pawns can never again control.",
        "Any square in your own half.",
      ],
      correctIndex: 1,
      explanation:
        "A hole is a square that your pawns have permanently given up — they can " +
        "never guard it again. That makes it a safe, lasting outpost for an enemy " +
        "piece.",
    },
    {
      type: "sort",
      id: "ws-use",
      title: "Using a hole",
      blurb: "The plan when you spot one.",
      prompt: "You spot a hole on d5 in the enemy camp. What's the plan?",
      fen: "r1bq1rk1/pp2bppp/2np1n2/4p3/4P3/2NP1N2/PPP1BPPP/R1BQ1RK1 w - - 0 8",
      orientation: "white",
      options: [
        { label: "Park a knight on it" },
        { label: "Trade your knights away" },
      ],
      correctIndex: 0,
      explanation:
        "A hole on d5 is a dream square for a knight: planted there it can't be " +
        "kicked by a pawn, and it pressures the whole enemy position. Steer a " +
        "knight toward it, don't trade it off.",
    },
    {
      type: "quiz",
      id: "ws-create",
      title: "How holes appear",
      blurb: "Where weak squares come from.",
      question: "Weak squares are often created when...",
      options: [
        "You castle kingside.",
        "You develop a bishop.",
        "A pawn advances and leaves squares behind it undefended.",
      ],
      correctIndex: 2,
      explanation:
        "Every pawn push gives up control of the squares it used to guard. Advance " +
        "a pawn carelessly and you can leave a hole right behind it that never " +
        "heals.",
    },
    {
      type: "puzzle",
      id: "ws-royal-fork",
      title: "Land the knight, win the queen",
      blurb: "Exploiting the hole.",
      fen: "2q3k1/ppp2ppp/8/3N4/8/8/PPP2PPP/6K1 w - - 0 1",
      orientation: "white",
      goal: { type: "win-material", minGain: 3 },
      prompt:
        "The knight on its outpost strikes — White to play and win material.",
      hints: [
        "A knight check that also attacks the queen.",
        "Jump into e7.",
      ],
      successText:
        "Ne7+ forks the king and queen from the outpost — after the king steps " +
        "aside, Nxc8 wins the queen.",
      solution: ["d5e7", "g8f8", "e7c8"],
    },
    {
      type: "replay",
      id: "ws-demo",
      title: "A home for the knight",
      blurb: "Creating and using a hole.",
      orientation: "white",
      intro:
        "See how an over-eager pawn push leaves a hole — and how the other side " +
        "races a knight to settle on it.",
      steps: [
        { san: "e4", note: "A standard opening move." },
        { san: "c5", note: "Black plays for an asymmetrical fight." },
        { san: "Nf3", note: "Developing toward the centre." },
        { san: "Nc6", note: "Black develops in turn." },
        { san: "d4", note: "Opening the centre." },
        { san: "cxd4", note: "Black trades in the centre." },
        { san: "Nxd4", note: "Recapturing — the knight reaches a fine central post." },
        { san: "e5", note: "Black overpushes — and the d5-square is now a permanent hole." },
        { san: "Nb5", note: "The knight begins its journey toward the hole on d5." },
        { san: "d6", note: "Black tries to cover the square, but the damage is done." },
        { san: "N1c3", note: "Bringing the second knight toward d5 too." },
        { san: "a6", note: "Kicking the b5-knight — which simply heads for its dream square." },
        { san: "Nd5", note: "Home at last: a knight planted on the hole, untouchable by any pawn." },
      ],
    },
  ],
};
