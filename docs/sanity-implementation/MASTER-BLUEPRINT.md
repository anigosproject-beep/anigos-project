---
document_type: master-blueprint
project: petro-anigos
domain: sanity-and-frontend
audience: coding-agents-and-project-team
language: id-ID
status: proposed
source_of_truth:
  discovery: ./00-application-understanding.md
  active_studio: ../../studio-anigos-project
  frontend: ../../petro-anigos
depends_on:
  - ./00-application-understanding.md
  - ./ARCHITECTURE-DECISIONS.md
---

# Master Blueprint — Sanity CMS Petro Anigos

Dokumen ini adalah blueprint utama untuk mengubah Sanity dari schema yang
tersedia menjadi CMS operator-friendly yang presisi, mudah dilacak, dan
terhubung konsisten ke website Next.js.

Blueprint ini dibuat berdasarkan:

- struktur route dan komponen frontend aktual;
- schema dan structure Studio aktif;
- query, client, type, API route, dan fallback yang sudah ada;
- kebutuhan operator non-teknis;
- blocker Content Lake dan schema legacy yang sudah ditemukan.

Setiap perubahan pada schema, registry, query, route, atau response contract
harus melewati Structure Impact Guard. Guard memetakan file yang berubah ke
surface yang terdampak dan mencatat pemeriksaan wajib di
[`STRUCTURE-IMPACT-LATEST.json`](./STRUCTURE-IMPACT-LATEST.json). Guard bersifat
read-only dan tidak melakukan mutation Content Lake.

## 1. Sasaran akhir

Operator dapat menyelesaikan pekerjaan dengan pola:

```text
Pilih lokasi website
→ Buka konten yang sudah disediakan
→ Ubah field yang diizinkan
→ Simpan draft
→ Preview lokasi tersebut
→ Publish
```

Operator tidak perlu memahami:

- nama schema;
- `_type`, `_id`, dan `slotKey`;
- GROQ;
- struktur folder frontend;
- komponen React;
- perbedaan schema lama dan schema aktif.

Pada saat yang sama, sistem harus menjamin:

- satu lokasi UI memiliki satu sumber konten yang jelas;
- slot media tidak dapat terduplikasi secara tidak sengaja;
- production hanya membaca published;
- draft dapat dipreview sebelum publish;
- data wajib diblokir dengan error;
- rekomendasi asset disampaikan sebagai warning;
- fallback tidak menyamarkan kegagalan integrasi;
- perubahan operator dapat dilacak dari Studio sampai route website.

## 2. Model arsitektur target

```text
Content Registry
      │
      ├── Schema Sanity
      ├── Seed stable slots
      ├── Structure Builder
      ├── Validasi dan status
      ├── Query dan TypeScript contract
      └── Preview route

Operator
   ↓
Studio berbasis lokasi website
   ↓
Draft / review / publish
   ↓
Production client (published)
Preview client (drafts, CDN off)
   ↓
Next.js routes dan components
```

### Content Registry

Registry adalah definisi terpusat untuk page, section, dan media slot. Registry
menjadi sumber untuk:

- label operator;
- page key dan section key;
- stable `slotKey`;
- seed;
- Structure Builder;
- query;
- status slot;
- preview URL;
- acceptance test.

Tidak boleh ada daftar halaman yang berbeda antara schema, seed, frontend, dan
Structure Builder tanpa alasan migration yang terdokumentasi.

## 3. Keputusan arsitektur

### 3.1 Struktur halaman tetap

Frontend tetap menentukan layout dan urutan section. Sanity tidak dijadikan
page builder bebas.

Sanity mengelola:

- teks editorial yang memang perlu diedit;
- gambar dan video;
- artikel;
- dokumen;
- anggota organisasi;
- kontak;
- status tayang.

Sanity tidak mengelola:

- urutan layout arbitrer;
- markup halaman;
- section baru yang tidak dikenal frontend;
- kombinasi page/section/slot yang tidak terdaftar.

### 3.2 Dua jenis konten

#### Konten terkontrol

- Home hero;
- page hero;
- media slot;
- site settings;
- struktur organisasi dengan field kondisional.

Dokumen dibuat melalui seed atau singleton. Operator mengedit isi yang
diizinkan, bukan lokasi atau struktur.

#### Konten berbasis template

- artikel;
- dokumen kemitraan;
- dokumen legalitas;
- dokumen publikasi;
- divisi;
- anggota organisasi.

Operator dapat membuat dokumen baru, tetapi field, kategori, referensi, dan
status tetap dibatasi schema.

