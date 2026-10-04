# Audit dan Rencana Peningkatan Sanity

**Tanggal audit:** 1 Oktober 2026
**Cakupan:** Studio/navigation, schema dan singleton, app routing/wiring, seed dan
migrasi, autentikasi, webhook, cache, serta kesiapan build/deploy.
**Jenis pekerjaan:** audit read-only dan rencana; tidak ada seed, mutasi dokumen,
atau deployment yang dijalankan.

## Ringkasan eksekutif

Studio aktif dapat dibangun, dan app memiliki alur konten Sanity yang cukup
lengkap. Namun, audit menemukan tiga risiko yang perlu diselesaikan sebelum
menyebut integrasi siap produksi:

1. **Target project aktif sudah diputuskan, dikunci, dan dideploy.**
   `6zvti7ob/production` adalah target aktif; `wm8u3z2o` adalah project lama
   dan tidak boleh dipakai untuk app, Studio aktif, seed, atau deployment.
   Konfigurasi Studio menolak target lingkungan yang berbeda. Hosted Studio
   berhasil dideploy pada 2026-10-02 dengan App ID
   `b0aeni0iyzep8bldqhbp0qt2`; schema workspace `petro-anigos` terdaftar pada
   project/dataset aktif. URL hosted meminta login Sanity untuk sesi tanpa
   autentikasi.
2. **Beberapa jalur editorial tidak cocok dengan perilaku app.** Seed media
   memiliki project default yang berbeda; Jangkauan tidak mengikuti draft mode;
   registry halaman tidak otomatis menjamin semua route baru tercatat; dan
   Home Hero semula kosong ketika konten Sanity tidak dapat dipakai. Audit detail
   memastikan schema type Home Hero sendiri cocok dengan menu Studio.
3. **Kontrol nonaktif halaman belum efektif pada dataset app saat ini.** Query
   published read-only ke `6zvti7ob/production` menemukan dokumen
   `pageVisibilitySettings` tidak ada. App karena itu mengembalikan default semua
   halaman aktif. API/cache/ETag berfungsi, tetapi toggle belum mengendalikan
   halaman sebelum singleton dipublish.

Pemeriksaan `SANITY_AUTH_TOKEN` tidak dapat memastikan valid/tidaknya token:
authenticated identity check timeout dari lingkungan audit. **Timeout bukan
bukti token salah.** Query publik read-only kemudian berhasil untuk Home Hero
dan mengonfirmasi ketiadaan dokumen visibility. Nilai token tidak dicetak atau
dimasukkan ke dokumen ini.

## Cara audit dan tingkat kepastian

- Memeriksa source aktif app dan `studio-anigos-project`, struktur menu, route,
  schema registry, dokumentasi, dan skrip yang tersedia.
- Build aktif Sanity Studio berhasil.
- TypeScript dan ESLint terarah untuk area status halaman lolos.
- `npm run check:content-contracts` gagal karena skrip membuka
  `studio-anigos-project/sanity/lib/page.ts`, file yang tidak ada di lokasi itu.
- Uji API authenticated identity read-only tidak tuntas karena koneksi Sanity
  timeout; query published publik untuk konten Hero berhasil.
- Query published langsung mengonfirmasi dokumen
  `pageVisibilitySettings` tidak ada pada `6zvti7ob/production`.
- `/api/page-visibility` menghasilkan HTTP 200 dengan map semua `true` dan
  request bersyarat ETag menghasilkan HTTP 304. Ini memverifikasi snapshot dan
  penghematan transfer, bukan toggle off/on karena belum ada dokumen settings.
