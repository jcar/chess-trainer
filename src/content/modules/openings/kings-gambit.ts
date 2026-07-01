import type { Lesson } from "../../types";
import { kingsGambit } from "../../openings/kings-gambit";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// King's Gambit lesson. Move sequences come from the shared opening data
// (src/content/openings/kings-gambit.ts); the prose here is original.
export const kingsGambitLesson: Lesson = {
  id: "kings-gambit",
  title: "King's Gambit",
  summary:
    "1.e4 e5 2.f4 — White offers a pawn to rip open the f-file and seize the initiative.",
  activities: [
    buildConcept(kingsGambit),
    buildReplay(kingsGambit, {
      id: "kings-gambit-main",
      title: "The King's Gambit, move by move",
      blurb: "Step through the Kieseritzky Gambit main line.",
      intro:
        "The King's Gambit begins 1.e4 e5 2.f4, offering a pawn for fast attack. " +
        "Let's walk through the Kieseritzky, where White accepts the gambit's " +
        "sharp, double-edged play.",
    }),
    buildOpeningDrill(kingsGambit, {
      id: "kings-gambit-recall",
      title: "Play it: the King's Gambit as White",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "white",
      intro:
        "Your turn to play the King's Gambit as White. Make the moves of the " +
        "Kieseritzky main line — drag or tap a piece, and use Show me if you get " +
        "stuck.",
      successText:
        "Well played — that's the King's Gambit: a pawn given, the centre seized, " +
        "and the attack underway.",
    }),
    buildReplay(kingsGambit, {
      id: "kings-gambit-var",
      title: "The King's Gambit Declined",
      blurb: "Sidestepping the gambit with ...Bc5.",
      lineIdx: 1,
      intro:
        "Black does not have to accept the pawn. With 2...Bc5, Black declines and " +
        "develops soundly while White's kingside stays loose. Step through the " +
        "King's Gambit Declined.",
    }),
  ],
};