### 3.3 Fallback selama migrasi

Fallback lokal dipertahankan sementara untuk mencegah halaman rusak ketika
Content Lake belum terisi. Setiap fallback harus:

- diberi label sebagai fallback;
- memiliki log atau observability yang sesuai;
- tidak dianggap sebagai keberhasilan Sanity;
- memiliki tiket fase untuk pengurangan/penghapusan setelah migration.

## 4. Status awal dan prioritas

| Area | Kondisi awal | Prioritas |
|---|---|---|
| Studio build | Berhasil | Dipertahankan |
| Schema aktif | Tersedia, sebagian perlu dipresisikan | Tinggi |
| Menu operator | Ada, tetapi masih collection umum | Tinggi |
| Seed media | 35 slot sudah tersedia dan terverifikasi | Tinggi |
| Home hero | Query/komponen ada, contract belum sejajar | Tinggi |
| Newsroom | Sanity mapper ada, route utama masih lokal | Tinggi |
| Publikasi | Sanity sudah dipakai, fallback ada | Menengah |
| Kemitraan | API Sanity ada, mock fallback masih kuat | Tinggi |
| Legalitas | Schema ada, route belum terhubung | Tinggi |
| Page hero | Mayoritas masih lokal | Tinggi |
| Struktur organisasi | Sanity + fallback sudah ada | Menengah |
| Media slots | Model dan seed ada, wiring belum lengkap | Tinggi |
| Kontak | Schema ada, footer masih hardcoded | Tinggi |
| Preview | Belum selesai | Tinggi |
| Batch validation | Belum ada | Menengah |
| Acceptance test | Belum dilakukan | Wajib sebelum selesai |

## 5. Fase pengerjaan optimal

### Fase 0 — Discovery dan contract freeze

**Tujuan:** memastikan pemahaman aplikasi 100% sebelum wiring baru.

**Pekerjaan:**

- selesaikan route inventory;
- petakan setiap hero, section, asset, dan fallback;
- bedakan Studio aktif dari schema legacy;
- cocokkan page key dengan route;
- cocokkan query dengan TypeScript type;
- dokumentasikan sumber data saat Sanity berisi, kosong, atau gagal.

**Output:**

- [00-application-understanding.md](./00-application-understanding.md);
- route/content matrix;
- daftar fallback;
- daftar mismatch contract;
- keputusan source of truth.

**Gate:** tidak ada route domain target tanpa klasifikasi sumber datanya.

### Fase 1 — Content Registry dan stable identity

**Tujuan:** menghapus daftar halaman/section/slot yang tersebar.

**Pekerjaan:**

- buat registry terpusat;
- gunakan registry untuk page/section/slot labels;
- tetapkan stable ID dan `slotKey`;
- tetapkan tipe media dan rekomendasi asset;
- buat generator seed dari registry;
- tambahkan pemeriksaan duplicate key.

**Output utama:**

- registry;
- seed idempotent berbasis registry;
- mapping route ke page key;
- mapping component ke slot key.

**Gate:** kombinasi page/section/slot invalid tidak dapat dibuat dari registry.

**Prasyarat keputusan:** model artikel, dokumen, dan organisasi sudah ditetapkan
di [`ARCHITECTURE-DECISIONS.md`](./ARCHITECTURE-DECISIONS.md).

### Fase 2 — Presisi schema dan operator form

**Tujuan:** membuat schema ketat tetapi mudah dipahami.

**Pekerjaan:**

- selaraskan schema aktif dengan registry;
- sembunyikan atau kunci field teknis;
- perbaiki label dan deskripsi dalam bahasa operator;
- tambahkan validasi duplicate hero position;
- validasi media type dan poster;
- validasi PDF, slug, referensi divisi, dan status;
- tambahkan initial value yang aman;
- konsistenkan `isActive` dan `isPublished`.

**Output utama:**

- schema operator-friendly;
- error/warning yang dapat dipahami;
- tidak ada field teknis yang dapat mengubah lokasi slot.

**Gate:** operator dapat mengisi form tanpa melihat `_type`, `_id`, atau GROQ.

### Fase 3 — Structure Builder berbasis lokasi

**Tujuan:** operator selalu tahu sedang berada di mana.

**Pekerjaan:**

- ubah collection media umum menjadi tree berbasis halaman;
- tampilkan slot langsung dari registry;
- buka dokumen stable ID yang sudah diseed;
- tampilkan status `Belum diisi`, `Draft`, `Tayang`, atau `Tidak aktif`;
- tampilkan page hero per halaman;
- buat singleton langsung buka dokumen;
- batasi create action untuk slot terkontrol;
- gunakan preview title yang operasional.

