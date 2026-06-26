// Spaced-review checkpoints for Chess Fundamentals (Phase 4 of the teaching
// overhaul). These interleave between lessons to force RETRIEVAL of earlier
// ideas after a gap — the part of learning that makes things stick. They add no
// new machinery: each checkpoint is an ordinary lesson of mixed quiz/sort items
// re-testing prior concepts from fresh angles. Any board positions reuse FENs
// already engine-verified legal elsewhere in the module.

import type { Lesson } from "../../types";

// ---- Checkpoint 1: after ch3 (Winning + Openings) ----
export const review1: Lesson = {
  id: "fund-review-1",
  title: "★ Checkpoint: Winning & Openings",
  summary:
    "A quick retrieval check on the first three lessons — how games end, and how to start one. No new ideas; just make sure they stuck.",
  activities: [
    {
      id: "fund-review-1-intro",
      type: "concept",
      title: "Quick checkpoint",
      blurb: "Recall beats reread.",
      body:
        "No new material here — this is a short check on the last three lessons. Trying to recall something is what actually cements it, far more than reading it again.\n\nAnswer from memory. If a question trips you up, that's a signal: pop back to that lesson for a two-minute refresher.",
      points: [
        "Retrieving knowledge is how it sticks.",
        "A miss just points you to the lesson worth revisiting.",
      ],
    },
    {
      id: "rv1-mate-vs-stale",
      type: "quiz",
      title: "Mate or stalemate?",
      blurb: "The difference is the check.",
      question:
        "Your opponent's king is in check and has no legal move. What's the result?",
      options: [
        "Checkmate — you win.",
        "Stalemate, which is only a draw.",
        "Just a check; the opponent simply moves again next turn.",
        "Nothing happens until you give a second check as well.",
      ],
      correctIndex: 0,
      explanation:
        "In check + no legal move = checkmate (you win). Compare stalemate: no legal move but NOT in check, which is a draw. The deciding factor is whether the king is currently under attack.",
    },
    {
      id: "rv1-opening-goal",
      type: "quiz",
      title: "The opening's goals",
      blurb: "Three priorities — and one trap.",
      question: "Which of these is NOT one of the three goals of a sound opening?",
      options: [
        "Rushing your queen out early to make threats.",
        "Fighting for control of the center.",
        "Developing your knights and bishops.",
        "Castling to get your king to safety.",
      ],
      correctIndex: 0,
      explanation:
        "Center, develop, castle. An early queen is the classic mistake: the opponent develops with tempo by chasing it, gaining moves for free.",
    },
    {
      id: "rv1-dev-check",
      type: "sort",
      title: "Apply it: good opening?",
      blurb: "Read the position.",
      prompt: "Has White followed the opening principles so far?",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
      orientation: "white",
      options: [
        { label: "Yes — center, pieces out, ready to castle" },
        { label: "No — White has ignored every opening principle here" },
        { label: "No — the queen has been brought out far too early" },
      ],
      correctIndex: 0,
      explanation:
        "Textbook: a pawn in the center on e4, the knight on f3 and bishop on c4 developed, and the king one move from castling. The queen has sensibly stayed home.",
    },
    {
      id: "rv1-black-mindset",
      type: "quiz",
      title: "Playing as Black",
      blurb: "A move behind — so what?",
      question: "You're Black, moving second. What's the soundest mindset?",
      options: [
        "Use the same principles; White's head start is small.",
        "Throw an immediate wing attack to try to catch up on tempo.",
        "Copy White's every move to keep the position symmetrical forever.",
        "Keep all your pieces at home until White fully commits first.",
      ],
      correctIndex: 0,
      explanation:
        "Black plays by the same rules. White's extra tempo is a nudge, not a winning edge — contest the center, develop, castle, and you're fine.",
    },
    {
      id: "fund-review-1-done",
      type: "concept",
      title: "Checkpoint cleared",
      blurb: "Foundations locked in.",
      body:
        "That's the groundwork: you know how a game is won and drawn, and how to start one with either color. Anything you missed is worth a quick look back before moving on.\n\nNext up: finishing won games with the basic checkmates.",
      points: [
        "Checkmate wins; stalemate only draws.",
        "Center, develop, castle — both colors.",
      ],
    },
  ],
};

