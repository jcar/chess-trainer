// Family review checkpoints for the Chess Openings course. Like the Fundamentals
// and Intermediate checkpoints, these interleave between the opening groups and
// re-test the IDEAS (not the moves — the Openings Trainer drills moves with
// spaced repetition). Any board position reuses a tabiya FEN already verified
// legal elsewhere in the course.

import type { Lesson } from "../../types";

// ---- After the 1.e4 group ----
export const openingReview1: Lesson = {
  id: "openings-review-1",
  title: "★ Checkpoint: 1.e4 Openings",
  summary:
    "A quick idea check on the King's Pawn openings — recognize them and recall what each side is really after.",
  activities: [
    {
      type: "concept",
      id: "openings-review-1-intro",
      title: "Quick checkpoint",
      blurb: "Recall the ideas.",
      body:
        "No new openings here — a short check on the 1.e4 group you just studied. Recognizing an opening and recalling its plan from memory is what makes it usable in your own games.\n\nAnswer from memory; if one trips you up, that opening's lesson is worth a quick revisit.",
      points: [
        "Name the opening, recall its plan.",
        "A miss just points you back to a lesson.",
      ],
    },
    {
      type: "quiz",
      id: "oe4-ruy",
      title: "Name the opening",
      blurb: "Three moves in.",
      question: "1.e4 e5 2.Nf3 Nc6 3.Bb5 — which opening is this?",
      options: [
        "The Ruy Lopez (Spanish).",
        "The Italian Game.",
        "The Scotch Game.",
        "The Petroff Defence.",
      ],
      correctIndex: 0,
      explanation:
        "3.Bb5 — pressuring the c6-knight that guards e5 — is the Ruy Lopez. 3.Bc4 would be the Italian, 3.d4 the Scotch, and 2...Nf6 (instead of ...Nc6) the Petroff.",
    },
    {
      type: "sort",
      id: "oe4-tabiya",
      title: "Apply it: recognize the position",
      blurb: "Which opening is this?",
      prompt: "Which opening reaches the position in the diagram?",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
      orientation: "white",
      options: [
        { label: "The Italian Game (bishop to c4, aimed at f7)" },
        { label: "The Ruy Lopez (bishop to b5)" },
        { label: "The Scotch Game (an early d4)" },
      ],
      correctIndex: 0,
      explanation:
        "The bishop on c4, aimed straight at f7, is the Italian Game's signature. The Ruy puts the bishop on b5; the Scotch plays an early d4.",
    },
    {
      type: "quiz",
      id: "oe4-sicilian",
      title: "Why the Sicilian?",
      blurb: "1.e4 c5.",
      question: "Why do so many players answer 1.e4 with the Sicilian (1...c5)?",
      options: [
        "It unbalances the game and hands Black active counterplay and a half-open c-file.",
        "It forces an immediate draw against any White setup.",
        "It is the most passive, risk-free way to meet 1.e4.",
      ],
      correctIndex: 0,
      explanation:
        "The Sicilian fights for the win from move one: an asymmetrical structure, the half-open c-file, and rich counterplay. That's why it's the most popular answer to 1.e4.",
    },
    {
      type: "quiz",
      id: "oe4-carokann",
      title: "The solid choice",
      blurb: "1.e4 c6.",
      question: "The Caro-Kann (1...c6) is best described as:",
      options: [
        "Solid and sound — it frees the light-squared bishop before ...e6 shuts it in.",
        "A wild gambit that sacrifices a pawn for a quick attack.",
        "A passive shuffle with no real plan behind it.",
      ],
      correctIndex: 0,
      explanation:
        "The Caro-Kann's whole point is solidity without trapping the light-squared bishop: ...c6 and ...d5, then ...Bf5/...Bg6 develops the bishop OUTSIDE the chain before ...e6.",
    },
    {
      type: "concept",
      id: "openings-review-1-done",
      title: "Checkpoint cleared",
      blurb: "King's Pawn ideas locked in.",
      body:
        "You can name the main 1.e4 openings and recall what each side wants. Anything that slipped is worth a quick look back before moving to the Queen's Pawn openings.",
      points: [
        "Bc4 = Italian, Bb5 = Ruy, early d4 = Scotch.",
        "Sicilian = unbalance and fight; Caro-Kann = solid.",
      ],
    },
  ],
};

