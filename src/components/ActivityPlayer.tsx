"use client";

// Dispatcher: given an activity, render the matching player and a shared footer
// that records completion and offers navigation. In kid mode (module.kidMode)
// the chrome is bigger/brighter, a read-aloud speaker sits in the header, and a
// reward layer (confetti, Pip mascot, streak) celebrates success.

import Link from "next/link";
import { useCallback, useState } from "react";
import type { Activity, Module } from "@/content/types";
import { getNextActivity } from "@/content";
import { useProgress } from "@/lib/progress/useProgress";
import { QuizPlayer } from "@/components/activities/QuizPlayer";
import { ReplayPlayer } from "@/components/activities/ReplayPlayer";
import { PuzzlePlayer } from "@/components/activities/PuzzlePlayer";
import { DrillPlayer } from "@/components/activities/DrillPlayer";
import { MoveMapPlayer } from "@/components/activities/MoveMapPlayer";
import { PictureQuizPlayer } from "@/components/activities/PictureQuizPlayer";
import { TargetPlayer } from "@/components/activities/TargetPlayer";
import { SortPlayer } from "@/components/activities/SortPlayer";
import { CoordinatePlayer } from "@/components/activities/CoordinatePlayer";
import { PracticeSetPlayer } from "@/components/activities/PracticeSetPlayer";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { Confetti } from "@/components/kids/Confetti";
import { PipMascot } from "@/components/kids/PipMascot";
import { recordResult, useStreak } from "@/lib/rewards/streak";
import { playSound } from "@/lib/audio/sounds";

const TYPE_LABEL: Record<Activity["type"], string> = {
  quiz: "Quiz",
  replay: "Guided replay",
  puzzle: "Puzzle",
  drill: "Engine drill",
  movemap: "Meet the piece",
  pictureQuiz: "Picture quiz",
  target: "Star game",
  sort: "Sorting game",
  coordinate: "Square hunt",
  practiceSet: "Practice",
};

interface Props {
  module: Module;
  activity: Activity;
}

export function ActivityPlayer({ module: mod, activity }: Props) {
  const { markComplete, recordAttempt, getActivityState } = useProgress();
  const kidMode = !!mod.kidMode;

  const [confettiKey, setConfettiKey] = useState(0);
  const [pipMood, setPipMood] = useState<"idle" | "cheer" | "think">("idle");
  const [pipSays, setPipSays] = useState<string>("");
  const streak = useStreak();

  const state = getActivityState(activity.id);
  const next = getNextActivity(mod, activity.id);

  const handleComplete = useCallback(
    (score: number) => {
      markComplete(activity.id, score);
      if (!kidMode) return;
      const success = score >= 100;
      recordResult(success);
      if (!success) {
        setPipMood("think");
        setPipSays("Keep trying!");
        return;
      }
      // Big celebration (confetti + fanfare) is reserved for finishing a whole
      // lesson; a single activity gets a calm reward (a star + Pip's smile).
      const lesson = mod.lessons.find((l) =>
        l.activities.some((a) => a.id === activity.id),
      );
      const lessonComplete =
        !!lesson &&
        lesson.activities
          .filter((a) => a.id !== activity.id)
          .every((a) => getActivityState(a.id).completed);
      if (lessonComplete) {
        setConfettiKey((k) => k + 1);
        playSound("fanfare");
        setPipMood("cheer");
        setPipSays("Lesson done! 🏆");
      } else {
        setPipMood("idle");
        setPipSays("Nice!");
      }
    },
    [markComplete, activity.id, kidMode, mod.lessons, getActivityState],
  );
  const handleAttempt = useCallback(
    () => recordAttempt(activity.id),
    [recordAttempt, activity.id],
  );

  return (
    <div className="space-y-6">
      {kidMode && <Confetti fireKey={confettiKey} />}

      {kidMode && (
        <div className="flex items-center justify-between gap-3">
          <PipMascot mood={pipMood} size={56} says={pipSays || undefined} />
          {streak >= 3 && (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-base font-extrabold text-orange-700">
              🔥 {streak} in a row!
            </span>
          )}
        </div>
      )}

      <header className="space-y-1">
        {!kidMode && (
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
            {TYPE_LABEL[activity.type]}
          </p>
        )}
        <div className="flex items-center gap-3">
          <h1 className={kidMode ? "text-3xl font-extrabold" : "text-2xl font-bold"}>
            {activity.title}
          </h1>
          {kidMode && (
            <SpeakButton text={`${activity.title}. ${activity.blurb ?? ""}`} />
          )}
        </div>
        {activity.blurb && (
          <p className={kidMode ? "text-lg text-neutral-600" : "text-neutral-500"}>
            {activity.blurb}
          </p>
        )}
      </header>

      {activity.type === "quiz" && (
        <QuizPlayer activity={activity} onComplete={handleComplete} kidMode={kidMode} />
      )}
      {activity.type === "replay" && (
        <ReplayPlayer activity={activity} onComplete={handleComplete} kidMode={kidMode} />
      )}
      {activity.type === "puzzle" && (
        <PuzzlePlayer
          activity={activity}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          kidMode={kidMode}
        />
      )}
      {activity.type === "drill" && (
        <DrillPlayer activity={activity} onComplete={handleComplete} kidMode={kidMode} />
      )}
      {activity.type === "movemap" && (
        <MoveMapPlayer activity={activity} onComplete={handleComplete} />
      )}
      {activity.type === "pictureQuiz" && (
        <PictureQuizPlayer activity={activity} onComplete={handleComplete} />
      )}
      {activity.type === "target" && (
        <TargetPlayer activity={activity} onComplete={handleComplete} />
      )}
      {activity.type === "sort" && (
        <SortPlayer activity={activity} onComplete={handleComplete} />
      )}
      {activity.type === "coordinate" && (
        <CoordinatePlayer activity={activity} onComplete={handleComplete} />
      )}
      {activity.type === "practiceSet" && (
        <PracticeSetPlayer activity={activity} onComplete={handleComplete} />
      )}

      <footer className="flex items-center justify-between gap-3 border-t border-neutral-200 pt-5">
        <Link
          href={`/modules/${mod.id}`}
          className={kidMode ? "text-base font-semibold text-neutral-500" : "text-sm font-medium text-neutral-500"}
        >
          ← {mod.title}
        </Link>
        {state.completed ? (
          next ? (
            <Link
              href={`/modules/${mod.id}/${next.id}`}
              className={
                kidMode
                  ? "rounded-2xl bg-emerald-500 px-7 py-4 text-xl font-extrabold text-white shadow-md active:scale-95"
                  : "rounded-xl bg-emerald-600 px-5 py-3 text-base font-medium text-white"
              }
            >
              {kidMode ? "Next →" : `Next: ${next.title} →`}
            </Link>
          ) : (
            <Link
              href={`/modules/${mod.id}`}
              className={
                kidMode
                  ? "rounded-2xl bg-emerald-500 px-7 py-4 text-xl font-extrabold text-white shadow-md active:scale-95"
                  : "rounded-xl bg-emerald-600 px-5 py-3 text-base font-medium text-white"
              }
            >
              {kidMode ? "All done! ✓" : "Finish module ✓"}
            </Link>
          )
        ) : (
          <span className={kidMode ? "text-base text-neutral-400" : "text-sm text-neutral-400"}>
            {kidMode ? "Finish to keep going!" : "Complete this activity to continue"}
          </span>
        )}
      </footer>
    </div>
  );
}
