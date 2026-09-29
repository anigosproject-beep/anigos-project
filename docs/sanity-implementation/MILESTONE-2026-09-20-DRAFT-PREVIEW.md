---
document_type: verification-milestone
project: petro-anigos
date: 2026-09-20
status: accepted
---

# Milestone — Draft Preview End-to-End

## Cakupan

Verifikasi dilakukan terhadap route `GET /api/home-hero` dengan perubahan draft
sementara pada slide Home Hero. Draft dibuat dengan marker unik, diuji melalui
jalur preview, kemudian dihapus dari Content Lake setelah pengujian.

## Hasil

| Skenario | Hasil |
|---|---|
| Request tanpa Draft Mode | Berhasil membaca konten published |
| Aktivasi dengan secret valid dan `slug` relative | HTTP 307 dan cookie preview |
| Request dengan cookie Draft Mode | Marker draft terlihat |
| Request production tanpa cookie | Marker draft tidak terlihat |
| Disable Draft Mode | HTTP 307 ke route aman dan request berikutnya kembali published |
| Cleanup | Dokumen `drafts.homePage` sementara dihapus; tidak ada perubahan published |

## Temuan dan perbaikan

Client draft sebelumnya belum membawa `SANITY_AUTH_TOKEN`, sehingga draft
tidak dapat dibaca oleh route server. Selain itu, query Sanity server-side perlu
dipaksa `no-store` agar hasil published tidak menjadi cache yang terbaca pada
request preview.

Perbaikan diterapkan di
[`lib/sanity-client.ts`](../../lib/sanity-client.ts):

- token tetap hanya berasal dari environment server;
- client tetap memisahkan perspective `published` dan `drafts`;
- `fetch.cache` disetel ke `no-store`.

Credential tidak dicetak, disimpan di milestone, atau dimasukkan ke response
test.

## Status readiness

Target verifikasi Draft Mode selesai. Tahap berikutnya adalah pemetaan kontrak
media item-level, lalu operator acceptance test dan final production-readiness
gate.
