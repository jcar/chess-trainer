import type { Opening } from "./types";

// Dutch Defence — original prose; lines are standard public theory.
export const dutchDefence: Opening = {
  id: "dutch-defence",
  name: "Dutch Defence",
  eco: "A80–A99",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 f5",
  character:
    "An aggressive, unbalancing reply to 1.d4. With the very first move " +
    "1...f5 Black plants a flag on the kingside and fights for control of the " +
    "e4-square. The bargain is clear: Black slightly loosens the king's cover " +
    "in exchange for attacking chances and an asymmetrical battle most 1.d4 " +
    "players are far less comfortable facing.",
  whitePlan:
    "Develop soundly — often with a kingside fianchetto to blunt Black's " +
    "long-diagonal hopes and contest the light squares around e4 — then exploit " +
    "the slight weakening created by ...f5.",
  blackPlan:
    "Stake a kingside claim with ...f5, fight for the e4-square, develop the " +
    "pieces behind the pawn, and aim for a kingside initiative or a firm grip " +
    "on the centre.",
  tabiyaFen:
    "rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
  lines: [
    {
      label: "Classical Variation",
      sans: [
        "d4", "f5", "g3", "Nf6", "Bg2", "e6",
        "Nf3", "Be7", "O-O", "O-O", "c4", "d6",
      ],
      notes: [
        "White claims the centre.",
        "The Dutch: Black grabs kingside space and fights for e4.",
        "Heading for the fianchetto to contest the light squares.",
        "Developing and controlling e4.",
        "The bishop takes the long diagonal, eyeing the centre.",
        "Supporting the centre and opening a path for the bishop.",
        "Developing the knight toward the centre.",
        "A modest bishop developing move — the Classical set-up.",
        "King safety.",
        "Black castles too; the structure is set.",
        "Staking a central claim with the pawn.",
        "Preparing the thematic ...e5 break behind the Stonewall-free centre.",
      ],
    },
    {
      label: "Leningrad Variation",
      sans: [
        "d4", "f5", "g3", "Nf6", "Bg2", "g6",
        "Nf3", "Bg7", "O-O", "O-O", "c4", "d6",
      ],
      notes: [
        "White claims the centre.",
        "The Dutch, fighting for e4.",
        "Heading for the fianchetto.",
        "Developing and controlling e4.",
        "The bishop takes the long diagonal.",
        "The Leningrad: Black fianchettoes his own bishop too.",
        "Developing the knight.",
        "The g7-bishop lines up against the centre — King's-Indian style.",
        "King safety.",
        "Black castles into a flexible, aggressive set-up.",
        "Staking a central claim.",
        "Preparing the ...e5 break, the heart of the Leningrad plan.",
      ],
    },
  ],
};
