// Deterministic option shuffling for multiple-choice activities.
//
// Authored content tends to place the correct answer in the same slot (and make
// it the wordiest), which turns into a positional "tell" a child can game
// without learning. We shuffle option order at render time so the answer's
// position is unpredictable — but the order must be STABLE across re-renders and
// match between server and client (this app statically exports / hydrates), so
// the shuffle is seeded by the activity id rather than being random per render.
//
// Returns a permutation `order` where `order[displayPosition] = originalIndex`.

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * A deterministic permutation of `[0, count)` seeded by `seed`. Fisher–Yates
 * driven by a seeded PRNG, so the same (count, seed) always yields the same
 * order. Use the activity id as the seed.
 */
export function seededOrder(count: number, seed: string): number[] {
  const rand = mulberry32(hashString(seed));
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}
