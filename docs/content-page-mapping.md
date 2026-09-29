# Mapping Konten Halaman dan Spesifikasi Media

Dokumen ini memetakan struktur konten aktual pada halaman korporat Petro Anigos.
Mapping digunakan sebagai acuan penulisan konten, input CMS/Sanity, validasi copy,
dan penyiapan asset gambar.

Schema aktif berada di `studio-anigos-project/sanity/`. Folder `docs/sanity-schema/`
adalah referensi dokumentasi dan harus mengikuti schema aktif; jangan mengeditnya
sebagai sumber runtime.

## Batasan mapping

Mapping ini mencakup:

- Homepage `/`
- Jangkauan `/jangkauan`
- Keberlanjutan dan seluruh subhalamannya
- Produk, armada, penawaran, dan form pengajuan
- Tentang Kami: harapan & cita-cita, profil perusahaan, kemitraan, legalitas, karir,
  dan form lamaran
- Kebijakan Data
- Ketentuan Cookies

Mapping ini tidak mencakup:

- Semua route `/artikel`
- `/tentang-kami/struktur-perusahaan`

## Aturan batas teks

Batas di bawah adalah batas aman untuk layout saat ini, bukan batas database.
Batas dihitung dalam karakter termasuk spasi.

| Elemen | Batas aman |
|---|---:|
| Eyebrow/label segmen | 15–35 karakter |
| Judul hero utama | maksimal 70 karakter |
| Deskripsi hero | maksimal 220 karakter |
| Judul section | maksimal 70 karakter |
| Lead section | maksimal 220 karakter |
| Body pendukung | maksimal 350 karakter |
| Judul card | maksimal 55 karakter |
| Deskripsi card umum | maksimal 180 karakter |
| Deskripsi card kompleks | maksimal 250 karakter |
| Label tombol/CTA | maksimal 25 karakter |
| Breadcrumb | maksimal 35 karakter per item |
| Label statistik | maksimal 35 karakter |
| Deskripsi statistik | maksimal 120 karakter |
| Helper/error form | maksimal 160 karakter |
| Paragraf kebijakan/legal | maksimal 500 karakter |

Jika versi English lebih panjang dari versi Indonesia, gunakan batas English sebagai
acuan final. Jangan memaksa teks panjang masuk ke satu baris; layout harus tetap
mengizinkan wrapping.

## Standar gambar

| Jenis visual | Penempatan | Rasio aman | Resolusi sumber |
|---|---|---:|---:|
| Hero halaman | Background full-bleed pada `PageHero` | 16:9–2:1 | 1920×1080 minimum |
| Hero homepage | Background full-bleed carousel | 16:9 | 1920×1080 minimum |
| Hero video homepage | `<video>` full-bleed slide | 16:9 | 1920×1080 minimum; MP4 H.264 |
| Feature full-bleed | Background pada `FeatureImageSection` | 16:9 atau lebih lebar | 1920×1080 minimum |
| Showcase square | Image panel/card `object-cover` | 1:1 | 1200×1200 minimum |
| Resource/article thumbnail | Card image `object-cover` | 3:2 | 1200×800 minimum |
| Fleet photograph | Visual armada | 4:3 atau 3:2 | 1200×800 minimum |
| Product artwork | Visual produk/transparan | sekitar 0.86:1–1.08:1 | 1200×1400 minimum |
| Decorative pattern | Image `object-contain` | sekitar 3:2 | SVG; fallback 1600×1067 |

`PageHero` memiliki tinggi minimum `min(34rem, 65svh)`. `FeatureImageSection`
memiliki tinggi minimum desktop sekitar `37.5rem`. Subject utama harus ditempatkan
di area tengah atau sisi yang tidak tertutup overlay teks.

---

## 1. Homepage — `/`

Sumber utama: `app/page.tsx`, `components/sections/home-hero.tsx`.

