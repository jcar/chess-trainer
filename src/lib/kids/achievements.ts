// Achievement badges for the kids module — collectible milestones a child earns
// by reaching real skill markers. Earned status is DERIVED from the progress
// snapshot + daily streak + belt (never stored, so it can't desync). A separate
// "seen" set (badgeSeen.ts) drives the one-time "new badge!" celebration.

import type { ProgressData } from "@/lib/progress/store";

export interface AchievementContext {
  data: ProgressData;
  /** Best daily streak (from lib/rewards/daily). */
  dailyBest: number;
  /** Highest belt index earned (lib/kids/belts), or -1. */
  beltIndex: number;
  /** Total kid stars across the module. */
  totalStars: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  earned: (ctx: AchievementContext) => boolean;
}

const done = (data: ProgressData, id: string): boolean => !!data[id]?.completed;
const anyDone = (data: ProgressData, ids: string[]): boolean =>
  ids.some((id) => done(data, id));
const allDone = (data: ProgressData, ids: string[]): boolean =>
  ids.every((id) => done(data, id));

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "square-hunter",
    title: "Square Hunter",
    description: "Found every square Pip called out.",
    emoji: "🔎",
    earned: ({ data }) => done(data, "find-squares"),
  },
  {
    id: "piece-scholar",
    title: "Friend to the Pieces",
    description: "Met all six sleeping pieces of the kingdom.",
    emoji: "🎓",
    earned: ({ data }) =>
      allDone(data, [
        "meet-the-rook",
        "meet-the-bishop",
        "meet-the-queen",
        "meet-the-king",
        "meet-the-knight",
        "meet-the-pawn",
      ]),
  },
  {
    id: "arcade-champ",
    title: "Arcade Champ",
    description: "Cleared every game in Pip's Arcade.",
    emoji: "🕹️",
    earned: ({ data }) =>
      allDone(data, [
        "arcade-knight-tour",
        "arcade-rook-roundup",
        "arcade-bishop-diagonal",
        "arcade-gobble-pawns",
        "arcade-rook-budget",
        "arcade-king-dodge",
      ]),
  },
  {
    id: "first-checkmate",
    title: "Sir Rookwell's Lesson",
    description: "Delivered your very first checkmate in Battle Meadow!",
    emoji: "♚",
    earned: ({ data }) =>
      anyDone(data, ["mate-in-1-practice", "trap-mate-in-1", "pip-level-1-mate"]),
  },
  {
    id: "safe-player",
    title: "Rookwell's Rule",
    description: "Learned to check for danger before you move.",
    emoji: "🛡️",
    earned: ({ data }) => anyDone(data, ["smart-blunder-check", "smart-routine"]),
  },
  {
    id: "fork-master",
    title: "Murk's Own Trick",
    description: "Won a piece with a fork in Trickster Forest.",
    emoji: "🍴",
    earned: ({ data }) => done(data, "fork-puzzle"),
  },
  {
    id: "skewer-star",
    title: "Skewer in the Trees",
    description: "Won the queen with a skewer in Trickster Forest.",
    emoji: "🍢",
    earned: ({ data }) => done(data, "skewer-puzzle"),
  },
  {
    id: "promoter",
    title: "Pip's Dream",
    description: "Marched a pawn all the way home to become a queen — just like Pip.",
    emoji: "👑",
    earned: ({ data }) => anyDone(data, ["promotion-target", "pip-level-2-race"]),
  },
  {
    id: "guardian-slayer",
    title: "Gatebreaker",
    description: "Passed one of Murk's gates.",
    emoji: "🏅",
    earned: ({ data }) =>
      anyDone(data, ["checkpoint-1", "checkpoint-2", "checkpoint-3"]),
  },
  {
    id: "beat-pip-5",
    title: "Pip Slayer",
    description: "Beat Pip on the very last level!",
    emoji: "⚔️",
    earned: ({ data }) => done(data, "pip-level-5-rook"),
  },
  {
    id: "streak-3",
    title: "On a Roll",
    description: "Played 3 days in a row.",
    emoji: "🔥",
    earned: ({ dailyBest }) => dailyBest >= 3,
  },
  {
    id: "streak-7",
    title: "Chess Habit",
    description: "Played 7 days in a row!",
    emoji: "📅",
    earned: ({ dailyBest }) => dailyBest >= 7,
  },
  {
    id: "star-collector",
    title: "Star Collector",
    description: "Earned 30 stars.",
    emoji: "⭐",
    earned: ({ totalStars }) => totalStars >= 30,
  },
  {
    id: "crowned",
    title: "Saved the Kingdom",
    description: "Woke King Cedric and lifted the Grey — you're a chess player!",
    emoji: "🏆",
    earned: ({ data, beltIndex }) => beltIndex >= 5 || done(data, "you-did-it"),
  },
];

/** Ids of all achievements currently earned. */
export function earnedAchievementIds(ctx: AchievementContext): string[] {
  return ACHIEVEMENTS.filter((a) => a.earned(ctx)).map((a) => a.id);
}
