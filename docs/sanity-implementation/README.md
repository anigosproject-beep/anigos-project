---
document_type: implementation-index
project: petro-anigos
domain: sanity
audience: coding-agents-and-content-operators
language: id-ID
status: active
source_of_truth:
  studio: ../../studio-anigos-project
  frontend: ../../app
  project_rules: ../../AGENTS.md
next_document: 00-application-understanding.md
---

# Panduan Implementasi Sanity Petro Anigos

Dokumentasi ini menjelaskan penerapan Sanity dari kondisi Studio kosong sampai siap dipakai operator konten non-teknis.

## Urutan pengerjaan

| Urutan | Dokumen | Tujuan |
|---|---|---|
| Blueprint | [MASTER-BLUEPRINT.md](./MASTER-BLUEPRINT.md) | Arsitektur target, fase optimal, dependency, dan kriteria selesai |
| 0 | [00-application-understanding.md](./00-application-understanding.md) | Memetakan aplikasi aktif dan mencapai gate pemahaman sebelum implementasi |
| Mapping | [CONTENT-MAPPING.md](./CONTENT-MAPPING.md) | Inventaris route, media, fallback, schema, consumer, dan konflik yang harus diputuskan |
| Decisions | [ARCHITECTURE-DECISIONS.md](./ARCHITECTURE-DECISIONS.md) | Keputusan final model artikel, dokumen, dan organisasi |
| 1 | [01-foundation.md](./01-foundation.md) | Menyiapkan project, dataset, environment, dan Studio dasar |
| 2 | [02-content-model.md](./02-content-model.md) | Menetapkan schema konten dan batasan field |
| 3 | [03-operator-structure.md](./03-operator-structure.md) | Membuat menu Studio berdasarkan pekerjaan operator |
| 4 | [04-media-slots.md](./04-media-slots.md) | Membuat slot media pre-seeded yang aman diedit |
| 5 | [05-validation.md](./05-validation.md) | Menambahkan validasi error dan warning |
| 6 | [06-preview-publishing.md](./06-preview-publishing.md) | Mengatur draft, publish, preview, dan production |
| 7 | [07-frontend-integration.md](./07-frontend-integration.md) | Menghubungkan frontend Next.js ke Content Lake |
| 8 | [08-quality-operations.md](./08-quality-operations.md) | Menyiapkan pemeriksaan konten, migration, dan maintenance |
| 9 | [09-operator-acceptance.md](./09-operator-acceptance.md) | Menguji alur dengan operator non-teknis |

## Prinsip implementasi

1. Struktur halaman tetap ditentukan kode, bukan page builder bebas.
2. Operator mengedit konten melalui istilah bisnis, bukan nama schema.
3. Slot media dibuat stabil dan tidak boleh berlipat ganda.
4. Asset yang kurang ideal diberi warning, bukan selalu diblokir.
5. Draft tidak boleh masuk ke website production.
6. Dokumen yang tidak ingin ditampilkan dinonaktifkan, bukan langsung dihapus.
7. Semua seed dan migration harus idempotent.

## Struktur folder utama

```text
petro-anigos/
├── app/
├── lib/
└── studio-anigos-project/
    ├── schemaTypes/
    ├── scripts/
    ├── structure.ts
    ├── sanity.config.ts
    └── sanity.cli.ts
```

## Status saat ini

- Milestone audit implementasi dan blueprint 20 September 2026 sudah diterima;
  lihat [MILESTONE-2026-09-20-AUDIT.md](./MILESTONE-2026-09-20-AUDIT.md).
- Fondasi Studio sudah dapat dibuild.
- Schema awal dan menu operator sudah tersedia.
- Script seed media slot sudah tersedia.
- Seed Content Lake sudah berhasil dan diverifikasi: 20 page hero serta 15 media section slot tersedia.
- Content Registry sudah terhubung ke schema dan seed, lalu diverifikasi: 24 halaman,
  20 page hero, dan 15 media section slot tanpa duplikasi stable ID.
- Build Studio berbasis registry berhasil.
- Structure Builder berbasis lokasi halaman sudah tersedia; operator memilih halaman
  terlebih dahulu lalu membuka hero atau slot gambar segmen yang spesifik.
