import type { Lesson } from "../../types";
import { semiSlav } from "../../openings/semi-slav";
import { buildReplay, buildOpeningDrill } from "../../openings";

// Semi-Slav Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/semi-slav.ts); the prose here is original.
export const semiSlavLesson: Lesson = {
  id: "semi-slav",
  title: "Semi-Slav Defence",
  summary:
    "1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 e6 — d5 propped up by both ...c6 and ...e6.",
  activities: [
    buildReplay(semiSlav, {
      id: "semi-slav-main",
      title: "The Semi-Slav, move by move",
      blurb: "Step through the Meran main line.",
      intro:
        "The Semi-Slav arises after 1.d4 d5 2.c4 c6 3.Nf3 Nf6 4.Nc3 e6. Let's " +
        "walk through the classic Meran where Black takes on c4 and expands " +
        "with ...b5.",
    }),
    {
      type: "quiz",
      id: "semi-slav-idea",
      title: "How is d5 held?",
      blurb: "The Semi-Slav's solid core.",
      question:
        "What makes the Semi-Slav so solid in the centre?",
      options: [
        "It leaves d5 undefended to free the pieces.",
        "It gives up the centre entirely for quick development.",
        "It supports d5 with both ...c6 and ...e6.",
      ],
      correctIndex: 2,
      explanation:
        "Backing d5 with both ...c6 and ...e6 builds a sturdy pawn wall. From " +
        "this fortress Black can grab the c4-pawn and expand with ...b5.",
    },
    {
      type: "sort",
      id: "semi-slav-aim",
      title: "Reading the centre",
      blurb: "What holds d5?",
      prompt: "How does the Semi-Slav support the d5-pawn?",
      fen: semiSlav.tabiyaFen,
      orientation: "white",
      options: [
        { label: "With both ...c6 and ...e6" },
        { label: "With ...e6 only" },
        { label: "It doesn't — d5 is given up" },
      ],
      correctIndex: 0,
      explanation:
        "Both ...c6 and ...e6 prop up d5, giving the Semi-Slav its famously " +
        "solid centre while still allowing ...dxc4 and ...b5 later.",
    },
    buildOpeningDrill(semiSlav, {
      id: "semi-slav-recall",
      title: "Play it: the Semi-Slav as Black",
      blurb: "Reproduce the Meran move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Semi-Slav as Black. Make the moves of the Meran " +
        "main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — a solid centre, the c4-pawn captured, and ...b5 in: the " +
        "heart of the Meran.",
    }),
    buildReplay(semiSlav, {
      id: "semi-slav-var",
      title: "The Botvinnik Variation (5.Bg5)",
      blurb: "The sharpest battleground.",
      lineIdx: 1,
      intro:
        "When White plays the aggressive 5.Bg5, the game turns razor-sharp: " +
        "Black grabs a pawn and both sides go all in. Step through this " +
        "famous line.",
    }),
  ],
};
