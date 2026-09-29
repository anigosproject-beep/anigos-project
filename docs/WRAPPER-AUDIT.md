# Wrapper Audit

Audit ini memetakan wrapper UI, composition wrapper, dan wrapper motion pada
frontend. Tujuannya adalah membedakan komposisi yang memang diperlukan dari
wrapper dekoratif yang dapat diringkas tanpa mengubah tampilan komponen inti.

## Kategori wrapper

| Kategori | Contoh | Keputusan |
| --- | --- | --- |
| Primitive Shadcn/Base UI | `Card`, `Table`, `ScrollArea`, `Tabs`, `Dialog`, `AspectRatio` | Pertahankan |
| Composition Shadcn | `Card > CardHeader > CardContent`, `Tabs > TabsList > TabsContent` | Pertahankan |
| Layout wrapper | `div.grid`, `div.flex`, `div.overflow-hidden` | Pertahankan hanya jika memiliki tanggung jawab layout |
| Domain wrapper | `PartnershipPdfPanel`, `PublicationCard`, `CareerApplicationForm` | Pertahankan; sederhanakan markup bila tanggung jawab bertumpuk |
| Typography wrapper | `SectionHeading`, `Heading`, `Text`, `Eyebrow` | Pertahankan sebagai standar semantik |
| Motion wrapper | `Reveal`, `ScrollFloat`, `AnimatePresence`, `motion.div` | Hindari nesting ganda pada elemen yang sama |
| Interaction wrapper | `Link > Card`, `Carousel > CarouselItem`, `Dialog > DialogContent` | Pertahankan bila dibutuhkan untuk aksesibilitas/interaksi |

## Topologi UI yang ditetapkan

Wrapper sekarang mengikuti urutan tanggung jawab berikut:

```text
Page
└── SectionShell          // batas section, warna, dan separator
    └── SectionContainer  // max-width dan horizontal padding
        └── Layout group  // grid, flex, atau stack sesuai kebutuhan
            └── Primitive UI / domain component
                └── Content
```

`SectionShell` dan `SectionContainer` berada di
[`components/layout/section-shell.tsx`](../components/layout/section-shell.tsx).
Keduanya adalah fondasi layout, bukan komponen visual baru:

- `SectionShell` hanya bertanggung jawab atas elemen `<section>`, separator,
  background, dan spacing vertikal.
- `SectionContainer` hanya bertanggung jawab atas lebar maksimum dan padding
  horizontal.
- Grid/flex lokal tetap berada di consumer karena setiap section memiliki
  topologi konten yang berbeda.

Dengan pola ini, section tidak lagi mengulang kombinasi `mx-auto`,
`max-w-7xl`, `px-6`, dan `lg:px-8` secara bebas.

## Primitive UI inventory

Primitive tersedia di `components/ui/`:

- `accordion`
- `alert`
- `alert-dialog`
- `aspect-ratio`
- `attachment`
- `avatar`
- `badge`
- `breadcrumb`
- `button`
- `button-group`
- `calendar`
- `carousel`
- `card`
- `checkbox`
- `collapsible`
- `combobox`
- `command`
- `context-menu`
- `dialog`
- `direction`
- `drawer`
- `dropdown-menu`
- `empty`
- `field`
- `hover-card`
- `input`
- `input-group`
- `input-otp`
- `item`
- `kbd`
- `label`
- `marker`
- `menubar`
- `message`
- `message-scroller`
- `native-select`
- `navigation-menu`
- `pagination`
- `popover`
- `progress`
- `questionnaire`
- `radio-group`
- `resizable`
- `select`
- `separator`
- `sheet`
- `sidebar`
- `skeleton`
- `slider`
- `spinner`
- `switch`
- `table`
- `tabs`
- `textarea`
- `toast`
- `toggle`
- `toggle-group`
- `tooltip`

File yang dipakai halaman tetap menjadi source of truth; inventory ini tidak
berarti semua primitive harus dipakai di setiap halaman.

## Tabs audit

[`components/ui/tabs.tsx`](../components/ui/tabs.tsx) sekarang menggunakan:

