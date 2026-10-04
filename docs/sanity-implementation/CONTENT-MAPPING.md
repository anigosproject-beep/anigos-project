---
document_type: application-content-mapping
project: petro-anigos
domain: frontend-to-sanity
audience: coding-agents-and-content-operators
language: id-ID
status: mapped-from-current-code
source_of_truth:
  routes: ../../petro-anigos/app
  components: ../../petro-anigos/components
  frontend_contracts: ../../petro-anigos/lib
  active_studio: ../../studio-anigos-project
related:
  - ./00-application-understanding.md
  - ./MASTER-BLUEPRINT.md
  - ./ARCHITECTURE-DECISIONS.md
---

# Content Mapping — Frontend Petro Anigos ke Sanity

Dokumen ini adalah inventaris detail kondisi aplikasi saat ini. Ia membedakan
empat hal yang sering tertukar:

1. **Konten editorial**: teks, artikel, dokumen, kontak, dan data organisasi.
2. **Media slot**: gambar yang memiliki lokasi website tetap.
3. **Media embedded**: gambar yang masih berada di object/page content lama.
4. **Asset UI/fallback**: ilustrasi, placeholder, icon, video demo, atau asset
   lokal yang tidak otomatis menjadi konten operator.

## 1. Aturan klasifikasi

| Kode              | Arti                                                               |
| ----------------- | ------------------------------------------------------------------ |
| `SANITY`          | Sudah dibaca dari Sanity saat runtime                              |
| `SANITY-FALLBACK` | Sanity dibaca, tetapi fallback lokal masih aktif                   |
| `LOCAL`           | Saat ini berasal dari kode/data lokal                              |
| `SLOT-TARGET`     | Belum dibaca dari slot baru, tetapi sudah dipetakan sebagai target |
| `UI-ASSET`        | Asset teknis/dekoratif yang tidak perlu dikelola operator          |
| `LEGACY`          | Berkaitan dengan schema atau mapper lama dan harus diselaraskan    |

## 2. Registry halaman dan route

Kolom `pageKey` adalah key yang harus dipakai konsisten oleh registry, seed,
schema, query, Structure Builder, dan preview. Kolom `heroSlotKey` adalah ID
logis; ID dokumen seeded mengikuti pola `media-hero-<pageKey>`.

