# andreglegg.no

The source for André Glegg's personal software-engineering portfolio at https://andreglegg.no.

The site is a static React + TypeScript application built with Vite and deployed to GitHub Pages from `master`.

## Local development

```sh
npm ci
npm run dev
```

## Verification

```sh
npm run check
```

`npm run check` runs TypeScript validation, the Vitest portfolio tests, refreshes the latest Medium writing data, and builds the production site.

## Deployment

Pushes to `master` trigger `.github/workflows/pages.yml`, which runs `npm ci`, tests, builds the site into `build/`, restores the custom-domain `CNAME`, and deploys the artifact through GitHub Pages.
