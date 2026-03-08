# AlgoVerse - Interactive Algorithm Learning

Interactive educational web app built with Next.js and React for learning algorithms through explanation cards and animated visualizations.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
```

This project is configured with `output: "export"`, so `next build` generates a static site in the `out/` directory.

## Cloudflare Pages Deployment

This repository is ready for Cloudflare Pages static hosting.

### Option 1: Git Integration (Recommended)

1. Push this repository to GitHub.
2. In Cloudflare Dashboard, create a new Pages project and connect the repository.
3. Use these build settings:
	- Build command: `npm run build`
	- Build output directory: `out`
4. Deploy.

### Option 2: CLI Deploy

```bash
npm install
npm run build
npm run deploy:cloudflare
```

You will be prompted by Wrangler to authenticate and select/create a Pages project.
