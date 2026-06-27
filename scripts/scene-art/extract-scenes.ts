// Extract every story SCENE in the kids module into a manifest the image
// generator renders to a bespoke storybook illustration. Walks the assembled
// module (the same way tts/extract-dialogue does), and for each SceneActivity
// records its setting (backdrop), the cast present (distinct speakers in its
// lines), the title, and the dialogue beat. Pure data import; no API key needed.
// Run: `npm run art:extract`.
//
// Keying: the image filename stem is `${sceneId}-${hash}` where the hash covers
// the prompt-relevant inputs (backdrop + cast + title + lines). So editing a
// scene's meaning yields a new key → the generator re-renders just that scene and
// prunes the stale image; unchanged scenes are skipped. The app, however, looks
// images up by the STABLE sceneId (see src/lib/art/sceneManifest.ts).

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chessForKids } from "../../src/content/modules/chess-for-kids";
import { normalizeText } from "../../src/lib/audio/dialogueKey";
import type { DialogueLine, SceneActivity } from "../../src/content/types";

export interface SceneEntry {
  /** Stable scene id (e.g. "kids-l1-board-hook") — how the app looks up the image. */
  sceneId: string;
  /** Image filename stem: sceneId + content hash (changes when the scene changes). */
  key: string;
  backdrop: string;
  colorAmount: number;
  title: string;
  /** Distinct characters who speak in this scene (the viewer "caller" excluded). */
  cast: string[];
  lines: DialogueLine[];
}

/** FNV-1a 32-bit → base36 (same family as dialogueKey; inlined to stay generic). */
function fnv1a(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

const scenes: SceneActivity[] = [];
for (const lesson of chessForKids.lessons) {
  for (const a of lesson.activities) {
    if (a.type === "scene") scenes.push(a);
  }
}

const entries: SceneEntry[] = scenes.map((s) => {
  const cast: string[] = [];
  for (const l of s.lines) {
    if (l.speaker !== "caller" && !cast.includes(l.speaker)) cast.push(l.speaker);
  }
  const fingerprint = [
    s.backdrop,
    cast.join(","),
    normalizeText(s.title),
    s.lines.map((l) => `${l.speaker}:${l.mood ?? "idle"}:${normalizeText(l.text)}`).join("|"),
  ].join("§");
  return {
    sceneId: s.id,
    key: `${s.id}-${fnv1a(fingerprint)}`,
    backdrop: s.backdrop,
    colorAmount: s.colorAmount ?? 1,
    title: s.title,
    cast,
    lines: s.lines,
  };
});

entries.sort((a, b) => a.sceneId.localeCompare(b.sceneId));
const outPath = join(dirname(fileURLToPath(import.meta.url)), "manifest.json");
writeFileSync(outPath, JSON.stringify(entries, null, 2) + "\n");

const byBackdrop = entries.reduce<Record<string, number>>((m, e) => {
  m[e.backdrop] = (m[e.backdrop] ?? 0) + 1;
  return m;
}, {});
console.log(
  `Extracted ${entries.length} scenes → ${outPath}\n  by setting: ` +
    Object.entries(byBackdrop)
      .map(([k, n]) => `${k} ${n}`)
      .join(" · "),
);
