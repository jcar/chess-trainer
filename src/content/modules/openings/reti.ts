import type { Lesson } from "../../types";
import { reti } from "../../openings/reti";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Réti Opening lesson. Move sequences come from the shared opening data
// (src/content/openings/reti.ts); the prose here is original.
export const retiLesson: Lesson = {
  id: "reti",
  title: "Réti Opening",
  summary:
    "1.Nf3 d5 2.c4 — pressure the centre from the flank, with a fianchetto.",
  activities: [
    buildConcept(reti),
    buildReplay(reti, {
      id: "reti-main",
      title: "The Main Line, move by move",
      blurb: "Step through the Réti main line.",
      intro:
        "The Réti begins 1.Nf3 d5 2.c4. Let's walk through the main line, where " +
        "White fianchettoes and pressures Black's centre from the wing.",
    }),
    {
      type: "quiz",
      id: "reti-idea",
      title: "What is White doing?",
      blurb: "The hypermodern idea.",
      question: "What is White's idea in the Réti Opening?",
      options: [
        "White occupies the centre with pawns immediately.",
        "White fianchettoes and attacks Black's centre from the flank with c4 and Nf3, often transposing.",
        "White aims for an early queen trade.",
      ],
      correctIndex: 1,
      explanation:
        "The Réti is a hypermodern system: rather than planting pawns in the " +
        "centre, White uses c4, Nf3, and a fianchetto to pressure d5 from the " +
        "flank, staying flexible and often transposing.",
    },
    {
      type: "sort",
      id: "reti-aim",
      title: "Pressure from afar",
      blurb: "Spot the method.",
      prompt: "How does the Réti pressure Black's centre?",
      fen: reti.tabiyaFen,
      orientation: "white",
      options: [
        { label: "From the flank, with c4 and a fianchetto" },
        { label: "By occupying it with pawns" },
        { label: "With an early queen sortie" },
      ],
      correctIndex: 0,
      explanation:
        "The Réti hits d5 from the wing with c4 and the fianchettoed bishop, " +
        "rather than challenging it with central pawns.",
    },
    buildOpeningDrill(reti, {
      id: "reti-recall",
      title: "Play it: the Réti as White",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "white",
      intro:
        "Your turn to play the Réti as White. Make the moves of the main line — " +
        "drag or tap a piece, and use Show me if you get stuck.",
      successText:
        "Well played — that's the Réti: a fianchettoed bishop pressuring the " +
        "centre from the flank and a safely castled king.",
    }),
    buildReplay(reti, {
      id: "reti-var",
      title: "The Advance (2...d4)",
      blurb: "When Black pushes past with ...d4.",
      lineIdx: 1,
      intro:
        "Black can answer 2.c4 with the space-grabbing 2...d4. White questions " +
        "the advanced pawn at once with e3. Step through it.",
    }),
  ],
};
