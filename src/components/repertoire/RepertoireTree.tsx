"use client";

// The repertoire outline: indented rows on the left, a board that plays through
// the moves on the right. Roughly 150 rows for a real repertoire, so every row
// renders — virtualization here would be overbuild.

import { useState } from "react";
import Link from "next/link";
import { Chip } from "@/components/ui/Chip";
import { getOpening } from "@/content/openings";
import { TreeBoardPane } from "./TreeBoardPane";
import { buildOutline, plyLabel, type OutlineRow } from "@/lib/repertoire/outline";
import { nodeMastery } from "@/lib/repertoire/mastery";
import type { NodeKey, RepTree } from "@/lib/repertoire/tree";
import type { SrsData } from "@/lib/srs/store";
import type { Orientation } from "@/content/types";

const BAR_BY_STATUS = {
  new: "bg-ink/12",
  learning: "bg-accent",
  known: "bg-sage",
} as const;

function Row({
  row,
  selected,
  status,
  onSelect,
  onToggle,
}: {
  row: OutlineRow;
  selected: boolean;
  status: "new" | "learning" | "known";
  onSelect: () => void;
  onToggle?: () => void;
}) {
  return (
    <div style={{ paddingLeft: `${row.depth * 14}px` }}>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onSelect}
          className={`group flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition ${
            selected ? "bg-primary/12" : "hover:bg-primary/[0.06]"
          }`}
        >
          <span
            aria-hidden
            className={`h-5 w-[3px] shrink-0 rounded-full ${
              row.ours ? BAR_BY_STATUS[status] : "bg-transparent"
            }`}
          />
          <span className="w-8 shrink-0 text-right font-mono text-[11px] text-ink-soft">
            {plyLabel(row.ply)}
          </span>
          <span
            className={`font-mono text-sm ${
              row.ours ? "font-semibold text-ink" : "text-ink-soft"
            }`}
          >
            {row.san}
          </span>
          {row.transposition && (
            <span
              title="This position also arises by another move order"
              className="shrink-0 text-xs text-primary-strong"
            >
              ↩
            </span>
          )}
          {!row.ours && row.alternatives > 0 && (
            <span className="shrink-0 font-mono text-[10px] text-ink-soft">
              ⋔{row.alternatives + 1}
            </span>
          )}
        </button>
        {row.collapsed && onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="shrink-0 rounded-lg border border-line px-2 py-1 text-[11px] text-ink-soft transition hover:border-primary/50 hover:text-ink"
          >
            +{row.collapsed} more
          </button>
        )}
      </div>
    </div>
  );
}

export function RepertoireTree({
  tree,
  color,
  choices,
  srs,
}: {
  tree: RepTree;
  color: Orientation;
  choices: Record<NodeKey, string>;
  srs: SrsData;
}) {
  const [expanded, setExpanded] = useState<Set<NodeKey>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const rows = buildOutline(tree, color, choices, { expanded });
  const selected = rows.find((r) => r.id === selectedId) ?? rows[0];

  function toggle(key: NodeKey) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  if (rows.length === 0) {
    return (
      <p className="text-sm text-ink-soft">
        No lines for this colour yet — add openings in the Chooser.
      </p>
    );
  }

  const openingNames = [...new Set(selected?.openings ?? [])];

  return (
    <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0 space-y-0.5">
        {rows.map((row) => (
          <Row
            key={row.id}
            row={row}
            selected={row.id === selected?.id}
            status={row.ours ? nodeMastery(srs, row.fromKey).status : "new"}
            onSelect={() => setSelectedId(row.id)}
            onToggle={row.branchKey ? () => toggle(row.branchKey!) : undefined}
          />
        ))}
      </div>

      <div className="md:sticky md:top-4 md:self-start">
        <TreeBoardPane
          path={selected?.path ?? []}
          orientation={color}
          note={selected?.note}
          caption={selected?.transposition ? "Also reached another way" : undefined}
          onCrumb={(upTo) => {
            const row = rows.find((r) => r.path.length === upTo && selected?.path.slice(0, upTo).join(" ") === r.path.join(" "));
            if (row) setSelectedId(row.id);
          }}
        />
        {/* Provenance, not "what we play": these are the opening files this
            position comes from, so the opening's own name is correct here. */}
        {openingNames.length > 0 && (
          <div className="mt-3 space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
              From
            </p>
            <div className="flex flex-wrap gap-2">
              {openingNames.slice(0, 3).map((id) => (
                <Link key={id} href={`/trainer/${id}`}>
                  <Chip tone="neutral">{getOpening(id)?.name ?? id}</Chip>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
