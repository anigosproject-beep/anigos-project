# Development Workflow

## Frontend

Jalankan dari root aplikasi:

```bash
npm run dev
```

Frontend Next.js berjalan di:

```text
http://localhost:3000
```

Port `3000` ditetapkan eksplisit agar URL development konsisten dengan
integrasi API dan browser preview.

Untuk mengakses frontend dari perangkat lain pada jaringan yang sama:

```bash
npm run dev:lan
```

Gunakan alamat IP komputer development, misalnya
`http://192.168.1.10:3000`.

## Sanity Studio

Studio aktif dijalankan terpisah dari folder Studio kanonis:

```bash
cd studio-anigos-project
npm run dev
```

Sanity Studio memakai port development-nya sendiri (umumnya `3333`), sehingga
tidak berbenturan dengan frontend Next.js di `3000`.

## Validasi sebelum perubahan diteruskan

```bash
npm run typecheck
npm run lint
npm run check:content-contracts
npm run build
```

Jika mengubah schema Sanity, validasi juga dari folder Studio aktif dengan CLI
yang terpasang pada Studio tersebut:

```bash
cd studio-anigos-project
npm exec sanity -- schema validate
```
