// "Pip & the Grey" — the story beats wrapped around each lesson. Every lesson
// becomes a Chapter: a HOOK scene that frames why the child is about to learn
// this (a problem in the kingdom), then the lesson's activities, then a RESOLVE
// scene that pays it off (color returns, a friend wakes, a cliffhanger pulls
// toward the next land). These are injected by withStory.ts — the lesson files
// themselves stay focused on chess.
//
// Scene ids are derived: `${lessonId}-hook` / `${lessonId}-resolve`.
// `colorAmount` climbs across a land so the kingdom visibly blooms back from the
// Grey as the child progresses (and mirrors the living map on the module page).
//
// Authored land-by-land. Lands not yet written simply have no entry (withStory
// leaves those lessons unchanged).

import type { SceneActivity } from "../types";

export interface Episode {
  hook: SceneActivity;
  resolve: SceneActivity;
}

const scene = (
  lessonId: string,
  kind: "hook" | "resolve",
  data: Omit<SceneActivity, "id" | "type">,
): SceneActivity => ({
  id: `${lessonId}-${kind}`,
  type: "scene",
  ...data,
});

export const EPISODES: Record<string, Episode> = {
  // ---------------- LAND 1 — The Square Kingdom ----------------
  "kids-l1-board": {
    hook: scene("kids-l1-board", "hook", {
      title: "The Kingdom of Grey",
      backdrop: "kingdom",
      colorAmount: 0.08,
      cta: "Wake up, Pip!",
      lines: [
        { speaker: "pip", text: "Oh… where are all the colors? The whole kingdom turned grey!", mood: "worried" },
        { speaker: "pip", text: "Everyone is fast asleep. The Grey put them to sleep — even the King!", mood: "worried" },
        { speaker: "pip", text: "I'm Pip, the smallest pawn. And YOU are my Caller. Together we can bring the colors back!", mood: "idle" },
        { speaker: "pip", text: "First I must learn this place. Help me explore the board of 64 squares!", mood: "happy" },
      ],
    }),
    resolve: scene("kids-l1-board", "resolve", {
      title: "A Spark of Color",
      backdrop: "kingdom",
      colorAmount: 0.25,
      cta: "Keep going!",
      lines: [
        { speaker: "pip", text: "Look! When we learned the squares, a tiny bit of color came back!", mood: "happy" },
        { speaker: "murk", text: "Hee-hee! A pawn playing hero? You'll never wake them all, little Pip.", mood: "sly" },
        { speaker: "pip", text: "That's Murk, the trickster magpie. Don't worry — we'll prove him wrong, Caller!", mood: "idle" },
      ],
    }),
  },

  "kids-l2-straight-diagonal": {
    hook: scene("kids-l2-straight-diagonal", "hook", {
      title: "The Grey Roads",
      backdrop: "kingdom",
      colorAmount: 0.25,
      cta: "Find the roads!",
      lines: [
        { speaker: "pip", text: "To wake the sleeping pieces, we must travel the kingdom's roads.", mood: "idle" },
        { speaker: "pip", text: "Some roads go straight — up, down, and across. Some go slanted, like a diagonal.", mood: "idle" },
        { speaker: "pip", text: "Learn the roads with me, and we can reach anyone who needs us!", mood: "happy" },
      ],
    }),
    resolve: scene("kids-l2-straight-diagonal", "resolve", {
      title: "Paths Light Up",
      backdrop: "kingdom",
      colorAmount: 0.4,
      cta: "Onward!",
      lines: [
        { speaker: "pip", text: "Now I can see the roads glowing! Straight ones and slanted ones.", mood: "happy" },
        { speaker: "pip", text: "More color is coming back. The kingdom is waking up, bit by bit!", mood: "happy" },
      ],
    }),
  },

  "kids-l3-king-knight-pawn": {
    hook: scene("kids-l3-king-knight-pawn", "hook", {
      title: "Sleeping Friends",
      backdrop: "kingdom",
      colorAmount: 0.4,
      cta: "Meet the pieces!",
      lines: [
        { speaker: "pip", text: "Here are three sleepy friends: the King, the Knight, and another little pawn like me.", mood: "idle" },
        { speaker: "pip", text: "Each one moves in its own special way. If we learn how they move, we can wake them!", mood: "happy" },
      ],
    }),
    resolve: scene("kids-l3-king-knight-pawn", "resolve", {
      title: "They Stir!",
      backdrop: "kingdom",
      colorAmount: 0.6,
      cta: "To the playground!",
      lines: [
        { speaker: "pip", text: "Did you see? They wiggled! Learning their moves is waking them up.", mood: "happy" },
        { speaker: "murk", text: "Pfft. Knowing the moves and USING them are very different, hero.", mood: "sly" },
        { speaker: "pip", text: "Then let's practice, Caller — to the playground!", mood: "happy" },
      ],
    }),
  },

  "kids-arcade": {
    hook: scene("kids-arcade", "hook", {
      title: "Pip's Playground",
      backdrop: "kingdom",
      colorAmount: 0.6,
      cta: "Let's play!",
      lines: [
        { speaker: "pip", text: "Time to play! These games make our moves quick and strong.", mood: "happy" },
        { speaker: "murk", text: "Bet you can't beat them all. I'll be watching… and giggling.", mood: "sly" },
        { speaker: "pip", text: "We'll show Murk what we can do. Ready, Caller?", mood: "idle" },
      ],
    }),
    resolve: scene("kids-arcade", "resolve", {
      title: "Sharp as a Sword",
      backdrop: "kingdom",
      colorAmount: 0.75,
      cta: "To the gate!",
      lines: [
        { speaker: "pip", text: "We cleared the playground! Our moves are quick now.", mood: "happy" },
        { speaker: "pip", text: "But up ahead I see a big grey gate, and Murk is sitting on it…", mood: "worried" },
      ],
    }),
  },

  "kids-checkpoint-1": {
    hook: scene("kids-checkpoint-1", "hook", {
      title: "Murk's Gate",
      backdrop: "kingdom",
      colorAmount: 0.75,
      cta: "Take the challenge!",
      lines: [
        { speaker: "murk", text: "Stop right there! No one crosses my gate without passing my riddles.", mood: "sly" },
        { speaker: "pip", text: "We've learned so much, Caller. Answer Murk's questions and the gate will open!", mood: "idle" },
        { speaker: "murk", text: "Riddles about squares, roads, and pieces. Get them right… if you can!", mood: "sly" },
      ],
    }),
    resolve: scene("kids-checkpoint-1", "resolve", {
      title: "The Square Kingdom Blooms",
      backdrop: "kingdom",
      colorAmount: 1,
      cta: "On to Battle Meadow!",
      lines: [
        { speaker: "murk", text: "Gah! You actually passed? Fine, fine — the gate is open.", mood: "worried" },
        { speaker: "pip", text: "Look, Caller! The whole Square Kingdom has its colors back!", mood: "happy" },
        { speaker: "rookwell", text: "…Who woke me? I am Sir Rookwell. Beyond this gate, in Battle Meadow, I will teach you to be brave.", mood: "idle" },
        { speaker: "pip", text: "Our first friend! Come on — Battle Meadow is waiting!", mood: "happy" },
      ],
    }),
  },
};