| Urutan | Segmen | Elemen dan konteks teks | Jumlah card/item | Batas teks | Gambar/media |
|---:|---|---|---:|---|---|
| 1 | Hero utama | Carousel energi/distribusi: eyebrow, headline, deskripsi, satu CTA per slide, progress label | 1–4 slide | Headline ≤70; deskripsi ≤220; CTA ≤25 | Background 16:9, 1920×1080 minimum. Slide pertama mendukung video full-bleed 16:9 |
| 2 | Harapan & Cita-Cita | Badge, judul, lead, paragraf pendukung, dua link | 0 card; 2 link | Judul ≤70; lead ≤220; body ≤300; link ≤25 | Tidak ada media tambahan; section berfokus pada konten teks |
| 3 | Tentang Kami | Eyebrow, judul, deskripsi, primary CTA, secondary CTA | 0 card; maksimal 2 CTA | Judul ≤70; deskripsi ≤220; CTA ≤25 | Background feature full-bleed 16:9, 1920×1080; diletakkan di belakang overlay |
| 4 | Pencapaian Perusahaan | Badge, heading, deskripsi, CTA, statistik angka | 3 stat block | Label ≤35; deskripsi stat ≤120; CTA ≤25 | Tidak ada gambar konten |
| 5 | Produk | Showcase produk: heading, deskripsi, kartu/visual produk, navigasi carousel bila aktif | Data-driven; mengikuti `ProductShowcase` | Judul produk ≤55; deskripsi ≤220; CTA ≤25 | Artwork transparan sekitar 1200×1400; panel desktop sekitar 1.08:1 |
| 6 | Kemitraan | Showcase partnership: eyebrow, heading, body, CTA, visual partnership | Tepat 2 visual Home: Transportasi dan Distribusi; dikelola sebagai dua slot media | Judul ≤70; body ≤220; CTA ≤25 | Panel image sekitar 1:1, 1200×1200, `object-cover` |
| 7 | Keberlanjutan/Publikasi | Resource heading, deskripsi, resource cards, link | Data-driven; dua slot media terkontrol untuk Energi dan Keselamatan | Judul card ≤55; deskripsi ≤180 | Thumbnail card 3:2, 1200×800 |

**Catatan hero:** durasi slide gambar mengikuti konfigurasi carousel. Slide video
berpindah melalui event `ended`, bukan timer tetap.

## 2. Jangkauan — `/jangkauan`

Sumber: `app/jangkauan/page.tsx`.

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero | Identitas halaman jangkauan, judul manfaat jaringan, deskripsi distribusi, breadcrumb | 0 | Judul ≤70; deskripsi ≤220 | `PageHero`, 1920×1080 |
| Pengantar coverage | Penjelasan wilayah, kemampuan melayani, dan konteks distribusi | 0 | Heading ≤70; deskripsi ≤220 | Tidak ada gambar |
| Area layanan | Satu card untuk setiap item `coverageAreas`/kota | Data-driven sesuai array | Nama kota ≤30; body ≤160 | Tidak wajib gambar; gunakan ikon |
| Kapabilitas distribusi | Card ikon untuk layanan/kemampuan distribusi | Data-driven, saat ini set kecil tetap | Judul ≤45; deskripsi ≤140 | Tidak wajib gambar |
| CTA | Ajakan meminta penawaran atau menghubungi tim | 0 | Heading ≤60; body ≤180; CTA ≤25 | Panel warna, tanpa gambar |

## 3. Keberlanjutan — `/keberlanjutan`

Menggunakan `CorporateTopicPage`.

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero | Tema sustainability, judul, deskripsi, breadcrumb | 0 | Judul ≤70; deskripsi ≤220 | Hero bersama 1920×1080 |
| Pengantar | Alasan pendekatan keberlanjutan dan prinsip kerja | 1 panel prinsip | Heading/lead ≤220; panel ≤300 | Tidak ada gambar tambahan |
| Topik utama | Cleaner energy, operational safety, social contribution | 3 card | Judul ≤45; deskripsi ≤180 | Ikon, tanpa gambar |
| Catatan transparansi | Konteks pelaporan/transparansi | 0 | ≤250 | Tidak ada |
| CTA | Arah ke produk/layanan | 0 | Heading ≤60; body ≤180; CTA ≤25 | Tidak ada |

## 4. Energi Berkelanjutan — `/keberlanjutan/energi-berkelanjutan`

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero | Tema energi berkelanjutan dan breadcrumb bertingkat | 0 | Judul ≤70; deskripsi ≤220 | Hero bersama 1920×1080 |
| Pengantar B40 | Konteks B40, biodiesel, dan tujuan penggunaan | 0 | Heading ≤70; deskripsi ≤220 | Tidak ada |
| Produk/komponen energi | Biodiesel 40, Diesel 60, specification | 3 card | Judul ≤45; deskripsi ≤180 | Ikon, tanpa gambar |
| CTA | Arah ke halaman produk | 0 | Heading ≤60; body ≤180; CTA ≤25 | Tidak ada |

