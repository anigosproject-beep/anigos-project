import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { TranslatedPageHero } from "@/components/sections/translated-page-hero"
import { Heading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabsContent as StructureTabsContent } from "@/components/structure-sidebar"
import { StructureSidebar } from "@/components/structure-sidebar"
import { TeamDivisionSelector } from "@/components/team-division-selector"
import { LeadershipGallery } from "@/components/commissioner-gallery"
import {
  getSanityTeam,
  getSanityTeamDivisions,
  type TeamCategory,
  type TeamMember,
} from "@/lib/sanity-team"

type MockPerson = {
  initials: string
  image: string
  name: string
  role: string
  description: string
  gallery?: Array<{
    src: string
    alt: string
    caption: string
  }>
}

const mockPeople = {
  komisaris: [
    {
      initials: "AS",
      image: "/images/team/portrait-placeholder.svg",
      name: "Arif Setiawan",
      role: "Komisaris",
      description: "Mengawasi arah tata kelola dan kepatuhan perusahaan.",
    },
  ],
  direksi: [
    {
      initials: "DN",
      image: "/images/team/portrait-placeholder.svg",
      name: "Dimas Nugraha",
      role: "Direktur Utama",
      description: "Mengkoordinasikan strategi dan pengembangan usaha.",
    },
    {
      initials: "MP",
      image: "/images/team/portrait-placeholder.svg",
      name: "Maya Prameswari",
      role: "Direktur Operasional",
      description: "Memimpin pengelolaan operasional dan layanan distribusi.",
    },
  ],
  operasional: [
    {
      initials: "FA",
      image: "/images/team/portrait-placeholder.svg",
      name: "Fajar Ananta",
      role: "Koordinator Operasional",
      description: "Mengatur koordinasi distribusi dan kebutuhan pelanggan.",
    },
  ],
  armada: [
    {
      initials: "RW",
      image: "/images/team/portrait-placeholder.svg",
      name: "Raka Wibowo",
      role: "Koordinator Armada",
      description: "Memantau kesiapan armada dan alur pengiriman.",
    },
  ],
  kemitraan: [
    {
      initials: "SN",
      image: "/images/team/portrait-placeholder.svg",
      name: "Sinta Nuraini",
      role: "Koordinator Kemitraan",
      description: "Menjaga komunikasi dan layanan bersama mitra.",
    },
  ],
} satisfies Record<string, readonly MockPerson[]>

