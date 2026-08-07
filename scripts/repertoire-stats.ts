// Repertoire tree stats — the content-side guard for the Repertoire Lab.
//
// Run: npx tsx scripts/repertoire-stats.ts
//
// Prints node/transposition counts, the conflict list (positions where our side
// has more than one authored move, which the learner must resolve once), and
// per-slot coverage for a White and a Black repertoire. Also asserts the
// chess.js en-passant normalization that the 4-field node key depends on.

import { Chess } from "chess.js";
import {
  buildTree,
  nodeKey,
  transpositions,
  sharedPositions,
  conflicts,
  resolveEdge,
  type RepNode,
  type RepTree,
} from "../src/lib/repertoire/tree";
import { OPENINGS } from "../src/content/openings";
import type { Orientation } from "../src/content/types";

let failures = 0;
const fail = (msg: string): void => {
  console.error(`  ✗ ${msg}`);
  failures++;
};

// --- Assertion: the node-key assumption -------------------------------------
function assertEpNormalization(): void {
  console.log("Node-key assumptions (chess.js en-passant handling)");
  const g = new Chess();
  g.move("e4");
  if (g.fen().split(" ")[3] !== "-") {
    fail("chess.js now emits an ep square after 1.e4 with no capture available — the 4-field node key would split transpositions. Fix nodeKey() before shipping.");
  } else {
    console.log("  ✓ ep omitted when no capture is legal");
  }
  const bogus = "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1";
  if (new Chess(bogus).fen().split(" ")[3] !== "-") {
    fail("chess.js no longer normalizes a spurious ep square on load — hand-written FENs would key differently. Fix nodeKey() before shipping.");
  } else {
    console.log("  ✓ spurious ep normalized away on load");
  }
}

// --- Coverage slots ---------------------------------------------------------
interface Slot {
  id: string;
  label: string;
  color: Orientation;
  /** Moves leading to the position whose ANSWER this slot represents. */
  prefix: string[];
}

const SLOTS: Slot[] = [
  { id: "w-first", label: "White's first move", color: "white", prefix: [] },
  { id: "w-vs-e5", label: "White vs 1...e5", color: "white", prefix: ["e4", "e5"] },
  { id: "w-vs-sicilian", label: "White vs the Sicilian", color: "white", prefix: ["e4", "c5"] },
  { id: "w-vs-french", label: "White vs the French", color: "white", prefix: ["e4", "e6"] },
  { id: "w-vs-caro", label: "White vs the Caro-Kann", color: "white", prefix: ["e4", "c6"] },
  { id: "w-vs-scandi", label: "White vs the Scandinavian", color: "white", prefix: ["e4", "d5"] },
  { id: "w-vs-alekhine", label: "White vs the Alekhine", color: "white", prefix: ["e4", "Nf6"] },
  { id: "w-vs-pirc", label: "White vs the Pirc/Modern", color: "white", prefix: ["e4", "d6"] },
  { id: "w-vs-d5", label: "White vs 1...d5", color: "white", prefix: ["d4", "d5"] },
  { id: "w-vs-indian", label: "White vs 1...Nf6", color: "white", prefix: ["d4", "Nf6"] },
  { id: "b-vs-e4", label: "Black vs 1.e4", color: "black", prefix: ["e4"] },
  { id: "b-vs-d4", label: "Black vs 1.d4", color: "black", prefix: ["d4"] },
];

/** Longest run of plies from this node following our resolved moves and the
 *  MAIN opponent reply — i.e. how deep the book actually goes down one path. */
function mainDepth(tree: RepTree, node: RepNode, color: Orientation): number {
  const seen = new Set<string>();
  let depth = 0;
  let cur: RepNode | undefined = node;
  while (cur && !seen.has(cur.key)) {
    seen.add(cur.key);
    const edge: ReturnType<typeof resolveEdge> =
      cur.turn === color ? resolveEdge(cur) : cur.edges[0];
    if (!edge) break;
    depth++;
    cur = tree.nodes.get(edge.toKey);
  }
  return depth;
}

function keyAfter(prefix: string[]): string {
  const g = new Chess();
  for (const san of prefix) g.move(san);
  return nodeKey(g.fen());
}

function reportCoverage(tree: RepTree): void {
  console.log("\nSlot coverage");
  for (const slot of SLOTS) {
    const node = tree.nodes.get(keyAfter(slot.prefix));
    const moves = node ? node.edges.map((e) => e.san) : [];
    const label = slot.label.padEnd(28);
    if (!node || moves.length === 0) {
      fail(`${label} NO ANSWER AUTHORED`);
      continue;
    }
    const depth = mainDepth(tree, node, slot.color);
    const mark = depth >= 6 ? "✓" : "~";
    const note = depth >= 6 ? "" : "  (shallow — under 6 plies of book)";
    console.log(
      `  ${mark} ${label} ${moves.length} option(s): ${moves.join(", ")}   depth ${depth}${note}`,
    );
  }
}

function reportConflicts(tree: RepTree, color: Orientation): void {
  const list = conflicts(tree, color).filter((n) => n.minPly <= 8);
  console.log(
    `\n${color === "white" ? "White" : "Black"} choice points at ply ≤ 8 (${conflicts(tree, color).length} total)`,
  );
  for (const n of list) {
    const route = n.paths[0]?.join(" ") || "(start)";
    console.log(`  ply ${String(n.minPly).padStart(2)}  ${route.padEnd(34)} → ${n.edges.map((e) => e.san).join(" | ")}`);
  }
}

// --- Main -------------------------------------------------------------------
assertEpNormalization();

const t0 = performance.now();
const tree = buildTree();
const ms = performance.now() - t0;

const lineCount = OPENINGS.reduce((n, o) => n + o.lines.length, 0);
const plyCount = OPENINGS.reduce(
  (n, o) => n + o.lines.reduce((m, l) => m + l.sans.length, 0),
  0,
);

console.log(
  `\nCorpus: ${OPENINGS.length} openings / ${lineCount} lines / ${plyCount} plies`,
);
console.log(`Tree:   ${tree.nodes.size} distinct positions   (compiled in ${ms.toFixed(0)}ms)`);

const trans = transpositions(tree);
console.log(`\nTransposition nodes (reachable by >1 move order): ${trans.length}`);
for (const n of trans.slice(0, 40)) {
  console.log(`  ply ${n.minPly}  [${n.openings.join(", ")}]`);
  for (const p of n.paths) console.log(`        ${p.join(" ")}`);
}
if (trans.length > 40) console.log(`  … and ${trans.length - 40} more`);

console.log(`\nShared positions (in >1 opening): ${sharedPositions(tree).length}`);

reportConflicts(tree, "white");
reportConflicts(tree, "black");
reportCoverage(tree);

console.log(
  failures === 0
    ? "\nAll repertoire checks passed."
    : `\n${failures} repertoire check(s) FAILED.`,
);
process.exit(failures === 0 ? 0 : 1);
