## The portfolio of André Glegg

This repository contains the in-progress rebuild of [andreglegg.no](https://www.andreglegg.no) using Vite, React, and TypeScript. The focus is on fast iteration, accessible UI, and content that reflects the breadth of André's work.

### Getting started

```bash
npm install
npm run dev
```

The dev server opens automatically at [http://localhost:5173](http://localhost:5173).

### Available scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check and create a production build
- `npm run preview` — preview the production build locally

### Project structure

- `src/` — application source, organised by features (`App.tsx`, data, styles)
- `public/` — static assets served as-is
- `data/andre-glegg-resume.pdf` — the latest résumé; all other files in `data/` stay local

### Next steps

- Flesh out projects and experience with real-world content
- Add automated accessibility and visual regression checks
- Deploy with CI/CD (Firebase Hosting, Vercel, or similar)
