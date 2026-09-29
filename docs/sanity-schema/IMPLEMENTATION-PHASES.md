# Fase Implementasi Schema Sanity — Petro Anigos

Dokumen ini adalah keputusan kerja setelah audit schema pada folder `romp`.
Blueprint sumber berada di folder ini, sedangkan registry aktif digunakan dari
`studio-anigos-project/sanity`.

## Status pengerjaan

**Fase 1 — Beranda dan debugging: selesai.**  
Baseline production yang terkait Beranda telah divalidasi pada 15 September
2026. Phase 2 berada pada tahap konfigurasi awal; sinkronisasi editorial penuh
dan integrasi form penawaran belum selesai.

### Konfigurasi awal Phase 2 — Jangkauan

Phase 2 memakai pola yang berbeda dari Phase 1:

- Phase 1 berpusat pada singleton `homePage` dengan array hero berurutan.
- Phase 2 memakai singleton `jangkauanPage` untuk konfigurasi halaman dan
  collection `coverageArea` sebagai data operasional yang dapat dipakai ulang.
- `jangkauanPage.serviceAreas.areas` menyimpan reference terurut ke area,
  sedangkan status `coverageArea.active` menentukan apakah area boleh tampil.
- Metadata `island`, `modes`, `icon`, dan body bilingual berada di dokumen
  `coverageArea`, bukan diduplikasi di halaman.
- Query `JANGKAUAN_QUERY` dan endpoint `/api/jangkauan` menjadi adapter runtime
  untuk halaman Jangkauan. Frontend memakai data Sanity yang published dan
  kembali ke data lokal bila belum ada area aktif.

Konfigurasi ini baru mencakup integrasi area layanan. Hero, intro, kapabilitas,
dan panel penutup sudah tersedia dalam query/schema tetapi belum menggantikan
seluruh copy hardcoded di frontend. Form penawaran masih memiliki daftar
wilayah lokal dan akan disinkronkan pada langkah berikutnya setelah fixture
`coverageArea` dipublish.

### Catatan capaian Phase 1

- Studio Sanity memakai struktur menu phase dan Beranda menjadi Phase 1.
- `homePage` menjadi singleton yang mengatur 1–4 hero, posisi unik, status aktif,
  dan maksimal satu slide video.
- Hero mendukung gambar/video, poster video, crop, hotspot, WebM/MP4, serta
  fallback frontend ketika data published belum lengkap.
- Validasi crop memeriksa rasio area hasil crop `1.70–1.82:1`.
- Resolusi di bawah rekomendasi `1920x1080` hanya menghasilkan warning dan tidak
  memblokir publish.
- Error kondisional hero diarahkan ke field yang tepat: `image`, `video`, atau
  `videoPoster`.
- Konten statis Beranda terhubung ke Sanity, sedangkan newsroom tetap dinamis.
- Client aplikasi membaca perspektif `published` tanpa CDN cache untuk
  mempercepat propagasi perubahan yang sudah dipublish.
- Posisi text overlay hero dinaikkan tanpa mengubah padding aman terhadap header.
- Sanity schema validation, Studio build, frontend lint, typecheck, dan
  production build berhasil.
- Sanity Studio dan Vercel Production telah dideploy dan dapat diakses.

### Pemeriksaan dampak dan risiko pasca-Phase 1

Pemeriksaan regresi dilakukan pada schema aktif, route/query contract, endpoint
Beranda, konfigurasi client Sanity, dan production build.

Hasil yang aman:

- Registry schema tetap memuat schema legacy newsroom dan tim.
- `npm run check:content-contracts` lulus: 18 route dan 6 form key.
- `npx sanity schema validate` lulus tanpa error atau warning.
- Lint, typecheck, dan build frontend lulus.
- Endpoint `/api/home` dan `/api/home-hero` tetap tersedia.
- File environment lokal dan kredensial dikecualikan dari Git melalui
  `.gitignore`; hanya `.env.example` yang diizinkan.
- Fallback lokal mencegah halaman Beranda kosong saat konten Sanity belum
  published atau media hero belum lengkap.

Risiko yang perlu dipantau sebelum Phase 2:

1. Preview draft belum menjadi kontrak production. `app/api/draft` sudah
   memvalidasi secret dan route internal, tetapi client Sanity production
   menggunakan perspektif `published`; preview draft perlu client/perspective
   khusus sebelum tombol preview Studio diaktifkan.
