# Backend Arastirma Rehberi — Nihat

> Bu dokuman Sprint-1 tasklarini (BE-1: Menu API, BE-2: Seed Data) tamamlayabilmek icin gerekli konulari icerir.
> Her konuyu sirasiyla oku ve kucuk ornekler yazarak pekistir.

---

## 1. Next.js App Router — Route Handlers (API Yazma)

**Neden:** Menu API endpoint'lerini yazabilmek icin.

**Ogren:**
- `src/app/api/menu/route.ts` dosyasinda `GET` fonksiyonu export etmek ne demek?
- `NextRequest` ve `NextResponse` nedir, nasil kullanilir?
- Route parametresi nasil alinir? (`src/app/api/menu/[categoryId]/route.ts`)
- Status code nasil dondurulur? (200, 404, 500)

**Ornek yapi:**
```typescript
// src/app/api/menu/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // veritabanindan veri cek
  // return NextResponse.json({ data: ... })
}
```

**Kaynaklar:**

Resmi Dokumantasyon:
- Next.js Route Handlers: https://nextjs.org/docs/app/getting-started/route-handlers
- Route.js Dosya Referansi: https://nextjs.org/docs/app/api-reference/file-conventions/route
- Building APIs with Next.js (Resmi Blog): https://nextjs.org/blog/building-apis-with-nextjs

Video Egitimler:
- PedroTech — NextJS 15 Full Course (1.5 saat, sifirdan): https://www.classcentral.com/course/youtube-nextjs-15-full-course-2025-become-a-nextjs-pro-in-1-5-hours-451983

Turkce Kaynaklar:
- Turkce Next.js Egitimi (GitHub repo): https://github.com/emre-turan/turkce-next.js-egitimi
- Next.js Turkce Dokumantasyon: https://nextjs-tr.org/docs/intro
- Patika Dev — Next.js YouTube Kursu (Turkce): https://academy.patika.dev/blogs/detail/nextjs-youtube-kursu
- Next.js Hizli Baslangic Rehberi (Medium, Turkce): https://medium.com/@akinduygu/next-js-h%C4%B1zl%C4%B1-ba%C5%9Flang%C4%B1%C3%A7-rehberi-yeni-ba%C5%9Flayanlar-i%CC%87%C3%A7in-pratik-k%C4%B1lavuz-e9ebea5e604f

Blog Yazilari:
- Next.js Route Handlers Complete Guide: https://makerkit.dev/blog/tutorials/nextjs-api-best-practices
- Next.js App Router for Beginners (DEV): https://dev.to/prateekshaweb/nextjs-app-router-for-beginners-pages-layouts-and-navigation-4kd

**Mini gorev:** Basit bir `GET /api/test` endpoint'i yaz, `{ message: "hello" }` dondursun. `http://localhost:3000/api/test` adresinde test et.

---

## 2. Prisma — Temel Sorgular

**Neden:** Veritabanindan menu verisi cekmek icin.

**Ogren:**
- `prisma.menuCategory.findMany()` nasil calisir?
- `where` ile filtreleme: `{ isActive: true }`
- `orderBy` ile siralama: `{ sortOrder: "asc" }`
- `include` ile iliski (relation) cekme: `{ items: true }` — kategori ile birlikte itemlari getir
- `findUnique` ile tek kayit cekme: `{ where: { id: categoryId } }`

**Ornek:**
```typescript
import { prisma } from "@/lib/prisma";

// Tum aktif kategorileri itemlariyla birlikte getir
const categories = await prisma.menuCategory.findMany({
  where: { isActive: true },
  orderBy: { sortOrder: "asc" },
  include: {
    items: {
      where: { isAvailable: true },
    },
  },
});
```

**Kaynaklar:**

Resmi Dokumantasyon:
- Prisma CRUD: https://www.prisma.io/docs/orm/prisma-client/queries/crud
- Prisma Relations: https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries
- Prisma Filtering & Sorting: https://www.prisma.io/docs/orm/prisma-client/queries/filtering-and-sorting
- Prisma Quickstart (5 dk): https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres
- Prisma Client API Referansi: https://www.prisma.io/docs/orm/reference/prisma-client-reference

Video Egitimler:
- PedroTech — Prisma ORM Full Course 2025 (2.5 saat): https://www.classcentral.com/course/youtube-prisma-orm-full-course-2025-become-a-prisma-pro-in-2-5-hours-459611

Turkce Kaynaklar:
- Prisma Nedir? (Medium, Turkce): https://medium.com/@ersinaydogmus.7/prisma-nedir-572579aeafd
- Prisma — JS Gelistiricileri Icin Modern ORM (Medium, Turkce): https://medium.com/@emmezeren/dokunu%C5%9F-prisma-js-geli%C5%9Ftiricileri-i%CC%87%C3%A7in-modern-orm-deneyimi-ec7132a2dabd

