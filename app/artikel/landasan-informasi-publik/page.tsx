"use client"

import { BookOpenCheck, FileCheck2, Info, ShieldCheck } from "lucide-react"

import { CorporateTopicPage } from "@/components/sections/corporate-topic-page"

export default function LandasanInformasiPublikPage() {
  return (
    <CorporateTopicPage
      pageKey="landasan-informasi-publik"
      eyebrow="articlePublicInfoEyebrow"
      title="articlePublicInfoTitle"
      description="articlePublicInfoDescription"
      breadcrumbs={[
        { label: "articles", href: "/artikel" },
        {
          label: "publicInformation",
          href: "/artikel/landasan-informasi-publik",
        },
      ]}
      introEyebrow="publicInfoPrinciplesEyebrow"
      introTitle="publicInfoPrinciplesTitle"
      introDescription="publicInfoPrinciplesDescription"
      topics={[
        {
          title: "publicInfoSourceTitle",
          description: "publicInfoSourceDescription",
          icon: BookOpenCheck,
        },
        {
          title: "publicInfoLimitsTitle",
          description: "publicInfoLimitsDescription",
          icon: Info,
        },
        {
          title: "publicInfoLegalTitle",
          description: "publicInfoLegalDescription",
          icon: FileCheck2,
        },
        {
          title: "publicInfoResponsibleTitle",
          description: "publicInfoResponsibleDescription",
          icon: ShieldCheck,
        },
      ]}
      note="publicInfoNote"
      cta={{ label: "contactUs", href: "/produk/penawaran" }}
    />
  )
}