|   # | Route                                | `pageKey`                   | Label operator            | Page hero saat ini                        | Target media/section                                                                      | Sumber data saat ini                                    | Status                |
| --: | ------------------------------------ | --------------------------- | ------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------- | --------------------- |
|   1 | `/`                                  | `home`                      | Beranda                   | Home hero carousel, bukan `pageHero`      | Home hero slide; Tentang Kami; Pencapaian; Produk; Kemitraan; Publikasi; artikel/resource | `/api/home-hero`, `/api/home`, fallback lokal           | `SANITY-FALLBACK`     |
|   2 | `/jangkauan`                         | `jangkauan`                 | Jangkauan                 | `/images/page-hero/tentang-kami.webp`     | Hero; Area layanan; feature video                                                         | `/api/jangkauan` + fallback hero                        | `SANITY-FALLBACK`     |
|   3 | `/artikel`                           | `artikel`                   | Artikel                   | `/images/page-hero/tentang-kami.webp`     | Hero; daftar artikel                                                                      | page statis + data lokal                                | `LOCAL`               |
|   4 | `/artikel/anigos-news`               | `anigos-news`               | Anigos News               | `/images/page-hero/tentang-kami.webp`     | Hero; daftar/filter artikel                                                               | `newsroom-data.ts`                                      | `LOCAL`               |
|   5 | `/artikel/[slug]`                    | `artikel`                   | Detail artikel            | Tidak dirender terpisah; mengikuti detail | Gambar artikel; video; isi artikel                                                        | `newsroom-data.ts`                                      | `LOCAL`               |
|   6 | `/artikel/publikasi`                 | `publikasi`                 | Publikasi                 | `/images/page-hero/tentang-kami.webp`     | Hero; thumbnail dokumen; PDF                                                              | `getSanityPublications()` + fallback PDF                | `SANITY-FALLBACK`     |
|   7 | `/artikel/landasan-informasi-publik` | `landasan-informasi-publik` | Landasan Informasi Publik | Tidak teridentifikasi sebagai `PageHero`  | Konten penjelasan informasi publik                                                        | hardcoded                                               | `LOCAL`               |
|   8 | `/tentang-kami/profil-perusahaan`    | `profil-perusahaan`         | Profil Perusahaan         | `/images/page-hero/tentang-kami.webp`     | Hero; video; feature image kantor                                                         | hardcoded + asset lokal                                 | `LOCAL`               |
|   9 | `/tentang-kami/harapan-cita-cita`    | `harapan-cita-cita`         | Harapan & Cita-Cita       | `/images/page-hero/tentang-kami.webp`     | Hero; pattern dekoratif; konten aspirasi                                                  | i18n + asset lokal                                      | `LOCAL`               |
|  10 | `/tentang-kami/client`               | `client`                    | Portofolio                | Hero lokal/i18n                           | Hero; pengantar; tabel nama/logo/lokasi/layanan/tahun; galeri perusahaan                  | `/api/kemitraan/clients`                                | `SANITY`              |
|  11 | `/tentang-kami/legalitas`            | `legalitas`                 | Legalitas                 | `/images/page-hero/tentang-kami.webp`     | Hero; legal highlights; dokumen legal                                                     | hardcoded                                               | `LOCAL`               |
|  12 | `/tentang-kami/struktur-perusahaan`  | `struktur-perusahaan`       | Struktur Perusahaan       | `/images/page-hero/tentang-kami.webp`     | Hero; profil Komisaris/Direksi; biografi dan galeri; anggota dan divisi                   | `teamMember` + `teamDivision` melalui `getSanityTeam()` | `SANITY`              |
|  13 | `/tentang-kami/karir`                | `karir`                     | Karir                     | `/images/page-hero/tentang-kami.webp`     | Hero; benefit; lowongan aktif                                                             | `careerOpening` melalui `/api/careers`                  | `SANITY`              |
|  14 | `/tentang-kami/karir/lamar`          | `karir-lamar`               | Form Lamaran              | Tidak ada mapping page hero khusus        | Form; attachment; pilihan dari lowongan aktif Sanity                                      | `careerOpening` + Firebase Storage/Firestore            | `SANITY` + `FIREBASE` |

Halaman Karir dan pilihan posisi form hanya menggunakan dokumen `careerOpening`
published dengan `isActive == true`; daftar kosong tidak diisi lowongan contoh
lokal. Sebelum menerima lamaran, API memverifikasi slug terhadap lowongan aktif
di Sanity lagi, lalu menyimpan lamaran dan file ke Firebase Storage/Firestore.
Data lamaran tidak disimpan sebagai dokumen Sanity.
| 15 | `/keberlanjutan` | `keberlanjutan` | Keberlanjutan | Tidak teridentifikasi pada grep PageHero | Sustainability content | lokal/i18n | `LOCAL` |
| 16 | `/keberlanjutan/energi-berkelanjutan` | `energi-berkelanjutan` | Energi Berkelanjutan | Tidak teridentifikasi pada grep PageHero | Video/feature content | lokal/i18n + video demo | `LOCAL` |
| 17 | `/keberlanjutan/kemitraan-tata-kelola` | `kemitraan-tata-kelola` | Kemitraan & Tata Kelola | Tidak teridentifikasi pada grep PageHero | Sustainability content | lokal/i18n | `LOCAL` |
| 18 | `/keberlanjutan/keselamatan-operasional` | `keselamatan-operasional` | Keselamatan Operasional | Tidak teridentifikasi pada grep PageHero | Sustainability content | lokal/i18n | `LOCAL` |
| 19 | `/produk/kenali-produk` | `kenali-produk` | Kenali Produk | `/images/page-hero/tentang-kami.webp` | Hero; product artwork; transport cards; video | lokal/i18n + asset lokal | `LOCAL` |
| 20 | `/produk/armada` | `armada` | Armada | `/images/page-hero/tentang-kami.webp` | Hero; fleet calculator; fleet illustrations | lokal/i18n + asset lokal | `LOCAL` |
| 21 | `/produk/penawaran` | `penawaran` | Penawaran | `/images/page-hero/tentang-kami.webp` | Hero; offer content | lokal/i18n | `LOCAL` |
| 22 | `/produk/penawaran/ajukan` | `ajukan-penawaran` | Ajukan Penawaran | `/images/page-hero/tentang-kami.webp` | Hero; form | lokal/form | `LOCAL` |
| 23 | `/kebijakan-data` | `kebijakan-data` | Kebijakan Data | `/images/page-hero/tentang-kami.webp` | Hero; legal policy text | lokal/i18n | `LOCAL` |
| 24 | `/ketentuan-cookies` | `ketentuan-cookies` | Ketentuan Cookies | `/images/page-hero/tentang-kami.webp` | Hero; legal policy text | lokal/i18n | `LOCAL` |

