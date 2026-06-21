import type { Lesson } from "../../types";
import { caroKann } from "../../openings/caro-kann";
import { buildConcept, buildReplay, buildOpeningDrill } from "../../openings";

// Caro-Kann Defence lesson. Move sequences come from the shared opening data
// (src/content/openings/caro-kann.ts); the prose here is original.
export const caroKannLesson: Lesson = {
  id: "caro-kann",
  title: "Caro-Kann Defence",
  summary:
    "1.e4 c6 — solid like the French, but the light-squared bishop gets out first.",
  activities: [
    buildConcept(caroKann),
    buildReplay(caroKann, {
      id: "caro-kann-main",
      title: "The Classical Variation, move by move",
      blurb: "Step through the Caro-Kann Classical main line.",
      intro:
        "The Caro-Kann begins 1.e4 c6. Let's walk through the Classical, where " +
        "Black develops the light-squared bishop to f5 before playing ...e6.",
    }),
    {
      type: "quiz",
      id: "caro-kann-idea",
      title: "Why the Caro-Kann?",
      blurb: "How it improves on the French.",
      question: "How does the Caro-Kann improve on the French Defence?",
      options: [
        "It develops the light-squared bishop outside the pawn chain to f5.",
        "It lets Black win White's e-pawn for free in the opening.",
        "It forces an immediate queen trade and a quiet endgame.",
      ],
      correctIndex: 0,
      explanation:
        "In the French, ...e6 traps the light-squared bishop behind the pawns. " +
        "The Caro-Kann plays ...c6 instead, so the bishop comes out to f5 first " +
        "and ...e6 only follows once it is safely outside.",
    },
    {
      type: "sort",
      id: "caro-kann-aim",
      title: "The happy bishop",
      blurb: "Spot the freed piece.",
      prompt: "Which piece does the Caro-Kann develop happily (unlike the French)?",
      fen: caroKann.tabiyaFen,
      orientation: "white",
      options: [
        { label: "The light-squared bishop" },
        { label: "The dark-squared bishop" },
        { label: "The queen" },
      ],
      correctIndex: 0,
      explanation:
        "The light-squared bishop is the French's problem piece. The Caro-Kann " +
        "lets it out to f5 or g6 before ...e6, so it never gets boxed in.",
    },
    buildOpeningDrill(caroKann, {
      id: "caro-kann-recall",
      title: "Play it: the Caro-Kann as Black",
      blurb: "Reproduce the main line move by move.",
      learnerColor: "black",
      intro:
        "Your turn to play the Caro-Kann as Black. Make the moves of the " +
        "Classical main line — drag or tap a piece, and use Show me if you get " +
        "stuck.",
      successText:
        "Well played — that's the Caro-Kann Classical: a rock-solid structure " +
        "with the bishop happily outside the pawn chain.",
    }),
    buildReplay(caroKann, {
      id: "caro-kann-var",
      title: "The Advance Variation",
      blurb: "Meeting the space-grabbing e5.",
      lineIdx: 1,
      intro:
        "In the Advance, White pushes e5 to grab space. Black still gets the " +
        "bishop out to f5 first, then strikes back with ...c5. Step through it.",
    }),
    buildReplay(caroKann, {
      id: "caro-kann-var2",
      title: "The Panov-Botvinnik Attack",
      blurb: "An open, dynamic IQP fight.",
      lineIdx: 2,
      intro:
        "With an early c4, White steers into an isolated-queen's-pawn middlegame " +
        "full of piece activity. Step through the sharp Panov-Botvinnik Attack.",
    }),
    {
      type: "puzzle",
      id: "caro-smothered",
      title: "Smothered mate!",
      blurb: "A famous Caro-Kann trap.",
      fen: "r1bqkb1r/pp1npppp/2p2n2/8/3PN3/8/PPP1QPPP/R1B1KBNR w KQkq - 3 6",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt:
        "Black just played ...Ngf6??, a famous blunder. White mates in one!",
      hints: [
        "The knight can leap to a square next to the king.",
        "The e7-pawn is pinned by your queen on e2, so it can't capture.",
      ],
      successText:
        "Nd6#! A smothered mate: the black king has no escape, and the e7-pawn " +
        "that could capture is pinned against the king by the queen on e2.",
      solution: ["e4d6"],
    },
  ],
};
