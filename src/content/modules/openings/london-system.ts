import type { Lesson } from "../../types";
import { londonSystem } from "../../openings/london-system";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// London System lesson. Move sequences come from the shared opening data
// (src/content/openings/london-system.ts); the prose here is original.
export const londonSystemLesson: Lesson = {
  id: "london-system",
  title: "London System",
  summary:
    "1.d4 d5 2.Nf3 Nf6 3.Bf4 — the same easy, solid set-up against almost anything.",
  activities: [
    buildConcept(londonSystem),
    buildReplay(londonSystem, {
      id: "london-system-main",
      title: "The London setup, move by move",
      blurb: "Step through the main set-up against ...d5.",
      intro:
        "The London System begins 1.d4 d5 2.Nf3 Nf6 3.Bf4. Let's walk through " +
        "the trademark structure White aims for, building a solid and " +
        "comfortable position.",
    }),
    buildOpeningDrill(londonSystem, {
      id: "london-system-recall",
      title: "Play it: the London as White",
      blurb: "Reproduce the main set-up move by move.",
      learnerColor: "white",
      intro:
        "Your turn to play the London as White. Make the moves of the main " +
        "set-up — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the London: the bishop out to f4, a solid pawn " +
        "structure, and an easy, comfortable game.",
    }),
    buildReplay(londonSystem, {
      id: "london-system-var",
      title: "The London vs a fianchetto",
      blurb: "The same set-up against a King's-Indian formation.",
      lineIdx: 1,
      intro:
        "When Black fianchettoes with ...g6 and ...Bg7, White simply uses the " +
        "same London structure. Step through how the set-up handles a " +
        "King's-Indian formation.",
    }),
    buildReplay(londonSystem, {
      id: "london-system-var2",
      title: "Meeting ...c5 and ...Qb6",
      blurb: "Defusing the pressure on b2.",
      lineIdx: 2,
      intro:
        "Black's most testing try is ...c5 followed by ...Qb6, eyeing the " +
        "loose b2-pawn. Step through how White calmly defends and keeps the " +
        "solid London structure intact.",
    }),
  ],
};
