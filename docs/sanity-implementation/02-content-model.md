---
document_type: implementation-phase
phase: 2
status: implemented
depends_on: [01-foundation]
primary_files:
  - ../../studio-anigos-project/schemaTypes/index.ts
verify: npm run build
---

# Langkah 2 — Content Model

## Tujuan

Membuat schema yang memisahkan konten yang dapat diedit operator dari struktur layout yang tetap.

## Jenis konten utama

### Singleton

Hanya boleh ada satu dokumen:

- `homePage`
- `siteSettings`

### Koleksi

Dapat memiliki banyak dokumen:

- `article`
- `publicationDocument`
- `companyDocument`
- `teamMember`
- `teamDivision`
- `pageHero`
- `mediaAsset`
- `product`
- `fleetOption`
- `client`
- `partnership`
- `partnershipPage` (singleton)

## Aturan model

### Artikel

Field wajib:

- Judul
- Slug
- Ringkasan
- Kategori
- Tanggal publikasi
- Gambar
- Isi artikel

### Logo produk homepage

Pada **Media Pendukung → Beranda → Produk & Layanan — Logo**, setiap slot logo
menyediakan field localized `Nama produk / layanan`, `Keterangan produk /
layanan`, dan gambar. Isi Bahasa Indonesia dan English; teks ditampilkan
bersama logo pada showcase produk homepage. Editor **Home Hero** hanya
mengatur slide hero; data showcase produk lama tetap dibaca sebagai fallback,
tetapi tidak lagi diedit dari form Home Hero.

### Dokumen

Pisahkan secara operasional:

- Dokumen Kemitraan
- Dokumen Legalitas
- Dokumen Publikasi

File PDF wajib diisi. Gunakan status tampil/nonaktif untuk menyembunyikan dokumen tanpa menghapus riwayat.

### Struktur organisasi

Menu **Struktur Perusahaan** menyediakan tiga daftar:

```text
Struktur Perusahaan
├── Komisaris → Nama, foto, kutipan, biografi Portable Text, galeri foto
├── Direksi → Nama, jabatan pilihan/lainnya, foto, kutipan, biografi, galeri
└── Tim dan Divisi
    ├── Daftar Divisi → Nama dan deskripsi divisi
    └── Anggota Tim → Nama, divisi, jabatan, foto
```

`teamMember` menyimpan Komisaris, Direksi, dan anggota divisi dengan
`structuralClass`; `teamDivision` menjadi sumber pilihan divisi. Biografi
mendukung bold, italic, daftar, kutipan, serta tautan. Halaman Struktur
Perusahaan hanya menampilkan dokumen Sanity yang terbit; tidak menggunakan
profil mock sebagai fallback. Foto profil dan foto galeri anggota juga menjadi
sumber kategori Komisaris & Direksi pada Galeri Artikel.

### Media

Media selalu memiliki:

```text
Halaman → Segmen → Elemen media → Asset
```

Operator tidak mengetik nama halaman atau segmen secara bebas.

### Galeri layanan dan publikasi

- **Produk → Halaman Layanan** membuka singleton `serviceGalleryEditor` yang
  hanya berisi daftar foto tanpa judul atau
  keterangan. Foto-foto tersebut otomatis ditambahkan ke kategori Produk &
  Layanan pada Galeri Artikel.
- **Artikel → Galeri → Konten Galeri** mengelola foto publikasi satu per
  dokumen (`galleryPhoto`) dengan foto, kategori, judul, dan keterangan.
- Pilihan kategori bawaan menggunakan daftar kategori yang sama dengan Galeri
  publik (`shared/gallery-categories.ts`). Untuk kategori lain, operator dapat
  memilih atau membuat dokumen `galleryCategory`; kategori tersebut kemudian
  dapat dipakai kembali dan ditampilkan pada filter Galeri publik.

### Pengaturan visibilitas halaman

