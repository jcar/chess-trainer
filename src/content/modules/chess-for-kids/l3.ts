// Chess for Kids — Lesson 3: the king, the knight, and the pawn.

import type { Lesson } from "../../types";

export const l3: Lesson = {
  id: "kids-l3-king-knight-pawn",
  title: "3. The King, the Knight and the Pawn",
  summary:
    "The king takes baby steps, the knight leaps in an L, and pawns march forward. Tap each piece to see how it moves!",
  activities: [
    {
      id: "kids-l3-king-knight-pawn-concept",
      type: "concept",
      check: {
        question: "Which piece can jump over other pieces?",
        options: ["The knight","The king","The pawn"],
        correctIndex: 0,
        explanation: "Only the knight can hop over pieces, in its L-shape!",
      },
      title: "Three More Friends",
      blurb: "King, knight, and pawn.",
      body: "The king takes tiny steps, the knight hops in an L, and the pawn marches ahead. Let's meet them all!",
    },
    {
      id: "meet-the-king",
      type: "movemap",
      title: "Meet the King",
      blurb: "Small steps, big importance.",
      piece: "king",
      square: "d4",
      orientation: "white",
      intro: "This is the king — the most important piece of all. Tap him!",
      funFact: "The king takes just one little step at a time, in any direction. Keep him safe!",
    },
    {
      id: "meet-the-knight",
      type: "movemap",
      title: "Meet the Knight",
      blurb: "The jumping horse.",
      piece: "knight",
      square: "d4",
      orientation: "white",
      intro: "Say hello to the knight — the horse! Tap it to see its tricky jumps.",
      funFact: "The knight hops in an L-shape and is the only piece that can jump over others!",
    },
    {
      id: "meet-the-pawn",
      type: "movemap",
      title: "Meet the Pawn",
      blurb: "The brave little soldier.",
      piece: "pawn",
      square: "d2",
      orientation: "white",
      intro: "This little soldier is the pawn. Tap it!",
      funFact: "Pawns march straight forward, but capture diagonally. On its first move, a pawn can hop two squares!",
    },
    {
      id: "knight-star-game",
      type: "target",
      title: "Knight Star Game",
      blurb: "Hop to collect the stars!",
      piece: "knight",
      square: "d4",
      orientation: "white",
      targets: ["f5", "h6"],
      intro: "Tap the knight and watch its L-jumps light up. Hop, hop, hop to collect both stars!",
      successText: "Hop hop — you collected every star! The knight's jumps are tricky, and you've got them.",
    },
    {
      id: "knight-pattern",
      type: "pictureQuiz",
      title: "How does the knight move?",
      blurb: "Spot the L-jumps.",
      question: "Which picture shows how the KNIGHT moves?",
      options: [
        {
          fen: "8/8/8/8/3N4/8/8/8 w - - 0 1",
          caption: "Straight",
          arrows: [
            { from: "d4", to: "d8" },
            { from: "d4", to: "a4" },
            { from: "d4", to: "h4" },
          ],
        },
        {
          fen: "8/8/8/8/3N4/8/8/8 w - - 0 1",
          caption: "L-jumps",
          arrows: [
            { from: "d4", to: "e6" },
            { from: "d4", to: "c6" },
            { from: "d4", to: "f5" },
            { from: "d4", to: "b5" },
            { from: "d4", to: "f3" },
            { from: "d4", to: "b3" },
            { from: "d4", to: "e2" },
            { from: "d4", to: "c2" },
          ],
        },
        {
          fen: "8/8/8/8/3N4/8/8/8 w - - 0 1",
          caption: "Slanted",
          arrows: [
            { from: "d4", to: "h8" },
            { from: "d4", to: "a1" },
            { from: "d4", to: "g1" },
          ],
        },
      ],
      correctIndex: 1,
      explanation: "The knight jumps in an L-shape to those eight special squares — and can leap over other pieces!",
    },
    {
      id: "pawn-capture-pic",
      type: "pictureQuiz",
      title: "How does a pawn capture?",
      blurb: "Pawns are sneaky!",
      question: "A pawn moves straight ahead. But how does it CAPTURE?",
      options: [
        {
          fen: "8/8/8/2p1p3/3P4/8/8/8 w - - 0 1",
          caption: "Straight",
          arrows: [{ from: "d4", to: "d5" }],
        },
        {
          fen: "8/8/8/2p1p3/3P4/8/8/8 w - - 0 1",
          caption: "Diagonally",
          arrows: [
            { from: "d4", to: "c5" },
            { from: "d4", to: "e5" },
          ],
        },
        {
          fen: "8/8/8/2p1p3/3P4/8/8/8 w - - 0 1",
          caption: "Sideways",
          arrows: [
            { from: "d4", to: "c4" },
            { from: "d4", to: "e4" },
          ],
        },
      ],
      correctIndex: 1,
      explanation: "Pawns capture one square DIAGONALLY forward — not straight ahead. Tricky!",
    },
  ],
};
