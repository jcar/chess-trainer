"use client";

// Endgame Trainer — list of must-know endgames. Each is a real route
// (/endgames/<id>) so Back returns to this list instead of leaving the section.

import Link from "next/link";
import { ENDGAMES, ENDGAME_CATEGORIES } from "@/lib/endgames/positions";
import { useSrs } from "@/lib/srs/useSrs";
import type { SrsData } from "@/lib/srs/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ChevronRightIcon } from "@/components/icons";

type Level = "new" | "learning" | "mastered";

function levelOf(srs: SrsData, id: string): Level {
  const it = srs[`eg:${id}`];
  if (!it) return "new";
  return it.box >= 2 ? "mastered" : "learning";
}

export default function EndgamesPage() {
  const srs = useSrs();
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
          <span className="font-display text-lg font-semibold text-primary-strong">Mastery</span>
          <Chip tone="sage">{mastered} / {ENDGAMES.length} mastered</Chip>
        </div>
        <ProgressBar pct={(mastered / ENDGAMES.length) * 100} />
        <p className="text-sm text-ink-soft">Beat a position twice to master it.</p>
      </Card>

      {ENDGAME_CATEGORIES.map((cat) => (
        <div key={cat} className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">{cat}</h2>
          <div className="space-y-2">
            {ENDGAMES.filter((e) => e.category === cat).map((e) => {
              const level = levelOf(srs, e.id);
              return (
                <Link key={e.id} href={`/endgames/${e.id}`} className="block">
                  <Card interactive className="flex items-center gap-3 p-4">
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-primary-strong">{e.name}</p>
                      <p className="text-sm text-ink-soft">
                        {e.objective === "checkmate" ? "Checkmate the lone king" : "Promote a pawn"}
                      </p>
                    </div>
                    <Chip tone={level === "mastered" ? "sage" : level === "learning" ? "amber" : "neutral"}>
                      {level === "mastered" ? "Mastered" : level === "learning" ? "Learning" : "New"}
                    </Chip>
                    <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}
