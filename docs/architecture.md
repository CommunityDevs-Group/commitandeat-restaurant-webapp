# Commit & Eat - Architecture Document

## System Overview

Commit & Eat is a full-stack restaurant web application built with Next.js 16 App Router. The system follows a monolithic architecture deployed as a serverless application on Vercel, with Supabase providing the database and real-time infrastructure.

```
┌─────────────────────────────────────────────────────┐
│                    Client (Browser)                  │
│              React 19 + Tailwind CSS v4              │
└──────────────────────┬──────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────┐
│              Next.js 16 (Vercel Edge)                │
│  ┌─────────────────┐    ┌────────────────────────┐  │
│  │  App Router      │    │  API Route Handlers    │  │
│  │  (SSR/SSG)       │    │  /api/menu             │  │
│  │  Server Comps    │    │  /api/tables           │  │
│  │  Client Comps    │    │  /api/reservations     │  │
│  │                  │    │  /api/contact           │  │
│  └─────────────────┘    └───────────┬────────────┘  │
│                                     │               │
│  ┌──────────────────────────────────▼────────────┐  │
│  │           Service Layer (src/services/)        │  │
│  │     Business logic & data transformation      │  │
│  └──────────────────────┬────────────────────────┘  │
│                         │                           │
│  ┌──────────────────────▼────────────────────────┐  │
│  │         Prisma 7 ORM (src/lib/prisma.ts)      │  │
│  │         PrismaPg Adapter + Connection Pool     │  │
│  └──────────────────────┬────────────────────────┘  │
└─────────────────────────┼───────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│                 Supabase Platform                    │
│  ┌─────────────┐    ┌────────────────────────────┐  │
│  │ PostgreSQL   │    │  Real-time Subscriptions   │  │
│  │ (pgbouncer)  │    │  (WebSocket via client)    │  │
│  └─────────────┘    └────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## Module Architecture

### 1. Menu Module + Cart

Displays restaurant menu items grouped by categories with add-to-cart functionality.

**Figma UI:**
- Hero banner: dark background, "Our Menu" title
- Category filter tabs: Dishes (red=active), Main-courses, Beverages
- Menu cards: image, name, description, price (₺), "Add to Cart" red button
- Cart sidebar: slides in from right, "Your Cart" title, item list or "Product Not Found" empty state

```
Data Flow:
  DB (menu_categories + menu_items)
    → Prisma Query (join category → items)
      → API Route /api/menu
        → Service Layer (format, filter inactive)
          → React Components (MenuCard, CategoryFilter)
          → Cart (client-side state via Context/Zustand)

Key Files:
  prisma/schema.prisma         → MenuCategory, MenuItem models
  src/app/api/menu/             → GET endpoint (list categories + items)
  src/services/                 → menuService (business logic)
  src/components/menu/          → MenuCard, CategoryFilter, MenuList
  src/components/cart/          → CartSidebar, CartItem, CartProvider
  src/hooks/                    → useCart hook
  src/app/(main)/menu/page.tsx  → Menu page
```

### 2. Reservation Module (3-Step Form)

Allows customers to book a reservation through a multi-step wizard.

**Figma UI — 3 Steps:**
- Step 1 (Date & Time): "When will you join us?" — date picker, time picker
- Step 2 (Details): "Reservation Details" — guest count (-/+), occasion dropdown (optional)
- Step 3 (Contact): "Your Contact Information" — full name, phone (with country code), special requests textarea
- Each step has a "Next" red button, step indicators at top (active=red, completed=red, upcoming=gray)
- Hero banner: dark background, "Reserve Your Table" title

```
Data Flow:
  1. Step 1: Customer selects date & time
  2. Step 2: Customer sets guest count & occasion
  3. Step 3: Customer fills contact info
  4. Form submit → POST /api/reservations
  5. Backend checks table availability for date/time/guest count
  6. Reservation created with PENDING status

