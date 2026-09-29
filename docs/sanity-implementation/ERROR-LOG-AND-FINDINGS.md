# Error Log dan Temuan Teknis

Dokumen ini adalah catatan terpusat untuk error, warning, temuan investigasi, dan keputusan perbaikannya selama pembangunan frontend Petro Anigos dan Sanity Studio.

## Cara menggunakan log

- Tambahkan entri baru di bagian **Log kronologis**; jangan menghapus entri lama.
- Simpan pesan error penting secara verbatim dalam blok kode.
- Bedakan `Terbuka`, `Diperbaiki`, `Terverifikasi`, dan `Diterima` (warning non-blocking).
- Sertakan URL, file, command, atau langkah reproduksi jika tersedia.
- Jangan mencatat token, password, cookie, atau nilai environment secret.

## Ringkasan status

| ID | Area | Status | Ringkasan |
|---|---|---|---|
| ERR-001 | Sanity Structure Builder | Diperbaiki dan terverifikasi | `.disabled()` tidak tersedia pada `ListItemBuilder`. |
| ERR-002 | Hosted Studio routing | Diperbaiki dan terverifikasi | `basePath` `/studio` tidak cocok dengan route hosted Studio. |
| ERR-003 | Hosted Studio dynamic import | Diperbaiki dengan redeploy; perlu observasi | Browser meminta chunk lama yang sudah 404. |
| ERR-004 | Studio deployment discovery | Teratasi | Deployment awal gagal karena hostname belum ditentukan/non-interaktif. |
| ERR-005 | Vercel preview access | Diterima untuk preview | Deployment Protection mengarahkan browser yang belum login ke Vercel. |
| ERR-006 | Sanity color schema | Diperbaiki | Type `color` membutuhkan plugin yang belum terpasang. |
| ERR-007 | Sanity draft preview | Diperbaiki | Draft domain harus memakai `drafts.*` dan perspective `drafts`. |
| ERR-008 | Studio TypeScript | Terbuka, non-blocking | Ada technical debt legacy; build/deploy tetap berhasil. |
| WARN-001 | Hosted Studio Structure API | Terbuka, non-blocking | Custom document type list belum memberi `apiVersion`. |
| WARN-002 | Hosted Studio network | Terbuka, non-blocking | WebSocket/API request tertentu `ERR_ABORTED` atau 429. |
| WARN-003 | Next.js workspace | Terbuka, non-blocking | Ada lebih dari satu lockfile sehingga root Turbopack perlu diperjelas. |
| NM-001 | Night mode native controls | Diperbaiki | `color-scheme` global tidak mengikuti pilihan tema aplikasi. |
| NM-002 | Night mode pengajuan | Diperbaiki | Gradient literal `white` tetap terang di dark mode. |
| NM-007 | Night mode image gradient | Diperbaiki | Overlay berbasis `foreground` berubah menjadi wash putih di tema gelap. |
| NM-008 | Night mode dropdown divisi | Diperbaiki | Surface dan state aktif Select tidak cukup eksplisit pada tema gelap. |
| NM-009 | Night mode teks pada image overlay | Diperbaiki | `text-background` mengikuti token background gelap dan membuat teks di atas gradient foto menjadi hitam. |
| NM-010 | Warna CTA overlay tidak mengikuti Sanity | Diperbaiki | CTA foto memakai warna putih/hitam hardcoded sehingga token `primary` dan `primaryForeground` dari Site Settings terabaikan. |

## Log kronologis

### ERR-001 — `disabled is not a function`

- **Tanggal:** 2026-09-21
- **Area:** Sanity Structure Builder
- **Pesan:**

  ```text
  TypeError: t.listItem(...).title(...).id(...).disabled is not a function
  ```

- **Dampak:** Hosted Studio gagal merender pane structure.
- **Akar masalah:** API `ListItemBuilder` pada versi Sanity yang digunakan tidak menyediakan method `.disabled()`.
- **Perbaikan:** Menghapus pemanggilan `.disabled()` dan menggantinya dengan child component yang aman.
- **File terkait:** [`studio-anigos-project/structure.ts`](../../studio-anigos-project/structure.ts)
- **Verifikasi:** `npm run build`, schema deploy, dan hosted Studio berhasil dimuat tanpa error ini.
- **Status:** Diperbaiki dan terverifikasi.

### ERR-002 — `Studio not found` dan route `basePath` tidak cocok

- **Tanggal:** 2026-09-21
- **Area:** Hosted Sanity Studio
- **Pesan:**

  ```json
  {"statusCode":404,"error":"Not Found","message":"Studio not found"}
  ```

  ```text
  Unable to load studio
  Failed to fetch iframe URL.
  ```

