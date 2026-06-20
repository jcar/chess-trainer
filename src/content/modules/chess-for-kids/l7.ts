// Chess for Kids — Lesson 7: draws (ties).

import type { Lesson } from "../../types";

export const l7: Lesson = {
  id: "kids-l7-draws",
  title: "7. Draws (Ties)",
  summary:
    "Not every game has a winner — sometimes it's a tie, called a draw. Learn the ways a game can end in a tie.",
  activities: [
    {
      id: "stalemate-sort",
      type: "sort",
      title: "Checkmate or Stalemate?",
      blurb: "King stuck, but is it check?",
      prompt: "The black king has no move. Is this Checkmate or Stalemate?",
      fen: "7k/5Q2/6K1/8/8/8/8/8 b - - 0 1",
      orientation: "white",
      options: [
        { label: "Checkmate", emoji: "👑" },
        { label: "Stalemate", emoji: "🤝" },
      ],
      correctIndex: 1,
      explanation: "Stalemate — a tie! The king can't move but is NOT in check. That's a draw, not a win.",
    },
    {
      id: "insufficient-sort",
      type: "sort",
      title: "Can anyone win?",
      blurb: "Is there enough to checkmate?",
      prompt: "White has only a king and ONE knight. Black has only a king. Can anyone checkmate?",
      fen: "4k3/8/8/8/8/8/5N2/4K3 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Someone can win", emoji: "🏆" },
        { label: "It's a draw", emoji: "🤝" },
      ],
      correctIndex: 1,
      explanation: "It's a draw! A lone knight (or a lone bishop) can't force checkmate. You need a rook, a queen, two bishops, or a pawn to promote.",
    },
    {
      id: "dont-stalemate",
      type: "quiz",
      title: "Don't tie a winning game!",
      blurb: "A warning for winners.",
      question: "You have a queen against a lonely king. What must you be careful NOT to do?",
      options: [
        "Check too much.",
        "Accidentally stalemate the king — turning your win into a tie.",
        "Move your own king.",
      ],
      correctIndex: 1,
      explanation: "Before each move, ask: 'Will my opponent still have a move?' Leave the king an escape square until you actually checkmate.",
    },
    {
      id: "other-draws",
      type: "quiz",
      title: "Other ways to tie",
      blurb: "Two more draws.",
      question: "Besides stalemate, which of these is also a draw?",
      options: [
        "Capturing a queen.",
        "Both players agreeing to a draw, or the same position happening three times.",
        "Castling twice.",
      ],
      correctIndex: 1,
      explanation: "Players can agree to a draw, and the same position repeating three times is a draw too — often from endless checks (perpetual check).",
    },
  ],
};
