"use client";

// A sticker book for kid modules: one badge per lesson, revealed when the child
// completes that lesson. A simple, motivating collection to fill in.

import { notFound } from "next/navigation";
import { getModule } from "@/content";
import { useProgress } from "@/lib/progress/useProgress";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  StarIcon,
  TrophyIcon,
  CrownGlyph,
  PawnGlyph,
  FlameIcon,
  CheckIcon,
  LockIcon,
} from "@/components/icons";

// A rotating set of badge designs (icon + warm tone) for earned stickers.
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
  const { allComplete } = useProgress();

  if (!mod || !mod.kidMode) notFound();

  const earned = mod.lessons.filter((l) =>
    allComplete(l.activities.map((a) => a.id)),
  ).length;

  return (
    <main className="space-y-6">
      <PageHeader
        backHref={`/modules/${mod.id}`}
        backLabel="Back to the journey"
        title="My Sticker Book"
        subtitle={`You've earned ${earned} of ${mod.lessons.length} stickers. Finish a lesson to win its sticker!`}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {mod.lessons.map((lesson, idx) => {
          const got = allComplete(lesson.activities.map((a) => a.id));
          const badge = BADGES[idx % BADGES.length];
          const Icon = badge.Icon;
          return (
            <div
              key={lesson.id}
              className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center ${
                got
                  ? "border-line bg-card shadow-soft"
                  : "border-dashed border-line bg-surface"
              }`}
            >
              <span
                className="grid h-16 w-16 place-items-center rounded-full"
                style={
                  got
                    ? { backgroundColor: `var(--color-${badge.color})` }
                    : undefined
                }
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
    </main>
  );
}