// ---- Checkpoint 2: after ch6 (Mates, Pawn Endgames, Draws) ----
export const review2: Lesson = {
  id: "fund-review-2",
  title: "★ Checkpoint: Mates, Endgames & Draws",
  summary:
    "Retrieval check on the endgame run — what can force mate, how to escort a pawn, and every way a game is drawn.",
  activities: [
    {
      id: "fund-review-2-intro",
      type: "concept",
      title: "Quick checkpoint",
      blurb: "Endgame fundamentals.",
      body:
        "Another short recall check — this time on the endgame lessons: the basic mates, mating material, king-and-pawn technique, and draws. These ideas decide the end of nearly every game, so they're worth having cold.\n\nAnswer from memory; revisit any lesson a question exposes.",
      points: [
        "Endgame technique converts your advantages into wins.",
        "A miss is just a pointer back to the lesson.",
      ],
    },
    {
      id: "rv2-material",
      type: "quiz",
      title: "Enough to mate?",
      blurb: "Against a bare king.",
      question: "Against a lone king, which of these CANNOT force checkmate?",
      options: [
        "King and a single knight.",
        "King and queen.",
        "King and rook.",
        "King and two bishops.",
      ],
      correctIndex: 0,
      explanation:
        "A lone minor piece (knight or bishop) can't force mate — it's a draw. Queen, rook, and two bishops all can. Remember the oddity: two knights can't force it either.",
    },
    {
      id: "rv2-stalemate-trap",
      type: "quiz",
      title: "The winner's trap",
      blurb: "Up a queen, no check, no move.",
      question:
        "You're up a queen. The lone enemy king has no legal move and is NOT in check. What just happened?",
      options: [
        "Stalemate — you drew a won game.",
        "Checkmate — you won the game.",
        "You earn a free extra move on the spot.",
        "Nothing — the opponent simply plays on.",
      ],
      correctIndex: 0,
      explanation:
        "No legal move + not in check = stalemate, a draw. Always leave the lone king one escape square until the very move you deliver checkmate.",
    },
    {
      id: "rv2-opposition",
      type: "quiz",
      title: "The opposition",
      blurb: "The key to pawn endings.",
      question:
        "Two kings stand on the same file with one empty square between them. Who 'has the opposition'?",
      options: [
        "The side that does NOT have to move.",
        "The side to move, since it chooses first.",
        "Whoever currently has more pawns left.",
        "Whichever king is nearer to the center.",
      ],
      correctIndex: 0,
      explanation:
        "The side NOT on move holds the opposition; the king forced to move must give ground. Grabbing the opposition at the right moment is what wins king-and-pawn endings.",
    },
    {
      id: "rv2-draw-types",
      type: "quiz",
      title: "Name the draw",
      blurb: "Five ways to split the point.",
      question:
        "You're losing, but you can check the enemy king over and over and it can never escape. Best result?",
      options: [
        "A draw by perpetual check (it repeats the position).",
        "A win, because constant checks wear the opponent down.",
        "A loss — you should resign instead of checking.",
        "A draw by the fifty-move rule, regardless of captures.",
      ],
      correctIndex: 0,
      explanation:
        "Endless checks the king can't escape repeat the position — claim the draw by threefold repetition. Perpetual check is a losing side's best friend.",
    },
    {
      id: "fund-review-2-done",
      type: "concept",
      title: "Checkpoint cleared",
      blurb: "Endgames under control.",
      body:
        "You can now tell a winning endgame from a drawn one, escort a pawn home, and reach for a draw when you're in trouble. That's more endgame knowledge than most casual players ever pick up.\n\nNext: the tactics that win material in the first place.",
      points: [
        "Keep mating material; don't stalemate a won game.",
        "Lead with the king; take the opposition.",
      ],
    },
  ],
};

