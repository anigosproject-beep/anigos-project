---
document_type: architecture-decision-record
project: petro-anigos
domain: sanity
audience: coding-agents-and-project-team
language: id-ID
status: accepted-for-implementation
source_of_truth:
  active_studio: ../../studio-anigos-project
  frontend: ../../petro-anigos
  mapping: ./CONTENT-MAPPING.md
related:
  - ./MASTER-BLUEPRINT.md
  - ./00-application-understanding.md
---

# Architecture Decisions — Tiga Keputusan Model

Dokumen ini menyelesaikan tiga blocker yang dicatat pada
[`CONTENT-MAPPING.md`](./CONTENT-MAPPING.md). Keputusan berlaku untuk
implementasi berikutnya dan tidak mengubah data Content Lake secara otomatis.

## Decision 1 — Model artikel

### Keputusan

`article` menjadi **model editorial kanonis** untuk seluruh artikel:

- halaman daftar `/artikel`;
- Anigos News `/artikel/anigos-news`;
- detail `/artikel/[slug]`;
- artikel unggulan di Beranda;
- artikel yang direkomendasikan di section lain.

`newsroomArticle` dan `newsroomCategory` diperlakukan sebagai **legacy source**,
bukan model baru untuk operator.

### Alasan

- Schema aktif sudah memiliki `article`.
- Operator membutuhkan satu menu Artikel, bukan dua koleksi yang maknanya sama.
- `article` sudah memiliki title, slug, excerpt, category, date, image,
  featured, content, dan status.
- Model aktif dapat diperluas untuk menampung kebutuhan runtime newsroom tanpa
  mempertahankan schema ganda.

### Perluasan kontrak `article`

Implementasi Fase 2 harus menambahkan atau menyelaraskan:

| Kebutuhan runtime | Field kanonis | Catatan |
|---|---|---|
| Kategori newsroom | `category` | Gunakan referensi/katalog kategori, bukan string bebas jika kategori perlu dikelola operator |
| Subkategori | `subcategory` | Pilihan dibatasi berdasarkan kategori |
| Durasi baca | `readTime` | Opsional; dapat dihitung atau diisi editor |
| Video | `video` | File MP4/WebM opsional |
| Poster video | `videoPoster` | Wajib jika `video` diisi |
| Isi | `content` | Portable Text, bukan `string[]` legacy |
| Tayang | `isPublished` | Tetap menjadi visibility flag; publish Sanity tetap menjadi workflow publikasi |
| Featured | `featured` | Dipakai home/newsroom |

### Aturan migrasi

1. Buat mapper legacy `newsroomArticle` → `article`.
2. Jalankan dry-run untuk slug, kategori, subkategori, media, video, dan
   Portable Text.
3. Migrasikan data yang lolos validasi dengan stable slug.
4. Ubah route frontend agar membaca `article`.
5. Pertahankan fallback lokal hanya sampai data published tervalidasi.
6. Jangan menghapus schema legacy atau data legacy sebelum laporan migrasi
   disetujui.

### Dampak

- `lib/sanity-newsroom.ts` akan menjadi adapter query `article`.
- `lib/newsroom-data.ts` turun status menjadi fallback/migration fixture.
- Route daftar dan detail tidak boleh lagi membaca `newsroom-data.ts` sebagai
  sumber utama.
- `article` perlu category contract yang mampu menghasilkan slug dan label
  konsisten.

## Decision 2 — Model dokumen

### Keputusan

Gunakan dua model operator yang jelas:

1. `companyDocument` untuk **Dokumen Kemitraan** dan **Dokumen Legalitas**,
   dibedakan oleh `documentType`.
2. `publicationDocument` untuk **Dokumen Publikasi**.

`legalDocument`, `legalitasPage`, dan model dokumen pada Studio lama menjadi
**legacy source/reference**. Mereka tidak menjadi koleksi baru yang terlihat
operator setelah migrasi.

### Alasan

- Kebutuhan operator memang memiliki tiga kelompok dokumen.
- `companyDocument.documentType` sudah menyediakan pemisahan Kemitraan dan
  Legalitas dalam satu template PDF yang sama.
- `publicationDocument` memiliki workflow dan daftar menu sendiri.
- Menu Studio dapat menampilkan tiga pekerjaan tanpa menduplikasi implementasi
  field file, tanggal, issuer, thumbnail, dan status.

### Kontrak kanonis

| Kelompok operator | Schema | Filter |
|---|---|---|
| Dokumen Kemitraan | `companyDocument` | `documentType == "kemitraan"` |
| Dokumen Legalitas | `companyDocument` | `documentType == "legalitas"` |
| Dokumen Publikasi | `publicationDocument` | `_type == "publicationDocument"` |

`legalitasPage` tidak dihapus dari sejarah kode sebelum konten tekstualnya
dipetakan. Jika halaman Legalitas membutuhkan intro/highlight yang dapat diedit,
buat singleton kanonis terpisah dengan nama operasional yang jelas, bukan
menggunakan `legalDocument` sebagai koleksi campuran.

### Aturan migrasi