**Target menu:**

```text
Mulai di Sini
├── Beranda
│   ├── Hero Beranda
│   └── Media Beranda
├── Ganti Gambar Website
│   ├── Jangkauan
│   ├── Profil Perusahaan
│   ├── Legalitas
│   └── ...
├── Artikel & Publikasi
├── Dokumen Perusahaan
├── Struktur Organisasi
└── Kontak & Alamat
```

**Gate:** operator menemukan slot berdasarkan lokasi website, bukan tipe
dokumen Sanity.

### Fase 4 — Akses project dan seed Content Lake

**Tujuan:** membuat slot yang sudah dirancang benar-benar tersedia.

**Pekerjaan:**

- memperoleh token yang terkait user aktif project;
- menjalankan seed dengan environment lokal;
- memverifikasi jumlah hero dan section slot;
- memastikan seed tidak menimpa asset;
- menambahkan laporan slot kosong;
- melakukan dry-run sebelum mutation bila perlu.

**Catatan keamanan:**

- token tidak boleh masuk source, Markdown, log, atau commit;
- jangan mengulang seed dengan token yang sudah mendapat `project user not found`;
- verifikasi project ID dan dataset sebelum mutation.

**Gate:** semua stable slot ada tepat satu kali di dataset.

### Fase 5 — Integrasi frontend berdasarkan contract

**Tujuan:** menjadikan Sanity sumber runtime yang konsisten.

Urutan integrasi:

1. Home hero dan home media.
2. Page hero seluruh route.
3. Footer/site settings.
4. Newsroom daftar dan detail.
5. Publikasi.
6. Kemitraan.
7. Legalitas.
8. Struktur organisasi.
9. Media section lain.

**Pekerjaan umum:**

- buat production client published;
- buat preview client drafts dengan `useCdn: false`;
- selaraskan TypeScript response type;
- buat query per domain;
- gunakan mapper terpusat;
- tambahkan null guard;
- pertahankan fallback hanya selama migration;
- catat error fetch secara eksplisit.

**Gate:** setiap perubahan published di Sanity muncul pada route yang benar,
dan data draft tidak muncul di production.

### Fase 6 — Konten legacy dan migration

**Tujuan:** memindahkan data yang masih hardcoded atau berada di schema lama
tanpa kehilangan fungsi.

**Prioritas migration:**

1. page hero lokal;
2. footer contact;
3. legalitas;
4. newsroom;
5. kemitraan dan dokumen;
6. home fallback;
7. organisasi legacy;
8. media embedded yang memiliki slot baru.

**Aturan:**

- buat mapping lama → schema aktif;
- lakukan dry-run;
- jangan menghapus fallback sebelum data published terverifikasi;
- simpan backup atau export;
- tandai data yang tidak dapat dipetakan otomatis.

**Gate:** route tidak lagi bergantung pada data lokal untuk domain yang sudah
dimigrasikan.

### Fase 7 — Preview dan workflow publish

**Tujuan:** operator mengetahui dampak sebelum publish.

**Pekerjaan:**

- preview URL per route;
- preview fokus ke page/section bila memungkinkan;
- Next.js draft mode;
- draft perspective;
- tombol preview dari dokumen;
- status draft/published;
- aturan production published-only;
- dokumentasi review dan publish.

**Gate:** operator dapat melihat perubahan hero, media, artikel, dokumen, dan
kontak sebelum publish.

### Fase 8 — Quality, observability, dan maintenance

**Tujuan:** mencegah data rusak setelah sistem berjalan.

**Pekerjaan:**

- `validate-content.mjs`;
- laporan slot kosong;
- duplicate stable ID;
- duplicate hero position;
- broken references;
- missing required asset;
- image dimension/ratio warning;
- orphaned document;
- contract check frontend;
- migration versioning;
- backup/export procedure.

**Gate:** masalah konten dapat ditemukan melalui pemeriksaan terotomasi,
bukan hanya setelah website rusak.

### Fase 9 — Operator acceptance dan handoff

**Tujuan:** membuktikan interface benar-benar mudah dipakai.

**Skenario:**

- mengubah slide hero;
- mengganti page hero;
- mengganti media Beranda → Tentang Kami;
- membuat artikel sampai tampil di daftar dan detail;
- membuat publikasi;
- membuat dokumen kemitraan;
- membuat dokumen legalitas;
- mengubah kontak;
- menambah divisi dan anggota;
- preview draft;
- publish;
- menonaktifkan tanpa menghapus.

