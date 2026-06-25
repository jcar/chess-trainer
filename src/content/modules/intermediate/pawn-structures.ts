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
      id: "int-pawn-structures-concept",
      type: "concept",
      title: "Pawns are the soul of chess",
      blurb: "The skeleton sets the plan.",
      body:
        "Because a pawn can never retreat, the shape of the pawns is the position's most lasting feature — and it points to the right plan. Read the skeleton first, and the moves follow.\n\nLearn the landmarks: an ISOLATED pawn (no friendly pawn on either neighbouring file) gives active pieces but is a long-term target. DOUBLED pawns (two on one file) lose flexibility and can't defend each other, but open a file for your rook. A PASSED pawn (no enemy pawn ahead on its file or the files beside it) is a long-term winner — push it, or blockade the enemy's. A pawn CHAIN is attacked at its base. Play where your pawns point.",
      points: [
        "Read the pawn skeleton before choosing a plan — it's the most permanent feature.",
        "Each structure cuts both ways: weakness to target, or activity/open lines to use.",
        "Attack a pawn chain at its base; push or blockade passed pawns.",
      ],
    },
    {
      id: "ps-isolated",
      type: "quiz",
      title: "The isolated pawn",
      blurb: "Active, but a target.",
      question: "What best describes an isolated pawn (no friendly pawn on either neighbouring file)?",
      options: [
        "A permanent winning edge for whoever happens to own it on the board.",
        "Active piece play and open lines now, but a fixed target for the endgame.",
        "A pawn that can only ever be defended by another pawn beside it.",
        "Always a fatal weakness that simply loses the game on the spot.",
      ],
      correctIndex: 1,
      explanation:
        "An isolated pawn can't be defended by a pawn, so a piece must guard it and the square in front is an outpost for the enemy. In return its owner gets open files and active pieces. So: attack with it in the middlegame, but head for an endgame to win it.",
    },
    {
      id: "ps-doubled",
      type: "quiz",
      title: "Doubled pawns",
      blurb: "Clumsy — but they open a file.",
      question: "Doubled pawns (two of your pawns on the same file) are usually:",
      options: [
        "A clear advantage, because two pawns on a file defend each other well.",
        "Completely irrelevant — pawn position never affects the plan at all.",
        "Less flexible and hard to defend, but they hand you a half-open file.",
        "Impossible to reach in a normal game played between two sensible players.",
      ],
      correctIndex: 2,
      explanation:
        "Doubled pawns can't defend each other and struggle to create a passed pawn, so they're a long-term weakness — but the capture that doubled them opened a file for your rook. Weigh the open file against the structural cost.",
    },
    {
      id: "ps-passed",
      type: "quiz",
      title: "The passed pawn",
      blurb: "It must be pushed!",
      question: "A passed pawn (no enemy pawn ahead on its file or the adjacent files) should usually be:",
      options: [
        "Left where it is, since a passed pawn has no real value until the endgame.",
        "Traded off at once, because a passer is far too dangerous to keep around.",
        "Pushed (or blockaded if it's the enemy's) — 'passed pawns must be pushed'.",
        "Defended only by the king, never by a rook or any other piece.",
      ],
      correctIndex: 2,
      explanation:
        "A passed pawn grows more dangerous the further it goes, tying down enemy pieces — so push it, ideally with a rook behind it. Against the enemy's passer, the rule is the opposite: blockade it firmly, ideally with a knight, before it runs.",
    },
    {
      id: "ps-chain",
      type: "quiz",
      title: "Pawn chains",
      blurb: "Hit the base.",
      question: "When facing a pawn chain (pawns defending each other in a diagonal), where do you strike?",
      options: [
        "At the head of the chain, the pawn that is furthest forward and best defended.",
        "At the base of the chain — the root pawn that supports all the others.",
        "Nowhere; a pawn chain is unbreakable and must simply be left completely alone.",
        "Only with your king, marched up the board into the middle of the chain.",
      ],
      correctIndex: 1,
      explanation:
        "Each pawn in a chain is defended by the one behind it — except the base, which has no support. Undermine the base (often with a pawn break) and the whole chain crumbles. Play on the side of the board your chain points toward.",
    },
    {
      id: "ps-backward",
      type: "quiz",
      title: "The backward pawn",
      blurb: "Stuck on a half-open file.",
      question: "Why is a backward pawn (one left behind, that can't safely advance) a weakness?",
      options: [
        "It can be defended by a pawn, so the enemy will never bother to attack it.",
        "It sits on a half-open file where enemy rooks pile up, and its square is an outpost.",
        "It is actually a strength, because it controls so many important squares ahead.",
        "It always promotes faster than any other pawn left on the whole board.",
      ],
      correctIndex: 1,
      explanation:
        "A backward pawn has been left behind by its neighbours and can't advance without being lost. The enemy stacks rooks on the half-open file in front of it and uses the hole ahead as an outpost. Defend it, or trade it off if you can.",
    },
    {
      id: "ps-find-weakness",
      type: "sort",
      title: "Apply it: spot the target",
      blurb: "Which pawn is weak?",
      prompt: "Look at White's pawns. Which one is the long-term weakness Black should target?",
      fen: "4k3/5ppp/8/8/8/3P4/5PPP/4K3 w - - 0 1",
      orientation: "white",
      options: [
        { label: "The isolated d3-pawn — no neighbour can defend it" },
        { label: "The h2-pawn — part of a healthy, defended group" },
        { label: "The f2-pawn — safely supported by its neighbours" },
      ],
      correctIndex: 0,
      explanation:
        "The d-pawn has no friendly pawn on the c- or e-file, so no pawn can ever defend it — a piece must babysit it and Black can pile up on the open lines around it. The kingside trio is healthy. Target the isolani.",
    },
    {
      id: "ps-iqp-plan",
      type: "sort",
      title: "Apply it: playing against the IQP",
      blurb: "You face an isolated d-pawn.",
      prompt: "Black has an isolated queen's pawn on d5. As White (the defender), what's the soundest plan?",
      fen: "r1bq1rk1/pp3ppp/2n2n2/3p4/8/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 1",
      orientation: "white",
      options: [
        { label: "Blockade d4 with a piece, trade down, and head for the endgame" },
        { label: "Throw every pawn forward on the kingside and ignore the d-pawn" },
        { label: "Trade off all your own pieces as fast as you possibly can" },
      ],
      correctIndex: 0,
      explanation:
        "Against an IQP you blockade the pawn (the d4 square is ideal for a knight), neutralize the owner's active pieces by trading them, and steer toward an endgame where the isolated pawn is simply weak. The owner wants the opposite: keep pieces on and attack.",
    },
  ],
};
