# Frontend Arasdirma Rehberi — Nasraddin

> Bu sened Sprint-1 tasklarini (FE-1: Navbar, FE-2: Footer) tamamlaya bilmek ucun lazim olan movzulari ehtiva edir.
> Her movzunu sirasiyla oxu ve kicik numuneler yazaraq pekisdir.

---

## 1. Layiheni Lokal Islet ve Strukturu Anla

**Neden:** Kodlama baslamamzdan evvel layihenin nece islediyini gormek lazimdir.

**Addimlar:**
```bash
# 1. Asililiqlari yukle
npm install

# 2. Dev server baslat
npm run dev

# 3. Brauzerde ac
http://localhost:3000
```

**Anla:**
- `src/app/layout.tsx` — Butun sehifeleri saran kok layout. Navbar ve Footer BURAYA elave olunacaq
- `src/app/page.tsx` — Ana sehife (Landing Page)
- `src/app/(main)/menu/page.tsx` — Menu sehifesi
- `src/constants/navigation.ts` — Nav linkleri burada tanimlanib, `NAV_LINKS` massivini istifade edeceksen
- `src/lib/utils.ts` — `cn()` funksiyasi — class birlesdirmek ucun

**Mini tapshiriq:** `npm run dev` ile layiheni baslat. `http://localhost:3000` acilirmi yoxla. Sonra `src/app/layout.tsx` ve `src/constants/navigation.ts` fayllarini oxu.

---

## 2. Tailwind CSS v4 — Utility Class Mentigi

**Neden:** Butun stil islerini Tailwind utility class'lari ile edeceksen. CSS faylina toxunmaq lazim deyil.

**Ogren:**
- Utility class nedir: `className="flex items-center gap-4 p-6 bg-white rounded-lg"`
- Layout: `flex`, `grid`, `items-center`, `justify-between`, `gap-4`
- Spacing: `p-4` (padding), `m-2` (margin), `px-6` (horizontal padding)
- Renkler: `bg-white`, `text-gray-900`, `bg-primary`, `text-primary-foreground`
- Olculer: `w-full`, `h-16`, `max-w-7xl`
- Hover/Focus: `hover:bg-red-600`, `focus:ring-2`
- Dark mode: `dark:bg-gray-900`, `dark:text-white`

**Numune (senin Navbar ucun lazim olacaq):**
```tsx
<nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow-sm">
  {/* Sol: Logo */}
  <div className="flex items-center gap-2">
    <span className="text-xl font-bold">Commit & Eat</span>
  </div>

  {/* Orta: Linkler */}
  <div className="hidden lg:flex items-center gap-6">
    <a href="/" className="text-red-600 font-medium">Home</a>
    <a href="/menu" className="text-gray-700 hover:text-red-600">Menu</a>
  </div>

  {/* Sag: Ikonlar */}
  <div className="flex items-center gap-4">
    {/* search, cart ikonlari */}
  </div>
</nav>
```

**Qaynaqlar:**

Resmi Dokumentasiya:
- Tailwind CSS v4: https://tailwindcss.com/
- Utility Classes: https://tailwindcss.com/docs/styling-with-utility-classes
- Tailwind CSS v4 Blog: https://tailwindcss.com/blog/tailwindcss-v4

Video Dersler:
- JavaScript Mastery — Tailwind CSS v4 Full Course (1 saat, pulsuz): https://www.classcentral.com/course/youtube-tailwind-css-v4-full-course-2025-master-tailwind-in-one-hour-431729

Turkce Qaynaqlar:
- Tailwind CSS Nedir? (Turkce): https://codigno.com/tailwind-css-nedir-2024/

Meqaleler:
- How to Learn Tailwind CSS (Scrimba): https://scrimba.com/articles/how-to-learn-tailwind-css-a-practical-guide-2026/
- Tailwind CSS Tutorial (GeeksforGeeks): https://www.geeksforgeeks.org/css/tailwind-css/

**Mini tapshiriq:** Basit bir `div` yarat — icinde bashliq, metn ve duyma olsun. Butun stilleri Tailwind class'lari ile ver. Hech bir CSS yazma.

---

## 3. Responsive Design — Mobile-First Yanasmasi

**Neden:** Navbar mobildə hamburger menyu, desktopda isə normal link sırası göstərir. Bunu breakpoint'lərlə idarə edirsən.

**Ogren:**
- Tailwind mobile-first isleyir: oneksiz class'lar BUTUN ekranlarda kecerlidir
- `sm:` (640px+), `md:` (768px+), `lg:` (1024px+), `xl:` (1280px+)
- `sm:` KICIK ekran demek DEYIL — 640px ve USTU demek
- Once mobil ucun tasarla, sonra boyuk ekranlar ucun elave et

