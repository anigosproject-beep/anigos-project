# Milestone: Studio Deployment

Tanggal: 21 September 2026

## Hasil

Studio berhasil dideploy ke:

https://petro-anigos.sanity.studio/

Application ID:

`ycb6uqiat6ensvpk7zgieeb1`

Schema berhasil terdaftar pada project `wm8u3z2o`, dataset `production`.

## Catatan akses

Hosted Studio mengarahkan pengguna yang belum login ke autentikasi Sanity.
Redirect tersebut normal dan tidak menunjukkan kegagalan deployment.

## Validasi

- Hosted Studio creation: berhasil.
- Studio build: berhasil.
- Schema deployment: berhasil, 1 schema workspace terdaftar.
- Local content verification: berhasil.
- Domain development drafts tetap terpisah dari published perspective.
- Application ID dicatat pada `studio-anigos-project/sanity.cli.ts`.

## Langkah operator

1. Buka URL hosted Studio.
2. Login dengan akun Sanity yang memiliki akses project.
3. Buka **Dokumen Perusahaan** untuk melihat Dokumen Kemitraan dan Legalitas.
4. Buka **Artikel & Publikasi** untuk melihat Dokumen Publikasi.
5. Buka **Produk & Armada** untuk meninjau draft domain.
6. Jangan publish asset berlabel `DEVELOPMENT MOCK - REPLACE BEFORE PUBLISH`.
