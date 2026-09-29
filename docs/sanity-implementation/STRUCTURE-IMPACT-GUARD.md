# Structure Impact Guard

`npm run check:structure-impact` adalah pemeriksaan read-only untuk memberi
informasi aktual ketika file yang memengaruhi struktur CMS atau consumer
frontend berubah.

## Output

Command menghasilkan:

```text
docs/sanity-implementation/STRUCTURE-IMPACT-LATEST.json
```

Log tersebut berisi:

- waktu pemeriksaan;
- file yang berubah;
- surface yang terdampak;
- tingkat risiko;
- pemeriksaan wajib yang perlu dijalankan;
- file kontrak wajib yang hilang;
- status `review-required` atau `blocked`.

## Cara penggunaan

Pada repository Git, command membaca file yang berubah dari:

```text
git diff --name-only HEAD
```

Untuk lingkungan tanpa metadata Git, file dapat diberikan secara eksplisit:

```powershell
npm run check:structure-impact -- --file=lib/sanity-queries.ts --file=app/api/kemitraan/route.ts
```

Mode strict digunakan di CI atau gate rilis:

```powershell
node scripts/check-structure-impact.mjs --strict --file=lib/sanity-queries.ts
```

Mode strict gagal jika tidak ada file input atau kontrak wajib hilang.

## Interpretasi surface

| Surface | Dampak utama |
|---|---|
| `sanity-domain-model` | Schema Produk, Armada, Partner, dan halaman Kemitraan |
| `sanity-navigation` | Menu operator, registry, dan stable identity |
| `sanity-runtime-contract` | Query, client Draft Mode, dan TypeScript response |
| `partnership-runtime` | API dan UI Kemitraan |
| `product-runtime` | Halaman Produk dan Armada |
| `content-lake-validation` | Validasi published Content Lake |
| `documentation` | Dokumentasi blueprint dan milestone |

Guard ini tidak melakukan mutation Content Lake. Ia hanya memberi dampak dan
gate validasi sehingga perubahan dapat ditinjau sebelum diterapkan.
