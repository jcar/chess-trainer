# Chess Trainer

A hands-on, iPad-first web app for learning chess. Work through modules of
lessons and activities — guided walkthroughs, interactive puzzles, and games
against a built-in engine — with progress saved right in your browser.

**Three modules, easiest first:**

- **Chess for Kids** — an absolute-beginner journey for young players (ages ~5–8):
  tap-to-move boards, "meet the piece" explorers, picture quizzes, read-aloud
  narration, sounds, stars, and a friendly guide named Pip.
- **Chess Fundamentals** — the beginner's path: how games are won, opening
  principles, the basic checkmates, draws, tactics, and strategy.
- **Intermediate Chess** — opening repertoires, gambits, endgame technique,
  sharper tactics, and positional ideas.

All lesson text and chess positions are original. Every puzzle is verified by a
chess engine (Stockfish) so the solutions are sound and unique.

## Tech

Next.js (App Router) + React + TypeScript + Tailwind. No backend — progress lives
in `localStorage`. The opponent/verifier is Stockfish (WebAssembly) running in a
Web Worker. Ships as a fully static site.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
# reach it from an iPad on your network:
npm run dev -- -H 0.0.0.0   # then open http://<your-computer-ip>:3000
```

Other commands:

```bash
npm run build        # production build (static export to ./out)
npm run lint         # ESLint
npm run validate     # engine-verify every puzzle (drives Stockfish)
```

## Deployment

Pushed to `main`, the app builds and deploys to GitHub Pages automatically via
GitHub Actions (`.github/workflows/deploy.yml`). The site is served from a repo
subpath; the base path is supplied to the build through `NEXT_PUBLIC_BASE_PATH`
and is empty for local development.

## License

Code is provided as-is for personal and educational use.
