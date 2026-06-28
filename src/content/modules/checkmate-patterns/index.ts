// "Checkmating Patterns" module — the named mating nets every player must
// recognize on sight. Each pattern gets a Learn beat (the mechanism + an
// annotated diagram of the net) and a Try beat (deliver the mate yourself).
// A final "gym" interleaves them for mixed retrieval.
//
// All prose is original; every mate position is engine-verified (sound + unique)
// by `npm run validate`. Patterns are timeless public chess knowledge.

import type { Lesson, Module } from "../../types";

const overview: Lesson = {
  id: "cp-overview",
  title: "How mating patterns work",
  summary: "Strong players don't calculate every mate from scratch — they recognize a handful of recurring nets instantly.",
  activities: [
    {
      type: "concept",
      id: "cp-overview-concept",
      title: "Learn the nets, see the mates",
      blurb: "Recognition beats calculation.",
      body:
        "Almost every checkmate is one of a few recurring shapes — a 'net' of pieces that traps the king the same way again and again. Strong players don't recalculate these from zero; they SEE the pattern and the move appears instantly.\n\nThis course is a catalog of the classic named nets. For each one you'll learn how it traps the king, see the finished picture, then deliver it yourself. Learn the shapes and you'll spot mates — and mating threats — faster in every game you play.",
      points: [
        "A mate is usually a pattern, not a calculation.",
        "Each net traps the king by covering every escape with overlapping pieces.",
        "Recognize the shape → find the move instantly.",
      ],
    },
  ],
};

/** One pattern lesson: explain the net + annotated diagram + a comprehension
 *  check, then deliver the mate (engine-verified). */
function patternLesson(p: {
  id: string;
  name: string;
  summary: string;
  body: string;
  points: string[];
  fen: string;
  arrows: { from: string; to: string }[];
  diagramCaption: string;
  check: { question: string; options: string[]; correctIndex: number; explanation: string };
  goalInMoves: number;
  solution: string[];
  prompt: string;
  hints: string[];
  successText: string;
}): Lesson {
  return {
    id: p.id,
    title: p.name,
    summary: p.summary,
    activities: [
      {
        type: "concept",
        id: `${p.id}-concept`,
        title: `The ${p.name}`,
        blurb: "How the net traps the king.",
        body: p.body,
        points: p.points,
        diagrams: [
          {
            fen: p.fen,
            orientation: "white",
            arrows: p.arrows,
            caption: p.diagramCaption,
          },
        ],
        check: p.check,
      },
      {
        type: "puzzle",
        id: `${p.id}-deliver`,
        title: `Deliver the ${p.name}`,
        blurb: "Your turn — finish it.",
        fen: p.fen,
        orientation: "white",
        goal: { type: "mate", inMoves: p.goalInMoves },
        prompt: p.prompt,
        hints: p.hints,
        successText: p.successText,
        solution: p.solution,
      },
    ],
  };
}

const backRank = patternLesson({
  id: "cp-back-rank",
  name: "Back-Rank Mate",
  summary: "A rook or queen mates the king on its first rank, fenced in by its own pawns.",
  body:
    "The most common mate in chess. A king that has castled but never made 'luft' (a pawn move for breathing room) is trapped on its back rank by its own pawns. A rook or queen arriving on that rank delivers mate — the king has nowhere to run.\n\nThe lesson cuts both ways: hunt for it against an unguarded back rank, and prevent it by giving your own king an escape square before it matters.",
  points: [
    "The king's own pawns (f7/g7/h7) block every escape.",
    "A rook or queen on the back rank delivers mate.",
    "Prevent it: make 'luft' with a quiet pawn move when safe.",
  ],
  fen: "6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1",
  arrows: [{ from: "a1", to: "a8" }],
  diagramCaption:
    "The king is fenced in by f7/g7/h7. The rook swings to the back rank — Ra8 — and there's no escape.",
  check: {
    question: "Why can't the king escape the rook's check on the back rank?",
    options: [
      "Its own pawns on f7, g7 and h7 block every forward square.",
      "The rook is defended, so the king may not move at all.",
      "Kings are not allowed to move on the back rank.",
    ],
    correctIndex: 0,
    explanation:
      "The king has no 'luft' — its own pawns wall off the 7th rank, so a rook (or queen) on the 8th rank gives mate. Make a pawn move for your own king early to avoid this.",
  },
  goalInMoves: 1,
  solution: ["a1a8"],
  prompt: "White to play. The black king has no escape on the back rank — mate in one.",
  hints: ["The king's own pawns trap it on the 8th rank.", "Bring the rook to the back rank."],
  successText: "Ra8# — the classic back-rank mate. The king's own pawns sealed its fate.",
});

