"use client";

// "Pip's Challenge" — a mixed, mastery-based review that interleaves earlier
// concepts. Items are ordered by the shared SRS (most-overdue / most-missed
// concepts first), each answered retry-until-right (via ChoiceCheck), and every
// answer feeds the SRS so future checkpoints resurface weak spots. Gentle: if the
// child doesn't clear the mastery bar on the first pass, the tricky ones come
// back once more — there is no fail state for a 5–8 year old.

import { useRef, useState } from "react";
import type { ReviewCheckpointActivity, ReviewItem } from "@/content/types";
import type { SrsData } from "@/lib/srs/store";
import { ChoiceCheck } from "@/components/kids/ChoiceCheck";
import { SpeakButton } from "@/components/kids/SpeakButton";
import { PipMascot } from "@/components/kids/PipMascot";
import { playSound } from "@/lib/audio/sounds";
import { useSrs, srsStore } from "@/lib/srs/useSrs";
import { conceptSrsKey } from "@/lib/kids/concepts";

interface Props {
  activity: ReviewCheckpointActivity;
  onComplete: (score: number) => void;
}

function nowMs(): number {
  try {
    return Date.now();
  } catch {
    return 0;
  }
}

/** Order items so a child's overdue/missed concepts come first, then unseen,
 *  then recently-mastered. Computed once at mount (does not reshuffle mid-run). */
function orderBySrs(items: ReviewItem[], srs: SrsData): ReviewItem[] {
  const now = nowMs();
  const score = (it: ReviewItem): number => {
    const e = srs[conceptSrsKey(it.conceptId)];
    if (!e) return 1;
    if (e.due <= now) return -1 - e.lapses;
    return 2;
  };
  return [...items].sort((a, b) => score(a) - score(b));
}

export function PipChallengePlayer({ activity, onComplete }: Props) {
  const srs = useSrs();
  const total = activity.items.length;
  // Lazy initializer reads the SRS once at mount to order the queue.
  const [queue, setQueue] = useState<ReviewItem[]>(() => orderBySrs(activity.items, srs));
  const [pos, setPos] = useState(0);
  const [done, setDone] = useState(false);
  const cleanRef = useRef(0);
  const missedRef = useRef<ReviewItem[]>([]);
  const firstPassRef = useRef(true);

  const item = queue[pos];

  function handleSolved(clean: boolean) {
    srsStore.record(conceptSrsKey(item.conceptId), clean);
    if (firstPassRef.current) {
      if (clean) cleanRef.current += 1;
      else missedRef.current.push(item);
    }
    // Let the "correct!" state register, then advance.
    setTimeout(() => {
      const next = pos + 1;
      if (next < queue.length) {
        setPos(next);
        return;
      }
      if (firstPassRef.current) {
        firstPassRef.current = false;
        const passed = cleanRef.current / total >= activity.masteryBar;
        if (passed || missedRef.current.length === 0) {
          finish();
        } else {
          setQueue(missedRef.current); // one gentle round of the tricky ones
          setPos(0);
        }
      } else {
        finish();
      }
    }, 650);
  }

  function finish() {
    setDone(true);
    playSound("fanfare");
    onComplete(100);
  }

  if (done) {
    return (
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <PipMascot mood="cheer" size={72} says="Challenge cleared! 🏆" />
        </div>
        <p className="text-xl font-bold text-primary-strong">{activity.successText}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3 rounded-2xl bg-accent/10 p-4 text-lg text-primary-strong">
        <p className="flex-1 font-semibold">{activity.intro}</p>
        <SpeakButton text={activity.intro} size="sm" />
      </div>

      <div className="flex items-center gap-1.5 text-sm font-bold text-ink-soft">
        {queue.map((_, i) => (
          <span
            key={i}
            aria-hidden
            className={`h-2.5 w-2.5 rounded-full ${
              i < pos ? "bg-accent" : i === pos ? "bg-accent/40" : "bg-ink/15"
            }`}
          />
        ))}
        <span className="ml-2">
          {pos}/{queue.length}
        </span>
      </div>

      {item && (
        <ChoiceCheck
          key={`${pos}-${item.conceptId}`}
          question={item.question}
          options={item.options}
          correctIndex={item.correctIndex}
          explanation={item.explanation}
          seed={`${activity.id}:${pos}:${item.conceptId}`}
          onSolved={handleSolved}
          kidMode
        />
      )}
    </div>
  );
}
