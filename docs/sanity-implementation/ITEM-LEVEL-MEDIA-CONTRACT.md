---
document_type: architecture-contract
project: petro-anigos
date: 2026-09-20
status: designed
---

# Kontrak Media Item-Level

Dokumen ini menetapkan pemilik data untuk media yang melekat pada item
individual. Media item-level **tidak boleh** dipindahkan ke satu global
`mediaAsset`, karena satu slot global tidak dapat membedakan item yang tampil
di kartu, detail, arsip, atau route berbeda.

## 1. Hasil pemetaan production

Inventory read-only Content Lake pada 2026-09-20 menemukan:

| Dokumen | Jumlah published | Media item ditemukan | Kesimpulan |
|---|---:|---|---|
| `homePage` | 1 | Tidak ada field item yang terisi | Home adalah singleton; hero tetap embedded |
| `mediaAsset` | 15 | Semua asset slot kosong pada baseline | Hanya untuk lokasi halaman/segmen |
| `mediaLibrary` | 1 | Seed metadata, bukan owner konten aktif | Compatibility catalog, bukan sumber consumer |
| `article` | 0 | Belum ada item published | Schema kanonis sudah memiliki `image` |
| `publicationDocument` | 0 | Belum ada thumbnail published | Thumbnail milik dokumen publikasi |
| `companyDocument` | 0 | Belum ada thumbnail published | Thumbnail milik dokumen perusahaan |
| `teamMember` | 0 | Belum ada foto published | Foto milik anggota tim |
| Produk / partner | 0 | Tidak ada model kanonis aktif | Jangan membuat mapping media tanpa owner item |

Inventory ini hanya membaca Content Lake. Tidak ada mutation atau migrasi yang
dilakukan.

## 2. Kontrak kanonis

| Domain | Pemilik editorial | Field kanonis | Bentuk media | Fallback yang diizinkan | Status |
|---|---|---|---|---|---|
| Home Hero | `homePage.heroSlides[]` | `image`, atau `video` + `videoPoster` | Embedded pada slide | Asset lokal hero hanya fallback sementara | Aktif |
| Artikel | `article` | `image` | Embedded pada artikel | `article-operation.svg` hanya bila item belum berasset | Aktif |
| Publikasi | `publicationDocument` | `thumbnail` | Embedded pada dokumen | Preview PDF/file; global slot hanya fallback section | Aktif |
| Kemitraan/Legalitas | `companyDocument` | `thumbnail` | Embedded pada dokumen | Preview PDF/file; global slot hanya fallback section | Aktif |
| Struktur organisasi | `teamMember` | `photo` | Embedded pada anggota | `portrait-placeholder.svg` | Aktif |
| Produk | Dokumen `product` yang akan dibuat | `artwork` | Embedded pada produk | Ilustrasi lokal per product ID selama transisi | Belum dibuat |
| Partner | Dokumen `partnership` yang akan dibuat | `image` dan opsional `logo` | Embedded pada partner | Ilustrasi lokal per opportunity ID selama transisi | Belum dibuat |
| Area jangkauan | Dokumen area | `image` | Embedded pada area | Fallback section hanya jika disetujui | Belum dipakai di Studio aktif |

### Aturan ownership

1. Field media harus berada pada dokumen yang memiliki nama, status publish,
   urutan, dan lifecycle item tersebut.
2. `mediaAsset` hanya boleh dipakai untuk satu lokasi layout yang stabil:
   page hero, section background, atau visual section yang tidak mewakili item
   individual.
3. `mediaLibrary` tidak menjadi sumber runtime. Ia hanya boleh dipertahankan
   sebagai katalog migrasi sampai seluruh owner kanonis terisi.
4. Fallback lokal tidak boleh menutupi asset kosong secara permanen. Validator
   harus tetap melaporkan item yang belum memiliki media wajib.
5. Draft/published state mengikuti dokumen owner. Tidak boleh membaca asset
   item dari perspective berbeda dari metadata item-nya.

## 3. Keputusan per domain

### Artikel

`article.image` adalah satu-satunya owner thumbnail artikel. Query newsroom
tetap membaca field tersebut dan adapter mengubahnya menjadi URL. Slot
`media-slot-artikel-artikel-image` dan `media-slot-anigos-news-artikel-image`
tidak boleh dipakai untuk menggantikan gambar tiap artikel; keduanya hanya
boleh menjadi visual section/header bila layout membutuhkan gambar global.

### Publikasi dan dokumen perusahaan

`publicationDocument.thumbnail` dan `companyDocument.thumbnail` adalah media
card masing-masing. File PDF tetap menjadi sumber dokumen utama dan dapat
dipakai sebagai preview bila thumbnail kosong. Slot
`home/publikasi/thumbnail`, `publikasi/publikasi/thumbnail`, dan
`legalitas/legalitas/thumbnail` hanya mewakili section/empty-state, bukan
thumbnail setiap dokumen.

### Struktur organisasi

