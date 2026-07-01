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
        "Know the queening square and the rule of the square for passed pawns.",
        "In rook-and-pawn endings, the winning method is the Lucena position — 'building a bridge' so your rook shields the advancing king from checks.",
      ],
      diagrams: [
        {
          fen: "8/8/3k4/8/3P4/3K4/8/8 w - - 0 1",
          orientation: "white",
          caption:
            "King-and-pawn technique in one picture: the king leads the pawn rather than pushing it blindly. Win the opposition, your king clears a path, and the pawn follows it home.",
        },
      ],
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
    {
      type: "concept",
      id: "strategy-endgames-practice",
      title: "Now drill it",
      blurb: "Technique sticks through reps.",
      body:
        "King activity and the opposition decide king-and-pawn endings — and most endings simplify toward them. Drill the must-know endings against the engine until converting is automatic.",
      practice: { tool: "endgames", label: "Open the Endgame Trainer" },
    },
  ],
};