### Keputusan page hero

Route berikut memiliki pemanggilan `PageHero` dan perlu slot hero terpisah agar
operator tidak mengganti satu gambar yang dipakai banyak halaman:

```text
jangkauan
artikel
anigos-news
publikasi
profil-perusahaan
harapan-cita-cita
kemitraan
legalitas
struktur-perusahaan
karir
produk
kenali-produk
armada
penawaran
ajukan-penawaran
kebijakan-data
ketentuan-cookies
```

Route sustainability dan landasan informasi publik harus diputuskan setelah
verifikasi komponen lengkap: apakah memakai hero yang tidak terdeteksi sebagai
`PageHero`, atau memang tidak memiliki page hero. Jangan membuat slot hanya
berdasarkan nama route.

## 3. Home mapping detail

### 3.1 Home hero

| UI                  | Query/API        | Schema target                                | Fallback                                | Keputusan                                                |
| ------------------- | ---------------- | -------------------------------------------- | --------------------------------------- | -------------------------------------------------------- |
| Carousel slide      | `/api/home-hero` | `homePage.heroSlides[]`                      | `fallbackHeroSlides` di `home-hero.tsx` | Tetap embedded di singleton Home                         |
| Posisi slide        | `position`       | `position` 1–4                               | array order fallback                    | Tambahkan unique-position validation                     |
| Judul/keterangan    | localized query  | `title`, `description`                       | i18n fallback                           | Pertahankan localized field                              |
| CTA                 | localized query  | `cta`                                        | fallback CTA                            | Validasi href hasil mapping                              |
| Gambar/video/poster | image/file query | `image`, `video`, `videoPoster`, `mediaType` | asset lokal                             | Media video tetap bagian hero, bukan `mediaAsset` gambar |

### 3.2 Home section

| Lokasi UI           | Komponen                                                               | Data saat ini                                                        | Slot target                                                                                           | Tindakan                                                                                     |
| ------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Tentang Kami        | `FeatureImageSection` di `app/page.tsx`                                | `about.image`, fallback `office.png`                                 | `home/tentang-kami/background`                                                                        | Tetap menggunakan slot section `mediaAsset`                                                  |
| Marine Fuel Beranda | `MarineFuelShowcase` di `components/sections/marine-fuel-showcase.tsx` | Fallback `fuel-distribution.png`                                     | `home-marine-fuel-background`, `home-marine-fuel-video`                                               | Gambar latar dan video pemutar dikelola terpisah di Media Pendukung → Beranda                |
| Marine Fuel Produk  | `MarineFuelShowcase` di `components/sections/marine-fuel-showcase.tsx` | Fallback `fuel-distribution.png`                                     | `product-marine-fuel-background`, `product-marine-fuel-video`                                         | Gambar latar dan video pemutar dikelola terpisah di Media Pendukung → Produk → Kenali Produk |
| Pencapaian          | home content                                                           | teks/stat fallback                                                   | `home/pencapaian/background`                                                                          | Pastikan slot digunakan komponen                                                             |
| Produk              | `ProductShowcase`                                                      | Empat slot `pageMediaEditor.homeSlots[]` (`home-product-logo-1`–`4`) | Gambar, nama, dan keterangan tiap logo dari Media Pendukung; data `logoItems[]` lama menjadi fallback | Nama dan keterangan dilokalkan; gambar tetap memakai slot media                              |
| Kemitraan           | `PartnershipShowcase`                                                  | `partnershipShowcase.media[]`                                        | `home/kemitraan/image`                                                                                | Mapping slot per kartu harus eksplisit                                                       |
| Publikasi           | `ResourceGrid`/resources                                               | `resources.cards[].thumbnail`                                        | `home/publikasi/thumbnail`                                                                            | Pertahankan embedded thumbnail jika per-card diperlukan                                      |
| Artikel             | `ArticleShowcase`                                                      | newsroom/local data                                                  | `home/artikel/thumbnail`                                                                              | Gunakan artikel published; jangan pakai satu slot untuk semua kartu                          |

