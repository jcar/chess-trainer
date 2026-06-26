// Spaced-review checkpoints for the Intermediate module, mirroring the
// Fundamentals checkpoints: interleaved retrieval of earlier ideas, from fresh
// angles, with no new machinery. Any board positions reuse FENs already used
// (and verified legal) elsewhere in the module.

import type { Lesson } from "../../types";

// ---- Checkpoint A: after ch13 (Openings, Gambits, Endgames) ----
export const intReview1: Lesson = {
  id: "int-review-1",
  title: "★ Checkpoint: Openings, Gambits & Endgames",
  summary:
    "A quick retrieval check on the first half of the module — how to study openings, what a gambit buys, and the endgame rules that decide games.",
  activities: [
    {
      id: "int-review-1-intro",
      type: "concept",
      title: "Quick checkpoint",
      blurb: "Recall locks it in.",
      body:
        "No new material — a short check on the openings, gambits, and endgame lessons. Pulling these back from memory is what makes them stick, far more than rereading.\n\nAnswer from memory; if one trips you up, that lesson is worth a quick revisit.",
      points: [
        "Retrieval is how knowledge sticks.",
        "A miss just points you back to the right lesson.",
      ],
    },
    {
      id: "iv1-openings",
      type: "quiz",
      title: "Studying openings",
      blurb: "Understand vs. memorize.",
      question: "As an improving player, the best way to study an opening is to:",
      options: [
        "Understand its structures, piece placements, and middlegame plans.",
        "Memorize the first twenty moves of every main line, in exact order.",
        "Learn only the tricks that win material in the first few moves.",
        "Skip study entirely and improvise everything from move one.",
      ],
      correctIndex: 0,
      explanation:
        "Understanding beats memorizing. Know why the moves are played and you'll find good moves even when your opponent leaves theory or transposes.",
    },
    {
      id: "iv1-gambit",
      type: "quiz",
      title: "What a gambit buys",
      blurb: "A pawn for what?",
      question: "When you play a sound gambit, you're trading a pawn for:",
      options: [
        "Development, open lines, and the initiative.",
        "A forced checkmate a few moves later.",
        "A guaranteed extra queen down the line.",
        "Nothing real — it's a disguised blunder.",
      ],
      correctIndex: 0,
      explanation:
        "A gambit buys time and activity. If you can't show concrete pressure for the pawn, though, it's simply a lost pawn — and as the defender, give the pawn back to kill the initiative.",
    },
    {
      id: "iv1-endgame-sort",
      type: "sort",
      title: "Apply it: is this won?",
      blurb: "King-and-pawn judgment.",
      prompt:
        "White's king stands in front of its pawn, facing the black king. With correct technique, what's the result?",
      fen: "3k4/8/3K4/3P4/8/8/8/8 w - - 0 1",
      orientation: "white",
      options: [
        { label: "A win — the king leads and seizes the opposition" },
        { label: "A draw — a single pawn can never promote" },
        { label: "Lost for White — the black king is too close" },
      ],
      correctIndex: 0,
      explanation:
        "King in front of the pawn is the winning setup: lead with the king, take the opposition to push the black king aside, then escort the pawn home.",
    },
    {
      id: "iv1-rook",
      type: "quiz",
      title: "Rooks and passers",
      blurb: "Tarrasch's rule.",
      question: "A rook generally belongs WHERE relative to a passed pawn?",
      options: [
        "Behind it — to push your own, or restrain the enemy's.",
        "Directly in front of it, blocking its path.",
        "Far away, holding the opposite wing.",
        "Beside the king, defending the back rank.",
      ],
      correctIndex: 0,
      explanation:
        "Rooks belong behind passed pawns. Behind your own passer the rook gains scope as the pawn advances; behind the enemy's it ties the defender down. In front, it's passive.",
    },
    {
      id: "int-review-1-done",
      type: "concept",
      title: "Checkpoint cleared",
      blurb: "First half locked in.",
      body:
        "You've got the openings mindset, the point of a gambit, and the core endgame rules. Anything that slipped is worth a two-minute look back.\n\nNext: sharper tactics and the strategy behind strong moves.",
      points: [
        "Openings: understand plans, don't memorize.",
        "Endgames: king first, rook behind the passer.",
      ],
    },
  ],
};

