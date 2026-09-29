---
document_type: content-owner-input
project: petro-anigos
topic: canonical-domain-seed-manifest
date: 2026-09-21
status: ready-for-content-input
---

# Kebutuhan Data Manifest Domain Sanity

Dokumen ini adalah formulir kebutuhan data untuk mengisi:

[`studio-anigos-project/seed/domain-content.manifest.json`](../../studio-anigos-project/seed/domain-content.manifest.json)

Manifest ini akan dipakai untuk membuat data canonical:

- Produk;
- Armada;
- Partner;
- Halaman Kemitraan.

Untuk review fakta lintas domain, gunakan juga
[Register Validasi Konten dan Fakta Bisnis](./CONTENT-VALIDATION-REGISTER-2026-09-21.md).

## Aturan penting

1. Isi hanya dengan data resmi perusahaan.
2. Jangan memasukkan data dari fallback frontend, mock, placeholder, atau
   ilustrasi lokal sebagai data produksi.
3. Setiap item harus memiliki sumber data dan pemilik persetujuan.
4. Gambar dan dokumen harus sudah tersedia sebagai asset Sanity atau memiliki
   mapping asset yang jelas.
5. Jangan mengubah `id` setelah manifest pernah dipreview atau diterapkan.
6. Jangan mengubah `approvalStatus` menjadi `approved` sebelum seluruh data
   dan asset diperiksa content owner.
7. Seed tidak menghapus atau menimpa dokumen existing.

## Status approval

Nilai yang digunakan:

| Nilai | Arti |
|---|---|
| `pending` | Data belum lengkap atau belum disetujui. |
| `review` | Data lengkap dan sedang diperiksa. |
| `approved` | Boleh diproses oleh seed apply. |

Approval global pada manifest hanya boleh menjadi `approved` jika seluruh item
yang akan dibuat juga memiliki `approvalStatus: "approved"`.

## Format item umum

Setiap item domain memakai bentuk berikut:

```json
{
  "id": "stable-kebab-case-id",
  "source": "nama-file-atau-sumber-resmi",
  "assetOwner": "nama-pemilik-asset",
  "approvalStatus": "pending",
  "fields": {}
}
```

### Arti field umum

- `id`: ID stabil internal, huruf kecil dan tanda hubung, contoh
  `solar-hsd-industri`.
- `source`: nama dokumen, spreadsheet, folder asset, atau keputusan resmi
  yang menjadi sumber.
- `assetOwner`: orang/unit yang memastikan hak pakai dan kebenaran asset.
- `approvalStatus`: status persetujuan item.
- `fields`: payload yang sesuai schema Sanity canonical.

## 1. Produk

Masukkan satu item untuk setiap produk yang memang boleh tampil pada:

`/produk/kenali-produk`

### Field wajib

| Field | Format | Contoh format |
|---|---|---|
| `name.id` | string | Nama resmi Bahasa Indonesia |
| `name.en` | string | Nama resmi Bahasa Inggris |
| `slug` | string unik | `solar-hsd-industri` |
| `description.id` | string | Deskripsi resmi Indonesia |
| `description.en` | string | Deskripsi resmi Inggris |
| `artwork` | Sanity image reference | Asset artwork resmi |
| `category` | `bbm-industri` atau `biosolar` | `biosolar` |

### Field opsional

- `specs[]`: setiap item memiliki `label.id`, `label.en`, dan `value`.
- `availableForQuote`: boolean, default `true`.
- `order`: integer mulai dari `0`.
- `isPublished`: boolean.

### Catatan asset

Artwork harus memiliki owner dan rekomendasi preset `productArtwork`.

## 2. Armada

Masukkan satu item untuk setiap pilihan kapasitas yang memang ditawarkan pada:

`/produk/armada`

### Field wajib

| Field | Format |
|---|---|
| `label` | string |
| `capacity` | angka positif |
| `unit` | contoh `liter` |
| `transportMode` | `darat`, `laut`, atau `mitra` |
| `note.id` | string |
| `note.en` | string |
| `image` atau `gallery[]` | Sanity image reference; gunakan `gallery[]` untuk satu atau lebih foto per varian |

### Field opsional

- `order`: integer mulai dari `0`.
- `isPublished`: boolean.

### Catatan asset