## 4. Mapping media slot seeded

Slot berikut sudah diseed dan merupakan daftar lokasi awal. `image` wajib diisi
operator sebelum slot dapat ditayangkan.

| Stable ID                                         | Lokasi operator                                   | Route target                             | Komponen target       | Status wiring     |
| ------------------------------------------------- | ------------------------------------------------- | ---------------------------------------- | --------------------- | ----------------- |
| `media-hero-jangkauan`                            | Jangkauan — Hero                                  | `/jangkauan`                             | `PageHero`            | `SLOT-TARGET`     |
| `media-hero-artikel`                              | Artikel — Hero                                    | `/artikel*`                              | `PageHero`            | `SLOT-TARGET`     |
| `media-hero-anigos-news`                          | Anigos News — Hero                                | `/artikel/anigos-news`                   | `PageHero`            | `SLOT-TARGET`     |
| `media-hero-publikasi`                            | Publikasi — Hero                                  | `/artikel/publikasi`                     | `PageHero`            | `SLOT-TARGET`     |
| `media-hero-profil-perusahaan`                    | Profil Perusahaan — Hero                          | `/tentang-kami/profil-perusahaan`        | `PageHero`            | `SLOT-TARGET`     |
| `media-hero-harapan-cita-cita`                    | Harapan & Cita-Cita — Hero                        | `/tentang-kami/harapan-cita-cita`        | `PageHero`            | `SLOT-TARGET`     |
| `media-hero-kemitraan`                            | Client — Hero                                     | `/tentang-kami/client`                   | `PageHero`            | `SANITY-FALLBACK` |
| `media-hero-legalitas`                            | Legalitas — Hero                                  | `/tentang-kami/legalitas`                | `PageHero`            | `SLOT-TARGET`     |
| `media-hero-struktur-perusahaan`                  | Struktur Perusahaan — Hero                        | `/tentang-kami/struktur-perusahaan`      | `PageHero`            | `SLOT-TARGET`     |
| `media-hero-karir`                                | Karir — Hero                                      | `/tentang-kami/karir`                    | `PageHero`            | `SLOT-TARGET`     |
| `media-hero-keberlanjutan`                        | Keberlanjutan — Hero                              | `/keberlanjutan*`                        | perlu verifikasi      | `SLOT-TARGET`     |
| `media-hero-energi-berkelanjutan`                 | Energi Berkelanjutan — Hero                       | `/keberlanjutan/energi-berkelanjutan`    | perlu verifikasi      | `SLOT-TARGET`     |
| `media-hero-kemitraan-tata-kelola`                | Kemitraan & Tata Kelola — Hero                    | `/keberlanjutan/kemitraan-tata-kelola`   | perlu verifikasi      | `SLOT-TARGET`     |
| `media-hero-keselamatan-operasional`              | Keselamatan Operasional — Hero                    | `/keberlanjutan/keselamatan-operasional` | perlu verifikasi      | `SLOT-TARGET`     |
| `media-hero-produk`                               | Produk — Hero                                     | `/produk*`                               | perlu route registry  | `SLOT-TARGET`     |
| `media-hero-kenali-produk`                        | Kenali Produk — Hero                              | `/produk/kenali-produk`                  | `PageHero`            | `SLOT-TARGET`     |
| `media-hero-armada`                               | Armada — Hero                                     | `/produk/armada`                         | `PageHero`            | `SLOT-TARGET`     |
| `media-hero-penawaran`                            | Penawaran — Hero                                  | `/produk/penawaran`                      | `PageHero`            | `SLOT-TARGET`     |
| `media-hero-kebijakan-data`                       | Kebijakan Data — Hero                             | `/kebijakan-data`                        | `PageHero`            | `SLOT-TARGET`     |
| `media-hero-ketentuan-cookies`                    | Ketentuan Cookies — Hero                          | `/ketentuan-cookies`                     | `PageHero`            | `SLOT-TARGET`     |
| `media-slot-home-tentang-kami-background`         | Beranda → Tentang Kami → Gambar latar             | `/`                                      | `FeatureImageSection` | `SLOT-TARGET`     |
| `media-slot-home-pencapaian-background`           | Beranda → Pencapaian → Gambar latar               | `/`                                      | achievements section  | `SLOT-TARGET`     |
| `media-slot-home-produk-image`                    | Beranda → Produk → Gambar utama                   | `/`                                      | `ProductShowcase`     | `SLOT-TARGET`     |
| `media-slot-home-kemitraan-image`                 | Beranda → Kemitraan → Gambar utama                | `/`                                      | `PartnershipShowcase` | `SLOT-TARGET`     |
| `media-slot-home-publikasi-thumbnail`             | Beranda → Publikasi → Thumbnail                   | `/`                                      | `ResourceGrid`        | `SLOT-TARGET`     |
| `media-slot-artikel-artikel-image`                | Artikel → Artikel → Gambar artikel                | `/artikel*`                              | article cards         | `SLOT-TARGET`     |
| `media-slot-anigos-news-artikel-image`            | Anigos News → Artikel → Gambar artikel            | `/artikel/anigos-news`                   | newsroom cards        | `SLOT-TARGET`     |
| `media-slot-publikasi-publikasi-thumbnail`        | Publikasi → Publikasi → Thumbnail dokumen         | `/artikel/publikasi`                     | `PublicationCard`     | `SLOT-TARGET`     |
| `media-slot-profil-perusahaan-tentang-kami-image` | Profil Perusahaan → Tentang Kami → Gambar utama   | `/tentang-kami/profil-perusahaan`        | `FeatureImageSection` | `SLOT-TARGET`     |
| `media-slot-harapan-cita-cita-tentang-kami-image` | Harapan & Cita-Cita → Tentang Kami → Gambar utama | `/tentang-kami/harapan-cita-cita`        | feature content       | `SLOT-TARGET`     |
| `media-slot-kemitraan-kemitraan-image`            | Client → Client → Gambar utama                    | `/tentang-kami/client`                   | partner showcase      | `SLOT-TARGET`     |
| `media-slot-legalitas-legalitas-thumbnail`        | Legalitas → Legalitas → Thumbnail dokumen         | `/tentang-kami/legalitas`                | legal documents       | `SLOT-TARGET`     |
| `media-slot-struktur-perusahaan-tim-image`        | Struktur Perusahaan → Tim → Foto tim              | `/tentang-kami/struktur-perusahaan`      | team cards            | `SLOT-TARGET`     |
| `media-slot-produk-produk-artwork`                | Produk → Produk → Artwork                         | `/produk*`                               | product cards         | `SLOT-TARGET`     |
| `media-slot-armada-produk-image`                  | Armada → Produk → Foto armada                     | `/produk/armada`                         | fleet cards           | `SLOT-TARGET`     |