Key Files:
  prisma/schema.prisma              → Table, Reservation, ReservationStatus
  src/app/api/tables/               → GET (available tables by date/time)
  src/app/api/reservations/         → POST (create), GET (check status)
  src/services/                     → reservationService, tableService
  src/components/reservation/       → StepDatetime, StepDetails, StepContact, StepIndicator
  src/app/(main)/reservation/       → Reservation page
  src/lib/supabase.ts               → Real-time table status subscriptions
  src/types/index.ts                → TableWithStatus, ReservationFormData
```

**Reservation Status Flow:**
```
PENDING → CONFIRMED → COMPLETED
   │
   └──→ CANCELLED
```

### 3. Gallery Module

Displays restaurant photos with tab-based filtering.

**Figma UI:**
- Hero banner: light/illustrated background, "Gallery" title
- Tab filter: All (red=active), Food, Interior
- Grid layout: masonry-style photo grid

```
Key Files:
  src/components/gallery/           → GalleryGrid, GalleryImage, GalleryFilter
  src/app/(main)/gallery/page.tsx   → Gallery page
  public/images/                    → Static image assets (food/, interior/)
```

### 4. Landing Page Module

Restaurant homepage with hero, about, and chef's specialties sections.

**Figma UI:**
- Hero: full-width food table background, "Taste the *extraordinary*" (italic script), subtitle, 2 CTA buttons (Reserve Your Table=red, View Menu=outline)
- About: "Crafting Culinary Excellence Since 2025", chef photo, description, 2 feature badges (Fresh Daily icons), "10K+ Happy Customers" badge
- Chef's Specialties: "Discover our most beloved dishes...", 3 featured food cards

```
Key Files:
  src/components/sections/          → HeroSection, AboutSection, ChefSpecialties
  src/components/layout/            → Navbar, Footer (shared layout)
  src/app/page.tsx                  → Landing page
  src/constants/navigation.ts       → NAV_LINKS, RESTAURANT_NAME
```

### 5. Contact Module

Contact information and message form.

**Figma UI:**
- 4 info cards in a row: Location, Phone, Email, Operating Hours (each with red circle icon)
- "Send us a Message" form: name, email, subject, message fields + "Send Message" red button
- Interactive Map section with "Get Directions" red button

```
Key Files:
  src/app/api/contact/              → POST (send message)
  src/services/                     → contactService
  src/components/contact/           → ContactForm, InfoCard, MapSection
  src/app/(main)/contact/page.tsx   → Contact page
```

### 6. Layout Module (Shared)

Navbar and Footer shared across all pages.

**Navbar (Figma):**
- Left: Logo (X icon + "Commit & Eat")
- Center: Home, Menu, Gallery, Reservation, Contact — active link in red
- Right: Search icon, Cart icon (with badge count)

**Footer (Figma):**
- Dark background, 3 columns:
  - Brand: Logo, description, social icons (Facebook, Twitter, Instagram, LinkedIn)
  - Quick Links: Home, Menu, Gallery, Reservation, Contact
  - Contact Info: Address, Phone, Email

```
Key Files:
  src/components/layout/Navbar.tsx    → Top navigation bar
  src/components/layout/Footer.tsx    → Site footer
  src/app/layout.tsx                  → Root layout (wraps Navbar + Footer)
```

## Database Schema

### Entity Relationship Diagram

```
┌──────────────────┐       ┌──────────────────┐
│  MenuCategory    │       │    MenuItem       │
├──────────────────┤       ├──────────────────┤
│ id        (PK)   │──┐    │ id        (PK)   │
│ name      (UQ)   │  │    │ name             │
│ description      │  │    │ description      │
│ sortOrder        │  └───▶│ categoryId (FK)  │
│ isActive         │       │ price            │
│ createdAt        │       │ image            │
│ updatedAt        │       │ isAvailable      │
└──────────────────┘       │ createdAt        │
                           │ updatedAt        │
                           └──────────────────┘

