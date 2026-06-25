"use client";

// "Story so far" — a storybook recap of the child's journey through Pip & the
// Grey. Each land they've started shows its chapter cover and the dialogue beats
// they've unlocked; lands ahead are gently teased. Mirrors the certificate route
// (server page → client view).

import { notFound } from "next/navigation";
import { getModule } from "@/content";
import type { DialogueLine } from "@/content/types";
import { useProgress } from "@/lib/progress/useProgress";
import { LANDS } from "@/content/kids/story";
import { EPISODES } from "@/content/kids/episodes";
import { landFraction } from "@/lib/kids/storyMap";
import { PageHeader } from "@/components/ui/PageHeader";
import { ChapterCover } from "@/components/kids/ChapterCover";
import { SpeakingCharacter } from "@/components/kids/SpeakingCharacter";
import { LockIcon } from "@/components/icons";

export function StoryView({ moduleId }: { moduleId: string }) {
  const mod = getModule(moduleId);
  const { allComplete } = useProgress();

  if (!mod || !mod.kidMode) notFound();

  const lessonById = new Map(mod.lessons.map((l) => [l.id, l]));
  const isLessonDone = (lessonId: string) => {
    const lesson = lessonById.get(lessonId);
    return !!lesson && allComplete(lesson.activities.map((a) => a.id));
  };

  return (
    <main className="space-y-6">
      <PageHeader
        backHref={`/modules/${mod.id}`}
        backLabel="Back to the journey"
        title="The Story So Far"
        subtitle="Pip & the Grey — the colors you've brought back."
      />

      {LANDS.map((land, i) => {
        const frac = landFraction(land, isLessonDone);
        const started = frac > 0;

        if (!started) {
          return (
            <section
              key={land.id}
              className="flex items-center gap-3 rounded-2xl border border-dashed border-line bg-surface p-4"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/5 text-ink-soft/50">
                <LockIcon className="h-5 w-5" />
              </span>
              <p className="text-sm text-ink-soft">
                <span className="font-semibold text-ink-soft/80">Chapter {i + 1}</span> — still
                grey. Keep playing to reach it!
              </p>
            </section>
          );
        }

        // Gather the beats the child has unlocked: each done lesson's hook +
        // resolve; for an in-progress lesson, just its hook.
        const beats: DialogueLine[] = [];
        for (const lessonId of land.lessonIds) {
          const ep = EPISODES[lessonId];
          if (!ep) continue;
          beats.push(...ep.hook.lines);
          if (isLessonDone(lessonId)) beats.push(...ep.resolve.lines);
        }

        return (
          <section key={land.id} className="space-y-3">
            <ChapterCover land={land} chapter={i + 1} colorAmount={frac} />
            {beats.length > 0 && (
              <div className="space-y-2">
                {beats.map((line, j) => (
                  <SpeakingCharacter key={j} line={line} size={48} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
