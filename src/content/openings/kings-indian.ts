import type { Opening } from "./types";

// King's Indian Defence — original prose; lines are standard public theory.
export const kingsIndian: Opening = {
  id: "kings-indian",
  name: "King's Indian Defence",
  eco: "E60–E99",
  family: "1d4",
  trainerColor: "black",
  tier: "core",
  firstMoves: "1.d4 Nf6 2.c4 g6",
  character:
    "A fighting, hypermodern defence. Rather than occupying the centre at once, " +
    "Black fianchettoes the bishop on g7, lets White build a big pawn centre, " +
    "and then counterattacks it — usually with ...e5. Black concedes space to " +
    "launch a kingside attack, and the result is sharp, double-edged chess " +
    "where both sides race on opposite wings.",
  whitePlan:
    "Build and hold the broad d4/c4/e4 pawn centre, gain queenside space with " +
    "moves like b4 and c5, and attack where there is more room while keeping " +
    "the centre under control.",
  blackPlan:
    "Fianchetto with ...g6 and ...Bg7, castle, and strike at White's centre " +
    "with ...e5 (or ...c5); when the centre locks, storm the kingside with " +
    "...f5, ...f4 and a pawn avalanche toward the white king.",
  tabiyaFen:
    "rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
  lines: [
    {
      label: "Classical Variation",
      sans: [
        "d4", "Nf6", "c4", "g6", "Nc3", "Bg7", "e4", "d6",
        "Nf3", "O-O", "Be2", "e5", "O-O", "Nc6",
      ],
      notes: [
        "White takes the centre.",
        "Hypermodern: developing first, leaving the centre to White for now.",
        "Grabbing more central space.",
        "Preparing the fianchetto.",
        "Natural development.",
        "Completing the fianchetto — the bishop rakes the long diagonal.",
        "Building the big classical centre.",
        "Restraining e5 and opening the bishop's diagonal.",
        "Developing and supporting the centre.",
        "King safety; the kingside attack will come later.",
        "A flexible, classical developing move.",
        "The thematic counterstrike — challenging White's centre head-on.",
        "Castling into the coming battle.",
        "Piling pressure on d4 and inviting the central tension to resolve.",
      ],
    },
    {
      label: "Fianchetto Variation",
      sans: [
        "d4", "Nf6", "c4", "g6", "Nf3", "Bg7", "g3", "O-O",
        "Bg2", "d6", "O-O", "Nbd7",
      ],
      notes: [
        "White takes the centre.",
        "Developing in hypermodern style.",
        "Claiming more space.",
        "Preparing the fianchetto.",
        "Developing flexibly, delaying e4.",
        "Completing the fianchetto.",
        "White fianchettoes too — a calmer, very solid set-up.",
        "King safety first.",
        "The bishops glare at each other down the long diagonal.",
        "Restraining the centre and freeing the bishop.",
        "Castling.",
        "Developing the knight to support an eventual ...e5 break.",
      ],
    },
  ],
};
