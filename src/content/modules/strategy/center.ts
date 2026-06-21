// Chess Strategy — Lesson 8: The Center. Original prose.

import type { Lesson } from "../../types";

export const centerLesson: Lesson = {
  id: "center",
  title: "The Center",
  summary:
    "Control the centre — but know the difference between a strong centre and an overextended one.",
  activities: [
    {
      type: "quiz",
      id: "center-why",
      title: "Why the centre matters",
      blurb: "The board's crossroads.",
      question: "Why is central control valuable?",
      options: [
        "It prevents the opponent from castling.",
        "The centre squares are worth bonus points.",
        "Central pieces and pawns reach both sides of the board quickly.",
      ],
      correctIndex: 2,
      explanation:
        "From the middle, your pieces touch both wings in a move or two. A knight " +
        "on the rim is dim; a knight in the centre fights for the whole board.",
    },
    {
      type: "sort",
      id: "center-attack",
      title: "Facing a big centre",
      blurb: "How to hit back.",
      prompt: "Your opponent has a big pawn centre. A classic response is to...",
      fen: "rnbqkb1r/ppp1pppp/5n2/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
      orientation: "black",
      options: [
        { label: "Strike at it with a pawn break" },
        { label: "Trade all the pieces" },
      ],
      correctIndex: 0,
      explanation:
        "A big centre is only strong while it's intact. Hit it with a pawn break " +
        "and the proud centre can crumble into weaknesses.",
    },
    {
      type: "quiz",
      id: "center-types",
      title: "Overextended centre",
      blurb: "Too much of a good thing.",
      question: "An 'overextended' centre is one that...",
      options: [
        "Has been traded off completely.",
        "Has advanced so far it becomes weak and hard to defend.",
        "Contains more than two pawns.",
      ],
      correctIndex: 1,
      explanation:
        "Pawns that race up the board leave gaps behind them. Once the support " +
        "runs out, an overextended centre is a row of targets rather than a wall.",
    },
    {
      type: "sort",
      id: "center-break",
      title: "Spot the break",
      blurb: "A pawn lever in the centre.",
      prompt: "Which move is a typical central break?",
      fen: "r1bqk2r/ppp1bppp/2n2n2/3pp3/4P3/2NP1N2/PPP2PPP/R1BQKB1R b KQkq - 0 6",
      orientation: "black",
      options: [
        { label: "A timely ...d5 or ...c5" },
        { label: "A rook lift to h3" },
      ],
      correctIndex: 0,
      explanation:
        "Central breaks like ...d5 and ...c5 challenge the enemy pawns head-on, " +
        "opening lines for your pieces. A rook lift is an attacking idea, not a " +
        "way to fight for the centre.",
    },
    {
      type: "replay",
      id: "center-demo",
      title: "Hitting the centre",
      blurb: "Build it, then break it.",
      orientation: "white",
      intro:
        "White builds a broad pawn centre; Black waits, then strikes at it with a " +
        "well-timed break to free the position.",
      steps: [
        { san: "e4", note: "White claims the first central square." },
        { san: "e6", note: "Black prepares to challenge with ...d5 later." },
        { san: "d4", note: "Now White has the classic two-pawn centre." },
        { san: "d5", note: "Black hits the centre at once instead of letting it grow." },
        { san: "Nc3", note: "Defending e4 and developing toward the centre." },
        { san: "Nf6", note: "Adding a second attacker to the e4-pawn." },
        { san: "e5", note: "White pushes past — gaining space but committing the centre." },
        { san: "Nfd7", note: "The knight reroutes to hit the head of the pawn chain." },
        { san: "f4", note: "White over-protects e5, building a big advanced centre." },
        { san: "c5", note: "The break! Black strikes at the base of the chain." },
        { san: "Nf3", note: "Developing and bracing the d4-pawn." },
        { san: "Nc6", note: "Piling on d4 — the centre is now the main battleground." },
      ],
    },
  ],
};
