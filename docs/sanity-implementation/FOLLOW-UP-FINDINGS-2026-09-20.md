---
document_type: follow-up-findings
project: petro-anigos
date: 2026-09-20
status: tracked
---

# Temuan Lanjutan — Audit Interface dan Dry-Run

Dokumen ini mencatat temuan yang perlu dipertimbangkan setelah audit interface
operator dan dry-run migrasi. Temuan tidak boleh hilang ketika pekerjaan
berpindah fase.

## Status temuan

| Temuan | Status sekarang | Fase penyelesaian |
|---|---|---|
| Struktur interface operator dan lokasi slot | Selesai untuk baseline | Fase 3 — Operator Structure |
| Penguncian field lokasi media dan penghapusan Vision dari Studio operator | Selesai | Fase 3 — Operator Structure |
| Validator konten/media batch | Selesai | Fase 8 — Quality Operations |
| Draft preview enable/disable dan pemilihan perspective | Selesai secara implementasi | Fase 6 — Preview Publishing |
| Verifikasi visual preview dengan draft nyata | Terbuka | Fase 6 — Preview Publishing |
| Media item-level Produk, Kemitraan, Artikel, Publikasi, Legalitas, Struktur | Terbuka secara desain | Fase 7 — Frontend Integration, lalu Fase 8 |
| Asset Content Lake kosong | Terbuka sebagai pekerjaan konten | Fase 9 — Operator Acceptance dan operasi harian |
| Uji langsung oleh operator non-teknis | Terbuka | Fase 9 — Operator Acceptance |
| Tiga `newsroomCategory` legacy | Terbuka sebagai exception manual | Fase 6/8 — keputusan cleanup atau arsip setelah acceptance |

## Keputusan kerja

1. Tidak menghapus tiga kategori legacy tanpa keputusan pemilik konten.
2. Tidak memaksa slot global menjadi pengganti media item-level.
3. Tidak mengurangi fallback lokal sebelum validator dan verifikasi published
   menunjukkan data kanonis lengkap.
4. Tidak menyatakan CMS production-ready penuh sebelum acceptance test selesai.

## Urutan berikutnya

1. Verifikasi visual preview memakai satu perubahan draft yang aman.
2. Menentukan kontrak media item-level berdasarkan consumer aktual.
3. Mengisi asset kosong melalui operator atau menandai slot tidak aktif.
4. Menjalankan acceptance test end-to-end.
5. Menutup atau mengarsipkan exception kategori legacy setelah keputusan konten.
