// Generate the character model sheets ("refs") that lock each cast member's look.
// These are INPUTS to scene generation (fed as reference images so Pip looks like
// Pip in all 40 scenes), not shipped assets — they live in scripts/scene-art/refs/.
// Run once and approve the cast look before the bulk scene run:
//   GEMINI_API_KEYS="<key>" npm run art:cast
// Incremental: skips a character whose ref already exists (delete it to redo one).

import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ImageGen, extFor } from "./gen";
import { APPEARANCES, STYLE_BIBLE } from "./prompts";

const here = dirname(fileURLToPath(import.meta.url));
const refsDir = join(here, "refs");

function refPrompt(appearance: string): string {
  return (
    `${STYLE_BIBLE}\n\n` +
    `Character model sheet: ${appearance}. ` +
    `Single character, friendly front-facing three-quarter pose, full body, full color, ` +
    `centered on a plain soft cream background, clear and well-lit so the design reads cleanly. ` +
    `This is a reference sheet to keep the character consistent across many illustrations.`
  );
}

async function main() {
  mkdirSync(refsDir, { recursive: true });
  const gen = new ImageGen();
  const ids = Object.keys(APPEARANCES);
  console.log(`Generating ${ids.length} character refs on the image model (${gen.keyCount} key(s)).\n`);

  let made = 0;
  let reused = 0;
  for (const id of ids) {
    const existing = readdirSync(refsDir).find((f) => f.startsWith(`${id}.`));
    if (existing) {
      reused++;
      continue;
    }
    const res = await gen.generate(refPrompt(APPEARANCES[id]));
    if (gen.capped) break;
    if (!res) {
      console.error(`✗ ${id}: no image returned`);
      continue;
    }
    const file = `${id}.${extFor(res.mime)}`;
    writeFileSync(join(refsDir, file), res.bytes);
    made++;
    console.log(`[${made + reused}/${ids.length}] ${gen.keyLabel} ✓ ${file} (${Math.round(res.bytes.length / 1024)}KB)`);
  }
  console.log(`\nDone: ${made} generated, ${reused} reused → ${refsDir}`);
}

void main();
