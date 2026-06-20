// Chapter 15 — Intermediate strategy: the positional ideas behind strong moves.
// Original prose.

import type { Lesson } from "../../types";

export const ch15: Lesson = {
  id: "ch15-strategy",
  title: "15. Positional Strategy",
  summary:
    "When there's no tactic, strategy decides: where pieces belong, which files and squares matter, and how to turn small edges into wins.",
  activities: [
    {
      id: "outposts",
      type: "quiz",
      title: "Knight outposts",
      blurb: "A knight's dream home.",
      question:
        "What makes a square an ideal 'outpost' for a knight?",
      options: [
        "It is in your own half of the board.",
        "An advanced square, protected by your pawn, that an enemy pawn can no longer attack.",
        "Any square on the edge of the board.",
        "A square next to your king.",
      ],
      correctIndex: 1,
      explanation:
        "An outpost is an advanced square (often the 5th/6th rank) defended by one of your pawns and safe from enemy pawns. A knight planted there — especially on an open file's key square — can dominate the position.",
    },
    {
      id: "rooks-open-files",
      type: "quiz",
      title: "Rooks and open files",
      blurb: "Where rooks come alive.",
      question:
        "Rooks are strongest when placed on:",
      options: [
        "Closed files behind their own pawns.",
        "Open (or half-open) files, and especially the 7th rank, where they attack pawns and cut off the king.",
        "The same square as the king.",
        "The first rank only.",
      ],
      correctIndex: 1,
      explanation:
        "Rooks need open lines. Seize open files, then look to penetrate to the 7th rank ('pigs on the seventh'), where a rook devours pawns and traps the enemy king. Doubling rooks on a file multiplies the pressure.",
    },
    {
      id: "bishop-pair",
      type: "quiz",
      title: "The bishop pair",
      blurb: "Two bishops working together.",
      question:
        "Why is the 'bishop pair' often an advantage, especially in open positions?",
      options: [
        "Bishops are worth more than queens.",
        "Together the two bishops cover both colors of squares from a distance, dominating open boards where their long-range power shines.",
        "They can checkmate a lone king faster than a queen.",
        "They protect each other automatically.",
      ],
      correctIndex: 1,
      explanation:
        "A single bishop only ever controls one color. The pair covers both, and on an open board their long reach outclasses knights. Holding the bishop pair is a real, lasting positional plus — open the position to maximize it.",
    },
    {
      id: "iqp",
      type: "quiz",
      title: "The isolated queen's pawn",
      blurb: "Strength and weakness at once.",
      question:
        "An isolated queen's pawn (IQP) is double-edged. What does each side want?",
      options: [
        "Both sides want to ignore it.",
        "The owner uses the space and open lines for an attack (especially the outpost squares it controls); the defender blockades it and aims for an endgame where it's just weak.",
        "Only the defender benefits, never the attacker.",
        "It guarantees a win for whoever owns it.",
      ],
      correctIndex: 1,
      explanation:
        "The IQP gives active pieces, open files, and outpost squares for the middlegame attack — but it's a fixed weakness in the endgame. So the owner plays for a quick initiative; the defender blockades the pawn, trades pieces, and heads for an ending.",
    },
    {
      id: "trading-principles",
      type: "quiz",
      title: "Good trades, bad trades",
      blurb: "Every exchange has a purpose.",
      question:
        "Which is a sound guideline for trading pieces?",
      options: [
        "Trade randomly to simplify.",
        "When ahead in material, trade pieces (not pawns) toward a winning endgame; when cramped, trade to gain space to breathe; trade your bad piece for the opponent's good one.",
        "Never trade anything.",
        "Always trade queens as fast as possible.",
      ],
      correctIndex: 1,
      explanation:
        "Trade with a reason: simplify when ahead, relieve a cramped position, or swap off your worst piece for the opponent's best. Avoid trades that activate the opponent or give up your only active piece.",
    },
    {
      id: "make-a-plan",
      type: "quiz",
      title: "Always have a plan",
      blurb: "The thread that ties it together.",
      question:
        "When the position is quiet and there's no forcing move, what should guide your choice?",
      options: [
        "Move the piece nearest your hand.",
        "Assess the position (pawn structure, weaknesses, piece activity) and pick a concrete plan — improve your worst piece, target a weakness, or seize a key file or square.",
        "Always attack the king regardless of the position.",
        "Shuffle pieces until the opponent moves.",
      ],
      correctIndex: 1,
      explanation:
        "A move without a plan is a wasted move. Find the imbalances — weak pawns or squares, open files, your worst-placed piece — and play purposefully toward them. The classic prompt: 'What's my worst piece, and how do I make it better?'",
    },
  ],
};
