# Content Ownership dan Targeting Sanity

Dokumen ini menjadi kontrak sebelum schema Sanity berikutnya dikembangkan.
Tujuannya menjaga sebagian besar website tetap stabil di source code, sambil
memberi editor kontrol atas konten yang memang sering berubah atau membutuhkan
upload file.

## Prinsip

1. Layout, route, komponen, teks UI, CTA, dan copy corporate utama tetap
   hardcoded di Next.js.
2. Sanity hanya menjadi sumber kebenaran untuk konten editorial dan asset yang
   perlu diubah tanpa deploy aplikasi.
3. Satu slot media hanya memiliki satu sumber Sanity. Jangan menyimpan asset
   yang sama di banyak schema.
4. Data yang tampil di website harus berstatus published dan memiliki field
   minimum yang dibutuhkan.
5. Fallback lokal hanya untuk development atau migrasi; fallback tidak boleh
   menyamarkan kegagalan CMS setelah cutover.

## Matriks sumber data

| Modul | Sumber | Dokumen/target | Status |
| --- | --- | --- | --- |
| Homepage layout dan copy | Next.js | `app/page.tsx`, i18n lokal | Hardcoded |
| Homepage hero | Sanity | `homePage.heroSlides` | Dinamis terbatas, maksimum 4 |
| Page hero image | Sanity | `mediaAsset` dengan `role = pageHero` | Dinamis asset |
| Artikel | Sanity | `newsroomArticle`, `newsroomCategory` | Dinamis |
| Publikasi PDF | Sanity | `publicationDocument`, `publicationCategory` | Dinamis |
| Dokumen legal | Sanity | `legalDocument` | Dinamis file |
| Dokumen kemitraan | Sanity | `legalDocument` atau publikasi terarah | Dinamis file |
| Struktur organisasi | Sanity | `teamMember` | Dinamis |
| Produk dan keberlanjutan | Next.js | page dan i18n lokal | Hardcoded |
| Kebijakan dan cookies | Next.js | page dan i18n lokal | Hardcoded |
| Lamaran kerja dan CV | Firebase | `careerApplications`, Cloud Storage | Bukan CMS |

## Model dokumen

### Artikel

Editor mengisi template tetap: judul, slug, excerpt, kategori, cover, tanggal,
isi, dan status tampil. Editor tidak mengubah layout halaman.

### Dokumen

Dokumen PDF memiliki file, judul, deskripsi, kategori, tanggal, dan status
tampil. Jenis penggunaan dibedakan melalui kategori/target, bukan dengan
menduplikasi aturan upload.

- Publikasi: tampil di `/artikel/publikasi`.
- Legalitas: tampil di halaman legalitas.
- Kemitraan: tampil di halaman kemitraan.

### Home Hero

Tetap berada pada `homePage.heroSlides`. Editor hanya mengatur slide 1–4,
judul, deskripsi, media, status aktif, dan urutan.

### Page Hero

Teks tetap berasal dari aplikasi. Asset hero dikelola oleh media slot dengan
target halaman yang sudah dipilih dari daftar, bukan route bebas.

### Struktur

Field editor:

- Nama
- Kelompok: Komisaris, Direksi, atau Tim & Divisi
- Jabatan
- Divisi/posisi tambahan bila diperlukan
- Foto
- Deskripsi singkat
- Urutan
- Tampilkan di website

Field legacy boleh tetap ada tersembunyi selama migrasi agar dokumen mock lama
tetap dapat dibaca.

### Media slot

Media dinamis memakai tiga key stabil:

```text
page    -> halaman target, misalnya profil-perusahaan
section -> segmen target, misalnya hero
slot    -> elemen target, misalnya background
```

Contoh:

```text
page: profil-perusahaan
section: hero
slot: background
```

`page`, `section`, dan `slot` harus dipilih dari opsi schema. Editor tidak
mengetik route atau key teknis secara bebas.

## Validasi media

- Error: asset wajib kosong, format salah, atau alt text kosong.
- Warning: rasio/resolusi kurang ideal.
- Informasi: rekomendasi ukuran dan area crop.

Resolusi dan rasio bukan error mutlak karena desain tetap memiliki fallback dan
crop responsif.

## Target runtime

Client aktif tetap:

```text
project: wm8u3z2o
dataset: production
perspective: published
```

Adapter frontend harus mengembalikan model tampilan yang stabil; komponen React
tidak boleh bergantung langsung pada bentuk asset Sanity.

## Urutan pengerjaan

1. Stabilkan schema publikasi, legal document, dan team member.
2. Integrasikan newsroom ke adapter Sanity dan hentikan duplikasi data lokal.
3. Tambahkan collection media slot untuk page/section/slot.
4. Hubungkan page hero dan slot media yang benar-benar dipakai frontend.
5. Masukkan satu fixture real per modul.
6. Verifikasi published, preview, locale, asset URL, dan fallback.
7. Baru setelah itu kurangi schema lama dan matikan Studio lama.

## Batasan rollout

Jangan menghapus dokumen mock atau Studio lama sebelum fixture real tervalidasi
di website production. Schema baru tidak mengubah atau menghapus data dataset
secara otomatis.