2. Jika satu atau lebih hero Sanity tidak memiliki media lengkap, adapter
   frontend dapat menolak slide yang tidak valid dan kembali ke fallback lokal.
   Ini aman untuk availability, tetapi dapat membuat editor mengira perubahan
   belum tersambung. Publish checklist harus memastikan media wajib lengkap.
3. Query untuk Phase 1 sudah berjalan, tetapi katalog product/partnership dan
   halaman lain belum seluruhnya memiliki fixture production. Jangan
   menganggap schema yang valid berarti semua reference sudah berisi data.
4. `useCdn: false` mengurangi keterlambatan publish, tetapi meningkatkan
   ketergantungan runtime pada API Sanity. Endpoint tetap perlu dipantau dan
   fallback dipertahankan.

Tidak ditemukan konfigurasi Phase 1 yang menghapus schema legacy, mengubah
route publik secara tidak sengaja, atau memblokir build production.

### Pemetaan fungsi download dan file PDF

Pemetaan ini menjadi baseline sebelum dokumen PDF dipindahkan atau disinkronkan
ke Sanity. Tidak semua file PDF di workspace merupakan asset publik.

| Halaman / fungsi | Implementasi saat ini | File atau sumber | Status |
|---|---|---|---|
| `/artikel/publikasi` | Katalog `publications` hardcoded; tombol `<a download>` | `/public/documents/company-profile-kemitraan-transportir.pdf` | Satu PDF aktif; tiga item masih placeholder |
| `/tentang-kami/kemitraan` | Preview `<iframe>` dan tombol download hardcoded | `/public/documents/company-profile-kemitraan-transportir.pdf` | Aktif dan dipakai langsung |
| `/tentang-kami/legalitas` | Komponen attachment view/download sudah tersedia, tetapi array `documents` kosong | Kandidat schema `legalDocument.file` (Sanity PDF) | Belum ada download publik |
| Form `/tentang-kami/karir` | Upload CV, bukan download publik | Upload PDF/DOC/DOCX ke Firebase melalui `/api/career-applications` | Alur berbeda; tidak dipetakan sebagai publikasi |
| PDF di `docs/company-profile/` | Arsip/source workspace, tidak direferensikan route publik | 10 file `Company Profile PT. Anigos Jaya Perkasa-*.pdf` | Tidak disajikan oleh `public/`; jangan dianggap tersedia di production |

#### Kontrak target untuk PDF publik

- `legalDocument.file` adalah sumber yang tepat untuk dokumen legal yang
  dikelola editor, bukan file yang diduplikasi di banyak halaman.
- Katalog publikasi membutuhkan schema koleksi tersendiri atau referensi
  dokumen yang memiliki `title`, `body`, `category`, `issuedAt`, `file`, dan
  status `published/available`.
- Halaman kemitraan sebaiknya memakai referensi dokumen yang sama apabila PDF
  transportir juga ditampilkan di publikasi; URL lokal jangan dipertahankan
  di dua komponen setelah migrasi.
- Download hanya boleh dirender jika asset file tersedia dan status dokumen
  mengizinkan publikasi. Dokumen tanpa file harus tampil sebagai “belum
  tersedia”, bukan menghasilkan link kosong atau 404.
- Preview PDF dan download harus memakai URL asset yang sama agar editor tidak
  menguji file berbeda dari file yang diunduh pengunjung.

#### Risiko yang ditemukan

1. Katalog `/artikel/publikasi` dan kemitraan menggandakan referensi PDF yang
   sama secara hardcoded.
2. Sepuluh PDF di folder `docs/` belum menjadi asset web dan tidak dapat
   diakses dari URL production.
3. Schema `legalDocument` sudah memiliki field file PDF, tetapi belum dipakai
   oleh query atau adapter halaman legalitas.
4. Belum ada satu sumber data untuk kategori, judul, tanggal, dan status
   ketersediaan publikasi.

Pekerjaan migrasi PDF sebaiknya dilakukan setelah kontrak dokumen ditetapkan:
mulai dari satu dokumen transportir sebagai fixture, kemudian hubungkan
publikasi dan kemitraan ke sumber yang sama sebelum menambah dokumen legal lain.

