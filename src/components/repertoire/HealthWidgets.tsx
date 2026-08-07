"use client";

// Health widgets. Hand-rolled SVG in MasteryRing's idiom (viewBox +
// currentColor + the text-accent/text-sage palette) — the app has no charting
// dependency and these four don't justify adding one.
//
// Deliberately NOT here: an overall "repertoire mastery %", node totals, time
// spent, XP. They move without telling you to do anything.

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { MiniBoard } from "@/components/board/MiniBoard";
import type { Gap } from "@/lib/repertoire/gaps";
import type { RepNode } from "@/lib/repertoire/tree";
import type { SlotId } from "@/lib/repertoire/traits";

export interface SlotCoverage {
  slot: SlotId;
  label: string;
  prompt: string;
  covered: boolean;
  openingName?: string;
  /** Plies you produce cold vs plies authored. */
  coldDepth: number;
  bookDepth: number;
}

/** 1. Slot coverage — a checklist, not a percentage. */
export function SlotCoverageList({ rows }: { rows: SlotCoverage[] }) {
  return (
    <Card className="space-y-3 p-5">
      <h2 className="font-display text-lg font-semibold text-ink">Coverage</h2>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.slot} className="flex items-center gap-3 text-sm">
            <span
              aria-hidden
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                r.covered ? "bg-sage/15 text-sage" : "bg-amber/15 text-amber"
              }`}
            >
              {r.covered ? "✓" : "!"}
            </span>
            <span className="min-w-0 flex-1 text-ink-soft">{r.prompt}</span>
            <span className="shrink-0 text-right text-ink">
              {r.openingName ?? "nothing yet"}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/** 2. Depth per slot — where you actually fall off the book. */
export function DepthBars({ rows }: { rows: SlotCoverage[] }) {
  const max = Math.max(8, ...rows.map((r) => r.bookDepth));
  return (
    <Card className="space-y-3 p-5">
      <h2 className="font-display text-lg font-semibold text-ink">
        How deep you go cold
      </h2>
      <p className="text-sm text-ink-soft">
        Solid = plies you produce from the position alone. Faint = plies the book
        has. The gap is your homework.
      </p>
      <div className="space-y-2.5">
        {rows.filter((r) => r.covered).map((r) => (
          <div key={r.slot} className="space-y-1">
            <div className="flex items-baseline justify-between gap-2 text-xs">
              <span className="min-w-0 truncate text-ink-soft">{r.label}</span>
              <span className="shrink-0 font-mono text-ink">
                {r.coldDepth}/{r.bookDepth}
              </span>
            </div>
            <svg viewBox={`0 0 ${max} 4`} className="h-2 w-full" preserveAspectRatio="none">
              <rect x="0" y="0" width={r.bookDepth} height="4" rx="1" fill="currentColor" className="text-ink/12" />
              <rect x="0" y="0" width={r.coldDepth} height="4" rx="1" fill="currentColor" className="text-sage" />
            </svg>
          </div>
        ))}
      </div>
    </Card>
  );
}

/** 3. Weakest positions — the most actionable thing on the page. */
export function WeakNodeList({
  rows,
}: {
  rows: { node: RepNode; lapses: number; box: number }[];
}) {
  if (rows.length === 0) {
    return (
      <Card className="space-y-2 p-5">
        <h2 className="font-display text-lg font-semibold text-ink">Weak spots</h2>
        <p className="text-sm text-ink-soft">
          Nothing missed yet. Once you start drilling, the positions you keep
          getting wrong collect here.
        </p>
      </Card>
    );
  }
  return (
    <Card className="space-y-3 p-5">
      <h2 className="font-display text-lg font-semibold text-ink">Weak spots</h2>
      <p className="text-sm text-ink-soft">Positions you have missed most often.</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {rows.map(({ node, lapses }) => (
          <li key={node.key} className="flex items-center gap-3">
            <div className="w-16 shrink-0">
              <MiniBoard fen={node.fen} orientation={node.turn} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-xs text-ink-soft">
                {node.paths[0]?.join(" ") || "start"}
              </p>
              <Chip tone="clay">
                missed {lapses}×
              </Chip>
            </div>
          </li>
        ))}
      </ul>
      <Link href="/repertoire/drill" className="text-sm text-primary-strong underline">
        Drill these now
      </Link>
    </Card>
  );
}

/** 4. Gaps — opponent moves your repertoire has no answer to. */
export function GapList({ gaps, onDismiss }: { gaps: Gap[]; onDismiss: (key: string) => void }) {
  if (gaps.length === 0) {
    return (
      <Card className="space-y-2 p-5">
        <h2 className="font-display text-lg font-semibold text-ink">Gaps</h2>
        <p className="text-sm text-ink-soft">
          No unanswered replies in the first ten plies. Deeper novelties are a
          middlegame problem, not a repertoire one.
        </p>
      </Card>
    );
  }
  return (
    <Card className="space-y-3 p-5">
      <h2 className="font-display text-lg font-semibold text-ink">Gaps</h2>
      <p className="text-sm text-ink-soft">
        Replies with no answer in your lines. Ones another opening actually plays
        are listed first — those are real moves people make.
      </p>
      <ul className="space-y-2.5">
        {gaps.map((gap, i) => (
          <li
            key={`${gap.key}-${gap.san}-${i}`}
            className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5"
          >
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 truncate font-mono text-xs text-ink-soft">
                {/* Which repertoire this belongs to — without it, "start → they
                    play Nf3" is unreadable next to a White-repertoire gap. */}
                <span className="not-italic font-sans font-semibold uppercase tracking-[0.12em] text-accent">
                  {gap.color === "white" ? "White" : "Black"}
                </span>
                {gap.route.join(" ") || "start"}
              </p>
              <p className="text-sm text-ink">
                They play <span className="font-mono font-semibold">{gap.san}</span>
                {gap.known && " — a move another opening in the library plays here"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(gap.key)}
              className="shrink-0 text-xs text-ink-soft underline transition hover:text-ink"
            >
              dismiss
            </button>
          </li>
        ))}
      </ul>
    </Card>
  );
}
