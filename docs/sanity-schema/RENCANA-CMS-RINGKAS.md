# Rencana CMS Ringkas Petro Anigos

## Keputusan arsitektur

Frontend tetap mengendalikan layout, route, komponen, dan teks antarmuka.
Sanity hanya dipakai untuk konten yang perlu diubah editor atau membutuhkan
upload file. Payload tidak dipakai dan tidak ada konfigurasi Payload aktif di
repository ini.

## Konten dinamis

| Konten | Bentuk di Studio | Alasan |
| --- | --- | --- |
| Artikel | Artikel | Dapat bertambah dan berubah rutin |
| Publikasi | Upload Publikasi PDF | File, judul, kategori, tanggal, dan status tampil perlu dikelola editor |
| Dokumen legal | Upload Dokumen Legal PDF | Dokumen dapat diganti tanpa perubahan kode |
| Orang dan jabatan | Orang & Jabatan | Nama, foto, kelompok, dan jabatan dapat berubah |
| Lowongan | Lowongan | Hanya jika proses rekrutmen akan dikelola dari Sanity |

Produk, area layanan, hero, halaman korporat, navigasi, footer, dan teks UI tetap
hardcoded sampai ada kebutuhan operasional yang jelas untuk mengubahnya dari CMS.

## Alur upload dokumen

1. Buka **Artikel & Publikasi**.
2. Pilih **Upload Publikasi PDF** atau **Upload Dokumen Legal PDF**.
3. Unggah satu PDF.
4. Isi judul, keterangan, kategori, dan tanggal dokumen.
5. Aktifkan **Tampilkan di publikasi** hanya setelah dokumen diverifikasi.
6. Publish dokumen.

Dokumen tanpa file tidak boleh menghasilkan link publik. Website hanya membaca
dokumen yang sudah published, memiliki file, dan status tampil aktif.

## Alur orang dan jabatan

Editor hanya perlu mengisi:

- Nama
- Kelompok
- Jabatan
- Foto
- Deskripsi singkat
- Urutan
- Tampilkan di website

Kelompok menggantikan kombinasi rumit `structuralClass`, `division`, dan
`divisionRole` untuk data baru. Field legacy tetap dipertahankan secara tersembunyi
agar dokumen mock lama tidak rusak selama masa transisi.

## Tahap implementasi

1. Uji clean Studio dengan satu PDF publikasi dan satu anggota tim real.
2. Pastikan website membaca dokumen published dari Sanity.
3. Masukkan konten real secara bertahap; jangan hapus data mock sebelum inventaris.
4. Setelah data real diverifikasi, tandai Studio lama sebagai deprecated.
5. Hapus schema/query yang tidak dipakai hanya setelah tidak ada route yang
   membutuhkannya.

