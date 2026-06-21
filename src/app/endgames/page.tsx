"use client";

// Endgame Trainer — drill the must-know endgames against the engine (it defends),
// reusing the DrillPlayer loop. Winning twice "masters" a position (tracked in the
// shared SRS store). A no-params static route.

import { useState } from "react";
import type { DrillActivity } from "@/content/types";
import { ENDGAMES, ENDGAME_CATEGORIES, type EndgamePosition } from "@/lib/endgames/positions";
import { useSrs, srsStore } from "@/lib/srs/useSrs";
import type { SrsData } from "@/lib/srs/store";
import { recordDailyActivity } from "@/lib/rewards/daily";
import { DrillPlayer } from "@/components/activities/DrillPlayer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClasses } from "@/components/ui/Button";
import { ChevronRightIcon, CheckIcon } from "@/components/icons";

type Level = "new" | "learning" | "mastered";

function levelOf(srs: SrsData, id: string): Level {
  const it = srs[`eg:${id}`];
  if (!it) return "new";
  return it.box >= 2 ? "mastered" : "learning";
}

export default function EndgamesPage() {
  const srs = useSrs();
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = ENDGAMES.find((e) => e.id === activeId) ?? null;
  if (active) {
    return <EndgameDrill position={active} onExit={() => setActiveId(null)} />;
  }

  const mastered = ENDGAMES.filter((e) => levelOf(srs, e.id) === "mastered").length;

  return (
    <main className="space-y-6">
      <PageHeader
        backHref="/"
        backLabel="Home"
        eyebrow="Trainer"
        title="Endgame Trainer"
        subtitle="Drill the endgames that win games. The engine defends — beat it to master each one."
      />

      <Card className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-semibold text-walnut-deep">Mastery</span>
          <Chip tone="sage">{mastered} / {ENDGAMES.length} mastered</Chip>
        </div>
        <ProgressBar pct={(mastered / ENDGAMES.length) * 100} />
        <p className="text-sm text-ink-soft">Beat a position twice to master it.</p>
      </Card>

      {ENDGAME_CATEGORIES.map((cat) => (
        <div key={cat} className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-brass">{cat}</h2>
          <div className="space-y-2">
            {ENDGAMES.filter((e) => e.category === cat).map((e) => {
              const level = levelOf(srs, e.id);
              return (
                <button key={e.id} type="button" onClick={() => setActiveId(e.id)} className="block w-full text-left">
                  <Card interactive className="flex items-center gap-3 p-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-walnut-deep">{e.name}</p>
                      <p className="text-sm text-ink-soft">
                        {e.objective === "checkmate" ? "Checkmate the lone king" : "Promote a pawn"}
                      </p>
                    </div>
                    <Chip tone={level === "mastered" ? "sage" : level === "learning" ? "amber" : "neutral"}>
                      {level === "mastered" ? "Mastered" : level === "learning" ? "Learning" : "New"}
                    </Chip>
                    <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
                  </Card>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}

function EndgameDrill({
  position,
  onExit,
}: {
  position: EndgamePosition;
  onExit: () => void;
}) {
  const [won, setWon] = useState(false);
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
        backLabel="All endgames"
        right={
          <button type="button" onClick={onExit} className="text-sm font-medium text-ink-soft transition hover:text-ink">
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
            <button type="button" onClick={onExit} className={buttonClasses("primary", "lg")}>
              Back to endgames
            </button>
          </div>
        </Card>
      )}
    </main>
  );
}
