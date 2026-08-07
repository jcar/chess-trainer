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

  const sections: { color: Orientation; title: string; ids: string[] }[] = [
    { color: "white", title: "As White", ids: data.white },
    { color: "black", title: "As Black", ids: data.black },
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
        if (section.ids.length === 0) return null;
        const line = mainLine(
          section.color === "white" ? trees.white : trees.black,
          section.color,
          data.choices,
        );
        return (
          <section key={section.color} className="space-y-4 break-inside-avoid">
            <h2 className="font-display text-xl font-semibold text-ink">
              {section.title}
            </h2>
            {line.length > 0 && (
              <p className="font-mono text-sm text-ink-soft">{numbered(line)}</p>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              {section.ids.map((id) => {
                const opening = getOpening(id);
                if (!opening) return null;
                return (
                  <div key={id} className="flex gap-3 break-inside-avoid">
                    <div className="w-24 shrink-0">
                      <MiniBoard fen={opening.tabiyaFen} orientation={section.color} />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="font-display text-base font-semibold text-ink">
                        {opening.name}
                      </p>
                      <p className="font-mono text-xs text-ink-soft">
                        {opening.firstMoves}
                      </p>
                      {opening.middlegamePlan && (
                        <p className="text-xs leading-relaxed text-ink-soft">
                          {opening.middlegamePlan}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </main>
  );
}