Blog Yazilari:
- Beginner's Guide to Prisma ORM (Stackademic): https://blog.stackademic.com/a-beginners-guide-to-prisma-orm-with-examples-bb542bca7cac
- Prisma Deep-Dive Handbook 2025 (DEV): https://dev.to/mihir_bhadak/prisma-deep-dive-handbook-2025-from-zero-to-expert-1761
- Prisma ORM (The Odin Project — ucretsiz egitim): https://www.theodinproject.com/lessons/nodejs-prisma-orm

**Mini gorev:** Terminal'de `npx prisma studio` calistir. Bu sana veritabanini gorecek bir arayuz acar. Tablolari incele.

---

## 3. Prisma — Seed (Baslangic Verisi)

**Neden:** Frontend ekibinin test edebilmesi icin veritabanina ornek menu verisi yuklemek.

**Ogren:**
- `prisma/seed.ts` dosyasi nedir, ne ise yarar?
- `upsert` nedir? Neden `create` yerine `upsert` kullaniyoruz? (Tekrar calistirinca hata vermemesi icin)
- `package.json` icinde `prisma.seed` ayari nasil eklenir?
- `npx prisma db seed` komutu ne yapar?

**Ornek:**
```typescript
// prisma/seed.ts
import { prisma } from "../src/lib/prisma";

async function main() {
  // Kategori olustur (yoksa yarat, varsa guncelle)
  const dishes = await prisma.menuCategory.upsert({
    where: { name: "Dishes" },
    update: {},
    create: {
      name: "Dishes",
      description: "Starter dishes and appetizers",
      sortOrder: 1,
    },
  });

  // Bu kategoriye item ekle
  await prisma.menuItem.upsert({
    where: { id: "placeholder-id" }, // veya baska unique alan
    update: {},
    create: {
      name: "California Sushi Roll",
      description: "Fresh sushi roll with avocado and crab",
      price: 150,
      categoryId: dishes.id,
      isAvailable: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**package.json'a ekle:**
```json
"prisma": {
  "seed": "npx tsx prisma/seed.ts"
}
```

**Kaynaklar:**

Resmi Dokumantasyon:
- Prisma Seeding: https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding

Makale ve Rehberler:
- How to Seed a Database with Prisma and Next.js: https://planetscale.com/blog/how-to-seed-a-database-with-prisma-and-next-js
- Seeding Prisma Databases in Next.js (Robin Wieruch): https://www.robinwieruch.de/prisma-seeding-database/
- Next.js and Prisma: Efficiently Creating Seed Data (DEV): https://dev.to/hayata_yamamoto/nextjs-and-prisma-efficiently-creating-seed-data-for-your-app-1a12

**Mini gorev:** 1 kategori + 1 item ile seed.ts yaz, `npx prisma db seed` calistir, sonra `npx prisma studio` ile veritabaninda gorunup gorunmedigini kontrol et.

---

## 4. Prisma + Supabase Baglantisi

**Neden:** Projemiz Supabase PostgreSQL kullaniyor. Nasil baglandigini anlamak icin.

**Ogren:**
- `DATABASE_URL` ve `DIRECT_URL` farkini anla (pgbouncer vs direct)
- `@prisma/adapter-pg` nedir, neden kullaniyoruz?
- `src/lib/prisma.ts` dosyasini oku ve anla

**Kaynaklar:**

Resmi Dokumantasyon:
- Supabase + Prisma (Supabase Docs): https://supabase.com/docs/guides/database/prisma
- Supabase (Prisma Docs): https://www.prisma.io/docs/orm/overview/databases/supabase
- Prisma + Next.js + Vercel Guide: https://www.prisma.io/docs/guides/nextjs

Blog Yazilari:
- Set up PostgreSQL on Supabase with Prisma (DEV): https://dev.to/prisma/set-up-a-free-postgresql-database-on-supabase-to-use-with-prisma-3pk6
- Setting Up Prisma with PostgreSQL, Migrating to Supabase (Medium): https://medium.com/@shreyaskota1/setting-up-prisma-with-postgresql-locally-migrating-to-supabase-and-deploying-on-vercel-a572c92fee80

> **Not:** Bu konuyu derinden bilmen gerekmez. Baglanti zaten projede kurulmus durumda. Sadece `.env` dosyasini dogru doldurmani ve `src/lib/prisma.ts` dosyasinin ne yaptigini anlaman yeterli.

---

## 5. Service Layer Pattern (Is Mantigi Ayirma)

**Neden:** API route dosyalarini temiz tutmak, is mantigini ayri bir dosyada toplamak icin.

**Ogren:**
- Neden dogrudan route.ts icinde veritabani sorgusu yazmak yerine ayri bir service dosyasi olusturuyoruz?
- Service dosyasi nasil yapilandirilir?

**Ornek:**
```typescript
// src/services/menuService.ts
import { prisma } from "@/lib/prisma";

export async function getAllCategories() {
  return prisma.menuCategory.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      items: {
        where: { isAvailable: true },
      },
    },
  });
}

