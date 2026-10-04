# DeepL dan Terjemahan Konten Sanity

## Cara kerja

- `lib/translation-handler.ts` memakai DeepL API langsung jika
  `DEEPL_API_KEY` tersedia. Key Free yang berakhiran `:fx` menggunakan
  `https://api-free.deepl.com/v2/translate`; selain itu default ke endpoint
  Pro. `DEEPL_API_URL` dapat mengganti endpoint jika akun memakai URL khusus.
- Fallback `TRANSLATION_API_URL` dan `TRANSLATION_API_KEY` tetap didukung bagi
  deployment yang masih menggunakan adapter/proxy lama.
- `/api/translate` adalah API eksplisit untuk permintaan terjemahan manual;
  halaman tidak menerjemahkan konten Sanity pada setiap render.
- `POST /api/sanity/translation-webhook` memproses objek localized `{ id, en }`
  pada tipe `homePage`, `pageHeroEditor`, `pageMediaEditor`, `mediaAsset`,
  `careerOpening`, `partner`, `client`, `partnership`, `partnershipPage`,
  `newsroomArticle`, legacy `article`, `newsroomCategory`, `teamMember`,
  `product`, `fleetOption`, `jangkauanPage`, dan `coverageArea`.
- Keterangan media memakai `localizedMediaText` dengan Bahasa Indonesia
  sebagai sumber dan English sebagai target: image alt, gallery caption, serta
  judul kartu Jangkauan yang juga dipakai sebagai caption galeri. Logo dan nama
  perusahaan, nama file, ID slot, serta `mediaAsset.notes` tetap bukan target
  terjemahan.
- Nama dan deskripsi empat kartu produk Beranda (`pageMediaEditor.homeSlots`
  dengan ID `home-product-logo-1` sampai `home-product-logo-4`) sudah memakai
  objek localized. Contoh data production yang diperiksa: slot pertama memiliki
  Bahasa Indonesia tetapi English belum terisi; query Beranda menampilkan
  fallback Indonesia sampai webhook memproses dokumen `pageMediaEditor`.
- Webhook hanya mengirim teks Indonesia ke English. English kosong diterjemahkan;
  bila source Indonesia berubah, English otomatis diperbarui hanya jika nilainya
  masih cocok dengan hash hasil terjemahan otomatis. English manual tetap aman.
- Untuk data media lama, jalankan `npm run migrate:media-locales:dry-run` dari
  `studio-anigos-project` terlebih dahulu. Script hanya menghitung string
  alt/caption/judul kartu serta name/description legacy pada slot produk
  Beranda yang akan dibungkus menjadi `{ id }`; mode `--apply` memerlukan
  project, dataset, dan token yang ditetapkan secara eksplisit.
  Setelah dokumen termutasi, webhook mengisi English dan hash; migrasi tidak
  memanggil DeepL secara langsung.
- Artikel dan metadata newsroom menyimpan `id` dan `en` pada field
  `localizedHeroText` atau `localizedArticleText`. Judul, ringkasan, estimasi
  waktu baca, kategori, subkategori, deskripsi kategori, dan paragraf artikel
  semuanya diproses oleh webhook yang sama.
- Query newsroom memilih `en` atau `id` dari cookie locale, lalu fallback ke
  Bahasa Indonesia bila English belum tersedia. Perubahan locale me-refresh
  data server, termasuk detail artikel dan showcase artikel di beranda.
- Teks English yang kosong diterjemahkan satu kali dan ditulis kembali ke
  dokumen Sanity. Hash sumber disimpan pada field tersembunyi
  `translationSourceHash`; hash hasil terjemahan juga disimpan sebagai
  `translationTargetHash`. Jika source berubah, hasil otomatis diperbarui
  hanya jika nilai English masih sama dengan hasil otomatis sebelumnya.
  English yang diisi manual tanpa hash atau diubah sesudah pasangan hash baru
  tersimpan tidak ditimpa. Dokumen hasil webhook versi lama mungkin hanya
  memiliki hash sumber; hash target yang belum ada tidak dapat membedakan
  terjemahan lama yang diedit manual dari hasil otomatisnya.
- Request DeepL duplikat dalam instance server digabung/cached dengan cache
  berbatas ukuran. Sumber kebenaran jangka panjang adalah hasil English dan
  hash di Sanity, karena cache proses serverless dapat hilang kapan saja.
- Field dokumen diproses dalam batch (hingga 20 teks per request DeepL), dengan
  batas 100 field untuk artikel dan 80 field untuk kategori. Batas karakter
  setiap teks adalah 5.000 karakter.