- Presisi form schema sudah ditambahkan: warning resolusi/rasio berbasis preset,
  nomor slide unik, field media kondisional, serta status slot `Belum diisi`,
  `Siap tayang`, dan `Tidak aktif`.
- Wiring domain tahap pertama selesai:
  - artikel adapter membaca `article` kanonis;
  - publikasi tetap membaca `publicationDocument`;
  - legalitas membaca `companyDocument` bertipe `legalitas`;
  - struktur organisasi membaca `structuralRole` dan `isPublished`;
  - footer membaca `siteSettings` dengan fallback aman.
- Page Hero sudah terhubung bertahap melalui `pageKey` dan endpoint `/api/page-hero`;
  fallback lokal tetap dipakai jika slot belum berisi media.
- Media section wiring dilakukan secara konservatif:
  - slot `home/tentang-kami/background` menjadi sumber gambar utama section Tentang Kami;
  - slot `home/publikasi/thumbnail` menjadi fallback spesifik untuk kartu Publikasi
    ketiga pada homepage;
  - konten kartu yang sudah memiliki thumbnail tetap diprioritaskan;
  - slot item-level Produk, Kemitraan, artikel, publikasi, legalitas, dan struktur
    belum digabungkan secara global karena satu slot tidak boleh menggantikan
    media per-item.
- Validator kontrak konten/media batch sudah selesai. Langkah berikutnya adalah
  verifikasi preview draft, dry-run migrasi, migrasi terkontrol, dan operator
  acceptance test.
- Validator kontrak konten/media batch sudah tersedia di active Studio. Baseline
  published pertama menghasilkan `0` error blocking dan `36` warning asset
  kosong; warning ini dapat ditinjau operator melalui report JSON.
- Dry-run migrasi konten sudah dijalankan tanpa mutation. Ditemukan 3
  `newsroomCategory` legacy yang masuk exception manual; tidak ada artikel legacy
  atau dokumen legal legacy yang perlu dipindahkan.
- Temuan lanjutan dan fase penyelesaiannya dicatat di
  [FOLLOW-UP-FINDINGS-2026-09-20.md](./FOLLOW-UP-FINDINGS-2026-09-20.md).
- Target eksekusi berikutnya dan definition of done dicatat di
  [NEXT-STEP-TARGET-2026-09-20.md](./NEXT-STEP-TARGET-2026-09-20.md).
- Error, warning, dan temuan teknis dicatat secara kronologis di
  [ERROR-LOG-AND-FINDINGS.md](./ERROR-LOG-AND-FINDINGS.md).
- Audit night mode per route, token, form, media, dan komponen interaksi dicatat di
  [NIGHT-MODE-AUDIT-2026-09-21.md](./NIGHT-MODE-AUDIT-2026-09-21.md).

## Instruksi untuk agent

1. Baca dokumen ini sebelum membaca dokumen fase.
2. Ikuti urutan fase; jangan mengerjakan fase berikutnya jika dependensinya belum selesai.
3. Periksa source of truth di `studio-anigos-project` sebelum mengubah dokumentasi.
4. Jangan menaruh token, credential, atau nilai rahasia di Markdown.
5. Saat implementasi selesai, perbarui bagian `Status saat ini` dan checklist dokumen terkait.
6. Jika implementasi berbeda dari dokumen, ubah dokumen agar mencerminkan kode aktual.

## Definisi istilah

- **Operator**: editor konten non-teknis yang bekerja melalui Sanity Studio.
- **Slot media**: satu lokasi media yang sudah ditentukan untuk satu halaman/segmen/elemen.
- **Singleton**: dokumen yang hanya boleh memiliki satu instance.
- **Collection**: jenis dokumen yang boleh memiliki banyak instance.
- **Draft**: perubahan yang belum dipublikasikan.
- **Production**: website yang hanya membaca konten published.

## Format laporan agent

Setelah menyelesaikan fase, laporkan:

```text
Phase: <nomor dan nama>
Changed: <file atau konfigurasi>
Verified: <perintah dan hasil>
Blocked: <none atau alasan>
Next: <fase berikutnya>
```
