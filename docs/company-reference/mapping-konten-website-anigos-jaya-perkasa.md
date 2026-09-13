# Mapping Konten Website — PT. Anigos Jaya Perkasa (Petro Anigos)

**Sumber:** Company Profile PT. Anigos Jaya Perkasa (PDF, 9 halaman)
**Disusun ke:** struktur folder `app/` milik user

## Indeks Referensi Implementasi

### Identitas kanonik

Gunakan penamaan berikut secara konsisten pada UI, metadata, dan copy website:

| Jenis | Nilai kanonik | Catatan |
|---|---|---|
| Nama badan usaha | PT. Anigos Jaya Perkasa | Gunakan untuk konteks legal dan formal |
| Nama brand | Petro Anigos | Gunakan sebagai nama brand utama di header, hero, dan footer |
| Nama brand alternatif di sumber | Anigos Petro | Pertahankan hanya saat mengutip atau memverifikasi dokumen sumber |
| Bidang usaha | Distributor Bahan Bakar Minyak (BBM) / Bahan Bakar Industri | Jenis produk yang disebut: solar (HSD) dan B40 Biosolar |
| Bahasa website | Bahasa Indonesia | Istilah teknis boleh memakai istilah industri yang lazim |

### Indeks route dan kesiapan data

| Route | Halaman | Status data | Sumber utama |
|---|---|---|---|
| `/` | Beranda | Siap untuk struktur awal; visual dan CTA perlu implementasi | Bagian 2 |
| `/tentang-kami/profil-perusahaan` | Profil Perusahaan | Siap dengan data profil, tujuan, nilai, visi, dan misi | Bagian 3 |
| `/tentang-kami/struktur-perusahaan` | Struktur Perusahaan | Sebagian; data organisasi perlu dilengkapi | Bagian 4 |
| `/tentang-kami/kemitraan` | Kemitraan | Siap sebagian; detail legal mitra perlu verifikasi | Bagian 5 |
| `/tentang-kami/legalitas` | Legalitas | Siap untuk nomor legal; scan dokumen belum tersedia | Bagian 6 |
| `/produk/kenali-produk` | Kenali Produk | Siap untuk B40 dan informasi mutu | Bagian 7 |
| `/produk/penawaran` | Penawaran | Kerangka siap; harga dan syarat komersial belum tersedia | Bagian 8 |
| `/produk/armada` | Armada | Siap untuk kapasitas; jumlah unit belum tersedia | Bagian 9 |
| `/jangkauan` | Jangkauan | Siap untuk alamat; kontak cabang dan peta belum tersedia | Bagian 10 |
| `/artikel` | Artikel | Belum ada konten artikel dari sumber | Bagian 11 |
| `/keberlanjutan` | Keberlanjutan | Narasi awal tersedia; data ESG formal belum tersedia | Bagian 12 |

### Prioritas sumber saat membangun

1. **Data inti perusahaan** pada Bagian 1 adalah master data yang dapat dipakai
   lintas halaman.
2. **Konten bertanda `[SUMBER PDF]`** boleh dipakai sebagai fakta setelah
   mempertahankan makna aslinya.
3. **Konten bertanda `[PENGEMBANGAN]`** adalah susunan editorial dan harus
   tetap dibatasi oleh fakta yang tersedia.
4. **Konten bertanda `[GAP]`** tidak boleh diisi dengan asumsi. Tampilkan
   placeholder, hilangkan bagian tersebut, atau minta data tambahan.
5. Jika ada perbedaan antara bagian naratif dan daftar cabang, gunakan daftar
   cabang aktual pada Bagian 10 untuk halaman Jangkauan dan tandai perbedaan
   tersebut sebelum dipublikasikan.
6. Jangan mempublikasikan kapasitas storage `2.000 L` sebelum dikonfirmasi,
   karena dokumen sendiri menandainya sebagai data yang perlu diverifikasi.

### Komponen UI yang disarankan

Gunakan komponen yang sudah tersedia di `components/ui` dan hindari membuat
primitive baru untuk kebutuhan berikut:

| Kebutuhan halaman | Komponen yang disarankan |
|---|---|
| Judul halaman dan pembuka section | `Heading`, `SectionHeading`, `Eyebrow`, `Text` dari `components/typography` |
| CTA dan tautan aksi | `Button` / `buttonVariants` |
| Ringkasan layanan dan nilai perusahaan | `Card`, `Badge`, `Separator` |
| Visi, misi, dan nilai | `Tabs`, `Accordion`, atau `Collapsible` |
| Legalitas dan spesifikasi armada | `Table`, `Card`, `Attachment` |
| Daftar artikel dan produk | `Card`, `AspectRatio`, `Badge`, `Pagination`, `Skeleton` |
| Form penawaran dan kemitraan | `Field`, `Label`, `Input`, `Textarea`, `Select`, `Button` |
| Detail cepat pada mobile | `Drawer`, `Sheet`, atau `Dialog` |
| Data keberlanjutan | `Chart`, `Progress`, `Tabs`, `Table` |

### Data yang harus dikonfirmasi sebelum publikasi

- Penamaan brand resmi: `Petro Anigos` atau `Anigos Petro` sebagai bentuk
  legal/marketing yang akan digunakan.
- Kapasitas storage yang tertulis `2.000 L`.
- Detail legal dan alamat lengkap PT Masinton Nusa Perkasa.
- Jumlah unit armada dan kapal.
- Kontak setiap cabang.
- Harga, minimum order, pembayaran, dan syarat penawaran.
- Dokumen scan legalitas yang boleh ditampilkan.
- Data ESG, K3, sertifikasi, dan program CSR.

## Cara Membaca Dokumen Ini