const smothered = patternLesson({
  id: "cp-smothered",
  name: "Smothered Mate",
  summary: "A lone knight mates a king hemmed in entirely by its own pieces — set up by a queen sacrifice.",
  body:
    "The prettiest mate in chess. The king is 'smothered' by its own pieces, leaving a knight to deliver an unstoppable check. The classic recipe: a knight check forces the king to the corner, then a QUEEN SACRIFICE on g8 forces the rook to block — sealing the last escape — and the knight returns with mate.\n\nIt's Philidor's Legacy: Nf7+ Kg8, Nh6+ Kh8 (now the knight covers g8), Qg8+!! Rxg8, Nf7#.",
  points: [
    "The king is trapped by its OWN pieces (smothered).",
    "A queen sacrifice forces a piece onto the king's last escape square.",
    "A knight delivers the final, unblockable check.",
  ],
  fen: "5r1k/6pp/8/4N3/8/1Q6/8/6K1 w - - 0 1",
  arrows: [{ from: "e5", to: "f7" }],
  diagramCaption:
    "White to move. The knight begins the smother: Nf7+ drives the king to the corner before the queen sacrifice seals it.",
  check: {
    question: "What is the role of the queen sacrifice in a smothered mate?",
    options: [
      "It forces an enemy piece onto the king's last escape square.",
      "It wins material before the mate.",
      "It gives the king a chance to run away.",
    ],
    correctIndex: 0,
    explanation:
      "Qg8+!! forces ...Rxg8 — the rook is dragged onto g8, the king's only flight square. Now the king is fully smothered and Nf7 is mate.",
  },
  goalInMoves: 4,
  solution: ["e5f7", "h8g8", "f7h6", "g8h8", "b3g8", "f8g8", "h6f7"],
  prompt: "White to play and force the smothered mate in four — every move is forcing.",
  hints: [
    "Start with a knight check that drives the king to the corner.",
    "A queen sacrifice on g8 forces the rook to block — then the knight returns.",
  ],
  successText:
    "Nf7# — Philidor's Legacy! The queen sacrifice smothered the king with its own rook, and the knight finished the job.",
});

const anastasia = patternLesson({
  id: "cp-anastasia",
  name: "Anastasia's Mate",
  summary: "A knight and a rook trap the king against the edge — the knight covers the flight squares, the rook delivers.",
  body:
    "A knight and a rook combine to mate a king on the edge of the board. The knight (classically on e7) covers the king's escape squares toward the centre, the king's own pawn blocks another, and the rook swings onto the open h-file (or edge file) to deliver the check the king cannot escape.",
  points: [
    "A knight on e7 covers g6 and g8 — the escape squares.",
    "The king's own g-pawn blocks its last flight square.",
    "A rook on the h-file delivers the unstoppable check.",
  ],
  fen: "8/4N1pk/8/8/8/8/6K1/2R5 w - - 0 1",
  arrows: [{ from: "c1", to: "h1" }],
  diagramCaption:
    "The knight on e7 covers g6 and g8; the g7-pawn blocks the king. The rook swings to the h-file — Rh1 — for mate.",
  check: {
    question: "What does the knight on e7 contribute to Anastasia's mate?",
    options: [
      "It covers the king's escape squares g6 and g8.",
      "It gives the check that mates the king.",
      "It defends the white king from a distance.",
    ],
    correctIndex: 0,
    explanation:
      "The knight on e7 takes away g6 and g8, the g7-pawn blocks g7, and the rook checks down the h-file. With every escape covered, it's mate.",
  },
  goalInMoves: 1,
  solution: ["c1h1"],
  prompt: "White to play. The knight has the king's escapes covered — bring the rook to the edge for mate in one.",
  hints: ["The knight on e7 covers g6 and g8.", "Swing the rook onto the open h-file."],
  successText: "Rh1# — Anastasia's mate. Knight and rook together, with no escape on the edge.",
});

