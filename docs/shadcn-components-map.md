# Mapping Komponen shadcn Base UI

Dokumen ini adalah katalog komponen shadcn Base UI yang tersedia di project
Petro Anigos. Gunakan dokumen ini sebelum membangun halaman atau section baru
agar elemen UI menggunakan komponen yang sudah tersedia, bukan membuat ulang
primitive secara manual.

> Seluruh path di bawah ini relatif terhadap root project.
> Isi file komponen tidak diubah oleh dokumen ini.

## Aturan penggunaan

1. Cari kebutuhan UI di tabel sebelum membuat komponen baru.
2. Gunakan komponen dari `components/ui` sebagai primitive utama.
3. Gabungkan beberapa primitive melalui komponen section/page di luar folder
   `components/ui`.
4. Gunakan `cn` dari `lib/utils` untuk class tambahan.
5. Periksa API komponen terlebih dahulu karena project menggunakan shadcn
   Base UI, bukan preset Radix. Beberapa API seperti `asChild` tidak tersedia.
6. Untuk tooltip, gunakan `TooltipProvider` global yang sudah dipasang di
   `app/layout.tsx`.

## Navigasi dan struktur halaman

| Komponen | Fungsi | Path | Rekomendasi implementasi |
| --- | --- | --- | --- |
| Accordion | Konten buka/tutup dalam beberapa panel | `components/ui/accordion.tsx` | Submenu Tentang Kami/Produk versi mobile, FAQ, detail legalitas |
| Breadcrumb | Jejak navigasi halaman | `components/ui/breadcrumb.tsx` | Halaman Profil Perusahaan, Produk, Artikel, dan subhalaman |
| Menubar | Menu navigasi horizontal bertingkat | `components/ui/menubar.tsx` | Alternatif menu desktop jika dropdown perlu selalu terlihat |
| Navigation Menu | Navigasi utama dengan submenu dan panel | `components/ui/navigation-menu.tsx` | Header desktop untuk Tentang Kami dan Produk |
| Pagination | Navigasi antar halaman data | `components/ui/pagination.tsx` | Daftar artikel atau katalog produk yang memiliki banyak halaman |
| Sheet | Panel overlay dari sisi layar | `components/ui/sheet.tsx` | Menu mobile, filter produk, atau detail ringkas |
| Sidebar | Navigasi samping yang responsif | `components/ui/sidebar.tsx` | Dashboard internal, katalog produk, atau halaman dengan navigasi sekunder |
| Tabs | Perpindahan antar konten setara | `components/ui/tabs.tsx` | Profil/visi-misi, kategori produk, detail armada, laporan keberlanjutan |

## Tombol, aksi, dan feedback

| Komponen | Fungsi | Path | Rekomendasi implementasi |
| --- | --- | --- | --- |
| Button | Aksi utama atau sekunder | `components/ui/button.tsx` | CTA header, unduh dokumen, kirim inquiry, lihat detail |
| Button Group | Mengelompokkan beberapa aksi | `components/ui/button-group.tsx` | Aksi filter, pilihan tampilan, atau tombol prev/next |
| Toggle | Pilihan on/off tunggal | `components/ui/toggle.tsx` | Preferensi tampilan, mode ringkas, atau kontrol fitur |
| Toggle Group | Pilihan satu atau beberapa opsi | `components/ui/toggle-group.tsx` | Filter kategori produk, tipe armada, atau rentang layanan |
| Tooltip | Bantuan singkat saat hover/fokus | `components/ui/tooltip.tsx` | Menjelaskan ikon, status, atau istilah teknis |
| Spinner | Indikator proses berjalan | `components/ui/spinner.tsx` | Loading pengiriman form atau pemuatan data |
| Progress | Menampilkan tingkat kemajuan | `components/ui/progress.tsx` | Progress pengajuan, proses penawaran, atau indikator KPI |
| Alert | Pesan status di dalam halaman | `components/ui/alert.tsx` | Informasi legalitas, status penawaran, peringatan, atau sukses |
| Toast | Notifikasi sementara | `components/ui/toast.tsx` | Konfirmasi submit form, copy kontak, atau perubahan filter |
| Empty | State saat belum ada data | `components/ui/empty.tsx` | Belum ada artikel, produk, hasil pencarian, atau data armada |

## Form dan input

