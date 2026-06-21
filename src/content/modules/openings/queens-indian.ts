import type { Lesson } from "../../types";
import { queensIndian } from "../../openings/queens-indian";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Queen's Indian Defence lesson. Move sequences come from the shared opening
// data (src/content/openings/queens-indian.ts); the prose here is original.
export const queensIndianLesson: Lesson = {
  id: "queens-indian",
  title: "Queen's Indian Defence",
  summary:
    "1.d4 Nf6 2.c4 e6 3.Nf3 b6 — fianchetto the bishop and fight for e4.",
  activities: [
    buildConcept(queensIndian),
    buildReplay(queensIndian, {
      id: "queens-indian-main",
      title: "The Queen's Indian, move by move",
      blurb: "Step through the main line.",
      intro:
        "The Queen's Indian arises after 1.d4 Nf6 2.c4 e6 3.Nf3 b6. Let's walk " +
        "through the calm main line where Black fianchettoes to b7 and battles " +
        "for e4.",
    }),
    {
      type: "quiz",
      id: "queens-indian-idea",
      title: "Why ...b6?",
      blurb: "The hypermodern idea.",
      question:
        "What is Black's main idea in the Queen's Indian after 3...b6?",
      options: [
        "To launch a quick kingside pawn storm against White's king.",
        "To trade queens early and head for a quiet endgame.",
        "To fianchetto the bishop and fight for the e4-square.",
      ],
      correctIndex: 2,
      explanation:
        "Black puts the light-squared bishop on b7 (sometimes a6) and contests " +
        "e4 from afar — a solid, hypermodern way to meet 3.Nf3 without grabbing " +
        "the centre with pawns.",
    },
    {
      type: "sort",
      id: "queens-indian-aim",
      title: "Where does the bishop go?",
      blurb: "Place the fianchettoed bishop.",
      prompt: "Where does Black's light-squared bishop go in the Queen's Indian?",
      fen: queensIndian.tabiyaFen,
      orientation: "white",
      options: [
        { label: "b7 (or a6), eyeing e4" },
        { label: "g7" },
        { label: "f5" },
      ],
      correctIndex: 0,
      explanation:
        "The bishop heads to b7 (or a6 to hit c4), pointing down the long " +
        "diagonal to fight for control of e4.",
    },
    buildOpeningDrill(queensIndian, {
      id: "queens-indian-recall",
      title: "Play it: the Queen's Indian as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Queen's Indian as Black. Make the moves of the " +
        "main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — bishop on b7, king safe, and e4 firmly contested: the " +
        "essence of the Queen's Indian.",
    }),
    buildReplay(queensIndian, {
      id: "queens-indian-var",
      title: "The 4...Ba6 line",
      blurb: "Hitting the c4-pawn directly.",
      lineIdx: 1,
      intro:
        "Instead of b7, Black can develop the bishop to a6, striking the " +
        "c4-pawn at once. Step through this sharper, modern treatment.",
    }),
  ],
};
