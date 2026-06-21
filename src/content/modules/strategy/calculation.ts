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
        "Calculation begins with forcing moves — checks, captures, and threats — because they limit the opponent's replies and are where tactics hide. Gather two or three candidate moves, then work through each one in turn instead of grabbing the first idea you see.\n\nWhenever a capture is involved, count every attacker and defender on the square and play the line out to a quiet position. A combination only works if you've calculated it to the end.",
      points: [
        "Check forcing moves first: checks, captures, threats.",
        "List your candidate moves, then calculate each.",
        "Count the captures before you grab anything.",
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
      blurb: "Spot the forcing shot.",
      orientation: "white",
      intro:
        "Watch a normal opening reach a moment where a forcing capture wins material. The key is checking the captures before settling for a quiet move.",
      steps: [
        { san: "e4", note: "Open the centre." },
        { san: "e5", note: "Black contests it." },
        { san: "Nf3", note: "Attack e5 and develop." },
        { san: "Nc6", note: "Black defends the pawn." },
        { san: "Bc4", note: "The bishop targets f7." },
        { san: "Nd4", note: "A tempting but loosening try, attacking the f3-knight." },
        { san: "Nxe5", note: "White grabs the pawn — and sets a trap on f7." },
        { san: "Qg5", note: "Black double-attacks the knight on e5 and the g2-pawn, hoping to regain material." },
        { san: "Nxf7", note: "Calculate the forcing move: the knight forks the queen on g5 and the rook on h8." },
        {
          san: "Qxg2",
          note: "Black takes on g2, but it is too slow.",
        },
        { san: "Rf1", note: "Quietly defend and keep the extra piece." },
        {
          san: "Qxe4+",
          note: "Black grabs another pawn with check, but White is simply up a knight after the fork on f7. The lesson: a forcing capture, calculated to the end, won the material outright.",
        },
      ],
    },
  ],
};
