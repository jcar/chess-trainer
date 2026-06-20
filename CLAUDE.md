# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A web app (iPad-first) for learning chess through hands-on practice. Content is organized into **modules** (a self-contained curriculum); a module has **lessons**, and each lesson has ordered **activities**. Activities are driven by one shared board and span several types (quiz, guided replay, puzzle, engine drill, plus kid-mode interactive types — see the `Activity` union). All lesson prose and chess positions are original; every puzzle is engine-verified.

Stack: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4. No backend — progress lives in the browser (`localStorage`). Deployed as a fully static export to GitHub Pages (see "Deployment").

## Commands

- `npm run dev` — dev server. Use `npm run dev -- -H 0.0.0.0` to reach it from an iPad on the LAN (`http://<computer-ip>:3000`).
- `npm run build` — production build (also runs `tsc`).
- `npm run lint` — ESLint.
- `npm run validate` — **content validator** (`scripts/validate-content.ts` via `tsx`). Drives Stockfish to engine-verify every puzzle. Run after editing any module content. Takes ~20s for the current content. See "Content gotchas" below.
- `npx tsc --noEmit` — type-check only.

There is no unit/e2e test suite checked in. Browser behavior was verified ad hoc with Playwright; `npm run validate` is the durable guard for content correctness. `scripts/probe.mjs "<fen>" [depth]` is an authoring aid that prints the engine's top PV lines for a position (handy for reading off a sound puzzle solution line).

## Architecture

Content flows one direction: **content data → generic players → progress store.** Adding a module touches only the content layer.

- `src/content/` — the curriculum as typed data.
  - `types.ts` — `Module → Lesson → Activity`. `Activity` is a **discriminated union on `type`** (`puzzle | drill | quiz | replay | movemap | pictureQuiz | target | sort | coordinate | practiceSet`). Add a new activity kind here, then a matching player in `components/activities/`, then wire it in `ActivityPlayer` (and add entries to the `TYPE_*` records in the module page, which are keyed by every activity type — TS enforces this).
    - `target` (move/collect to ⭐, geometric), `sort` (tap a label about a diagram), `coordinate` (tap a named square), `practiceSet` (many mini-puzzles, mastered at `requiredCorrect` — engine-verifies each item). `PuzzleGoal` also has `check` (move gives check) and `escape` (move out of check), validated by chess.js rules (no engine). `DrillActivity` `objective: "promote"` wins on promotion (pawn race / capstone).
    - `movemap` ("Meet the Piece") and `pictureQuiz` are **display-only** (kid mode): their FENs are single-piece / diagram boards that are NOT legal positions, so the validator skips chess.js legality for them. Move generation for these comes from `src/lib/chess/moves.ts` (geometric, no chess.js — chess.js rejects kingless FENs). react-chessboard *renders* kingless FENs fine; only chess.js rejects them.
  - `index.ts` — the `MODULES` registry plus lookup helpers (`getModule`, `findActivity`, `getNextActivity`). **To add a module: create `modules/<id>.ts` (or a `modules/<id>/` folder), export a `Module`, import it here, append to `MODULES`.** Nothing else changes.
  - `modules/chess-for-kids/` — "Chess for Kids" (absolute beginner, `kidMode`): `index.ts` assembles `l1.ts … l10.ts`. Kid-friendly prose guided by "Pip the pawn" (an original character). Listed FIRST in the registry (easiest first).
  - `modules/fundamentals/` — "Chess Fundamentals" (Beginner): `index.ts` assembles `ch1.ts … ch8.ts`.
  - `modules/intermediate/` — "Intermediate Chess" (Intermediate): same pattern, `ch9.ts … ch15.ts`. All prose original; opening lines are standard theory; every puzzle engine-verified.