1. Inventaris `legalDocument` dan referensi `legalitasPage`.
2. Pindahkan file dan metadata dokumen ke `companyDocument` dengan
   `documentType: "legalitas"`.
3. Pindahkan dokumen partnership ke `companyDocument` dengan
   `documentType: "kemitraan"`.
4. Pertahankan publication sebagai `publicationDocument`.
5. Hubungkan route Kemitraan, Publikasi, dan Legalitas ke query kanonis.
6. Jangan menjadikan fallback PDF sebagai keberhasilan fetch Sanity.

### Dampak

- Structure Builder menampilkan tiga menu operator.
- Query dokumen menggunakan dua schema kanonis dan filter eksplisit.
- Route Legalitas memerlukan integrasi baru; tidak boleh membaca array
  `legalHighlights` lokal sebagai sumber final.
- Thumbnail dan file harus memiliki aturan published/active yang konsisten.

## Decision 3 — Model organisasi

### Keputusan

Gunakan tiga kategori struktural kanonis sesuai kebutuhan operator:

```text
Komisaris
Direksi
Tim dan Divisi
```

Untuk `Tim dan Divisi`, divisi menjadi reference ke `teamDivision` dan posisi
dibatasi menjadi:

```text
Kepala Divisi
Tim Divisi
Lainnya → Posisi lainnya
```

Nilai legacy `operasional`, `armada`, dan `kemitraan` tidak lagi menjadi
kategori struktural utama. Jika dibutuhkan untuk tampilan lama, nilai tersebut
diturunkan dari reference divisi atau disimpan sebagai metadata migrasi, bukan
ditampilkan sebagai pilihan jabatan operator.

### Alasan

- Ini persis mengikuti brief operator.
- Schema aktif sudah memiliki `structuralRole`, `division`, `divisionRole`,
  dan `customDivisionRole`.
- Reference divisi lebih presisi daripada string category bebas.
- Pengelompokan frontend lama dapat diganti dengan grouping berdasarkan
  `structuralRole` lalu `division`.

### Kontrak kanonis

| Kebutuhan | Field |
|---|---|
| Nama | `name` |
| Jabatan utama | `structuralRole` |
| Komisaris/Direksi | `officialTitle` |
| Divisi | `division` → `teamDivision` |
| Posisi divisi | `divisionRole` |
| Posisi manual | `customDivisionRole` |
| Foto | `photo` |
| Urutan | `order` |
| Tayang | `isPublished` |

### Aturan migrasi

1. Map `structuralClass == "komisaris"` ke `structuralRole: "komisaris"`.
2. Map `structuralClass == "direksi"` ke `structuralRole: "direksi"`.
3. Map anggota `operasional`, `armada`, atau `kemitraan` ke
   `structuralRole: "tim-divisi"`.
4. Cocokkan nama category lama ke `teamDivision` melalui tabel mapping manual
   jika tidak dapat ditentukan otomatis.
5. Map `position`/`role` ke `officialTitle`, `divisionRole`, atau
   `customDivisionRole` sesuai konteks.
6. Jangan menghapus anggota yang tidak dapat dipetakan; masukkan ke laporan
   migration exception.

### Dampak

- `getSanityTeam()` harus membaca field kanonis, bukan field legacy sebagai
  prioritas.
- Type frontend harus memakai tiga structural group atau grouping turunan yang
  terdokumentasi.
- UI boleh menampilkan nama divisi sebagai subgroup di dalam Tim dan Divisi.
- Operator tidak melihat `operasional`, `armada`, atau `kemitraan` sebagai
  dropdown jabatan.

## Matriks keputusan final

| Domain | Kanonis | Legacy | Status |
|---|---|---|---|
| Artikel | `article` | `newsroomArticle`, `newsroomCategory` | Diterima |
| Kemitraan | `companyDocument` dengan `documentType: kemitraan` | `legalDocument`, mock partnership | Diterima |
| Legalitas | `companyDocument` dengan `documentType: legalitas` + singleton content bila diperlukan | `legalDocument`, `legalitasPage` lama | Diterima |
| Publikasi | `publicationDocument` | fallback PDF lokal | Diterima |
| Organisasi | `teamMember` + `teamDivision` dengan `structuralRole` | category/teamGroup/structuralClass lama | Diterima |

## Guardrails implementasi

- Jangan membuat schema baru yang menduplikasi tiga model kanonis.
- Jangan mengubah stable media ID yang sudah diseed.
- Jangan menjalankan migration production tanpa dry-run dan backup/export.
- Jangan menghapus fallback sebelum route membaca data published yang benar.
- Jangan menyembunyikan migration exception; laporkan item yang tidak dapat
  dipetakan.
- Jangan mencampur `isPublished` dengan status draft/published Sanity:
  `isPublished` adalah visibility bisnis, sedangkan draft/published adalah
  workflow dokumen.

## Status keputusan

```text
Editorial model: accepted
Document model: accepted
Organization model: accepted
Content Registry implementation: accepted and validated
Schema migration: started — registry options and media-slot validation wired
Content migration: not started
Frontend rewiring: not started
```