## 5. Kemitraan & Tata Kelola — `/keberlanjutan/kemitraan-tata-kelola`

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero | Tata kelola, kemitraan, breadcrumb | 0 | Judul ≤70; deskripsi ≤220 | Hero bersama 1920×1080 |
| Pengantar/prinsip | Cara membangun relasi dan mengambil keputusan | 1 panel prinsip | Heading/lead ≤220; panel ≤300 | Tidak ada |
| Topik tata kelola | Good relationships, governance, integrity | 3 card | Judul ≤45; deskripsi ≤180 | Ikon, tanpa gambar |
| Catatan governance | Penjelasan komitmen tata kelola | 0 | ≤250 | Tidak ada |
| CTA | Arah ke halaman kemitraan | 0 | Heading ≤60; body ≤180; CTA ≤25 | Tidak ada |

## 6. Keselamatan Operasional — `/keberlanjutan/keselamatan-operasional`

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero | Keselamatan operasional, ketepatan, koordinasi rute | 0 | Judul ≤70; deskripsi ≤220 | Hero bersama 1920×1080 |
| Pengantar/prinsip | Konteks accident-free dan standar kerja | 1 panel prinsip | Heading/lead ≤220; panel ≤300 | Tidak ada |
| Topik keselamatan | Accident free, punctuality, route coordination | 3 card | Judul ≤45; deskripsi ≤180 | Ikon, tanpa gambar |
| Safety note | Catatan keselamatan dan kepatuhan | 0 | ≤250 | Tidak ada |
| CTA | Arah ke halaman jangkauan | 0 | Heading ≤60; body ≤180; CTA ≤25 | Tidak ada |

## 7. Kebijakan Data — `/kebijakan-data`

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero | Judul kebijakan, deskripsi legal, breadcrumb | 0 | Judul ≤70; deskripsi ≤220 | Hero bersama 1920×1080 |
| Ringkasan kebijakan | Badge, heading, lead tentang perlindungan data | 0 | Heading ≤70; lead ≤220 | Tidak ada |
| Prinsip kebijakan | Satu card per item `policies` | Data-driven | Judul ≤55; body ≤300 | Tidak ada |
| Detail kebijakan | Heading dan paragraf penjelasan | 0 | Paragraf ≤500 | Tidak ada |
| Update/CTA | Status pembaruan kebijakan dan link | 0 | Pernyataan ≤350; link ≤35 | Panel warna, tanpa gambar |

## 8. Ketentuan Cookies — `/ketentuan-cookies`

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero | Ketentuan cookies, tujuan dokumen, breadcrumb | 0 | Judul ≤70; deskripsi ≤220 | Hero bersama 1920×1080 |
| Ringkasan cookies | Badge dan penjelasan penggunaan cookie | 0 | Heading ≤70; body ≤220 | Tidak ada |
| Jenis cookies | Necessary, preference, analytics/advertising | 3 card | Judul ≤55; body ≤250; status ≤25 | Tidak ada |
| Durasi/retensi | Penjelasan penyimpanan dan penghapusan cookie | 0; 3 paragraf | Setiap paragraf ≤400 | Tidak ada |
| Update terms | Label update, quote, link policy | 0 | Quote ≤350; link ≤35 | Panel gelap, tanpa gambar |

## 9. Kenali Produk — `/produk/kenali-produk`

Sumber: `app/produk/kenali-produk/page.tsx`.

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero produk | Identitas produk dan breadcrumb | 0 | Judul ≤70; deskripsi ≤220 | Hero 1920×1080 |
| Pengenalan kategori | Penjelasan kelompok produk dan konteks penggunaan | 0 | Heading ≤70; body ≤220 | Tidak wajib |
| Produk utama | Satu blok/card untuk setiap produk yang dikonfigurasi | Data-driven | Nama ≤55; deskripsi ≤220 | Artwork transparan 1200×1400; panel sekitar 1.08:1 desktop |
| Alur pemilihan | Langkah bernomor untuk memilih/menggunakan produk | Tepat 4 langkah | Judul ≤55; deskripsi ≤180 | Ikon/nomor, tanpa gambar |
| Armada/dukungan | Land fleet dan dukungan distribusi | 1 feature card/panel | Judul ≤55; body ≤220 | Visual partnership/produk sekitar 1:1 atau 3:2 |
| CTA | Arah ke penawaran | 0 | CTA ≤25 | Tidak ada |

## 10. Armada — `/produk/armada`

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero armada | Kapabilitas armada dan breadcrumb | 0 | Judul ≤70; deskripsi ≤220 | Hero 1920×1080 |
| Pengantar land fleet | Jenis armada dan peran terhadap distribusi | 0 | Heading ≤70; body ≤220 | Fleet photo 4:3/3:2, 1200×800 |
| Pilihan kapasitas | Selector/card untuk setiap varian kapasitas | Jumlah varian fleksibel; galeri maksimal 6 foto per varian | Label ≤35; ringkasan ≤180 | Visual armada 4:3/3:2, `object-cover` |
| Transportasi laut | Penjelasan dukungan transportasi laut | 0–1 panel | Heading ≤55; body ≤220 | Visual 3:2 bila digunakan |
| Catatan availability | Ketersediaan dan konteks operasional | 0 | ≤250 | Tidak wajib |
| CTA | Arah ke kemitraan/penawaran | 0 | Heading ≤60; body ≤180; CTA ≤25 | Tidak ada |

