---
document_type: implementation-phase
phase: 3
status: implemented
depends_on: [01-foundation, 02-content-model]
primary_files:
  - ../../studio-anigos-project/structure.ts
verify: npm run build
---

# Langkah 3 — Operator Structure

## Tujuan

Menyusun Studio berdasarkan pekerjaan operator, bukan nama teknis schema.

## Menu target

```text
Mulai di Sini
├── Beranda — Hero & Konten
├── Ganti Gambar Hero Halaman
├── Ganti Gambar Segmen
└── Struktur Organisasi
Artikel & Publikasi
├── Artikel
└── Dokumen Publikasi
Dokumen Perusahaan
├── Dokumen Kemitraan
└── Dokumen Legalitas
Kontak & Alamat
Data Pendukung
└── Divisi
```

## Aturan

- Gunakan label Bahasa Indonesia.
- Jangan menampilkan `_type` atau ID internal sebagai menu utama.
- Singleton dibuka langsung dan tidak boleh diduplikasi.
- Koleksi diberi nama berdasarkan pekerjaan operator.
- Daftar operator menampilkan status dan thumbnail.
- Lokasi halaman, segmen, dan slot pada media seeded bersifat read-only;
  operator hanya mengganti asset, catatan, dan status tayang.
- Alat teknis seperti Vision tidak ditampilkan pada Studio operator.

## Kriteria selesai

Operator dapat menemukan tugas tanpa mengetahui nama schema dan tidak dapat
memindahkan media seeded ke lokasi lain secara tidak sengaja.