### Catatan konfigurasi PDF terbaru

- Studio kini memiliki koleksi `publicationDocument` untuk menambah,
  menghapus, dan mengedit PDF publik.
- Field utama: File PDF, Judul, Keterangan, Kategori, Tanggal dokumen, dan
  status `Tampilkan di publikasi`.
- `publicationCategory` menjadi koleksi kategori yang dapat ditambah dan
  diurutkan editor.
- Schema sudah dideploy dan tervalidasi; halaman publikasi belum mengambil
  data koleksi ini sebagai sumber runtime.
- Frontend memiliki komponen presentasi non-core
  `components/publication-card.tsx` dengan layout preview PDF portrait kecil
  di kiri dan judul/keterangan di kanan. Komponen ini masih memakai data
  katalog lokal sampai query publikasi diintegrasikan.

### Media independen untuk showcase Beranda

Segmen Produk dan Kemitraan pada `homePage` sekarang memiliki konfigurasi
media khusus yang tidak mengubah media pada dokumen katalog:

- `productShowcase.media` menghubungkan produk berdasarkan slug dan menyimpan
  visual khusus showcase Beranda. Ini cocok untuk dua produk aktif tanpa
  memaksa artwork katalog dipakai di homepage.
- `partnershipShowcase.media` memakai tiga slot branding tetap:
  `transportasi`, `distribusi`, dan `usaha`. Slot ini sengaja tidak bergantung
  pada dokumen mitra karena tujuannya adalah menyampaikan peluang kemitraan
  baru, bukan menampilkan portofolio mitra tertentu.
- Jika media khusus belum diisi, frontend tetap memakai fallback lokal agar
  Beranda tidak kosong.
- Media halaman Produk dan Kemitraan/detail tetap independen; perubahan visual
  di showcase Beranda tidak mengubah kartu katalog atau halaman detail.

### Foto area layanan

`coverageArea` sekarang mendukung field `image` opsional menggunakan preset
`resourceThumbnail` (rasio target 3:2). Query `JANGKAUAN_QUERY` mengambil URL
dan metadata media Sanity, lalu kartu area di halaman `/jangkauan` menampilkan
foto tersebut jika tersedia. Data area lama tetap valid karena field ini tidak
wajib; kartu akan kembali ke layout tanpa foto. CDN `cdn.sanity.io` juga sudah
diizinkan secara terbatas di konfigurasi `next/image`.

Selesai pada fase ini:

- blueprint datar dirapikan ke struktur folder nested;
- character counter disamakan dengan `Rule.max`;
- media dekoratif dan SVG memiliki konfigurasi eksplisit;
- preset logo dipisahkan;
- route CTA memakai `ROUTE_OPTIONS` dari `ROUTES`;
- hero membatasi maksimal satu slide video tanpa mengunci posisinya;
- slug produk dan lowongan read-only setelah dibuat;
- schema compatibility dicatat di registry blueprint.

Blueprint sudah dihubungkan ke Studio aktif melalui
`studio-anigos-project/sanity`. Schema legacy artikel, kategori, tim, dan media
tetap diregistrasikan dari folder lama agar dataset yang sudah ada tidak
terputus.

## Keputusan yang sudah dikunci

### 1. Strategi bahasa

Halaman korporat baru memakai satu dokumen dengan field:

```ts
{id: string; en?: string}
```

`id` adalah bahasa sumber dan wajib. `en` opsional pada tahap editorial awal,
dengan fallback ke `id` di query.

Schema lama berikut tetap dipertahankan untuk kompatibilitas:

- `newsroomArticle`
- `newsroomCategory`
- `teamMember`

Ketiganya **sengaja monolingual pada fase ini**. Dokumen ini harus diberi
deskripsi Studio bahwa artikel dan struktur organisasi belum memakai pola locale
ID/EN. Jangan mencampurkan field `{id, en}` ke schema lama tanpa migrasi dan
perubahan query yang terpisah.

Keputusan ini menghindari dua hal sekaligus:

1. menghapus schema yang masih dipakai frontend;
2. berpura-pura bahwa artikel/team sudah bilingual padahal belum.

Konversi newsroom ke locale adalah pekerjaan fase terpisah dan tidak menjadi
prasyarat integrasi halaman korporat.

### 2. Hero homepage

