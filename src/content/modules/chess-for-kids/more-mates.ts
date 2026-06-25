// Chess for Kids — More Ways to Mate: the back-rank mate and the smothered mate.
// Engine-verified mate-in-1 puzzles. Champions' Road (Nim coaches; Murk taunts).

import type { Lesson } from "../../types";

export const moreMates: Lesson = {
  id: "kids-more-mates",
  title: "More Ways to Mate",
  summary:
    "You know king-and-queen and king-and-rook mates. Now meet two sneaky patterns every champion knows: the back-rank mate and the smothered mate.",
  activities: [
    {
      id: "kids-more-mates-concept",
      type: "concept",
      title: "Two Sneaky Mates",
      blurb: "Back-rank and smothered.",
      body:
        "Some checkmates happen because the king is trapped by its OWN pieces! Two famous ones:\n\nThe BACK-RANK mate: a king hides behind its three pawns, but if a rook or queen slides to the back row, there's no escape — the pawns block the king's own exit. The SMOTHERED mate: a knight checks a king that's so boxed in by its own pieces it can't move at all. Let's spring both!",
      points: [
        "A back-rank mate works when the king's own pawns trap it on the edge.",
        "Make 'luft' (a little air) by nudging a pawn so your king can breathe.",
        "A knight's check can't be blocked — deadly against a boxed-in king.",
      ],
    },
    {
      id: "back-rank-mate",
      type: "puzzle",
      title: "Back-Rank Mate!",
      blurb: "Checkmate in one.",
      dialogue: {
        intro: {
          speaker: "nim",
          text: "The king's stuck behind its pawns, Caller — slide in for mate!",
          mood: "happy",
        },
        onWrong: {
          speaker: "murk",
          text: "Tee-hee! Wrong square. Find the back row!",
          mood: "sly",
        },
      },
      fen: "6k1/5ppp/8/8/8/8/8/4R1K1 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt: "The black king is trapped behind its own pawns. Slide your rook to the back rank for checkmate!",
      hints: ["The king can't escape past its f7, g7, h7 pawns.", "Bring your rook to the 8th rank with check."],
      successText: "Checkmate! Re8# — the rook checks along the back rank and the king's own pawns block every escape.",
      solution: ["e1e8"],
    },
    {
      id: "make-luft",
      type: "quiz",
      title: "Don't Get Back-Ranked",
      blurb: "Give your king air.",
      question: "How do you keep YOUR king safe from a back-rank mate?",
      options: [
        "Nudge a pawn near your king to give it an escape square ('make luft').",
        "Push all three pawns in front of your king as far up the board as you can.",
        "March your king up into the middle of the board to keep it far from the edge.",
      ],
      correctIndex: 0,
      explanation:
        "Giving your king a little 'luft' (air) — like nudging the h-pawn one square — means a check on the back rank isn't mate, because your king has somewhere to step. A handy habit once your rooks and queen are off guarding home.",
    },
    {
      id: "smothered-mate",
      type: "puzzle",
      title: "Smothered Mate!",
      blurb: "The knight finishes.",
      dialogue: {
        intro: {
          speaker: "nim",
          text: "This is my favorite, Caller — the king's boxed in by its own friends. Hop in!",
          mood: "happy",
        },
        onWrong: {
          speaker: "murk",
          text: "Ha! Missed it. Only the knight can reach him now!",
          mood: "sly",
        },
      },
      fen: "6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt: "The black king is smothered — boxed in by its own rook and pawns. Only a knight can reach it. Mate in one!",
      hints: ["A knight's check can't be blocked.", "Hop your knight to f7 — every escape square is taken by Black's own pieces."],
      successText: "Checkmate! Nf7# — the smothered mate. The king is trapped by its own rook and pawns, and a knight check can't be blocked.",
      solution: ["g5f7"],
    },
    {
      id: "more-mates-which",
      type: "sort",
      title: "Spot the Smother",
      blurb: "What traps the king?",
      prompt: "In a smothered mate, what stops the checked king from escaping?",
      fen: "6rk/6pp/5N2/8/8/8/8/6K1 b - - 0 1",
      orientation: "white",
      options: [
        { label: "The king's own pieces block every square", emoji: "🧱" },
        { label: "The knight defends all the escape squares", emoji: "🐴" },
      ],
      correctIndex: 0,
      explanation:
        "It's called 'smothered' because the king is hemmed in by its OWN rook and pawns — it has nowhere to run, and a knight's check can't be blocked or captured. Total trap!",
    },
  ],
};
