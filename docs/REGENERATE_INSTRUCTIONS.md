# CLAUDE.md — jimmyss.github.io

> **Claude Code: Read this file in full before making any changes.**
> This is the single source of truth for working on this repository.

---

## Project Overview

| Field | Value |
|---|---|
| **Type** | Personal blog / portfolio website |
| **Live URL** | `https://jimmyss.github.io` (custom domain via CNAME) |
| **Frontend** | Next.js 15 + TypeScript + Tailwind CSS |
| **Backend** | Node.js Express (`backend/` — weather API, etc.) |
| **Deploy** | GitHub Actions → static build → push to `gh-pages` branch |
| **Package manager** | npm only (do not use yarn or pnpm) |

---

## Repository Structure

```
jimmyss.github.io/
├── CLAUDE.md                        ← You are here
├── CNAME                            ← Custom domain config — DO NOT MODIFY
├── docker-compose.yml               ← Local dev environment
├── images/                          ← Global static assets (banners, icons)
│   ├── banner.jpg / banner-1.jpg / banner-2.jpg
│   ├── favicon.ico
│   └── *.svg
│
├── frontend/                        ← ⭐ Primary working directory
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.mjs
│   ├── public/                      ← Next.js static assets (served at /)
│   └── src/
│       └── app/                     ← App Router structure
│           ├── page.tsx             ← Homepage ⭐ (currently placeholder content)
│           ├── layout.tsx           ← Global layout (<html>, <head>, nav)
│           ├── globals.css          ← Global styles + Tailwind directives
│           └── favicon.ico
│
├── backend/                         ← Express API server
│   └── src/
│       ├── index.js                 ← Entry point
│       └── routes/
│           └── weather.js           ← Weather route
│
└── .github/
    └── workflows/
        └── deploy.yml               ← CI/CD pipeline — do not modify casually
```

---

## Tech Stack

### Frontend (all work inside `frontend/`)

- **Next.js 15 App Router** — pages live in `src/app/` as directory + `page.tsx`
- **TypeScript** — all new files must be `.tsx` / `.ts`, never `.js` / `.jsx`
- **Tailwind CSS** — use utility classes for all styling; avoid inline `style={{}}` except for dynamic values
- **next/image** — always use `<Image>` component, never `<img>` tags

### Path Alias

`tsconfig.json` maps `@/` to `src/`:

```tsx
import Nav from '@/app/components/Nav';        // ✅ correct
import Nav from '../../../app/components/Nav'; // ❌ avoid deep relative paths
```

### Running Commands

```bash
# All npm commands must be run inside frontend/
cd frontend

npm install        # install dependencies
npm run dev        # dev server → http://localhost:3000
npm run build      # production build
npm run lint       # lint check
npx tsc --noEmit   # type check
```

---

## Current Page Status

### `page.tsx` (Homepage) — placeholder content only

```
Heading:     "Welcome to My Blog"
Subheading:  "这里是我分享技术、生活和思考的地方"
Body:        "Recent Posts" section with one dummy card — no real data
```

This is the **highest priority file to update**.

### `layout.tsx` (Global Layout)

Contains `<html>`, `<head>`, and global fonts. Currently **no navigation bar** — add one here.

### `globals.css`

Contains the three Tailwind directives. Add any global custom styles here.

---

## Common Tasks

### Update homepage content

Edit `frontend/src/app/page.tsx` — replace the `<h1>` title and description paragraph.

### Add a global navigation bar

Create the component:

```tsx
// frontend/src/app/components/Nav.tsx
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-gray-900">Jimmy</Link>
        <div className="flex gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <Link href="/blog" className="hover:text-gray-900">Blog</Link>
          <Link href="/projects" className="hover:text-gray-900">Projects</Link>
          <Link href="/about" className="hover:text-gray-900">About</Link>
        </div>
      </div>
    </nav>
  );
}
```

Then import it in `layout.tsx`:

```tsx
import Nav from '@/app/components/Nav';
// ...
<body>
  <Nav />
  {children}
</body>
```

### Add a new page

Create a directory + `page.tsx` under `frontend/src/app/`:

```
src/app/about/page.tsx         → /about
src/app/projects/page.tsx      → /projects
src/app/blog/page.tsx          → /blog  (post listing)
src/app/blog/[slug]/page.tsx   → /blog/post-slug  (single post)
```

Base page template:

```tsx
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About</h1>
        {/* content */}
      </div>
    </main>
  );
}
```

### Add blog functionality (recommended: MDX local files)

**Step 1** — Install dependencies:
```bash
cd frontend && npm install @next/mdx @mdx-js/loader @mdx-js/react gray-matter
```

**Step 2** — Store posts in `frontend/src/content/posts/` as `.mdx` files:
```mdx
---
title: "Post Title"
date: "2026-03-07"
tags: ["Next.js", "engineering"]
excerpt: "One sentence summary."
---

Post body in Markdown...
```

**Step 3** — `blog/page.tsx` reads all post metadata and renders a card list.

**Step 4** — `blog/[slug]/page.tsx` renders a single post by slug.

### Use images from the root `images/` directory

The root `images/` folder is **not** inside Next.js's `public/` — it cannot be referenced directly. Copy files first:

```bash
cp images/banner.jpg frontend/public/images/banner.jpg
```

Then reference in a component:
```tsx
import Image from 'next/image';
<Image src="/images/banner.jpg" alt="Banner" width={1200} height={400} />
```

---

## TypeScript Conventions

- Define component props with `interface` (not `type`)
- Avoid `any` — use `unknown` if the type is genuinely uncertain
- Component filenames: PascalCase — `NavBar.tsx`
- Utility filenames: camelCase — `formatDate.ts`
- All components: function + `export default`

---

## Hard Rules — Never Violate

- ❌ Do not modify `CNAME` — breaks the custom domain binding
- ❌ Do not modify `.github/workflows/deploy.yml` unless the user explicitly requests it
- ❌ Do not write frontend code outside `frontend/`
- ❌ Do not use `<img>` tags — always use `next/image`'s `<Image>`
- ❌ Do not use `yarn` or `pnpm` — npm only
- ❌ Do not use deep relative paths `../../../` — use `@/` alias

---

## Suggested Improvements (Priority Order)

1. **Homepage** `page.tsx` — replace placeholder with real intro + project highlights
2. **Navigation bar** — add Nav component to `layout.tsx`
3. **About page** — `/about` with bio, education, work experience
4. **Projects page** — `/projects` showcasing GitHub repos
5. **Blog** — MDX-based post listing + single post pages
6. **Visual design** — current palette is default Tailwind gray; upgrade colors and typography

---

*CLAUDE.md — update this file whenever the project structure changes significantly.*