- `heroSlides` menerima 1–4 slide sesuai kebutuhan editorial; satu slide tetap
  valid untuk mode hero tunggal.
- Video boleh berada di posisi mana pun.
- Maksimal satu slide memiliki `mediaType == "video"`.
- Slide video wajib memiliki file video dan poster.
- Slide gambar wajib memiliki image.
- Schema tidak mengunci slide pertama sebagai video.

### 3. Counter karakter

Counter Studio harus memakai satuan yang sama dengan `Rule.max` Sanity:

```ts
const length = value.length
```

Jangan memakai `Intl.Segmenter`, spread string, atau klaim "grapheme". Tujuan
counter adalah memberi angka yang identik dengan angka yang menentukan apakah
publish ditolak.

### 4. Validasi video

Schema hanya memvalidasi keberadaan file dan MIME filter upload yang tersedia.
Schema tidak mengklaim dapat memvalidasi codec, durasi, resolusi, atau ukuran
file video.

Aturan produksi video ditulis sebagai deskripsi editorial sampai custom input
yang memeriksa `HTMLVideoElement.duration` dan `File.size` benar-benar dibuat.

### 5. Media dekoratif

Field image memiliki opsi `decorative`.

- Gambar konten: alt ID wajib, alt EN opsional sesuai strategi locale.
- Pattern dekoratif: alt tidak wajib dan boleh kosong.
- Frontend merender pattern dekoratif dengan `alt=""` dan `aria-hidden="true"`.

### 6. Route CTA

`ROUTES` adalah satu-satunya sumber route internal. Daftar pilihan CTA harus
dibangun dari metadata route tersebut, bukan menulis ulang string route di
`shared.ts`.

### 7. Slug dan nilai teknis

Slug produk dan lowongan menjadi read-only setelah dokumen pernah dibuat:

```ts
readOnly: ({document}) => Boolean(document?._createdAt)
```

Field teknis dikelompokkan dalam tab/grup `technical`. Pembatasan role editor
non-teknis perlu dikonfigurasi di permission Studio atau workflow organisasi;
schema sendiri bukan pengganti access control.

### 8. Form field key

`key` pada form CMS bukan string bebas. Query form harus diuji terhadap
konstanta key yang dipakai komponen frontend. Test kontrak wajib gagal jika:

- key CMS tidak dikenal kode;
- key wajib hilang;
- key muncul lebih dari sekali.

### 9. Asset preparation

Asset diproses sebelum upload ke Sanity:

- resize sesuai preset;
- konversi image ke WebP bila sesuai;
- strip EXIF;
- transcode video ke H.264 1080p;
- target video di bawah 10 MB bila kualitas masih layak.

Script `scripts/prepare-assets.ts` baru ditambahkan setelah dependency `sharp`
dan tool ffmpeg diputuskan serta tersedia di environment CI. Jangan menurunkan
standar schema hanya agar asset mentah saat ini lolos.

### 10. Kelengkapan English

Fallback ke Indonesia dipertahankan untuk robustness runtime, tetapi bukan
indikator kelengkapan konten. Dibutuhkan:

- query audit field EN yang kosong;
- view Studio yang menampilkan dokumen/field yang belum diterjemahkan;
- laporan CI atau command editorial yang dapat dijalankan sebelum release.

### 11. Lowongan dan JSON-LD

`jobOpening` akan dipakai untuk menghasilkan `JobPosting` JSON-LD. Data
structured data hanya dirender untuk lowongan aktif dan harus divalidasi agar
tidak menghasilkan `title`, `description`, `datePosted`, atau `hiringOrganization`
yang kosong.

---

## Scope fase kerja

### Scope Fase 1 — Merapikan blueprint dan menjaga kompatibilitas

**Tujuan:** schema baru dapat dikompilasi tanpa menghilangkan schema lama.

- Susun folder `romp` ke struktur `sanity/lib`, `sanity/components`,
  `sanity/schemaTypes/objects`, `documents/singletons`, dan
  `documents/collections`.
- Integrasikan `newsroomArticle`, `newsroomCategory`, dan `teamMember` ke
  registry baru.
