# Milestone: Public Mock Domain Bootstrap

Tanggal: 21 September 2026

## Capaian

Mock yang memang sudah tersedia di `public` dipakai untuk melengkapi environment
development:

| Domain | Asset |
|---|---|
| Produk B40 | `public/images/products/b40-product.png` |
| Produk Solar/HSD | `public/images/products/hsd-product.png` |
| Armada 5.000–30.000 liter | `public/images/partnership/transport-carrier.png` |
| Partner | `public/images/partnership/mock-logo-wide.svg` |

Asset diunggah ke Sanity dengan label `DEVELOPMENT MOCK - REPLACE BEFORE
PUBLISH`, lalu dihubungkan ke manifest domain. Armada menggunakan asset tersebut
sebagai satu item awal pada `gallery[]` setiap varian agar alur carousel dapat
diuji.

Sembilan dokumen domain juga dibuat sebagai **draft Sanity** (`drafts.*`) untuk
preview development:

- 2 Produk
- 6 Armada
- 1 Partner

Semua draft memiliki `isPublished: false`, sehingga perspektif published tidak
melihatnya dan perspektif preview dapat memakainya untuk pengujian. Manifest
tetap `approvalStatus: pending` dan seed production tetap menolak apply tanpa
approval resmi.

## Script yang ditambahkan

- `npm run seed:development-assets:dry-run`
- `npm run seed:development-assets:apply`
- `npm run seed:domain:development:dry-run`
- `npm run seed:domain:development:apply`

Script development dipisahkan dari seed production agar penggunaan mock tidak
melemahkan approval gate. Asset resmi nantinya cukup diganti pada dokumen Sanity,
gallery Armada dapat ditambah, lalu item harus melalui approval dan preview ulang.

## Validasi

- Development asset seed: 4 upload group, 10 target field.
- Development domain seed: 9 draft mutation dan 9 dokumen regular mock lama
  dibersihkan secara targeted.
- Content validator: 0 error, 36 warning existing untuk asset/slot lain.
- Migration dry-run published-only: 0 domain documents terdeteksi dan 0 mutation.
- Frontend typecheck: lulus.

## Batasan

Mock tidak boleh dipublikasikan sebagai asset resmi. Detail fakta bisnis,
kepemilikan asset, legalitas partner, dan approval tetap divalidasi terpisah.