- **Dampak:** Dashboard Sanity tidak dapat membuka iframe Studio.
- **Akar masalah:** Konfigurasi memakai `basePath: '/studio'`, sedangkan hosted application dibuka pada route deployment `/petro-anigos/`.
- **Perbaikan:** Mengubah konfigurasi menjadi:

  ```ts
  basePath: process.env.SANITY_STUDIO_BASE_PATH ?? '/',
  ```

- **File terkait:** [`studio-anigos-project/sanity.config.ts`](../../studio-anigos-project/sanity.config.ts)
- **Verifikasi:** Hosted Studio berhasil dideploy dan dimuat pada route hosted.
- **Status:** Diperbaiki dan terverifikasi.

### ERR-003 — Failed to fetch dynamic module `refractor`

- **Tanggal:** 2026-09-21
- **Area:** Hosted Sanity Studio / browser cache
- **Pesan:**

  ```text
  Uncaught error: Failed to fetch dynamically imported module:
  https://petro-anigos.sanity.studio/static/refractor-C0QrD4SL.js
  ```

- **Dampak:** Pane Studio yang membutuhkan modul tersebut gagal dimuat.
- **Temuan:** URL chunk yang diminta browser mengembalikan HTTP `404`. Ini menunjukkan HTML/manifest lama masih merujuk ke chunk dari deployment sebelumnya.
- **Perbaikan:** Hosted Studio dibuild dan dideploy ulang; sesi browser baru dengan cache-buster berhasil memuat Studio.
- **Langkah pemulihan operator:** Tutup tab Studio lama, buka `https://petro-anigos.sanity.studio/`, lalu hard refresh atau gunakan private window.
- **Status:** Diperbaiki dengan redeploy; tetap dicatat untuk observasi jika muncul lagi.

### ERR-004 — Deployment Sanity awal membutuhkan hostname

