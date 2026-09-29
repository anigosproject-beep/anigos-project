---
document_type: milestone
project: petro-anigos
milestone: product-partnership-structural-audit
date: 2026-09-20
status: accepted
---

# Milestone — Audit Struktural Produk dan Kemitraan

## Cakupan

Audit read-only terhadap route, komponen, query, API, schema Studio, Content
Lake published, media owner, fallback, dan kesiapan operator non-programmer.
Tidak ada mutation atau migrasi data yang dilakukan.

## Bukti utama

| Pemeriksaan | Hasil |
|---|---|
| Dokumen published `product` | 0 |
| Dokumen published `partnership` | 0 |
| Dokumen published `kemitraanPage` | 0 |
| Page hero Produk (`kenali-produk`, `armada`, `penawaran`) | tersedia |
| Page hero Kemitraan | tersedia |
| Route `/produk` | belum ada |
| Schema `product` aktif | belum ada |
| Schema `partnership` aktif | belum ada |

## Status kesiapan

### Produk

Frontend siap sebagai halaman presentational dengan data hardcoded dan fallback.
Belum siap sebagai CMS karena daftar produk, spesifikasi, artwork, dan
kapasitas armada belum memiliki owner editorial kanonis.

### Kemitraan

UI detail, tabel, PDF panel, prinsip, dan CTA tersedia. Belum siap sebagai CMS
karena query mengarah ke `_type == "kemitraanPage"` yang tidak ada pada schema
aktif, tidak ada schema `partnership`, dan fallback masih berisi mock partner.

## Gap yang diterima

- Produk belum memiliki schema `product` dan route detail berbasis slug.
- Armada belum diputuskan apakah menjadi `fleetOption` terpisah atau bagian
  dari domain produk.
- Kemitraan belum memiliki `partnershipPage` dan `partnership`.
- API Kemitraan belum memakai client Draft Mode-aware.
- Media Home showcase dan media halaman domain masih berpotensi menjadi dua
  sumber data.
- Mock partner belum aman untuk dianggap sebagai data produksi.
- Page hero `produk` berpotensi orphan karena route `/produk` belum ada.
- Kontrak dokumen portfolio/dokumentasi partner belum dibakukan.

## Keputusan milestone

Halaman Produk dan Kemitraan dinyatakan **siap untuk tahap desain dan
keputusan domain**, tetapi **belum siap untuk operator handoff atau migrasi
konten**. Implementasi harus mengikuti rencana optimasi pada
[`PRODUCT-PARTNERSHIP-OPTIMIZATION-PLAN-2026-09-20.md`](./PRODUCT-PARTNERSHIP-OPTIMIZATION-PLAN-2026-09-20.md).

Tidak boleh membuat slot global tambahan untuk menutupi ketiadaan owner item.

## Progress lanjutan

Keputusan domain tahap pertama sudah diwujudkan pada Studio tanpa mutation
Content Lake:

- schema `product`;
- schema `fleetOption`;
- schema `partnership`;
- singleton `partnershipPage`;
- tipe pendukung `localizedText`;
- navigasi operator pada menu Data Pendukung.

Validasi:

- Sanity Studio build: lulus.
- Frontend typecheck: lulus.
- Runtime frontend masih memakai consumer lama sampai Fase C/D.

## Contract alignment milestone

Status: **selesai**

- Struktur `partnershipPage` disamakan dengan query `hero`, `intro`,
  `partners`, `process`, dan `closing`.
- Query kanonis `PRODUCT_QUERY` dan `FLEET_OPTIONS_QUERY` ditambahkan dengan
  filter `isPublished != false` serta pengurutan stabil.
- API `/api/kemitraan` sekarang memilih client published atau drafts sesuai
  Draft Mode.
- Mock partner dan dokumen contoh tidak lagi menjadi fallback publik.
- Typecheck, lint, content contract check, dan Studio build lulus.

Gate berikutnya tetap migration dry-run dan operator acceptance; tidak ada
mutation Content Lake otomatis pada milestone ini.
