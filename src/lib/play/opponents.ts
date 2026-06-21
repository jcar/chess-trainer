// The Play & Review opponent ladder. Each rung is shown to the player with its
// Elo rating. The engine reaches these strengths via stockfish.ts: ratings at or
// above the engine's native floor (UCI_Elo min = 1320) are calibrated exactly;
// weaker rungs are APPROXIMATED by throttling the engine's search depth + skill,
// so absolute beginners and kids can actually win. Those are flagged `approx`.

export interface Opponent {
  /** Displayed Elo rating. */
  elo: number;
  /** Friendly persona name. */
  name: string;
  /** True below the engine's native 1320-Elo floor (strength is approximate). */
  approx?: boolean;
}

/** The engine cannot natively limit below this Elo; weaker is approximated. */
export const NATIVE_ELO_FLOOR = 1320;
export const MIN_ELO = 600;
export const MAX_ELO = 2800;

export const OPPONENTS: Opponent[] = [
  { elo: 600, name: "Pawn", approx: true },
  { elo: 900, name: "Beginner", approx: true },
  { elo: 1100, name: "Improver", approx: true },
  { elo: 1320, name: "Club novice" },
  { elo: 1500, name: "Club player" },
  { elo: 1700, name: "Strong club" },
  { elo: 1900, name: "Expert" },
  { elo: 2100, name: "Candidate master" },
  { elo: 2400, name: "Master" },
  { elo: 2800, name: "Grandmaster" },
];

/** Nearest persona name for an arbitrary Elo (used by Adaptive mode). */
export function personaForElo(elo: number): string {
  let best = OPPONENTS[0];
  for (const o of OPPONENTS) {
    if (Math.abs(o.elo - elo) < Math.abs(best.elo - elo)) best = o;
  }
  return best.name;
}