| Komponen | Fungsi | Path | Rekomendasi implementasi |
| --- | --- | --- | --- |
| Field | Wrapper field dengan label, deskripsi, dan error | `components/ui/field.tsx` | Semua form kontak, penawaran, kemitraan, dan karier |
| Label | Label aksesibel untuk input | `components/ui/label.tsx` | Dipakai bersama input primitive |
| Input | Input teks dasar | `components/ui/input.tsx` | Nama, email, nomor telepon, kata kunci pencarian |
| Textarea | Input teks multi-baris | `components/ui/textarea.tsx` | Pesan kontak, kebutuhan penawaran, deskripsi kemitraan |
| Input Group | Input dengan addon atau aksi terkait | `components/ui/input-group.tsx` | Input pencarian dengan ikon/aksi, nominal, URL, atau satuan |
| Input OTP | Input kode verifikasi | `components/ui/input-otp.tsx` | Verifikasi kontak atau alur autentikasi jika diperlukan |
| Checkbox | Pilihan boolean atau multi-pilihan | `components/ui/checkbox.tsx` | Persetujuan kebijakan, pilihan kebutuhan layanan |
| Radio Group | Memilih satu opsi dari beberapa pilihan | `components/ui/radio-group.tsx` | Jenis produk, metode kontak, atau jenis permintaan |
| Select | Dropdown pilihan terstruktur | `components/ui/select.tsx` | Provinsi, jenis produk, armada, kategori artikel |
| Native Select | Dropdown HTML native | `components/ui/native-select.tsx` | Form sederhana yang perlu kompatibilitas native/mobile |
| Combobox | Input pencarian dengan pilihan | `components/ui/combobox.tsx` | Pencarian lokasi, produk, pelanggan, atau kategori |
| Calendar | Pemilih tanggal | `components/ui/calendar.tsx` | Jadwal kunjungan, tanggal pengiriman, atau filter artikel |
| Slider | Memilih nilai/rentang secara visual | `components/ui/slider.tsx` | Kapasitas, rentang volume, atau filter numerik |
| Switch | Toggle dengan label yang jelas | `components/ui/switch.tsx` | Preferensi notifikasi atau opsi tambahan pada form |
| Questionnaire | Kumpulan pertanyaan terstruktur | `components/ui/questionnaire.tsx` | Kualifikasi kebutuhan calon pelanggan atau mitra |

## Overlay, dialog, dan menu kontekstual

| Komponen | Fungsi | Path | Rekomendasi implementasi |
| --- | --- | --- | --- |
| Dialog | Dialog modal umum | `components/ui/dialog.tsx` | Detail produk, detail armada, atau form inquiry singkat |
| Alert Dialog | Dialog konfirmasi berisiko | `components/ui/alert-dialog.tsx` | Konfirmasi pembatalan, penghapusan draft, atau tindakan penting |
| Drawer | Panel overlay dengan pola drawer | `components/ui/drawer.tsx` | Detail produk mobile atau ringkasan penawaran |
| Popover | Konten floating terkait trigger | `components/ui/popover.tsx` | Filter, date picker, informasi tambahan |
| Hover Card | Preview konten saat hover/fokus | `components/ui/hover-card.tsx` | Preview artikel, mitra, atau detail layanan |
| Dropdown Menu | Menu aksi atau pilihan | `components/ui/dropdown-menu.tsx` | Aksi artikel, pilihan bahasa, atau menu akun |
| Context Menu | Menu berdasarkan klik kanan | `components/ui/context-menu.tsx` | Kebutuhan aplikasi internal; tidak wajib untuk website publik |
| Sheet | Panel overlay yang dapat ditutup | `components/ui/sheet.tsx` | Filter, mobile navigation, dan detail cepat |

## Konten, data, dan presentasi

