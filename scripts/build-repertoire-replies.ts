// Precompute the opponent's plausible replies at every repertoire position, so
// the Lab can flag coverage GAPS -- positions where a common reply has no
// answer in the authored tree.
//
// Run: npx tsx scripts/build-repertoire-replies.ts [--depth 18] [--maxPly 12]
// Output: src/content/repertoire-replies.json
//
// Why offline rather than in the browser: 300+ opponent positions at MultiPV-4
// depth-18 is minutes of single-threaded WASM on the user's device, on every
// repertoire change. It is also the same answer every time -- exactly what a
// build artifact is for. `src/content/tactics-puzzles.json` is the precedent.

import { writeFileSync } from "node:fs";
import { Chess } from "chess.js";
import { getEngine, quitEngine, type Score } from "./lib/engine";
import { buildTree, nodeKey } from "../src/lib/repertoire/tree";

const OUT = "src/content/repertoire-replies.json";

function arg(name: string, fallback: number): number {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const v = Number(process.argv[i + 1]);
  return Number.isFinite(v) ? v : fallback;
}

const DEPTH = arg("depth", 18);
const MAX_PLY = arg("maxPly", 12);
const MULTI_PV = 4;

/** Centipawns from the side-to-move's perspective; mate scores are clamped. */
function toCp(score: Score): number {
  return "mate" in score ? (score.mate > 0 ? 10000 : -10000) : score.cp;
}

export interface Reply {
  uci: string;
  san: string;
  cp: number;
  /** True when some authored line already plays this move here. */
  known: boolean;
}

async function main(): Promise<void> {
  const tree = buildTree();

  // Every position where the OPPONENT is to move is a place they could deviate.
  // Both colours matter: the same node is "their move" for one repertoire and
  // "ours" for the other, so we simply take every node within the ply cap.
  const targets = [...tree.nodes.values()]
    .filter((n) => n.minPly <= MAX_PLY)
    .sort((a, b) => a.minPly - b.minPly);

  console.log(
    `Analyzing ${targets.length} positions (ply <= ${MAX_PLY}) at depth ${DEPTH}, MultiPV ${MULTI_PV}…`,
  );

  const engine = getEngine();
  const out: Record<string, Reply[]> = {};
  let done = 0;

  for (const node of targets) {
    const { lines } = await engine.analyze(node.fen, {
      depth: DEPTH,
      multiPV: MULTI_PV,
    });
    const known = new Set(node.edges.map((e) => e.uci));
    const replies: Reply[] = [];

    for (const line of lines) {
      const game = new Chess(node.fen);
      let san: string;
      try {
        const mv = game.move({
          from: line.move.slice(0, 2),
          to: line.move.slice(2, 4),
          promotion: (line.move.slice(4) || undefined) as never,
        });
        san = mv.san;
      } catch {
        continue; // engine returned something we can't play — skip it
      }
      replies.push({ uci: line.move, san, cp: toCp(line.score), known: known.has(line.move) });
    }

    if (replies.length) out[node.key] = replies;

    if (++done % 25 === 0) {
      console.log(`  ${done}/${targets.length}`);
    }
  }

  quitEngine();

  writeFileSync(OUT, JSON.stringify(out), "utf8");
  const bytes = JSON.stringify(out).length;
  console.log(
    `\nWrote ${OUT} — ${Object.keys(out).length} positions, ${(bytes / 1024).toFixed(0)} KB.`,
  );
  // Sanity: every key must still resolve against the tree.
  const missing = Object.keys(out).filter((k) => !tree.nodes.has(k));
  if (missing.length) {
    console.error(`WARNING: ${missing.length} keys not in the tree.`);
    process.exit(1);
  }
  void nodeKey;
}

main().catch((err) => {
  console.error(err);
  quitEngine();
  process.exit(1);
});
