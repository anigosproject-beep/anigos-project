---
document_type: milestone
project: petro-anigos
milestone: operator-preview-context
date: 2026-09-21
status: accepted
---

# Milestone — Operator Context dan Preview Readiness

## Goal

Memastikan interface Studio tetap compact, tetapi operator dapat memahami:

- konten apa yang sedang diedit;
- halaman website yang terdampak;
- apakah item siap tayang atau tidak;
- kapan perubahan masih draft dan kapan sudah published.

## Checkpoint sebelumnya

- Draft Mode engine: lulus end-to-end pada
  [`MILESTONE-2026-09-20-DRAFT-PREVIEW.md`](./MILESTONE-2026-09-20-DRAFT-PREVIEW.md).
- Contract alignment Produk/Kemitraan: lulus dan dicatat pada
  [`MILESTONE-2026-09-20-PRODUCT-PARTNERSHIP-AUDIT.md`](./MILESTONE-2026-09-20-PRODUCT-PARTNERSHIP-AUDIT.md).
- Studio build, frontend typecheck, lint, dan content contract check:
  lulus pada validasi terakhir.

## Pekerjaan checkpoint ini

- Menu Data Pendukung diringkas menjadi dua domain operator:
  `Produk & Armada` dan `Kemitraan`.
- Label menu mencantumkan route website yang terdampak.
- Schema produk, armada, partner, dan halaman Kemitraan diberi deskripsi konteks.
- Preview list Produk dan Armada menampilkan status `Siap tayang` atau
  `Tidak ditampilkan`.
- Fallback mock partner sudah dihapus pada checkpoint sebelumnya; empty state
  tetap digunakan saat belum ada partner published.
- Credential preview tidak diekspos ke Studio browser. Preview tetap melalui
  endpoint server-side yang tervalidasi.

## Hasil

| Pemeriksaan | Hasil |
|---|---|
| Interface domain tetap compact | Lulus |
| Lokasi website terlihat dari navigasi | Lulus |
| Status item terlihat dari preview list | Lulus untuk Produk/Armada/Partner |
| Draft/published separation | Lulus pada checkpoint Draft Mode |
| Preview UX kontekstual | Siap untuk operator acceptance |
| Content Lake mutation | Tidak dilakukan |

## Batas checkpoint

Milestone ini meningkatkan konteks dan kesiapan preview, bukan membuat
mutation data atau mengubah layout frontend. Link preview otomatis per dokumen
belum dibuka karena secret harus tetap server-side; pengujian preview tetap
menggunakan route `/api/draft` dengan secret dari environment aman.

## Next gate

1. Runtime wiring Produk dan Armada.
2. Seed/migration dry-run tanpa mutation.
3. Preview acceptance menggunakan data domain nyata.
4. Operator acceptance pada viewport desktop dan Android.
