// Recommendation traits for each opening in the catalog.
//
// These live here, NOT in `src/content/openings/types.ts`, on purpose: they are
// tunable opinions used only by the Chooser, whereas `Opening` is shared with
// the modules layer and `scripts/validate-content.ts`. Keeping them apart means
// re-tuning a recommendation never touches curriculum content, and one 31-row
// table reviews in a single screen.

import { OPENINGS } from "@/content/openings";

/**
 * A repertoire slot: a decision the learner has to make once. White's first
 * move is NOT a slot — it's derived from which White slots get filled, so the
 * plan can never recommend "1.e4" and the London in the same breath.
 */
export type SlotId =
  | "w-vs-e5"
  | "w-vs-sicilian"
  | "w-vs-french"
  | "w-vs-caro"
  | "w-vs-scandi"
  | "w-vs-alekhine"
  | "w-vs-pirc"
  | "w-vs-d5"
  | "w-vs-indian"
  | "b-vs-e4"
  | "b-vs-d4"
  | "b-vs-flank";

export type FirstMove = "e4" | "d4" | "c4" | "Nf3" | "b3";

export interface SlotMeta {
  id: SlotId;
  label: string;
  /** What the opponent has just done — the question this slot answers. */
  prompt: string;
  color: "white" | "black";
  /** SAN moves leading to the position this slot answers. */
  prefix: string[];
}

export const SLOTS: Record<SlotId, SlotMeta> = {
  "w-vs-e5": { id: "w-vs-e5", label: "vs 1...e5", prompt: "They answer 1.e4 with 1...e5", color: "white", prefix: ["e4", "e5"] },
  "w-vs-sicilian": { id: "w-vs-sicilian", label: "vs the Sicilian", prompt: "They play 1...c5", color: "white", prefix: ["e4", "c5"] },
  "w-vs-french": { id: "w-vs-french", label: "vs the French", prompt: "They play 1...e6", color: "white", prefix: ["e4", "e6"] },
  "w-vs-caro": { id: "w-vs-caro", label: "vs the Caro-Kann", prompt: "They play 1...c6", color: "white", prefix: ["e4", "c6"] },
  "w-vs-scandi": { id: "w-vs-scandi", label: "vs the Scandinavian", prompt: "They play 1...d5", color: "white", prefix: ["e4", "d5"] },
  "w-vs-alekhine": { id: "w-vs-alekhine", label: "vs the Alekhine", prompt: "They play 1...Nf6", color: "white", prefix: ["e4", "Nf6"] },
  "w-vs-pirc": { id: "w-vs-pirc", label: "vs the Pirc/Modern", prompt: "They play 1...d6", color: "white", prefix: ["e4", "d6"] },
  "w-vs-d5": { id: "w-vs-d5", label: "vs 1...d5", prompt: "They meet your queen's-pawn opening with 1...d5", color: "white", prefix: ["d4", "d5"] },
  "w-vs-indian": { id: "w-vs-indian", label: "vs 1...Nf6", prompt: "They play an Indian defence with 1...Nf6", color: "white", prefix: ["d4", "Nf6"] },
  "b-vs-e4": { id: "b-vs-e4", label: "vs 1.e4", prompt: "They open 1.e4", color: "black", prefix: ["e4"] },
  "b-vs-d4": { id: "b-vs-d4", label: "vs 1.d4", prompt: "They open 1.d4", color: "black", prefix: ["d4"] },
  "b-vs-flank": { id: "b-vs-flank", label: "vs flank openings", prompt: "They open 1.c4, 1.Nf3 or 1.b3", color: "black", prefix: [] },
};

/** Which slots each first move commits you to covering. */
export const SLOTS_FOR_FIRST_MOVE: Record<FirstMove, SlotId[]> = {
  e4: ["w-vs-e5", "w-vs-sicilian", "w-vs-french", "w-vs-caro", "w-vs-scandi", "w-vs-alekhine", "w-vs-pirc"],
  d4: ["w-vs-d5", "w-vs-indian"],
  c4: ["w-vs-d5", "w-vs-indian"],
  Nf3: ["w-vs-d5", "w-vs-indian"],
  b3: ["w-vs-d5", "w-vs-indian"],
};

export type Structure = "open" | "closed" | "iqp" | "fianchetto" | "pawn-chain";

