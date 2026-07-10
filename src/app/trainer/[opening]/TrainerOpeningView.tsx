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
import { WhyCheckpoint } from "@/components/trainer/WhyCheckpoint";
import { OpeningDetail } from "@/components/trainer/OpeningDetail";

export function TrainerOpeningView({ openingId }: { openingId: string }) {
  const opening = getOpening(openingId);
  const { recordLineResult, recordConcept } = useTrainer();
  const [session, setSession] = useState<{ lines: TrainerLine[] } | null>(null);
  const [ideaOpen, setIdeaOpen] = useState(false);

  if (!opening) notFound();

  if (session) {
    return (
      <main className="space-y-5">
        <PageHeader eyebrow="Training" title={`Drilling ${opening.name}`} />
        <TrainerSession
          queue={session.lines}
          recordLineResult={recordLineResult}
          recordConcept={recordConcept}
          onExit={() => setSession(null)}
        />
      </main>
    );
  }

  if (ideaOpen) {
    return (
      <main className="space-y-5">
        <PageHeader eyebrow="Training" title={`${opening.name} — idea check`} />
        <WhyCheckpoint
          opening={opening}
          onContinue={(passed) => {
            recordConcept(opening.id, passed);
            setIdeaOpen(false);
          }}
        />
      </main>
    );
  }

  return (
    <main className="space-y-5">
      <OpeningDetail
        opening={opening}
        onStartSession={(lines) => setSession({ lines })}
        onIdeaCheck={() => setIdeaOpen(true)}
      />
    </main>
  );
}
