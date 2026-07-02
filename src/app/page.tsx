"use client";

import Link from "next/link";
import { useState } from "react";
import { MODULES, getModule, getModuleActivities } from "@/content";
import { LEARNING_PATH, KIDS_MODULE_ID } from "@/content/path";
import { useProgress } from "@/lib/progress/useProgress";
import { useSrs } from "@/lib/srs/useSrs";
import { recommendNext } from "@/lib/learner/recommend";
import { usePlacement } from "@/lib/learner/placementStore";
import { useTrainer } from "@/lib/trainer/useTrainer";
import { useDailyStreak } from "@/lib/rewards/daily";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useShowSupport } from "@/lib/prefs/support";
import { RecommendedNext } from "@/components/home/RecommendedNext";
import { ModulePlate } from "@/components/home/ModulePlate";
import {
  ChevronRightIcon,
  CrownGlyph,
  OpeningDrillIcon,
  PuzzleIcon,
  FlameIcon,
  CheckIcon,
  PlayIcon,
  SearchIcon,
} from "@/components/icons";

/** A shopping-bag glyph for the gear guide (no matching icon in the icon set). */
function GearBagGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

const TOOLS = [
  { href: "/tactics", label: "Tactics", sub: "Sharpen your eye", Icon: PuzzleIcon, tone: "amber" },
  { href: "/trainer", label: "Openings", sub: "Drill a repertoire", Icon: OpeningDrillIcon, tone: "primary" },
  { href: "/play", label: "Play & Review", sub: "Game + analysis", Icon: PlayIcon, tone: "clay" },
  { href: "/endgames", label: "Endgames", sub: "Master technique", Icon: CrownGlyph, tone: "sage" },
] as const;

