"use client";

// Openings Trainer — a top-level tool (not a learning module). Pick ONE opening
// from the catalog and drill it: train all its lines, or jump into a single line.
// A no-params route, but it reads `?opening=<id>` to focus an opening (same
// useSearchParams + <Suspense> pattern as /play and /tactics under output:export).
// All data is embedded (OPENINGS) — fully static, no fetch.

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getOpening } from "@/content/openings";
import type { TrainerLine } from "@/lib/trainer/lines";
import { useTrainer } from "@/lib/trainer/useTrainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { TrainerSession } from "@/components/trainer/TrainerSession";
import { OpeningCatalog } from "@/components/trainer/OpeningCatalog";
import { OpeningDetail } from "@/components/trainer/OpeningDetail";

export default function TrainerPage() {
  return (
    <Suspense fallback={<main className="space-y-6" />}>
      <TrainerPageInner />
    </Suspense>
  );
}

function TrainerPageInner() {
  const params = useSearchParams();
  const openingId = params.get("opening");
  const opening = openingId ? getOpening(openingId) : undefined;
  const { recordLineResult } = useTrainer();
  // Session is transient state on top of an opening; keyed to the opening id so a
  // stale queue never bleeds into a different opening.
  const [session, setSession] = useState<{
    openingId: string;
    lines: TrainerLine[];
  } | null>(null);

  // Drilling a focused opening.
  if (opening && session && session.openingId === opening.id) {
    return (
      <main className="space-y-5">
        <PageHeader eyebrow="Training" title={`Drilling ${opening.name}`} />
        <TrainerSession
          queue={session.lines}
          recordLineResult={recordLineResult}
          onExit={() => setSession(null)}
        />
      </main>
    );
  }

  // Focused opening page.
  if (opening) {
    return (
      <main className="space-y-5">
        <OpeningDetail
          opening={opening}
          onStartSession={(lines) =>
            setSession({ openingId: opening.id, lines })
          }
        />
      </main>
    );
  }

  // Catalog (no / unknown ?opening).
  return (
    <main className="space-y-6">
      <PageHeader
        backHref="/"
        backLabel="Home"
        eyebrow="Trainer"
        title="Openings Trainer"
        subtitle="Pick an opening and drill it line by line until it's second nature."
      />
      <OpeningCatalog />
    </main>
  );
}