┌──────────────────┐       ┌──────────────────┐
│     Table        │       │   Reservation    │
├──────────────────┤       ├──────────────────┤
│ id        (PK)   │──┐    │ id        (PK)   │
│ number    (UQ)   │  │    │ date             │
│ capacity         │  │    │ startTime        │
│ positionX        │  └───▶│ tableId   (FK)   │
│ positionY        │       │ endTime          │
│ isActive         │       │ guestName        │
│ createdAt        │       │ phone            │
│ updatedAt        │       │ email            │
                           │ guestCount       │
                           │ notes            │
                           │ status (enum)    │
                           │ createdAt        │
                           │ updatedAt        │
                           └──────────────────┘
```

### Relations
- `MenuCategory` 1:N `MenuItem` (cascade delete)
- `Table` 1:N `Reservation` (cascade delete)

## Data Flow Patterns

### Server-Side Rendering (Menu, Gallery)
```
Browser Request → Next.js Server Component → Prisma Query → DB → HTML Response
```
- Menu and Gallery pages are read-heavy, ideal for SSR/SSG
- Can leverage Next.js caching and ISR for performance

### Client-Side Real-Time (Table Availability)
```
Browser → Supabase WebSocket → Real-time subscription on `tables` / `reservations`
Browser → API Route → Prisma → DB (for initial load)
```
- Table availability updates in real-time via Supabase subscriptions
- Initial state loaded via API, then kept in sync via WebSocket

### Form Submission (Reservation)
```
Client Form → POST /api/reservations → Service Validation → Prisma Create → DB
                                      → Check table availability (time conflict)
                                      → Return success/error
```

## API Design

### Endpoints

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/api/menu` | List all categories with items | Public |
| GET | `/api/menu/[categoryId]` | Items by category | Public |
| GET | `/api/tables` | List tables with availability | Public |
| GET | `/api/tables?date=X&startTime=Y&endTime=Z` | Available tables for time slot | Public |
| POST | `/api/reservations` | Create reservation | Public |
| GET | `/api/reservations/[id]` | Get reservation status | Public |
| POST | `/api/contact` | Send contact message | Public |

### Response Format

```typescript
// Success
{ data: T, message?: string }

// Error
{ error: string, message: string }

// List
{ data: T[], count: number }
```

## Component Architecture

### Component Hierarchy

```
RootLayout (layout.tsx)
├── Navbar (components/layout/)
│   ├── Logo
│   ├── NavLinks (Home, Menu, Gallery, Reservation, Contact)
│   ├── SearchIcon
│   └── CartIcon (badge count)
├── Page Content
│   ├── Landing Page (/)
│   │   ├── HeroSection (background image, CTA buttons)
│   │   ├── AboutSection (chef photo, features, customer count)
│   │   └── ChefSpecialties (3 featured dishes)
│   ├── Menu Page (/menu)
│   │   ├── MenuHero ("Our Menu" banner)
│   │   ├── CategoryFilter (Dishes | Main-courses | Beverages tabs)
│   │   ├── MenuList
│   │   │   └── MenuCard (image, name, desc, price, Add to Cart)
│   │   └── CartSidebar (slide-in panel)
│   │       └── CartItem
│   ├── Gallery Page (/gallery)
│   │   ├── GalleryHero ("Gallery" banner)
│   │   ├── GalleryFilter (All | Food | Interior tabs)
│   │   └── GalleryGrid
│   │       └── GalleryImage
│   ├── Reservation Page (/reservation)
│   │   ├── ReservationHero ("Reserve Your Table" banner)
│   │   ├── StepIndicator (1. Date&Time → 2. Details → 3. Contact)
│   │   ├── StepDatetime (date picker, time picker)
│   │   ├── StepDetails (guest count, occasion)
│   │   └── StepContact (name, phone, special requests)
│   └── Contact Page (/contact)
│       ├── InfoCards (Location, Phone, Email, Hours)
│       ├── ContactForm (name, email, subject, message)
│       └── MapSection (interactive map + Get Directions)
└── Footer (components/layout/)
    ├── BrandColumn (logo, description, socials)
    ├── QuickLinks
    └── ContactInfo
```

