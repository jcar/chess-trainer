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
