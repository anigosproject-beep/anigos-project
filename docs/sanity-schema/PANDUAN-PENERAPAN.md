# Panduan Penerapan Skema Sanity — Petro Anigos

Skema ini menerjemahkan `content-page-mapping.md` menjadi Sanity Studio yang
bisa dipakai orang non-teknis, dengan batas karakter yang ditegakkan CMS.

## Prinsip yang dipakai

**Skema tetap, bukan page builder.** Setiap halaman adalah satu dokumen dengan
field tetap. Editor bisa mengubah isi tiap segmen, tapi tidak bisa menambah,
menghapus, atau menukar urutan segmen. Ini pilihan sadar: tujuan utamamu adalah
layout tidak rusak, dan page builder bebas justru membuka jalan untuk merusaknya.
Kalau nanti kamu butuh halaman kampanye yang bebas, buat satu tipe `flexPage`
terpisah — jangan longgarkan 18 halaman ini.

**Satu sumber angka.** Semua batas karakter ada di `sanity/lib/limits.ts`. Tidak
ada angka literal di file skema. Kalau layout berubah, ubah satu file.

**Dua tingkat pelanggaran.** Judul, label, dan CTA memakai `strict: true` —
lewat batas langsung error dan publish diblokir. Deskripsi dan body memberi
peringatan kuning di batas aman, dan baru error di 120% batas. Batas aman
adalah kontrak layout; batas keras hanya pagar publish. Keduanya harus diuji
terhadap tabel batas di `content-page-mapping.md`, bukan dibiarkan menyimpang.

**Kode memegang logika, CMS memegang kata.** Route, slug posisi, nama field
form, perhitungan PBBKB, dan endpoint API tidak bisa diubah dari Studio.

**Dua pola bahasa didokumentasikan.** Halaman korporat baru memakai object
`{id, en}`. `newsroomArticle`, `newsroomCategory`, dan `teamMember` tetap
monolingual untuk kompatibilitas query lama. Fallback Indonesia bukan bukti
bahwa konten English sudah lengkap; audit kelengkapan wajib dilakukan sebelum
release.

**Asset dekoratif bukan konten alternatif.** Pattern yang hanya memperindah
layout memakai alt kosong dan `aria-hidden`; alt wajib hanya untuk visual yang
menyampaikan informasi.

## Struktur file

```
sanity.config.ts
sanity/
├── lib/
│   ├── limits.ts        batas karakter — satu-satunya sumber angka
│   ├── locale.ts        pabrik field dwibahasa + validasi panjang
│   ├── media.ts         preset gambar + validasi resolusi & rasio
│   ├── page.ts          kerangka dokumen halaman + daftar route
│   └── queries.ts       GROQ, sudah meratakan bahasa
├── components/
│   └── CharacterCount.tsx   penghitung karakter live di Studio
├── schemaTypes/
│   ├── objects/         cta, seo, hero, card, panel, statistik
│   ├── documents/
│   │   ├── settings.ts          identitas, navigasi, footer, cookie banner
│   │   ├── singletons/          18 halaman
│   │   └── collections/         produk, armada, area, mitra, lowongan, dokumen
│   └── index.ts
└── structure.ts         folder menu Studio
```

## Tampilan menu di Studio

```
Petro Anigos
├── Pengaturan Situs
│   ├── Identitas & Kontak
│   ├── Navigasi
│   ├── Footer
│   └── Banner Cookie
├── Beranda
├── Jangkauan
│   ├── Halaman Jangkauan
│   └── Area Layanan            (koleksi)
├── Keberlanjutan
│   ├── Halaman Utama
│   ├── Energi Berkelanjutan
│   ├── Kemitraan & Tata Kelola
│   └── Keselamatan Operasional
├── Produk
│   ├── Kenali Produk
│   ├── Armada
│   ├── Penawaran
│   ├── Form Ajukan Penawaran
│   ├── Katalog Produk          (koleksi)
│   └── Varian Kapasitas Armada (koleksi)
├── Tentang Kami
│   ├── Profil Perusahaan
│   ├── Harapan & Cita-Cita
│   ├── Kemitraan
│   ├── Legalitas
│   ├── Karir
│   ├── Form Lamaran
│   ├── Lowongan                (koleksi)
│   ├── Dokumen Legal           (koleksi)
│   └── Mitra                   (koleksi)
└── Legal
    ├── Kebijakan Data
    └── Ketentuan Cookies
```

Di dalam setiap halaman ada empat tab tetap: **Hero → Isi halaman → Penutup → SEO**.
Editor selalu menemukan hal yang sama di tempat yang sama.

## Pasang

```bash
npm i sanity next-sanity @sanity/vision @sanity/ui @sanity/image-url \
      @sanity/language-filter sanity-plugin-media
```

`.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SANITY_API_READ_TOKEN=sk...       # hanya untuk draft mode
SANITY_REVALIDATE_SECRET=...      # untuk webhook
```

Salin folder `sanity/` dan `sanity.config.ts` ke root proyek Next.js, lalu buat
route Studio di `app/studio/[[...tool]]/page.tsx`.