- Pertahankan `mediaLibrary` sementara sampai migrasi media selesai.
- Implementasikan `allowSvg` atau hapus option tersebut.
- Tambahkan preset logo terpisah dari `decorativePattern`.
- Pindahkan daftar route CTA ke sumber `ROUTES` terpusat.
- Ubah validasi hero menjadi maksimal satu video tanpa mengunci posisinya.
- Ganti counter menjadi `value.length`.
- Tambahkan flag decorative pada `mediaField` dan kosongkan alt untuk pattern.
- Kunci slug produk dan lowongan setelah dibuat.
- Kurangi `as never` ke helper/type boundary yang benar-benar diperlukan.

**Validasi keluar:**

- typecheck Studio berhasil;
- semua schema lama dan baru terdaftar;
- tidak ada import path datar yang tersisa;
- validation hero, media dekoratif, slug, dan CTA dapat diuji di Studio.

### Scope Fase 2 — Kontrak data dan quality gates

**Tujuan:** schema tidak hanya compile, tetapi memiliki pagar terhadap drift.

- Lengkapi query untuk seluruh halaman, bukan hanya layout/home/topic/career/fleet.
- Buat query kelengkapan EN.
- Buat test kontrak form key terhadap konstanta kode.
- Buat validator `LIMIT` yang membaca tabel batas dari
  `docs/content-page-mapping.md` lalu membandingkannya dengan `LIMIT`.
- Tambahkan test bahwa seluruh route singleton dan route CTA konsisten.
- Tambahkan generator/validator JSON-LD `JobPosting`.
- Pastikan preview URL dan draft endpoint benar-benar tersedia sebelum
  diaktifkan di Studio.

**Validasi keluar:**

- query coverage lengkap untuk seluruh route korporat;
- test form key dan route lulus;
- check mapping-vs-LIMIT lulus;
- audit translation dapat menghasilkan daftar field kosong.

### Scope Fase 3 — Fixture editorial dan visual

**Tujuan:** menemukan masalah nyata dengan konten dan asset sebelum adapter
dibangun untuk semua halaman.

- Isi satu halaman paling sederhana dengan konten asli ID dan EN.
- Upload gambar yang sudah diproses dan gunakan image builder Sanity.
- Uji preview draft, fallback locale, hotspot, crop, dan LQIP.
- Buat route development-only untuk fixture layout.
- Render semua section fixture dengan teks English tepat pada `safeLimit`.
- Ambil screenshot pada viewport 360, 768, dan 1440.
- Uji label dengan variasi lebar glyph, bukan hanya jumlah karakter.

**Kandidat fixture awal:** halaman topic sustainability karena memiliki hero,
intro, panel, tepat tiga card, note, dan CTA tanpa form atau koleksi kompleks.

**Validasi keluar:**

- tidak ada overlap, clipping, overflow horizontal, atau CTA yang hilang;
- asset desktop dan mobile memiliki crop yang layak;
- fixture dapat diulang tanpa mengisi seluruh dataset.

### Scope Fase 4 — Asset pipeline

**Tujuan:** semua asset masuk CMS dalam bentuk production-ready.

- Tambahkan `scripts/prepare-assets.ts`.
- Proses image menggunakan `sharp`.
- Proses video menggunakan ffmpeg yang tersedia secara eksplisit di CI/local.
- Simpan manifest output: input, output, ukuran, dimensi, MIME, dan preset.
- Tolak output yang tidak memenuhi preset media.
- Jangan commit file mentah besar jika output production sudah tersedia.

**Validasi keluar:**

- asset baru memenuhi dimensi/rasio;
- EXIF tidak ikut;
- video autoplay tetap bekerja dengan `muted`, `playsInline`, dan poster;
- ukuran download hero terukur dalam browser.

### Scope Fase 5 — Adapter dan integrasi frontend

**Tujuan:** bentuk dokumen Sanity tidak bocor ke komponen UI.

- Buat typed query result.
- Buat adapter Sanity ke props komponen existing.
- Buat image URL builder terpusat dengan hotspot/crop/LQIP.
- Integrasikan layout global.
- Integrasikan homepage.
- Integrasikan product, sustainability, company, legal, dan career secara
  bertahap.
- Pertahankan artikel/team lewat adapter lama sampai migrasi locale diputuskan.

**Validasi keluar:**

- setiap halaman memiliki fallback aman ketika dokumen belum dipublish;
- komponen tidak mengakses field Sanity mentah;
- typecheck, lint, build, dan browser smoke test lulus.

