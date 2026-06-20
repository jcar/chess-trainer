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
        "A safe square on your own half of the board, near your other pieces.",
        "An advanced square, guarded by your pawn, that no enemy pawn can attack.",
        "Any square on the rim, where the knight has a wide, open view.",
        "A square right next to your king, where it helps with the defense.",
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
        "Closed files, tucked safely behind their own unbroken chain of pawns.",
        "Open or half-open files, and the 7th rank, hitting pawns and cutting off the king.",
        "The same file as their own king, guarding it patiently from a safe distance.",
        "The first rank only, sitting back to hold the back row against any invasion.",
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
        "Each bishop on its own is worth more than a queen once the board opens up fully.",
        "Together they cover both square colors from afar, dominating wide-open positions.",
        "They can force checkmate against a lone king faster than a single queen ever could.",
        "They always defend one another, so neither bishop can ever be won for free.",
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
        "Both sides should ignore it and play on the wings as if it weren't there.",
        "The owner attacks using the space and outposts; the defender blockades and heads for an ending.",
        "Only the defender ever benefits — the isolated pawn is purely a liability.",
        "Whoever owns the isolated queen's pawn holds a decisive, essentially winning long-term advantage.",
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
        "Trade pieces off at random whenever you possibly can, just to keep the whole game simple.",
        "When ahead, trade pieces toward the endgame; when cramped, trade to free your position.",
        "Never trade anything, so you always keep your full army on the board.",
        "Always swap the queens off as fast as you possibly can, in every game.",
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
        "Just grab whichever piece is nearest your hand and make a quick move.",
        "Assess the position, then pick a plan: fix your worst piece or target a weakness.",
        "Always throw your pieces at the enemy king, no matter what the position asks for.",
        "Shuffle your pieces back and forth and wait for the opponent to commit first.",
      ],
      correctIndex: 1,
      explanation:
        "A move without a plan is a wasted move. Find the imbalances — weak pawns or squares, open files, your worst-placed piece — and play purposefully toward them. The classic prompt: 'What's my worst piece, and how do I make it better?'",
    },
  ],
};
