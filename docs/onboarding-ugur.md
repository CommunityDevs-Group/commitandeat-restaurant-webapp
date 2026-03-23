# Frontend Arasdirma Rehberi — Ugur

> Bu sened Sprint-1 tasklarini (FE-3: Hero Section, FE-4: About Section, FE-5: Chef's Specialties) tamamlaya bilmek ucun lazim olan movzulari ehtiva edir.
> Her movzunu sirasiyla oxu ve kicik numuneler yazaraq pekisdir.

---

## 1. Layiheni Lokal Islet ve Strukturu Anla

**Neden:** Kodlamaga bashlamazdan evvel layihenin nece islediyini gormek lazimdir.

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
- `src/app/page.tsx` — Landing Page. Senin 3 sectionin BURAYA elave olunacaq
- `src/components/sections/` — Section komponentleri bu qovlugda olacaq
- `src/lib/utils.ts` — `cn()` funksiyasi — class birlesdirmek ucun
- `public/images/` — Statik sekiller buraya yerlesdirilir

**Mini tapshiriq:** `npm run dev` ile layiheni baslat, `http://localhost:3000` acilirmi yoxla. Sonra `src/app/page.tsx` faylini oxu.

---

## 2. Tailwind CSS v4 — Utility Class Mentigi

**Neden:** Butun stil islerini Tailwind utility class'lari ile edeceksen.

**Ogren:**
- Layout: `flex`, `grid`, `items-center`, `justify-center`, `gap-6`
- Spacing: `p-8` (padding), `my-16` (vertical margin), `px-4`
- Renkler: `bg-white`, `text-gray-900`, `bg-red-600`, `text-white`
- Typography: `text-4xl`, `font-bold`, `italic`, `leading-tight`
- Olculer: `w-full`, `h-screen`, `min-h-[80vh]`, `max-w-7xl`, `mx-auto`
- Efektler: `shadow-lg`, `rounded-xl`, `opacity-50`
- Background: `bg-cover`, `bg-center`, `bg-no-repeat`

**Numune (Hero section ucun lazim olacaq):**
```tsx
{/* Arxa plan sekli + tund overlay */}
<section className="relative min-h-[80vh] flex items-center justify-center">
  {/* Arxa plan */}
  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
    <div className="absolute inset-0 bg-black/60" /> {/* tund overlay */}
  </div>

  {/* Mezmun */}
  <div className="relative z-10 text-center text-white">
    <h1 className="text-5xl font-bold">
      Taste the <span className="italic">extraordinary</span>
    </h1>
    <p className="mt-4 text-lg text-gray-200">
      Where culinary artistry meets unforgettable flavors
    </p>
  </div>
</section>
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
- Master Responsive Design with Tailwind (Tailgrids): https://tailgrids.com/blog/learn-tailwind-css-mastering-responsive-design

**Mini tapshiriq:** Basit bir kart yarat — icinde sekil, bashliq ve metn olsun. Butun stilleri Tailwind class'lari ile ver.

---

## 3. Responsive Design — Mobile-First Yanasmasi

**Neden:** Hero, About ve Chef's Specialties sectionlari mobildə və desktopda ferqli gorunmelidir.

**Ogren:**
- Tailwind mobile-first isleyir: oneksiz class'lar BUTUN ekranlarda kecerlidir
- `md:` (768px+), `lg:` (1024px+)
- Once mobil ucun tasarla, sonra boyuk ekranlar ucun elave et

**Numune (About section — 2 sutun):**
```tsx
{/* Mobildə alt-alta, desktopda yan-yana */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  {/* Sol: Metn */}
  <div>
    <h2 className="text-3xl lg:text-4xl font-bold">
      Crafting Culinary Excellence Since 2025
    </h2>
    <p className="mt-4 text-gray-600">Aciqlama metni...</p>
  </div>

  {/* Sag: Sekil */}
  <div className="relative h-80 lg:h-96">
    <Image src="/images/chef.jpg" alt="Chef" fill className="object-cover rounded-xl" />
  </div>
</div>
```

**Numune (Chef's Specialties — 3 kart):**
```tsx
{/* Mobildə 1, tabletdə 2, desktopda 3 sütun */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <DishCard />
  <DishCard />
  <DishCard />
</div>
```

**Qaynaqlar:**

Resmi Dokumentasiya:
- Tailwind Responsive Design: https://tailwindcss.com/docs/responsive-design

Meqaleler:
- Tailwind Breakpoints — Complete Guide (Tailkits): https://tailkits.com/blog/tailwind-breakpoints-complete-guide/
- 20 Tips for Mobile-First with Tailwind (DEV): https://dev.to/hitesh_developer/20-tips-for-designing-mobile-first-with-tailwind-css-36km

**Mini tapshiriq:** 3 kartliq grid yarat: mobildə 1 sütun, tabletdə 2, desktopda 3 sütun. Her kartda bashliq ve metn olsun.

---

## 4. Next.js Image Komponenti — Optimize Sekiller

**Neden:** Hero arxa plan sekli, sef fotosu, yemek kartlari — hamisi `next/image` ile islenecek.

**Ogren:**
- `<Image>` HTML `<img>` etiketini genislendirir — avtomatik optimizasiya (lazy loading, WebP)
- `width` ve `height` prop'lari mecburidir (layout shift onlemek ucun)
- `fill` modu — parent container'i doldurur (arxa plan sekilleri ucun ideal)
- `priority` prop'u — hero sekilleri ucun (sehife yuklenende dərhal yuklenir)

**Numune (Hero arxa plan):**
```tsx
import Image from "next/image";

{/* fill modu — parent container'i doldurur */}
<div className="relative min-h-[80vh]">
  <Image
    src="/images/hero-bg.jpg"
    alt="Restaurant ambiance"
    fill
    priority  {/* Hero sekli oldugu ucun dərhal yukle */}
    className="object-cover"
  />
  <div className="absolute inset-0 bg-black/60" />  {/* Tund overlay */}
  <div className="relative z-10">
    {/* Bashliq ve duymeler */}
  </div>
</div>
```

**Numune (Sef fotosu — About section):**
```tsx
<div className="relative h-80 w-full rounded-xl overflow-hidden">
  <Image
    src="/images/chef.jpg"
    alt="Head Chef"
    fill
    className="object-cover"
  />
</div>
```

**Numune (Yemek karti — Chef's Specialties):**
```tsx
<div className="bg-white rounded-xl shadow-md overflow-hidden">
  <div className="relative h-48">
    <Image
      src="/images/dishes/sushi.jpg"
      alt="California Sushi Roll"
      fill
      className="object-cover"
    />
  </div>
  <div className="p-4">
    <h3 className="font-semibold text-lg">California Sushi Roll</h3>
  </div>
</div>
```

**Qaynaqlar:**

Resmi Dokumentasiya:
- Next.js Image Component: https://nextjs.org/docs/app/api-reference/components/image
- Image Optimization: https://nextjs.org/docs/app/getting-started/images

Meqaleler:
- Next.js Image Optimization Guide (Strapi): https://strapi.io/blog/nextjs-image-optimization-developers-guide
- next/image Component Tutorial (DebugBear): https://www.debugbear.com/blog/nextjs-image-optimization
- In-Depth Tutorial (Full Stack Foundations): https://www.fullstackfoundations.com/blog/nextjs-image-component-tutorial

**Mini tapshiriq:** `public/images/` qovluguna bir test sekli at. Sonra `<Image>` ile goster. `fill` modunu ve `width/height` modunu her ikisini de dene.

---

## 5. Next.js Link ve Button — CTA Duymeleri

**Neden:** Hero section'da 2 CTA duymesi var: "Reserve Your Table" ve "View Menu". Bunlar Link ile basqa sehifeye yonlendirir.

**Ogren:**
- `<Link>` komponenti sehifeni tam yeniden yuklemir
- Layihede hazir `<Button>` komponenti var: `src/components/ui/button.tsx`
- Button'un variant'lari: `default` (dolu), `outline` (cevreli), `ghost`, `link`

**Numune (Hero CTA duymeleri):**
```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

<div className="flex items-center gap-4">
  {/* Qirmizi dolu duyma */}
  <Link href="/reservation">
    <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg">
      Reserve Your Table
    </Button>
  </Link>

  {/* Ag outline duyma */}
  <Link href="/menu">
    <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
      View Menu
    </Button>
  </Link>
</div>
```

**Qaynaqlar:**
- Next.js Link: https://nextjs.org/docs/app/api-reference/components/link
- shadcn/ui Button: https://ui.shadcn.com/docs/components/button

---

## 6. shadcn/ui — Hazir Komponentler

**Neden:** Layihede shadcn/ui istifade olunur. Lazim olan komponentleri elave edib istifade ede bilersen.

**Ogren:**
- shadcn/ui bir npm paketi deyil — komponentleri layihene kopyalayirsan
- `npx shadcn@latest add card` ile Card komponenti elave ede bilersen
- Komponentler `src/components/ui/` altinda yerlesir
- Her komponentin oz sayfasi var: https://ui.shadcn.com/docs/components

**Numune (Card — yemek karti ucun):**
```bash
# Card komponenti elave et
npx shadcn@latest add card
```

```tsx
import { Card, CardContent } from "@/components/ui/card";

<Card className="overflow-hidden">
  <div className="relative h-48">
    <Image src="/images/dish.jpg" alt="Dish" fill className="object-cover" />
  </div>
  <CardContent className="p-4">
    <h3 className="font-semibold">California Sushi Roll</h3>
  </CardContent>
</Card>
```

**Qaynaqlar:**

Resmi Dokumentasiya:
- shadcn/ui Docs: https://ui.shadcn.com/docs
- shadcn/ui Components: https://ui.shadcn.com/docs/components

Meqaleler:
- shadcn/ui for Beginners (CodeParrot): https://codeparrot.ai/blogs/shadcn-ui-for-beginners-the-ultimate-guide-and-step-by-step-tutorial
- Complete Beginner's Guide (Shadcraft): https://shadcraft.com/blog/the-complete-beginner-s-guide-to-shadcn-ui

Turkce:
- Shadcn/UI Nedir? Baslangic Rehberi (Turkce): https://apidog.com/tr/blog/what-is-shadcn-ui-tutorial-tr/

---

## 7. lucide-react — Ikon Kutupxanesi

**Neden:** About section'da xusisiyyet kartlarinda ikon lazimdir (meselen "Fresh Daily" ucun yaprag ikonu).

**Ogren:**
- Her ikon bir React komponentidir
- `className` ile olcu ve reng vere bilersen

**Numune:**
```tsx
import { Leaf, Award, Users } from "lucide-react";

{/* Xususiyyet karti */}
<div className="flex items-center gap-3">
  <div className="rounded-full bg-red-100 p-3">
    <Leaf className="h-6 w-6 text-red-600" />
  </div>
  <div>
    <h4 className="font-semibold">Fresh Daily</h4>
    <p className="text-sm text-gray-500">Local ingredients sourced every morning</p>
  </div>
</div>

{/* 10K+ badge */}
<div className="flex items-center gap-2 bg-red-600 text-white rounded-full px-4 py-2">
  <Users className="h-5 w-5" />
  <span className="font-bold">10K+</span>
  <span className="text-sm">Happy Customers</span>
</div>
```

**Qaynaqlar:**
- Ikon Axtarishi: https://lucide.dev/icons
- Lucide React Guide: https://lucide.dev/guide/packages/lucide-react

**Mini tapshiriq:** `https://lucide.dev/icons` sehifesine gir, "leaf", "award", "users", "chef-hat" axtarishlari et.

---

## 8. Server vs Client Components — "use client"

**Neden:** Landing Page sectionlarin cox hissesi statik mezmundur — Server Component olaraq qala biler. Amma bilmek lazimdir ki, ne zaman `"use client"` elave etmelisen.

**Qayda:**
- Hero, About, Chef's Specialties sectionlari **Server Component** olaraq qala biler (interaktivlik yoxdur)
- Eger click handler, useState, useEffect lazim olarsa o zaman `"use client"` elave et

**Numune:**
```tsx
// src/components/sections/HeroSection.tsx
// "use client" YOX — Server Component
// Cunki sadece statik mezmun gosterir, interaktivlik yoxdur

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh]">
      {/* ... statik mezmun ... */}
    </section>
  );
}
```

**Qaynaqlar:**
- Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Making Sense of Server Components (Josh W. Comeau): https://www.joshwcomeau.com/react/server-components/

---

## 9. Landing Page Yigilmasi — page.tsx

**Neden:** 3 section komponentini yaratdiqdan sonra onlari `page.tsx` icinde birlesdirmek lazimdir.

**Numune:**
```tsx
// src/app/page.tsx
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ChefSpecialties } from "@/components/sections/ChefSpecialties";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ChefSpecialties />
    </main>
  );
}
```

**Mini tapshiriq:** Evvelce sadece `HeroSection` yarat ve `page.tsx`-e elave et. Brauzerda gorunurmu yoxla. Sonra About ve Chef's Specialties elave et.

---

## Calisma Sirasi (Onerilen)

```
1. Movzu 1: Layiheni islet, fayl strukturunu anla
      ↓
2. Movzu 2: Tailwind CSS — utility class'lari ogren
      ↓
3. Movzu 3: Responsive design — mobile-first breakpoint'ler
      ↓
4. Movzu 4: Next.js Image — sekilleri optimize sekilde goster
      ↓
5. Movzu 5: Link ve Button — CTA duymeleri
      ↓
6. Movzu 6: shadcn/ui — Card komponenti elave et
      ↓
7. Movzu 7: Lucide — lazim olan ikonlari tap
      ↓
8. Movzu 8: Server vs Client — ne zaman "use client" lazimdir
      ↓
9. Movzu 9: page.tsx-de hamısını birlesdir
      ↓
10. FE-3 (Hero) → FE-4 (About) → FE-5 (Chef's Specialties) tamamla!
```

---

## Tavsiye Olunan Video Izleme Plani

1. **JavaScript Mastery — Tailwind CSS v4 Full Course (1 saat, pulsuz)**
   https://www.classcentral.com/course/youtube-tailwind-css-v4-full-course-2025-master-tailwind-in-one-hour-431729

2. **shadcn/ui Docs (15 dq oxu)**
   https://ui.shadcn.com/docs

3. **Lucide Icons sehifesi (10 dq gozden kecir)**
   https://lucide.dev/icons

Turkce tercih edirsen:
- Patika Dev — Next.js YouTube Kursu: https://academy.patika.dev/blogs/detail/nextjs-youtube-kursu
- BTK Akademi — React ile Web Programlama (pulsuz): https://www.btkakademi.gov.tr/portal/course/react-ile-web-programciligi-10035

---

## Sikisharsan

- Tailwind class tapmirsansa: https://tailwindcss.com/docs axtarish et
- Ikon tapmirsansa: https://lucide.dev/icons axtarish et
- shadcn/ui komponenti nece istifade olunur bilmirsense: https://ui.shadcn.com/docs — her komponentin numunesi var
- Xeta alirsansa: evvelce xeta mesajini oxu
- Claude Code'dan komek al — kodu izah ede biler, xeta ayiqlamada komekci ola biler
