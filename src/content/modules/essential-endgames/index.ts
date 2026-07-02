// "Essential Endgames" module — the breadth the Endgame Trainer can't drill:
// the endings you must be able to JUDGE (won or drawn?) and the drawing/holding
// techniques. Focuses on the gaps — opposite-coloured bishops, bishop vs knight,
// the wrong bishop, rook-ending principles, queen vs pawn, and fortresses —
// rather than re-teaching the basic mates and K+P (covered elsewhere).
//
// NOTE: the eval bar is intentionally NOT used on the drawing positions — without
// tablebases Stockfish overvalues the extra material and would mislabel a fortress
// as winning. The skill here is human judgment, drilled via "won or drawn?" calls.
// All prose original; diagrams legality-checked; the queen-vs-pawn drill is
// engine-verified winnable by `npm run validate`.

import type { Lesson, Module } from "../../types";

const overview: Lesson = {
  id: "ee-overview",
  title: "Won or drawn? The endgame question",
  summary: "The single most valuable endgame skill isn't a technique — it's judging whether a position is winning or only a draw.",
  activities: [
    {
      type: "concept",
      id: "ee-overview-concept",
      title: "Judge before you play",
      blurb: "Know the result, then steer toward it.",
      body:
        "In the middlegame you calculate; in the endgame you must first JUDGE. Being a pawn — even a piece — ahead means nothing if the position is a theoretical draw, and a 'lost' position is often a fortress you can hold. The strongest practical skill is recognising, at a glance, whether an ending is won or drawn, so you steer toward the right goal.\n\nThis course covers the endings most players misjudge: opposite-coloured bishops (drawish), the bishop-versus-knight battle, the 'wrong bishop', rook endings (where activity is everything), queen versus pawn, and fortresses. For each, the question is the same — won or drawn? — and knowing the answer is half the battle.",
      points: [
        "First judge the ending (won or drawn?), then choose your plan.",
        "Extra material can still be a draw; a worse position can still be a fortress.",
        "Recognising the result is the endgame's most practical skill.",
      ],
    },
  ],
};

const oppositeBishops: Lesson = {
  id: "ee-opposite-bishops",
  title: "Opposite-Coloured Bishops",
  summary: "The great drawing weapon: with bishops on opposite colours, even an extra pawn or two often isn't enough to win.",
  activities: [
    {
      type: "concept",
      id: "ee-opposite-bishops-concept",
      title: "The drawing tendency",
      blurb: "A pawn up — and still a draw.",
      body:
        "When each side has a bishop and they travel on opposite colours, the bishops can never challenge each other or trade. That makes these endings extraordinarily drawish: the defender sets up a blockade on the colour of his OWN bishop — squares the attacker's bishop can never attack — and the extra pawns simply can't break through.\n\nThe rule of thumb: with opposite-coloured bishops, the defender often holds a draw a pawn (sometimes two) down. The attacker only wins with a big material edge AND passed pawns far enough apart to stretch the defence past breaking point. When you're worse, steer INTO opposite bishops; when you're better, think twice before trading into them.",
      points: [
        "Opposite bishops can't trade — the defender blockades on his own colour.",
        "A pawn (often two) down is frequently still a draw.",
        "Worse? Trade into opposite bishops. Better? Avoid them.",
      ],
      diagrams: [
        {
          fen: "8/8/4k3/8/3KP3/3B4/8/4b3 w - - 0 1",
          orientation: "white",
          caption:
            "White is a clean pawn up — but it's a draw. Black blockades the e5-square with his king; White's light-squared bishop can never control e5 or evict the king, and the pawn can't advance alone.",
        },
      ],
      check: {
        question: "Why are opposite-coloured-bishop endings so often drawn, even a pawn down?",
        options: [
          "The defender blockades on his own bishop's colour — squares the attacker's bishop can never attack.",
          "Bishops of opposite colour are worth more than usual.",
          "The fifty-move rule always ends them in a draw.",
        ],
        correctIndex: 0,
        explanation:
          "The attacker's bishop controls one colour; the defender blockades on the OTHER. Since the bishops can't trade or challenge each other, the extra pawn can't be forced through. Steer into these when defending.",
      },
    },
    {
      type: "quiz",
      id: "ee-ocb-quiz",
      title: "Which way do you steer?",
      blurb: "Use the drawing tendency.",
      question:
        "You're a pawn DOWN in a same-coloured-bishop ending and can force a trade into an opposite-coloured-bishop ending. Do you?",
      options: [
        "Yes — opposite bishops give you excellent drawing chances despite the pawn.",
        "No — you should keep pieces on and play for complications.",
        "It makes no difference to the result.",
      ],
      correctIndex: 0,
      explanation:
        "When defending a slightly worse ending, opposite-coloured bishops are your friend — head for them. (When you're the one a pawn up, you'd avoid the trade for the same reason.)",
    },
  ],
};

