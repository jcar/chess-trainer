import type { Lesson } from "../../types";
import { sicilianDefence } from "../../openings/sicilian-defence";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Sicilian Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/sicilian-defence.ts); the prose here is original.
export const sicilianDefenceLesson: Lesson = {
  id: "sicilian-defence",
  title: "Sicilian Defence",
  summary:
    "1.e4 c5 — Black's most ambitious reply, fighting for an unbalanced game.",
  activities: [
    buildConcept(sicilianDefence),
    buildReplay(sicilianDefence, {
      id: "sicilian-defence-main",
      title: "The Najdorf, move by move",
      blurb: "Step through the Open Sicilian main line.",
      intro:
        "The Sicilian begins 1.e4 c5. Let's walk through the famous Najdorf, " +
        "where Black trades on d4 and then builds a flexible, fighting set-up.",
    }),
    buildOpeningDrill(sicilianDefence, {
      id: "sicilian-defence-recall",
      title: "Play it: the Najdorf as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Sicilian as Black. Make the moves of the Najdorf " +
        "main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Najdorf: a flexible, combative set-up with " +
        "chances to play for the win.",
    }),
    buildReplay(sicilianDefence, {
      id: "sicilian-defence-var",
      title: "The Alapin (2.c3)",
      blurb: "A solid anti-Sicilian set-up.",
      lineIdx: 1,
      intro:
        "Many players avoid the Open Sicilian with 2.c3, preparing d4 with pawn " +
        "support. Step through how Black meets the Alapin.",
    }),
    buildReplay(sicilianDefence, {
      id: "sicilian-defence-var2",
      title: "The Najdorf: 6.Bg5 main line",
      blurb: "The sharpest test of the Najdorf.",
      lineIdx: 2,
      intro:
        "White's most aggressive reply pins the f6-knight with 6.Bg5, aiming for " +
        "a direct attack. Step through this critical main line of the Najdorf.",
    }),
    buildReplay(sicilianDefence, {
      id: "sicilian-defence-var3",
      title: "Facing the Rossolimo (3.Bb5)",
      blurb: "An anti-Sicilian bishop sortie.",
      lineIdx: 3,
      intro:
        "Rather than opening the centre, White can pin the c6-knight with " +
        "3.Bb5, steering into a quieter strategic game. Step through how Black " +
        "meets the Rossolimo.",
    }),
    {
      type: "puzzle",
      id: "sicilian-siberian",
      title: "The Siberian Trap",
      blurb: "An aggressive anti-Sicilian backfires.",
      fen: "r1b1kb1r/ppqp1ppp/2n1p3/8/2B1P1n1/2N2N1P/PP2QPP1/R1B2RK1 b kq - 0 9",
      orientation: "black",
      goal: { type: "win-material", minGain: 2 },
      prompt:
        "In a Smith-Morra Gambit, White just played h3?? — but Black has a " +
        "knight leap that wins big. Black to play.",
      hints: [
        "Look for a knight jump into the heart of White's position.",
        "After the knight lands, it both hits the queen and threatens mate on h2.",
      ],
      successText:
        "Nd4! forks the queen and threatens ...Qh2#. White cannot meet both — " +
        "Black wins decisive material. This is the famous Siberian Trap.",
      solution: ["c6d4", "h3g4", "d4e2", "c4e2"],
    },
  ],
};
