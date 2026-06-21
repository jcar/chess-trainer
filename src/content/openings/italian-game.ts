import type { Opening } from "./types";

// Italian Game — original prose; lines are standard public theory.
export const italianGame: Opening = {
  id: "italian-game",
  name: "Italian Game",
  eco: "C50–C54",
  family: "1e4-e5",
  trainerColor: "white",
  tier: "core",
  firstMoves: "1.e4 e5 2.Nf3 Nc6 3.Bc4",
  character:
    "One of the oldest openings, and the friendliest introduction to 1.e4 e5. " +
    "White develops naturally and points the light-squared bishop straight at " +
    "f7 — the square only the king defends. It can be played very quietly " +
    "(maneuvering for a slow build-up) or sharply (with an early d4 break), so " +
    "it scales with your taste while always teaching sound development.",
  whitePlan:
    "Develop quickly, castle, and aim the bishop at f7. Choose between the " +
    "restrained d3 set-up (the 'Giuoco Pianissimo', a slow maneuvering game) " +
    "or the classical c3 + d4 break to seize a big pawn centre.",
  blackPlan:
    "Mirror White's healthy development with ...Bc5 and ...Nf6, keep e5 " +
    "defended, castle, and be ready to hit back in the centre with ...d5 once " +
    "pieces are out.",
  tabiyaFen:
    "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
  lines: [
    {
      label: "Giuoco Pianissimo (quiet main line)",
      sans: [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5",
        "c3", "Nf6", "d3", "d6", "O-O", "O-O",
      ],
      notes: [
        "White takes the centre and opens lines for the bishop and queen.",
        "Black stakes an equal claim in the centre.",
        "Natural development that immediately pressures e5.",
        "Defends e5 and develops a knight to its best square.",
        "The Italian bishop takes aim at f7 — the point only the king guards.",
        "Black mirrors, pointing the bishop back at f2.",
        "Preparing the d4 break and giving the bishop a retreat on c2.",
        "Developing and putting a question to the e4-pawn.",
        "The 'very quiet' approach: solidly supporting e4 instead of rushing.",
        "Black answers in kind, keeping the centre firm.",
        "King safety first.",
        "Both sides are castled and developed; now a rich maneuvering game begins.",
      ],
    },
    {
      label: "Classical c3 + d4 break",
      sans: [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5",
        "c3", "Nf6", "d4", "exd4", "cxd4", "Bb4+", "Nc3",
      ],
      notes: [
        "White takes the centre.",
        "Black stakes an equal claim.",
        "Developing with pressure on e5.",
        "Defending e5 and developing.",
        "The bishop eyes f7.",
        "Black mirrors the development.",
        "Preparing the central break d4.",
        "Developing and hitting e4.",
        "The critical thrust the Italian is built around — challenging the centre.",
        "Black accepts the challenge and captures.",
        "Recapturing, White owns a classical broad pawn centre.",
        "A check that forces White to resolve the position.",
        "Blocking the check and defending — the fight for the centre is on.",
      ],
    },
    {
      label: "Evans Gambit",
      sans: [
        "e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5",
        "b4", "Bxb4", "c3", "Ba5", "d4", "exd4",
      ],
      notes: [
        "White takes the centre.",
        "Black stakes an equal claim.",
        "Developing with pressure on e5.",
        "Defending e5 and developing.",
        "The Italian bishop eyes f7.",
        "Black mirrors the development.",
        "The gambit: offering a pawn to deflect the bishop and seize the centre.",
        "Black accepts, snatching the pawn.",
        "Gaining a tempo on the bishop while preparing the big d4 push.",
        "Retreating but keeping the bishop active on the diagonal.",
        "Cashing in on the lead in development to build a broad centre.",
        "Black grabs another pawn, but White's lead and open lines are the payment.",
      ],
    },
  ],
};
