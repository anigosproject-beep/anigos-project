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
