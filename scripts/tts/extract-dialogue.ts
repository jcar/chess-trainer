// Extract every character-dialogue line from the kids module into a manifest the
// TTS generator renders. Walks the assembled module (scenes' lines + each
// activity's dialogue.intro/onCorrect/onWrong), keys each line by content
// (dialogueKey — the SAME function the app uses), and dedupes so a repeated line
// becomes one clip. Pure data import; no API key needed. Run: `npm run tts:extract`.

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chessForKids } from "../../src/content/modules/chess-for-kids";
import { CHARACTERS } from "../../src/content/kids/characters";
import { dialogueKey } from "../../src/lib/audio/dialogueKey";
import type { DialogueLine } from "../../src/content/types";

interface Entry {
  key: string;
  speaker: string;
  voice: string;
  mood: string;
  text: string;
}

const lines: DialogueLine[] = [];
for (const lesson of chessForKids.lessons) {
  for (const a of lesson.activities) {
    if (a.type === "scene") lines.push(...a.lines);
    if (a.dialogue) {
      for (const d of [a.dialogue.intro, a.dialogue.onCorrect, a.dialogue.onWrong]) {
        if (d) lines.push(d);
      }
    }
  }
}

const byKey = new Map<string, Entry>();
for (const l of lines) {
  const key = dialogueKey(l.speaker, l.text);
  if (!byKey.has(key)) {
    byKey.set(key, {
      key,
      speaker: l.speaker,
      voice: CHARACTERS[l.speaker].geminiVoice,
      mood: l.mood ?? "idle",
      text: l.text,
    });
  }
}

const manifest = [...byKey.values()].sort((a, b) => a.key.localeCompare(b.key));
const outPath = join(dirname(fileURLToPath(import.meta.url)), "manifest.json");
writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(
  `Extracted ${manifest.length} unique dialogue lines (from ${lines.length} total) → ${outPath}`,
);
