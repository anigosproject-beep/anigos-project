---
document_type: implementation-phase
phase: 5
status: partial
depends_on: [02-content-model]
primary_files:
  - ../../studio-anigos-project/schemaTypes/index.ts
verify: npm run build
follow_up: asset dimension warnings and duplicate-position validation
---

# Langkah 5 — Validation

## Error yang memblokir publish

- Field wajib kosong.
- PDF tidak ada.
- Gambar hero tidak ada.
- Video tidak memiliki poster.
- Tim dan Divisi tidak memiliki divisi.
- Posisi `Lainnya` tidak memiliki posisi manual.
- Posisi hero duplikat.

## Warning yang tidak memblokir publish

- Resolusi rendah.
- Rasio kurang ideal.
- Thumbnail belum tersedia.
- Alt text terlalu panjang.
- Ukuran video besar.

## Aturan asset

- Hero: sekitar 16:9, ideal 1920×1080.
- Thumbnail: sekitar 3:2.
- Artwork: mengikuti kebutuhan komponen.

Validasi schema berlaku di Studio. Script API harus memiliki pemeriksaan sendiri.

## Kriteria selesai

- Pesan memakai bahasa operator.
- Field tersembunyi tidak menghasilkan error palsu.
- Frontend memiliki fallback jika data belum lengkap.

