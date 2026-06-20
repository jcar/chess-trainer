import type { Opening } from "./types";

// French Defence — original prose; lines are standard public theory.
export const frenchDefence: Opening = {
  id: "french-defence",
  name: "French Defence",
  eco: "C00–C19",
  family: "1e4-other",
  firstMoves: "1.e4 e6",
  character:
    "Solid and combative. Black answers 1.e4 with 1...e6, preparing to challenge " +
    "the centre with ...d5 behind a sturdy pawn wall. The only initial drawback " +
    "is the light-squared bishop, which is hemmed in by the ...e6 pawn, but the " +
    "resulting structure is famously tough and resilient.",
  whitePlan:
    "Build and defend a broad pawn centre, gain kingside space, and attack on the " +
    "wing where the cramped Black position is most vulnerable, often targeting " +
    "the kingside while Black is slow to develop.",
  blackPlan:
    "Accept a slightly cramped position in return for a rock-solid structure, " +
    "then chip away at White's centre with the ...c5 break (and sometimes ...f6), " +
    "and find good homes for the pieces — especially the problem bishop.",
  tabiyaFen:
    "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
  lines: [
    {
      label: "Advance Variation",
      sans: [
        "e4", "e6", "d4", "d5", "e5", "c5", "c3", "Nc6", "Nf3", "Qb6",
      ],
      notes: [
        "White grabs the centre.",
        "The French: Black prepares ...d5 to challenge the centre.",
        "Reinforcing the centre and opening lines.",
        "Black hits the e4-pawn, the heart of the French.",
        "The Advance: White pushes past, gaining space and fixing the centre.",
        "Black's thematic break, striking at the base of the chain on d4.",
        "Defending d4 so the centre holds.",
        "Piling more pressure on the d4-pawn.",
        "Defending d4 again and developing.",
        "Hitting d4 a third time and eyeing the weak b2-pawn.",
      ],
    },
    {
      label: "Winawer Variation",
      sans: [
        "e4", "e6", "d4", "d5", "Nc3", "Bb4", "e5", "c5",
        "a3", "Bxc3+", "bxc3", "Ne7",
      ],
      notes: [
        "White grabs the centre.",
        "The French.",
        "Reinforcing the centre.",
        "Black challenges e4.",
        "Developing and defending e4 — the most aggressive try.",
        "The Winawer pin, attacking the knight that guards e4.",
        "Pushing past with gain of space and locking the centre.",
        "Black's thematic break against d4.",
        "Putting the question to the pinning bishop.",
        "Black trades the bishop, damaging White's queenside pawns.",
        "Recapturing — White gets the bishop pair but doubled c-pawns.",
        "Developing the knight toward f5 or g6, eyeing White's centre.",
      ],
    },
  ],
};
