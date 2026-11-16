# Japan Tours Website

Single-page marketing site for a 10-day premium Japan travel experience across Osaka, Kyoto and Tokyo, built with Next.js 14 and Tailwind CSS.

## Overview

The landing page (`src/app/page.tsx`) is composed of:

- `Navigation` – top navigation bar
- `HeroSection` – hero with imagery
- `AboutSection` – about the tour, image gallery
- `IncludedSection` – what the tour includes
- `ContactSection` – enquiry form (client-side only; submission currently just logs to the console)
- `Footer`

Plus `SmoothScroll` (Lenis smooth scrolling) and `CustomCursor`, with Framer Motion animations. Images are loaded remotely from Unsplash (whitelisted in `next.config.mjs`).

## Tech Stack

Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Lenis (`@studio-freight/lenis`), lucide-react.

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

No environment variables are required.

## Status

Front-end only; no backend or booking integration in the code.
