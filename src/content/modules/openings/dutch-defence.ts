import type { Lesson } from "../../types";
import { dutchDefence } from "../../openings/dutch-defence";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Dutch Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/dutch-defence.ts); the prose here is original.
export const dutchDefenceLesson: Lesson = {
  id: "dutch-defence",
  title: "Dutch Defence",
  summary:
    "1.d4 f5 — stake a kingside claim and fight for the e4-square.",
  activities: [
    buildConcept(dutchDefence),
    buildReplay(dutchDefence, {
      id: "dutch-defence-main",
      title: "The Classical Dutch, move by move",
      blurb: "Step through the Classical Variation.",
      intro:
        "The Dutch begins 1.d4 f5. Let's walk through the Classical Variation, " +
        "where Black develops solidly behind the f-pawn and eyes the kingside.",
    }),
    buildOpeningDrill(dutchDefence, {
      id: "dutch-defence-recall",
      title: "Play it: the Dutch as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Dutch as Black. Make the moves of the Classical " +
        "Variation — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Classical Dutch: kingside space, a grip on e4, " +
        "and a safely castled king ready to push for the initiative.",
    }),
    buildReplay(dutchDefence, {
      id: "dutch-defence-var",
      title: "The Leningrad Variation",
      blurb: "The Dutch with a kingside fianchetto.",
      lineIdx: 1,
      intro:
        "The Leningrad Variation pairs the Dutch with a King's-Indian-style " +
        "fianchetto on g7. Step through this dynamic set-up.",
    }),
  ],
};
