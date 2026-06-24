"use client";

// A compact, collapsible strategy summary for an opening. It surfaces the theory
// already authored on each Opening — its idea (`character`), the side's plan, and
// the concrete `middlegamePlan` — so a learner can reference the "why" and where
// they're headed without leaving the drill. Pure presentational; reused on the
// trainer drill screen, the catalog, and the opening page. Toggled by a button
// (no effect — respects the repo's react-hooks/set-state-in-effect rule).
//
// `embedded` drops the Card wrapper so it can live INSIDE another container (e.g.
// a catalog row's card) as a divided section rather than a separate card.

import { useState } from "react";
import type { Opening } from "@/content/openings/types";
import { Card } from "@/components/ui/Card";
import { ChevronRightIcon } from "@/components/icons";

interface Props {
  opening: Opening;
  /** Label on the collapsed trigger row. */
  triggerLabel?: string;
  defaultOpen?: boolean;
  /** Render without the Card wrapper (to sit inside another container). */
  embedded?: boolean;
}

export function OpeningSummary({
  opening,
  triggerLabel = "About this opening",
  defaultOpen = false,
  embedded = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const sideLabel = opening.trainerColor === "white" ? "White" : "Black";
  const plan =
    opening.trainerColor === "white" ? opening.whitePlan : opening.blackPlan;

  const inner = (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex w-full items-center gap-2 px-4 py-3 text-left ${
          embedded ? "border-t border-line" : ""
        }`}
      >
        <ChevronRightIcon
          className={`h-4 w-4 shrink-0 text-ink-soft transition-transform ${
            open ? "rotate-90" : ""
          }`}
        />
        <span className="font-semibold text-primary-strong">{triggerLabel}</span>
      </button>

      {open && (
        <div className="space-y-4 border-t border-line px-4 pb-4 pt-3 text-sm leading-relaxed">
          <p className="font-mono text-xs text-ink-soft">
            {opening.eco ? `${opening.eco} · ` : ""}
            {opening.firstMoves}
          </p>
          <Section label="The idea">{opening.character}</Section>
          <Section label={`Your plan (${sideLabel})`}>{plan}</Section>
          {opening.middlegamePlan && (
            <Section label="Heading into the middlegame">
              {opening.middlegamePlan}
            </Section>
          )}
        </div>
      )}
    </>
  );

  if (embedded) return inner;
  return <Card className="overflow-hidden">{inner}</Card>;
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
        {label}
      </p>
      <p className="text-ink">{children}</p>
    </div>
  );
}
