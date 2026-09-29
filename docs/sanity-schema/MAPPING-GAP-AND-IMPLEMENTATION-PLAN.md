# Mapping Gap Schema Sanity dan Rencana Pengerjaan

Dokumen ini memetakan kebutuhan CMS terbaru terhadap schema Sanity dan
integrasi frontend yang berjalan saat ini. Dokumen ini menjadi backlog kerja
sebelum Studio lama dapat dipensiunkan.

## Catatan implementasi

### 18 September 2026 — Pondasi segmen Kemitraan

- Segmen kedua halaman Kemitraan memakai pola master-detail berbasis core UI:
  daftar nama mitra aktif berada di grid kiri, detail mitra terpilih berada di
  grid kanan.
- Schema `partnership` sekarang mendukung nama mitra, logo raster, tanggal
  mulai kemitraan, portofolio, dokumentasi PDF, dan keterangan dengan batas
  karakter untuk menjaga layout.
- Query dan endpoint `/api/kemitraan` mengirim data terlokalisasi dari Sanity.
- Frontend mempertahankan fallback lokal ketika data belum dipublish atau
  asset opsional belum tersedia.
- Development frontend memakai port eksplisit `3000` melalui `npm run dev`;
  `npm run dev:lan` tersedia untuk akses dari perangkat lain di jaringan lokal.
- Sanity Studio dijalankan terpisah dari folder Studio masing-masing dan tidak
  memakai port frontend.

## Status ringkas

| Area | Status | Risiko |
| --- | --- | --- |
| Artikel | Sebagian sesuai | Rendah |
| Dokumen publikasi | Sesuai | Rendah |
| Dokumen legalitas | Sebagian sesuai | Sedang |
| Dokumen kemitraan | Belum eksplisit; halaman sudah memiliki adapter konten | Sedang |
| Home Hero | Sesuai setelah validasi 1–4 slide | Rendah |
| Page Hero | Schema tersedia, frontend belum terhubung penuh | Tinggi |
| Struktur organisasi | Schema legacy lebih lengkap daripada clean editor | Sedang |
| Media per halaman | Schema tersedia, frontend belum menggunakannya | Tinggi |
| Satu sumber schema | Belum selesai | Tinggi |

## Mapping kebutuhan dan gap

### 1. Artikel

**Target**

- Editor membuat artikel dari template tetap.
- Layout halaman tetap dikendalikan oleh Next.js.
- Artikel dapat memiliki judul, slug, kategori, excerpt, tanggal, gambar,
  video opsional, dan isi.

**Implementasi saat ini**

- `newsroomArticle` dan `newsroomCategory` sudah terdaftar.
- Route artikel menggunakan adapter Sanity.
- Field `featured` memiliki validasi agar hanya ada satu artikel unggulan.

**Gap**

- Schema artikel masih berada di folder compatibility/legacy.
- Belum ada fixture editorial yang diwajibkan untuk memverifikasi semua field
  di halaman artikel.

**Pengerjaan**

1. Verifikasi satu artikel published di dataset production.
2. Verifikasi halaman daftar, kategori, dan detail artikel.
3. Pertahankan nama `_type` dan field lama selama migrasi.
4. Baru setelah fixture lulus, pindahkan schema artikel ke registry mandiri.

### 2. Dokumen publikasi

**Target**

- Upload PDF.
- Judul, keterangan, kategori, tanggal, dan status tampil.
- Dokumen tanpa file tidak muncul di website.

**Implementasi saat ini**

- `publicationDocument` sudah memiliki file PDF wajib.
- `publicationCategory` dapat digunakan ulang.
- Adapter publikasi membaca dokumen published yang memiliki file.
- Terdapat fallback lokal bila belum ada dokumen Sanity.

**Gap**

- Belum ada validasi integrasi yang memastikan URL file PDF benar-benar dapat
  diakses dari halaman publikasi.

**Pengerjaan**

1. Buat satu kategori publikasi.
2. Upload satu PDF fixture.
3. Publish dan verifikasi link download/preview.
4. Uji dokumen tanpa file dan `isPublished == false`.

### 3. Dokumen legalitas dan kemitraan

**Target**

- Dokumen legalitas dan dokumen kemitraan dapat dikelola editor.
- Dokumen memiliki target penggunaan yang jelas.

**Implementasi saat ini**

- `legalDocument` sudah memiliki nomor dokumen, penerbit, tanggal, keterangan,
  thumbnail, dan PDF.
- `partnership` tersedia sebagai data mitra, bukan klasifikasi dokumen PDF.

**Gap**

