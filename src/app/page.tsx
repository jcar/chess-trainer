"use client";

import Link from "next/link";
import { MODULES, getModuleActivities } from "@/content";
import type { Module } from "@/content/types";
import { useProgress } from "@/lib/progress/useProgress";
import { useTrainer } from "@/lib/trainer/useTrainer";
import { useDailyStreak } from "@/lib/rewards/daily";
import { Card } from "@/components/ui/Card";
import { LevelChip, Chip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  ChevronRightIcon,
  StarIcon,
  PawnGlyph,
  CrownGlyph,
  OpeningDrillIcon,
  PuzzleIcon,
  FlameIcon,
  CheckIcon,
  PlayIcon,
} from "@/components/icons";

/** The first not-yet-completed activity across all modules (for "Continue"). */
function firstIncomplete(
  isDone: (id: string) => boolean,
): { modId: string; actId: string } | null {
  for (const mod of MODULES) {
    for (const a of getModuleActivities(mod)) {
      if (!isDone(a.id)) return { modId: mod.id, actId: a.id };
    }
  }
  return null;
}

// Medallion glyph + color tone per module.
function moduleEmblem(mod: Module): {
  Glyph: (p: { className?: string }) => React.ReactNode;
  tone: string;
} {
  if (mod.kidMode) return { Glyph: (p) => <StarIcon {...p} />, tone: "kid-teal" };
  if (mod.id === "strategy") return { Glyph: PuzzleIcon, tone: "brass" };
  if (mod.level === "Intermediate")
    return { Glyph: CrownGlyph, tone: "amber" };
  if (mod.level === "Advanced") return { Glyph: CrownGlyph, tone: "clay" };
  return { Glyph: PawnGlyph, tone: "sage" };
}

