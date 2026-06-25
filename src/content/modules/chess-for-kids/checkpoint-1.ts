import type { Lesson } from "../../types";

// Pip's Challenge #1 — a mixed review after the board & how-the-pieces-move
// lessons. Guardian for the White Belt. Items are ordered by the SRS at runtime
// (a child's missed concepts come first); options are shuffled per render.
export const checkpoint1: Lesson = {
  id: "kids-checkpoint-1",
  title: "Pip's Challenge: Board & Pieces",
  summary: "A mix of everything so far — show Pip what you remember!",
  activities: [
    {
      id: "checkpoint-1",
      type: "reviewCheckpoint",
      title: "Pip's First Challenge",
      blurb: "Squares, colors, and how the pieces move.",
      intro:
        "Let's see what you remember! Answer Pip's questions — get most of them right to win your White Belt!",
      masteryBar: 0.7,
      successText:
        "Amazing! You really know your board and pieces. White Belt earned! 🥋",
      items: [
        {
          conceptId: "board-size",
          question: "How many squares are on a chess board?",
          options: ["64", "48", "100"],
          correctIndex: 0,
          explanation: "Eight rows of eight — that makes 64 squares!",
        },
        {
          conceptId: "square-colors",
          question: "Chess squares come in two colors. Which two?",
          options: ["Light and dark", "Red and blue", "Gold and silver"],
          correctIndex: 0,
          explanation: "Light and dark, in a checkerboard pattern.",
        },
        {
          conceptId: "coordinates",
          question: "Every square has a name made of a…",
          options: ["Letter and a number", "Color and a shape", "Two numbers"],
          correctIndex: 0,
          explanation: "Like e4 — the letter is the column, the number is the row.",
        },
        {
          conceptId: "rook-move",
          question: "How does the rook move?",
          options: ["In straight lines", "Only diagonally", "In an L-shape"],
          correctIndex: 0,
          explanation: "The rook slides in straight lines — like a train on a track!",
        },
        {
          conceptId: "knight-move",
          question: "Which piece moves in an L and can jump over others?",
          options: ["The knight", "The bishop", "The rook"],
          correctIndex: 0,
          explanation: "Only the knight hops in an L and can leap over pieces.",
        },
        {
          conceptId: "pawn-move",
          question: "How does a pawn capture an enemy piece?",
          options: ["Diagonally forward", "Straight forward", "Sideways"],
          correctIndex: 0,
          explanation: "Pawns march straight but capture one square diagonally forward.",
        },
        {
          conceptId: "piece-id",
          question: "Which piece is tall with a cross on top?",
          options: ["The king", "The pawn", "The knight"],
          correctIndex: 0,
          explanation: "The king wears the cross — keep him safe!",
        },
      ],
    },
  ],
};