function LeadershipProfile({
  person,
  isFallback,
  kind,
}: {
  person: MockPerson
  isFallback: boolean
  kind: "commissioner" | "director"
}) {
  const isCommissioner = kind === "commissioner"
  const biography = isCommissioner
    ? [
        `Dalam perannya sebagai Komisaris, ${person.name} memberikan pengawasan terhadap arah strategis dan tata kelola perusahaan. Pengalaman dan pandangannya membantu perusahaan menjaga keseimbangan antara kebutuhan operasional sehari-hari dan tujuan pertumbuhan jangka panjang.`,
        "Peran tersebut mencakup perhatian terhadap kualitas pengambilan keputusan, penerapan prinsip kehati-hatian, serta kepatuhan terhadap kebijakan dan ketentuan yang berlaku. Setiap masukan diberikan untuk membantu perusahaan melihat tantangan dari berbagai sudut pandang dan menentukan prioritas secara lebih terukur.",
        `${person.name} mendorong komunikasi yang terbuka antara unsur pimpinan dan tim operasional. Pendekatan ini mendukung budaya kerja yang saling menghargai, disiplin dalam menjalankan tanggung jawab, dan konsisten dalam memberikan layanan kepada pelanggan serta mitra usaha.`,
        "Perhatian terhadap keberlanjutan usaha juga menjadi bagian penting dari tanggung jawab tersebut. Perusahaan diarahkan untuk terus memperkuat keandalan layanan, meningkatkan efisiensi, dan membangun hubungan jangka panjang dengan para pemangku kepentingan secara transparan dan profesional.",
        "Dengan prinsip kerja yang berorientasi pada integritas, akuntabilitas, dan perbaikan berkelanjutan, peran Komisaris menjadi bagian penting dalam menjaga agar setiap langkah perusahaan memiliki dasar yang kuat dan memberikan nilai bagi perkembangan PT. Anigos Jaya Perkasa.",
      ]
    : [
        `Dalam perannya sebagai ${person.role}, ${person.name} memimpin pelaksanaan strategi dan pengelolaan perusahaan sesuai bidang tanggung jawabnya.`,
        `${person.name} mengoordinasikan prioritas kerja, sumber daya, dan kolaborasi antarbagian untuk mendukung kegiatan perusahaan yang efektif serta layanan yang andal.`,
        "Pengambilan keputusan dilakukan dengan memperhatikan tata kelola, kepatuhan terhadap ketentuan yang berlaku, dan kebutuhan pelanggan serta mitra usaha.",
        "Direksi juga mendorong evaluasi kinerja dan perbaikan berkelanjutan agar perusahaan dapat menjaga kualitas operasional sekaligus mengembangkan usaha secara bertanggung jawab.",
        "Melalui kepemimpinan yang profesional dan akuntabel, Direksi berperan memastikan arah perusahaan terlaksana dengan konsisten untuk mendukung perkembangan PT. Anigos Jaya Perkasa.",
      ]

  return (
    <article className="max-w-5xl">
      <header className="max-w-3xl border-b border-border pb-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
          Profil Biografi
        </p>
      </header>

      <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-x-14 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-x-16">
        <figure>
          <div className="aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={person.image}
              alt={`Foto ${person.name}`}
              width={576}
              height={768}
              className="size-full object-cover object-center"
            />
          </div>
          <figcaption className="mt-3 text-xs leading-5 text-muted-foreground">
            {isFallback
              ? "Foto profil akan diperbarui setelah data resmi tersedia."
              : isCommissioner
                ? "Profil resmi Dewan Komisaris PT. Anigos Jaya Perkasa."
                : "Profil resmi Direksi PT. Anigos Jaya Perkasa."}
          </figcaption>
        </figure>

        <div className="flex max-w-2xl flex-col justify-start">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {person.name}
          </h2>
          <p className="mt-3 text-base text-primary">{person.role}</p>
          <blockquote className="mt-10 border-l-2 border-primary/40 pl-5 text-xl leading-9 font-medium tracking-tight text-foreground sm:text-2xl sm:leading-10">
            “{person.description}”
          </blockquote>
          <p className="mt-3 pl-5 text-xs text-muted-foreground">
            Kutipan profil
          </p>
        </div>

        <div className="max-w-none md:col-span-2">
          <div className="space-y-5 [text-align:justify] text-base leading-8 text-muted-foreground">
            {biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 border-t border-border pt-5">
            <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              {isCommissioner ? "Mandat" : "Tanggung Jawab"}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground">
              {isCommissioner
                ? "Tata kelola, pengawasan, dan akuntabilitas perusahaan"
                : "Kepemimpinan, pengelolaan, dan pelaksanaan strategi perusahaan"}
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <LeadershipGallery
            personName={person.name}
            personRole={person.role}
            profileImage={person.image}
            gallery={person.gallery}
          />
        </div>
      </div>
    </article>
  )
}

const teamCategories: TeamCategory[] = [
  "komisaris",
  "direksi",
  "operasional",
  "armada",
  "kemitraan",
]

export const revalidate = 60

const toMockPerson = (person: TeamMember): MockPerson => person

export default async function StrukturPerusahaanPage() {
  const [sanityPeople, sanityDivisions] = await Promise.all([
    getSanityTeam(),
    getSanityTeamDivisions(),
  ])

  const hasSanityPeople = teamCategories.some(
    (category) => sanityPeople[category].length > 0
  )
  const people = hasSanityPeople
    ? sanityPeople
    : (Object.fromEntries(
        teamCategories.map((category) => [category, mockPeople[category]])
      ) as typeof mockPeople)
  const isFallback = !hasSanityPeople
  const divisionOptions =
    sanityDivisions.length > 0
      ? sanityDivisions.map((group) => ({
          ...group,
          description:
            "Daftar anggota dari divisi ini sesuai data yang dikelola di Sanity.",
        }))
      : [
          {
            name: "operasional",
            description:
              "Kantor pusat di Bekasi dan titik jaringan di Palembang, Medan, Kalimantan, serta Sulawesi.",
            members: people.operasional,
          },
          {
            name: "armada",
            description:
              "Fungsi armada dan logistik mendukung distribusi produk energi ke berbagai wilayah operasional.",
            members: people.armada,
          },
          {
            name: "kemitraan",
            description:
              "Kemitraan dan layanan menjadi bagian dari pengelolaan hubungan dengan pelanggan serta mitra operasional.",
            members: people.kemitraan,
          },
        ]

  return (
    <main>
      <TranslatedPageHero
        eyebrowKey="companyStructureEyebrow"
        titleKey="companyStructureTitle"
        descriptionKey="companyStructureDescription"
        image="/images/page-hero/tentang-kami.webp"
        pageKey="struktur-perusahaan"
        breadcrumbKey="about"
        breadcrumbHref="/tentang-kami/profil-perusahaan"
      />

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StructureSidebar>
            <StructureTabsContent value="komisaris">
              <LeadershipProfile
                person={toMockPerson(
                  people.komisaris[0] ?? mockPeople.komisaris[0]
                )}
                isFallback={isFallback}
                kind="commissioner"
              />
            </StructureTabsContent>
            <StructureTabsContent value="direksi">
              {people.direksi.length > 0 ? (
                <Tabs
                  defaultValue="director-0"
                  orientation="horizontal"
                  className="gap-8"
                >
                  <TabsList
                    variant="line"
                    className="w-full flex-row flex-nowrap justify-start overflow-x-auto rounded-none border-b border-border p-0"
                  >
                    {people.direksi.map((person, index) => (
                      <TabsTrigger
                        key={`${person.name}-${index}`}
                        value={`director-${index}`}
                        className="h-auto w-auto min-w-max flex-none shrink-0 rounded-none px-4 py-3 text-left"
                      >
                        {person.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {people.direksi.map((person, index) => (
                    <TabsContent
                      key={`${person.name}-${index}`}
                      value={`director-${index}`}
                    >
                      <LeadershipProfile
                        person={toMockPerson(person)}
                        isFallback={isFallback}
                        kind="director"
                      />
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <p className="text-sm leading-6 text-muted-foreground">
                  Belum ada profil Direksi yang dipublikasikan.
                </p>
              )}
            </StructureTabsContent>
            <StructureTabsContent value="tim-divisi">
              <Card>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    Tim dan Divisi
                  </Badge>
                  <CardTitle className="mt-4 text-2xl">
                    Fungsi kerja yang mendukung layanan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <Text variant="body-muted">
                    Belum tersedia bagan organisasi, daftar departemen, atau
                    jumlah karyawan yang dapat digunakan sebagai struktur
                    publik.
                  </Text>
                  <TeamDivisionSelector
                    divisions={divisionOptions}
                    isFallback={isFallback}
                  />
                </CardContent>
              </Card>
            </StructureTabsContent>
          </StructureSidebar>
        </div>
      </section>

      <section className="bg-background px-6 py-24 text-foreground lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-border text-foreground">
              Struktur dan legalitas
            </Badge>
            <Heading level={2} className="mt-5">
              Kenali dasar hukum dan jaringan operasional kami.
            </Heading>
            <p className="mt-5 leading-7 text-muted-foreground">
              Informasi legalitas dan jangkauan yang tersedia dapat menjadi
              referensi awal mengenai fondasi operasional perusahaan.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tentang-kami/legalitas"
              className={buttonVariants({
                className:
                  "bg-base-color text-base-color-foreground hover:bg-base-color/90",
              })}
            >
              Lihat Legalitas
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              href="/jangkauan"
              className={buttonVariants({
                variant: "outline",
                className:
                  "border-border text-foreground hover:bg-base-color/10 hover:text-base-color",
              })}
            >
              Lihat Jangkauan
            </Link>
          </div>
        </div>
        <Separator className="mx-auto mt-12 max-w-7xl bg-border" />
      </section>
    </main>
  )
}
