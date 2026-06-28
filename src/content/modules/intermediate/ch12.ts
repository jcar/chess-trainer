// Chapter 12 — Gambits: trading material for time and initiative.
// Original prose; gambit lines are standard theory.

import type { Lesson } from "../../types";

export const ch12: Lesson = {
  id: "ch12-gambits",
  title: "10. Gambits",
  summary:
    "A gambit gives up a pawn (or more) to gain rapid development, open lines, and the initiative. Three classics — two for White, one for Black — and when the trade is worth it.",
  activities: [
    {
      id: "ch12-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "Pawns for initiative.",
      body:
        "A gambit hands over a pawn on purpose — to grab time, open lines, and seize the initiative while your opponent is busy collecting and defending it. Played well, that head start is worth more than the pawn.\n\nWe'll see what a gambit actually buys, walk through three classics (two for White, one for Black), and learn how to defend against one when it's pointed at you.",
      points: [
        "A gambit buys development, open lines, and the initiative.",
        "Three model gambits, move by move.",
        "How to meet a gambit without getting greedy.",
      ],
    },
    {
      id: "ch12-gambits-concept",
      type: "concept",
      title: "What a gambit buys",
      blurb: "Trade a pawn for time.",
      body:
        "A gambit gives up a pawn (sometimes more) to gain something in return: a lead in development, open lines for your pieces, and the initiative. While your opponent spends moves grabbing and defending the extra pawn, you race ahead and start dictating play.\n\nThe diagram shows the Evans Gambit after White has given the b-pawn and struck with c3 and d4: a big pawn center and a clear development lead — full value for the pawn. The catch is that the activity must be real. If you can't point to concrete pressure, it's just a lost pawn. And when you're on the receiving end, the antidote is your own development — accept if you like, but be ready to give the pawn back rather than cling to it.",
      points: [
        "You're buying time, open lines, and the initiative — not a forced mate.",
        "No activity to show for it? Then it's simply a lost pawn.",
        "Facing a gambit: develop fast and return the pawn when it kills the attack.",
      ],
      diagrams: [
        {
          fen: "r1bqk1nr/pppp1ppp/2n5/b3p3/2BPP3/2P2N2/P4PPP/RNBQK2R b KQkq - 0 6",
          orientation: "white",
          caption: "Evans Gambit: a pawn down, but White has a big center (c3/d4/e4) and faster development — that's the trade.",
        },
      ],
      check: {
        question: "What is White getting in return for the sacrificed pawn here?",
        options: [
          "A big center and a lead in development — the initiative",
          "A forced checkmate within a few moves",
          "Nothing; a gambit is just a lost pawn",
        ],
        correctIndex: 0,
        explanation:
          "A sound gambit buys time, open lines, and the initiative. The pawn is only worth giving up if you can show real activity for it — as White can here.",
      },
    },
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
      eval: true,
      source: "Italian Game, Evans Gambit",
      intro:
        "The Evans offers the b-pawn to deflect Black's bishop, then slams in c3 and d4 for a powerful center and fast development. Watch the eval bar: it dips toward Black (a pawn IS a pawn) — the gambit is the bet that White's lead in development is worth more than that small deficit.",
      steps: [
        { san: "e4", note: "Center." },
        { san: "e5", note: "Symmetry." },
        { san: "Nf3", note: "Develop with a threat." },
        { san: "Nc6", note: "Defend e5." },
        { san: "Bc4", note: "The Italian bishop, eyeing f7." },
        { san: "Bc5", note: "Black mirrors." },
        { san: "b4", keyIdea: "Pay a pawn for time", note: "The Evans Gambit! Offer the pawn to lure the bishop off its diagonal." },
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
      eval: true,
      source: "King's Gambit",
      intro:
        "The oldest gambit of all: offer the f-pawn to rip open the f-file and dominate the center. Risky and double-edged, but a fantastic teacher of initiative — the eval leans Black's way, which is exactly why it's 'high-risk, high-reward'.",
      steps: [
        { san: "e4", note: "Center." },
        { san: "e5", note: "Symmetry." },
        { san: "f4", keyIdea: "Rip the position open", note: "The King's Gambit — offer the f-pawn to deflect e5 and open lines." },
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
      eval: true,
      source: "Budapest Gambit",
      intro:
        "Black can gambit too. The Budapest offers the e-pawn after 1.d4 Nf6 2.c4 e5, aiming for quick piece activity and tricky play against an unprepared opponent. The eval favours White slightly (Black's the one down a pawn now), but Black's pieces spring to life fast.",
      steps: [
        { san: "d4", note: "White's move." },
        { san: "Nf6", note: "Develop and control e4." },
        { san: "c4", note: "White grabs space." },
        { san: "e5", keyIdea: "Black gambits too", note: "The Budapest Gambit! Offer the e-pawn to open lines for your pieces." },
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
    {
      id: "ch12-guess-evans",
      type: "guessMove",
      title: "Your turn: play the gambit",
      blurb: "Predict the Evans Gambit's pawn sac and the burst that follows.",
      orientation: "white",
      source: "Italian Game, Evans Gambit",
      intro:
        "You're White, about to invest a pawn for a roaring initiative. Before each highlighted move, ask: how do I turn a small material deficit into time, a big center, and active pieces?",
      moves: [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "b4", "Bxb4", "c3", "Ba5", "d4",
      ],
      guessAt: [6, 8, 10],
      notes: [
        undefined, undefined, undefined, undefined, undefined, undefined,
        "The gambit! Offer the b-pawn to drag the bishop off its diagonal — you're buying time, not winning material.",
        undefined,
        "Hit the bishop AND prepare d4 — gaining a tempo while you build. Every move must do work when you're a pawn down.",
        undefined,
        "There's the payoff: a big pawn center and a clear lead in development. That's full value for the pawn.",
      ],
      successText:
        "That's gambit play: spend the pawn, then cash the lead in development before your opponent catches up. Initiative over material — when you can show concrete activity for it.",
    },
    {
      id: "ch12-recap",
      type: "concept",
      title: "Recap: initiative over material",
      blurb: "Time can be worth a pawn.",
      body:
        "A gambit is a bet that fast development and the initiative outweigh a pawn. As the gambiteer, only make the bet when you can show concrete activity — otherwise you're just a pawn down. As the defender, don't cling to the extra pawn: develop, and hand it back when that snuffs out the attack.\n\nThe only way to feel the initiative is to play sharp positions. Try a gambit (from either side) in a real game.",
      points: [
        "Gambit = a pawn for development, open lines, and the initiative.",
        "Gambiteer: show real activity, or it's just a lost pawn.",
        "Defender: develop and give the pawn back to kill the attack.",
      ],
      practice: { tool: "play", label: "Play a game now" },
    },
  ],
};
