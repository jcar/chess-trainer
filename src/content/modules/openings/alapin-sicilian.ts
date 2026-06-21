import type { Lesson } from "../../types";
import { alapinSicilian } from "../../openings/alapin-sicilian";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Alapin Sicilian lesson. Move sequences come from the shared opening data
// (src/content/openings/alapin-sicilian.ts); the prose here is original.
export const alapinSicilianLesson: Lesson = {
  id: "alapin-sicilian",
  title: "Alapin Sicilian (2.c3)",
  summary:
    "1.e4 c5 2.c3 — meet the Sicilian by building a big centre with d4.",
  activities: [
    buildConcept(alapinSicilian),
    buildReplay(alapinSicilian, {
      id: "alapin-sicilian-main",
      title: "vs 2...d5, move by move",
      blurb: "An easy IQP-style game.",
      intro:
        "Tired of memorizing Sicilian theory? The Alapin (2.c3) prepares d4 to " +
        "build a big centre. Against 2...d5 you reach a comfortable, open game.",
    }),
    {
      type: "quiz",
      id: "alapin-sicilian-idea",
      title: "What is 2.c3 for?",
      blurb: "The point of the pawn move.",
      question: "Why does White play 2.c3 against the Sicilian?",
      options: [
        "To develop a piece toward the kingside.",
        "To support a quick d2–d4, building a big centre instead of memorizing sharp lines.",
        "To trap the black queen on d8.",
      ],
      correctIndex: 1,
      explanation:
        "2.c3 prepares d4 with full pawn support. Instead of entering razor-sharp " +
        "Open Sicilians, White builds a classical centre and gets an easy, " +
        "natural game — often with an isolated queen's pawn.",
    },
    {
      type: "sort",
      id: "alapin-sicilian-aim",
      title: "How does White meet the Sicilian?",
      blurb: "Spot the Alapin move.",
      prompt: "After 1.e4 c5, which move begins the Alapin?",
      fen: alapinSicilian.tabiyaFen,
      orientation: "white",
      options: [
        { label: "2.c3, preparing d4" },
        { label: "2.Nf3 then 3.d4, the Open Sicilian" },
        { label: "2.Nc3, the Closed Sicilian" },
      ],
      correctIndex: 0,
      explanation:
        "The Alapin is defined by 2.c3 — supporting a d4 push to build the " +
        "centre rather than entering main-line Sicilian theory.",
    },
    buildOpeningDrill(alapinSicilian, {
      id: "alapin-sicilian-recall",
      title: "Play it: the Alapin as White",
      blurb: "Reproduce the 2...d5 line.",
      learnerColor: "white",
      intro:
        "Your turn to play the Alapin as White. Make the moves against 2...d5 — " +
        "drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — c3 and d4 give White a big centre and an easy, natural " +
        "game against the Sicilian.",
    }),
    buildReplay(alapinSicilian, {
      id: "alapin-sicilian-nf6",
      title: "vs 2...Nf6",
      blurb: "When Black attacks e4.",
      lineIdx: 1,
      intro:
        "Black's other main try is 2...Nf6, hitting e4. White gains space by " +
        "pushing e5 and reaches a comfortable French-like centre. Step through it.",
    }),
  ],
};
