---
document_type: implementation-phase
phase: 7
status: planned
depends_on: [02-content-model, 04-media-slots]
primary_files:
  - ../../lib/
  - ../../app/
verify: npm run typecheck
---

# Langkah 7 — Integrasi Frontend Next.js

## Client

Buat client terpisah untuk production dan preview. Production membaca `published`; preview membaca `drafts` dengan `useCdn: false`.

## Query

Pisahkan query untuk Home, Artikel, Publikasi, Struktur, Media Slot, dan Site Settings.

Contoh query media:

```groq
*[_type == "mediaAsset" && slotKey == $slotKey && isActive != false][0].image
```

## Fallback

Jika asset Sanity kosong, gunakan fallback lokal atau tampilkan section tanpa gambar jika aman. Satu slot kosong tidak boleh mematikan seluruh halaman.

## Kriteria selesai

- Production hanya membaca published.
- Preview membaca draft.
- Response memiliki type dan null guard.
- Website tetap tampil saat satu slot belum diisi.