### Component Conventions

| Type | Location | Rendering |
|------|----------|-----------|
| UI Primitives | `components/ui/` | Client (interactive) |
| Layout | `components/layout/` | Server (static structure) |
| Feature Components | `components/<feature>/` | Mix (based on interactivity) |
| Page Sections | `components/sections/` | Server (landing page blocks) |
| Pages | `app/(main)/*/page.tsx` | Server (data fetching) |

## Team Responsibility Map

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND TEAM                            │
│                  Nasraddin & Ugur                            │
│                                                             │
│  src/components/**     UI, layout, sections, cart, contact   │
│  src/app/(main)/**     Page components (consume API data)   │
│  src/app/page.tsx      Landing page                         │
│  src/app/layout.tsx    Root layout                          │
│  src/app/globals.css   Theme & styling                      │
│  src/hooks/**          Custom React hooks (useCart, etc.)    │
│  src/constants/**      Navigation, config constants         │
│  src/types/index.ts    Shared TypeScript interfaces         │
│  public/**             Static assets (images, fonts)        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    BACKEND TEAM                             │
│                   Nihat & Fironi                             │
│                                                             │
│  src/app/api/**        API route handlers (menu, tables,     │
│                        reservations, contact)                │
│  src/services/**       Business logic & validation          │
│  src/lib/prisma.ts     Database client                      │
│  src/lib/supabase.ts   Real-time client                     │
│  prisma/**             Schema, migrations, seeds            │
│  src/types/index.ts    Shared TypeScript interfaces         │
└─────────────────────────────────────────────────────────────┘

Shared Ownership:
  src/types/index.ts     → Both teams (API contracts)
  CLAUDE.md              → Both teams (project guidelines)
  package.json           → Both teams (dependencies)
```

## Deployment Architecture

```
GitHub Repository
    │
    ▼
Vercel (Auto-deploy on push to main)
    │
    ├── Edge Functions (API Routes)
    │       │
    │       ▼
    │   Supabase PostgreSQL
    │   (Connection Pooling via pgbouncer:6543)
    │   (Direct Connection via :5432 for migrations)
    │
    └── Static Assets (CDN)
            │
            ▼
        public/images/
```

## Design System (from Figma)

### Color Palette
- **Primary (Red):** CTA buttons, active tabs/links, accent badges — `#DC2626` range
- **Dark:** Hero section overlays, footer background, navbar — near black
- **White:** Card backgrounds, page backgrounds, text on dark
- **Gray:** Inactive tabs, secondary text, borders, muted content

### Typography
- Headings: Bold, large — hero titles use decorative italic/script for emphasis ("*extraordinary*")
- Body: Clean sans-serif (Geist Sans)

### Page Hero Pattern
Every inner page (Menu, Gallery, Reservation, Contact) has a consistent hero:
- Full-width dark/illustrated background
- Centered white page title in large script/bold font

### Card Pattern
- White background, rounded corners, subtle shadow
- Used in: menu items, chef's specialties, contact info cards, gallery

### Button Variants
- **Primary:** Red background, white text (Reserve Your Table, Add to Cart, Next, Send Message)
- **Outline:** White/transparent background, white border (View Menu on hero)
- **Tab/Filter:** Red background when active, gray/outline when inactive

### Cart UI
- Sidebar panel slides in from the right
- Header: "Your Cart" + close (X) button
- Empty state: "Product Not Found"
- Triggered by cart icon in navbar

## Security Considerations

- Environment variables for all secrets (never hardcode)
- `NEXT_PUBLIC_*` prefix only for client-safe values (Supabase URL, anon key)
- Supabase RLS (Row Level Security) should be configured for production
- API input validation at route handler level
- Prisma parameterized queries prevent SQL injection
- CORS handled by Next.js/Vercel defaults