- Patch memakai `_rev` dari dokumen yang dibaca. Jika dokumen berubah selama
  DeepL menerjemahkan, webhook membaca ulang revisi terbaru dan mencoba kembali
  sekali; edit terbaru tidak tertimpa.

## Environment variables

Production/Preview yang mengaktifkan webhook harus memiliki:

- `DEEPL_API_KEY` (atau pasangan legacy `TRANSLATION_API_URL` dan
  `TRANSLATION_API_KEY`)
- `SANITY_AUTH_TOKEN` dengan izin baca dan update pada `6zvti7ob/production`
- `SANITY_TRANSLATION_WEBHOOK_SECRET`, secret acak terpisah untuk autentikasi
  webhook
- `NEXT_PUBLIC_SANITY_PROJECT_ID=6zvti7ob` dan
  `NEXT_PUBLIC_SANITY_DATASET=production`

`DEEPL_API_URL` bersifat opsional. Jangan masukkan nilai secret ke repository,
URL, pesan log, atau payload webhook. `SANITY_TRANSLATION_WEBHOOK_SECRET` harus
sama dengan token pada header webhook.

## Konfigurasi webhook Sanity

Buat webhook di Sanity Manage dengan:

- URL: `https://<domain>/api/sanity/translation-webhook`
- Method: `POST`
- Trigger: `Create` dan `Update`; jangan aktifkan draft events
- Filter:

```groq
_type in ["homePage", "pageHeroEditor", "pageMediaEditor", "mediaAsset", "careerOpening", "partner", "client", "partnership", "partnershipPage", "newsroomArticle", "article", "newsroomCategory", "teamMember", "product", "fleetOption", "jangkauanPage", "coverageArea"] && !(_id in path("drafts.**"))
```

- Projection: `{ "_id": _id, "_type": _type }`
- Header: `Authorization: Bearer <SANITY_TRANSLATION_WEBHOOK_SECRET>`
- Payload: JSON

Webhook dapat terpanggil lagi sesudah patch menulis English dan hash. Pada
panggilan itu library mendeteksi source hash yang sama, tidak mengirim request
DeepL lagi, dan tidak membuat patch baru. Jika ingin menambahkan tipe konten baru, masukkan tipe tersebut ke allowlist
kode dan filter webhook. Jangan aktifkan draft events.

## Verifikasi dan aktivasi

1. Tambahkan environment variables sebagai secrets pada project Vercel dan
   secret webhook pada Sanity Manage; secret webhook jangan disamakan dengan
   token Sanity write.
2. Deploy aplikasi dan Studio agar schema localized newsroom, hash tersembunyi,
   dan endpoint webhook terbaru tersedia.
3. Buat/perbarui webhook dengan filter di atas, lalu jalankan
   `npm run migrate:newsroom-locales:dry-run` dari `studio-anigos-project`.
   Periksa jumlah dokumen/field yang akan berubah. Script memiliki target tetap
   `6zvti7ob/production`; dry-run tidak menulis dokumen.
4. Jika hitungan sesuai, jalankan
   `npm run migrate:newsroom-locales:apply` dengan target production dan token
   Sanity yang ditetapkan eksplisit. Migrasi hanya membungkus teks lama ke
   `{ id }`; tidak menghapus konten. Dengan webhook Update aktif, field yang
   belum memiliki English akan diterjemahkan dan hash disimpan. Pastikan budget
   DeepL sebelum menjalankannya.
5. Untuk keterangan media lama, jalankan `npm run migrate:media-locales:dry-run`
   dari `studio-anigos-project`, review hitungannya, lalu gunakan
   `npm run migrate:media-locales:apply` hanya dengan target production dan
   token Sanity yang ditetapkan eksplisit. Pastikan webhook Update aktif; webhook
   akan mengisi English sekali untuk setiap string Indonesia yang dimigrasikan.
6. Uji pada dokumen yang aman: publish objek localized berisi `id` dan `en`
   kosong, lalu pastikan webhook mengisi `en` dan kedua hash. Ulangi update
   tanpa perubahan source: hasilnya harus `translatedFields: 0` dan tidak ada
   pemanggilan DeepL. Ubah `id`: English otomatis yang belum diedit manual harus
   diperbarui. English yang diedit manual harus tetap.
7. Periksa log webhook/API dan pemakaian DeepL setelah uji; jangan log nilai
   key maupun teks pribadi yang tidak diperlukan.

Lingkungan Vercel Production terakhir diperiksa pada 2 Oktober 2026 dan belum
memiliki nama environment `DEEPL_API_KEY`/adapter legacy,
`SANITY_AUTH_TOKEN`, atau `SANITY_TRANSLATION_WEBHOOK_SECRET`. Kode saja tidak
mengaktifkan webhook di production sampai variabel tersebut ditambahkan.
