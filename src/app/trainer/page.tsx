"use client";

// Openings Trainer catalog — pick an opening; each opens its own route
// (/trainer/<id>) so Back returns to the catalog. Fully static (embedded data).

import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { OpeningCatalog } from "@/components/trainer/OpeningCatalog";
import { ChevronRightIcon, PlayIcon } from "@/components/icons";

export default function TrainerPage() {
  return (
    <main className="space-y-6">
      <PageHeader
        backHref="/"
        backLabel="Home"
        eyebrow="Trainer"
        title="Openings Trainer"
        subtitle="Drill lines until they're second nature — or spar a real game from a surprise opening with a coach at your side."
      />

      <Link href="/trainer/sparring" className="block">
        <Card interactive className="flex items-center gap-3.5 p-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-on-accent" style={{ backgroundColor: "var(--color-accent)" }}>
            <PlayIcon className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
              Sparring <Chip tone="primary">New</Chip>
            </p>
            <p className="text-sm text-ink-soft">Play a full game from a random opening — react blind, and the coach names the line, flags slips, and tells you when the middlegame starts.</p>
          </div>
          <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
        </Card>
      </Link>

      <div className="space-y-3">
        <h2 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
          Browse &amp; drill openings
          <span className="h-px flex-1 bg-line" />
        </h2>
        <OpeningCatalog />
      </div>
    </main>
  );
}
