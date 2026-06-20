"use client";

import Link from "next/link";
import { MODULES, getModuleActivities } from "@/content";
import { useProgress } from "@/lib/progress/useProgress";

export default function HomePage() {
  const { moduleProgress } = useProgress();

  return (
    <main className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">Chess Trainer</h1>
        <p className="text-neutral-500">
          Learn by doing. Work through a module&apos;s lessons, solve puzzles,
          and practice against the engine.
        </p>
      </header>

      <ul className="space-y-4">
        {MODULES.map((mod) => {
          const activityIds = getModuleActivities(mod).map((a) => a.id);
          const pct = Math.round(moduleProgress(activityIds) * 100);
          return (
            <li key={mod.id}>
              <Link
                href={`/modules/${mod.id}`}
                className={`block rounded-2xl border bg-white p-5 shadow-sm transition active:scale-[0.99] ${
                  mod.kidMode ? "border-4 border-sky-200" : "border border-neutral-200"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold">
                    {mod.kidMode && <span aria-hidden className="mr-2">🧸</span>}
                    {mod.title}
                  </h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      mod.kidMode
                        ? "bg-sky-100 text-sky-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {mod.kidMode ? "Ages 5–8" : mod.level}
                  </span>
                </div>
                <p className="mt-1 text-sm text-neutral-500">
                  {mod.description}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-xs font-medium text-neutral-500">
                    {pct}%
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
