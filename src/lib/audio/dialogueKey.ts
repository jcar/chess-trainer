// Stable content-derived key for a character-dialogue line. Imported by BOTH the
// runtime (to look up a pre-generated audio clip) and the build scripts (to name
// the clip they generate), so a clip's identity comes purely from its content —
// no per-line wiring, and editing a line yields a new key (regenerated next run).
// Pure + dependency-free so the Node scripts can import it directly.

/** Trim and collapse internal whitespace so trivial spacing differences don't
 *  change the key (a wording change still does — and should regenerate). */
export function normalizeText(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

/** FNV-1a 32-bit hash → base36. Tiny and stable across Node and the browser. */
function fnv1a(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

/** Clip key for a line, e.g. "murk-1a2b3c". `speaker` is a CharacterId. */
export function dialogueKey(speaker: string, text: string): string {
  return `${speaker}-${fnv1a(normalizeText(text))}`;
}
