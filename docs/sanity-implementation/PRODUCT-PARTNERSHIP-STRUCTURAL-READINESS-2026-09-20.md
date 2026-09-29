---
document_type: structural-readiness-audit
project: petro-anigos
date: 2026-09-20
status: contract-aligned
---

# Audit Kesiapan Struktural Produk dan Kemitraan

Audit ini membandingkan route/page frontend, consumer, query Sanity, schema
aktif, media contract, serta published Content Lake. Audit bersifat read-only;
tidak ada mutation atau perubahan data dilakukan.

## Update contract alignment

Temuan P0 pada audit awal sudah ditutup pada tahap kontrak:

- schema kanonis `product`, `fleetOption`, `partnership`, dan
  `partnershipPage` aktif;
- query Kemitraan sekarang membaca `_type == "partnershipPage"` dan memetakan
  `partners[]` ke response `showcase` untuk kompatibilitas consumer;
- tipe bilingual hero/intro mengikuti struktur schema;
- API Kemitraan menggunakan client yang menghormati Draft Mode;
- fallback partner bernama perusahaan dihapus; ketika belum ada data published,
  halaman menampilkan empty state.

Yang masih sengaja ditahan adalah wiring item Produk/Armada ke halaman yang
masih client-side dan migration data. Keduanya harus memakai query kanonis,
bukan menghidupkan kembali slot global atau data mock.

## Ringkasan

| Area | Kesiapan halaman | Kesiapan CMS/operator | Status |
|---|---|---|---|
| Produk — Kenali Produk | Visual dan navigasi berjalan dengan konten hardcoded | Rendah untuk editing item | Perlu kontrak product |
| Produk — Armada | Visual dan interaksi berjalan dengan daftar kapasitas hardcoded | Rendah untuk editing media/item | Perlu keputusan fleet model |
| Produk — Penawaran | Form dan CTA berjalan | Bukan katalog item; teks masih frontend | Cukup untuk scope saat ini |
| Kemitraan — landing/detail | UI tabel, detail, PDF panel, fallback berjalan | Belum siap sebagai CMS kanonis | Query legacy tanpa schema aktif |
| Home showcase Produk/Kemitraan | Bisa menerima sebagian `homePage` data lama | Tidak konsisten dengan page domain | Perlu reference ke item kanonis |

## Bukti Content Lake pada 2026-09-20

- `product`: **0** dokumen.
- `partnership`: **0** dokumen.
- `kemitraanPage`: **0** dokumen.
- `pageHero` untuk `kenali-produk`, `armada`, `penawaran`: tersedia.
- `pageHero` untuk `kemitraan`: tersedia.
- Route `/produk` tidak ada di aplikasi aktif, walaupun terdapat page hero
  dengan key `produk`.

## 1. Produk

### Yang sudah siap

1. Route aktif:
   - `/produk/kenali-produk`
   - `/produk/armada`
   - `/produk/penawaran`
   - `/produk/penawaran/ajukan`
2. Page hero sudah memiliki `pageKey` dan dapat mengambil
   `pageHero` melalui [`page-hero.tsx`](../../components/sections/page-hero.tsx).
3. Struktur UI cukup jelas: pengenalan produk, komposisi B40, skema distribusi,
   armada, CTA penawaran, dan form pengajuan.
4. Home `ProductShowcase` sudah memiliki titik integrasi awal melalui
   `homePage.productShowcase`, tetapi belum menjadi sumber item kanonis.

### Kekurangan struktural

