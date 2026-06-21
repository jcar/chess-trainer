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
    {
      type: "quiz",
      id: "kings-gambit-idea",
      title: "Why 2.f4?",
      blurb: "The point of the gambit.",
      question: "What is White offering with 2.f4 in the King's Gambit?",
      options: [
        "A pawn, in return for fast attack and the centre.",
        "A trade of queens to reach an early endgame.",
        "A quiet, defensive move to shore up the king.",
      ],
      correctIndex: 0,
      explanation:
        "2.f4 sacrifices the f-pawn to open the f-file and grab the centre. " +
        "White trades material for the initiative — a bold, attacking choice.",
    },
    {
      type: "sort",
      id: "kings-gambit-aim",
      title: "Read the offer",
      blurb: "What is 2.f4 offering?",
      prompt: "What is White offering with 2.f4 in the King's Gambit?",
      fen: kingsGambit.tabiyaFen,
      orientation: "white",
      options: [
        { label: "A pawn, for fast attack and the centre" },
        { label: "A trade of queens" },
        { label: "A draw" },
      ],
      correctIndex: 0,
      explanation:
        "The f-pawn is on offer. If Black takes it with ...exf4, White gets the " +
        "open f-file and a strong centre to attack with.",
    },
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
