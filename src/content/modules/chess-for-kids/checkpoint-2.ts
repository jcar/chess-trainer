import type { Lesson } from "../../types";

// Pip's Challenge #2 — after capturing/values, playing smart, check & mate,
// special moves, and draws. Guardian for the Orange Belt. Mixes in an earlier
// concept (rook move) for spaced review.
export const checkpoint2: Lesson = {
  id: "kids-checkpoint-2",
  title: "Pip's Challenge: Winning & Safety",
  summary: "Captures, checkmate, draws — a big mix. You've got this!",
  activities: [
    {
      id: "checkpoint-2",
      type: "reviewCheckpoint",
      title: "Pip's Second Challenge",
      blurb: "Values, check & mate, special moves, and draws.",
      intro:
        "Time for a bigger challenge! Answer Pip's questions to earn your Orange Belt.",
      masteryBar: 0.7,
      successText: "Brilliant! You know how to win and stay safe. Orange Belt earned! 🥋",
      items: [
        {
          conceptId: "piece-values",
          question: "Which piece is worth the most points?",
          options: ["The queen", "The rook", "A pawn"],
          correctIndex: 0,
          explanation: "The queen is worth about 9 — the most of all!",
        },
        {
          conceptId: "safe-capture",
          question: "Before you grab a piece, you should check whether it is…",
          options: ["Defended", "Pretty", "Your favorite"],
          correctIndex: 0,
          explanation: "If it's defended, taking it could lose your own piece!",
        },
        {
          conceptId: "check",
          question: "When your king is under attack, that is called…",
          options: ["Check", "Castling", "A draw"],
          correctIndex: 0,
          explanation: "Check! You must get out of it right away.",
        },
        {
          conceptId: "mate-vs-stalemate",
          question: "Checkmate is when the king is in check and…",
          options: ["Cannot escape", "Can run away", "It is your turn"],
          correctIndex: 0,
          explanation: "In check with no escape = checkmate. Game over!",
        },
        {
          conceptId: "mate-vs-stalemate",
          question: "No legal move, but the king is NOT in check. That is…",
          options: ["Stalemate (a draw)", "Checkmate", "A win"],
          correctIndex: 0,
          explanation: "Stalemate is only a tie — careful not to do it by accident!",
        },
        {
          conceptId: "promotion",
          question: "A pawn that reaches the far end can become a…",
          options: ["Queen", "King", "Second pawn"],
          correctIndex: 0,
          explanation: "Promotion! Most players choose a queen, the strongest piece.",
        },
        {
          conceptId: "draws",
          question: "A game that ends with no winner is called a…",
          options: ["Draw", "Check", "Castle"],
          correctIndex: 0,
          explanation: "A draw is a tie — nobody wins.",
        },
        {
          conceptId: "rook-move",
          question: "Quick — how does the rook move?",
          options: ["Straight lines", "Diagonals", "L-shapes"],
          correctIndex: 0,
          explanation: "Straight lines, up/down and across!",
        },
      ],
    },
  ],
};
