// Belt progression for the kids module — a martial-arts-style "level up" that
// doubles as a credential. A belt is earned when every lesson in its cluster is
// complete (guardian review checkpoints gate the harder belts). Pure selector
// over the progress snapshot — no new storage. Reuses selectAllComplete.

import type { ProgressData } from "@/lib/progress/store";
import { selectAllComplete } from "@/lib/progress/store";
import { getModule } from "@/content";

const KIDS_MODULE_ID = "chess-for-kids";

export interface Belt {
  id: string;
  name: string;
  /** Display color (hex) for the belt chip / map milestone. */
  color: string;
  /** Lesson ids whose completion earns this belt (cumulative with prior belts). */
  lessons: string[];
}

// Clusters follow the module's actual lesson order, with the three Pip's
// Challenge checkpoints gating the harder belts.
export const BELTS: Belt[] = [
  {
    id: "white",
    name: "White Belt",
    color: "#cbd5e1",
    lessons: [
      "kids-l1-board",
      "kids-l2-straight-diagonal",
      "kids-l3-king-knight-pawn",
      "kids-arcade",
      "kids-checkpoint-1",
    ],
  },
  {
    id: "yellow",
    name: "Yellow Belt",
    color: "#facc15",
    lessons: ["kids-l4-capturing-values", "kids-playing-smart", "kids-l5-check-mate"],
  },
  {
    id: "orange",
    name: "Orange Belt",
    color: "#fb923c",
    lessons: ["kids-l6-special-moves", "kids-l7-draws", "kids-checkpoint-2"],
  },
  {
    id: "green",
    name: "Green Belt",
    color: "#4ade80",
    lessons: [
      "kids-good-first-moves",
      "kids-scholars-mate",
      "kids-trapping-king",
      "kids-more-mates",
      "kids-l8-first-mates",
    ],
  },
  {
    id: "blue",
    name: "Blue Belt",
    color: "#60a5fa",
    lessons: ["kids-l9-tricks", "kids-pawn-power", "kids-checkpoint-3"],
  },
  {
    id: "black",
    name: "Black Belt",
    color: "#334155",
    lessons: ["kids-l10-play"],
  },
];

export interface BeltState {
  /** Index of the highest earned belt, or -1 if none yet. */
  index: number;
  earned: Belt | null;
  next: Belt | null;
  /** Lessons still incomplete in the next belt's cluster. */
  nextRemaining: number;
}

function lessonActivityIds(lessonId: string): string[] {
  const mod = getModule(KIDS_MODULE_ID);
  const lesson = mod?.lessons.find((l) => l.id === lessonId);
  return lesson ? lesson.activities.map((a) => a.id) : [];
}

function clusterComplete(belt: Belt, data: ProgressData): boolean {
  return belt.lessons.every((lid) => {
    const ids = lessonActivityIds(lid);
    return ids.length > 0 && selectAllComplete(data, ids);
  });
}

/** Highest belt earned (cumulative: belt N requires belts 0..N all complete). */
export function selectBelt(data: ProgressData): BeltState {
  let index = -1;
  for (let i = 0; i < BELTS.length; i++) {
    if (clusterComplete(BELTS[i], data)) index = i;
    else break;
  }
  const next = index + 1 < BELTS.length ? BELTS[index + 1] : null;
  const nextRemaining = next
    ? next.lessons.filter((lid) => {
        const ids = lessonActivityIds(lid);
        return !(ids.length > 0 && selectAllComplete(data, ids));
      }).length
    : 0;
  return {
    index,
    earned: index >= 0 ? BELTS[index] : null,
    next,
    nextRemaining,
  };
}
