// Strategy lesson 1 — evaluating a position by its imbalances and forming a plan.
// All prose original.

import type { Lesson } from "../../types";

export const imbalancesLesson: Lesson = {
  id: "imbalances",
  title: "How to Think: Imbalances & Plans",
  summary:
    "Evaluate a position by its imbalances, then make a plan that uses them.",
  activities: [
    {
      type: "quiz",
      id: "imbalances-list",
      title: "What is an imbalance?",
      blurb: "The differences that shape a game.",
      question: "What is an 'imbalance' in chess?",
      options: [
        "A move that breaks the rules of the opening.",
        "Any difference between the two sides — pieces, pawn structure, space, king safety.",
        "A position where one side has more total material.",
      ],
      correctIndex: 1,
      explanation:
        "An imbalance is simply any way the two sides differ. Material is only one kind; pawn structure, space, the safety of each king, and which pieces each side has all create imbalances you can play with.",
    },
    {
      type: "quiz",
      id: "imbalances-plan",
      title: "Where plans come from",
      blurb: "Read the board, then decide.",
      question: "Where do good plans come from?",
      options: [
        "From memorizing long move sequences.",
        "From always attacking the king as fast as possible.",
        "From the imbalances in the position.",
      ],
      correctIndex: 2,
      explanation:
        "A plan should fit the position in front of you. Find the imbalances first — they tell you which part of the board is yours and what you should be aiming at.",
    },
    {
      type: "sort",
      id: "imbalances-worst-piece",
      title: "Your worst piece",
      blurb: "The fastest way to a better position.",
      prompt:
        "A great planning question is: what is your WORST-placed piece?",
      fen: "r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 1",
      orientation: "white",
      options: [{ label: "Improve it" }, { label: "Trade the queens" }],
      correctIndex: 0,
      explanation:
        "Spot the piece doing the least and find it a better home. Improving your worst piece raises the quality of your whole position, and it usually points to a clear, useful move when nothing else is obvious.",
    },
    {
      type: "quiz",
      id: "imbalances-checklist",
      title: "The planning checklist",
      blurb: "Compare before you commit.",
      question: "Before choosing a plan, what should you compare?",
      options: [
        "Only the total point count of material.",
        "Only whose turn it is to move.",
        "Minor pieces, pawns, space, files, king safety — the imbalances.",
      ],
      correctIndex: 2,
      explanation:
        "Run through the list: the minor pieces (bishops vs knights), the pawn structure, who has more space, which files are open, and how safe each king is. The differences you find are the raw material for your plan.",
    },
    {
      type: "replay",
      id: "imbalances-plan-demo",
      title: "Spotting the plan",
      blurb: "Turn a small edge into a clear plan.",
      orientation: "white",
      intro:
        "Watch a quiet opening reach a position with one clear imbalance. Notice how the edge — better development and a target — suggests the plan all by itself.",
      steps: [
        { san: "e4", note: "Stake a claim in the centre and open lines for the bishop and queen." },
        { san: "e5", note: "Black answers symmetrically, contesting the centre." },
        { san: "Nf3", note: "Develop with a threat to the e5-pawn." },
        { san: "Nc6", note: "Black defends e5 and develops a piece." },
        { san: "Bc4", note: "The bishop eyes f7, Black's only weakly-guarded square." },
        { san: "Nf6", note: "Black develops and counter-attacks e4." },
        { san: "d3", note: "Quietly defend e4 and keep the bishop's diagonal open." },
        { san: "Bc5", note: "Black mirrors, and both sides are ready to castle." },
        { san: "O-O", note: "White tucks the king away and connects toward the rooks." },
        { san: "d6", note: "Black props up e5 but spends a tempo doing it." },
        { san: "Bg5", note: "Pin the knight to add pressure on Black's centre." },
        {
          san: "h6",
          note: "Now read the imbalances: White is fully developed and castled, while Black still has loose pieces and a slightly weak f7. The plan writes itself — keep developing, pile up on the centre and f7, and use the lead in development before Black catches up.",
        },
      ],
    },
  ],
};