- Setiap section di bawah = 1 halaman/route di `app/` milik kamu.
- **`[SUMBER PDF]`** — informasi diambil langsung dari company profile, sudah ditulis ulang jadi gaya copy web (bukan tempel mentah).
- **`[PENGEMBANGAN]`** — kalimat/struktur tambahan saya susun untuk melengkapi jadi konten web yang utuh, tapi isinya tetap merujuk fakta dari PDF (tidak mengarang data baru: angka, tanggal, atau nama fiktif).
- **`[GAP - PERLU DATA TAMBAHAN]`** — informasi yang dibutuhkan halaman tersebut tapi **tidak ada** di PDF sumber. Jangan diisi asal; ini perlu kamu lengkapi (rekap di [Bagian 13](#bagian-13--rekap-gap--data-yang-perlu-dilengkapi)).
- [Bagian 14](#bagian-14--lampiran-ekstraksi-mentah-seluruh-teks-pdf) berisi ekstraksi mentah semua teks dari PDF, per halaman, sebagai pengaman supaya tidak ada informasi yang hilang saat proses mapping.

---

## Bagian 1 — Data Inti Perusahaan

*(Master data, dipakai berulang di banyak halaman: header, footer, kontak, schema.org, dsb.)*

| Field | Isi |
|---|---|
| Nama resmi perusahaan | PT. Anigos Jaya Perkasa |
| Merek dagang / brand | Petro Anigos (disebut juga "Anigos Petro") |
| Bidang usaha | Distributor Bahan Bakar Minyak (BBM) / Bahan Bakar Industri — jenis solar (HSD) dan B40 Biosolar |
| Tanggal berdiri | 18 Juli 2019 |
| Akta pendirian | Oleh Notaris Andi Ismawati Achmad, S.H., Nomor Akta: 11 |
| SK Kemenkumham RI | No. AHU-0035830.Ah.01.01, tahun 2019 |
| Izin Niaga Umum (INU) | dari Direktorat Jenderal Minyak dan Gas Bumi (Ditjen Migas) |
| Kode izin usaha | 05.Nw.03.25.00.153 |
| Registrasi BPH Migas | No. 03/NRU/KABPH MIGAS/2020 (Nomor Registrasi Usaha Niaga Minyak dan Gas Bumi) |
| Wilayah operasi utama | Pulau Jawa, Sumatera, Kalimantan (disebut di "Tentang Kami"); jaringan cabang aktual juga sampai Sulawesi — lihat [Bagian 10](#bagian-10--jangkauan) |
| Mitra transportir | PT Masinton Nusa Perkasa |
| Kantor Pusat | Komplek Ruko Saung Bambu B3, Jl. Lingkar Utara, Kelurahan Perwira, Bekasi Utara, Kota Bekasi 17122 |
| Telepon | 021-88383549 / 021-29253273 |
| Email | anigospetro@gmail.com |
| Tagline produk | "Produk Berkualitas dengan Harga Bersaing" |

---

## Bagian 2 — Beranda

**Route:** `app/page.tsx`
**Tujuan halaman:** Kesan pertama — siapa perusahaan ini, apa yang dijual, kenapa kredibel (legal & berpengalaman), dan arah ke halaman lain (Produk, Jangkauan, Tentang Kami).

### 2.1 Hero Section

`[SUMBER PDF]` + `[PENGEMBANGAN]`

- **Headline:** "Distributor Bahan Bakar Industri Terpercaya di Indonesia"
- **Sub-headline:** "PT. Anigos Jaya Perkasa — melalui merek dagang Petro Anigos — melayani distribusi Bahan Bakar Minyak (BBM) berkualitas untuk kebutuhan industri di Pulau Jawa, Sumatera, dan Kalimantan."
- **Badge tagline:** "Produk Berkualitas dengan Harga Bersaing"
- **CTA primer:** "Lihat Produk Kami" → `/produk/kenali-produk`
- **CTA sekunder:** "Hubungi Kami" → kontak/WA/email
- **Visual:** foto armada truk tangki (cover PDF & hal. 6)

### 2.2 Trust Bar / Legalitas Sekilas

`[SUMBER PDF]` — 3 badge sejajar di bawah hero:

1. "Berdiri sejak 2019"
2. "Berizin Resmi Ditjen Migas" — Kode Izin Usaha 05.Nw.03.25.00.153
3. "Terdaftar di BPH Migas" — No. 03/NRU/KABPH MIGAS/2020

*(Detail lengkap tetap di `/tentang-kami/legalitas` — di Beranda cukup ringkas sebagai penguat kepercayaan.)*

### 2.3 Tentang Singkat

`[SUMBER PDF - disederhanakan]`

> "Sejak 2019, PT. Anigos Jaya Perkasa telah berpengalaman sebagai distributor Bahan Bakar Industri yang dibutuhkan di wilayah Indonesia, khususnya Pulau Jawa, Pulau Sumatera, dan Pulau Kalimantan. Kami memegang merek dagang 'Anigos Petro' dan beroperasi dengan lisensi resmi dari pemerintah."

Link: "Selengkapnya tentang kami →" (ke `/tentang-kami/profil-perusahaan`)

### 2.4 Kenapa Memilih Kami

`[SUMBER PDF hal. 2]` — dipecah jadi 4 kartu fitur:

- **Kemampuan Teknis Terbaik** — "Dikenal sebagai perusahaan dagang dengan kemampuan teknis terbaik, saling menghormati, dan berkomitmen penuh terhadap kepuasan konsumen."
- **Etika & Tanggung Jawab** — "Kepatuhan pada etika adalah yang utama bagi kami, dengan tanggung jawab penuh pada setiap layanan yang kami lakukan."
- **Tepat Waktu & Aman** — "Waktu dan keamanan selalu menjadi prioritas — mengutamakan ketepatan waktu dan bebas dari kecelakaan kerja."
- **Transparan & Profesional** — "Beroperasi dengan nilai-nilai transparansi, integritas, keandalan, dan profesionalisme. Hanya produk dan layanan berkualitas tinggi yang kami tangani."

### 2.5 Produk Unggulan

`[SUMBER PDF hal. 4]`

> **B40 Biosolar** — "Bahan bakar hasil pencampuran 40% Biodiesel dengan 60% BBM jenis solar, sesuai program pemerintah dan spesifikasi mutu Ditjen Migas RI. Dipasarkan dengan merek dagang Petro Anigos."

CTA: "Kenali Produk Kami →"

### 2.6 Armada & Jangkauan (preview 2 kolom)

`[SUMBER PDF hal. 5-6 & 8]`

- **Armada:** "Armada tangki BBM (HSD) dengan kapasitas 5.000 L, 8.000 L, 10.000 L, 16.000 L, 24.000 L, hingga 30.000 L — siap memenuhi berbagai skala kebutuhan konsumen." → `/produk/armada`
- **Jangkauan:** "Kantor pusat di Bekasi, dengan jaringan cabang di Palembang, Medan, Kalimantan (Palangka Raya), dan Sulawesi." → `/jangkauan`

### 2.7 CTA Penutup

`[SUMBER PDF - disadur dari Penutup]`

> "Kami terbuka untuk menjadi mitra bisnis yang handal dan terpercaya. Mari membangun kerja sama yang saling menguntungkan."

CTA: "Ajukan Kerja Sama" / "Hubungi Tim Kami"

---

## Bagian 3 — Tentang Kami › Profil Perusahaan

**Route:** `app/tentang-kami/profil-perusahaan`
**Tujuan halaman:** Menjelaskan identitas, sejarah singkat, lingkup bisnis, tujuan, dan visi-misi perusahaan secara lengkap.

### 3.1 Tentang Kami / Our Business

`[SUMBER PDF hal. 1]`

> "PT. Anigos Jaya Perkasa telah berpengalaman sebagai distributor Bahan Bakar Industri yang dibutuhkan di wilayah Indonesia, khususnya Pulau Jawa, Pulau Sumatera, dan Pulau Kalimantan.
>
> Perusahaan kami berdiri pada tanggal 18 Juli 2019, berdasarkan akta pendirian perusahaan oleh Andi Ismawati Achmad, S.H., dengan Nomor Akta 11, dan telah mendapat pengesahan melalui Keputusan Menteri Hukum dan Hak Asasi Manusia Republik Indonesia dengan Nomor AHU-0035830.Ah.01.01 Tahun 2019.
>
> Perusahaan kami merupakan pemegang merek dagang 'Anigos Petro' dan telah memiliki Lisensi Izin Niaga Umum (INU) dari Direktorat Jenderal Minyak dan Gas Bumi dengan Kode Izin Usaha 05.Nw.03.25.00.153, serta terdaftar di BPH Migas dengan Kode Nomor Registrasi Usaha Niaga Minyak dan Gas Bumi No. 03/NRU/KABPH MIGAS/2020."

*(Catatan tampilan: 3 nomor legal di atas cukup disebut ringkas di sini, jadikan link "Lihat detail legalitas →" menuju `/tentang-kami/legalitas` agar tidak duplikasi berlebihan.)*

### 3.2 Tujuan Perusahaan

`[SUMBER PDF hal. 2]`

> "Tujuan perusahaan kami adalah untuk menjadi yang terdepan dalam layanan penyedia secara profesional untuk distribusi Bahan Bakar Minyak. Kami telah melayani penyediaan untuk layanan berskala besar dan berskala nasional.
>
> Kami berusaha untuk menyediakan layanan kualitas dan kuantitas yang disesuaikan untuk memenuhi kebutuhan konsumen."

### 3.3 Sasaran, Etika, Objektif, Nilai

`[SUMBER PDF hal. 2]` — cocok sebagai accordion/tab atau 4 blok berurutan:

**Sasaran**
> "Untuk dikenal sebagai perusahaan dagang yang terbaik dalam kemampuan teknis, saling menghormati, dan berkomitmen penuh terhadap kepuasan konsumen."

**Etika**
> "Kepatuhan pada etika adalah yang utama bagi kami, dan memikul tanggung jawab masing-masing pada setiap tanggung jawab yang kami lakukan."

**Objektif**
> "Waktu dan keamanan selalu menjadi prioritas kami. Perusahaan kami selalu mengutamakan ketepatan waktu dan bebas dari kecelakaan kerja."

**Nilai**
> "Perusahaan kami beroperasi pada nilai-nilai yang kuat meliputi Transparansi, Integritas, Keandalan, dan Profesionalisme. Hanya produk dan layanan berkualitas tinggi yang akan ditangani dengan profesional."

### 3.4 Visi

`[SUMBER PDF hal. 3]`

> "Menjadi Perusahaan Nasional yang terpercaya dalam penyediaan berbagai layanan dengan orientasi dan efisiensi kerja yang mengedepankan kecepatan kerja dan profesionalisme."

### 3.5 Misi

`[SUMBER PDF hal. 3]`

> "PT. Anigos Jaya Perkasa ikut mengembangkan diri secara profesional dalam tatanan yang beretika, terbuka, dan selalu mengacu pada inovasi berkesinambungan dalam usaha, serta selalu menjaga hubungan dengan rekan usaha, konsumen, dan menjadi mitra Pemerintah Republik Indonesia.
>
> Menjadikan iklim berbisnis yang sehat dan selalu menjadi jujungan (andalan) konsumen dalam memberikan pelayanan yang terpadu dan memudahkan konsumen dalam memenuhi kebutuhan di dalam dunia bisnis."

### 3.6 Saran Layout Halaman Ini

`[PENGEMBANGAN — saran struktur, bukan konten]`

1. Hero kecil: judul halaman "Profil Perusahaan" + 1 kalimat ringkas
2. Section "Tentang Kami" (3.1)
3. Section "Tujuan Perusahaan" (3.2)
4. Grid 4 kolom: Sasaran / Etika / Objektif / Nilai (3.3)
5. Split 2 kolom: Visi | Misi (3.4 & 3.5), bisa pakai warna biru tua seperti di PDF asli
6. CTA penutup ke `/tentang-kami/legalitas` dan `/produk`

---

## Bagian 4 — Tentang Kami › Struktur Perusahaan

**Route:** `app/tentang-kami/struktur-perusahaan`

> `[GAP - PERLU DATA TAMBAHAN]`
> PDF sumber **tidak** memuat struktur organisasi (tidak ada nama direksi/komisaris, bagan jabatan, jumlah karyawan/cabang secara struktural).

Yang tersedia di PDF hanya:

- Bentuk badan hukum: PT (Perseroan Terbatas)
- Notaris pendiri: Andi Ismawati Achmad, S.H. (Akta No. 11)
- Dasar hukum: SK Kemenkumham No. AHU-0035830.Ah.01.01 (2019)
- Jaringan kantor: 1 Kantor Pusat (Bekasi) + 4 wilayah cabang (Palembang, Medan, Kalimantan, Sulawesi) — detail lengkap di [Bagian 10](#bagian-10--jangkauan)

`[PENGEMBANGAN — sementara, sampai data resmi tersedia]`

1. Info legal pendirian (dari 3.1) sebagai "Dasar Hukum Perusahaan"
2. Diagram sederhana "Jaringan Operasional": Kantor Pusat (Bekasi) → Cabang Palembang, Medan, Kalimantan, Sulawesi (data ini **faktual** dari PDF, aman dipakai)
3. Placeholder section "Manajemen & Tim" dengan catatan "segera hadir" sampai data direksi/komisaris/PIC per cabang kamu berikan

**Data yang perlu diminta ke kamu untuk melengkapi halaman ini:**

- Nama & jabatan Direktur/Komisaris (jika ingin ditampilkan)
- Bagan organisasi (departemen/divisi) jika ada
- Jumlah karyawan (opsional, untuk kredibilitas)
- PIC/penanggung jawab tiap cabang (opsional)

---

## Bagian 5 — Tentang Kami › Kemitraan

**Route:** `app/tentang-kami/kemitraan`
**Tujuan halaman:** Menunjukkan siapa mitra strategis perusahaan dan bagaimana kemitraan itu mendukung layanan.

### 5.1 Mitra Transportir Resmi

`[SUMBER PDF hal. 7]`

> "Untuk mendukung kelancaran pendistribusian ke seluruh pelosok Indonesia, PT. Anigos Jaya Perkasa menjalin kerja sama dengan PT Masinton Nusa Perkasa sebagai mitra transportir resmi."

Detail legalitas mitra (dari sertifikat izin usaha di PDF hal. 7):

| Item | Keterangan |
|---|---|
| Nama Badan Usaha | PT Masinton Nusa Perkasa |
| Jenis Izin Usaha | Pengangkutan Minyak dan Gas Bumi |
| Jenis Kegiatan | Pengangkutan Bahan Bakar Minyak |
| Jangka Waktu Izin | Berlaku selama 5 (lima) tahun |
| Tanggal Terbit | 13 Juli 2020 |
| Diterbitkan oleh | Kepala Badan Koordinasi Penanaman Modal (BKPM) — Sertifikat Izin Usaha |

*(Nama & alamat lengkap badan usaha pada sertifikat sebagian tidak terbaca jelas di scan PDF — lihat catatan gap di [Bagian 13](#bagian-13--rekap-gap--data-yang-perlu-dilengkapi) jika ingin ditampilkan verbatim/perlu verifikasi ulang dari dokumen asli.)*

Visual pendukung: foto truk tangki bertuliskan "PT. MASINTON NUSA PERKASA — TRANSPORTIR" (PDF hal. 7).

### 5.2 Semangat Kemitraan

`[SUMBER PDF hal. 3]`

> "Kami selalu menjaga hubungan baik dengan rekan usaha, konsumen, dan berkomitmen menjadi mitra Pemerintah Republik Indonesia dalam menciptakan iklim bisnis yang sehat."

`[PENGEMBANGAN — kalimat penutup ajakan]`

> "Terbuka bagi perusahaan atau instansi yang ingin menjajaki peluang kerja sama distribusi maupun transportasi Bahan Bakar Minyak."

CTA: "Hubungi Kami untuk Kemitraan"

---

## Bagian 6 — Tentang Kami › Legalitas

**Route:** `app/tentang-kami/legalitas`
**Tujuan halaman:** Pusat rujukan semua nomor izin & legal — penting untuk kepercayaan calon klien/mitra B2B.

`[SUMBER PDF hal. 1]` — tampilkan sebagai daftar/kartu bernomor:

1. **Akta Pendirian Perusahaan**
   Notaris: Andi Ismawati Achmad, S.H. · Nomor Akta: 11 · Tanggal berdiri: 18 Juli 2019
2. **Pengesahan Kementerian Hukum dan HAM RI**
   Nomor SK: AHU-0035830.Ah.01.01 · Tahun: 2019
3. **Lisensi Izin Niaga Umum (INU)**
   Diterbitkan oleh: Direktorat Jenderal Minyak dan Gas Bumi (Ditjen Migas), Kementerian ESDM · Kode Izin Usaha: 05.Nw.03.25.00.153
4. **Registrasi BPH Migas**
   Nomor Registrasi Usaha Niaga Minyak dan Gas Bumi: 03/NRU/KABPH MIGAS/2020
5. **Merek Dagang**
   Nama merek dagang: "Anigos Petro" / "Petro Anigos"
6. **Izin Mitra Transportir** (PT Masinton Nusa Perkasa)
   Sertifikat Izin Usaha — Pengangkutan Minyak dan Gas Bumi · Jenis kegiatan: Pengangkutan Bahan Bakar Minyak · Masa berlaku: 5 tahun, terbit 13 Juli 2020 (lihat detail penuh di [Bagian 5](#bagian-5--tentang-kami--kemitraan))

`[PENGEMBANGAN — kalimat pembuka halaman]`

> "PT. Anigos Jaya Perkasa beroperasi secara legal dan sesuai regulasi Pemerintah Republik Indonesia di bidang niaga minyak dan gas bumi. Berikut adalah legalitas resmi yang kami miliki:"

**Saran UI:** tampilkan tiap poin sebagai kartu dengan ikon dokumen/sertifikat. Jika kamu punya file scan sertifikat asli (INU, BPH Migas, akta), bisa dilampirkan sebagai gambar/PDF viewer di tiap kartu untuk transparansi lebih tinggi — *`[GAP]` file asli sertifikat INU & BPH Migas belum ada di company profile, hanya disebut nomornya saja.*

---

## Bagian 7 — Produk › Kenali Produk

**Route:** `app/produk/kenali-produk`
**Tujuan halaman:** Edukasi produk utama — apa itu BBM yang dijual, apa itu B40 Biosolar, kenapa relevan.

### 7.1 Our Product

`[SUMBER PDF hal. 4]`

> "Kami menyediakan Bahan Bakar Minyak dengan mutu dan spesifikasi sesuai standar Direktorat Jenderal Minyak dan Gas Bumi Republik Indonesia (Ditjen Migas RI), dipasarkan dengan merek dagang 'Petro Anigos'."

### 7.2 Produk: B40 Biosolar

`[SUMBER PDF hal. 4]`

> "B40 Biosolar merupakan produk BBM hasil mengikuti program pemerintah yang mewajibkan pencampuran 40% Biodiesel dengan 60% bahan bakar minyak jenis solar, sehingga menghasilkan produk B40."

`[PENGEMBANGAN — penjelasan tambahan, tetap berbasis fakta yang sama, tanpa data baru]`

- **Komposisi:** 40% Biodiesel + 60% Solar (HSD)
- **Kepatuhan:** Mengikuti program mandatori pemerintah terkait campuran biodiesel pada BBM jenis solar
- **Standar mutu:** Sesuai spesifikasi Ditjen Migas RI
- **Merek dagang:** Petro Anigos
- **Tagline:** "Produk Berkualitas dengan Harga Bersaing"

Visual: foto sampel cairan B40 berwarna kuning keemasan dalam gelas laboratorium (PDF hal. 4).

**Saran UI:** hero produk (foto B40) + spesifikasi dalam tabel/ikon (Komposisi, Standar, Merek), lalu CTA ke halaman "Penawaran" untuk info harga/pemesanan.

---

## Bagian 8 — Produk › Penawaran

**Route:** `app/produk/penawaran`
**Tujuan halaman:** Menjelaskan skema layanan/penawaran bisnis — skala layanan, komitmen kualitas & kuantitas, dan proposisi nilai ke calon pembeli/mitra (B2B).

`[SUMBER PDF hal. 2 & 5, disusun ulang jadi kerangka "penawaran"]`

**8.1 Skala Layanan**
> "Kami telah melayani penyediaan Bahan Bakar Minyak untuk kebutuhan berskala besar maupun berskala nasional."

**8.2 Kualitas & Kuantitas Sesuai Kebutuhan**
> "Kami berusaha menyediakan layanan dengan kualitas dan kuantitas yang disesuaikan untuk memenuhi kebutuhan spesifik tiap konsumen — baik untuk kebutuhan skala kecil, menengah, maupun industri besar."

**8.3 Didukung Fasilitas Penyimpanan**

`[SUMBER PDF hal. 5]`
> "Dalam menjalankan usahanya, PT. Anigos Jaya Perkasa ditunjang oleh fasilitas storage Bahan Bakar Minyak (HSD) dengan kapasitas 2.000 L, serta didukung sarana transportasi laut (kapal) untuk pengangkutan BBM antarwilayah, seperti kapal 'Batam Marine I' yang ditampilkan dalam dokumentasi kami."

> ⚠️ **Catatan verifikasi:** angka kapasitas storage "2.000 L" tertulis apa adanya di PDF sumber. Untuk skala usaha dengan armada hingga 30.000 L per truk dan kapal storage, angka ini kemungkinan salah ketik di dokumen asli (mungkin maksudnya 2.000.000 L / 2.000 KL atau satuan lain). **Saran:** konfirmasi angka pastinya sebelum dipublikasikan di website, supaya tidak tampak janggal/tidak konsisten di mata calon klien.

**8.4 Komitmen Layanan** *(dipakai ulang dari 4 pilar, versi ringkas)*

- Kemampuan teknis terbaik & komitmen penuh pada kepuasan konsumen
- Ketepatan waktu dan bebas kecelakaan kerja
- Transparansi, integritas, keandalan, profesionalisme
- Hanya produk & layanan berkualitas tinggi yang ditangani

`[PENGEMBANGAN — CTA]`
> "Butuh pasokan BBM Industri untuk operasional bisnis Anda? Hubungi tim kami untuk penawaran dan skema kerja sama."

CTA: "Ajukan Penawaran" (form/kontak/WA)

> `[GAP]` PDF tidak memuat: daftar harga, minimum order, wilayah pengiriman spesifik per skema, metode pembayaran, atau syarat & ketentuan kerja sama. Jika halaman "Penawaran" perlu detail ini, mohon disiapkan terpisah (tidak ada di company profile).

---

## Bagian 9 — Produk › Armada

**Route:** `app/produk/armada`
**Tujuan halaman:** Menampilkan kapabilitas logistik/armada perusahaan secara visual & teknis.

### 9.1 Armada Kami

`[SUMBER PDF hal. 6]`

> "Armada tangki Bahan Bakar Minyak (HSD) kami tersedia dalam berbagai kapasitas: 5.000 L, 8.000 L, 10.000 L, 16.000 L, 24.000 L, dan 30.000 L.
>
> Dengan variasi kapasitas angkutan tersebut, kami mampu memberikan pelayanan terbaik dalam mendukung setiap kebutuhan konsumen — mulai dari skala kecil hingga skala industri besar."

| No | Kapasitas Tangki |
|---|---|
| 1 | 5.000 Liter |
| 2 | 8.000 Liter |
| 3 | 10.000 Liter |
| 4 | 16.000 Liter |
| 5 | 24.000 Liter |
| 6 | 30.000 Liter |

Visual: foto barisan truk tangki (hijau & biru) — tersedia di cover PDF dan hal. 6.

### 9.2 Fasilitas Penyimpanan & Transportasi Laut

`[SUMBER PDF hal. 5]`

> "Selain armada darat, operasional kami didukung fasilitas storage BBM (HSD) serta sarana transportasi laut berupa kapal (contoh: 'Batam Marine I') untuk mendukung distribusi antarwilayah/pulau."

*(Lihat catatan verifikasi kapasitas storage di 8.3)*

### 9.3 Didukung Mitra Transportir

`[SUMBER PDF hal. 7]`

> "Untuk menjangkau seluruh pelosok Indonesia, distribusi kami didukung oleh mitra transportir resmi, PT Masinton Nusa Perkasa, yang memiliki izin usaha pengangkutan Minyak dan Gas Bumi."

Link → `/tentang-kami/kemitraan` untuk detail izin lengkap.

**Saran UI:** grid foto truk (dari PDF cover & hal. 6-7) + tabel kapasitas + 1 section kecil kapal/storage. Bisa tambahkan angka "jumlah unit armada" jika kamu punya datanya — *`[GAP]` jumlah total unit truk/kapal tidak disebutkan di PDF, hanya varian kapasitasnya.*

---

## Bagian 10 — Jangkauan

**Route:** `app/jangkauan`
**Tujuan halaman:** Menunjukkan sebaran kantor & wilayah layanan secara konkret (alamat, kontak) — idealnya dengan peta interaktif.

`[SUMBER PDF hal. 1 & 8]`

> **Catatan penting:** teks "Tentang Kami" di PDF menyebut wilayah operasi utama sebagai Jawa, Sumatera, dan Kalimantan — namun daftar cabang resmi di halaman kontak PDF menunjukkan jaringan sudah meluas hingga Sulawesi. Sebaiknya halaman Jangkauan menampilkan data cabang aktual di bawah ini (lebih lengkap & up to date) sebagai representasi jangkauan sebenarnya.

### 10.1 Kantor Pusat
Head Office PT. Anigos Jaya Perkasa
Komplek Ruko Saung Bambu B3, Jl. Lingkar Utara, Kelurahan Perwira, Bekasi Utara, Kota Bekasi 17122
Telp: 021-88383549 / 021-29253273 · Email: anigospetro@gmail.com

### 10.2 Cabang Palembang
Komplek Villa Gardena 3 Blok G No. 2, Maskarebet, Sukaramai, Palembang

### 10.3 Cabang Medan
Bajak V / Jl. Bahagia No. P.7, Kel. Harjosari II, Medan Amplas, Kota Medan 20147

### 10.4 Cabang Kalimantan
Jl. Cilik Riwut Km. 6 No. 132, Depan Batalyon Antang, Palangka Raya

### 10.5 Cabang Sulawesi (2 titik)
- Desa Puusuli, Kec. Andowia, Kab. Konawe Utara, Sulawesi Tenggara
- Desa Tinompo, Kec. Lembo, Kab. Morowali Utara, Sulawesi Tengah

### 10.6 Copy Pembuka Halaman

`[PENGEMBANGAN, berbasis fakta di atas]`

> "Dengan kantor pusat di Bekasi dan jaringan cabang yang tersebar dari Sumatera, Kalimantan, hingga Sulawesi, PT. Anigos Jaya Perkasa siap mendukung distribusi Bahan Bakar Minyak ke berbagai wilayah di Indonesia."

**Saran UI:**
- Peta interaktif dengan pin di 5 titik lokasi di atas
- List/accordion per wilayah berisi alamat + tombol "Hubungi cabang ini" (jika nomor telepon per cabang tersedia — *`[GAP]` PDF hanya mencantumkan 1 nomor telepon untuk Kantor Pusat, tidak ada nomor telepon terpisah untuk tiap cabang*)

---

## Bagian 11 — Artikel

**Route:** `app/artikel`

> `[GAP - PERLU DATA TAMBAHAN]`
> PDF company profile **tidak** berisi artikel/berita apa pun — ini murni dokumen profil statis. Jadi halaman Artikel perlu diisi konten baru di luar PDF (bukan hasil ekstraksi, melainkan konten yang perlu ditulis terpisah oleh kamu/tim/atau dipesan khusus).

`[PENGEMBANGAN — hanya usulan topik, bukan konten final]`

Topik yang relevan dengan lini bisnis perusahaan (berdasarkan tema yang muncul di company profile):

1. Edukasi tentang B40 Biosolar dan program mandatori biodiesel pemerintah
2. Tips memilih pemasok BBM industri yang legal & bersertifikat
3. Update kebijakan BPH Migas / Ditjen Migas terkait niaga BBM
4. Cerita ekspansi jaringan distribusi (Jawa–Sumatera–Kalimantan–Sulawesi)
5. Standar keselamatan kerja dalam distribusi BBM (terkait poin "Objektif" di Profil Perusahaan)

*Catatan: karena ini area yang butuh konten rutin, sebaiknya disiapkan alur kerja penulisan artikel terpisah (bukan bagian dari mapping company profile ini).*

---

## Bagian 12 — Keberlanjutan

**Route:** `app/keberlanjutan`

> `[GAP SEBAGIAN]` PDF tidak memiliki section "Sustainability/ESG" secara eksplisit. Namun ada 3 tema yang benar tersirat dari dokumen — bukan data ESG formal (emisi, sertifikasi lingkungan, dsb, yang memang tidak ada di PDF).

### 12.1 Kontribusi Energi Lebih Bersih

`[SUMBER PDF hal. 4]`
> "Sebagai bagian dari program pemerintah, produk B40 Biosolar kami mencampurkan 40% Biodiesel ke dalam BBM jenis solar — turut mendukung agenda nasional peningkatan penggunaan energi nabati pada sektor bahan bakar."

### 12.2 Keselamatan Kerja sebagai Prioritas

`[SUMBER PDF hal. 2]`
> "Waktu dan keamanan selalu menjadi prioritas kami — perusahaan selalu mengutamakan ketepatan waktu dan bebas dari kecelakaan kerja dalam setiap operasional distribusi BBM."

### 12.3 Kontribusi Sosial

`[SUMBER PDF hal. 9]`
> "Kami berharap dapat terus menjadi mitra yang handal dan terpercaya, serta ikut berkontribusi terhadap peningkatan taraf hidup dan kesejahteraan masyarakat, bangsa, dan Negara."

`[PENGEMBANGAN — kalimat pembuka halaman]`

> "Keberlanjutan bagi kami bukan sekadar jargon, melainkan bagian dari cara kami menjalankan usaha — mulai dari mendukung program energi nabati pemerintah, menjaga keselamatan kerja, hingga berkontribusi pada kesejahteraan masyarakat."

> `[GAP]` Jika ingin halaman ini lebih kuat: sertifikasi lingkungan/K3 resmi (jika ada, mis. ISO), program CSR konkret, data kuantitatif (mis. % pengurangan emisi, jumlah komunitas terbantu) — tidak ada satu pun angka ESG di PDF sumber.

---

## Bagian 13 — Rekap Gap / Data yang Perlu Dilengkapi

1. **Struktur Perusahaan:** nama & jabatan direksi/komisaris, bagan organisasi, jumlah karyawan (Bagian 4)
2. **Legalitas mitra transportir:** nama/alamat lengkap pada sertifikat PT Masinton Nusa Perkasa kurang terbaca jelas di scan PDF, perlu verifikasi ulang dari dokumen asli (Bagian 5)
3. **File scan asli** sertifikat INU & registrasi BPH Migas (untuk ditampilkan sebagai bukti visual di halaman Legalitas) (Bagian 6)
4. **Angka kapasitas fasilitas storage "2.000 L"** perlu dikonfirmasi ulang — kemungkinan salah ketik di dokumen sumber mengingat skala armada (Bagian 8 & 9)
5. **Detail komersial** untuk halaman Penawaran: daftar harga, minimum order, skema pembayaran, syarat kerja sama (Bagian 8)
6. **Jumlah total unit armada/kapal** (bukan hanya varian kapasitas) (Bagian 9)
7. **Nomor telepon per cabang** (Palembang/Medan/Kalimantan/Sulawesi) — PDF hanya mencantumkan kontak Kantor Pusat (Bagian 10)
8. **Seluruh konten Artikel** — PDF sumber tidak memuat artikel/berita sama sekali (Bagian 11)
9. **Data ESG/Keberlanjutan formal:** sertifikasi, program CSR, data kuantitatif — PDF sumber tidak memuat data ini (Bagian 12)

---

## Bagian 14 — Lampiran: Ekstraksi Mentah Seluruh Teks PDF

*(Per halaman, sebagai pengaman referensi silang — pastikan tidak ada kalimat dari sumber yang tertinggal dari mapping di atas.)*

**Cover**
> COMPANY PROFILE — PT. ANIGOS JAYA PERKASA. Logo & brand: PETRO ANIGOS.

**Hal. 1 — Tentang Kami / Our Business**
> "Perusahaan kami sudah berpengalaman dalam distributor Bahan Bakar Industri Yang dibutuhkan diwilayah Indonesia. Khususnya Pulau Jawa, Pulau Sumatera dan Pulau Kalimantan. Perusahaan kami berdiri pada tanggal 18 juli 2019. Berdasarkan akta pendirian perusahaan Oleh Andi Ismawati Achmad, S.H. Dengan nomor: 11 dan Keputusan Menteri Hukum Dan Hak Asasi Manusia Republik Indonesia dengan nomor: AHU-0035830.Ah.01.01 tahun 2019. Perusahaan kami pemegang merek dagang 'Anigos Petro'. Perusahaan kami memiliki Lisensi Izin Niaga Umun (INU) dari Direktorat Jenderal Minyak dan Gas Bumi. Kode izin usaha: 05.Nw.03.25.00.153. Dan terdaftar di BPH Mingas dengan Kode Nomor Registrasi Usaha Niaga Minyak dan Gas Bumi No. 03/NRU/KABPH MIGAS/2020."

**Hal. 2 — Tujuan / Sasaran / Etika / Objektif / Nilai**
> "Tujuan Perusahaan Kami Adalah Untuk Menjadi Yang Terdepan Dalam Layanan Penyedia Secara Professional Untuk Distribusi Bahan Bakar Minyak. Kami Sudah Melayani Penyediaan Untuk Layanan Berskala Besar Dan Berskala Nasional. Kami Berusaha Untuk Menyediakan Layanan Kualitas Dan Kuantitas Yang Disesuaikan Untuk Memenuhi Kebutuhan Konsumen. SASARAN: Untuk Dikenal Sebagai Perusahaan Dagang Yang Terbaik Dalam Kemampuan Teknis, Saling Menghormati, Dan Berkomitmen Penuh Terhadap Kepuasan Konsumen. Etika: Kepatuhan Pada Etika Adalah Yang Utama Bagi Kami Dan Memikul Tanggung Jawab Masing-masing Pada Setiap Tanggung Jawab Yang Kami Lakukan. OBJEKTIF: Waktu Dan Keamanan Selalu Menjadi Prioritas Kami, Perusahaan Kami Selalu Mengutamakan Ketepatan Waktu Dan Bebas Dari Kecelakaaan Kerja. NILAI: Perusahaan Kami Beroperasi Pada Nilai-nilai Yang Kuat Meliputi Transparansi, Integritas, Keandalan Dan Profesionalisme. Hanya Produk Dan Layanan Berkualitas Tinggi Akan Ditangani Dengan Profesional."

**Hal. 3 — Visi & Misi**
> "VISI: Menjadi Perusahaan Nasional yang terpercaya dalam penyediaan berbagai layanan dengan orientasi dan efisiensi kerja yang mengedepankan kecepatan kerja dan profesioanlisme. MISI: PT. Anigos jaya Perkasa, ikut mengembangkan diri secara professional dalam tatanan yang beretika, Terbuka dan selalu mengacu pada inovasi berkesinambungan dalam usaha dan selalu menjaga hubungan Dengan rekan usaha, konsumen dan menjadi mitra pemerintah Republik Indonesia. Menjadikan iklim berbisnis yang sehat dan selalu menjadi jujungan konsumen didalam memberikan pelayanan yang terpadu dan memudahkan komsumen dalam memenuhi kebutuhan didalam dunia bisnis."

**Hal. 4 — Our Product**
> "Bahan Bakar Minyak dengan mutu dan spesifikasi Dirjen Migas RI. B40 Biosolar: Dengan mengikuti program pemerintah yang mewajibkan pencampuran 40% Biodiedel dengan 60% bahan bakar minyak jenis solar yang menghasilkan produk B40. Yang dikenal dengan merek dagang 'Petro Anigos'. Produk Berkualitas dengan Harga Bersaing."

**Hal. 5 — Fasilitas Penyimpanan**
> "PT. ANIGOS JAYA PERKASA dalam menjalankan usahanya ditunjang oleh fasilitas storage Bahan Bakar Minyak (HSD) kapasitas: 2.000 L." *(Foto kapal "Batam Marine I")*

**Hal. 6 — Armada Kami**
> "Armada tangki Bahan Bakar Minyak (HSD) kapasitas: 5.000 L, 8.000 L, 10.000 L, 16.000 L, 24.000 L, 30.000 L. Dengan variasi kapasitas angkutan tersebut akan mampu memberikan pelayanan terbaik dalam mendukung setiap kebutuhan konsumen."

**Hal. 7 — Transportir**
> "PT. ANIGOS JAYA PERKASA untuk mendukung kelancaran Pendistribusian Ke seluruh pelosok Indonesia, menjalin kerja sama dengan PT MASINTON NUSA PERKASA." Sertifikat Izin Usaha (dari gambar, sebagian teks terbatas keterbacaannya): Izin Usaha – Pengangkutan Minyak dan Gas Bumi; Jenis Kegiatan – Pengangkutan Bahan Bakar Minyak; Jangka Waktu Izin Usaha – berlaku selama 5 Tahun; Tanggal – 13 Jul 2020; diterbitkan oleh Kepala Badan Koordinasi Penanaman Modal.

**Hal. 8 — Kontak/Alamat**
> "PT. ANIGOS JAYA PERKASA. Head Office: Komplek Ruko Saung Bambu B3 JL. Lingkar Utara, Kota Bekasi 17122. Telp. 021-88383549/29253273. Email: anigospetro@gmail.com. Branch Palembang: Komplek Villa Gardena 3 Blok G No.2 Maskarebet, Sukaramai, Palembang. Branch Medan: Bajak V / Jl. Bahagia No. P.7 Kel. Harjosari II, Medan Amplas, Kota Medan 20147. Branch Kalimantan: Jl. Cilik Riwut Km.6 No. 132 Depan Batalyon Antang Palangka Raya. Branch Sulawesi: - Desa Puusuli, Kec Andowia, Kab. Konawe Utara, Sulawesi Tenggara. - Desa Tinompo, Kec Lembo, Kab. Morowali Utara, Sulawesi Tengah. Alamat kaki halaman: Komplek Ruko Saung Bambu B3, Jl. Lingkar Utara Kelurahan Perwira, Bekasi Utara - Kota Bekasi 17122. Telp. 021-88383549/29253273."

**Hal. 9 — Penutup**
> "Demikian Company Profile PT. Anigos Jaya Perkasa, kami sajikan dengan harapan dapat dijadikan sebagai pertimbangan dan referensi untuk dapat bekerjasama dalam bisnis yang terkait antara perusahaan ini dan pihak lain/client. Semoga Tuhan Yang Maha Esa memberikan perlindungan terhadap kita semua dan kami mitra partner yang handal dan terpercaya bersama membangun sukses bisnis dan ikut berkontribusi terhadap peningkatan taraf hidup, kesejahteraan masyarakat, bangsa dan Negara. Terima Kasih."

---

**Selesai.** Total halaman sumber PDF: 9 halaman — seluruhnya sudah dipetakan ke 11 halaman/route pada struktur folder `app/` milik kamu (Beranda, 4 sub-halaman Tentang Kami, 3 sub-halaman Produk, Jangkauan, Artikel, Keberlanjutan), dengan 9 area gap tercatat di Bagian 13 untuk ditindaklanjuti.
