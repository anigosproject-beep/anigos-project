---
document_type: implementation-phase
phase: 6
status: active
depends_on: [01-foundation, 02-content-model, 07-frontend-integration]
primary_files:
  - ../../studio-anigos-project/sanity.config.ts
  - ../../lib/
verify: npm run build
---

# Langkah 6 — Draft, Preview, dan Publishing

## Production dan preview

Production menggunakan client `perspective: 'published'`. Preview menggunakan
client `perspective: 'drafts'` dan `useCdn: false`. Adapter server dan API
memilih client berdasarkan cookie Draft Mode.

Aktifkan preview:

```text
/api/draft?secret=<SANITY_PREVIEW_SECRET>&slug=/artikel
```

Keluar dari preview:

```text
/api/disable-draft?slug=/artikel
```

## Alur operator

```text
Edit → Simpan draft → Preview → Periksa → Publish → Verifikasi website
```

Bedakan status Sanity (`draft`/`published`) dari status bisnis (`isPublished` atau `isActive`).

## Kriteria selesai

- Draft tidak tampil di production.
- Preview membaca draft.
- Operator dapat membuka halaman terkait dari dokumen.

Status implementasi: selesai diverifikasi pada 2026-09-20.

- Endpoint enable/disable Draft Mode tersedia.
- Home, Home Hero, Page Hero, newsroom, dokumen, publikasi, site settings, dan
  organisasi mengikuti perspective Draft Mode.
- Production tetap published-only saat cookie preview tidak aktif.
- Server-side Sanity client memakai `SANITY_AUTH_TOKEN` untuk membaca draft dan
  `fetch.cache = 'no-store'` agar hasil published tidak tersimpan dan terbaca
  ulang pada request preview.
- Verifikasi end-to-end berhasil: marker draft tampil hanya dengan cookie
  preview; request tanpa cookie dan setelah disable kembali tidak menampilkan
  marker tersebut.