| Komponen | Fungsi | Path | Rekomendasi implementasi |
| --- | --- | --- | --- |
| Card | Container konten dengan struktur konsisten | `components/ui/card.tsx` | Kartu layanan, produk, artikel, armada, dan statistik |
| Item | Baris konten dengan slot visual dan metadata | `components/ui/item.tsx` | Daftar berita, kontak, fitur produk, atau timeline |
| Table | Data tabular | `components/ui/table.tsx` | Legalitas, spesifikasi armada, cakupan wilayah, atau perbandingan produk |
| Chart | Visualisasi data berbasis Recharts | `components/ui/chart.tsx` | KPI keberlanjutan, volume distribusi, dan statistik jangkauan |
| Badge | Label status atau kategori | `components/ui/badge.tsx` | Kategori artikel, status legalitas, tipe produk, status armada |
| Avatar | Representasi orang atau organisasi | `components/ui/avatar.tsx` | Tim manajemen, testimoni, atau profil mitra |
| Alert | Blok pesan informatif | `components/ui/alert.tsx` | Pengumuman, catatan penting, atau status layanan |
| Empty | Tampilan saat koleksi tidak memiliki data | `components/ui/empty.tsx` | Hasil pencarian kosong atau data belum diterbitkan |
| Separator | Pemisah visual atau semantik | `components/ui/separator.tsx` | Memisahkan blok navigasi, metadata, dan section |
| Aspect Ratio | Menjaga rasio media | `components/ui/aspect-ratio.tsx` | Thumbnail artikel, foto armada, banner, dan galeri |
| Marker | Penanda visual pada konten | `components/ui/marker.tsx` | Highlight statistik, lokasi, atau callout pada section |
| Message | Blok pesan percakapan atau komunikasi | `components/ui/message.tsx` | Riwayat inquiry atau komunikasi internal |
| Message Scroller | Area pesan yang dapat di-scroll | `components/ui/message-scroller.tsx` | Inbox atau percakapan pada aplikasi internal |
| Bubble | Bubble pesan atau reaksi | `components/ui/bubble.tsx` | Testimoni singkat, status komunikasi, atau UI chat |
| Attachment | Representasi file lampiran | `components/ui/attachment.tsx` | Lampiran legalitas, dokumen penawaran, atau berkas kemitraan |

## Layout, media, dan loading

| Komponen | Fungsi | Path | Rekomendasi implementasi |
| --- | --- | --- | --- |
| Carousel | Galeri atau konten geser | `components/ui/carousel.tsx` | Hero/banner, armada, produk unggulan, atau logo mitra |
| Scroll Area | Area dengan scroll terkontrol | `components/ui/scroll-area.tsx` | Daftar panjang, filter, atau panel navigasi |
| Resizable | Panel yang ukurannya dapat diubah | `components/ui/resizable.tsx` | Utamanya untuk tool internal atau workspace admin |
| Skeleton | Placeholder saat loading | `components/ui/skeleton.tsx` | Loading card artikel, produk, dan data dinamis |
| Aspect Ratio | Menjaga dimensi media tetap konsisten | `components/ui/aspect-ratio.tsx` | Semua media grid agar layout stabil |
| Direction | Menentukan arah layout LTR/RTL | `components/ui/direction.tsx` | Wrapper untuk kebutuhan arah konten khusus |
| Separator | Garis atau pemisah antar layout | `components/ui/separator.tsx` | Header, footer, daftar fitur, dan section |

## Komponen khusus dan pendukung

| Komponen | Fungsi | Path | Rekomendasi implementasi |
| --- | --- | --- | --- |
| Command | Palette pencarian dan command | `components/ui/command.tsx` | Pencarian global, quick navigation, atau pemilih produk |
| Kbd | Representasi tombol keyboard | `components/ui/kbd.tsx` | Dokumentasi shortcut atau bantuan penggunaan command |
| Avatar | Identitas visual pengguna/organisasi | `components/ui/avatar.tsx` | Profil tim, mitra, dan testimoni |
| Collapsible | Satu area konten yang dapat dibuka/tutup | `components/ui/collapsible.tsx` | Detail tambahan, spesifikasi ringkas, dan mobile content |
| Radio Group | Pilihan eksklusif | `components/ui/radio-group.tsx` | Pilihan tipe layanan atau preferensi kontak |
| Native Select | Select berbasis HTML native | `components/ui/native-select.tsx` | Form ringan dan aksesibilitas native |

## Mapping awal berdasarkan halaman project

### Beranda

- `Carousel` untuk hero atau showcase produk.
- `Button` untuk CTA seperti “Hubungi Kami” dan “Lihat Produk”.
- `Card` untuk ringkasan layanan dan keunggulan.
- `Badge` untuk kategori atau status layanan.
- `AspectRatio` untuk thumbnail visual.
- `Separator` untuk pembatas antar section.

### Tentang Kami

- `Breadcrumb` untuk seluruh subhalaman.
- `Tabs` untuk profil, visi-misi, nilai, dan sejarah.
- `Accordion` atau `Collapsible` untuk informasi tambahan di mobile.
- `Card` dan `Avatar` untuk struktur/tim perusahaan.
- `Table` untuk legalitas.
- `Attachment` untuk dokumen legal atau profil perusahaan.

### Produk

