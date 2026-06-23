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
import { OpeningDrillPlayer } from "@/components/activities/OpeningDrillPlayer";
import { ConceptPlayer } from "@/components/activities/ConceptPlayer";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { Confetti } from "@/components/kids/Confetti";
import { PipMascot } from "@/components/kids/PipMascot";
import { recordResult, useStreak } from "@/lib/rewards/streak";
import { recordDailyActivity } from "@/lib/rewards/daily";
import { playSound } from "@/lib/audio/sounds";
import { buttonClasses } from "@/components/ui/Button";
import {
  ACTIVITY_ICON,
  FlameIcon,
  ChevronRightIcon,
  CheckIcon,
  ArrowLeftIcon,
} from "@/components/icons";

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
  openingDrill: "Opening drill",
  concept: "Learn",
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
  // Single forward target, reused by the footer and by players (like the concept
  // card) whose own completion button doubles as the "advance" button.
  const advanceHref = next ? `/modules/${mod.id}/${next.id}` : `/modules/${mod.id}`;

  const handleComplete = useCallback(
    (score: number) => {
      // Capture whether this activity was ALREADY completed before this attempt
      // (i.e. we're replaying it) — read before markComplete mutates the store.
      const wasAlreadyComplete = getActivityState(activity.id).completed;
      markComplete(activity.id, score);
      recordDailyActivity(); // any activity completion counts toward the daily streak
      if (!kidMode) return;
      const success = score >= 100;
      recordResult(success);
      if (!success) {
        setPipMood("think");
        setPipSays("Keep trying!");
        return;
      }
      // Big celebration (confetti + fanfare) only when this completion NEWLY
      // finishes the whole lesson — not on every replay of an already-done
      // lesson, and not on a single activity. Otherwise just a calm reward.
      const lesson = mod.lessons.find((l) =>
        l.activities.some((a) => a.id === activity.id),
      );
      const otherActivitiesComplete =
        !!lesson &&
        lesson.activities
          .filter((a) => a.id !== activity.id)
          .every((a) => getActivityState(a.id).completed);
      const newlyCompletedLesson =
        otherActivitiesComplete && !wasAlreadyComplete;
      if (newlyCompletedLesson) {
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

  const ActivityIcon = ACTIVITY_ICON[activity.type];

  return (
    <div className="space-y-4 sm:space-y-6">
      {kidMode && <Confetti fireKey={confettiKey} />}

      {kidMode && (
        <div className="flex items-center justify-between gap-3">
          <PipMascot mood={pipMood} size={56} says={pipSays || undefined} />
          {streak >= 3 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-kid-coral/15 px-3 py-1 text-base font-bold text-kid-coral">
              <FlameIcon className="h-4 w-4" /> {streak} in a row!
            </span>
          )}
        </div>
      )}

      <header className="space-y-2">
        <div className="flex items-start gap-3">
          <span
            className={`mt-0.5 grid shrink-0 place-items-center rounded-xl ${
              kidMode ? "h-11 w-11 bg-kid-teal/12 text-kid-teal" : "h-10 w-10 bg-primary/8 text-primary"
            }`}
          >
            <ActivityIcon className={kidMode ? "h-6 w-6" : "h-5 w-5"} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {TYPE_LABEL[activity.type]}
            </p>
            <div className="flex items-center gap-2">
              <h1
                className="font-display text-xl font-semibold tracking-tight text-primary-strong sm:text-2xl"
              >
                {activity.title}
              </h1>
              {kidMode && (
                <SpeakButton text={`${activity.title}. ${activity.blurb ?? ""}`} size="sm" />
              )}
            </div>
          </div>
        </div>
        {activity.blurb && (
          <p className={kidMode ? "text-lg text-ink-soft" : "text-ink-soft"}>
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
      {activity.type === "openingDrill" && (
        <OpeningDrillPlayer
          activity={activity}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          kidMode={kidMode}
        />
      )}
      {activity.type === "concept" && (
        <ConceptPlayer
          activity={activity}
          onComplete={handleComplete}
          advanceHref={advanceHref}
          advanceLabel={next ? "Got it" : kidMode ? "All done!" : "Finish"}
          kidMode={kidMode}
        />
      )}

      <footer className="flex items-center justify-between gap-3 border-t border-line pt-4 sm:pt-5">
        <Link
          href={`/modules/${mod.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition hover:text-ink"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="max-w-[9rem] truncate">{mod.title}</span>
        </Link>
        {/* The concept card's own button completes AND advances in one tap, so
            it owns the forward action — don't render a second one here. */}
        {activity.type === "concept" ? null : state.completed ? (
          next ? (
            <Link
              href={advanceHref}
              className={buttonClasses("primary", kidMode ? "kid" : "lg")}
            >
              Next <ChevronRightIcon className="h-5 w-5" />
            </Link>
          ) : (
            <Link
              href={advanceHref}
              className={buttonClasses("primary", kidMode ? "kid" : "lg")}
            >
              {kidMode ? "All done!" : "Finish"} <CheckIcon className="h-5 w-5" />
            </Link>
          )
        ) : (
          <span className="text-sm text-ink-soft/70">
            {kidMode ? "Finish to keep going!" : "Complete to continue"}
          </span>
        )}
      </footer>
    </div>
  );
}
