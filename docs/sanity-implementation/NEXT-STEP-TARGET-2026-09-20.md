---
document_type: execution-target
project: petro-anigos
date: 2026-09-20
status: completed
---

# Target Eksekusi Berikutnya

## Target selesai — Verifikasi visual Draft Mode

Tujuan: membuktikan bahwa perubahan draft yang aman dapat dibaca oleh preview
tanpa pernah masuk ke jalur production published-only.

### File dan surface target

- `app/api/draft/route.ts`
- `app/api/disable-draft/route.ts`
- `lib/sanity-client.ts`
- `app/api/home/route.ts`
- `app/api/home-hero/route.ts`
- `app/api/page-hero/route.ts`
- adapter `lib/sanity-*.ts`
- route homepage, artikel, publikasi, legalitas, dan struktur organisasi

### Bukti yang harus dikumpulkan

1. Request tanpa Draft Mode membaca `perspective: published`.
2. `/api/draft` hanya aktif dengan secret valid dan route relative.
3. Request setelah Draft Mode aktif membaca `perspective: drafts`.
4. Satu perubahan draft terlihat pada route preview.
5. Perubahan yang sama tidak terlihat pada jalur production tanpa cookie preview.
6. `/api/disable-draft` menghapus mode preview dan mengembalikan route ke
   published.

### Batasan

- Jangan membuat mutation ke Content Lake tanpa asset atau perubahan konten
  yang sudah disetujui pemilik konten.
- Jangan mengubah production client menjadi `drafts`.
- Jangan mengurangi fallback hanya berdasarkan hasil preview.

## Target selesai — Kontrak media item-level

Kontrak dan mapping telah ditetapkan di
[`ITEM-LEVEL-MEDIA-CONTRACT.md`](./ITEM-LEVEL-MEDIA-CONTRACT.md). Desain
memisahkan owner embedded dari global page/section slots dan menahan schema
produk/partnership sampai keputusan domain disetujui.

Status: selesai; bukti Draft Mode tersimpan pada milestone.

## Target berikutnya — Implementasi kontrak media dan keputusan domain

Implementasikan contract tests untuk owner yang sudah aktif, kemudian putuskan
dan bangun schema `product`/`partnership` bila keduanya memang perlu diedit
operator.

Schema domain dasar sekarang sudah dibuat dan tervalidasi di Studio:
`product`, `fleetOption`, `partnership`, dan `partnershipPage`. Tahap aktif
berikutnya adalah contract test dan adapter/query, bukan mutation data.

Audit kesiapan domain Produk dan Kemitraan telah dicatat di
[`PRODUCT-PARTNERSHIP-STRUCTURAL-READINESS-2026-09-20.md`](./PRODUCT-PARTNERSHIP-STRUCTURAL-READINESS-2026-09-20.md).
Pekerjaan implementasi harus mengikuti prioritas P0/P1 di audit tersebut.
Milestone audit dan rencana optimasi telah disimpan di
[`MILESTONE-2026-09-20-PRODUCT-PARTNERSHIP-AUDIT.md`](./MILESTONE-2026-09-20-PRODUCT-PARTNERSHIP-AUDIT.md)
dan
[`PRODUCT-PARTNERSHIP-OPTIMIZATION-PLAN-2026-09-20.md`](./PRODUCT-PARTNERSHIP-OPTIMIZATION-PLAN-2026-09-20.md).

Tujuan: memastikan gambar per produk, partner, artikel, publikasi, legalitas,
dan anggota tim memiliki owner data yang jelas tanpa dipaksa masuk ke satu slot
global.

### Surface yang harus dipetakan

- `productShowcase.products[].artwork`
- `productShowcase.media[]`
- `partnershipShowcase.partners[].image`
- `partnershipShowcase.media[]`
- `article.image`
- `publicationDocument.thumbnail`
- `companyDocument.thumbnail`
- `teamMember.photo`
- consumer homepage dan route detail terkait

### Output yang harus dibuat

1. Tabel owner media per item.
2. Keputusan field kanonis untuk setiap item.
3. Daftar field legacy yang hanya menjadi fallback/migration source.
4. Query dan TypeScript type yang perlu diselaraskan.
5. Daftar slot registry yang tetap global dan tidak boleh dipakai untuk item.
6. Test contract untuk memastikan item tidak kehilangan image owner.

## Urutan dependency

```text
Verifikasi visual Draft Mode
        ↓
Kontrak media item-level
        ↓
Operator acceptance test
        ↓
Final production-readiness gate
```

## Definition of ready untuk eksekusi

- Secret preview tersedia di environment lokal tanpa ditulis ke dokumentasi.
- Ada route preview yang aman untuk diuji.
- Tidak ada mutation migration aktif.
- File target dan acceptance criteria sudah diketahui.
- Hasil uji dapat direkam tanpa memasukkan credential ke report.
