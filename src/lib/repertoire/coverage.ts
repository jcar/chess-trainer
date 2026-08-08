// Per-slot coverage and depth: which repertoire decisions are answered, and how
// far into each you can actually go from the position alone.

import { SLOTS, type SlotId } from "./traits";
import { resolveEdge, type RepTree } from "./tree";
import { keyForSlot, ourMovesFromSlot, systemNameFor } from "./naming";
import { coldDepth } from "./mastery";
import type { RepertoireData } from "./store";
import type { RepertoireTrees } from "./useRepertoire";
import type { SrsData } from "../srs/store";
import type { SlotCoverage } from "@/components/repertoire/HealthWidgets";

/** Plies of authored book from a position, down our resolved main path. */
function bookDepth(
  tree: RepTree,
  startKey: string,
  color: "white" | "black",
  choices: Record<string, string>,
): number {
  const seen = new Set<string>();
  let depth = 0;
  let cur = tree.nodes.get(startKey);
  while (cur && !seen.has(cur.key)) {
    seen.add(cur.key);
    const edge = cur.turn === color ? resolveEdge(cur, choices) : cur.edges[0];
    if (!edge) break;
    depth++;
    cur = tree.nodes.get(edge.toKey);
  }
  return depth;
}

export function slotCoverage(
  trees: RepertoireTrees,
  data: RepertoireData,
  srs: SrsData,
): SlotCoverage[] {
  const rows: SlotCoverage[] = [];

  for (const slot of Object.keys(SLOTS) as SlotId[]) {
    const meta = SLOTS[slot];
    // "vs flank openings" has no single prefix position — skip it in the depth
    // view rather than inventing one.
    if (meta.prefix.length === 0) continue;

    const ids = meta.color === "white" ? data.white : data.black;
    if (ids.length === 0) continue;

    const tree = meta.color === "white" ? trees.white : trees.black;
    const key = keyForSlot(slot);
    const node = key ? tree.nodes.get(key) : undefined;

    if (!node || node.edges.length === 0) {
      rows.push({
        slot,
        label: meta.label,
        prompt: meta.prompt,
        covered: false,
        coldDepth: 0,
        bookDepth: 0,
      });
      continue;
    }

    // Name the system WE play, not the opening file — otherwise a White row
    // answering 1...c6 reads "Caro-Kann Defence".
    const systemName = systemNameFor(
      slot,
      node.openings[0],
      ourMovesFromSlot(tree, slot, data.choices),
    );
    rows.push({
      slot,
      label: meta.label,
      prompt: meta.prompt,
      covered: true,
      systemName,
      coldDepth: coldDepth(tree, node.key, meta.color, data.choices, srs),
      bookDepth: bookDepth(tree, node.key, meta.color, data.choices),
    });
  }

  return rows;
}
