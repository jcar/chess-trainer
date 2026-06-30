"use client";

import Link from "next/link";
import { Fragment, useState } from "react";
import { notFound } from "next/navigation";
import { getModule, getModuleActivities } from "@/content";
import type { Activity, Lesson } from "@/content/types";
import { useProgress } from "@/lib/progress/useProgress";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
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

/** Lesson titles carry a continuous chapter number ("9. …") shared across modules;
 *  strip it so each room reads as its own clean list. */
const cleanTitle = (t: string) => t.replace(/^\s*\d+\.\s*/, "");

/** Distinct activity-type labels in a lesson, in first-seen order. */
function typeChips(activities: Activity[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const a of activities) {
    const label = TYPE_BADGE[a.type];
    if (!seen.has(label)) {
      seen.add(label);
      out.push(label);
    }
  }
  return out;
}

export function ModuleView({ moduleId }: { moduleId: string }) {
  const mod = getModule(moduleId);
  const { getActivityState, allComplete } = useProgress();
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});

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

  // ---- Standard (non-kid) module overview: collapsible lessons ----
  const allIds = getModuleActivities(mod).map((a) => a.id);
  const total = allIds.length;
  const done = allIds.filter((id) => getActivityState(id).completed).length;
  const modulePct = total ? Math.round((done / total) * 100) : 0;

  // The first not-yet-complete activity across the module (in order) → the
  // "Continue" target and the lesson to auto-expand.
  let nextHref: string | null = null;
  let currentLessonId: string | null = null;
  for (const lesson of mod.lessons) {
    const next = lesson.activities.find((a) => !getActivityState(a.id).completed);
    if (next) {
      nextHref = `/modules/${mod.id}/${next.id}`;
      currentLessonId = lesson.id;
      break;
    }
  }
  const continueLabel = done === 0 ? "Start" : nextHref ? "Continue" : "Review";
  const continueHref =
    nextHref ?? `/modules/${mod.id}/${mod.lessons[0].activities[0].id}`;

  // Open state: the current lesson auto-opens; a manual toggle overrides.
  const isOpen = (l: Lesson) => overrides[l.id] ?? l.id === currentLessonId;
  const allOpen = mod.lessons.every(isOpen);
  const setAll = (open: boolean) =>
    setOverrides(Object.fromEntries(mod.lessons.map((l) => [l.id, open])));
  const showToggle = mod.lessons.length > 4;

  return (
    <main className="space-y-6">
      <PageHeader
        backHref="/"
        backLabel="All modules"
        eyebrow={mod.level}
        title={mod.title}
        subtitle={mod.description}
      />

      {/* Module progress + a single forward action. */}
      <Card className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-ink-soft">
            <span className="font-semibold text-ink">
              {done} / {total}
            </span>{" "}
            activities · {modulePct}% complete
          </p>
          <Link href={continueHref} className={buttonClasses("primary", "md")}>
            {continueLabel} <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <ProgressBar pct={modulePct} tone="primary" />
      </Card>

      {showToggle && (
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
            {mod.lessons.length} lessons
          </h2>
          <button
            type="button"
            onClick={() => setAll(!allOpen)}
            className="text-sm font-medium text-primary-strong transition hover:text-accent"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>
      )}

      {/* Lessons, collapsed by default — the current one auto-opens. */}
      <div className="space-y-2.5">
        {mod.lessons.map((lesson, i) => {
          const ids = lesson.activities.map((a) => a.id);
          const lDone = ids.filter((id) => getActivityState(id).completed).length;
          const lPct = ids.length ? Math.round((lDone / ids.length) * 100) : 0;
          const lComplete = ids.length > 0 && allComplete(ids);
          const open = isOpen(lesson);
          const chips = typeChips(lesson.activities);
          const showSection =
            !!lesson.section && lesson.section !== mod.lessons[i - 1]?.section;

          return (
            <Fragment key={lesson.id}>
              {showSection && (
                <h3 className="flex items-center gap-3 pt-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
                  {lesson.section}
                  <span className="h-px flex-1 bg-line" />
                </h3>
              )}
              <Card className="overflow-hidden p-0">
                <button
                  type="button"
                  onClick={() =>
                    setOverrides((o) => ({ ...o, [lesson.id]: !open }))
                  }
                  aria-expanded={open}
                  className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-primary/[0.03]"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-semibold ${
                      lComplete
                        ? "bg-sage/15 text-sage"
                        : lDone > 0
                          ? "bg-primary/10 text-primary"
                          : "bg-ink/5 text-ink-soft"
                    }`}
                  >
                    {lComplete ? (
                      <CheckIcon className="h-5 w-5" />
                    ) : (
                      <span className="font-mono text-xs">
                        {lDone}/{ids.length}
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-semibold text-ink">
                      {cleanTitle(lesson.title)}
                    </span>
                    <span className="block truncate text-sm text-ink-soft">
                      {lesson.summary}
                    </span>
                    <span className="mt-1.5 flex flex-wrap gap-1.5">
                      {chips.slice(0, 4).map((c) => (
                        <Chip key={c} tone="neutral">
                          {c}
                        </Chip>
                      ))}
                      {chips.length > 4 && <Chip tone="neutral">…</Chip>}
                    </span>
                  </span>
                  <ChevronRightIcon
                    className={`h-5 w-5 shrink-0 text-ink-soft transition-transform ${
                      open ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {!lComplete && lDone > 0 && (
                  <div className="px-4 pb-3">
                    <ProgressBar pct={lPct} tone="primary" />
                  </div>
                )}

                {open && (
                  <ul className="border-t border-line/70">
                    {lesson.activities.map((activity) => {
                      const aDone = getActivityState(activity.id).completed;
                      const Icon = ACTIVITY_ICON[activity.type];
                      return (
                        <li key={activity.id}>
                          <Link
                            href={`/modules/${mod.id}/${activity.id}`}
                            className="flex items-center gap-3 px-4 py-2.5 transition hover:bg-primary/[0.04]"
                          >
                            <span
                              className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                                aDone
                                  ? "bg-sage/15 text-sage"
                                  : "bg-ink/5 text-ink-soft"
                              }`}
                            >
                              {aDone ? (
                                <CheckIcon className="h-4 w-4" />
                              ) : (
                                <Icon className="h-4 w-4" />
                              )}
                            </span>
                            <span className="min-w-0 flex-1 text-sm font-medium text-ink">
                              {activity.title}
                            </span>
                            <Chip tone="neutral">{TYPE_BADGE[activity.type]}</Chip>
                            <ChevronRightIcon className="h-4 w-4 shrink-0 text-ink-soft/60" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </Card>
            </Fragment>
          );
        })}
      </div>
    </main>
  );
}