- `src/lib/chess/` — chess engine layer; UI never imports `chess.js`/Stockfish directly.
  - `game.ts` — `ChessGame` wraps `chess.js` (move validation, status, FEN). `chess.js` `.move()` **throws** on illegal moves; `tryMove()` converts that to `{ ok: false }`. UCI ↔ move helpers and `buildReplayFens` live here.
  - `stockfish.ts` — `getEngine()` returns a singleton UCI client backed by a Web Worker loading the **single-threaded** build at `public/stockfish/stockfish-18-lite-single.{js,wasm}`. Single-threaded is deliberate: no SharedArrayBuffer, so no cross-origin-isolation headers needed. Browser-only.
- `src/lib/audio/` — kid-mode audio, browser-only, no asset files.
  - `speech.ts` — `speak(text)` read-aloud via the Web Speech API (used by `SpeakButton`; must be triggered from a tap on iOS).
  - `sounds.ts` — `playSound(name)` synthesizes effects (move/capture/select/success/tryAgain/step) with the Web Audio API; the AudioContext unlocks on the first tap.
- `src/lib/progress/` — completion persistence.
  - `store.ts` — `LocalProgressStore` is a **subscribable external store** (`subscribe`/`getSnapshot`/`getServerSnapshot`) over `localStorage`. `getServerSnapshot` returns a frozen empty object so SSR and first client render match.
  - `useProgress.tsx` — `ProgressProvider` + `useProgress()` hook, built on `useSyncExternalStore`. **Don't read `localStorage` during render elsewhere** — it causes hydration mismatches; go through this hook.
- `src/components/`
  - `board/Board.tsx` — wraps `react-chessboard` **v5** (single `options` prop; `onPieceDrop` returns a boolean and receives `{ sourceSquare, targetSquare }`).
  - `activities/{Quiz,Replay,Puzzle,Drill}Player.tsx` — one per activity type. Each takes its activity + an `onComplete(score)` callback.
  - `ActivityPlayer.tsx` — dispatches by `activity.type`, records completion via `useProgress`, renders the next/finish footer.
- `src/app/` — routes: `/` (module list), `/modules/[moduleId]`, `/modules/[moduleId]/[activityId]`. The dynamic pages are client components using `useParams()` so they can read progress.

## Kid mode (ages ~5–8)

A module with `kidMode: true` (currently `chess-for-kids`) renders a bigger,
brighter, more accessible experience. It's a presentation flag threaded from the
module → pages/players; no separate components or routes.

- The board (`board/Board.tsx`) supports **tap-to-move**: pass `getLegalMoves`
  (use `new ChessGame(fen).legalDestinations(square)`) + `onMove`, and it lights
  up legal squares as dots, captures as rings, and the selection in yellow. Drag
  still works. `highlightSquares` drives the puzzle "Show me!" hint. Non-kid
  modules pass neither, so behavior is unchanged (drag-only).
- Each player takes `kidMode?: boolean` (passed by `ActivityPlayer` from
  `module.kidMode`): bigger styling, a `SpeakButton` (`components/kids/`) that
  reads the question/prompt/note aloud, and sound effects on moves/answers/wins.
- The board selection is derived from the current FEN (stored as
  `{square, fen}`), NOT cleared in a `useEffect` — the ESLint rule
  `react-hooks/set-state-in-effect` forbids clearing state in an effect. Follow
  the same derive-don't-clear pattern if you touch it.
- **Visual learning aids (for non-readers):** `Board` also takes `arrows`
  (from→to, rendered by react-chessboard) and `dangerSquares` (flash a king in
  check via the `kidDanger` keyframe in `globals.css`). Used by: move-maps
  (movement arrows), replays (an arrow for the move just played), the puzzle
  "Show me!" hint (an arrow), and a red flash on any king in check (puzzles +
  drills). `kingInCheckSquare(fen)` / `replayMoveSquares(...)` live in
  `lib/chess/game.ts`. `components/board/MiniBoard.tsx` is the small, tappable,
  non-interactive board used for `pictureQuiz` answer options.
