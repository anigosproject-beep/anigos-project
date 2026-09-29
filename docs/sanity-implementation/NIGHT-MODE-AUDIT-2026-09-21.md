# Audit Night Mode — 2026-09-21

## Tujuan

Memastikan tema gelap bekerja konsisten pada layout global, navigasi, route konten, form, dialog, media, state interaksi, dan native browser controls tanpa membuat build gagal.

## Cakupan route

Audit statis dan build mencakup seluruh route aktif:

- Beranda
- Tentang Kami: profil perusahaan, harapan & cita-cita, struktur perusahaan, kemitraan, legalitas, karir, dan formulir lamaran
- Produk: kenali produk, armada, penawaran, dan formulir pengajuan
- Jangkauan
- Keberlanjutan dan seluruh subhalamannya
- Artikel, Anigos News, Publikasi, dan Landasan Informasi Publik
- Kebijakan data
- Ketentuan cookies
- Not found
- API route yang mengirim data ke UI

## Temuan dan perbaikan

### NM-001 — Native controls mengikuti OS, bukan tema aplikasi

- **Temuan:** `:root` menggunakan `color-scheme: light dark` walaupun pengguna memilih tema secara eksplisit melalui `ThemeProvider`.
- **Risiko:** Select, date input, scrollbar, dan kontrol native dapat tetap gelap ketika aplikasi dipilih light, atau tetap terang ketika aplikasi dipilih dark.
- **Perbaikan:** `:root` sekarang memakai `color-scheme: light`, sedangkan `.dark` memakai `color-scheme: dark`.
- **File:** [`app/globals.css`](../../app/globals.css)
- **Status:** Diperbaiki.

### NM-002 — Gradient formulir pengajuan tetap putih di dark mode

- **Temuan:** Section utama formulir memakai warna literal `white` pada gradient.
- **Risiko:** Bagian besar halaman tetap menyala dan kontras dengan card/input dark mode.
- **Perbaikan:** Gradient memakai `var(--background)` dan `var(--muted)`.
- **File:** [`app/produk/penawaran/ajukan/page.tsx`](../../app/produk/penawaran/ajukan/page.tsx)
- **Status:** Diperbaiki.

### NM-003 — Token UI global sudah memakai semantic variables

- **Audit:** Background, foreground, card, popover, primary, secondary, muted, accent, border, input, ring, destructive, sidebar, chart, dan radius tersedia sebagai token light/dark.
- **Status:** Lulus secara arsitektural.

### NM-004 — Komponen interaksi memakai token dark-aware

- **Audit:** Button, input, textarea, select, dialog, sheet, drawer, tabs, toast, tooltip, calendar, switch, slider, navigation menu, card, badge, dan progress memakai token semantic atau varian dark.
- **Status:** Lulus secara statis; tetap perlu acceptance test visual pada browser.

### NM-005 — Overlay media memakai warna hitam sebagai overlay, bukan surface

- **Temuan:** Kontrol video menggunakan `black/80` dan gradient hitam.
- **Penilaian:** Ini dipertahankan karena overlay video harus menjaga keterbacaan kontrol di atas frame media, bukan mengikuti surface halaman.
- **Status:** Diterima.

### NM-006 — Warna cuaca dan perubahan market adalah status visual

- **Temuan:** Warna `amber`, `sky`, `yellow`, `emerald`, dan `rose` digunakan pada ikon/status ribbon.
- **Penilaian:** Warna ini tetap terbaca pada background header gelap/transparan dan menyampaikan semantik status. Tidak diganti menjadi foreground generik.
- **Status:** Diterima; verifikasi kontras visual tetap diperlukan bila palette diganti.

### NM-007 — Gradient image memakai token foreground yang terbalik pada dark mode

- **Temuan:** Overlay pada Home Hero, Page Hero, Feature Image, dan Partnership Showcase menggunakan `var(--foreground)` atau utility `from-foreground`. Pada tema gelap, token tersebut terang sehingga overlay berubah menjadi wash putih di atas gambar.
- **Risiko:** Teks putih kehilangan kontras dan gambar terlihat terlalu terang saat night mode.
- **Perbaikan:** Overlay di atas gambar memakai black overlay yang stabil; gradient dekoratif pada kartu memakai `var(--background)` untuk highlight dan `var(--foreground)` untuk shading yang mengikuti surface.
- **File:** `components/sections/home-hero.tsx`, `components/sections/page-hero.tsx`, `components/sections/feature-image-section.tsx`, `components/sections/partnership-showcase.tsx`, `components/sections/product-showcase.tsx`, `app/tentang-kami/profil-perusahaan/page.tsx`.
- **Status:** Diperbaiki; perlu visual acceptance pada light/dark mode.

