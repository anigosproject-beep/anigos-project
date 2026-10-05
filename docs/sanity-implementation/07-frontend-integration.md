---
document_type: implementation-phase
phase: 7
status: planned
depends_on: [02-content-model, 04-media-slots]
primary_files:
  - ../../lib/
  - ../../app/
verify: npm run typecheck
---

# Langkah 7 — Integrasi Frontend Next.js

## Client

Buat client terpisah untuk production dan preview. Production membaca `published`; preview membaca `drafts` dengan `useCdn: false`.

## Query

Pisahkan query untuk Home, Artikel, Publikasi, Struktur, Media Slot, dan Site Settings.

Contoh query media:

```groq
*[_type == "mediaAsset" && slotKey == $slotKey && isActive != false][0].image
```

## Fallback

Jika asset Sanity kosong, gunakan fallback lokal atau tampilkan section tanpa gambar jika aman. Satu slot kosong tidak boleh mematikan seluruh halaman.

## Galeri Artikel

`GET /api/galeri?lang=id|en` mempertahankan sumber Galeri yang sudah ada dan
menambahkan foto dari singleton `serviceGalleryEditor` serta dokumen terbit
`galleryPhoto`. Foto Halaman Layanan masuk ke kategori Produk & Layanan.
Semua foto dari singleton tersebut juga tampil pada Galeri Produk & Layanan
di `/produk/kenali-produk` dan digabungkan dengan foto Armada Sanity pada
`/produk/armada`; endpoint khusus mengembalikan seluruh foto ber-asset tanpa
batas jumlah. Galeri Armada tidak memakai gambar lokal sebagai fallback.
Ilustrasi pada tiga tab Skema Transportasi di `/produk/kenali-produk`
masing-masing memiliki slot gambar Sanity di dokumen Media Pendukung; gambar
lokal hanya dipakai sebagai fallback sebelum slot diisi dan dipublikasikan.
Artikel `newsroomArticle` dapat memiliki galeri gambar berurutan dengan teks
alternatif dan keterangan per bahasa. Detail artikel mengambil galeri dokumen
yang sedang dibuka dan menampilkannya setelah isi teks menggunakan lightbox
galeri yang sudah dipakai situs.
Foto editorial memakai kategori bawaan atau kategori baru yang direferensikan
dari `galleryCategory`; kategori baru ditampilkan pada filter halaman Galeri
dan halaman penelusuran kategori. Definisi enam kategori bawaan dibagikan
antara schema Studio dan aplikasi melalui `shared/gallery-categories.ts`.

## Kriteria selesai

- Production hanya membaca published.
- Preview membaca draft.
- Response memiliki type dan null guard.
- Website tetap tampil saat satu slot belum diisi.
