import type { Lesson } from "../../types";
import { slavDefence } from "../../openings/slav-defence";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Slav Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/slav-defence.ts); the prose here is original.
export const slavDefenceLesson: Lesson = {
  id: "slav-defence",
  title: "Slav Defence",
  summary:
    "1.d4 d5 2.c4 c6 — solid like the QGD, but the light bishop stays free.",
  activities: [
    buildConcept(slavDefence),
    buildReplay(slavDefence, {
      id: "slav-defence-main",
      title: "The Slav, move by move",
      blurb: "Step through the main line.",
      intro:
        "The Slav Defence begins 1.d4 d5 2.c4 c6. Let's walk through the main " +
        "line where Black supports d5 with ...c6 and gets the light bishop out.",
    }),
    buildOpeningDrill(slavDefence, {
      id: "slav-defence-recall",
      title: "Play it: the Slav as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Slav as Black. Make the moves of the main line — " +
        "drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Slav: solid in the centre, with the light " +
        "bishop already out and active.",
    }),
    buildReplay(slavDefence, {
      id: "slav-defence-var",
      title: "The Exchange Variation",
      blurb: "A symmetrical, solid line.",
      lineIdx: 1,
      intro:
        "White can simplify with an early cxd5. Step through the Exchange " +
        "Variation and see the symmetrical structure it produces.",
    }),
  ],
};
