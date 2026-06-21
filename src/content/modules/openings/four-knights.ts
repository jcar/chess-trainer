import type { Lesson } from "../../types";
import { fourKnights } from "../../openings/four-knights";
import { buildReplay, buildOpeningDrill } from "../../openings";

// Four Knights Game lesson. Move sequences come from the shared opening data
// (src/content/openings/four-knights.ts); the prose here is original.
export const fourKnightsLesson: Lesson = {
  id: "four-knights",
  title: "Four Knights Game",
  summary:
    "1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 — both sides develop all four knights for a sound, classical game.",
  activities: [
    buildReplay(fourKnights, {
      id: "four-knights-main",
      title: "The Four Knights, move by move",
      blurb: "Step through the Spanish Four Knights main line.",
      intro:
        "The Four Knights begins 1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6, with every knight " +
        "coming out before anything else. Let's walk through the calm, classical " +
        "handling where both sides pin, castle, and settle in.",
    }),
    {
      type: "quiz",
      id: "four-knights-idea",
      title: "What is the Four Knights about?",
      blurb: "The point of the symmetry.",
      question: "What is the main idea behind the Four Knights Game for White?",
      options: [
        "Develop all four knights and aim for a small, safe classical edge.",
        "Sacrifice a pawn early for a sharp gambit attack.",
        "Attack f7 with the pieces as early as move four.",
      ],
      correctIndex: 0,
      explanation:
        "The Four Knights is the most symmetrical open game: both sides simply " +
        "bring out all four knights. White is not chasing a knockout — just a " +
        "small, durable edge from sound, classical development.",
    },
    {
      type: "sort",
      id: "four-knights-aim",
      title: "Read the position",
      blurb: "What has happened by move three?",
      prompt: "By move three in the Four Knights, what has happened?",
      fen: fourKnights.tabiyaFen,
      orientation: "white",
      options: [
        { label: "All four knights are developed" },
        { label: "Both queens are out" },
        { label: "White has castled" },
      ],
      correctIndex: 0,
      explanation:
        "After 1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 every knight is on its natural " +
        "square. The queens are still home and neither side has castled — the " +
        "opening is named for exactly this knight-first development.",
    },
    buildOpeningDrill(fourKnights, {
      id: "four-knights-recall",
      title: "Play it: the Four Knights as White",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "white",
      intro:
        "Your turn to play the Four Knights as White. Make the moves of the " +
        "Spanish main line — drag or tap a piece, and use Show me if you get " +
        "stuck.",
      successText:
        "Well played — that's the Four Knights: every piece out, king safe, and " +
        "a sound, balanced position to work from.",
    }),
    buildReplay(fourKnights, {
      id: "four-knights-var",
      title: "The Scotch Four Knights",
      blurb: "Striking in the centre with d4.",
      lineIdx: 1,
      intro:
        "For a livelier game, White can break in the centre with an early d4 " +
        "instead of pinning. Step through the Scotch Four Knights.",
    }),
  ],
};