const bishopVsKnight: Lesson = {
  id: "ee-bishop-vs-knight",
  title: "Bishop vs Knight Endings",
  summary: "Which minor piece wins the endgame? It depends on the pawns — open boards and play on both wings favour the bishop.",
  activities: [
    {
      type: "concept",
      id: "ee-bvn-concept",
      title: "Read the pawns",
      blurb: "Bishop for range, knight for blockades.",
      body:
        "In the endgame the bishop-versus-knight question sharpens. The BISHOP excels when the position is open and there are passed pawns or targets on BOTH wings — it switches flanks in one move and stops a far-flung passed pawn from a distance, something the short-stepping knight can't do. The KNIGHT is better when the pawns are fixed on one side or locked, where its hopping outweighs the bishop's range and the bishop has no open diagonals.\n\nThe practical guide: with pawns on both wings, prefer the bishop; with all the play on one side or a blocked structure, prefer the knight. And a knight on a secure outpost can dominate even an open board.",
      points: [
        "Pawns on both wings, open board → the bishop's range wins out.",
        "One-sided or locked pawns → the knight's hops shine.",
        "The bishop stops a distant passed pawn; the knight needs to be close.",
      ],
      diagrams: [
        {
          fen: "8/p5kp/8/3b4/8/3N4/P5KP/8 w - - 0 1",
          orientation: "white",
          caption:
            "Pawns on both wings (a- and h-files): Black's bishop can guard or attack on both flanks at once, while White's knight needs several moves to cross the board. Here the bishop is the better piece.",
        },
      ],
      check: {
        question: "With pawns on both wings and an open board, which minor piece is usually better in the endgame?",
        options: [
          "The bishop — it covers both flanks and stops far passed pawns from a distance.",
          "The knight — it can fork the enemy king.",
          "They are always exactly equal in the endgame.",
        ],
        correctIndex: 0,
        explanation:
          "On an open board with targets on both wings, the long-range bishop dominates the slow knight. Reserve the knight for closed, one-sided positions where its hops matter more than range.",
      },
    },
  ],
};

const wrongBishop: Lesson = {
  id: "ee-wrong-bishop",
  title: "The Wrong Bishop",
  summary: "A rook's pawn plus the 'wrong' bishop is the most famous fortress in chess — a draw even a whole piece up.",
  activities: [
    {
      type: "concept",
      id: "ee-wrong-bishop-concept",
      title: "When a bishop and pawn can't win",
      blurb: "The rook-pawn exception.",
      body:
        "Here's the exception that has saved countless half-points: a rook's pawn (an a- or h-pawn) plus a bishop that does NOT control the pawn's queening square is only a DRAW against a lone king. The defender simply sits his king in the corner. The bishop can't attack the corner square, so it can never drive the king out, and the lone king can't be stalemated into giving way.\n\nIt's called the 'wrong bishop' (or 'wrong rook's pawn'). Know it cold — both to claim the draw when you're losing, and to avoid trading into it when you're a piece up and dreaming of a win that isn't there.",
      points: [
        "Rook's pawn + a bishop that can't control the queening square = draw.",
        "The defender's king sits in the corner and can never be evicted.",
        "Draw even a whole bishop and pawn ahead — recognise it before you trade.",
      ],
      diagrams: [
        {
          fen: "k7/8/1K6/P7/8/8/8/6B1 w - - 0 1",
          orientation: "white",
          caption:
            "The wrong bishop: White's DARK-squared bishop can never control a8 (a light square), the pawn's queening square. Black's king sits on a8 and can never be driven out — a draw, despite White's extra bishop and pawn.",
        },
      ],
      check: {
        question: "White has a king, an a-pawn, and a dark-squared bishop versus a lone king on a8. The result with best play is:",
        options: [
          "A draw — the bishop can't control a8, so the king can never be evicted.",
          "A win — any extra piece wins the endgame.",
          "A win only if it's White to move.",
        ],
        correctIndex: 0,
        explanation:
          "It's the wrong-bishop draw. The bishop can't attack the light a8-square, and the lone king can't be stalemated out of the corner. A famous fortress worth half a point — know it from both sides.",
      },
    },
  ],
};

