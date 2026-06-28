"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule } from "@/content";
import type { Activity } from "@/content/types";
import { useProgress } from "@/lib/progress/useProgress";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { PageHeader } from "@/components/ui/PageHeader";
import { buttonClasses } from "@/components/ui/Button";
import { QuestMap } from "@/components/kids/QuestMap";
import {
  ACTIVITY_ICON,
  TrophyIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@/components/icons";

const TYPE_BADGE: Record<Activity["type"], string> = {
  quiz: "Quiz",
  replay: "Replay",
  puzzle: "Puzzle",
  drill: "Drill",
  movemap: "Explore",
  pictureQuiz: "Quiz",
  target: "Star game",
  sort: "Sort",
  coordinate: "Squares",
  practiceSet: "Practice",
  openingDrill: "Drill",
  concept: "Learn",
  reviewCheckpoint: "Challenge",
  scene: "Story",
  guessMove: "Guess",
  plan: "Plan",
};

export function ModuleView({ moduleId }: { moduleId: string }) {
  const mod = getModule(moduleId);
  const { getActivityState } = useProgress();

  if (!mod) notFound();
  const kid = !!mod.kidMode;

  // ---- Kid mode: a celebratory "journey" with stars + trophies ----
  if (kid) {
    return (
      <main className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="text-sm font-medium text-ink-soft transition hover:text-ink"
          >
            ← Home
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/modules/${mod.id}/story`}
              className={buttonClasses("secondary", "md")}
            >
              Story
            </Link>
            <Link
              href={`/modules/${mod.id}/closet`}
              className={buttonClasses("secondary", "md")}
            >
              Closet
            </Link>
            <Link
              href={`/modules/${mod.id}/stickers`}
              className={buttonClasses("accent", "md")}
            >
              <TrophyIcon className="h-4 w-4" /> Trophies
            </Link>
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-primary-strong">
            {mod.title}
          </h1>
          <p className="text-ink-soft">{mod.description}</p>
        </div>

        <QuestMap module={mod} />
      </main>
    );
  }

  // ---- Standard (non-kid) module listing ----
  return (
    <main className="space-y-7">
      <PageHeader
        backHref="/"
        backLabel="All modules"
        eyebrow={mod.level}
        title={mod.title}
        subtitle={mod.description}
      />

      {mod.lessons.map((lesson) => (
        <section key={lesson.id} className="space-y-3">
          <div>
            <h2 className="font-display text-lg font-semibold text-primary-strong">
              {lesson.title}
            </h2>
            <p className="text-sm text-ink-soft">{lesson.summary}</p>
          </div>
          <ul className="space-y-2">
            {lesson.activities.map((activity) => {
              const done = getActivityState(activity.id).completed;
              const Icon = ACTIVITY_ICON[activity.type];
              return (
                <li key={activity.id}>
                  <Link href={`/modules/${mod.id}/${activity.id}`} className="block">
                    <Card interactive className="flex items-center gap-3 p-4">
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                          done
                            ? "bg-sage/15 text-sage"
                            : "bg-primary/8 text-primary"
                        }`}
                      >
                        {done ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium text-ink">
                          {activity.title}
                        </span>
                        {activity.blurb && (
                          <span className="block text-sm text-ink-soft">
                            {activity.blurb}
                          </span>
                        )}
                      </span>
                      <Chip tone="neutral">{TYPE_BADGE[activity.type]}</Chip>
                      <ChevronRightIcon className="h-4 w-4 shrink-0 text-ink-soft" />
                    </Card>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
