"use client";

// Pip's Chess Quest map: the kid module rendered as a journey across lands. Each
// lesson is a stop on a vertical path — finished (trophy + stars), "you are here"
// (Pip), a guardian checkpoint, or still ahead. A belt banner shows the current
// rank. All geometry is derived in render (no DOM measuring / effects).

import Link from "next/link";
import type { Module } from "@/content/types";
import { useProgress } from "@/lib/progress/useProgress";
import { selectBelt } from "@/lib/kids/belts";
import { LANDS, guardianFor, STORY } from "@/content/kids/story";
import { PipMascot } from "@/components/kids/PipMascot";
import { StarIcon, TrophyIcon, PlayIcon } from "@/components/icons";

export function QuestMap({ module: mod }: { module: Module }) {
  const { getActivityState, allComplete, totalStarsKid, snapshot } = useProgress();
  const belt = selectBelt(snapshot());

  const lessonById = new Map(mod.lessons.map((l) => [l.id, l]));
  // "You are here" = first lesson (in module order) not yet complete.
  const currentId = mod.lessons.find(
    (l) => !allComplete(l.activities.map((a) => a.id)),
  )?.id;

  return (
    <div className="space-y-7">
      {/* Belt banner */}
      <div className="flex items-center gap-4 rounded-2xl bg-card p-4 shadow-soft">
        <span
          className="h-10 w-10 shrink-0 rounded-full ring-4 ring-ink/10"
          style={{ backgroundColor: belt.earned?.color ?? "#e2e8f0" }}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-bold text-primary-strong">
            {belt.earned ? belt.earned.name : "Begin your quest!"}
          </p>
          <p className="text-sm text-ink-soft">
            {belt.next
              ? `${belt.nextRemaining} more to your ${belt.next.name}`
              : "Top belt earned — champion! 🏆"}
          </p>
        </div>
      </div>

      <p className="text-center text-ink-soft">{STORY.intro}</p>

      {LANDS.map((land) => (
        <section key={land.id} className="space-y-2">
          <div>
            <h2 className="font-display text-xl font-bold text-primary-strong">
              {land.name}
            </h2>
            <p className="text-sm text-ink-soft">{land.tagline}</p>
          </div>

          <ol className="relative ml-3 space-y-2 border-l-2 border-line pl-6">
            {land.lessonIds.map((lessonId) => {
              const lesson = lessonById.get(lessonId);
              if (!lesson) return null;
              const ids = lesson.activities.map((a) => a.id);
              const done = allComplete(ids);
              const stars = totalStarsKid(ids);
              const isCurrent = lessonId === currentId;
              const guardian = guardianFor(lessonId);
              const firstUnfinished =
                lesson.activities.find((a) => !getActivityState(a.id).completed)?.id ??
                lesson.activities[0]?.id;

              // Node dot color: done = sage, guardian = amber, current = accent.
              const dot = done
                ? "bg-sage border-sage"
                : guardian
                  ? "bg-amber/30 border-amber"
                  : isCurrent
                    ? "bg-accent/30 border-accent"
                    : "bg-card border-line";

              return (
                <li key={lessonId} className="relative">
                  <span
                    aria-hidden
                    className={`absolute -left-[31px] top-3 h-4 w-4 rounded-full border-2 ${dot}`}
                  />
                  {isCurrent && (
                    <span className="absolute -left-[62px] -top-1">
                      <PipMascot size={40} mood="idle" />
                    </span>
                  )}
                  <Link
                    href={`/modules/${mod.id}/${firstUnfinished}`}
                    className={`flex items-center gap-3 rounded-2xl border p-3 transition active:scale-[0.99] ${
                      isCurrent
                        ? "border-accent bg-accent/5 shadow-soft ring-1 ring-accent/30"
                        : "border-line bg-card hover:border-kid-teal/40"
                    }`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        {guardian && (
                          <span className="rounded-full bg-amber/15 px-2 py-0.5 text-xs font-bold text-amber">
                            Guardian
                          </span>
                        )}
                        <span className="truncate font-semibold text-primary-strong">
                          {lesson.title}
                        </span>
                      </span>
                      {isCurrent && (
                        <span className="text-xs font-semibold text-accent">
                          You are here — keep going!
                        </span>
                      )}
                    </span>
                    {done ? (
                      <span className="flex shrink-0 items-center gap-1 text-sage">
                        {Array.from({ length: 3 }, (_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-4 w-4 ${i < Math.round(stars / lesson.activities.length) ? "" : "opacity-25"}`}
                          />
                        ))}
                        <TrophyIcon className="ml-1 h-5 w-5" />
                      </span>
                    ) : (
                      <PlayIcon
                        className={`h-5 w-5 shrink-0 ${isCurrent ? "text-accent" : "text-kid-teal/70"}`}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
