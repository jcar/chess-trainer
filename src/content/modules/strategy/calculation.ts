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
  ],
};
