---
document_type: implementation-phase
phase: 4
status: registry-guard-and-repair-checker-implemented; live-apply-not-run
depends_on: [01-foundation, 02-content-model, 03-operator-structure]
primary_files:
  - ../../studio-anigos-project/sanity/schemaTypes/pageMediaEditor.ts
  - ../../studio-anigos-project/scripts/check-media-slots.mjs
  - ../../studio-anigos-project/scripts/seed-marine-fuel-slots.mjs
verify: npm run build
blocker: general seed is absent; Marine Fuel seed needs approved apply and media upload
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

## Perlindungan slot media

Registry di `studio-anigos-project/sanity/page-media-registry.ts` menjadi sumber
kontrak slot section, dan `page-hero-registry.ts` menjadi sumber slot Page Hero.
Editor section menonaktifkan operasi tambah/hapus/duplikasi pada array,
memvalidasi slot wajib, duplikasi, dan ID yang tidak terdaftar untuk halaman
yang sedang dipilih, serta menyediakan pemulihan metadata slot yang hilang.
Editor Page Hero juga memvalidasi keberadaan slot halaman yang sedang dipilih
dan menyediakan tindakan pemulihan jika object slot terhapus. Operator tetap
dapat mengganti atau mengosongkan asset sesuai alur editorial.

Di Studio, tindakan `delete` dan `unpublish` disembunyikan untuk dokumen
singleton media/hero dan dokumen `mediaAsset`. Pemeriksaan
`npm run check:media-slots` membandingkan seluruh slot section dan Page Hero
dengan registry masing-masing secara read-only. Perintah
`npm run repair:media-slots:dry-run` memberi ringkasan slot yang hilang atau
konflik. Perintah `npm run repair:media-slots:apply` menambah hanya metadata
slot yang hilang; ia memerlukan target dan token yang ditetapkan eksplisit,
konfirmasi target eksplisit melalui `SANITY_MEDIA_SLOTS_CONFIRM_TARGET`,
terkunci ke target pada script, memakai revision guard, serta memverifikasi
ulang hasilnya. Konflik dan ID duplikat menghentikan repair otomatis.

Slide Home Hero dan logo produk tetap merupakan konten editorial berjumlah
fleksibel, bukan slot layout tetap. Schema Home Hero mewajibkan sedikitnya satu
slide dan media untuk jenis yang dipilih; penghapusan item tetap bagian dari
workflow editorial.

Ukuran video Marine Fuel yang melewati batas aplikasi 32 MiB tidak dikirim
sebagai URL playback oleh API; UI mempertahankan placeholder dan menampilkan
peringatan. Batas ukuran mengurangi risiko file besar, tetapi Sanity `file`
tetap bukan layanan transcoding/adaptive streaming; untuk video publik bertrafik
tinggi, gunakan layanan video khusus sebelum rollout skala besar.

**Batas perlindungan:** kontrol Studio dan validasi schema tidak membatasi
mutasi langsung melalui API Content Lake, token dengan hak tulis, migrasi, atau
penghapusan dataset. Script repair juga tidak mengunggah atau mengganti media
asset; ia hanya memperbaiki metadata slot yang hilang. Pertahankan hak akses
minimum dan backup, jalankan dry-run sebelum apply, dan jangan menganggap
perlindungan live aktif sampai target produksi serta hasil build Studio
diverifikasi.

## Alur Home dan cache Next.js

`/api/home` kini mengambil konten Home, media legacy, dan slot pendukung lewat
satu query GROQ agregat, bukan tiga permintaan Content Lake. Data published
di-cache per locale selama 60 detik dan cache invalidasi dipicu oleh perubahan
`homePage`, `pageMediaEditor`, serta `mediaAsset`; draft mode tetap bypass cache.
Respons Route Handler tetap `no-store` karena endpoint ini bergantung pada mode
draft dan locale yang dipilih browser.

Homepage sekarang mengambil konten agregat di Server Component dan mengirimkan
hasil awal ke provider client, sehingga konten utama tampil pada render server
tanpa menunggu fetch `/api/home`. Locale dipilih dari cookie server; pilihan
localStorage yang berbeda tetap didukung dan memicu pembaruan data setelah
hydrasi. API dipertahankan untuk perubahan locale sisi klien dan kompatibilitas
consumer lain.