const rookEndings: Lesson = {
  id: "ee-rook-endings",
  title: "Rook Endgame Principles",
  summary: "Rook endings are the most common — and the most drawish. Activity is everything, and the rook belongs behind passed pawns.",
  activities: [
    {
      type: "concept",
      id: "ee-rook-endings-concept",
      title: "Activity over everything",
      blurb: "An active rook is worth a pawn.",
      body:
        "Rook endings appear more than any other — and they're famously drawish ('all rook endings are drawn', runs the old joke). The reason most go astray is passivity. The golden principles: keep your rook ACTIVE (an active rook is often worth a pawn), and put your rook BEHIND passed pawns — yours, to push them, and the enemy's, to brake them.\n\nThe two positions every player must know are the Lucena (the winning method: 'build a bridge' to shelter your king and promote) and the Philidor (the drawing method: keep your rook on the third rank, then check from behind). Drill those in the Endgame Trainer until they're automatic — here, lock in the principle that activity beats material.",
      points: [
        "Keep the rook active — a passive rook loses; an active one is worth a pawn.",
        "Rooks belong BEHIND passed pawns (yours to push, theirs to stop).",
        "Know the Lucena (win: build a bridge) and Philidor (draw: third-rank defence).",
      ],
      diagrams: [
        {
          fen: "r5k1/8/8/P7/8/8/8/R5K1 w - - 0 1",
          orientation: "white",
          arrows: [{ from: "a1", to: "a5" }],
          caption:
            "Rooks belong behind passed pawns. White's rook pushes from behind and stays active as the pawn advances; Black's rook, stuck in front blockading, is passive and tied down.",
        },
      ],
      check: {
        question: "Where does a rook belong relative to a passed pawn?",
        options: [
          "Behind it — supporting your own passer, or braking the enemy's.",
          "Always directly in front of it, blockading.",
          "On the opposite side of the board, attacking other pawns.",
        ],
        correctIndex: 0,
        explanation:
          "The rook belongs behind passed pawns. Behind your own, it pushes while staying active; behind the enemy's, it stops the pawn without becoming passive. A rook stuck in front is condemned to passivity.",
      },
    },
    {
      type: "quiz",
      id: "ee-rook-activity-quiz",
      title: "The price of activity",
      blurb: "When to give a pawn.",
      question:
        "In a rook ending you can grab a pawn, but your rook ends up passive (tied to defending), or stay a pawn down with a very active rook. Often the right choice is:",
      options: [
        "Keep the rook active even at the cost of a pawn — activity is worth it.",
        "Always grab the pawn; material is what counts in endgames.",
        "Trade the rooks off immediately.",
      ],
      correctIndex: 0,
      explanation:
        "In rook endings, an active rook is frequently worth a pawn. A passive rook tied to defence is the most common way these drawish endings are lost. When in doubt, keep the rook active.",
    },
  ],
};

const queenVsPawn: Lesson = {
  id: "ee-queen-vs-pawn",
  title: "Queen vs Pawn",
  summary: "A queen beats a lone pawn one step from promoting — except for two pawns that draw by a stalemate trick.",
  activities: [
    {
      type: "concept",
      id: "ee-queen-vs-pawn-concept",
      title: "The win — and the exceptions",
      blurb: "Check, approach, repeat.",
      body:
        "A queen normally beats a lone pawn on the 7th rank, even with the enemy king defending it. The method is a rhythm: check the king, and on each check the king is forced in front of its own pawn, giving you a free tempo to march your king one step closer. Repeat until your king arrives and you win the pawn.\n\nThe famous EXCEPTIONS are the rook's pawn (a/h) and the bishop's pawn (c/f). With those, when you force the king in front of the pawn, the defender is STALEMATED — so the trick fails and it's a draw (with the lone king close enough). A central or knight's pawn is a clean win; a rook- or bishop-pawn on the 7th, with the king nearby, is a draw. Know the difference.",
      points: [
        "Method: check, force the king in front, step your king closer, repeat.",
        "Central and knight's pawns: a clean win.",
        "Rook's (a/h) and bishop's (c/f) pawns: draw by stalemate, king nearby.",
      ],
      diagrams: [
        {
          fen: "8/8/8/8/8/3k4/3p4/3K2Q1 w - - 0 1",
          orientation: "white",
          caption:
            "A central (d-) pawn one step from queening — a clean win. White checks, the king is forced in front of the pawn, and White's king walks up. (A rook- or bishop-pawn here would draw by stalemate.)",
        },
      ],
      check: {
        question: "Queen vs a lone pawn on the 7th, defending king alongside. Which pawn is a DRAW?",
        options: [
          "A rook's pawn (a- or h-file) — the win fails to a stalemate trick.",
          "A central (d- or e-) pawn.",
          "A knight's pawn (b- or g-file).",
        ],
        correctIndex: 0,
        explanation:
          "Rook's pawns (and bishop's pawns) draw: forcing the king in front of the pawn leaves the defender stalemated, so you can't gain the tempo to approach. Central and knight's pawns are clean wins.",
      },
    },
    {
      type: "drill",
      id: "ee-queen-vs-pawn-drill",
      title: "Drill: win queen vs pawn",
      blurb: "Round up the runner.",
      fen: "8/8/8/8/8/3k4/3p4/3K2Q1 w - - 0 1",
      orientation: "white",
      objective: "checkmate",
      engineSkill: 8,
      instructions:
        "Queen vs a central pawn one step from promoting. Check the king, force it in front of the pawn, then march YOUR king one step closer. Repeat until you win the pawn — then mate. (Don't stalemate!)",
      successText:
        "Won! Check, approach, repeat — that's how the queen rounds up a runner. Remember: this works for a central or knight's pawn, but a rook- or bishop-pawn would draw.",
    },
  ],
};

