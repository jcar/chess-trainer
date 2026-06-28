// Chapter 15 — Intermediate strategy: the positional ideas behind strong moves.
// Original prose.

import type { Lesson } from "../../types";

export const ch15: Lesson = {
  id: "ch15-strategy",
  title: "13. Positional Strategy",
  summary:
    "When there's no tactic, strategy decides: where pieces belong, which files and squares matter, and how to turn small edges into wins.",
  activities: [
    {
      id: "ch15-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "Choosing moves with no tactic.",
      body:
        "Most positions are quiet — no check or capture is forcing your hand. Strategy is what guides those moves: knowing where pieces belong, which squares and files matter, and how to turn a small edge into a win.\n\nWe'll cover the concrete building blocks — outposts, open files and the 7th rank, the bishop pair, the isolated queen's pawn, and smart trading — then you'll choose plans on real positions.",
      points: [
        "Strategy decides the quiet, non-forcing moves.",
        "Outposts, open files, bishop pair, IQP, good trades.",
        "Always play with a plan.",
      ],
    },
    {
      id: "ch15-strategy-concept",
      type: "concept",
      title: "When there's no tactic, strategy decides",
      blurb: "Play for small, lasting edges.",
      body:
        "Most moves in a game aren't forced — there's no check or capture demanding attention. In those quiet moments, strategy decides the game: knowing where your pieces belong, which files and squares matter, and how to nurse a small edge until it becomes a win.\n\nThe diagram shows the most coveted square in chess: a knight outpost. The knight on d5 is guarded by the e4-pawn, and no black pawn can ever attack it — so it sits there dominating, untouchable. Outposts, rooks on open files and the 7th rank, the bishop pair in open positions, and structures like the isolated queen's pawn are the building blocks. Above all, have a plan: find the imbalances and ask, 'What's my worst piece, and how do I improve it?'",
      points: [
        "Outposts, open files, and the 7th rank are where pieces come alive.",
        "Trade with a reason: simplify when ahead, free a cramped position.",
        "A move without a plan is wasted — target a weakness or fix your worst piece.",
      ],
      diagrams: [
        {
          fen: "6k1/pp3ppp/8/3N4/4P3/8/PP3PPP/6K1 w - - 0 1",
          orientation: "white",
          caption: "A knight outpost: d5 is guarded by the e4-pawn and no black pawn can ever hit it. The knight dominates.",
        },
      ],
      check: {
        question: "What makes d5 an ideal outpost for the knight?",
        options: [
          "It's guarded by a pawn and no enemy pawn can attack it",
          "It's on the edge of the board with an open view",
          "It's close to White's own king for defense",
        ],
        correctIndex: 0,
        explanation:
          "An outpost is an advanced square defended by your pawn and safe from enemy pawns. A knight planted there can't be chased away and dominates the position.",
      },
    },
    {
      id: "outposts",
      type: "quiz",
      title: "Knight outposts",
      blurb: "A knight's dream home.",
      question:
        "What makes a square an ideal 'outpost' for a knight?",
      options: [
        "A safe square on your own half of the board, near your other pieces.",
        "An advanced square, guarded by your pawn, that no enemy pawn can attack.",
        "Any square on the rim, where the knight has a wide, open view.",
        "A square right next to your king, where it helps with the defense.",
      ],
      correctIndex: 1,
      explanation:
        "An outpost is an advanced square (often the 5th/6th rank) defended by one of your pawns and safe from enemy pawns. A knight planted there — especially on an open file's key square — can dominate the position.",
    },
    {
      id: "rooks-open-files",
      type: "quiz",
      title: "Rooks and open files",
      blurb: "Where rooks come alive.",
      question:
        "Rooks are strongest when placed on:",
      options: [
        "Closed files, tucked safely behind their own unbroken chain of pawns.",
        "Open or half-open files, and the 7th rank, hitting pawns and cutting off the king.",
        "The same file as their own king, guarding it patiently from a safe distance.",
        "The first rank only, sitting back to hold the back row against any invasion.",
      ],
      correctIndex: 1,
      explanation:
        "Rooks need open lines. Seize open files, then look to penetrate to the 7th rank ('pigs on the seventh'), where a rook devours pawns and traps the enemy king. Doubling rooks on a file multiplies the pressure.",
    },
    {
      id: "bishop-pair",
      type: "quiz",
      title: "The bishop pair",
      blurb: "Two bishops working together.",
      question:
        "Why is the 'bishop pair' often an advantage, especially in open positions?",
      options: [
        "Each bishop on its own is worth more than a queen once the board opens up fully.",
        "Together they cover both square colors from afar, dominating wide-open positions.",
        "They can force checkmate against a lone king faster than a single queen ever could.",
        "They always defend one another, so neither bishop can ever be won for free.",
      ],
      correctIndex: 1,
      explanation:
        "A single bishop only ever controls one color. The pair covers both, and on an open board their long reach outclasses knights. Holding the bishop pair is a real, lasting positional plus — open the position to maximize it.",
    },
    {
      id: "iqp",
      type: "quiz",
      title: "The isolated queen's pawn",
      blurb: "Strength and weakness at once.",
      question:
        "An isolated queen's pawn (IQP) is double-edged. What does each side want?",
      options: [
        "Both sides should ignore it and play on the wings as if it weren't there.",
        "The owner attacks using the space and outposts; the defender blockades and heads for an ending.",
        "Only the defender ever benefits — the isolated pawn is purely a liability.",
        "Whoever owns the isolated queen's pawn holds a decisive, essentially winning long-term advantage.",
      ],
      correctIndex: 1,
      explanation:
        "The IQP gives active pieces, open files, and outpost squares for the middlegame attack — but it's a fixed weakness in the endgame. So the owner plays for a quick initiative; the defender blockades the pawn, trades pieces, and heads for an ending.",
    },
    {
      id: "trading-principles",
      type: "quiz",
      title: "Good trades, bad trades",
      blurb: "Every exchange has a purpose.",
      question:
        "Which is a sound guideline for trading pieces?",
      options: [
        "Trade pieces off at random whenever you possibly can, just to keep the whole game simple.",
        "When ahead, trade pieces toward the endgame; when cramped, trade to free your position.",
        "Never trade anything, so you always keep your full army on the board.",
        "Always swap the queens off as fast as you possibly can, in every game.",
      ],
      correctIndex: 1,
      explanation:
        "Trade with a reason: simplify when ahead, relieve a cramped position, or swap off your worst piece for the opponent's best. Avoid trades that activate the opponent or give up your only active piece.",
    },
    {
      id: "make-a-plan",
      type: "quiz",
      title: "Always have a plan",
      blurb: "The thread that ties it together.",
      question:
        "When the position is quiet and there's no forcing move, what should guide your choice?",
      options: [
        "Just grab whichever piece is nearest your hand and make a quick move.",
        "Assess the position, then pick a plan: fix your worst piece or target a weakness.",
        "Always throw your pieces at the enemy king, no matter what the position asks for.",
        "Shuffle your pieces back and forth and wait for the opponent to commit first.",
      ],
      correctIndex: 1,
      explanation:
        "A move without a plan is a wasted move. Find the imbalances — weak pawns or squares, open files, your worst-placed piece — and play purposefully toward them. The classic prompt: 'What's my worst piece, and how do I make it better?'",
    },
    {
      id: "ch15-find-plan",
      type: "plan",
      title: "Apply it: seize the file, then convert",
      blurb: "Quiet position — pick the plan, then execute it.",
      fen: "2rq1rk1/pp2bppp/2n1pn2/8/2B5/2N1PN2/PP3PPP/2RQ1RK1 w - - 0 1",
      orientation: "white",
      planQuestion:
        "No tactic is available. The d-file is open and your pieces are ready. What is the most purposeful plan for White?",
      options: [
        "Contest and seize the open d-file, aiming to invade the back ranks with a rook.",
        "Shuffle the king back and forth and wait.",
        "Trade every piece as fast as possible, with no goal.",
      ],
      correctIndex: 0,
      explanation:
        "An open file is a highway. Double rooks (and the queen) on the d-file, fight for control, and invade — a rook that reaches the enemy's back rank can be decisive, as you'll now show.",
      convert: {
        kind: "puzzle",
        puzzle: {
          fen: "6k1/5ppp/8/8/8/8/6PP/R5K1 w - - 0 1",
          orientation: "white",
          goal: { type: "mate", inMoves: 1 },
          prompt: "Your rook owns the open file straight to the back rank. Finish in one.",
          successText:
            "Ra8# — controlling the open file delivered the rook to the back rank for mate. That's the payoff for seizing the file.",
          solution: ["a1a8"],
        },
      },
    },
    {
      id: "ch15-worst-piece",
      type: "sort",
      title: "Apply it: your worst piece",
      blurb: "Improve the weakest link.",
      prompt:
        "It's quiet. Using the prompt 'what's my worst piece?', which White piece most needs improving?",
      fen: "r1bq1rk1/ppp2ppp/2n2n2/3pp3/8/N1PP1NP1/PP2PPBP/R1BQ1RK1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "The knight on a3 — stuck on the rim, doing nothing" },
        { label: "The fianchettoed bishop on g2 — already excellent" },
        { label: "The knight on f3 — actively placed" },
      ],
      correctIndex: 0,
      explanation:
        "'A knight on the rim is dim.' The a3-knight is your worst piece — reroute it (a3–c2–e3–d5, or a3–c4) toward a strong central square. Improving your worst-placed piece is the most reliable plan when nothing forcing exists.",
    },
    {
      id: "ch15-recap",
      type: "concept",
      title: "Recap: play with a plan",
      blurb: "Small edges, chosen on purpose.",
      body:
        "When nothing is forcing, let the position choose your move: park knights on outposts, seize open files and the 7th rank with rooks, value the bishop pair in open play, handle the IQP correctly, and trade only with a reason. Tie it together with the simplest question in chess — 'What's my worst piece, and how do I improve it?'\n\nStrategy turns into skill only over the board. Go play, and on each quiet move name your plan before you touch a piece.",
      points: [
        "Pieces come alive on outposts, open files, and the 7th rank.",
        "Trade with a purpose; respect the bishop pair and the IQP.",
        "Every quiet move: what's the plan, what's my worst piece?",
      ],
      practice: { tool: "play", label: "Play a game now" },
    },
  ],
};
