# Milestone: Studio Structure Runtime Fix

Tanggal: 21 September 2026

> **Catatan status (2026-10-02):** URL hosted di bawah berasal dari deployment
> project lama `wm8u3z2o`; catatan ini bersifat historis. Studio aktif ditargetkan
> ke `6zvti7ob/production`.

## Masalah

Hosted Studio gagal merender structure dengan error:

`t.listItem(...).title(...).id(...).disabled is not a function`

Sanity Structure Builder versi yang digunakan tidak menyediakan method
`disabled()` pada `ListItemBuilder`.

## Perbaikan

Item informasi `Belum ada media yang dapat diedit` sekarang menggunakan child
component kosong yang aman, bukan method `disabled()`. Item tersebut tetap
informatif dan tidak mencoba membuka dokumen media.

## Validasi

- Studio build: lulus.
- Schema deployment: `1/1`.
- Hosted Studio deploy: lulus.
- URL: https://petro-anigos.sanity.studio/

`tsc --noEmit` pada folder Studio masih memiliki error legacy yang sudah ada di
berbagai schema lama, tetapi tidak menghalangi build atau deployment Sanity.
