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
      id: "opposition-concept",
      type: "quiz",
      title: "The opposition",
      blurb: "Kings facing off.",
      question:
        "In a king-and-pawn endgame, having 'the opposition' means:",
      options: [
        "Your king is worth more than the enemy king.",
        "The kings face each other with one square between them and it's the OPPONENT to move — forcing their king to give way.",
        "You have an extra pawn.",
        "Your king is on its starting square.",
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
        "A pawn is on a light or dark square.",
        "A lone king can catch an enemy passed pawn before it promotes (without calculating move by move).",
        "Two pawns are connected.",
        "A bishop can reach a square.",
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
        "Directly in front of it, blocking it.",
        "Behind the passed pawn — yours, to push it, or the enemy's, to restrain it.",
        "As far away as possible.",
        "Next to your king only.",
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
        "How to checkmate with two rooks.",
        "The key winning method (Lucena, 'building a bridge') and the key drawing method (Philidor, 'third-rank defense') in rook-and-pawn endings.",
        "How to open a game.",
        "Why rooks are weak.",
      ],
      correctIndex: 1,
      explanation:
        "Rook endings are the most common of all. Lucena shows how the stronger side wins (build a bridge to shelter the king from checks); Philidor shows how the weaker side draws (keep the rook on the third rank until the pawn advances, then check from behind). Know both cold.",
    },
  ],
};
