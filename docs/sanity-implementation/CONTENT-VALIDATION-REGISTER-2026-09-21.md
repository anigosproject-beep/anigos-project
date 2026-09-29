# Register Validasi Konten dan Fakta Bisnis

Tanggal: 21 September 2026  
Status: `ready-for-content-owner-review`

Dokumen ini menyelesaikan bagian yang dapat disiapkan secara sistematis untuk
poin 6. Status `verified` hanya boleh diberikan oleh content owner berdasarkan
dokumen resmi atau konfirmasi tertulis. Mock development tidak pernah menjadi
bukti verifikasi.

## Aturan status

| Status | Arti |
|---|---|
| `supported` | Ada dukungan langsung dari sumber referensi lokal, tetapi belum ada approval publish. |
| `needs-confirmation` | Ada indikasi sumber, tetapi perlu dikonfirmasi sebelum tayang. |
| `missing` | Data atau dokumen belum tersedia. |
| `verified` | Content owner sudah mengonfirmasi dan sumber approval tercatat. |
| `rejected` | Tidak boleh dipakai atau tidak didukung sumber. |

## A. Data yang sudah didukung sumber referensi

| Area | Data | Sumber | Status | Tindakan |
|---|---|---|---|---|
| Identitas | PT. Anigos Jaya Perkasa | `docs/company-reference/mapping-konten-website-anigos-jaya-perkasa.md`, Bagian 1 | `supported` | Konfirmasi ejaan legal final |
| Brand | Petro Anigos | Mapping, Bagian 1 | `supported` | Tetapkan penggunaan brand pada UI |
| Berdiri | 18 Juli 2019 | Mapping, Bagian 1 | `supported` | Konfirmasi |
| Produk | B40 Biosolar | Mapping, Bagian 7 | `supported` | Konfirmasi nama dan deskripsi |
| Produk | Solar / HSD Industri | Mapping, Bagian 1 dan 7 | `supported` | Konfirmasi nama dan deskripsi |
| Armada | 5.000, 8.000, 10.000, 16.000, 24.000, 30.000 liter | Mapping, Bagian 9 | `supported` | Konfirmasi daftar final |
| Mitra | PT Masinton Nusa Perkasa | Mapping, Bagian 1 dan 5 | `needs-confirmation` | Konfirmasi hubungan dan nama legal |
| Wilayah operasi | Jawa, Sumatera, Kalimantan; Sulawesi perlu diselaraskan | Mapping, Bagian 1 dan 10 | `needs-confirmation` | Tetapkan daftar wilayah final |
| Kantor pusat | Komplek Ruko Saung Bambu B3, Jl. Lingkar Utara, Kelurahan Perwira, Bekasi Utara, Kota Bekasi 17122 | Mapping, Bagian 1 | `supported` | Konfirmasi alamat aktif |
| Kontak pusat | 021-88383549, 021-29253273, anigospetro@gmail.com | Mapping, Bagian 1 | `needs-confirmation` | Uji dan konfirmasi kontak publik |
| Izin | INU Ditjen Migas, kode 05.Nw.03.25.00.153 | Mapping, Bagian 1 | `needs-confirmation` | Cocokkan dengan scan izin |
| Registrasi | BPH Migas No. 03/NRU/KABPH MIGAS/2020 | Mapping, Bagian 1 | `needs-confirmation` | Cocokkan dengan scan izin |

## B. Data yang wajib diminta sebelum publish

| Area | Data yang dibutuhkan | Bukti yang diminta | Status |
|---|---|---|---|
| Legalitas | Scan akta pendirian dan perubahan terakhir | PDF resmi / salinan berizin | `missing` |
| Legalitas | Scan SK Kemenkumham | PDF resmi | `missing` |
| Legalitas | Scan INU Ditjen Migas | PDF resmi | `missing` |
| Legalitas | Scan registrasi BPH Migas | PDF resmi | `missing` |
| Partner | Detail legal PT Masinton Nusa Perkasa | Profil/legal document dan approval tertulis | `missing` |
| Armada | Jumlah unit armada | Daftar armada atau konfirmasi operasional | `missing` |
| Armada | Foto resmi setiap varian | Asset asli dan owner asset | `missing` |
| Storage | Kapasitas storage yang disebut `2.000 L` | Dokumen teknis resmi | `needs-confirmation` |
| Komersial | Harga, MOQ, pembayaran, termin | Price list / kebijakan tertulis | `missing` |
| Cabang | Daftar alamat dan kontak cabang | Daftar cabang terbaru | `missing` |
| K3/ESG | Klaim K3, sertifikasi, ESG, CSR | Sertifikat, laporan, atau approval tertulis | `missing` |
| Publikasi | Daftar publikasi yang boleh ditayangkan | File final dan approval publikasi | `missing` |

## C. Keputusan yang perlu diisi content owner

Salin jawaban ke kolom `Keputusan` dan isi nama/tanggal approver.

| Pertanyaan | Keputusan | Approver | Tanggal |
|---|---|---|---|
| Apakah brand publik utama adalah `Petro Anigos`? | `pending` | `pending` | `pending` |
| Apakah enam kapasitas Armada Darat adalah daftar final? | `pending` | `pending` | `pending` |
| Apakah PT Masinton Nusa Perkasa boleh disebut sebagai mitra resmi? | `pending` | `pending` | `pending` |
| Apakah wilayah Sulawesi ikut ditampilkan? | `pending` | `pending` | `pending` |
| Apakah alamat, telepon, dan email pada mapping masih aktif? | `pending` | `pending` | `pending` |
| Apakah dokumen development di Sanity sudah diganti file resmi? | `pending` | `pending` | `pending` |

## D. Batas publish

Konten tidak boleh dipublish jika salah satu kondisi berikut masih benar:

- status item masih `pending`, `needs-confirmation`, atau `missing`;
- asset masih berlabel `DEVELOPMENT MOCK - REPLACE BEFORE PUBLISH`;
- dokumen legal belum memiliki file resmi;
- klaim partner belum memiliki approval;
- data storage `2.000 L` belum dikonfirmasi;
- fakta komersial diisi berdasarkan perkiraan;
- foto Armada belum dipastikan owner dan hak publikasinya.

## E. Paket yang perlu diberikan content owner

Untuk menyelesaikan review, content owner cukup menyerahkan:

1. daftar keputusan pada tabel C;
2. file legalitas resmi;
3. asset resmi Produk, Armada, dan Partner;
4. daftar kapasitas armada final;
5. detail legal partner;
6. daftar kontak dan cabang terbaru;
7. approval tertulis untuk konten yang boleh dipublikasikan.

Setelah paket tersedia, manifest dapat diperbarui item per item. Global
`approvalStatus` tidak diubah menjadi `approved` sebelum seluruh item dan asset
lulus review.
