"use client";

// One endgame position drilled against the engine. Back returns to /endgames.

import { notFound } from "next/navigation";
import { useState } from "react";
import type { DrillActivity } from "@/content/types";
import { ENDGAMES } from "@/lib/endgames/positions";
import { srsStore } from "@/lib/srs/useSrs";
import { recordDailyActivity } from "@/lib/rewards/daily";
import { DrillPlayer } from "@/components/activities/DrillPlayer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/Button";
import { CheckIcon } from "@/components/icons";
import { useToolBack } from "@/lib/nav/useToolBack";

export function EndgameDrillView({ id }: { id: string }) {
  const back = useToolBack("/endgames");
  const [won, setWon] = useState(false);
  const position = ENDGAMES.find((e) => e.id === id);
  if (!position) notFound();

  const drill: DrillActivity = {
    type: "drill",
    id: `eg-${position.id}`,
    title: position.name,
    fen: position.fen,
    orientation: position.orientation,
    objective: position.objective,
    engineSkill: position.engineSkill,
    instructions: position.instructions,
    successText: position.successText,
  };

  return (
    <main className="space-y-5">
      <PageHeader
        eyebrow="Endgame"
        title={position.name}
        right={
          <button type="button" onClick={back} className="text-sm font-medium text-ink-soft transition hover:text-ink">
            ← All endgames
          </button>
        }
      />

      <DrillPlayer
        activity={drill}
        tapToMove
        onComplete={() => {
          srsStore.record(`eg:${position.id}`, true);
          recordDailyActivity();
          setWon(true);
        }}
      />

      {won && (
        <Card className="space-y-3 p-5 text-center">
          <p className="font-display text-xl font-semibold text-sage">
            <CheckIcon className="inline h-6 w-6" /> Position won!
          </p>
          <div className="flex justify-center gap-3">
            <button type="button" onClick={back} className={buttonClasses("primary", "lg")}>
              Back to endgames
            </button>
          </div>
        </Card>
      )}
    </main>
  );
}