Dokumen singleton `pageVisibilitySettings` adalah sumber status aktif/nonaktif
untuk halaman publik. App membaca dokumen ini melalui satu fungsi server yang
di-cache dengan tag `page-visibility`; layout, navigasi, tombol internal, dan
sitemap menggunakan snapshot map yang sama. Header desktop/mobile dan footer
memfilter tautan per halaman; grup footer tanpa tautan tidak dirender, dan
sitemap mengecualikan route statis maupun detail artikel yang dinonaktifkan.
Halaman tidak membuat query Sanity masing-masing. Jika Sanity sementara tidak
tersedia sebelum snapshot pernah terbentuk, app mempertahankan pengalaman situs
publik dengan default aktif.
Timeout dicatat sebagai warning tanpa stack trace; kegagalan non-ketersediaan
tetap dicatat sebagai error. Pengaturan ini menyembunyikan konten pemasaran, bukan
mekanisme otorisasi atau perlindungan data privat.

Untuk propagasi publish yang cepat, konfigurasi webhook Sanity perlu diarahkan ke
`POST /api/sanity/page-visibility-webhook` pada domain app, dengan filter GROQ
`_type == "pageVisibilitySettings" && _id == "pageVisibilitySettings"`,
projection `{_id, _type}`, serta header
`Authorization: Bearer <SANITY_PAGE_VISIBILITY_WEBHOOK_SECRET>`. Simpan nilai
secret yang sama pada environment deployment app; jangan commit nilainya.
Callback menandai cache sebagai stale dengan stale-while-revalidate, sehingga
permintaan berikutnya tetap memakai snapshot terakhir yang baik sementara
Sanity dibaca ulang di belakang. Browser memeriksa snapshot bersama tiap 30
detik, mengirim ETag, dan tidak mengganti status terakhir jika handler sedang
gagal. TTL lima menit menjadi rekonsiliasi jika callback gagal atau belum
dikonfigurasi. Trade-off-nya: toggle dapat terlambat terlihat sampai satu siklus
refresh, tetapi gangguan Sanity tidak mengubah semua halaman menjadi terblokir.
Pola cache dan invalidasinya mengikuti dokumentasi resmi
[Next.js `unstable_cache`](https://nextjs.org/docs/app/api-reference/functions/unstable_cache)
dan
[Next.js `revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag);
webhook publish mengikuti
[Sanity Webhooks](https://www.sanity.io/docs/webhooks).

### Produk, armada, dan kemitraan

Domain Produk/Kemitraan kini memiliki model Studio kanonis yang terpisah dari
global media slot:

- `product` memiliki artwork dan spesifikasi per produk.
- `fleetOption` memiliki kapasitas, moda, catatan, dan foto armada.
- `partnership` memiliki identitas partner, gambar, logo opsional, dan dokumen
  partner.
- `partnershipPage` memiliki isi halaman dan reference ke partner yang
  ditampilkan.
- `client` adalah model mandiri untuk portofolio end-client, terpisah dari
  dokumen `partner` yang mengatur logo mitra Beranda. Data client mencakup nama,
  logo, lokasi, tahun layanan, pilihan jenis layanan BBM industri, layanan
  manual untuk opsi lainnya, status aktif, dan galeri foto berketerangan.
- Migrasi awal dari dokumen `partner` aktif menyalin nama, logo, serta galeri;
  tahun layanan dipetakan dari tanggal bermitra dan jenis Solar Industri/HSD
  hanya disalin bila bentuk kemitraan sumber menyebut produk tersebut. Lokasi
  yang tidak tersedia tidak ditebak dan perlu dilengkapi editor.
- Jalankan `node scripts/migrate-partners-to-clients.mjs` untuk dry-run dan
  tambahkan `--apply` untuk menulis dokumen Client baru. Migrasi memakai ID
  deterministik, tidak mengubah dokumen Mitra sumber, dan memerlukan token
  Sanity dengan akses Editor yang valid.
- Halaman `/tentang-kami/client` membaca client aktif melalui
  `/api/kemitraan/clients`. Dokumen `partner` lama yang ditandai `isClient ==
true` tetap dibaca sebagai kompatibilitas; dokumen mitra Home lainnya tidak
  dianggap sebagai client.

Model ini baru menjadi surface editorial. Query frontend dan migrasi data belum
diaktifkan sampai contract test dan keputusan fallback selesai.

## Kriteria selesai

- Field wajib jelas.
- Field kondisional hanya muncul saat diperlukan.
- Schema tidak memberi operator akses mengubah layout.
- Preview dokumen menampilkan informasi yang berguna.
