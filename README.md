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

## Cheat Sheet Rapida (RO)

Ghid scurt ca sa stii exact unde modifici fiecare parte din site.

### 1) Meniu (navbar)

- Fisier: `src/components/Navbar.tsx`
- Ce poti face aici:
	- adaugi/scoti link-uri
	- schimbi ordinea paginilor
	- schimbi numele din meniu

### 2) Pagini principale

Regula: `src/app/X/page.tsx` = ruta `"/X"`.

- `src/app/page.tsx` -> `"/"` (Acasa)
- `src/app/visualizer/page.tsx` -> `"/visualizer"`
- `src/app/contact/page.tsx` -> `"/contact"`
- `src/app/atestate/page.tsx` -> `"/atestate"`

### 3) Text global si SEO

- Fisier: `src/app/layout.tsx`
- Aici schimbi:
	- `metadata.title`
	- `metadata.description`
	- limba paginii (`<html lang="ro">`)

### 4) Stiluri

- Stil global Next.js: `src/app/globals.css`
- Stiluri pentru atestate statice:
	- exemplu: `public/atestate/atestat_buga/style.css`

### 5) Vizualizator + cod C++

- Sortare + cod C++ dinamic: `src/components/SortingVisualizer.tsx`
- Cautare binara: `src/components/SearchVisualizer.tsx`

In `SortingVisualizer.tsx`:
- `ALGORITHM_INFO` = nume + complexitate
- `ALGORITHM_CPP_CODE` = codul C++ afisat pentru fiecare algoritm

### 6) Formular feedback (Formspree)

- Fisier: `src/app/contact/page.tsx`
- Foloseste `@formspree/react` cu formularul `mwvrpzdv`

### 7) Cum testezi rapid schimbarile

```bash
npm run dev
```

Deschide `http://localhost:3000`.

### 8) Verificare finala inainte de deploy

```bash
npm run build
```

Daca build-ul trece, site-ul este gata pentru export static/deploy.
