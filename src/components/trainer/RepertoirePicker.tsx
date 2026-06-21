"use client";

// Pick-your-repertoire: toggle which openings are "yours". Each opening trains
// its natural color (defences as Black, 1.e4-e5 / London / English as White).
// Selections persist immediately via the trainer store.

import type { OpeningFamily } from "@/content/openings/types";
import { allOpenings } from "@/lib/trainer/lines";
import { useTrainer } from "@/lib/trainer/useTrainer";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { CheckIcon } from "@/components/icons";

const FAMILY_ORDER: OpeningFamily[] = ["1e4-e5", "1e4-other", "1d4", "flank"];
const FAMILY_LABEL: Record<OpeningFamily, string> = {
  "1e4-e5": "1.e4 e5 — Open Games",
  "1e4-other": "Other 1.e4 Defences",
  "1d4": "1.d4 Openings",
  flank: "Flank Openings",
};

export function RepertoirePicker() {
  const { inRepertoire, toggleOpening } = useTrainer();
  const openings = allOpenings();

  return (
    <div className="space-y-5">
      <p className="text-sm text-ink-soft">
        <span className="font-semibold text-sage">Core</span> openings are a
        recommended starter repertoire — pick a couple of those first, then explore the rest.
      </p>
      {FAMILY_ORDER.map((fam) => {
        const list = openings
          .filter((o) => o.family === fam)
          .sort((a, b) => (a.tier === "core" ? 0 : 1) - (b.tier === "core" ? 0 : 1));
        if (!list.length) return null;
        return (
          <div key={fam} className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-brass">
              {FAMILY_LABEL[fam]}
            </h3>
            <div className="space-y-2">
              {list.map((o) => {
                const on = inRepertoire(o.id);
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => toggleOpening(o.id)}
                    aria-pressed={on}
                    className="block w-full text-left"
                  >
                    <Card
                      interactive
                      className={`flex items-center gap-3 p-3 ${on ? "ring-2 ring-sage" : ""}`}
                    >
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${
                          on ? "bg-sage text-[#fffdf7]" : "bg-ink/8 text-ink-soft"
                        }`}
                      >
                        {on && <CheckIcon className="h-4 w-4" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-walnut-deep">
                          {o.name}
                        </span>
                        <span className="block truncate font-mono text-xs text-ink-soft">
                          {o.firstMoves}
                        </span>
                      </span>
                      {o.tier === "core" && <Chip tone="sage">Core</Chip>}
                      <Chip tone="neutral">
                        {o.trainerColor === "white" ? "White" : "Black"}
                      </Chip>
                    </Card>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
