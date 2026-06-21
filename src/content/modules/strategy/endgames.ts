// Strategy lesson 2 — basic endgame technique: king activity, opposition, the
// square of the pawn, and converting K+P. All prose original.

import type { Lesson } from "../../types";

export const endgamesLesson: Lesson = {
  id: "endgames",
  title: "Basic Endgames",
  summary:
    "King power, the opposition, and turning a pawn into a queen.",
  activities: [
    {
      type: "concept",
      id: "endgames-concept",
      title: "Endgame essentials",
      blurb: "The king wakes up; pawns become queens.",
      body:
        "Once most pieces are gone the king is no longer a target to hide — it becomes a fighting piece that should march to the centre to escort pawns and attack weaknesses. The other key tool is the opposition: when kings stand directly opposed with one square between them, the side NOT to move wins the squares, because the other must give way.\n\nUse these together to shepherd a pawn to promotion: put your king in front of the pawn and let the opposition clear the path.",
      points: [
        "Activate your king — centralize it in the endgame.",
        "The opposition: whoever doesn't have to move holds the squares.",
        "Lead the pawn with your king to promote it.",
      ],
    },
    {
      type: "quiz",
      id: "endgames-king",
      title: "The king in the endgame",
      blurb: "From hiding to fighting.",
      question: "In the endgame, the king becomes:",
      options: [
        "A strong piece that should march to the centre.",
        "Still a weakling that must hide in the corner.",
        "Useless until the very last move.",
      ],
      correctIndex: 0,
      explanation:
        "With most pieces gone, the king is safe enough to fight. A centralized, active king escorts pawns, attacks weaknesses, and is often the deciding piece in the endgame.",
    },
    {
      type: "sort",
      id: "endgames-opposition",
      title: "The opposition",
      blurb: "Who really holds the squares?",
      prompt:
        "Kings face off with one empty square between them and it's the OTHER side to move. Who is better?",
      fen: "8/8/4k3/8/4K3/8/4P3/8 b - - 0 1",
      orientation: "white",
      options: [
        { label: "The side NOT to move" },
        { label: "The side to move" },
      ],
      correctIndex: 0,
      explanation:
        "When the kings stand directly opposed with one square between them, whoever does NOT have to move holds the opposition. The side forced to move must give way, letting the other king advance — the key to winning many king-and-pawn endings.",
    },
    {
      type: "sort",
      id: "endgames-square",
      title: "The square of the pawn",
      blurb: "Can the king catch it?",
      prompt:
        "Can the lone king catch the passed pawn (the 'square of the pawn')?",
      fen: "8/8/8/8/k7/8/6P1/6K1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "No, the pawn queens" },
        { label: "Yes, it's inside the square" },
      ],
      correctIndex: 0,
      explanation:
        "Draw an imaginary square using the pawn's path to promotion as one side. If the enemy king cannot step inside that square on its move, it can never catch the pawn. Here the king is far on the a-file and the g-pawn simply runs in to queen.",
    },
    {
      type: "quiz",
      id: "endgames-lucena",
      title: "Building a bridge",
      blurb: "The winning rook-ending method.",
      question:
        "In rook endings, the winning 'building a bridge' technique is called:",
      options: [
        "The Philidor position.",
        "The Lucena position.",
        "The Réti maneuver.",
      ],
      correctIndex: 1,
      explanation:
        "The Lucena position is the classic win with rook and pawn versus rook: you 'build a bridge' with your rook so it can shield the advancing king from checks and shepherd the pawn home.",
    },
    {
      type: "drill",
      id: "endgames-kp-win",
      title: "Win the K+P endgame",
      blurb: "Escort the pawn home.",
      fen: "4k3/8/4K3/4P3/8/8/8/8 w - - 0 1",
      orientation: "white",
      objective: "promote",
      engineSkill: 0,
      instructions:
        "White to play and win: put your king in front of the pawn and use the opposition to promote.",
      successText:
        "Promoted! Your king led the way and the opposition did the rest.",
    },
  ],
};
