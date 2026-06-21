import type { Lesson } from "../../types";
import { kingsIndian } from "../../openings/kings-indian";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// King's Indian Defence lesson. Move sequences come from the shared opening
// data (src/content/openings/kings-indian.ts); the prose here is original.
export const kingsIndianLesson: Lesson = {
  id: "kings-indian",
  title: "King's Indian Defence",
  summary:
    "1.d4 Nf6 2.c4 g6 — hypermodern: let White build, then strike with ...e5.",
  activities: [
    buildConcept(kingsIndian),
    buildReplay(kingsIndian, {
      id: "kings-indian-main",
      title: "The King's Indian, move by move",
      blurb: "Step through the Classical Variation.",
      intro:
        "The King's Indian Defence begins 1.d4 Nf6 2.c4 g6. Let's walk through " +
        "the Classical Variation where Black fianchettoes, castles, and hits " +
        "the centre with ...e5.",
    }),
    {
      type: "quiz",
      id: "kings-indian-idea",
      title: "What is hypermodern play?",
      blurb: "The big idea of the KID.",
      question: "What is Black's hypermodern plan in the King's Indian Defence?",
      options: [
        "Let White build a big pawn centre, then counterattack it with ...e5.",
        "Stop White from ever putting a single pawn in the centre at all.",
        "Copy White's moves to reach a symmetrical, quick draw by repetition.",
      ],
      correctIndex: 0,
      explanation:
        "Hypermodern play means you allow White's big centre on purpose, then " +
        "undermine it from the side and with breaks like ...e5 (or ...c5) once " +
        "your pieces are ready.",
    },
    {
      type: "sort",
      id: "kings-indian-aim",
      title: "Black's main counterstrike",
      blurb: "Spot the central break.",
      prompt: "What is Black's main counterstrike against White's big centre in the KID?",
      fen: kingsIndian.tabiyaFen,
      orientation: "white",
      options: [
        { label: "...e5" },
        { label: "...h5" },
        { label: "...a5" },
      ],
      correctIndex: 0,
      explanation:
        "...e5 is the thematic break: it strikes at White's d4-pawn and opens " +
        "the position for Black's pieces, often leading to a kingside attack.",
    },
    buildOpeningDrill(kingsIndian, {
      id: "kings-indian-recall",
      title: "Play it: the KID as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the King's Indian as Black. Make the moves of the " +
        "Classical Variation — drag or tap a piece, and use Show me if you get " +
        "stuck.",
      successText:
        "Well played — that's the Classical King's Indian: fianchettoed, " +
        "castled, and striking back in the centre with ...e5.",
    }),
    buildReplay(kingsIndian, {
      id: "kings-indian-var",
      title: "The Fianchetto Variation",
      blurb: "When White fianchettoes too.",
      lineIdx: 1,
      intro:
        "White can meet the King's Indian by fianchettoing the bishop as well. " +
        "Step through the calmer, very solid Fianchetto Variation.",
    }),
  ],
};