- **Tanggal:** 2026-09-21
- **Area:** Sanity deploy
- **Dampak:** Deployment awal tidak dapat berjalan non-interaktif karena hostname belum ditentukan.
- **Perbaikan:** Menetapkan hostname `petro-anigos`, kemudian deployment berhasil ke [`petro-anigos.sanity.studio`](https://petro-anigos.sanity.studio/).
- **Status:** Teratasi.

### ERR-005 — Vercel Preview meminta login

- **Tanggal:** 2026-09-21
- **Area:** Vercel Preview Deployment
- **Gejala:** Browser diarahkan ke halaman login Vercel saat membuka URL preview.
- **Akar masalah:** Deployment Protection aktif pada Preview.
- **Temuan:** Vercel CLI dapat mengakses deployment menggunakan bypass token yang dibuat oleh CLI. Build, TypeScript, dan response HTML aplikasi terverifikasi.
- **Status:** Diterima untuk preview; bukan error aplikasi.
- **Catatan:** Untuk test eksternal tanpa login, gunakan production deployment atau ubah Deployment Protection secara sadar.

### ERR-006 — Sanity schema type `color` tidak tersedia

- **Tanggal:** 2026-09-21
- **Area:** UI theme customization
- **Dampak:** Build Studio gagal ketika schema menggunakan type `color`.
- **Akar masalah:** Plugin color belum terpasang.
- **Perbaikan:** Token warna UI memakai field `string` dengan validasi HEX enam digit.
- **File terkait:** [`studio-anigos-project/schemaTypes/index.ts`](../../studio-anigos-project/schemaTypes/index.ts)
- **Status:** Diperbaiki; build Studio berhasil.

### ERR-007 — Draft domain tidak tampil pada preview

- **Tanggal:** 2026-09-21
- **Area:** Sanity Draft Mode dan seed development
- **Dampak:** Dokumen development dengan `isPublished: false` tidak tampil pada query canonical preview.
- **Akar masalah:** Query menyaring `isPublished != false`; dokumen regular dengan nilai `false` tidak dianggap sebagai draft Sanity.
- **Perbaikan:** Seed development menggunakan ID `drafts.*`, client preview memakai perspective `drafts`, dan preflight memakai perspective `raw`.
- **File terkait:** [`studio-anigos-project/scripts/seed-domain-development.mjs`](../../studio-anigos-project/scripts/seed-domain-development.mjs)
- **Status:** Diperbaiki dan diverifikasi.

### ERR-008 — Studio `tsc --noEmit` memiliki error legacy

- **Tanggal:** 2026-09-21
- **Area:** Studio TypeScript
- **Dampak:** `npx tsc --noEmit` melaporkan banyak error typing lama.
- **Temuan:** `sanity build`, schema deployment, dan hosted deployment tetap berhasil. Error tidak berasal dari perubahan `.disabled()` atau UI theme terbaru.
- **Keputusan:** Tidak dicampur dengan perbaikan operator-facing; perlu backlog cleanup terpisah.
- **Status:** Terbuka, non-blocking.

### WARN-001 — Custom document type list tanpa `apiVersion`

- **Tanggal:** 2026-09-21
- **Area:** Hosted Studio console
- **Pesan:**

  ```text
  No apiVersion specified for document type list with custom filter:
  `_type == $type && documentType == $kind`.
  ```

- **Dampak:** Warning kompatibilitas masa depan; tidak memblokir Studio saat ini.
- **Perbaikan yang direncanakan:** Tambahkan `apiVersion` eksplisit pada setiap custom filtered document type list di [`studio-anigos-project/structure.ts`](../../studio-anigos-project/structure.ts).
- **Status:** Terbuka, non-blocking.

### WARN-002 — WebSocket dan request Sanity `ERR_ABORTED` / 429

- **Tanggal:** 2026-09-21
- **Area:** Hosted Studio network
- **Gejala:**

  ```text
  WebSocket connection ... failed: WebSocket is closed before the connection is established.
  ```

  ```text
  requestFailed ... net::ERR_ABORTED
  ```

  Beberapa resource dashboard juga sempat merespons `429`.

- **Temuan:** Studio tetap dapat dimuat dan digunakan. Gejala dapat dipengaruhi throttling, lifecycle iframe/dashboard, koneksi browser, atau request yang dibatalkan saat route berubah.
- **Status:** Terbuka, non-blocking; perlu dicatat bila berubah menjadi kegagalan fungsi.

### WARN-003 — Next.js menemukan beberapa lockfile

- **Tanggal:** 2026-09-21
- **Area:** Frontend build
- **Pesan:**

  ```text
  Next.js inferred your workspace root, but it may not be correct.
  Detected additional lockfiles:
  ...\petro-anigos\package-lock.json
  ```

- **Dampak:** Warning build; saat ini build Vercel tetap berhasil.
- **Temuan:** Repository memiliki lockfile pada root project dan subfolder frontend.
- **Status:** Terbuka, non-blocking. Perlu keputusan struktur workspace sebelum menghapus atau memindahkan lockfile.

### NM-001/NM-002 — Audit night mode

- **Tanggal:** 2026-09-21
- **Area:** Frontend theme dan route pengajuan
- **Temuan:** Native browser controls memakai `color-scheme: light dark`, dan gradient halaman pengajuan memiliki warna literal `white`.
- **Dampak:** Kontrol native dapat tidak mengikuti pilihan tema; section pengajuan tetap terang saat dark mode.
- **Perbaikan:** `color-scheme` dipisah antara `:root` dan `.dark`; gradient menggunakan semantic CSS variables.
- **Dokumentasi:** [NIGHT-MODE-AUDIT-2026-09-21.md](./NIGHT-MODE-AUDIT-2026-09-21.md)
- **Status:** Diperbaiki; build/typecheck perlu dijalankan sebagai gate sebelum deploy.

### NM-007 — Gradient overlay gambar terbalik pada tema gelap

- **Tanggal:** 2026-09-21
- **Area:** Hero, feature image, product showcase, partnership showcase, dan kartu profil perusahaan
- **Temuan:** Overlay image memakai `var(--foreground)`/`from-foreground`; pada tema gelap foreground bernilai terang.
- **Dampak:** Gradient berubah menjadi wash putih dan menurunkan kontras teks putih di atas gambar.
- **Perbaikan:** Overlay foto memakai black gradient stabil; highlight kartu memakai semantic `var(--background)` dan shading memakai semantic foreground.
- **Dokumentasi:** [NIGHT-MODE-AUDIT-2026-09-21.md](./NIGHT-MODE-AUDIT-2026-09-21.md)
- **Status:** Diperbaiki; menunggu validasi visual light/dark.

### NM-008 — Dropdown divisi kurang kontras pada night mode

- **Tanggal:** 2026-09-21
- **Area:** Base UI Select pada halaman Struktur Perusahaan
- **Temuan:** Trigger dan item Select mengandalkan inheritance warna dan state `focus`, sehingga popup/item aktif dapat kurang kontras pada tema gelap.
- **Perbaikan:** Menetapkan semantic surface, foreground, border, dan `data-highlighted` state pada komponen Select.
- **Dokumentasi:** [NIGHT-MODE-AUDIT-2026-09-21.md](./NIGHT-MODE-AUDIT-2026-09-21.md)
- **Status:** Diperbaiki dan tervalidasi lewat build lokal.

### NM-009 — Teks overlay gambar menjadi hitam pada night mode

- **Tanggal:** 2026-09-21
- **Area:** Home Hero, section Tentang Kami, Page Hero, Product Showcase, dan Partnership Showcase
- **Temuan:** Gradient gambar sudah gelap dan terbaca, tetapi teks memakai `text-background`. Pada tema gelap, token `--background` bernilai gelap sehingga teks ikut menjadi hitam di atas foto.
- **Perbaikan:** Menggunakan warna kontras stabil untuk overlay foto (`text-white`, `text-white/70`, dan tombol `bg-white text-black`) tanpa mengubah token surface pada UI biasa.
- **File terkait:** [`components/sections/feature-image-section.tsx`](../../components/sections/feature-image-section.tsx), [`components/sections/home-hero.tsx`](../../components/sections/home-hero.tsx), [`components/sections/page-hero.tsx`](../../components/sections/page-hero.tsx), [`components/sections/product-showcase.tsx`](../../components/sections/product-showcase.tsx), [`components/sections/partnership-showcase.tsx`](../../components/sections/partnership-showcase.tsx)
- **Verifikasi:** `npm run typecheck` dan ESLint pada seluruh file terkait berhasil.
- **Status:** Diperbaiki; perlu visual acceptance light/dark.

### NM-010 — CTA overlay bertabrakan dengan warna branding Sanity

- **Tanggal:** 2026-09-21
- **Area:** Home Hero dan section Tentang Kami
- **Temuan:** CTA overlay menggunakan warna tetap `bg-white text-black`, sehingga perubahan warna tombol dari Sanity tidak diterapkan dan dapat berbenturan dengan media background.
- **Perbaikan:** CTA sekarang memakai `primary`/`primaryForeground` dari Site Settings Sanity, dengan border, ring, shadow, backdrop, dan state hover/focus yang menjaga pemisahan dari foto.
- **Validasi operator:** Schema Site Settings memberi warning bila pasangan `primary`/`primaryForeground` atau `accent`/`accentForeground` memiliki rasio kontras di bawah 4.5:1.
- **File terkait:** [`components/sections/home-hero.tsx`](../../components/sections/home-hero.tsx), [`components/sections/feature-image-section.tsx`](../../components/sections/feature-image-section.tsx), [`studio-anigos-project/schemaTypes/index.ts`](../../studio-anigos-project/schemaTypes/index.ts)
- **Status:** Diperbaiki; frontend build dan Studio build sedang diverifikasi.

## Temuan operasional dan data

| ID | Temuan | Dampak | Tindakan |
|---|---|---|---|
| FIND-001 | Mock asset diberi label `DEVELOPMENT MOCK - REPLACE BEFORE PUBLISH` | Mencegah mock dianggap aset produksi | Pertahankan sampai aset resmi tersedia. |
| FIND-002 | Tidak ada dokumen Legalitas terverifikasi dari folder public | Legalitas tidak boleh dipublikasikan otomatis | Tunggu file resmi dan approval content owner. |
| FIND-003 | Migration production dry-run menghasilkan `mutations: 0` | Aman; tidak ada perubahan otomatis | Pertahankan approval gate. |
| FIND-004 | Content validator terakhir memiliki warning asset kosong tetapi `errors: 0` | Konten belum siap tayang penuh | Lengkapi asset sesuai register validasi. |
| FIND-005 | UI theme hanya membuka token warna terbatas | Mencegah konflik layout, typography, dan accessibility | Jangan membuka custom CSS, spacing, radius, atau destructive token tanpa desain dan test baru. |
| FIND-006 | Home Hero video memakai durasi metadata browser | Slide video mengikuti durasi file aktual | Jika metadata gagal, timer menunggu; `onEnded` atau `onError` menangani transisi. |

## Template entri baru

```md
### ERR-XXX — Judul singkat

- **Tanggal:** YYYY-MM-DD
- **Area:** frontend / Sanity / Vercel / data / browser
- **Pesan:**

  ```text
  Salin pesan error penting di sini.
  ```

- **Dampak:**
- **Akar masalah atau hipotesis:**
- **Langkah reproduksi:**
- **Perbaikan:**
- **Verifikasi:**
- **Status:** Terbuka / Diperbaiki / Terverifikasi / Diterima
```
