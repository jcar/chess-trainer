// Chess for Kids — Lesson 1: the board (vision & coordinates).
// Visual-first; all prose original.

import type { Lesson } from "../../types";

export const l1: Lesson = {
  id: "kids-l1-board",
  title: "1. The Chess Board",
  summary:
    "Hi! I'm Pip. Let's explore the board — the squares, their colors, and the pieces — with games you can play by tapping.",
  activities: [
    {
      id: "kids-l1-board-concept",
      type: "concept",
      title: "Welcome to the Board",
      blurb: "Where chess happens.",
      body: "Hi, I'm Pip! Chess is played on a board of squares, light and dark. Let's get to know it together!",
    },
    {
      id: "find-squares",
      type: "coordinate",
      title: "Square Hunt",
      blurb: "Find the squares!",
      orientation: "white",
      rounds: ["e4", "a1", "h8", "d5", "c6"],
      intro: "Every square has a name — a letter and a number. Find the square I call out!",
      successText: "Amazing — you found them all! Knowing square names helps you talk about chess.",
    },
    {
      id: "light-or-dark",
      type: "sort",
      title: "Light or Dark?",
      blurb: "What color is the square?",
      prompt: "Is the rook standing on a LIGHT square or a DARK square?",
      fen: "8/8/8/8/4R3/8/8/8 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Light", emoji: "⬜" },
        { label: "Dark", emoji: "⬛" },
      ],
      correctIndex: 0,
      explanation: "The rook is on e4, a light square. The board's colors always alternate, like a checkerboard.",
    },
    {
      id: "which-piece",
      type: "sort",
      title: "Which Piece?",
      blurb: "Name that piece.",
      prompt: "Which piece is this?",
      fen: "8/8/8/8/4N3/8/8/8 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Rook", emoji: "🏰" },
        { label: "Knight", emoji: "🐴" },
        { label: "Bishop", emoji: "⛪" },
      ],
      correctIndex: 1,
      explanation: "That's the knight — the horse! It's the trickiest mover, and we'll meet it soon.",
    },
    {
      id: "pieces-wake-up",
      type: "replay",
      title: "Watch the Army Wake Up",
      blurb: "The first few moves.",
      orientation: "white",
      intro:
        "Here's the start of a game. Watch a few pieces step out from the back row, ready for fun!",
      steps: [
        { san: "e4", note: "A pawn marches forward to grab the middle of the board." },
        { san: "e5", note: "The other army answers with a pawn." },
        { san: "Nf3", note: "A knight hops out in an L-shape." },
        { san: "Nc6", note: "A knight comes out on the other side too." },
        { san: "Bc4", note: "A bishop slides out along a diagonal. The game has begun!" },
      ],
    },
    {
      id: "how-many-squares",
      type: "quiz",
      title: "How big is the board?",
      blurb: "Count the squares.",
      question: "How many squares are on a chessboard?",
      options: ["36", "64", "100"],
      correctIndex: 1,
      explanation: "64 squares — 8 across and 8 down. Half light, half dark!",
    },
  ],
};
