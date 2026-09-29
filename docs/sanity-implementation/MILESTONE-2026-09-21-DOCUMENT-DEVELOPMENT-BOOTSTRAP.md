# Milestone: Document Development Bootstrap

Tanggal: 21 September 2026

## Capaian

Struktur Dokumen pada Studio aktif sudah digunakan untuk membuat draft
development dari file yang tersedia di `public`:

- 2 Dokumen Kemitraan:
  - Company Profile Kemitraan Transportir
  - Formulir Pendaftaran Kemitraan
- 1 Dokumen Publikasi:
  - Mock Company Profile
- 0 Dokumen Legalitas, karena belum ada file legalitas yang dapat dikonfirmasi.

Semua file diunggah sebagai Sanity file asset dengan label:

`DEVELOPMENT MOCK - REPLACE BEFORE PUBLISH`

Semua dokumen dibuat sebagai draft `drafts.*` dengan `isPublished: false`.
Production perspective tidak melihat dokumen tersebut.

## Script

- `npm run seed:documents:development:dry-run`
- `npm run seed:documents:development:apply`

## Validasi

- Draft perspective: 2 kemitraan, 0 legalitas, 1 publikasi.
- Published content validator: 0 error.
- Frontend typecheck: lulus.
- Tidak ada dokumen development yang dipublish.

## Catatan screenshot

Halaman Sanity yang menampilkan `Studios and Applications (0)` berarti Studio
belum dideploy/terdaftar pada organisasi tersebut. Ini tidak membatalkan schema
lokal atau data Content Lake. Operator belum dapat memakai UI hosted sampai
Studio dideploy dengan `npm run deploy`.

Deployment Studio sengaja belum dijalankan otomatis karena merupakan perubahan
publikasi environment dan memerlukan keputusan deployment terpisah.

## Gate berikutnya

1. Deploy Studio ke host Sanity.
2. Operator membuka menu Dokumen Kemitraan dan Dokumen Publikasi.
3. Operator memeriksa draft mock dan preview.
4. Asset resmi menggantikan mock.
5. Dokumen Legalitas ditambahkan setelah file resmi tersedia.
6. Approval dan publish dilakukan terpisah.
