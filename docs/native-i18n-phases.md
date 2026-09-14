# Native i18n Implementation Phases

Dokumen ini membagi implementasi terjemahan native menjadi fase kecil agar setiap perubahan dapat divalidasi secara terpisah.

## Scope

- Bahasa yang didukung: Indonesia (`id`) dan English (`en`).
- UI statis diterjemahkan melalui dictionary native.
- Artikel tidak diterjemahkan pada fase awal; konten artikel akan dipersiapkan melalui Sanity pada fase terpisah.
- Google Web Translate tidak digunakan.
- Google Cloud Translation API tidak digunakan pada fase native ini.

## Fase 1 — Fondasi locale

Status: selesai

- [x] Mempertahankan `LocaleProvider` sebagai sumber state locale client.
- [x] Menyimpan pilihan bahasa di `localStorage`.
- [x] Menyinkronkan atribut `document.documentElement.lang`.
- [x] Mempertahankan dictionary typed di `lib/i18n.ts`.
- [x] Memastikan selector bahasa hanya menerima locale yang didukung.
- [x] Menetapkan batas artikel sebagai scope Sanity berikutnya.

## Fase 2 — UI global

Status: selesai untuk UI global utama; label form dan link turunan dilanjutkan pada fase berikutnya

- [x] Menerjemahkan label header desktop dan mobile.
- [x] Menerjemahkan label market/weather ribbon.
- [x] Menerjemahkan footer utama.
- [x] Menerjemahkan cookie consent.
- [ ] Menerjemahkan label umum form dan dialog.

Catatan:

- Label link turunan footer masih berasal dari konfigurasi navigasi dan akan
  dinormalisasi bersama halaman terkait pada Fase 3-4.
- Kondisi cuaca dinamis dari provider eksternal tetap dipertahankan apa adanya;
  label ribbon dan sumber cuaca sudah diterjemahkan.

## Fase 3 — Homepage

Status: selesai

- [x] Menerjemahkan HomeHero.
- [x] Menerjemahkan section statis homepage utama.
- [x] Menerjemahkan CTA, badge, dan statistik.
- [x] Menjaga angka, nama brand, dan istilah teknis tetap benar.
- [x] Menerjemahkan ProductShowcase, PartnershipShowcase, ResourceGrid, dan ArticleShowcase.

## Fase 4 — Halaman statis

Status: berjalan; halaman statis utama, Karir, form lamaran, dan halaman legal selesai

- [x] Menerjemahkan halaman Harapan & Cita-Cita.
- [x] Menerjemahkan halaman Profil Perusahaan.
- [x] Menerjemahkan halaman Kemitraan.
- [x] Menerjemahkan halaman Legalitas.
- [x] Menerjemahkan halaman Armada.
- [x] Menerjemahkan halaman Kenali Produk.
- [x] Menerjemahkan halaman Produk Penawaran.
- [x] Menerjemahkan form Pengajuan Penawaran.
- [x] Menerjemahkan halaman Jangkauan.
- [x] Menerjemahkan halaman Keberlanjutan dan seluruh subhalamannya.
- [x] Menerjemahkan halaman Kebijakan Data dan Ketentuan Cookies.
- [x] Menerjemahkan halaman Karir dan form lamaran, termasuk validasi file, status submit, dan client wrapper untuk menjaga metadata/search params di server.
- [ ] Menerjemahkan halaman Tentang Kami lainnya.

## Fase 5 — Artikel dan Sanity

Status: pending

- [ ] Menentukan schema locale pada dokumen artikel.
- [ ] Menentukan fallback bahasa artikel.
- [ ] Menambahkan field title, excerpt, body, dan SEO per locale.
- [ ] Menghubungkan route artikel dengan locale.
- [ ] Menambahkan preview dan validasi konten bilingual.

## Aturan implementasi

- Komponen menggunakan `useLocale` dan `translate` untuk UI client.
- Dictionary harus typed dan tidak memakai key string bebas.
- Jangan menerjemahkan nama brand, URL, nilai angka, atau istilah teknis tanpa keputusan konten.
- Perubahan locale tidak boleh memodifikasi DOM secara global selain atribut `lang`.
- Setiap fase wajib melewati typecheck, lint, dan build sebelum fase berikutnya.
