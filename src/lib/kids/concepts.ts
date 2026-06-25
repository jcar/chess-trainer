// Tags kid knowledge-check activities (quiz / sort / pictureQuiz / coordinate)
// with a CONCEPT id, so the shared Leitner SRS (lib/srs/store) can track which
// concepts a child has practiced — and missed. Pip's Challenge checkpoints read
// this to resurface a child's weak spots first. Concept SRS ids are namespaced
// ("kc:") so they never collide with tactics-puzzle ids in the same store.

const NS = "kc:";

/** Inner activity id → concept id. Only knowledge-check activities are tagged. */
export const CONCEPT_FOR_ACTIVITY: Record<string, string> = {
  // L1 — the board
  "find-squares": "coordinates",
  "light-or-dark": "square-colors",
  "which-piece": "piece-id",
  "how-many-squares": "board-size",
  // L2 / L3 — how the pieces move
  "rook-pattern": "rook-move",
  "knight-pattern": "knight-move",
  "pawn-capture-pic": "pawn-move",
  // L4 — capturing & values
  "most-valuable": "piece-values",
  "is-it-safe": "safe-capture",
  // L5 — check & checkmate
  "is-it-check": "check",
  "mate-or-stale-1": "mate-vs-stalemate",
  "mate-or-stale-2": "mate-vs-stalemate",
  // L6 — special moves
  "promotion-quiz": "promotion",
  // L7 — draws
  "stalemate-sort": "mate-vs-stalemate",
  "insufficient-sort": "draws",
  "dont-stalemate": "draws",
  "other-draws": "draws",
  // Playing smart — safety
  "smart-is-knight-safe": "safe-capture",
  "smart-is-it-safe-to-take": "safe-capture",
  "smart-attacked-what-do": "safe-capture",
  "smart-blunder-check": "blunder-check",
  "smart-routine": "blunder-check",
  // Good first moves — opening principles
  "gfm-which-first-move": "opening-principles",
  "gfm-good-opening": "opening-principles",
  "gfm-queen-early": "opening-principles",
  "gfm-castle-quiz": "opening-principles",
  // L9 — tricks
  "what-is-fork": "fork",
  "what-is-pin": "pin",
  "look-for-tricks": "tactic-spotting",
  // Trapping the king
  "trap-where": "trap-to-edge",
};

/** Friendly concept names (for checkpoint framing / progress copy). */
export const CONCEPT_LABELS: Record<string, string> = {
  coordinates: "Square names",
  "square-colors": "Light & dark squares",
  "piece-id": "Knowing the pieces",
  "board-size": "The board",
  "rook-move": "How the rook moves",
  "knight-move": "How the knight moves",
  "pawn-move": "How the pawn moves",
  "piece-values": "Piece values",
  "safe-capture": "Safe captures",
  check: "Check",
  "mate-vs-stalemate": "Checkmate vs stalemate",
  promotion: "Pawn promotion",
  draws: "Draws (ties)",
  "blunder-check": "Playing safe",
  "opening-principles": "Good first moves",
  fork: "Forks",
  pin: "Pins",
  "tactic-spotting": "Spotting tricks",
  "trap-to-edge": "Trapping the king",
};

export function conceptForActivity(activityId: string): string | undefined {
  return CONCEPT_FOR_ACTIVITY[activityId];
}

/** The SRS-store key for a concept (namespaced away from tactics ids). */
export function conceptSrsKey(conceptId: string): string {
  return `${NS}${conceptId}`;
}