## 5. Asset lokal yang bukan otomatis media slot

Asset berikut ditemukan di kode, tetapi tidak boleh langsung dimasukkan ke
registry slot tanpa keputusan UX:

| Asset/kelompok                                                 | Fungsi                               | Keputusan                                                       |
| -------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------- |
| `/images/team/portrait-placeholder.svg`                        | Placeholder saat foto anggota kosong | Tetap `UI-ASSET`, bukan konten operator                         |
| `/images/patterns/home-section-01/home-section-01-pattern.svg` | Pattern dekoratif                    | `UI-ASSET`, kecuali nanti ada kebutuhan brand editor            |
| `/video-hero/0914.mp4`                                         | Fallback/demo video home hero        | Fallback sementara; targetnya field video Sanity                |
| `partnership-*.svg`                                            | Ilustrasi card partnership/fleet     | Migrasikan hanya jika operator memang perlu mengganti per kartu |
| `article-*.svg`                                                | Fallback thumbnail artikel           | Fallback sementara setelah newsroom Sanity aktif                |
| `resource-*.svg`                                               | Resource card fallback               | Fallback/UI; per-card content lebih tepat di schema resource    |
| `mock-logo-*.svg`                                              | Data mock partnership                | Hapus setelah data partnership published                        |
| `/documents/mock-company-profile-1.pdf`                        | Dokumen mock                         | Hapus setelah dokumen Kemitraan Sanity terverifikasi            |
| `/images/company/office.png`                                   | Fallback About home                  | Ganti dengan home media slot setelah query dipakai              |
| `/images/page-hero/tentang-kami.webp`                          | Satu fallback untuk banyak hero      | Hapus per route setelah page hero slot terhubung                |

