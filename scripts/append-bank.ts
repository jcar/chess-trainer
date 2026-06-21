// One-off: splice generator output (JSON) into src/content/tactics-bank.ts,
// appending before the closing `];`. Dedupes by FEN against existing entries.
// Usage: npx tsx scripts/append-bank.ts <gen.json>

import { readFileSync, writeFileSync } from "node:fs";

const jsonPath = process.argv[2];
const BANK = "src/content/tactics-bank.ts";

interface Entry {
  id: string;
  fen: string;
  orientation: string;
  solution: string[];
  goal:
    | { type: "mate"; inMoves: number }
    | { type: "win-material"; minGain: number };
  theme: string;
  difficulty: number;
  prompt: string;
}

const gen: Entry[] = JSON.parse(readFileSync(jsonPath, "utf8"));
const src = readFileSync(BANK, "utf8");

// Existing FENs (avoid duplicates).
const existingFens = new Set(
  [...src.matchAll(/fen:\s*"([^"]+)"/g)].map((m) => m[1]),
);

const fresh = gen.filter((e) => !existingFens.has(e.fen));

// Continue id numbering from the existing max per theme, so re-runs don't
// collide with ids already in the bank (ids look like `tb-gen-<theme>-<n>`).
const maxByTheme = new Map<string, number>();
for (const m of src.matchAll(/id:\s*"tb-gen-(.+?)-(\d+)"/g)) {
  const theme = m[1];
  const n = Number(m[2]);
  maxByTheme.set(theme, Math.max(maxByTheme.get(theme) ?? 0, n));
}
for (const e of fresh) {
  const next = (maxByTheme.get(e.theme) ?? 0) + 1;
  maxByTheme.set(e.theme, next);
  e.id = `tb-gen-${e.theme}-${next}`;
}

const q = (s: string) => JSON.stringify(s);
const goalStr = (g: Entry["goal"]) =>
  g.type === "mate"
    ? `{ type: "mate", inMoves: ${g.inMoves} }`
    : `{ type: "win-material", minGain: ${g.minGain} }`;

const entries = fresh
  .map(
    (e) => `  {
    id: ${q(e.id)},
    fen: ${q(e.fen)},
    orientation: "white",
    solution: [${e.solution.map(q).join(", ")}],
    goal: ${goalStr(e.goal)},
    theme: ${q(e.theme)},
    difficulty: ${e.difficulty},
    prompt: ${q(e.prompt)},
  },`,
  )
  .join("\n");

const close = src.lastIndexOf("];");
if (close < 0) throw new Error("could not find closing `];` in tactics-bank.ts");
// Everything up to the last entry's trailing `,`, then our entries, then a
// clean `\n];\n` close (robust across repeated runs).
const head = src.slice(0, close).replace(/\s*$/, "");
const out = `${head}\n${entries}\n];\n`;
writeFileSync(BANK, out);
console.log(
  `Appended ${fresh.length} puzzles (skipped ${gen.length - fresh.length} dup FENs). Bank now has ${existingFens.size + fresh.length} entries.`,
);
