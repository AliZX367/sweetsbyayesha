# Sweets by Ayesha — Claude Code Instructions

Loaded automatically by Claude Code at the start of every session.

---

## Project Overview

**Sweets by Ayesha** is a marketing and order-inquiry website for a halal-certified
home bakery near Schaumburg, IL. Products include cake pops, rice krispie treats,
and custom baked goods.

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4
- **No backend**: Static site — order form logs to console (email integration later)
- **Social**: @thesweetsbyayesha on TikTok and Instagram

---

## Absolute Rules

1. **Never use `any` type** — use `unknown` + narrowing, or proper interfaces
2. **Never use bare `<img>`** — use `next/image` with width, height, and alt
3. **Never use bare `<a href="/...">` for internal links** — use `next/link`
4. **Never create CSS files** — use Tailwind exclusively
5. **Never add `'use client'` to `page.tsx`** unless absolutely required
6. **Always use semantic HTML** — `<main>`, `<section>`, `<nav>`, `<header>`, `<footer>`
7. **Always add `aria-label`** to icon-only interactive elements
8. **Always use the Metadata API** for SEO — never manual `<head>` tags
9. **Never hardcode hex values** in Tailwind classes — use CSS variable tokens
10. **Always work on feature branches** — never commit directly to `main`

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#FBF7F0` | Page background |
| `--surface` | `#F2E8D9` | Cards, secondary sections |
| `--primary` | `#C4722A` | CTA buttons (caramel) |
| `--secondary` | `#8B4A62` | Secondary buttons (berry) |
| `--accent` | `#D4A853` | Badges, highlights (gold) |
| `--text` | `#2C1810` | All body text |

Fonts: **Fraunces** (`font-serif`) for headings, **DM Sans** (`font-sans`) for body.
Both are loaded via `next/font` in `app/layout.tsx` — do not re-import elsewhere.

---

## Directory Map

```
app/
├── layout.tsx              # Root layout — Navbar + Footer + font vars
├── page.tsx                # Home page (server component)
├── menu/page.tsx           # Our Treats page
├── about/page.tsx          # About Ayesha page
├── order/page.tsx          # Order inquiry page
├── order/ui/OrderForm.tsx  # 'use client' controlled form
├── globals.css             # CSS vars + Tailwind v4 import
├── sitemap.ts              # Auto-generated sitemap
├── robots.ts               # Crawler rules
└── opengraph-image.tsx     # Dynamic OG image (ImageResponse)

app/components/
├── Navbar.tsx              # 'use client' — sticky, mobile hamburger
├── Footer.tsx              # Server component — links + social + badge
├── HeroSection.tsx         # Server component — full-bleed image hero
└── TreatCard.tsx           # Server component — menu item card

public/
└── placeholder.jpg         # Temp image — replace with real food photos
```

---

## Social Links (real — do not change to placeholders)

```
TikTok:    https://www.tiktok.com/@thesweetsbyayesha
Instagram: https://www.instagram.com/thesweetsbyayesha
```

---

## SEO Metadata Pattern

Every `page.tsx` must export metadata. Use this shape:

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Name',  // layout template adds " | Sweets by Ayesha | Halal Home Bakery Schaumburg IL"
  description: '150-160 char description targeting local search.',
  openGraph: {
    title: 'Full Title | Sweets by Ayesha',
    description: 'OG description',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Full Title | Sweets by Ayesha',
    description: 'Twitter description',
  },
}
```

---

## Git Conventions

Format: `<type>(<scope>): <subject>`
Co-author: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`

Types: `feat` | `fix` | `refactor` | `style` | `perf` | `a11y` | `seo` | `chore`

---

## Before Committing

- [ ] `npm run build` passes with zero TypeScript errors
- [ ] Responsive tested at 375px, 768px, 1280px
- [ ] No `any` types introduced
- [ ] New images use `next/image` with alt text
- [ ] New interactive elements have `aria-label` if icon-only
- [ ] Working on a feature branch (not `main`)