export async function getCategoryById(categoryId: string) {
  return prisma.menuCategory.findUnique({
    where: { id: categoryId },
    include: {
      items: {
        where: { isAvailable: true },
      },
    },
  });
}
```

```typescript
// src/app/api/menu/route.ts
import { NextResponse } from "next/server";
import { getAllCategories } from "@/services/menuService";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json({ data: categories, count: categories.length });
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error", message: "Failed to fetch menu" },
      { status: 500 }
    );
  }
}
```

**Faydasi:** Route dosyasi sadece HTTP isini yapar (request al, response dondur). Asil is mantigi service'te kalir. Ileride ayni service'i baska yerlerde de kullanabilirsin.

**Kaynaklar:**
- Service Layer Pattern Ornegi (GitHub — Turk gelistirici): https://github.com/ugurkellecioglu/nextjs-service-layer-pattern
- Why Your Next.js Site Needs an API Layer (Semaphore): https://semaphore.io/blog/next-js-site-api-layer
- Next.js Backend for Frontend Guide (Resmi): https://nextjs.org/docs/app/guides/backend-for-frontend

---

## 6. Error Handling ve Response Formati

**Neden:** API'nin tutarli ve anlasilir cevaplar dondurmesi icin.

**Ogren:**
- try/catch ile hata yakalama
- Projemizdeki standart response formati:
  ```typescript
  // Basarili
  { data: T, count?: number }

  // Hata
  { error: string, message: string }
  ```
- HTTP status kodlari:
  - `200` — basarili
  - `400` — hatali istek (eksik/yanlis parametre)
  - `404` — bulunamadi
  - `500` — sunucu hatasi

---

## 7. Projeyi Lokal Calistirma ve Test Etme

**Adimlar:**
```bash
# 1. Bagimliliklari yukle
npm install

# 2. .env dosyasini olustur (.env.example'dan kopyala)
cp .env.example .env
# Supabase bilgilerini doldur

# 3. Prisma client olustur
npx prisma generate

# 4. Migration calistir
npx prisma migrate dev

# 5. Dev server baslat
npm run dev

# 6. API'yi test et (baska terminal'de)
curl http://localhost:3000/api/menu
```

**API test araclari:**

Thunder Client (VSCode eklentisi — tavsiye edilen):
- Kurulum: https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client
- Resmi site: https://www.thunderclient.com/
- Kullanim rehberi: https://www.freecodecamp.org/news/thunder-client-for-vscode/
- Baslangic rehberi (DEV): https://dev.to/cinthiabs/thunder-client-how-to-use-to-test-apis-4hfj

Postman (alternatif):
- Ogren: https://www.postman.com/learn/
- API Beginner Path: https://academy.postman.com/path/api-beginner
- Baslangic rehberi: https://www.toolsqa.com/postman/postman-tutorial/

> **Tavsiye:** Thunder Client VSCode icinde calisiyor, ekstra program yuklemeye gerek yok. Postman'e gore daha basit ve hizli.

---

## Calisma Sirasi (Onerilen)

```
1. Konu 7: Projeyi lokal calistir, .env ayarla, calisiyor mu kontrol et
      ↓
2. Konu 4: Prisma + Supabase baglantisini anla, prisma.ts dosyasini oku
      ↓
3. Konu 2: Prisma sorgularini oku, prisma studio ile veritabanini incele
      ↓
4. Konu 3: seed.ts yaz, 1 kategori + 1 item ekle, test et
      ↓
5. Konu 1: Basit bir test API endpoint'i yaz, calistir
      ↓
6. Konu 5: menuService.ts yaz, route.ts icinden cagir
      ↓
7. Konu 6: Error handling ekle, response formatini uygula
      ↓
8. BE-1 + BE-2 tasklerini tamamla!
```

---

## Tavsiye Edilen Video Izleme Plani

Hepsini izlemene gerek yok. Su ikisi yeterli:

1. **PedroTech — NextJS 15 Full Course (1.5 saat)**
   https://www.classcentral.com/course/youtube-nextjs-15-full-course-2025-become-a-nextjs-pro-in-1-5-hours-451983
   → Next.js'in genel yapisini, route'lari ve API handler'lari anlamak icin

2. **PedroTech — Prisma ORM Full Course 2025 (2.5 saat)**
   https://www.classcentral.com/course/youtube-prisma-orm-full-course-2025-become-a-prisma-pro-in-2-5-hours-459611
   → Prisma CRUD, relations, seeding — birebir ihtiyacin olan konular

Turkce tercih edersen:
- **Patika Dev — Next.js YouTube Kursu (Turkce)**
  https://academy.patika.dev/blogs/detail/nextjs-youtube-kursu

---

## Sikisirsan

- Once hata mesajini oku — cogu zaman cozum orada yaziyor
- `npx prisma studio` ile veritabanini kontrol et
- Fironi'ye sor — ayni backend takimindayiz
- Claude Code'dan yardim al — kodu aciklatabilir, hata ayiklamada yardimci olabilir
