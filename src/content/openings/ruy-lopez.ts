import type { Opening } from "./types";

// Ruy Lopez — original prose; lines are standard public theory.
export const ruyLopez: Opening = {
  id: "ruy-lopez",
  name: "Ruy Lopez",
  eco: "C60–C99",
  family: "1e4-e5",
  trainerColor: "white",
  firstMoves: "1.e4 e5 2.Nf3 Nc6 3.Bb5",
  character:
    "The oldest and most deeply respected of all 1.e4 e5 openings. Instead of " +
    "rushing, White prepares a slow, patient build-up, leaning on the knight " +
    "that defends Black's e5-pawn. It rewards understanding over memorization " +
    "and unfolds into one of the richest strategic battles in chess.",
  whitePlan:
    "Pin or pressure the c6-knight to undermine the e5-pawn, then complete " +
    "development with O-O, Re1, and c3, preparing the d4 break and a long, " +
    "patient squeeze.",
  blackPlan:
    "Kick the bishop with ...a6 and ...b5 to win space on the queenside, keep " +
    "e5 well defended, develop with ...Be7 and ...d6, and castle into a solid, " +
    "resilient set-up.",
  tabiyaFen:
    "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
  lines: [
    {
      label: "Closed Ruy Lopez (Morphy Defence)",
      sans: [
        "e4", "e5", "Nf3", "Nc6", "Bb5", "a6",
        "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5",
        "Bb3", "d6", "c3", "O-O",
      ],
      notes: [
        "White grabs the centre and opens lines for the bishop and queen.",
        "Black stakes an equal claim in the centre.",
        "Developing with an eye on the e5-pawn.",
        "Defending e5 with the knight.",
        "The Ruy Lopez bishop pressures the knight that guards e5.",
        "Putting the question to the bishop right away.",
        "Keeping the bishop on the long diagonal toward c6.",
        "Developing and attacking the e4-pawn.",
        "King safety first — White castles quickly.",
        "A modest, flexible square for the bishop.",
        "Reinforcing e4 and lining the rook up behind the e-file.",
        "Gaining queenside space and threatening the bishop.",
        "Retreating to a strong diagonal aimed again at f7.",
        "Solidly supporting e5 for the long game.",
        "Preparing the d4 break and a square on c2 for the bishop.",
        "Both sides are castled; now the slow strategic battle begins.",
      ],
    },
    {
      label: "Exchange Variation",
      sans: [
        "e4", "e5", "Nf3", "Nc6", "Bb5", "a6",
        "Bxc6", "dxc6", "O-O", "f6", "d4", "exd4", "Nxd4",
      ],
      notes: [
        "White takes the centre.",
        "Black answers in the centre.",
        "Developing toward the c6-knight.",
        "Defending e5.",
        "Pinning and pressuring the c6-knight.",
        "Questioning the bishop.",
        "Trading at once to damage Black's pawns.",
        "Recapturing toward the centre, doubling the c-pawns.",
        "King safety, with a long-term structural edge in mind.",
        "Reinforcing e5 the only solid way.",
        "Striking at the centre to open the position.",
        "Black captures to free the position.",
        "Recapturing, White heads for a healthier endgame structure.",
      ],
    },
  ],
};
