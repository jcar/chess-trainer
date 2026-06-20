import type { Lesson } from "../../types";
import { londonSystem } from "../../openings/london-system";
import { buildReplay, buildOpeningDrill } from "../../openings";

// London System lesson. Move sequences come from the shared opening data
// (src/content/openings/london-system.ts); the prose here is original.
export const londonSystemLesson: Lesson = {
  id: "london-system",
  title: "London System",
  summary:
    "1.d4 d5 2.Nf3 Nf6 3.Bf4 — the same easy, solid set-up against almost anything.",
  activities: [
    buildReplay(londonSystem, {
      id: "london-system-main",
      title: "The London setup, move by move",
      blurb: "Step through the main set-up against ...d5.",
      intro:
        "The London System begins 1.d4 d5 2.Nf3 Nf6 3.Bf4. Let's walk through " +
        "the trademark structure White aims for, building a solid and " +
        "comfortable position.",
    }),
    {
      type: "quiz",
      id: "london-system-idea",
      title: "Why play the London?",
      blurb: "The appeal of a system.",
      question: "Why is the London System so popular among players who want an easy game?",
      options: [
        "White can aim for the same solid set-up against almost anything Black plays.",
        "It forces Black into an early queen trade and a dull, simplified endgame.",
        "It wins a central pawn by force within the first handful of moves.",
      ],
      correctIndex: 0,
      explanation:
        "The London is a 'system': Bf4, e3, a bishop to d3 or e2, c3, and " +
        "Nbd2 work against nearly any reply. You reach a comfortable " +
        "middlegame without memorizing long forcing lines.",
    },
    {
      type: "sort",
      id: "london-system-aim",
      title: "The signature move",
      blurb: "Spot the London bishop.",
      prompt: "Which bishop move is the signature of the London System?",
      fen: londonSystem.tabiyaFen,
      orientation: "white",
      options: [
        { label: "Bf4" },
        { label: "Bg5" },
        { label: "Bb5" },
      ],
      correctIndex: 0,
      explanation:
        "The hallmark of the London is developing the dark-squared bishop to " +
        "f4 early — before e3 would shut it in behind the pawn chain.",
    },
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
  ],
};
