// Chapter 13 — Intermediate endgames: the ideas that decide close games.
// Original prose; the K+P replay reaches promotion by a legal, instructive line.

import type { Lesson } from "../../types";

export const ch13: Lesson = {
  id: "ch13-endgames",
  title: "13. Endgames That Decide Games",
  summary:
    "King-and-pawn technique and rook-endgame principles win and save more games than any opening. Master the opposition, the square, and where the rook belongs.",
  activities: [
    {
      id: "ch13-endgames-concept",
      type: "concept",
      title: "Endgame technique wins games",
      blurb: "The few ideas that decide close games.",
      body:
        "Endgames quietly decide more games than any opening. The good news is that a handful of precise ideas cover most of what you'll face, and once you know them you can convert won positions and save lost ones with confidence.\n\nThe foundations are king-and-pawn play — the opposition (a mutual-zugzwang battle to push the enemy king aside) and the square of the pawn (a glance tells you whether a king catches a runner) — plus rook-endgame rules: rooks belong behind passed pawns, and the Lucena and Philidor positions are the must-know winning and drawing methods with rook and pawn.",
      points: [
        "King first: in K+P endings, lead with the king and use the opposition.",
        "Rooks go BEHIND passed pawns — yours to push them, the enemy's to restrain.",
        "Know Lucena (the win) and Philidor (the draw) cold.",
      ],
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
      startFen: "3k4/8/3K4/3P4/8/8/8/8 w - - 0 1",
      intro:
        "The golden rule: get your KING in front of the pawn, and use the opposition to escort it home. Watch White convert.",
      steps: [
        { san: "Ke6", note: "King first! Sidestep to seize squares — don't push the pawn yet." },
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
  ],
};