## 6. Mapping schema aktif dan consumer

| Schema aktif          | Consumer saat ini                                  | Consumer target                                             | Gap                                                                      |
| --------------------- | -------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| `homePage`            | `/api/home-hero`, `/api/home`                      | `HomeHero`, home sections                                   | Contract utama aktif; beberapa field tetap memiliki fallback             |
| `pageHero`            | `/api/page-hero` dan `PageHero`                    | Semua route page hero yang sudah diberi `pageKey`           | Fallback lokal masih dipertahankan sampai asset published lengkap        |
| `mediaAsset`          | `/api/home`, `/api/page-hero`                      | Slot section sesuai consumer yang sudah diverifikasi        | Wiring slot item-level masih membutuhkan model per-item                  |
| `article`             | `getSanityNewsroom()`                              | `/artikel`, `/artikel/anigos-news`, `[slug]`, home showcase | Migrasi data legacy belum dilakukan                                      |
| `publicationDocument` | `getSanityPublications()`                          | Publikasi + home resource                                   | Thumbnail global hanya fallback; thumbnail per-card tetap diprioritaskan |
| `companyDocument`     | adapter dokumen dan `/api/company-documents`       | Publikasi dokumen Kemitraan dan Legalitas                   | Migrasi data legacy dan verifikasi asset published belum selesai         |
| `teamDivision`        | Referensi schema                                   | Editor organisasi                                           | Query daftar divisi/label perlu konsisten                                |
| `teamMember`          | `getSanityTeam()`                                  | Struktur organisasi                                         | Adapter kanonis aktif; foto per anggota tetap embedded                   |
| `siteSettings`        | `getSanitySiteSettings()` dan `/api/site-settings` | Footer, contact CTA, metadata                               | Fallback lokal masih dipertahankan                                       |

## 7. Konflik yang harus diselesaikan sebelum registry dikodekan

Ketiga konflik di bawah ini sudah diputuskan. Rincian keputusan dan aturan
migrasinya ada di
[`ARCHITECTURE-DECISIONS.md`](./ARCHITECTURE-DECISIONS.md).

### 7.1 `article` baru versus `newsroomArticle` lama

**Keputusan:** `article` aktif menjadi model kanonis. `newsroomArticle` dan
`newsroomCategory` hanya sumber legacy untuk migration. `article` akan
diperluas dengan kebutuhan newsroom seperti subkategori, read time, video, dan
poster.

Kriteria keputusan: field kategori, subkategori, video, Portable Text, slug,
dan filter newsroom harus seluruhnya tercakup.

### 7.2 `companyDocument` versus `legalDocument` lama

**Keputusan:** `companyDocument` menjadi model Kemitraan dan Legalitas melalui
`documentType`; `publicationDocument` tetap menjadi model publikasi. `legalDocument`
dan model lama hanya menjadi sumber migration.

### 7.3 Embedded media versus `mediaAsset`

`productShowcase.media[]`, `partnershipShowcase.media[]`, thumbnail resource,
dan image artikel memiliki hubungan item-per-item. Ini bukan blocker model
editorial; keputusan tetap: jangan menggantinya dengan satu slot global jika
semua kartu harus memiliki gambar berbeda.

## 8. Legacy: webhook terjemahan lowongan karier (usang)

> **Usang:** instruksi webhook career-only berikut telah digantikan oleh
> [panduan DeepL dan terjemahan konten Sanity](./DEEPL-SANITY-TRANSLATION.md),
> yang mengatur seluruh tipe dokumen localized dan hanya menerjemahkan teks
> baru atau source yang berubah.

Endpoint `POST /api/sanity/translation-webhook` menerjemahkan field Indonesia
ke field `en` pada dokumen `careerOpening` yang sama. Endpoint ini memakai
`TRANSLATION_API_URL` dan `TRANSLATION_API_KEY` melalui helper terjemahan
server-side yang sudah ada, lalu menulis hasil menggunakan `SANITY_AUTH_TOKEN`.
`SANITY_TRANSLATION_WEBHOOK_SECRET` wajib disetel sebagai secret terpisah dan
dikirim oleh Sanity dalam header `Authorization: Bearer <secret>`.

