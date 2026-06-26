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
        "At the intermediate level, an opening is not a list of moves to recite — it's a way of reaching a middlegame you understand. The goal is to learn the typical pawn structures, where each piece belongs, and the plan you're steering toward.\n\nThe diagram is the main line of the Closed Ruy Lopez: both sides simply followed the principles — center, develop, castle — into a rich middlegame that revolves around White's coming d4 break. You don't memorize this; you understand the plan, so you'd find these moves on your own. A small, consistent repertoire works best: one main opening for White and reliable answers to 1.e4 and 1.d4 as Black.",
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
      id: "study-openings-right",
      type: "quiz",
      title: "How to actually learn an opening",
      blurb: "Memorization vs. understanding.",
      question:
        "What's the most useful way to study an opening as an improving player?",
      options: [
        "Memorize the first twenty moves of every single main line by heart, in exact move order.",
        "Understand the typical pawn structures, piece placements, and middlegame plans it leads to.",
        "Learn only the sharp lines that win material in the first few moves.",
        "Skip opening study entirely and just improvise from move one.",
      ],
      correctIndex: 1,
      explanation:
        "Understanding beats memorizing. If you know WHY the moves are played — which squares matter, where your pieces belong, what plan you're aiming for — you'll find good moves even when your opponent plays something unexpected.",
    },
    {
      id: "what-is-repertoire",
      type: "quiz",
      title: "What's a repertoire?",
      blurb: "Your set of go-to openings.",
      question:
        "A practical opening 'repertoire' for an improving player is best described as:",
      options: [
        "A thick binder covering every opening ever played at the master level, kept ready.",
        "A small, consistent set you know well: a White opening plus defenses to 1.e4 and 1.d4.",
        "Whatever your opponent happens to play that day, reacted to fresh over the board.",
        "A collection of sharp gambits, chosen purely to surprise unprepared opponents.",
      ],
      correctIndex: 1,
      explanation:
        "Pick a compact repertoire and learn it deeply: one main opening for White, and reliable answers to 1.e4 and 1.d4 for Black. Familiar positions mean you spend your thinking time on plans, not panic.",
    },
    {
      id: "ruy-model-game",
      type: "replay",
      title: "A model opening: the Closed Ruy Lopez",
      blurb: "Principled development into a real middlegame.",
      orientation: "white",
      intro:
        "Watch how both sides follow the principles into a rich middlegame. This is the Closed Ruy Lopez — one of the most instructive openings in chess.",
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
        { san: "c3", note: "Prepare d4 — White's central break and the heart of the plan." },
        { san: "O-O", note: "Both kings are safe; a long, strategic middlegame begins around the d4 break." },
      ],
    },
    {
      id: "transposition",
      type: "quiz",
      title: "Move order & transposition",
      blurb: "Different paths, same position.",
      question:
        "Your opponent plays the moves of your favorite opening but in a different order, reaching the same setup. This is called:",
      options: [
        "Cheating — they have stolen your preparation against the rules.",
        "A transposition — reaching a known position by a different move order.",
        "An illegal sequence that the arbiter should force them to take back.",
        "A gambit, since changing the move order must cost one side a pawn.",
      ],
      correctIndex: 1,
      explanation:
        "Transpositions are everywhere. Because you understand the resulting structure (not just one move sequence), you'll recognize the position no matter which order the moves arrived in.",
    },
    {
      id: "offbeat-response",
      type: "quiz",
      title: "When they leave theory",
      blurb: "Facing an unfamiliar move.",
      question:
        "Your opponent plays a strange, non-theoretical move in the opening. What's the soundest response?",
      options: [
        "Resign on the spot, since you are now out of your prepared lines.",
        "Fall back on principles: develop a piece, fight for the center, keep the king safe.",
        "Mirror their strange move exactly and aim for a symmetrical, dead-equal position.",
        "Launch an immediate piece sacrifice to punish them for leaving theory.",
      ],
      correctIndex: 1,
      explanation:
        "Offbeat moves are usually slightly inferior. Don't try to refute them with a wild attack — just play principled chess. Good development almost always punishes a bad opening move on its own.",
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
