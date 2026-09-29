---
document_type: discovery-and-readiness-plan
project: petro-anigos
domain: sanity
audience: coding-agents-and-content-operators
language: id-ID
status: discovery-complete-implementation-gated
source_of_truth:
  frontend: ../../petro-anigos
  active_studio: ../../studio-anigos-project
  implementation_docs: .
depends_on: []
next_document: 01-foundation.md
---

# Langkah 0 — Pemahaman Aplikasi Sebelum Implementasi Sanity

Dokumen ini adalah gate pemahaman sebelum perubahan kode. Tujuannya bukan
menjelaskan rencana secara umum, tetapi memastikan hubungan antara route
frontend, konten hardcoded, fallback lokal, schema Sanity, query, dan kebutuhan
operator sudah dapat dilacak.

## 1. Kesimpulan singkat

Pemahaman efektif terhadap **perilaku runtime aplikasi dan kesesuaiannya dengan
skema Sanity** saat discovery ini adalah:

| Area | Pemahaman | Dasar penilaian |
|---|---:|---|
| Artikel dan newsroom | 75% | Mapper/query Sanity tersedia, tetapi halaman newsroom dan detail masih memakai data lokal |
| Dokumen kemitraan | 60% | Jalur API Sanity ada, tetapi masih ada mock partnership dan fallback PDF |
| Dokumen publikasi | 75% | Halaman publikasi sudah membaca `publicationDocument`, dengan fallback lokal |
| Dokumen legalitas | 40% | Schema tersedia, tetapi route legalitas belum membaca Sanity |
| Home hero | 80% | Query dan komponen hero tersedia, tetapi type/provider belum sepenuhnya mewakili respons |
| Page hero | 25% | Schema/slot tersedia, tetapi mayoritas route masih memakai asset lokal |
| Struktur organisasi | 80% | Fetch, mapper, dan fallback tersedia; kategori schema baru belum sepenuhnya selaras |
| Media slot | 70% | Query media tersedia, tetapi pemakaian slot belum konsisten di semua komponen |
| Kontak dan alamat | 20% | Schema settings tersedia, tetapi footer masih hardcoded |

**Rata-rata discovery lintas area: 58%.**

Angka 58% bukan persentase kesiapan untuk coding. Ini adalah estimasi
pemahaman efektif terhadap sistem yang berjalan. Schema Sanity sendiri lebih
maju daripada wiring runtime; karena itu implementasi tidak boleh dimulai hanya
berdasarkan schema.

## 2. Source of truth

Gunakan urutan sumber berikut ketika informasi berbeda:

1. Kode frontend aktual di [`petro-anigos/`](../../petro-anigos/).
2. Studio aktif di [`studio-anigos-project/`](../../studio-anigos-project/).
3. Query, client, dan type frontend di [`petro-anigos/lib/`](../../petro-anigos/lib/).
4. Dokumentasi fase di folder ini.
5. Studio lama atau folder eksperimen hanya sebagai referensi, bukan target
   perubahan.

File kunci:

- [`app/page.tsx`](../../petro-anigos/app/page.tsx) — komposisi Beranda.
- [`lib/sanity-client.ts`](../../petro-anigos/lib/sanity-client.ts) — client
  published dan image URL.
- [`lib/sanity-queries.ts`](../../petro-anigos/lib/sanity-queries.ts) — query
  Home, Jangkauan, dan Kemitraan.
- [`lib/sanity-content-types.ts`](../../petro-anigos/lib/sanity-content-types.ts)
  — kontrak respons frontend.
- [`studio-anigos-project/schemaTypes/index.ts`](../../studio-anigos-project/schemaTypes/index.ts)
  — schema aktif yang menjadi target integrasi.
- [`studio-anigos-project/structure.ts`](../../studio-anigos-project/structure.ts)
  — navigasi operator.
- [`studio-anigos-project/scripts/seed-media-slots.mjs`](../../studio-anigos-project/scripts/seed-media-slots.mjs)
  — stable media slot.

## 3. Pemetaan terhadap kebutuhan operator

### 3.1 Artikel

