// Chess Strategy — Lesson 7: Space & Prophylaxis. Original prose.

import type { Lesson } from "../../types";

export const spaceLesson: Lesson = {
  id: "space",
  title: "Space & Prophylaxis",
  summary:
    "More space means more room for your pieces — but watch the enemy's plans before you push.",
  activities: [
    {
      type: "quiz",
      id: "space-benefit",
      title: "What space buys you",
      blurb: "The real point of more room.",
      question: "What's the main benefit of a space advantage?",
      options: [
        "It forces the opponent to trade queens.",
        "Your pieces move and regroup freely while the enemy is cramped.",
        "It guarantees you an extra pawn.",
      ],
      correctIndex: 1,
      explanation:
        "Space is about freedom of movement. With more room behind your pawns, " +
        "your pieces shuffle from one wing to the other while the opponent's " +
        "pieces trip over each other in a cramped camp.",
    },
    {
      type: "sort",
      id: "space-cramped",
      title: "Breathing room",
      blurb: "When you're short on space.",
      prompt: "You're cramped for space. What's a good idea?",
      fen: "r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R b KQkq - 0 6",
      orientation: "black",
      options: [
        { label: "Trade pieces to get breathing room" },
        { label: "Keep every piece on the board" },
      ],
      correctIndex: 0,
      explanation:
        "The side with less space wants fewer pieces. Each trade leaves more " +
        "open squares for the pieces that remain, so the cramp eases with every " +
        "exchange.",
    },
    {
      type: "quiz",
      id: "space-prophylaxis",
      title: "Prophylaxis",
      blurb: "Stop it before it starts.",
      question: "What is 'prophylaxis'?",
      options: [
        "Castling on the opposite side to attack.",
        "Sacrificing a pawn for activity.",
        "Stopping the opponent's plan before pushing your own.",
      ],
      correctIndex: 2,
      explanation:
        "Prophylaxis means prevention. Before you charge ahead, you ask what the " +
        "opponent wants to do — and quietly take that idea away from them first.",
    },
    {
      type: "sort",
      id: "space-overextend",
      title: "Too far forward",
      blurb: "The risk of pushing.",
      prompt: "Pushing pawns for space can backfire if...",
      fen: "rnbqkbnr/ppp2ppp/8/3pp3/2PPP3/8/PP3PPP/RNBQKBNR b KQkq - 0 3",
      orientation: "white",
      options: [
        { label: "the pawns become weak and overextended" },
        { label: "you run out of pawn moves" },
      ],
      correctIndex: 0,
      explanation:
        "Pawns can't move backward. Push them too far and they leave holes behind " +
        "them and become targets the enemy pieces gang up on.",
    },
    {
      type: "replay",
      id: "space-demo",
      title: "The big squeeze",
      blurb: "Clamping the position.",
      orientation: "white",
      intro:
        "Watch White grab space with a queenside pawn clamp, leaving Black's " +
        "pieces with almost nowhere to go.",
      steps: [
        { san: "c4", note: "White stakes a claim on the queenside straight away." },
        { san: "e5", note: "Black grabs a share of the centre." },
        { san: "Nc3", note: "A developing move that supports a later d-pawn or b-pawn push." },
        { san: "Nf6", note: "Black develops naturally." },
        { san: "Nf3", note: "Eyeing e5 and preparing to fight for the centre." },
        { san: "Nc6", note: "Defending the e5-pawn." },
        { san: "a3", note: "Quiet but useful — it prepares to expand with b4." },
        { san: "d6", note: "Black props up the centre but stays passive." },
        { san: "b4", note: "The clamp begins: White gains queenside space." },
        { san: "Be7", note: "Black just develops; there's no easy break in sight." },
        { san: "b5", note: "The squeeze tightens — the knight on c6 is shoved back." },
        { san: "Nb8", note: "The knight retreats home. White's space advantage is real and lasting." },
      ],
    },
  ],
};