- `legalDocument` belum memiliki field target/kategori penggunaan.
- Belum ada cara eksplisit membedakan:
  - dokumen legalitas,
  - dokumen kemitraan,
  - dokumen legal umum.
- Halaman kemitraan sudah memiliki adapter `GET /api/kemitraan` dan merender
  hero, intro, showcase, proses, serta closing dari `kemitraanPage` dengan
  fallback lokal.
- PDF kemitraan masih memakai asset lokal; adapter dokumen terpisah belum
  selesai.

**Keputusan implementasi**

Tambahkan field teknis terkontrol pada `legalDocument`:

```text
documentType:
- legalitas
- kemitraan
- umum
```

Field ini tidak boleh berupa input bebas. Nilai lama yang kosong tetap dianggap
`legalitas` selama masa migrasi agar dokumen existing tidak hilang.

**Pengerjaan**

1. Tambahkan `documentType` sebagai dropdown.
2. Tambahkan query berdasarkan `documentType`.
3. Hubungkan dokumen PDF kemitraan dan legalitas ke adapter masing-masing.
4. Ganti PDF lokal kemitraan setelah fixture Sanity published tersedia.
5. Uji fallback ketika belum ada dokumen published.

#### Kemitraan — tahap fondasi selesai

- `kemitraanPage` memiliki query frontend terpusat di
  `lib/sanity-queries.ts`.
- Endpoint published tersedia di `/api/kemitraan`.
- Showcase kemitraan memakai pola master-detail: daftar nama mitra aktif di
  grid kiri dan detail mitra terpilih di grid kanan.
- Detail mitra mendukung logo raster, tanggal mulai kemitraan, portofolio,
  dokumentasi PDF, dan keterangan dengan batas karakter CMS.
- `page.tsx` memakai data Sanity untuk hero, intro, showcase, proses, dan
  closing; copy/ilustrasi lokal tetap menjadi fallback.
- Schema tervalidasi dengan 0 error dan 0 warning; typecheck, lint, serta
  production build berhasil.

### 4. Home Hero

**Target**

- Editor mengatur slide 1–4.
- Setiap slide memiliki judul, keterangan, CTA, gambar atau video.
- Hanya satu video dalam satu carousel.

**Implementasi saat ini**

- `homePage.heroSlides` sudah memiliki:
  - batas 1–4 slide,
  - posisi unik,
  - status aktif,
  - maksimal satu video,
  - media gambar/video,
  - poster video.
- Frontend memiliki fallback hero lokal.

**Gap**

- Fixture production belum menjadi bagian dari automated test.
- Beberapa validasi runtime frontend masih bersifat defensif, bukan kontrak
  typed penuh.

**Pengerjaan**

1. Publish fixture satu slide.
2. Publish fixture empat slide.
3. Uji satu video dan video kedua harus ditolak schema.
4. Uji slide tanpa media dan pastikan fallback berjalan.

### 5. Page Hero

**Target**

- Teks tetap hardcoded di frontend.
- Editor hanya memilih gambar Page Hero.
- Asset ditargetkan ke halaman tertentu.

**Implementasi saat ini**

- `pageHero` tersedia pada singleton schema.
- `mediaAsset` memiliki field `page`, `section`, `slot`, dan `image`.
- Beberapa halaman masih menggunakan path lokal hardcoded, misalnya:
  `/images/page-hero/tentang-kami.webp`.

**Gap**

- Frontend belum mengambil `mediaAsset`.
- Tidak ada helper `getMediaAsset(page, section, slot)`.
- Fallback dan media Sanity belum memiliki prioritas runtime yang konsisten.

**Pengerjaan**

1. Tambahkan query media slot berdasarkan `page`, `section`, dan `slot`.
2. Buat adapter typed untuk menghasilkan URL gambar.
3. Hubungkan `PageHero` ke slot `hero/background`.
4. Pertahankan fallback lokal jika slot tidak tersedia.
5. Migrasikan halaman satu per satu dan uji visual.

### 6. Struktur organisasi

**Target**

- Nama.
- Kelompok: Komisaris, Direksi, Tim & Divisi.
- Jika Tim & Divisi, pilih atau buat divisi.
- Posisi: Kepala Divisi, Tim Divisi, atau input manual.
- Foto dan deskripsi.

**Implementasi saat ini**

- Schema legacy memiliki `structuralClass`, `division`, `divisionRole`, dan
  field jabatan resmi.
- Clean Studio memakai `teamMember` yang lebih sederhana.
- Adapter frontend masih membaca beberapa field legacy sebagai fallback.

**Gap**

