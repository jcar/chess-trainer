"use client";

// One opening: its detail page, or (when a session is started) the drill. The
// drill session is transient state on top of this route — Back from the opening
// returns to the catalog (/trainer). Unknown id → 404.

import { notFound } from "next/navigation";
import { useState } from "react";
import { getOpening } from "@/content/openings";
import type { TrainerLine } from "@/lib/trainer/lines";
import { useTrainer } from "@/lib/trainer/useTrainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { TrainerSession } from "@/components/trainer/TrainerSession";
import { OpeningDetail } from "@/components/trainer/OpeningDetail";

export function TrainerOpeningView({ openingId }: { openingId: string }) {
  const opening = getOpening(openingId);
  const { recordLineResult } = useTrainer();
  const [session, setSession] = useState<{ lines: TrainerLine[] } | null>(null);

  if (!opening) notFound();

  if (session) {
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

  return (
    <main className="space-y-5">
      <OpeningDetail opening={opening} onStartSession={(lines) => setSession({ lines })} />
    </main>
  );
}
