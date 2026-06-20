// Chapter 12 — Gambits: trading material for time and initiative.
// Original prose; gambit lines are standard theory.

import type { Lesson } from "../../types";

export const ch12: Lesson = {
  id: "ch12-gambits",
  title: "12. Gambits",
  summary:
    "A gambit gives up a pawn (or more) to gain rapid development, open lines, and the initiative. Three classics — two for White, one for Black — and when the trade is worth it.",
  activities: [
    {
      id: "what-is-gambit",
      type: "quiz",
      title: "What you're buying",
      blurb: "Why give away a pawn?",
      question:
        "When you play a sound gambit, what are you trading your pawn FOR?",
      options: [
        "Nothing of value — a sound gambit is really just a disguised blunder.",
        "A lead in development, open lines for your pieces, and the initiative.",
        "A forced checkmate that arrives automatically a few moves later.",
        "A guaranteed second queen once the opponent's structure crumbles.",
      ],
      correctIndex: 1,
      explanation:
        "A gambit buys time. While your opponent spends moves grabbing and holding the pawn, you develop quickly and seize the initiative. If you can't show concrete activity for the pawn, though, it's just a lost pawn.",
    },
    {
      id: "evans-gambit",
      type: "replay",
      title: "The Evans Gambit (White)",
      blurb: "Sacrifice a pawn to build a big center.",
      orientation: "white",
      intro:
        "The Evans offers the b-pawn to deflect Black's bishop, then slams in c3 and d4 for a powerful center and fast development.",
      steps: [
        { san: "e4", note: "Center." },
        { san: "e5", note: "Symmetry." },
        { san: "Nf3", note: "Develop with a threat." },
        { san: "Nc6", note: "Defend e5." },
        { san: "Bc4", note: "The Italian bishop, eyeing f7." },
        { san: "Bc5", note: "Black mirrors." },
        { san: "b4", note: "The Evans Gambit! Offer the pawn to lure the bishop off its diagonal." },
        { san: "Bxb4", note: "Black accepts — declining is also playable, but now White gains time." },
        { san: "c3", note: "Hit the bishop AND prepare d4. Tempo gained." },
        { san: "Ba5", note: "The bishop retreats, keeping an eye on the c3-pawn." },
        { san: "d4", note: "There it is: a big pawn center and a development lead — full value for the pawn." },
      ],
    },
    {
      id: "kings-gambit",
      type: "replay",
      title: "The King's Gambit (White)",
      blurb: "Romantic, sharp, and instructive.",
      orientation: "white",
      intro:
        "The oldest gambit of all: offer the f-pawn to rip open the f-file and dominate the center. Risky and double-edged, but a fantastic teacher of initiative.",
      steps: [
        { san: "e4", note: "Center." },
        { san: "e5", note: "Symmetry." },
        { san: "f4", note: "The King's Gambit — offer the f-pawn to deflect e5 and open lines." },
        { san: "exf4", note: "Accepted. Black grabs the pawn but gives up the center." },
        { san: "Nf3", note: "Develop and prevent ...Qh4+, which would be annoying." },
        { san: "g5", note: "Black tries to hold the extra pawn with a kingside pawn chain." },
        { san: "h4", note: "Strike at the chain immediately." },
        { san: "g4", note: "Black pushes on, attacking the knight." },
        { san: "Ne5", note: "The Kieseritzky: the knight leaps to a strong central square. White has huge activity for the pawn." },
      ],
    },
    {
      id: "budapest-gambit",
      type: "replay",
      title: "The Budapest Gambit (Black)",
      blurb: "A surprise weapon against 1.d4.",
      orientation: "black",
      intro:
        "Black can gambit too. The Budapest offers the e-pawn after 1.d4 Nf6 2.c4 e5, aiming for quick piece activity and tricky play against an unprepared opponent.",
      steps: [
        { san: "d4", note: "White's move." },
        { san: "Nf6", note: "Develop and control e4." },
        { san: "c4", note: "White grabs space." },
        { san: "e5", note: "The Budapest Gambit! Offer the e-pawn to open lines for your pieces." },
        { san: "dxe5", note: "White accepts." },
        { san: "Ng4", note: "The point: the knight heads to recover the pawn on e5 with active play." },
        { san: "Bf4", note: "White tries to hold the pawn." },
        { san: "Nc6", note: "Pile up on e5 and develop with tempo." },
        { san: "Nf3", note: "White defends." },
        { san: "Bb4+", note: "A developing check that disrupts White's coordination — Black has easy, active play for the pawn." },
      ],
    },
    {
      id: "accept-or-decline",
      type: "quiz",
      title: "Facing a gambit",
      blurb: "Should you grab the pawn?",
      question:
        "Your opponent offers a gambit pawn. What's the most reliable practical approach?",
      options: [
        "Greedily accept the offer and then cling to that extra pawn at all costs, no matter what happens.",
        "Accept if you like, but prioritize development and give the pawn back to kill the initiative.",
        "Decline the offer and settle into a passive, cramped setup behind your own pawns.",
        "Sacrifice a piece of your own straight back to seize the initiative first.",
      ],
      correctIndex: 1,
      explanation:
        "Against a gambit, don't get greedy. Accepting is usually fine, but the antidote to the opponent's initiative is your OWN development — and often giving the pawn back at the right moment to complete development and reach a safe, equal (or better) position.",
    },
  ],
};
