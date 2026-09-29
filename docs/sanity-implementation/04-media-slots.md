---
document_type: implementation-phase
phase: 4
status: seeded-and-verified
depends_on: [01-foundation, 02-content-model, 03-operator-structure]
primary_files:
  - ../../studio-anigos-project/schemaTypes/index.ts
  - ../../studio-anigos-project/scripts/seed-media-slots.mjs
verify: npm run build; npm run seed:media-slots:dry-run
blocker: none
---

# Langkah 4 — Media Slot Pre-seeded

## Tujuan

Operator membuka slot media yang sudah tersedia dan hanya mengganti asset, tanpa membuat dokumen media dari nol.

## Pola data

```text
pageHero
├── slotKey
├── page
├── image
└── isActive

mediaAsset
├── slotKey
├── label
├── page
├── section
├── slot
├── image
└── isActive
```

## Stable ID

Contoh:

```text
media-hero-profil-perusahaan
media-slot-home-tentang-kami-background
```

Stable ID mencegah slot ganda dan membuat query frontend konsisten.

## Seed

Script:

```text
studio-anigos-project/scripts/seed-media-slots.mjs
```

Perintah dry-run:

```powershell
Set-Location .\studio-anigos-project
$env:SANITY_AUTH_TOKEN = "token-lokal"
npm run seed:media-slots:dry-run -- --output ..\docs\sanity-implementation\MEDIA-SEED-DRY-RUN.json
```

Script menggunakan `createIfNotExists`, sehingga aman dijalankan ulang dan tidak
menimpa gambar yang telah dipilih operator. Mutation harus eksplisit dan hanya
dijalankan setelah laporan dry-run direview:

```powershell
npm run seed:media-slots:apply
```

Jika stable ID atau lokasi slot berbeda dari dokumen existing, script berhenti
dan melaporkan conflict.

## Slot yang dibuat

- Hero halaman untuk setiap halaman yang memiliki Page Hero.
- Media section Beranda.
- Media artikel dan publikasi.
- Media profil, kemitraan, legalitas, struktur, produk, dan armada.

## Kriteria selesai

- Tidak ada duplikasi slot.
- Setiap slot memiliki label operator.
- Slot yang sudah berisi gambar tidak berubah ketika seed diulang.
- Operator dapat membuka slot dari menu Studio.