export interface OpeningTraits {
  id: string;
  slots: SlotId[];
  /**
   * For WHITE openings: which first moves this can be played from. Without it a
   * plan could say "you open 1.c4" and then fill "vs 1...d5" with a Queen's
   * Gambit line that 1.c4 never reaches. Omitted for Black openings, which are
   * eligible whatever White does.
   */
  firstMoves?: FirstMove[];
  /** 1 = slow positional squeeze … 5 = sharp, tactical, attacking. */
  tension: 1 | 2 | 3 | 4 | 5;
  /** 1 = a page of moves … 5 = a genuine theoretical burden. */
  theoryLoad: 1 | 2 | 3 | 4 | 5;
  /** A set-up you can play against almost anything, rather than a branching tree. */
  systemic: boolean;
  structure: Structure;
  /** Plays for imbalance and counterattack rather than equality. */
  counterattack: boolean;
}

export const TRAITS: OpeningTraits[] = [
  // 1.e4 e5 — the Open Games
  { id: "italian-game", slots: ["w-vs-e5", "b-vs-e4"], firstMoves: ["e4"], tension: 3, theoryLoad: 3, systemic: false, structure: "open", counterattack: false },
  { id: "ruy-lopez", slots: ["w-vs-e5", "b-vs-e4"], firstMoves: ["e4"], tension: 3, theoryLoad: 5, systemic: false, structure: "open", counterattack: false },
  { id: "scotch-game", slots: ["w-vs-e5"], firstMoves: ["e4"], tension: 4, theoryLoad: 3, systemic: false, structure: "open", counterattack: false },
  { id: "four-knights", slots: ["w-vs-e5"], firstMoves: ["e4"], tension: 2, theoryLoad: 2, systemic: false, structure: "open", counterattack: false },
  { id: "petroff", slots: ["b-vs-e4"], tension: 1, theoryLoad: 3, systemic: false, structure: "open", counterattack: false },
  { id: "kings-gambit", slots: ["w-vs-e5"], firstMoves: ["e4"], tension: 5, theoryLoad: 4, systemic: false, structure: "open", counterattack: true },
  { id: "vienna-game", slots: ["w-vs-e5"], firstMoves: ["e4"], tension: 4, theoryLoad: 2, systemic: false, structure: "open", counterattack: false },

  // Other 1.e4 defences
  { id: "sicilian-defence", slots: ["w-vs-sicilian", "b-vs-e4"], firstMoves: ["e4"], tension: 5, theoryLoad: 5, systemic: false, structure: "open", counterattack: true },
  { id: "alapin-sicilian", slots: ["w-vs-sicilian"], firstMoves: ["e4"], tension: 2, theoryLoad: 2, systemic: true, structure: "iqp", counterattack: false },
  { id: "french-defence", slots: ["w-vs-french", "b-vs-e4"], firstMoves: ["e4"], tension: 3, theoryLoad: 4, systemic: false, structure: "pawn-chain", counterattack: true },
  { id: "caro-kann", slots: ["w-vs-caro", "b-vs-e4"], firstMoves: ["e4"], tension: 2, theoryLoad: 3, systemic: false, structure: "pawn-chain", counterattack: false },
  { id: "scandinavian", slots: ["w-vs-scandi", "b-vs-e4"], firstMoves: ["e4"], tension: 2, theoryLoad: 1, systemic: true, structure: "open", counterattack: false },
  { id: "alekhine", slots: ["w-vs-alekhine", "b-vs-e4"], firstMoves: ["e4"], tension: 4, theoryLoad: 3, systemic: false, structure: "open", counterattack: true },
  { id: "pirc", slots: ["w-vs-pirc", "b-vs-e4"], firstMoves: ["e4"], tension: 4, theoryLoad: 3, systemic: true, structure: "fianchetto", counterattack: true },

  // 1.d4
  { id: "queens-gambit", slots: ["w-vs-d5", "w-vs-indian"], firstMoves: ["d4"], tension: 3, theoryLoad: 4, systemic: false, structure: "closed", counterattack: false },
  { id: "queens-gambit-declined", slots: ["b-vs-d4"], tension: 2, theoryLoad: 4, systemic: false, structure: "closed", counterattack: false },
  { id: "queens-gambit-accepted", slots: ["b-vs-d4"], tension: 3, theoryLoad: 3, systemic: false, structure: "open", counterattack: false },
  { id: "slav-defence", slots: ["b-vs-d4"], tension: 2, theoryLoad: 4, systemic: false, structure: "closed", counterattack: false },
  { id: "semi-slav", slots: ["b-vs-d4"], tension: 4, theoryLoad: 5, systemic: false, structure: "closed", counterattack: true },
  { id: "kings-indian", slots: ["b-vs-d4", "b-vs-flank"], tension: 5, theoryLoad: 4, systemic: true, structure: "fianchetto", counterattack: true },
  { id: "nimzo-indian", slots: ["b-vs-d4"], tension: 3, theoryLoad: 4, systemic: false, structure: "iqp", counterattack: false },
  { id: "queens-indian", slots: ["b-vs-d4"], tension: 2, theoryLoad: 3, systemic: false, structure: "fianchetto", counterattack: false },
  { id: "bogo-indian", slots: ["b-vs-d4"], tension: 2, theoryLoad: 2, systemic: false, structure: "closed", counterattack: false },
  { id: "grunfeld", slots: ["b-vs-d4"], tension: 5, theoryLoad: 5, systemic: false, structure: "fianchetto", counterattack: true },
  { id: "benoni", slots: ["b-vs-d4"], tension: 5, theoryLoad: 4, systemic: false, structure: "closed", counterattack: true },
  { id: "benko-gambit", slots: ["b-vs-d4"], tension: 4, theoryLoad: 3, systemic: true, structure: "fianchetto", counterattack: true },
  { id: "dutch-defence", slots: ["b-vs-d4"], tension: 4, theoryLoad: 3, systemic: true, structure: "closed", counterattack: true },
  { id: "london-system", slots: ["w-vs-d5", "w-vs-indian"], firstMoves: ["d4"], tension: 1, theoryLoad: 1, systemic: true, structure: "closed", counterattack: false },

  // Flank
  { id: "english-opening", slots: ["w-vs-d5", "w-vs-indian", "b-vs-flank"], firstMoves: ["c4"], tension: 2, theoryLoad: 3, systemic: true, structure: "fianchetto", counterattack: false },
  { id: "reti", slots: ["w-vs-d5", "w-vs-indian", "b-vs-flank"], firstMoves: ["Nf3"], tension: 2, theoryLoad: 3, systemic: true, structure: "fianchetto", counterattack: false },
  // Larsen fills the White flank slots only: as a BLACK answer to flank openings
  // the King's Indian / English / Réti files carry the replies that matter.
  { id: "larsen", slots: ["w-vs-d5", "w-vs-indian"], firstMoves: ["b3"], tension: 3, theoryLoad: 1, systemic: true, structure: "fianchetto", counterattack: false },
];

