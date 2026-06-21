import type { Opening } from "./types";

// Queen's Indian Defence — original prose; lines are standard public theory.
export const queensIndian: Opening = {
  id: "queens-indian",
  name: "Queen's Indian Defence",
  eco: "E12–E19",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 Nf6 2.c4 e6 3.Nf3 b6",
  character:
    "A calm, hypermodern reply to 3.Nf3. Instead of grabbing the centre with " +
    "pawns, Black fianchettoes the light-squared bishop to b7 (sometimes a6) " +
    "and fights for the key e4-square from a distance. The result is a solid, " +
    "flexible position that is famously hard to crack.",
  whitePlan:
    "Fianchetto with g3 and Bg2 to contest the long diagonal, castle, and use " +
    "the central space and the c-file to build slow, lasting pressure.",
  blackPlan:
    "Develop the bishop to b7 (or a6 to hit c4), control e4, complete " +
    "development with ...Be7 and castling, and look for the freeing ...d5 or " +
    "...c5 breaks at the right moment.",
  tabiyaFen:
    "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4",
  lines: [
    {
      label: "Main Line (4.g3 Bb7)",
      sans: [
        "d4", "Nf6", "c4", "e6", "Nf3", "b6",
        "g3", "Bb7", "Bg2", "Be7", "O-O", "O-O",
      ],
      notes: [
        "White claims the centre.",
        "Black develops flexibly, keeping options open.",
        "Grabbing space and pressuring a future ...d5.",
        "Solid and flexible, opening the dark-squared bishop's path.",
        "Developing the knight and steering clear of an early ...Bb4 pin.",
        "The Queen's Indian move — preparing the b7 fianchetto.",
        "Contesting the long diagonal before Black settles on it.",
        "The signature bishop — eyeing e4 along the long light diagonal.",
        "White's bishop faces off on the same diagonal.",
        "Calm development, ready to castle.",
        "King safety first.",
        "Both sides castled; a subtle maneuvering struggle over e4 begins.",
      ],
    },
    {
      label: "4...Ba6",
      sans: [
        "d4", "Nf6", "c4", "e6", "Nf3", "b6",
        "g3", "Ba6", "b3", "Bb4+", "Bd2", "Be7",
      ],
      notes: [
        "White claims the centre.",
        "Black stays flexible.",
        "Grabbing space.",
        "Solid and flexible.",
        "Developing and avoiding the pin.",
        "Preparing the fianchetto.",
        "Heading for the long diagonal.",
        "The sharp alternative — the bishop hits the c4-pawn directly.",
        "Defending c4 before completing the fianchetto.",
        "A useful check to provoke a concession before retreating.",
        "Blocking the check naturally.",
        "Repositioning the bishop, having extracted the b3 move from White.",
      ],
    },
  ],
};
