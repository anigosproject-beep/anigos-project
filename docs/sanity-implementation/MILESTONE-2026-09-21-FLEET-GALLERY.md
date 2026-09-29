# Milestone: Armada Darat Gallery

Tanggal: 21 September 2026

## Capaian

- Halaman `/produk/armada` disederhanakan menjadi Armada Darat dengan varian kapasitas liter.
- Armada Laut dan blok mitra transportir tidak lagi tampil pada halaman Armada.
- Setiap varian memakai satu rasio visual `16:10` untuk carousel dan `4:3` untuk thumbnail.
- Operator dapat mengisi banyak foto per varian melalui field `Galeri foto armada`.
- Pengunjung dapat berpindah foto dengan carousel, membuka full preview, dan memilih foto dari grid thumbnail.
- Field `image` lama tetap dibaca sebagai fallback agar dokumen existing tidak rusak.
- Query, adapter runtime, validator konten, seed validator, dan migration dry-run sudah mengenali `gallery[]`.

## Validasi checkpoint

- Frontend typecheck: lulus.
- Frontend lint: lulus tanpa error; satu warning lama pada `seed-media-slots.mjs` tetap ada.
- Studio build: lulus.
- Domain seed dry-run: lulus read-only, `mutations: 0`.
- Content validator: lulus dengan `errors: 0` dan warning asset existing.

## Prosedur operator

1. Buka **Produk & Armada → Armada Darat**.
2. Pilih varian kapasitas liter yang ingin diedit.
3. Isi `Galeri foto armada` dengan foto resmi varian tersebut; urutan pertama menjadi foto awal.
4. Isi teks alternatif setiap foto.
5. Simpan sebagai draft, buka preview `/produk/armada`, lalu periksa carousel, grid, dan full preview.
6. Jangan memakai ilustrasi kemitraan atau gambar lokal sebagai asset resmi Armada.

Data resmi, kepemilikan asset, dan approval tetap wajib dilengkapi sebelum publish.
