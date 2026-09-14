export const locales = ["id", "en"] as const
export type Locale = (typeof locales)[number]

export const localeLabels: Record<Locale, string> = {
  id: "ID",
  en: "EN",
}

export const messages = {
  id: {
    home: "Beranda",
    about: "Tentang Kami",
    products: "Produk",
    reach: "Jangkauan",
    articles: "Artikel",
    sustainability: "Keberlanjutan",
    companyProfile: "Profil Perusahaan",
    hopes: "Harapan & Cita-Cita",
    structure: "Struktur Perusahaan",
    partnership: "Kemitraan",
    legality: "Legalitas",
    productsOverview: "Kenali Produk",
    offer: "Penawaran",
    fleet: "Armada",
    news: "Anigos News",
    publications: "Publikasi",
    publicInformation: "Landasan Informasi Publik",
    sustainableEnergy: "Energi Berkelanjutan",
    safety: "Keselamatan Operasional",
    governance: "Kemitraan & Tata Kelola",
    achievements: "Pencapaian Perusahaan",
    contact: "Hubungi Kami",
    mobileMenu: "Menu navigasi",
    mobileDescription: "Jelajahi informasi Petro Anigos.",
    language: "Bahasa",
    weather: "Cuaca",
    weatherBmkg: "Cuaca BMKG",
    marketDemo: "IDX / Migas · demo",
    cookieConsentLabel: "Persetujuan cookies",
    cookieTitle: "Kami menggunakan cookies",
    cookieDescription:
      "Cookies esensial membantu website bekerja dengan baik dan menyimpan pilihanmu. Saat ini kami tidak mengaktifkan cookie iklan atau analitik pihak ketiga.",
    cookieDetailsPrefix: "Baca",
    cookieDetailsSuffix: "untuk detail penggunaan dan pengaturan.",
    cookieNecessary: "Hanya yang diperlukan",
    cookieAcceptAll: "Terima semua",
    footerDescription:
      "Mitra terpercaya untuk solusi energi dan kebutuhan industri yang berkelanjutan.",
    footerCompany: "Perusahaan",
    footerInformation: "Informasi",
    footerOffer: "Ajukan Penawaran",
    heroLabel: "Hero utama Petro Anigos",
    heroSlideLabel: "Tampilkan slide",
    slideDurationLabel: "Durasi slide",
    heroProductEyebrow: "Produk Berkualitas",
    heroProductTitle: "Solusi energi yang sesuai dengan kebutuhan bisnis Anda.",
    heroProductDescription:
      "Produk dan layanan Petro Anigos dirancang untuk mendukung kebutuhan operasional dari berbagai skala.",
    heroProductAction: "Ajukan Penawaran",
    heroDistributionEyebrow: "Distribusi Terpercaya",
    heroDistributionTitle:
      "Dukungan armada untuk distribusi yang aman dan tepat waktu.",
    heroDistributionDescription:
      "Didukung pilihan kapasitas armada dan mitra transportir untuk menjangkau kebutuhan distribusi ant wilayah.",
    heroDistributionAction: "Lihat Armada",
    heroFutureEyebrow: "Bersama untuk Masa Depan",
    heroFutureTitle: "Membangun kemitraan energi yang berkelanjutan.",
    heroFutureDescription:
      "Kami terbuka untuk membangun hubungan bisnis yang profesional, transparan, dan saling menguntungkan.",
    heroFutureAction: "Jelajahi Kemitraan",
    heroPrimaryEyebrow: "Petro Anigos",
    heroPrimaryTitle:
      "Distributor bahan bakar industri terpercaya di Indonesia.",
    heroPrimaryDescription:
      "Melayani kebutuhan distribusi BBM berkualitas untuk kebutuhan industri dengan jangkauan operasional yang terus berkembang.",
    heroPrimaryAction: "Kenali Produk",
    aspirationsBadge: "Harapan & Cita-Cita",
    aspirationsTitle: "Distribusi Hari Ini, Kontribusi untuk Negeri",
    aspirationsDescription:
      "PT. Anigos Jaya Perkasa memandang distribusi Bahan Bakar Minyak bukan sekadar aktivitas niaga, melainkan bagian dari perjalanan untuk menggerakkan roda industri dan kehidupan masyarakat di seluruh penjuru Indonesia. Melalui brand Petro Anigos, kami menghadirkan layanan distribusi yang mengutamakan kualitas, ketepatan waktu, keselamatan kerja, dan keandalan bagi setiap konsumen serta mitra usaha.",
    aspirationsSecondaryDescription:
      "Sejak berdiri pada 18 Juli 2019, kami terus mengembangkan diri secara profesional dengan menjaga hubungan baik, menjunjung transparansi dan integritas, serta membuka ruang bagi kemitraan yang sehat. Kami percaya bahwa keberhasilan distribusi energi tidak hanya diukur dari berapa liter yang terkirim, tetapi juga dari seberapa besar kontribusi yang tercipta bagi peningkatan taraf hidup dan kesejahteraan masyarakat, bangsa, dan negara.",
    aspirationsAction: "Baca Harapan Kami",
    companyProfileAction: "Profil Perusahaan",
    aboutEyebrow: "Mengenal Petro Anigos",
    aboutTitle: "Tentang Kami",
    aboutDescription:
      "PT. Anigos Jaya Perkasa melalui brand Petro Anigos hadir sebagai distributor Bahan Bakar Industri yang mengutamakan kualitas, profesionalisme, dan keandalan untuk mendukung kebutuhan industri di Indonesia.",
    aboutAction: "Selengkapnya",
    organizationAction: "Struktur Organisasi",
    achievementsBadge: "Pencapaian Perusahaan",
    achievementsCardTitle:
      "Fondasi yang tumbuh bersama kebutuhan energi Indonesia.",
    achievementsTitle:
      "Berpengalaman, menjangkau lebih luas, dan siap melayani.",
    achievementsDescription:
      "Sejak berdiri pada 18 Juli 2019, PT. Anigos Jaya Perkasa terus membangun fondasi distribusi Bahan Bakar Industri yang profesional dan terpercaya. Perjalanan ini tercermin dari jaringan operasional yang menjangkau berbagai wilayah serta pilihan kapasitas armada yang disiapkan untuk mendukung kebutuhan konsumen dari berbagai skala.",
    learnMoreAction: "Lihat Selengkapnya",
    establishedSince: "Berdiri sejak",
    establishedDescription:
      "Tahun berdirinya PT. Anigos Jaya Perkasa berdasarkan akta pendirian perusahaan.",
    branchNetwork: "Jaringan cabang",
    point: "titik",
    branchDescription:
      "Titik cabang yang tercantum dalam company profile di Sumatera, Kalimantan, dan Sulawesi.",
    fleetCapacity: "Variasi kapasitas armada",
    choice: "pilihan",
    fleetDescription:
      "Kapasitas tangki mulai dari 5.000 L hingga 30.000 L untuk mendukung kebutuhan distribusi.",
    aboutSectionLabel: "Tentang Kami",
    aspirationsPageTitle: "Harapan & Cita-Cita Perusahaan",
    aspirationsPageDescription: "Distribusi Hari Ini, Kontribusi untuk Negeri",
    aspirationsPageEyebrow: "Distribusi Hari Ini, Kontribusi untuk Negeri",
    aspirationsPageIntroTitle: "Energi yang bergerak, harapan yang tumbuh.",
    aspirationsPageIntroDescription:
      "Mendistribusikan Bahan Bakar Minyak adalah bagian dari perjalanan kami untuk turut menggerakkan roda industri dan kehidupan masyarakat di seluruh penjuru Indonesia.",
    aspirationsPageBody:
      "Setiap tetes bahan bakar yang kami distribusikan kami harapkan dapat menyalakan mesin-mesin industri, menghidupkan roda ekonomi daerah, dan sampai tepat waktu ke tangan yang membutuhkannya — dari Jawa, Sumatera, Kalimantan, hingga Sulawesi.",
    aspirationsPageSecondaryBody:
      "Kami juga berharap dapat terus dilindungi dan diberi kelancaran dalam setiap langkah usaha, sehingga kepercayaan yang diberikan oleh para mitra dan konsumen dapat kami jaga dengan sebaik-baiknya.",
    aspirationsCompanyEyebrow: "Cita-Cita Perusahaan",
    aspirationsCompanyTitle: "Menjadi perusahaan nasional yang terpercaya.",
    aspirationsCompanyLead:
      "Cita-cita kami sederhana namun besar maknanya: dikenal bukan hanya karena kemampuan teknis dan jangkauan distribusi, tetapi juga karena integritas, transparansi, dan komitmen kepada setiap pihak yang bekerja sama dengan kami.",
    aspirationsCompanyBody:
      "Kami ingin terus mengembangkan diri secara profesional, terbuka terhadap inovasi berkelanjutan, dan menjadi bagian dari ekosistem energi yang sehat.",
    aspirationsStandardTitle: "Standar yang kami perjuangkan",
    aspirationsStandardDescription:
      "Pelayanan yang cepat, aman, dan tepat waktu menjadi standar, bukan pengecualian.",
    aspirationsCommitmentEyebrow: "Komitmen Kami Mewujudkannya",
    aspirationsCommitmentTitle:
      "Harapan dijalankan melalui hal-hal yang konsisten.",
    aspirationsCommitmentDescription:
      "Nilai yang kami pegang setiap hari menjadi cara kami menjaga kepercayaan dan mewujudkan cita-cita perusahaan.",
    aspirationsTodayTitle: "Hari ini, dan seterusnya.",
    aspirationsTodayDescription:
      "Kami percaya keberhasilan perusahaan distribusi energi tidak hanya diukur dari berapa liter yang terkirim, tetapi dari seberapa besar ia turut berkontribusi terhadap peningkatan taraf hidup dan kesejahteraan masyarakat, bangsa, dan negara.",
    aspirationsTodaySecondary:
      "Itulah harapan yang terus kami jaga, dan cita-cita yang terus kami perjuangkan.",
    knowOurCompany: "Kenali Perusahaan Kami",
    commitmentLongTermTitle: "Hubungan jangka panjang",
    commitmentLongTermDescription:
      "Menjaga hubungan baik dengan rekan usaha dan konsumen sebagai fondasi kerja sama jangka panjang.",
    commitmentSafeTitle: "Tepat waktu dan aman",
    commitmentSafeDescription:
      "Mengutamakan ketepatan waktu dan keselamatan kerja di setiap titik distribusi.",
    commitmentTransparentTitle: "Transparan dan profesional",
    commitmentTransparentDescription:
      "Menjunjung transparansi dan profesionalisme tanpa kompromi pada kualitas.",
    commitmentPartnershipTitle: "Terbuka pada kemitraan",
    commitmentPartnershipDescription:
      "Membuka peluang kemitraan, termasuk dengan Pemerintah Republik Indonesia, demi iklim bisnis yang sehat.",
    profilePageTitle: "Profil Perusahaan",
    profilePageDescription:
      "Mengenal PT. Anigos Jaya Perkasa dan Petro Anigos sebagai distributor Bahan Bakar Industri untuk kebutuhan konsumen di Indonesia.",
    profileIntroTitle:
      "Membangun layanan distribusi energi dengan fondasi yang terpercaya.",
    profileIntroDescription:
      "Petro Anigos adalah brand PT. Anigos Jaya Perkasa, perusahaan yang bergerak sebagai distributor Bahan Bakar Industri.",
    profileExperience:
      "PT. Anigos Jaya Perkasa telah berpengalaman dalam menyediakan Bahan Bakar Industri untuk kebutuhan di wilayah Indonesia, khususnya Pulau Jawa, Sumatera, dan Kalimantan.",
    profileLegalHistory:
      "Perusahaan berdiri pada 18 Juli 2019 berdasarkan Akta Pendirian Nomor 11 oleh Notaris Andi Ismawati Achmad, S.H. Perusahaan juga telah memperoleh pengesahan melalui Keputusan Menteri Hukum dan Hak Asasi Manusia Republik Indonesia Nomor AHU-0035830.Ah.01.01 Tahun 2019.",
    profileProductStandard:
      "Dalam menjalankan kegiatan usahanya, perusahaan memegang merek dagang Petro Anigos dan menyediakan BBM dengan mutu serta spesifikasi yang mengacu pada Ditjen Migas RI.",
    profileLegalDetailAction: "Lihat detail legalitas",
    companyJourneyEyebrow: "Perjalanan Perusahaan",
    companyJourneyTitle:
      "Berawal dari fondasi yang terpercaya, tumbuh untuk melayani lebih luas.",
    companyJourneyDescription:
      "PT. Anigos Jaya Perkasa berdiri pada 18 Juli 2019 berdasarkan Akta Pendirian Nomor 11. Sejak itu, perusahaan mengembangkan layanan distribusi Bahan Bakar Industri dengan dasar legalitas yang jelas, dukungan jaringan operasional, armada berbagai kapasitas, dan kemitraan transportir untuk mendukung kebutuhan konsumen di berbagai wilayah Indonesia.",
    companyPurposeEyebrow: "Tujuan Perusahaan",
    companyPurposeTitle:
      "Menjadi penyedia distribusi BBM yang profesional dan dapat diandalkan.",
    companyPurposeQuote:
      "Kami berusaha menyediakan layanan dengan kualitas dan kuantitas yang disesuaikan untuk memenuhi kebutuhan konsumen.",
    companyPurposeCaption:
      "Melayani kebutuhan berskala besar hingga berskala nasional.",
    principlesEyebrow: "Prinsip Kami",
    principlesTitle: "Nilai yang menjadi cara kami bekerja.",
    principlesDescription:
      "Empat prinsip ini dirangkum dari sasaran, etika, objektif, dan nilai perusahaan dalam company profile.",
    principleGoalTitle: "Sasaran",
    principleGoalDescription:
      "Dikenal sebagai perusahaan dagang dengan kemampuan teknis terbaik, saling menghormati, dan berkomitmen penuh terhadap kepuasan konsumen.",
    principleEthicsTitle: "Etika",
    principleEthicsDescription:
      "Menempatkan kepatuhan pada etika dan tanggung jawab sebagai dasar dalam setiap pekerjaan yang dilakukan.",
    principleObjectiveTitle: "Objektif",
    principleObjectiveDescription:
      "Mengutamakan ketepatan waktu dan keamanan, dengan komitmen terhadap operasional yang bebas dari kecelakaan kerja.",
    principleValueTitle: "Nilai",
    principleValueDescription:
      "Menjalankan usaha dengan transparansi, integritas, keandalan, dan profesionalisme untuk menangani produk serta layanan berkualitas tinggi.",
    visionLabel: "Visi",
    visionTitle: "Menjadi Perusahaan Nasional yang terpercaya.",
    visionDescription:
      "Menjadi perusahaan nasional yang terpercaya dalam penyediaan berbagai layanan dengan orientasi dan efisiensi kerja yang mengedepankan kecepatan kerja dan profesionalisme.",
    missionLabel: "Misi",
    missionTitle: "Tumbuh secara profesional, terbuka, dan berkesinambungan.",
    missionDescription:
      "Mengembangkan diri dalam tatanan yang beretika dan terbuka, mengacu pada inovasi berkesinambungan, menjaga hubungan dengan rekan usaha serta konsumen, dan menjadi mitra Pemerintah Republik Indonesia dalam menciptakan iklim bisnis yang sehat.",
    legalSnapshotEyebrow: "Legalitas Sekilas",
    legalSnapshotTitle: "Beroperasi dengan dasar hukum yang jelas.",
    viewAllLegality: "Lihat semua legalitas",
    nextStepLabel: "Langkah berikutnya",
    nextStepTitle:
      "Kenali produk dan cara kami mendukung kebutuhan distribusi Anda.",
    viewLegality: "Lihat Legalitas",
    partnershipPageTitle: "Kemitraan",
    partnershipPageDescription:
      "Membangun kerja sama yang bertanggung jawab untuk mendukung distribusi Bahan Bakar Industri ke berbagai wilayah Indonesia.",
    officialTransportPartnerEyebrow: "Mitra Transportir Resmi",
    officialTransportPartnerTitle:
      "Jaringan distribusi yang didukung mitra berizin.",
    officialTransportPartnerDescription:
      "Untuk mendukung kelancaran pendistribusian ke seluruh pelosok Indonesia, PT. Anigos Jaya Perkasa menjalin kerja sama dengan PT Masinton Nusa Perkasa sebagai mitra transportir resmi.",
    transportDocumentTitle: "Dokumen kemitraan transportir",
    transportDocumentDescription:
      "Company profile file 8, halaman internal 07 “Transportir”, memuat sertifikat izin usaha dan dokumentasi armada mitra.",
    downloadDocument: "Unduh dokumen",
    transportPartnershipDescription:
      "Kemitraan ini mendukung kebutuhan pengangkutan Bahan Bakar Minyak dengan memperhatikan legalitas, koordinasi operasional, dan ketepatan layanan.",
    partnershipDetailEyebrow: "Detail Kemitraan",
    partnershipDetailTitle: "Informasi izin transportir yang tersedia.",
    partnershipDetailDescription:
      "Ringkasan berikut disusun dari sertifikat izin usaha yang tercantum dalam company profile.",
    transportLicenseTitle: "Sertifikat izin usaha pengangkutan",
    verificationNoteTitle: "Catatan verifikasi",
    verificationNote:
      "Alamat lengkap dan beberapa detail badan usaha mitra belum terbaca jelas pada scan dokumen sumber. Informasi tersebut perlu diverifikasi sebelum dipublikasikan sebagai data final.",
    howWePartnerEyebrow: "Cara Kami Bermitra",
    howWePartnerTitle:
      "Kerja sama yang dibangun dari kejelasan dan kepercayaan.",
    howWePartnerDescription:
      "Kami membuka ruang kolaborasi dengan perusahaan atau instansi yang ingin menjajaki peluang kerja sama distribusi maupun transportasi Bahan Bakar Minyak.",
    principleConnectedTitle: "Distribusi yang terhubung",
    principleConnectedDescription:
      "Kemitraan transportasi mendukung kelancaran pendistribusian BBM ke berbagai wilayah operasional.",
    principleComplianceTitle: "Kepatuhan yang terjaga",
    principleComplianceDescription:
      "Setiap kerja sama diarahkan untuk berjalan dengan dasar izin dan tanggung jawab yang jelas.",
    principleLongTermTitle: "Hubungan jangka panjang",
    principleLongTermDescription:
      "Kami menjaga hubungan baik dengan rekan usaha, konsumen, dan mitra Pemerintah Republik Indonesia.",
    collaborationOpenLabel: "Terbuka untuk kolaborasi",
    collaborationTitle:
      "Mari bangun kemitraan yang mendukung distribusi energi secara bertanggung jawab.",
    collaborationDescription:
      "Hubungi tim Petro Anigos untuk mendiskusikan kebutuhan distribusi, transportasi, atau peluang kerja sama lainnya.",
    contactUsAction: "Hubungi Kami",
    legalityPageTitle: "Legalitas",
    legalityPageDescription:
      "Informasi legal dan perizinan yang menjadi dasar operasional PT. Anigos Jaya Perkasa sebagai distributor Bahan Bakar Industri.",
    legalBasisEyebrow: "Dasar Hukum Perusahaan",
    legalBasisTitle: "Beroperasi dengan fondasi legal yang jelas.",
    legalBasisDescription:
      "Ringkasan berikut disusun dari informasi legalitas yang tercantum dalam company profile PT. Anigos Jaya Perkasa.",
    incorporationDeed: "Akta Pendirian",
    ministryApproval: "Pengesahan Kemenkumham",
    generalTradingLicense: "Izin Niaga Umum",
    bphMigasRegistration: "Registrasi BPH Migas",
    trademark: "Merek Dagang",
    transportPartnerLicense: "Izin Mitra Transportir",
    notary: "Notaris Andi Ismawati Achmad, S.H.",
    year2019: "Tahun 2019",
    directorateOilGas: "Direktorat Jenderal Minyak dan Gas Bumi",
    bphMigasBusinessRegistration:
      "Nomor Registrasi Usaha Niaga Minyak dan Gas Bumi",
    alsoKnownAsAnigosPetro: "Dalam sumber juga disebut sebagai Anigos Petro",
    fuelTransportation: "Pengangkutan Bahan Bakar Minyak",
    legalDocumentsEyebrow: "Dokumen Legal",
    legalDocumentsTitle: "Pusat dokumen yang dapat diunduh.",
    legalDocumentsDescription:
      "Area ini disiapkan untuk menyimpan scan akta, izin usaha, sertifikat, dan dokumen legal lain yang telah disetujui untuk dipublikasikan.",
    documentView: "Lihat dokumen",
    documentDownload: "Unduh dokumen",
    documentsUnavailableTitle: "Dokumen belum tersedia",
    documentsUnavailableDescription:
      "File PDF legal akan muncul di area ini setelah dokumen resmi siap dan disetujui untuk dipublikasikan.",
    informationTransparency: "Transparansi informasi",
    publicDocumentsTitle: "Dokumen publik akan ditambahkan secara bertahap.",
    publicDocumentsDescription:
      "Informasi nomor legal dapat menjadi rujukan awal. Dokumen pendukung akan ditampilkan setelah proses verifikasi dan persetujuan publikasi selesai.",
    viewPartnership: "Lihat Kemitraan",
    fleetPageEyebrow: "Produk / Armada",
    fleetPageTitle: "Kapasitas armada yang mengikuti skala kebutuhan.",
    fleetPageDescription:
      "Armada tangki BBM Petro Anigos tersedia dalam beberapa variasi kapasitas untuk mendukung kebutuhan distribusi mulai dari skala kecil hingga industri besar.",
    fleetLandEyebrow: "Armada Darat / Trucking",
    fleetLandTitle: "Satu jaringan, enam pilihan kapasitas.",
    fleetLandDescription:
      "Pilih kapasitas untuk melihat visual armada dan ringkasan penggunaannya. Variasi ini membantu proses verifikasi kebutuhan dilakukan secara lebih tepat.",
    truckingFleet: "Armada trucking",
    distributionIllustration: "Ilustrasi distribusi antarwilayah",
    partnershipIllustration: "Ilustrasi kemitraan distribusi Petro Anigos",
    liter: "liter",
    fleetCapacityTitle: "Pilih volume sesuai kebutuhan distribusi.",
    fleetCapacityDescription:
      "Armada tangki HSD tersedia dalam beberapa kapasitas untuk mendukung kebutuhan ringan, reguler, hingga skala industri.",
    availableVolume: "Volume yang tersedia",
    lightNeed: "Kebutuhan ringan",
    flexibleDistribution: "Distribusi fleksibel",
    regularOperations: "Operasional reguler",
    mediumNeed: "Kebutuhan menengah",
    industrialScale: "Skala industri",
    largeLoad: "Muatan besar",
    interregionalDistribution: "Distribusi antarwilayah",
    seaTransport: "Transportasi laut",
    seaTransportTitle: "Dukungan logistik untuk kebutuhan antarpulau.",
    seaTransportDescription:
      "Selain armada darat, referensi perusahaan menyebut sarana transportasi laut seperti kapal Batam Marine I untuk mendukung pengangkutan BBM antarwilayah atau antarpulau.",
    fleetAvailabilityNote:
      "Detail jumlah kapal, jadwal, kapasitas, dan ketersediaan perlu dikonfirmasi berdasarkan kebutuhan pengiriman.",
    transportPartner: "Mitra transportir",
    transportPartnerTitle: "Distribusi diperkuat mitra resmi.",
    transportPartnerDescription:
      "PT Masinton Nusa Perkasa mendukung distribusi sebagai mitra transportir resmi dengan izin usaha pengangkutan Minyak dan Gas Bumi.",
    partnershipDetailsAction: "Lihat detail kemitraan",
    distributionSchemeTitle: "Skema distribusi yang dapat dibahas",
    unloadingPoint: "Penyesuaian wilayah dan titik bongkar",
    volumeSchedule: "Penentuan volume dan jadwal distribusi",
    fleetVerification: "Verifikasi armada sesuai kebutuhan",
    readyToDiscuss: "Siap berdiskusi",
    fleetCtaTitle: "Temukan kapasitas yang sesuai untuk kebutuhan Anda.",
    fleetCtaDescription:
      "Sampaikan volume, lokasi, jadwal, dan moda distribusi untuk dibahas bersama tim Petro Anigos.",
    submitRequirement: "Ajukan kebutuhan",
    productPageEyebrow: "Produk",
    productPageTitle: "Bahan Bakar Industri untuk kebutuhan operasional Anda.",
    productPageDescription:
      "Petro Anigos menyediakan Solar/HSD dan B40 Biosolar dengan mutu serta spesifikasi yang mengacu pada standar Direktorat Jenderal Minyak dan Gas Bumi Republik Indonesia.",
    productOverviewEyebrow: "Kenali Produk",
    productOverviewTitle: "Dua pilihan BBM untuk kebutuhan distribusi dan industri.",
    productOverviewDescription:
      "Produk Petro Anigos disiapkan untuk mendukung kebutuhan konsumen dengan pendekatan yang mengutamakan mutu, ketepatan, keselamatan, dan keandalan layanan.",
    fuelProductTitle: "Bahan Bakar Minyak",
    fuelProductDescription:
      "Produk bahan bakar minyak jenis solar yang dipasarkan dengan mutu dan spesifikasi sesuai acuan Ditjen Migas RI.",
    biodieselBlendTitle: "Campuran biodiesel dan solar",
    biodieselBlendDescription:
      "Produk yang mengikuti program pemerintah dengan komposisi 40% Biodiesel dan 60% bahan bakar minyak jenis solar.",
    b40Composition: "Komposisi B40",
    b40CompositionTitle: "Campuran yang membentuk B40 Biosolar",
    productUnderstandingEyebrow: "Memahami Produk",
    b40ProgramTitle: "B40 Biosolar mengikuti program mandatori pemerintah.",
    b40ProgramDescription:
      "B40 Biosolar merupakan produk BBM dengan campuran 40% Biodiesel dan 60% bahan bakar minyak jenis solar.",
    biodieselShare: "Bagian biodiesel dalam komposisi B40.",
    dieselShare: "Bagian bahan bakar minyak jenis solar.",
    compositionNote:
      "Mutu dan spesifikasi produk mengacu pada standar Direktorat Jenderal Minyak dan Gas Bumi Republik Indonesia. Chart ini hanya menjelaskan komposisi produk, bukan klaim performa atau penghematan.",
    briefSpecsEyebrow: "Spesifikasi Ringkas",
    briefSpecsTitle: "Informasi utama sebelum menentukan kebutuhan.",
    briefSpecsDescription:
      "Ringkasan ini membantu calon pelanggan memahami produk yang tersedia sebelum mengajukan kebutuhan distribusi.",
    information: "Informasi",
    details: "Keterangan",
    purchaseSchemeEyebrow: "Skema Pembelian",
    purchaseSchemeTitle: "Proses transaksi yang dimulai dari kebutuhan Anda.",
    purchaseSchemeDescription:
      "Alur berikut adalah gambaran awal proses pembelian. Detail harga, minimum order, pembayaran, dan ketentuan komersial dibahas sesuai kebutuhan serta persetujuan bersama.",
    submitNeeds: "Sampaikan kebutuhan",
    submitNeedsDescription:
      "Informasikan jenis produk, estimasi volume, lokasi, jadwal, dan kebutuhan moda transportasi.",
    verifyNeeds: "Verifikasi kebutuhan",
    verifyNeedsDescription:
      "Tim Petro Anigos meninjau ketersediaan produk, volume, wilayah, armada, dan jadwal distribusi.",
    offerApproval: "Penawaran dan persetujuan",
    offerApprovalDescription:
      "Penawaran disusun berdasarkan kebutuhan pelanggan untuk dibahas dan disepakati bersama.",
    deliverySettlement: "Pengiriman dan penyelesaian",
    deliverySettlementDescription:
      "Produk disiapkan, armada ditentukan, lalu pengiriman dan dokumen transaksi diselesaikan sesuai kesepakatan.",
    transportSchemeEyebrow: "Skema Transportasi",
    transportSchemeTitle: "Pilih pendekatan distribusi sesuai wilayah dan kebutuhan.",
    transportSchemeDescription:
      "Moda transportasi dibahas saat verifikasi kebutuhan agar produk, volume, lokasi, dan jadwal dapat diselaraskan.",
    land: "Darat",
    sea: "Laut",
    transportPartnerTab: "Mitra Transportir",
    landTransportIllustration: "Ilustrasi transportasi darat",
    seaTransportIllustration: "Ilustrasi transportasi laut",
    partnerTransportIllustration: "Ilustrasi mitra transportir",
    landFleetTitle: "Armada tangki darat",
    landFleetDescription:
      "Armada tersedia dalam variasi kapasitas 5.000 L, 8.000 L, 10.000 L, 16.000 L, 24.000 L, dan 30.000 L untuk mendukung kebutuhan distribusi dari skala kecil hingga industri besar.",
    viewFleet: "Lihat armada",
    seaTransportCardTitle: "Transportasi laut",
    seaTransportCardDescription:
      "Sarana transportasi laut digunakan untuk mendukung pengangkutan BBM antarwilayah atau antarpulau. Referensi menyebut kapal Batam Marine I sebagai salah satu dokumentasi pendukung.",
    officialPartnerTitle: "Mitra transportir resmi",
    officialPartnerDescription:
      "Distribusi didukung PT Masinton Nusa Perkasa sebagai mitra transportir resmi dengan izin usaha pengangkutan Minyak dan Gas Bumi.",
    viewPartnershipDetails: "Lihat detail kemitraan",
    deliveryAdjustmentEyebrow: "Penyesuaian Pengiriman",
    deliveryAdjustmentTitle: "Sampaikan detail kebutuhan distribusi Anda.",
    deliveryAdjustmentDescription:
      "Setiap kebutuhan dapat dibahas berdasarkan jenis produk, volume, lokasi, jadwal, dan moda transportasi yang diperlukan.",
    deliveryLocation: "Lokasi pengiriman",
    volumePerDelivery: "Volume per pengiriman",
    deliveryFrequency: "Frekuensi pengiriman",
    receivingSchedule: "Jadwal penerimaan",
    offerDiscussionTitle: "Hal yang dibahas saat penawaran",
    commercialTerms: "Ketentuan komersial",
    commercialTermsDescription:
      "Harga, minimum order, metode pembayaran, dan syarat transaksi dibahas berdasarkan kebutuhan serta persetujuan kedua pihak.",
    distributionDetails: "Detail distribusi",
    distributionDetailsDescription:
      "Wilayah, jadwal, volume, dan moda pengiriman diselaraskan sebelum penawaran disepakati.",
    productReadyToDiscuss: "Siap berdiskusi",
    productCtaTitle: "Sampaikan kebutuhan BBM industri Anda kepada Petro Anigos.",
    productCtaDescription:
      "Tim kami siap membahas produk, volume, lokasi, dan skema distribusi yang sesuai.",
    requestOffer: "Ajukan Penawaran",
    offerFormEyebrow: "Produk / Penawaran",
    offerFormTitle: "Ajukan kebutuhan BBM industri Anda.",
    offerFormDescription:
      "Lengkapi informasi awal agar tim Petro Anigos dapat memahami kebutuhan produk, volume, lokasi, dan moda distribusi yang diperlukan.",
    stepLabel: "Langkah",
    ofLabel: "dari",
    configureNeeds: "Konfigurasi kebutuhan Anda.",
    applicantDetails: "Lengkapi detail pemohon.",
    offerFormNotice:
      "Form ini hanya menyiapkan informasi awal. Harga, minimum order, pembayaran, dan ketentuan komersial akan dikonfirmasi melalui proses penawaran.",
    fuelType: "Jenis bahan bakar",
    dieselFuelDescription: "Bahan bakar minyak jenis solar",
    b40FuelDescription: "40% Biodiesel + 60% Solar/HSD",
    requiredVolume: "Volume kebutuhan (liter)",
    volumeRange: "1.000–30.000 L",
    volumeSliderLabel: "Volume kebutuhan dalam liter",
    volumeSelectionDescription:
      "Geser untuk memilih estimasi volume. Preset di bawah mengikuti variasi kapasitas armada yang tersedia.",
    deliveryRegion: "Wilayah pengiriman",
    deliverySchedule: "Jadwal pengiriman",
    scheduled: "Terjadwal",
    scheduledDescription: "Memiliki target tanggal penerimaan.",
    recurring: "Berkala",
    recurringDescription: "Kebutuhan berulang yang perlu dibahas.",
    asNeeded: "Sesuai kebutuhan",
    asNeededDescription: "Waktu pengiriman dibahas kemudian.",
    companyName: "Nama perusahaan",
    contactName: "Nama narahubung",
    phoneNumber: "Nomor telepon",
    unloadingAddress: "Alamat titik bongkar",
    expectedReceivingDate: "Tanggal penerimaan yang diharapkan",
    chooseReceivingDate: "Pilih tanggal penerimaan",
    dateConfirmationNote:
      "Tanggal ini menjadi acuan awal dan tetap dikonfirmasi bersama tim Petro Anigos.",
    requirementNotes: "Catatan kebutuhan",
    requirementNotesDescription:
      "Sertakan frekuensi, kebutuhan khusus, atau informasi distribusi lainnya.",
    back: "Kembali",
    continueApplicantDetails: "Lanjut ke detail pemohon",
    prepareOfferEmail: "Siapkan email penawaran",
    requirementEstimate: "Estimasi kebutuhan",
    temporarySummary: "Ringkasan sementara",
    draft: "Draft",
    region: "Wilayah",
    schedule: "Jadwal",
    notFilled: "Belum diisi",
    fuelTaxEstimate: "Estimasi pajak BBM",
    fuelTaxDescription:
      "Pilih area layanan dan tarif PBBKB untuk simulasi sementara.",
    serviceArea: "Area layanan",
    basePricePerLiter: "Harga dasar / liter",
    temporary: "sementara",
    pbbkbRate: "Tarif PBBKB",
    accordingToProvince: "Sesuai provinsi",
    priceBasis: "Dasar harga",
    estimatedPbbkb: "Estimasi PBBKB",
    estimatedTotal: "Estimasi total",
    taxSimulationNote:
      "PBBKB mengikuti ketentuan provinsi terpilih dan perlu dikonfirmasi sesuai penggunaan BBM. Simulasi ini bukan tagihan resmi.",
    emailOpeningNote:
      "Setelah tombol dikirim, aplikasi email akan dibuka dengan ringkasan kebutuhan yang sudah disiapkan.",
    backToProducts: "Kembali ke Kenali Produk",
    directDiscussionTitle: "Butuh membahas kebutuhan secara langsung?",
    emailPetroAnigos: "Email Petro Anigos",
    reachPageEyebrow: "Coverage",
    reachPageTitle: "Connected distribution for customer needs.",
    reachPageDescription:
      "Petro Anigos supports industrial fuel distribution through operational points and delivery coordination across several regions of Indonesia.",
    operationalNetwork: "Operational network",
    coverageOverviewTitle: "Four regions, six service points.",
    coverageOverviewDescription:
      "Every request is reviewed according to location, volume, schedule, and the most suitable distribution mode.",
    servicePoints: "Service points",
    mainRegions: "Main regions",
    coverageMap: "Coverage map",
    regionLabel: "Region",
    servedAreasEyebrow: "Served Areas",
    servedAreasTitle: "Choose a region and understand its distribution support.",
    servedAreasDescription:
      "The following regions are listed in operational references and are currently used as service-area options.",
    landMode: "Land",
    truckingMode: "Trucking",
    interregionalMode: "Interregional",
    seaMode: "Sea",
    coverageWorkEyebrow: "How It Works",
    coverageWorkTitle: "Coverage becomes a delivery plan.",
    coverageWorkDescription:
      "Location is not the only consideration. We align product and operational needs before discussing delivery details.",
    reviewLocation: "Review location",
    reviewLocationDescription: "Identify the unloading point and service area.",
    chooseMode: "Choose mode",
    chooseModeDescription: "Adjust trucking or interregional coordination.",
    confirmPlan: "Confirm",
    confirmPlanDescription: "Discuss schedule, volume, and availability together.",
    areaVerification: "Area verification",
    locationNotFoundTitle: "Cannot find your location?",
    locationNotFoundDescription:
      "Share your location, volume, and requirement schedule. Our team will review the most suitable distribution options.",
    coverageNotice:
      "Coverage and delivery availability must be confirmed based on actual requirements.",
    sustainabilityPageEyebrow: "Sustainability",
    sustainabilityPageTitle: "Running the business with broader responsibility.",
    sustainabilityPageDescription:
      "For Petro Anigos, sustainability starts with cleaner energy, operational safety, and contribution to society.",
    ourApproach: "Our approach",
    sustainabilityIntroTitle: "Sustainability is more than a slogan.",
    sustainabilityIntroDescription:
      "This narrative is summarized from the company profile. Formal ESG data, certifications, and impact figures are not available and are not presented as quantitative claims.",
    howWeWork: "How we work",
    actionPrinciplesTitle: "Principles translated into action.",
    actionPrinciplesDescription:
      "We keep every decision grounded in customer needs, compliance, safety, and strong relationships with partners.",
    mainFocus: "Main focus",
    consistentPracticeTitle: "Building trust through consistent practices.",
    referenceSummary: "This summary reflects themes available in company references.",
    continueExploring: "Continue exploring",
    serveNeedsTitle: "Learn how Petro Anigos serves your needs.",
    transparencyNote:
      "Transparency note: this page does not yet include environmental/K3 certifications, specific CSR programs, or emissions metrics because the data is not included in the company references.",
    cleanerEnergy: "Cleaner energy",
    cleanerEnergyDescription:
      "B40 Biosolar blends 40% biodiesel and 60% diesel as part of the government program related to plant-based energy.",
    operationalSafety: "Operational safety",
    operationalSafetyDescription:
      "Punctuality and safety are priorities in every fuel distribution process.",
    socialContribution: "Social contribution",
    socialContributionDescription:
      "The company is committed to being a reliable partner and contributing to community welfare.",
    sustainableEnergyEyebrow: "Sustainability / Sustainable Energy",
    sustainableEnergyTitle: "Understanding B40's role in the energy transition.",
    sustainableEnergyDescription:
      "B40 Biosolar is part of Petro Anigos' portfolio, supporting industrial needs while following the government's mandatory biodiesel program.",
    b40IntroEyebrow: "B40 Biosolar",
    b40IntroTitle: "A clear composition with standards kept in view.",
    b40IntroDescription:
      "The company profile describes B40 as a blend of 40% biodiesel and 60% diesel, with quality and specifications aligned with the Directorate General of Oil and Gas.",
    biodiesel40Title: "40% biodiesel",
    biodiesel40Description: "The biodiesel portion of the B40 composition following the government program.",
    diesel60Title: "60% diesel",
    diesel60Description: "The diesel fuel portion of the B40 composition.",
    specificationTitle: "Aligned with specifications",
    specificationDescription:
      "Product quality refers to the standards of Indonesia's Directorate General of Oil and Gas.",
    partnershipGovernanceEyebrow: "Sustainability / Partnerships & Governance",
    partnershipGovernanceTitle: "Relationships built with integrity.",
    partnershipGovernanceDescription:
      "Petro Anigos maintains relationships with business partners, customers, and the Government of Indonesia to support a healthy business climate.",
    governanceIntroEyebrow: "Governance",
    governanceIntroTitle: "Partnerships growing from clarity and compliance.",
    governanceIntroDescription:
      "This narrative uses principles listed in the company profile. Formal management structure and governance policy information are not yet available.",
    goodRelationships: "Good relationships",
    goodRelationshipsDescription: "Maintaining relationships with business partners and customers is part of how the company works.",
    compliance: "Compliance",
    complianceDescription: "Operating on the legal basis and trading licenses listed in company references.",
    integrity: "Integrity",
    integrityDescription: "Supporting a healthy business climate through transparency and professionalism.",
    governanceNote:
      "Management structure, governance policies, and additional compliance indicators still require official company data.",
    viewPartnerships: "View partnerships",
    operationalSafetyEyebrow: "Sustainability / Operational Safety",
    operationalSafetyPageTitle: "Distribution that is punctual, safe, and responsible.",
    operationalSafetyPageDescription:
      "Workplace safety and punctuality are priorities in Petro Anigos fuel distribution operations.",
    operationalPriorityEyebrow: "Operational priority",
    operationalPriorityTitle: "Safety is part of how we work.",
    operationalPriorityDescription:
      "The company profile places punctuality and accident-free operations among its work objectives. Detailed K3 certifications are not available in the references.",
    accidentFree: "Accident-free operations",
    accidentFreeDescription: "Safety is a primary consideration in every fuel distribution operation.",
    punctuality: "Punctuality",
    punctualityDescription: "Distribution coordination is directed toward meeting customer needs on schedule.",
    routeCoordination: "Route coordination",
    routeCoordinationDescription: "Fleet and partner networks help support deliveries according to regional needs.",
    safetyNote:
      "K3 certification data, detailed operating procedures, and safety metrics are not yet available for publication.",
    viewCoverage: "View coverage",
    dataPolicy: "Data Policy",
    dataPolicyTitle: "Sources and use of information on the Petro Anigos website.",
    dataPolicyDescription:
      "This page explains the sources, status, limitations, and ethical use of weather and market information displayed on the website.",
    contextualDataTitle: "Supporting data should always come with context.",
    contextualDataDescription:
      "Petro Anigos distinguishes demo, forecast, delayed, and live data. Values shown without a source or update time must not be understood as real-time information.",
    weatherInformation: "Weather information",
    weatherInformationDescription:
      "Weather data is planned to come from BMKG. Forecasts are general information and do not replace official BMKG warnings, K3 SOPs, or operational decisions.",
    marketInformation: "Market information",
    marketInformationDescription:
      "The IDX/Migas summary on the ribbon is currently sample data for display. Production data may only be shown after its source and redistribution rights are verified.",
    dataTimeStatus: "Data time and status",
    dataTimeStatusDescription:
      "Every data integration must include its source, update time, time zone, and status such as demo, forecast, delayed, or live.",
    responsibleUse: "Responsible use",
    responsibleUseDescription:
      "Ribbon information must not be the sole basis for distribution, safety, investment, or commercial decisions.",
    referenceSources: "Reference sources",
    attributionTitle: "Attribution should be visible near the data.",
    attributionDescription:
      "When official integrations are available, attribution, timestamp, and data status will be shown on the ribbon and explained further on this page.",
    bmkgWeather: "BMKG — Weather Forecast",
    bmkgWeatherDescription:
      "Official source for BMKG open weather forecasts. Weather data must display BMKG attribution in the application.",
    idxMarket: "Indonesia Stock Exchange (IDX)",
    idxMarketDescription:
      "Official capital-market reference. Public market data will only be used after access and redistribution rights are verified.",
    disclaimer: "Disclaimer",
    dataDisclaimer:
      "Weather and market information is provided for general purposes only. It may be delayed, change, be incomplete, or not reflect actual conditions. It is not investment advice and does not replace official warnings or operating procedures.",
    ribbonStatus: "Current ribbon data: demo/static",
    contactPetroAnigos: "Contact Petro Anigos",
    cookieTerms: "Cookie Terms",
    cookieTermsTitle: "How we use cookies on the Petro Anigos website.",
    cookieTermsDescription:
      "We use cookies in a limited way to support basic website functions and respect visitor choices.",
    usageTransparency: "Usage transparency",
    cookieContextTitle: "Cookies help the website remember necessary context.",
    cookieContextDescription:
      "Cookies are small data files stored on a device when visiting a website. These terms explain the types, purposes, duration, and choices available to users.",
    essentialCookies: "Essential cookies",
    essentialCookiesDescription:
      "Cookies required for basic website features, including storing cookie consent choices and helping maintain display preferences.",
    preferenceCookies: "Preference cookies",
    preferenceCookiesDescription:
      "Cookies that may remember user choices such as language or display preferences when those features use them.",
    analyticsAdvertisingCookies: "Analytics and advertising cookies",
    analyticsAdvertisingCookiesDescription:
      "Not currently used. If enabled in the future, users will receive appropriate information and choices before non-essential cookies are stored.",
    active: "Active",
    limited: "Limited",
    inactive: "Inactive",
    consentCookies: "Consent cookies",
    consentDurationTitle: "Your choice is stored for 180 days.",
    consentDurationDescription:
      "The website stores consent choices in a cookie named petro_anigos_cookie_consent. Its value only represents the consent choice, not identity data.",
    necessaryChoiceDescription:
      "The “Necessary only” choice allows the basic functions required for the website to work. “Accept all” currently does not enable analytics or advertising because those services are not installed.",
    futureThirdPartyDescription:
      "If third-party services are added in the future, cookie configuration and notices will be updated before a new category is used.",
    clearCookieDescription:
      "You can delete cookies through browser settings. The consent banner will appear again on your next visit.",
    termsUpdate: "Terms update",
    termsUpdateDescription:
      "We will update this page if the technology, services, or cookie compliance requirements of the website change.",
    viewDataPolicy: "View data policy",
    careersEyebrow: "About Us / Careers",
    careersTitle: "Grow with the energy that moves Indonesia.",
    careersDescription:
      "We are looking for people who want to work with purpose, maintain quality, and build reliable energy distribution.",
    whyPetroAnigos: "Why Petro Anigos",
    meaningfulWorkTitle: "Work that makes a real impact.",
    meaningfulWorkDescription:
      "Administrative, commercial, and operational work connect here to ensure customer needs are served safely and accurately.",
    growingTogether: "How we grow",
    professionalHumanTitle: "Professional at work, human in collaboration.",
    professionalHumanDescription:
      "We believe service quality starts with people who receive context, trust, and room to take responsibility.",
    workExperience: "Work experience",
    sharedStandardsTitle: "Things we protect together.",
    sharedStandardsDescription:
      "A good work experience is not only about facilities, but also an environment that helps everyone do their best work.",
    careerOpenings: "Available openings",
    careerOpeningsTitle: "Find a role that fits your next step.",
    careerOpeningsDescription:
      "Choose a position to learn more. If no role fits yet, you can still send your profile for future consideration.",
    positionsAvailable: "positions available",
    viewAndApply: "View position & apply",
    purposeAtWork: "Work with purpose",
    purposeAtWorkDescription: "Every role contributes to energy distribution supporting Indonesian industry.",
    supportiveCulture: "Supportive culture",
    supportiveCultureDescription: "We build open communication, cross-functional teamwork, and room to grow together.",
    fieldLearning: "Learn from the field",
    fieldLearningDescription: "You will work with real distribution, customer, partner, and operational contexts.",
    safeWorkStandards: "Safe work standards",
    safeWorkStandardsDescription: "Safety, compliance, and integrity are part of how we make decisions.",
    crossRoleCollaboration: "Cross-role collaboration",
    crossRoleCollaborationDescription: "Good ideas can come from any function and be discussed from diverse perspectives.",
    roomToGrow: "Room to grow",
    roomToGrowDescription: "We value initiative, responsibility, and the desire to improve work quality.",
    operations: "Operations",
    commercial: "Commercial",
    fullTime: "Full-time",
    distributionOperationsStaff: "Distribution Operations Staff",
    distributionOperationsSummary:
      "Support schedule, document, and distribution communication coordination with customers and transport partners.",
    salesAccountExecutive: "Sales & Account Executive",
    salesAccountSummary:
      "Build relationships with prospective customers and translate energy needs into service solutions.",
    careersFormEyebrow: "Careers / Application",
    careersFormTitle: "Tell us about your next step.",
    careersFormDescription:
      "Complete the short form and attach your latest CV. Our team will review incoming profiles based on position needs.",
    applicationForm: "Application form",
    sendYourProfile: "Send your profile",
    cvMaximum: "CV maximum 5 MB",
    dataReadyForReview: "Data ready for review",
    applicationThanks:
      "Thank you. The form and CV have been validated in the browser. Connect the submission handler to a CMS or recruitment email before production use.",
    sendAnotherApplication: "Send another application",
    fullName: "Full name",
    fullNamePlaceholder: "Full name",
    positionInterested: "Position of interest",
    choosePosition: "Choose a position",
    shortMessage: "Short message",
    shortMessagePlaceholder: "Tell us about your experience or why you are interested...",
    cvSupportingDocument: "CV / supporting document",
    removeFile: "Remove",
    validatedFile: "Validated file",
    addFile: "Add file",
    chooseFile: "Choose file",
    supportedFileTypes: "PDF, DOC, or DOCX · maximum 5 MB per file",
    cvFormatError: "CV must be PDF, DOC, or DOCX.",
    fileSizeError: "maximum file size is 5 MB.",
    attachCvError: "Please attach at least one CV file first.",
    applicationFailed: "Application could not be processed.",
    sending: "Sending...",
    sendApplication: "Send application",
    bekasiCoverageDescription: "A service point supporting distribution needs in the Jabodetabek area and surrounding regions.",
    palembangCoverageDescription: "Supporting industrial fuel and distribution needs in South Sumatra.",
    medanCoverageDescription: "An operational point for customer needs in North Sumatra and surrounding areas.",
    palangkaRayaCoverageDescription: "Supporting fuel delivery coordination for operational needs in Central Kalimantan.",
    northSulawesiCoverageDescription: "An operational point serving distribution needs in North Sulawesi.",
    southSulawesiCoverageDescription: "An operational point supporting customer needs in South Sulawesi.",
    offerPageEyebrow: "Produk / Penawaran",
    offerPageTitle: "Mulai dari kebutuhan, kami siapkan pembahasannya.",
    offerPageDescription:
      "Sampaikan kebutuhan BBM industri Anda agar tim Petro Anigos dapat membantu meninjau produk, volume, lokasi, jadwal, dan skema distribusi yang sesuai.",
    needsBasedOffer: "Penawaran berbasis kebutuhan",
    beforeSubmitting: "Sebelum mengajukan",
    offerPreparationTitle: "Informasi sederhana membantu pembahasan lebih terarah.",
    offerPreparationDescription:
      "Tidak perlu menyiapkan spesifikasi komersial yang rumit. Mulai dari informasi operasional yang sudah Anda ketahui.",
    prepareForOffer: "Yang perlu disiapkan",
    productTypePreparation: "Jenis produk",
    productTypePreparationDescription: "Solar/HSD atau B40 Biosolar sesuai kebutuhan operasional.",
    volumePreparation: "Volume kebutuhan",
    volumePreparationDescription: "Perkiraan volume per pengiriman atau kebutuhan berkala.",
    locationSchedulePreparation: "Lokasi dan jadwal",
    locationSchedulePreparationDescription: "Wilayah titik bongkar serta rencana waktu penerimaan.",
    distributionModePreparation: "Moda distribusi",
    distributionModePreparationDescription: "Kebutuhan armada darat, transportasi laut, atau mitra transportir.",
    offerFlowEyebrow: "Alur Pembahasan",
    offerFlowTitle: "Dari informasi awal menuju penawaran yang dibahas bersama.",
    offerFlowDescription:
      "Alur ini membantu menyamakan kebutuhan sebelum detail transaksi dan pengiriman disepakati.",
    offerStepOne: "Sampaikan kebutuhan",
    offerStepOneDescription:
      "Isi informasi awal produk, volume, wilayah, jadwal, serta detail perusahaan.",
    offerStepTwo: "Verifikasi bersama",
    offerStepTwoDescription:
      "Tim Petro Anigos meninjau kebutuhan, ketersediaan, armada, dan skema distribusi.",
    offerStepThree: "Bahas penawaran",
    offerStepThreeDescription:
      "Detail harga, minimum order, pembayaran, dan ketentuan transaksi dibahas sesuai kebutuhan.",
    discussionScopeEyebrow: "Ruang Lingkup Pembahasan",
    discussionScopeTitle: "Detail komersial dan distribusi dikonfirmasi bersama.",
    discussionScopeDescription:
      "Informasi pada form adalah bahan awal pembahasan, bukan penetapan harga atau jaminan pengiriman.",
    offerScopeNotice:
      "Harga, minimum order, pembayaran, dan ketersediaan pengiriman dibahas bersama setelah kebutuhan dan detail operasional diverifikasi.",
    supportingData: "Data pendukung",
    supportingDataDescription:
      "Bila tersedia, Anda dapat menambahkan catatan frekuensi pengiriman, kebutuhan khusus titik bongkar, atau konteks operasional lainnya.",
    offerCommercialDescription:
      "Harga, minimum order, metode pembayaran, dan persyaratan transaksi dibahas berdasarkan kebutuhan serta persetujuan kedua pihak.",
    offerDistributionDescription:
      "Wilayah, jadwal, volume, moda pengiriman, dan ketersediaan armada diselaraskan saat proses verifikasi.",
    offerCtaEyebrow: "Siap berdiskusi",
    offerCtaTitle: "Mulai pembahasan yang terarah bersama Petro Anigos.",
    offerCtaDescription:
      "Sampaikan informasi yang sudah Anda ketahui dan biarkan tim kami membantu menyusun langkah berikutnya.",
    productsSectionLabel: "Produk Petro Anigos",
    productFeaturedCategory: "Produk unggulan",
    productFeaturedDescription:
      "Bahan bakar hasil pencampuran 40% Biodiesel dan 60% bahan bakar minyak jenis solar, mengikuti program mandatori pemerintah.",
    productComposition: "Komposisi B40",
    productBiodiesel: "Biodiesel",
    productDiesel: "Solar",
    productQualityStandard: "Standar mutu",
    productGovernmentProgram: "Program",
    productGovernmentMandate: "Mandatori pemerintah",
    productIndustrialCategory: "BBM industri",
    productIndustrialDescription:
      "Bahan Bakar Minyak jenis solar atau HSD untuk mendukung kebutuhan konsumen dari skala kecil hingga layanan berskala besar dan nasional.",
    productEnergyForIndustry: "Energi untuk kebutuhan industri",
    productType: "Jenis produk",
    productServiceScale: "Skala layanan",
    productSmallToNational: "Kecil hingga nasional",
    productDistribution: "Distribusi",
    productLandAndSea: "Darat dan laut",
    productPosition: "Posisi produk",
    productSupport:
      "Didukung kapabilitas distribusi Petro Anigos untuk kebutuhan konsumen dengan pilihan layanan darat dan antarwilayah.",
    partnershipSectionLabel: "Kemitraan Petro Anigos",
    partnershipTitle: "Bertumbuh melalui kolaborasi yang terpercaya.",
    partnershipDescription:
      "Kami membuka ruang kerja sama dengan perusahaan dan instansi yang memiliki semangat untuk membangun layanan distribusi energi yang aman, profesional, dan saling menguatkan.",
    partnershipTransportTitle: "Kemitraan Transportasi BBM",
    partnershipTransportDescription:
      "Terbuka bagi mitra transportir yang ingin mendukung pengangkutan Bahan Bakar Minyak secara aman, tepat waktu, dan profesional.",
    partnershipTransportLabel: "Transportasi",
    partnershipTransportDetail: "Pengangkutan Bahan Bakar Minyak",
    partnershipDistributionTitle: "Distribusi Antarwilayah",
    partnershipDistributionDescription:
      "Membangun kerja sama untuk memperkuat penyediaan dan distribusi BBM industri ke berbagai wilayah di Indonesia.",
    partnershipDistributionLabel: "Distribusi",
    partnershipDistributionDetail: "Jaringan layanan antarwilayah",
    partnershipBusinessTitle: "Peluang Kerja Sama Usaha",
    partnershipBusinessDescription:
      "Kami terbuka untuk menjajaki peluang bersama perusahaan atau instansi yang membutuhkan mitra distribusi BBM industri.",
    partnershipBusinessLabel: "Kemitraan usaha",
    partnershipBusinessDetail: "Kolaborasi yang saling menguntungkan",
    partnershipFocus: "Fokus kemitraan",
    partnershipAction: "Pelajari Kemitraan",
    partnershipCarouselLabel: "Peluang kemitraan Petro Anigos",
    resourceEnergyTitle: "Energi Berkelanjutan",
    resourceEnergyDescription:
      "Mengenal peran B40 Biosolar dan dukungan Petro Anigos terhadap energi berbasis nabati.",
    resourceSafetyTitle: "Keselamatan Operasional",
    resourceSafetyDescription:
      "Menempatkan keamanan, ketepatan waktu, dan tanggung jawab sebagai bagian dari layanan distribusi.",
    resourcePublicationTitle: "Publikasi",
    resourcePublicationDescription:
      "Ruang untuk menyampaikan informasi, gagasan, dan materi publikasi Petro Anigos.",
    articleSectionLabel: "Anigos News",
    articleSectionTitle:
      "Perspektif tentang energi, distribusi, dan kerja sama.",
    articleSectionDescription:
      "Ruang berbagi informasi dan wawasan yang membantu memahami dunia BBM industri dengan lebih dekat.",
    viewAllArticles: "Lihat semua artikel",
    articleEnergyCategory: "Energi",
    articleEnergyTitle:
      "Mengenal B40 Biosolar dan perannya dalam kebutuhan industri",
    articleEnergyDescription:
      "Memahami komposisi B40, program mandatori pemerintah, dan standar mutu yang menjadi rujukan.",
    articleOperationsCategory: "Operasional",
    articleOperationsTitle:
      "Mengapa ketepatan waktu penting dalam distribusi BBM?",
    articleOperationsDescription:
      "Catatan tentang keandalan, keselamatan, dan koordinasi dalam mendukung kebutuhan konsumen.",
    articleInsightsCategory: "Wawasan",
    articleInsightsTitle:
      "Memilih mitra distribusi BBM untuk kebutuhan bisnis",
    articleInsightsDescription:
      "Hal-hal yang perlu diperhatikan saat menilai kualitas, legalitas, dan kesiapan layanan.",
  },
  en: {
    home: "Home",
    about: "About Us",
    products: "Products",
    reach: "Coverage",
    articles: "Articles",
    sustainability: "Sustainability",
    companyProfile: "Company Profile",
    hopes: "Aspirations & Goals",
    structure: "Company Structure",
    partnership: "Partnerships",
    legality: "Legal Information",
    productsOverview: "Explore Products",
    offer: "Request an Offer",
    fleet: "Fleet",
    news: "Anigos News",
    publications: "Publications",
    publicInformation: "Public Information Basis",
    sustainableEnergy: "Sustainable Energy",
    safety: "Operational Safety",
    governance: "Partnerships & Governance",
    achievements: "Company Milestones",
    contact: "Contact Us",
    mobileMenu: "Navigation menu",
    mobileDescription: "Explore Petro Anigos information.",
    language: "Language",
    weather: "Weather",
    weatherBmkg: "BMKG Weather",
    marketDemo: "IDX / Energy · demo",
    cookieConsentLabel: "Cookie consent",
    cookieTitle: "We use cookies",
    cookieDescription:
      "Essential cookies help the website work properly and save your preferences. Advertising and third-party analytics cookies are currently disabled.",
    cookieDetailsPrefix: "Read",
    cookieDetailsSuffix: "for usage and settings details.",
    cookieNecessary: "Necessary only",
    cookieAcceptAll: "Accept all",
    footerDescription:
      "A trusted partner for sustainable energy solutions and industrial needs.",
    footerCompany: "Company",
    footerInformation: "Information",
    footerOffer: "Request an Offer",
    heroLabel: "Petro Anigos main hero",
    heroSlideLabel: "Show slide",
    slideDurationLabel: "Slide duration",
    heroProductEyebrow: "Quality Products",
    heroProductTitle: "Energy solutions tailored to your business needs.",
    heroProductDescription:
      "Petro Anigos products and services are designed to support operational needs across different scales.",
    heroProductAction: "Request an Offer",
    heroDistributionEyebrow: "Trusted Distribution",
    heroDistributionTitle:
      "Fleet support for safe and on-time distribution.",
    heroDistributionDescription:
      "Supported by flexible fleet capacities and transport partners to reach distribution needs across regions.",
    heroDistributionAction: "View Fleet",
    heroFutureEyebrow: "Together for the Future",
    heroFutureTitle: "Building sustainable energy partnerships.",
    heroFutureDescription:
      "We are open to building professional, transparent, and mutually beneficial business relationships.",
    heroFutureAction: "Explore Partnerships",
    heroPrimaryEyebrow: "Petro Anigos",
    heroPrimaryTitle: "A trusted industrial fuel distributor in Indonesia.",
    heroPrimaryDescription:
      "Serving quality fuel distribution needs for industries with a continuously expanding operational reach.",
    heroPrimaryAction: "Explore Products",
    aspirationsBadge: "Aspirations & Goals",
    aspirationsTitle: "Distribution Today, Contribution for the Nation",
    aspirationsDescription:
      "PT. Anigos Jaya Perkasa views fuel distribution as more than a commercial activity; it is part of the journey to move industry and community life across Indonesia. Through the Petro Anigos brand, we provide distribution services focused on quality, punctuality, workplace safety, and reliability for every customer and business partner.",
    aspirationsSecondaryDescription:
      "Since our establishment on July 18, 2019, we have continued to grow professionally by maintaining strong relationships, upholding transparency and integrity, and creating room for healthy partnerships. We believe the success of energy distribution is measured not only by liters delivered, but also by the contribution it creates to the welfare of communities and the nation.",
    aspirationsAction: "Read Our Aspirations",
    companyProfileAction: "Company Profile",
    aboutEyebrow: "Getting to Know Petro Anigos",
    aboutTitle: "About Us",
    aboutDescription:
      "Through the Petro Anigos brand, PT. Anigos Jaya Perkasa is an industrial fuel distributor focused on quality, professionalism, and reliability to support industries across Indonesia.",
    aboutAction: "Learn More",
    organizationAction: "Company Structure",
    achievementsBadge: "Company Milestones",
    achievementsCardTitle:
      "A foundation growing with Indonesia's energy needs.",
    achievementsTitle:
      "Experienced, reaching further, and ready to serve.",
    achievementsDescription:
      "Since its establishment on July 18, 2019, PT. Anigos Jaya Perkasa has built a professional and trusted industrial fuel distribution foundation. This journey is reflected in an operational network spanning multiple regions and fleet capacities prepared for customers of different scales.",
    learnMoreAction: "Learn More",
    establishedSince: "Established",
    establishedDescription:
      "The founding year of PT. Anigos Jaya Perkasa based on the company's deed of establishment.",
    branchNetwork: "Branch network",
    point: "locations",
    branchDescription:
      "Branch locations listed in the company profile across Sumatra, Kalimantan, and Sulawesi.",
    fleetCapacity: "Fleet capacity options",
    choice: "options",
    fleetDescription:
      "Tank capacities from 5,000 L to 30,000 L to support distribution needs.",
    aboutSectionLabel: "About Us",
    aspirationsPageTitle: "Company Aspirations & Goals",
    aspirationsPageDescription: "Distribution Today, Contribution for the Nation",
    aspirationsPageEyebrow: "Distribution Today, Contribution for the Nation",
    aspirationsPageIntroTitle: "Energy in motion, aspirations taking root.",
    aspirationsPageIntroDescription:
      "Distributing fuel is part of our journey to help move industry and community life across Indonesia.",
    aspirationsPageBody:
      "We hope every drop of fuel we distribute can power industrial engines, support regional economies, and reach those who need it on time — from Java, Sumatra, Kalimantan, to Sulawesi.",
    aspirationsPageSecondaryBody:
      "We also hope to continue receiving protection and smooth progress in every business step, so we can uphold the trust given by our partners and customers.",
    aspirationsCompanyEyebrow: "Company Aspirations",
    aspirationsCompanyTitle: "Becoming a trusted national company.",
    aspirationsCompanyLead:
      "Our aspiration is simple yet meaningful: to be known not only for technical capability and distribution reach, but also for integrity, transparency, and commitment to everyone who works with us.",
    aspirationsCompanyBody:
      "We aim to keep developing professionally, remain open to sustainable innovation, and contribute to a healthy energy ecosystem.",
    aspirationsStandardTitle: "The standard we pursue",
    aspirationsStandardDescription:
      "Fast, safe, and punctual service is the standard, not the exception.",
    aspirationsCommitmentEyebrow: "Our Commitment to Deliver It",
    aspirationsCommitmentTitle:
      "Aspirations are delivered through consistent actions.",
    aspirationsCommitmentDescription:
      "The values we uphold every day are how we preserve trust and realize the company's aspirations.",
    aspirationsTodayTitle: "Today, and going forward.",
    aspirationsTodayDescription:
      "We believe the success of an energy distribution company is measured not only by liters delivered, but by its contribution to improving the welfare of communities and the nation.",
    aspirationsTodaySecondary:
      "That is the aspiration we continue to protect, and the goal we continue to pursue.",
    knowOurCompany: "Get to Know Our Company",
    commitmentLongTermTitle: "Long-term relationships",
    commitmentLongTermDescription:
      "Maintaining strong relationships with business partners and customers as the foundation for long-term cooperation.",
    commitmentSafeTitle: "Safe and on time",
    commitmentSafeDescription:
      "Prioritizing punctuality and workplace safety at every distribution point.",
    commitmentTransparentTitle: "Transparent and professional",
    commitmentTransparentDescription:
      "Upholding transparency and professionalism without compromising quality.",
    commitmentPartnershipTitle: "Open to partnerships",
    commitmentPartnershipDescription:
      "Opening partnership opportunities, including with the Government of Indonesia, for a healthy business climate.",
    profilePageTitle: "Company Profile",
    profilePageDescription:
      "Learn about PT. Anigos Jaya Perkasa and Petro Anigos as an industrial fuel distributor serving customers across Indonesia.",
    profileIntroTitle:
      "Building energy distribution services on a trusted foundation.",
    profileIntroDescription:
      "Petro Anigos is the brand of PT. Anigos Jaya Perkasa, a company operating as an industrial fuel distributor.",
    profileExperience:
      "PT. Anigos Jaya Perkasa has experience supplying industrial fuel needs across Indonesia, particularly Java, Sumatra, and Kalimantan.",
    profileLegalHistory:
      "The company was established on July 18, 2019, under Deed of Establishment Number 11 by Notary Andi Ismawati Achmad, S.H. It was also approved through a decree of the Minister of Law and Human Rights of the Republic of Indonesia, Number AHU-0035830.Ah.01.01 of 2019.",
    profileProductStandard:
      "In its business activities, the company operates under the Petro Anigos trademark and supplies fuel meeting quality and specifications referring to the Directorate General of Oil and Gas of Indonesia.",
    profileLegalDetailAction: "View legal details",
    companyJourneyEyebrow: "Company Journey",
    companyJourneyTitle:
      "Starting from a trusted foundation, growing to serve more widely.",
    companyJourneyDescription:
      "PT. Anigos Jaya Perkasa was established on July 18, 2019, under Deed of Establishment Number 11. Since then, the company has developed industrial fuel distribution services supported by clear legal standing, an operational network, varied fleet capacities, and transport partnerships.",
    companyPurposeEyebrow: "Company Purpose",
    companyPurposeTitle:
      "Becoming a professional and reliable fuel distribution provider.",
    companyPurposeQuote:
      "We strive to provide services with quality and quantity tailored to meet customer needs.",
    companyPurposeCaption:
      "Serving needs from large-scale operations to national-scale requirements.",
    principlesEyebrow: "Our Principles",
    principlesTitle: "The values that shape how we work.",
    principlesDescription:
      "These four principles summarize the company's goals, ethics, objectives, and values in its company profile.",
    principleGoalTitle: "Goals",
    principleGoalDescription:
      "To be known as a trading company with strong technical capability, mutual respect, and full commitment to customer satisfaction.",
    principleEthicsTitle: "Ethics",
    principleEthicsDescription:
      "Making ethical compliance and responsibility the foundation of every task we perform.",
    principleObjectiveTitle: "Objectives",
    principleObjectiveDescription:
      "Prioritizing punctuality and safety, with a commitment to accident-free operations.",
    principleValueTitle: "Values",
    principleValueDescription:
      "Operating with transparency, integrity, reliability, and professionalism to deliver high-quality products and services.",
    visionLabel: "Vision",
    visionTitle: "Becoming a trusted national company.",
    visionDescription:
      "To be a trusted national company providing various services with a work orientation and efficiency centered on speed and professionalism.",
    missionLabel: "Mission",
    missionTitle: "Growing professionally, openly, and sustainably.",
    missionDescription:
      "Developing within an ethical and open framework, embracing continuous innovation, maintaining relationships with business partners and customers, and becoming a partner of the Government of Indonesia in creating a healthy business climate.",
    legalSnapshotEyebrow: "Legal Snapshot",
    legalSnapshotTitle: "Operating on a clear legal foundation.",
    viewAllLegality: "View all legal information",
    nextStepLabel: "Next step",
    nextStepTitle:
      "Explore our products and how we support your distribution needs.",
    viewLegality: "View Legal Information",
    partnershipPageTitle: "Partnerships",
    partnershipPageDescription:
      "Building responsible cooperation to support industrial fuel distribution across Indonesia.",
    officialTransportPartnerEyebrow: "Official Transport Partner",
    officialTransportPartnerTitle:
      "A distribution network supported by licensed partners.",
    officialTransportPartnerDescription:
      "To support smooth distribution across Indonesia, PT. Anigos Jaya Perkasa works with PT Masinton Nusa Perkasa as its official transport partner.",
    transportDocumentTitle: "Transport partnership document",
    transportDocumentDescription:
      "Company profile file 8, internal page 07 “Transporter”, containing the business license certificate and partner fleet documentation.",
    downloadDocument: "Download document",
    transportPartnershipDescription:
      "This partnership supports fuel transportation needs with attention to legality, operational coordination, and service punctuality.",
    partnershipDetailEyebrow: "Partnership Details",
    partnershipDetailTitle: "Available transport license information.",
    partnershipDetailDescription:
      "The following summary is based on the business license certificate included in the company profile.",
    transportLicenseTitle: "Transportation business license certificate",
    verificationNoteTitle: "Verification note",
    verificationNote:
      "The complete address and some details of the partner entity are unclear in the source document scan. This information must be verified before being published as final data.",
    howWePartnerEyebrow: "How We Partner",
    howWePartnerTitle:
      "Cooperation built on clarity and trust.",
    howWePartnerDescription:
      "We welcome collaboration with companies or institutions exploring fuel distribution or transportation opportunities.",
    principleConnectedTitle: "Connected distribution",
    principleConnectedDescription:
      "Transport partnerships support smooth fuel distribution across operational regions.",
    principleComplianceTitle: "Strong compliance",
    principleComplianceDescription:
      "Every cooperation is directed by clear licensing and responsibility.",
    principleLongTermTitle: "Long-term relationships",
    principleLongTermDescription:
      "We maintain strong relationships with business partners, customers, and the Government of Indonesia.",
    collaborationOpenLabel: "Open for collaboration",
    collaborationTitle:
      "Let's build partnerships that support responsible energy distribution.",
    collaborationDescription:
      "Contact the Petro Anigos team to discuss distribution, transportation, or other collaboration opportunities.",
    contactUsAction: "Contact Us",
    legalityPageTitle: "Legal Information",
    legalityPageDescription:
      "Legal and licensing information forming the operational basis of PT. Anigos Jaya Perkasa as an industrial fuel distributor.",
    legalBasisEyebrow: "Company Legal Basis",
    legalBasisTitle: "Operating on a clear legal foundation.",
    legalBasisDescription:
      "This summary is based on the legal information listed in the PT. Anigos Jaya Perkasa company profile.",
    incorporationDeed: "Deed of Establishment",
    ministryApproval: "Ministry Approval",
    generalTradingLicense: "General Trading License",
    bphMigasRegistration: "BPH Migas Registration",
    trademark: "Trademark",
    transportPartnerLicense: "Transport Partner License",
    notary: "Notary Andi Ismawati Achmad, S.H.",
    year2019: "Year 2019",
    directorateOilGas: "Directorate General of Oil and Gas",
    bphMigasBusinessRegistration:
      "Oil and Gas Trading Business Registration Number",
    alsoKnownAsAnigosPetro: "Also referred to as Anigos Petro in the source",
    fuelTransportation: "Fuel transportation",
    legalDocumentsEyebrow: "Legal Documents",
    legalDocumentsTitle: "A document center for approved downloads.",
    legalDocumentsDescription:
      "This area is prepared for deeds, business licenses, certificates, and other legal documents approved for publication.",
    documentView: "View document",
    documentDownload: "Download document",
    documentsUnavailableTitle: "Documents are not yet available",
    documentsUnavailableDescription:
      "Legal PDF files will appear here once the official documents are ready and approved for publication.",
    informationTransparency: "Information transparency",
    publicDocumentsTitle: "Public documents will be added gradually.",
    publicDocumentsDescription:
      "Legal numbers can serve as an initial reference. Supporting documents will be shown after verification and publication approval are complete.",
    viewPartnership: "View Partnerships",
    fleetPageEyebrow: "Products / Fleet",
    fleetPageTitle: "Fleet capacity that follows your needs.",
    fleetPageDescription:
      "Petro Anigos fuel tankers are available in various capacities to support distribution needs from small operations to large industries.",
    fleetLandEyebrow: "Land Fleet / Trucking",
    fleetLandTitle: "One network, six capacity options.",
    fleetLandDescription:
      "Choose a capacity to view the fleet visual and usage summary. These variations help verify requirements more accurately.",
    truckingFleet: "Trucking fleet",
    distributionIllustration: "Interregional distribution illustration",
    partnershipIllustration: "Petro Anigos distribution partnership illustration",
    liter: "liters",
    fleetCapacityTitle: "Choose a volume for your distribution needs.",
    fleetCapacityDescription:
      "HSD tankers are available in several capacities to support light, regular, and industrial-scale needs.",
    availableVolume: "Available volume",
    lightNeed: "Light needs",
    flexibleDistribution: "Flexible distribution",
    regularOperations: "Regular operations",
    mediumNeed: "Medium needs",
    industrialScale: "Industrial scale",
    largeLoad: "Large load",
    interregionalDistribution: "Interregional distribution",
    seaTransport: "Sea transportation",
    seaTransportTitle: "Logistics support for interisland needs.",
    seaTransportDescription:
      "In addition to land fleets, company references mention sea transportation such as Batam Marine I to support interregional or interisland fuel transport.",
    fleetAvailabilityNote:
      "The number of vessels, schedules, capacities, and availability must be confirmed based on delivery requirements.",
    transportPartner: "Transport partner",
    transportPartnerTitle: "Distribution strengthened by official partners.",
    transportPartnerDescription:
      "PT Masinton Nusa Perkasa supports distribution as an official transport partner licensed for oil and gas transportation.",
    partnershipDetailsAction: "View partnership details",
    distributionSchemeTitle: "Distribution schemes to discuss",
    unloadingPoint: "Adjusting regions and unloading points",
    volumeSchedule: "Determining distribution volume and schedule",
    fleetVerification: "Verifying the fleet for your needs",
    readyToDiscuss: "Ready to discuss",
    fleetCtaTitle: "Find the capacity that fits your needs.",
    fleetCtaDescription:
      "Share your volume, location, schedule, and distribution mode with the Petro Anigos team.",
    submitRequirement: "Submit your requirements",
    productPageEyebrow: "Products",
    productPageTitle: "Industrial fuel for your operational needs.",
    productPageDescription:
      "Petro Anigos supplies Diesel/HSD and B40 Biosolar with quality and specifications aligned with the standards of Indonesia's Directorate General of Oil and Gas.",
    productOverviewEyebrow: "Explore Products",
    productOverviewTitle: "Two fuel options for distribution and industrial needs.",
    productOverviewDescription:
      "Petro Anigos products support customer needs through quality, accuracy, safety, and reliable service.",
    fuelProductTitle: "Fuel oil",
    fuelProductDescription:
      "Diesel fuel marketed with quality and specifications aligned with the Directorate General of Oil and Gas reference.",
    biodieselBlendTitle: "Biodiesel and diesel blend",
    biodieselBlendDescription:
      "A product following the government program with a composition of 40% Biodiesel and 60% diesel fuel.",
    b40Composition: "B40 composition",
    b40CompositionTitle: "The blend that forms B40 Biosolar",
    productUnderstandingEyebrow: "Understanding Products",
    b40ProgramTitle: "B40 Biosolar follows the government's mandatory program.",
    b40ProgramDescription:
      "B40 Biosolar is a fuel product blending 40% Biodiesel and 60% diesel fuel.",
    biodieselShare: "Biodiesel portion in the B40 composition.",
    dieselShare: "Diesel fuel portion in the composition.",
    compositionNote:
      "Product quality and specifications refer to the standards of Indonesia's Directorate General of Oil and Gas. This chart explains product composition only, not performance or savings claims.",
    briefSpecsEyebrow: "Brief Specifications",
    briefSpecsTitle: "Key information before determining your needs.",
    briefSpecsDescription:
      "This summary helps prospective customers understand the available products before submitting a distribution request.",
    information: "Information",
    details: "Details",
    purchaseSchemeEyebrow: "Purchase Scheme",
    purchaseSchemeTitle: "A transaction process that starts with your needs.",
    purchaseSchemeDescription:
      "The following is an initial overview of the purchase process. Pricing, minimum order, payment, and commercial terms are discussed according to mutual needs and approval.",
    submitNeeds: "Share your needs",
    submitNeedsDescription:
      "Share the product type, estimated volume, location, schedule, and transportation mode required.",
    verifyNeeds: "Verify requirements",
    verifyNeedsDescription:
      "The Petro Anigos team reviews product availability, volume, region, fleet, and distribution schedule.",
    offerApproval: "Offer and approval",
    offerApprovalDescription:
      "The offer is prepared based on customer requirements for discussion and mutual agreement.",
    deliverySettlement: "Delivery and settlement",
    deliverySettlementDescription:
      "The product is prepared, the fleet is assigned, and delivery and transaction documents are completed as agreed.",
    transportSchemeEyebrow: "Transportation Scheme",
    transportSchemeTitle: "Choose a distribution approach based on region and needs.",
    transportSchemeDescription:
      "Transportation modes are discussed during requirement verification so product, volume, location, and schedule can be aligned.",
    land: "Land",
    sea: "Sea",
    transportPartnerTab: "Transport partner",
    landTransportIllustration: "Land transportation illustration",
    seaTransportIllustration: "Sea transportation illustration",
    partnerTransportIllustration: "Transport partner illustration",
    landFleetTitle: "Land tanker fleet",
    landFleetDescription:
      "The fleet is available in 5,000 L, 8,000 L, 10,000 L, 16,000 L, 24,000 L, and 30,000 L capacities to support distribution from small operations to large industries.",
    viewFleet: "View fleet",
    seaTransportCardTitle: "Sea transportation",
    seaTransportCardDescription:
      "Sea transportation supports interregional or interisland fuel transport. References mention Batam Marine I as supporting documentation.",
    officialPartnerTitle: "Official transport partner",
    officialPartnerDescription:
      "Distribution is supported by PT Masinton Nusa Perkasa as an official transport partner licensed for oil and gas transportation.",
    viewPartnershipDetails: "View partnership details",
    deliveryAdjustmentEyebrow: "Delivery Adjustment",
    deliveryAdjustmentTitle: "Share your distribution requirements.",
    deliveryAdjustmentDescription:
      "Every requirement can be discussed based on product type, volume, location, schedule, and required transportation mode.",
    deliveryLocation: "Delivery location",
    volumePerDelivery: "Volume per delivery",
    deliveryFrequency: "Delivery frequency",
    receivingSchedule: "Receiving schedule",
    offerDiscussionTitle: "Topics discussed in the offer",
    commercialTerms: "Commercial terms",
    commercialTermsDescription:
      "Pricing, minimum order, payment method, and transaction terms are discussed based on the needs and approval of both parties.",
    distributionDetails: "Distribution details",
    distributionDetailsDescription:
      "Region, schedule, volume, and delivery mode are aligned before the offer is agreed.",
    productReadyToDiscuss: "Ready to discuss",
    productCtaTitle: "Share your industrial fuel requirements with Petro Anigos.",
    productCtaDescription:
      "Our team is ready to discuss the product, volume, location, and suitable distribution scheme.",
    requestOffer: "Request an offer",
    offerFormEyebrow: "Products / Offer",
    offerFormTitle: "Submit your industrial fuel requirements.",
    offerFormDescription:
      "Complete the initial information so the Petro Anigos team can understand the required product, volume, location, and distribution mode.",
    stepLabel: "Step",
    ofLabel: "of",
    configureNeeds: "Configure your requirements.",
    applicantDetails: "Complete applicant details.",
    offerFormNotice:
      "This form prepares initial information only. Pricing, minimum order, payment, and commercial terms will be confirmed during the offer process.",
    fuelType: "Fuel type",
    dieselFuelDescription: "Diesel fuel product",
    b40FuelDescription: "40% Biodiesel + 60% Diesel/HSD",
    requiredVolume: "Required volume (liters)",
    volumeRange: "1,000–30,000 L",
    volumeSliderLabel: "Required volume in liters",
    volumeSelectionDescription:
      "Move the slider to choose an estimated volume. Presets follow the available fleet capacity options.",
    deliveryRegion: "Delivery region",
    deliverySchedule: "Delivery schedule",
    scheduled: "Scheduled",
    scheduledDescription: "A target receiving date is available.",
    recurring: "Recurring",
    recurringDescription: "A recurring requirement that needs discussion.",
    asNeeded: "As needed",
    asNeededDescription: "Delivery timing will be discussed later.",
    companyName: "Company name",
    contactName: "Contact name",
    phoneNumber: "Phone number",
    unloadingAddress: "Unloading-point address",
    expectedReceivingDate: "Expected receiving date",
    chooseReceivingDate: "Choose a receiving date",
    dateConfirmationNote:
      "This date is an initial reference and will be confirmed with the Petro Anigos team.",
    requirementNotes: "Requirement notes",
    requirementNotesDescription:
      "Include frequency, special needs, or other distribution information.",
    back: "Back",
    continueApplicantDetails: "Continue to applicant details",
    prepareOfferEmail: "Prepare offer email",
    requirementEstimate: "Requirement estimate",
    temporarySummary: "Temporary summary",
    draft: "Draft",
    region: "Region",
    schedule: "Schedule",
    notFilled: "Not filled",
    fuelTaxEstimate: "Fuel tax estimate",
    fuelTaxDescription:
      "Choose a service area and PBBKB rate for a temporary simulation.",
    serviceArea: "Service area",
    basePricePerLiter: "Base price / liter",
    temporary: "temporary",
    pbbkbRate: "PBBKB rate",
    accordingToProvince: "According to province",
    priceBasis: "Price basis",
    estimatedPbbkb: "Estimated PBBKB",
    estimatedTotal: "Estimated total",
    taxSimulationNote:
      "PBBKB follows the selected province's rules and must be confirmed according to fuel usage. This simulation is not an official invoice.",
    emailOpeningNote:
      "After submission, your email application will open with the prepared requirement summary.",
    backToProducts: "Back to Explore Products",
    directDiscussionTitle: "Need to discuss your requirements directly?",
    emailPetroAnigos: "Email Petro Anigos",
    reachPageEyebrow: "Jangkauan",
    reachPageTitle: "Distribusi yang terhubung dengan kebutuhan pelanggan.",
    reachPageDescription:
      "Petro Anigos melayani kebutuhan distribusi BBM industri melalui titik operasional dan koordinasi pengiriman di beberapa wilayah Indonesia.",
    operationalNetwork: "Jaringan operasional",
    coverageOverviewTitle: "Empat kawasan, enam titik layanan.",
    coverageOverviewDescription:
      "Setiap permintaan ditinjau berdasarkan lokasi, volume, jadwal, dan moda distribusi yang paling sesuai.",
    servicePoints: "Titik layanan",
    mainRegions: "Kawasan utama",
    coverageMap: "Peta cakupan",
    regionLabel: "Kawasan",
    servedAreasEyebrow: "Area yang Dilayani",
    servedAreasTitle: "Pilih wilayah, pahami dukungan distribusinya.",
    servedAreasDescription:
      "Berikut wilayah yang tercantum dalam referensi operasional dan saat ini digunakan sebagai pilihan area layanan.",
    landMode: "Darat",
    truckingMode: "Trucking",
    interregionalMode: "Antarwilayah",
    seaMode: "Laut",
    coverageWorkEyebrow: "Cara Kerja",
    coverageWorkTitle: "Cakupan diterjemahkan menjadi rencana pengiriman.",
    coverageWorkDescription:
      "Lokasi bukan satu-satunya pertimbangan. Kami menyelaraskan kebutuhan produk dan operasional sebelum detail pengiriman dibahas.",
    reviewLocation: "Tinjau lokasi",
    reviewLocationDescription: "Identifikasi titik bongkar dan area layanan.",
    chooseMode: "Pilih moda",
    chooseModeDescription: "Sesuaikan trucking atau koordinasi antarwilayah.",
    confirmPlan: "Konfirmasi",
    confirmPlanDescription: "Bahas jadwal, volume, dan ketersediaan bersama.",
    areaVerification: "Verifikasi area",
    locationNotFoundTitle: "Belum menemukan lokasi Anda?",
    locationNotFoundDescription:
      "Sampaikan lokasi, volume, dan jadwal kebutuhan Anda. Tim kami akan meninjau opsi distribusi yang paling sesuai.",
    coverageNotice:
      "Jangkauan dan ketersediaan pengiriman perlu dikonfirmasi berdasarkan kebutuhan aktual.",
    sustainabilityPageEyebrow: "Keberlanjutan",
    sustainabilityPageTitle: "Menjalankan usaha dengan tanggung jawab yang lebih luas.",
    sustainabilityPageDescription:
      "Bagi Petro Anigos, keberlanjutan berangkat dari energi yang lebih bersih, keselamatan operasional, dan kontribusi terhadap masyarakat.",
    ourApproach: "Pendekatan Kami",
    sustainabilityIntroTitle: "Keberlanjutan bukan sekadar jargon.",
    sustainabilityIntroDescription:
      "Narasi ini dirangkum dari company profile. Data ESG formal, sertifikasi, dan angka dampak belum tersedia sehingga tidak ditampilkan sebagai klaim kuantitatif.",
    howWeWork: "Cara kami bekerja",
    actionPrinciplesTitle: "Prinsip yang diterjemahkan ke dalam tindakan.",
    actionPrinciplesDescription:
      "Kami menjaga agar setiap keputusan tetap berangkat dari kebutuhan konsumen, kepatuhan, keselamatan, dan hubungan baik dengan mitra.",
    mainFocus: "Fokus Utama",
    consistentPracticeTitle: "Membangun kepercayaan melalui praktik yang konsisten.",
    referenceSummary: "Ringkasan ini merangkum tema yang tersedia dalam referensi perusahaan.",
    continueExploring: "Lanjutkan eksplorasi",
    serveNeedsTitle: "Kenali bagaimana Petro Anigos melayani kebutuhan Anda.",
    transparencyNote:
      "Catatan transparansi: halaman ini belum memuat sertifikasi lingkungan/K3, program CSR spesifik, atau metrik emisi karena datanya belum tercantum dalam referensi perusahaan.",
    cleanerEnergy: "Energi lebih bersih",
    cleanerEnergyDescription:
      "B40 Biosolar mencampurkan 40% biodiesel dan 60% solar sebagai bagian dari program pemerintah terkait energi nabati.",
    operationalSafety: "Keselamatan operasional",
    operationalSafetyDescription:
      "Ketepatan waktu dan keamanan menjadi prioritas dalam setiap proses distribusi BBM.",
    socialContribution: "Kontribusi sosial",
    socialContributionDescription:
      "Perusahaan berkomitmen menjadi mitra yang handal serta berkontribusi pada kesejahteraan masyarakat.",
    sustainableEnergyEyebrow: "Keberlanjutan / Energi Berkelanjutan",
    sustainableEnergyTitle: "Mengenal peran B40 dalam transisi energi.",
    sustainableEnergyDescription:
      "B40 Biosolar menjadi bagian dari portofolio Petro Anigos untuk mendukung kebutuhan industri sekaligus mengikuti program mandatori biodiesel pemerintah.",
    b40IntroEyebrow: "B40 Biosolar",
    b40IntroTitle: "Komposisi yang mudah dipahami, standar yang tetap diperhatikan.",
    b40IntroDescription:
      "Produk B40 dijelaskan dalam company profile sebagai campuran 40% biodiesel dan 60% solar, dengan mutu dan spesifikasi yang mengacu pada Ditjen Migas RI.",
    biodiesel40Title: "40% biodiesel",
    biodiesel40Description: "Bagian biodiesel dalam komposisi B40 yang mengikuti program pemerintah.",
    diesel60Title: "60% solar",
    diesel60Description: "Bagian bahan bakar minyak jenis solar dalam komposisi B40.",
    specificationTitle: "Sesuai spesifikasi",
    specificationDescription:
      "Mutu produk mengacu pada standar Direktorat Jenderal Minyak dan Gas Bumi Republik Indonesia.",
    partnershipGovernanceEyebrow: "Keberlanjutan / Kemitraan & Tata Kelola",
    partnershipGovernanceTitle: "Hubungan baik yang dibangun dengan integritas.",
    partnershipGovernanceDescription:
      "Petro Anigos menjaga hubungan dengan rekan usaha, konsumen, dan Pemerintah Republik Indonesia untuk menciptakan iklim bisnis yang sehat.",
    governanceIntroEyebrow: "Tata Kelola",
    governanceIntroTitle: "Kemitraan yang bertumbuh dari kejelasan dan kepatuhan.",
    governanceIntroDescription:
      "Narasi ini menggunakan prinsip yang tercantum dalam company profile. Informasi struktur manajemen dan kebijakan tata kelola formal belum tersedia.",
    goodRelationships: "Hubungan baik",
    goodRelationshipsDescription: "Menjaga hubungan dengan rekan usaha dan konsumen sebagai bagian dari cara perusahaan bekerja.",
    compliance: "Kepatuhan",
    complianceDescription: "Menjalankan usaha dengan dasar legalitas dan izin niaga yang tercantum dalam referensi perusahaan.",
    integrity: "Integritas",
    integrityDescription: "Mendukung iklim bisnis yang sehat melalui transparansi dan profesionalisme.",
    governanceNote:
      "Struktur manajemen, kebijakan tata kelola, dan indikator kepatuhan tambahan masih memerlukan data resmi perusahaan.",
    viewPartnerships: "Lihat kemitraan",
    operationalSafetyEyebrow: "Keberlanjutan / Keselamatan Operasional",
    operationalSafetyPageTitle: "Distribusi yang tepat waktu, aman, dan bertanggung jawab.",
    operationalSafetyPageDescription:
      "Keselamatan kerja dan ketepatan waktu menjadi prioritas dalam operasional distribusi BBM Petro Anigos.",
    operationalPriorityEyebrow: "Prioritas Operasional",
    operationalPriorityTitle: "Keamanan menjadi bagian dari cara kami bekerja.",
    operationalPriorityDescription:
      "Company profile menempatkan ketepatan waktu dan operasional bebas kecelakaan sebagai sasaran kerja. Detail sertifikasi K3 belum tersedia dalam referensi.",
    accidentFree: "Bebas dari kecelakaan kerja",
    accidentFreeDescription: "Keselamatan menjadi pertimbangan utama dalam setiap operasional distribusi BBM.",
    punctuality: "Ketepatan waktu",
    punctualityDescription: "Koordinasi distribusi diarahkan untuk memenuhi kebutuhan konsumen sesuai jadwal.",
    routeCoordination: "Koordinasi rute",
    routeCoordinationDescription: "Armada dan jaringan mitra membantu mendukung pengiriman sesuai kebutuhan wilayah.",
    safetyNote:
      "Data sertifikasi K3, prosedur operasional terperinci, dan metrik keselamatan belum tersedia untuk dipublikasikan.",
    viewCoverage: "Lihat jangkauan",
    dataPolicy: "Kebijakan Data",
    dataPolicyTitle: "Sumber dan penggunaan informasi di website Petro Anigos.",
    dataPolicyDescription:
      "Halaman ini menjelaskan sumber, status, keterbatasan, dan etika penggunaan informasi cuaca serta pasar yang ditampilkan pada website.",
    contextualDataTitle: "Data pendukung harus selalu hadir bersama konteksnya.",
    contextualDataDescription:
      "Petro Anigos membedakan data demo, prakiraan, data tertunda, dan data live. Nilai yang tampil tanpa sumber atau waktu pembaruan tidak boleh dipahami sebagai informasi real-time.",
    weatherInformation: "Informasi cuaca",
    weatherInformationDescription:
      "Data cuaca direncanakan bersumber dari BMKG. Prakiraan cuaca hanya digunakan sebagai informasi umum dan bukan pengganti peringatan resmi BMKG, SOP K3, atau keputusan operasional.",
    marketInformation: "Informasi pasar",
    marketInformationDescription:
      "Ringkasan IDX/Migas pada ribbon saat ini adalah data contoh untuk kebutuhan tampilan. Data produksi hanya boleh ditampilkan setelah sumber dan hak redistribusinya diverifikasi.",
    dataTimeStatus: "Waktu dan status data",
    dataTimeStatusDescription:
      "Setiap integrasi data harus menyertakan sumber, waktu pembaruan, zona waktu, serta status seperti demo, prakiraan, tertunda, atau live.",
    responsibleUse: "Penggunaan bertanggung jawab",
    responsibleUseDescription:
      "Informasi pada ribbon tidak boleh menjadi satu-satunya dasar keputusan distribusi, keselamatan kerja, investasi, atau keputusan komersial.",
    referenceSources: "Sumber rujukan",
    attributionTitle: "Attribution harus terlihat dekat dengan datanya.",
    attributionDescription:
      "Saat integrasi resmi tersedia, attribution, timestamp, dan status data akan ditampilkan pada ribbon serta dijelaskan lebih lengkap di halaman ini.",
    bmkgWeather: "BMKG — Prakiraan Cuaca",
    bmkgWeatherDescription:
      "Sumber resmi prakiraan cuaca terbuka BMKG. Data cuaca harus menampilkan attribution BMKG pada aplikasi.",
    idxMarket: "Bursa Efek Indonesia (IDX)",
    idxMarketDescription:
      "Rujukan resmi pasar modal. Data pasar publik hanya akan digunakan setelah hak akses dan redistribusi diverifikasi.",
    disclaimer: "Disclaimer",
    dataDisclaimer:
      "Informasi cuaca dan pasar hanya disediakan untuk tujuan umum. Informasi tersebut dapat tertunda, berubah, tidak lengkap, atau tidak sesuai kondisi aktual. Data ini bukan nasihat investasi dan bukan pengganti peringatan resmi maupun prosedur operasional.",
    ribbonStatus: "Data ribbon saat ini: demo/statis",
    contactPetroAnigos: "Hubungi Petro Anigos",
    cookieTerms: "Ketentuan Cookies",
    cookieTermsTitle: "Cara kami menggunakan cookies di website Petro Anigos.",
    cookieTermsDescription:
      "Kami menggunakan cookies secara terbatas untuk mendukung fungsi dasar website dan menghormati pilihan pengunjung.",
    usageTransparency: "Transparansi penggunaan",
    cookieContextTitle: "Cookies membantu website mengingat konteks yang diperlukan.",
    cookieContextDescription:
      "Cookies adalah file data kecil yang disimpan pada perangkat ketika mengunjungi website. Ketentuan ini menjelaskan jenis, tujuan, durasi, dan pilihan yang tersedia bagi pengguna.",
    essentialCookies: "Cookies esensial",
    essentialCookiesDescription:
      "Cookies yang diperlukan agar fitur dasar website dapat berjalan, termasuk menyimpan pilihan persetujuan cookies dan membantu menjaga preferensi tampilan.",
    preferenceCookies: "Cookies preferensi",
    preferenceCookiesDescription:
      "Cookies yang dapat membantu mengingat pilihan pengguna seperti bahasa atau preferensi tampilan ketika fitur tersebut menggunakannya.",
    analyticsAdvertisingCookies: "Cookies analitik dan iklan",
    analyticsAdvertisingCookiesDescription:
      "Saat ini tidak digunakan. Jika diaktifkan di masa depan, pengguna akan diberi informasi dan pilihan yang sesuai sebelum cookie non-esensial disimpan.",
    active: "Aktif",
    limited: "Terbatas",
    inactive: "Tidak aktif",
    consentCookies: "Cookies persetujuan",
    consentDurationTitle: "Pilihanmu disimpan selama 180 hari.",
    consentDurationDescription:
      "Website menyimpan pilihan consent pada cookie bernama petro_anigos_cookie_consent. Nilainya hanya menunjukkan pilihan persetujuan, bukan data identitas.",
    necessaryChoiceDescription:
      "Pilihan “Hanya yang diperlukan” mengizinkan fungsi dasar yang dibutuhkan agar website berjalan. Pilihan “Terima semua” saat ini tetap tidak mengaktifkan analytics atau iklan karena layanan tersebut belum dipasang.",
    futureThirdPartyDescription:
      "Jika layanan pihak ketiga ditambahkan di masa depan, konfigurasi dan pemberitahuan cookies akan diperbarui sebelum kategori baru digunakan.",
    clearCookieDescription:
      "Kamu dapat menghapus cookies melalui pengaturan browser. Setelah itu banner persetujuan akan muncul kembali pada kunjungan berikutnya.",
    termsUpdate: "Pembaruan ketentuan",
    termsUpdateDescription:
      "Kami akan memperbarui halaman ini apabila teknologi, layanan, atau kebutuhan kepatuhan cookies di website berubah.",
    viewDataPolicy: "Lihat kebijakan data",
    careersEyebrow: "Tentang Kami / Karir",
    careersTitle: "Tumbuh bersama energi yang menggerakkan Indonesia.",
    careersDescription:
      "Kami mencari orang-orang yang ingin bekerja dengan tujuan, menjaga kualitas, dan membangun distribusi energi yang dapat diandalkan.",
    whyPetroAnigos: "Mengapa Petro Anigos",
    meaningfulWorkTitle: "Pekerjaan yang punya dampak nyata.",
    meaningfulWorkDescription:
      "Di sini, pekerjaan administratif, komersial, dan operasional saling terhubung untuk memastikan kebutuhan pelanggan dilayani dengan aman dan tepat.",
    growingTogether: "Cara kami bertumbuh",
    professionalHumanTitle: "Profesional dalam bekerja, manusiawi dalam berkolaborasi.",
    professionalHumanDescription:
      "Kami percaya kualitas layanan dimulai dari orang-orang yang diberi konteks, kepercayaan, dan ruang untuk mengambil tanggung jawab.",
    workExperience: "Pengalaman Bekerja",
    sharedStandardsTitle: "Hal-hal yang kami jaga bersama.",
    sharedStandardsDescription:
      "Keunggulan bekerja bukan hanya tentang fasilitas, tetapi juga tentang lingkungan yang membantu setiap orang menghasilkan pekerjaan terbaiknya.",
    careerOpenings: "Ketersediaan Lowongan",
    careerOpeningsTitle: "Temukan peran yang sesuai dengan langkahmu.",
    careerOpeningsDescription:
      "Pilih posisi yang ingin kamu pelajari. Jika belum ada peran yang sesuai, kamu tetap dapat mengirimkan profil untuk dipertimbangkan pada kebutuhan berikutnya.",
    positionsAvailable: "posisi tersedia",
    viewAndApply: "Lihat posisi & lamar",
    purposeAtWork: "Bekerja dengan tujuan",
    purposeAtWorkDescription: "Kontribusi setiap peran ikut menjaga distribusi energi yang mendukung aktivitas industri Indonesia.",
    supportiveCulture: "Budaya yang saling mendukung",
    supportiveCultureDescription: "Kami membangun komunikasi terbuka, kerja sama lintas fungsi, dan ruang untuk bertumbuh bersama.",
    fieldLearning: "Belajar dari lapangan",
    fieldLearningDescription: "Kamu akan berhadapan dengan konteks nyata distribusi, pelanggan, mitra, dan operasional.",
    safeWorkStandards: "Standar kerja yang aman",
    safeWorkStandardsDescription: "Keselamatan, kepatuhan, dan integritas menjadi bagian dari cara kami mengambil keputusan.",
    crossRoleCollaboration: "Kolaborasi lintas peran",
    crossRoleCollaborationDescription: "Ide yang baik dapat datang dari berbagai fungsi dan dibahas dengan perspektif yang beragam.",
    roomToGrow: "Ruang untuk berkembang",
    roomToGrowDescription: "Kami menghargai inisiatif, tanggung jawab, dan keinginan untuk meningkatkan kualitas kerja.",
    operations: "Operasional",
    commercial: "Komersial",
    fullTime: "Full-time",
    distributionOperationsStaff: "Staff Operasional Distribusi",
    distributionOperationsSummary:
      "Mendukung koordinasi jadwal, dokumen, dan komunikasi distribusi bersama pelanggan serta mitra transportasi.",
    salesAccountExecutive: "Sales & Account Executive",
    salesAccountSummary:
      "Membangun hubungan dengan calon pelanggan dan membantu menerjemahkan kebutuhan energi menjadi solusi layanan.",
    careersFormEyebrow: "Karir / Lamaran",
    careersFormTitle: "Ceritakan langkah berikutnya.",
    careersFormDescription:
      "Lengkapi data singkat dan lampirkan CV terbaru. Tim kami akan meninjau profil yang masuk sesuai kebutuhan posisi.",
    applicationForm: "Form lamaran",
    sendYourProfile: "Kirim profilmu",
    cvMaximum: "CV maksimal 5 MB",
    dataReadyForReview: "Data siap ditinjau",
    applicationThanks:
      "Terima kasih. Form dan CV sudah tervalidasi di browser. Hubungkan handler pengiriman ke CMS atau email rekrutmen sebelum digunakan di produksi.",
    sendAnotherApplication: "Kirim lamaran lain",
    fullName: "Nama lengkap",
    fullNamePlaceholder: "Nama lengkap",
    positionInterested: "Posisi yang diminati",
    choosePosition: "Pilih posisi",
    shortMessage: "Pesan singkat",
    shortMessagePlaceholder: "Ceritakan pengalaman atau alasan kamu tertarik...",
    cvSupportingDocument: "CV / dokumen pendukung",
    removeFile: "Hapus",
    validatedFile: "File tervalidasi",
    addFile: "Tambah file",
    chooseFile: "Pilih file",
    supportedFileTypes: "PDF, DOC, atau DOCX · maksimal 5 MB per file",
    cvFormatError: "CV harus berupa PDF, DOC, atau DOCX.",
    fileSizeError: "ukuran file maksimal 5 MB.",
    attachCvError: "Silakan lampirkan setidaknya satu file CV terlebih dahulu.",
    applicationFailed: "Lamaran gagal diproses.",
    sending: "Mengirim...",
    sendApplication: "Kirim lamaran",
    bekasiCoverageDescription: "Titik layanan untuk kebutuhan distribusi di kawasan Jabodetabek dan sekitarnya.",
    palembangCoverageDescription: "Mendukung kebutuhan BBM industri dan distribusi di wilayah Sumatera Selatan.",
    medanCoverageDescription: "Titik operasional untuk kebutuhan pelanggan di Sumatera Utara dan area sekitarnya.",
    palangkaRayaCoverageDescription: "Mendukung koordinasi pengiriman BBM untuk kebutuhan operasional di Kalimantan Tengah.",
    northSulawesiCoverageDescription: "Titik operasional yang melayani kebutuhan distribusi di wilayah Sulawesi Utara.",
    southSulawesiCoverageDescription: "Titik operasional untuk mendukung kebutuhan pelanggan di Sulawesi Selatan.",
    offerPageEyebrow: "Products / Offer",
    offerPageTitle: "Starting with your needs, we prepare the discussion.",
    offerPageDescription:
      "Share your industrial fuel requirements so the Petro Anigos team can review the suitable product, volume, location, schedule, and distribution scheme.",
    needsBasedOffer: "Needs-based offer",
    beforeSubmitting: "Before submitting",
    offerPreparationTitle: "Simple information helps make the discussion more focused.",
    offerPreparationDescription:
      "You do not need to prepare complex commercial specifications. Start with the operational information you already know.",
    prepareForOffer: "What to prepare",
    productTypePreparation: "Product type",
    productTypePreparationDescription: "Diesel/HSD or B40 Biosolar based on your operational needs.",
    volumePreparation: "Required volume",
    volumePreparationDescription: "Estimated volume per delivery or recurring requirements.",
    locationSchedulePreparation: "Location and schedule",
    locationSchedulePreparationDescription: "Unloading point region and planned receiving time.",
    distributionModePreparation: "Distribution mode",
    distributionModePreparationDescription: "Land fleet, sea transportation, or transport partner requirements.",
    offerFlowEyebrow: "Discussion Flow",
    offerFlowTitle: "From initial information to an offer discussed together.",
    offerFlowDescription:
      "This flow helps align requirements before transaction and delivery details are agreed.",
    offerStepOne: "Share your needs",
    offerStepOneDescription:
      "Submit initial product, volume, region, schedule, and company details.",
    offerStepTwo: "Verify together",
    offerStepTwoDescription:
      "The Petro Anigos team reviews requirements, availability, fleet, and distribution scheme.",
    offerStepThree: "Discuss the offer",
    offerStepThreeDescription:
      "Pricing, minimum order, payment, and transaction terms are discussed according to your needs.",
    discussionScopeEyebrow: "Discussion Scope",
    discussionScopeTitle: "Commercial and distribution details are confirmed together.",
    discussionScopeDescription:
      "Information in the form is an initial discussion basis, not a price determination or delivery guarantee.",
    offerScopeNotice:
      "Pricing, minimum order, payment, and delivery availability are discussed after requirements and operational details are verified.",
    supportingData: "Supporting data",
    supportingDataDescription:
      "If available, you may add notes about delivery frequency, special unloading-point needs, or other operational context.",
    offerCommercialDescription:
      "Pricing, minimum order, payment method, and transaction requirements are discussed based on the needs and approval of both parties.",
    offerDistributionDescription:
      "Region, schedule, volume, delivery mode, and fleet availability are aligned during verification.",
    offerCtaEyebrow: "Ready to discuss",
    offerCtaTitle: "Start a focused discussion with Petro Anigos.",
    offerCtaDescription:
      "Share the information you already know and let our team help structure the next steps.",
    productsSectionLabel: "Petro Anigos Products",
    productFeaturedCategory: "Featured product",
    productFeaturedDescription:
      "Fuel made by blending 40% Biodiesel and 60% diesel fuel, following the government's mandatory program.",
    productComposition: "B40 composition",
    productBiodiesel: "Biodiesel",
    productDiesel: "Diesel",
    productQualityStandard: "Quality standard",
    productGovernmentProgram: "Program",
    productGovernmentMandate: "Government mandate",
    productIndustrialCategory: "Industrial fuel",
    productIndustrialDescription:
      "Diesel or HSD fuel supporting customers from small-scale needs to large and national-scale operations.",
    productEnergyForIndustry: "Energy for industrial needs",
    productType: "Product type",
    productServiceScale: "Service scale",
    productSmallToNational: "Small to national",
    productDistribution: "Distribution",
    productLandAndSea: "Land and sea",
    productPosition: "Product position",
    productSupport:
      "Supported by Petro Anigos distribution capabilities for customers requiring land and interregional services.",
    partnershipSectionLabel: "Petro Anigos Partnerships",
    partnershipTitle: "Growing through trusted collaboration.",
    partnershipDescription:
      "We welcome collaboration with companies and institutions committed to building safe, professional, and mutually strengthening energy distribution services.",
    partnershipTransportTitle: "Fuel Transportation Partnership",
    partnershipTransportDescription:
      "Open to transport partners who want to support safe, punctual, and professional fuel transportation.",
    partnershipTransportLabel: "Transportation",
    partnershipTransportDetail: "Fuel transportation",
    partnershipDistributionTitle: "Interregional Distribution",
    partnershipDistributionDescription:
      "Building cooperation to strengthen the supply and distribution of industrial fuel across Indonesia.",
    partnershipDistributionLabel: "Distribution",
    partnershipDistributionDetail: "Interregional service network",
    partnershipBusinessTitle: "Business Collaboration Opportunities",
    partnershipBusinessDescription:
      "We are open to exploring opportunities with companies or institutions seeking an industrial fuel distribution partner.",
    partnershipBusinessLabel: "Business partnership",
    partnershipBusinessDetail: "Mutually beneficial collaboration",
    partnershipFocus: "Partnership focus",
    partnershipAction: "Explore Partnerships",
    partnershipCarouselLabel: "Petro Anigos partnership opportunities",
    resourceEnergyTitle: "Sustainable Energy",
    resourceEnergyDescription:
      "Learn about B40 Biosolar and Petro Anigos' support for plant-based energy.",
    resourceSafetyTitle: "Operational Safety",
    resourceSafetyDescription:
      "Making safety, punctuality, and responsibility part of distribution services.",
    resourcePublicationTitle: "Publications",
    resourcePublicationDescription:
      "A space for Petro Anigos information, ideas, and publication materials.",
    articleSectionLabel: "Anigos News",
    articleSectionTitle:
      "Perspectives on energy, distribution, and collaboration.",
    articleSectionDescription:
      "A space for information and insights to help understand the industrial fuel landscape more closely.",
    viewAllArticles: "View all articles",
    articleEnergyCategory: "Energy",
    articleEnergyTitle:
      "Understanding B40 Biosolar and its role in industrial needs",
    articleEnergyDescription:
      "Understanding B40 composition, the government's mandatory program, and its applicable quality standards.",
    articleOperationsCategory: "Operations",
    articleOperationsTitle:
      "Why punctuality matters in fuel distribution",
    articleOperationsDescription:
      "Notes on reliability, safety, and coordination in supporting customer needs.",
    articleInsightsCategory: "Insights",
    articleInsightsTitle:
      "Choosing a fuel distribution partner for business needs",
    articleInsightsDescription:
      "What to consider when assessing quality, legality, and service readiness.",
  },
} as const

export type TranslationKey = keyof (typeof messages)["id"]

export function translate(locale: Locale, key: TranslationKey) {
  return messages[locale][key]
}

const weatherConditionTranslations: Record<
  Locale,
  Record<string, string>
> = {
  id: {
    cerah: "Cerah",
    "cerah berawan": "Cerah berawan",
    berawan: "Berawan",
    "hujan ringan": "Hujan ringan",
  },
  en: {
    cerah: "Clear",
    "cerah berawan": "Partly cloudy",
    berawan: "Cloudy",
    "hujan ringan": "Light rain",
  },
}

export function translateWeatherCondition(
  locale: Locale,
  condition: string
) {
  const normalizedCondition = condition.trim().toLocaleLowerCase("id-ID")
  return weatherConditionTranslations[locale][normalizedCondition] ?? condition
}
