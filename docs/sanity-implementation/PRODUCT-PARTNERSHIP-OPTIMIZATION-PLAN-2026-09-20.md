---
document_type: implementation-plan
project: petro-anigos
date: 2026-09-20
status: proposed
depends_on:
  - ./ITEM-LEVEL-MEDIA-CONTRACT.md
  - ./PRODUCT-PARTNERSHIP-STRUCTURAL-READINESS-2026-09-20.md
---

# Rencana Optimasi dan Perbaikan Produk/Kemitraan

Rencana ini menjaga layout frontend tetap terkontrol, tetapi membuat konten
Produk dan Kemitraan dapat dikelola operator non-programmer dengan satu owner
data per item.

## Prinsip eksekusi

1. Jangan membuat schema atau mutation sebelum keputusan domain disetujui.
2. Jangan menghapus fallback sebelum data published tervalidasi.
3. Jangan memakai `mediaAsset` global untuk artwork item.
4. Setiap dokumen yang dapat tayang harus memiliki status, urutan, owner media,
   dan preview route yang dapat diuji.
5. Home showcase dan halaman domain harus mereferensikan item yang sama.

## Fase A — Freeze keputusan domain

**Output:** keputusan tertulis sebelum coding.

### Produk

- Tetapkan `product` sebagai dokumen item untuk Solar/HSD dan B40.
- Tetapkan `fleetOption` terpisah untuk kapasitas/armada karena ia adalah
  capability logistik, bukan produk bahan bakar.
- Putuskan apakah route `/produk` akan dibuat sebagai overview atau page hero
  `produk` dihapus dari registry.
- Putuskan apakah detail produk diperlukan. Rekomendasi: gunakan
  `/produk/[slug]` agar item dapat dipreview, dibagikan, dan memiliki SEO.

### Kemitraan

- Buat `partnership` sebagai item partner perusahaan.
- Buat singleton `partnershipPage` untuk hero, intro, process, closing, dan
  reference `partners[]`.
- Tandai opportunity `transportasi`, `distribusi`, dan `usaha` sebagai
  ilustrasi UI atau content item terpisah; jangan mencampurkannya dengan
  perusahaan partner.
- Putuskan apakah detail partner tetap dialog atau memiliki
  `/tentang-kami/kemitraan/[slug]`. Rekomendasi: route slug untuk preview dan
  shareability, dialog dapat dipertahankan sebagai enhancement UX.

**Gate A:** tidak ada field schema yang memiliki dua arti domain.

## Fase B — Bangun model dan validasi Studio

Status: **selesai untuk schema dasar**. Schema sudah tersedia di Studio dan
build lulus; query, seed, dan runtime wiring sengaja belum diaktifkan.

### Schema `product`

```text
name {id, en}
slug
description {id, en}
artwork
specs[] {label {id, en}, value}
category
availableForQuote
order
isPublished
```

### Schema `fleetOption`

```text
label
capacity
unit
transportMode
note {id, en}
image
order
isPublished
```

### Schema `partnership`

```text
name
slug
logo
image
partnerSince
portfolio {id, en}
body {id, en}
portfolioDocument
documentation
order
isPublished
```

### Singleton `partnershipPage`

```text
hero
intro
partners[] -> partnership
process[] {title {id, en}, body {id, en}}
closing {title {id, en}, body {id, en}, actions[]}
```

Tambahkan validasi:

- `slug` unik;
- `image` wajib saat `isPublished` aktif;
- `name`, `title`, dan field editorial wajib tidak kosong;
- order tidak negatif;
- dokumen hanya menerima PDF;
- warning rasio/resolusi tidak memblokir penyimpanan;
- reference partner harus aktif/published untuk muncul di website.

**Gate B:** Studio build lulus dan operator dapat membedakan Produk, Armada,
Partner perusahaan, dan konten halaman Kemitraan.

## Fase C — Query dan adapter kanonis

1. Tambahkan query `product`, `fleetOption`, `partnership`, dan
   `partnershipPage`.
2. Selaraskan type di `lib/sanity-content-types.ts`.
3. Buat adapter server untuk:
   - daftar produk;
   - opsi armada;
   - halaman kemitraan;
   - detail partner.