`teamMember.photo` adalah owner foto. Placeholder lokal tetap valid sebagai
fallback visual, tetapi item tanpa foto harus terlihat dalam validator/operator
status. Slot `struktur-perusahaan/tim/image` tidak boleh menggantikan foto
anggota per orang.

### Produk

Frontend saat ini memakai daftar produk hardcoded dan membaca
`homePage.productShowcase.media[]` dari kontrak lama bila tersedia. Ini belum
layak dijadikan interface operator karena tidak ada schema produk aktif di
Studio.

Kontrak yang disarankan sebelum wiring:

```text
product
├── name {id, en}
├── slug
├── description {id, en}
├── artwork (image, required when published)
├── specs[]
├── availableForQuote
├── cta
└── isPublished
```

`homePage.productShowcase.products[]` kemudian hanya menjadi reference ke
`product`, bukan salinan data dan bukan daftar media terpisah. Selama schema
produk belum dibuat, media produk tetap fallback frontend dan tidak dibuatkan
slot per item.

### Partner

Frontend saat ini memiliki tiga opportunity hardcoded dan
`homePage.partnershipShowcase.media[]` lama yang dicari dengan `slot`.
Opportunity tersebut belum memiliki dokumen partner kanonis.

Kontrak yang disarankan:

```text
partnership
├── name
├── slug
├── logo (image, optional)
├── image (image, required when published)
├── partnerSince
├── portfolio
├── body
├── documentation / portfolioDocument
├── cta
└── isPublished
```

`homePage.partnershipShowcase.partners[]` harus menjadi reference ke
`partnership`. `partnershipShowcase.media[]` lama tidak boleh hidup sebagai
sumber kedua setelah model kanonis aktif; ia hanya menjadi sumber migrasi
sementara. Visual opportunity generik (`transportasi`, `distribusi`, `usaha`)
harus diputuskan sebagai **content item** atau **UI illustration** sebelum
dibuat schema. Jangan menganggapnya partner nyata.

## 4. Pemetaan source legacy ke target

| Source lama | Target | Perlakuan |
|---|---|---|
| `homePage.productShowcase.media[]` | `product.artwork` | Migrasi per `slug` hanya setelah dokumen product ada |
| `homePage.partnershipShowcase.media[]` | `partnership.image` | Migrasi per key/slug setelah owner partner dikonfirmasi |
| `article.image` / `newsroomArticle.image` | `article.image` | `article` kanonis; legacy hanya fallback read-only |
| `publicationDocument.thumbnail` | Tetap `publicationDocument.thumbnail` | Tidak dipindah ke `mediaAsset` |
| `companyDocument.thumbnail` | Tetap `companyDocument.thumbnail` | Tidak dipindah ke `mediaAsset` |
| `teamMember.photo` | Tetap `teamMember.photo` | Tidak dipindah ke `mediaAsset` |
| `mediaAsset` item-looking slots | Section/page slot | Audit label; jangan menganggapnya owner item |
| `mediaLibrary.groups[].items[].asset` | Owner kanonis masing-masing | Katalog migrasi, bukan runtime source |

Tidak ada migration write sampai pemilik konten menyetujui pasangan source →
target dan item target sudah tersedia.

## 5. Dampak pada operator non-programmer

Operator tidak perlu memilih asset berdasarkan ID teknis. Navigasi yang
disarankan:

- **Artikel & Publikasi → pilih artikel → Gambar artikel**
- **Dokumen Perusahaan → pilih dokumen → Thumbnail dokumen**
- **Struktur Organisasi → pilih anggota → Foto**
- **Produk → pilih produk → Artwork** (setelah schema product aktif)
- **Kemitraan → pilih partner → Gambar partner** (setelah schema partnership aktif)

Field `page`, `section`, dan `slot` tetap read-only pada media lokasi halaman.
Operator tidak diberi dua tempat untuk mengubah gambar item yang sama.

## 6. Urutan implementasi setelah desain

1. Tambahkan contract types/query tests untuk artikel, dokumen, publikasi, dan
   organisasi; jangan ubah ownership yang sudah kanonis.
2. Putuskan apakah produk dan opportunity kemitraan generik memang harus
   editable di Sanity. Jika ya, buat schema `product` dan `partnership` dengan
   reference dari Home.
3. Migrasikan media item lama secara dry-run per owner, lalu validasi asset
   published dan draft.
4. Baru setelah itu kurangi fallback lokal dan jalankan operator acceptance.

## 7. Hal yang sengaja tidak dilakukan

- Tidak membuat `mediaAsset` baru untuk setiap produk, partner, artikel, atau
  anggota tim.
- Tidak menggabungkan thumbnail dokumen dengan slot publikasi global.
- Tidak memindahkan foto tim ke media library.
- Tidak membuat dokumen produk/partner tanpa keputusan bahwa data item memang
  dikelola operator.
- Tidak melakukan mutation Content Lake pada tahap desain ini.
