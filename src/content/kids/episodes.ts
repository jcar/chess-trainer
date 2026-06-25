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

  // ---------------- LAND 2 — Battle Meadow (wakes Sir Rookwell) ----------------
  "kids-l4-capturing-values": {
    hook: scene("kids-l4-capturing-values", "hook", {
      title: "Into Battle Meadow",
      backdrop: "meadow",
      colorAmount: 0.2,
      cta: "Learn to capture!",
      lines: [
        { speaker: "rookwell", text: "Welcome to Battle Meadow! Here, pieces can bump enemies off the board. That's a capture!", mood: "idle" },
        { speaker: "rookwell", text: "But some pieces are worth more than others. A wise fighter knows what to trade.", mood: "idle" },
        { speaker: "pip", text: "Teach us, Sir Rookwell! Help us learn what each piece is worth, Caller.", mood: "happy" },
      ],
    }),
    resolve: scene("kids-l4-capturing-values", "resolve", {
      title: "Green Returns to the Meadow",
      backdrop: "meadow",
      colorAmount: 0.4,
      cta: "Keep going!",
      lines: [
        { speaker: "pip", text: "The grass is turning green! We know what the pieces are worth now.", mood: "happy" },
        { speaker: "murk", text: "Worth, schmorth. You'll give away your queen the moment you stop looking!", mood: "sly" },
      ],
    }),
  },
  "kids-playing-smart": {
    hook: scene("kids-playing-smart", "hook", {
      title: "Rookwell's Rule",
      backdrop: "meadow",
      colorAmount: 0.4,
      cta: "Play it smart!",
      lines: [
        { speaker: "rookwell", text: "A brave piece is also a CAREFUL one. Before every move, look: is anything in danger?", mood: "idle" },
        { speaker: "rookwell", text: "Murk loves it when you forget to check. Let's not give him the chance.", mood: "idle" },
      ],
    }),
    resolve: scene("kids-playing-smart", "resolve", {
      title: "Careful and Strong",
      backdrop: "meadow",
      colorAmount: 0.6,
      cta: "Onward!",
      lines: [
        { speaker: "pip", text: "I looked before I leaped — and nothing got taken for free!", mood: "happy" },
        { speaker: "rookwell", text: "Well done, Caller. Now for the most important move of all… the checkmate.", mood: "idle" },
      ],
    }),
  },
  "kids-l5-check-mate": {
    hook: scene("kids-l5-check-mate", "hook", {
      title: "Check… and Mate!",
      backdrop: "meadow",
      colorAmount: 0.6,
      cta: "Trap the king!",
      lines: [
        { speaker: "rookwell", text: "When the king is attacked, that's CHECK — he must escape at once.", mood: "idle" },
        { speaker: "rookwell", text: "When he's attacked and CAN'T escape — that's checkmate. That's how chess is won!", mood: "happy" },
        { speaker: "pip", text: "Show the Grey what we've learned, Caller. Find the checkmate!", mood: "happy" },
      ],
    }),
    resolve: scene("kids-l5-check-mate", "resolve", {
      title: "The Meadow Blooms",
      backdrop: "meadow",
      colorAmount: 1,
      cta: "On to Castle Heights!",
      lines: [
        { speaker: "rookwell", text: "Checkmate! You did it. Battle Meadow is green and golden once more.", mood: "happy" },
        { speaker: "murk", text: "Hmph. Beginner's luck. The high cliffs of Castle Heights will stop you!", mood: "worried" },
        { speaker: "pip", text: "Up we climb, Caller — someone is sleeping on the heights, and we'll wake her too!", mood: "happy" },
      ],
    }),
  },

  // ---------------- LAND 3 — Castle Heights (wakes Bishop Belle) ----------------
  "kids-l6-special-moves": {
    hook: scene("kids-l6-special-moves", "hook", {
      title: "The Sleeping Bishop",
      backdrop: "heights",
      colorAmount: 0.2,
      cta: "Learn the secret moves!",
      lines: [
        { speaker: "belle", text: "Mmm… who climbs so high? I am Bishop Belle. Up here we keep the kingdom's SECRET moves.", mood: "idle" },
        { speaker: "belle", text: "Castling, en passant, and a pawn becoming a queen — special moves that surprise your foe.", mood: "happy" },
        { speaker: "pip", text: "Secret moves?! Teach us every one, Belle!", mood: "happy" },
      ],
    }),
    resolve: scene("kids-l6-special-moves", "resolve", {
      title: "Secrets Unlocked",
      backdrop: "heights",
      colorAmount: 0.45,
      cta: "Keep climbing!",
      lines: [
        { speaker: "pip", text: "Castling AND turning a pawn into a queen? These are wonderful!", mood: "happy" },
        { speaker: "belle", text: "You learn quickly, Caller. But there is one more thing every player must know…", mood: "idle" },
      ],
    }),
  },
  "kids-l7-draws": {
    hook: scene("kids-l7-draws", "hook", {
      title: "When Nobody Wins",
      backdrop: "heights",
      colorAmount: 0.45,
      cta: "Learn about draws!",
      lines: [
        { speaker: "belle", text: "Not every game is won, little one. Sometimes a game ends in a tie — a draw.", mood: "idle" },
        { speaker: "belle", text: "Beware STALEMATE: if a king can't move but isn't in check, the game is a draw — not a win!", mood: "worried" },
      ],
    }),
    resolve: scene("kids-l7-draws", "resolve", {
      title: "The Wise Way",
      backdrop: "heights",
      colorAmount: 0.7,
      cta: "To the gate!",
      lines: [
        { speaker: "pip", text: "So I must be careful NOT to stalemate when I'm winning. Got it!", mood: "happy" },
        { speaker: "murk", text: "Clever, clever. But my gate on the heights is trickier than the last…", mood: "sly" },
      ],
    }),
  },
  "kids-checkpoint-2": {
    hook: scene("kids-checkpoint-2", "hook", {
      title: "The Cliff Gate",
      backdrop: "heights",
      colorAmount: 0.7,
      cta: "Take the challenge!",
      lines: [
        { speaker: "murk", text: "None shall pass the cliff gate without proving they can win AND stay safe!", mood: "sly" },
        { speaker: "belle", text: "You are ready, Caller. Answer Murk, and the heights are ours.", mood: "idle" },
      ],
    }),
    resolve: scene("kids-checkpoint-2", "resolve", {
      title: "Castle Heights Blooms",
      backdrop: "heights",
      colorAmount: 1,
      cta: "On to Champions' Road!",
      lines: [
        { speaker: "belle", text: "The mountains shine again! Thank you, Caller — I am wide awake.", mood: "happy" },
        { speaker: "murk", text: "Two friends woken… this is getting out of hand!", mood: "worried" },
        { speaker: "pip", text: "Down to Champions' Road, Caller. I hear something fast and bouncy down there…", mood: "happy" },
      ],
    }),
  },

  // ---------------- LAND 4 — Champions' Road (wakes Nim, who joins) ----------------
  "kids-good-first-moves": {
    hook: scene("kids-good-first-moves", "hook", {
      title: "A Bouncy Knight",
      backdrop: "road",
      colorAmount: 0.2,
      cta: "Learn good openings!",
      lines: [
        { speaker: "nim", text: "Boing! Boing! Hi-hi-hi! I'm Nim the knight — fastest hopper on Champions' Road!", mood: "happy" },
        { speaker: "nim", text: "Wanna win? START strong! Grab the middle, wake your pieces up, keep your king cozy.", mood: "happy" },
        { speaker: "pip", text: "Good first moves! Show us, Caller — let's open like champions.", mood: "happy" },
      ],
    }),
    resolve: scene("kids-good-first-moves", "resolve", {
      title: "Nim Joins the Quest",
      backdrop: "road",
      colorAmount: 0.45,
      cta: "Keep going!",
      lines: [
        { speaker: "nim", text: "Ooh, you're GOOD. Can I come with you? I wanna help wake everyone too!", mood: "happy" },
        { speaker: "pip", text: "Of course, Nim! Now we're a team of three — me, Nim, and you, Caller!", mood: "happy" },
      ],
    }),
  },
  "kids-scholars-mate": {
    hook: scene("kids-scholars-mate", "hook", {
      title: "A Sneaky Trap",
      backdrop: "road",
      colorAmount: 0.5,
      cta: "Learn the trap!",
      lines: [
        { speaker: "nim", text: "Psst, Caller — some tricksters try to win in just FOUR moves! It's called Scholar's Mate.", mood: "happy" },
        { speaker: "nim", text: "They gang up on one square — f7. Learn to see it, and nobody can ever catch you with it!", mood: "idle" },
      ],
    }),
    resolve: scene("kids-scholars-mate", "resolve", {
      title: "Trap Defused",
      backdrop: "road",
      colorAmount: 0.6,
      cta: "Keep going!",
      lines: [
        { speaker: "nim", text: "Boing! You spotted it AND turned it around. Four-move traps don't scare us!", mood: "happy" },
        { speaker: "murk", text: "Bah — I was SAVING that trick. No fair learning it!", mood: "sly" },
      ],
    }),
  },

  "kids-more-mates": {
    hook: scene("kids-more-mates", "hook", {
      title: "Sneaky Checkmates",
      backdrop: "road",
      colorAmount: 0.7,
      cta: "Learn new mates!",
      lines: [
        { speaker: "nim", text: "Ready for my favorites, Caller? Mates where the king is trapped by its OWN pieces!", mood: "happy" },
        { speaker: "nim", text: "The back-rank mate and the smothered mate — sneaky and beautiful. Let's spring them!", mood: "happy" },
      ],
    }),
    resolve: scene("kids-more-mates", "resolve", {
      title: "Sneaky Mates Mastered",
      backdrop: "road",
      colorAmount: 0.85,
      cta: "On to the big mates!",
      lines: [
        { speaker: "nim", text: "Back-rank AND smothered — you've got a whole bag of checkmates now!", mood: "happy" },
        { speaker: "pip", text: "Next, Caller — the great king-and-queen and king-and-rook mates. Let's finish the road!", mood: "happy" },
      ],
    }),
  },

  "kids-trapping-king": {
    hook: scene("kids-trapping-king", "hook", {
      title: "Build the Box",
      backdrop: "road",
      colorAmount: 0.45,
      cta: "Trap the king!",
      lines: [
        { speaker: "nim", text: "To catch a king, build a BOX! Take away his squares one by one until he's stuck.", mood: "happy" },
        { speaker: "pip", text: "Like herding a sheep into a pen. Let's practice the trap, Caller!", mood: "idle" },
      ],
    }),
    resolve: scene("kids-trapping-king", "resolve", {
      title: "Cornered!",
      backdrop: "road",
      colorAmount: 0.7,
      cta: "Onward!",
      lines: [
        { speaker: "nim", text: "Boxed him in! You're a natural king-catcher, Caller!", mood: "happy" },
        { speaker: "pip", text: "Now let's turn those traps into real checkmates.", mood: "happy" },
      ],
    }),
  },
  "kids-l8-first-mates": {
    hook: scene("kids-l8-first-mates", "hook", {
      title: "Your First Real Mates",
      backdrop: "road",
      colorAmount: 0.7,
      cta: "Deliver mate!",
      lines: [
        { speaker: "nim", text: "Two rooks, a queen, a single rook — each one can checkmate a lonely king. Let's learn the patterns!", mood: "happy" },
        { speaker: "pip", text: "Walk the king to the edge, then snap the trap shut. You can do it, Caller!", mood: "happy" },
      ],
    }),
    resolve: scene("kids-l8-first-mates", "resolve", {
      title: "Champions' Road Blooms",
      backdrop: "road",
      colorAmount: 1,
      cta: "Into the forest!",
      lines: [
        { speaker: "nim", text: "Boom! Mate! The whole road is sparkling again. Three friends awake!", mood: "happy" },
        { speaker: "murk", text: "No, no, NO! Stay out of my Trickster Forest — it's full of nasty surprises!", mood: "worried" },
        { speaker: "pip", text: "Surprises don't scare us anymore. Into the forest, team!", mood: "happy" },
      ],
    }),
  },

  // ---------------- LAND 5 — Trickster Forest (wakes Queen Aurora) ----------------
  "kids-l9-tricks": {
    hook: scene("kids-l9-tricks", "hook", {
      title: "Murk's Forest of Tricks",
      backdrop: "forest",
      colorAmount: 0.2,
      cta: "Learn the tricks!",
      lines: [
        { speaker: "murk", text: "My forest! Here I hide my favorite tricks — forks, pins, and skewers. You'll never learn them!", mood: "sly" },
        { speaker: "nim", text: "Oh-ho, a FORK hits two things at once! We can use Murk's own tricks against him!", mood: "happy" },
        { speaker: "pip", text: "Let's master every trick, Caller — and find who's sleeping deep in these trees.", mood: "idle" },
      ],
    }),
    resolve: scene("kids-l9-tricks", "resolve", {
      title: "Tricks Turned",
      backdrop: "forest",
      colorAmount: 0.45,
      cta: "Keep going!",
      lines: [
        { speaker: "pip", text: "Forks, pins, skewers — they're OURS now!", mood: "happy" },
        { speaker: "murk", text: "Hey! Those are MY tricks! …this isn't going how I planned.", mood: "worried" },
      ],
    }),
  },
  "kids-pawn-power": {
    hook: scene("kids-pawn-power", "hook", {
      title: "A Pawn's Big Dream",
      backdrop: "forest",
      colorAmount: 0.45,
      cta: "Walk the pawn home!",
      lines: [
        { speaker: "pip", text: "This part is close to my heart, Caller. A pawn who marches all the way home becomes a QUEEN.", mood: "happy" },
        { speaker: "nim", text: "That's YOUR dream, Pip! Let's practice walking pawns home, step by step.", mood: "happy" },
      ],
    }),
    resolve: scene("kids-pawn-power", "resolve", {
      title: "Almost There",
      backdrop: "forest",
      colorAmount: 0.7,
      cta: "To the last gate!",
      lines: [
        { speaker: "pip", text: "Every pawn made it home! My own dream feels closer than ever.", mood: "happy" },
        { speaker: "murk", text: "One last gate, deep in the trees. Pass it… if you dare.", mood: "sly" },
      ],
    }),
  },
  "kids-checkpoint-3": {
    hook: scene("kids-checkpoint-3", "hook", {
      title: "The Deep Forest Gate",
      backdrop: "forest",
      colorAmount: 0.7,
      cta: "Take the challenge!",
      lines: [
        { speaker: "murk", text: "My trickiest riddles yet! Forks, pins, pawns — get them ALL right, or turn back!", mood: "sly" },
        { speaker: "nim", text: "We've got this, Caller. Show Murk how sharp you are!", mood: "happy" },
      ],
    }),
    resolve: scene("kids-checkpoint-3", "resolve", {
      title: "The Queen Awakens",
      backdrop: "forest",
      colorAmount: 1,
      cta: "On to Pip's Arena!",
      lines: [
        { speaker: "aurora", text: "Light… at last. I am Queen Aurora. You have woken almost the whole kingdom, brave Caller.", mood: "happy" },
        { speaker: "aurora", text: "Only the King still sleeps. To wake him, Pip must cross to the far side and become a queen.", mood: "idle" },
        { speaker: "pip", text: "The far side… my dream! Come on, team — to Pip's Arena!", mood: "happy" },
      ],
    }),
  },

  // ---------------- LAND 6 — Pip's Arena (wakes King Cedric; Murk redeemed) ----------------
  "kids-l10-play": {
    hook: scene("kids-l10-play", "hook", {
      title: "The Throne Room",
      backdrop: "throne",
      colorAmount: 0.3,
      cta: "Play for the crown!",
      lines: [
        { speaker: "aurora", text: "Here sleeps King Cedric, where the Grey is strongest. Only real games will break it.", mood: "idle" },
        { speaker: "murk", text: "This is your LAST step, Pip. Play me, level by level… I won't make it easy!", mood: "sly" },
        { speaker: "pip", text: "Everything we learned comes down to this. Play with me, Caller — all the way to the crown!", mood: "happy" },
      ],
    }),
    resolve: scene("kids-l10-play", "resolve", {
      title: "Long Live the Kingdom!",
      backdrop: "throne",
      colorAmount: 1,
      cta: "You did it!",
      lines: [
        { speaker: "pip", text: "I reached the far side… I'm a QUEEN! The crown is mine!", mood: "happy" },
        { speaker: "cedric", text: "Ho! The Grey is lifted and I am awake. Thank you, Caller — you saved the Kingdom of Sixty-Four!", mood: "happy" },
        { speaker: "murk", text: "I… I only made trouble because nobody ever played with me. Could… could I stay?", mood: "worried" },
        { speaker: "pip", text: "Of course, Murk. Every kingdom needs a trickster friend. We did it, Caller — together!", mood: "happy" },
      ],
    }),
  },
};