- `Card` untuk daftar produk.
- `Dialog` atau `Drawer` untuk detail produk.
- `Badge` untuk tipe dan status produk.
- `Carousel` untuk foto armada.
- `Table` untuk spesifikasi armada.
- `Select`, `Combobox`, `Toggle Group`, dan `Pagination` untuk filter katalog.
- `Form`, melalui `Field`, `Input`, `Select`, `Textarea`, dan `Button`, untuk
  penawaran.

### Jangkauan

- `Card` atau `Item` untuk daftar wilayah.
- `Select` atau `Combobox` untuk memilih provinsi/kota.
- `Tabs` untuk kategori area.
- `Marker` untuk callout lokasi.
- `Empty` untuk wilayah yang belum memiliki data.

### Artikel

- `Card` untuk daftar artikel.
- `AspectRatio` untuk gambar artikel.
- `Badge` untuk kategori.
- `Breadcrumb` untuk detail artikel.
- `Pagination` untuk daftar artikel.
- `Skeleton` saat artikel dimuat.
- `Empty` saat pencarian tidak menemukan hasil.
- `Command`, `Input`, atau `Combobox` untuk pencarian dan filter.

### Keberlanjutan

- `Card` untuk inisiatif dan target.
- `Chart` untuk KPI dan data dampak.
- `Progress` untuk target capaian.
- `Tabs` untuk area lingkungan, sosial, dan tata kelola.
- `Table` untuk metrik atau laporan.
- `Badge` untuk status target.

## Komponen yang sebaiknya tidak dipakai di halaman publik tanpa kebutuhan

Komponen berikut tersedia, tetapi lebih cocok untuk kebutuhan internal atau
interaksi kompleks. Jangan memasukkannya hanya karena tersedia:

- `Context Menu`
- `Resizable`
- `Message`
- `Message Scroller`
- `Bubble`
- `Questionnaire`
- `Command`
- `Sidebar`

Gunakan komponen tersebut hanya jika alur produk dan kebutuhan UX memang
memerlukannya.

## Daftar file yang tersedia

- `components/ui/accordion.tsx`
- `components/ui/alert.tsx`
- `components/ui/alert-dialog.tsx`
- `components/ui/aspect-ratio.tsx`
- `components/ui/attachment.tsx`
- `components/ui/avatar.tsx`
- `components/ui/badge.tsx`
- `components/ui/breadcrumb.tsx`
- `components/ui/bubble.tsx`
- `components/ui/button.tsx`
- `components/ui/button-group.tsx`
- `components/ui/calendar.tsx`
- `components/ui/card.tsx`
- `components/ui/carousel.tsx`
- `components/ui/chart.tsx`
- `components/ui/checkbox.tsx`
- `components/ui/collapsible.tsx`
- `components/ui/combobox.tsx`
- `components/ui/command.tsx`
- `components/ui/context-menu.tsx`
- `components/ui/dialog.tsx`
- `components/ui/direction.tsx`
- `components/ui/drawer.tsx`
- `components/ui/dropdown-menu.tsx`
- `components/ui/empty.tsx`
- `components/ui/field.tsx`
- `components/ui/hover-card.tsx`
- `components/ui/input.tsx`
- `components/ui/input-group.tsx`
- `components/ui/input-otp.tsx`
- `components/ui/item.tsx`
- `components/ui/kbd.tsx`
- `components/ui/label.tsx`
- `components/ui/marker.tsx`
- `components/ui/menubar.tsx`
- `components/ui/message.tsx`
- `components/ui/message-scroller.tsx`
- `components/ui/native-select.tsx`
- `components/ui/navigation-menu.tsx`
- `components/ui/pagination.tsx`
- `components/ui/popover.tsx`
- `components/ui/progress.tsx`
- `components/ui/questionnaire.tsx`
- `components/ui/radio-group.tsx`
- `components/ui/resizable.tsx`
- `components/ui/scroll-area.tsx`
- `components/ui/select.tsx`
- `components/ui/separator.tsx`
- `components/ui/sheet.tsx`
- `components/ui/sidebar.tsx`
- `components/ui/skeleton.tsx`
- `components/ui/slider.tsx`
- `components/ui/spinner.tsx`
- `components/ui/switch.tsx`
- `components/ui/table.tsx`
- `components/ui/tabs.tsx`
- `components/ui/textarea.tsx`
- `components/ui/toast.tsx`
- `components/ui/toggle.tsx`
- `components/ui/toggle-group.tsx`
- `components/ui/tooltip.tsx`

