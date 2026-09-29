---
document_type: implementation-audit
project: petro-anigos
topic: seed-readiness
date: 2026-09-21
status: validated
---

# Audit Seed Sanity — 2026-09-21

## Kesimpulan

Belum aman menjalankan seed domain Produk, Armada, dan Kemitraan secara
otomatis. Seed slot media sudah memiliki identitas stabil dan aman untuk
idempotent creation, tetapi seed domain canonical belum tersedia. File JSON
Home yang ada merupakan artefak lama dan tidak boleh dijadikan sumber seed
tanpa pemetaan ulang ke schema aktif.

Tidak ada mutation Content Lake yang dilakukan dalam audit ini.

Perbaikan struktural seed telah diterapkan: dry-run menjadi default, mutation
memerlukan `--apply`, conflict stable ID menghentikan proses, dan registry
divalidasi sebelum membaca atau menulis dokumen. Preflight menemukan lalu
memperbaiki section `legalitas` yang sebelumnya hilang dari registry.

Pemeriksaan sumber lokal juga selesai. Data Produk dan Armada yang ditemukan
berasal dari fallback presentasional frontend dan memakai ilustrasi lokal,
bukan asset Sanity canonical. Data tersebut tidak dimasukkan ke manifest dan
tidak boleh diperlakukan sebagai approval content owner.

Draft manifest kemudian diisi dari referensi company profile resmi untuk
keperluan review, bukan publish:

- 2 Produk: B40 Biosolar dan Solar/HSD Industri;
- 6 pilihan Armada: 5.000 sampai 30.000 liter;
- 1 Partner: PT Masinton Nusa Perkasa.

Semua item tetap `approvalStatus: "pending"` dan `isPublished: false`.
Asset artwork/foto partner/foto armada belum memiliki Sanity asset reference,
sehingga belum dapat diterapkan.

## Inventaris seed

| Artefak | Status | Temuan |
|---|---|---|
| `studio-anigos-project/scripts/seed-media-slots.mjs` | Diperbaiki dan tervalidasi | Dry-run menjadi default; mutation hanya dengan `--apply`. Memakai stable ID, memeriksa dokumen existing, menolak conflict, dan dapat menulis laporan JSON. |
| `scripts/seed-home-page.json` | Stale / tidak siap dipakai | Berisi bentuk Home lama dengan `meta`, `aspiration`, `about`, `achievements`, `resources`, `productShowcase`, dan `partnershipShowcase` yang tidak didefinisikan sebagai field pada schema `homePage` aktif. Hero juga memakai localized object dan CTA yang tidak cocok dengan schema aktif. |
| `docs/sanity-reverence/workspace-analytics-integration/scripts/seed-home-page.json` | Duplikat stale | Isinya sama secara fungsional dan tidak terhubung ke npm script atau pipeline seed aktif. |
| `studio-anigos-project/seed/domain-content.manifest.json` | Template menunggu approval | Manifest canonical sudah tersedia sebagai kontrak input, tetapi masih `approvalStatus: pending` dan tidak berisi data bisnis rekaan. |
| `studio-anigos-project/scripts/seed-domain-content.mjs` | Dry-run tersedia, apply gated | Memvalidasi approval manifest, stable ID, field minimum, existing document, dan conflict sebelum mutation. |

## Validasi realtime

Hasil published-only pada dataset `production`:

- Produk: `0`
- Armada: `0`
- Partner: `0`
- Halaman Kemitraan: `0`
- Legacy `newsroomCategory`: `3`, semuanya manual review
- Migration mutations: `0`
- Content validator: `0 error`, `36 warning` asset

Kesimpulannya, tidak ada domain canonical yang dapat dipreview sebagai data
nyata. Fallback Produk dan Armada masih diperlukan, sedangkan Kemitraan tetap
menampilkan empty state yang jujur.

Dry-run domain seed:

- Manifest: `pending`
- Candidate create: `9`
- Existing: `0`
- Conflict: `0`
- Mutation: `0`

Laporan draft: `DOMAIN-SEED-DRAFT-2026-09-21.json`.

Apply sengaja ditolak sampai content owner mengisi dan menyetujui manifest.

## Risiko yang harus ditutup

1. **Schema drift pada Home** — menjalankan `seed-home-page.json` dapat
   menghasilkan payload yang tidak digunakan oleh query atau tidak sesuai
   dengan field schema aktif.
2. **Seed domain belum tersedia** — seed media sudah memiliki dry-run, tetapi
   Produk, Armada, dan Kemitraan masih menunggu input approved.
