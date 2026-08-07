// The Repertoire Chooser: five questions -> a coherent two-colour repertoire.
//
// Same shape as `lib/learner/placement.ts` (item bank + a pure scoring function
// + a persisted result) except there are no right answers — each option carries
// a trait vector, and scoring picks the opening in each slot that sits closest
// to the learner's stated preferences.

import { getOpening } from "@/content/openings";
import {
  SLOTS,
  SLOTS_FOR_FIRST_MOVE,
  candidatesFor,
  firstMoveFor,
  traitsFor,
  type FirstMove,
  type OpeningTraits,
  type SlotId,
  type Structure,
} from "./traits";

/** What an answer says about the learner's taste. All fields optional. */
export interface TraitPull {
  tension?: number;
  theoryLoad?: number;
  systemic?: boolean;
  counterattack?: boolean;
  structure?: Structure;
  /** Forces White's first move (question 3). */
  firstMove?: FirstMove | "any";
  /** Restricts the candidate pool for one slot (questions 4 and 5). */
  prefer?: { slot: SlotId; ids: string[] };
}

export interface ChooserOption {
  label: string;
  detail?: string;
  pull: TraitPull;
}

export interface ChooserItem {
  id: string;
  question: string;
  help?: string;
  options: ChooserOption[];
}

export const CHOOSER_ITEMS: ChooserItem[] = [
  {
    id: "style",
    question: "What kind of game do you actually want?",
    help: "Not what you admire — what you enjoy playing at 10pm on a Tuesday.",
    options: [
      {
        label: "Sharp, attacking games",
        detail: "Open lines, sacrifices, both kings in danger.",
        pull: { tension: 5, counterattack: true, structure: "open" },
      },
      {
        label: "A slow positional squeeze",
        detail: "Small edges, good pieces, grind them down.",
        pull: { tension: 1, counterattack: false, structure: "closed" },
      },
      {
        label: "The same setup every time",
        detail: "One structure you know cold, whatever they play.",
        pull: { tension: 2, systemic: true, theoryLoad: 1 },
      },
    ],
  },
  {
    id: "theory",
    question: "How much theory will you really memorize?",
    help: "Be honest — an unlearned repertoire is worse than a modest one.",
    options: [
      { label: "About a page", detail: "Give me ideas, not variations.", pull: { theoryLoad: 1, systemic: true } },
      { label: "A solid chapter", detail: "I'll learn main lines to move 10 or so.", pull: { theoryLoad: 3 } },
      { label: "Whatever it takes", detail: "I want the critical lines, theory and all.", pull: { theoryLoad: 5 } },
    ],
  },
  {
    id: "first-move",
    question: "As White, what do you want to open with?",
    options: [
      { label: "1.e4", detail: "Open games, faster development, more forcing play.", pull: { firstMove: "e4" } },
      { label: "1.d4", detail: "Queen's-pawn structures, a longer strategic game.", pull: { firstMove: "d4" } },
      { label: "A flank opening", detail: "1.c4 or 1.Nf3 — flexible, transposition-rich.", pull: { firstMove: "c4" } },
      { label: "You decide", detail: "Pick whatever fits my answers above.", pull: { firstMove: "any" } },
    ],
  },
  {
    id: "vs-e4",
    question: "Against 1.e4 as Black, what's your instinct?",
    options: [
      {
        label: "Fight for the imbalance",
        detail: "Unbalance it early and play for a win.",
        pull: { prefer: { slot: "b-vs-e4", ids: ["sicilian-defence", "alekhine", "pirc"] }, counterattack: true },
      },
      {
        label: "Build something solid",
        detail: "A sound structure, no early weaknesses.",
        pull: { prefer: { slot: "b-vs-e4", ids: ["caro-kann", "french-defence", "scandinavian"] }, tension: 2 },
      },
      {
        label: "Mirror them with 1...e5",
        detail: "Classical development, an open game.",
        pull: { prefer: { slot: "b-vs-e4", ids: ["ruy-lopez", "italian-game", "petroff"] }, structure: "open" },
      },
    ],
  },
  {
    id: "vs-d4",
    question: "And against 1.d4?",
    options: [
      {
        label: "Fianchetto and counterattack",
        detail: "Let them build a centre, then break it.",
        pull: { prefer: { slot: "b-vs-d4", ids: ["kings-indian", "grunfeld", "benko-gambit"] }, structure: "fianchetto", counterattack: true },
      },
      {
        label: "Classical ...d5",
        detail: "Meet the centre head-on and stay solid.",
        pull: { prefer: { slot: "b-vs-d4", ids: ["queens-gambit-declined", "slav-defence", "semi-slav"] }, structure: "closed" },
      },
      {
        label: "Piece pressure, not pawns",
        detail: "Pin, provoke, and fight for the light squares.",
        pull: { prefer: { slot: "b-vs-d4", ids: ["nimzo-indian", "queens-indian", "bogo-indian"] }, tension: 3 },
      },
    ],
  },
];

