// Strategy lesson 5 — Knights & Outposts. Original prose.

import type { Lesson } from "../../types";

export const knightsLesson: Lesson = {
  id: "knights",
  title: "Knights & Outposts",
  summary:
    "Knights need support points — a protected square in enemy territory is gold.",
  activities: [
    {
      type: "concept",
      id: "knights-concept",
      title: "Knights & outposts",
      blurb: "Find your knight a square it can't be kicked from.",
      body:
        "A knight is short-stepping, so it's strongest when it has a stable home deep in enemy territory. An outpost is an advanced square — often the 5th or 6th rank — that one of your pawns defends and that no enemy pawn can ever attack. A knight planted there can only be removed by trading a piece for it.\n\nKnights also outshine bishops in closed positions, where they hop over locked pawn chains to reach squares a bishop never could.",
      points: [
        "An outpost is a square your pawn guards and no enemy pawn can hit.",
        "A knight on an outpost is nearly impossible to dislodge.",
        "Closed, locked positions favour knights over bishops.",
      ],
    },
    {
      type: "quiz",
      id: "knights-outpost",
      title: "What is an outpost?",
      blurb: "A knight's dream square.",
      question: "What is a knight 'outpost'?",
      options: [
        "Any square on the opponent's half of the board.",
        "An advanced square, guarded by your pawn, safe from enemy pawns.",
        "The square a knight starts the game on.",
      ],
      correctIndex: 1,
      explanation:
        "An outpost is an advanced square — often on the 5th or 6th rank — that " +
        "one of your own pawns defends and that no enemy pawn can ever attack. " +
        "A knight parked there is untouchable.",
    },
    {
      type: "sort",
      id: "knights-closed",
      title: "Knight or bishop in a closed position?",
      blurb: "Locked pawns change everything.",
      prompt:
        "In a closed position with locked pawn chains, which piece is usually better?",
      fen: "4k3/pp3ppp/2p1p3/3pP3/2PP1P2/8/PP4PP/4K3 w - - 0 1",
      orientation: "white",
      options: [{ label: "The knight" }, { label: "The bishop" }],
      correctIndex: 0,
      explanation:
        "When pawns are locked, bishops bang into their own chains and have no " +
        "open diagonals. Knights, which can hop over everything, thrive — they " +
        "reroute to outposts the bishop can never reach.",
    },
    {
      type: "quiz",
      id: "knights-support",
      title: "Why outposts are so strong",
      blurb: "The pawn does the protecting.",
      question: "Why is a pawn-supported outpost so strong for a knight?",
      options: [
        "It lets the knight move twice in a row.",
        "Enemy pawns can't chase it, so it sits there for good.",
        "It makes the knight worth a full rook.",
      ],
      correctIndex: 1,
      explanation:
        "Because no enemy pawn can attack the square, the only way to remove the " +
        "knight is to trade a piece for it — usually a bishop, handing you the " +
        "bishop pair. So the knight simply stays, cramping and harassing for the " +
        "rest of the game.",
    },
    {
      type: "puzzle",
      id: "knights-fork",
      title: "The knight forks the queen",
      blurb: "A knight's payoff.",
      fen: "3q3k/ppp5/8/6N1/8/8/PPP5/6K1 w - - 0 1",
      orientation: "white",
      goal: { type: "win-material", minGain: 4 },
      prompt: "White to play and win material with a knight fork.",
      hints: [
        "Find a knight check that also hits the queen.",
        "The fork square is f7.",
      ],
      successText:
        "Nf7+ forks the king and queen — after the king moves, Nxd8 wins the " +
        "queen. The knight's signature blow.",
      solution: ["g5f7", "h8g7", "f7d8"],
    },
    {
      type: "replay",
      id: "knights-outpost-demo",
      title: "Planting a knight",
      blurb: "Watch a knight settle onto a protected outpost.",
      orientation: "white",
      intro:
        "A great square is worth working for. Here White manoeuvres a knight to " +
        "a permanent outpost on d5, supported by a pawn and beyond the reach of " +
        "any Black pawn.",
      steps: [
        { san: "e4", note: "White grabs the centre." },
        { san: "c5", note: "The Sicilian — Black fights for d4." },
        { san: "Nf3", note: "Developing toward the centre." },
        { san: "Nc6", note: "Black develops too." },
        { san: "d4", note: "Opening the position." },
        { san: "cxd4", note: "Black trades in the centre." },
        { san: "Nxd4", note: "White's knight reaches a fine central post." },
        {
          san: "Nf6",
          note: "Black attacks e4 and develops.",
        },
        { san: "Nc3", note: "Defending e4 and eyeing the d5 square." },
        {
          san: "e5",
          note:
            "Black gains space — but this pawn can never again guard d5, leaving " +
            "that square permanently weak.",
        },
        {
          san: "Ndb5",
          note: "The knight begins its journey toward the d5 hole.",
        },
        {
          san: "d6",
          note:
            "Black props up e5. Now d5 is a true outpost: no Black pawn can attack " +
            "it.",
        },
        {
          san: "Nd5",
          note:
            "The knight lands on d5 — supported, central, and unkickable. From " +
            "here it dominates, and Black can only remove it by trading a piece.",
        },
      ],
    },
  ],
};
