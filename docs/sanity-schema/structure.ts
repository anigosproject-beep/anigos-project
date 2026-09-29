import type {StructureBuilder, StructureResolver} from 'sanity/structure'

/**
 * Struktur menu Studio.
 *
 * Tujuannya satu: editor membuka Studio dan langsung melihat peta situs,
 * bukan daftar tipe dokumen. Urutan folder mengikuti urutan menu di website.
 */

/**
 * Dokumen tunggal — dibuka langsung, tanpa daftar dan tanpa tombol "buat baru".
 * `documentId` disamakan dengan nama tipe sehingga selalu ada tepat satu.
 */
function singleton(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .title(title)
    .id(type)
    .child(S.document().schemaType(type).documentId(type).title(title).views([S.view.form()]))
}

/** Koleksi biasa — daftar dokumen yang bisa ditambah dan dihapus. */
function collection(S: StructureBuilder, type: string, title: string) {
  return S.listItem()
    .title(title)
    .id(`list-${type}`)
    .child(S.documentTypeList(type).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Petro Anigos')
    .items([
      /* ---------------------------------------------------------- */
      S.listItem()
        .title('Pengaturan Situs')
        .id('settings')
        .child(
          S.list()
            .title('Pengaturan Situs')
            .items([
              singleton(S, 'siteSettings', 'Identitas & Kontak'),
              singleton(S, 'navigation', 'Navigasi'),
              singleton(S, 'footer', 'Footer'),
              singleton(S, 'cookieBanner', 'Banner Cookie'),
            ]),
        ),

      S.divider(),

      /* ---------------------------------------------------------- */
      singleton(S, 'homePage', 'Beranda'),

      S.listItem()
        .title('Jangkauan')
        .id('jangkauan')
        .child(
          S.list()
            .title('Jangkauan')
            .items([
              singleton(S, 'jangkauanPage', 'Halaman Jangkauan'),
              S.divider(),
              collection(S, 'coverageArea', 'Area Layanan'),
            ]),
        ),

      /* ---------------------------------------------------------- */
      S.listItem()
        .title('Keberlanjutan')
        .id('keberlanjutan')
        .child(
          S.list()
            .title('Keberlanjutan')
            .items([
              singleton(S, 'keberlanjutanPage', 'Halaman Utama'),
              S.divider(),
              singleton(S, 'energiBerkelanjutanPage', 'Energi Berkelanjutan'),
              singleton(S, 'kemitraanTataKelolaPage', 'Kemitraan & Tata Kelola'),
              singleton(S, 'keselamatanOperasionalPage', 'Keselamatan Operasional'),
            ]),
        ),

      /* ---------------------------------------------------------- */
      S.listItem()
        .title('Produk')
        .id('produk')
        .child(
          S.list()
            .title('Produk')
            .items([
              singleton(S, 'kenaliProdukPage', 'Kenali Produk'),
              singleton(S, 'armadaPage', 'Armada'),
              singleton(S, 'penawaranPage', 'Penawaran'),
              singleton(S, 'ajukanPenawaranPage', 'Form Ajukan Penawaran'),
              S.divider(),
              collection(S, 'product', 'Katalog Produk'),
              collection(S, 'fleetVariant', 'Varian Kapasitas Armada'),
            ]),
        ),

      /* ---------------------------------------------------------- */
      S.listItem()
        .title('Tentang Kami')
        .id('tentang-kami')
        .child(
          S.list()
            .title('Tentang Kami')
            .items([
              singleton(S, 'profilPerusahaanPage', 'Profil Perusahaan'),
              singleton(S, 'harapanCitaCitaPage', 'Harapan & Cita-Cita'),
              singleton(S, 'kemitraanPage', 'Kemitraan'),
              singleton(S, 'legalitasPage', 'Legalitas'),
              singleton(S, 'karirPage', 'Karir'),
              singleton(S, 'lamaranPage', 'Form Lamaran'),
              S.divider(),
              collection(S, 'jobOpening', 'Lowongan'),
              collection(S, 'legalDocument', 'Dokumen Legal'),
              collection(S, 'partnership', 'Mitra'),
            ]),
        ),

      /* ---------------------------------------------------------- */
      S.listItem()
        .title('Legal')
        .id('legal')
        .child(
          S.list()
            .title('Legal')
            .items([
              singleton(S, 'kebijakanDataPage', 'Kebijakan Data'),
              singleton(S, 'ketentuanCookiesPage', 'Ketentuan Cookies'),
            ]),
        ),
    ])
