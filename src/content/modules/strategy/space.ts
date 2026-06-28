// Chess Strategy — Lesson 7: Space & Prophylaxis. Original prose.

import type { Lesson } from "../../types";

export const spaceLesson: Lesson = {
  id: "space",
  title: "Space & Prophylaxis",
  summary:
    "More space means more room for your pieces — but watch the enemy's plans before you push.",
  activities: [
    {
      type: "concept",
      id: "space-concept",
      title: "Space & prophylaxis",
      blurb: "More room — used carefully.",
      body:
        "A space advantage means freedom of movement: your pieces regroup easily while the cramped side's pieces trip over each other. The flip side is that the cramped player wants to trade, since each exchange frees up squares for the pieces that remain.\n\nGaining space means pushing pawns, but pawns can't move backward — push too far and they overextend, leaving holes behind them. That's where prophylaxis comes in: before charging ahead, ask what the opponent wants and quietly take it away.",
      points: [
        "Space gives your pieces room; cramp the enemy.",
        "Short on space? Trade pieces for breathing room.",
        "Prophylaxis: prevent the opponent's plan before pushing your own.",
      ],
    },
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
      type: "sort",
      id: "space-apply1",
      title: "The prophylactic move",
      blurb: "Stop their plan before your own.",
      prompt:
        "You'd love to expand, but the opponent is about to break with a freeing pawn push. What's the wiser move?",
      fen: "r1bqk2r/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQ1RK1 w kq - 0 1",
      orientation: "white",
      options: [
        { label: "Charge ahead and grab more space at once" },
        { label: "Quietly prevent their freeing break first" },
      ],
      correctIndex: 1,
      explanation:
        "Prophylaxis means asking what the opponent wants and taking it away before pushing your own agenda. Stop the freeing break first, then your space advantage becomes permanent. Charging ahead and ignoring their idea lets them equalise the moment the break lands.",
    },
    {
      type: "sort",
      id: "space-apply2",
      title: "Cramped: what now?",
      blurb: "Less room, more trades.",
      prompt:
        "You're squeezed for space with pieces tripping over each other. What helps most?",
      fen: "r1bqk2r/pp1nbppp/2p1pn2/3p4/2PP4/2N1PN2/PP2BPPP/R1BQK2R b KQkq - 0 1",
      orientation: "black",
      options: [
        { label: "Trade a pair of pieces" },
        { label: "Push a pawn deep into their half" },
        { label: "Keep every piece and sit tight" },
      ],
      correctIndex: 0,
      explanation:
        "The cramped side wants fewer pieces, because every trade frees up squares for whatever remains. Swap a pair off to breathe. Lunging forward with a pawn from a cramped position usually just creates a weakness, and sitting tight only lets the squeeze tighten.",
    },
    {
      type: "replay",
      id: "space-demo",
      title: "The big squeeze",
      blurb: "Clamping the position.",
      orientation: "white",
      eval: true,
      source: "English Opening",
      intro:
        "Watch White grab space with a queenside pawn clamp, leaving Black's " +
        "pieces with almost nowhere to go. Space rarely spikes the eval — its value " +
        "is the cramped, planless position it forces on the other side.",
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
        { san: "Nb8", keyIdea: "Space cramps the enemy pieces", highlights: ["b5", "c4"], note: "The knight retreats home. White's space advantage is real and lasting." },
      ],
    },
  ],
};
