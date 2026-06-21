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
      id: "ch9-opening-study-concept",
      type: "concept",
      title: "Openings: understand, don't memorize",
      blurb: "Why plans beat move lists.",
      body:
        "At the intermediate level, an opening is not a list of moves to recite — it's a way of reaching a middlegame you understand. The goal is to learn the typical pawn structures, where each piece belongs, and the plan you're steering toward.\n\nThat's why a small, consistent repertoire works best: one main opening for White and reliable answers to 1.e4 and 1.d4 as Black. Familiar positions free your thinking time for plans instead of panic, and when an opponent leaves theory or shuffles their move order, you'll still recognize where you are.",
      points: [
        "Learn the plan and structure, not twenty memorized moves.",
        "A compact repertoire you know well beats a thick one you don't.",
        "Off-beat or out-of-order moves? Fall back on principles: develop, take the center, get the king safe.",
      ],
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
  ],
};