```text
Tabs        = styled TabsPrimitive.Root
TabsContent = styled TabsPrimitive.Panel
TabsList    = styled TabsPrimitive.List
TabsTrigger = styled TabsPrimitive.Tab
```

Semua wrapper mengikuti implementasi resmi Shadcn/Base UI: root memiliki
orientation dan layout default, content memiliki `flex-1 outline-none`, dan
List/Trigger membawa variant, state aktif, focus state, serta styling
orientation.

Consumer:

- [`app/tentang-kami/kemitraan/page.tsx`](../app/tentang-kami/kemitraan/page.tsx)
- [`app/tentang-kami/struktur-perusahaan/page.tsx`](../app/tentang-kami/struktur-perusahaan/page.tsx)
- [`app/produk/kenali-produk/page.tsx`](../app/produk/kenali-produk/page.tsx)

Tabs policy:

- Semua consumer mengimpor Tabs hanya dari
  [`components/ui/tabs.tsx`](../components/ui/tabs.tsx).
- `Tabs`, `TabsList`, `TabsTrigger`, dan `TabsContent` semuanya berasal dari
  satu adapter resmi di `components/ui/tabs.tsx`.
- Tidak ada class internal seperti `group/tabs` yang ditulis ulang oleh
  consumer; root Tabs memilikinya secara terpusat.
- Tidak ada implementasi Tabs kedua di `app/` atau `components/`; salinan di
  folder referensi dokumentasi tidak termasuk source runtime.
- Nested Tabs pada Struktur Perusahaan adalah dua state scope yang berbeda
  (struktur organisasi dan kategori divisi), bukan duplikasi wrapper visual.
- Seluruh consumer runtime saat ini memakai variant default Shadcn. Class
  `grid`, `flex`, dan `w-full` pada beberapa `TabsList` hanya mengatur
  kebutuhan layout konteks (misalnya tiga tab equal-width atau navigasi
  vertikal), bukan mengganti styling primitive Tabs.

## Wrapper berlapis yang teridentifikasi

### Kemitraan

File: [`app/tentang-kami/kemitraan/page.tsx`](../app/tentang-kami/kemitraan/page.tsx)

```text
Card
└── CardContent
    └── div.grid
        ├── Card size="sm"
        │   └── CardHeader + CardContent
        │       └── ScrollArea
        │           └── Table
        └── Card size="sm"
            └── CardHeader + CardContent
                └── Tabs
                    ├── TabsList + TabsTrigger
                    └── TabsContent
                        └── PartnershipPdfPanel
```

Status: composition valid, tetapi Card induk dan Card panel memiliki nesting
visual yang cukup dalam. Jangan menghapus Card induk tanpa keputusan desain,
karena Card induk saat ini mengikat master-detail sebagai satu unit.

### Preview PDF

`PartnershipPdfPanel` dan `PublicationCard` memiliki pola yang sama:

```text
CardContent
├── aspect-ratio preview
└── content column
    ├── Badge
    ├── title
    ├── Text
    └── download link
```

Status: logika render PDF.js sudah dieliminasi dari kedua wrapper domain dan
dipusatkan di [`components/pdf-thumbnail.tsx`](../components/pdf-thumbnail.tsx).
Komponen ini mengukur slot dengan `ResizeObserver`, merender halaman pertama
dengan device pixel ratio, dan menyediakan fallback ikon bila PDF gagal dimuat.
`PartnershipPdfPanel` dan `PublicationCard` sekarang hanya mengatur layout,
metadata, serta aksi download. Jangan mengembalikan preview ke iframe PDF
karena dev server dapat mengirim `X-Frame-Options: deny`.

### Article showcase

File: [`components/sections/article-showcase.tsx`](../components/sections/article-showcase.tsx)

```text
Reveal
└── ScrollFloat
    ├── AspectRatio
    └── Link
        └── Card
            ├── CardHeader
            └── CardContent
```

Status: sudah diringkas. `Reveal` menjadi satu-satunya motion wrapper untuk
kartu artikel; `ScrollFloat` dihapus karena tidak memberi tanggung jawab layout
dan sebelumnya menumpuk di dalam `Reveal`.

