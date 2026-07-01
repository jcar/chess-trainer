import type { Lesson } from "../../types";
import { queensGambit } from "../../openings/queens-gambit";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Queen's Gambit (White repertoire) lesson. Move sequences come from the shared
// opening data (src/content/openings/queens-gambit.ts); the prose here is original.
export const queensGambitLesson: Lesson = {
  id: "queens-gambit",
  title: "Queen's Gambit (for White)",
  summary:
    "1.d4 d5 2.c4 — the classical main-line weapon for White. How to meet Black declining, accepting, and the Slav.",
  activities: [
    buildConcept(queensGambit),
    buildReplay(queensGambit, {
      id: "queens-gambit-main",
      title: "Declined: the main line, move by move",
      blurb: "Pressure d5 and build the centre.",
      intro:
        "When Black declines with 2...e6, White develops with pressure on d5 — Nc3, " +
        "Bg5, e3, Nf3 — and aims for the e4 break or a minority attack. Step through it.",
    }),
    buildOpeningDrill(queensGambit, {
      id: "queens-gambit-recall",
      title: "Play it: the Queen's Gambit as White",
      blurb: "Reproduce the Declined main line.",
      learnerColor: "white",
      intro:
        "Your turn to play the Queen's Gambit as White against the Declined. Make the " +
        "moves of the main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Queen's Gambit Declined main line: pressure on d5, " +
        "smooth development, and a clear middlegame plan.",
    }),
    buildReplay(queensGambit, {
      id: "queens-gambit-accepted",
      title: "Accepted (2...dxc4)",
      blurb: "Don't rush to recapture.",
      lineIdx: 1,
      intro:
        "If Black takes with 2...dxc4, don't hurry to win it back. Develop (Nf3, e3), " +
        "then recapture with Bxc4 — you get the centre and a lead in development.",
    }),
    buildReplay(queensGambit, {
      id: "queens-gambit-slav",
      title: "vs the Slav (2...c6)",
      blurb: "When Black keeps the bishop free.",
      lineIdx: 2,
      intro:
        "The Slav supports d5 with ...c6 so the light bishop can develop to f5. Meet it " +
        "with Nf3, Nc3, and a4 to restrain ...b5. Step through the main line.",
    }),
  ],
};