- **Reward layer (kidMode):** `ActivityPlayer` wraps completion with confetti
  (`components/kids/Confetti.tsx` — pure render keyed by a counter; do NOT spawn
  pieces in an effect, the lint rule forbids it), a visible Pip mascot
  (`components/kids/PipMascot.tsx`), a session streak (`lib/rewards/streak.ts`),
  and `fanfare`/`star` sounds. Stars/trophies derive from score+attempts via
  `selectStars`/`selectTotalStars`/`selectAllComplete` (exposed on `useProgress`).
  The kid module page renders a star/trophy "journey" + a link to
  `modules/[moduleId]/stickers`. All gated on `kidMode`.

## Content gotchas (read before authoring positions)

- **Illegal FENs.** A position where the side *not* to move is in check is illegal — `chess.js` may accept it, but Stockfish rejects it and returns `bestmove (none)`, silently breaking drills. `npm run validate` checks every FEN for this. (This is a real, recurring trap when hand-building positions — usually an attacker placed on the enemy king's file/rank/diagonal.)
- **Every puzzle should have a `goal`** (`{type:"mate",inMoves}` | `{type:"win-material",minGain}` | `{type:"stalemate"}` | `{type:"perpetual"}`). The validator then drives Stockfish to confirm the goal is actually forced AND that the intended first move is *uniquely* best (no second move mates equally fast / wins comparable material). A puzzle without `goal` only gets legality checks and a warning. **Author positions, then let `validate` accept/reject them** — don't trust a hand-constructed puzzle until the engine signs off.
- Mate puzzles: solution length is `2*inMoves - 1` (learner, defender-reply, …, learner-mate). The engine soundness chain (each learner move must show `mate == remaining`) makes the whole forced line self-verifying.
- Queen mates are usually NOT unique (many equivalent mating squares) — prefer rook/king mates or forcing tactics for unique-solution puzzles. `scripts/probe.mjs` shows whether a position has one or several top moves.
- Puzzle `solution` is UCI (`"e2e4"`, `"e7e8q"`); odd-indexed moves are the opponent's auto-played replies.
- Replay steps are SAN; `buildReplayFens` precomputes the position at each step. Watch move parity — an `O-O` on the wrong ply tries to castle with the wrong color.
- Drills with `objective: "checkmate"` only count as a win when the *learner* delivers mate; the player also detects stalemate and reports it as a draw. The validator confirms each drill is actually winnable for the side to move.

## Deployment

Static export to GitHub Pages via `.github/workflows/deploy.yml` (build → upload `out/` → deploy) on push to `main`.

- `next.config.ts` sets `output: "export"`, `trailingSlash: true`, `images.unoptimized`, and a `basePath`/`assetPrefix` read from `NEXT_PUBLIC_BASE_PATH`. That env is **empty locally** (so `npm run dev` and a plain `npm run build` stay at the root) and set to the repo subpath (e.g. `/chess-trainer`) by the deploy workflow.
- Next auto-prefixes `<Link>`, fonts, and statically-imported assets with the base path, but **NOT hand-built absolute URL strings**. For those use `withBasePath()` from `src/lib/basePath.ts` (already applied to the Stockfish worker URL in `lib/chess/stockfish.ts` and the manifest/icon in `app/layout.tsx`). `public/manifest.webmanifest` uses relative (`./`) paths so it resolves under any base path.
- Dynamic routes are statically exported: each `app/modules/[…]/page.tsx` is a **server** component exporting `generateStaticParams()` (enumerating ids from `MODULES`) that renders a `"use client"` view component. Don't convert these pages back to client components — `generateStaticParams` requires a server component and `output: export` requires it for every dynamic route.
- `public/.nojekyll` keeps GitHub Pages from stripping `_next/`.

## Conventions

- Don't name a variable `module` — Next.js forbids reassigning it (`@next/next/no-assign-module-variable`). Use `mod`.
- `public/` is excluded from ESLint (it holds the vendored, minified Stockfish build).