**Numune (Navbar responsive — senin taskin ucun):**
```tsx
{/* Desktop linkler — mobildə gizli, lg-dən sonra görünür */}
<div className="hidden lg:flex items-center gap-6">
  <Link href="/">Home</Link>
  <Link href="/menu">Menu</Link>
</div>

{/* Hamburger düymə — mobildə görünür, lg-dən sonra gizli */}
<button className="lg:hidden">
  <Menu className="h-6 w-6" />
</button>
```

**Footer responsive numunesi:**
```tsx
{/* Mobildə alt-alta, desktopda yan-yana 3 sütun */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div>{/* Brand sütunu */}</div>
  <div>{/* Quick Links sütunu */}</div>
  <div>{/* Contact sütunu */}</div>
</div>
```

**Qaynaqlar:**

Resmi Dokumentasiya:
- Tailwind Responsive Design: https://tailwindcss.com/docs/responsive-design

Meqaleler:
- Tailwind Breakpoints — Complete 2025 Guide (Tailkits): https://tailkits.com/blog/tailwind-breakpoints-complete-guide/
- 20 Tips for Designing Mobile-First with Tailwind (DEV): https://dev.to/hitesh_developer/20-tips-for-designing-mobile-first-with-tailwind-css-36km
- Creating Responsive Layouts with Tailwind (DEV): https://dev.to/hitesh_developer/creating-responsive-layouts-with-tailwinds-built-in-breakpoints-4e6d

**Mini tapshiriq:** Bir `div` yarat: mobildə 1 sütun, tabletdə 2 sütun, desktopda 3 sütun göstərsin. `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` istifadə et.

---

## 4. Next.js Link Komponenti — Sehifeler Arasi Kecid

**Neden:** Navbar'da Home, Menu, Gallery linklerini `<a>` deyil `<Link>` ile yazacaqsan.

**Ogren:**
- `<Link>` komponenti sehifeni tam yeniden yuklemir — daha suretli
- Avtomatik prefetch: viewport'da gorunen linkler arxa planda yuklenir
- `href` prop'u mecburidir

**Numune:**
```tsx
import Link from "next/link";

// Nav link
<Link
  href="/menu"
  className="text-gray-700 hover:text-red-600 transition-colors"
>
  Menu
</Link>

// Aktiv link kontrol (pathname ile)
"use client";
import { usePathname } from "next/navigation";

const pathname = usePathname();

<Link
  href="/menu"
  className={pathname === "/menu" ? "text-red-600 font-medium" : "text-gray-700"}
>
  Menu
</Link>
```

**Qaynaqlar:**

Resmi Dokumentasiya:
- Next.js Link: https://nextjs.org/docs/app/api-reference/components/link
- Linking and Navigating: https://nextjs.org/docs/app/getting-started/linking-and-navigating

Meqaleler:
- Beginner's Guide to Next.js Link (Medium): https://medium.com/@asiandigitalhub/beginners-guide-to-using-next-js-link-component-b17da8a3a362
- Next.js Link Component (GeeksforGeeks): https://www.geeksforgeeks.org/nextjs/nextjs-link-component/

---

## 5. lucide-react — Ikon Kutupxanesi

**Neden:** Navbar'da Search, ShoppingCart, Menu (hamburger), X (bagla) ikonlari lazimdir. Footer'da sosial media ikonlari.

**Ogren:**
- Her ikon bir React komponentidir — import edib istifade edirsen
- `size`, `className` prop'lari ile olcu ve reng vere bilersen
- 1500+ ikon movcuddur

**Numune (Navbar ikonlari):**
```tsx
import { Search, ShoppingCart, Menu, X } from "lucide-react";

// Navbar ikonlari
<Search className="h-5 w-5 text-gray-600 cursor-pointer hover:text-red-600" />
<ShoppingCart className="h-5 w-5 text-gray-600 cursor-pointer hover:text-red-600" />

// Hamburger menyu (mobil)
<Menu className="h-6 w-6" />   {/* Menyu acmaq ucun */}
<X className="h-6 w-6" />     {/* Menyu baglamaq ucun */}
```

**Footer sosial ikonlar ucun:**
```tsx
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

<div className="flex items-center gap-3">
  <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
  <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
  <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
  <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
</div>
```

**Qaynaqlar:**

Resmi Dokumentasiya:
- Lucide React: https://lucide.dev/guide/packages/lucide-react
- Ikon Axtarishi (butun ikonlari gozden kecir): https://lucide.dev/icons

Meqaleler:
- Using Lucide Icons in Next.js (TutorEnd): https://tutorend.com/tutorials/using-lucide-icons-in-nextjs-react-js
- Lucide React Guide 2025 (Greasy Guide): https://www.greasyguide.com/development/lucide-react-icon-library-guide-2025/