## 11. Penawaran — `/produk/penawaran`

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero/pengantar | Tujuan halaman penawaran dan konteks calon pelanggan | 0 | Judul ≤70; deskripsi ≤220 | Hero/visual 16:9, 1920×1080 bila digunakan |
| Persiapan penawaran | Informasi yang perlu disiapkan sebelum menghubungi tim | 1 card/panel utama | Judul ≤60; body ≤220 | Tidak wajib |
| Checklist persiapan | Satu item untuk setiap `preparationItems` | Tepat 4 item | Judul ≤50; penjelasan ≤180 | Ikon/nomor, tanpa gambar |
| Proses/informasi | Langkah atau informasi pendukung penawaran | Tepat 3 langkah | Judul ≤55; body ≤180 | Tidak wajib |
| CTA kontak | Ajakan mengajukan penawaran | 0 | Heading ≤60; body ≤180; CTA ≤25 | Tidak ada |

## 12. Ajukan Penawaran — `/produk/penawaran/ajukan`

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero/intro form | Menjelaskan tujuan form dan proses tindak lanjut | 0 | Judul ≤70; deskripsi ≤220 | Tidak wajib; jika dipakai 16:9 |
| Identitas pelanggan | Nama, perusahaan, kontak, email | 0 card; field group | Label ≤45; helper ≤140 | Tidak ada |
| Kebutuhan produk | Produk, volume, liter, periode, lokasi | 0 card; field group | Label ≤45; helper ≤140 | Tidak ada |
| Perhitungan penawaran | Subtotal, PBBKB, total, volume | 0 card; summary block | Label ≤45; helper ≤140 | Tidak ada |
| Catatan/disclaimer | Penjelasan data dan proses email | 0 | ≤500 | Tidak ada |
| CTA submit | Kirim permintaan penawaran | 0 | Tombol ≤25; error ≤160 | Tidak ada |

## 13. Profil Perusahaan — `/tentang-kami/profil-perusahaan`

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero | Identitas dan posisi perusahaan | 0 | Judul ≤70; deskripsi ≤220 | Hero 1920×1080 |
| Pengenalan perusahaan | Sejarah, peran, dan fokus layanan | 0 | Heading ≤70; lead ≤220; body ≤350 | Tidak wajib |
| Feature perusahaan | Story/keunggulan dengan CTA | 0 card; maksimal 2 CTA | Judul ≤70; deskripsi ≤220; CTA ≤25 | Full-bleed 16:9, 1920×1080 |
| Prinsip kerja | Satu card per item `principles` | Data-driven | Judul ≤55; body ≤180 | Ikon, tanpa gambar |
| Fakta perusahaan | Data/fact blocks dan angka penting | Data-driven | Label ≤35; deskripsi ≤120 | Tidak wajib |
| CTA penutup | Ajakan menuju halaman terkait | 0 | Heading ≤60; body ≤180; CTA ≤25 | Tidak ada |

## 14. Harapan & Cita-Cita — `/tentang-kami/harapan-cita-cita`

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero | Aspirasi perusahaan dan breadcrumb | 0 | Judul ≤70; deskripsi ≤220 | Hero 1920×1080 |
| Intro aspirasi | Judul dan dua paragraf konteks | 0 | Judul ≤70; setiap paragraf ≤350 | Tidak wajib |
| Pattern visual | Visual dekoratif aspirasi | 0 card | Tidak ada teks | SVG transparan sekitar 3:2, `object-contain` |
| Standar perusahaan | Heading, lead, body, satu panel gelap | 1 panel | Judul ≤60; body ≤300 | Tidak ada |
| Komitmen | Empat komitmen perusahaan | 4 card | Judul ≤55; deskripsi ≤180 | Ikon, tanpa gambar |
| Penutup/CTA | Heading, lead, body, tombol | 0 | Heading ≤70; lead ≤220; body ≤300; CTA ≤25 | Tidak ada |

