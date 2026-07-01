// Chapter — Pawn Structures: how the skeleton of pawns dictates the plans.
// Original prose; quiz/sort diagrams are display-only.

import type { Lesson } from "../../types";

export const pawnStructures: Lesson = {
  id: "int-pawn-structures",
  title: "14. Pawn Structures",
  summary:
    "Pawns can't move backward, so the pawn skeleton is the most permanent feature of a position — and it tells you where to play. Learn to read isolated, doubled, passed, and backward pawns and the plans each one sets.",
  activities: [
    {
      id: "int-pawn-structures-objective",
      type: "concept",
      title: "What you'll learn",
      blurb: "Read the pawns, find the plan.",
      body:
        "Pawns can't move backward, so the pawn skeleton is the most permanent thing on the board — and it quietly tells you where to play. Learn to read it and your plans stop being guesswork.\n\nWe'll name the landmarks every player must recognize — isolated, doubled, passed, backward pawns, and pawn chains — what each one means for both sides, then you'll spot the target and choose the plan on real positions.",
      points: [
        "The pawn structure is the position's most lasting feature.",
        "Isolated, doubled, passed, backward, chains — know them all.",
        "Read the skeleton, then pick the plan.",
      ],
    },
    {
      id: "int-pawn-structures-concept",
      type: "concept",
      title: "Pawns are the soul of chess",
      blurb: "The skeleton sets the plan.",
      body:
        "Because a pawn can never retreat, the shape of the pawns is the position's most lasting feature — and it points to the right plan. Read the skeleton first, and the moves follow.\n\nThe diagram shows the most important landmark, an ISOLATED pawn: Black's d5-pawn has no friendly pawn on the c- or e-file, so no pawn can ever defend it — a piece must babysit it, and the square in front is an outpost for the enemy. Its owner gets open files and active pieces in return. The other landmarks: DOUBLED pawns (two on a file) lose flexibility but open a file; a PASSED pawn must be pushed (or blockaded if it's the enemy's); a pawn CHAIN is attacked at its base; and a BACKWARD pawn — one left behind that can't safely advance — sits on a half-open file where enemy rooks pile up, with a hole in front for an enemy piece. Play where your pawns point.",
      points: [
        "Read the pawn skeleton before choosing a plan — it's the most permanent feature.",
        "Each structure cuts both ways: weakness to target, or activity/open lines to use.",
        "Attack a pawn chain at its base; push or blockade passed pawns.",
      ],
      diagrams: [
        {
          fen: "4k3/8/8/3p4/8/8/8/4K3 w - - 0 1",
          orientation: "white",
          caption: "An isolated pawn: nothing on the c- or e-file can defend d5, so a piece must guard it and d4 in front is a hole. A lasting target.",
        },
      ],
      check: {
        question: "Why is an isolated pawn a long-term weakness?",
        options: [
          "No pawn can defend it, so a piece must — and the square in front is a hole",
          "It can never be advanced under the rules of chess",
          "It is worth zero points in any exchange",
        ],
        correctIndex: 0,
        explanation:
          "An isolated pawn must be guarded by pieces (a chore) and the square ahead can't be covered by a pawn. In return its owner gets open files and active pieces — so attack with it in the middlegame, but trade down to win it in the endgame.",
      },
    },
    {
      id: "ps-iqp-plan",
      type: "plan",
      title: "Apply it: play against the IQP, then convert",
      blurb: "Read the structure, pick the plan, execute it.",
      fen: "r1bq1rk1/pp3ppp/2n2n2/3p4/8/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 1",
      orientation: "white",
      planQuestion: "Black has an isolated queen's pawn on d5. As White (the defender), what's the soundest plan?",
      options: [
        "Blockade d4 with a piece, trade down, and win the isolated pawn in the endgame.",
        "Throw every pawn forward on the kingside and ignore the d-pawn.",
        "Trade off all your own pieces as fast as you possibly can.",
      ],
      correctIndex: 0,
      explanation:
        "Against an IQP: blockade the pawn (d4 is ideal for a knight), trade the owner's active pieces, and steer to an endgame where the pawn is simply weak — then win it, as you'll now demonstrate.",
      convert: {
        kind: "drill",
        drill: {
          fen: "5rk1/pp3ppp/8/3p4/3P4/8/PP3PPP/2R1R1K1 w - - 0 1",
          orientation: "white",
          objective: "checkmate",
          engineSkill: 2,
          instructions:
            "You've reached the endgame a pawn up, with Black's d5-pawn isolated and weak. Pressure it down the file, win it, and convert the extra material into checkmate.",
          successText: "Converted — blockade, trade, and the isolated pawn falls. Textbook IQP technique.",
        },
      },
    },
    {
      id: "int-pawn-structures-recap",
      type: "concept",
      title: "Recap: play where the pawns point",
      blurb: "The skeleton is your map.",
      body:
        "Before you pick a plan, read the pawns. Each landmark sets the agenda: target an isolated or backward pawn (and the holes around it), use the open file that doubled pawns give you, push your passers and blockade the enemy's, and strike a pawn chain at its base. The structure tells you which side of the board to play on.\n\nThis becomes second nature through real games. Play, and make a habit of naming the pawn structure and its plan before anything else.",
      points: [
        "Read the skeleton first — it's the most permanent feature.",
        "Target isolated/backward pawns; use the files doubled pawns open.",
        "Push your passers; blockade theirs; hit chains at the base.",
      ],
      practice: { tool: "play", label: "Play a game now" },
    },
  ],
};
