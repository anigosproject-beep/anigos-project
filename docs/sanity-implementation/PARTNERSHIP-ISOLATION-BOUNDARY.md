# Persiapan isolasi sistem Kemitraan

## Tujuan

Menyiapkan model editorial baru untuk perombakan Kemitraan tanpa mengubah
struktur yang saat ini dipakai Beranda, produk, galeri, atau halaman lain.
Persiapan ini hanya menambah tipe dokumen dan pintasan operator; halaman publik
belum membaca model baru.

## Batas isolasi

- `partner` lama tetap tidak berubah. Beranda dan integrasi yang ada tetap
  menggunakannya.
- Tipe `partnership` baru menyimpan item kemitraan secara mandiri.
- Singleton `partnershipPage` baru hanya mengelola susunan dan konten halaman
  Kemitraan serta referensi ke tipe `partnership`.
- Navigasi Studio memisahkan model baru di **Kemitraan — Model Baru
  (Persiapan)**. Menu **Mitra** lama tidak dipindah atau diganti.
- Belum ada query, API, Galeri, atau halaman publik yang dialihkan ke tipe baru.
  Aktivasi baru dilakukan sebagai pekerjaan migrasi tersendiri setelah mapping
  dan fallback disetujui.

## Urutan migrasi nanti

1. Tetapkan desain dan field halaman yang benar-benar diperlukan.
2. Isi model baru di draft dan validasi jumlah, referensi, asset, bahasa, serta
   urutan tanpa memublikasikannya ke aplikasi.
3. Buat query dan response type khusus Kemitraan; jangan menambahkan kontrak
   halaman ini ke query Home.
4. Alihkan API dan halaman Kemitraan ke kontrak baru dengan fallback yang
   disengaja.
5. Uji Beranda, halaman Produk, Kemitraan, detail kemitraan, dan Galeri sebelum
   menghapus atau memigrasikan data lama.
6. Pertahankan tipe `partner` sampai seluruh konsumennya terbukti tidak lagi
   bergantung padanya.

## Pemeriksaan untuk aktivasi

- Build Sanity Studio.
- Typecheck dan lint aplikasi.
- Uji kontrak API Kemitraan untuk Bahasa Indonesia dan Inggris serta mode
  draft/published.
- Bandingkan output Beranda dan Galeri sebelum/sesudah; tidak boleh berubah
  akibat penambahan model.
- Pastikan seluruh URL slug dan dokumen lampiran masih dapat dibuka setelah
  migrasi.
