import { careerOpenings } from "@/lib/careers-data"
import { PageHero } from "@/components/sections"
import { CareerApplicationForm } from "@/components/career-application-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lamaran Karir",
  description: "Formulir lamaran karir Petro Anigos.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function LamaranKarirPage({
  searchParams,
}: {
  searchParams: Promise<{ posisi?: string }>
}) {
  const { posisi } = await searchParams

  return (
    <main>
      <PageHero
        eyebrow="Karir / Lamaran"
        title="Ceritakan langkah berikutnya."
        description="Lengkapi data singkat dan lampirkan CV terbaru. Tim kami akan meninjau profil yang masuk sesuai kebutuhan posisi."
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[
          { label: "Tentang Kami", href: "/tentang-kami/profil-perusahaan" },
          { label: "Karir", href: "/tentang-kami/karir" },
        ]}
      />
      <section className="bg-muted/40 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <CareerApplicationForm openings={careerOpenings} selectedOpening={posisi} />
        </div>
      </section>
    </main>
  )
}