- Registry clean belum sepenuhnya merepresentasikan alur conditional Divisi.
- Terdapat dua bentuk `teamMember` yang dapat membingungkan editor.
- Kategori frontend dan kelompok editor belum sepenuhnya identik.

**Pengerjaan**

1. Tetapkan satu model editor untuk `teamMember`.
2. Pertahankan field legacy tersembunyi untuk dokumen lama.
3. Gunakan `structuralClass` sebagai dropdown utama.
4. Tampilkan `division` dan `divisionRole` hanya untuk Tim & Divisi.
5. Tambahkan pilihan manual untuk posisi divisi bila memang diperlukan.
6. Verifikasi adapter terhadap dokumen lama dan baru.

### 7. Media per halaman

**Target**

- Editor memilih halaman.
- Editor memilih segmen.
- Editor memilih elemen media.
- Teks tetap hardcoded.
- Resolusi/rasio ideal menjadi warning, bukan error.

**Implementasi saat ini**

- `mediaAsset` sudah menjadi collection.
- `page`, `section`, dan `slot` kini memakai pilihan terkontrol.
- Alt text wajib.
- Catatan rekomendasi resolusi/rasio tersedia.

**Gap**

- `section` dan `slot` belum divalidasi berdasarkan kombinasi halaman.
- Belum ada unique constraint konseptual untuk satu slot aktif per target.
- Frontend belum membaca collection ini.
- Belum semua target route tersedia sebagai pilihan media.

**Pengerjaan**

1. Lengkapi daftar target halaman yang benar-benar memiliki media.
2. Tambahkan validasi kombinasi page/section/slot.
3. Tambahkan aturan agar satu target hanya memiliki satu asset aktif.
4. Buat query dan adapter media.
5. Hubungkan Page Hero terlebih dahulu.
6. Hubungkan media section lain setelah fixture Page Hero stabil.

### 8. Satu sumber schema

**Target**

- `studio-clean` menjadi satu-satunya Studio editorial.
- Schema dapat dibuild tanpa bergantung pada folder Studio lama.

**Implementasi saat ini**

- `studio-clean/sanity/schemaTypes.ts` masih mengimpor `schemaTypes` dari
  `studio-anigos-project`.
- Kedua folder masih memiliki konfigurasi Sanity.
- Keduanya menunjuk project dan dataset yang sama.

**Gap**

- Menghapus Studio lama sekarang akan mematahkan build Studio clean.
- Perubahan schema legacy dapat berdampak ke Studio clean tanpa batas yang jelas.
- Dokumentasi masih mencampur istilah schema aktif dan Studio editorial.

**Pengerjaan**

1. Buat registry schema bersama di lokasi independen.
2. Pindahkan object, singleton, dan collection yang masih dipakai.
3. Ubah `studio-clean` agar hanya mengimpor registry baru.
4. Pastikan query frontend tidak mengimpor source Studio.
5. Jalankan schema validation dan build dari clean Studio.
6. Tandai Studio lama deprecated.
7. Hapus Studio lama hanya setelah fixture production diverifikasi.

## Urutan pengerjaan yang disarankan

### Fase A — Kontrak dan fixture

- Tetapkan model `documentType`.
- Tetapkan model `teamMember` final.
- Lengkapi option media.
- Buat fixture artikel, publikasi, legalitas, kemitraan, hero, dan tim.

### Fase B — Integrasi frontend

- Integrasikan adapter dokumen legal/publikasi.
- Integrasikan media slot ke `PageHero`.
- Integrasikan media slot ke section yang memiliki kebutuhan penggantian aset.
- Tambahkan validasi response API.

### Fase C — Pemisahan schema

- Pindahkan schema bersama dari Studio lama.
- Build dan validasi `studio-clean` tanpa import legacy.
- Uji dokumen existing di dataset production.

### Fase D — Cutover

- Nonaktifkan workflow editorial Studio lama.
- Update README dan seluruh dokumentasi agar hanya menyebut Studio clean.
- Deploy Studio clean.
- Pantau query dan error runtime.

## Kriteria selesai

- [ ] Semua kebutuhan pada tabel mapping memiliki status sesuai.
- [ ] Tidak ada page yang memakai media slot Sanity tanpa fallback.
- [ ] Dokumen legalitas dan kemitraan dapat dibedakan dengan field terkontrol.
- [ ] Struktur Tim & Divisi dapat dibuat tanpa field bebas yang ambigu.
- [ ] `studio-clean` tidak mengimpor schema dari `studio-anigos-project`.
- [ ] `npx sanity schema validate` lulus tanpa error atau warning.
- [ ] Typecheck, lint, content contract, dan production build lulus.
- [ ] Fixture published diverifikasi pada halaman publik.