const arabian = patternLesson({
  id: "cp-arabian",
  name: "Arabian Mate",
  summary: "A knight and a rook mate a king in the corner — one of the oldest patterns in chess.",
  body:
    "An ancient pattern (it predates the modern queen). A rook and knight trap a king in the corner: the rook controls the back rank and the file beside the king, while the knight guards the king's only diagonal escape AND defends the rook so the king can't capture it.",
  points: [
    "The rook checks the cornered king and covers an escape rank.",
    "The knight covers the diagonal flight square AND defends the rook.",
    "King and rook working together — no queen needed.",
  ],
  fen: "7k/3R4/5N2/8/8/8/8/6K1 w - - 0 1",
  arrows: [{ from: "d7", to: "h7" }],
  diagramCaption:
    "The knight on f6 guards g8 and defends h7. The rook swings to h7 — Rh7 — covering g7 and the corner. Mate.",
  check: {
    question: "Why can't the cornered king capture the rook that mates it?",
    options: [
      "The knight on f6 defends the rook's mating square.",
      "The rook is too far away to be captured.",
      "The king is pinned and may not move.",
    ],
    correctIndex: 0,
    explanation:
      "The knight on f6 both guards g8 (the escape) and defends h7 (where the rook lands). The king can't take the rook or flee — the Arabian mate.",
  },
  goalInMoves: 1,
  solution: ["d7h7"],
  prompt: "White to play. The knight guards g8 and h7 — deliver the corner mate in one.",
  hints: ["The knight on f6 covers g8 and defends h7.", "Bring the rook alongside the king on the 7th rank."],
  successText: "Rh7# — the Arabian mate. The knight guards the escape and defends the rook; the king is trapped in the corner.",
});

const boden = patternLesson({
  id: "cp-boden",
  name: "Boden's Mate",
  summary: "Two bishops on crossing diagonals mate a king — usually one that has castled queenside.",
  body:
    "Two bishops deliver a criss-cross mate, most often against a king castled on the queenside. One bishop checks along one diagonal while the other covers the king's escape on the opposite-coloured diagonal — and the king's own pieces block the rest. Boden's mate is frequently set up by a queen sacrifice that clears the checking diagonal.",
  points: [
    "Two bishops cover crossing diagonals of opposite colours.",
    "The king's own pieces block its remaining escapes.",
    "Often introduced by a queen sacrifice to open the diagonal.",
  ],
  fen: "2kr4/p2p4/8/8/2B2B2/8/8/6K1 w - - 0 1",
  arrows: [
    { from: "c4", to: "a6" },
    { from: "f4", to: "b8" },
  ],
  diagramCaption:
    "The dark bishop on f4 covers c7 and b8; the king's rook and d-pawn block the rest. The light bishop swings to a6 — check along a6–c8 — for mate.",
  check: {
    question: "How do two bishops mate the king in Boden's pattern?",
    options: [
      "They cover crossing diagonals of both colours, sealing every escape.",
      "They both attack the same square at once.",
      "One bishop promotes while the other checks.",
    ],
    correctIndex: 0,
    explanation:
      "One bishop checks along a6–c8; the other (f4) covers c7 and b8. Different-coloured diagonals cover different escape squares — the king, boxed by its own pieces, is mated.",
  },
  goalInMoves: 1,
  solution: ["c4a6"],
  prompt: "White to play. The dark bishop already covers c7 and b8 — bring the light bishop in for mate in one.",
  hints: ["The f4-bishop covers the dark-square escapes.", "Check along the light a6–c8 diagonal."],
  successText: "Ba6# — Boden's mate. Two bishops on crossing diagonals, and the queenside king is trapped by its own pieces.",
});