Kebutuhan operator: membuat artikel berdasarkan template judul, slug,
ringkasan, kategori, tanggal, gambar, dan isi.

Kondisi aplikasi:

- Schema `article` tersedia di Studio aktif.
- Sanity newsroom lama dan mapper juga ditemukan di
  [`lib/sanity-newsroom.ts`](../../petro-anigos/lib/sanity-newsroom.ts).
- Route newsroom dan detail masih memakai `newsroom-data.ts`, sehingga
  perubahan di Studio belum tentu tampil.

Gate pemahaman: dapat menjelaskan schema, mapper, route daftar, route detail,
`generateStaticParams`, metadata, dan fallback tanpa menebak.

### 3.2 Dokumen

Kebutuhan operator:

- Dokumen Kemitraan.
- Dokumen Publikasi.
- Dokumen Legalitas.

Kondisi aplikasi:

- Studio aktif menggabungkan Kemitraan dan Legalitas dalam `companyDocument`
  menggunakan `documentType`.
- Publikasi memakai `publicationDocument`.
- Halaman publikasi sudah membaca Sanity dan memiliki fallback PDF lokal.
- Halaman legalitas masih memakai konten lokal dan belum mengambil dokumen
  Sanity.
- Kemitraan memiliki jalur API Sanity, tetapi fallback mock masih kuat.

Gate pemahaman: setiap jenis dokumen harus memiliki sumber data runtime,
status tampil, file PDF, thumbnail, dan perilaku saat data kosong yang jelas.

### 3.3 Home hero

Kebutuhan operator:

- Memilih slide 1–4.
- Mengubah judul, keterangan, dan media gambar/video.

Kondisi aplikasi:

- Schema `homePage.heroSlides` mendukung posisi, status aktif, judul,
  deskripsi, gambar, video, poster, dan tipe media.
- `HOME_QUERY` mengambil data hero aktif.
- `HomeContent` belum mendeskripsikan seluruh field `heroSlides`, sehingga
  kontrak type/provider harus dibuktikan sebelum perubahan.

Gate pemahaman: dapat mengikuti data dari dokumen Sanity sampai prop
`HomeHero`, termasuk mode kosong, video, poster, urutan, dan fallback.

### 3.4 Page hero

Kebutuhan operator: memilih halaman lalu mengganti satu gambar hero.

Kondisi aplikasi:

- Schema `pageHero` dan seed stable ID tersedia.
- Sebagian besar route masih menggunakan asset lokal
  `/images/page-hero/tentang-kami.webp`.
- Kemitraan adalah salah satu jalur yang terlihat memakai hero Sanity dengan
  fallback.

Gate pemahaman: semua route yang memiliki page hero harus terinventaris,
memiliki `page`/`slotKey` yang sama, dan tidak boleh ada dua sumber tanpa
aturan prioritas.

### 3.5 Struktur organisasi

Kebutuhan operator:

- Nama dan foto.
- Komisaris atau Direksi dengan jabatan resmi.
- Tim dan Divisi dengan referensi divisi dan posisi.
- Posisi lain yang dapat diisi manual.

Kondisi aplikasi:

- Studio aktif memiliki `teamDivision` dan `teamMember` dengan field
  kondisional.
- Route struktur perusahaan sudah membaca `getSanityTeam()`.
- Fallback lokal dan placeholder masih digunakan saat data kosong.
- Mapper lama mengenal kategori yang lebih banyak daripada schema aktif.

Gate pemahaman: nilai enum, grouping UI, sorting, fallback, dan migrasi dari
field legacy harus sudah dipetakan sebelum mengubah schema.

### 3.6 Media

Kebutuhan operator: `Halaman → Segmen → Elemen media → Asset`, dengan teks
halaman tetap hardcoded dan asset gambar dapat diganti spesifik.

Kondisi aplikasi:

- `mediaAsset` memiliki page, section, slot, stable `slotKey`, label, image,
  notes, dan status aktif.
- Seed menyediakan slot hero dan section.
- `pageMediaEditor.homeSlots` mengelola gambar statis terpilih untuk Beranda.
  Empat slot `home-product-logo-1` sampai `home-product-logo-4` mengisi logo
  pada segmen Produk & Layanan; ukuran wadah tetap dan gambar memakai `contain`.
