// Chess for Kids — Lesson 6: the special moves.

import type { Lesson } from "../../types";

export const l6: Lesson = {
  id: "kids-l6-special-moves",
  title: "6. Special Moves",
  summary:
    "Three special moves to learn: castling, pawn promotion, and en passant. Watch them, then make a queen yourself!",
  activities: [
    {
      id: "castle-replay",
      type: "replay",
      title: "Castling: tuck your king away",
      blurb: "King and rook move together.",
      orientation: "white",
      intro:
        "Castling is the only move where TWO pieces move at once — the king and a rook. It pops your king somewhere safe. Watch!",
      steps: [
        { san: "e4", note: "A pawn opens a path for the bishop." },
        { san: "e5", note: "Black answers." },
        { san: "Nf3", note: "The knight leaves g1." },
        { san: "Nc6", note: "Black develops too." },
        { san: "Bc4", note: "The bishop leaves f1. Now the squares between king and rook are empty." },
        { san: "Bc5", note: "Black mirrors." },
        { san: "O-O", note: "Castling! The king jumps two squares to g1 and the rook hops over to f1. Safe and snug." },
      ],
    },
    {
      id: "promotion-replay",
      type: "replay",
      title: "Promotion: a pawn's big dream",
      blurb: "Reach the end, become a queen!",
      orientation: "white",
      startFen: "8/3P4/8/2K5/8/8/5k2/8 w - - 0 1",
      intro:
        "If a pawn reaches the far end of the board, it turns into any piece you choose — almost always a powerful queen!",
      steps: [
        { san: "d8=Q", note: "The pawn reaches the end and becomes a QUEEN! A mighty new piece appears." },
        { san: "Kf3", note: "The enemy king wanders." },
        { san: "Qd3+", note: "The brand-new queen swings across and gives check — that's the power of promotion!" },
      ],
    },
    {
      id: "promotion-target",
      type: "target",
      title: "Make a Queen!",
      blurb: "March the pawn home.",
      piece: "pawn",
      square: "a7",
      orientation: "white",
      targets: ["a8"],
      intro: "Your pawn is one step from the end! Tap it and march it to the gold star to make a queen.",
      successText: "You made a queen! Getting a pawn to the far side is a super power.",
    },
    {
      id: "en-passant-replay",
      type: "replay",
      title: "En passant: the sneaky capture",
      blurb: "A tricky pawn rule.",
      orientation: "white",
      intro:
        "'En passant' means 'in passing'. If an enemy pawn zooms past yours using its two-square jump, your pawn can grab it as if it moved only one square!",
      steps: [
        { san: "e4", note: "White's pawn advances." },
        { san: "a6", note: "Black makes a quiet move." },
        { san: "e5", note: "The white pawn reaches the 5th row." },
        { san: "d5", note: "Black's pawn leaps two squares, trying to sneak past." },
        { san: "exd6", note: "En passant! White grabs it 'in passing', landing on d6. This only works right away!" },
      ],
    },
    {
      id: "promotion-quiz",
      type: "quiz",
      title: "What can a pawn become?",
      blurb: "Choose wisely.",
      question: "When your pawn reaches the other end, what can it turn into?",
      options: [
        "Only a queen.",
        "A queen, rook, bishop, or knight — your choice!",
        "Another king.",
      ],
      correctIndex: 1,
      explanation: "You pick: queen, rook, bishop, or knight. Almost always choose the queen — she's the strongest!",
    },
  ],
};
