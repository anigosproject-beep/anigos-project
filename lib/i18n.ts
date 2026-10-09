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
    clientNav: "Client",
    partnership: "Kemitraan",
    legality: "Legalitas",
    career: "Karir",
    productsOverview: "Kenali Produk",
    offer: "Penawaran",
    services: "Layanan",
    fleet: "Armada",
    news: "Anigos News",
    publications: "Galeri",
    publicInformation: "Landasan Informasi Publik",
    sustainableEnergy: "Energi Berkelanjutan",
    csr: "CSR",
    safety: "Keselamatan Operasional",
    governance: "Kemitraan & Tata Kelola",
    achievements: "Pencapaian Perusahaan",
    contact: "Hubungi Kami",
    mobileMenu: "Menu navigasi",
    mobileDescription: "Jelajahi informasi Petro Anigos.",
    language: "Bahasa",
    switchToLight: "Gunakan mode terang",
    switchToDark: "Gunakan mode gelap",
    navAboutDescription: "Mengenal identitas dan cara kami bekerja.",
    navCompanyProfileDescription:
      "Identitas, visi, misi, dan nilai perusahaan.",
    navHopesDescription: "Arah kontribusi dan cita-cita perusahaan.",
    navStructureDescription: "Struktur dan jaringan operasional perusahaan.",
    navClientDescription: "Perusahaan yang telah menggunakan layanan kami.",
    navLegalityDescription: "Informasi legalitas dan perizinan perusahaan.",
    navCareerDescription: "Bergabung dan berkembang bersama Petro Anigos.",
    navProductsDescription: "Solusi BBM untuk kebutuhan industri.",
    navProductsOverviewDescription: "Mengenal produk dan spesifikasi BBM.",
    navOfferDescription: "Ajukan kebutuhan dan dapatkan penawaran.",
    navFleetDescription: "Kapabilitas armada dan distribusi kami.",
    navServicesDescription: "Layanan distribusi darat dan Marine Fuel.",
    navArticlesDescription:
      "Berita, publikasi, dan landasan informasi Petro Anigos.",
    navNewsDescription: "Berita dan kabar terbaru dari Petro Anigos.",
    navPublicationsDescription:
      "Dokumentasi kemitraan, distribusi, dan operasional.",
    navPublicInformationDescription:
      "Pedoman hukum untuk artikel dan publikasi.",
    navSustainableEnergyDescription:
      "Peran B40 Biosolar dalam mendukung energi berbasis nabati.",
    navCsrDescription:
      "Kegiatan tanggung jawab sosial perusahaan yang terdokumentasi per tahun.",
    navSafetyDescription:
      "Komitmen terhadap distribusi BBM yang aman dan profesional.",
    navGovernanceDescription:
      "Transparansi, integritas, dan kemitraan yang bertanggung jawab.",
    navAchievementsDescription:
      "Milestone dan perkembangan operasional perusahaan.",
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
    heroVideoSeek: "Geser video",
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
    landServiceEyebrow: "Distribusi Darat",
    landServiceTitle:
      "Jangkauan armada darat yang siap mendukung kebutuhan Anda.",
    landServiceDescription:
      "Armada tangki HSD tersedia dalam kapasitas 5.000 hingga 30.000 liter. Pengalaman distribusi kami mencakup Pulau Jawa, Sumatera, dan Kalimantan, didukung mitra transportir untuk menjangkau kebutuhan di berbagai wilayah Indonesia.",
    serviceFleetCapacity: "Pilihan kapasitas armada tangki HSD",
    serviceFleetCoverage: "Jawa · Sumatera · Kalimantan",
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
    productPageTitle:
      "Solar industri untuk beragam kebutuhan, termasuk Marine Fuel.",
    productPageDescription:
      "Kami menerima kebutuhan solar industri dari berbagai jenis dan spesifikasi, termasuk Solar/HSD dan Biosolar, serta kebutuhan Marine Fuel. Sampaikan jenis produk, volume, lokasi, dan jadwal pengiriman agar dapat kami diskusikan bersama.",
    homeProductsEyebrow: "Produk & Layanan Kami",
    homeProductsTitle:
      "Solusi Bahan Bakar Industri untuk Setiap Kebutuhan Operasional",
    homeProductsDescription:
      "Kami menyediakan solar industri berkualitas dengan jaringan distribusi ke seluruh Indonesia, didukung sistem logistik terintegrasi dan skema kemitraan B2B yang fleksibel.",
    homeProductBiosolarTitle: "Biosolar Industri (B35/B40)",
    homeProductBiosolarDescription:
      "Campuran biodiesel untuk manufaktur dan pembangkit.",
    homeProductBiosolarBadge: "Bahan bakar nabati",
    homeProductDexliteTitle: "Dexlite",
    homeProductDexliteDescription: "Solar untuk alat berat dan mesin industri.",
    homeProductPerformanceBadge: "Performa tinggi",
    homeProductHsdTitle: "HSD / Pertamina Dex",
    homeProductHsdDescription:
      "Solar premium untuk kebutuhan operasional khusus.",
    homeProductPremiumBadge: "Spesifikasi khusus",
    homeProductBulkTitle: "Solar Curah (Bulk Supply)",
    homeProductBulkDescription:
      "Pasokan volume besar terjadwal untuk kebutuhan korporasi.",
    homeProductB2bBadge: "Layanan B2B",
    homeProductLearnMore: "Pelajari lebih lanjut",
    homeProductsCta: "Lihat Semua Produk",
    homeProductsInquiry: "Ingin mendiskusikan kebutuhan Anda?",
    homeProductsContact: "Hubungi kami",
    marineFuelEyebrow: "Layanan Marine Fuel",
    marineFuelTitle: "Dukungan bahan bakar untuk kebutuhan maritim.",
    marineFuelDescription:
      "PT. Anigos Jaya Perkasa juga melayani kebutuhan Marine Fuel untuk mendukung operasional sektor maritim. Kebutuhan produk, volume, lokasi, dan jadwal pengiriman dapat dibahas bersama tim kami.",
    marineFuelProductSupport: "Kebutuhan Marine Fuel",
    marineFuelFlexibleDistribution: "Dukungan distribusi laut",
    marineFuelCta: "Diskusikan Kebutuhan Marine Fuel",
    marineFuelVideoPlaceholder: "Video Marine Fuel",
    marineFuelVideoPending:
      "Video akan tampil di sini setelah diunggah ke Sanity.",
    marineFuelVideoTooLarge:
      "Ukuran video Marine Fuel melebihi batas pemutaran {size}. Video tidak dapat ditampilkan.",
    productMarineFuelTitle: "Marine Fuel untuk kebutuhan operasional maritim.",
    productMarineFuelDescription:
      "Kami menerima kebutuhan Marine Fuel untuk beragam kegiatan maritim. Sampaikan jenis produk, volume, lokasi, dan jadwal pengiriman agar dapat kami diskusikan sesuai kebutuhan operasional Anda.",
    productMarineFuelProductSupport: "Beragam kebutuhan Marine Fuel",
    productMarineFuelDistribution: "Rencana pasokan sesuai kebutuhan",
    productOverviewEyebrow: "Kenali Produk",
    productOverviewTitle:
      "Pilihan solar industri untuk beragam kebutuhan operasional.",
    productOverviewDescription:
      "Kami menerima kebutuhan berbagai jenis solar industri, termasuk Solar/HSD dan Biosolar. Jenis produk, spesifikasi, volume, lokasi, serta jadwal pasokan dapat disampaikan untuk dibahas bersama tim kami.",
    productNoPublishedProducts:
      "Belum ada produk yang dipublikasikan. Tambahkan produk melalui Sanity Studio.",
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
    transportSchemeTitle:
      "Pilih pendekatan distribusi sesuai wilayah dan kebutuhan.",
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
    productCtaTitle:
      "Sampaikan kebutuhan BBM industri Anda kepada Petro Anigos.",
    productCtaDescription:
      "Tim kami siap membahas produk, volume, lokasi, dan skema distribusi yang sesuai.",
    requestOffer: "Ajukan Penawaran",
    offerFormEyebrow: "Layanan Bisnis / Permintaan Penawaran",
    offerFormTitle: "Sampaikan kebutuhan pasokan BBM industri Anda.",
    offerFormDescription:
      "Berikan informasi kebutuhan produk dan pengiriman agar tim Petro Anigos dapat meninjau permintaan Anda dan menyiapkan pembahasan penawaran yang sesuai.",
    stepLabel: "Langkah",
    ofLabel: "dari",
    configureNeeds: "Rincian produk dan kebutuhan pasokan",
    applicantDetails: "Informasi perusahaan dan narahubung",
    offerFormNotice:
      "Informasi ini menjadi dasar peninjauan awal. Harga, minimum pemesanan, metode pembayaran, ketersediaan, dan ketentuan komersial akan dibahas serta dikonfirmasi secara terpisah.",
    fuelType: "Jenis produk BBM",
    dieselFuelDescription:
      "Bahan bakar minyak jenis solar untuk kebutuhan industri",
    b40FuelDescription: "40% Biodiesel + 60% Solar/HSD",
    requiredVolume: "Estimasi volume kebutuhan (liter)",
    volumeRange: "1.000–30.000 L",
    volumeSliderLabel: "Pilih estimasi volume dalam liter",
    volumeSelectionDescription:
      "Pilih perkiraan volume per pengiriman. Pilihan volume di bawah merupakan acuan awal dan akan ditinjau kembali berdasarkan kebutuhan operasional.",
    deliveryRegion: "Wilayah tujuan pengiriman",
    deliverySchedule: "Pola dan jadwal pasokan",
    scheduled: "Satu kali / terjadwal",
    scheduledDescription: "Terdapat target tanggal penerimaan.",
    recurring: "Pasokan berkala",
    recurringDescription:
      "Kebutuhan pasokan berulang untuk dibahas lebih lanjut.",
    asNeeded: "Jadwal fleksibel",
    asNeededDescription: "Jadwal pengiriman akan diselaraskan kemudian.",
    companyName: "Nama perusahaan",
    contactName: "Nama narahubung perusahaan",
    phoneNumber: "Nomor telepon narahubung",
    unloadingAddress: "Alamat lengkap lokasi penerimaan / titik bongkar",
    expectedReceivingDate: "Target tanggal penerimaan",
    chooseReceivingDate: "Pilih target tanggal",
    dateConfirmationNote:
      "Tanggal yang dipilih merupakan target awal dan akan dikonfirmasi berdasarkan ketersediaan produk serta jadwal distribusi.",
    requirementNotes: "Persyaratan dan informasi tambahan",
    requirementNotesDescription:
      "Cantumkan frekuensi pasokan, spesifikasi, persyaratan lokasi, jam operasional, atau ketentuan penerimaan yang perlu dipertimbangkan.",
    back: "Kembali ke tahap sebelumnya",
    continueApplicantDetails: "Lanjutkan ke informasi perusahaan",
    prepareOfferEmail: "Lanjutkan melalui email",
    requirementEstimate: "Ringkasan permintaan",
    temporarySummary: "Estimasi awal — untuk pembahasan",
    draft: "Belum dikirim",
    region: "Wilayah tujuan",
    schedule: "Pola pasokan",
    notFilled: "Belum dicantumkan",
    fuelTaxEstimate: "Simulasi estimasi biaya",
    fuelTaxDescription:
      "Simulasi ini menggunakan harga dasar indikatif dan tarif PBBKB yang dimasukkan pengguna. Nilainya bukan penawaran harga resmi.",
    serviceArea: "Wilayah acuan simulasi",
    basePricePerLiter: "Harga dasar indikatif per liter",
    temporary: "acuan awal",
    pbbkbRate: "Tarif PBBKB (%)",
    accordingToProvince: "Masukkan tarif sesuai ketentuan daerah",
    priceBasis: "Nilai produk sebelum PBBKB",
    estimatedPbbkb: "Estimasi PBBKB",
    estimatedTotal: "Estimasi nilai termasuk PBBKB",
    taxSimulationNote:
      "Tarif PBBKB dan perlakuan pajak harus diverifikasi berdasarkan ketentuan yang berlaku serta transaksi aktual. Simulasi ini bukan penawaran, faktur, atau tagihan resmi.",
    emailOpeningNote:
      "Tombol di atas akan membuka aplikasi email Anda dengan ringkasan permintaan yang telah disiapkan untuk ditinjau sebelum dikirim.",
    backToProducts: "Kembali ke halaman produk",
    directDiscussionTitle: "Perlu membahas kebutuhan pasokan secara langsung?",
    emailPetroAnigos: "Hubungi tim Petro Anigos melalui email",
    offerEmailSubject: "Permintaan Penawaran BBM Industri",
    prospectiveCustomer: "Calon pelanggan",
    notCalculated: "Belum tersedia",
    emailAddress: "Alamat email",
    coverageBekasi: "Bekasi",
    coveragePalembang: "Palembang",
    coverageMedan: "Medan",
    coveragePalangkaRaya: "Palangka Raya",
    coverageNorthSulawesi: "Sulawesi Utara",
    coverageSouthSulawesi: "Sulawesi Selatan",
    provinceWestJava: "Jawa Barat",
    provinceSouthSumatra: "Sumatera Selatan",
    provinceNorthSumatra: "Sumatera Utara",
    provinceCentralKalimantan: "Kalimantan Tengah",
    provinceNorthSulawesi: "Sulawesi Utara",
    provinceSouthSulawesi: "Sulawesi Selatan",
    reachPageEyebrow: "Jangkauan nasional",
    reachPageTitle: "Distribusi BBM industri di seluruh Indonesia.",
    reachPageDescription:
      "Petro Anigos melayani kebutuhan bisnis di seluruh Indonesia melalui koordinasi distribusi BBM industri, perencanaan operasional, dan dukungan pengiriman yang terukur.",
    operationalNetwork: "Jaringan distribusi nasional",
    coverageOverviewTitle: "Cakupan nasional — seluruh Indonesia.",
    coverageOverviewDescription:
      "Setiap kebutuhan bisnis ditinjau berdasarkan lokasi pengiriman, volume produk, jadwal, dan moda distribusi yang paling sesuai.",
    servicePoints: "Lingkup layanan",
    mainRegions: "Fokus layanan",
    coverageMap: "Peta jangkauan nasional",
    nationwideIndonesia: "Seluruh Indonesia",
    coverageCardHint: "Arahkan atau tekan untuk detail",
    coverageCardReturnHint: "Arahkan keluar untuk kembali",
    regionLabel: "Region",
    servedAreasEyebrow: "Referensi area operasional",
    servedAreasTitle: "Dukungan distribusi untuk kebutuhan bisnis.",
    servedAreasDescription:
      "Area berikut merupakan referensi operasional. Ajukan kebutuhan Anda untuk mengonfirmasi rencana layanan yang paling sesuai di lokasi mana pun di Indonesia.",
    landMode: "Land",
    truckingMode: "Trucking",
    interregionalMode: "Interregional",
    seaMode: "Sea",
    coverageWorkEyebrow: "Perencanaan pengiriman bisnis",
    coverageWorkTitle:
      "Dari jangkauan nasional menjadi rencana pengiriman yang jelas.",
    coverageWorkDescription:
      "Kami menyelaraskan titik bongkar, kebutuhan produk, volume, jadwal, dan moda distribusi sebelum mengonfirmasi detail pengiriman.",
    reviewLocation: "Petakan kebutuhan",
    reviewLocationDescription:
      "Identifikasi lokasi pengiriman, titik bongkar, dan konteks operasional.",
    chooseMode: "Selaraskan moda distribusi",
    chooseModeDescription:
      "Pilih koordinasi darat, trucking, laut, atau antarwilayah yang paling sesuai.",
    confirmPlan: "Konfirmasi rencana pengiriman",
    confirmPlanDescription:
      "Tinjau volume, jadwal, ketersediaan, dan kebutuhan pelaksanaan bersama.",
    areaVerification: "Requirement verification",
    locationNotFoundTitle: "Kebutuhan Anda berada di luar area referensi?",
    locationNotFoundDescription:
      "Sampaikan lokasi pengiriman, volume produk, dan jadwal kebutuhan Anda. Tim kami akan meninjau opsi distribusi yang paling sesuai untuk bisnis Anda di seluruh Indonesia.",
    coverageNotice:
      "Jangkauan nasional didukung melalui perencanaan yang terkoordinasi. Ketersediaan pengiriman dikonfirmasi berdasarkan kebutuhan aktual.",
    sustainabilityPageEyebrow: "Sustainability",
    sustainabilityPageTitle:
      "Menjalankan usaha dengan tanggung jawab yang lebih luas.",
    sustainabilityPageDescription:
      "Bagi Petro Anigos, keberlanjutan berangkat dari energi yang lebih bersih, keselamatan operasional, dan kontribusi terhadap masyarakat.",
    ourApproach: "Pendekatan Kami",
    sustainabilityIntroTitle: "Sustainability is more than a slogan.",
    sustainabilityIntroDescription:
      "Narasi ini dirangkum dari company profile. Data ESG formal, sertifikasi, dan angka dampak belum tersedia sehingga tidak ditampilkan sebagai klaim kuantitatif.",
    howWeWork: "Cara kami bekerja",
    actionPrinciplesTitle: "Principles translated into action.",
    actionPrinciplesDescription:
      "Kami menjaga agar setiap keputusan tetap berangkat dari kebutuhan konsumen, kepatuhan, keselamatan, dan hubungan baik dengan mitra.",
    mainFocus: "Main focus",
    consistentPracticeTitle:
      "Membangun kepercayaan melalui praktik yang konsisten.",
    referenceSummary:
      "Ringkasan ini merangkum tema yang tersedia dalam referensi perusahaan.",
    continueExploring: "Continue exploring",
    serveNeedsTitle: "Kenali bagaimana Petro Anigos melayani kebutuhan Anda.",
    transparencyNote:
      "Catatan transparansi: halaman ini belum memuat sertifikasi lingkungan/K3, program CSR spesifik, atau metrik emisi karena datanya belum tercantum dalam referensi perusahaan.",
    cleanerEnergy: "Energi lebih bersih",
    cleanerEnergyDescription:
      "B40 Biosolar mencampurkan 40% biodiesel dan 60% solar sebagai bagian dari program pemerintah terkait energi nabati.",
    operationalSafety: "Keselamatan operasional",
    operationalSafetyDescription:
      "Ketepatan waktu dan keamanan menjadi prioritas dalam setiap proses distribusi BBM.",
    socialContribution: "Social contribution",
    socialContributionDescription:
      "Perusahaan berkomitmen menjadi mitra yang handal serta berkontribusi pada kesejahteraan masyarakat.",
    sustainableEnergyEyebrow: "Keberlanjutan / Energi Berkelanjutan",
    sustainableEnergyTitle: "Mengenal peran B40 dalam transisi energi.",
    sustainableEnergyDescription:
      "B40 Biosolar menjadi bagian dari portofolio Petro Anigos untuk mendukung kebutuhan industri sekaligus mengikuti program mandatori biodiesel pemerintah.",
    b40IntroEyebrow: "B40 Biosolar",
    b40IntroTitle:
      "Komposisi yang mudah dipahami, standar yang tetap diperhatikan.",
    b40IntroDescription:
      "Produk B40 dijelaskan dalam company profile sebagai campuran 40% biodiesel dan 60% solar, dengan mutu dan spesifikasi yang mengacu pada Ditjen Migas RI.",
    biodiesel40Title: "40% biodiesel",
    biodiesel40Description:
      "Bagian biodiesel dalam komposisi B40 yang mengikuti program pemerintah.",
    diesel60Title: "60% diesel",
    diesel60Description:
      "Bagian bahan bakar minyak jenis solar dalam komposisi B40.",
    specificationTitle: "Sesuai spesifikasi",
    specificationDescription:
      "Mutu produk mengacu pada standar Direktorat Jenderal Minyak dan Gas Bumi Republik Indonesia.",
    csrEyebrow: "Corporate Social Responsibility",
    csrTitle:
      "CSR: Tumbuh bersama masyarakat melalui kontribusi yang bermakna.",
    csrDescription:
      "Dokumentasi kegiatan CSR Petro Anigos dari tahun ke tahun, sebagai catatan kontribusi dan kebersamaan dengan masyarakat.",
    csrIntroTitle: "Kontribusi yang berangkat dari kepedulian.",
    csrIntroDescription:
      "Jelajahi kegiatan tanggung jawab sosial perusahaan berdasarkan tahun pelaksanaan. Setiap catatan memuat informasi dan dokumentasi yang telah disiapkan perusahaan.",
    csrTimelineEyebrow: "Jejak Kegiatan",
    csrTimelineTitle: "Annual CSR journey",
    csrTimelineDescription:
      "Pilih tahun untuk melihat rangkaian kegiatan CSR yang telah didokumentasikan.",
    csrYearNavigation: "Pilih tahun kegiatan CSR",
    csrActivitiesLabel: "Activities",
    csrNoActivitiesTitle: "No CSR activities have been added",
    csrNoActivitiesDescription:
      "Dokumentasi kegiatan tahunan akan ditampilkan di sini setelah ditambahkan melalui pengelolaan konten.",
    csrDateNotSet: "Tanggal kegiatan belum dicantumkan",
    partnershipGovernanceEyebrow: "Sustainability / Partnerships & Governance",
    partnershipGovernanceTitle:
      "Hubungan baik yang dibangun dengan integritas.",
    partnershipGovernanceDescription:
      "Petro Anigos menjaga hubungan dengan rekan usaha, konsumen, dan Pemerintah Republik Indonesia untuk menciptakan iklim bisnis yang sehat.",
    governanceIntroEyebrow: "Governance",
    governanceIntroTitle:
      "Kemitraan yang bertumbuh dari kejelasan dan kepatuhan.",
    governanceIntroDescription:
      "Narasi ini menggunakan prinsip yang tercantum dalam company profile. Informasi struktur manajemen dan kebijakan tata kelola formal belum tersedia.",
    goodRelationships: "Good relationships",
    goodRelationshipsDescription:
      "Menjaga hubungan dengan rekan usaha dan konsumen sebagai bagian dari cara perusahaan bekerja.",
    compliance: "Compliance",
    complianceDescription:
      "Menjalankan usaha dengan dasar legalitas dan izin niaga yang tercantum dalam referensi perusahaan.",
    integrity: "Integrity",
    integrityDescription:
      "Mendukung iklim bisnis yang sehat melalui transparansi dan profesionalisme.",
    governanceNote:
      "Struktur manajemen, kebijakan tata kelola, dan indikator kepatuhan tambahan masih memerlukan data resmi perusahaan.",
    viewPartnerships: "View partnerships",
    operationalSafetyEyebrow: "Keberlanjutan / Keselamatan Operasional",
    operationalSafetyPageTitle:
      "Distribusi yang tepat waktu, aman, dan bertanggung jawab.",
    operationalSafetyPageDescription:
      "Keselamatan kerja dan ketepatan waktu menjadi prioritas dalam operasional distribusi BBM Petro Anigos.",
    operationalPriorityEyebrow: "Prioritas Operasional",
    operationalPriorityTitle: "Keamanan menjadi bagian dari cara kami bekerja.",
    operationalPriorityDescription:
      "Company profile menempatkan ketepatan waktu dan operasional bebas kecelakaan sebagai sasaran kerja. Detail sertifikasi K3 belum tersedia dalam referensi.",
    accidentFree: "Accident-free operations",
    accidentFreeDescription:
      "Keselamatan menjadi pertimbangan utama dalam setiap operasional distribusi BBM.",
    punctuality: "Punctuality",
    punctualityDescription:
      "Koordinasi distribusi diarahkan untuk memenuhi kebutuhan konsumen sesuai jadwal.",
    routeCoordination: "Route coordination",
    routeCoordinationDescription:
      "Armada dan jaringan mitra membantu mendukung pengiriman sesuai kebutuhan wilayah.",
    safetyNote:
      "Data sertifikasi K3, prosedur operasional terperinci, dan metrik keselamatan belum tersedia untuk dipublikasikan.",
    viewCoverage: "Lihat jangkauan",
    dataPolicy: "Kebijakan Data",
    dataPolicyTitle: "Sumber dan penggunaan informasi di website Petro Anigos.",
    dataPolicyDescription:
      "Halaman ini menjelaskan sumber, status, keterbatasan, dan etika penggunaan informasi cuaca serta pasar yang ditampilkan pada website.",
    contextualDataTitle:
      "Data pendukung harus selalu hadir bersama konteksnya.",
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
    referenceSources: "Reference sources",
    attributionTitle: "Attribution harus terlihat dekat dengan datanya.",
    attributionDescription:
      "Saat integrasi resmi tersedia, attribution, timestamp, dan status data akan ditampilkan pada ribbon serta dijelaskan lebih lengkap di halaman ini.",
    bmkgWeather: "BMKG — Prakiraan Cuaca",
    bmkgWeatherDescription:
      "Sumber resmi prakiraan cuaca terbuka BMKG. Data cuaca harus menampilkan attribution BMKG pada aplikasi.",
    idxMarket: "Indonesia Stock Exchange (IDX)",
    idxMarketDescription:
      "Rujukan resmi pasar modal. Data pasar publik hanya akan digunakan setelah hak akses dan redistribusi diverifikasi.",
    disclaimer: "Disclaimer",
    dataDisclaimer:
      "Informasi cuaca dan pasar hanya disediakan untuk tujuan umum. Informasi tersebut dapat tertunda, berubah, tidak lengkap, atau tidak sesuai kondisi aktual. Data ini bukan nasihat investasi dan bukan pengganti peringatan resmi maupun prosedur operasional.",
    ribbonStatus: "Data ribbon saat ini: demo/statis",
    contactPetroAnigos: "Contact Petro Anigos",
    cookieTerms: "Ketentuan Cookies",
    cookieTermsTitle: "Cara kami menggunakan cookies di website Petro Anigos.",
    cookieTermsDescription:
      "Kami menggunakan cookies secara terbatas untuk mendukung fungsi dasar website dan menghormati pilihan pengunjung.",
    usageTransparency: "Usage transparency",
    cookieContextTitle:
      "Cookies membantu website mengingat konteks yang diperlukan.",
    cookieContextDescription:
      "Cookies adalah file data kecil yang disimpan pada perangkat ketika mengunjungi website. Ketentuan ini menjelaskan jenis, tujuan, durasi, dan pilihan yang tersedia bagi pengguna.",
    essentialCookies: "Essential cookies",
    essentialCookiesDescription:
      "Cookies yang diperlukan agar fitur dasar website dapat berjalan, termasuk menyimpan pilihan persetujuan cookies dan membantu menjaga preferensi tampilan.",
    preferenceCookies: "Preference cookies",
    preferenceCookiesDescription:
      "Cookies yang dapat membantu mengingat pilihan pengguna seperti bahasa atau preferensi tampilan ketika fitur tersebut menggunakannya.",
    analyticsAdvertisingCookies: "Cookies analitik dan iklan",
    analyticsAdvertisingCookiesDescription:
      "Saat ini tidak digunakan. Jika diaktifkan di masa depan, pengguna akan diberi informasi dan pilihan yang sesuai sebelum cookie non-esensial disimpan.",
    active: "Active",
    limited: "Limited",
    inactive: "Inactive",
    consentCookies: "Consent cookies",
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
    recruitmentWarningLabel: "Peringatan rekrutmen",
    recruitmentWarningTitle: "Waspada penipuan rekrutmen",
    recruitmentWarningDescription:
      "Harap berhati-hati terhadap pihak yang mengatasnamakan PT. Anigos Jaya Perkasa dalam proses rekrutmen.",
    recruitmentFeeDisclaimer:
      "PT. Anigos Jaya Perkasa tidak pernah memungut biaya apa pun dalam seluruh proses rekrutmen.",
    recruitmentWarningAcknowledge: "Saya Mengerti",
    careersTitle: "Tumbuh bersama energi yang menggerakkan Indonesia.",
    careersDescription:
      "Kami mencari orang-orang yang ingin bekerja dengan tujuan, menjaga kualitas, dan membangun distribusi energi yang dapat diandalkan.",
    whyPetroAnigos: "Why Petro Anigos",
    meaningfulWorkTitle: "Pekerjaan yang punya dampak nyata.",
    meaningfulWorkDescription:
      "Di sini, pekerjaan administratif, komersial, dan operasional saling terhubung untuk memastikan kebutuhan pelanggan dilayani dengan aman dan tepat.",
    growingTogether: "Cara kami bertumbuh",
    professionalHumanTitle:
      "Profesional dalam bekerja, manusiawi dalam berkolaborasi.",
    professionalHumanDescription:
      "Kami percaya kualitas layanan dimulai dari orang-orang yang diberi konteks, kepercayaan, dan ruang untuk mengambil tanggung jawab.",
    workExperience: "Pengalaman Bekerja",
    sharedStandardsTitle: "Hal-hal yang kami jaga bersama.",
    sharedStandardsDescription:
      "Keunggulan bekerja bukan hanya tentang fasilitas, tetapi juga tentang lingkungan yang membantu setiap orang menghasilkan pekerjaan terbaiknya.",
    careerOpenings: "Lowongan tersedia",
    careerOpeningsLoading: "Memuat lowongan yang tersedia…",
    noCareerOpenings: "Saat ini belum ada posisi yang sedang dibuka.",
    noCareerOpeningsDescription:
      "Silakan periksa kembali halaman ini nanti. Posisi dan tautan lamaran akan tersedia setelah lowongan dibuka.",
    careerOpeningsLoadError:
      "Daftar lowongan belum dapat dimuat. Silakan coba lagi beberapa saat.",
    careerOpeningUnavailable:
      "Posisi ini sudah tidak tersedia. Silakan pilih lowongan aktif lainnya.",
    careerMaxFilesError: "Lampirkan maksimal 5 file.",
    careerOpeningsTitle: "Temukan peran yang sesuai dengan langkahmu.",
    careerOpeningsDescription:
      "Pilih posisi aktif yang ingin kamu lamar. Informasi lowongan dan pilihan posisi pada formulir mengikuti data yang dipublikasikan di Sanity.",
    positionsAvailable: "posisi tersedia",
    viewAndApply: "Lihat posisi & lamar",
    purposeAtWork: "Bekerja dengan tujuan",
    purposeAtWorkDescription:
      "Kontribusi setiap peran ikut menjaga distribusi energi yang mendukung aktivitas industri Indonesia.",
    supportiveCulture: "Budaya yang saling mendukung",
    supportiveCultureDescription:
      "Kami membangun komunikasi terbuka, kerja sama lintas fungsi, dan ruang untuk bertumbuh bersama.",
    fieldLearning: "Belajar dari lapangan",
    fieldLearningDescription:
      "Kamu akan berhadapan dengan konteks nyata distribusi, pelanggan, mitra, dan operasional.",
    safeWorkStandards: "Standar kerja yang aman",
    safeWorkStandardsDescription:
      "Keselamatan, kepatuhan, dan integritas menjadi bagian dari cara kami mengambil keputusan.",
    crossRoleCollaboration: "Kolaborasi lintas peran",
    crossRoleCollaborationDescription:
      "Ide yang baik dapat datang dari berbagai fungsi dan dibahas dengan perspektif yang beragam.",
    roomToGrow: "Ruang untuk berkembang",
    roomToGrowDescription:
      "Kami menghargai inisiatif, tanggung jawab, dan keinginan untuk meningkatkan kualitas kerja.",
    operations: "Operasional",
    commercial: "Komersial",
    fullTime: "Penuh waktu",
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
    googleSignInPrompt: "Isi nama dan email lebih cepat dengan Google",
    googleSignedInAs: "Terhubung dengan Google",
    googleSignIn: "Lanjutkan dengan Google",
    googleSigningIn: "Menghubungkan...",
    googleSignOut: "Keluar dari Google",
    googleSignInOptional:
      "Opsional. Anda tetap dapat mengirim lamaran tanpa masuk.",
    googleSignInFailed: "Gagal masuk dengan Google. Silakan coba lagi.",
    googleSignOutFailed: "Gagal keluar dari Google. Silakan coba lagi.",
    googleIdentityMismatch:
      "Email harus sama dengan email akun Google yang digunakan.",
    dataReadyForReview: "Data siap ditinjau",
    applicationThanks:
      "Terima kasih. Lamaran dan dokumen pendukung berhasil diterima untuk posisi yang dipilih. Tim kami akan meninjau profil Anda.",
    sendAnotherApplication: "Kirim lamaran lain",
    fullName: "Nama lengkap",
    fullNamePlaceholder: "Nama lengkap",
    positionInterested: "Posisi yang diminati",
    choosePosition: "Pilih posisi",
    shortMessage: "Pesan singkat",
    shortMessagePlaceholder:
      "Ceritakan pengalaman atau alasan kamu tertarik...",
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
    bekasiCoverageDescription:
      "Titik layanan untuk kebutuhan distribusi di kawasan Jabodetabek dan sekitarnya.",
    palembangCoverageDescription:
      "Mendukung kebutuhan BBM industri dan distribusi di wilayah Sumatera Selatan.",
    medanCoverageDescription:
      "Titik operasional untuk kebutuhan pelanggan di Sumatera Utara dan area sekitarnya.",
    palangkaRayaCoverageDescription:
      "Mendukung koordinasi pengiriman BBM untuk kebutuhan operasional di Kalimantan Tengah.",
    northSulawesiCoverageDescription:
      "Titik operasional yang melayani kebutuhan distribusi di wilayah Sulawesi Utara.",
    southSulawesiCoverageDescription:
      "Titik operasional untuk mendukung kebutuhan pelanggan di Sulawesi Selatan.",
    offerPageEyebrow: "Produk / Penawaran",
    offerPageTitle: "Mulai dari kebutuhan, kami siapkan pembahasannya.",
    offerPageDescription:
      "Sampaikan kebutuhan BBM industri Anda agar tim Petro Anigos dapat membantu meninjau produk, volume, lokasi, jadwal, dan skema distribusi yang sesuai.",
    needsBasedOffer: "Penawaran berbasis kebutuhan",
    beforeSubmitting: "Sebelum mengajukan",
    offerPreparationTitle:
      "Informasi sederhana membantu pembahasan lebih terarah.",
    offerPreparationDescription:
      "Tidak perlu menyiapkan spesifikasi komersial yang rumit. Mulai dari informasi operasional yang sudah Anda ketahui.",
    prepareForOffer: "Yang perlu disiapkan",
    productTypePreparation: "Jenis produk",
    productTypePreparationDescription:
      "Solar/HSD atau B40 Biosolar sesuai kebutuhan operasional.",
    volumePreparation: "Volume kebutuhan",
    volumePreparationDescription:
      "Perkiraan volume per pengiriman atau kebutuhan berkala.",
    locationSchedulePreparation: "Lokasi dan jadwal",
    locationSchedulePreparationDescription:
      "Wilayah titik bongkar serta rencana waktu penerimaan.",
    distributionModePreparation: "Moda distribusi",
    distributionModePreparationDescription:
      "Kebutuhan armada darat, transportasi laut, atau mitra transportir.",
    offerFlowEyebrow: "Alur Pembahasan",
    offerFlowTitle:
      "Dari informasi awal menuju penawaran yang dibahas bersama.",
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
    discussionScopeTitle:
      "Detail komersial dan distribusi dikonfirmasi bersama.",
    discussionScopeDescription:
      "Informasi pada form adalah bahan awal pembahasan, bukan penetapan harga atau jaminan pengiriman.",
    offerScopeNoticeLabel: "Penawaran dikonfirmasi bersama",
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
    productTypeValue: "Solar/HSD dan B40 Biosolar",
    productCompositionValue: "40% Biodiesel + 60% Solar/HSD",
    productQualityStandardValue: "Mengacu pada spesifikasi Ditjen Migas RI",
    productTrademarkValue: "Petro Anigos",
    productServiceScaleValue: "Kecil, menengah, besar, hingga nasional",
    productVideoEyebrow: "Mengenal produk",
    productVideoTitle: "Memahami produk sebelum menentukan kebutuhan.",
    companyStoryVideoEyebrow: "Cerita perusahaan",
    companyStoryVideoTitle: "Energi yang bergerak bersama kebutuhan industri.",
    companyStoryVideoDescription:
      "Video singkat ini menjadi pengantar visual tentang cara PT. Anigos Jaya Perkasa membangun kepercayaan, menjaga standar, dan menghubungkan kebutuhan pelanggan dengan distribusi yang bertanggung jawab.",
    companyStoryVideoLabel: "Video profil perusahaan PT. Anigos Jaya Perkasa",
    coverageVideoEyebrow: "Jaringan distribusi nasional",
    coverageVideoTitle: "Mendukung kebutuhan industri di seluruh Indonesia.",
    coverageVideoDescription:
      "Pelajari bagaimana Petro Anigos mengoordinasikan kebutuhan BBM industri, pilihan moda distribusi, dan jadwal pengiriman untuk pelanggan bisnis di seluruh Indonesia.",
    coverageVideoLabel: "Video jangkauan distribusi PT. Anigos Jaya Perkasa",
    productVideoDescription:
      "Video pengantar ini menjelaskan peran Solar/HSD dan B40 Biosolar sebagai pilihan bahan bakar untuk kebutuhan operasional industri.",
    productVideoTitleLabel: "Video pengenalan produk Petro Anigos",
    productServiceScale: "Skala layanan",
    productSmallToNational: "Kecil hingga nasional",
    productDistribution: "Distribusi",
    productLandAndSea: "Darat dan laut",
    productPosition: "Posisi produk",
    productSupport:
      "Didukung kapabilitas distribusi Petro Anigos untuk kebutuhan konsumen dengan pilihan layanan darat dan antarwilayah.",
    partnershipTrustHeading:
      "Perusahaan pengguna akhir yang kami layani",
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
    partnershipAction: "Pelajari selengkapnya",
    partnershipShowAll: "Tampilkan semua",
    partnershipCloseLogos: "Tutup",
    partnershipCarouselLabel: "Peluang kemitraan Petro Anigos",
    clientPageEyebrow: "Kemitraan",
    clientPageTitle: "Klien kami",
    clientPageDescription:
      "Mendukung kebutuhan energi perusahaan melalui layanan yang andal dan kemitraan jangka panjang.",
    clientIntroEyebrow: "Klien Petro Anigos",
    clientIntroTitle: "Dipercaya untuk mendukung kebutuhan energi bisnis",
    clientIntroDescription:
      "Kami melayani perusahaan dari berbagai sektor dengan dukungan distribusi dan produk energi yang sesuai kebutuhan operasional.",
    clientTableEyebrow: "Portofolio End Client",
    clientTableTitle: "Perusahaan pengguna akhir yang kami layani",
    clientTableDescription:
      "Daftar ini menampilkan perusahaan pengguna akhir yang menerima layanan langsung dari Petro Anigos, beserta lokasi dan produk yang digunakan.",
    clientCompanyColumn: "Nama perusahaan",
    clientLocationColumn: "Lokasi",
    clientProductsColumn: "Layanan",
    clientEmpty: "Data klien akan ditampilkan setelah dipublikasikan.",
    clientLoading: "Memuat data klien...",
    clientLoadError:
      "Data klien tidak dapat dimuat. Silakan coba kembali nanti.",
    clientGalleryEyebrow: "Dokumentasi",
    clientGalleryTitle: "Galeri klien",
    clientGalleryDescription:
      "Pilih nama perusahaan untuk melihat dokumentasi layanan dan kegiatan bersama.",
    clientGalleryAll: "Lihat semua",
    clientGalleryShowFewerCategories: "Lihat lebih sedikit",
    clientGalleryOtherCategories: "kategori lainnya",
    clientGalleryEmpty: "Belum ada foto untuk perusahaan ini.",
    clientGalleryNoClients: "Belum ada klien yang dipublikasikan.",
    clientProductUnavailable: "Belum dicantumkan",
    resourceEnergyTitle: "CSR",
    resourceEnergyDescription:
      "Dokumentasi kegiatan tanggung jawab sosial Petro Anigos dari tahun ke tahun.",
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
    articleInsightsTitle: "Memilih mitra distribusi BBM untuk kebutuhan bisnis",
    articleInsightsDescription:
      "Hal-hal yang perlu diperhatikan saat menilai kualitas, legalitas, dan kesiapan layanan.",
    articleOffice: "Artikel",
    articleNewsroom: "Anigos News",
    articleHome: "Beranda",
    articleReadMore: "baca",
    articleBackToNewsroom: "Kembali ke newsroom",
    articleReadAlso: "Baca juga",
    articleGalleryTitle: "Galeri Artikel",
    newsroomEyebrow: "Artikel / Anigos News",
    newsroomTitle: "Newsroom PT. Anigos Jaya Perkasa.",
    newsroomDescription:
      "Kabar, perspektif, dan informasi yang membantu memahami energi, distribusi, serta cara kami bekerja.",
    newsroomSearch: "Cari artikel...",
    newsroomLatest: "Kabar Terbaru",
    newsroomLatestTitle: "Cerita yang sedang kami rangkum.",
    newsroomFeatured: "Berita unggulan",
    newsroomEmpty: "Artikel tidak ditemukan",
    newsroomSearchHint: "Coba gunakan kata kunci atau kategori lain.",
    newsroomBrowseCategories: "Jelajahi berdasarkan kategori",
    newsroomCategoryTitle: "Setiap cerita memiliki konteksnya.",
    newsroomCategoryDescription:
      "Pilih segmen untuk melihat artikel yang dikelompokkan berdasarkan tema newsroom.",
    newsroomActiveSegments: "segmen aktif",
    newsroomVideoCategory: "Video kategori",
    newsroomVideoDescription:
      "Simak konteks dan cara kerja yang mendukung tema kategori ini.",
    newsroomAllCategories: "Semua",
    newsroomAllSubcategories: "Semua subkategori",
    newsroomArticleCount: "artikel",
    articleDirectoryEyebrow: "Pusat Informasi",
    articleDirectoryTitle: "Pilih ruang baca yang Anda butuhkan.",
    articleDirectoryDescription:
      "Halaman ini menjadi pintu masuk menuju konten editorial dan informasi referensial perusahaan.",
    articlePageTitle: "Wawasan dan informasi PT. Anigos Jaya Perkasa.",
    articlePageDescription:
      "Temukan berita, publikasi, dan landasan informasi yang membantu memahami cara PT. Anigos Jaya Perkasa melayani kebutuhan energi industri.",
    articleEditorialNote: "Catatan editorial",
    articleEditorialTitle:
      "Konten akan berkembang bersama perjalanan perusahaan.",
    articleEditorialDescription:
      "Artikel dan publikasi yang belum memiliki sumber resmi akan ditambahkan secara bertahap melalui proses editorial terpisah.",
    articleOpenPage: "Buka halaman",
    articleDestinationNews: "Anigos News",
    articleDestinationNewsDescription:
      "Kabar, perspektif, dan informasi seputar energi serta distribusi.",
    articleDestinationPublications: "Publikasi",
    articleDestinationPublicationDescription:
      "Materi perusahaan, produk, operasional, dan kemitraan yang tersedia untuk dibaca.",
    articleDestinationPublicInfo: "Landasan Informasi Publik",
    articleDestinationPublicInfoDescription:
      "Rujukan fakta perusahaan dan batas informasi yang dapat dipublikasikan.",
    publicationCatalog: "Katalog publikasi",
    publicationCatalogTitle: "Pilih materi yang ingin Anda baca.",
    publicationSearch: "Cari publikasi...",
    publicationEmpty: "Publikasi tidak ditemukan",
    publicationSearchHint: "Coba gunakan kata kunci atau kategori lain.",
    fleetLand: "Armada darat",
    fleetGallery: "Galeri Armada Darat",
    fleetChoosePhoto: "Pilih foto",
    fleetOpenPhoto: "Buka foto",
    fleetViewAll: "Lihat semua",
    fleetPhotoCount: "foto",
    fleetGalleryEmpty:
      "Belum ada foto layanan atau armada yang dipublikasikan di Sanity.",
    fleetGalleryError:
      "Foto galeri tidak dapat dimuat dari Sanity. Silakan muat ulang halaman.",
    fleetGalleryInstruction:
      "Pilih varian liter di bawah untuk mengganti foto dan detail.",
    fleetVariantLabel: "Varian kapasitas armada darat",
    fleetCapacitySupportingText:
      "Armada darat untuk kebutuhan distribusi dengan kapasitas {capacity} {unit}.",
    videoPause: "Jedaikan video",
    videoPlay: "Putar video",
    videoContent: "Video konten",
    videoPosition: "Posisi video",
    videoUnmute: "Nyalakan suara",
    videoMute: "Matikan suara",
    videoFullscreen: "Layar penuh",
    commissionerGallery: "Galeri Komisaris",
    leadershipGallery: "Galeri Profil Pimpinan",
    leadershipProfileCaption: "Profil {role}",
    commissionerDocumentation: "Dokumentasi",
    commissionerGalleryDescription:
      "Dokumentasi visual terkait profil dan lingkungan kerja perusahaan.",
    galleryPrevious: "Foto galeri sebelumnya",
    galleryNext: "Foto galeri berikutnya",
    previousPhoto: "Foto sebelumnya",
    nextPhoto: "Foto berikutnya",
    loadingPage: "Memuat halaman",
    partnershipLoading: "Memuat detail kemitraan...",
    partnershipNotFound: "Data kemitraan tidak ditemukan.",
    partnershipBackToList: "Kembali ke daftar client",
    partnershipLogoUnavailable: "Logo perusahaan belum tersedia.",
    partnershipDate: "Tanggal bermitra",
    partnershipType: "Bentuk kemitraan",
    partnershipGalleryEyebrow: "02 — Galeri Kemitraan",
    partnershipGalleryTitle: "Dokumentasi kemitraan.",
    partnershipGalleryDescription:
      "Foto yang diatur pada field galeri partner di CMS.",
    partnershipDocumentsEyebrow: "03 — Dokumen Kemitraan",
    partnershipDocumentsTitle: "Dokumen pendukung.",
    partnershipDocumentsDescription:
      "Dokumen yang tersedia untuk membantu memahami portofolio dan dokumentasi kerja sama.",
    partnershipDownloadPortfolio: "Unduh portofolio",
    partnershipPortfolioUnavailable: "Dokumen portofolio belum diisi.",
    partnershipDownload: "Unduh",
    partnershipOfficialDocumentation: "Dokumentasi kemitraan resmi.",
    partnershipSectionDetailEyebrow: "04 — Detail Kemitraan",
    partnershipOverviewEyebrow: "01 — Overview Kemitraan",
    partnershipUnavailable: "Belum tersedia",
    partnershipPortfolioMissing: "Bentuk kemitraan belum tersedia.",
    partnershipOverviewMissing: "Pengenalan singkat perusahaan belum tersedia.",
    partnershipBackgroundMissing: "Latar belakang kemitraan belum tersedia.",
    partnershipBackgroundTitle: "Latar belakang kemitraan.",
    partnershipBackgroundSubtitle:
      "Penjelasan lengkap mengenai alasan, ruang lingkup, dan arah kerja sama.",
    partnershipClosingMissing: "Penutup kemitraan belum tersedia.",
    partnershipNameFallback: "Detail Kemitraan",
    partnershipLogoAltFallback: "perusahaan partner",
    partnershipGalleryAlt: "Dokumentasi kemitraan {name}.",
    partnershipGalleryCaption: "Dokumentasi kemitraan",
    partnershipPhotoAlt: "Foto kemitraan {name}",
    partnershipOriginalResolution: "Resolusi asli",
    partnershipPreview: "Buka preview",
    partnershipShowLess: "Sembunyikan",
    partnershipReadMore: "Baca selengkapnya",
    galleryPhotoPosition: "Gambar {current} dari {total}",
    galleryEnlargePhoto: "Perbesar foto",
    openNavigation: "Buka menu navigasi",
    mobileNavigation: "Navigasi mobile",
    galleryPhotoSelect: "Pilih foto",
    articlePublicInfoEyebrow: "Artikel / Landasan Informasi Publik",
    articlePublicInfoTitle:
      "Informasi yang berangkat dari fakta dan sumber yang jelas.",
    articlePublicInfoDescription:
      "Halaman ini menjelaskan landasan informasi publik PT. Anigos Jaya Perkasa berdasarkan company profile dan data perusahaan yang tersedia.",
    companyStructureEyebrow: "Tentang Kami",
    companyStructureTitle: "Struktur Perusahaan",
    companyStructureDescription:
      "Mengenal kerangka tata kelola, kepemimpinan, dan fungsi kerja yang mendukung operasional PT. Anigos Jaya Perkasa.",
    reachNational: "Nasional",
    reachB2B: "B2B",
    fleetPhotoPosition: "Foto {current} dari {total}",
    dataFallback: "Data fallback",
    dataCms: "Data CMS",
    chooseDivision: "Pilih divisi",
    structureNoCommissioners: "Belum ada profil Komisaris yang dipublikasikan.",
    structureNoDirectors: "Belum ada profil Direksi yang dipublikasikan.",
    structureNoDivisions: "Belum ada divisi yang dipublikasikan.",
    structureNoDivisionMembers: "Belum ada anggota divisi yang dipublikasikan.",
    emailPlaceholder: "nama@contoh.com",
    paginationLabel: "Navigasi halaman",
    paginationPrevious: "Ke halaman sebelumnya",
    paginationNext: "Ke halaman berikutnya",
    paginationMore: "Halaman lainnya",
    sidebarToggle: "Alihkan panel samping",
    breadcrumbLabel: "Jejak navigasi",
    breadcrumbMore: "Lainnya",
    sidebarTitle: "Bilah sisi",
    mobileSidebarDescription: "Menampilkan bilah sisi pada perangkat seluler.",
    commandPaletteTitle: "Palet perintah",
    commandPaletteDescription: "Cari perintah yang ingin dijalankan...",
    scrollToEnd: "Gulir ke akhir",
    scrollToStart: "Gulir ke awal",
    footerCopyright: "Hak cipta dilindungi.",
    spinnerLabel: "Memuat",
    toastClose: "Tutup notifikasi",
    publicationAllCategories: "Semua",
    galleryPreviousCategoryPhoto: "Foto kategori sebelumnya",
    profileIllustration: "Profil ilustrasi",
    galleryByCategoryCarousel: "Carousel foto galeri berdasarkan kategori",
    galleryNoPhotosForDates:
      "Tidak ada foto dengan tanggal upload yang sesuai.",
    galleryPageTitle: "Galeri dokumentasi Petro Anigos.",
    galleryPageDescription:
      "Jelajahi dokumentasi visual kemitraan, distribusi, dan aktivitas operasional yang mendukung layanan Petro Anigos.",
    galleryMainSectionTitle: "Lihat aktivitas kami lebih dekat.",
    galleryMainSectionDescription:
      "Pilih thumbnail untuk mengganti tampilan utama. Buka gambar untuk melihat detail dan memperbesar.",
    galleryOpenImage: "Buka",
    galleryNoDocuments: "Belum ada dokumentasi galeri yang tersedia.",
    galleryExploreCategoryTitle: "Jelajahi galeri berdasarkan kategori.",
    galleryExploreCategoryDescription:
      "Pilih kategori, geser carousel untuk melihat dokumentasi lainnya, lalu buka foto untuk memperbesar.",
    galleryBrowseCategories: "Lihat berdasarkan kategori",
    galleryStoryTitle: "Foto dengan cerita.",
    galleryStoryDescription:
      "Setiap dokumentasi menyimpan cerita tentang kolaborasi dan dukungan operasional bersama mitra.",
    galleryDateUnavailable: "Tanggal belum tersedia",
    galleryStoryUnavailable: "Cerita untuk dokumentasi ini belum tersedia.",
    galleryByCategoryTitle: "Galeri berdasarkan kategori.",
    galleryByCategoryDescription:
      "Jelajahi seluruh foto kemitraan dan dokumentasi operasional. Pilih kategori atau sortir foto berdasarkan tanggal dan tahun upload.",
    gallerySearchCategories: "Cari kategori...",
    galleryCategoryNotFound: "Kategori tidak ditemukan.",
    galleryDefaultOrder: "Urutan awal",
    galleryChooseUploadYear: "Pilih tahun upload",
    galleryUploadDatesUnavailable: "Tanggal upload belum tersedia",
    gallerySortMetadataNote:
      "Sortir tanggal dan tahun menggunakan waktu upload aset Sanity. Foto tanpa metadata tanggal upload tidak disertakan.",
    galleryLoadError: "Galeri tidak dapat dimuat. Silakan muat ulang halaman.",
    galleryNoPhotosForSelection:
      "Tidak ada foto dengan tanggal upload yang sesuai untuk pilihan ini.",
    galleryNoPhotosInCategory: "Belum ada foto untuk kategori ini.",
    cookieTermsLink: "ketentuan cookies",
    publicGalleryEyebrow: "Artikel / Galeri",
    galleryBackToList: "Kembali ke galeri",
    galleryVisualDocumentation: "Dokumentasi visual",
    galleryFilters: "Filter foto galeri",
    galleryChooseCategory: "Pilih kategori",
    gallerySortBy: "Sortir berdasarkan",
    galleryNoSorting: "Tanpa sortir",
    galleryUploadDate: "Tanggal upload",
    galleryUploadYear: "Tahun upload",
    galleryDateOrder: "Urutan tanggal",
    galleryNewest: "Terbaru",
    galleryOldest: "Terlama",
    galleryPhotoDocumentation: "Dokumentasi foto",
    galleryLoading: "Memuat galeri...",
    serviceGalleryEyebrow: "Dokumentasi layanan",
    serviceGalleryTitle: "Galeri Produk & Layanan",
    serviceGalleryDescription:
      "Foto kegiatan dan layanan yang dikelola melalui Sanity.",
    galleryShowPhoto: "Tampilkan foto",
    galleryNextCategoryPhoto: "Foto kategori berikutnya",
    galleryCollections: "Koleksi foto",
    galleryCategories: "Kategori galeri",
    galleryAll: "Semua",
    galleryAllCategories: "Semua kategori",
    galleryStories: "Cerita di balik foto",
    csrActivityFallback: "Kegiatan CSR",
    csrGallery: "Galeri CSR",
    csrActivityPhotos: "Foto kegiatan CSR",
    csrSectionEyebrow: "02 — Kegiatan CSR",
    csrDocumentsTitle: "Dokumen kegiatan.",
    csrYearPhotosUnavailable: "Belum ada dokumentasi foto untuk tahun ini.",
    csrBackgroundTitle: "Latar Belakang Kegiatan",
    csrDocumentsEyebrow: "03 — Dokumen kegiatan",
    csrDocumentsDescription:
      "Unduh dokumen pendukung kegiatan CSR yang tersedia.",
    csrDocumentFallback: "Dokumen kegiatan CSR",
    csrActivityYear: "Kegiatan CSR {year}",
    csrYearDocumentsUnavailable:
      "Belum ada dokumen kegiatan yang tersedia untuk tahun ini.",
    csrGallerySectionEyebrow: "01 — Dokumentasi kegiatan",
    csrGalleryYearDescription: "Dokumentasi kegiatan CSR tahun {year}.",
    hopesPatternAlt:
      "Pola visual harapan dan cita-cita PT. Anigos Jaya Perkasa",
    partnershipTransportationAlt:
      "Ilustrasi kemitraan transportasi PT. Anigos Jaya Perkasa",
    dataDetails: "Data",
    viewPartnerDetails: "Lihat data",
    previousPageShort: "Sebelumnya",
    nextPageShort: "Berikutnya",
    pageNumber: "Halaman",
    partnerSince: "Bermitra sejak",
    portfolio: "Portofolio",
    documentation: "Dokumentasi",
    viewNote: "Lihat catatan",
    partnersShowing: "Menampilkan {from}-{to} dari {count} mitra",
    reachCardInstruction: "Tekan untuk melihat detail",
    reachAreasUnavailable: "Area layanan akan diperbarui melalui CMS.",
    publicationComingSoon: "Segera hadir",
    partnershipContactUnavailable: "Email kontak belum diisi di CMS",
    publicInfoPrinciplesEyebrow: "Prinsip Informasi",
    publicInfoPrinciplesTitle:
      "Transparan tentang apa yang diketahui dan apa yang belum tersedia.",
    publicInfoPrinciplesDescription:
      "Data yang ditampilkan di website dirangkai dari referensi perusahaan. Informasi yang belum terverifikasi tidak diisi dengan asumsi.",
    publicInfoSourceTitle: "Sumber yang jelas",
    publicInfoSourceDescription:
      "Fakta legal, produk, dan operasional dirangkum dari company profile PT. Anigos Jaya Perkasa.",
    publicInfoLimitsTitle: "Batas informasi",
    publicInfoLimitsDescription:
      "Data seperti jumlah armada, kontak cabang, harga, dan metrik ESG hanya ditampilkan jika tersedia dan terverifikasi.",
    publicInfoLegalTitle: "Dokumen legal",
    publicInfoLegalDescription:
      "Informasi legalitas mengacu pada nomor dan keterangan yang tercantum dalam referensi perusahaan.",
    publicInfoResponsibleTitle: "Komunikasi bertanggung jawab",
    publicInfoResponsibleDescription:
      "Copy website dirancang untuk membantu calon konsumen memahami layanan tanpa membuat klaim yang tidak didukung sumber.",
    publicInfoNote:
      "Halaman ini bukan pengganti dokumen legal resmi. Untuk kebutuhan verifikasi atau kerja sama, silakan hubungi PT. Anigos Jaya Perkasa melalui kanal resmi.",
    contactUs: "Hubungi kami",
    contactPageEyebrow: "Kontak resmi",
    contactPageTitle: "Mari bicarakan kebutuhan pasokan Anda",
    contactPageDescription:
      "Hubungi tim PT. Anigos Jaya Perkasa untuk membahas kebutuhan bahan bakar industri, marine fuel, maupun peluang kerja sama.",
    contactChannelsEyebrow: "Kanal komunikasi",
    contactChannelsTitle: "Pilih cara yang paling nyaman",
    contactChannelsDescription:
      "Tim kami siap membantu mengarahkan kebutuhan Anda ke informasi dan tindak lanjut yang tepat.",
    contactPhoneLabel: "Telepon",
    contactCallAction: "Telepon",
    contactCopyAction: "Salin",
    contactCopiedAction: "Tersalin",
    contactCopyFailedAction: "Gagal menyalin",
    contactEmailLabel: "Email",
    contactEmailAction: "Kirim email",
    contactEmailPageEyebrow: "Kirim pesan",
    contactEmailPageTitle: "Sampaikan pesan kepada tim kami",
    contactEmailPageDescription:
      "Isi formulir berikut untuk menghubungi tim Petro Anigos.",
    contactFormHeading: "Ceritakan yang ingin Anda sampaikan",
    contactFormDescription:
      "Sertakan informasi yang membantu tim kami memahami konteks pesan dan menghubungi Anda kembali.",
    contactFormEmailClientNote:
      "Formulir akan menyiapkan draft di aplikasi email Anda. Lampiran yang dipilih perlu ditambahkan kembali di aplikasi email sebelum pesan dikirim.",
    contactFormName: "Nama lengkap",
    contactFormPersonalSection: "Data diri",
    contactFormNeedsSection: "Kebutuhan",
    contactFormProgressLabel: "Progres pengisian formulir",
    contactFormStepLabel: "Langkah",
    contactFormNext: "Lanjut",
    contactFormPrevious: "Kembali",
    contactFormRequiredError: "Bagian ini wajib diisi.",
    contactFormEmailInvalid:
      "Masukkan email dengan format nama@domain.com yang valid.",
    contactFormPhoneDigitsError:
      "Gunakan 8–15 digit, maksimal 15 digit angka. Tanda +, spasi, tanda hubung, dan kurung diperbolehkan.",
    contactFormValidationSummary:
      "Periksa bagian bertanda merah dan lengkapi data sebelum melanjutkan.",
    contactFormNamePlaceholder: "Contoh: Budi Santoso…",
    contactFormCompany: "Nama perusahaan",
    contactFormCompanyPlaceholder: "Contoh: PT Anigos Petro…",
    contactFormReplyEmail: "Email untuk dihubungi",
    contactFormEmailPlaceholder: "nama@perusahaan.co.id…",
    contactFormPhone: "Nomor telepon",
    contactFormPhonePlaceholder: "Contoh: +62 812-3456-7890…",
    contactFormPosition: "Jabatan",
    contactFormPositionPlaceholder: "Pilih jabatan…",
    contactFormPositionOtherPlaceholder: "Tulis jabatan Anda…",
    contactPositionOwner: "Pemilik / Pendiri",
    contactPositionDirector: "Direktur / Eksekutif",
    contactPositionProcurement: "Pengadaan / Pembelian",
    contactPositionOperations: "Operasional / Logistik",
    contactPositionFinance: "Keuangan",
    contactPositionEngineering: "Teknik / Pemeliharaan",
    contactPositionHse: "K3 / HSE",
    contactPositionOther: "Lainnya",
    contactFormRequirement: "Kebutuhan",
    contactFormRequirementPlaceholder: "Contoh: Pasokan solar industri…",
    contactFormMessage: "Pesan",
    contactFormMessagePlaceholder:
      "Contoh: Kami ingin mengetahui pilihan pasokan bahan bakar untuk operasional perusahaan…",
    contactFormAttachments: "Lampiran",
    contactChooseAttachments: "Pilih lampiran",
    contactAddAttachments: "Tambah lampiran",
    contactAttachmentLimits:
      "Maksimal 5 file, 5 MB per file · PDF, Word, Excel, JPG, PNG",
    contactAttachmentTypeError:
      "Format file tidak didukung. Pilih PDF, Word, Excel, JPG, atau PNG.",
    contactAttachmentSizeError:
      "Ukuran file harus lebih dari 0 dan maksimal 5 MB.",
    contactAttachmentCountError: "Maksimal 5 file dapat dipilih.",
    contactRemoveAttachment: "Hapus lampiran",
    contactFormAttachmentList: "File yang dipilih",
    contactFormAttachmentReminder:
      "Silakan tambahkan file-file ini sebagai lampiran di aplikasi email Anda.",
    contactFormEmailSubject: "Permintaan kontak",
    contactFormRecipient: "Email tujuan",
    contactFormSubmit: "Kirim",
    contactFormBackAction: "Kembali ke kontak",
    contactWhatsappLabel: "WhatsApp",
    contactWhatsappAction: "Mulai percakapan",
    contactOfficeLabel: "Kantor",
    contactMapAction: "Lihat peta",
    contactNextStepTitle: "Sudah memiliki kebutuhan pasokan yang spesifik?",
    contactNextStepDescription:
      "Sampaikan detail perusahaan, lokasi, dan estimasi kebutuhan melalui formulir penawaran agar tim kami dapat menindaklanjutinya dengan lebih terarah.",
    contactOfferAction: "Ajukan penawaran",
    partnershipSelectionHint:
      "Pilih perusahaan mitra pada daftar untuk melihat portofolio, dokumentasi, dan informasi kemitraan.",
    partnerCompanyData: "Data perusahaan mitra",
    company: "Perusahaan",
    partnershipStartDate: "Mulai bermitra",
    partnerDateUnavailable: "Tanggal belum tersedia",
    noPublishedPartners: "Belum ada partner yang dipublikasikan.",
    partnerPortfolioDescription:
      "Informasi portofolio dan dokumentasi perusahaan mitra.",
    additionalDetails: "Keterangan tambahan",
    partnershipPortfolioPdfTitle: "Company profile portofolio",
    partnershipPortfolioPdfUnavailable: "Portofolio PDF belum tersedia.",
    partnershipOpenPortfolioPdf: "Buka PDF portofolio",
    partnershipDocumentationPdfTitle: "Dokumentasi kemitraan",
    partnershipDocumentationPdfUnavailable: "Dokumentasi PDF belum tersedia.",
    partnershipOpenDocumentationPdf: "Buka PDF dokumentasi",
    publicationImagePreview: "Pratinjau gambar",
    publicationDocumentPreview: "Pratinjau dokumen",
    publicationUnavailable: "Dokumen belum tersedia",
    publicationOpenPdf: "Buka PDF",
    publicationPreparing: "Dokumen sedang disiapkan",
    carouselPrevious: "Slide sebelumnya",
    carouselNext: "Slide berikutnya",
    dialogClose: "Tutup",
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
    clientNav: "Clients",
    partnership: "Partnerships",
    legality: "Legal Information",
    career: "Careers",
    productsOverview: "Explore Products",
    offer: "Request an Offer",
    services: "Services",
    fleet: "Fleet",
    news: "Anigos News",
    publications: "Gallery",
    publicInformation: "Public Information Basis",
    sustainableEnergy: "Sustainable Energy",
    csr: "CSR",
    safety: "Operational Safety",
    governance: "Partnerships & Governance",
    achievements: "Company Milestones",
    contact: "Contact Us",
    mobileMenu: "Navigation menu",
    mobileDescription: "Explore Petro Anigos information.",
    language: "Language",
    switchToLight: "Use light mode",
    switchToDark: "Use dark mode",
    navAboutDescription: "Learn about our identity and how we work.",
    navCompanyProfileDescription:
      "Company identity, vision, mission, and values.",
    navHopesDescription: "Our contribution direction and aspirations.",
    navStructureDescription: "Company structure and operational network.",
    navClientDescription: "Companies that have used our services.",
    navLegalityDescription: "Company legality and licensing information.",
    navCareerDescription: "Join and grow with Petro Anigos.",
    navProductsDescription: "Fuel solutions for industrial needs.",
    navProductsOverviewDescription:
      "Explore our fuel products and specifications.",
    navOfferDescription: "Submit your needs and request an offer.",
    navFleetDescription: "Our fleet and distribution capabilities.",
    navServicesDescription: "Land distribution and Marine Fuel services.",
    navArticlesDescription:
      "Petro Anigos news, publications, and public information.",
    navNewsDescription: "The latest news from Petro Anigos.",
    navPublicationsDescription:
      "Partnership, distribution, and operational documentation.",
    navPublicInformationDescription:
      "Legal references for articles and publications.",
    navSustainableEnergyDescription:
      "The role of B40 Biosolar in plant-based energy.",
    navCsrDescription:
      "Annual records of the company's social responsibility activities.",
    navSafetyDescription:
      "Our commitment to safe and professional fuel distribution.",
    navGovernanceDescription:
      "Transparency, integrity, and responsible partnerships.",
    navAchievementsDescription: "Operational milestones and developments.",
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
    heroVideoSeek: "Seek video",
    heroProductEyebrow: "Quality Products",
    heroProductTitle: "Energy solutions tailored to your business needs.",
    heroProductDescription:
      "Petro Anigos products and services are designed to support operational needs across different scales.",
    heroProductAction: "Request an Offer",
    heroDistributionEyebrow: "Trusted Distribution",
    heroDistributionTitle: "Fleet support for safe and on-time distribution.",
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
    achievementsTitle: "Experienced, reaching further, and ready to serve.",
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
    aspirationsPageDescription:
      "Distribution Today, Contribution for the Nation",
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
    howWePartnerTitle: "Cooperation built on clarity and trust.",
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
    landServiceEyebrow: "Land Distribution",
    landServiceTitle: "Land fleet coverage ready to support your needs.",
    landServiceDescription:
      "HSD tankers are available in capacities from 5,000 to 30,000 liters. Our distribution experience covers Java, Sumatra, and Kalimantan, supported by transport partners serving needs across Indonesia.",
    serviceFleetCapacity: "HSD tanker capacity options",
    serviceFleetCoverage: "Java · Sumatra · Kalimantan",
    fleetLandEyebrow: "Land Fleet / Trucking",
    fleetLandTitle: "One network, six capacity options.",
    fleetLandDescription:
      "Choose a capacity to view the fleet visual and usage summary. These variations help verify requirements more accurately.",
    truckingFleet: "Trucking fleet",
    distributionIllustration: "Interregional distribution illustration",
    partnershipIllustration:
      "Petro Anigos distribution partnership illustration",
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
    productPageTitle:
      "Industrial diesel for diverse needs, including Marine Fuel.",
    productPageDescription:
      "We welcome industrial diesel requirements across product types and specifications, including Solar/HSD and Biosolar, as well as Marine Fuel needs. Share the product type, volume, location, and delivery schedule so we can discuss a suitable supply plan.",
    homeProductsEyebrow: "Our Products & Services",
    homeProductsTitle: "Industrial Fuel Solutions for Every Operational Need",
    homeProductsDescription:
      "We supply quality industrial diesel through a nationwide distribution network, supported by integrated logistics and flexible B2B partnership schemes.",
    homeProductBiosolarTitle: "Industrial Biosolar (B35/B40)",
    homeProductBiosolarDescription:
      "Biodiesel blend for manufacturing and power generation.",
    homeProductBiosolarBadge: "Biofuel",
    homeProductDexliteTitle: "Dexlite",
    homeProductDexliteDescription:
      "Diesel for heavy equipment and industrial machinery.",
    homeProductPerformanceBadge: "High performance",
    homeProductHsdTitle: "HSD / Pertamina Dex",
    homeProductHsdDescription:
      "Premium diesel for specialized operational needs.",
    homeProductPremiumBadge: "Special specifications",
    homeProductBulkTitle: "Bulk Diesel Supply",
    homeProductBulkDescription:
      "Scheduled high-volume supply for corporate requirements.",
    homeProductB2bBadge: "B2B service",
    homeProductLearnMore: "Learn more",
    homeProductsCta: "View All Products",
    homeProductsInquiry: "Would you like to discuss your needs?",
    homeProductsContact: "Contact us",
    marineFuelEyebrow: "Marine Fuel Services",
    marineFuelTitle: "Fuel support for maritime operations.",
    marineFuelDescription:
      "PT. Anigos Jaya Perkasa also serves Marine Fuel requirements to support maritime operations. Product, volume, location, and delivery schedule requirements can be discussed with our team.",
    marineFuelProductSupport: "Marine Fuel requirements",
    marineFuelFlexibleDistribution: "Sea distribution support",
    marineFuelCta: "Discuss Marine Fuel Requirements",
    marineFuelVideoPlaceholder: "Marine Fuel video",
    marineFuelVideoPending:
      "The video will appear here once it is uploaded to Sanity.",
    marineFuelVideoTooLarge:
      "The Marine Fuel video exceeds the {size} playback limit and cannot be displayed.",
    productMarineFuelTitle: "Marine Fuel for maritime operations.",
    productMarineFuelDescription:
      "We welcome Marine Fuel requirements for a range of maritime operations. Share the product type, volume, location, and delivery schedule so we can discuss a supply plan for your operational needs.",
    productMarineFuelProductSupport: "Diverse Marine Fuel requirements",
    productMarineFuelDistribution: "Supply planning around your needs",
    productOverviewEyebrow: "Explore Products",
    productOverviewTitle:
      "Industrial diesel options for diverse operational needs.",
    productOverviewDescription:
      "We welcome a range of industrial diesel requirements, including Solar/HSD and Biosolar. Share the product type, specification, volume, location, and supply schedule with our team for discussion.",
    productNoPublishedProducts:
      "No products have been published yet. Add products in Sanity Studio.",
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
    transportSchemeTitle:
      "Choose a distribution approach based on region and needs.",
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
    productCtaTitle:
      "Share your industrial fuel requirements with Petro Anigos.",
    productCtaDescription:
      "Our team is ready to discuss the product, volume, location, and suitable distribution scheme.",
    requestOffer: "Request an offer",
    offerFormEyebrow: "Business Services / Request for Quotation",
    offerFormTitle: "Share your industrial fuel supply requirements.",
    offerFormDescription:
      "Provide your product and delivery requirements so the Petro Anigos team can review your request and prepare a suitable quotation discussion.",
    stepLabel: "Step",
    ofLabel: "of",
    configureNeeds: "Product and supply requirements",
    applicantDetails: "Company and contact information",
    offerFormNotice:
      "This information is for an initial review. Pricing, minimum order, payment method, availability, and commercial terms will be discussed and confirmed separately.",
    fuelType: "Fuel product",
    dieselFuelDescription: "Diesel fuel for industrial requirements",
    b40FuelDescription: "40% Biodiesel + 60% Diesel/HSD",
    requiredVolume: "Estimated volume requirement (liters)",
    volumeRange: "1,000–30,000 L",
    volumeSliderLabel: "Select estimated volume in liters",
    volumeSelectionDescription:
      "Select the estimated volume per delivery. Preset volumes are an initial reference and will be reviewed against your operational requirements.",
    deliveryRegion: "Delivery destination",
    deliverySchedule: "Supply frequency and schedule",
    scheduled: "One-time / scheduled",
    scheduledDescription: "A target receiving date is available.",
    recurring: "Recurring supply",
    recurringDescription:
      "Recurring supply requirements for further discussion.",
    asNeeded: "Flexible schedule",
    asNeededDescription: "Delivery timing can be aligned at a later stage.",
    companyName: "Company name",
    contactName: "Company contact name",
    phoneNumber: "Contact telephone number",
    unloadingAddress: "Full receiving / unloading address",
    expectedReceivingDate: "Target receiving date",
    chooseReceivingDate: "Select a target date",
    dateConfirmationNote:
      "The selected date is an initial target and will be confirmed subject to product availability and distribution scheduling.",
    requirementNotes: "Additional requirements and information",
    requirementNotesDescription:
      "Include supply frequency, product specifications, site requirements, operating hours, or receiving conditions to be considered.",
    back: "Return to previous step",
    continueApplicantDetails: "Continue to company information",
    prepareOfferEmail: "Continue via email",
    requirementEstimate: "Request summary",
    temporarySummary: "Initial estimate — for discussion",
    draft: "Not submitted",
    region: "Delivery destination",
    schedule: "Supply schedule",
    notFilled: "Not provided",
    fuelTaxEstimate: "Estimated cost simulation",
    fuelTaxDescription:
      "This simulation uses an indicative base price and a PBBKB rate entered by the user. It is not an official quotation.",
    serviceArea: "Simulation reference area",
    basePricePerLiter: "Indicative base price per liter",
    temporary: "initial reference",
    pbbkbRate: "PBBKB rate (%)",
    accordingToProvince: "Enter the applicable regional rate",
    priceBasis: "Product value before PBBKB",
    estimatedPbbkb: "Estimated PBBKB",
    estimatedTotal: "Estimated value including PBBKB",
    taxSimulationNote:
      "PBBKB rates and tax treatment must be verified against applicable regulations and the actual transaction. This simulation is not an offer, invoice, or official bill.",
    emailOpeningNote:
      "The button above opens your email application with a prepared request summary for your review before sending.",
    backToProducts: "Return to products",
    directDiscussionTitle:
      "Would you like to discuss your supply requirements directly?",
    emailPetroAnigos: "Contact the Petro Anigos team by email",
    offerEmailSubject: "Industrial Fuel Quotation Request",
    prospectiveCustomer: "Prospective customer",
    notCalculated: "Not available",
    emailAddress: "Email address",
    coverageBekasi: "Bekasi",
    coveragePalembang: "Palembang",
    coverageMedan: "Medan",
    coveragePalangkaRaya: "Palangka Raya",
    coverageNorthSulawesi: "North Sulawesi",
    coverageSouthSulawesi: "South Sulawesi",
    provinceWestJava: "West Java",
    provinceSouthSumatra: "South Sumatra",
    provinceNorthSumatra: "North Sumatra",
    provinceCentralKalimantan: "Central Kalimantan",
    provinceNorthSulawesi: "North Sulawesi",
    provinceSouthSulawesi: "South Sulawesi",
    reachPageEyebrow: "National coverage",
    reachPageTitle: "Industrial fuel distribution across Indonesia.",
    reachPageDescription:
      "Petro Anigos supports business customers nationwide through coordinated industrial fuel distribution, operational planning, and delivery support across Indonesia.",
    operationalNetwork: "National distribution network",
    coverageOverviewTitle: "Nationwide coverage across Indonesia.",
    coverageOverviewDescription:
      "We review each business requirement according to delivery location, product volume, schedule, and the most suitable distribution mode.",
    servicePoints: "Service scope",
    mainRegions: "Business focus",
    coverageMap: "National coverage map",
    nationwideIndonesia: "Nationwide (Indonesia)",
    coverageCardHint: "Hover or press for details",
    coverageCardReturnHint: "Move away to return",
    regionLabel: "Kawasan",
    servedAreasEyebrow: "Operational reference areas",
    servedAreasTitle:
      "Coordinated distribution support for business requirements.",
    servedAreasDescription:
      "The areas below illustrate operational references. Submit your requirements to confirm the most suitable service plan for your location anywhere in Indonesia.",
    landMode: "Darat",
    truckingMode: "Trucking",
    interregionalMode: "Antarwilayah",
    seaMode: "Laut",
    coverageWorkEyebrow: "Business delivery planning",
    coverageWorkTitle: "From national coverage to a clear delivery plan.",
    coverageWorkDescription:
      "We align the unloading point, product requirements, volume, schedule, and distribution mode before confirming delivery details.",
    reviewLocation: "Map the requirement",
    reviewLocationDescription:
      "Identify the delivery location, unloading point, and operating context.",
    chooseMode: "Align the distribution mode",
    chooseModeDescription:
      "Select the most suitable land, trucking, sea, or interregional coordination.",
    confirmPlan: "Confirm the delivery plan",
    confirmPlanDescription:
      "Review volume, schedule, availability, and execution requirements together.",
    areaVerification: "Verifikasi kebutuhan",
    locationNotFoundTitle:
      "Do you have a requirement outside the listed areas?",
    locationNotFoundDescription:
      "Share your delivery location, product volume, and required schedule. Our team will review the most suitable distribution options for your business anywhere in Indonesia.",
    coverageNotice:
      "National coverage is supported through coordinated planning. Delivery availability is confirmed against actual requirements.",
    sustainabilityPageEyebrow: "Keberlanjutan",
    sustainabilityPageTitle:
      "Running the business with broader responsibility.",
    sustainabilityPageDescription:
      "For Petro Anigos, sustainability starts with cleaner energy, operational safety, and contribution to society.",
    ourApproach: "Our approach",
    sustainabilityIntroTitle: "Keberlanjutan bukan sekadar jargon.",
    sustainabilityIntroDescription:
      "This narrative is summarized from the company profile. Formal ESG data, certifications, and impact figures are not available and are not presented as quantitative claims.",
    howWeWork: "How we work",
    actionPrinciplesTitle: "Prinsip yang diterjemahkan ke dalam tindakan.",
    actionPrinciplesDescription:
      "We keep every decision grounded in customer needs, compliance, safety, and strong relationships with partners.",
    mainFocus: "Fokus Utama",
    consistentPracticeTitle: "Building trust through consistent practices.",
    referenceSummary:
      "This summary reflects themes available in company references.",
    continueExploring: "Lanjutkan eksplorasi",
    serveNeedsTitle: "Learn how Petro Anigos serves your needs.",
    transparencyNote:
      "Transparency note: this page does not yet include environmental/K3 certifications, specific CSR programs, or emissions metrics because the data is not included in the company references.",
    cleanerEnergy: "Cleaner energy",
    cleanerEnergyDescription:
      "B40 Biosolar blends 40% biodiesel and 60% diesel as part of the government program related to plant-based energy.",
    operationalSafety: "Operational safety",
    operationalSafetyDescription:
      "Punctuality and safety are priorities in every fuel distribution process.",
    socialContribution: "Kontribusi sosial",
    socialContributionDescription:
      "The company is committed to being a reliable partner and contributing to community welfare.",
    sustainableEnergyEyebrow: "Sustainability / Sustainable Energy",
    sustainableEnergyTitle:
      "Understanding B40's role in the energy transition.",
    sustainableEnergyDescription:
      "B40 Biosolar is part of Petro Anigos' portfolio, supporting industrial needs while following the government's mandatory biodiesel program.",
    b40IntroEyebrow: "B40 Biosolar",
    b40IntroTitle: "A clear composition with standards kept in view.",
    b40IntroDescription:
      "The company profile describes B40 as a blend of 40% biodiesel and 60% diesel, with quality and specifications aligned with the Directorate General of Oil and Gas.",
    biodiesel40Title: "40% biodiesel",
    biodiesel40Description:
      "The biodiesel portion of the B40 composition following the government program.",
    diesel60Title: "60% solar",
    diesel60Description: "The diesel fuel portion of the B40 composition.",
    specificationTitle: "Aligned with specifications",
    specificationDescription:
      "Product quality refers to the standards of Indonesia's Directorate General of Oil and Gas.",
    csrEyebrow: "Tanggung Jawab Sosial Perusahaan",
    csrTitle:
      "CSR: Growing together with communities through meaningful contribution.",
    csrDescription:
      "A year-by-year record of Petro Anigos CSR activities, documenting contribution and shared progress with communities.",
    csrIntroTitle: "Contribution rooted in care.",
    csrIntroDescription:
      "Explore corporate social responsibility activities by year. Each entry includes information and documentation prepared by the company.",
    csrTimelineEyebrow: "Activity Record",
    csrTimelineTitle: "Perjalanan CSR tahunan",
    csrTimelineDescription:
      "Select a year to explore the CSR activities documented for that period.",
    csrYearNavigation: "Select a year of CSR activities",
    csrActivitiesLabel: "Kegiatan",
    csrNoActivitiesTitle: "Kegiatan CSR belum ditambahkan",
    csrNoActivitiesDescription:
      "Annual activity documentation will appear here once it has been added through content management.",
    csrDateNotSet: "Activity date not provided",
    partnershipGovernanceEyebrow: "Keberlanjutan / Kemitraan & Tata Kelola",
    partnershipGovernanceTitle: "Relationships built with integrity.",
    partnershipGovernanceDescription:
      "Petro Anigos maintains relationships with business partners, customers, and the Government of Indonesia to support a healthy business climate.",
    governanceIntroEyebrow: "Tata Kelola",
    governanceIntroTitle: "Partnerships growing from clarity and compliance.",
    governanceIntroDescription:
      "This narrative uses principles listed in the company profile. Formal management structure and governance policy information are not yet available.",
    goodRelationships: "Hubungan baik",
    goodRelationshipsDescription:
      "Maintaining relationships with business partners and customers is part of how the company works.",
    compliance: "Kepatuhan",
    complianceDescription:
      "Operating on the legal basis and trading licenses listed in company references.",
    integrity: "Integritas",
    integrityDescription:
      "Supporting a healthy business climate through transparency and professionalism.",
    governanceNote:
      "Management structure, governance policies, and additional compliance indicators still require official company data.",
    viewPartnerships: "Lihat kemitraan",
    operationalSafetyEyebrow: "Sustainability / Operational Safety",
    operationalSafetyPageTitle:
      "Distribution that is punctual, safe, and responsible.",
    operationalSafetyPageDescription:
      "Workplace safety and punctuality are priorities in Petro Anigos fuel distribution operations.",
    operationalPriorityEyebrow: "Operational priority",
    operationalPriorityTitle: "Safety is part of how we work.",
    operationalPriorityDescription:
      "The company profile places punctuality and accident-free operations among its work objectives. Detailed K3 certifications are not available in the references.",
    accidentFree: "Bebas dari kecelakaan kerja",
    accidentFreeDescription:
      "Safety is a primary consideration in every fuel distribution operation.",
    punctuality: "Ketepatan waktu",
    punctualityDescription:
      "Distribution coordination is directed toward meeting customer needs on schedule.",
    routeCoordination: "Koordinasi rute",
    routeCoordinationDescription:
      "Fleet and partner networks help support deliveries according to regional needs.",
    safetyNote:
      "K3 certification data, detailed operating procedures, and safety metrics are not yet available for publication.",
    viewCoverage: "View coverage",
    dataPolicy: "Data Policy",
    dataPolicyTitle:
      "Sources and use of information on the Petro Anigos website.",
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
    referenceSources: "Sumber rujukan",
    attributionTitle: "Attribution should be visible near the data.",
    attributionDescription:
      "When official integrations are available, attribution, timestamp, and data status will be shown on the ribbon and explained further on this page.",
    bmkgWeather: "BMKG — Weather Forecast",
    bmkgWeatherDescription:
      "Official source for BMKG open weather forecasts. Weather data must display BMKG attribution in the application.",
    idxMarket: "Bursa Efek Indonesia (IDX)",
    idxMarketDescription:
      "Official capital-market reference. Public market data will only be used after access and redistribution rights are verified.",
    disclaimer: "Disclaimer",
    dataDisclaimer:
      "Weather and market information is provided for general purposes only. It may be delayed, change, be incomplete, or not reflect actual conditions. It is not investment advice and does not replace official warnings or operating procedures.",
    ribbonStatus: "Current ribbon data: demo/static",
    contactPetroAnigos: "Hubungi Petro Anigos",
    cookieTerms: "Cookie Terms",
    cookieTermsTitle: "How we use cookies on the Petro Anigos website.",
    cookieTermsDescription:
      "We use cookies in a limited way to support basic website functions and respect visitor choices.",
    usageTransparency: "Transparansi penggunaan",
    cookieContextTitle: "Cookies help the website remember necessary context.",
    cookieContextDescription:
      "Cookies are small data files stored on a device when visiting a website. These terms explain the types, purposes, duration, and choices available to users.",
    essentialCookies: "Cookies esensial",
    essentialCookiesDescription:
      "Cookies required for basic website features, including storing cookie consent choices and helping maintain display preferences.",
    preferenceCookies: "Cookies preferensi",
    preferenceCookiesDescription:
      "Cookies that may remember user choices such as language or display preferences when those features use them.",
    analyticsAdvertisingCookies: "Analytics and advertising cookies",
    analyticsAdvertisingCookiesDescription:
      "Not currently used. If enabled in the future, users will receive appropriate information and choices before non-essential cookies are stored.",
    active: "Aktif",
    limited: "Terbatas",
    inactive: "Tidak aktif",
    consentCookies: "Cookies persetujuan",
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
    recruitmentWarningLabel: "Recruitment notice",
    recruitmentWarningTitle: "Beware of recruitment scams",
    recruitmentWarningDescription:
      "Please be cautious of parties claiming to represent PT. Anigos Jaya Perkasa during recruitment.",
    recruitmentFeeDisclaimer:
      "PT. Anigos Jaya Perkasa never charges any fees at any stage of the recruitment process.",
    recruitmentWarningAcknowledge: "I understand",
    careersTitle: "Grow with the energy that moves Indonesia.",
    careersDescription:
      "We are looking for people who want to work with purpose, maintain quality, and build reliable energy distribution.",
    whyPetroAnigos: "Mengapa Petro Anigos",
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
    careerOpeningsLoading: "Loading available positions…",
    noCareerOpenings: "There are currently no open positions.",
    noCareerOpeningsDescription:
      "Please check this page again later. Position details and application links will appear when a role opens.",
    careerOpeningsLoadError:
      "The openings list is temporarily unavailable. Please try again shortly.",
    careerOpeningUnavailable:
      "This position is no longer available. Please select another active opening.",
    careerMaxFilesError: "Attach no more than 5 files.",
    careerOpeningsTitle: "Find a role that fits your next step.",
    careerOpeningsDescription:
      "Choose an active position to apply for. The opening details and form options follow the positions currently available in Sanity.",
    positionsAvailable: "positions available",
    viewAndApply: "View position & apply",
    purposeAtWork: "Work with purpose",
    purposeAtWorkDescription:
      "Every role contributes to energy distribution supporting Indonesian industry.",
    supportiveCulture: "Supportive culture",
    supportiveCultureDescription:
      "We build open communication, cross-functional teamwork, and room to grow together.",
    fieldLearning: "Learn from the field",
    fieldLearningDescription:
      "You will work with real distribution, customer, partner, and operational contexts.",
    safeWorkStandards: "Safe work standards",
    safeWorkStandardsDescription:
      "Safety, compliance, and integrity are part of how we make decisions.",
    crossRoleCollaboration: "Cross-role collaboration",
    crossRoleCollaborationDescription:
      "Good ideas can come from any function and be discussed from diverse perspectives.",
    roomToGrow: "Room to grow",
    roomToGrowDescription:
      "We value initiative, responsibility, and the desire to improve work quality.",
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
    googleSignInPrompt: "Fill in your name and email faster with Google",
    googleSignedInAs: "Connected with Google",
    googleSignIn: "Continue with Google",
    googleSigningIn: "Connecting...",
    googleSignOut: "Sign out from Google",
    googleSignInOptional:
      "Optional. You can still submit your application without signing in.",
    googleSignInFailed: "Google sign-in failed. Please try again.",
    googleSignOutFailed: "Google sign-out failed. Please try again.",
    googleIdentityMismatch:
      "Use the same email address as the Google account you signed in with.",
    dataReadyForReview: "Data ready for review",
    applicationThanks:
      "Thank you. Your application and supporting documents have been received for the selected position. Our team will review your profile.",
    sendAnotherApplication: "Send another application",
    fullName: "Full name",
    fullNamePlaceholder: "Full name",
    positionInterested: "Position of interest",
    choosePosition: "Choose a position",
    shortMessage: "Short message",
    shortMessagePlaceholder:
      "Tell us about your experience or why you are interested...",
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
    bekasiCoverageDescription:
      "A service point supporting distribution needs in the Jabodetabek area and surrounding regions.",
    palembangCoverageDescription:
      "Supporting industrial fuel and distribution needs in South Sumatra.",
    medanCoverageDescription:
      "An operational point for customer needs in North Sumatra and surrounding areas.",
    palangkaRayaCoverageDescription:
      "Supporting fuel delivery coordination for operational needs in Central Kalimantan.",
    northSulawesiCoverageDescription:
      "An operational point serving distribution needs in North Sulawesi.",
    southSulawesiCoverageDescription:
      "An operational point supporting customer needs in South Sulawesi.",
    offerPageEyebrow: "Products / Offer",
    offerPageTitle: "Starting with your needs, we prepare the discussion.",
    offerPageDescription:
      "Share your industrial fuel requirements so the Petro Anigos team can review the suitable product, volume, location, schedule, and distribution scheme.",
    needsBasedOffer: "Needs-based offer",
    beforeSubmitting: "Before submitting",
    offerPreparationTitle:
      "Simple information helps make the discussion more focused.",
    offerPreparationDescription:
      "You do not need to prepare complex commercial specifications. Start with the operational information you already know.",
    prepareForOffer: "What to prepare",
    productTypePreparation: "Product type",
    productTypePreparationDescription:
      "Diesel/HSD or B40 Biosolar based on your operational needs.",
    volumePreparation: "Required volume",
    volumePreparationDescription:
      "Estimated volume per delivery or recurring requirements.",
    locationSchedulePreparation: "Location and schedule",
    locationSchedulePreparationDescription:
      "Unloading point region and planned receiving time.",
    distributionModePreparation: "Distribution mode",
    distributionModePreparationDescription:
      "Land fleet, sea transportation, or transport partner requirements.",
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
    discussionScopeTitle:
      "Commercial and distribution details are confirmed together.",
    discussionScopeDescription:
      "Information in the form is an initial discussion basis, not a price determination or delivery guarantee.",
    offerScopeNoticeLabel: "Quotation details confirmed together",
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
    productTypeValue: "Solar/HSD and B40 Biosolar",
    productCompositionValue: "40% Biodiesel + 60% Solar/HSD",
    productQualityStandardValue:
      "Based on the specifications of Indonesia's Directorate General of Oil and Gas",
    productTrademarkValue: "Petro Anigos",
    productServiceScaleValue: "Small, medium, large, and national scale",
    productVideoEyebrow: "Product introduction",
    productVideoTitle: "Understand the product before defining your needs.",
    companyStoryVideoEyebrow: "Our company story",
    companyStoryVideoTitle: "Energy that moves with industry.",
    companyStoryVideoDescription:
      "This short video introduces how PT. Anigos Jaya Perkasa builds trust, maintains standards, and connects customer needs with responsible distribution.",
    companyStoryVideoLabel: "PT. Anigos Jaya Perkasa company profile video",
    coverageVideoEyebrow: "National distribution network",
    coverageVideoTitle: "Supporting industrial requirements across Indonesia.",
    coverageVideoDescription:
      "Learn how Petro Anigos coordinates industrial fuel requirements, distribution modes, and delivery schedules for business customers across Indonesia.",
    coverageVideoLabel: "PT. Anigos Jaya Perkasa distribution coverage video",
    productVideoDescription:
      "This introduction explains the role of Solar/HSD and B40 Biosolar as fuel options for industrial operations.",
    productVideoTitleLabel: "Petro Anigos product introduction video",
    productServiceScale: "Service scale",
    productSmallToNational: "Small to national",
    productDistribution: "Distribution",
    productLandAndSea: "Land and sea",
    productPosition: "Product position",
    productSupport:
      "Supported by Petro Anigos distribution capabilities for customers requiring land and interregional services.",
    partnershipTrustHeading: "End-user companies we serve",
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
    partnershipAction: "Learn more",
    partnershipShowAll: "Show all",
    partnershipCloseLogos: "Close",
    partnershipCarouselLabel: "Petro Anigos partnership opportunities",
    clientPageEyebrow: "Partnerships",
    clientPageTitle: "Our clients",
    clientPageDescription:
      "Supporting companies' energy needs through reliable services and long-term partnerships.",
    clientIntroEyebrow: "Petro Anigos clients",
    clientIntroTitle: "Trusted to support business energy needs",
    clientIntroDescription:
      "We serve companies across industries with distribution support and energy products suited to their operational needs.",
    clientTableEyebrow: "End-client portfolio",
    clientTableTitle: "End clients served by Petro Anigos",
    clientTableDescription:
      "This list features end-user companies served directly by Petro Anigos, along with their service locations and the products they use.",
    clientCompanyColumn: "Company name",
    clientLocationColumn: "Location",
    clientProductsColumn: "Services",
    clientEmpty: "Client records will appear here once published.",
    clientLoading: "Loading client records...",
    clientLoadError:
      "Client records could not be loaded. Please try again later.",
    clientGalleryEyebrow: "Documentation",
    clientGalleryTitle: "Client gallery",
    clientGalleryDescription:
      "Select a company to view service and activity documentation.",
    clientGalleryAll: "View all",
    clientGalleryShowFewerCategories: "View fewer",
    clientGalleryOtherCategories: "more categories",
    clientGalleryEmpty: "There are no photos for this company yet.",
    clientGalleryNoClients: "There are no published clients yet.",
    clientProductUnavailable: "Not listed",
    resourceEnergyTitle: "CSR",
    resourceEnergyDescription:
      "A year-by-year record of Petro Anigos social responsibility activities.",
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
    articleOperationsTitle: "Why punctuality matters in fuel distribution",
    articleOperationsDescription:
      "Notes on reliability, safety, and coordination in supporting customer needs.",
    articleInsightsCategory: "Insights",
    articleInsightsTitle:
      "Choosing a fuel distribution partner for business needs",
    articleInsightsDescription:
      "What to consider when assessing quality, legality, and service readiness.",
    articleOffice: "Articles",
    articleNewsroom: "Anigos News",
    articleHome: "Home",
    articleReadMore: "read",
    articleBackToNewsroom: "Back to newsroom",
    articleReadAlso: "Read also",
    articleGalleryTitle: "Article gallery",
    newsroomEyebrow: "Articles / Anigos News",
    newsroomTitle: "Petro Anigos newsroom.",
    newsroomDescription:
      "News, perspectives, and information to help understand energy, distribution, and how we work.",
    newsroomSearch: "Search articles...",
    newsroomLatest: "Latest news",
    newsroomLatestTitle: "Stories we are putting together.",
    newsroomFeatured: "Featured news",
    newsroomEmpty: "No articles found",
    newsroomSearchHint: "Try another keyword or category.",
    newsroomBrowseCategories: "Explore by category",
    newsroomCategoryTitle: "Every story has its own context.",
    newsroomCategoryDescription:
      "Choose a segment to browse articles grouped by newsroom topic.",
    newsroomActiveSegments: "active segments",
    newsroomVideoCategory: "Category video",
    newsroomVideoDescription:
      "Explore the context and ways of working behind this category.",
    newsroomAllCategories: "All",
    newsroomAllSubcategories: "All subcategories",
    newsroomArticleCount: "articles",
    articleDirectoryEyebrow: "Information Center",
    articleDirectoryTitle: "Choose the reading space you need.",
    articleDirectoryDescription:
      "This page is the entry point to company editorial content and reference information.",
    articlePageTitle: "Insights and information from PT. Anigos Jaya Perkasa.",
    articlePageDescription:
      "Explore news, publications, and public information references about how PT. Anigos Jaya Perkasa serves industrial energy needs.",
    articleEditorialNote: "Editorial note",
    articleEditorialTitle: "Content will grow alongside the company.",
    articleEditorialDescription:
      "Articles and publications without official sources will be added gradually through a separate editorial process.",
    articleOpenPage: "Open page",
    articleDestinationNews: "Anigos News",
    articleDestinationNewsDescription:
      "News, perspectives, and information about energy and distribution.",
    articleDestinationPublications: "Publications",
    articleDestinationPublicationDescription:
      "Company, product, operations, and partnership materials available to read.",
    articleDestinationPublicInfo: "Public Information Basis",
    articleDestinationPublicInfoDescription:
      "Company facts and guidance on information available for publication.",
    publicationCatalog: "Publication catalog",
    publicationCatalogTitle: "Choose material to read.",
    publicationSearch: "Search publications...",
    publicationEmpty: "No publications found",
    publicationSearchHint: "Try another keyword or category.",
    fleetLand: "Land fleet",
    fleetGallery: "Land Fleet Gallery",
    fleetChoosePhoto: "Choose photo",
    fleetOpenPhoto: "Open photo",
    fleetViewAll: "View all",
    fleetPhotoCount: "photos",
    fleetGalleryEmpty:
      "No service or fleet photos have been published in Sanity yet.",
    fleetGalleryError:
      "Gallery photos could not be loaded from Sanity. Please reload the page.",
    fleetGalleryInstruction:
      "Choose a capacity option below to change the photo and details.",
    fleetVariantLabel: "Land fleet capacity options",
    fleetCapacitySupportingText:
      "Land fleet for distribution needs with a capacity of {capacity} {unit}.",
    videoPause: "Pause video",
    videoPlay: "Play video",
    videoContent: "Video content",
    videoPosition: "Video position",
    videoUnmute: "Turn sound on",
    videoMute: "Mute sound",
    videoFullscreen: "Full screen",
    commissionerGallery: "Commissioner photo gallery",
    leadershipGallery: "Leadership profile gallery",
    leadershipProfileCaption: "{role} profile",
    commissionerDocumentation: "Documentation",
    commissionerGalleryDescription:
      "Visual documentation related to company profiles and work environments.",
    galleryPrevious: "Previous gallery photo",
    galleryNext: "Next gallery photo",
    previousPhoto: "Previous photo",
    nextPhoto: "Next photo",
    loadingPage: "Loading page",
    partnershipLoading: "Loading partnership details...",
    partnershipNotFound: "Partnership data not found.",
    partnershipBackToList: "Back to the client list",
    partnershipLogoUnavailable: "Company logo is not available.",
    partnershipDate: "Partnership date",
    partnershipType: "Partnership type",
    partnershipGalleryEyebrow: "02 — Partnership Gallery",
    partnershipGalleryTitle: "Partnership documentation.",
    partnershipGalleryDescription:
      "Photos managed in the partner gallery field in the CMS.",
    partnershipDocumentsEyebrow: "03 — Partnership Documents",
    partnershipDocumentsTitle: "Supporting documents.",
    partnershipDocumentsDescription:
      "Documents to help understand the portfolio and partnership documentation.",
    partnershipDownloadPortfolio: "Download portfolio",
    partnershipPortfolioUnavailable: "Portfolio document has not been added.",
    partnershipDownload: "Download",
    partnershipOfficialDocumentation: "Official partnership documentation.",
    partnershipSectionDetailEyebrow: "04 — Partnership Details",
    partnershipOverviewEyebrow: "01 — Partnership Overview",
    partnershipUnavailable: "Unavailable",
    partnershipPortfolioMissing: "Partnership type is not available.",
    partnershipOverviewMissing:
      "A brief company introduction is not available.",
    partnershipBackgroundMissing: "Partnership background is not available.",
    partnershipBackgroundTitle: "Partnership background.",
    partnershipBackgroundSubtitle:
      "A detailed explanation of the rationale, scope, and direction of the partnership.",
    partnershipClosingMissing:
      "Partnership closing statement is not available.",
    partnershipNameFallback: "Partnership Details",
    partnershipLogoAltFallback: "partner company",
    partnershipGalleryAlt: "Partnership documentation for {name}.",
    partnershipGalleryCaption: "Partnership documentation",
    partnershipPhotoAlt: "Partnership photo for {name}",
    partnershipOriginalResolution: "Original resolution",
    partnershipPreview: "Open preview",
    partnershipShowLess: "Show less",
    partnershipReadMore: "Read more",
    galleryPhotoPosition: "Image {current} of {total}",
    galleryEnlargePhoto: "Enlarge photo",
    openNavigation: "Open navigation menu",
    mobileNavigation: "Mobile navigation",
    galleryPhotoSelect: "Select photo",
    articlePublicInfoEyebrow: "Articles / Public Information Basis",
    articlePublicInfoTitle: "Information grounded in facts and clear sources.",
    articlePublicInfoDescription:
      "This page explains PT. Anigos Jaya Perkasa's public information references based on the company profile and available company data.",
    companyStructureEyebrow: "About Us",
    companyStructureTitle: "Company Structure",
    companyStructureDescription:
      "An overview of the governance framework, leadership, and functions supporting PT. Anigos Jaya Perkasa's operations.",
    reachNational: "National",
    reachB2B: "B2B",
    fleetPhotoPosition: "Photo {current} of {total}",
    dataFallback: "Fallback data",
    dataCms: "CMS data",
    chooseDivision: "Choose a division",
    structureNoCommissioners: "No Commissioner profiles have been published.",
    structureNoDirectors: "No Director profiles have been published.",
    structureNoDivisions: "No divisions have been published.",
    structureNoDivisionMembers: "No division members have been published.",
    emailPlaceholder: "name@example.com",
    paginationLabel: "Pagination",
    paginationPrevious: "Go to previous page",
    paginationNext: "Go to next page",
    paginationMore: "More pages",
    sidebarToggle: "Toggle sidebar",
    breadcrumbLabel: "Breadcrumb",
    breadcrumbMore: "More",
    sidebarTitle: "Sidebar",
    mobileSidebarDescription: "Displays the mobile sidebar.",
    commandPaletteTitle: "Command Palette",
    commandPaletteDescription: "Search for a command to run...",
    scrollToEnd: "Scroll to end",
    scrollToStart: "Scroll to start",
    footerCopyright: "All rights reserved.",
    spinnerLabel: "Loading",
    toastClose: "Close notification",
    publicationAllCategories: "All",
    galleryPreviousCategoryPhoto: "Previous category photo",
    profileIllustration: "Illustrative profile",
    galleryByCategoryCarousel: "Gallery photos by category carousel",
    galleryNoPhotosForDates: "No photos match the available upload dates.",
    galleryPageTitle: "Petro Anigos documentation gallery.",
    galleryPageDescription:
      "Explore visual documentation of partnerships, distribution, and operational activities supporting Petro Anigos services.",
    galleryMainSectionTitle: "See our activities up close.",
    galleryMainSectionDescription:
      "Select a thumbnail to change the main image. Open an image to view details and zoom in.",
    galleryOpenImage: "Open",
    galleryNoDocuments: "No gallery documentation is available yet.",
    galleryExploreCategoryTitle: "Explore the gallery by category.",
    galleryExploreCategoryDescription:
      "Choose a category, browse the carousel for more documentation, and open a photo to enlarge it.",
    galleryBrowseCategories: "Browse by category",
    galleryStoryTitle: "Photos with a story.",
    galleryStoryDescription:
      "Each photo captures a story of collaboration and operational support with our partners.",
    galleryDateUnavailable: "Date unavailable",
    galleryStoryUnavailable: "A story for this photo is not available yet.",
    galleryByCategoryTitle: "Gallery by category.",
    galleryByCategoryDescription:
      "Explore all partnership and operational photos. Choose a category or sort photos by upload date and year.",
    gallerySearchCategories: "Search categories...",
    galleryCategoryNotFound: "No category found.",
    galleryDefaultOrder: "Default order",
    galleryChooseUploadYear: "Choose upload year",
    galleryUploadDatesUnavailable: "Upload dates unavailable",
    gallerySortMetadataNote:
      "Date and year sorting use Sanity asset upload timestamps. Photos without upload-date metadata are excluded.",
    galleryLoadError:
      "The gallery could not be loaded. Please reload the page.",
    galleryNoPhotosForSelection:
      "No photos with upload dates match this selection.",
    galleryNoPhotosInCategory: "There are no photos in this category yet.",
    cookieTermsLink: "cookie terms",
    publicGalleryEyebrow: "Articles / Gallery",
    galleryBackToList: "Back to gallery",
    galleryVisualDocumentation: "Visual documentation",
    galleryFilters: "Gallery photo filters",
    galleryChooseCategory: "Choose a category",
    gallerySortBy: "Sort by",
    galleryNoSorting: "No sorting",
    galleryUploadDate: "Upload date",
    galleryUploadYear: "Upload year",
    galleryDateOrder: "Date order",
    galleryNewest: "Newest",
    galleryOldest: "Oldest",
    galleryPhotoDocumentation: "Photo documentation",
    galleryLoading: "Loading gallery...",
    serviceGalleryEyebrow: "Service documentation",
    serviceGalleryTitle: "Products & Services Gallery",
    serviceGalleryDescription:
      "Photos of activities and services managed through Sanity.",
    galleryShowPhoto: "Show photo",
    galleryNextCategoryPhoto: "Next category photo",
    galleryCollections: "Photo collections",
    galleryCategories: "Gallery categories",
    galleryAll: "All",
    galleryAllCategories: "All categories",
    galleryStories: "Stories behind the photos",
    csrActivityFallback: "CSR activity",
    csrGallery: "CSR gallery",
    csrActivityPhotos: "CSR activity photos",
    csrSectionEyebrow: "02 — CSR activity",
    csrDocumentsTitle: "Activity documents.",
    csrYearPhotosUnavailable:
      "No photo documentation is available for this year yet.",
    csrBackgroundTitle: "Activity Background",
    csrDocumentsEyebrow: "03 — Activity documents",
    csrDocumentsDescription:
      "Download the available supporting documents for CSR activities.",
    csrDocumentFallback: "CSR activity document",
    csrActivityYear: "CSR activity {year}",
    csrYearDocumentsUnavailable:
      "No activity documents are available for this year yet.",
    csrGallerySectionEyebrow: "01 — Activity documentation",
    csrGalleryYearDescription: "CSR activity documentation from {year}.",
    hopesPatternAlt:
      "Aspirations and goals visual pattern for PT. Anigos Jaya Perkasa",
    partnershipTransportationAlt:
      "PT. Anigos Jaya Perkasa transportation partnership illustration",
    dataDetails: "Details",
    viewPartnerDetails: "View details",
    previousPageShort: "Previous",
    nextPageShort: "Next",
    pageNumber: "Page",
    partnerSince: "Partner since",
    portfolio: "Portfolio",
    documentation: "Documentation",
    viewNote: "View note",
    partnersShowing: "Showing {from}-{to} of {count} partners",
    reachCardInstruction: "Press to view details",
    reachAreasUnavailable: "Service areas will be updated through the CMS.",
    publicationComingSoon: "Coming soon",
    partnershipContactUnavailable:
      "Contact email has not been added in the CMS",
    publicInfoPrinciplesEyebrow: "Information Principles",
    publicInfoPrinciplesTitle:
      "Be transparent about what is known and what is not yet available.",
    publicInfoPrinciplesDescription:
      "Website data is compiled from company references. Unverified information is not filled in by assumption.",
    publicInfoSourceTitle: "Clear sources",
    publicInfoSourceDescription:
      "Legal, product, and operational facts are summarized from PT. Anigos Jaya Perkasa's company profile.",
    publicInfoLimitsTitle: "Information boundaries",
    publicInfoLimitsDescription:
      "Data such as fleet size, branch contacts, prices, and ESG metrics is shown only when available and verified.",
    publicInfoLegalTitle: "Legal documents",
    publicInfoLegalDescription:
      "Legality information refers to the numbers and details listed in company references.",
    publicInfoResponsibleTitle: "Responsible communication",
    publicInfoResponsibleDescription:
      "Website copy is designed to help prospective customers understand services without unsupported claims.",
    publicInfoNote:
      "This page does not replace official legal documents. For verification or partnership inquiries, contact PT. Anigos Jaya Perkasa through official channels.",
    contactUs: "Contact us",
    contactPageEyebrow: "Official contact",
    contactPageTitle: "Let's discuss your supply requirements",
    contactPageDescription:
      "Contact PT. Anigos Jaya Perkasa to discuss industrial fuel, marine fuel, or potential business partnerships.",
    contactChannelsEyebrow: "Communication channels",
    contactChannelsTitle: "Choose the way that works for you",
    contactChannelsDescription:
      "Our team is ready to help direct your inquiry to the right information and next steps.",
    contactPhoneLabel: "Phone",
    contactCallAction: "Phone",
    contactCopyAction: "Copy",
    contactCopiedAction: "Copied",
    contactCopyFailedAction: "Copy failed",
    contactEmailLabel: "Email",
    contactEmailAction: "Send an email",
    contactEmailPageEyebrow: "Send a message",
    contactEmailPageTitle: "Send a message to our team",
    contactEmailPageDescription:
      "Complete the form below to contact the Petro Anigos team.",
    contactFormHeading: "Tell us what you need",
    contactFormDescription:
      "Include details that help our team understand your message and get back to you.",
    contactFormEmailClientNote:
      "The form prepares a draft in your email app. Selected attachments must be added again in the email app before sending.",
    contactFormName: "Full name",
    contactFormPersonalSection: "Personal details",
    contactFormNeedsSection: "Requirements",
    contactFormProgressLabel: "Form progress",
    contactFormStepLabel: "Step",
    contactFormNext: "Next",
    contactFormPrevious: "Back",
    contactFormRequiredError: "This field is required.",
    contactFormEmailInvalid:
      "Enter a valid email address in the format name@domain.com.",
    contactFormPhoneDigitsError:
      "Use 8–15 digits, with a maximum of 15 numeric digits. You may include +, spaces, hyphens, and parentheses.",
    contactFormValidationSummary:
      "Review the fields marked in red and complete the required details before continuing.",
    contactFormNamePlaceholder: "For example: Alex Morgan…",
    contactFormCompany: "Company name",
    contactFormCompanyPlaceholder: "For example: Anigos Petro Ltd…",
    contactFormReplyEmail: "Email address",
    contactFormEmailPlaceholder: "name@company.com…",
    contactFormPhone: "Phone number",
    contactFormPhonePlaceholder: "For example: +62 812-3456-7890…",
    contactFormPosition: "Job title",
    contactFormPositionPlaceholder: "Select a job title…",
    contactFormPositionOtherPlaceholder: "Enter your job title…",
    contactPositionOwner: "Owner / Founder",
    contactPositionDirector: "Director / Executive",
    contactPositionProcurement: "Procurement / Purchasing",
    contactPositionOperations: "Operations / Logistics",
    contactPositionFinance: "Finance",
    contactPositionEngineering: "Engineering / Maintenance",
    contactPositionHse: "HSE",
    contactPositionOther: "Other",
    contactFormRequirement: "Requirements",
    contactFormRequirementPlaceholder: "For example: Industrial diesel supply…",
    contactFormMessage: "Message",
    contactFormMessagePlaceholder:
      "For example: We would like to learn about fuel supply options for our operations…",
    contactFormAttachments: "Attachments",
    contactChooseAttachments: "Choose attachments",
    contactAddAttachments: "Add attachments",
    contactAttachmentLimits:
      "Up to 5 files, 5 MB each · PDF, Word, Excel, JPG, PNG",
    contactAttachmentTypeError:
      "Unsupported file type. Choose PDF, Word, Excel, JPG, or PNG.",
    contactAttachmentSizeError:
      "File size must be greater than 0 and no more than 5 MB.",
    contactAttachmentCountError: "You can select up to 5 files.",
    contactRemoveAttachment: "Remove attachment",
    contactFormAttachmentList: "Selected files",
    contactFormAttachmentReminder:
      "Please add these files as attachments in your email app.",
    contactFormEmailSubject: "Contact inquiry",
    contactFormRecipient: "To",
    contactFormSubmit: "Send",
    contactFormBackAction: "Back to contact",
    contactWhatsappLabel: "WhatsApp",
    contactWhatsappAction: "Start a conversation",
    contactOfficeLabel: "Office",
    contactMapAction: "View map",
    contactNextStepTitle: "Have specific supply requirements?",
    contactNextStepDescription:
      "Share your company details, location, and estimated requirements through our quotation form so our team can provide a focused follow-up.",
    contactOfferAction: "Request a quotation",
    partnershipSelectionHint:
      "Select a partner company from the list to view its portfolio, documentation, and partnership details.",
    partnerCompanyData: "Partner company data",
    company: "Company",
    partnershipStartDate: "Partner since",
    partnerDateUnavailable: "Date unavailable",
    noPublishedPartners: "No partners have been published yet.",
    partnerPortfolioDescription:
      "Portfolio and documentation information for this partner company.",
    additionalDetails: "Additional details",
    partnershipPortfolioPdfTitle: "Portfolio company profile",
    partnershipPortfolioPdfUnavailable: "Portfolio PDF is not available yet.",
    partnershipOpenPortfolioPdf: "Open portfolio PDF",
    partnershipDocumentationPdfTitle: "Partnership documentation",
    partnershipDocumentationPdfUnavailable:
      "PDF documentation is not available yet.",
    partnershipOpenDocumentationPdf: "Open documentation PDF",
    publicationImagePreview: "Image preview",
    publicationDocumentPreview: "Document preview",
    publicationUnavailable: "Document is not available",
    publicationOpenPdf: "Open PDF",
    publicationPreparing: "Document is being prepared",
    carouselPrevious: "Previous slide",
    carouselNext: "Next slide",
    dialogClose: "Close",
  },
} as const

export type TranslationKey = keyof (typeof messages)["id"]

export function translate(locale: Locale, key: TranslationKey) {
  return messages[locale][key]
}

const weatherConditionTranslations: Record<Locale, Record<string, string>> = {
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

export function translateWeatherCondition(locale: Locale, condition: string) {
  const normalizedCondition = condition.trim().toLocaleLowerCase("id-ID")
  return weatherConditionTranslations[locale][normalizedCondition] ?? condition
}
