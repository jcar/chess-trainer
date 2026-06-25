// Unlockable cosmetics for the kids module — board color themes and Pip outfits
// earned with stars / belts. Pure definitions + unlock predicates; the chosen
// ids live in the kids-prefs store and are applied via CSS vars (board) and an
// accessory overlay (Pip). Custom piece sets are intentionally deferred.

export interface CosmeticCtx {
  totalStars: number;
  beltIndex: number;
}

export interface BoardTheme {
  id: string;
  name: string;
  light: string;
  dark: string;
  unlock: (c: CosmeticCtx) => boolean;
  /** Human requirement shown on locked items. */
  req: string;
}

export interface PipOutfit {
  id: string;
  name: string;
  /** Emoji accessory shown on Pip (empty for the default). */
  accessory: string;
  unlock: (c: CosmeticCtx) => boolean;
  req: string;
}

export const BOARD_THEMES: BoardTheme[] = [
  { id: "classic", name: "Classic Blue", light: "#e6ecf5", dark: "#7c93b5", unlock: () => true, req: "" },
  {
    id: "forest",
    name: "Forest",
    light: "#eef6e7",
    dark: "#7fa663",
    unlock: (c) => c.totalStars >= 8,
    req: "8 stars",
  },
  {
    id: "ocean",
    name: "Ocean",
    light: "#e3f6f8",
    dark: "#5fb0c0",
    unlock: (c) => c.beltIndex >= 2,
    req: "Orange Belt",
  },
  {
    id: "candy",
    name: "Candy",
    light: "#ffeef6",
    dark: "#e8a0c3",
    unlock: (c) => c.totalStars >= 20,
    req: "20 stars",
  },
  {
    id: "sunset",
    name: "Sunset",
    light: "#fff0e0",
    dark: "#e0975a",
    unlock: (c) => c.totalStars >= 35,
    req: "35 stars",
  },
  {
    id: "midnight",
    name: "Midnight",
    light: "#cbd5e1",
    dark: "#475569",
    unlock: (c) => c.beltIndex >= 4,
    req: "Blue Belt",
  },
];

export const PIP_OUTFITS: PipOutfit[] = [
  { id: "default", name: "Pip", accessory: "", unlock: () => true, req: "" },
  {
    id: "party",
    name: "Party Pip",
    accessory: "🎉",
    unlock: (c) => c.beltIndex >= 1,
    req: "Yellow Belt",
  },
  {
    id: "super",
    name: "Super Pip",
    accessory: "⭐",
    unlock: (c) => c.totalStars >= 12,
    req: "12 stars",
  },
  {
    id: "wizard",
    name: "Wizard Pip",
    accessory: "🎩",
    unlock: (c) => c.totalStars >= 28,
    req: "28 stars",
  },
  {
    id: "royal",
    name: "Royal Pip",
    accessory: "👑",
    unlock: (c) => c.beltIndex >= 5,
    req: "Black Belt",
  },
];

export function getBoardTheme(id: string): BoardTheme {
  return BOARD_THEMES.find((t) => t.id === id) ?? BOARD_THEMES[0];
}

export function getPipOutfit(id: string): PipOutfit {
  return PIP_OUTFITS.find((o) => o.id === id) ?? PIP_OUTFITS[0];
}
