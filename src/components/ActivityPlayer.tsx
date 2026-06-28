"use client";

// Dispatcher: given an activity, render the matching player and a shared footer
// that records completion and offers navigation. In kid mode (module.kidMode)
// the chrome is bigger/brighter, a read-aloud speaker sits in the header, and a
// reward layer (confetti, Pip mascot, streak) celebrates success.

import Link from "next/link";
import { useCallback, useState } from "react";
import type { Activity, DialogueLine, Module } from "@/content/types";
import { getNextActivity, getModuleActivities } from "@/content";
import { useProgress } from "@/lib/progress/useProgress";
import { LevelChip } from "@/components/ui/Chip";
import { ProgressBar } from "@/components/ui/ProgressBar";
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
import { PipChallengePlayer } from "@/components/activities/PipChallengePlayer";
import { ScenePlayer } from "@/components/activities/ScenePlayer";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { ReadAloudToggle } from "@/components/kids/ReadAloudToggle";
import { SpeakingCharacter } from "@/components/kids/SpeakingCharacter";
import { speakAs } from "@/lib/audio/speech";
import { headerSpeech } from "@/lib/audio/narration";
import { Confetti } from "@/components/kids/Confetti";
import { PipMascot } from "@/components/kids/PipMascot";
import { BadgeToast } from "@/components/kids/BadgeToast";
import { recordResult, useStreak } from "@/lib/rewards/streak";
import { recordDailyActivity, useDailyStreak } from "@/lib/rewards/daily";
import { playSound } from "@/lib/audio/sounds";
import { conceptForActivity, conceptSrsKey } from "@/lib/kids/concepts";
import { srsStore } from "@/lib/srs/useSrs";
import { selectBelt } from "@/lib/kids/belts";
import { ACHIEVEMENTS, earnedAchievementIds } from "@/lib/kids/achievements";
import { badgeSeenStore } from "@/lib/kids/badgeSeen";
import { selectTotalStarsKid } from "@/lib/progress/store";
import { useKidsPrefs } from "@/lib/kids/prefs";
import { getBoardTheme } from "@/lib/kids/cosmetics";
import { AdvanceButton } from "@/components/ui/AdvanceButton";
import {
  ACTIVITY_ICON,
  FlameIcon,
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
  reviewCheckpoint: "Pip's Challenge",
  scene: "Story",
};

interface Props {
  module: Module;
  activity: Activity;
}

