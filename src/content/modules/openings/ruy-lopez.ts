import type { Lesson } from "../../types";
import { ruyLopez } from "../../openings/ruy-lopez";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Ruy Lopez lesson. Move sequences come from the shared opening data
// (src/content/openings/ruy-lopez.ts); the prose here is original.
export const ruyLopezLesson: Lesson = {
  id: "ruy-lopez",
  title: "Ruy Lopez",
  summary:
    "1.e4 e5 2.Nf3 Nc6 3.Bb5 — patient pressure on the knight that guards e5.",
  activities: [
    buildConcept(ruyLopez),
    buildReplay(ruyLopez, {
      id: "ruy-lopez-main",
      title: "The Closed Ruy Lopez, move by move",
      blurb: "Step through the Morphy Defence main line.",
      intro:
        "The Ruy Lopez begins 1.e4 e5 2.Nf3 Nc6 3.Bb5. Let's walk through the " +
        "classic Closed handling, where both sides develop fully and castle " +
        "before the long strategic battle starts.",
    }),
    buildOpeningDrill(ruyLopez, {
      id: "ruy-lopez-recall",
      title: "Play it: the Ruy Lopez as White",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "white",
      intro:
        "Your turn to play the Ruy Lopez as White. Make the moves of the Closed " +
        "main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Closed Ruy Lopez: patient development, a safe " +
        "king, and lasting pressure on e5.",
    }),
    buildReplay(ruyLopez, {
      id: "ruy-lopez-var",
      title: "The Exchange Variation",
      blurb: "Trading on c6 for a structural edge.",
      lineIdx: 1,
      intro:
        "If you prefer a clearer, more structural plan, White can simply trade " +
        "on c6 and aim for a healthier endgame. Step through the Exchange " +
        "Variation.",
    }),
    buildReplay(ruyLopez, {
      id: "ruy-lopez-var2",
      title: "The Berlin Defence",
      blurb: "Black's rock-solid early ...Nf6.",
      lineIdx: 2,
      intro:
        "Instead of ...a6, Black can answer with the sturdy ...Nf6, inviting an " +
        "early queen trade and a resilient endgame. Step through the Berlin " +
        "Defence.",
    }),
  ],
};
