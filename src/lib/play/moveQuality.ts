// Shared move-quality scoring for engine coaching + review, so /play and the
// Openings Trainer's Sparring mode classify moves identically. Thresholds are in
// centipawns of loss vs the engine's best move.

/** Analysis score → a single comparable centipawn number (mate mapped large). */
export function toCp(r: { cp: number | null; mate: number | null }): number {
  if (r.mate != null) return r.mate > 0 ? 100000 - r.mate : -100000 - r.mate;
  return r.cp ?? 0;
}

export type Severity = "blunder" | "mistake";

/**
 * Live in-game severity: a blunder is always flagged; a mistake only from ply 8
 * on, so ordinary opening moves aren't nagged as "mistakes".
 */
export function coachSeverity(loss: number, plyIndex: number): Severity | null {
  return loss >= 300 ? "blunder" : plyIndex >= 8 && loss >= 150 ? "mistake" : null;
}

export type ReviewClass = "blunder" | "mistake" | "inaccuracy";

/** Post-game classification of a move by its centipawn loss (null = fine). */
export function reviewClass(loss: number): ReviewClass | null {
  if (loss >= 300) return "blunder";
  if (loss >= 150) return "mistake";
  if (loss >= 70) return "inaccuracy";
  return null;
}

/** Short praise for a good move (empty when it doesn't merit a callout). */
export function praiseFor(loss: number): string {
  return loss <= 20 ? "Best move ✓" : loss <= 70 ? "Good move ✓" : "";
}