### Resource grid

File: [`components/sections/resource-grid.tsx`](../components/sections/resource-grid.tsx)

```text
Reveal
└── ScrollFloat
    └── AspectRatio
    └── Link
        └── Card
```

Status: sudah diringkas. `Reveal` menjadi satu-satunya motion wrapper untuk
setiap kartu resource. `ScrollFloat` hanya digunakan pada carousel interaktif,
bukan pada kartu statis.

### Partnership showcase homepage

File: [`components/sections/partnership-showcase.tsx`](../components/sections/partnership-showcase.tsx)

```text
ScrollFloat
└── Carousel
    └── CarouselItem
        └── AspectRatio
            └── image/pattern/gradient/content overlays

Reveal
└── AnimatePresence
    └── motion.div
        └── Card
```

Status: kompleksitas fungsional. Carousel dan AnimatePresence tidak boleh
dihapus sebagai bagian dari audit wrapper umum.

### Typography

File: [`components/typography/section-heading.tsx`](../components/typography/section-heading.tsx)

```text
SectionHeading
├── Reveal → Eyebrow
├── Reveal → Heading
└── Reveal → Text
```

Status: wrapper semantik yang valid, tetapi consumer tidak boleh menambahkan
motion wrapper tambahan pada setiap child-nya tanpa alasan khusus.

### Form career

File: [`components/career-application-form.tsx`](../components/career-application-form.tsx)

```text
CareerApplicationForm
└── Card
    ├── Field → Label/Input/helper
    ├── Attachment → Media/Content/Action
    └── CardFooter
```

Status: nesting diperlukan untuk field semantics, error state, dan upload
interaction. Tidak menjadi target refactor wrapper.

## Aturan refactor berikutnya

1. Jangan mengubah source primitive di `components/ui/` hanya untuk
   menghilangkan layout wrapper consumer.
2. Satu wrapper layout hanya boleh memiliki satu tanggung jawab: grid, flex,
   overflow, atau positioning.
3. Hindari `Reveal` dan `ScrollFloat` bersamaan pada blok yang sama kecuali
   perilakunya diuji secara visual.
4. Gunakan `AspectRatio` untuk media; jangan menambahkan wrapper ratio kedua.
5. Gunakan `CardHeader` dan `CardContent` sebagai spacing default; override
   hanya jika ada kebutuhan responsif yang jelas.
6. Untuk Tabs, gunakan komposisi langsung:

   ```text
   Tabs
   ├── TabsList
   │   └── TabsTrigger
   └── TabsContent
   ```

7. Domain wrapper seperti PDF preview boleh ada jika menggabungkan behavior
   domain, tetapi tidak boleh menduplikasi primitive UI yang sudah tersedia.
8. Section normal harus memakai `SectionShell > SectionContainer`; jangan
   membuat container lebar baru dengan class yang sama di setiap halaman.
9. Satu blok visual hanya boleh memakai satu motion wrapper. Pengecualian
   hanya untuk state transition internal seperti `AnimatePresence` pada isi
   carousel.
10. Wrapper positioning (`absolute`, `relative`, `overflow-hidden`) hanya
    boleh berada di komponen media/overlay yang memang membutuhkan stacking
    context, bukan pada container halaman.

## Prioritas refactor

| Prioritas | Area | Tindakan |
| --- | --- | --- |
| 1 | `PartnershipPdfPanel` | Pertahankan behavior PDF.js; samakan markup dengan `PublicationCard` |
| 2 | Kemitraan master-detail | Evaluasi Card induk vs dua Card panel melalui screenshot desktop/mobile |
| 3 | Article Showcase | Selesai: gunakan `Reveal` tunggal per blok kartu |
| 4 | Resource Grid | Selesai: gunakan `Reveal` tunggal per blok kartu |
| 5 | Partnership Showcase homepage | Biarkan sampai audit motion terpisah |
| 6 | Career form | Tidak perlu refactor wrapper |

## Kesimpulan

