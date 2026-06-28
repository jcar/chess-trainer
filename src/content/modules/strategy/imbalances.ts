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
      type: "concept",
      id: "imbalances-concept",
      title: "Think in imbalances",
      blurb: "How strong players size up a position.",
      body:
        "An imbalance is any way the two sides differ. Strong players don't memorize moves; they read these differences and let them point to a plan. Run the same checklist every time — the Imbalance Scan:\n\n• the minor pieces (your bishops vs their knights), • the pawn structure, • space, • material, • control of a key file or square, • a lead in development, • the initiative, • king safety. Whichever imbalance is biggest tells you which part of the board is yours and what to aim at. If you remember nothing else, just find the imbalances and try to use them.",
      points: [
        "An imbalance is any difference between the sides, not just material.",
        "The scan: minor pieces, pawns, space, material, files/squares, development, initiative, king safety.",
        "Good plans grow out of the biggest imbalance you find.",
        "A useful question when stuck: what is my worst-placed piece?",
      ],
      diagrams: [
        {
          fen: "r1bq1rk1/ppp2ppp/2np1n2/4p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 1",
          orientation: "white",
          caption:
            "Material is dead level — so the game is decided by the quieter imbalances: who has the better minor piece, more space, the safer king, and the more active pieces.",
        },
      ],
    },
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
      type: "sort",
      id: "imbalances-apply1",
      title: "Read the biggest imbalance",
      blurb: "Let the difference choose the plan.",
      prompt:
        "White is fully developed and castled while Black is still uncastled with pieces on the back rank. Which plan fits this imbalance?",
      fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 b kq - 0 1",
      orientation: "white",
      options: [
        { label: "Attack before Black catches up" },
        { label: "Trade everything to a quiet endgame" },
      ],
      correctIndex: 0,
      explanation:
        "The lead in development is a temporary imbalance — it disappears the moment Black finishes developing and castles. Press now: open lines and create threats while your extra ready pieces still count for something. Trading into an endgame just lets Black catch up for free.",
    },
    {
      type: "sort",
      id: "imbalances-apply2",
      title: "Evaluate the trade",
      blurb: "Is this exchange good for you?",
      prompt:
        "Your knight sits passively on the rim while Black's bishop rakes a long open diagonal. You can swap them off. Good idea?",
      fen: "r2qk2r/ppp2ppp/2np1n2/4p1b1/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 w kq - 0 1",
      orientation: "white",
      options: [
        { label: "No — keep both pieces" },
        { label: "Yes — trade your worse piece for their better one" },
      ],
      correctIndex: 1,
      explanation:
        "When you can swap your worst-placed piece for the opponent's best-placed one, take it. The trade erases a piece-quality imbalance that was working against you and leaves the remaining forces more even — a clear gain even though the material count never changed.",
    },
    {
      type: "replay",
      id: "imbalances-plan-demo",
      title: "Spotting the plan",
      blurb: "Turn a small edge into a clear plan.",
      orientation: "white",
      eval: true,
      source: "Italian Game",
      intro:
        "Watch a quiet opening reach a position with one clear imbalance. Notice how the edge — better development and a target — suggests the plan all by itself. Keep an eye on the eval bar: a lead in development is real, even when the score is still near level.",
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
          keyIdea: "Let the imbalance choose the plan",
          highlights: ["f7"],
          note: "Now read the imbalances: White is fully developed and castled, while Black still has loose pieces and a slightly weak f7. The plan writes itself — keep developing, pile up on the centre and f7, and use the lead in development before Black catches up.",
          arrows: [{ from: "c4", to: "f7" }],
        },
      ],
    },
    {
      type: "guessMove",
      id: "imbalances-guess",
      title: "Guess the Move: press the lead",
      blurb: "Predict the moves that turn a head start into pressure.",
      orientation: "white",
      source: "Italian Game, Giuoco Piano",
      intro:
        "You're White. Play the opening forward; at two points, predict the move before it's revealed. The thread to follow: a lead in development wants the centre opened, not kept closed.",
      moves: [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "c3", "Nf6", "d4", "exd4", "cxd4", "Bb4+", "Nc3",
      ],
      guessAt: [6, 8],
      notes: [
        undefined, undefined, undefined, undefined, undefined, undefined,
        "Quietly preparing d4 — the move that opens the centre while you're the better-developed side.",
        undefined,
        "Strike! Opening the centre is exactly what a development lead wants — closed lines would only let Black catch up.",
        undefined, undefined, undefined, undefined,
      ],
      successText:
        "That's the imbalance speaking: ahead in development, you open lines so your ready pieces outgun Black's sleeping ones.",
    },
    {
      type: "plan",
      id: "imbalances-plan-apply",
      title: "Find the plan, then convert",
      blurb: "Read the imbalances, pick the plan, and bring home the point.",
      fen: "5rk1/ppp2ppp/8/3N4/8/8/PPP2PPP/2R1R1K1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "Run the imbalance scan: you're up material, you own the only open file, and your knight dominates from d5. What's the plan?",
      options: [
        "Use the open file and the strong knight together — bring a rook to the 7th and let the pieces work — then convert the extra material.",
        "Trade both rooks at once to reach a quiet knight ending.",
        "Shuffle your king and wait for Black to find a plan.",
      ],
      correctIndex: 0,
      explanation:
        "Stack your advantages: the open file is a highway for the rooks, the d5-knight is untouchable, and you're up material. Activate everything and the win plays itself.",
      convert: {
        kind: "drill",
        drill: {
          fen: "5rk1/ppp2ppp/8/3N4/8/8/PPP2PPP/2R1R1K1 w - - 0 1",
          orientation: "white",
          objective: "checkmate",
          engineSkill: 2,
          instructions:
            "White to play. Use the open file and the dominant knight to invade and convert your material edge into checkmate.",
          successText: "Converted — active pieces plus an extra exchange make the win routine.",
        },
      },
    },
    {
      type: "quiz",
      id: "imbalances-review",
      title: "Review: the planning habit",
      blurb: "One question that always points somewhere useful.",
      question:
        "Nothing is forcing and you're unsure what to do. Which question most reliably produces a good move?",
      options: [
        "What is my worst-placed piece — and how do I improve it?",
        "Which pawn can I push the furthest?",
        "Can I offer a draw?",
      ],
      correctIndex: 0,
      explanation:
        "When the position is quiet, improving your worst piece raises the quality of your whole army and almost always suggests a concrete, useful move.",
    },
  ],
};