Konfigurasikan webhook di Sanity Manage:

- URL: `https://<domain>/api/sanity/translation-webhook`
- Method: `POST`; aktifkan trigger `Create` dan `Update`, jangan aktifkan draft
  events.
- Filter: `_type == "careerOpening" && delta::changedAny(["title.id", "department.id", "location.id", "employmentType.id", "summary.id", "responsibilities[].id"])`
- Projection: `{ "_id": _id, "_type": _type }`
- Header: `Authorization: Bearer <nilai SANITY_TRANSLATION_WEBHOOK_SECRET>`
- Payload: JSON.

Filter hanya memicu webhook ketika sumber Bahasa Indonesia berubah, sehingga
mutasi field `en` yang dilakukan endpoint tidak memicu siklus terjemahan.
Endpoint mengambil dokumen terbaru dari Sanity, mengabaikan dokumen draft,
dan menerjemahkan field localized yang telah dikonfigurasi, termasuk setiap
item `responsibilities`. Field konten Sanity tipe lain belum otomatis
diterjemahkan; tambahkan ke registry endpoint secara eksplisit beserta filter
webhook sebelum mengaktifkannya.

### 7.4 Kategori organisasi

**Keputusan:** tiga kategori kanonis adalah `komisaris`, `direksi`, dan
`tim-divisi`. `operasional`, `armada`, dan `kemitraan` menjadi metadata/grouping
legacy yang diturunkan melalui reference `teamDivision` bila diperlukan.

## 8. Urutan mapping yang harus dikerjakan

1. Bekukan page registry dan route alias.
2. Bekukan daftar page hero yang benar-benar memiliki `PageHero`.
3. Bekukan section/slot yang memang dapat diedit operator.
4. Tandai embedded media yang harus tetap per-item.
5. Pilih model editorial final.
6. Selaraskan schema aktif, query, dan TypeScript type.
7. Buat Structure Builder dari registry.
8. Hubungkan slot satu domain pada satu waktu.
9. Migrasikan fallback setelah published data terbukti.
10. Jalankan acceptance test per route dan per slot.

## 9. Checklist anti-terlewat

- [ ] Semua 24 route aktif tercatat.
- [ ] Route dinamis artikel tercatat terpisah dari landing route.
- [ ] Semua `PageHero` yang terdeteksi tercatat.
- [ ] Route yang belum terbukti punya hero ditandai untuk verifikasi, bukan
      diasumsikan.
- [ ] 20 page hero seeded tercatat.
- [ ] 15 media section seeded tercatat.
- [ ] Home hero dipisahkan dari page hero.
- [ ] Embedded media per-item dipisahkan dari media slot global.
- [ ] Semua fallback lokal utama tercatat.
- [ ] Footer hardcoded tercatat.
- [ ] Legalitas hardcoded tercatat.
- [ ] Newsroom legacy tercatat.
- [ ] Schema legacy tercatat.
- [ ] Perbedaan field organisasi tercatat.
- [ ] Setiap mapping memiliki route dan consumer target.
- [ ] Tidak ada credential atau nilai rahasia dalam mapping.

## 10. Status mapping

```text
Route inventory: selesai untuk route yang ada di app/**/page.tsx
Seed slot inventory: selesai, 20 hero + 15 section
Fallback inventory: selesai untuk asset utama yang terdeteksi
Schema/consumer comparison: selesai secara discovery
Registry implementasi: selesai dan menjadi source of truth Studio
Page hero wiring: parsial — endpoint dan consumer aktif pada route yang memiliki pageKey
Media slot wiring: parsial — Home About dan Home Publikasi terhubung; slot item-level belum dipaksakan
Editorial model decision: accepted — lihat ARCHITECTURE-DECISIONS.md
Document model decision: accepted — lihat ARCHITECTURE-DECISIONS.md
Organization model decision: accepted — lihat ARCHITECTURE-DECISIONS.md
Ready to build Content Registry: selesai
Ready to build Structure Builder: selesai
```
