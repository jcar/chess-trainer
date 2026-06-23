"use client";

// Openings Trainer — a top-level tool (not a learning module). Build a personal
// repertoire, then drill it move-by-move with mastery tracking. A no-params route,
// so it can be a single client component (no generateStaticParams); it inherits
// the app shell from the root layout. All data is embedded (OPENINGS) — fully
// static, no fetch.

import Link from "next/link";
import { useState } from "react";
import { getOpening } from "@/content/openings";
import type { TrainerLine } from "@/lib/trainer/lines";
import { useTrainer } from "@/lib/trainer/useTrainer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClasses } from "@/components/ui/Button";
import { RepertoirePicker } from "@/components/trainer/RepertoirePicker";
import { TrainerSession } from "@/components/trainer/TrainerSession";

type Phase = "dashboard" | "edit" | "session";

export default function TrainerPage() {
  const { data, counts, due, recordLineResult } = useTrainer();
  const [phase, setPhase] = useState<Phase>("dashboard");
  const [queue, setQueue] = useState<TrainerLine[]>([]);

  const hasRepertoire = data.repertoire.length > 0;

  function startSession() {
    if (due.length === 0) return;
    setQueue(due); // snapshot so the queue is fixed for the session
    setPhase("session");
  }

  if (phase === "session") {
    return (
      <main className="space-y-5">
        <PageHeader eyebrow="Training" title="Drilling your repertoire" />
        <TrainerSession
          queue={queue}
          recordLineResult={recordLineResult}
          onExit={() => setPhase("dashboard")}
        />
      </main>
    );
  }

  if (phase === "edit") {
    return (
      <main className="space-y-5">
        <PageHeader
          eyebrow="Repertoire"
          title="Choose your openings"
          subtitle="Pick the openings you play. Each is trained from its natural side."
        />
        <RepertoirePicker />
        <div className="sticky bottom-3 flex justify-end">
          <button
            type="button"
            onClick={() => setPhase("dashboard")}
            className={buttonClasses("primary", "lg")}
          >
            Done
          </button>
        </div>
      </main>
    );
  }

  // Dashboard
  const pct = counts.total ? (counts.mastered / counts.total) * 100 : 0;
  return (
    <main className="space-y-6">
      <PageHeader
        backHref="/"
        backLabel="Home"
        eyebrow="Trainer"
        title="Openings Trainer"
        subtitle="Build a repertoire and drill it until it's second nature."
      />

      {!hasRepertoire ? (
        <Card className="space-y-4 p-6 text-center">
          <p className="font-display text-xl font-semibold text-primary-strong">
            Start by choosing your openings
          </p>
          <p className="text-ink-soft">
            Tell the trainer which openings you play, and it will drill those
            lines with you — move by move, until you&apos;ve got them.
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setPhase("edit")}
              className={buttonClasses("primary", "lg")}
            >
              Choose openings
            </button>
          </div>
        </Card>
      ) : (
        <>
          <Card className="space-y-3 p-5">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-primary-strong">
                Mastery
              </span>
              <Chip tone="sage">
                {counts.mastered} / {counts.total} mastered
              </Chip>
            </div>
            <ProgressBar pct={pct} />
            <p className="text-sm text-ink-soft">
              {counts.due > 0
                ? `${counts.due} ${counts.due === 1 ? "line" : "lines"} to drill.`
                : "Everything mastered — drill again any time to keep it sharp."}
            </p>
          </Card>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startSession}
              disabled={due.length === 0}
              className={buttonClasses(
                "primary",
                "lg",
                "disabled:opacity-40",
              )}
            >
              {due.length > 0 ? `Start session (${due.length})` : "All mastered"}
            </button>
            <button
              type="button"
              onClick={() => setPhase("edit")}
              className={buttonClasses("secondary", "lg")}
            >
              Edit repertoire
            </button>
          </div>

          <div className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              Your repertoire
            </h2>
            <RepertoireSummary />
          </div>
        </>
      )}
    </main>
  );
}

function RepertoireSummary() {
  const { data, due } = useTrainer();
  const dueIds = new Set(due.map((l) => l.opening.id));
  return (
    <div className="space-y-2">
      {data.repertoire.map((id) => {
        const o = getOpening(id);
        if (!o) return null;
        const someDue = dueIds.has(id);
        return (
          <Card key={id} className="flex items-center justify-between gap-3 p-3">
            <span className="min-w-0">
              <span className="block font-semibold text-primary-strong">
                {o.name}
              </span>
              <span className="block truncate font-mono text-xs text-ink-soft">
                {o.firstMoves}
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-2">
              <Chip tone={someDue ? "amber" : "sage"}>
                {someDue ? "In progress" : "Mastered"}
              </Chip>
              <Link
                href={`/play?fen=${encodeURIComponent(o.tabiyaFen)}&color=${o.trainerColor}`}
                className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft transition hover:border-primary/40 hover:text-ink"
                title="Play this position out vs the engine"
              >
                Spar
              </Link>
            </span>
          </Card>
        );
      })}
    </div>
  );
}
