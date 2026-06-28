// Authoring fact-check (not shipped): read the annotate pipeline's draft and flag
// every Lab/guessMove step where the move I authored is NOT the engine's top move,
// with the eval gap. Surfaces refinements like "Bxf6 was sharper than Nd5".
//   node scripts/strategy/factcheck.mjs
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(here, "draft-annotations.json"), "utf8"));

const num = (s) => {
  if (s == null) return null;
  if (s.startsWith("mate")) return s.includes("-") ? -1000 : 1000;
  return parseFloat(s.replace("+", ""));
};

let flags = 0;
for (const job of data) {
  const hits = [];
  for (const s of job.steps) {
    const top = s.topMoves?.[0];
    if (!top) continue;
    if (s.movePlayed === top.san) continue; // matched engine #1 — fine
    const mine = s.topMoves.find((t) => t.san === s.movePlayed);
    const gap = mine ? Math.abs(num(top.eval) - num(mine.eval)) : null;
    hits.push({
      ply: s.ply,
      side: s.sideToMove,
      played: s.movePlayed,
      engineBest: `${top.san} (${top.eval})`,
      mine: mine ? `${mine.san} (${mine.eval})` : `${s.movePlayed} (outside top 3)`,
      gap,
    });
  }
  if (!hits.length) continue;
  console.log(`\n### ${job.activityId} (${job.type})`);
  for (const h of hits.sort((a, b) => (b.gap ?? 9) - (a.gap ?? 9))) {
    const sev = h.gap == null ? "⚑ outside top-3" : h.gap >= 0.5 ? `⚑ gap ${h.gap.toFixed(2)}` : `· gap ${h.gap.toFixed(2)}`;
    console.log(`  ply ${h.ply} ${h.side}: played ${h.played}  vs engine ${h.engineBest}   ${sev}`);
    flags++;
  }
}
console.log(`\n${flags} step(s) where the authored move != engine #1. (Small gaps = fine instructive choices; ⚑ = worth a look.)`);