- Tidak ada seed, write API, upload, ataupun deploy dijalankan.
- Dokumentasi resmi Next.js untuk [`unstable_cache`](https://nextjs.org/docs/app/api-reference/functions/unstable_cache)
  dan [`revalidateTag`](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
  diperiksa untuk rancangan cache. Dokumentasi Sanity tidak dapat diambil dari
  lingkungan audit; pengaturan webhook hosted perlu diverifikasi langsung pada
  dashboard Sanity sebelum produksi.

Label temuan:

- **Terbukti:** dapat ditunjukkan langsung dari kode, skrip, atau hasil build.
- **Perlu verifikasi live:** konfigurasi dataset, hak akses, atau perilaku hosted
  tidak dapat dipastikan tanpa koneksi.
- **Rekomendasi:** peluang peningkatan operasional/performa; bukan klaim bahwa
  sistem saat ini rusak.

## Temuan audit terurut

| ID   | Prioritas | Status                                                                                | Temuan dan dampak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---- | --------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A-01 | P1        | Target aktif dikunci dan hosted deploy terverifikasi                                  | `6zvti7ob/production` adalah satu-satunya target aktif. Project `wm8u3z2o` dan hosted Studio sebelumnya merupakan legacy; bukan target operasi saat ini. `sanity.config.ts` dan `sanity.cli.ts` menetapkan project/dataset aktif dan menolak environment override yang berbeda. Pada 2026-10-02 Studio dideploy dengan App ID `b0aeni0iyzep8bldqhbp0qt2`; `sanity schema list` mengonfirmasi workspace `petro-anigos` pada project/dataset aktif. URL hosted merespons dan meminta autentikasi untuk sesi tanpa login. Snapshot JSON dan milestone bertanggal adalah arsip historis, bukan input konfigurasi.               |
| A-02 | —         | **Bukan temuan (dikoreksi)**                                                          | Pemeriksaan schema lebih rinci memastikan `homeHeroEditor` adalah nama variabel ekspor, sedangkan `defineType()` mendaftarkan nama Sanity `homePage`; nama itu cocok dengan `schemaType("homePage")` dan ID dokumen `homePage` di struktur Studio. Build Studio juga berhasil. Dugaan mismatch pada audit awal keliru dan tidak memerlukan perubahan schema. Sumber: `studio-anigos-project/structure.ts`, `studio-anigos-project/sanity/schemaTypes/index.ts`, `studio-anigos-project/sanity/schemaTypes/homeHeroEditor.ts`.                                                                                               |
| A-03 | P2        | Seed umum tidak tersedia; dry-run Marine Fuel terkini terhalang konflik metadata      | Script umum `seed-media-slots.mjs` yang disebut dokumentasi masih tidak ada. Project `wm8u3z2o` adalah legacy dan bukan target untuk operasi sekarang. Seed Marine Fuel dikunci ke `6zvti7ob/production` dan menolak metadata konflik. Pemeriksaan read-only 2026-10-02 menunjukkan slot video Home sudah ada tetapi nilai `containerRatio` berbeda dari definisi seed; dry-run berhenti pada konflik itu sebelum melaporkan kelengkapan slot lain. Query langsung menunjukkan dua slot Produk belum ada. Apply tidak dijalankan.                                                                                           |
| A-04 | P2        | Terbukti dari hasil command                                                           | `npm run check:content-contracts` gagal membuka `studio-anigos-project/sanity/lib/page.ts` yang tidak ditemukan. Ini membuat pemeriksaan contract belum dapat dipercaya sebagai quality gate. Skrip perlu diarahkan ke sumber aktual dan diuji dengan kasus lulus/gagal.                                                                                                                                                                                                                                                                                                                                                    |
| A-05 | P2        | Terbukti                                                                              | `/api/jangkauan` memakai Sanity published client langsung, sementara helper draft-aware tersedia dan dipakai route lain. Preview Jangkauan dapat menampilkan konten publish, bukan draft. Sumber: `app/api/jangkauan/route.ts`, `lib/sanity-client.ts`. Pastikan apakah pengecualian ini memang dikehendaki.                                                                                                                                                                                                                                                                                                                |
| A-06 | P2        | Terbukti; kebijakan perlu diputuskan                                                  | Pengaturan visibilitas halaman selalu bersumber dari published document, termasuk saat preview mode; halaman disabled juga dapat ditahan oleh root layout. Editor tidak dapat mem-preview perubahan toggle yang masih draft. Sumber: `lib/page-visibility.ts`, `app/layout.tsx`.                                                                                                                                                                                                                                                                                                                                            |
| A-07 | P2        | Gap ditutup untuk route app saat ini; guard otomatis ditambahkan                      | `isPagePathVisible()` tetap visible untuk path yang tidak dikenal agar route baru tidak rusak diam-diam, tetapi sekarang `npm run check:page-visibility-routes` membandingkan semua file `app/**/page.tsx` dengan registry dan gagal bila ada route tanpa aturan. Pemeriksaan mencakup 29 route saat ini.                                                                                                                                                                                                                                                                                                                   |
| A-08 | P2        | Terbukti                                                                              | Home hero/wiring media memakai lebih dari satu sumber data (dokumen homepage, slot `pageMediaEditor`, dan legacy `mediaAsset`). Home API menggabungkan array tanpa aturan deduplikasi/precedence eksplisit. Slot dengan ID sama berpotensi punya sumber/hasil berbeda. Sumber: `app/api/home/route.ts`.                                                                                                                                                                                                                                                                                                                     |
| A-09 | P2        | Terbukti                                                                              | Query newsroom membaca `newsroomArticle` dan legacy `article`, tetapi filter `isPublished` hanya terlihat diterapkan pada legacy `article`. Perlu memastikan apakah dokumen newsroom hanya boleh tampil berdasarkan perspective/publish state Sanity. Sumber: `lib/sanity-newsroom.ts`.                                                                                                                                                                                                                                                                                                                                     |
| A-10 | P2        | Terbukti sebagai kompatibilitas yang perlu dikendalikan                               | Query Client menggabungkan dokumen `client` dan `partner` lama yang ditandai `isClient`. Perusahaan yang sama dapat terduplikasi atau datanya berbeda selama migrasi belum tuntas. Sumber: `lib/sanity-queries.ts`.                                                                                                                                                                                                                                                                                                                                                                                                         |
| A-11 | P2        | Sebagian diverifikasi live                                                            | Query publik langsung pada project `6zvti7ob/production` mengonfirmasi dokumen `pageVisibilitySettings` **tidak ada** (result `null`). Authenticated identity check tetap belum tuntas; timeout sebelumnya bukan bukti token salah. Permission dan keadaan hosted Studio masih perlu dikonfirmasi. Konsekuensi dokumen hilang dicatat di A-23.                                                                                                                                                                                                                                                                              |
| A-12 | P3        | Terbukti                                                                              | Skrip seed memakai project default berbeda; selain itu paket Studio tidak mendeklarasikan script `deploy`, sementara README menyebut perintah deploy. Dokumentasi operasi belum menjadi prosedur tunggal yang dapat diulang.                                                                                                                                                                                                                                                                                                                                                                                                |
| A-13 | P3        | Terbukti                                                                              | Dokumentasi deployment/CORS tidak konsisten dan belum membuktikan production origin, callback webhook page visibility, secret, atau hasil callback hosted terpasang. Endpoint callback ada di app, tetapi tidak otomatis membuat webhook di Sanity.                                                                                                                                                                                                                                                                                                                                                                         |
| A-14 | P3        | Terbukti, dampak perlu keputusan                                                      | Artikel dan produk memiliki halaman indeks tambahan yang tidak seluruhnya berada di menu utama/sitemap; beberapa route form/kategori memang mungkin sengaja menjadi utilitas CTA-only. Perlu klasifikasi eksplisit agar route visibility tidak identik dengan SEO/navigation secara keliru.                                                                                                                                                                                                                                                                                                                                 |
| A-15 | P3        | Terbukti                                                                              | Route detail kemitraan lama masih ada, tetapi redirect hanya mencakup collection route; halaman detail invalid menampilkan empty-state di dalam app, bukan response 404. Pertahankan hanya jika URL lama diperlukan.                                                                                                                                                                                                                                                                                                                                                                                                        |
| A-16 | P2        | Terbukti, ditangani pada pengerjaan Hero                                              | `HomeHero` semula tidak memiliki konten fallback dan mengembalikan `null` ketika tidak ada slide valid; endpoint Home Hero dan Page Hero juga memakai client biasa tanpa batas timeout khusus ketersediaan. Gangguan Sanity dapat membuat Hero beranda kosong atau menahan fallback terlalu lama. App kini memakai client availability dengan timeout 5 detik untuk kedua endpoint dan fallback teks lokal satu slide; video tetap memakai poster lokal yang tersedia. Sumber: `app/api/home-hero/route.ts`, `app/api/page-hero/route.ts`, `components/sections/home-hero.tsx`, `lib/sanity-client.ts`.                     |
| A-17 | P2        | Terbukti, ditangani pada pengerjaan Hero                                              | Schema Home Hero semula mengizinkan sampai 8 slide, sementara aplikasi hanya menampilkan maksimal 4. Slide ke-5 sampai ke-8 dapat tersimpan/publish tetapi tidak pernah terlihat. Schema kini membatasi 1–4 slide dan menolak nomor urutan ganda; aplikasi dan Studio menggunakan konstanta batas yang sama dari `shared/sanity-content-contracts.ts`.                                                                                                                                                                                                                                                                      |
| A-18 | P2        | Terbukti, ditangani pada pengerjaan Hero                                              | Endpoint Page Hero semula mengambil seluruh singleton `pageHeroEditor` untuk setiap halaman. Kini published singleton dibaca sekali dan di-cache bersama selama 60 detik (menghindari satu miss per route); app hanya mengembalikan field halaman yang diminta, memvalidasi page key, dan draft bypass cache.                                                                                                                                                                                                                                                                                                               |
| A-19 | P3        | Terbukti, ditangani pada pengerjaan Hero                                              | `HOME_QUERY` juga mengambil sebagian `heroSlides` yang tidak dipakai oleh `HomeContent`; Hero memiliki endpoint sendiri. Fragmen duplikat dihapus dari query Home, sementara respons endpoint Hero published di-cache server 60 detik.                                                                                                                                                                                                                                                                                                                                                                                      |
| A-20 | P2        | Terbukti dari pembacaan live, mitigasi app/schema diterapkan                          | Pembacaan read-only terhadap project yang dipakai app mengembalikan empat slide published: slide posisi 3 dan 4 bertipe `image` tetapi tidak memiliki image asset. Sebelumnya app membuang slide tersebut; kini konten teksnya tetap tampil dengan gambar fallback lokal dan memberi warning, sedangkan validasi schema mencegah kondisi ini dipublish ulang. Data existing belum dimutasi.                                                                                                                                                                                                                                 |
| A-21 | P1        | Terbukti dari network; pemutaran dan guard diperbaiki                                 | Video Home Hero live berukuran 41.362.360 byte (sekitar 39,5 MiB). Ukuran rekomendasi 8 MiB tetap ditampilkan Studio untuk mempercepat mulai video, tetapi app menerima video sampai 50 MiB agar asset live bisa diputar. Elemen aktif memakai muted autoplay inline dan `preload="metadata"`; timeline mengambil durasi metadata video dan slide berikutnya hanya maju saat event `ended`. Ukuran di atas batas 50 MiB menampilkan poster lokal.                                                                                                                                                                           |
| A-22 | P2        | Terbukti dari network, ditangani pada app                                             | Gambar Home Hero live berukuran 4000×2252 dan respons JPEG mentah 1.141.731 byte. URL gambar kini meminta resize maksimal 1920 px, format otomatis, dan kualitas 80; browser hanya memasang background slide aktif dan slide berikutnya agar semua gambar tidak terunduh sekaligus.                                                                                                                                                                                                                                                                                                                                         |
| A-23 | P1        | Terbukti dari query live; diagnostik app diterapkan                                   | `pageVisibilitySettings` tidak ada di dataset yang benar-benar dipakai app. Map tetap fail-open (semua route terdaftar visible) demi menjaga situs tetap utuh, tetapi sekarang state menandai `configured:false` dan endpoint memberi `configured:false` serta header `X-Page-Visibility-Source: defaults`. Sampai singleton dipublish, toggle belum mengendalikan halaman.                                                                                                                                                                                                                                                 |
| A-24 | P1        | Kebijakan invalidasi diperbaiki di kode; hosted callback belum diuji                  | Visibility sekarang memakai `revalidateTag(tag, { expire: 0 })`, sehingga request berikutnya menunggu cache miss dan membaca published state terbaru; cache hero/media/settings tetap stale-while-revalidate. Klien masih polling 30 detik untuk tab yang sudah terbuka. Jaminan operasional tetap bergantung pada webhook hosted yang benar dan publish nyata yang belum diuji.                                                                                                                                                                                                                                            |
| A-26 | P2        | Cache invalidation diperbaiki di kode; publish belum diuji                            | `siteSettings` telah di-cache 60 detik dengan tag `site-settings`, tetapi webhook sebelumnya tidak menginvalidasi tag tersebut. Webhook kini menerima dokumen `siteSettings` berdasarkan `_type` dan menginvalidasi tag itu; verifikasi hosted tetap menjadi gate deployment.                                                                                                                                                                                                                                                                                                                                               |
| A-25 | P1        | Re-tracking live 2026-10-02 mengonfirmasi media belum siap dan menemukan konflik seed | Registry Studio, kontrak bersama, dan API memetakan dua section serta empat slot. Query `6zvti7ob/production` menunjukkan entry Home background dan video ada tanpa asset; metadata slot video Home memiliki `containerRatio` yang berbeda dari seed. Kedua slot Produk belum ada. Endpoint Home dan Produk merespons HTTP 200 tanpa background/video (`missingAssets:true`); UI memakai gambar fallback lokal dan placeholder pemutar. Dry-run berhenti karena konflik metadata; tidak ada mutation. Jalur video memakai `preload="metadata"`/play manual; ukuran di atas 32 MiB hanya rekomendasi, bukan blokir aplikasi. |

## Rencana peningkatan per menu Studio

Rencana berikut mencakup perbaikan dan peningkatan kemudahan operasional. Setiap
pekerjaan baru dimulai setelah gate **Tahap 0** di bawah selesai.

### 1. Hero

**Ruang lingkup:** Home Hero dan Page Hero.

- **Kontrak diverifikasi:** Studio menggunakan schema type dan singleton ID
  `homePage`; `homeHeroEditor` hanya nama variabel schema. Page Hero menggunakan
  schema type dan singleton ID `pageHeroEditor`.
- Samakan batas 1–4 slide dengan kapasitas yang dirender aplikasi melalui konstanta
  bersama, validasi
  urutan unik, teks judul/subjudul minimal satu bahasa, media wajib sesuai
  `mediaType`, dan tujuan CTA sesuai jenisnya.
- Beri peringatan editor untuk ukuran video Hero; sarankan kompresi di bawah
  8 MiB, terima video sampai 50 MiB dengan `preload="metadata"`, dan gunakan
  poster untuk video yang melampaui batas agar ukuran file besar tidak diputar
  tanpa batas.
- Pastikan Page Hero memiliki satu registry halaman kanonis: setiap halaman yang
  dapat diedit punya slug/ID stabil, preview yang jelas, dan satu pemetaan ke
  route app.
- Tambahkan validasi editorial untuk field yang benar-benar diperlukan
  (headline, CTA, target route, gambar/video yang sesuai); tampilkan pesan
  validasi yang dapat dipahami editor.
- Tingkatkan preview Studio dengan label halaman, device preview, dan indikator
  fallback agar editor tahu apakah konten publish berasal dari Sanity atau
  nilai lokal.
- **Efisiensi:** Home Hero segera menampilkan fallback bilingual dan
  menggantinya setelah data Sanity valid. Published Home/Page Hero memakai cache
  server 60 detik, draft bypass cache, Page Hero memakai satu cache singleton
  bersama untuk semua route dan hanya mengirim field yang sedang diminta, dan
  `HOME_QUERY` tidak lagi mengambil fragmen hero yang sama. Gambar di-resize
  otomatis, hanya slide aktif/berikutnya yang meminta background image, dan
  video memakai muted autoplay serta preload metadata dengan batas 50 MiB.
  Webhook dapat menginvalidasi tag bersama `sanity-hero`.

**Status lokal:** konfigurasi schema dan app telah disejajarkan untuk 1–4 slide;
fallback/timeout, proyeksi Page Hero, dan cache published telah diterapkan.
Pembacaan endpoint app berhasil pada project `6zvti7ob/production`; ditemukan
dua slide tanpa media gambar dan app kini mempertahankan teksnya dengan
fallback. **Belum terverifikasi live:** Auth, publish/preview draft, callback
hosted, dan visual media Sanity. Perbedaan project ID pada dokumentasi masih
harus dikonfirmasi sebelum write/deploy ke dataset.

**Gate data sebelum deploy schema:** dokumen published saat ini memiliki slide
3 dan 4 bertipe gambar tanpa asset; validasi baru akan mencegah publish dokumen
tersebut sebelum editor menambahkan media yang sesuai. Slide 1 memiliki video
sekitar 39,5 MiB; aplikasi kini dapat memutarnya, tetapi kompresi ≤8 MiB tetap
direkomendasikan demi waktu mulai dan bandwidth. Slide 2 sudah memiliki gambar.
Data Sanity tidak diubah dalam pengerjaan ini, jadi owner/editor perlu melengkapi
aset pada target dataset yang disetujui sebelum mem-publish skema/isi baru.

**Verifikasi lokal sesudah perubahan:** endpoint Home Hero mengembalikan empat
slide dari API live; browser menggunakan `preload="metadata"` untuk video
39,5 MiB. Gambar 4000×2252 yang sebelumnya berukuran 1.141.731 byte sekarang
dilayani sebagai WebP 181.432 byte pada pengujian browser. Semua empat tab slide tampil, termasuk
slide dengan media yang belum lengkap; app typecheck/ESLint dan Studio build
berhasil. Tidak ada penulisan atau deployment ke Sanity.

**Kriteria selesai:** semua item Hero dapat dibuka, ID stabil, preview draft
sesuai, build Studio lulus, dan perubahan satu halaman tidak mengubah hero lain.

### 2. Media Pendukung

**Ruang lingkup:** singleton slot gambar/video per halaman dan segmen.

- Tegaskan satu sumber kanonis per slot (A-08): pilih `pageMediaEditor` atau
  model asset terpisah untuk setiap slot; definisikan migrasi/kompatibilitas
  legacy sampai semua pemakai pindah.
- Tambahkan aturan precedence dan deduplikasi slot berdasarkan `slotId`; tampilkan
  ID slot, tipe media yang diharapkan, dimensi/durasi rekomendasi, dan halaman
  pemakai di Studio.
- Seed harus memakai satu resolver project/dataset yang sama dengan CLI/Studio
  aktif; default project berbeda harus dihapus atau seed gagal cepat dengan
  konfirmasi target (A-03).
- Seed bersifat idempotent dan memiliki `--dry-run`/ringkasan create/skip/update;
  tidak menimpa media editor dan tidak pernah berjalan otomatis pada deploy.
- Pertahankan kemampuan memulihkan slot yang hilang, tetapi jangan menambahkan
  validasi jumlah array yang memblokir publish.
- **Efisiensi:** jangan fetch daftar media global per komponen; kembalikan payload
  per halaman/slot yang diperlukan dan deduplikasi di boundary API.

**Kriteria selesai:** tidak ada slot ganda/ambigu, seed dry-run menunjukkan
project/dataset target, dan upload/publish satu slot hanya memperbarui komponen
yang memakai slot tersebut.

**Status verifikasi Marine Fuel:** empat ID slot pada registry cocok dengan
kontrak route/API, dan webhook memiliki invalidasi tag khusus untuk dokumen
`pageMediaEditor`. Endpoint live Home dan Produk merespons dengan bentuk payload
yang benar. Query read-only terbaru (2026-10-02) menunjukkan dua slot Home ada
tanpa asset, sementara kedua slot Produk belum ada. Metadata `containerRatio`
slot video Home tidak cocok dengan definisi seed; dry-run terkini berhenti pada
konflik ini, jadi daftar kekurangan sebelumnya tidak lagi boleh dianggap
terverifikasi oleh dry-run. Endpoint keduanya tetap 200 tanpa media, sehingga
komponen memakai fallback lokal dan placeholder video. Wiring tersedia, tetapi
konten Sanity belum siap secara operasional sampai konflik ditinjau, slot
Produk ditambahkan, asset diunggah, lalu publish diuji. Tidak ada data Sanity
yang ditulis. Cache publish memakai TTL 60 detik dan invalidasi webhook;
`revalidateTag(..., "max")` tetap dapat menyajikan nilai stale sementara
setelah callback.

### 3. Pengaturan Halaman

**Ruang lingkup:** toggle aktif/nonaktif.

- Jadikan registry halaman sebagai kontrak yang mencakup semua route app yang
  memang dapat dikendalikan; jalankan `npm run check:page-visibility-routes`
  pada CI agar route baru yang tidak masuk registry membuat gate gagal (A-07).
- Putuskan aturan preview: rekomendasi, status published tetap mengatur situs
  publik, tetapi preview editor diberi bypass yang hanya aktif dalam draft mode
  yang sah dan tidak mengubah cache public (A-06).
- Pertahankan satu cache server bersama, ETag browser, TTL rekonsiliasi dan
  callback publish yang tervalidasi. Untuk perubahan hide/show gunakan
  `revalidateTag(tag, { expire: 0 })` agar pembacaan berikutnya menunggu data
  published terbaru; untuk hero/media/settings yang toleran terhadap stale,
  gunakan `"max"`. Callback tidak perlu melakukan query Sanity sinkron.
- Endpoint status mengembalikan `configured` dan header sumber `sanity` atau
  `defaults`, sehingga map semua-true karena dokumen hilang tidak tampak seperti
  konfigurasi CMS yang berhasil. Default tetap fail-open untuk menjaga situs
  publik; ini bukan kontrol akses.
- Draft Mode yang sah melewati gate hide pada preview saja. Navigasi publik,
  sitemap, dan request tanpa Draft Mode tetap mengikuti nilai published.
- Tambahkan health/diagnostic yang aman: waktu snapshot terakhir berhasil,
  umur cache, status sumber (`sanity`, `stale`, `fallback`) dan kegagalan
  callback tanpa menampilkan credential.
- Pilih kebijakan outage yang eksplisit. Untuk hide/show konten pemasaran,
  rekomendasi adalah pertahankan last-known-good; sebelum snapshot pernah
  tersedia, default visible menjaga situs tetap utuh, tetapi **bukan** mekanisme
  kontrol akses untuk data privat.
- Filter link CTA, header, footer, sitemap dengan fungsi yang sama; navigasi
  eksternal (`mailto`, `tel`, URL luar) tidak boleh salah diperlakukan sebagai
  route internal.

**Kriteria selesai:** satu fetch server per snapshot/cache miss, tidak ada query
per halaman, publish toggle terpropagasi via callback atau TTL, API memberi
ETag/304, route tak terpetakan diketahui, dan outage mempertahankan UI yang wajar.

**Hardening kode 2 Oktober 2026:** invalidasi toggle diubah menjadi immediate
expiry, Draft Mode terotorisasi dapat membuka halaman nonaktif untuk preview,
endpoint menandai apakah state berasal dari dokumen Sanity atau default, cache
`siteSettings` ikut diinvalidate, dan pemeriksaan route-registry menemukan
seluruh 29 route app terdaftar. Ini belum mengaktifkan toggle live: read-only
query terakhir tetap menemukan singleton `pageVisibilitySettings` belum ada
pada `6zvti7ob/production`. Sebelum fitur hide disebut stabil, buat dan publish
singleton di target kanonis, pasang secret dan webhook hosted, lalu uji
disable/enable pada navigasi, footer/CTA, URL langsung, preview, dan sitemap.

### 4. Struktur Perusahaan

**Ruang lingkup:** Komisaris, Direksi, Tim dan Divisi.

- Audit referensi `teamMember` ↔ `teamDivision`, opsi `structuralClass`, field
  jabatan, urutan, galeri dan aturan aktif/publish.
- Buat aturan editor untuk menghindari anggota tim tanpa divisi atau urutan yang
  bertabrakan; jangan menghapus data lama otomatis.
- Pastikan route halaman menggunakan query terbatas pada kelas/field yang
  ditampilkan, dengan sort deterministik berdasarkan urutan lalu nama.
- Tambahkan preview tampilan mobile/desktop dan peringatan asset foto yang
  belum memiliki alt text.

**Kriteria selesai:** kategori Studio dan filter app sama, tidak ada anggota
hilang karena nilai enum tidak cocok, dan dataset lama lolos laporan integritas.

### 5. Client

**Ruang lingkup:** Daftar Client Aktif dan Arsip Client.

- Pertahankan pemisahan client dari partner umum, tetapi rencanakan penghentian
  pembacaan legacy partner setelah data tervalidasi (A-10).
- Buat laporan duplikasi berbasis nama ternormalisasi; hasil laporan bersifat
  dry-run dan memerlukan keputusan editor untuk merge, bukan auto-delete.
- Validasi nama, lokasi, layanan, tahun, logo, dan galeri; opsi “lainnya” wajib
  berisi teks layanan.
- Buat template default aktif/arsip yang sama dengan filter daftar; tampilkan
  label status editorial di preview.
- **Efisiensi:** query hanya client aktif untuk halaman publik; arsip tetap
  tersedia di Studio dan tidak ikut respons publik.

**Kriteria selesai:** tidak ada duplikasi tak tertangani, arsip tidak bocor ke
halaman publik, dan migration dry-run dapat direkonsiliasi tanpa overwrite.

### 6. Artikel

**Ruang lingkup:** Daftar Artikel, Kategori dan Subkategori.

- Tentukan satu tipe dokumen artikel kanonis; buat rencana migrasi untuk tipe
  legacy `article` dan hindari dua aturan publish yang berbeda (A-09).
- Tegaskan hubungan kategori-subkategori, slug unik, tanggal publikasi, gambar,
  excerpt, dan status draft/published.
- Pastikan preview slug draft berfungsi walau tidak muncul pada static params
  publik; generated params harus dibatasi pada konten published dan fallback
  dynamic route tetap konsisten.
- Tandai route `/artikel`, detail artikel, publikasi, dan kategori sebagai
  nav/SEO/utility di satu matriks route.
- **Efisiensi:** pagination/cursor untuk daftar panjang, projection GROQ ringkas,
  `select()` pada Portable Text/media yang memang dipakai.

**Kriteria selesai:** satu kebijakan publish, slug unik, draft preview konsisten,
pagination teruji, dan sitemap hanya memuat route/isi published yang disetujui.

### 7. Karir

**Ruang lingkup:** Lowongan Aktif, Arsip Lowongan dan Formulir Lamaran.

- Pastikan toggle aktif, status publish, tanggal penutupan, dan urutan memiliki
  satu arti operasional; dokumen arsip tidak ikut API publik.
- Hubungkan tombol “Lamar” ke status visibility route formulir; jika route
  formulir nonaktif, CTA aplikasi karir harus ikut tidak tampil.
- Audit tipe file, ukuran attachment, retensi dan pemberitahuan privasi; file
  lamaran bukan seed konten.
- Tambahkan preview lowongan per locale agar editor melihat field wajib ID/EN
  sebelum publish.

**Kriteria selesai:** hanya lowongan aktif dan published yang muncul; CTA tidak
menuju form tersembunyi; submit diuji end-to-end pada environment nonproduksi.

### 8. Dukungan

**Ruang lingkup:** Site Settings, identitas, kontak, tema UI.

- Kelompokkan field wajib, fallback, dan opsional; validasi format email/telepon,
  URL peta, serta kontras warna.
- Pertahankan fallback identitas saat Sanity offline. Published settings di-cache
  singkat dan preview draft dibaca langsung; jangan mengeluarkan timeout jaringan
  sebagai console/runtime error yang tidak tertangani.
- Tambahkan penanda sumber data di respons internal/admin (Sanity vs fallback),
  bukan menambah polling UI.
- **Efisiensi:** satu query settings per cache window, jangan fetch dari beberapa
  komponen jika data dapat diserialisasi sekali dari layout/provider.

**Kriteria selesai:** outage Sanity tidak memutus situs, nilai fallback terlihat
jelas bagi operator, dan settings publish terefleksi sesuai TTL/webhook yang
dipilih.

## Rencana lintas menu

### Routing dan wiring

1. Buat matriks `Studio menu → schema/document ID → endpoint/query → komponen →
route → nav/sitemap`.
2. Tambah tes kontrak untuk:
   - semua page route relevan tercatat atau ditandai sebagai pengecualian;
   - semua Studio `schemaType()` terdaftar;
   - semua CTA internal menarget route yang ada dan menghormati visibility;
   - semua endpoint memetakan bentuk data yang dikonsumsi UI.
3. Klasifikasikan route sebagai `public-nav`, `CTA-only`, `utility/form`,
   `dynamic-content`, atau `legal`; status visibility tidak otomatis menentukan
   SEO.
4. Putuskan penanganan route legacy dan respons 404 nyata, bukan hanya empty-state
   dengan HTTP sukses.

### Seed, migrasi dan autentikasi

1. Kanonisasi `projectId`, dataset, Studio app ID, hosted URL, dan environment
   Vercel/Sanity sebelum write API atau deploy.
2. Token audit dijalankan ulang dari jaringan yang dapat mencapai Sanity, hanya
   dengan operasi read-only. Catat status HTTP, identitas minimal/role yang
   disetujui, dan izin baca; jangan simpan token/identitas sensitif ke MD.
3. Token seed/migrasi dipisah dari token runtime publik; gunakan least privilege.
4. Semua skrip seed/migrasi punya dry-run, target project/dataset tercetak,
   ringkasan perubahan, idempotensi, dan larangan overwrite tanpa flag eksplisit.
5. Baca/mutasi berisiko dilakukan bertahap: backup/export → dry-run → review
   jumlah create/update/skip → apply eksplisit → verifikasi hasil.

### Callback, cache dan beban

1. Konfigurasi satu webhook publish/update ke
   `POST /api/sanity/page-visibility-webhook` untuk singleton
   `pageVisibilitySettings`, `homePage`, `pageHeroEditor`, `pageMediaEditor`,
   serta semua dokumen bertipe `siteSettings`. Endpoint memvalidasi ID exact
   untuk singleton dan tipe untuk `siteSettings`, menginvalidasi cache status
   secara immediate, serta cache konten lain secara stale-while-revalidate.
   Rahasia disimpan hanya sebagai environment `SANITY_PAGE_VISIBILITY_WEBHOOK_SECRET`.
2. Callback hanya memvalidasi otorisasi dan pasangan tipe/ID yang diizinkan,
   lalu menginvalidasi tag sesuai kebijakan; ia tidak memuat semua konten atau
   melakukan proses berat.
3. Cache status/settings berada di server dan berbagi antar-request melalui
   platform cache Next/Vercel; ETag mengurangi payload browser. TTL bertindak
   sebagai rekonsiliasi jika webhook gagal.
4. Setiap cache miss ke Sanity dibatasi timeout/retry; transient failure
   mempertahankan fallback/last-known-good dan dicatat dengan log tereduksi.
5. Hindari query berulang per halaman/komponen dan invalidasi cache global yang
   tidak terkait. Ukur cache hit, callback latency, API latency, dan umur snapshot.

## Urutan eksekusi yang direkomendasikan

| Tahap                                         | Hasil                                                                                | Gate untuk lanjut                                                                                                              |
| --------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| 0. Menetapkan target                          | Satu project/dataset/Studio hosted/app ID/origin yang disetujui                      | Nilai config aktif cocok dengan dashboard dan dokumentasi                                                                      |
| 1. Membuat quality gate                       | Contract checker diperbaiki, route/schema parity, tes mapping                        | Checker lulus di kondisi benar dan gagal pada fixture rusak                                                                    |
| 2. Membenahi Hero + media                     | Schema type Home Hero benar, slot media kanonis, seed target aman                    | Studio build + UI editor + slot test                                                                                           |
| 3. Membenahi visibility + settings            | Satu handler/status snapshot, invalidasi immediate, preview bypass, fallback terukur | Singleton dipublish; webhook diuji; toggle disable/enable tervalidasi pada nav, footer/CTA, URL langsung, preview, dan sitemap |
| 4. Membenahi struktur, client, artikel, karir | Relasi dan kebijakan publish/migrasi konsisten                                       | Dataset report, preview locale, API/component tests                                                                            |
| 5. Staging end-to-end                         | Deploy Studio/app staging dan verifikasi editor                                      | Auth read/write sesuai peran, webhook berhasil, tidak ada route utama yang gagal                                               |
| 6. Produksi                                   | Deploy terkontrol dan monitoring                                                     | Backup tersedia, rollback jelas, owner menyetujui project dan data                                                             |

## Pemeriksaan yang berhasil dan belum berhasil

- **Berhasil:** Sanity Studio aktif (`studio-anigos-project`) menjalankan
  `npm run build`.
- **Berhasil:** app `npm run typecheck`, ESLint area terkait, dan `git diff
--check` pernah lulus.
- **Gagal quality gate:** `npm run check:content-contracts` merujuk file yang
  tidak ada; perbaiki sebelum mengandalkannya untuk deploy.
- **Belum terverifikasi:** authenticated Sanity identity dan pembacaan singleton;
  kedua request timeout. Jangan menyimpulkan token invalid dari timeout.
- **Belum dilakukan:** seed apply, migrasi write, konfigurasi webhook di dashboard,
  deploy Studio, atau deploy app.

## Risiko dan keputusan yang dibutuhkan sebelum eksekusi

1. Pastikan akun deploy diberi akses ke project aktif `6zvti7ob` dan identifikasi
   App ID/hostname hosted Studio yang terikat ke project tersebut. Jangan
   memakai project legacy `wm8u3z2o`.
2. Apakah editor harus dapat melihat halaman yang dinonaktifkan saat preview
   draft, atau visibility selalu mengikuti published state?
3. Apakah route `/artikel` dan `/produk` harus tampil di nav/sitemap, atau
   sengaja hanya utility/CTA?
4. Apakah model `article` lama masih perlu dipertahankan setelah newsroom
   kanonis?
5. Apakah detail partner legacy masih memiliki URL eksternal yang harus dijaga?

Sampai keputusan project pada nomor 1 dan akses Sanity dapat diverifikasi,
deployment dan operasi seed write tetap diblokir demi mencegah perubahan ke
dataset yang salah.
