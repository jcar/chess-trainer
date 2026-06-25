// Chess for Kids — Lesson 7: draws (ties).

import type { Lesson } from "../../types";

export const l7: Lesson = {
  id: "kids-l7-draws",
  title: "7. Draws (Ties)",
  summary:
    "Not every game has a winner — sometimes it's a tie, called a draw. Learn the ways a game can end in a tie.",
  activities: [
    {
      id: "kids-l7-draws-concept",
      type: "concept",
      check: {
        question: "Stalemate means no legal move but the king is NOT in check. That is a…",
        options: ["Draw (a tie)","Win","Loss"],
        correctIndex: 0,
        explanation: "Careful — stalemate is only a tie, even if you have way more pieces!",
      },
      title: "Sometimes Nobody Wins",
      blurb: "A tie is called a draw.",
      body: "Not every game has a winner! Sometimes a game ends in a tie, which we call a draw. Let's learn how that can happen.",
    },
    {
      id: "stalemate-sort",
      dialogue: {
        intro: { speaker: "belle", mood: "idle", text: "Look — the king has no move, but he is NOT in check. What does that make it?" },
      },
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
        "Check the lonely king over and over, on and on forever.",
        "Stalemate the king by accident, turning a win into a tie.",
        "Walk your own king away into a brand-new corner square.",
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
        "Capturing the enemy queen with your strong rook for free.",
        "Both players agree to a draw, or one spot repeats three times.",
        "Castling to both sides to tuck your king away safely.",
      ],
      correctIndex: 1,
      explanation: "Players can agree to a draw, and the same position repeating three times is a draw too — often from endless checks (perpetual check).",
    },
  ],
};
