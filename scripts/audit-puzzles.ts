// Authoring aid (NOT shipped): grade every lesson puzzle in the non-kid learning
// modules on the signals that decide whether it's the RIGHT puzzle for teaching:
//   • verified?  — does it carry a `goal` (so `npm run validate` engine-checks it
//                  for soundness + unique best move)? No goal = unverified.
//   • clarity    — piece count (busy boards bury the idea) + forced-line length.
//   • fit        — flagged for review when busy / long / unverified.
// Prints KEEP vs REVIEW so we can triage which to swap for a cleaner sourced one.
//
// Usage: npx tsx scripts/audit-puzzles.ts

import { MODULES, getModuleActivities } from "../src/content/index";

const LEARN = new Set(["fundamentals", "intermediate", "openings"]);
const pieceCount = (fen: string) => fen.split(" ")[0].replace(/[^a-zA-Z]/g, "").length;

interface Row {
  module: string; id: string; title: string;
  pieces: number; solverMoves: number; goal: string; concern: string[];
}
const rows: Row[] = [];

for (const mod of MODULES) {
  if (!LEARN.has(mod.id)) continue; // kids + tools excluded
  for (const a of getModuleActivities(mod)) {
    if (a.type !== "puzzle") continue;
    const pieces = pieceCount(a.fen);
    const solverMoves = Math.ceil(a.solution.length / 2);
    const goal = a.goal ? a.goal.type : "—";
    const concern: string[] = [];
    if (!a.goal) concern.push("NO-GOAL(unverified)");
    // A full board is EXPECTED for opening traps (the real opening position is
    // the point), so only flag "busy" outside the openings course, and higher.
    if (mod.id !== "openings" && pieces > 24) concern.push(`busy(${pieces}p)`);
    if (solverMoves > 3) concern.push(`long(${solverMoves})`);
    rows.push({ module: mod.id, id: a.id, title: a.title, pieces, solverMoves, goal, concern });
  }
}

rows.sort((a, b) => (b.concern.length - a.concern.length) || (b.pieces - a.pieces));

const review = rows.filter((r) => r.concern.length);
const keep = rows.filter((r) => !r.concern.length);

console.log(`\n=== LESSON PUZZLES (non-kid): ${rows.length} total — ${review.length} to REVIEW, ${keep.length} clean ===\n`);
console.log("REVIEW (sorted by concern):");
for (const r of review) {
  console.log(`  [${r.module}] ${r.id} — "${r.title}"  ${r.pieces}p ${r.solverMoves}mv goal=${r.goal}  ⚠ ${r.concern.join(", ")}`);
}
console.log("\nCLEAN (keep) — sample by module:");
const byMod: Record<string, Row[]> = {};
for (const r of keep) (byMod[r.module] ??= []).push(r);
for (const m of Object.keys(byMod)) {
  console.log(`  ${m}: ${byMod[m].length} clean puzzles (${byMod[m].map((r) => `${r.pieces}p`).join(", ")})`);
}
