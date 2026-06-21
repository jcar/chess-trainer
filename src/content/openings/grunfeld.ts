import type { Opening } from "./types";

// Grünfeld Defence — original prose; lines are standard public theory.
export const grunfeld: Opening = {
  id: "grunfeld",
  name: "Grünfeld Defence",
  eco: "D70–D99",
  family: "1d4",
  trainerColor: "black",
  firstMoves: "1.d4 Nf6 2.c4 g6 3.Nc3 d5",
  character:
    "A bold, hypermodern answer to 1.d4. Instead of occupying the centre, " +
    "Black invites White to build a broad pawn front — and then sets out to " +
    "tear it down. The fianchettoed bishop on g7 rakes the long diagonal while " +
    "...c5 and piece pressure pour onto the centre. It is dynamic, double-edged " +
    "chess where Black trades space for activity.",
  whitePlan:
    "Accept the invitation: grab the centre with pawns on d4 and e4, develop " +
    "behind them, and try to prove the space advantage by keeping the pawns " +
    "rolling and the centre intact.",
  blackPlan:
    "Let White overextend, then strike with ...c5 and the g7-bishop down the " +
    "long diagonal, hitting d4 and the queenside until White's proud centre " +
    "becomes a target rather than a strength.",
  tabiyaFen:
    "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4",
  lines: [
    {
      label: "Exchange Variation",
      sans: [
        "d4", "Nf6", "c4", "g6", "Nc3", "d5",
        "cxd5", "Nxd5", "e4", "Nxc3", "bxc3", "Bg7", "Bc4", "c5",
      ],
      notes: [
        "White claims the centre and opens lines.",
        "A flexible developing move, eyeing the centre from afar.",
        "Adding a second centre pawn and clamping down.",
        "The hypermodern signal: the bishop is heading to g7.",
        "Defending d5 and developing toward the centre.",
        "Black finally stakes a central claim — the Grünfeld is on.",
        "White trades to gain the big centre Black is inviting.",
        "Recapturing with the knight, ready to challenge.",
        "Building the broad pawn centre — exactly what Black wants to attack.",
        "Trading off, doubling White's pawns and creating a target.",
        "Recapturing; White owns the centre but the c3-pawn is a weakness.",
        "The bishop takes its long-diagonal post, raking d4.",
        "The classic Grünfeld bishop, eyeing f7.",
        "The thematic break — Black hits the proud centre at last.",
      ],
    },
    {
      label: "Russian System",
      sans: [
        "d4", "Nf6", "c4", "g6", "Nc3", "d5",
        "Nf3", "Bg7", "Qb3", "dxc4", "Qxc4", "O-O",
      ],
      notes: [
        "White claims the centre.",
        "Flexible development.",
        "Reinforcing the centre.",
        "Preparing the fianchetto.",
        "Black completes the central challenge.",
        "Developing the knight before committing the centre.",
        "The bishop reaches its long-diagonal home.",
        "The Russian System: the queen swings out to pressure d5 and b7.",
        "Black grabs the pawn rather than defend d5.",
        "Recapturing, the queen sits actively on c4.",
        "King safety — Black is comfortably developed and ready for ...c5.",
      ],
    },
  ],
};
