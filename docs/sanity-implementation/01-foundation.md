---
document_type: implementation-phase
phase: 1
status: implemented
depends_on: []
primary_files:
  - ../../studio-anigos-project/sanity.config.ts
  - ../../studio-anigos-project/sanity.cli.ts
verify: npm run build
blocker: none
---

# Langkah 1 — Foundation Sanity

## Tujuan

Menyiapkan Studio Sanity yang dapat dijalankan lokal dan terhubung ke project/dataset yang benar.

## Prasyarat

- Node.js dan npm tersedia.
- Project Sanity sudah dibuat.
- User developer memiliki akses ke project.
- Token disimpan di environment lokal, bukan di source code.

## Konfigurasi yang diperlukan

Di `studio-anigos-project/sanity.cli.ts`:

```ts
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
})
```

Environment lokal:

```powershell
$env:SANITY_STUDIO_PROJECT_ID = "project-id"
$env:SANITY_STUDIO_DATASET = "production"
$env:SANITY_AUTH_TOKEN = "token-lokal"
```

Jangan commit token atau memasukkannya ke file TypeScript.

## Perintah

```powershell
Set-Location .\studio-anigos-project
npm install
npm run dev
```

Build:

```powershell
npm run build
```

## Kriteria selesai

- Studio terbuka pada `/studio`.
- Project ID dan dataset benar.
- `npm run build` berhasil.
- Tidak ada token dalam source atau output build.

## Catatan troubleshooting

Jika API memberikan:

```text
project user not found
```

token tidak terkait dengan user aktif pada project tersebut. Minta token baru dari user yang memiliki akses project, lalu ulangi perintah dengan environment baru.
