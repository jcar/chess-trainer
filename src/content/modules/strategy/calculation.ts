// Strategy lesson 3 — calculation: forcing moves, candidate moves, counting
// captures, and finishing a combination. All prose original.

import type { Lesson } from "../../types";

export const calculationLesson: Lesson = {
  id: "calculation",
  title: "Calculation & Combinations",
  summary:
    "Look at forcing moves first, and calculate them to the end.",
  activities: [
    {
      type: "concept",
      id: "calculation-concept",
      title: "How to calculate",
      blurb: "Forcing moves first, all the way to the end.",
      body:
        "Calculation begins with forcing moves — checks, captures, and threats — because they limit the opponent's replies and are where tactics hide. Gather two or three candidate moves, then work through each one in turn instead of grabbing the first idea you see.\n\nBut first, a combination needs a reason to exist. Before you go looking, ask whether the position has one of the three preconditions: an exposed or boxed-in enemy king, an undefended enemy piece, or a piece that is defended but not enough. If none is present, there's probably no tactic — so calculate to a quiet end and count every attacker and defender before you grab anything.",
      points: [
        "Tactics need a target: an exposed king, an undefended piece, or an under-defended one.",
        "Check forcing moves first: checks, captures, threats.",
        "List your candidate moves, then calculate each to a quiet end.",
        "Count the captures before you grab anything.",
      ],
      diagrams: [
        {
          fen: "3r2k1/5ppp/8/3p4/3R4/8/5PPP/3R2K1 w - - 0 1",
          orientation: "white",
          arrows: [{ from: "d4", to: "d5" }],
          caption:
            "Before grabbing d5, count the square: two White rooks attack it, but a Black rook (and the king's reach) defend. Calculate the whole capture sequence to a quiet end before you take.",
        },
      ],
    },
    {
      type: "quiz",
      id: "calc-forcing",
      title: "Forcing moves first",
      blurb: "Where calculation starts.",
      question: "When calculating, which moves should you check first?",
      options: [
        "Quiet pawn moves that improve your structure.",
        "Forcing moves: checks, captures, and threats.",
        "Whatever move looks prettiest.",
      ],
      correctIndex: 1,
      explanation:
        "Forcing moves limit your opponent's replies, so they are easiest to calculate and most likely to hide a tactic. Always scan checks, captures, and threats before anything quiet.",
    },
    {
      type: "quiz",
      id: "calc-candidates",
      title: "Candidate moves",
      blurb: "Your shortlist to calculate.",
      question: "What are 'candidate moves'?",
      options: [
        "Moves your opponent is forced to play.",
        "Only moves that give check.",
        "The shortlist of moves worth calculating in a position.",
      ],
      correctIndex: 2,
      explanation:
        "Before calculating deeply, gather your candidate moves — the two or three ideas that look most promising. Then work through each one in turn instead of jumping at the first move you see.",
    },
    {
      type: "sort",
      id: "calc-count",
      title: "Count the captures",
      blurb: "Look before you grab.",
      prompt:
        "Before grabbing a pawn with a capture, what must you do?",
      fen: "3r2k1/5ppp/8/3p4/3R4/8/5PPP/3R2K1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Count all the captures on that square" },
        { label: "Just take it quickly" },
      ],
      correctIndex: 0,
      explanation:
        "On a contested square, count every attacker and every defender, and check the order of captures. Only take if the exchanges end in your favour — grabbing first and counting later is how pieces get lost.",
    },
    {
      type: "puzzle",
      id: "calc-smothered",
      title: "Smothered mate",
      blurb: "A forcing sequence to the end.",
      fen: "5r1k/6pp/8/4N3/8/1Q6/8/6K1 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 4 },
      prompt:
        "White to play and force mate in four — every move is a check.",
      hints: [
        "Start with a knight check the king can barely escape.",
        "A queen sacrifice clears the way for the smother.",
      ],
      successText:
        "Smothered mate! The queen sacrifice forced the rook to block, and the knight delivered mate with the king boxed in by its own pieces.",
      solution: ["e5f7", "h8g8", "f7h6", "g8h8", "b3g8", "f8g8", "h6f7"],
    },
    {
      type: "sort",
      id: "calculation-apply1",
      title: "Which move to calculate first?",
      blurb: "Forcing moves narrow the search.",
      prompt:
        "You spot several ideas in this position. Which type of move should you calculate first?",
      fen: "r4rk1/ppp2ppp/2n5/3qp3/3P4/2P2N2/PP3PPP/R2Q1RK1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "A quiet move that improves a piece" },
        { label: "A check or capture that forces a reply" },
      ],
      correctIndex: 1,
      explanation:
        "Forcing moves come first because they cut the opponent's choices down to almost nothing, so the tree you must calculate stays small and clear. Quiet improving moves matter, but you only reach for them after the checks, captures, and threats have all been checked and ruled out.",
    },
    {
      type: "sort",
      id: "calculation-apply2",
      title: "Do the captures favour you?",
      blurb: "Count to the last capture.",
      prompt:
        "Three pieces eye the contested e5-pawn on each side. Before grabbing it, what does counting tell you to do?",
      fen: "3r1rk1/pp3ppp/4n3/4p3/4P3/2N2N2/PP3PPP/2RR2K1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Take only if the exchanges end in your favour" },
        { label: "Grab the pawn immediately" },
        { label: "Never capture on a contested square" },
      ],
      correctIndex: 0,
      explanation:
        "On a contested square, line up every attacker and defender and play the trades out in your head to the very end. Capture only when the final tally leaves you ahead. Grabbing on instinct loses material the moment defenders outnumber attackers, and refusing every contested capture would mean missing winning exchanges.",
    },
    {
      type: "replay",
      id: "calc-combo-demo",
      title: "A combination in action",
      blurb: "Punish greed by calculating forcing moves.",
      orientation: "black",
      eval: true,
      source: "Blackburne Shilling Gambit",
      intro:
        "A cautionary tale about NOT calculating. Black lays a trap; White grabs material twice without checking the forcing replies — and gets mated. Watch from Black's side and follow the eval bar crash as the combination lands.",
      steps: [
        { san: "e4", note: "A standard opening move." },
        { san: "e5", note: "Black contests the centre." },
        { san: "Nf3", note: "Attacking e5 and developing." },
        { san: "Nc6", note: "Black defends the pawn." },
        { san: "Bc4", note: "The bishop eyes f7 — the classic Italian target." },
        {
          san: "Nd4",
          keyIdea: "The trap is set",
          note: "Black ignores the threat to e5 and lays a trap. It looks like a beginner's blunder — but it dares White to grab the pawn.",
        },
        {
          san: "Nxe5",
          note: "The greedy capture. White wins a pawn but didn't calculate Black's reply. The calm Nxd4 was clearly better — here, the trouble begins.",
        },
        {
          san: "Qg5",
          keyIdea: "The forcing refutation",
          highlights: ["e5", "g2"],
          arrows: [{ from: "g5", to: "e5" }, { from: "g5", to: "g2" }],
          note: "The double attack: the queen hits the knight on e5 AND the g2-pawn at once. White cannot save both — greed has rebounded.",
        },
        {
          san: "Nxf7",
          note: "Grabbing again instead of bailing out with Bxf7+. A second uncalculated capture — and now it's fatal.",
        },
        {
          san: "Qxg2",
          note: "Black takes g2, hitting the rook on h1 and eyeing the wide-open white king.",
        },
        { san: "Rf1", note: "Forced — the rook flees the attack, but White's kingside is in ruins." },
        {
          san: "Qxe4+",
          note: "Check, snatching the centre pawn and lining up the finish.",
        },
        { san: "Be2", note: "The only block — but it walks into the net." },
        {
          san: "Nf3#",
          keyIdea: "Calculate, or get mated",
          highlights: ["e1"],
          note: "Checkmate! The trapped king never escaped. The lesson cuts both ways: Black calculated the forcing combination to the end — and White, grabbing material without checking the replies, was punished outright.",
        },
      ],
    },
    {
      type: "concept",
      id: "calculation-practice",
      title: "Now calculate for real",
      blurb: "Train forcing-move calculation.",
      body:
        "Calculation is a muscle: list the forcing moves (checks, captures, threats), follow each to a quiet end, then pick the best. The Tactics Trainer is the gym — every puzzle is a calculation rep, and missed ones come back until they stick.",
      practice: { tool: "tactics", label: "Train tactics now" },
    },
    {
      type: "guessMove",
      id: "calculation-guess",
      title: "Guess the Move: the forcing path",
      blurb: "Predict the sharp moves in a famous attacking line.",
      orientation: "white",
      source: "Italian Game, Fried Liver Attack",
      intro:
        "You're White in one of chess's oldest attacking lines. Predict the forcing moves — and remember to calculate the consequences, not just play on feel.",
      moves: [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Nf6", "Ng5", "d5", "exd5", "Nxd5", "Nxf7",
      ],
      guessAt: [6, 10],
      notes: [
        undefined, undefined, undefined, undefined, undefined, undefined,
        "Ng5 leaps in, hitting f7 — the only square the bishop and knight both eye. A forcing threat that demands a reply.",
        undefined, undefined, undefined,
        "The Fried Liver! A knight sacrifice that drags the king out. Sharp play only works if you've calculated the king hunt to the end.",
      ],
      successText:
        "Forcing moves, calculated through: that's how sharp positions are handled — every check and capture followed to a quiet conclusion.",
    },
    {
      type: "plan",
      id: "calculation-plan-apply",
      title: "Find the plan, then finish",
      blurb: "Choose the winning idea, then calculate it home.",
      fen: "5r1k/6pp/8/4N3/8/1Q6/8/6K1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "You sense a finish here. What's the correct way to bring it home?",
      options: [
        "Calculate the forcing checks to the end — there's a forced mate hiding in the knight and queen.",
        "Snatch the f8-rook and hope it's enough.",
        "Trade the queen off to reach a winning endgame.",
      ],
      correctIndex: 0,
      explanation:
        "Forcing moves first: a string of checks ends in a smothered mate. Spotting 'there might be something' is step one — calculating it to checkmate is what wins.",
      convert: {
        kind: "puzzle",
        puzzle: {
          fen: "5r1k/6pp/8/4N3/8/1Q6/8/6K1 w - - 0 1",
          orientation: "white",
          goal: { type: "mate", inMoves: 4 },
          prompt: "Force mate in four — every move is a check.",
          hints: ["Start with a knight check the king can barely escape.", "A queen sacrifice clears the way for the smother."],
          successText: "Smothered mate! The queen sac forced the block, and the knight mated the boxed-in king.",
          solution: ["e5f7", "h8g8", "f7h6", "g8h8", "b3g8", "f8g8", "h6f7"],
        },
      },
    },
    {
      type: "quiz",
      id: "calculation-review",
      title: "Review: the calculation reflex",
      blurb: "The habit that catches tactics.",
      question:
        "It's your move in a sharp position. What should you scan before considering any quiet move?",
      options: [
        "Every forcing move — checks, captures and threats — calculated to a quiet end.",
        "Which of your pawns is most advanced.",
        "Whether you can safely offer a draw.",
      ],
      correctIndex: 0,
      explanation:
        "Tactics live in forcing moves. Scanning checks, captures and threats first — and calculating each to the end — is the reflex that stops you from missing a win or walking into one.",
    },
  ],
};
