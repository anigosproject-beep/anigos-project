# Motion Audit Phases

Dokumen ini menjadi checklist pengerjaan audit Framer Motion pada website Petro Anigos.

## Fase 1 — Perbaikan bug motion utama

Status: selesai

- [x] Memisahkan deteksi `isScrolled` header dari `prefers-reduced-motion`.
- [x] Membungkus pergantian weather ribbon dengan `AnimatePresence`.
- [x] Menghormati reduced motion pada animasi weather enter/exit.
- [x] Mencegah `SectionMotion` menganimasikan section yang sudah memiliki `Reveal`.
- [x] Membersihkan `opacity`, `transform`, dan `willChange` pada cleanup `SectionMotion`.
- [x] Menjalankan validasi runtime pada desktop, mobile, dan reduced motion.

## Fase 2 — Lifecycle dan page transition

Status: selesai

- [x] Menentukan `PageTransition` memakai entry/exit transition.
- [x] Menambahkan `exit` yang benar untuk `AnimatePresence mode="wait"`.
- [x] Uji navigasi client-side dan direct reload antar route.
- [x] Memastikan page transition tetap terpisah dari reveal section.

## Fase 3 — Optimasi dan accessibility

Status: selesai

- [x] Pastikan `ScrollFloat` tidak menerapkan transform saat reduced motion tanpa branching markup SSR/client.
- [x] Menghentikan rotasi weather dan menjadikan market ticker statis saat reduced motion aktif.
- [x] Menghapus `animationCycle` dan `requestAnimationFrame` dari `HomeHero` agar entry animation memakai satu lifecycle yang konsisten.
- [x] Memastikan animasi dekoratif utama mengikuti preferensi reduced motion.

## Fase 4 — Validasi menyeluruh

Status: selesai dengan catatan asset

- [x] Jalankan typecheck.
- [x] Jalankan lint.
- [x] Jalankan production build.
- [x] Uji header saat scroll naik/turun.
- [x] Uji perubahan weather dengan dan tanpa reduced motion.
- [x] Uji reveal section agar tidak double animation.
- [x] Uji carousel, hero slide, ticker, dan route transition.
- [x] Uji viewport mobile dan desktop.

Catatan:

- Tidak ada hydration error setelah struktur `ScrollFloat` dibuat konsisten antara SSR dan client.
- Pada reduced motion, `ScrollFloat` menghasilkan `transform: none`, ticker tidak bergerak, dan section tidak tertinggal hidden.
- Console browser masih melaporkan 404 untuk asset `/images/hero/home-*.webp` dan `/images/page-hero/tentang-kami.webp`. Ini bukan error Framer Motion, tetapi perlu ditangani sebagai backlog asset terpisah karena memengaruhi visual hero.

## Fase 5 — Konvensi dan dokumentasi

Status: pending

- [ ] Dokumentasikan kapan menggunakan `Reveal`.
- [ ] Dokumentasikan kapan menggunakan `ScrollFloat`.
- [ ] Dokumentasikan aturan `AnimatePresence` dan `exit`.
- [ ] Dokumentasikan aturan reduced motion.
- [ ] Dokumentasikan larangan global DOM mutation tanpa alasan yang jelas.

### Aturan CTA dengan ikon panah

- CTA berbasis `Button` memakai `data-icon="inline-end"` pada ikon panah.
- Pergerakan ikon diterapkan terpusat di `buttonVariants`; jangan menambahkan animasi width/gap per call site.
- Tombol outline memakai pola stroke/transparan saat idle lalu solid saat hover atau keyboard focus.
- Perubahan warna dan border tidak mengubah dimensi tombol, sehingga tidak menimbulkan layout jump.
- Link/card yang memakai `ArrowUpRight` bukan bagian dari primitive `Button` dan harus mempertahankan animasi lokalnya sendiri.

### Ownership entry animation

- Satu section memilih satu owner: `Reveal` eksplisit untuk container/card, atau `SectionMotion` untuk section yang tidak memiliki `Reveal`.
- `SectionMotion` hanya menganimasikan section sebagai satu container; ia tidak lagi memutasi atau menganimasikan child typography secara global.
- Child text hanya dipecah menjadi beberapa `Reveal` jika urutan visual tersebut memang dibutuhkan oleh komponen.
- `ScrollFloat` hanya digunakan untuk wrapper visual dan tidak menjadi owner entry text.
- Trigger entry mengikuti viewport aktif, bukan urutan section di DOM; setiap section memakai delay lokal yang sama saat masuk area viewport.

### Counter statistik

- Statistik numerik homepage memakai `CountUp` dengan durasi total yang sama untuk setiap target.
- Nilai dihitung dari 0 ke target menggunakan easing, sehingga angka kecil tidak selesai jauh lebih cepat daripada angka ribuan.
- Counter dimulai saat masuk viewport dan langsung menampilkan nilai akhir pada reduced motion.