| Prioritas | Kekurangan | Bukti | Dampak |
|---|---|---|---|
| P0 | Tidak ada schema `product` aktif | [`schemaTypes/index.ts`](../../studio-anigos-project/schemaTypes/index.ts) tidak mendaftarkan `product`; Content Lake count 0 | Operator tidak dapat menambah/mengubah produk |
| P0 | Daftar produk utama hardcoded | [`kenali-produk/page.tsx`](../../app/produk/kenali-produk/page.tsx) menyimpan spesifikasi dan teks dalam komponen | Perubahan konten memerlukan developer |
| P1 | Media produk belum memiliki owner kanonis | UI memakai asset lokal; home memakai `productShowcase.media[]` lama | Asset dapat terpecah antara frontend, Home singleton, dan slot global |
| P1 | Armada belum dimodelkan sebagai item | [`armada/page.tsx`](../../app/produk/armada/page.tsx) menyimpan enam kapasitas dan gambar lokal | Operator tidak dapat mengubah kapasitas, gambar, status, atau urutan |
| P1 | Tidak ada kontrak detail produk | Tidak ada route `/produk/[slug]` aktif dan tidak ada schema `product` | Produk tidak memiliki lifecycle, slug, atau halaman detail yang dapat dikelola |
| P2 | Page hero `produk` orphan | Registry/Content Lake memiliki `page: "produk"`, tetapi route `/produk` tidak ada | Operator dapat mengedit hero yang tidak punya consumer |
| P2 | Field localized belum seragam | Halaman Produk memakai translation key frontend, sedangkan query Home memakai localized object | Workflow bahasa tidak konsisten untuk operator |
| P2 | Asset visual armada bercampur dengan ilustrasi partnership/article/resource | [`armada/page.tsx`](../../app/produk/armada/page.tsx) memakai asset dari beberapa folder domain | Owner dan konteks media sulit dipahami operator |

### Desain target yang dibutuhkan sebelum implementasi

Minimal schema `product`:

```text
product
├── name {id, en}
├── slug
├── description {id, en}
├── artwork
├── specs[]
├── category
├── availableForQuote
├── order
└── isPublished
```

Jika armada ingin diedit operator, jangan mencampurkannya ke `product` sebagai
field acak. Pilih salah satu:

- `fleetOption` sebagai item tersendiri dengan `capacity`, `transportMode`,
  `image`, `note`, `order`, dan `isPublished`; atau
- bagian dari domain `product` hanya bila armada memang dijual sebagai produk,
  bukan kemampuan layanan.

Rekomendasi: gunakan `fleetOption` terpisah karena halaman saat ini
menampilkan kapasitas/logistik, bukan produk BBM.

## 2. Kemitraan

### Yang sudah siap

1. Route `/tentang-kami/kemitraan` memiliki UI detail partner, tabel, tab
   portfolio/dokumentasi, principles/process, dan closing CTA.
2. Page hero `kemitraan` sudah tersedia dan dapat dioverride melalui
   `pageHero`.
3. Type frontend sudah mendukung hero, intro, showcase, process, closing, logo,
   image, dan dokumen.
4. Fallback UI cukup aman untuk menampilkan halaman saat Content Lake kosong.

### Kekurangan struktural

| Prioritas | Kekurangan | Bukti | Dampak |
|---|---|---|---|
| P0 | Query memakai `_type == "kemitraanPage"` tetapi schema aktif tidak memiliki type tersebut | [`sanity-queries.ts`](../../lib/sanity-queries.ts) dan [`schemaTypes/index.ts`](../../studio-anigos-project/schemaTypes/index.ts) | Operator tidak punya dokumen sumber untuk hero/intro/process/closing |
| P0 | Tidak ada schema `partnership` aktif | Content Lake count 0; schema aktif tidak mendaftarkannya | Partner tidak dapat dikelola sebagai item |
| P0 | Halaman fallback memakai mock partner bernama perusahaan | [`kemitraan/page.tsx`](../../app/tentang-kami/kemitraan/page.tsx) `mockPartners` | Risiko data contoh tampil seperti data resmi |
| P1 | API Kemitraan memakai `sanityClient` langsung | [`api/kemitraan/route.ts`](../../app/api/kemitraan/route.ts) | Draft Mode tidak berlaku untuk halaman Kemitraan |
| P1 | Media partner belum memiliki owner kanonis | Fallback memakai `partnership-*.svg`; Home memakai `partnershipShowcase.media[]` lama | Operator tidak punya satu tempat edit gambar partner |
| P1 | Dokumen partner masih memakai field legacy campuran | Type mendukung `portfolioDocument` dan `documentation`, sementara schema aktif hanya `companyDocument` | Kontrak file tidak sama antara page dan Studio |
| P1 | Tidak ada status publish item partner yang dipakai query | Tidak ada schema `partnership`; fallback memilih semua mock | Item tidak punya lifecycle editorial |
| P2 | Opportunity generik dan partner perusahaan dicampur | UI memiliki prinsip/opportunity generik sekaligus partner bernama perusahaan | Perlu keputusan apakah keduanya content item atau UI illustration |
| P2 | Tidak ada route detail partner | Detail dibuka dialog berdasarkan state lokal, bukan URL/slug | Tidak shareable, sulit preview item spesifik, dan sulit SEO |

