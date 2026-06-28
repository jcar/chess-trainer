// Chapter 13 — Intermediate endgames: the ideas that decide close games.
// Original prose; the K+P replay reaches promotion by a legal, instructive line.

import type { Lesson } from "../../types";

export const ch13: Lesson = {
  id: "ch13-endgames",
  title: "11. Endgames That Decide Games",
  summary:
    "King-and-pawn technique and rook-endgame principles win and save more games than any opening. Master the opposition, the square, and where the rook belongs.",
  activities: [
    {
      id: "ch13-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "The endings that decide games.",
      body:
        "Endgames quietly decide more games than any opening, and a handful of precise ideas cover most of what you'll face. Learn them and you'll convert won positions and save lost ones with confidence.\n\nWe'll lock in king-and-pawn technique (the opposition and the square of the pawn), then the rook-endgame rules every improver needs: rooks behind passers, and the Lucena and Philidor positions. You'll convert a king-and-pawn ending yourself, then drill the rest.",
      points: [
        "King-and-pawn: lead with the king, use the opposition.",
        "Rooks belong BEHIND passed pawns.",
        "Know Lucena (the win) and Philidor (the draw).",
      ],
    },
    {
      id: "ch13-endgames-concept",
      type: "concept",
      title: "Endgame technique wins games",
      blurb: "The few ideas that decide close games.",
      body:
        "Endgames quietly decide more games than any opening. The good news is that a handful of precise ideas cover most of what you'll face, and once you know them you can convert won positions and save lost ones with confidence.\n\nThe foundation is king-and-pawn play. In the diagram, White's king leads in FRONT of its pawn, facing the black king with one square between — that's the opposition, the tool that pushes the enemy king aside and clears the pawn's path. Add the square of the pawn (a glance tells you whether a king catches a runner) and the rook-endgame rules, and most endings become routine.",
      points: [
        "King first: in K+P endings, lead with the king and use the opposition.",
        "Rooks go BEHIND passed pawns — yours to push them, the enemy's to restrain.",
        "Know Lucena (the win) and Philidor (the draw) cold.",
      ],
      diagrams: [
        {
          fen: "3k4/8/3K4/3P4/8/8/8/8 w - - 0 1",
          orientation: "white",
          caption: "King in front of its pawn, kings in opposition — the winning king-and-pawn setup.",
        },
      ],
      check: {
        question: "In a king-and-pawn endgame, your most important first principle is:",
        options: [
          "Lead with the KING (get it in front of the pawn), not the pawn",
          "Push the pawn as fast as possible and keep the king back",
          "Trade the pawn off to reach a drawn king-versus-king ending",
        ],
        correctIndex: 0,
        explanation:
          "Lead with the king. A pawn that races ahead of its king gets blockaded; the king must go first to clear the path and seize the opposition.",
      },
    },
    {
      id: "opposition-concept",
      type: "quiz",
      title: "The opposition",
      blurb: "Kings facing off.",
      question:
        "In a king-and-pawn endgame, having 'the opposition' means:",
      options: [
        "Your king controls more squares and so outvalues the enemy king in a race.",
        "The kings stand one square apart and it is the OPPONENT to move, forcing them aside.",
        "You hold an extra pawn that the enemy king is too far away to capture.",
        "Your king has reached the far side of the board ahead of its pawn.",
      ],
      correctIndex: 1,
      explanation:
        "Opposition is a mutual-zugzwang idea: kings a square apart, opponent to move. Whoever must move first has to step aside, letting the other king advance. Winning K+P endgames is often a fight to seize the opposition.",
    },
    {
      id: "kp-win-replay",
      type: "replay",
      title: "Winning with king and pawn",
      blurb: "The king leads, the pawn follows.",
      orientation: "white",
      eval: true,
      startFen: "3k4/8/3K4/3P4/8/8/8/8 w - - 0 1",
      intro:
        "The golden rule: get your KING in front of the pawn, and use the opposition to escort it home. Watch White convert — and watch the eval bar leap to a decisive lead the moment the pawn queens.",
      steps: [
        { san: "Ke6", keyIdea: "King first, not the pawn", note: "King first! Sidestep to seize squares — don't push the pawn yet." },
        { san: "Ke8", note: "Black takes the opposition, trying to block the king's advance." },
        { san: "d6", note: "Now the pawn advances with the king supporting it." },
        { san: "Kd8", note: "Black is forced back in front of the pawn." },
        { san: "d7", note: "The pawn marches; the black king must give way." },
        { san: "Kc7", note: "Forced off the queening square." },
        { san: "Ke7", note: "The king shepherds the pawn home — promotion is unstoppable." },
        { san: "Kc6", note: "Too late for Black." },
        { san: "d8=Q", note: "A new queen. The technique: king in front, seize the opposition, then push." },
      ],
    },
    {
      id: "square-of-pawn",
      type: "quiz",
      title: "The square of the pawn",
      blurb: "Can the king catch it?",
      question:
        "The 'square of the pawn' rule lets you tell at a glance whether:",
      options: [
        "Whether a given pawn currently sits on a light square or a dark square.",
        "Whether a lone king can catch an enemy passed pawn before it promotes, at a glance.",
        "Whether two of your pawns are connected and can defend each other.",
        "Whether your bishop is able to reach a particular target square in time.",
      ],
      correctIndex: 1,
      explanation:
        "Imagine a square with the pawn's path as one side. If the defending king is inside that square (or can step into it on its move), it catches the pawn. A quick visual shortcut that saves you counting tempi.",
    },
    {
      id: "ch13-rook-passer-concept",
      type: "concept",
      title: "Rooks behind passed pawns",
      blurb: "Tarrasch's rule, on the board.",
      body:
        "The most useful rule in rook endings: put your rook BEHIND a passed pawn. Behind your own passer, the rook supports its march and gains scope with every step the pawn takes. Behind the enemy's passer, it ties the defender down. A rook stuck in FRONT of a pawn is passive — it has to move out of the way the moment the pawn advances.\n\nIn the diagram, White's rook sits behind its own a-pawn, ready to escort it home, while Black's rook is reduced to a passive blockade in front on a8.",
      diagrams: [
        {
          fen: "r5k1/8/8/P7/8/8/6K1/R7 w - - 0 1",
          orientation: "white",
          caption: "White's rook is behind its passed a-pawn (active); Black's rook is stuck in front on a8 (passive).",
        },
      ],
      check: {
        question: "Where does a rook belong relative to a passed pawn?",
        options: [
          "Behind it — your own to push it, the enemy's to restrain it",
          "In front of it, blocking the square it wants to reach",
          "Far away on the other wing, out of the action",
        ],
        correctIndex: 0,
        explanation:
          "Tarrasch's rule: rooks belong behind passed pawns. Behind gives the rook growing scope and activity; in front is passive.",
      },
    },
    {
      id: "rook-behind-passer",
      type: "quiz",
      title: "Rooks and passed pawns",
      blurb: "A famous rule of thumb.",
      question:
        "Where do you generally want to put your rook relative to a passed pawn?",
      options: [
        "Directly in front of it, parked on the square to physically block its advance.",
        "Behind the passed pawn — yours, to push it, or the enemy's, to restrain it.",
        "As far away from the pawn as possible, holding squares on the other wing.",
        "Right beside your own king, where the two can defend each other.",
      ],
      correctIndex: 1,
      explanation:
        "Tarrasch's rule: rooks belong BEHIND passed pawns. Behind your own passer, the rook supports its advance with growing scope; behind the enemy's, it ties the defender down. A rook in front of a pawn is passive.",
    },
    {
      id: "lucena-philidor",
      type: "quiz",
      title: "Lucena vs. Philidor",
      blurb: "The two endgames you must know.",
      question:
        "In rook endgames, the Lucena and Philidor positions are famous because they show:",
      options: [
        "The standard textbook method for delivering a checkmate using two rooks on open ranks and files.",
        "The key winning method (Lucena, 'building a bridge') and drawing method (Philidor) with R+P.",
        "The soundest way to develop the rooks and connect them in the opening.",
        "The reasons rooks tend to be weak, passive pieces in most endgames.",
      ],
      correctIndex: 1,
      explanation:
        "Rook endings are the most common of all. Lucena shows how the stronger side wins (build a bridge to shelter the king from checks); Philidor shows how the weaker side draws (keep the rook on the third rank until the pawn advances, then check from behind). Know both cold.",
    },
    {
      id: "ch13-kp-drill",
      type: "drill",
      title: "Drill: convert the king and pawn",
      blurb: "Now play the technique yourself.",
      fen: "3k4/8/3K4/3P4/8/8/8/8 w - - 0 1",
      orientation: "white",
      objective: "promote",
      engineSkill: 10,
      instructions:
        "Your turn to convert the ending you just watched. Lead with the KING, seize the opposition to push the black king aside, then escort the pawn to promotion.",
      successText:
        "Promoted! That's the opposition under your own hands — the technique behind every king-and-pawn ending. Now the rook ending it leads to…",
    },
    {
      id: "ch13-lucena-drill",
      type: "drill",
      title: "Drill: win the Lucena (rook and pawn)",
      blurb: "Escort the pawn past the checks.",
      fen: "2K5/2P2k2/8/8/8/8/5r2/2R5 w - - 0 1",
      orientation: "white",
      objective: "promote",
      engineSkill: 10,
      instructions:
        "Rook and pawn versus rook — the Lucena win. Your pawn is one step from queening, but your own king blocks the square and Black checks from the side. March your king out toward your rook; when the checks come, block one with your rook (the 'bridge'), and shepherd the pawn home. Promote to win.",
      successText:
        "Promoted! That's the Lucena: the king steps out, the rook shields it from the checks, and the pawn queens. Rook-and-pawn endings are the most common of all — this is the one to know cold.",
    },
    {
      id: "ch13-practice",
      type: "concept",
      title: "Now drill it",
      blurb: "Convert real endings against the engine.",
      body:
        "These ideas — the opposition, the square of the pawn, the rook behind the passer, Lucena and Philidor — only win games once they're automatic. The Endgame Trainer drills the must-know positions (including the Lucena) against an engine that defends, so you can practice the technique until it's second nature.",
      practice: { tool: "endgames", label: "Open the Endgame Trainer" },
    },
  ],
};
