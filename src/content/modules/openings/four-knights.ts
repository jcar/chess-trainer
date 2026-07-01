import type { Lesson } from "../../types";
import { fourKnights } from "../../openings/four-knights";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Four Knights Game lesson. Move sequences come from the shared opening data
// (src/content/openings/four-knights.ts); the prose here is original.
export const fourKnightsLesson: Lesson = {
  id: "four-knights",
  title: "Four Knights Game",
  summary:
    "1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6 — both sides develop all four knights for a sound, classical game.",
  activities: [
    buildConcept(fourKnights),
    buildReplay(fourKnights, {
      id: "four-knights-main",
      title: "The Four Knights, move by move",
      blurb: "Step through the Spanish Four Knights main line.",
      intro:
        "The Four Knights begins 1.e4 e5 2.Nf3 Nc6 3.Nc3 Nf6, with every knight " +
        "coming out before anything else. Let's walk through the calm, classical " +
        "handling where both sides pin, castle, and settle in.",
    }),
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
