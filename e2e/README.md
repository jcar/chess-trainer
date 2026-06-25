# End-to-end acceptance tests (Playwright)

Automated UAT for the **Chess for Kids** module. These tests exercise real
behavior — routes load, activities can be played to completion, navigation
chains, scenes speak, the quest map blooms — as a durable backstop for the manual
chapter-by-chapter testing.

## Run

```bash
npm run test:e2e        # headless, all specs
npm run test:e2e:ui     # interactive UI mode (great for debugging)
npm run test:e2e:headed # watch it drive a real browser
```

The Playwright `webServer` **builds the static export and serves it on
`:4321`** (see `playwright.config.ts`). This is intentional:

- It sidesteps Next 16's one-dev-server-per-project lock, so the suite never
  fights a running `npm run dev`.
- It tests the **real shipped artifact**, identically here and in CI.

The build must use an **empty `basePath`** (the default locally — don't set
`NEXT_PUBLIC_BASE_PATH`) so routes live at the root. The first run builds (~1–2
min); a server left running from a prior local run is reused.

## How the tests stay correct without guessing

- They **import the actual module content** (`src/content/modules/chess-for-kids`)
  and the app's own `seededOrder` (`src/lib/shuffle`). So the test always knows
  the correct answer/order for every quiz, sort, picture-quiz, and concept check —
  and new activities are picked up automatically.
- **Board moves**: react-chessboard v5 exposes no per-square DOM nodes, so
  `helpers/board.ts` clicks computed pixel offsets inside the `[data-chessboard]`
  element (orientation-aware). `playLine` taps a puzzle's UCI solution; the
  opponent replies auto-play from the fixed solution.
- **One stable hook**: `data-testid="advance"` marks the forward control (whose
  label varies: Next / All done! / Finish / a scene's CTA). Picture-quiz options
  (no text) carry `data-testid="picture-option"`. Everything else is selected by
  stable answer text or ARIA role.

## What's covered

- `smoke.spec.ts` — every kids activity loads, renders, and throws no runtime
  error (data-driven over the whole module).
- `land1.spec.ts` — a full end-to-end journey through Square Kingdom Lesson 1
  (scenes + each activity type), asserting completion is persisted.
- `questmap.spec.ts` — seeds progress and asserts the living map blooms the land,
  awards the belt, and advances the trickster marker.

## Scope & limits

- **Behavior, not chess truth.** e2e checks the app *works*; whether a position is
  chess-correct is covered by `npm run validate` (engine) and manual review. A
  "well-formed but wrong" puzzle is a `validate`/UAT concern, not an e2e failure.
- **Engine activities** (`drill`, play-vs-Pip) are non-deterministic (Stockfish),
  so they get load-only smoke coverage and are skipped by the auto-solver.
- `target` multi-hop completion and other modules are future work.

## CI

`.github/workflows/e2e.yml` runs the suite on push/PR and uploads the HTML report
artifact. It is **non-blocking** — it reports status but does not gate the Deploy
workflow.