## 15. Kemitraan — `/tentang-kami/kemitraan`

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero | Nilai kemitraan dan breadcrumb | 0 | Judul ≤70; deskripsi ≤220 | Hero 1920×1080 |
| Pengantar | Alasan dan bentuk kemitraan | 0 | Heading ≤70; body ≤220 | Tidak wajib |
| Partnership showcase | Visual/cerita kemitraan | Data-driven | Judul ≤55; body ≤220 | Showcase 1:1, 1200×1200, `object-cover` |
| Proses/persyaratan | Langkah, syarat, atau manfaat kerja sama | Data-driven | Judul ≤55; body ≤180 | Ikon/ilustrasi opsional |
| CTA | Arah ke penawaran/kontak | 0 | Heading ≤60; body ≤180; CTA ≤25 | Tidak ada |

## 16. Legalitas — `/tentang-kami/legalitas`

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero | Status legalitas dan breadcrumb | 0 | Judul ≤70; deskripsi ≤220 | Hero 1920×1080 |
| Legal highlights | Ringkasan legal/administratif utama | Data-driven `legalHighlights` | Judul ≤50; body ≤180 | Ikon, tanpa foto |
| Dokumen | Daftar dokumen legal perusahaan | Data-driven `documents` | Judul ≤70; metadata/body ≤220 | Thumbnail opsional 4:3/3:2, 1200×800 |
| Pernyataan legal | Kesimpulan atau konteks kepatuhan | 0–1 panel | Heading ≤70; body ≤300 | Tidak wajib |
| CTA | Link/kontak lanjutan | 0 | CTA ≤25 | Tidak ada |

## 17. Karir — `/tentang-kami/karir`

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero | Employer brand dan ajakan bergabung | 0 | Judul ≤70; deskripsi ≤220 | Hero 1920×1080 |
| Nilai bekerja | Why us, cara bertumbuh, budaya profesional | 1 panel gelap + section heading | Heading ≤70; body ≤220; panel ≤300 | Tidak wajib |
| Benefit | Purpose, culture, learning, safety, collaboration, growth | 6 card | Judul ≤55; deskripsi ≤180 | Ikon, tanpa gambar |
| Lowongan | Opening pekerjaan aktif | 2 opening saat ini; data-driven | Jabatan ≤70; department/type/location ≤35; summary ≤250 | Tidak wajib |
| CTA apply | Link ke form lamaran dengan slug posisi | 0 | Label ≤25 | Tidak ada |

Slug posisi, department, lokasi, dan nilai API tidak boleh diterjemahkan atau diubah.

## 18. Form Lamaran — `/tentang-kami/karir/lamar`

| Segmen | Konteks teks | Jumlah card | Batas teks | Gambar |
|---|---|---:|---|---|
| Hero aplikasi | Penjelasan singkat proses lamaran | 0 | Judul ≤70; deskripsi ≤220 | Hero 1920×1080 |
| Identitas pelamar | Nama lengkap, email, nomor telepon | 0 card; field group | Label ≤45; placeholder ≤45 | Tidak ada |
| Posisi | Select posisi dari opening yang tersedia | 0 card; 1 select | Label ≤45; option ≤70 | Tidak ada |
| Pesan singkat | Pengalaman/alasan ketertarikan | 0 card; 1 textarea | Label ≤45; helper ≤140 | Tidak ada |
| CV/dokumen | Upload PDF, DOC, DOCX, maksimal 5 MB per file | 0 card; 1 upload area | Instruksi ≤220; error ≤160 | Tidak ada |
| Submit state | Sending, success, failure, remove file | 0 card | Status ≤160; aria label ≤60 | Tidak ada |

Form mempertahankan query `?posisi=<slug>` dan mengirim ke `/api/career-applications`.
Jangan menerjemahkan slug posisi atau nama file upload.

---

## Checklist validasi konten sebelum masuk CMS

- [ ] Setiap route memiliki eyebrow, title, description, dan breadcrumb sesuai konteks.
- [ ] Tidak ada title yang melewati 70 karakter.
- [ ] Tidak ada deskripsi umum yang melewati 220 karakter tanpa alasan editorial.
- [ ] Setiap card memiliki title dan body; card legal/policy boleh memakai batas 300 karakter.
- [ ] Jumlah card mengikuti tabel dan sumber data aktual.
- [ ] Gambar hero tersedia minimal 1920×1080 dan subject tidak tertutup overlay.
- [ ] Gambar card memakai rasio yang sesuai dengan komponen pemakainya.
- [ ] Asset transparan produk/pattern tidak dipaksa menjadi `object-cover`.
- [ ] Nama brand, URL, slug, nomor legal, angka kapasitas, dan identifier teknis tidak diterjemahkan.
- [ ] Versi English divalidasi ulang karena biasanya lebih panjang dari versi Indonesia.
- [ ] Artikel dan struktur organisasi dikelola melalui mapping terpisah.
