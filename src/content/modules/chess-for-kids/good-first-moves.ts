// Good First Moves — opening basics so kids can actually start a real game well.
// Replay + target + sort + quiz (no engine needed for these).

import type { Lesson } from "../../types";

export const goodFirstMoves: Lesson = {
  id: "kids-good-first-moves",
  title: "Good First Moves",
  summary:
    "How to start a game like a champ: grab the middle, get your pieces out, and tuck your king away safe.",
  activities: [
    {
      id: "gfm-center-target",
      type: "target",
      title: "Grab the Middle!",
      blurb: "Put a pawn in the center.",
      piece: "pawn",
      square: "e2",
      orientation: "white",
      targets: ["e4"],
      intro: "The middle of the board is the best place to be! Tap your pawn and march it two squares into the center.",
      successText: "Right in the middle! Controlling the center is the #1 opening idea.",
    },
    {
      id: "gfm-good-opening",
      type: "replay",
      title: "A Great Way to Start",
      blurb: "Watch a perfect opening.",
      orientation: "white",
      intro:
        "Here's a champion's start: grab the center, get the pieces out, and castle the king to safety. Step through it!",
      steps: [
        { san: "e4", note: "A center pawn marches out and grabs the middle." },
        { san: "e5", note: "The other side does the same." },
        { san: "Nf3", note: "Get a piece out! The knight develops and eyes the center." },
        { san: "Nc6", note: "They develop a knight too." },
        { san: "Bc4", note: "Another piece out — the bishop aims across the board." },
        { san: "Bc5", note: "They develop their bishop." },
        { san: "O-O", note: "Castle! The king zips to the corner, safe and sound. That's a perfect opening: center, pieces out, king safe." },
      ],
    },
    {
      id: "gfm-which-first-move",
      type: "sort",
      title: "Which is a good first move?",
      blurb: "Center or edge?",
      prompt: "It's the very first move. Which plan is better?",
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1",
      orientation: "white",
      options: [
        { label: "Push a center pawn", emoji: "👍" },
        { label: "Push a corner pawn", emoji: "👎" },
      ],
      correctIndex: 0,
      explanation: "Push a center pawn (like e4 or d4)! Center pawns open lines for your pieces and grab the most important squares. Corner pawns don't help much early on.",
    },
    {
      id: "gfm-queen-early",
      type: "quiz",
      title: "Bring the queen out early?",
      blurb: "Careful with the queen!",
      question: "Should you bring your queen out to attack on the very first moves?",
      options: [
        "Yes — she's the strongest, so use her right away!",
        "No — the enemy can chase her around and gain time. Get knights and bishops out first.",
        "Yes, but only on move one.",
      ],
      correctIndex: 1,
      explanation: "Keep the queen home at first! If she comes out too early, your opponent attacks her and develops their pieces for free while she runs away. Bring out knights and bishops first.",
    },
    {
      id: "gfm-castle-quiz",
      type: "quiz",
      title: "Why castle?",
      blurb: "King safety!",
      question: "Why is castling such a good idea in the opening?",
      options: [
        "It wins a pawn.",
        "It tucks your king safely in the corner AND brings a rook toward the middle.",
        "It lets the king attack.",
      ],
      correctIndex: 1,
      explanation: "Castling does two great things at once: your king hides safely behind its pawns, and a rook jumps toward the center where it's useful. Try to castle early in every game!",
    },
  ],
};
