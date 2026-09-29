import {CsrPage} from "@/components/sections/csr-page"
import {getSanityCsrPage} from "@/lib/sanity-csr"
import type {Metadata} from "next"

export const metadata: Metadata = {
  title: "CSR",
  description:
    "Dokumentasi kegiatan tanggung jawab sosial Petro Anigos dari tahun ke tahun.",
}

export default async function CsrAnnualActivitiesPage() {
  const content = await getSanityCsrPage()

  return <CsrPage content={content} />
}