export default function HomePage() {
  const { moduleProgress, getActivityState } = useProgress();
  const { counts: trainerCounts } = useTrainer();
  const daily = useDailyStreak();
  const cont = firstIncomplete((id) => getActivityState(id).completed);

  return (
    <main className="space-y-7">
      <section className="space-y-1.5 pt-1 text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-walnut-deep">
          Learn chess, beautifully.
        </h1>
        <p className="mx-auto max-w-md text-ink-soft">
          Hands-on lessons, guided puzzles, and friendly games — from a child&apos;s
          very first move to confident, clever play.
        </p>
      </section>

      {/* Today: daily puzzle + continue */}
      <section className="grid gap-3 sm:grid-cols-2">
        <Link href="/daily" className="block">
          <Card interactive className="flex h-full items-center gap-3 p-4">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
              style={{ backgroundColor: "var(--color-brass)" }}
            >
              <span className="text-[#fffdf7]"><FlameIcon className="h-6 w-6" /></span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-semibold text-walnut-deep">
                Puzzle of the Day
              </p>
              <p className="text-sm text-ink-soft">
                {daily.playedToday ? (
                  <span className="inline-flex items-center gap-1 text-sage">
                    <CheckIcon className="h-4 w-4" /> Done — {daily.current}-day streak
                  </span>
                ) : daily.current > 0 ? (
                  `Keep your ${daily.current}-day streak alive`
                ) : (
                  "Start a daily streak"
                )}
              </p>
            </div>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
          </Card>
        </Link>

        <Link href={cont ? `/modules/${cont.modId}/${cont.actId}` : "/daily"} className="block">
          <Card interactive className="flex h-full items-center gap-3 p-4">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
              style={{ backgroundColor: "var(--color-sage)" }}
            >
              <span className="text-[#fffdf7]"><PlayIcon className="h-6 w-6" /></span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-semibold text-walnut-deep">
                {cont ? "Continue learning" : "All caught up!"}
              </p>
              <p className="text-sm text-ink-soft">
                {cont ? "Pick up where you left off" : "Review or train your skills"}
              </p>
            </div>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
          </Card>
        </Link>
      </section>

      {/* Improver's Path — the fastest daily routine */}
      <Card className="space-y-3 p-5">
        <div className="flex items-center gap-2">
          <h2 className="font-display text-lg font-semibold text-walnut-deep">
            Improve fastest
          </h2>
          <Chip tone="sage">Daily routine</Chip>
        </div>
        <p className="text-sm text-ink-soft">
          Reading teaches; <span className="font-semibold text-ink">doing</span> is
          what makes you stronger. A good daily loop:
        </p>
        <ol className="space-y-1.5 text-sm">
          {[
            { n: 1, label: "Solve today's puzzle", href: "/daily" },
            { n: 2, label: "Train tactics for 10 minutes", href: "/tactics" },
            { n: 3, label: "Drill one endgame", href: "/endgames" },
            { n: 4, label: "Play a game and review it", href: "/play" },
          ].map((s) => (
            <li key={s.n}>
              <Link href={s.href} className="flex items-center gap-2.5 rounded-lg px-1 py-0.5 hover:bg-line/60">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-walnut text-xs font-bold text-[#fffdf7]">
                  {s.n}
                </span>
                <span className="font-medium text-ink">{s.label}</span>
                <ChevronRightIcon className="ml-auto h-4 w-4 text-ink-soft" />
              </Link>
            </li>
          ))}
        </ol>
        <p className="text-xs text-ink-soft">
          Work through the lessons below for depth whenever you want to learn something new.
        </p>
      </Card>

      <ul className="space-y-4">
        {MODULES.map((mod) => {
          const activityIds = getModuleActivities(mod).map((a) => a.id);
          const pct = Math.round(moduleProgress(activityIds) * 100);
          const { Glyph, tone } = moduleEmblem(mod);
          return (
            <li key={mod.id}>
              <Link href={`/modules/${mod.id}`} className="block">
                <Card interactive className="flex items-center gap-4 p-5">
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
                    style={{ backgroundColor: `var(--color-${tone})`, opacity: 1 }}
                  >
                    <span className="text-[#fffdf7]">
                      <Glyph className="h-7 w-7" />
                    </span>
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h2 className="font-display text-xl font-semibold tracking-tight text-walnut-deep">
                        {mod.title}
                      </h2>
                      <LevelChip module={mod} />
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-sm text-ink-soft">
                      {mod.description}
                    </p>
                    <ProgressBar
                      pct={pct}
                      tone={mod.kidMode ? "kid" : "sage"}
                      showLabel
                      className="mt-3"
                    />
                  </div>

                  <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>

      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-brass">
          Tools
        </h2>
        <Link href="/tactics" className="block">
          <Card interactive className="flex items-center gap-4 p-5">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
              style={{ backgroundColor: "var(--color-amber)" }}
            >
              <span className="text-[#fffdf7]">
                <PuzzleIcon className="h-7 w-7" />
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h2 className="font-display text-xl font-semibold tracking-tight text-walnut-deep">
                  Tactics Trainer
                </h2>
                <Chip tone="neutral">Practice</Chip>
              </div>
              <p className="mt-0.5 line-clamp-2 text-sm text-ink-soft">
                A spaced-repetition stream of puzzles by theme — the fastest way to
                sharpen your eye. Missed ones come back.
              </p>
            </div>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
          </Card>
        </Link>

        <Link href="/trainer" className="block">
          <Card interactive className="flex items-center gap-4 p-5">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
              style={{ backgroundColor: "var(--color-walnut)" }}
            >
              <span className="text-[#fffdf7]">
                <OpeningDrillIcon className="h-7 w-7" />
              </span>
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h2 className="font-display text-xl font-semibold tracking-tight text-walnut-deep">
                  Openings Trainer
                </h2>
                <Chip tone="neutral">Practice</Chip>
              </div>
              <p className="mt-0.5 line-clamp-2 text-sm text-ink-soft">
                Build a personal opening repertoire and drill it move by move
                until it&apos;s automatic.
              </p>
              {trainerCounts.total > 0 && (
                <ProgressBar
                  pct={(trainerCounts.mastered / trainerCounts.total) * 100}
                  showLabel
                  className="mt-3"
                />
              )}
            </div>

            <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
          </Card>
        </Link>

        <Link href="/play" className="block">
          <Card interactive className="flex items-center gap-4 p-5">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
              style={{ backgroundColor: "var(--color-clay)" }}
            >
              <span className="text-[#fffdf7]">
                <PlayIcon className="h-7 w-7" />
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h2 className="font-display text-xl font-semibold tracking-tight text-walnut-deep">
                  Play &amp; Review
                </h2>
                <Chip tone="neutral">Practice</Chip>
              </div>
              <p className="mt-0.5 line-clamp-2 text-sm text-ink-soft">
                Play a full game against the engine, then get a review that flags
                your mistakes and shows the better move.
              </p>
            </div>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
          </Card>
        </Link>

        <Link href="/endgames" className="block">
          <Card interactive className="flex items-center gap-4 p-5">
            <span
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl"
              style={{ backgroundColor: "var(--color-sage)" }}
            >
              <span className="text-[#fffdf7]">
                <CrownGlyph className="h-7 w-7" />
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h2 className="font-display text-xl font-semibold tracking-tight text-walnut-deep">
                  Endgame Trainer
                </h2>
                <Chip tone="neutral">Practice</Chip>
              </div>
              <p className="mt-0.5 line-clamp-2 text-sm text-ink-soft">
                Drill the must-know endgames against the engine until the technique
                is automatic.
              </p>
            </div>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
          </Card>
        </Link>
      </section>
    </main>
  );
}
