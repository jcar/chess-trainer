"use client";

// A sticker book for kid modules: one sticker per lesson, revealed when the
// child completes that lesson. A simple, motivating collection to fill in.

import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule } from "@/content";
import { useProgress } from "@/lib/progress/useProgress";

// A cheerful badge per lesson (cycles if there are more lessons than badges).
const BADGES = ["🦄", "🚀", "🐯", "🌈", "⚡", "🦉", "🐙", "🍀", "🎈", "🏅", "🌟", "🐳"];

export function StickersView({ moduleId }: { moduleId: string }) {
  const mod = getModule(moduleId);
  const { allComplete } = useProgress();

  if (!mod || !mod.kidMode) notFound();

  const earned = mod.lessons.filter((l) =>
    allComplete(l.activities.map((a) => a.id)),
  ).length;

  return (
    <main className="space-y-6">
      <Link
        href={`/modules/${mod.id}`}
        className="text-base font-semibold text-neutral-500"
      >
        ← Back to the journey
      </Link>

      <div>
        <h1 className="text-3xl font-extrabold">🎒 My Sticker Book</h1>
        <p className="text-lg text-neutral-600">
          You&apos;ve earned <span className="font-extrabold text-amber-600">{earned}</span> of{" "}
          {mod.lessons.length} stickers. Finish a lesson to win its sticker!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {mod.lessons.map((lesson, idx) => {
          const got = allComplete(lesson.activities.map((a) => a.id));
          return (
            <div
              key={lesson.id}
              className={`flex flex-col items-center justify-center rounded-3xl border-4 p-4 text-center ${
                got ? "border-amber-300 bg-amber-50" : "border-dashed border-neutral-200 bg-neutral-50"
              }`}
            >
              <span className="text-5xl" aria-hidden>
                {got ? BADGES[idx % BADGES.length] : "🔒"}
              </span>
              <span
                className={`mt-2 text-sm font-bold ${got ? "text-amber-900" : "text-neutral-400"}`}
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
