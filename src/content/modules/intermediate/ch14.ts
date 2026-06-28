// Chapter 14 — Intermediate tactics. Puzzle positions are engine-verified
// (sound + unique). Original prose throughout.

import type { Lesson } from "../../types";

export const ch14: Lesson = {
  id: "ch14-tactics",
  title: "12. Sharper Tactics",
  summary:
    "Calculate forcing moves first, then learn the recurring weapons: the discovered attack, removing the defender, deflection — and the prettiest mate of all.",
  activities: [
    {
      id: "ch14-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "Find tactics on purpose.",
      body:
        "Strong players don't stumble onto tactics — they hunt them in a fixed order, then recognize the recurring patterns. Both halves are trainable, and they'll win you games outright.\n\nWe'll start with the search method (scan the forcing moves first), then add the sharper weapons: the discovered attack, removing the defender, and deflection — plus the prettiest mate of all.",
      points: [
        "Search forcing moves first: checks, captures, threats.",
        "Then the weapons: discovered attack, remove the defender, deflection.",
        "Spot the patterns, solve on the board.",
      ],
    },
    {
      id: "ch14-tactics-concept",
      type: "concept",
      title: "How to find tactics",
      blurb: "Forcing moves, then patterns.",
      body:
        "Tactics rarely appear out of nowhere — you find them by looking in the right place. Scan the forcing moves first: every check, every capture, and every direct threat. Because they limit the opponent's replies, they're both the easiest to calculate and the most likely to hide a combination.\n\nOnce you're hunting in the right spots, it's the recurring weapons that do the damage: the discovered attack (move one piece to unleash another), removing the defender (knock out the piece holding everything together), and deflection (force an overloaded piece off one of its two jobs). Learn the patterns and you'll spot them at a glance.",
      points: [
        "Always calculate checks, captures, and threats first.",
        "Discovered attacks fire two threats from a single move.",
        "Remove or deflect the defender, then collect what it was guarding.",
      ],
      check: {
        question: "When hunting for a tactic, which moves do you calculate FIRST?",
        options: [
          "Forcing moves — checks, captures, and threats",
          "Quiet pawn moves that slowly improve your structure",
          "Whichever move happens to look prettiest",
        ],
        correctIndex: 0,
        explanation:
          "Checks, captures, and threats limit the opponent's replies, so they're easiest to calculate and most likely to hide a combination. Scanning them first is the habit that finds most tactics.",
      },
    },
    {
      id: "forcing-moves",
      type: "quiz",
      title: "Calculate forcing moves first",
      blurb: "Where to point your attention.",
      question:
        "When looking for a tactic, which moves should you calculate FIRST?",
      options: [
        "Quiet little pawn moves out on the wing that very slowly improve your pawn structure.",
        "Forcing moves: checks, captures, and threats that limit the opponent's replies.",
        "Only queen moves, since the queen is your most powerful attacker.",
        "Whichever move happens to look the prettiest on the board.",
      ],
      correctIndex: 1,
      explanation:
        "Checks, captures, and threats force the opponent's hand, so they're easiest to calculate and most likely to be tactics. Scan every check and capture before anything else — that habit alone finds most combinations.",
    },
    {
      id: "smothered-mate",
      type: "puzzle",
      title: "Smothered mate",
      blurb: "The king, trapped by its own army.",
      fen: "6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1",
      orientation: "white",
      goal: { type: "mate", inMoves: 1 },
      prompt:
        "White to play and checkmate in one. The black king is hemmed in by its own rook and pawns.",
      hints: [
        "The king on h8 can't move — every square around it is blocked by its own pieces.",
        "Only a knight can reach past those defenders to give check.",
      ],
      successText:
        "Checkmate! Nf7# is the 'smothered mate' — the king is suffocated by its own rook and pawns, and only the knight can deliver the blow. A pattern worth memorizing for life.",
      solution: ["g5f7"],
    },
    {
      id: "knight-fork-tactic",
      type: "puzzle",
      title: "Fork into the position",
      blurb: "A capture that forks two pieces.",
      fen: "r3k2r/ppp2ppp/4N3/3q4/8/8/PPP2PPP/R3K2R w - - 0 1",
      orientation: "white",
      goal: { type: "win-material", minGain: 3 },
      prompt:
        "White to play. Your knight can leap in with check and hit the queen at the same time — find it.",
      hints: [
        "Look for a knight move to c7 — it would check the king on e8.",
        "From c7, the knight also attacks the queen on d5.",
      ],
      successText:
        "Won the queen! Nxc7+ forks the king and the queen on d5. After the king moves, Nxd5 collects the queen. The knight is the ultimate forking piece — always check what it hits.",
      solution: ["e6c7", "e8f8", "c7d5"],
    },
    {
      id: "ch14-discovered-concept",
      type: "concept",
      title: "The discovered attack",
      blurb: "Move one piece, unleash another.",
      body:
        "A discovered attack is two threats from a single move. One of your pieces is blocking the line of another; when the front piece moves away, the piece behind it suddenly attacks down the open line. The killer detail: the piece that MOVES can make its own threat at the same time, so the opponent can't deal with both.\n\nIn the diagram, the bishop on b2 aims down the long diagonal at Black's queen on g7, but the knight on e5 blocks it. Move that knight with a threat of its own, and the bishop's attack on the queen is 'discovered' — Black can't save the queen and answer the knight too. A discovered CHECK is the deadliest version of all.",
      diagrams: [
        {
          fen: "6k1/5pqp/8/4N3/8/8/1B4P1/6K1 w - - 0 1",
          orientation: "white",
          arrows: [{ from: "b2", to: "g7" }],
          caption: "The bishop already aims at the queen — the knight is in the way. Move the knight with a threat and the attack is discovered.",
        },
      ],
      check: {
        question: "What makes a discovered attack so hard to meet?",
        options: [
          "The moving piece can make its OWN threat, so two things are attacked at once",
          "It is always a checkmate that ends the game immediately",
          "It can only ever be played with the queen",
        ],
        correctIndex: 0,
        explanation:
          "Moving the front piece unleashes the one behind AND can create a second threat (even a check). The opponent can rarely answer both — that's the power of the discovery.",
      },
    },
    {
      id: "discovered-attack",
      type: "quiz",
      title: "Discovered attack",
      blurb: "Two threats from one move.",
      question:
        "A 'discovered attack' works by:",
      options: [
        "Moving a piece so the one behind it is unleashed on a target, often threatening too.",
        "Hiding your queen behind a pawn so the opponent cannot see where it is really aiming.",
        "Throwing every one of your pieces at the enemy king in a single coordinated assault.",
        "Castling on the queenside to swing the rook into the attack with an element of surprise.",
      ],
      correctIndex: 0,
      explanation:
        "You move a front piece and 'discover' the attack of the piece behind it. Because the moving piece can ALSO create a threat (even a check), the opponent often can't deal with both. A discovered CHECK is especially deadly — the moving piece can grab material with impunity.",
    },
    {
      id: "discovered-tactic",
      type: "puzzle",
      title: "Try it: the discovered attack",
      blurb: "Unleash the bishop with check.",
      fen: "7k/q4p1p/8/4N3/8/8/1B3PPP/6K1 w - - 0 1",
      orientation: "white",
      goal: { type: "win-material", minGain: 5 },
      prompt:
        "White to play. The knight on e5 masks the bishop on b2, which is trained on the cornered king. Spring the discovery and win the queen.",
      hints: [
        "Move the knight WITH check — leaving e5 uncovers the bishop's check on h8.",
        "Land the knight on a square that also attacks the queen on a7.",
      ],
      successText:
        "Won the queen! Nc6+ is a discovered check: the knight leaps off the diagonal so the bishop checks the king, and from c6 it also attacks the queen. Black must answer the check — then Nxa7 collects the queen. One move, two threats.",
      solution: ["e5c6", "h8g8", "c6a7"],
    },
    {
      id: "ch14-remove-defender-demo",
      type: "replay",
      title: "See it: removing the defender",
      blurb: "Knock out the guard, take the prize.",
      startFen: "4k3/pp3ppp/2n5/1B2b3/8/5N2/5PPP/6K1 w - - 0 1",
      orientation: "white",
      eval: true,
      intro:
        "Black's bishop on e5 is attacked by the knight, but it's defended by the knight on c6. So deal with the defender first. Watch the eval bar swing once the guard is gone and the bishop falls.",
      steps: [
        { san: "Bxc6+", keyIdea: "Remove the guard (with check)", note: "Remove the guard: the bishop captures the only defender of e5 — with check, so Black has no time for anything else." },
        { san: "bxc6", note: "Black recaptures. The bishop on e5 has lost its protector." },
        { san: "Nxe5", note: "Now the knight takes the bishop for free. Removing the defender: eliminate the guard, then collect what it was guarding." },
      ],
    },
    {
      id: "removing-the-defender",
      type: "quiz",
      title: "Removing the defender",
      blurb: "Knock out the guard.",
      question:
        "Your opponent's knight is the only thing defending a key mating square. The tactical idea is to:",
      options: [
        "Ignore the defending knight entirely and play on a completely different part of the board.",
        "Eliminate or chase away that defender so the now-undefended square or piece falls.",
        "Offer a draw, since a defended mating square cannot be exploited.",
        "Trade the queens off at once to simplify into a safer endgame.",
      ],
      correctIndex: 1,
      explanation:
        "'Removing the defender' (or 'removing the guard') means taking out the piece holding everything together. Capture it, deflect it, or attack it so it must move — then collect what it was defending.",
    },
    {
      id: "removing-defender-tactic",
      type: "puzzle",
      title: "Try it: removing the defender",
      blurb: "Knock out the guard, take the prize.",
      fen: "6k1/1R1bBpb1/2nP1n2/8/8/2p5/2B3PP/6K1 w - - 4 31",
      orientation: "white",
      goal: { type: "win-material", minGain: 2 },
      prompt:
        "White to play. The black bishop on d7 is defended by just one piece — the knight on f6. Take out the guard, then collect the bishop.",
      hints: [
        "Which single piece is defending the d7-bishop?",
        "Capture that defender first — the recapture won't save d7.",
      ],
      successText:
        "Won the bishop! Bxf6 removes the only guard of d7; after the recapture, Rxd7 takes the piece it was protecting. Removing the defender: eliminate the guard, then collect what it held together.",
      solution: ["e7f6", "g7f6", "b7d7"],
    },
    {
      id: "deflection",
      type: "quiz",
      title: "Deflection & overloading",
      blurb: "Too many jobs for one piece.",
      question:
        "A piece is 'overloaded' when it has two defensive duties at once. You exploit this by:",
      options: [
        "Piling on a third defensive job until the piece can no longer cope.",
        "Deflecting it — forcing it to handle one duty so it abandons the other.",
        "Trading it off for a mere pawn to remove it from the board.",
        "Leaving it alone and looking for a tactic somewhere else instead.",
      ],
      correctIndex: 1,
      explanation:
        "An overloaded piece can't be in two places at once. Deflection forces it away from one of its duties (often with a check or a capture it must answer), and you cash in on the square or piece it was forced to abandon — a classic back-rank theme.",
    },
    {
      id: "deflection-tactic",
      type: "puzzle",
      title: "Try it: deflection",
      blurb: "Pull the guard off its job.",
      fen: "4r2k/7p/6p1/1q6/8/2bQ1B2/P4R2/3R1K2 b - - 7 33",
      orientation: "black",
      goal: { type: "win-material", minGain: 2 },
      prompt:
        "Black to play. White's queen on d3 is defended only by the rook on d1. Force that rook off its job, then win the queen.",
      hints: [
        "A check on the back rank forces the d1-rook to deal with it.",
        "Once the rook leaves d1, the queen on d3 has no defender.",
      ],
      successText:
        "Won the queen! ...Re1+ deflects the d1-rook from guarding d3 — after Rxe1, ...Qxd3 collects the undefended queen. Deflection: force the defender to abandon its post, then strike where it was guarding.",
      solution: ["e8e1", "d1e1", "b5d3"],
    },
    {
      id: "ch14-practice",
      type: "concept",
      title: "Now train the pattern",
      blurb: "Reps turn motifs into instinct.",
      body:
        "Knowing the motifs isn't enough — you have to spot them in a split second over the board. That's pure pattern repetition. Train a stream of fresh tactics, with the ones you miss resurfacing until they stick.",
      practice: { tool: "tactics", maxDifficulty: 2, label: "Train tactics now" },
    },
  ],
};