// ---- After the 1.d4 group ----
export const openingReview2: Lesson = {
  id: "openings-review-2",
  title: "★ Checkpoint: 1.d4 Openings",
  summary:
    "An idea check on the Queen's Pawn openings — the plans behind the King's Indian, London, Queen's Gambit, and Nimzo.",
  activities: [
    {
      type: "concept",
      id: "openings-review-2-intro",
      title: "Quick checkpoint",
      blurb: "The Queen's Pawn ideas.",
      body:
        "A short check on the 1.d4 openings. These are about structures and plans more than memorized moves, so recalling each one's idea is exactly the skill that matters.\n\nAnswer from memory, and revisit any opening a question exposes.",
      points: [
        "Each 1.d4 opening has a signature plan — recall it.",
        "A miss is a pointer back to the lesson.",
      ],
    },
    {
      type: "quiz",
      id: "od4-kid",
      title: "King's Indian plan",
      blurb: "Give the centre, then strike.",
      question: "In the King's Indian, what is Black's thematic plan?",
      options: [
        "Let White build a big centre, then strike back with ...e5 and ...f5 for a kingside attack.",
        "Trade every piece as fast as possible and head straight for a draw.",
        "Refuse to fianchetto and keep the bishop passive on f8 all game.",
      ],
      correctIndex: 0,
      explanation:
        "The King's Indian concedes space, then counter-punches: ...e5, and the thematic ...f5 launching a kingside pawn storm while White plays on the queenside.",
    },
    {
      type: "quiz",
      id: "od4-london",
      title: "Why the London?",
      blurb: "A system you can always play.",
      question: "What's the main practical appeal of the London System?",
      options: [
        "An easy, repeatable setup (Bf4, e3, c3, Nbd2) you can use against almost anything.",
        "It forces checkmate against any defence by about move fifteen.",
        "It is the sharpest, most theory-heavy opening White can choose.",
      ],
      correctIndex: 0,
      explanation:
        "The London is a SYSTEM: roughly the same sound setup whatever Black does. Low theory, solid structure, and a knight heading for e5 — ideal when you'd rather understand than memorize.",
    },
    {
      type: "quiz",
      id: "od4-qg",
      title: "Is it really a gambit?",
      blurb: "1.d4 d5 2.c4.",
      question: "Why isn't the Queen's Gambit a true gambit?",
      options: [
        "Black can't safely hold the c4-pawn — White regains it with a good position.",
        "Because White is actually the side giving up a whole piece.",
        "Because the rules forbid capturing the c4-pawn at all.",
      ],
      correctIndex: 0,
      explanation:
        "If Black grabs on c4, White doesn't sacrifice anything long-term: ...dxc4 can't be held (e.g. ...b5?? runs into a4), so White recovers the pawn and keeps a central edge.",
    },
    {
      type: "quiz",
      id: "od4-nimzo",
      title: "The Nimzo idea",
      blurb: "3...Bb4.",
      question: "In the Nimzo-Indian, what is the point of pinning the knight with ...Bb4?",
      options: [
        "Pressure (and often trade off) the c3-knight to damage White's pawns and fight for e4.",
        "Set up an immediate back-rank checkmate threat.",
        "Prepare to give up the bishop pair for no reason at all.",
      ],
      correctIndex: 0,
      explanation:
        "The Nimzo trades a bishop for the c3-knight to fight for the e4-square and, often, to saddle White with doubled c-pawns — structure and control over the bishop pair.",
    },
    {
      type: "concept",
      id: "openings-review-2-done",
      title: "Checkpoint cleared",
      blurb: "Queen's Pawn ideas locked in.",
      body:
        "You've got the plans behind the major 1.d4 openings. Next up: the flank openings and how to pull a repertoire together.",
      points: [
        "KID: ...e5/...f5 counter-attack; London: easy system.",
        "Queen's Gambit isn't a real gambit; Nimzo fights for e4.",
      ],
    },
  ],
};

// ---- After the flank group (end of course) ----
export const openingReview3: Lesson = {
  id: "openings-review-3",
  title: "★ Checkpoint: Flank Openings & Repertoire",
  summary:
    "The flank openings, plus the meta-skills: building a compact repertoire and handling surprises.",
  activities: [
    {
      type: "concept",
      id: "openings-review-3-intro",
      title: "Quick checkpoint",
      blurb: "Flank ideas + the big picture.",
      body:
        "A final check on the flank openings and on how to actually USE everything you've learned — building a repertoire and meeting the unexpected.\n\nAnswer from memory; then put it all to work in the Openings Trainer and your own games.",
      points: [
        "Flank openings fight for the centre from the side.",
        "A repertoire is something you understand, not just memorize.",
      ],
    },
    {
      type: "quiz",
      id: "ofl-english",
      title: "The English Opening",
      blurb: "1.c4.",
      question: "The English Opening (1.c4) typically leads to:",
      options: [
        "Flank pressure on the centre, often a 'reversed Sicilian' with colours swapped.",
        "A forced king-hunt against Black within the first ten moves.",
        "An immediate queen trade and a dead-drawn endgame.",
      ],
      correctIndex: 0,
      explanation:
        "1.c4 stakes a claim on d5 from the flank. After 1...e5 it's literally a Sicilian with an extra tempo and colours reversed — flexible, strategic play.",
    },
    {
      type: "quiz",
      id: "ofl-repertoire",
      title: "Building a repertoire",
      blurb: "Compact and understood.",
      question: "A practical opening repertoire for an improving player is:",
      options: [
        "A small, consistent set you understand deeply — one White opening plus answers to 1.e4 and 1.d4.",
        "Every opening in this course, all memorized twenty moves deep.",
        "Whatever you happen to feel like playing, decided fresh each game.",
      ],
      correctIndex: 0,
      explanation:
        "Keep it compact and know it well. Familiar positions free your thinking for plans instead of panic — and you'll recognize them even when the move order changes.",
    },
    {
      type: "quiz",
      id: "ofl-offbeat",
      title: "When they surprise you",
      blurb: "Out of theory.",
      question: "Your opponent plays a strange, non-theoretical move in the opening. You should:",
      options: [
        "Fall back on principles: develop, fight for the centre, get the king safe.",
        "Resign, since you're now out of your prepared lines.",
        "Immediately sacrifice a piece to punish them.",
      ],
      correctIndex: 0,
      explanation:
        "Offbeat moves are usually slightly inferior. Don't force a refutation — just play principled chess. Good development punishes a bad opening move on its own.",
    },
    {
      type: "concept",
      id: "openings-review-3-done",
      title: "Course complete — now drill it",
      blurb: "Understanding, then repetition.",
      body:
        "You've met the major openings, learned to read their plans, and seen the structures they reach. The last step is repetition: pick a compact repertoire and drill it in the Openings Trainer, which spaces out your reviews and resurfaces the lines you struggle with.\n\nThen play — every game is a chance to steer for a position you understand.",
      points: [
        "Choose a compact repertoire and drill it in the Openings Trainer.",
        "Understand the plan; let the moves follow.",
        "Play, and aim for structures you know.",
      ],
      practice: { tool: "play", label: "Play a game now" },
    },
  ],
};