### Scope Fase 6 — Seed dan editorial rollout

**Tujuan:** mengisi dataset dengan urutan yang dapat diaudit.

- Seed singleton yang sudah diuji pada fixture.
- Upload asset production.
- Seed product, fleet, coverage, partnership, legal, dan job opening.
- Isi ID terlebih dahulu.
- Isi EN dan jalankan audit kelengkapan.
- Verifikasi JSON-LD lowongan.
- Dokumentasikan workflow editor dan publish.

---

## Definition of Done

Implementasi schema dianggap selesai jika:

1. schema lama yang masih dipakai tidak hilang;
2. seluruh route mapping memiliki schema dan query;
3. route CTA tidak memiliki daftar duplikat;
4. pattern dekoratif tidak memerlukan alt;
5. counter sama dengan `Rule.max`;
6. slug teknis terlindungi setelah dibuat;
7. form key memiliki test kontrak;
8. mapping dan `LIMIT` diperiksa otomatis;
9. fixture visual lulus pada tiga viewport;
10. asset diproses sebelum upload;
11. status terjemahan EN dapat diaudit;
12. lowongan aktif menghasilkan JSON-LD valid;
13. frontend memakai adapter dan image builder, bukan shape Sanity mentah.

---

## Rencana eksekusi praktis

Pengerjaan dilakukan berurutan. Fase berikutnya tidak dimulai bila acceptance
criteria fase sebelumnya belum lulus. Setiap fase idealnya menghasilkan satu
perubahan yang dapat diuji dan direview secara terpisah.

### Fase 0 — Baseline dan inventaris kontrak

**Output:**

- daftar schema existing yang masih dipakai;
- daftar route korporat dan query yang dibutuhkan;
- daftar konstanta form key di frontend;
- daftar asset sumber dan target preset;
- baseline `typecheck`, `lint`, dan `build`.

**Langkah:**

1. Jangan menghapus atau mengganti schema existing.
2. Catat `newsroomArticle`, `newsroomCategory`, `teamMember`, dan
   `mediaLibrary` sebagai compatibility surface.
3. Simpan hasil baseline sebagai referensi, bukan sebagai file generated yang
   harus di-commit.
4. Tandai dataset kosong sebagai prasyarat seed, bukan alasan untuk menghapus
   kontrak frontend.

**Gate:** baseline command berhasil atau kegagalan existing dicatat sebelum
perubahan dimulai.

### Fase 1 — Reorganisasi schema dan koreksi bug lokal

**Output:**

- struktur folder schema bersarang;
- registry gabungan schema lama dan baru;
- koreksi `allowSvg`, decorative media, logo preset, counter, route CTA,
  hero-video rule, slug locking, dan casting.

**Urutan implementasi:**

1. Buat folder target.
2. Pindahkan file schema tanpa mengubah perilaku terlebih dahulu.
3. Perbaiki import path dan registry.
4. Gabungkan schema existing.
5. Perbaiki bug lokal satu per satu.
6. Jalankan typecheck Studio.
7. Buka Studio dan cek setiap singleton serta collection.

**Gate:** schema dapat dimuat Studio; tidak ada missing module, duplicate type,
atau schema type yang hilang.

### Fase 2 — Kontrak route, locale, limit, dan form

**Output:**

- satu sumber route;
- query coverage lengkap;
- validator mapping-vs-`LIMIT`;
- audit translation completeness;
- test form key;
- proteksi slug dan field teknis.

**Urutan implementasi:**

1. Finalisasi `ROUTES` dan metadata label route.
2. Hapus daftar route CTA yang ditulis ulang.
3. Tambahkan query per halaman yang belum tercakup.
4. Tambahkan type hasil query atau response contract.
5. Tambahkan parser tabel limit mapping.
6. Tambahkan query/laporan field English kosong.
7. Tambahkan test key untuk form penawaran dan lamaran.
8. Tambahkan validasi duplicate/missing key.

**Gate:** test route, limit, form key, dan query contract lulus.

### Fase 3 — Fixture editorial pertama

**Output:**

- satu halaman nyata ID + EN di dataset;
- satu asset image production-ready;
- adapter minimal;
- image builder minimal;
- preview draft yang teruji.