Implementasi mempertahankan `unstable_cache` yang sudah digunakan proyek agar
perubahan cache tidak bercampur dengan migrasi model; dokumentasi Next.js 16
menyarankan `use cache` sebagai penggantinya. Jadwalkan migrasi terpisah setelah
Cache Components diaktifkan dan skenario draft/webhook diverifikasi.

Referensi komunitas diperlakukan sebagai sinyal kehati-hatian, bukan sebagai
spesifikasi: [vercel/next.js#52126](https://github.com/vercel/next.js/issues/52126)
(32 reaksi 👍, Next 13.4.7; isu request deduplication ditutup tanpa PR tertaut)
dan [vercel/next.js#55960](https://github.com/vercel/next.js/issues/55960)
(28 reaksi 👍, Next 13.5.2; laporan kesulitan tag revalidation) mengingatkan
agar jumlah fetch dan invalidasi tag diverifikasi pada aplikasi nyata. Keduanya
lebih lama dari Next.js yang dipakai proyek, sehingga bukan bukti adanya bug
yang sama pada Next 16.

## Seed

Dokumentasi historis merujuk script umum:

```text
studio-anigos-project/scripts/seed-media-slots.mjs
```

Script umum tersebut dan perintah `seed:media-slots:*` tidak ada pada workspace.
Untuk scope Marine Fuel tersedia seed terpisah:

```powershell
Set-Location .\studio-anigos-project
$env:SANITY_STUDIO_PROJECT_ID = "6zvti7ob"
$env:SANITY_STUDIO_DATASET = "production"
npm run seed:marine-fuel:dry-run
```

Dry-run read-only tidak memerlukan token dan terkunci ke `6zvti7ob/production`.
Pada pemeriksaan 2026-10-02, dry-run berhenti karena metadata
`home-marine-fuel-video` berbeda pada `containerRatio`; seed tidak menulis data.
Query langsung setelahnya mengonfirmasi slot Home background dan video sudah
ada tetapi keduanya belum memiliki asset. Kedua slot Produk belum ada. Jadi
seed saat ini tidak bisa dipakai untuk repair sampai konflik metadata Home
video ditinjau. Apply tidak dijalankan.

Schema `pageMediaEditor` memisahkan gambar latar dan file video menjadi slot
image/video yang dapat diganti operator di Sanity; keduanya tidak berbagi
field/asset. Lapisan gradient gelap yang menimpa gambar saat ini adalah CSS
tetap pada komponen, bukan field CMS. Jadi gambar latar dan video memang
dirancang editable di CMS, tetapi belum berisi asset live; slot Produk juga
belum dibuat. UI menggunakan gambar lokal dan placeholder video. Mengubah
intensitas/warna gradient memerlukan perubahan kode, bukan edit media di Studio.

## Slot yang dibuat

- Hero halaman untuk setiap halaman yang memiliki Page Hero.
- Media section Beranda.
- Media artikel dan publikasi.
- Media profil, kemitraan, legalitas, struktur, produk, dan armada.

## Status live dan kriteria selesai

Read-only query pada `6zvti7ob/production` menemukan empat slot yang diperlukan
oleh dua section. Home background dan video ada, tetapi tidak memiliki asset;
slot video Home memiliki metadata `containerRatio` yang berkonflik dengan seed.
Dua slot Produk (background dan video) belum ada. API kedua variant merespons
HTTP 200 tetapi tanpa background maupun video; komponen karena itu memakai
fallback gambar lokal dan placeholder video. Belum ada mutation yang dijalankan.

- Tidak ada duplikasi slot.
- Setiap slot memiliki label operator.
- Slot yang sudah berisi gambar tidak berubah ketika seed diulang.
- Operator dapat membuka slot dari menu Studio.

## Verifikasi perlindungan

Build Studio berhasil setelah validasi slot Page Hero, panel pemulihan, dan
penguncian tindakan hapus/unpublish diterapkan. Tracking read-only Marine Fuel
terbaru mengonfirmasi ketidaklengkapan di atas serta satu konflik metadata
`containerRatio` pada slot video Home. Konflik itu menyebabkan dry-run seed
berhenti; belum ada write yang dilakukan.

`npx tsc --noEmit` juga melaporkan dua error yang tidak terkait di
`sanity/schemaTypes/partner.ts:209` (`value` mungkin `undefined`); build Sanity
tetap berhasil. Error tersebut tidak diubah sebagai bagian dari perlindungan
slot media.
