// Chapter 8 — Beginner strategy: the ideas that guide moves when there's no tactic.
// Original prose.

import type { Lesson } from "../../types";

export const ch8: Lesson = {
  id: "ch8-strategy",
  title: "8. Beginner Strategy",
  summary:
    "When nothing is forcing, strategy decides your move: target weaknesses, claim space, and know which pieces thrive in which positions.",
  activities: [
    {
      id: "ch8-strategy-concept",
      type: "concept",
      title: "Choosing a move with no tactic",
      blurb: "What strategy is for.",
      body:
        "When nothing is forcing — no captures, checks, or threats to calculate — strategy decides your move. The big ideas are simple: target the opponent's weaknesses (especially pawns that can't be defended by other pawns), claim space so your pieces move freely, and play to the strengths of your pieces. Bishops love open positions with long clear diagonals; knights prefer closed positions where they can hop over locked pawns.\n\nYour own pawn placement matters too: a bishop blocked in by its own pawns is a 'bad' bishop, so try to keep pawns off its color. And when you're ahead in material, trade pieces (not pawns) to simplify toward an easy winning endgame; when behind, do the opposite and keep the pieces on to create chances.",
      points: [
        "Target weak pawns; claim space for freer pieces.",
        "Open positions favor bishops, closed ones favor knights.",
        "Ahead in material: trade pieces, keep pawns, simplify to win.",
      ],
    },
    {
      id: "pawn-weaknesses",
      type: "quiz",
      title: "Pawn weaknesses",
      blurb: "Pawns can't move backward.",
      question:
        "Why is an 'isolated' pawn (no friendly pawns on the files beside it) often a weakness?",
      options: [
        "It is permanently barred from ever promoting to a queen.",
        "No pawn can defend it, and the square in front is an enemy outpost.",
        "It always ends up blocking your own king's escape squares.",
        "An isolated pawn is worth zero points in any trade.",
      ],
      correctIndex: 1,
      explanation:
        "An isolated pawn can't be defended by another pawn, so pieces must babysit it, and the square in front of it is a hole the opponent can occupy. Doubled and isolated pawns are classic long-term targets.",
    },
    {
      id: "space-advantage",
      type: "quiz",
      title: "Space",
      blurb: "Room to maneuver.",
      question:
        "What practical benefit does a space advantage (pawns further up the board) usually give?",
      options: [
        "It guarantees a forced checkmate later in the game.",
        "Your pieces maneuver freely while the opponent's are cramped.",
        "It wins a pawn immediately by force in the middlegame.",
        "It permanently prevents the opponent from castling.",
      ],
      correctIndex: 1,
      explanation:
        "Space lets your pieces reposition freely while the cramped side struggles to find good squares. Space isn't a direct win, but it makes everything else easier — and the cramped side often seeks to trade pieces for relief.",
    },
    {
      id: "open-vs-closed",
      type: "quiz",
      title: "Open vs. closed positions",
      blurb: "Bishops vs. knights.",
      question:
        "In a wide-open position with few pawns and long, clear diagonals, which minor piece tends to be stronger?",
      options: [
        "The knight, because it can jump over other pieces.",
        "The bishop, because it rakes long open diagonals from afar.",
        "They are always exactly equal regardless of structure.",
        "Neither — only the rooks really matter in open positions.",
      ],
      correctIndex: 1,
      explanation:
        "Open positions favor bishops, which love long, unobstructed diagonals. Closed positions (locked pawn chains) favor knights, which hop over the blockage and reach squares bishops can't. Match your plan to the structure.",
    },
    {
      id: "good-vs-bad-bishop",
      type: "quiz",
      title: "Good bishop, bad bishop",
      blurb: "Don't trap your own bishop.",
      question:
        "What makes a bishop a 'bad' bishop?",
      options: [
        "It happens to be the wrong color for the position.",
        "Its own pawns are fixed on its color, blocking its diagonals.",
        "It has not captured anything for the whole game.",
        "It started the game on the queenside, not the kingside.",
      ],
      correctIndex: 1,
      explanation:
        "A 'bad' bishop is hemmed in by its own pawns sitting on its color. Try to place your pawns on the opposite color to your bishop, keeping its diagonals open — and aim to trade off your bad bishop for a good enemy piece.",
    },
    {
      id: "trade-when-ahead",
      type: "quiz",
      title: "Simplify when ahead",
      blurb: "Turning an edge into a win.",
      question:
        "You're up a clean piece. As a general rule, which trades do you want?",
      options: [
        "Trade off the pawns and keep all the pieces on the board.",
        "Trade pieces, not pawns, to reach a winning endgame.",
        "Avoid every trade for the rest of the game.",
        "Trade away your extra piece as fast as you possibly can.",
      ],
      correctIndex: 1,
      explanation:
        "When ahead in material, trade PIECES to reduce the opponent's attacking chances and reach a simple, winning endgame — but keep pawns, since they're what you'll promote. When behind, do the opposite: keep pieces on and seek complications.",
    },
  ],
};
