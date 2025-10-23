# Andre Glegg's Resume – Developer Instructions

## Environment
- Node.js 20+ (Vite + modern Three.js tooling expect ESM only). Use `nvm use 20` if you have it installed.
- Package manager: `npm` (lockfile committed).
- Recommended extensions: ESLint, Prettier, and Tailwind CSS IntelliSense (planned styling pass).

## Getting Started
- Install deps: `npm install`
- Start dev server: `npm run dev` (Vite on port 5173 by default)
- Run type checking/lint: `npm run lint`
- Build for production: `npm run build` (outputs to `dist/`)
- Preview production build: `npm run preview`

All commands will respect the local `.npm-cache/` directory if `npm_config_cache=./.npm-cache` is set in your shell. This avoids write issues with the global cache directory.

## Project Layout
- `src/`
  - `scene/`: raw Three.js world (renderer, world controller, GLSL shaders, island config)
  - `styles/`: global CSS baseline
- `public/`: static assets (GLB models, boat, audio, fonts)
- `docs/`: planning, credits, and future content docs

## Resume data ingestion
Resume layers are still pending. Content will live alongside the raw Three.js scene once the navigation overlay is ready.

## Git conventions
- Main branch keeps deployable code; use feature branches for new chunks of work.
- Commit format suggestion: `type(scope): summary` (e.g. `feat(scene): add ocean shader`).
- Open PRs with a short demo video/gif of new interactions when applicable.

## Next Steps
The detailed roadmap lives in `docs/project-plan.md`. Use the Three.js scene as a foundation for resume-specific overlays later.