export function ActivityPlayer({ module: mod, activity }: Props) {
  const { markComplete, recordAttempt, getActivityState, snapshot, moduleProgress } = useProgress();
  const kidMode = !!mod.kidMode;
  const modPct = Math.round(moduleProgress(getModuleActivities(mod).map((a) => a.id)) * 100);

  const [confettiKey, setConfettiKey] = useState(0);
  const [pipMood, setPipMood] = useState<"idle" | "cheer" | "think">("idle");
  const [pipSays, setPipSays] = useState<string>("");
  const [badgeKey, setBadgeKey] = useState(0);
  const [badge, setBadge] = useState<{ emoji: string; title: string }>({
    emoji: "",
    title: "",
  });
  // In-character reaction panel (Pip & the Grey): a cheer on solve, a Murk taunt
  // on a wrong attempt. Counter-keyed so the same line can re-trigger.
  const [reactionKey, setReactionKey] = useState(0);
  const [reaction, setReaction] = useState<{
    line: DialogueLine;
    tone: "card" | "warn";
  } | null>(null);
  const dialogue = activity.dialogue;
  const streak = useStreak();
  const { best: dailyBest } = useDailyStreak();
  const prefs = useKidsPrefs();
  const boardTheme = getBoardTheme(prefs.boardThemeId);
  const themeVars = kidMode
    ? ({
        "--board-light": boardTheme.light,
        "--board-dark": boardTheme.dark,
      } as React.CSSProperties)
    : undefined;

  const state = getActivityState(activity.id);
  const next = getNextActivity(mod, activity.id);
  // Single forward target, reused by the footer and by players (like the concept
  // card) whose own completion button doubles as the "advance" button.
  const advanceHref = next ? `/modules/${mod.id}/${next.id}` : `/modules/${mod.id}`;

  const handleComplete = useCallback(
    (score: number) => {
      // Snapshot BEFORE the write so we can compute belt/lesson deltas.
      const before = snapshot();
      const wasAlreadyComplete = before[activity.id]?.completed ?? false;
      markComplete(activity.id, score);
      recordDailyActivity(); // any activity completion counts toward the daily streak
      if (!kidMode) return;

      // In-character cheer on a solve (spoken — audio is already unlocked).
      if (dialogue?.onCorrect) {
        setReaction({ line: dialogue.onCorrect, tone: "card" });
        setReactionKey((k) => k + 1);
        speakAs(dialogue.onCorrect.text, dialogue.onCorrect.speaker);
      }

      // Feed the concept SRS so Pip's Challenge can resurface weak spots later.
      const concept = conceptForActivity(activity.id);
      if (concept) srsStore.record(conceptSrsKey(concept), score >= 100);

      recordResult(score >= 100); // clean solves build the "in a row" hot streak

      // Belt-up takes priority: does completing this activity earn a new belt?
      const after = {
        ...before,
        [activity.id]: { completed: true, score, attempts: 1 },
      };
      const beltBefore = selectBelt(before);
      const beltAfter = selectBelt(after);

      // Newly-earned achievement badges → a one-time "new badge!" toast.
      const allIds = mod.lessons.flatMap((l) => l.activities.map((a) => a.id));
      const fresh = badgeSeenStore.markSeen(
        earnedAchievementIds({
          data: after,
          dailyBest,
          beltIndex: beltAfter.index,
          totalStars: selectTotalStarsKid(after, allIds),
        }),
      );
      if (fresh.length) {
        const a = ACHIEVEMENTS.find((x) => x.id === fresh[0]);
        if (a) {
          setBadge({ emoji: a.emoji, title: a.title });
          setBadgeKey((k) => k + 1);
          playSound("star");
        }
      }

      if (!wasAlreadyComplete && beltAfter.index > beltBefore.index && beltAfter.earned) {
        setConfettiKey((k) => k + 1);
        playSound("fanfare");
        setPipMood("cheer");
        setPipSays(`New belt: ${beltAfter.earned.name}! 🥋`);
        return;
      }

      // Otherwise celebrate a newly-finished lesson; else a calm "Nice!".
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
    [
      markComplete,
      activity.id,
      kidMode,
      mod.lessons,
      getActivityState,
      snapshot,
      dailyBest,
      dialogue,
    ],
  );
  const handleAttempt = useCallback(() => {
    recordAttempt(activity.id);
    // A gentle Murk taunt on a wrong move (puzzle / opening drill report attempts).
    if (kidMode && dialogue?.onWrong) {
      setReaction({ line: dialogue.onWrong, tone: "warn" });
      setReactionKey((k) => k + 1);
      speakAs(dialogue.onWrong.text, dialogue.onWrong.speaker);
    }
  }, [recordAttempt, activity.id, kidMode, dialogue]);

  const ActivityIcon = ACTIVITY_ICON[activity.type];

  return (
    <div className="space-y-4 sm:space-y-6" style={themeVars}>
      {/* Breadcrumb + module progress strip — "you are here" (non-kid; kids have Pip). */}
      {!kidMode && (
        <div className="flex items-center gap-3 border-b border-line/70 pb-3 text-xs">
          <Link
            href={`/modules/${mod.id}`}
            className="max-w-[45%] truncate font-medium text-ink-soft transition hover:text-ink"
          >
            {mod.title}
          </Link>
          <ProgressBar pct={modPct} tone="primary" className="min-w-0 flex-1" />
          <LevelChip module={mod} />
        </div>
      )}

      {kidMode && <Confetti fireKey={confettiKey} />}
      {kidMode && <BadgeToast fireKey={badgeKey} emoji={badge.emoji} title={badge.title} />}

      {kidMode && activity.type !== "scene" && (
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
                <>
                  <ReadAloudToggle size="sm" />
                  <SpeakButton text={headerSpeech(activity)} size="sm" />
                </>
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

      {/* In-character framing of the task (tap the speaker to replay; the task's
          primary prompt auto-reads via useAutoRead when read-aloud is on). */}
      {kidMode && dialogue?.intro && activity.type !== "scene" && (
        <SpeakingCharacter line={dialogue.intro} />
      )}
      {/* Cheer / Murk taunt reaction (counter-keyed so it can re-fire). */}
      {kidMode && reaction && (
        <div key={reactionKey}>
          <SpeakingCharacter line={reaction.line} tone={reaction.tone} />
        </div>
      )}

      {activity.type === "quiz" && (
        <QuizPlayer
          activity={activity}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
          kidMode={kidMode}
        />
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
        <PictureQuizPlayer
          activity={activity}
          onComplete={handleComplete}
          onAttempt={handleAttempt}
        />
      )}
      {activity.type === "target" && (
        <TargetPlayer activity={activity} onComplete={handleComplete} />
      )}
      {activity.type === "sort" && (
        <SortPlayer activity={activity} onComplete={handleComplete} onAttempt={handleAttempt} kidMode={kidMode} />
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
      {activity.type === "reviewCheckpoint" && (
        <PipChallengePlayer activity={activity} onComplete={handleComplete} />
      )}
      {activity.type === "scene" && (
        <ScenePlayer
          activity={activity}
          onComplete={handleComplete}
          advanceHref={advanceHref}
          advanceLabel={next ? activity.cta : kidMode ? "All done!" : "Finish"}
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
        {/* The concept card and story scene own their forward action (their own
            button completes AND advances in one tap) — don't render a second. */}
        {activity.type === "concept" || activity.type === "scene" ? null : state.completed ? (
          <AdvanceButton
            href={advanceHref}
            kind={next ? "next" : "finish"}
            size={kidMode ? "kid" : "lg"}
            label={next ? "Next" : kidMode ? "All done!" : "Finish"}
            testId="advance"
          />
        ) : (
          <span className="text-sm text-ink-soft/70">
            {kidMode ? "Finish to keep going!" : "Complete to continue"}
          </span>
        )}
      </footer>
    </div>
  );
}
