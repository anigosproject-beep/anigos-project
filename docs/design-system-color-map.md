# Mapping Warna Design System

Dokumen ini menjadi acuan penggunaan warna pada website Petro Anigos.
Palette saat ini tetap menggunakan preset neutral dari shadcn Base UI. Jangan
menambahkan warna brand langsung ke setiap halaman sebelum token brand resmi
ditetapkan.

## Prinsip utama

1. Gunakan semantic token Tailwind seperti `bg-background`,
   `text-foreground`, `bg-primary`, dan `text-muted-foreground`.
2. Hindari warna literal seperti `bg-[#...]` atau warna Tailwind spesifik
   seperti `bg-slate-950` untuk pola yang akan dipakai lintas halaman.
3. Warna gelap pada header/footer yang saat ini memakai `slate` adalah styling
   sementara. Saat refactor shared layout, pindahkan penggunaannya ke token
   semantic agar mudah diganti.
4. Komponen `components/ui` harus tetap memakai token shadcn yang sudah ada.
5. Perubahan palette di masa depan dipusatkan di `app/globals.css`, bukan di
   setiap page.

## Token shadcn yang tersedia

Token berikut sudah didefinisikan di `app/globals.css` untuk mode terang dan
gelap:

| Token semantic | Peran | Contoh penggunaan |
| --- | --- | --- |
| `background` | Latar utama halaman | `bg-background` |
| `foreground` | Teks utama di atas background | `text-foreground` |
| `card` | Latar surface/card | `bg-card` |
| `card-foreground` | Teks di dalam card | `text-card-foreground` |
| `popover` | Latar menu floating | `bg-popover` |
| `popover-foreground` | Teks menu floating | `text-popover-foreground` |
| `primary` | Aksi dan identitas utama | `bg-primary`, `text-primary` |
| `primary-foreground` | Teks di atas primary | `text-primary-foreground` |
| `secondary` | Aksi atau surface sekunder | `bg-secondary` |
| `secondary-foreground` | Teks di atas secondary | `text-secondary-foreground` |
| `muted` | Surface informasi pasif | `bg-muted` |
| `muted-foreground` | Teks sekunder | `text-muted-foreground` |
| `accent` | Hover atau penekanan ringan | `bg-accent` |
| `accent-foreground` | Teks di atas accent | `text-accent-foreground` |
| `border` | Border default | `border-border` |
| `input` | Border atau surface input | `border-input` |
| `ring` | Focus ring | `ring-ring` |
| `destructive` | Aksi/error berbahaya | `bg-destructive`, `text-destructive` |

## Mapping penerapan pada website

### Header

| Elemen | Token yang disarankan |
| --- | --- |
| Header solid | `bg-background` atau token brand surface setelah ditetapkan |
| Teks navigasi | `text-foreground` |
| Teks navigasi sekunder | `text-muted-foreground` |
| Hover menu | `bg-accent text-accent-foreground` |
| Menu aktif | `text-primary` atau `bg-accent` |
| Border header | `border-border` |
| CTA utama | `bg-primary text-primary-foreground` |
| CTA sekunder | `variant="outline"` atau `variant="secondary"` |
| Mobile sheet | `bg-background text-foreground` |

### Hero

| Elemen | Token yang disarankan |
| --- | --- |
| Hero terang | `bg-background text-foreground` |
| Hero kontras | `bg-primary text-primary-foreground` |
| Label eyebrow | `text-muted-foreground` atau `text-primary` |
| Deskripsi hero | `text-muted-foreground` |
| CTA utama | `bg-primary text-primary-foreground` |
| CTA alternatif | `variant="outline"` |

### Content section

| Elemen | Token yang disarankan |
| --- | --- |
| Section default | `bg-background` |
| Section alternatif | `bg-muted` |
| Heading | `text-foreground` |
| Deskripsi | `text-muted-foreground` |
| Card | `bg-card text-card-foreground` |
| Card border | `border-border` |
| Link | `text-primary` |
| Link hover | `text-primary` dengan underline atau opacity |
| Separator | `bg-border` |

### Footer

| Elemen | Token yang disarankan |
| --- | --- |
| Latar footer | `bg-primary text-primary-foreground` atau token footer khusus |
| Teks footer | `text-primary-foreground` |
| Teks sekunder footer | `text-primary-foreground/70` |
| Link footer | `text-primary-foreground/80` |
| Link hover | `text-primary-foreground` |
| Border footer | `border-primary-foreground/15` |
| CTA footer | `bg-primary-foreground text-primary` |

### Status dan data

| Kondisi | Komponen/token |
| --- | --- |
| Informasi netral | `Alert` variant default atau `bg-muted` |
| Status sekunder | `Badge` variant secondary |
| Status aktif/resmi | `Badge` variant default atau `bg-primary` |
| Error/peringatan kritis | `Alert`/`Badge` variant destructive |
| Loading | `Skeleton`, `Spinner`, `bg-muted` |
| Data kosong | `Empty` dengan `text-muted-foreground` |

## Rencana evolusi palette

Jika warna brand sudah disetujui, ubah nilai token semantic di `:root` dan
`.dark` pada `app/globals.css`. Komponen halaman tetap menggunakan nama token
yang sama.

Contoh arah perubahan masa depan:

```css
:root {
  --primary: <brand-primary>;
  --primary-foreground: <brand-primary-contrast>;
  --accent: <brand-accent>;
  --accent-foreground: <brand-accent-contrast>;
}
```

Jangan mengganti nama token `primary`, `accent`, atau `muted`. Yang diubah
adalah nilainya agar seluruh komponen shadcn dan wrapper internal ikut
menyesuaikan.

## Konvensi sebelum membuat komponen baru

Sebelum menulis class warna:

1. Cek apakah kebutuhan dapat dipenuhi dengan token semantic.
2. Pilih varian komponen shadcn terlebih dahulu.
3. Jika membutuhkan warna baru yang berulang, tambahkan token di
   `app/globals.css` dan dokumentasikan di file ini.
4. Jangan menyimpan warna brand sebagai class literal di banyak halaman.

