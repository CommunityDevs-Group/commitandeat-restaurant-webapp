# Commit & Eat - Restaurant Web App

Müştərilərin restoran menyusunu incələyə biləcəyi, real-time masa vəziyyətini görərək rezervasiya edə biləcəyi bir web tətbiq.

## Tech Stack

| Texnologiya | Məqsəd |
|---|---|
| **Next.js 16** | Full-stack framework (Frontend + API Routes) |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **shadcn/ui** | UI component library |
| **Prisma 7** | ORM (database schema & queries) |
| **Supabase** | PostgreSQL database + Real-time |
| **Vercel** | Deployment |

## Layihəni Quraşdırma

### 1. Repo-nu klonla

```bash
git clone https://github.com/CommunityDevs-Group/coomitneat-reastaurant-webapp.git
cd coomitneat-reastaurant-webapp
```

### 2. Asılılıqları quraşdır

```bash
npm install
```

### 3. Environment dəyişənlərini konfiqurasiya et

`.env.example` faylını `.env` olaraq kopyala və Supabase məlumatlarını doldur:

```bash
cp .env.example .env
```

`.env` faylındakı bu dəyərləri öz Supabase layihənizə uyğun doldurun:

```env
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT_REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
```

> **Qeyd:** `.env` faylı `.gitignore`-a əlavə olunub, GitHub-a push edilməyəcək.

### 4. Prisma client-i generate et

```bash
npx prisma generate
```

### 5. Development server-i başlat

```bash
npm run dev
```

Brauzerdə [http://localhost:3000](http://localhost:3000) ünvanını aç.

## Layihə Strukturu

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   ├── (main)/
│   │   ├── menu/           # Menyu səhifəsi
│   │   ├── gallery/        # Qalereya səhifəsi
│   │   └── reservation/    # Rezervasiya səhifəsi
│   └── api/                # Backend API routes
│       ├── menu/
│       ├── tables/
│       └── reservations/
├── components/
│   ├── ui/                 # shadcn/ui komponentləri
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Landing page section-ları
│   ├── menu/               # Menyu komponentləri
│   ├── reservation/        # Rezervasiya komponentləri
│   └── gallery/            # Qalereya komponentləri
├── hooks/                  # Custom React hooks
├── services/               # API service funksiyaları
├── constants/              # Sabit dəyərlər
├── types/                  # TypeScript tipləri
└── lib/
    ├── prisma.ts           # Prisma client
    ├── supabase.ts         # Supabase client (real-time)
    └── utils.ts            # Utility funksiyaları
```

## Database Schema

| Cədvəl | Məqsəd |
|---|---|
| `menu_categories` | Menyu kateqoriyaları (Qəlyanaltılar, Əsas Yeməklər...) |
| `menu_items` | Menyu elementləri (ad, qiymət, tərkib, şəkil) |
| `tables` | Masalar (nömrə, tutum, plan üzərində mövqe) |
| `reservations` | Rezervasiyalar (tarix, saat, qonaq məlumatları, status) |

Schema faylı: `prisma/schema.prisma`

## İş Bölgüsü

### Frontend Developers
- **İş sahəsi:** `src/components/`, `src/app/(main)/`, `src/hooks/`
- **Tapşırıqlar:** Figma dizaynlarını Tailwind + shadcn/ui ilə komponentlərə çevirmək
- Yeni shadcn komponenti əlavə etmək üçün: `npx shadcn@latest add [component-name]`

### Backend Developers
- **İş sahəsi:** `src/app/api/`, `src/services/`, `src/lib/`, `prisma/`
- **Tapşırıqlar:** API routes, database əməliyyatları, Supabase real-time inteqrasiya

## Əsas Əmrlər

```bash
npm run dev          # Development server (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint yoxlaması
npx prisma generate  # Prisma client yenilə (schema dəyişdikdə)
npx prisma migrate dev --name migration_name  # Yeni migration yarat
npx shadcn@latest add button   # shadcn komponenti əlavə et
```

## Git İş Axını

1. `main` branch-dan yeni branch yarat: `git checkout -b feature/your-feature`
2. Dəyişiklikləri commit et
3. Push et və Pull Request aç
4. Review-dan sonra `main`-ə merge et
