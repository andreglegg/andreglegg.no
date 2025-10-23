# Andre Glegg's Resume

Interactive resume playground built with Vite, React, and a custom Three.js renderer. The explorable archipelago still borrows the stylized world from [thaslle/stylized-water](https://github.com/thaslle/stylized-water) (MIT), but the scene is now driven directly with raw Three.js for finer control over navigation and animation layers.

## Development
- `npm install`
- `npm run dev`
- `npm run build`

See `INSTRUCTIONS.md` for environment details and `docs/project-plan.md` for the full roadmap.

## Tech Stack
- Vite + React 18 + TypeScript
- Raw Three.js scene management (GLTFLoader, OrbitControls) orchestrated from React
- Custom GLSL shaders (water, terrain, rocks) via `three-custom-shader-material`

## Status
Stylized water world integrated with no UI overlays—ideal starting point for the resume content layer, navigation, and hotspots.
