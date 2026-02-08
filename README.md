# Mirissa Kayak Safari Tours Admin Frontend

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-149eca)
![License](https://img.shields.io/badge/license-not%20specified-lightgrey)

A Next.js admin dashboard for managing Mirissa Kayak Safari Tours website content through authenticated CRUD workflows.

## Table of Contents

- [What This Project Does](#what-this-project-does)
- [Why This Project Is Useful](#why-this-project-is-useful)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How to Get Started](#how-to-get-started)
- [Usage Examples](#usage-examples)
- [Available Scripts](#available-scripts)
- [Where to Get Help](#where-to-get-help)
- [Who Maintains and Contributes](#who-maintains-and-contributes)
- [License](#license)

## What This Project Does

This app provides an authenticated admin panel to manage key public-site content:

- Dashboard stats and recent activity: [`src/app/admin/page.tsx`](src/app/admin/page.tsx)
- Tour packages: [`src/app/admin/tours/page.tsx`](src/app/admin/tours/page.tsx)
- Tour guides: [`src/app/admin/guides/page.tsx`](src/app/admin/guides/page.tsx)
- Reviews/testimonials: [`src/app/admin/reviews/page.tsx`](src/app/admin/reviews/page.tsx)
- FAQ content: [`src/app/admin/faq/page.tsx`](src/app/admin/faq/page.tsx)
- Gallery categories and images: [`src/app/admin/gallery/categories/page.tsx`](src/app/admin/gallery/categories/page.tsx), [`src/app/admin/gallery/images/page.tsx`](src/app/admin/gallery/images/page.tsx)
- Site contact/social settings: [`src/app/admin/settings/page.tsx`](src/app/admin/settings/page.tsx)

Authentication is token-based (`admin_token` in local storage) with route guarding in [`src/app/admin/AdminGuard.tsx`](src/app/admin/AdminGuard.tsx).

## Why This Project Is Useful

- Centralized content operations for non-technical admins.
- Consistent API abstraction through service modules in [`src/services`](src/services).
- Faster media workflows with presigned S3 upload support in [`src/components/admin/image-uploader.tsx`](src/components/admin/image-uploader.tsx).
- Reusable admin UI patterns (tables, dialogs, confirmation prompts, toasts).
- Strong TypeScript-first structure for safer frontend changes.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Axios for API communication
- Radix UI primitives + custom UI components

## Project Structure

```text
src/
  app/
    page.tsx                  # login page
    admin/
      layout.tsx              # guarded admin shell
      page.tsx                # dashboard
      tours/                  # tour package management
      guides/                 # guide management
      reviews/                # review management
      faq/                    # FAQ management
      gallery/
        categories/           # gallery category management
        images/               # gallery image management
      settings/               # site settings
  components/
    admin/                    # admin-specific UI blocks
    ui/                       # reusable UI primitives
  lib/
    api.ts                    # Axios client and auth header injection
  services/                   # feature service layers per domain
```

## How to Get Started

### Prerequisites

- Node.js 20+
- npm 10+
- Running backend API that exposes the admin endpoints used in [`src/services`](src/services)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create or update `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### 3. Run the app

```bash
npm run dev
```

Open `http://localhost:3000` and log in with an admin account.

### 4. Production build

```bash
npm run build
npm run start
```

## Usage Examples

### Admin login flow

- The login screen is served from [`src/app/page.tsx`](src/app/page.tsx).
- On success, token and admin profile are stored in local storage.
- Protected routes are wrapped by [`src/app/admin/AdminGuard.tsx`](src/app/admin/AdminGuard.tsx).

### Service-layer usage (for new modules)

```ts
import { getTourPackagesAdmin } from "@/services/tourPackages.service";

const tours = await getTourPackagesAdmin();
console.log(tours.length);
```

### API client behavior

[`src/lib/api.ts`](src/lib/api.ts) automatically:

- Uses `NEXT_PUBLIC_API_BASE_URL` as `baseURL`.
- Injects `Authorization: Bearer <admin_token>` when present.

## Available Scripts

- `npm run dev`: start development server
- `npm run build`: create production build
- `npm run start`: run production server
- `npm run lint`: run ESLint checks

## Where to Get Help

- Open repository issues: <https://github.com/dinukaprab/mirissa-kayak-safari-tours-adminside-frontend/issues>
- Next.js docs: <https://nextjs.org/docs>
- React docs: <https://react.dev>

If you are extending data models or endpoints, review and align changes in the service layer under [`src/services`](src/services) first.

## Who Maintains and Contributes

### Maintainer

- GitHub: [@dinukaprab](https://github.com/dinukaprab)

### Contributing

There is currently no dedicated `CONTRIBUTING.md`. Until one is added, use this lightweight process:

1. Create a branch from `main`.
2. Make focused changes with clear commit messages.
3. Run `npm run lint` before opening a PR.
4. Open a pull request describing scope, UI impact, and API impact.

## License

No `LICENSE` file is currently present in this repository. Add one before redistributing.
