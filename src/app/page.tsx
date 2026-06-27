"use client";

import Link from "next/link";
import { MODULES, getModuleActivities } from "@/content";
import type { Module } from "@/content/types";
import { useProgress } from "@/lib/progress/useProgress";
import { useTrainer } from "@/lib/trainer/useTrainer";
import { useDailyStreak } from "@/lib/rewards/daily";
import { Card } from "@/components/ui/Card";
import { LevelChip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CHARACTER_IMAGES } from "@/lib/art/portraitManifest";
import { withBasePath } from "@/lib/basePath";
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

// Crest glyph + color tone per module.
function moduleEmblem(mod: Module): {
  Glyph: (p: { className?: string }) => React.ReactNode;
  tone: string;
} {
  if (mod.kidMode) return { Glyph: (p) => <StarIcon {...p} />, tone: "kid-teal" };
  if (mod.id === "strategy") return { Glyph: PuzzleIcon, tone: "accent" };
  if (mod.level === "Intermediate") return { Glyph: CrownGlyph, tone: "amber" };
  if (mod.level === "Advanced") return { Glyph: CrownGlyph, tone: "clay" };
  return { Glyph: PawnGlyph, tone: "sage" };
}

/** A thin progress ring (the rank-up indicator on each plate). */
function ProgressRing({ pct, tone }: { pct: number; tone: string }) {
  const r = 16;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
  return (
    <span className="relative grid h-11 w-11 shrink-0 place-items-center">
      <svg width="44" height="44" className="-rotate-90">
        <circle cx="22" cy="22" r={r} fill="none" stroke="var(--line)" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke={`var(--color-${tone})`}
          strokeWidth="4"
          strokeDasharray={c}
          strokeDashoffset={off}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset .6s cubic-bezier(.2,.7,.3,1)" }}
        />
      </svg>
      <span className="absolute font-mono text-[10px] font-semibold text-ink-soft">{pct}%</span>
    </span>
  );
}

const TOOLS = [
  { href: "/tactics", label: "Tactics", sub: "Sharpen your eye", Icon: PuzzleIcon, tone: "amber" },
  { href: "/trainer", label: "Openings", sub: "Drill a repertoire", Icon: OpeningDrillIcon, tone: "primary" },
  { href: "/play", label: "Play & Review", sub: "Game + analysis", Icon: PlayIcon, tone: "clay" },
  { href: "/endgames", label: "Endgames", sub: "Master technique", Icon: CrownGlyph, tone: "sage" },
] as const;

export default function HomePage() {
  const { moduleProgress, getActivityState } = useProgress();
  const { counts: trainerCounts } = useTrainer();
  const daily = useDailyStreak();
  const cont = firstIncomplete((id) => getActivityState(id).completed);
  const started = MODULES.some(
    (mod) => moduleProgress(getModuleActivities(mod).map((a) => a.id)) > 0,
  );

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

        <Link href={cont ? `/modules/${cont.modId}/${cont.actId}` : "/daily"} className="block">
          <Card interactive className="flex h-full items-center gap-3.5 p-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-on-accent" style={{ backgroundColor: "var(--color-sage)" }}>
              <PlayIcon className="h-6 w-6" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold text-ink">
                {cont ? "Continue learning" : "All caught up"}
              </p>
              <p className="text-sm text-ink-soft">
                {cont ? "Pick up where you left off" : "Review or train your skills"}
              </p>
            </div>
            <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink-soft" />
          </Card>
        </Link>
      </section>

      {/* ── The gallery: modules as framed plates ── */}
      <section className="space-y-3">
        <h2 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
          Rooms of the hall
          <span className="h-px flex-1 bg-line" />
        </h2>
        <div className="grid gap-3.5 sm:grid-cols-2">
          {MODULES.map((mod, i) => {
            const activityIds = getModuleActivities(mod).map((a) => a.id);
            const pct = Math.round(moduleProgress(activityIds) * 100);
            const { Glyph, tone } = moduleEmblem(mod);
            return (
              <Link key={mod.id} href={`/modules/${mod.id}`} className="group block rise" style={{ animationDelay: `${120 + i * 55}ms` }}>
                <Card interactive className="relative flex h-full flex-col gap-3 overflow-hidden p-5">
                  <span className="plate-motif" aria-hidden />
                  <div className="flex items-start justify-between gap-3">
                    {mod.kidMode && CHARACTER_IMAGES.pip ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={withBasePath(`/images/characters/${CHARACTER_IMAGES.pip}`)}
                        alt=""
                        aria-hidden
                        className="h-12 w-12 shrink-0 rounded-2xl object-cover shadow-soft ring-2 ring-white/70"
                      />
                    ) : (
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-on-accent shadow-soft" style={{ backgroundColor: `var(--color-${tone})` }}>
                        <Glyph className="h-7 w-7" />
                      </span>
                    )}
                    <ProgressRing pct={pct} tone={tone} />
                  </div>
                  <div className="relative">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                      {mod.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{mod.description}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-1">
                    <LevelChip module={mod} />
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-strong opacity-0 transition group-hover:opacity-100">
                      Enter <ChevronRightIcon className="h-4 w-4" />
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

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

      {/* ── Brand-new learner: where to start ── */}
      {!started && (
        <section className="space-y-3">
          <h2 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
            New here? Start in the right place
            <span className="h-px flex-1 bg-line" />
          </h2>
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
