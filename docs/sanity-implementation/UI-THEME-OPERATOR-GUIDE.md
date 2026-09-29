# Panduan Warna Tampilan untuk Operator

## Tujuan

Operator dapat menyesuaikan warna branding tanpa mengubah CSS, layout,
responsive behavior, atau struktur komponen. Perubahan dilakukan di:

**Mulai di Sini → Kontak & Alamat → Warna tampilan website**

## Token yang aman diubah

| Field Studio | Dampak |
|---|---|
| Warna utama / tombol | Tombol utama, link aktif, CTA, focus accent |
| Teks di atas warna utama | Teks/icon pada tombol utama |
| Warna aksen lembut | Badge, highlight, selected state, elemen sekunder |
| Teks di atas aksen | Teks/icon pada aksen |
| Latar utama | Latar halaman utama |
| Teks utama | Heading dan teks utama |
| Latar sekunder | Section muted dan background sekunder |
| Teks sekunder | Deskripsi, metadata, dan teks muted |
| Border dan garis | Border card, input, divider, dan thumbnail |
| Latar kartu | Card, popover, dan panel |

## Aturan untuk menghindari konflik

1. Isi warna dalam pasangan: `Warna utama / tombol` bersama `Teks di atas
   warna utama`, dan `Warna aksen lembut` bersama `Teks di atas aksen`.
2. Gunakan warna gelap untuk tombol dan teks terang di atasnya, atau sebaliknya.
3. Jangan mengubah warna status bahaya, error, dan destructive; token tersebut
   tetap dikendalikan sistem.
4. Jangan mengubah warna chart, sidebar internal, atau overlay dialog; token
   tersebut bukan bagian dari customization operator.
5. Uji halaman Beranda, Produk, Armada, Dokumen, form, dan popup setelah
   mengubah warna.
6. Jika field dikosongkan, website memakai warna default bawaan sistem.

## Yang tidak dapat diubah oleh operator

- CSS bebas atau custom CSS.
- Font, ukuran heading, spacing, radius, dan layout.
- Warna destructive/error.
- Warna overlay dan accessibility focus behavior.
- Warna khusus dark mode secara terpisah.

Customization memakai CSS design tokens yang sama dengan komponen UI, sehingga
warna tombol, link, badge, card, border, dan background tetap konsisten.
Perubahan Sanity terbaca pada preview; production berubah setelah dokumen
settings dipublish.