const gym: Lesson = {
  id: "ee-gym",
  title: "The Assessment Gym",
  summary: "Put it together: the one skill that matters most — calling won or drawn — across every ending you've met.",
  activities: [
    {
      type: "concept",
      id: "ee-gym-concept",
      title: "Won or drawn?",
      blurb: "Make the call.",
      body:
        "The endgame skill that wins (and saves) the most points is the call itself: won or drawn? Run through these and judge each before you'd ever touch a piece. Then take the winnable techniques to the Endgame Trainer and drill them against the engine until converting is automatic.",
      points: [
        "Judge each ending: won, or only a draw?",
        "Steer toward the right result — push a win, hold a draw.",
        "Drill the techniques in the Endgame Trainer.",
      ],
    },
    {
      type: "sort",
      id: "ee-gym-ocb",
      title: "Won or drawn? (1)",
      blurb: "Opposite bishops.",
      prompt: "White is a pawn up with bishops on opposite colours and Black blockading. Won or drawn?",
      fen: "8/8/4k3/8/3KP3/3B4/8/4b3 w - - 0 1",
      orientation: "white",
      options: [{ label: "Drawn" }, { label: "Winning for White" }],
      correctIndex: 0,
      explanation:
        "Opposite-coloured bishops: the defender blockades on his own colour and the extra pawn can't be forced through. A draw.",
    },
    {
      type: "sort",
      id: "ee-gym-wrong-bishop",
      title: "Won or drawn? (2)",
      blurb: "Bishop + rook-pawn.",
      prompt: "White has a dark-squared bishop and an a-pawn; Black's king is in the corner on a8. Won or drawn?",
      fen: "k7/8/1K6/P7/8/8/8/6B1 w - - 0 1",
      orientation: "white",
      options: [{ label: "Drawn" }, { label: "Winning for White" }],
      correctIndex: 0,
      explanation:
        "The wrong bishop: it can't control a8, so the king can never be driven from the corner. Drawn, even a whole piece and pawn up.",
    },
    {
      type: "sort",
      id: "ee-gym-qvp",
      title: "Won or drawn? (3)",
      blurb: "Queen vs pawn.",
      prompt: "White: king and queen. Black: king and a central d-pawn on d2, one step from queening. Won or drawn?",
      fen: "8/8/8/8/8/3k4/3p4/3K2Q1 w - - 0 1",
      orientation: "white",
      options: [{ label: "Winning for White" }, { label: "Drawn" }],
      correctIndex: 0,
      explanation:
        "A central pawn is a clean win for the queen: check, force the king in front, approach, repeat. (Only rook- and bishop-pawns draw.)",
    },
    {
      type: "concept",
      id: "ee-gym-practice",
      title: "Now drill the techniques",
      blurb: "Judgment, then technique.",
      body:
        "You can judge the endings — now make the winnable ones automatic. The Endgame Trainer plays the must-know positions (the basic mates, king-and-pawn, Lucena, queen vs pawn and more) against a defending engine until you can convert them without thinking.",
      points: [
        "Judge first (won or drawn?), then convert with sound technique.",
        "Drill the winnable endings against real defence in the Endgame Trainer.",
      ],
      practice: { tool: "endgames", label: "Open the Endgame Trainer" },
    },
  ],
};

export const essentialEndgames: Module = {
  id: "essential-endgames",
  title: "Essential Endgames",
  description:
    "The endings you must be able to JUDGE: opposite-coloured bishops, bishop vs knight, the wrong bishop, rook-ending principles, and queen vs pawn. Learn won-from-drawn, then drill the techniques.",
  level: "Advanced",
  lessons: [overview, oppositeBishops, bishopVsKnight, wrongBishop, rookEndings, queenVsPawn, gym],
};