/** The learner's taste, accumulated from their answers. */
interface Profile {
  tension: number;
  theoryLoad: number;
  systemic: number; // -1 … 1
  counterattack: number; // -1 … 1
  structures: Structure[];
  firstMove: FirstMove | "any";
  prefer: Map<SlotId, string[]>;
}

function buildProfile(answers: Record<string, number>): Profile {
  const p: Profile = {
    tension: 3,
    theoryLoad: 3,
    systemic: 0,
    counterattack: 0,
    structures: [],
    firstMove: "any",
    prefer: new Map(),
  };
  for (const item of CHOOSER_ITEMS) {
    const choice = answers[item.id];
    const opt = item.options[choice];
    if (!opt) continue;
    const pull = opt.pull;
    if (pull.tension !== undefined) p.tension = pull.tension;
    if (pull.theoryLoad !== undefined) p.theoryLoad = pull.theoryLoad;
    if (pull.systemic !== undefined) p.systemic = pull.systemic ? 1 : -0.25;
    if (pull.counterattack !== undefined) p.counterattack = pull.counterattack ? 1 : -0.5;
    if (pull.structure) p.structures.push(pull.structure);
    if (pull.firstMove) p.firstMove = pull.firstMove;
    if (pull.prefer) p.prefer.set(pull.prefer.slot, pull.prefer.ids);
  }
  return p;
}

/** Weighted distance from an opening to the learner's profile — lower is better. */
function distance(t: OpeningTraits, p: Profile, slot: SlotId): number {
  let d = 0;
  d += Math.abs(t.tension - p.tension) * 1.0;
  // Theory load is asymmetric: recommending MORE theory than someone will learn
  // is the failure that kills repertoires, so overshoot costs double.
  const theoryGap = t.theoryLoad - p.theoryLoad;
  d += theoryGap > 0 ? theoryGap * 2.0 : Math.abs(theoryGap) * 0.6;
  if (p.systemic > 0) d += t.systemic ? -1.2 : 0.8;
  if (p.counterattack > 0) d += t.counterattack ? -0.8 : 0.6;
  else if (p.counterattack < 0) d += t.counterattack ? 0.6 : -0.4;
  if (p.structures.includes(t.structure)) d -= 0.8;
  // An explicit "against 1.e4 I want X" beats every soft preference.
  const preferred = p.prefer.get(slot);
  if (preferred) d += preferred.includes(t.id) ? -6 + preferred.indexOf(t.id) * 0.4 : 2.5;
  // Nudge toward the curated starter set when two openings otherwise tie.
  if (getOpening(t.id)?.tier === "core") d -= 0.3;
  return d;
}

export interface SlotChoice {
  slot: SlotId;
  label: string;
  prompt: string;
  openingId: string;
  openingName: string;
  /** Plain-language reason, generated from the traits that actually matched. */
  why: string;
  /** How clearly this beat the runner-up. */
  confidence: "strong" | "fair" | "close";
}

export interface RepertoirePlan {
  firstMove: FirstMove;
  slots: SlotChoice[];
  /** Slots with no candidate in the library (should be none — surfaced honestly). */
  uncovered: SlotId[];
  white: string[];
  black: string[];
}

