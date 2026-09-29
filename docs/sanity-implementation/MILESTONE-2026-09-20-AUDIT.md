---
document_type: milestone
project: petro-anigos
milestone: implementation-audit
date: 2026-09-20
status: accepted
---

# Milestone — Audit Implementasi dan Blueprint

## Hasil audit

Implementasi aktif sesuai dengan arah blueprint: Studio kanonis menggunakan
Content Registry, navigasi operator berbasis lokasi, schema dengan validasi
operator, stable media slots, serta wiring frontend bertahap dengan fallback
aman.

Validasi terakhir:

- Active Sanity Studio build: lulus.
- Frontend typecheck: lulus.
- Frontend lint: lulus.
- Frontend production build: lulus.
- 47 route Next.js berhasil digenerate.

## Goal yang sudah tercapai

- Content Registry: 24 halaman, 20 page hero, dan 15 media slot.
- Seed stable ID dan seed idempotent.
- Home Hero dengan validasi posisi 1–4 dan media kondisional.
- Structure Builder berbasis lokasi halaman dan slot.
- Page Hero terhubung melalui `pageKey` dan endpoint.
- Adapter artikel, publikasi, dokumen perusahaan, organisasi, dan site settings
  sudah memakai kontrak kanonis.
- Slot `home/tentang-kami/background` terhubung ke section Tentang Kami.
- Slot `home/publikasi/thumbnail` terhubung sebagai fallback spesifik kartu
  Publikasi homepage.
- Konfigurasi Studio legacy tidak lagi menjadi source of truth atau runnable
  Studio.

## Gap yang diterima dan masih terbuka

- Preview draft sudah diimplementasikan, tetapi verifikasi visual dengan draft
  Content Lake masih perlu dilakukan.
- Validator kontrak konten/media batch sudah tersedia; baseline pertama memiliki
  0 error blocking dan 36 warning asset kosong.
- Migrasi konten legacy ke model kanonis belum dilakukan.
- Fallback lokal belum dapat dikurangi sebelum data published diverifikasi.
- Media item-level Produk, Kemitraan, Artikel, Publikasi, Legalitas, dan Struktur
  belum dipaksakan ke slot global.
- Operator acceptance test belum dijalankan.
- Warning multiple lockfiles pada Next.js masih ada, tetapi bukan build failure.
- Audit UX operator menemukan lokasi media masih perlu dikunci dan alat teknis
  perlu disembunyikan; perbaikan ini dilakukan sebelum migrasi dimulai.
- Audit UX selesai: field lokasi media seeded sekarang read-only dan Vision
  disembunyikan dari Studio operator.
- Dry-run migrasi selesai tanpa mutation; hanya 3 kategori newsroom legacy yang
  memerlukan keputusan manual.

## Keputusan milestone

Blueprint dinyatakan **selaras dengan implementasi aktual**, dengan status
readiness **belum production-ready penuh** sampai gap di atas memiliki bukti
verifikasi.

## Langkah berikutnya

1. **Membangun validator kontrak konten/media batch** — selesai
   - Mode laporan tanpa mutation.
   - Periksa slot kosong atau tidak aktif.
   - Periksa page hero tanpa gambar.
   - Periksa Home Hero tanpa media wajib atau posisi duplikat.
   - Periksa artikel/dokumen published yang kehilangan asset wajib.
   - Periksa reference divisi dan asset yang putus.
   - Keluarkan exit code non-zero untuk error blocking dan report terstruktur.

2. **Menyelesaikan preview draft** — implementasi selesai, verifikasi visual masih terbuka
   - Pisahkan client published dan draft.
   - Hubungkan preview route dengan secret yang sudah tersedia.
   - Verifikasi preview Home, Page Hero, artikel, dokumen, dan site settings.
   - Pastikan production tetap published-only.

3. **Dry-run migrasi konten** — selesai tanpa mutation
   - Inventaris data legacy.
   - Buat mapping ke schema kanonis.
   - Laporkan item yang tidak dapat dipetakan.
   - Jangan menghapus atau menimpa data pada dry-run.

4. **Migrasi terkontrol dan verifikasi published**
   - Jalankan mutation idempotent setelah dry-run diterima.
   - Verifikasi route dan asset dari Content Lake published.
   - Kurangi fallback hanya setelah setiap domain memiliki bukti.

5. **Operator acceptance test**
   - Uji Home Hero, Page Hero, media halaman, artikel, publikasi, dokumen,
     kontak, divisi, anggota, preview, publish, dan disable.
   - Catat friksi operator dan perbaiki label atau struktur Studio.

6. **Final readiness gate**
   - Semua quality checks lulus.
   - Preview draft terbukti.
   - Migration report selesai.
   - Operator acceptance lulus.
   - Baru kemudian tandai CMS siap operasional penuh.