const epaulette = patternLesson({
  id: "cp-epaulette",
  name: "Épaulette Mate",
  summary: "The king is mated in the open because its own rooks, like shoulder pads, block its only escapes.",
  body:
    "A picture-perfect pattern: the king sits in the middle of a rank, flanked on both sides by its own rooks (the 'épaulettes', or shoulder pads). Those rooks block the only two escape squares, so a queen delivering check along the file — even from a distance — gives mate.",
  points: [
    "The king's own rooks flank it and block both side escapes.",
    "A queen checks along the open file between them.",
    "No support needed — the king simply has nowhere to go.",
  ],
  fen: "3rkr2/8/8/8/8/8/Q7/6K1 w - - 0 1",
  arrows: [{ from: "a2", to: "e6" }],
  diagramCaption:
    "The black king on e8 is boxed by its own rooks on d8 and f8. The queen comes to e6 — check up the e-file — and there's no escape.",
  check: {
    question: "What makes the épaulette mate possible?",
    options: [
      "The king's own rooks block its only two escape squares.",
      "The queen is defended by a pawn.",
      "The king is already in check from two directions.",
    ],
    correctIndex: 0,
    explanation:
      "The rooks on d8 and f8 (the 'shoulder pads') block d-file and f-file escapes. A queen checking up the e-file finds the king with nowhere to step aside — mate.",
  },
  goalInMoves: 1,
  solution: ["a2e6"],
  prompt: "White to play. The king is boxed by its own rooks — check up the e-file for mate in one.",
  hints: ["The rooks on d8 and f8 block the king's escapes.", "Bring the queen onto the e-file."],
  successText: "Qe6# — the épaulette mate. The king's own rooks were its undoing.",
});

const damiano = patternLesson({
  id: "cp-damiano",
  name: "Damiano's Mate",
  summary: "A pawn supports a queen that mates the king in the corner — one of the oldest recorded mates.",
  body:
    "First analysed over 500 years ago. A pawn (usually on g6) supports the queen as it lands right next to the cornered king. Because the pawn defends the queen, the king can't capture it — and with the corner already cramped, every escape is covered. Damiano's mate is classically reached by a rook sacrifice or two to drag the king into the corner first.",
  points: [
    "A pawn on g6 supports the queen's mating square.",
    "The king can't capture the defended queen.",
    "The corner leaves the king no escape.",
  ],
  fen: "7k/Q7/6P1/8/8/8/8/6K1 w - - 0 1",
  arrows: [
    { from: "a7", to: "h7" },
    { from: "g6", to: "h7" },
  ],
  diagramCaption:
    "The g6-pawn guards h7. The queen swings to h7 — right beside the king — and the pawn's support makes it mate.",
  check: {
    question: "Why can't the king capture the queen in Damiano's mate?",
    options: [
      "The g6-pawn defends the queen's mating square.",
      "The queen gives check from a safe distance.",
      "The king is pinned to the corner.",
    ],
    correctIndex: 0,
    explanation:
      "The pawn on g6 defends h7, so the king can't take the queen there. With g8 and g7 also covered by the queen, the cornered king is mated.",
  },
  goalInMoves: 1,
  solution: ["a7h7"],
  prompt: "White to play. The g6-pawn supports h7 — bring the queen in beside the king for mate in one.",
  hints: ["The g6-pawn defends the h7-square.", "Land the queen right next to the king."],
  successText: "Qh7# — Damiano's mate. The humble pawn supported the queen for the kill.",
});