### Desain target yang dibutuhkan sebelum implementasi

Minimal schema `partnership`:

```text
partnership
├── name
├── slug
├── logo (optional)
├── image
├── partnerSince
├── portfolio
├── body
├── portfolioDocument (optional)
├── documentation (optional)
├── order
└── isPublished
```

Tambahkan singleton `partnershipPage` hanya untuk konten halaman yang bukan
item partner:

```text
partnershipPage
├── hero / intro
├── process[]
├── closing
└── partners[] -> partnership
```

Dengan model ini:

- gambar partner dimiliki `partnership.image`;
- isi halaman dimiliki `partnershipPage`;
- Home mereferensikan partner yang sama;
- dokumen partner punya owner yang jelas;
- Draft Mode dapat mem-preview halaman dan item secara konsisten.

## 3. Masalah lintas halaman

1. **Data source ganda**  
   Home memiliki `productShowcase.media[]` dan
   `partnershipShowcase.media[]`, sementara halaman domain memakai hardcoded
   item/fallback. Ini harus menjadi migration source sementara, bukan dua sumber
   aktif.

2. **Fallback terlalu menyerupai data nyata**  
   Mock partner memakai nama perusahaan. Fallback sebaiknya memakai status
   eksplisit “contoh”, atau diganti empty state yang jelas setelah owner
   konten tersedia.

3. **Preview belum konsisten**  
   Endpoint Kemitraan perlu memakai `getSanityClientForCurrentMode()`, seperti
   endpoint Home dan Page Hero.

4. **Page hero orphan**  
   Registry perlu menandai apakah `produk` adalah halaman nyata. Jika tidak,
   stable hero tersebut harus dikeluarkan dari target operator; jika ya, route
   `/produk` harus dibuat.

5. **Kontrak dokumen belum diputuskan untuk partner**  
   `companyDocument` saat ini untuk Kemitraan/Legalitas bersifat dokumen
   perusahaan umum. Jangan menggunakannya sebagai pengganti dokumen milik
   partner tanpa field reference owner yang jelas.

## 4. Prioritas pekerjaan

### P0 — Wajib sebelum operator acceptance domain

1. Putuskan dan buat schema `product` atau tetapkan Produk tetap hardcoded.
2. Putuskan apakah kapasitas armada menjadi `fleetOption` editable.
3. Buat schema `partnership` dan singleton `partnershipPage`, atau hapus query
   legacy jika Kemitraan memang sengaja tetap hardcoded.
4. Hilangkan mock partner dari jalur production, atau beri empty state yang
   tidak tampak sebagai data resmi.

### P1 — Wajib sebelum production CMS handoff

1. Ganti API Kemitraan ke client Draft Mode-aware.
2. Satukan owner media item-level dan hapus dual-source setelah migrasi dry-run.
3. Tetapkan kontrak dokumen portfolio/dokumentasi partner.
4. Tambahkan status, order, dan validation asset wajib untuk item published.
5. Putuskan route detail/slug partner dan produk.

### P2 — Penyempurnaan operator dan UX

1. Seragamkan localized fields.
2. Bersihkan orphan page hero.
3. Pisahkan asset armada dari folder ilustrasi domain lain.
4. Tambahkan label operator yang membedakan “Partner perusahaan” dan
   “Ilustrasi peluang kemitraan”.

## Kesimpulan

Halaman Produk dan Kemitraan **siap sebagai presentational frontend dengan
fallback**, tetapi **belum siap sebagai interface CMS untuk operator
non-programmer**.

Produk membutuhkan keputusan model produk/fleet. Kemitraan membutuhkan schema
page dan item partner yang baru, karena query saat ini menunjuk ke model legacy
yang tidak ada di Studio aktif. Perbaikan paling aman adalah menyelesaikan
kontrak domain dan owner media terlebih dahulu, baru melakukan wiring dan
migrasi dry-run.
