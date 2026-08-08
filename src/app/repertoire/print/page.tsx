"use client";

// A one-page repertoire sheet for offline review. Print styles only — no new
// dependency, no PDF library; the browser's "Save as PDF" does the job.

import Link from "next/link";
import { MiniBoard } from "@/components/board/MiniBoard";
import { buttonClasses } from "@/components/ui/Button";
import { getOpening } from "@/content/openings";
import { useRepertoire } from "@/lib/repertoire/useRepertoire";
import { hasRepertoire } from "@/lib/repertoire/store";
import { resolveEdge, type RepTree } from "@/lib/repertoire/tree";
import { keyForSlot, movesGloss, slotMoves, systemNameFor } from "@/lib/repertoire/naming";
import { SLOTS, type SlotId } from "@/lib/repertoire/traits";
import type { Orientation } from "@/content/types";

/** The main line from the start, following our resolved moves. */
function mainLine(
  tree: RepTree,
  color: Orientation,
  choices: Record<string, string>,
  maxPlies = 12,
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  let cur = tree.nodes.get(tree.roots[0]);
  while (cur && out.length < maxPlies && !seen.has(cur.key)) {
    seen.add(cur.key);
    const edge = cur.turn === color ? resolveEdge(cur, choices) : cur.edges[0];
    if (!edge) break;
    out.push(edge.san);
    cur = tree.nodes.get(edge.toKey);
  }
  return out;
}

function numbered(sans: string[]): string {
  return sans
    .map((san, i) => (i % 2 === 0 ? `${i / 2 + 1}.${san}` : san))
    .join(" ");
}

export default function RepertoirePrintPage() {
  const { data, trees } = useRepertoire();

  if (!hasRepertoire(data)) {
    return (
      <main className="space-y-4">
        <p className="text-sm text-ink-soft">No repertoire to print yet.</p>
        <Link href="/repertoire/choose" className={buttonClasses("primary", "lg")}>
          Build my repertoire
        </Link>
      </main>
    );
  }

  // Iterate SLOTS, not the raw opening ids: the sheet's real question is
  // "they play X, so I play Y" — and printing an opening's own name under
  // "As White" would read as though you played the defence.
  const rows = (Object.keys(SLOTS) as SlotId[])
    .map((slot) => {
      const meta = SLOTS[slot];
      const ids = meta.color === "white" ? data.white : data.black;
      if (ids.length === 0) return null;
      const tree = meta.color === "white" ? trees.white : trees.black;
      const key = keyForSlot(slot);
      const node = key ? tree.nodes.get(key) : undefined;
      if (!node || node.edges.length === 0) return null;
      const moves = slotMoves(tree, slot, data.choices, 4);
      const openingId = node.openings[0];
      return {
        slot,
        color: meta.color,
        prompt: meta.prompt,
        systemName: systemNameFor(slot, openingId, moves.moves),
        gloss: movesGloss(moves, slot),
        opening: getOpening(openingId),
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  const sections: { color: Orientation; title: string }[] = [
    { color: "white", title: "As White" },
    { color: "black", title: "As Black" },
  ];

  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between gap-3 print:hidden">
        <Link href="/repertoire" className="text-sm text-ink-soft hover:text-ink">
          ← Repertoire
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className={buttonClasses("primary", "md")}
        >
          Print
        </button>
      </div>

      <h1 className="font-display text-2xl font-semibold text-ink">My repertoire</h1>

      {sections.map((section) => {
        const mine = rows.filter((r) => r.color === section.color);
        if (mine.length === 0) return null;
        const line = mainLine(
          section.color === "white" ? trees.white : trees.black,
          section.color,
          data.choices,
        );
        return (
          <section key={section.color} className="space-y-4 break-inside-avoid">
            <h2 className="font-display text-xl font-semibold text-ink">
              {section.title} — {mine.length}{" "}
              {mine.length === 1 ? "answer" : "answers"}
            </h2>
            {line.length > 0 && (
              <p className="font-mono text-sm text-ink-soft">{numbered(line)}</p>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              {mine.map((row) => (
                <div key={row.slot} className="flex gap-3 break-inside-avoid">
                  {row.opening && (
                    <div className="w-24 shrink-0">
                      <MiniBoard fen={row.opening.tabiyaFen} orientation={row.color} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent">
                      {row.prompt}
                    </p>
                    <p className="font-display text-base font-semibold text-ink">
                      {row.systemName}
                    </p>
                    {row.gloss && (
                      <p className="font-mono text-xs text-ink-soft">{row.gloss}</p>
                    )}
                    {row.opening?.middlegamePlan && (
                      <p className="text-xs leading-relaxed text-ink-soft">
                        {row.opening.middlegamePlan}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