const gym: Lesson = {
  id: "cp-gym",
  title: "The Mating-Pattern Gym",
  summary: "Now recognize them under pressure: the nets you've learned, shuffled and served one at a time.",
  activities: [
    {
      type: "concept",
      id: "cp-gym-concept",
      title: "Mixed retrieval",
      blurb: "Spot the net, deliver the mate.",
      body:
        "You've met the nets one at a time — the real skill is recognizing them when they're mixed together, the way they appear in a game. Here come the patterns shuffled: for each, spot which net applies and deliver the mate. Get them right and they'll be second nature.",
      points: [
        "Each position is one of the patterns you just learned.",
        "Recognize the shape first, then play the move.",
        "Speed comes from pattern recognition, not calculation.",
      ],
    },
    {
      type: "practiceSet",
      id: "cp-gym-set",
      title: "Name that mate",
      blurb: "Deliver each mate from the shuffled patterns.",
      intro: "Six classic nets, shuffled. Deliver the mate in each — master five to clear the gym.",
      requiredCorrect: 5,
      items: [
        {
          fen: "6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1",
          orientation: "white",
          solution: ["a1a8"],
          goal: { type: "mate", inMoves: 1 },
          prompt: "Deliver the mate in one. (Which net is this?)",
        },
        {
          fen: "8/4N1pk/8/8/8/8/6K1/2R5 w - - 0 1",
          orientation: "white",
          solution: ["c1h1"],
          goal: { type: "mate", inMoves: 1 },
          prompt: "Deliver the mate in one. (Which net is this?)",
        },
        {
          fen: "7k/3R4/5N2/8/8/8/8/6K1 w - - 0 1",
          orientation: "white",
          solution: ["d7h7"],
          goal: { type: "mate", inMoves: 1 },
          prompt: "Deliver the mate in one. (Which net is this?)",
        },
        {
          fen: "2kr4/p2p4/8/8/2B2B2/8/8/6K1 w - - 0 1",
          orientation: "white",
          solution: ["c4a6"],
          goal: { type: "mate", inMoves: 1 },
          prompt: "Deliver the mate in one. (Which net is this?)",
        },
        {
          fen: "3rkr2/8/8/8/8/8/Q7/6K1 w - - 0 1",
          orientation: "white",
          solution: ["a2e6"],
          goal: { type: "mate", inMoves: 1 },
          prompt: "Deliver the mate in one. (Which net is this?)",
        },
        {
          fen: "7k/Q7/6P1/8/8/8/8/6K1 w - - 0 1",
          orientation: "white",
          solution: ["a7h7"],
          goal: { type: "mate", inMoves: 1 },
          prompt: "Deliver the mate in one. (Which net is this?)",
        },
      ],
    },
    {
      type: "concept",
      id: "cp-gym-practice",
      title: "Keep sharpening",
      blurb: "Patterns stick through reps.",
      body:
        "The more mates you see, the faster you'll spot them over the board. Keep drilling 'mate' tactics in the Tactics Trainer — the patterns you learned here will start jumping out at you.",
      points: [
        "Recognition is built by volume — keep solving.",
        "Watch for these nets forming in your own games.",
      ],
      practice: { tool: "tactics", theme: "mate", maxDifficulty: 2, label: "Drill mates now" },
    },
  ],
};

export const checkmatePatterns: Module = {
  id: "checkmate-patterns",
  title: "Checkmating Patterns",
  description:
    "The named mating nets every player must recognize on sight — back-rank, smothered, Boden's, Anastasia's, the Arabian, épaulette and Damiano's. See each net, then deliver it.",
  level: "Intermediate",
  lessons: [
    overview,
    backRank,
    smothered,
    anastasia,
    arabian,
    boden,
    epaulette,
    damiano,
    gym,
  ],
};
