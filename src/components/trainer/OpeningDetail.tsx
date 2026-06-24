"use client";

// The focused page for a single opening: its key position, strategy, and a list
// of its lines. Each line shows how well you know it (from the per-line SRS box)
// and a one-line summary, so you can drill the whole opening or jump straight
// into the one line you want to sharpen.

import Link from "next/link";
import type { Opening } from "@/content/openings/types";
import type { TrainerLine } from "@/lib/trainer/lines";
import { openingLines, lineState, masteryCounts } from "@/lib/trainer/lines";
import { useTrainer } from "@/lib/trainer/useTrainer";
import { Board } from "@/components/board/Board";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { buttonClasses } from "@/components/ui/Button";
import { ArrowLeftIcon } from "@/components/icons";
import { OpeningSummary } from "./OpeningSummary";

const MAX_BOX = 5; // matches the SRS Leitner ladder length

interface Props {
  opening: Opening;
  onStartSession: (lines: TrainerLine[]) => void;
}

export function OpeningDetail({ opening, onStartSession }: Props) {
  const { srs } = useTrainer();
  const lines = openingLines(opening);
  const counts = masteryCounts(srs, [opening.id]);
  const pct = counts.total ? (counts.mastered / counts.total) * 100 : 0;

  return (
    <div className="space-y-5">
      <Link
        href="/trainer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition hover:text-ink"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        All openings
      </Link>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-display text-2xl font-semibold tracking-tight text-primary-strong">
            {opening.name}
          </h1>
          {opening.eco && <Chip tone="neutral">{opening.eco}</Chip>}
          <Chip tone="neutral">
            {opening.trainerColor === "white" ? "White" : "Black"}
          </Chip>
        </div>
        <p className="font-mono text-xs text-ink-soft">{opening.firstMoves}</p>
      </div>

      <div className="mx-auto w-full max-w-[26rem]">
        <Board
          fen={opening.tabiyaFen}
          orientation={opening.trainerColor}
          interactive={false}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => onStartSession(lines)}
          className={buttonClasses("primary", "lg")}
        >
          Train all lines
        </button>
        <Link
          href={`/play?fen=${encodeURIComponent(opening.tabiyaFen)}&color=${opening.trainerColor}`}
          className={buttonClasses("secondary", "lg")}
          title="Play this position out vs the engine"
        >
          Spar vs engine
        </Link>
      </div>

      <OpeningSummary opening={opening} defaultOpen />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
            Lines
          </h2>
          <span className="text-xs font-semibold text-ink-soft">
            {counts.mastered}/{counts.total} mastered
          </span>
        </div>
        <ProgressBar pct={pct} />

        <div className="space-y-2 pt-1">
          {lines.map((tl) => {
            const st = lineState(srs, tl);
            const summary =
              tl.line.summary ??
              (tl.line.branch
                ? `The opponent deviates with ${tl.line.branch.tryMove} — know your reply.`
                : undefined);
            return (
              <Card key={tl.key} className="space-y-2 p-3">
                <div className="flex items-start gap-2">
                  <span className="min-w-0 flex-1 font-semibold text-primary-strong">
                    {tl.line.label}
                  </span>
                  <MasteryBadge
                    status={st.status}
                    box={st.box}
                  />
                </div>
                {summary && (
                  <p className="text-sm leading-relaxed text-ink-soft">{summary}</p>
                )}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onStartSession([tl])}
                    className={buttonClasses("secondary", "md")}
                  >
                    Drill
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MasteryBadge({
  status,
  box,
}: {
  status: "new" | "learning" | "mastered";
  box: number;
}) {
  const tone = status === "mastered" ? "sage" : status === "learning" ? "amber" : "neutral";
  const label =
    status === "mastered" ? "Mastered" : status === "learning" ? "Learning" : "New";
  return (
    <span className="flex shrink-0 items-center gap-2">
      {/* Box meter — a coarse "how good are you at this line" gauge. */}
      <span className="flex items-center gap-1" aria-hidden>
        {Array.from({ length: MAX_BOX }, (_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${
              i < box ? "bg-accent" : "bg-ink/15"
            }`}
          />
        ))}
      </span>
      <Chip tone={tone}>{label}</Chip>
    </span>
  );
}
