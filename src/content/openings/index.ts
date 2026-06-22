// Opening registry + helpers that DERIVE module activities from the shared
// opening data. The "Chess Openings" module builds its guided replays and
// guess-the-move drills with these helpers, and the future standalone openings
// trainer reads the same `OPENINGS` — one source of truth for the moves.

import type {
  ReplayActivity,
  OpeningDrillActivity,
  ConceptActivity,
  Orientation,
} from "../types";
import type { Opening, LearnerColor } from "./types";
import { italianGame } from "./italian-game";
import { ruyLopez } from "./ruy-lopez";
import { scotchGame } from "./scotch-game";
import { sicilianDefence } from "./sicilian-defence";
import { frenchDefence } from "./french-defence";
import { caroKann } from "./caro-kann";
import { queensGambitDeclined } from "./queens-gambit-declined";
import { slavDefence } from "./slav-defence";
import { kingsIndian } from "./kings-indian";
import { nimzoIndian } from "./nimzo-indian";
import { londonSystem } from "./london-system";
import { englishOpening } from "./english-opening";
import { fourKnights } from "./four-knights";
import { petroff } from "./petroff";
import { kingsGambit } from "./kings-gambit";
import { scandinavian } from "./scandinavian";
import { alekhine } from "./alekhine";
import { pirc } from "./pirc";
import { queensGambitAccepted } from "./queens-gambit-accepted";
import { semiSlav } from "./semi-slav";
import { queensIndian } from "./queens-indian";
import { bogoIndian } from "./bogo-indian";
import { grunfeld } from "./grunfeld";
import { benoni } from "./benoni";
import { benkoGambit } from "./benko-gambit";
import { dutchDefence } from "./dutch-defence";
import { reti } from "./reti";
import { larsen } from "./larsen";
import { viennaGame } from "./vienna-game";
import { alapinSicilian } from "./alapin-sicilian";
import { queensGambit } from "./queens-gambit";

// Ordered by family: 1.e4 e5 → other 1.e4 → 1.d4 → flank.
export const OPENINGS: Opening[] = [
  // 1.e4 e5 — the Open Games
  italianGame,
  ruyLopez,
  scotchGame,
  fourKnights,
  petroff,
  kingsGambit,
  viennaGame,
  // Other 1.e4 defences
  sicilianDefence,
  alapinSicilian,
  frenchDefence,
  caroKann,
  scandinavian,
  alekhine,
  pirc,
  // 1.d4 openings
  queensGambitDeclined,
  slavDefence,
  kingsIndian,
  nimzoIndian,
  londonSystem,
  queensGambit,
  queensGambitAccepted,
  semiSlav,
  queensIndian,
  bogoIndian,
  grunfeld,
  benoni,
  benkoGambit,
  dutchDefence,
  // Flank
  englishOpening,
  reti,
  larsen,
];

export function getOpening(id: string): Opening | undefined {
  return OPENINGS.find((o) => o.id === id);
}

/**
 * Build a short "concept" teaching card from an opening's existing data, so each
 * opening lesson can OPEN with the big idea (character + both sides' plans + the
 * tabiya diagram) before stepping through moves.
 */
export function buildConcept(o: Opening): ConceptActivity {
  return {
    type: "concept",
    id: `${o.id}-concept`,
    title: "The big idea",
    blurb: `What the ${o.name} is really about.`,
    body: o.character,
    points: [
      `White's plan: ${o.whitePlan}`,
      `Black's plan: ${o.blackPlan}`,
    ],
    diagrams: [
      {
        fen: o.tabiyaFen,
        orientation: o.trainerColor,
        caption: `After ${o.firstMoves}`,
      },
    ],
  };
}

/** Build a guided replay from one of an opening's lines (moves come from data). */
export function buildReplay(
  o: Opening,
  opts: {
    id: string;
    title: string;
    intro: string;
    blurb?: string;
    lineIdx?: number;
    orientation?: Orientation;
  },
): ReplayActivity {
  const line = o.lines[opts.lineIdx ?? 0];
  return {
    type: "replay",
    id: opts.id,
    title: opts.title,
    blurb: opts.blurb,
    startFen: line.startFen,
    orientation: opts.orientation ?? "white",
    intro: opts.intro,
    steps: line.sans.map((san, i) => ({ san, note: line.notes?.[i] ?? "" })),
  };
}

/** Build a guess-the-move drill from one of an opening's lines. */
export function buildOpeningDrill(
  o: Opening,
  opts: {
    id: string;
    title: string;
    learnerColor: LearnerColor;
    intro: string;
    successText: string;
    blurb?: string;
    lineIdx?: number;
    orientation?: Orientation;
  },
): OpeningDrillActivity {
  const line = o.lines[opts.lineIdx ?? 0];
  return {
    type: "openingDrill",
    id: opts.id,
    title: opts.title,
    blurb: opts.blurb,
    startFen: line.startFen,
    orientation: opts.orientation ?? opts.learnerColor,
    line: line.sans,
    learnerColor: opts.learnerColor,
    intro: opts.intro,
    successText: opts.successText,
    notes: line.notes,
  };
}

export type { Opening } from "./types";
