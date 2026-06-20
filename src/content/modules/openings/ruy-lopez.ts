import type { Lesson } from "../../types";
import { ruyLopez } from "../../openings/ruy-lopez";
import { buildReplay, buildOpeningDrill } from "../../openings";

// Ruy Lopez lesson. Move sequences come from the shared opening data
// (src/content/openings/ruy-lopez.ts); the prose here is original.
export const ruyLopezLesson: Lesson = {
  id: "ruy-lopez",
  title: "Ruy Lopez",
  summary:
    "1.e4 e5 2.Nf3 Nc6 3.Bb5 — patient pressure on the knight that guards e5.",
  activities: [
    buildReplay(ruyLopez, {
      id: "ruy-lopez-main",
      title: "The Closed Ruy Lopez, move by move",
      blurb: "Step through the Morphy Defence main line.",
      intro:
        "The Ruy Lopez begins 1.e4 e5 2.Nf3 Nc6 3.Bb5. Let's walk through the " +
        "classic Closed handling, where both sides develop fully and castle " +
        "before the long strategic battle starts.",
    }),
    {
      type: "quiz",
      id: "ruy-lopez-idea",
      title: "Why Bb5?",
      blurb: "The point of the Spanish bishop.",
      question: "What is the point of White's bishop move 3.Bb5 in the Ruy Lopez?",
      options: [
        "It pressures the c6-knight, the main defender of Black's e5-pawn.",
        "It pins Black's queen against the king down the open file.",
        "It threatens an immediate checkmate that Black must defend.",
      ],
      correctIndex: 0,
      explanation:
        "The bishop on b5 leans on the c6-knight. That knight is the chief " +
        "defender of e5, so pressuring it begins a slow campaign against Black's " +
        "central pawn — the heart of the Ruy Lopez.",
    },
    {
      type: "sort",
      id: "ruy-lopez-aim",
      title: "Which knight is under fire?",
      blurb: "Read the diagonal.",
      prompt: "The Ruy Lopez bishop on b5 is pressuring which black knight?",
      fen: ruyLopez.tabiyaFen,
      orientation: "white",
      options: [{ label: "c6" }, { label: "f6" }, { label: "g8" }],
      correctIndex: 0,
      explanation:
        "From b5 the bishop attacks the knight on c6 — the piece that defends " +
        "e5. That is the target the whole Ruy Lopez is built around.",
    },
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
  ],
};
