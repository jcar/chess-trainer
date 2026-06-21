import type { Opening } from "./types";

// London System — original prose; lines are standard public theory.
export const londonSystem: Opening = {
  id: "london-system",
  name: "London System",
  eco: "D02/A48",
  family: "1d4",
  trainerColor: "white",
  tier: "core",
  firstMoves: "1.d4 d5 2.Nf3 Nf6 3.Bf4",
  character:
    "A low-theory 'system' opening: reliable, solid, and easy to learn. The " +
    "appeal is that White can aim for the same comfortable set-up — Bf4, e3, " +
    "Bd3 or Be2, c3, and Nbd2 — against almost anything Black does. You reach " +
    "a pleasant middlegame without memorizing long forcing lines, which makes " +
    "it a favourite for players who want to think rather than recite.",
  whitePlan:
    "Build the trademark structure: bishop out to f4 before locking it in, " +
    "then e3, c3, Nbd2, and a bishop to d3 or e2. Castle, keep the centre " +
    "firm, and look for the e4 break or a kingside attack with the queen and " +
    "rooks.",
  blackPlan:
    "Develop comfortably and challenge White's plan: contest the centre with " +
    "...c5 and ...e6, harass the f4-bishop, and decide whether to play in the " +
    "centre or fianchetto and pressure d4 from the side.",
  tabiyaFen:
    "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 1 3",
  lines: [
    {
      label: "Main setup vs ...d5",
      sans: [
        "d4", "d5", "Nf3", "Nf6", "Bf4", "e6",
        "e3", "c5", "c3", "Nc6", "Nbd2", "Bd6", "Bg3",
      ],
      notes: [
        "Claiming the centre with the queen's pawn.",
        "A classical, symmetrical reply staking the centre too.",
        "Developing the knight and controlling e5.",
        "Black mirrors, developing toward the centre.",
        "The signature London move: the bishop comes out before e3 locks it in.",
        "Opening a path for the dark-squared bishop and supporting d5.",
        "Building the trademark structure and freeing the light-squared bishop.",
        "Striking at the centre to challenge White's pawn chain.",
        "Reinforcing d4 and giving the bishop a safe retreat on c2.",
        "Developing the knight and adding pressure on d4.",
        "A flexible developing move that supports a later e4 break.",
        "Developing and offering to trade off the active f4-bishop.",
        "Sidestepping the trade and keeping the strong bishop on its diagonal.",
      ],
    },
    {
      label: "vs a King's-Indian setup",
      sans: [
        "d4", "Nf6", "Bf4", "g6",
        "Nf3", "Bg7", "e3", "O-O", "Be2", "d6", "h3",
      ],
      notes: [
        "Claiming the centre.",
        "A flexible move heading for a kingside fianchetto.",
        "The London bishop comes out early, before ...d6 can hit it.",
        "Black prepares to fianchetto the bishop.",
        "Developing and controlling e5.",
        "Completing the fianchetto, pointing the bishop at the long diagonal.",
        "The familiar London structure, solid and free of weaknesses.",
        "King safety first for Black.",
        "A modest, useful developing square for the bishop.",
        "Preparing ...e5 to challenge the centre.",
        "A handy luft, denying Black's pieces the g4-square and preparing g4 ideas.",
      ],
    },
    {
      label: "Black hits back with ...c5 and ...Qb6",
      sans: [
        "d4", "d5", "Nf3", "Nf6", "Bf4", "c5",
        "e3", "Nc6", "c3", "Qb6", "Qc1", "Bf5",
      ],
      notes: [
        "Claiming the centre.",
        "A classical, symmetrical reply.",
        "Developing and controlling e5.",
        "Black mirrors the development.",
        "The signature London move before e3 shuts the bishop in.",
        "An immediate strike at the centre, the critical try against the London.",
        "Building the structure and freeing the light-squared bishop.",
        "Developing and adding pressure on d4.",
        "Reinforcing d4 and giving the bishop a square on c2.",
        "The point: hitting both b2 and d4, the most testing reply.",
        "Calmly defending b2 while keeping the queen flexible.",
        "Black also develops the bishop outside the chain, mirroring White's idea.",
      ],
    },
  ],
};
