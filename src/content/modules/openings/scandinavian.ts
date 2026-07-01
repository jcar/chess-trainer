import type { Lesson } from "../../types";
import { scandinavian } from "../../openings/scandinavian";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Scandinavian Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/scandinavian.ts); the prose here is original.
export const scandinavianLesson: Lesson = {
  id: "scandinavian",
  title: "Scandinavian Defence",
  summary:
    "1.e4 d5 — challenge the king's pawn at once, then develop fast.",
  activities: [
    buildConcept(scandinavian),
    buildReplay(scandinavian, {
      id: "scandinavian-main",
      title: "The Main Line, move by move",
      blurb: "Step through the 3...Qa5 main line.",
      intro:
        "The Scandinavian begins 1.e4 d5. Let's walk through the main line, " +
        "where Black recaptures with the queen, retreats it to a5, and develops " +
        "smoothly.",
    }),
    buildOpeningDrill(scandinavian, {
      id: "scandinavian-recall",
      title: "Play it: the Scandinavian as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Scandinavian as Black. Make the moves of the " +
        "main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Scandinavian main line: a safe queen on a5 and " +
        "quick, harmonious development.",
    }),
    buildReplay(scandinavian, {
      id: "scandinavian-var",
      title: "The Modern (2...Nf6)",
      blurb: "Recapturing with the knight instead.",
      lineIdx: 1,
      intro:
        "Instead of the queen, Black can recapture on d5 with the knight after " +
        "2...Nf6, keeping the queen at home and fianchettoing the bishop. Step " +
        "through it.",
    }),
  ],
};
