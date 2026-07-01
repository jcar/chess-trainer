import type { Lesson } from "../../types";
import { petroff } from "../../openings/petroff";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Petroff Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/petroff.ts); the prose here is original.
export const petroffLesson: Lesson = {
  id: "petroff",
  title: "Petroff Defence",
  summary:
    "1.e4 e5 2.Nf3 Nf6 — Black counterattacks e4 instead of defending e5 for a solid, symmetrical game.",
  activities: [
    buildConcept(petroff),
    buildReplay(petroff, {
      id: "petroff-main",
      title: "The Petroff, move by move",
      blurb: "Step through the Classical Variation main line.",
      intro:
        "The Petroff begins 1.e4 e5 2.Nf3 Nf6, meeting a threat with a threat. " +
        "Let's walk through the Classical Variation, where both sides develop " +
        "smoothly to a balanced position.",
    }),
    buildOpeningDrill(petroff, {
      id: "petroff-recall",
      title: "Play it: the Petroff as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Petroff as Black. Make the moves of the Classical " +
        "main line — drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Petroff: you recovered the pawn and reached a " +
        "rock-solid, symmetrical position.",
    }),
    buildReplay(petroff, {
      id: "petroff-var",
      title: "The Steinitz 3.d4",
      blurb: "White strikes the centre instead of grabbing e5.",
      lineIdx: 1,
      intro:
        "Instead of taking on e5, White can break in the centre with 3.d4. " +
        "Step through the Steinitz Variation.",
    }),
    {
      type: "puzzle",
      id: "petroff-marshall-trap",
      title: "The Marshall Trap",
      blurb: "A famous Petroff trap.",
      fen: "rnbqkb1r/pppp1ppp/5n2/4N3/8/8/PPPPQPPP/RNB1KB1R w KQkq - 2 5",
      orientation: "white",
      goal: { type: "win-material", minGain: 3 },
      prompt:
        "Black just played ...Nf6??, walking into a famous trap. White to play " +
        "and win the queen.",
      hints: [
        "Your queen on e2 and knight on e5 share the e-file with Black's king.",
        "Move the knight with check — a discovered check.",
      ],
      successText:
        "Nc6+! A discovered check from the queen on e2. Black must answer the " +
        "check, and then Nxe7 wins the queen — the Petroff (Marshall) trap.",
      solution: ["e5c6", "d8e7", "c6e7"],
    },
  ],
};
