# Petro Anigos

Website corporate Petro Anigos dengan Next.js dan Sanity CMS.

## Sanity CMS

Studio aktif berada di `studio-anigos-project/` dan terhubung hanya ke project
`6zvti7ob`, dataset `production`. Project `wm8u3z2o` adalah project lama dan
bukan target untuk app, Studio aktif, seed, atau deployment. Referensi ke
project tersebut pada laporan bertanggal adalah catatan historis saja.

```bash
cd studio-anigos-project
npm run dev
```

Build Studio:

```bash
npm run build
```

Studio aktif telah dideploy ke <https://petro-anigos.sanity.studio/> pada
2 Oktober 2026, dan schema workspace `petro-anigos` terdaftar pada
`6zvti7ob/production`. Perlu login Sanity untuk membuka Studio. Untuk redeploy,
gunakan akun yang punya akses ke project aktif dan jangan gunakan `studio-clean/`
atau project lama.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```

# petro-anigos-project

# petro-anigos-project

## Sanity CMS

Sanity Studio aktif berada di `studio-anigos-project` dan terkunci ke:

- Project ID: `6zvti7ob`
- Dataset: `production`

`wm8u3z2o` adalah project lama; jangan gunakan sebagai target untuk operasi
Sanity saat ini. Nilai `SANITY_STUDIO_PROJECT_ID` atau `SANITY_STUDIO_DATASET`
yang tidak cocok dengan target aktif akan membuat konfigurasi gagal dengan
jelas.

Jalankan Studio:

```bash
cd studio-anigos-project
npm run dev
```

Untuk aplikasi Next.js, salin `.env.example` menjadi `.env.local` lalu isi
`NEXT_PUBLIC_SITE_URL` dengan `https://anigosjayaperkasa.com`. URL ini menjadi
basis metadata, sitemap, robots, dan identitas Organization terstruktur.
Production selalu menggunakan domain resmi tersebut; environment ini hanya
dapat mengganti URL pada development/preview. Domain produksi sudah memakai
HTTPS. Isi `SANITY_PREVIEW_SECRET` dengan nilai acak panjang yang sama pada
environment aplikasi Next.js dan
environment Studio saat memakai tombol preview. Project ID dan dataset Sanity
ditetapkan tetap ke target aktif.

Deploy Studio sebagai hosted Studio Sanity, bukan sebagai project Vercel kedua:

```bash
cd studio-anigos-project
npx sanity deploy --schema-required
```

Jalankan perintah deploy hanya setelah akun CLI memiliki akses ke `6zvti7ob`
dan App ID/hostname hosted Studio untuk project aktif sudah diverifikasi.

Website Next.js tetap dideploy ke Vercel. Jika `SANITY_PREVIEW_SECRET` belum
disetel di Studio, tombol preview tidak boleh dianggap sebagai preview draft;
endpoint aplikasi akan menolak request tanpa secret.

Studio mengelola schema `Newsroom Category` dan `Newsroom Article`. Client
read-only aplikasi berada di `lib/sanity-client.ts`, sedangkan adapter data
newsroom berada di `lib/sanity-newsroom.ts`. Data lokal tetap tersedia sebagai
fallback sampai dokumen pertama dipublikasikan di Sanity.

## Firebase roles

Firebase digunakan untuk data operasional, bukan untuk menggantikan Sanity:

- **Sanity**: newsroom, kategori artikel, dan konten editorial publik.
- **Firebase Authentication**: Google sign-in opsional untuk kandidat dan akun
  internal admin/recruiter.
- **Cloud Firestore**: data lamaran dan status proses rekrutmen.
- **Cloud Storage**: file CV dan dokumen pendukung; Firestore hanya menyimpan metadata
  dan referensi file.
- **Vercel**: menjalankan aplikasi Next.js dan endpoint server.

Kandidat dapat mengirim lamaran tanpa akun. Endpoint server akan memvalidasi data
dan menulis ke Firebase menggunakan Firebase Admin SDK. Akses dashboard internal
dibatasi oleh custom claim `role` dengan nilai `admin` atau `recruiter`.

Form lamaran juga mendukung Google sign-in opsional melalui Firebase
Authentication: profil mengisi nama/email dan endpoint memverifikasi Firebase ID
token serta kecocokan email sebelum menyimpan lamaran. Lamaran tanpa sign-in
tetap didukung. Untuk mengaktifkannya, aktifkan provider Google pada Firebase
Authentication, tambahkan `anigosjayaperkasa.com` pada Firebase Authentication

> Settings > Authorized domains, dan hubungkan domain ini ke deployment Vercel.
> Pastikan environment browser memiliki
> `NEXT_PUBLIC_FIREBASE_PROJECT_ID`,
> `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`,
> `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, dan `NEXT_PUBLIC_FIREBASE_APP_ID`.
> Firebase Admin server harus terhubung ke project yang sama. Menambah login
> recruiter/admin atau dashboard terproteksi adalah cakupan terpisah; SSO form
> kandidat ini tidak memberi akses internal.

Konfigurasi Firebase berada di `firebase.json`, `firestore.rules`, dan
`storage.rules`. Gunakan variabel `NEXT_PUBLIC_FIREBASE_*` untuk konfigurasi
browser dan `FIREBASE_ADMIN_*` hanya di environment server Vercel. Jangan
menaruh private key Admin SDK pada repository atau variabel `NEXT_PUBLIC_*`.
