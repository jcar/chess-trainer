"use client";

// Pip's Trophy Room for kid modules: the belt you've earned, a sticker per
// finished lesson, and the achievement badges you've collected. A motivating
// place to see everything you've won.

import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule } from "@/content";
import { useProgress } from "@/lib/progress/useProgress";
import { useDailyStreak } from "@/lib/rewards/daily";
import { selectBelt } from "@/lib/kids/belts";
import { ACHIEVEMENTS, earnedAchievementIds } from "@/lib/kids/achievements";
import { PageHeader } from "@/components/ui/PageHeader";
import { buttonClasses } from "@/components/ui/Button";
import {
  StarIcon,
  TrophyIcon,
  CrownGlyph,
  PawnGlyph,
  FlameIcon,
  CheckIcon,
  LockIcon,
} from "@/components/icons";

const BADGES: { Icon: (p: { className?: string }) => React.ReactNode; color: string }[] = [
  { Icon: StarIcon, color: "accent" },
  { Icon: CrownGlyph, color: "amber" },
  { Icon: TrophyIcon, color: "sage" },
  { Icon: FlameIcon, color: "kid-coral" },
  { Icon: PawnGlyph, color: "kid-teal" },
  { Icon: CheckIcon, color: "clay" },
];

export function StickersView({ moduleId }: { moduleId: string }) {
  const mod = getModule(moduleId);
  const { allComplete, snapshot, totalStarsKid } = useProgress();
  const { best: dailyBest } = useDailyStreak();

  if (!mod || !mod.kidMode) notFound();

  const data = snapshot();
  const belt = selectBelt(data);
  const allIds = mod.lessons.flatMap((l) => l.activities.map((a) => a.id));
  const totalStars = totalStarsKid(allIds);
  const earnedIds = new Set(
    earnedAchievementIds({ data, dailyBest, beltIndex: belt.index, totalStars }),
  );

  const earnedLessons = mod.lessons.filter((l) =>
    allComplete(l.activities.map((a) => a.id)),
  ).length;

  return (
    <main className="space-y-7">
      <PageHeader
        backHref={`/modules/${mod.id}`}
        backLabel="Back to the journey"
        title="Pip's Trophy Room"
        subtitle={`${totalStars} stars · ${earnedLessons}/${mod.lessons.length} stickers · ${earnedIds.size}/${ACHIEVEMENTS.length} badges`}
      />

      {/* Belt banner */}
      <div className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-soft">
        <span
          className="h-12 w-12 shrink-0 rounded-full ring-4 ring-ink/10"
          style={{ backgroundColor: belt.earned?.color ?? "#e2e8f0" }}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-bold text-primary-strong">
            {belt.earned ? belt.earned.name : "No belt yet"}
          </p>
          <p className="text-sm text-ink-soft">
            {belt.next
              ? `${belt.nextRemaining} lesson${belt.nextRemaining === 1 ? "" : "s"} to your ${belt.next.name}!`
              : "Top belt earned — you're a champion! 🏆"}
          </p>
        </div>
        {belt.earned && (
          <Link
            href={`/modules/${mod.id}/certificate`}
            className={buttonClasses("accent", "md")}
          >
            <TrophyIcon className="h-5 w-5" /> Certificate
          </Link>
        )}
      </div>

      {/* Achievement badges */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          Badges
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ACHIEVEMENTS.map((a) => {
            const got = earnedIds.has(a.id);
            return (
              <div
                key={a.id}
                className={`flex flex-col items-center gap-1.5 rounded-2xl border p-4 text-center ${
                  got ? "border-line bg-card shadow-soft" : "border-dashed border-line bg-surface"
                }`}
              >
                <span
                  className={`grid h-14 w-14 place-items-center rounded-full text-2xl ${
                    got ? "bg-amber/15" : "bg-ink/5"
                  }`}
                >
                  {got ? (
                    <span aria-hidden>{a.emoji}</span>
                  ) : (
                    <LockIcon className="h-6 w-6 text-ink-soft/50" />
                  )}
                </span>
                <span
                  className={`text-sm font-bold ${got ? "text-primary-strong" : "text-ink-soft/60"}`}
                >
                  {got ? a.title : "Locked"}
                </span>
                {got && (
                  <span className="text-xs leading-snug text-ink-soft">{a.description}</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Lesson stickers */}
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          Lesson stickers
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {mod.lessons.map((lesson, idx) => {
            const got = allComplete(lesson.activities.map((a) => a.id));
            const badge = BADGES[idx % BADGES.length];
            const Icon = badge.Icon;
            return (
              <div
                key={lesson.id}
                className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center ${
                  got ? "border-line bg-card shadow-soft" : "border-dashed border-line bg-surface"
                }`}
              >
                <span
                  className="grid h-16 w-16 place-items-center rounded-full"
                  style={got ? { backgroundColor: `var(--color-${badge.color})` } : undefined}
                >
                  {got ? (
                    <span className="text-on-accent">
                      <Icon className="h-8 w-8" />
                    </span>
                  ) : (
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-ink/5 text-ink-soft/50">
                      <LockIcon className="h-7 w-7" />
                    </span>
                  )}
                </span>
                <span
                  className={`text-sm font-semibold ${got ? "text-primary-strong" : "text-ink-soft/60"}`}
                >
                  {got ? lesson.title : "Locked"}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
