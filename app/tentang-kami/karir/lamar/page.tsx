import { careerOpenings } from "@/lib/careers-data"
import { CareerApplicationShell } from "@/components/career-application-shell"
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
      <CareerApplicationShell openings={careerOpenings} selectedOpening={posisi} />
    </main>
  )
}
