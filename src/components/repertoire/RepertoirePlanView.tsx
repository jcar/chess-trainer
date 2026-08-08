"use client";

// The Chooser's result screen: one card per repertoire slot, each swappable.
// "Swap" is how a learner who already knows their openings gets served — the
// wizard proposes, they override, and both paths produce the same plan object.
//
// Cards headline the system WE play, never the opening file's name. Those differ
// whenever a slot's colour isn't the side the opening is written for: the file
// `caro-kann.ts` holds both sides' moves, so a White slot answering 1...c6 would
// otherwise read "Caro-Kann Defence" — as if we were told to play it as White.

import { useState } from "react";
import Link from "next/link";
import { MiniBoard } from "@/components/board/MiniBoard";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { buttonClasses } from "@/components/ui/Button";
import { WhyThisPlan } from "./WhyThisPlan";
import { getOpening } from "@/content/openings";
import {
  rankCandidates,
  swapSlot,
  type RepertoirePlan,
} from "@/lib/repertoire/chooser";
import { dataForPlan } from "@/lib/repertoire/cost";
import { movesGloss, slotMoves, systemNameFor } from "@/lib/repertoire/naming";
import { treesFor } from "@/lib/repertoire/useRepertoire";
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
  answers,
  onSwap,
}: {
  plan: RepertoirePlan;
  slot: RepertoirePlan["slots"][number];
  answers?: Record<string, number>;
  onSwap: (slotId: SlotId, openingId: string) => void;
}) {
  const [picking, setPicking] = useState(false);
  const opening = getOpening(slot.openingId);
  const color = SLOTS[slot.slot].color;

  const data = dataForPlan(plan);
  const trees = treesFor(data);
  const tree = color === "white" ? trees.white : trees.black;
  const moves = slotMoves(tree, slot.slot, data.choices, 3);
  const systemName = systemNameFor(slot.slot, slot.openingId, moves.moves);
  const gloss = movesGloss(moves, slot.slot);

  // Ranked alternatives when we have the answers; otherwise the plain list.
  const ranked = answers ? rankCandidates(answers, slot.slot, plan.firstMove) : null;
  const options = ranked
    ? ranked.filter((c) => c.openingId !== slot.openingId)
    : candidatesFor(slot.slot, plan.firstMove)
        .filter((t) => t.id !== slot.openingId)
        .map((t) => ({
          openingId: t.id,
          openingName: getOpening(t.id)?.name ?? t.id,
          systemName: systemNameFor(slot.slot, t.id),
          demerit: undefined as string | undefined,
        }));

  return (
    <Card className="space-y-3 p-4">
      <div className="flex items-start gap-4">
        {opening && (
          <div className="w-24 shrink-0 sm:w-28">
            <MiniBoard fen={opening.tabiyaFen} orientation={color} />
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            {slot.prompt}
          </p>
          <p className="font-display text-lg font-semibold leading-tight text-ink">
            {systemName}
          </p>
          {gloss && (
            <p className="font-mono text-xs text-ink-soft">{gloss}</p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            {opening?.eco && <Chip tone="neutral">{opening.eco}</Chip>}
            <Chip tone={CONFIDENCE_TONE[slot.confidence]}>
              {CONFIDENCE_LABEL[slot.confidence]}
            </Chip>
          </div>
          <p className="text-sm text-ink-soft">{slot.why}</p>
          {opening && (
            <Link
              href={`/trainer/${opening.id}`}
              className="inline-block text-xs text-ink-soft underline transition hover:text-ink"
            >
              from the {opening.name} lines →
            </Link>
          )}
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
          {options.map((opt) => (
            <button
              key={opt.openingId}
              type="button"
              onClick={() => {
                onSwap(slot.slot, opt.openingId);
                setPicking(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl border border-line bg-card px-3 py-2.5 text-left transition hover:border-primary/55 hover:bg-primary/[0.05]"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-ink">
                  {opt.systemName}
                </span>
                <span className="block text-xs text-ink-soft">
                  {opt.demerit ? `${opt.demerit} · ` : ""}
                  from the {opt.openingName} lines
                </span>
              </span>
            </button>
          ))}
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
  answers,
  onChange,
  onConfirm,
  onRebuild,
}: {
  plan: RepertoirePlan;
  answers?: Record<string, number>;
  onChange: (next: RepertoirePlan) => void;
  onConfirm: () => void;
  onRebuild?: (firstMoveOptionIndex: number) => void;
}) {
  const white = plan.slots.filter((s) => SLOTS[s.slot].color === "white");
  const black = plan.slots.filter((s) => SLOTS[s.slot].color === "black");
  const handleSwap = (slotId: SlotId, openingId: string) =>
    onChange(swapSlot(plan, slotId, openingId));

  return (
    <div className="space-y-6">
      <WhyThisPlan plan={plan} answers={answers} onRebuild={onRebuild} />

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-ink">
          As White — {white.length} answers
        </h2>
        {white.map((s) => (
          <SlotCard
            key={s.slot}
            plan={plan}
            slot={s}
            answers={answers}
            onSwap={handleSwap}
          />
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold text-ink">
          As Black — {black.length} answers
        </h2>
        {black.map((s) => (
          <SlotCard
            key={s.slot}
            plan={plan}
            slot={s}
            answers={answers}
            onSwap={handleSwap}
          />
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