---

# Yang perlu kamu sesuaikan di web

Ini bagian yang menentukan skema di atas berhasil atau tidak.

## 1. Pisahkan data dari komponen dulu, baru sambungkan Sanity

Kalau konten sekarang masih hardcode di dalam JSX, jangan langsung pasang
`fetch` di dalam komponen section. Kerjakan dua langkah:

1. Tarik semua konten ke file data (`lib/content/home.ts` dan seterusnya) dengan
   tipe TypeScript eksplisit. Komponen jadi murni presentational.
2. Ganti isi file data itu dengan hasil query Sanity. Komponen tidak perlu
   disentuh sama sekali.

Langkah pertama ini juga jadi bahan seeding: setelah komponen menerima data dari
luar, kamu punya objek yang tinggal di-`import` ke Sanity lewat `@sanity/client`.

Buat satu lapisan adapter (`lib/content/adapters.ts`) yang mengubah bentuk
dokumen Sanity ke tipe props komponen. Jangan biarkan bentuk dokumen Sanity
bocor ke komponen — kalau skema berubah, kamu hanya memperbaiki adapter.

## 2. Komponen harus tahan teks yang lebih panjang

Batas karakter mencegah kasus ekstrem, tapi rentang 0–100% batas tetap besar.
Yang perlu diperiksa di CSS:

- **Tinggi tetap → tinggi minimum.** Ganti `h-[600px]` jadi `min-h-[600px]`.
  Mapping sudah menyebut `PageHero` pakai `min(34rem, 65svh)` — pastikan tidak
  ada section lain yang masih pakai tinggi mati.
- **Grid card harus sama tinggi.** `grid auto-rows-fr` plus `h-full` di card,
  supaya card dengan teks pendek tidak jadi lebih pendek dari tetangganya.
- **Potong deskripsi card.** `line-clamp-3` pada deskripsi card, `line-clamp-2`
  pada judul card. Ini jaring pengaman terakhir.
- **Heading jangan patah janggal.** `text-wrap: balance` untuk judul,
  `text-wrap: pretty` untuk paragraf.
- **Tombol jangan memaksa satu baris.** Hindari `whitespace-nowrap` pada tombol
  yang labelnya dari CMS; label English hampir selalu lebih panjang.
- **Statistik.** Angka dibatasi 12 karakter, tapi tetap beri `tabular-nums` dan
  cek "1.000.000 liter" tidak memecah grid tiga kolom.

Uji dengan cara paling cepat: isi satu halaman dengan teks tepat di batas
maksimal untuk semua field sekaligus, dalam bahasa English, lalu lihat di lebar
360px, 768px, dan 1440px.

## 3. Tambahkan penjaga batas di development

Validasi Sanity hanya berlaku untuk konten yang lewat CMS. Tambahkan pengecek
kecil di komponen supaya batas layout dan batas CMS tidak pernah berpisah:

```ts
// lib/dev/assertLength.ts
export function assertLength(label: string, value: string | undefined, max: number) {
  if (process.env.NODE_ENV !== 'development' || !value) return
  if (value.length > max) {
    console.warn(`[layout] ${label}: ${value.length}/${max} karakter — cek section ini.`)
  }
}
```

Impor `LIMIT` yang sama dari `sanity/lib/limits.ts` supaya angkanya tidak dobel.
Tambahkan pemeriksaan CI yang mem-parse tabel batas pada
`docs/content-page-mapping.md` dan membandingkannya dengan `LIMIT`. Warning
development saja tidak cukup untuk mencegah drift dokumentasi.

## 4. Gambar: ganti `<img>`/`next/image` statis ke URL builder Sanity

```ts
// lib/sanity/image.ts
import createImageUrlBuilder from '@sanity/image-url'
const builder = createImageUrlBuilder({projectId, dataset})

export const urlFor = (source: SanityImage) => builder.image(source).auto('format').fit('max')
```

Yang perlu diperhatikan:

- **Hotspot wajib dipakai.** Preset `cover` di `media.ts` menyalakan hotspot.
  Kalau komponen memanggil `urlFor(img).width(1920).height(1080)` tanpa
  `.fit('crop')`, hotspot tidak berpengaruh dan subjek bisa terpotong.
- **Artwork produk dan pattern jangan `object-cover`.** Mapping sudah
  menyebutnya; preset `productArtwork` dan `decorativePattern` sengaja mematikan
  hotspot. Render dengan `object-contain` dan jangan pakai `fill`.
- **Pakai LQIP sebagai placeholder.** Query sudah mengambil
  `metadata.lqip` — teruskan sebagai `placeholder="blur" blurDataURL={lqip}`.
  Ini menghilangkan lompatan layout saat hero dimuat.
- **Daftarkan `cdn.sanity.io`** di `next.config.js` → `images.remotePatterns`.

Pattern dekoratif tidak boleh diwajibkan memiliki alt. Adapter harus
menghasilkan `alt=""` dan komponen harus memberi `aria-hidden="true"` untuk
asset tersebut.

## 5. Breadcrumb dibangun dari route, bukan dari CMS

