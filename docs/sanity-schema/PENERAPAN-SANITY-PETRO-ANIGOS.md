# Penerapan Sanity untuk Petro Anigos

Dokumen ini menjadi catatan penerapan dan checklist rollout untuk Studio Sanity
gabungan Petro Anigos. Dataset `production` saat ini masih berisi data mock;
clean Studio dipakai sebagai jalur pengisian data real yang baru.

## Keputusan arsitektur

- Hanya ada satu Studio yang menjadi jalur editorial utama untuk dataset
  `production`; Studio lama dipertahankan sementara sebagai referensi dan tidak
  digunakan untuk pengisian data real.
- Project Sanity yang digunakan adalah `wm8u3z2o`.
- Schema halaman baru digabung dengan schema legacy yang sudah dipakai:
  `newsroomArticle`, `newsroomCategory`, `teamMember`, dan `mediaLibrary`.
- Schema legacy tetap monolingual untuk sementara. Migrasi ke bentuk `{id, en}`
  bukan bagian dari rollout ini.
- Halaman korporat memakai template tetap, bukan page builder bebas.
- Route CMS tetap dikendalikan kode; editor tidak mengubah route dari Studio.

## Source of truth schema dan Studio

Schema runtime tetap berada di `studio-anigos-project/sanity/`, sedangkan
konfigurasi dan navigasi editorial utama berada di `studio-clean/`:

```text
studio-clean/
├── sanity.config.ts      # Studio editorial utama
├── sanity.cli.ts
└── sanity/
    └── structure.ts       # menu sederhana untuk editor

studio-anigos-project/
├── sanity.config.ts
├── sanity.cli.ts
├── sanity/
│   ├── schemaTypes/       # schema runtime + registry gabungan
│   └── lib/               # locale, limits, page, query helpers
└── schemaTypes/           # schema legacy yang dipertahankan
```

Clean Studio mengimpor schema runtime yang sama dan menunjuk ke project `wm8u3z2o`
serta dataset `production`. Studio lama tidak boleh dihapus sebelum seluruh data
real selesai dimasukkan dan website lolos pengujian.

Jalankan clean Studio secara lokal:

```bash
cd studio-clean
npm install
npm run dev
```

Sebelum Studio dapat mengakses dataset dari localhost, tambahkan origin yang
ditampilkan Sanity ke daftar CORS Origins project. Deploy hanya setelah build
lokal berhasil dan data mock sudah dipetakan.

## Kontrak legacy

Schema legacy memakai string biasa, bukan field bilingual:

- `newsroomArticle`: judul, excerpt, kategori, tanggal, gambar, dan paragraf
- `newsroomCategory`: nama, slug, deskripsi, dan subkategori
- `teamMember`: nama, jabatan, kategori, foto, deskripsi, urutan, dan status
- `mediaLibrary`: katalog asset dan metadata penggunaan media

Kontrak ini dipertahankan agar query di `lib/sanity-newsroom.ts` dan
`lib/sanity-team.ts` tidak berubah selama rollout. Jangan mengonversi data
legacy ke `{id, en}` tanpa rencana migrasi dan pengujian terpisah.

## Audit route

`ROUTES` di `studio-anigos-project/sanity/lib/page.ts` mencakup 18 halaman
yang dikelola sebagai singleton CMS. Hasil pencocokan dengan route Next.js:

- Semua 18 route CMS memiliki halaman di `app/`.
- `/artikel`, `/artikel/anigos-news`, `/artikel/landasan-informasi-publik`,
  dan `/artikel/publikasi` adalah surface newsroom/resource yang belum
  dimodelkan sebagai singleton page baru.
- `/artikel/[slug]` adalah route dinamis artikel dan tetap menggunakan
  kontrak `newsroomArticle`.
- `/tentang-kami/struktur-perusahaan` masih merupakan route frontend di luar
  daftar `ROUTES`; jangan menambahkannya ke CTA CMS sebelum tersedia schema
  page dan keputusan ownership kontennya.

Dengan batas ini, tidak ada mismatch pada 18 route CMS. Route tambahan di atas
dicatat sebagai backlog integrasi, bukan error validasi rollout.

## Tahapan penerapan

### Tahap 1 — Menetapkan satu Studio

- Gunakan `studio-anigos-project/sanity.config.ts` sebagai satu-satunya config.
- Jangan menjalankan config Sanity kedua terhadap project/dataset yang sama.
- Pertahankan seluruh tipe legacy di registry schema gabungan.

### Tahap 2 — Melengkapi navigasi Studio

Menu custom harus menampilkan:

- Newsroom → Artikel
- Newsroom → Kategori Artikel
- Tim

Ini hanya perubahan navigasi. Tidak mengubah nama tipe, field, atau dokumen
yang sudah ada.

### Tahap 3 — Validasi lokal

Jalankan dari `studio-anigos-project/`:

```powershell
npm run build
npx sanity schema validate
```

Jika validasi gagal, perbaiki error yang terkait penerapan sebelum lanjut.
Jangan menyimpulkan Studio siap hanya karena TypeScript editor tidak
menampilkan error.

### Tahap 4 — Verifikasi data

Di localhost:

1. Buka satu dokumen newsroom lama.
2. Buka satu kategori newsroom lama.
3. Buka satu anggota tim lama.
4. Buka satu halaman baru.
5. Simpan draft tanpa mengubah kontrak field.

Kriteria lulus: dokumen lama tetap terlihat dan dapat disimpan, sedangkan
halaman baru dapat dibuka tanpa error schema.

### Tahap 5 — Deployment

Sebelum deployment:

- daftarkan origin localhost dan production di Sanity CORS Origins
- aktifkan allow credentials bila diperlukan oleh Studio
- pastikan environment production menunjuk ke project dan dataset yang sama
- nonaktifkan Studio lama hanya setelah tahap verifikasi berhasil

Preview draft memakai endpoint `/api/draft`. Set `SANITY_PREVIEW_SECRET`
dengan nilai acak panjang pada Vercel dan environment hosted Studio. Config
Studio akan menyertakan secret tersebut pada URL preview; endpoint hanya
mengaktifkan Draft Mode untuk route internal yang diawali `/` dan menolak
request tanpa secret.

## Kegagalan dan aturan revisi

Jika build atau validasi gagal:

1. Simpan pesan error lengkap.
2. Tentukan apakah error berasal dari import, nama tipe bentrok, konfigurasi,
   atau kontrak data.
3. Lakukan perubahan paling kecil pada file yang relevan.
4. Jalankan ulang validasi yang gagal.
5. Jangan mengubah schema legacy hanya untuk menghilangkan error tanpa
   memeriksa dampaknya terhadap dokumen production.

Jika dokumen lama tidak muncul:

- hentikan rollout
- periksa projectId, dataset, dan nama `_type`
- jangan membuat schema legacy baru dengan nama berbeda

## Checklist selesai

- [ ] Satu `sanity.config.ts` aktif
- [ ] Project ID dan dataset terverifikasi
- [ ] Schema baru dan legacy terdaftar dalam satu registry
- [ ] Menu Newsroom, Kategori Artikel, dan Tim tersedia
- [ ] Build Studio berhasil
- [ ] `sanity schema validate` berhasil
- [ ] Dokumen legacy lama dapat dibuka dan disimpan
- [ ] Halaman baru dapat dibuka dan disimpan
- [ ] CORS localhost dan production terdaftar
- [ ] Studio lama tidak lagi dipakai setelah verifikasi
- [ ] Route tambahan legacy/static sudah memiliki keputusan ownership
