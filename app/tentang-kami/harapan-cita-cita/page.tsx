import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Handshake, ShieldCheck, Target, Timer } from "lucide-react"

import { PageHero } from "@/components/sections"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const commitments = [
  {
    title: "Hubungan jangka panjang",
    description:
      "Menjaga hubungan baik dengan rekan usaha dan konsumen sebagai fondasi kerja sama jangka panjang.",
    icon: Handshake,
  },
  {
    title: "Tepat waktu dan aman",
    description:
      "Mengutamakan ketepatan waktu dan keselamatan kerja di setiap titik distribusi.",
    icon: Timer,
  },
  {
    title: "Transparan dan profesional",
    description:
      "Menjunjung transparansi dan profesionalisme tanpa kompromi pada kualitas.",
    icon: ShieldCheck,
  },
  {
    title: "Terbuka pada kemitraan",
    description:
      "Membuka peluang kemitraan, termasuk dengan Pemerintah Republik Indonesia, demi iklim bisnis yang sehat.",
    icon: Target,
  },
]

export default function HarapanCitaCitaPage() {
  return (
    <>
      <PageHero
        eyebrow="Tentang Kami"
        title="Harapan & Cita-Cita Perusahaan"
        description="Distribusi Hari Ini, Kontribusi untuk Negeri"
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[
          { label: "Tentang Kami", href: "/tentang-kami/profil-perusahaan" },
        ]}
      />

      <main>
        <section className="border-b border-border bg-background py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8">
            <div className="max-w-2xl">
              <SectionHeading
                eyebrow="Distribusi Hari Ini, Kontribusi untuk Negeri"
                title="Energi yang bergerak, harapan yang tumbuh."
                description="Mendistribusikan Bahan Bakar Minyak adalah bagian dari perjalanan kami untuk turut menggerakkan roda industri dan kehidupan masyarakat di seluruh penjuru Indonesia."
              />
              <div className="mt-8 space-y-5">
                <Text variant="body-muted">
                  Setiap tetes bahan bakar yang kami distribusikan kami
                  harapkan dapat menyalakan mesin-mesin industri, menghidupkan
                  roda ekonomi daerah, dan sampai tepat waktu ke tangan yang
                  membutuhkannya — dari Jawa, Sumatera, Kalimantan, hingga
                  Sulawesi.
                </Text>
                <Text variant="body-muted">
                  Kami juga berharap dapat terus dilindungi dan diberi
                  kelancaran dalam setiap langkah usaha, sehingga kepercayaan
                  yang diberikan oleh para mitra dan konsumen dapat kami jaga
                  dengan sebaik-baiknya.
                </Text>
              </div>
            </div>
            <div
              aria-label="Pattern visual harapan dan cita-cita Petro Anigos"
              className="relative isolate min-h-[22rem] overflow-hidden bg-muted/30 sm:min-h-[28rem] lg:min-h-[32rem]"
            >
              <Image
                src="/images/patterns/home-section-01/home-section-01-pattern.svg"
                alt="Pattern visual harapan dan cita-cita Petro Anigos"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain p-6 sm:p-10"
              />
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-muted/40 py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-8">
            <div>
              <SectionHeading
                eyebrow="Cita-Cita Perusahaan"
                title="Menjadi perusahaan nasional yang terpercaya."
              />
              <Text variant="lead" className="mt-6">
                Cita-cita kami sederhana namun besar maknanya: dikenal bukan
                hanya karena kemampuan teknis dan jangkauan distribusi, tetapi
                juga karena integritas, transparansi, dan komitmen kepada
                setiap pihak yang bekerja sama dengan kami.
              </Text>
              <Text variant="body-muted" className="mt-5">
                Kami ingin terus mengembangkan diri secara profesional, terbuka
                terhadap inovasi berkelanjutan, dan menjadi bagian dari
                ekosistem energi yang sehat.
              </Text>
            </div>
            <Card className="bg-foreground text-background lg:mt-8">
              <CardHeader>
                <CardTitle className="text-background">Standar yang kami perjuangkan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-8 text-background/75">
                  Pelayanan yang cepat, aman, dan tepat waktu menjadi standar,
                  bukan pengecualian.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="border-b border-border bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeading
              eyebrow="Komitmen Kami Mewujudkannya"
              title="Harapan dijalankan melalui hal-hal yang konsisten."
              description="Nilai yang kami pegang setiap hari menjadi cara kami menjaga kepercayaan dan mewujudkan cita-cita perusahaan."
            />
            <Separator className="my-10" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {commitments.map((commitment) => {
                const Icon = commitment.icon

                return (
                  <Card key={commitment.title} className="h-full">
                    <CardHeader>
                      <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-muted">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle>{commitment.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Text variant="small">{commitment.description}</Text>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-foreground py-24 text-background lg:py-32">
          <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <Heading level={2} className="text-background">
              Hari ini, dan seterusnya.
            </Heading>
            <Text variant="lead" className="mt-6 text-background/75">
              Kami percaya keberhasilan perusahaan distribusi energi tidak
              hanya diukur dari berapa liter yang terkirim, tetapi dari
              seberapa besar ia turut berkontribusi terhadap peningkatan taraf
              hidup dan kesejahteraan masyarakat, bangsa, dan negara.
            </Text>
            <Text variant="body-muted" className="mt-5 text-background/65">
              Itulah harapan yang terus kami jaga, dan cita-cita yang terus
              kami perjuangkan.
            </Text>
            <Link
              href="/tentang-kami/profil-perusahaan"
              className={buttonVariants({
                className: "mt-8 bg-background text-foreground hover:bg-background/90",
              })}
            >
              Kenali Perusahaan Kami
              <ArrowRight data-icon="inline-end" />
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