Skema hanya menyimpan label ruas terakhir (`meta.breadcrumbLabel`). Buat satu
peta route → parent di kode, lalu susun jalurnya sendiri. Dengan begitu
breadcrumb tidak mungkin berbeda dari URL, dan editor tidak perlu mengetik
"Beranda / Tentang Kami / ..." berulang-ulang di 18 halaman.

## 6. Bahasa

Skema memakai i18n level field (`{id, en}` dalam satu dokumen), bukan dokumen
terpisah per bahasa. Alasannya: satu halaman = satu dokumen membuat struktur
folder tetap bersih, dan batas karakter bisa divalidasi untuk kedua bahasa
sekaligus — yang penting justru karena versi English-mu lebih panjang.

Di frontend, semua query menerima `$lang`. GROQ sudah meratakannya dengan
`coalesce(field[$lang], field.id)`, jadi komponen hanya menerima `string`.
Kalau kamu belum punya routing bahasa, tambahkan segment `app/[lang]/...` atau
simpan pilihan di cookie dan teruskan ke fungsi fetch.

Plugin `@sanity/language-filter` sudah dipasang di config: editor bisa
menyembunyikan kolom English saat menulis draft Indonesia.

## 7. Preview dan revalidasi

- Buat `app/api/draft/route.ts` yang memanggil `draftMode().enable()` lalu
  redirect ke `slug`. `productionUrl` di config sudah mengarah ke sini.
- Buat `app/api/revalidate/route.ts` yang menerima webhook Sanity dan memanggil
  `revalidateTag`. Beri tag per tipe dokumen (`homePage`, `product`, dan
  seterusnya) saat fetch, supaya publish satu halaman tidak membuang cache
  seluruh situs.
- Pakai `perspective: 'published'` untuk produksi dan `'previewDrafts'` untuk
  draft mode.

## 8. Form: pastikan kunci teknis benar-benar cocok

Halaman `ajukanPenawaranPage` dan `lamaranPage` menyimpan `key` per field.
Di kode, ambil label lewat lookup:

```ts
const label = (key: string) => copy.fields.find((f) => f.key === key)?.label ?? FALLBACK[key]
```

Selalu sediakan `FALLBACK` di kode. Kalau editor salah ketik `key`, form tetap
tampil dengan label bawaan, bukan kosong.

Yang tetap di kode dan tidak boleh pindah ke CMS: daftar field, validasi,
perhitungan subtotal/PBBKB/total, batas 5 MB, tipe file yang diterima, dan
endpoint `/api/career-applications`.

## 9. Hero video beranda

Video sekarang jadi file asset Sanity. Yang perlu ditambahkan:

- Poster wajib (skema sudah memvalidasi). Tanpa poster, slide pertama akan
  kosong beberapa ratus milidetik — terlihat jelas ketika slide tersebut aktif.
- Maksimal satu slide dalam carousel boleh bertipe video. Posisi slide video
  tidak dikunci oleh schema.
- Logika `ended` yang sudah ada dipertahankan, tapi tambahkan fallback timer.
  Kalau video gagal dimuat, carousel harus tetap berjalan, bukan berhenti.
- Pertimbangkan `preload="metadata"`. Schema hanya mendeskripsikan target
  editorial; codec, durasi, resolusi, dan ukuran file tidak dianggap tervalidasi
  sampai custom input asset benar-benar dibuat.

## 10. Jumlah card dikunci — sediakan perilaku saat kurang

Beberapa array divalidasi dengan `.length(3)`, `.length(4)`, `.length(6)` karena
mapping menyebut jumlah pastinya. Validasi itu mencegah publish, tapi draft dan
dataset awal bisa saja berisi lebih sedikit. Komponen sebaiknya merender apa
adanya dengan grid yang menyesuaikan, bukan mengasumsikan panjang array.

## 11. Yang belum tercakup

`/artikel` dan `/tentang-kami/struktur-perusahaan` sengaja tidak ada di skema
ini, sesuai batasan mapping-mu. Saat menambahkannya nanti:

- Artikel butuh tipe dokumen `article` dengan Portable Text. Portable Text tidak
  bisa dibatasi jumlah karakternya seperti field lain — batasi lewat gaya blok
  yang diizinkan (matikan h1, batasi ke h2/h3/normal) dan validasi jumlah blok.
- Struktur perusahaan kemungkinan butuh tipe `person` dengan referensi
  atasan-bawahan, bukan array bersarang.

## Urutan pengerjaan yang saya sarankan

1. Pasang Studio, jalankan dengan skema ini, buat dokumen kosong untuk semua singleton.
2. Tarik konten hardcode ke file data bertipe (langkah 1 di atas).
3. Tulis script seeding sekali jalan dari file data itu ke Sanity.
4. Perbaiki CSS yang rapuh terhadap teks panjang (langkah 2).
5. Ganti file data dengan query Sanity, satu halaman per kali. Mulai dari
   halaman paling sederhana — Ketentuan Cookies atau Kebijakan Data — bukan beranda.
6. Beranda terakhir, karena paling banyak segmen dan satu-satunya yang punya video.