4. Semua adapter memakai `getSanityClientForCurrentMode()`.
5. Query production harus memfilter `isPublished != false`.
6. Draft preview harus membaca metadata dan media dari perspective yang sama.

**Gate C:** contract test membuktikan item tanpa media wajib tidak dianggap
siap tayang dan draft tidak bocor ke published response.

## Fase D — Frontend wiring bertahap

### Produk

1. Pertahankan layout dan interaksi chart yang sudah ada.
2. Ganti data produk hardcoded dengan adapter `product`.
3. Ganti kapasitas hardcoded di Armada dengan adapter `fleetOption`.
4. Pertahankan fallback lokal hanya jika query kosong/error, dengan logging
   yang jelas.
5. Sambungkan artwork item ke `product.artwork`.
6. Sambungkan visual armada ke `fleetOption.image`.
7. Tambahkan route detail produk jika keputusan Fase A disetujui.
8. Hapus `homePage.productShowcase.media[]` sebagai source aktif setelah
   reference produk kanonis tersedia.

### Kemitraan

1. Ubah `/api/kemitraan` agar memakai `getSanityClientForCurrentMode()`.
2. Ganti `kemitraanPage` legacy query dengan singleton kanonis
   `partnershipPage`.
3. Ganti `mockPartners` dengan:
   - data Sanity bila tersedia;
   - empty state non-misleading bila belum tersedia.
4. Sambungkan `partnership.image`, `logo`, dan dokumen owner.
5. Tambahkan route detail partner atau preview URL berdasarkan keputusan Fase A.
6. Hentikan `homePage.partnershipShowcase.media[]` sebagai source aktif setelah
   reference partner kanonis tersedia.

**Gate D:** halaman tetap memiliki fallback aman, tetapi tidak menampilkan
mock partner sebagai data resmi.

## Fase E — Migration dry-run dan Content Lake

1. Inventaris sumber lama:
   - `homePage.productShowcase.media[]`;
   - `homePage.partnershipShowcase.media[]`;
   - asset lokal produk, armada, dan partnership;
   - mock partner dan dokumen contoh.
2. Buat mapping source → owner target tanpa mutation.
3. Tandai konflik slug, asset duplikat, item tanpa owner, dan dokumen tanpa
   pasangan partner.
4. Minta persetujuan content owner.
5. Jalankan mutation idempotent hanya setelah dry-run diterima.
6. Verifikasi published dan draft asset per item.

**Gate E:** validator menunjukkan 0 blocking error untuk domain Produk dan
Kemitraan.

## Fase F — Operator acceptance dan cleanup

Skenario operator:

1. Membuat produk baru dan mengisi artwork.
2. Mengubah spesifikasi produk tanpa menyentuh layout.
3. Menambah opsi armada dan memilih gambar.
4. Membuat partner baru, logo, gambar, dan dokumen.
5. Mengubah intro/process/closing Kemitraan.
6. Menyimpan draft dan membuka preview item/halaman.
7. Publish lalu memastikan production berubah.
8. Menonaktifkan item dan memastikan tidak tampil.
9. Mengosongkan asset wajib dan memastikan validasi/warning jelas.

Setelah lulus:

- hapus mock data;
- kurangi fallback lokal secara bertahap;
- hapus source query legacy;
- ubah status blueprint dan milestone menjadi ready.

## Urutan prioritas

| Prioritas | Pekerjaan |
|---|---|
| P0 | Freeze model product, fleetOption, partnership, partnershipPage |
| P0 | Hilangkan risiko mock partner tampil sebagai data resmi |
| P1 | Schema + validation + Structure Builder |
| P1 | Query/adapter Draft Mode-aware |
| P1 | Frontend wiring item owner |
| P1 | Dry-run mapping dan approval content owner |
| P2 | Route detail slug dan SEO |
| P2 | Pengurangan fallback dan pembersihan asset legacy |

## Definition of done

- Operator dapat mengelola produk, armada, partner, dan konten halaman tanpa
  developer.
- Satu item hanya memiliki satu owner media kanonis.
- Home dan halaman detail memakai dokumen item yang sama.
- Draft preview dan published response terpisah.
- Tidak ada mock partner yang tampil sebagai data resmi.
- Validator, typecheck, lint, build, dan operator acceptance lulus.