Tidak ada bukti bahwa seluruh wrapper project harus dihapus. Sebagian besar
adalah komposisi Shadcn yang benar. Masalah utama berada pada wrapper motion
ganda dan wrapper layout dekoratif yang tidak memiliki tanggung jawab tunggal.
Refactor aman harus dilakukan per area dan diverifikasi dengan typecheck, lint,
build, serta screenshot desktop/mobile. Fondasi section dan area motion statis
sudah dirapikan tanpa mengubah primitive UI atau kontrak data.

## Deep-clean status

Container halaman yang sebelumnya mengulang `mx-auto max-w-7xl` kini sudah
dikonsolidasikan pada:

- [`app/artikel/[slug]/page.tsx`](../app/artikel/%5Bslug%5D/page.tsx)
- [`app/kebijakan-data/page.tsx`](../app/kebijakan-data/page.tsx)
- [`app/ketentuan-cookies/page.tsx`](../app/ketentuan-cookies/page.tsx)
- [`app/produk/armada/page.tsx`](../app/produk/armada/page.tsx)
- [`app/produk/penawaran/page.tsx`](../app/produk/penawaran/page.tsx)

Wrapper yang masih dipertahankan secara sengaja:

- `Carousel`, `ScrollArea`, `Table`, `Dialog`, `Tabs`, dan `Attachment`
  karena membawa semantics atau interaksi.
- `Reveal`, `ScrollFloat`, dan `AnimatePresence` karena memiliki ownership
  motion yang berbeda; tidak boleh diratakan menjadi satu wrapper generik.
- `PublicationCard`, `PartnershipPdfPanel`, dan
  `CareerApplicationForm` karena merupakan domain composition, bukan layout
  dekoratif.

Aturan ownership motion:

1. `PageTransition` hanya mengatur perpindahan route.
2. `SectionMotion` hanya menjadi fallback untuk section tanpa `Reveal`.
3. `Reveal` mengatur entrance satu blok visual.
4. `ScrollFloat` hanya untuk gerak relatif terhadap scroll, terutama media
   carousel.
5. `AnimatePresence` hanya untuk pergantian state aktif, bukan entrance section.

## Overlap analysis dan keputusan eliminasi

Bagian ini menilai wrapper berdasarkan fungsi yang sama atau saling tumpang
tindih. Wrapper hanya dieliminasi jika tanggung jawabnya sudah dimiliki oleh
komponen yang lebih stabil dan penghapusan tidak mengurangi aksesibilitas,
behavior, atau kontrak visual.

