# Milestone: Operator UI Theme Customization

Tanggal: 21 September 2026

## Capaian

Operator sekarang dapat mengubah warna tampilan melalui:

**Mulai di Sini → Kontak & Alamat → Warna tampilan website**

Customization menggunakan design tokens yang dipakai komponen UI, bukan custom
CSS. Token yang tersedia:

- warna utama / tombol;
- teks di atas warna utama;
- warna aksen lembut;
- teks di atas aksen;
- latar utama;
- teks utama;
- latar sekunder;
- teks sekunder;
- border dan garis;
- latar kartu.

Semua field menerima format HEX enam digit dan menolak format warna lain.
Field yang dikosongkan memakai default CSS bawaan aplikasi.

## Batas konflik sistem

Operator tidak dapat mengubah:

- destructive/error color;
- ring/focus behavior;
- chart colors;
- sidebar/internal Studio colors;
- typography, spacing, radius, layout, atau responsive behavior;
- custom CSS;
- overlay dialog.

Dengan batas ini, warna tombol, link, badge, card, background, border, dan
teks tetap menggunakan token yang konsisten.

## Runtime

Root layout membaca `siteSettings.uiTheme` melalui Sanity perspective aktif.
Draft Mode membaca perubahan draft untuk preview; production hanya berubah
setelah `siteSettings` dipublish.

## Validasi

- Frontend typecheck: lulus.
- Frontend lint: lulus tanpa error; satu warning lama pada seed media tetap ada.
- Studio build: lulus.
- Hosted Studio deploy: lulus.
- Schema deployment: `1/1`.

Panduan operator:

- [UI-THEME-OPERATOR-GUIDE.md](./UI-THEME-OPERATOR-GUIDE.md)
