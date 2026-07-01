import type { Lesson } from "../../types";
import { bogoIndian } from "../../openings/bogo-indian";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Bogo-Indian Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/bogo-indian.ts); the prose here is original.
export const bogoIndianLesson: Lesson = {
  id: "bogo-indian",
  title: "Bogo-Indian Defence",
  summary:
    "1.d4 Nf6 2.c4 e6 3.Nf3 Bb4+ — a flexible check that eases development.",
  activities: [
    buildConcept(bogoIndian),
    buildReplay(bogoIndian, {
      id: "bogo-indian-main",
      title: "The Bogo-Indian, move by move",
      blurb: "Step through the main line.",
      intro:
        "The Bogo-Indian arises after 1.d4 Nf6 2.c4 e6 3.Nf3 Bb4+. Let's walk " +
        "through the main line where Black gives the check and develops smoothly.",
    }),
    buildOpeningDrill(bogoIndian, {
      id: "bogo-indian-recall",
      title: "Play it: the Bogo-Indian as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Bogo-Indian as Black. Make the moves of the main " +
        "line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — the check given and development eased: that's the calm, " +
        "flexible spirit of the Bogo-Indian.",
    }),
    buildReplay(bogoIndian, {
      id: "bogo-indian-var",
      title: "The Nimzowitsch line (4.Nbd2)",
      blurb: "Blocking the check with the knight.",
      lineIdx: 1,
      intro:
        "Instead of Bd2, White can block the check with 4.Nbd2 to keep the " +
        "bishop pair. Step through this alternative main line.",
    }),
  ],
};
