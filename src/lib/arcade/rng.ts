// Seeded RNG for the arcade — deterministic so a "daily" seed gives everyone the
// same gauntlet. Pure; safe in the browser (Math.random / new Date are fine at
// runtime — only the workflow build scripts forbid them).

/** A fast, seedable PRNG (mulberry32). Returns a function yielding [0,1). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** FNV-1a 32-bit hash of a string → uint32 seed. */
export function hashStr(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Today's seed (local date) — the same all day so a Daily Run is shareable. */
export function dailySeed(): number {
  const d = new Date();
  return hashStr(`gauntlet-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
}

/** A fresh random seed for Free Play. */
export function randomSeed(): number {
  return (Math.floor(Math.random() * 0xffffffff) >>> 0) || 1;
}

/** Today's date as a short label, e.g. "Jun 27". */
export function dailyLabel(): string {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
