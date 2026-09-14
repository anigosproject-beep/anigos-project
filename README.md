# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```
# petro-anigos-project
# petro-anigos-project

## Sanity CMS

Sanity Studio berada di `studio-anigos-project` dan terhubung ke:

- Project ID: `wm8u3z2o`
- Dataset: `production`

Jalankan Studio:

```bash
cd studio-anigos-project
npm run dev
```

Untuk aplikasi Next.js, salin `.env.example` menjadi `.env.local` lalu isi
`NEXT_PUBLIC_SITE_URL` dengan domain produksi. Project ID dan dataset Sanity
sudah memiliki fallback yang sesuai untuk development.

Studio mengelola schema `Newsroom Category` dan `Newsroom Article`. Client
read-only aplikasi berada di `lib/sanity-client.ts`, sedangkan adapter data
newsroom berada di `lib/sanity-newsroom.ts`. Data lokal tetap tersedia sebagai
fallback sampai dokumen pertama dipublikasikan di Sanity.

## Firebase roles

Firebase digunakan untuk data operasional, bukan untuk menggantikan Sanity:

- **Sanity**: newsroom, kategori artikel, dan konten editorial publik.
- **Firebase Authentication**: akun internal untuk admin dan recruiter.
- **Cloud Firestore**: data lamaran dan status proses rekrutmen.
- **Cloud Storage**: file CV dan dokumen pendukung; Firestore hanya menyimpan metadata
  dan referensi file.
- **Vercel**: menjalankan aplikasi Next.js dan endpoint server.

Kandidat dapat mengirim lamaran tanpa akun. Endpoint server akan memvalidasi data
dan menulis ke Firebase menggunakan Firebase Admin SDK. Akses dashboard internal
dibatasi oleh custom claim `role` dengan nilai `admin` atau `recruiter`.

Konfigurasi Firebase berada di `firebase.json`, `firestore.rules`, dan
`storage.rules`. Gunakan variabel `NEXT_PUBLIC_FIREBASE_*` untuk konfigurasi
browser dan `FIREBASE_ADMIN_*` hanya di environment server Vercel. Jangan
menaruh private key Admin SDK pada repository atau variabel `NEXT_PUBLIC_*`.