### NM-008 — Dropdown divisi tidak eksplisit pada surface night mode

- **Temuan:** Select trigger dan item divisi masih mengandalkan warna inheritance serta state `focus`; pada night mode popup dapat terlihat menyatu dengan surface atau item aktif kurang jelas.
- **Perbaikan:** Trigger memakai `bg-background`, `text-foreground`, dan `border-border`. Popup memakai `bg-popover`/`text-popover-foreground`, sedangkan item aktif memakai `data-highlighted:bg-accent` dan `data-highlighted:text-accent-foreground`.
- **File:** [`components/ui/select.tsx`](../../components/ui/select.tsx)
- **Status:** Diperbaiki; typecheck, lint target, dan production build lulus.

### NM-009 — Komponen typography menimpa warna teks overlay foto

- **Temuan:** `Text variant="lead"` dan `Eyebrow` memiliki warna default `text-muted-foreground`. Class warna putih biasa pada pemanggil tidak selalu menang karena urutan utility CSS, sehingga teks pada gradient foto dapat tetap gelap dalam night mode.
- **Perbaikan:** Pemanggil overlay foto memakai override eksplisit `!text-white/...`. Warna tombol di atas foto juga memakai pasangan kontras stabil `bg-white text-black`.
- **Area:** Home Hero, section Tentang Kami, dan Page Hero.
- **Status:** Diperbaiki; typecheck dan lint file terkait lulus.

### NM-010 — Foreground tombol perlu mengikuti luminance warna Sanity

- **Temuan:** Operator dapat memilih warna terang untuk `primary` atau `accent`, tetapi foreground yang tersimpan sebelumnya tetap dapat berupa warna terang sehingga teks tombol tidak terbaca.
- **Perbaikan:** Root layout menghitung kontras pasangan warna dan otomatis memilih foreground Sanity bila memenuhi rasio 4.5:1; bila tidak, sistem memilih hitam atau putih dengan kontras tertinggi.
- **Cakupan:** `primary`/`primaryForeground` dan `accent`/`accentForeground`.
- **Status:** Diperbaiki; validasi typecheck/build diperlukan setelah perubahan.

## Matriks token

| Area | Token utama | Dark mode |
|---|---|---|
| Page surface | `bg-background`, `text-foreground` | Tersedia |
| Card | `bg-card`, `text-card-foreground` | Tersedia |
| Popover/dialog | `bg-popover`, `text-popover-foreground` | Tersedia |
| Primary action | `bg-primary`, `text-primary-foreground` | Tersedia |
| Secondary action | `bg-secondary`, `text-secondary-foreground` | Tersedia |
| Muted content | `bg-muted`, `text-muted-foreground` | Tersedia |
| Borders/fields | `border-border`, `--input` | Tersedia |
| Focus | `ring-ring` | Tersedia |
| Error | `destructive` | Tersedia |
| Native controls | `color-scheme` | Diperbaiki |
| Media overlay | Dedicated black overlay | Diterima |

## Validasi build dan lint

Perintah yang wajib dijalankan setelah perubahan night mode:

```text
npm run typecheck
npm run lint
npm run build
```

Hasil perubahan 2026-09-21:

- TypeScript: lulus.
- ESLint: lulus untuk perubahan terkait.
- Build Next.js: lulus dan menghasilkan seluruh route aktif.
- Catatan lingkungan: port `3000` sudah digunakan proses lain, sehingga browser audit lokal harus dilakukan setelah proses tersebut dihentikan secara aman atau memakai port berbeda.

## Acceptance test visual operator

Checklist manual berikut harus dilakukan pada browser dengan tema dark:

- Header transparan di hero dan header solid setelah scroll.
- Menu desktop dan mobile.
- Toggle theme dan persistensi setelah reload.
- Hero gambar dan video.
- Semua card produk, armada, partner, artikel, publikasi, dan legalitas.
- Carousel dan popup gallery Armada.
- Dialog, sheet, drawer, toast, tooltip, tabs, calendar, slider, switch, dan select.
- Form penawaran dari field awal sampai error validation dan success state.
- PDF/publication preview.
- Footer, cookie consent, breadcrumb, pagination, dan empty state.
- Focus keyboard dan reduced motion.

## Batasan audit

Audit ini tidak mengubah token destructive, focus, chart, sidebar, typography, spacing, radius, atau layout melalui Sanity. Token tersebut tetap dikunci untuk mencegah operator membuat kombinasi warna yang tidak dapat dibaca atau merusak struktur UI.