// ---- Checkpoint 3: after ch8 (Tactics + Strategy), before defense ----
export const review3: Lesson = {
  id: "fund-review-3",
  title: "★ Checkpoint: Tactics & Strategy",
  summary:
    "Retrieval check on winning material and choosing a plan — name the tactics and pick the right strategic idea.",
  activities: [
    {
      id: "fund-review-3-intro",
      type: "concept",
      title: "Quick checkpoint",
      blurb: "Tactics and plans.",
      body:
        "Last checkpoint: the tactics that win material and the strategy that guides quiet moves. Spotting these fast is pure pattern recognition, and recall practice builds it.\n\nName each idea from memory, then we'll finish the module with defense.",
      points: [
        "Tactics win material; strategy guides the quiet moves.",
        "Fast recognition comes from retrieval reps.",
      ],
    },
    {
      id: "rv3-safe-move",
      type: "quiz",
      title: "Before you move",
      blurb: "The blunder-stopping habit.",
      question:
        "What should you check before committing to almost any move?",
      options: [
        "What your opponent threatens, and whether your move leaves anything hanging.",
        "Whether you have castled on the same side as your opponent did.",
        "Whether it is currently an even-numbered or odd-numbered move.",
        "How many total pawns remain on the board for both players.",
      ],
      correctIndex: 0,
      explanation:
        "Run the safe-move habit: what does my opponent want, what's hanging (theirs or mine), and is my move safe? That three-question scan prevents most beginner blunders.",
    },
    {
      id: "rv3-fork",
      type: "quiz",
      title: "Name that tactic (1)",
      blurb: "Two targets at once.",
      question: "A single piece attacks two enemy pieces at the same time. This is a:",
      options: ["Fork.", "Skewer.", "Stalemate.", "Fianchetto."],
      correctIndex: 0,
      explanation:
        "That's a fork — only one of the two targets can escape, so you win the other. The knight is the classic forker, and a fork WITH check is strongest.",
    },
    {
      id: "rv3-skewer",
      type: "quiz",
      title: "Name that tactic (2)",
      blurb: "Hit the front, win the back.",
      question:
        "You check a piece on a line; it must step aside, and you capture the piece that was lined up behind it. This is a:",
      options: ["Skewer.", "Fork.", "Stalemate.", "Castling."],
      correctIndex: 0,
      explanation:
        "That's a skewer — like a fork along a straight line. A check is the perfect skewer, because the king is forced to move out of the way.",
    },
    {
      id: "rv3-hanging",
      type: "sort",
      title: "Apply it: free material?",
      blurb: "Check before you move.",
      prompt: "Black's queen sits on d5. Can White win it?",
      fen: "r4rk1/ppp2ppp/8/3q4/8/2b2N2/PPP2PPP/R2Q1RK1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Yes — the queen is hanging; Qxd5 takes it free" },
        { label: "No — capturing the queen would lose White's own queen back" },
        { label: "No — the black queen is defended and totally safe" },
      ],
      correctIndex: 0,
      explanation:
        "The queen on d5 is undefended, and White's queen on d1 attacks straight up the file: Qxd5 wins it for nothing. Half of all tactics are simply spotting a hanging piece.",
    },
    {
      id: "rv3-strategy",
      type: "quiz",
      title: "Match the piece",
      blurb: "Open or closed?",
      question:
        "In a wide-open position with long, clear diagonals, which minor piece is usually stronger?",
      options: [
        "The bishop.",
        "The knight.",
        "They are always exactly equal.",
        "Neither matters once rooks are on.",
      ],
      correctIndex: 0,
      explanation:
        "Open positions favor bishops, which rake long diagonals. Closed positions (locked pawn chains) favor knights, which hop over the blockage. Match your pieces to the structure.",
    },
    {
      id: "fund-review-3-done",
      type: "concept",
      title: "Checkpoint cleared",
      blurb: "Almost there.",
      body:
        "You can name the workhorse tactics and read what a quiet position calls for. Keep sharpening tactics with reps — pattern recognition is the single biggest source of rating points for improving players.\n\nOne lesson left: how to defend when it's YOUR king under fire.",
      points: [
        "Hanging piece, fork, skewer — scan for them every move.",
        "Open → bishops, closed → knights.",
      ],
      practice: { tool: "tactics", maxDifficulty: 1, label: "Train tactics now" },
    },
  ],
};
