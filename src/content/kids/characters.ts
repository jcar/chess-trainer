// The cast of "Pip & the Grey" — the characters who guide a child through the
// kids module. Each has a distinct synthesized VOICE (Web Speech pitch/rate, see
// lib/audio/speech.ts → speakAs) and an accent COLOR used for name chips and
// portrait theming (components/kids/CharacterPortrait). Pure data — no imports,
// so both the content layer (types.ts) and the UI can depend on it freely.
//
// Story: the Kingdom of Sixty-Four was drained to grey and its pieces put to
// sleep by "the Grey". Pip — the smallest pawn — wakes them one by one, each
// teaching its move, restoring color land by land, chased by the trickster
// magpie Murk. The child is "the Caller".

export type CharacterId =
  | "pip"
  | "rookwell"
  | "belle"
  | "nim"
  | "aurora"
  | "cedric"
  | "murk"
  | "caller";

export interface Character {
  id: CharacterId;
  /** Display name shown on the dialogue name chip. */
  name: string;
  /** Short in-fiction role, e.g. "the rook". */
  role: string;
  /**
   * Web Speech voice shaping. pitch and rate are both in the API's 0.1–2 range;
   * we keep them spread enough to feel like different characters but never so
   * extreme they stop sounding friendly.
   */
  voice: { pitch: number; rate: number };
  /** Accent color (hex) — name chips, portrait tint, map markers. */
  color: string;
}

export const CHARACTERS: Record<CharacterId, Character> = {
  pip: {
    id: "pip",
    name: "Pip",
    role: "the smallest pawn",
    voice: { pitch: 1.35, rate: 0.95 },
    color: "#16959c",
  },
  rookwell: {
    id: "rookwell",
    name: "Sir Rookwell",
    role: "the brave rook",
    voice: { pitch: 0.7, rate: 0.82 },
    color: "#b45309",
  },
  belle: {
    id: "belle",
    name: "Bishop Belle",
    role: "the wise bishop",
    voice: { pitch: 1.15, rate: 0.88 },
    color: "#7c3aed",
  },
  nim: {
    id: "nim",
    name: "Nim",
    role: "the leaping knight",
    voice: { pitch: 1.5, rate: 1.12 },
    color: "#0ea5e9",
  },
  aurora: {
    id: "aurora",
    name: "Queen Aurora",
    role: "the shining queen",
    voice: { pitch: 1.0, rate: 0.9 },
    color: "#db2777",
  },
  cedric: {
    id: "cedric",
    name: "King Cedric",
    role: "the sleeping king",
    voice: { pitch: 0.65, rate: 0.8 },
    color: "#a16207",
  },
  murk: {
    id: "murk",
    name: "Murk",
    // Low + quick + sly — deliberately far from Pip's high, slow voice so a
    // child can instantly tell the trickster apart (same browser voice, only
    // pitch/rate differ, so the spread has to be wide to read as a new speaker).
    role: "the trickster magpie",
    voice: { pitch: 0.55, rate: 1.12 },
    color: "#475569",
  },
  caller: {
    id: "caller",
    name: "You",
    role: "the Caller",
    voice: { pitch: 1.08, rate: 0.92 },
    color: "#0f766e",
  },
};

export function getCharacter(id: CharacterId): Character {
  return CHARACTERS[id];
}

export function isKnownCharacter(id: string): id is CharacterId {
  return id in CHARACTERS;
}
