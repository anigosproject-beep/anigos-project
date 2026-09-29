---
document_type: implementation-phase
phase: 2
status: implemented
depends_on: [01-foundation]
primary_files:
  - ../../studio-anigos-project/schemaTypes/index.ts
verify: npm run build
---

# Langkah 2 — Content Model

## Tujuan

Membuat schema yang memisahkan konten yang dapat diedit operator dari struktur layout yang tetap.

## Jenis konten utama

### Singleton

Hanya boleh ada satu dokumen:

- `homePage`
- `siteSettings`

### Koleksi

Dapat memiliki banyak dokumen:

- `article`
- `publicationDocument`
- `companyDocument`
- `teamMember`
- `teamDivision`
- `pageHero`
- `mediaAsset`
- `product`
- `fleetOption`
- `partnership`
- `partnershipPage` (singleton)

## Aturan model

### Artikel

Field wajib:

- Judul
- Slug
- Ringkasan
- Kategori
- Tanggal publikasi
- Gambar
- Isi artikel

### Dokumen

Pisahkan secara operasional:

- Dokumen Kemitraan
- Dokumen Legalitas
- Dokumen Publikasi

File PDF wajib diisi. Gunakan status tampil/nonaktif untuk menyembunyikan dokumen tanpa menghapus riwayat.

### Struktur organisasi

Alur field:

```text
Jabatan
├── Komisaris → Jabatan resmi
├── Direksi → Jabatan resmi
└── Tim dan Divisi
    ├── Divisi
    └── Posisi
        ├── Kepala Divisi
        ├── Tim Divisi
        └── Lainnya → Posisi lainnya
```

### Media

Media selalu memiliki:

```text
Halaman → Segmen → Elemen media → Asset
```

Operator tidak mengetik nama halaman atau segmen secara bebas.

### Produk, armada, dan kemitraan

Domain Produk/Kemitraan kini memiliki model Studio kanonis yang terpisah dari
global media slot:

- `product` memiliki artwork dan spesifikasi per produk.
- `fleetOption` memiliki kapasitas, moda, catatan, dan foto armada.
- `partnership` memiliki identitas partner, gambar, logo opsional, dan dokumen
  partner.
- `partnershipPage` memiliki isi halaman dan reference ke partner yang
  ditampilkan.

Model ini baru menjadi surface editorial. Query frontend dan migrasi data belum
diaktifkan sampai contract test dan keputusan fallback selesai.

## Kriteria selesai

- Field wajib jelas.
- Field kondisional hanya muncul saat diperlukan.
- Schema tidak memberi operator akses mengubah layout.
- Preview dokumen menampilkan informasi yang berguna.