function reasonFor(t: OpeningTraits, p: Profile): string {
  const bits: string[] = [];
  if (t.systemic && p.systemic > 0) bits.push("one setup against almost anything");
  if (t.theoryLoad <= 2) bits.push("very little theory to memorize");
  else if (t.theoryLoad >= 5 && p.theoryLoad >= 5) bits.push("the critical main lines you asked for");
  if (t.tension >= 4 && p.tension >= 4) bits.push("sharp, attacking play");
  if (t.tension <= 2 && p.tension <= 2) bits.push("a slow positional game");
  if (t.counterattack && p.counterattack > 0) bits.push("real winning chances with counterplay");
  if (p.structures.includes(t.structure)) bits.push(`the ${t.structure.replace("-", " ")} structures you prefer`);
  if (bits.length === 0) bits.push("the best fit in the library for your answers");
  return bits.slice(0, 2).join(", ");
}

/** Resolve White's first move: an explicit answer wins; "any" follows the style. */
function pickFirstMove(p: Profile): FirstMove {
  if (p.firstMove !== "any") return p.firstMove;
  if (p.systemic > 0 && p.theoryLoad <= 2) return "d4"; // the London route
  if (p.tension >= 4) return "e4";
  return "d4";
}

export function scoreRepertoire(answers: Record<string, number>): RepertoirePlan {
  const p = buildProfile(answers);
  const firstMove = pickFirstMove(p);

  const wanted: SlotId[] = [
    ...SLOTS_FOR_FIRST_MOVE[firstMove],
    "b-vs-e4",
    "b-vs-d4",
    "b-vs-flank",
  ];

  const slots: SlotChoice[] = [];
  const uncovered: SlotId[] = [];

  for (const slot of wanted) {
    const ranked = candidatesFor(slot, firstMove)
      .map((t) => ({ t, d: distance(t, p, slot) }))
      .sort((a, b) => a.d - b.d);
    if (ranked.length === 0) {
      uncovered.push(slot);
      continue;
    }
    const best = ranked[0];
    const gap = ranked.length > 1 ? ranked[1].d - best.d : 99;
    const opening = getOpening(best.t.id);
    slots.push({
      slot,
      label: SLOTS[slot].label,
      prompt: SLOTS[slot].prompt,
      openingId: best.t.id,
      openingName: opening?.name ?? best.t.id,
      why: reasonFor(best.t, p),
      confidence: gap >= 2 ? "strong" : gap >= 0.8 ? "fair" : "close",
    });
  }

  const white = new Set<string>();
  const black = new Set<string>();
  for (const s of slots) {
    (SLOTS[s.slot].color === "white" ? white : black).add(s.openingId);
  }

  // A flank first move needs its own opening in the repertoire so the tree has
  // the 1.c4 / 1.Nf3 / 1.b3 root at all — the slots it fills (vs ...d5 / ...Nf6)
  // are shared with 1.d4 and might have been won by a queen's-pawn opening.
  if (firstMove === "c4" || firstMove === "Nf3" || firstMove === "b3") {
    const root = ["english-opening", "reti", "larsen"].find(
      (id) => firstMoveFor(id) === firstMove,
    );
    if (root) white.add(root);
  }

  return {
    firstMove,
    slots,
    uncovered,
    white: [...white],
    black: [...black],
  };
}

/** Swap one slot's opening, keeping the rest of the plan intact. */
export function swapSlot(plan: RepertoirePlan, slot: SlotId, openingId: string): RepertoirePlan {
  const t = traitsFor(openingId);
  const opening = getOpening(openingId);
  if (!t || !opening) return plan;
  const slots = plan.slots.map((s) =>
    s.slot === slot
      ? { ...s, openingId, openingName: opening.name, why: "Your pick.", confidence: "strong" as const }
      : s,
  );
  const white = new Set<string>();
  const black = new Set<string>();
  for (const s of slots) (SLOTS[s.slot].color === "white" ? white : black).add(s.openingId);
  return { ...plan, slots, white: [...white], black: [...black] };
}

export const FIRST_MOVE_LABEL: Record<FirstMove, string> = {
  e4: "1.e4",
  d4: "1.d4",
  c4: "1.c4 (English)",
  Nf3: "1.Nf3 (Réti)",
  b3: "1.b3 (Larsen)",
};
