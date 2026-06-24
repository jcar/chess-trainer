"use client";

// The Openings Trainer catalog: browse every opening (grouped by first-move
// family, core tier first) and pick ONE to focus on. Each row links to that
// opening's page; per-opening mastery comes from the per-line SRS state, and the
// collapsible Strategy panel gives a bit of info without leaving the list.

import Link from "next/link";
import type { OpeningFamily } from "@/content/openings/types";
import { allOpenings, masteryCounts } from "@/lib/trainer/lines";
import { useTrainer } from "@/lib/trainer/useTrainer";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ChevronRightIcon } from "@/components/icons";
import { OpeningSummary } from "./OpeningSummary";

const FAMILY_ORDER: OpeningFamily[] = ["1e4-e5", "1e4-other", "1d4", "flank"];
const FAMILY_LABEL: Record<OpeningFamily, string> = {
  "1e4-e5": "1.e4 e5 — Open Games",
  "1e4-other": "Other 1.e4 Defences",
  "1d4": "1.d4 Openings",
  flank: "Flank Openings",
};

export function OpeningCatalog() {
  const { srs } = useTrainer();
  const openings = allOpenings();

  return (
    <div className="space-y-6">
      {FAMILY_ORDER.map((fam) => {
        const list = openings
          .filter((o) => o.family === fam)
          .sort((a, b) => (a.tier === "core" ? 0 : 1) - (b.tier === "core" ? 0 : 1));
        if (!list.length) return null;
        return (
          <div key={fam} className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              {FAMILY_LABEL[fam]}
            </h3>
            <div className="space-y-2">
              {list.map((o) => {
                const c = masteryCounts(srs, [o.id]);
                return (
                  <div key={o.id} className="space-y-1.5">
                    <Link href={`/trainer?opening=${o.id}`} className="block">
                      <Card interactive className="flex items-center gap-3 p-3">
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold text-primary-strong">
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
                        <span className="shrink-0 text-xs font-semibold text-ink-soft">
                          {c.mastered}/{c.total}
                        </span>
                        <ChevronRightIcon className="h-4 w-4 shrink-0 text-ink-soft" />
                      </Card>
                    </Link>
                    <OpeningSummary opening={o} triggerLabel="Strategy" />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
