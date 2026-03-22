# Commit & Eat - Claude Code Guidelines

## Project Overview

Restaurant web application where customers browse menu, add items to cart, view real-time table availability, make reservations, and contact the restaurant.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript 5
- **Styling:** Tailwind CSS v4 + shadcn/ui (base-nova style) + Lucide icons
- **Database:** PostgreSQL via Supabase
- **ORM:** Prisma 7 with `@prisma/adapter-pg`
- **Real-time:** Supabase Client (`@supabase/supabase-js`)
- **Deployment:** Vercel

## Team

| Name | Role | Work Area |
|------|------|-----------|
| Nasraddin | Frontend Developer | `src/components/`, `src/app/(main)/`, `src/hooks/` |
| Ugur | Frontend Developer | `src/components/`, `src/app/(main)/`, `src/hooks/` |
| Nihat | Backend Developer | `src/app/api/`, `src/services/`, `src/lib/`, `prisma/` |
| Fironi | Backend Developer (Lead) | `src/app/api/`, `src/services/`, `src/lib/`, `prisma/` |

## Key Commands

```bash
npm run dev                              # Dev server (localhost:3000)
npm run build                            # Production build
npm run lint                             # ESLint
npx prisma generate                      # Regenerate Prisma client after schema changes
npx prisma migrate dev --name <name>     # Create new migration
npx shadcn@latest add <component>        # Add shadcn component
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (Geist Sans/Mono fonts)
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles + theme variables
│   ├── (main)/             # Route group
│   │   ├── menu/           # Menu page (category filter + cart)
│   │   ├── gallery/        # Gallery page (tab filter: All/Food/Interior)
│   │   ├── reservation/    # Reservation page (3-step multi-step form)
│   │   └── contact/        # Contact page (info cards + message form + map)
│   └── api/                # API routes
│       ├── menu/
│       ├── tables/
│       ├── reservations/
│       └── contact/
├── components/
│   ├── ui/                 # shadcn/ui components (Button, etc.)
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Landing page sections (Hero, About, ChefSpecialties)
│   ├── menu/               # Menu components (MenuCard, CategoryFilter)
│   ├── cart/               # Cart components (CartSidebar, CartItem)
│   ├── reservation/        # Reservation components (multi-step form)
│   ├── gallery/            # Gallery components (GalleryGrid, tab filter)
│   └── contact/            # Contact components (ContactForm, InfoCards)
├── hooks/                  # Custom React hooks
├── services/               # API service functions
├── constants/              # Constants (navigation, restaurant name)
├── types/                  # TypeScript interfaces
├── lib/
│   ├── prisma.ts           # Prisma client singleton
│   ├── supabase.ts         # Supabase client
│   └── utils.ts            # cn() utility
└── generated/              # Auto-generated Prisma types (DO NOT EDIT)
```

## Coding Conventions

### General
- Use TypeScript strict mode — no `any` types
- Path alias: `@/*` maps to `./src/*`
- Use `cn()` from `@/lib/utils` for conditional class merging
- Components use `"use client"` directive only when client-side interactivity is needed
- Prefer Server Components by default (Next.js App Router convention)

### Frontend
- Use shadcn/ui components (`npx shadcn@latest add <name>`) — don't build from scratch
- Icons: `lucide-react` only
- Styling: Tailwind CSS utility classes, no inline styles or CSS modules
- Component files: PascalCase (e.g., `MenuCard.tsx`)
- Use CVA (`class-variance-authority`) for component variants
- Responsive design: mobile-first approach
- Theme colors via CSS variables defined in `globals.css` (oklch color space)

### Design System (from Figma)
- **Primary color:** Red (#DC2626 / similar) — CTA buttons, active tabs, accents
- **Dark hero sections:** Dark overlay backgrounds with white text on all inner pages
- **Navbar:** Logo (X icon + "Commit & Eat") left, nav links center, search + cart icons right
- **Navigation:** Home, Menu, Gallery, Reservation, Contact — active link in red
- **Buttons:** Red filled (primary CTA), white outline (secondary CTA)
- **Cards:** White background, rounded corners, subtle shadow
- **Footer:** Dark background, 3 columns (brand + socials, quick links, contact info)

### Backend
- API routes in `src/app/api/` following Next.js Route Handlers pattern
- Use Prisma client from `@/lib/prisma` (singleton pattern)
- Use Supabase client from `@/lib/supabase` for real-time features
- Service functions in `src/services/` — keep API routes thin
- All database types auto-generated in `src/generated/prisma/` — run `npx prisma generate` after schema changes
- Validate request data at API boundaries
- Return consistent JSON responses: `{ data, error, message }`
- Cart state managed client-side (Context/Zustand) — no backend cart persistence needed

### Database
- Schema file: `prisma/schema.prisma`
- Table names: snake_case (`menu_items`, `reservations`)
- Model names: PascalCase (`MenuItem`, `Reservation`)
- IDs: CUID (`@default(cuid())`)
- Always include `createdAt` and `updatedAt` timestamps

## Git Workflow

- Main branch: `main`
- Feature branches: `feature/<feature-name>`
- Commit messages: conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`)
- Pull request required before merging to `main`
- Never commit `.env` files — use `.env.example` as template

## Environment Variables

Required (see `.env.example`):
- `DATABASE_URL` — Supabase PostgreSQL connection (pgbouncer)
- `DIRECT_URL` — Direct PostgreSQL connection (migrations)
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key

## Important Notes

- `src/generated/prisma/` is auto-generated — NEVER edit manually
- After any `prisma/schema.prisma` change: run `npx prisma generate` then `npx prisma migrate dev`
- shadcn/ui config: `components.json` (base-nova style, neutral base color)
- The project uses `@base-ui/react` as the headless primitive layer for shadcn