- Slot `home-marine-fuel-background` mengelola latar segmen Marine Fuel dari
  Gambar Statis Pendukung → Beranda → Halaman Beranda. Pintasan lama
  `Latar Marine Fuel` di navigasi Studio dihapus, tetapi dokumen `mediaAsset`
  lama tetap tersedia sebagai fallback hingga gambar baru diunggah.
- Untuk dokumen singleton yang sudah ada sebelum slot logo ditambahkan, editor
  menyediakan tindakan satu kali untuk menyiapkan slot logo atau latar Marine
  Fuel yang belum ada tanpa mengubah gambar yang sudah tersimpan.
- API Home memprioritaskan slot pendukung yang memiliki gambar, lalu memakai
  media legacy sebagai fallback. Logo `productShowcase.logoItems` tetap menjadi
  fallback untuk logo.
- Query frontend lama juga memiliki media embedded pada showcase, sehingga
  `mediaAsset` tidak boleh langsung dianggap sebagai pengganti seluruh media
  embedded tanpa mapping per komponen.

Gate pemahaman: setiap gambar di setiap route harus dapat diklasifikasikan
sebagai page hero, media slot, embedded content, atau fallback lokal.

### 3.7 Kontak dan alamat

Kebutuhan operator: mengubah alamat, email, dan telepon.

Kondisi aplikasi:

- Schema `siteSettings` dan query settings tersedia.
- Footer masih menampilkan alamat, email, dan telepon hardcoded.

Gate pemahaman: satu dokumen settings harus menjadi sumber footer, metadata,
CTA kontak, dan fallback yang eksplisit.

## 4. Langkah pemahaman sampai 100%

Langkah-langkah ini harus diselesaikan dan dicatat sebelum implementasi
integrasi baru. Jangan menandai langkah selesai hanya karena file sudah ada;
harus ada bukti route, query, dan output yang dapat ditelusuri.

### Langkah A — Bekukan inventaris route

- Buat tabel seluruh route App Router.
- Tandai apakah route server/client.
- Catat komponen hero, sumber teks, sumber gambar, sumber dokumen, dan
  fallback.
- Kelompokkan route berdasarkan page key yang dipakai schema.

Selesai jika tidak ada route yang memiliki hero atau media tanpa klasifikasi.

### Langkah B — Bekukan kontrak Sanity

- Bandingkan schema aktif dengan query frontend.
- Bandingkan field query dengan type TypeScript.
- Catat field yang di-query tetapi belum ada di type/provider.
- Pisahkan schema aktif dari schema legacy di `studio-clean` atau folder lama.

Selesai jika setiap query memiliki type respons dan setiap field operator
memiliki consumer atau alasan belum dipakai.

### Langkah C — Lacak aliran data runtime

Untuk setiap area, dokumentasikan rantai:

```text
Dokumen Sanity → GROQ/query → client/API route → mapper/type → page/component
```

Lakukan minimal untuk:

- Home hero.
- Artikel daftar dan detail.
- Publikasi.
- Kemitraan.
- Legalitas.
- Struktur organisasi.
- Page hero.
- Media section.
- Footer settings.

Selesai jika dapat menjawab dari file mana data berasal ketika Content Lake
berisi data, kosong, atau gagal diakses.

### Langkah D — Klasifikasikan fallback

Untuk setiap fallback lokal, tentukan:

- Apakah fallback hanya untuk development?
- Apakah fallback aman untuk production?
- Apakah fallback menyamarkan kegagalan integrasi?
- Apakah fallback harus dipertahankan, diberi logging, atau dihapus setelah
  migration?

Selesai jika tidak ada fallback yang terlihat seperti data Sanity yang sukses.

### Langkah E — Cocokkan stable ID dan page key

- Cocokkan `pageOptions` dengan route aktual.
- Cocokkan `sectionOptions` dengan section pada komponen.
- Cocokkan `slotKey` seed dengan query frontend.
- Pastikan hero Home tidak tercampur dengan `pageHero`.
- Pastikan satu lokasi UI tidak memiliki dua slot aktif.