const BY_ID = new Map(TRAITS.map((t) => [t.id, t]));

export function traitsFor(openingId: string): OpeningTraits | undefined {
  return BY_ID.get(openingId);
}

/**
 * Every opening that can fill a slot. `firstMoves` constrains an opening's WHITE
 * role only, so it is applied to White slots alone — an opening like the
 * Caro-Kann is White-eligible only after 1.e4, but stays a Black defence to
 * 1.e4 no matter what the learner opens with.
 */
export function candidatesFor(slot: SlotId, firstMove?: FirstMove): OpeningTraits[] {
  const isWhiteSlot = SLOTS[slot].color === "white";
  return TRAITS.filter(
    (t) =>
      t.slots.includes(slot) &&
      (!isWhiteSlot || !firstMove || !t.firstMoves || t.firstMoves.includes(firstMove)),
  );
}

/** Which first move an opening implies for White (used to derive the plan's opener). */
export function firstMoveFor(openingId: string): FirstMove | null {
  switch (openingId) {
    case "english-opening":
      return "c4";
    case "reti":
      return "Nf3";
    case "larsen":
      return "b3";
    case "queens-gambit":
    case "london-system":
      return "d4";
    default:
      return null;
  }
}

/** Dev guard: every trait row points at a real opening, and vice versa. */
export function traitCoverageErrors(): string[] {
  const errors: string[] = [];
  const known = new Set(OPENINGS.map((o) => o.id));
  for (const t of TRAITS) {
    if (!known.has(t.id)) errors.push(`traits row for unknown opening "${t.id}"`);
  }
  for (const o of OPENINGS) {
    if (!BY_ID.has(o.id)) errors.push(`opening "${o.id}" has no traits row`);
  }
  return errors;
}
