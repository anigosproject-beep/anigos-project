---
document_type: agent-guide
project: petro-anigos
domain: sanity
audience: coding-agents
language: id-ID
status: active
---

# Agent Guide — Sanity Petro Anigos

## Cara memakai dokumentasi

Dokumen ini adalah indeks operasional untuk agent yang melanjutkan pekerjaan Sanity.

1. Baca `README.md`.
2. Baca fase yang sesuai dengan task.
3. Baca file aktual di `studio-anigos-project`.
4. Jangan menganggap contoh Markdown lebih baru daripada kode.
5. Jalankan validasi yang disebutkan di fase.
6. Perbarui status dan bukti verifikasi setelah perubahan.

## Root dan path penting

Root repository aktif:

```text
C:\Users\itbis\OneDrive\Documents\Project\petro-anigos-halaman-korporat\petro-anigos\petro-anigos
```

Studio:

```text
studio-anigos-project\
```

Dokumentasi:

```text
docs\sanity-implementation\
```

## Source of truth

| Kebutuhan | File |
|---|---|
| Schema Sanity | `studio-anigos-project/schemaTypes/index.ts` |
| Menu operator | `studio-anigos-project/structure.ts` |
| Konfigurasi Studio | `studio-anigos-project/sanity.config.ts` |
| Project dan dataset CLI | `studio-anigos-project/sanity.cli.ts` |
| Seed media | `studio-anigos-project/scripts/seed-media-slots.mjs` |
| Halaman frontend | `app/` |
| Query dan client frontend | `lib/` |
| Aturan agent umum | `AGENTS.md` |

## Perintah validasi

Jalankan dari `studio-anigos-project`:

```powershell
npm install
npm run build
```

Jalankan dry-run seed terlebih dahulu. Mutation hanya boleh dilakukan setelah
laporan dry-run direview:

```powershell
$env:SANITY_AUTH_TOKEN = "<token-lokal>"
npm run seed:media-slots:dry-run
npm run seed:media-slots:apply
```

Jangan menulis token ke file `.ts`, `.js`, `.md`, log, atau commit.

## Aturan perubahan

- Pertahankan stable ID media slot.
- Jangan mengganti nama `slotKey` tanpa migration dan perubahan query frontend.
- Jangan menambah field bebas jika kebutuhan dapat direpresentasikan dengan dropdown/reference.
- Gunakan error untuk data wajib dan warning untuk rekomendasi asset.
- Jangan menghapus dokumen hanya untuk menyembunyikannya dari website.
- Jangan menjalankan migration terhadap production tanpa dry-run atau backup.
- Jika token gagal, laporkan sebagai blocker; jangan mencoba menebak atau mencetak token.

## Checklist serah-terima

- [ ] Schema build berhasil.
- [ ] Tidak ada secret di diff/source.
- [ ] Dokumentasi fase diperbarui.
- [ ] Perintah verifikasi dicatat.
- [ ] Blocker akses atau deployment dicatat.
- [ ] Fase berikutnya disebutkan.