**Gate:** operator menyelesaikan skenario tanpa membuka kode dan tanpa
memahami istilah teknis Sanity.

## 6. Dependency dan jalur kritis

```text
Fase 0
  ↓
Fase 1
  ↓
Fase 2 ──→ Fase 3 ──→ Fase 4
                         ↓
                    Fase 5
                         ↓
                    Fase 6
                         ↓
                    Fase 7
                         ↓
                    Fase 8
                         ↓
                    Fase 9
```

Fase 4 dapat berjalan paralel dengan sebagian pekerjaan Fase 2–3, tetapi
integrasi runtime tidak boleh dianggap selesai sebelum slot benar-benar dapat
dibaca dari dataset.

## 7. Urutan prioritas berdasarkan nilai dan risiko

### P0 — Wajib sebelum integrasi besar

- source of truth;
- registry;
- akses Content Lake;
- page/section/slot mapping;
- schema contract;
- production published client.

### P1 — Wajib agar operator nyaman

- Structure Builder berbasis lokasi;
- status slot;
- preview title;
- page hero;
- footer settings;
- newsroom;
- legalitas;
- preview route.

### P2 — Wajib untuk stabilitas jangka panjang

- batch validator;
- image warning;
- migration tooling;
- dashboard completeness;
- role/workflow review;
- acceptance test berulang.

## 8. Kriteria kualitas akhir

Sistem dinyatakan optimal jika:

- operator mengetahui lokasi dan dampak setiap perubahan;
- media slot tidak dapat dibuat ganda dari interface normal;
- page hero setiap route menggunakan sumber yang konsisten;
- newsroom tidak lagi diam-diam memakai data lokal ketika Sanity tersedia;
- legalitas dan footer benar-benar membaca Sanity;
- publikasi, kemitraan, dan legalitas memiliki workflow dokumen yang jelas;
- struktur organisasi memiliki enum dan grouping yang konsisten;
- warning asset tidak memblokir kebutuhan operasional;
- error data wajib memblokir publish;
- preview menampilkan draft route yang benar;
- production tidak membaca draft;
- fallback memiliki batas hidup dan observability;
- validation batch dapat mendeteksi masalah sebelum operator melihatnya;
- operator lulus acceptance test.

## 9. Status readiness saat ini

```text
Blueprint: siap
Discovery: baseline route, schema, consumer, fallback, dan registry selesai; migrasi data legacy masih terbuka
Studio build: berhasil
Schema: aktif dan tervalidasi dengan registry, warning asset, serta validasi Home Hero
Structure: selesai — berbasis lokasi halaman dan slot
Seed: berhasil, 20 hero + 15 section slot tersedia di Content Lake
Frontend integration: parsial — domain utama dan sebagian media sudah terhubung
Preview: aktif — Draft Mode enable/disable dan draft perspective sudah terhubung
Quality operations: belum selesai
Operator acceptance: belum dilakukan
Architecture decisions: accepted
Content Registry: selesai dan tervalidasi
Ready for schema alignment: ya
Structure Builder: selesai — navigasi berbasis lokasi halaman
Schema operator form: selesai untuk validasi media dan hero dasar
Domain wiring tahap pertama: selesai untuk editorial adapter, dokumen,
organisasi, site settings, dan page hero
Preview workflow: aktif — production published-only, preview drafts dengan CDN off
Follow-up findings: dicatat dan dipetakan ke Fase 6, 7, 8, dan 9
Media section wiring: parsial — Home About dan Home Publikasi sudah tersambung;
slot item-level masih menunggu model/mapping khusus
Ready for broad implementation: belum — selesaikan preview, validator batch,
migrasi terkontrol, dan acceptance operator sebelum fallback dikurangi
```

## 10. Aturan kerja agent

Sebelum mengubah kode:

1. Baca dokumen ini dan
   [`00-application-understanding.md`](./00-application-understanding.md).
2. Tentukan fase dan gate yang sedang dikerjakan.
3. Periksa file aktual, bukan hanya dokumentasi.
4. Jangan mengintegrasikan route baru tanpa contract dan fallback yang jelas.
5. Jangan mengganti stable ID tanpa migration.
6. Jangan menampilkan atau menyimpan credential.
7. Jalankan validasi terkecil yang mencakup perubahan.
8. Perbarui status fase dan bukti verifikasi.

Format laporan:

```text
Phase: <fase>
Changed: <file>
Verified: <command dan hasil>
Data impact: <route/schema/slot yang terdampak>
Blocked: <none atau alasan>
Next: <fase berikutnya>
```
