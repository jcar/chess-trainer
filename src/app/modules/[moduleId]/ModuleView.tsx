"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule } from "@/content";
import type { Activity } from "@/content/types";
import { useProgress } from "@/lib/progress/useProgress";

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
};

const TYPE_EMOJI: Record<Activity["type"], string> = {
  quiz: "❓",
  replay: "👀",
  puzzle: "🧩",
  drill: "🤖",
  movemap: "✨",
  pictureQuiz: "🖼️",
  target: "⭐",
  sort: "🔀",
  coordinate: "🗺️",
  practiceSet: "💪",
};

export function ModuleView({ moduleId }: { moduleId: string }) {
  const mod = getModule(moduleId);
  const { getActivityState, activityStars, totalStars, allComplete } =
    useProgress();

  if (!mod) notFound();
  const kid = !!mod.kidMode;

  // ---- Kid mode: a celebratory "journey" with stars + trophies ----
  if (kid) {
    return (
      <main className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="text-base font-semibold text-neutral-500">
            ← Home
          </Link>
          <Link
            href={`/modules/${mod.id}/stickers`}
            className="rounded-full bg-amber-200 px-4 py-2 text-base font-extrabold text-amber-900 shadow-sm active:scale-95"
          >
            🎒 My Stickers
          </Link>
        </div>

        <h1 className="text-3xl font-extrabold">{mod.title}</h1>
        <p className="text-lg text-neutral-600">{mod.description}</p>

        <ol className="space-y-4">
          {mod.lessons.map((lesson, idx) => {
            const ids = lesson.activities.map((a) => a.id);
            const stars = totalStars(ids);
            const maxStars = ids.length * 3;
            const complete = allComplete(ids);
            return (
              <li
                key={lesson.id}
                className={`rounded-3xl border-4 p-4 ${
                  complete ? "border-emerald-300 bg-emerald-50" : "border-sky-100 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xl font-extrabold text-white">
                    {complete ? "🏆" : idx + 1}
                  </span>
                  <div className="flex-1">
                    <h2 className="text-xl font-extrabold text-sky-800">
                      {lesson.title}
                    </h2>
                    <p className="text-sm font-bold text-amber-600">
                      ⭐ {stars} / {maxStars}
                    </p>
                  </div>
                </div>

                <ul className="mt-3 space-y-2">
                  {lesson.activities.map((activity) => {
                    const s = activityStars(activity.id);
                    return (
                      <li key={activity.id}>
                        <Link
                          href={`/modules/${mod.id}/${activity.id}`}
                          className="flex items-center gap-3 rounded-2xl border-2 border-sky-100 bg-white p-3 transition active:scale-[0.98]"
                        >
                          <span className="text-2xl" aria-hidden>
                            {TYPE_EMOJI[activity.type]}
                          </span>
                          <span className="flex-1 text-lg font-bold">
                            {activity.title}
                          </span>
                          <span className="text-base" aria-hidden>
                            {s > 0 ? "⭐".repeat(s) : "▶️"}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ol>
      </main>
    );
  }

  // ---- Standard (non-kid) module listing ----
  return (
    <main className="space-y-6">
      <div>
        <Link href="/" className="text-sm font-medium text-neutral-500">
          ← All modules
        </Link>
        <h1 className="mt-2 text-2xl font-bold">{mod.title}</h1>
        <p className="text-neutral-500">{mod.description}</p>
      </div>

      {mod.lessons.map((lesson) => (
        <section key={lesson.id} className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">{lesson.title}</h2>
            <p className="text-sm text-neutral-500">{lesson.summary}</p>
          </div>
          <ul className="space-y-2">
            {lesson.activities.map((activity) => {
              const done = getActivityState(activity.id).completed;
              return (
                <li key={activity.id}>
                  <Link
                    href={`/modules/${mod.id}/${activity.id}`}
                    className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 transition active:scale-[0.99]"
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm ${
                        done
                          ? "bg-emerald-500 text-white"
                          : "border border-neutral-300 text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                    <span className="flex-1">
                      <span className="font-medium">{activity.title}</span>
                      {activity.blurb && (
                        <span className="block text-sm text-neutral-500">
                          {activity.blurb}
                        </span>
                      )}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
                      {TYPE_BADGE[activity.type]}
                    </span>
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
