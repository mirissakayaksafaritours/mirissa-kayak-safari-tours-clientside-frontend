# Mirissa Kayak Safari Tours — Clientside Frontend

Modern, content-driven website for Mirissa Kayak Safari Tours, built with Next.js (App Router) and Tailwind CSS. The app renders the marketing pages (home, tours, gallery, about, reviews, contact) and pulls dynamic content from a backend API.

## What The Project Does

This repository contains the clientside frontend for Mirissa Kayak Safari Tours. It provides:
- A high-performance marketing site with server-rendered pages.
- Data-driven sections for tours, reviews, guides, FAQs, and gallery content.
- A clean, reusable component library for consistent UI.

## Why It’s Useful

- Fast iteration on marketing and content pages without touching the backend.
- Centralized API integration with typed service modules.
- Scalable layout and component structure for new pages or sections.
- Production-ready Next.js setup with linting and TypeScript.

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm (or a compatible package manager)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### Run The App

```bash
npm run dev
```

Then open `http://localhost:3000`.

### Build For Production

```bash
npm run build
npm run start
```

## Usage Examples

Fetch data from the backend API using the typed service layer:

```ts
import { getFeaturedTours } from "@/services/tours.service";

const featuredTours = await getFeaturedTours();
```

Render marketing sections in a page:

```tsx
import Hero from "@/components/hero";
import FeaturedTours from "@/components/featured-tours";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedTours />
    </>
  );
}
```

## Project Structure

- `src/app` — App Router pages and route segments
- `src/components` — UI and page components
- `src/services` — API service modules (tours, gallery, reviews, etc.)
- `src/lib` — shared utilities and configuration
- `public` — static assets (images, icons, manifest)

## Scripts

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — run ESLint

## Help And Support

If you run into issues:
- Check your `.env.local` for a valid `NEXT_PUBLIC_API_BASE_URL`.
- Confirm the backend API is running and reachable from your machine.
- Open a GitHub Issue describing the problem and reproduction steps.

## Maintainers And Contributions

Maintained by the Mirissa Kayak Safari Tours team and contributors.

Contributions are welcome. Open an issue or pull request with a clear description of the change.