| Wrapper yang dibandingkan | Tumpang tindih | Layak dieliminasi? | Keputusan |
| --- | --- | --- | --- |
| `PartnershipPdfPanel` vs `PublicationCard` | Keduanya memiliki slot rasio `3:4`, thumbnail PDF halaman pertama, badge, teks, dan tombol download | **Tidak sebagai komponen utuh** | Pertahankan `PublicationCard` sebagai referensi visual; ekstrak hanya primitive behavior `PdfThumbnail` ke shared component jika kebutuhan PDF bertambah |
| `Tabs` vs `TabsPrimitive.Root` | Adapter layout dan orientation resmi Shadcn | **Tidak** | Dipertahankan sebagai source styling tunggal |
| `TabsContent` vs `TabsPrimitive.Panel` | Adapter content resmi dengan `flex-1 outline-none` | **Tidak** | Dipertahankan sebagai source styling tunggal |
| `TabsList` / `TabsTrigger` vs Base UI primitive | Styling variant, active state, focus, dan orientation belum disediakan oleh primitive mentah | **Tidak** | Pertahankan wrapper styling Shadcn |
| `AspectRatio` vs `div` dengan `aspect-*` | Keduanya mengunci rasio media | **Tidak otomatis** | Gunakan `AspectRatio` untuk API media reusable; gunakan `div` aspect utility hanya untuk layout lokal sederhana |
| `Card` induk vs dua `Card size="sm"` pada Kemitraan | Sama-sama memberi border, radius, shadow, dan padding | **Bersyarat** | Card induk layak dihapus hanya jika master-detail tidak lagi diperlakukan sebagai satu unit; jangan hapus tanpa screenshot regression |
| `Reveal` vs `ScrollFloat` | Keduanya membungkus elemen untuk motion | **Tidak global** | Keduanya memiliki behavior berbeda; batasi maksimal satu per blok visual, eliminasi dilakukan per consumer |
| `SectionHeading` vs `Reveal + Heading + Text` manual | `SectionHeading` sudah menggabungkan typography dan reveal | **Ya pada consumer tertentu** | Hindari membungkus `SectionHeading` lagi dengan `Reveal`; gunakan API `SectionHeading` langsung |
| `Link > Card` vs Card dengan action internal | Keduanya dapat membuat seluruh card clickable | **Bersyarat** | Pertahankan `Link > Card` untuk card navigasi; gunakan action internal bila card memiliki beberapa aksi |
| `ScrollArea` vs `overflow-auto` | Sama-sama menyediakan scroll | **Tidak** | Pertahankan `ScrollArea` untuk scrollbar/accessibility konsisten; gunakan `overflow-auto` hanya untuk wrapper layout non-interaktif |
| `CardContent` sebagai wrapper spacing vs `div p-*` | Keduanya dapat memberi padding konten | **Tidak pada composition Card** | Pertahankan `CardContent`; wrapper `div` hanya untuk grid/flex yang memiliki tanggung jawab berbeda |
| `AnimatePresence > motion.div` vs `Reveal` | Sama-sama mengatur opacity/transform | **Tidak global** | `AnimatePresence` diperlukan untuk pergantian state; `Reveal` untuk entrance viewport. Jangan menumpuk keduanya pada node yang sama |

### Keputusan untuk area Kemitraan

Struktur berikut dinilai stabil dan tidak perlu dieliminasi:

```text
Card
└── CardContent
    └── div.grid              # hanya layout responsive
        ├── Card size="sm"    # panel daftar
        │   ├── CardHeader
        │   └── CardContent
        │       └── ScrollArea → Table
        └── Card size="sm"    # panel detail
            ├── CardHeader
            └── CardContent
                └── Tabs      # primitive root langsung
                    ├── TabsList → TabsTrigger
                    └── TabsContent → PartnershipPdfPanel
```

Wrapper yang tidak layak dihapus:

- `CardContent`: menjaga spacing composition Shadcn.
- `ScrollArea`: menjaga behavior daftar panjang dan scrollbar.
- `Table`: struktur semantik daftar perusahaan.
- `Tabs`: state dan accessibility tab.
- `PartnershipPdfPanel`: behavior PDF.js halaman pertama dan aksi download.

Wrapper yang layak disederhanakan bila muncul kembali:

- `div` yang hanya mengulang `border`, `rounded`, atau `p-*` tanpa tanggung
  jawab layout.
- Wrapper motion ganda pada panel yang sama.
- Wrapper PDF kedua yang menduplikasi `PublicationCard` tanpa behavior baru.

### Rekomendasi implementasi shared PDF

`PublicationCard` saat ini memiliki `PdfThumbnail` yang lebih matang daripada
implementasi lokal karena mengukur slot dengan `ResizeObserver`, menghitung
scale berdasarkan ukuran slot, dan mempertimbangkan device pixel ratio.

Rekomendasi aman:

1. Pindahkan `PdfThumbnail` menjadi component domain bersama, misalnya
   `components/pdf-thumbnail.tsx`.
2. Gunakan component itu di `PublicationCard` dan `PartnershipPdfPanel`.
3. Jangan memindahkan `Card` atau `CardContent` ke dalam `PdfThumbnail`; component
   tersebut hanya boleh bertanggung jawab atas render halaman PDF ke canvas.
4. Pertahankan wrapper layout masing-masing consumer karena ukuran dan metadata
   card publikasi serta kemitraan tidak identik.

Rekomendasi ini **layak dilakukan**, tetapi tidak wajib untuk stabilitas saat
ini. Prioritasnya medium karena duplikasi behavior PDF lebih berisiko daripada
duplikasi layout kecil.
