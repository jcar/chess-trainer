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
    {
      type: "quiz",
      id: "slav-defence-idea",
      title: "Why ...c6, not ...e6?",
      blurb: "The point of the Slav.",
      question: "What is the main idea behind supporting d5 with ...c6 in the Slav?",
      options: [
        "It keeps the light bishop's diagonal open so it can go to f5 or g4.",
        "It hands the entire centre to White so Black can attack on the wing.",
        "It traps Black's own bishop behind the pawns to keep the king safe.",
      ],
      correctIndex: 0,
      explanation:
        "By guarding d5 with the c-pawn instead of ...e6, Black avoids blocking " +
        "the c8-bishop. That bishop can then develop actively to f5 or g4 " +
        "before ...e6 shuts it in.",
    },
    {
      type: "sort",
      id: "slav-defence-aim",
      title: "How does the Slav differ from the QGD?",
      blurb: "Spot the supporting pawn.",
      prompt: "How does the Slav support d5 differently from the QGD?",
      fen: slavDefence.tabiyaFen,
      orientation: "white",
      options: [
        { label: "With ...c6" },
        { label: "With ...e6" },
        { label: "With ...f6" },
      ],
      correctIndex: 0,
      explanation:
        "The Slav guards d5 with ...c6, leaving the light-squared bishop free " +
        "to develop — that's the whole point compared with the QGD's ...e6.",
    },
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
