// Chess for Kids — Lesson 2: rooks, bishops, and the queen.
// Move-maps + a star game + a picture quiz + a capture.

import type { Lesson } from "../../types";

export const l2: Lesson = {
  id: "kids-l2-straight-diagonal",
  title: "2. Rooks, Bishops and the Mighty Queen",
  summary:
    "Three pieces that slide across the board. Tap each one to see where it goes, then play the star game!",
  activities: [
    {
      id: "kids-l2-straight-diagonal-concept",
      type: "concept",
      check: {
        question: "Which piece can move both straight AND diagonally?",
        options: ["The queen","The rook","The bishop"],
        correctIndex: 0,
        explanation: "The queen is the most powerful — she slides straight like a rook and diagonally like a bishop!",
      },
      title: "Sliders!",
      blurb: "Pieces that glide.",
      body: "The rook, the bishop, and the queen love to slide across the board. Let's see where each one can go!",
    },
    {
      id: "meet-the-rook",
      type: "movemap",
      title: "Meet the Rook",
      blurb: "The castle tower.",
      piece: "rook",
      square: "d4",
      orientation: "white",
      intro: "This is the rook. It looks like a little castle tower! Tap it to see where it can go.",
      funFact: "The rook moves in straight lines — up, down, and across — like a train on a track!",
    },
    {
      id: "meet-the-bishop",
      type: "movemap",
      title: "Meet the Bishop",
      blurb: "The slanty slider.",
      piece: "bishop",
      square: "d4",
      orientation: "white",
      intro: "Meet the bishop. Tap it to light up its path!",
      funFact: "The bishop moves in slanted lines, and it always stays on its own color. Sneaky!",
    },
    {
      id: "meet-the-queen",
      type: "movemap",
      title: "Meet the Queen",
      blurb: "The most powerful piece.",
      piece: "queen",
      square: "d4",
      orientation: "white",
      intro: "Here comes the queen — the strongest piece of all! Tap her.",
      funFact: "The queen moves in straight lines AND slanted lines. She can zoom almost anywhere!",
    },
    {
      id: "rook-star-game",
      type: "target",
      title: "Rook Star Game",
      blurb: "Drive the rook to the stars!",
      piece: "rook",
      square: "a1",
      orientation: "white",
      targets: ["a8", "h8"],
      intro: "Tap the rook, then tap a gold star to drive there. Remember — rooks go in straight lines! Collect both stars.",
      successText: "Choo choo! You drove the rook like a train and collected every star!",
    },
    {
      id: "rook-pattern",
      type: "pictureQuiz",
      title: "How does the rook move?",
      blurb: "Pick the right arrows.",
      question: "Which picture shows how the ROOK moves?",
      options: [
        {
          fen: "8/8/8/8/3R4/8/8/8 w - - 0 1",
          caption: "Straight",
          arrows: [
            { from: "d4", to: "d8" },
            { from: "d4", to: "d1" },
            { from: "d4", to: "a4" },
            { from: "d4", to: "h4" },
          ],
        },
        {
          fen: "8/8/8/8/3R4/8/8/8 w - - 0 1",
          caption: "Slanted",
          arrows: [
            { from: "d4", to: "h8" },
            { from: "d4", to: "a1" },
            { from: "d4", to: "a7" },
            { from: "d4", to: "g1" },
          ],
        },
        {
          fen: "8/8/8/8/3R4/8/8/8 w - - 0 1",
          caption: "Jumps",
          arrows: [
            { from: "d4", to: "e6" },
            { from: "d4", to: "c6" },
            { from: "d4", to: "f5" },
            { from: "d4", to: "b5" },
          ],
        },
      ],
      correctIndex: 0,
      explanation:
        "The rook moves in straight lines. The slanted lines are for the bishop, and the jumps are for the knight!",
    },
    {
      id: "rook-capture",
      type: "puzzle",
      title: "Capture with the rook!",
      blurb: "Slide over and grab it.",
      fen: "4k3/8/8/8/r7/8/8/R3K3 w - - 0 1",
      orientation: "white",
      goal: { type: "win-material", minGain: 3 },
      prompt:
        "It's White's turn. The enemy rook is on your rook's line with nothing guarding it. Tap your rook, then tap the green dot to capture it!",
      hints: ["Your rook and the enemy rook share the a-file.", "Rooks move in straight lines — go get it!"],
      successText: "Got it! Your rook slid straight up and captured the enemy rook for free.",
      solution: ["a1a4"],
    },
  ],
};
