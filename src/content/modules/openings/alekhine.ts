import type { Lesson } from "../../types";
import { alekhine } from "../../openings/alekhine";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Alekhine Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/alekhine.ts); the prose here is original.
export const alekhineLesson: Lesson = {
  id: "alekhine",
  title: "Alekhine Defence",
  summary:
    "1.e4 Nf6 — provoke White's pawns forward, then attack the overextended centre.",
  activities: [
    buildConcept(alekhine),
    buildReplay(alekhine, {
      id: "alekhine-main",
      title: "The Modern Variation, move by move",
      blurb: "Step through the Modern main line.",
      intro:
        "The Alekhine begins 1.e4 Nf6. Let's walk through the Modern Variation, " +
        "where Black provokes the pawns, develops calmly, and prepares to chip " +
        "at the centre.",
    }),
    {
      type: "quiz",
      id: "alekhine-idea",
      title: "What is Black doing?",
      blurb: "The hypermodern idea.",
      question: "What is the idea behind 1...Nf6 in the Alekhine Defence?",
      options: [
        "It forces an immediate queen trade.",
        "Black provokes White's pawns forward, then attacks the overextended centre.",
        "It aims for a symmetrical position.",
      ],
      correctIndex: 1,
      explanation:
        "This is a hypermodern idea: rather than occupying the centre with " +
        "pawns, Black lets White push them forward, then undermines the " +
        "overextended front with breaks like ...d6 and ...c5.",
    },
    {
      type: "sort",
      id: "alekhine-aim",
      title: "The invitation",
      blurb: "What Black is inviting.",
      prompt: "What is Black inviting with 1...Nf6 in the Alekhine?",
      fen: alekhine.tabiyaFen,
      orientation: "white",
      options: [
        { label: "White to overextend, then attack the pawns" },
        { label: "An immediate queen trade" },
        { label: "A symmetrical game" },
      ],
      correctIndex: 0,
      explanation:
        "By poking the e-pawn, Black tempts White to push the centre forward. " +
        "Once it overextends, Black treats the pawns as targets and strikes back.",
    },
    buildOpeningDrill(alekhine, {
      id: "alekhine-recall",
      title: "Play it: the Alekhine as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Alekhine as Black. Make the moves of the Modern " +
        "main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Alekhine Modern: the knight retreats to safety " +
        "and Black is poised to undermine the big centre.",
    }),
    buildReplay(alekhine, {
      id: "alekhine-var",
      title: "The Four Pawns Attack",
      blurb: "Meeting White's most ambitious set-up.",
      lineIdx: 1,
      intro:
        "In the Four Pawns Attack, White grabs as much space as possible. It " +
        "looks crushing, but the front is loose — Black challenges it at once. " +
        "Step through it.",
    }),
  ],
};
