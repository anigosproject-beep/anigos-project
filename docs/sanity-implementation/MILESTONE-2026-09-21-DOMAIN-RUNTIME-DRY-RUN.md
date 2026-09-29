---
document_type: milestone
project: petro-anigos
milestone: domain-runtime-and-migration-dry-run
date: 2026-09-21
status: accepted-with-gate
---

# Milestone — Domain Runtime dan Migration Dry-Run

## Cakupan

Pekerjaan dilakukan bertahap tanpa mutation Content Lake:

1. adapter runtime Produk;
2. adapter runtime Armada;
3. adapter runtime Kemitraan;
4. validator canonical domain;
5. migration dry-run published-only.

## Hasil implementasi

- Produk memakai `getSanityProducts()` dan endpoint `/api/products`.
- Armada memakai `getSanityFleetOptions()` dan endpoint `/api/fleet`.
- Kemitraan memakai `getSanityPartnershipPage()` melalui `/api/kemitraan`.
- Endpoint Produk dan Armada meneruskan locale ke query canonical sehingga
  label localized tidak bergantung pada nilai default GROQ.
- Home Product Showcase memakai reference Produk canonical dan `artwork` sebagai
  owner media utama; media showcase legacy tetap hanya sebagai fallback migrasi.
- Home Partnership Showcase tetap menggunakan ilustrasi peluang kemitraan yang
  bersifat presentasional; reference partner canonical tidak dipaksakan ke slot
  peluang yang semantiknya berbeda.
- Semua adapter memilih client published/drafts berdasarkan Draft Mode.
- Fallback Produk dan Armada hanya digunakan ketika Content Lake belum
  mengembalikan item valid; fallback tidak melakukan mutation.
- Partner inactive tidak dirender dari reference `partnershipPage`.
- Mock partner dan dokumen contoh tidak menjadi fallback publik.
- Validator kini memeriksa artwork Produk, gambar Armada, gambar Partner,
  status publish, serta reference partner inactive.

## Bukti validasi

| Pemeriksaan | Hasil |
|---|---|
| Frontend typecheck | Lulus |
| Frontend lint | Lulus |
| Content contract check | Lulus |
| Studio build setelah seluruh wiring | Lulus |
| Content validator published-only | 0 error, 36 warning asset kosong |
| Migration dry-run | 0 mutation |
| Domain documents published | 0 Produk, 0 Armada, 0 Partner, 0 Halaman Kemitraan |
| Legacy review | 3 kategori newsroom memerlukan review manual |

Laporan:

- [`CONTENT-VALIDATION-2026-09-21.json`](./CONTENT-VALIDATION-2026-09-21.json)
- [`MIGRATION-DRY-RUN-2026-09-21.json`](./MIGRATION-DRY-RUN-2026-09-21.json)

## Analisis penyesuaian

Karena domain Content Lake masih kosong, runtime belum menghapus fallback Produk
dan Armada. Ini disengaja agar halaman tetap berfungsi tanpa menyamarkan status
integrasi. Fallback akan dikurangi setelah dokumen canonical disetujui,
dimigrasikan, dan lolos validator.

Migration dry-run menemukan tiga `newsroomCategory` legacy tanpa target
canonical otomatis. Ketiganya ditandai manual-review dan tidak dimutasi.

## Gate berikutnya

1. Persetujuan content owner untuk dokumen Produk, Armada, Partner, dan halaman
   Kemitraan.
2. Mapping asset lama ke owner canonical.
3. Seed/mutation idempotent hanya setelah approval.
4. Preview dengan data domain nyata.
5. Operator acceptance desktop dan Android.
