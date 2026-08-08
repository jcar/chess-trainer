"use client";

// The panel above the plan: what was decided, what it costs, and what the other
// road would have cost. This is where "why wasn't the London recommended?" gets
// answered — a 1.d4 system simply has no slot in a 1.e4 repertoire, so it can
// never appear as a rejected candidate. It shows up here instead.

import { Card } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/Button";
import {
  scoreRepertoire,
  FIRST_MOVE_LABEL,
  type RepertoirePlan,
} from "@/lib/repertoire/chooser";
import { planCost, REPLIES_FACED } from "@/lib/repertoire/cost";
import type { FirstMove } from "@/lib/repertoire/traits";

/** Option indices of CHOOSER_ITEMS[2] ("As White, what do you want to open with?"). */
const FIRST_MOVE_OPTION: { index: number; move: FirstMove }[] = [
  { index: 0, move: "e4" },
  { index: 1, move: "d4" },
  { index: 2, move: "c4" },
];

export function WhyThisPlan({
  plan,
  answers,
  onRebuild,
}: {
  plan: RepertoirePlan;
  answers?: Record<string, number>;
  onRebuild?: (firstMoveOptionIndex: number) => void;
}) {
  const cost = planCost(plan);

  // What the roads not taken would have cost, using the same answers.
  const alternatives = answers
    ? FIRST_MOVE_OPTION.filter((o) => o.move !== plan.firstMove)
        .map((o) => {
          const alt = scoreRepertoire({ ...answers, "first-move": o.index });
          if (alt.firstMove === plan.firstMove) return null;
          const altCost = planCost(alt);
          const lead = alt.slots.find((s) => s.slot.startsWith("w-"));
          return {
            index: o.index,
            label: FIRST_MOVE_LABEL[alt.firstMove],
            decisions: altCost.whiteDecisions,
            positions: altCost.whitePositions,
            leadName:
              altCost.bySlot.find((b) => b.slot === lead?.slot)?.systemName ??
              lead?.openingName ??
              "",
          };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null)
    : [];

  const close = plan.slots.filter((s) => s.runnerUp);

  return (
    <Card className="space-y-4 p-5">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          You open with
        </p>
        <p className="font-display text-2xl font-semibold text-primary-strong">
          {FIRST_MOVE_LABEL[plan.firstMove]}
        </p>
        <p className="text-sm text-ink-soft">{plan.firstMoveReason}</p>
      </div>

      <div className="rounded-2xl bg-surface p-4">
        <p className="text-sm text-ink">
          <span className="font-semibold">
            {cost.whiteDecisions} answers as White
          </span>{" "}
          — not {cost.whiteDecisions} openings to learn. Black chooses their
          defence, so you need one reply to each of {REPLIES_FACED[plan.firstMove]}.
        </p>
        <p className="mt-2 text-sm text-ink-soft">
          Plus {cost.blackDecisions} as Black. About {cost.positions} positions in
          our book across the whole repertoire — that&apos;s what the drills test.
        </p>
      </div>

      {alternatives.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            The road not taken
          </p>
          {alternatives.map((alt) => (
            <div
              key={alt.index}
              className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-line px-3 py-2.5 text-sm"
            >
              <span className="font-mono font-semibold text-ink">{alt.label}</span>
              <span className="text-ink-soft">
                {alt.decisions} answers · ~{alt.positions} positions
              </span>
              {alt.leadName && (
                <span className="text-ink-soft">— {alt.leadName}</span>
              )}
              {onRebuild && (
                <button
                  type="button"
                  onClick={() => onRebuild(alt.index)}
                  className={buttonClasses("ghost", "md", "ml-auto")}
                >
                  Rebuild with {alt.label}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {close.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Close calls
          </p>
          {close.map((s) => (
            <p key={s.slot} className="text-sm text-ink-soft">
              {s.label}: {s.runnerUp!.systemName} was a close second.
            </p>
          ))}
        </div>
      )}
    </Card>
  );
}
