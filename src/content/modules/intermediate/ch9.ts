// Chapter 9 — How to study openings at the intermediate level.
// Original prose; opening moves are standard theory.

import type { Lesson } from "../../types";

export const ch9: Lesson = {
  id: "ch9-opening-study",
  title: "9. Building an Opening Repertoire",
  summary:
    "At this level, openings are about understanding plans and structures — not memorizing twenty moves. How to choose, learn, and handle surprises.",
  activities: [
    {
      id: "ch9-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "Openings the smart way.",
      body:
        "You don't need to memorize twenty moves of theory to play the opening well. At this level the goal is to reach a middlegame you UNDERSTAND — knowing the structure, where your pieces belong, and the plan you're heading for.\n\nWe'll cover how to actually study openings, what a practical repertoire looks like, how to handle transpositions and surprises, then point you to the course and trainer where you'll build and drill your own.",
      points: [
        "Understand plans and structures, not move lists.",
        "Keep a compact repertoire you know deeply.",
        "When surprised, fall back on principles.",
      ],
    },
    {
      id: "ch9-opening-study-concept",
      type: "concept",
      title: "Openings: understand, don't memorize",
      blurb: "Why plans beat move lists.",
      body:
        "At the intermediate level, an opening is not a list of moves to recite — it's a way of reaching a middlegame you understand. The goal is to learn the typical pawn structures, where each piece belongs, and the plan you're steering toward.\n\nThe diagram is the main line of the Closed Ruy Lopez: both sides simply followed the principles — center, develop, castle — into a rich middlegame that revolves around White's coming d4 break. You don't memorize this; you understand the plan, so you'd find these moves on your own. A small, consistent repertoire works best: one main opening for White and reliable answers to 1.e4 and 1.d4 as Black.\n\nBecause you know the resulting position rather than one move order, you'll recognize it even when it arrives by a different route — that's a transposition. And when an opponent leaves theory with an off-beat move, you don't panic: fall back on principles and let good development punish the weaker move on its own.",
      points: [
        "Learn the plan and structure, not twenty memorized moves.",
        "A compact repertoire you know well beats a thick one you don't.",
        "Off-beat or out-of-order moves? Fall back on principles: develop, take the center, get the king safe.",
      ],
      diagrams: [
        {
          fen: "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 9",
          orientation: "white",
          caption: "The Closed Ruy Lopez: developed by principle, both kings castled, poised around White's d4 break. Understand it — don't memorize it.",
        },
      ],
      check: {
        question: "What's the best thing to take away from studying a position like this?",
        options: [
          "The plan and pawn structure, so you'd find the moves yourself",
          "The exact move order, memorized twenty moves deep",
          "Nothing — openings can't be studied usefully",
        ],
        correctIndex: 0,
        explanation:
          "Understanding beats memorizing. Know which squares matter, where your pieces belong, and what plan you're aiming for, and you'll play well even when your opponent leaves theory.",
      },
    },
    {
      id: "ruy-model-game",
      type: "replay",
      title: "A model opening: the Closed Ruy Lopez",
      blurb: "Principled development into a real middlegame.",
      orientation: "white",
      eval: true,
      source: "Ruy López, Closed",
      intro:
        "Watch how both sides follow the principles into a rich middlegame. This is the Closed Ruy Lopez — one of the most instructive openings in chess. The eval barely moves: when you understand the plan rather than memorizing, you reach a balanced, playable middlegame every time.",
      steps: [
        { san: "e4", note: "Claim the center." },
        { san: "e5", note: "Black answers symmetrically." },
        { san: "Nf3", note: "Develop with a threat to e5." },
        { san: "Nc6", note: "Defend and develop." },
        { san: "Bb5", note: "The Ruy Lopez — pressure the knight that guards e5." },
        { san: "a6", note: "Question the bishop." },
        { san: "Ba4", note: "Keep the pin-like pressure along the diagonal." },
        { san: "Nf6", note: "Black develops and attacks e4 in return." },
        { san: "O-O", note: "King safety first — White castles even while e4 is 'hanging' (it's a well-known pawn sac that Black shouldn't grab)." },
        { san: "Be7", note: "Black calmly develops and prepares to castle." },
        { san: "Re1", note: "The rook supports e4 and eyes the e-file." },
        { san: "b5", note: "Black gains queenside space and hits the bishop." },
        { san: "Bb3", note: "The bishop retreats to a great diagonal aiming at f7." },
        { san: "d6", note: "Black opens the bishop and supports e5." },
        { san: "c3", keyIdea: "Understand the plan: the d4 break", note: "Prepare d4 — White's central break and the heart of the plan." },
        { san: "O-O", note: "Both kings are safe; a long, strategic middlegame begins around the d4 break." },
      ],
    },
    {
      id: "ch9-guess-london",
      type: "guessMove",
      title: "Your turn: play a system",
      blurb: "Predict the London setup — the same plan every game.",
      orientation: "white",
      source: "London System",
      intro:
        "A 'system' opening is the compact-repertoire idea in action: you aim for the SAME healthy setup whatever Black does, so you understand it cold. Predict White's London moves — you're learning a structure, not a move list.",
      moves: [
        "d4", "d5", "Bf4", "Nf6", "e3", "e6", "Nf3", "Bd6", "Bg3",
      ],
      guessAt: [2, 4, 6],
      notes: [
        undefined, undefined,
        "The London's signature: the bishop comes OUT before the e-pawn boxes it in. Same move against almost anything Black plays.",
        undefined,
        "Now open the path for the other bishop and solidify the center. The setup is always this shape.",
        undefined,
        "Develop the kingside knight and you're a move from castling. One structure, deeply understood — that's a repertoire.",
      ],
      successText:
        "That's the system idea: a repeatable setup you reach by understanding, not memorization. Reach a position you know, and you spend your thinking on plans — not panic.",
    },
    {
      id: "ch9-build-it",
      type: "concept",
      title: "Now go build your repertoire",
      blurb: "Where to actually choose and drill your openings.",
      body:
        "You now know HOW to study openings: learn plans and structures, keep your repertoire compact, and fall back on principles when an opponent surprises you. The next step is to pick your openings and drill them until they're second nature.\n\nThat's exactly what the Chess Openings course and the Openings Trainer are for. The course walks you through each opening's big idea, main line, and key variations — including dependable practical weapons like the London System and Vienna for White, and the Caro-Kann, Scandinavian, and Queen's Gambit Declined for Black. The Trainer then turns your chosen openings into spaced-repetition drills, resurfacing the lines you struggle with so they stick.",
      points: [
        "Choose a compact repertoire in the Chess Openings course (start with the Core openings).",
        "Add them to the Openings Trainer and drill — it spaces out reviews and revisits your weak lines.",
        "Come back here for the thinking that ties it together: plans over memorization.",
      ],
    },
  ],
};