Selesai jika setiap slot dapat dicari dengan ID stabil dan hasilnya tepat satu
atau nol dokumen, bukan beberapa dokumen ambigu.

### Langkah F — Tetapkan workflow operator

Simulasikan alur operator non-teknis:

1. Membuka menu kerja.
2. Menemukan slot atau dokumen.
3. Mengubah field.
4. Menyimpan draft.
5. Melihat preview.
6. Publish.
7. Memastikan website berubah.
8. Menonaktifkan konten tanpa menghapusnya.

Selesai jika label Studio dan pesan validasi memakai istilah bisnis, bukan
`_type`, GROQ, atau nama teknis.

### Langkah G — Tetapkan aturan validasi dan error

- Error: field wajib, file PDF wajib, media wajib, posisi hero duplikat,
  referensi invalid.
- Warning: rasio/resolusi gambar kurang ideal, metadata opsional, fallback
  yang masih digunakan.
- API/seed error harus tampil eksplisit dan tidak berubah menjadi data kosong
  yang tampak sukses.

Selesai jika aturan Studio dan script mutation memiliki perilaku yang
konsisten.

### Langkah H — Buktikan production dan preview

- Production membaca published.
- Preview membaca draft dengan CDN dimatikan.
- Draft tidak muncul pada route production.
- Asset kosong tidak mematikan seluruh halaman.

Selesai jika terdapat bukti query/client untuk kedua perspective dan satu
acceptance test untuk perubahan draft.

### Langkah I — Verifikasi dengan operator

Gunakan skenario di
[`09-operator-acceptance.md`](./09-operator-acceptance.md), lalu tambahkan
skenario untuk:

- Mengganti page hero.
- Mengganti media Beranda → Tentang Kami.
- Mengubah footer.
- Mengedit legalitas.
- Membuat artikel yang benar-benar muncul di daftar dan detail.

Selesai jika operator dapat menyelesaikan skenario tanpa membuka kode.

## 5. Definition of 100% understanding

Pemahaman dianggap 100% untuk mulai implementasi hanya jika semua pernyataan
berikut benar:

- Setiap route diketahui sumber teks dan sumber medianya.
- Setiap field schema diketahui consumer frontend-nya.
- Tidak ada query yang tidak punya type atau mapper yang jelas.
- Tidak ada fallback yang tidak terdokumentasi.
- Semua page key, section key, dan slot key cocok dengan route/komponen.
- Sumber data legalitas, kontak, newsroom, dan page hero sudah terbukti.
- Perbedaan Studio aktif dan schema legacy sudah diputuskan.
- Production, preview, draft, publish, dan disable memiliki alur yang jelas.
- Operator dapat menemukan konten tanpa membuat dokumen slot baru.
- Test build, typecheck, contract check, dan acceptance test memiliki bukti.

## 6. Blocker sebelum coding

Discovery menemukan blocker berikut:

1. Seed Content Lake sebelumnya terblokir oleh token, tetapi kini sudah
   diselesaikan dan diverifikasi: 20 page hero serta 15 media section slot.
2. Ada schema/Studio lama yang berpotensi membingungkan source of truth.
3. Newsroom, legalitas, footer, dan mayoritas page hero belum tersambung
   konsisten ke schema aktif.
4. Kontrak `HOME_QUERY` dan type `HomeContent` belum sepenuhnya sejajar.
5. Media embedded lama dan media slot baru belum memiliki peta migrasi
   lengkap.

Blocker ini tidak menghalangi dokumentasi discovery, tetapi harus diselesaikan
atau diberi keputusan eksplisit sebelum perubahan runtime dilakukan.

## 7. Format laporan setelah discovery lanjutan

```text
Phase: 00 — Application Understanding
Understanding: <persentase per domain dan rata-rata>
Evidence: <route/query/schema yang diperiksa>
Resolved: <gap yang sudah dipahami atau diputuskan>
Blocked: <blocker yang masih ada>
Ready for implementation: <yes/no>
Next: <fase berikutnya>
```