**Halaman pilihan:** `/keberlanjutan`, karena strukturnya cukup lengkap tetapi
tidak bergantung pada form atau collection kompleks.

**Urutan implementasi:**

1. Siapkan konten ID dan EN untuk hero, intro, panel, tiga card, note, dan CTA.
2. Siapkan satu gambar hero yang memenuhi preset.
3. Upload dan publish asset/page fixture.
4. Buat query halaman fixture dengan `$lang`.
5. Buat adapter ke props `CorporateTopicPage`.
6. Uji fallback ketika EN kosong.
7. Uji preview draft dan published response.
8. Uji image URL, hotspot, crop, dan LQIP.

**Gate:** satu halaman dapat dirender dari Sanity tanpa shape Sanity bocor ke
komponen UI.

### Fase 4 — Fixture layout ekstrem dan visual regression manual

**Output:**

- route dev-only atau fixture switch;
- screenshot 360, 768, dan 1440;
- daftar masalah layout yang dapat ditindaklanjuti.

**Urutan implementasi:**

1. Buat data fixture dengan setiap field English berada tepat di `safeLimit`.
2. Tambahkan variasi teks dengan glyph lebar dan sempit.
3. Render seluruh section fixture secara bersamaan.
4. Screenshot pada tiga viewport.
5. Perbaiki overflow, clipping, fixed height, line wrapping, dan CTA wrapping.
6. Ulangi screenshot setelah perbaikan.
7. Hapus route fixture dari production build atau lindungi dengan flag
   development yang tidak aktif di production.

**Gate:** tidak ada overlap header, overflow horizontal, teks terpotong,
atau CTA yang keluar dari container.

### Fase 5 — Asset preparation pipeline

**Output:**

- `scripts/prepare-assets.ts`;
- manifest hasil proses;
- image/video output yang siap upload.

**Urutan implementasi:**

1. Tentukan input dan output directory.
2. Tambahkan `sharp` hanya bila dependency benar-benar diperlukan.
3. Pastikan ffmpeg tersedia secara eksplisit dan punya versi yang diketahui.
4. Proses image berdasarkan preset.
5. Strip metadata yang tidak dibutuhkan.
6. Transcode video ke target browser.
7. Tulis manifest ukuran, dimensi, MIME, dan preset.
8. Tolak output yang gagal memenuhi kontrak.
9. Uji video autoplay di Chrome dan mobile-like viewport.

**Gate:** asset pipeline reproducible dan output dapat dipakai oleh fixture
tanpa edit manual.

### Fase 6 — Adapter dan integrasi halaman bertahap

**Urutan integrasi:**

1. layout global: settings, navigation, footer, cookie banner;
2. homepage dan hero carousel;
3. product pages dan product references;
4. coverage serta sustainability;
5. company pages;
6. legal pages;
7. career dan lowongan;
8. form copy;
9. JSON-LD `JobPosting`.

Setiap kelompok halaman harus memiliki:

- query;
- result type;
- adapter;
- fallback jika dokumen belum tersedia;
- browser smoke test;
- typecheck dan build.

**Gate:** kelompok halaman berikutnya tidak dimulai sebelum kelompok saat ini
memiliki fallback dan tidak merusak route static yang belum bermigrasi.

### Fase 7 — Seed bertahap dan editorial rollout

**Urutan seed:**

1. singleton fixture yang sudah lulus;
2. global settings;
3. product;
4. fleet variant;
5. coverage area;
6. partnership;
7. legal document;
8. job opening;
9. singleton halaman lain;
10. English completion audit.

**Gate:** setiap batch seed dapat dihapus atau diperbaiki tanpa mengandalkan
data dari batch berikutnya.

### Fase 8 — Hardening dan release

**Checklist:**

- typecheck;
- lint;
- build;
- schema Studio load;
- route/query coverage;
- limit drift check;
- form key contract;
- translation completeness report;
- image/video asset checks;
- JSON-LD validation;
- browser smoke test;
- mobile/desktop fixture screenshot;
- draft preview;
- fallback ketika Sanity kosong atau gagal.

Setelah seluruh checklist lulus, baru schema baru boleh menjadi sumber konten
production secara bertahap. Schema monolingual artikel/team tetap diperlakukan
sebagai compatibility surface sampai migrasi locale memiliki rencana dan test
tersendiri.
