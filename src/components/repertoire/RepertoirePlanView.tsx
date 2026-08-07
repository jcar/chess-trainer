"use client";

// The Chooser's result screen: one card per repertoire slot, each swappable.
// "Swap" is how a learner who already knows their openings gets served — the
// wizard proposes, they override, and both paths produce the same plan object.

import { useState } from "react";
import { MiniBoard } from "@/components/board/MiniBoard";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { buttonClasses } from "@/components/ui/Button";
import { getOpening } from "@/content/openings";
import {
  FIRST_MOVE_LABEL,
  swapSlot,
  type RepertoirePlan,
} from "@/lib/repertoire/chooser";
import { SLOTS, candidatesFor, type SlotId } from "@/lib/repertoire/traits";

const CONFIDENCE_TONE = {
  strong: "sage",
  fair: "primary",
  close: "amber",
} as const;

const CONFIDENCE_LABEL = {
  strong: "clear fit",
  fair: "good fit",
  close: "close call",
} as const;

function SlotCard({
  plan,
  slot,
  onSwap,
}: {
  plan: RepertoirePlan;
  slot: RepertoirePlan["slots"][number];
  onSwap: (slotId: SlotId, openingId: string) => void;
}) {
  const [picking, setPicking] = useState(false);
  const opening = getOpening(slot.openingId);
  const options = candidatesFor(slot.slot, plan.firstMove).filter(
    (t) => t.id !== slot.openingId,
  );

  return (
    <Card className="space-y-3 p-4">
      <div className="flex items-start gap-4">
        {opening && (
          <div className="w-24 shrink-0 sm:w-28">
            <MiniBoard
              fen={opening.tabiyaFen}
              orientation={SLOTS[slot.slot].color}
            />
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            {slot.prompt}
          </p>
          <p className="font-display text-lg font-semibold leading-tight text-ink">
            {slot.openingName}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {opening?.eco && <Chip tone="neutral">{opening.eco}</Chip>}
            <Chip tone={CONFIDENCE_TONE[slot.confidence]}>
              {CONFIDENCE_LABEL[slot.confidence]}
            </Chip>
          </div>
          <p className="text-sm text-ink-soft">{slot.why}</p>
        </div>
      </div>

      {picking ? (
        <div className="space-y-2 rounded-2xl bg-surface p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
            Play something else here
          </p>
          {options.length === 0 && (
            <p className="text-sm text-ink-soft">
              This is the only line in the library for this slot.
            </p>
          )}
          {options.map((t) => {
            const o = getOpening(t.id);
            if (!o) return null;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  onSwap(slot.slot, t.id);
                  setPicking(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl border border-line bg-card px-3 py-2.5 text-left transition hover:border-primary/55 hover:bg-primary/[0.05]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-ink">{o.name}</span>
                  <span className="block text-xs text-ink-soft">
                    {o.firstMoves} · {"theory ".concat("●".repeat(t.theoryLoad))}
                  </span>
                </span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setPicking(false)}
            className={buttonClasses("ghost", "md")}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setPicking(true)}
          className={buttonClasses("secondary", "md")}
        >
          Swap this
        </button>
      )}
    </Card>
  );
}

export function RepertoirePlanView({
  plan,
  onChange,
  onConfirm,
}: {
  plan: RepertoirePlan;
  onChange: (next: RepertoirePlan) => void;
  onConfirm: () => void;
}) {
  const white = plan.slots.filter((s) => SLOTS[s.slot].color === "white");
  const black = plan.slots.filter((s) => SLOTS[s.slot].color === "black");
  const handleSwap = (slotId: SlotId, openingId: string) =>
    onChange(swapSlot(plan, slotId, openingId));

  return (
    <div className="space-y-6">
      <Card className="space-y-1 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          You open with
        </p>
        <p className="font-display text-2xl font-semibold text-primary-strong">
          {FIRST_MOVE_LABEL[plan.firstMove]}
        </p>
        <p className="text-sm text-ink-soft">
          {plan.slots.length} decisions covered — swap any of them before you lock it in.
        </p>
      </Card>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-ink">As White</h2>
        {white.map((s) => (
          <SlotCard key={s.slot} plan={plan} slot={s} onSwap={handleSwap} />
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-ink">As Black</h2>
        {black.map((s) => (
          <SlotCard key={s.slot} plan={plan} slot={s} onSwap={handleSwap} />
        ))}
      </section>

      {plan.uncovered.length > 0 && (
        <Card className="space-y-2 border-amber/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber">
            Not in the library yet
          </p>
          <ul className="space-y-1 text-sm text-ink-soft">
            {plan.uncovered.map((slot) => (
              <li key={slot}>{SLOTS[slot].prompt} — no line authored for this yet.</li>
            ))}
          </ul>
        </Card>
      )}

      <button type="button" onClick={onConfirm} className={buttonClasses("primary", "lg")}>
        Lock it in
      </button>
    </div>
  );
}
