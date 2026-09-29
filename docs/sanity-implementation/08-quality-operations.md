---
document_type: implementation-phase
phase: 8
status: active
depends_on: [04-media-slots, 05-validation, 07-frontend-integration]
primary_files:
  - ../../studio-anigos-project/scripts/
  - ../../scripts/
verify: npm run build
---

# Langkah 8 — Quality dan Operations

## Script target

```text
seed-media-slots.mjs
validate-content.mjs
migrate-v*.mjs
report-media-slots.mjs
```

`validate-content.mjs` sudah tersedia di active Studio dan berjalan read-only
terhadap perspective `published`. Jalankan dari `studio-anigos-project`:

```bash
npm run validate:content -- --output validation-report.json
```

Tambahkan `--strict-warnings` bila warning asset juga harus membuat command
gagal. File report berisi error, warning, jumlah dokumen, dan metadata scan;
credential tidak pernah ditulis ke report.

Dry-run migrasi juga sudah tersedia:

```bash
npm run migrate:dry-run -- --output migration-dry-run.json
```

Dry-run membaca tipe legacy `newsroomArticle`, `newsroomCategory`, dan
`legalDocument` tanpa mutation. Baseline 20 September 2026 menemukan 3
`newsroomCategory` legacy dan tidak menemukan artikel legacy atau dokumen legal
legacy. Kategori tersebut masuk exception manual karena model artikel kanonis
menggunakan kategori string, bukan collection kategori terpisah.

## Pemeriksaan minimum

- Hero tanpa gambar.
- Media slot tanpa asset.
- Artikel published tanpa gambar/kategori.
- Dokumen published tanpa file.
- Duplicate `slotKey`.
- Duplicate posisi hero.
- Reference divisi putus.

## Aturan migration

- Sediakan mode dry-run.
- Jangan menghapus data pada migration pertama.
- Simpan laporan ID yang diubah.
- Uji pada dataset non-production jika tersedia.
- Seed dan migration harus idempotent.

## Kriteria selesai

Ada laporan konten tidak lengkap dan pemeriksaan sebelum deployment. Baseline
pertama berhasil dengan `0` error blocking dan `36` warning asset kosong pada
dataset published; warning tersebut menjadi daftar pengisian konten operator,
bukan kegagalan schema atau build. Dry-run migrasi selesai tanpa mutation dan
menghasilkan 3 exception kategori legacy untuk keputusan manual.
