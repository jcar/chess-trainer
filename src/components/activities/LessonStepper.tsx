"use client";

// The "you are here" section locator on the activity screen. Sits between the
// module strip (module-wide progress) and the activity title, filling in the
// missing middle of the hierarchy: Module → SECTION (this lesson) → Activity.
// One tappable dot per activity in the lesson — filled = done, ringed = current,
// faint = remaining — so a learner can see how far through the section they are
// and jump to any sibling activity. Non-kid only (kids orient via the QuestMap).

import Link from "next/link";
import type { Lesson } from "@/content/types";
import { cleanLessonTitle } from "@/content/index";
import { useProgress } from "@/lib/progress/useProgress";

interface Props {
  moduleId: string;
  lesson: Lesson;
  currentActivityId: string;
}

export function LessonStepper({ moduleId, lesson, currentActivityId }: Props) {
  const { getActivityState } = useProgress();
  const activities = lesson.activities;

  // A single-activity lesson has no section to orient within.
  if (activities.length <= 1) return null;

  const currentIndex = activities.findIndex((a) => a.id === currentActivityId);

  return (
    <div className="flex flex-col gap-2 border-b border-line/70 pb-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="min-w-0 truncate text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
          {cleanLessonTitle(lesson.title)}
        </span>
        <span className="shrink-0 font-mono text-[11px] font-semibold text-ink-soft">
          {currentIndex + 1} / {activities.length}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-0.5">
        {activities.map((a, i) => {
          const done = getActivityState(a.id).completed;
          const current = a.id === currentActivityId;
          return (
            <Link
              key={a.id}
              href={`/modules/${moduleId}/${a.id}`}
              aria-label={`${i + 1}. ${a.title}${done ? " (done)" : ""}`}
              aria-current={current ? "step" : undefined}
              title={a.title}
              className="grid place-items-center rounded-full p-1.5 transition hover:scale-110"
            >
              <span
                className={
                  current
                    ? "h-2.5 w-2.5 rounded-full ring-2 ring-offset-1 ring-offset-bg"
                    : "h-2.5 w-2.5 rounded-full"
                }
                style={
                  current
                    ? {
                        background: "var(--accent)",
                        // ring color + soft glow to mark the active step
                        boxShadow: "0 0 8px -1px var(--accent)",
                        // Tailwind's ring color via CSS var so it matches accent
                        ["--tw-ring-color" as string]: "var(--accent)",
                      }
                    : done
                      ? {
                          background:
                            "linear-gradient(90deg, color-mix(in oklab, var(--primary), #000 12%), var(--primary))",
                        }
                      : undefined
                }
              >
                {!current && !done && (
                  <span className="block h-2.5 w-2.5 rounded-full bg-ink/15" />
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