Foto armada harus memiliki owner dan mengikuti preset `fleetPhoto`. Untuk tahap
development, mock dari folder `public` boleh digunakan sebagai placeholder dengan
catatan `DEVELOPMENT MOCK - REPLACE BEFORE PUBLISH`; mock tidak boleh dianggap
sebagai bukti approval konten. Setiap varian
liter dapat memiliki satu atau lebih foto pada `gallery[]`; foto pertama menjadi
tampilan awal carousel. Field `image` tetap dapat dipakai sebagai fallback untuk
data lama, tetapi konten baru sebaiknya mengisi `gallery[]`. Jangan
memakai ilustrasi peluang kemitraan sebagai foto armada resmi.

## 3. Partner

Masukkan hanya perusahaan yang secara resmi boleh tampil pada:

`/tentang-kami/kemitraan`

### Field wajib

| Field | Format |
|---|---|
| `name` | nama resmi perusahaan |
| `slug` | string unik |
| `image` | Sanity image reference |
| `portfolio.id` | string |
| `portfolio.en` | string |
| `body.id` | string |
| `body.en` | string |

### Field opsional

- `logo`: Sanity image reference.
- `partnerSince`: `YYYY-MM-DD`.
- `portfolioDocument`: Sanity file reference.
- `documentation`: Sanity file reference.
- `order`: integer mulai dari `0`.
- `isPublished`: boolean.

### Catatan asset dan legalitas

Logo, gambar, dan dokumen harus memiliki pemilik asset serta persetujuan
publikasi. Jangan memasukkan nama partner dari mock atau contoh frontend.

## 4. Halaman Kemitraan

Halaman ini adalah singleton canonical untuk route:

`/tentang-kami/kemitraan`

### Field yang perlu dilengkapi

```json
{
  "approvalStatus": "pending",
  "documentId": "partnershipPage-main",
  "fields": {
    "hero": {},
    "intro": {},
    "partners": [],
    "process": [],
    "closing": {}
  }
}
```

### Struktur editorial

- `hero.title.id` dan `hero.title.en`
- `hero.description.id` dan `hero.description.en`
- `hero.image` bila memakai image owner pada halaman
- `intro.eyebrow`, `intro.title`, `intro.lead`, `intro.body`
- `partners`: daftar `id` partner yang sudah ada di manifest
- `process[]`:
  - `title.id`
  - `title.en`
  - `body.id`
  - `body.en`
- `closing`: konten penutup bilingual bila digunakan oleh frontend

Partner yang dicantumkan pada `partners` harus memiliki item yang sesuai di
manifest dan tidak boleh inactive jika halaman akan dipublish.

## Asset mapping

Asset harus dicatat sebelum seed. Gunakan tabel berikut sebagai checklist:

| Domain | Item ID | Field | Sumber asset | Sanity asset ID/reference | Asset owner | Approved |
|---|---|---|---|---|---|---|
| Produk | `...` | `artwork` | `...` | `image-...` | `...` | `pending` |
| Armada | `...` | `image` | `...` | `image-...` | `...` | `pending` |
| Partner | `...` | `logo`/`image` | `...` | `image-...` | `...` | `pending` |
| Partner | `...` | `portfolioDocument` | `...` | `file-...` | `...` | `pending` |

Jika asset belum diunggah ke Sanity, jangan mengisi reference palsu. Unggah
asset terlebih dahulu atau tandai item sebagai `pending`.

## Checklist sebelum approval

- [ ] Semua item memiliki `id` unik.
- [ ] Semua slug unik.
- [ ] Semua data berasal dari sumber resmi.
- [ ] Semua teks bilingual sudah diperiksa.
- [ ] Semua image/file memiliki asset owner.
- [ ] Semua asset dapat ditemukan atau sudah memiliki Sanity reference.
- [ ] Tidak ada fallback frontend atau mock.
- [ ] Reference partner pada Partnership Page valid.
- [ ] Urutan tampil sudah disepakati.
- [ ] Status tayang sudah disepakati.
- [ ] Content owner menyetujui seluruh item.
- [ ] `approvalStatus` global dapat diubah menjadi `approved`.

## Alur setelah manifest lengkap

Dari folder `studio-anigos-project`:

```powershell
npm run seed:domain:dry-run -- --output ..\docs\sanity-implementation\DOMAIN-SEED-DRY-RUN.json
```

Review laporan. Jika semua issue dan conflict sudah selesai:

```powershell
npm run seed:domain:apply
```

Setelah apply:

```powershell
npm run validate:content
npm run migrate:dry-run
```

Apply tidak boleh dijalankan jika manifest masih `pending` atau `review`.
