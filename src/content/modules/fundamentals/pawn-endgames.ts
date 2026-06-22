// Chapter 6 — King and Pawn Endgames: opposition, key squares, the square of the
// pawn. The single most important endgame technique for an improving player —
// most endings simplify down to king and pawn. Original prose; the drill
// positions are engine-verified winning (reused from the Endgame Trainer).

import type { Lesson } from "../../types";

export const pawnEndgames: Lesson = {
  id: "fund-pawn-endgames",
  title: "6. King and Pawn Endgames",
  summary:
    "The most important endgame to own: how to escort a pawn home. The opposition, key squares, and the 'square of the pawn' — learn them, then convert against the engine.",
  activities: [
    {
      id: "fund-pawn-endgames-concept",
      type: "concept",
      title: "The endgame everything boils down to",
      blurb: "King and pawn vs king — the foundation.",
      body:
        "Trade enough pieces and almost every game funnels into a king-and-pawn ending. Knowing whether one extra pawn wins — and HOW to convert it — is the difference between drawing won games and winning them.\n\nThe golden rule: lead with your KING, not the pawn. The king must go in front of the pawn to clear a path. The tool that forces the path through is the OPPOSITION: when the two kings stand on the same line with one square between them, whoever does NOT have to move 'has the opposition' and forces the other king to give way. Master leading with the king and taking the opposition, and these endings become automatic.",
      points: [
        "Lead with the king — the pawn follows behind.",
        "The opposition: kings facing with one square between; the side NOT to move wins the standoff.",
        "Get your king to the 'key squares' in front of the pawn and the win is automatic.",
      ],
    },
    {
      id: "fund-opposition-quiz",
      type: "quiz",
      title: "What is the opposition?",
      blurb: "The key idea in pawn endings.",
      question:
        "Two kings stand on the e-file with one empty square between them (e.g. Ke6 vs Ke8). Who 'has the opposition'?",
      options: [
        "Whoever has more pawns on the board at the time.",
        "The player who does NOT have to move — the other king must step aside.",
        "The player to move, because they get to choose first.",
        "Neither — the opposition only matters with rooks on the board.",
      ],
      correctIndex: 1,
      explanation:
        "The side NOT on move has the opposition. The king forced to move must give ground, letting the other king advance. Winning a king-and-pawn ending is usually about grabbing the opposition at the right moment.",
    },
    {
      id: "fund-kp-replay",
      type: "replay",
      title: "Escorting the pawn home",
      blurb: "Lead with the king, then promote.",
      orientation: "white",
      startFen: "4k3/8/4K3/4P3/8/8/8/8 w - - 0 1",
      intro:
        "White's king is already in front of the pawn on the 6th rank — that's a win even though Black 'has the opposition'. Watch how the king leads and outflanks to clear a path for the pawn.",
      steps: [
        { san: "Kd6", note: "Lead with the king and sidestep — heading around the black king rather than shoving the pawn." },
        { san: "Kd8", note: "Black tries to hold the opposition." },
        { san: "e6", note: "NOW the pawn advances — with the king already ahead, the pawn is safe." },
        { san: "Ke8", note: "The king shuffles back." },
        { san: "e7", note: "The pawn reaches the 7th — and it's defended by the king on d6, so it can't be taken." },
        { san: "Kf7", note: "The black king is shouldered away; it can't blockade e8." },
        { san: "Kd7", note: "The white king guards the promotion square. Nothing stops the pawn now." },
        { san: "Kf6", note: "Too late." },
        { san: "e8=Q", note: "Promotion! A new queen — the ending is won. Notice the king did all the work." },
      ],
    },
    {
      id: "fund-kp-drill",
      type: "drill",
      title: "Drill: win the king-and-pawn ending",
      blurb: "Lead with the king and promote.",
      fen: "4k3/8/4K3/4P3/8/8/8/8 w - - 0 1",
      orientation: "white",
      objective: "promote",
      engineSkill: 8,
      instructions:
        "Your turn. Escort the pawn to the 8th rank — but lead with your KING and use the opposition to push the black king aside. Don't just shove the pawn; the king clears the path.",
      successText:
        "Promoted! Leading with the king and taking the opposition is the technique behind every pawn ending. You'll win this one for the rest of your life.",
    },
    {
      id: "fund-square-quiz",
      type: "quiz",
      title: "The square of the pawn",
      blurb: "Can the king catch the runner?",
      question:
        "A lone king is chasing a passed pawn with no kings nearby to help. How do you tell at a glance if the king can catch it before it promotes?",
      options: [
        "Count the total number of pieces left on the board.",
        "Draw the imaginary square from the pawn to its promotion square — if the king can step INTO that square on its move, it catches the pawn.",
        "If the pawn is past the halfway line it can never be caught.",
        "Whichever side has the move always wins the race.",
      ],
      correctIndex: 1,
      explanation:
        "The 'square of the pawn': picture a square whose side runs from the pawn to its queening square. If the defending king is inside that square (or can step into it on its move), it catches the pawn. A quick visual shortcut — no counting moves needed.",
    },
    {
      id: "fund-keysquares-drill",
      type: "drill",
      title: "Drill: reach the key squares",
      blurb: "King two ranks ahead = automatic win.",
      fen: "2k5/8/2K5/2P5/8/8/8/8 w - - 0 1",
      orientation: "white",
      objective: "promote",
      engineSkill: 8,
      instructions:
        "Your king is two ranks ahead of the pawn — you control the 'key squares', so this wins no matter who is to move. Grab the opposition, lead with the king, and promote.",
      successText:
        "Promoted! When your king reaches the key squares (two ranks ahead of the pawn), the win is guaranteed. That's the target in every king-and-pawn race.",
    },
    {
      id: "fund-kp-rule-sort",
      type: "sort",
      title: "Where does the king belong?",
      blurb: "The one rule to remember.",
      prompt:
        "You have an extra pawn in a king-and-pawn ending. Where should your king go?",
      fen: "8/8/8/4k3/8/8/4P3/4K3 w - - 0 1",
      orientation: "white",
      options: [
        { label: "In FRONT of the pawn, leading it up the board" },
        { label: "Behind the pawn, pushing it from the back" },
        { label: "Far away, hunting the enemy king" },
      ],
      correctIndex: 0,
      explanation:
        "Lead with the king IN FRONT of the pawn. The king clears the path and shoulders the enemy king aside; the pawn follows safely behind. A pawn that races ahead of its own king usually gets blockaded and lost.",
    },
  ],
};
