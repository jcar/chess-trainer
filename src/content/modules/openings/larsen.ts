import type { Lesson } from "../../types";
import { larsen } from "../../openings/larsen";
import { buildReplay, buildOpeningDrill } from "../../openings";

// Larsen's Opening lesson. Move sequences come from the shared opening data
// (src/content/openings/larsen.ts); the prose here is original.
export const larsenLesson: Lesson = {
  id: "larsen",
  title: "Larsen's Opening",
  summary: "1.b3 — fianchetto the queen's bishop and fight for the centre from the flank.",
  activities: [
    buildReplay(larsen, {
      id: "larsen-main",
      title: "The Nimzo-Larsen, move by move",
      blurb: "Step through the classical 1...e5 line.",
      intro:
        "Larsen's Opening begins 1.b3, preparing to fianchetto the bishop to b2 " +
        "where it eyes the long diagonal. Let's walk through a classical line.",
    }),
    {
      type: "quiz",
      id: "larsen-idea",
      title: "Why 1.b3?",
      blurb: "The point of the fianchetto.",
      question: "What is White's main idea in Larsen's Opening (1.b3)?",
      options: [
        "Fianchetto the bishop to b2 to control the long diagonal.",
        "Win a central pawn by force within a few moves.",
        "Trade queens early to reach a quiet endgame.",
      ],
      correctIndex: 0,
      explanation:
        "1.b3 prepares Bb2, placing the bishop on the long a1–h8 diagonal where it " +
        "pressures e5 and the centre from the flank — a hypermodern approach.",
    },
    {
      type: "sort",
      id: "larsen-aim",
      title: "Where does the bishop go?",
      blurb: "Spot the fianchetto.",
      prompt: "In Larsen's Opening, which square does White's queen's bishop head to?",
      fen: larsen.tabiyaFen,
      orientation: "white",
      options: [{ label: "b2" }, { label: "c4" }, { label: "f4" }],
      correctIndex: 0,
      explanation:
        "After 1.b3 the bishop goes to b2, raking the long dark-squared diagonal " +
        "toward e5 and beyond.",
    },
    buildOpeningDrill(larsen, {
      id: "larsen-recall",
      title: "Play it: Larsen's Opening",
      blurb: "Reproduce the main line as White.",
      learnerColor: "white",
      intro:
        "Your turn to play the Nimzo-Larsen as White. Make the moves of the " +
        "classical line — use Show me if you get stuck.",
      successText:
        "Nicely done — the bishop is humming on the long diagonal and your setup " +
        "is flexible and ready.",
    }),
    buildReplay(larsen, {
      id: "larsen-var",
      title: "Against 1...d5",
      blurb: "A Bird-like reversed setup.",
      lineIdx: 1,
      intro:
        "When Black answers 1...d5, White can clamp down with f4 in a Bird-like " +
        "structure. Step through this flexible plan.",
    }),
  ],
};
