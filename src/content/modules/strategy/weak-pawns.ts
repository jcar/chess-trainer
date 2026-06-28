// Chess Strategy — Lesson 9: Weak Pawns & Strong Pawns. Original prose.

import type { Lesson } from "../../types";

export const weakPawnsLesson: Lesson = {
  id: "weak-pawns",
  title: "Weak Pawns & Strong Pawns",
  summary:
    "Isolated, doubled, and backward pawns are targets; passed pawns are a long-term trump.",
  activities: [
    {
      type: "concept",
      id: "weak-pawns-concept",
      title: "Weak pawns & strong pawns",
      blurb: "Targets to attack, trumps to push.",
      body:
        "Some pawns are weaknesses because they can't be defended by another pawn — isolated pawns (no neighbours), backward pawns (left behind, with a hole in front), and doubled pawns. Pieces have to babysit them, which ties your forces down and hands the other side the initiative. The way to play against them is to blockade the pawn, then pile up attackers on it.\n\nOne pawn is the opposite — a trump. A passed pawn, with no enemy pawns able to stop it, threatens to queen and grows stronger as pieces come off.",
      points: [
        "Isolated, backward, and doubled pawns are targets.",
        "Play against a weak pawn: blockade it, then attack it.",
        "A passed pawn is a long-term winning trump.",
      ],
    },
    {
      type: "quiz",
      id: "wp-isolated",
      title: "The isolated pawn",
      blurb: "A pawn with no friends.",
      question: "Why is an isolated pawn a weakness?",
      options: [
        "It blocks your own bishop.",
        "It can never advance.",
        "No pawn can defend it, so pieces must babysit it.",
      ],
      correctIndex: 2,
      explanation:
        "An isolated pawn has no neighbouring pawns to guard it. Pieces have to " +
        "drop back and defend it, which ties them down and hands the initiative " +
        "to the other side.",
    },
    {
      type: "sort",
      id: "wp-target",
      title: "Playing against the IQP",
      blurb: "Two-step plan.",
      prompt: "How do you play against an isolated pawn?",
      fen: "r1bq1rk1/pp3ppp/2n1pn2/8/3P4/2N1BN2/PP3PPP/R2Q1RK1 b - - 0 11",
      orientation: "white",
      options: [
        { label: "Blockade it and pile up on it" },
        { label: "Trade all the rooks at once" },
      ],
      correctIndex: 0,
      explanation:
        "First plant a piece on the square in front of the isolated pawn so it " +
        "can't advance, then bring up attackers. A frozen pawn under fire often " +
        "falls.",
    },
    {
      type: "quiz",
      id: "wp-backward",
      title: "The backward pawn",
      blurb: "Stuck and exposed.",
      question: "A 'backward' pawn is weak because...",
      options: [
        "It is doubled with another pawn.",
        "It sits on the edge of the board.",
        "It can't advance safely and the square in front is a hole.",
      ],
      correctIndex: 2,
      explanation:
        "A backward pawn has been left behind its neighbours and can't push " +
        "without being lost. The open square just ahead becomes a permanent home " +
        "for an enemy piece.",
    },
    {
      type: "sort",
      id: "wp-passed",
      title: "The passed pawn",
      blurb: "A future queen.",
      prompt: "What makes a passed pawn so dangerous?",
      fen: "8/8/3k4/8/3P4/3K4/8/8 w - - 0 1",
      orientation: "white",
      options: [
        { label: "No enemy pawn can stop it from queening" },
        { label: "It defends your king" },
      ],
      correctIndex: 0,
      explanation:
        "A passed pawn has no enemy pawns ahead of it on its file or the files " +
        "beside it. Nothing but enemy pieces can halt its march to promotion — a " +
        "long-term trump.",
    },
    {
      type: "sort",
      id: "wp-apply2",
      title: "Attack the isolated pawn",
      blurb: "Where does the knight go?",
      prompt:
        "Black's d5-pawn is isolated. Which knight move best fights against it?",
      fen: "r1bq1rk1/pp3ppp/2n1pn2/3p4/8/2N2N2/PP3PPP/R1BQ1RK1 w - - 0 12",
      orientation: "white",
      options: [
        { label: "Reroute a knight to d4, the blockade square" },
        { label: "Trade off both knights immediately" },
        { label: "Push your own a- and b-pawns up the board" },
      ],
      correctIndex: 0,
      explanation:
        "The square in front of an isolated pawn (d4 here) is the ideal blockade " +
        "post: reroute a knight there so the pawn can never advance, then pile " +
        "attackers on the frozen target. Retreating wastes the plan.",
    },
    {
      type: "replay",
      id: "wp-demo",
      title: "Creating a target",
      blurb: "Manufacturing a weakness.",
      orientation: "white",
      eval: true,
      source: "Queen's Gambit Declined, Exchange Variation",
      intro:
        "Watch how a series of trades and exchanges saddles Black with an " +
        "isolated pawn that White can then blockade and attack. A weakness is a " +
        "long game — the eval barely flickers while the target is fixed for keeps.",
      steps: [
        { san: "d4", note: "A solid central start." },
        { san: "d5", note: "Black answers symmetrically." },
        { san: "c4", note: "White challenges the d5-pawn — the heart of this plan." },
        { san: "e6", note: "Black supports d5 and prepares to develop." },
        { san: "Nc3", note: "Adding pressure to d5." },
        { san: "Nf6", note: "Defending the d5-pawn again." },
        { san: "cxd5", note: "White trades on d5 to fix the structure." },
        { san: "exd5", note: "Now the d5-pawn has lost its e-pawn neighbour — isolation looms." },
        { san: "Nf3", note: "Developing toward the blockade square on d4." },
        { san: "Be7", note: "Black develops, but the d5-pawn is a permanent worry." },
        { san: "Bf4", note: "Eyeing the queenside and controlling key dark squares." },
        { san: "O-O", keyIdea: "Fix the weakness, then pile on", highlights: ["d5"], note: "Black castles. The isolated d5-pawn is the target for the rest of the game." },
      ],
    },
  ],
};