// ---- Checkpoint B: end of module (Tactics, Strategy, Structures) ----
export const intReview2: Lesson = {
  id: "int-review-2",
  title: "★ Checkpoint: Tactics, Strategy & Structures",
  summary:
    "A final retrieval check — how to hunt tactics, the strategic building blocks, and reading the pawn structure.",
  activities: [
    {
      id: "int-review-2-intro",
      type: "concept",
      title: "Quick checkpoint",
      blurb: "The middlegame toolkit.",
      body:
        "Last checkpoint: finding tactics, the positional building blocks, and the pawn structure. These are the skills you'll lean on in every middlegame, so it's worth having them on instant recall.\n\nAnswer from memory, then you've completed the Intermediate path.",
      points: [
        "Tactics + strategy + structure = your middlegame toolkit.",
        "A miss is just a pointer back to the lesson.",
      ],
    },
    {
      id: "iv2-forcing",
      type: "quiz",
      title: "Finding tactics",
      blurb: "Look here first.",
      question: "To find a tactic, which moves should you calculate FIRST?",
      options: [
        "Forcing moves — checks, captures, and threats.",
        "Quiet pawn moves that slowly improve your structure.",
        "Only queen moves, since the queen is strongest.",
        "Whichever move simply looks the prettiest.",
      ],
      correctIndex: 0,
      explanation:
        "Forcing moves limit the opponent's replies, so they're easiest to calculate and most likely to hide a combination. Scanning checks and captures first finds most tactics.",
    },
    {
      id: "iv2-discovered",
      type: "quiz",
      title: "Name that weapon",
      blurb: "Two threats, one move.",
      question:
        "You move one piece to unleash the attack of another piece lined up behind it. This is a:",
      options: [
        "Discovered attack.",
        "Stalemate.",
        "Fianchetto.",
        "Zugzwang.",
      ],
      correctIndex: 0,
      explanation:
        "That's a discovered attack — and when the moving piece also makes a threat (especially a check), the opponent can't answer both. A discovered check is the deadliest version.",
    },
    {
      id: "iv2-strategy-sort",
      type: "sort",
      title: "Apply it: name the asset",
      blurb: "What stands out?",
      prompt:
        "It's a quiet position with no tactic. What is White's main strategic asset to play around?",
      fen: "2rq1rk1/pp2bppp/2n1pn2/8/2B5/2N1PN2/PP3PPP/2RQ1RK1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "The open d-file — contest it and aim for the 7th rank" },
        { label: "A passed pawn that is about to promote" },
        { label: "A decisive lead in material" },
      ],
      correctIndex: 0,
      explanation:
        "The d-file is open and both sides are otherwise balanced — so the plan writes itself: pile rooks (and the queen) on the d-file, fight for it, and invade the 7th rank.",
    },
    {
      id: "iv2-pawn",
      type: "quiz",
      title: "Reading the structure",
      blurb: "The isolated pawn.",
      question: "An isolated pawn is best described as:",
      options: [
        "Active pieces and open lines now, but a fixed target for the endgame.",
        "A permanent winning edge for whoever owns it.",
        "Completely irrelevant to how the game should be played.",
        "An automatic loss the moment it appears on the board.",
      ],
      correctIndex: 0,
      explanation:
        "The isolated pawn cuts both ways: its owner gets activity and open files for a middlegame attack, while the defender blockades it and steers for an endgame where it's just weak.",
    },
    {
      id: "int-review-2-done",
      type: "concept",
      title: "Checkpoint cleared — module complete",
      blurb: "You've come a long way.",
      body:
        "You can hunt tactics by forcing moves, wield the positional building blocks, and read a pawn structure to find your plan. That's a genuinely strong intermediate toolkit.\n\nKeep it sharp by playing and by training tactics — the patterns you drill are the ones you'll spot over the board.",
      points: [
        "Tactics: forcing moves first, then the patterns.",
        "Strategy: outposts, open files, the right plan.",
        "Structure: read the pawns, play where they point.",
      ],
      practice: { tool: "tactics", maxDifficulty: 2, label: "Train tactics now" },
    },
  ],
};