**Mini tapshiriq:** `https://lucide.dev/icons` sehifesine gir, "cart", "search", "menu", "facebook" axtarishlari et. Hansi ikonlarin movcud oldugunu gor.

---

## 6. Server vs Client Components — "use client"

**Neden:** Navbar'da `useState` (hamburger menyu ac/bagla) ve `usePathname` (aktiv link) istifade edeceksen. Bunlar ucun `"use client"` lazimdir.

**Ogren:**
- Next.js App Router'da butun komponentler varsayilan olaraq **Server Component**-dir
- `useState`, `useEffect`, `onClick` istifade etmek isteyirsen → dosyanin en ustune `"use client"` yaz
- Footer statik oldugu ucun Server Component olaraq qala biler (use client lazim deyil)
- Navbar'da interaktivlik var (hamburger menyu) → Client Component olmalidir

**Qayda:** Mumkun olduqca Server Component istifade et. Yalniz lazim olanda Client Component'e kec.

**Numune:**
```tsx
// src/components/layout/Navbar.tsx
"use client";  // ← Bu lazimdir cunki useState ve usePathname istifade edeceyik

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);  // hamburger menyu state
  const pathname = usePathname();                // aktiv link ucun

  return (
    <nav>
      {/* ... */}
      <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
        {isOpen ? <X /> : <Menu />}
      </button>
    </nav>
  );
}
```

```tsx
// src/components/layout/Footer.tsx
// "use client" YOX — Server Component olaraq qalir
// Cunki hec bir interaktivlik yoxdur, sadece statik melumat gosterir

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* ... */}
    </footer>
  );
}
```

**Qaynaqlar:**

Resmi Dokumentasiya:
- Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- "use client" Directive: https://nextjs.org/docs/app/api-reference/directives/use-client

Meqaleler:
- Making Sense of React Server Components (Josh W. Comeau): https://www.joshwcomeau.com/react/server-components/
- What Does "use client" Do? (Dan Abramov): https://overreacted.io/what-does-use-client-do/
- Client vs Server Components (Appwrite): https://appwrite.io/blog/post/client-vs-server-components-react

---

## 7. Next.js Layout — Navbar ve Footer'i Butun Sehifelere Elave Etmek

**Neden:** FE-1 ve FE-2 tamamlananda Navbar ve Footer `layout.tsx` icerisine elave olunacaq ki, butun sehifelerde gorsunsun.

**Ogren:**
- `src/app/layout.tsx` kok layout-dur — butun sehifeler bunun icinde render olunur
- `{children}` prop'u sehife mezmununu temsil edir
- Navbar → children-den evvel, Footer → children-den sonra

**Numune:**
```tsx
// src/app/layout.tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Qaynaqlar:**
- Next.js Layouts: https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates

---

## Calisma Sirasi (Onerilen)

```
1. Movzu 1: Layiheni islet, fayl strukturunu anla
      ↓
2. Movzu 2: Tailwind CSS — utility class'lari ogren, basit div'ler yaz
      ↓
3. Movzu 3: Responsive design — mobile-first breakpoint'leri uygula
      ↓
4. Movzu 5: Lucide — lazim olan ikonlari tap ve import et
      ↓
5. Movzu 4: Link — Next.js Link komponenti ile navigasiya
      ↓
6. Movzu 6: "use client" — ne zaman lazimdir, ne zaman deyil
      ↓
7. Movzu 7: Layout — Navbar ve Footer'i layout.tsx-e elave et
      ↓
8. FE-1 (Navbar) taskini tamamla!
      ↓
9. FE-2 (Footer) taskini tamamla!
```

---

## Tavsiye Olunan Video Izleme Plani

1. **JavaScript Mastery — Tailwind CSS v4 Full Course (1 saat, pulsuz)**
   https://www.classcentral.com/course/youtube-tailwind-css-v4-full-course-2025-master-tailwind-in-one-hour-431729

2. **Lucide Icons sehifesi (10 dq gozden kecir)**
   https://lucide.dev/icons

3. **shadcn/ui Docs (15 dq oxu)**
   https://ui.shadcn.com/docs

Turkce tercih edirsen:
- Patika Dev — Next.js YouTube Kursu: https://academy.patika.dev/blogs/detail/nextjs-youtube-kursu
- BTK Akademi — React ile Web Programlama (pulsuz): https://www.btkakademi.gov.tr/portal/course/react-ile-web-programciligi-10035

---

## Sikisharsan

- Tailwind class tapmirsansa: https://tailwindcss.com/docs axtarish et
- Ikon tapmirsansa: https://lucide.dev/icons axtarish et
- Xeta alirsansa: evvelce xeta mesajini oxu — cox vaxt hell orada yazilir
- Claude Code'dan komek al — kodu izah ede biler, xeta ayiqlamada komekci ola biler
