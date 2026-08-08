"use client";

// What each opening move actually costs you, shown at the first-move question.
//
// This is the honest answer to "1.e4 gives me seven openings?" and to "why
// wasn't the London recommended?" — the London is a queen's-pawn system, so it
// is visible on the 1.d4 row and structurally absent from 1.e4.
//
// Only the WHITE half is compared: questions 4 and 5 haven't been answered yet,
// and the Black half is identical across all three anyway.

import { scoreRepertoire, FIRST_MOVE_LABEL } from "@/lib/repertoire/chooser";
import { planCost, REPLIES_FACED } from "@/lib/repertoire/cost";

const OPTIONS = [
  { index: 0, key: "e4" },
  { index: 1, key: "d4" },
  { index: 2, key: "c4" },
] as const;

export function FirstMoveCost({ answers }: { answers: Record<string, number> }) {
  const rows = OPTIONS.map(({ index }) => {
    const plan = scoreRepertoire({ ...answers, "first-move": index });
    const cost = planCost(plan);
    const lead = plan.slots.find((s) => s.slot.startsWith("w-"));
    return {
      index,
      label: FIRST_MOVE_LABEL[plan.firstMove],
      decisions: cost.whiteDecisions,
      positions: cost.whitePositions,
      faces: REPLIES_FACED[plan.firstMove],
      leadName:
        cost.bySlot.find((b) => b.slot === lead?.slot)?.systemName ?? "",
    };
  });

  const max = Math.max(...rows.map((r) => r.positions), 1);

  return (
    <div className="space-y-2 rounded-2xl bg-surface p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
        What each costs you
      </p>
      <ul className="space-y-2.5">
        {rows.map((row) => (
          <li key={row.index} className="space-y-1">
            <div className="flex flex-wrap items-baseline gap-x-2 text-sm">
              <span className="w-14 shrink-0 font-mono font-semibold text-ink">
                {row.label.split(" ")[0]}
              </span>
              <span className="text-ink">
                {row.decisions} {row.decisions === 1 ? "answer" : "answers"}
              </span>
              <span className="text-ink-soft">· ~{row.positions} positions</span>
              {row.leadName && (
                <span className="min-w-0 truncate text-ink-soft">— {row.leadName}</span>
              )}
            </div>
            <svg
              viewBox={`0 0 ${max} 3`}
              className="h-1.5 w-full"
              preserveAspectRatio="none"
              aria-hidden
            >
              <rect
                x="0"
                y="0"
                width={row.positions}
                height="3"
                rx="1"
                fill="currentColor"
                className={row.positions >= max ? "text-amber" : "text-sage"}
              />
            </svg>
            <p className="text-xs text-ink-soft">They can answer {row.faces}</p>
          </li>
        ))}
      </ul>
      <p className="text-xs text-ink-soft">
        Positions in our book — what the drills would test, not a measure of how
        hard each opening is.
      </p>
    </div>
  );
}