export default function HomePage() {
  const { moduleProgress, snapshot } = useProgress();
  const srs = useSrs();
  const placement = usePlacement();
  // Capture "now" once (lazy init) — Date.now() during render is impure.
  const [now] = useState(() => Date.now());
  const { counts: trainerCounts } = useTrainer();
  const daily = useDailyStreak();
  const showSupport = useShowSupport();
  const started = MODULES.some(
    (mod) => moduleProgress(getModuleActivities(mod).map((a) => a.id)) > 0,
  );

  // Which module the "Recommended next" card points at — mirror its placement
  // override, then pull the module id out of the href so the matching plate can
  // wear a "Next" badge. (Tool recs like /tactics yield no module → no badge.)
  const { rec } = recommendNext(snapshot(), srs, now);
  const recHref =
    rec.kind === "start" && placement ? placement.recommendedHref : rec.href;
  const recommendedModuleId = recHref.match(/^\/modules\/([^/]+)/)?.[1] ?? null;

  return (
    <div className="space-y-8">
      {/* ── Masthead ── */}
      <header className="rise pt-1">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
          {started ? "Welcome back" : "Welcome"}
        </p>
        <h1 className="mt-2 font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-[3.25rem]">
          The Chess <span className="text-primary-strong">Hall</span>
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          Pick a room and pull up a chair. Hands-on lessons, guided puzzles, and
          friendly games — from a child&apos;s first move to confident, clever play.
        </p>
      </header>

      {/* ── Feature strip: daily + continue ── */}
      <section className="rise grid gap-3 sm:grid-cols-2" style={{ animationDelay: "60ms" }}>
        <Link href="/daily" className="block">
          <Card interactive className="flex h-full items-center gap-3.5 p-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-on-accent" style={{ backgroundColor: "var(--color-accent)" }}>
              <FlameIcon className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold text-ink">Puzzle of the day</p>
              <p className="text-sm text-ink-soft">
                {daily.playedToday ? (
                  <span className="inline-flex items-center gap-1 text-sage">
                    <CheckIcon className="h-4 w-4" /> Done — {daily.current}-day streak
                  </span>
                ) : daily.current > 0 ? (
                  `Keep your ${daily.current}-day streak alive`
                ) : (
                  "A fresh tactic, every morning"
                )}
              </p>
            </div>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
          </Card>
        </Link>

        <RecommendedNext />
      </section>

      {/* ── Your learning path: modules grouped into stages (soft — nothing locked) ── */}
      <div className="space-y-7">
        {LEARNING_PATH.map((stage, si) => {
          const mods = stage.moduleIds
            .map(getModule)
            .filter((m): m is NonNullable<typeof m> => !!m);
          const doneCount = mods.filter(
            (m) => moduleProgress(getModuleActivities(m).map((a) => a.id)) === 1,
          ).length;
          return (
            <section key={stage.id} className="space-y-3">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                    <span className="text-primary-strong">Stage {si + 1}</span> · {stage.label}
                  </h2>
                  <span className="h-px flex-1 bg-line" />
                  <span className="shrink-0 text-xs text-ink-soft">
                    {doneCount > 0 ? `${doneCount} / ${mods.length} done` : `${mods.length} rooms`}
                  </span>
                </div>
                <p className="mt-1.5 max-w-xl text-sm text-ink-soft">{stage.blurb}</p>
              </div>
              <div className="grid gap-3.5 sm:grid-cols-2">
                {mods.map((m, i) => (
                  <ModulePlate
                    key={m.id}
                    module={m}
                    delayMs={120 + (si * 3 + i) * 55}
                    highlighted={m.id === recommendedModuleId}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* Young learners — a separate on-ramp, set apart from the adult path. */}
        {getModule(KIDS_MODULE_ID) && (
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                Just for kids · ages 5–8
              </h2>
              <span className="h-px flex-1 bg-line" />
            </div>
            <p className="max-w-xl text-sm text-ink-soft">
              A gentle, illustrated first course guided by Pip the pawn — perfect for a
              young child&apos;s very first games.
            </p>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <ModulePlate module={getModule(KIDS_MODULE_ID)!} delayMs={120} />
            </div>
          </section>
        )}
      </div>

      {/* ── Tools / practice ── */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
          The training rooms
          <span className="h-px flex-1 bg-line" />
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} className="block">
              <Card interactive className="flex h-full flex-col gap-2 p-4">
                <span className="grid h-10 w-10 place-items-center rounded-xl text-on-accent" style={{ backgroundColor: `var(--color-${t.tone})` }}>
                  <t.Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base font-semibold leading-tight text-ink">{t.label}</p>
                  <p className="text-xs text-ink-soft">{t.sub}</p>
                </div>
                {t.href === "/trainer" && trainerCounts.total > 0 && (
                  <ProgressBar
                    pct={(trainerCounts.mastered / trainerCounts.total) * 100}
                    className="mt-1"
                  />
                )}
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── A quiet side offer: the gear guide (gated by the Support toggle) ── */}
      {showSupport && (
      <section className="rise" style={{ animationDelay: "320ms" }}>
        <Link href="/gear" className="block">
          <Card interactive className="flex items-center gap-3.5 p-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-on-accent" style={{ backgroundColor: "var(--color-clay)" }}>
              <GearBagGlyph className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-semibold text-ink">Chess Gear Guide</p>
              <p className="text-sm text-ink-soft">Our favorite sets, boards &amp; books for off-screen play</p>
            </div>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
          </Card>
        </Link>
      </section>
      )}

      {/* ── Brand-new learner: where to start ── */}
      {!started && (
        <section className="space-y-3">
          <h2 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
            New here? Start in the right place
            <span className="h-px flex-1 bg-line" />
          </h2>
          <Link href="/placement" className="block">
            <Card interactive className="flex items-center gap-3.5 p-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-on-accent" style={{ backgroundColor: "var(--color-primary)" }}>
                <SearchIcon className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg font-semibold text-ink">Not sure where to begin?</p>
                <p className="text-sm text-ink-soft">Take the 2-minute placement test — find your level and the right room.</p>
              </div>
              <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
            </Card>
          </Link>
          <p className="pt-1 text-xs text-ink-soft/80">…or jump straight in:</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { href: "/modules/chess-for-kids", title: "Brand new", sub: "Never played — or learning with a child" },
              { href: "/modules/fundamentals", title: "I know the rules", sub: "Lock in the fundamentals" },
              { href: "/tactics", title: "Get stronger", sub: "Train tactics & endgames" },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="block">
                <Card interactive className="flex h-full flex-col gap-1 p-4">
                  <p className="font-display text-base font-semibold text-ink">{c.title}</p>
                  <p className="text-sm text-ink-soft">{c.sub}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