3. **Belum ada approved source** — seed domain tanpa content-owner approval
   berisiko memasukkan nama, deskripsi, dokumen, atau gambar yang salah.
4. **Belum ada asset ownership mapping** — setiap image/file harus memiliki
   owner canonical yang jelas, bukan sekadar menyalin `mediaAsset` global.
5. **Belum ada conflict report** — duplicate slug, duplicate stable ID, asset
   yang hilang, dan field wajib kosong harus berhenti sebelum mutation.
6. **Legacy category tidak otomatis migratable** — tiga `newsroomCategory`
   tidak boleh dipaksa menjadi Produk, Armada, atau Partner.

## Rancangan tahap pengerjaan

### Tahap 1 — Freeze dan klasifikasi seed

- Tandai kedua `seed-home-page.json` sebagai legacy reference-only.
- Jangan jalankan file tersebut.
- Bekukan schema canonical dan query yang menjadi kontrak seed.
- Tetapkan keputusan apakah Home editorial akan diisi melalui Studio manual
  atau dibuat seed baru yang mengikuti schema aktif.

**Gate:** tidak ada seed input yang memakai field yang tidak ada pada schema aktif.

### Tahap 2 — Perkuat seed media

- Pertahankan `--dry-run` sebagai mode default.
- Gunakan `--apply` eksplisit untuk mutation.
- Gunakan laporan JSON berisi `create`, `existing`, `conflict`, dan `skipped`.
- Pertahankan stable ID dan `createIfNotExists`; jangan menimpa asset, crop,
  notes, atau status operator.

**Hasil gate:** dry-run registry menghasilkan 35 expected, 35 existing,
0 create, 0 conflict, dan 0 mutation. Laporan tersimpan di
`MEDIA-SEED-DRY-RUN-2026-09-21.json`.

### Tahap 3 — Siapkan approved domain input

Buat satu manifest baru, bukan memakai data mock:

- Produk: nama bilingual, slug, deskripsi bilingual, kategori, specs,
  artwork asset, status, dan urutan.
- Armada: label, kapasitas, unit, moda, note bilingual, image asset, status,
  dan urutan.
- Partner: nama, slug, logo/image, portfolio/body bilingual, dokumen,
  status, dan urutan.
- Partnership Page: hero, intro, process, closing, serta reference partner.

Manifest harus menyimpan `source`, `target`, `assetOwner`, dan `approvalStatus`.

**Gate:** semua item memiliki approval content owner dan asset owner yang
terverifikasi; tidak ada placeholder atau mock partner.

### Tahap 4 — Implementasikan domain seed dry-run

- Tambahkan script seed canonical yang hanya membaca manifest.
- Gunakan stable IDs berbasis slug atau ID bisnis yang disetujui.
- Gunakan `createIfNotExists` untuk dokumen baru dan deteksi conflict untuk
  dokumen yang sudah ada.
- Validasi localized field, slug uniqueness, reference partner, asset
  existence, dan status publish.
- Jangan publish otomatis; seed awal sebaiknya dibuat sebagai draft atau
  mengikuti keputusan approval yang eksplisit.

**Gate:** dry-run domain menunjukkan seluruh item `ready`, conflict `0`,
  missing asset `0`, dan mutation yang akan dilakukan dapat diaudit.

### Tahap 5 — Apply terkontrol dan validasi

- Jalankan apply hanya setelah laporan dry-run disetujui.
- Jalankan validator Content Lake.
- Jalankan migration dry-run ulang.
- Pastikan inactive item tidak tampil dan partner yang tidak direferensikan
  tidak muncul di halaman.
- Simpan laporan hasil dengan timestamp dan tanpa credential.

**Gate:** `0 error`, semua domain readiness `ready`, dan tidak ada mutation
yang tidak tercatat.

### Tahap 6 — Preview dan operator acceptance

- Uji published response.
- Uji Draft Mode untuk Produk, Armada, dan Kemitraan.
- Uji disable preview.
- Uji pengeditan melalui menu compact Studio, termasuk route context,
  status tayang, media warning, dan dokumen partner.
- Uji Android portrait dan landscape.

**Gate:** operator standar dapat menyelesaikan create/edit/preview/publish
tanpa memahami GROQ atau struktur teknis.

## Keputusan yang berlaku sekarang

- Jangan menjalankan `seed-home-page.json`.
- Jangan membuat domain seed dari mock atau fallback frontend.
- Seed media boleh dilanjutkan hanya setelah mode dry-run dan laporan
  preflight ditambahkan.
- Seed domain menunggu manifest approved dari content owner.
- Tiga `newsroomCategory` tetap manual review dan tidak dimutasi.
