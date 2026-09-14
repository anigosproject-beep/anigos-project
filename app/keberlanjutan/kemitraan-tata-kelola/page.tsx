"use client"

import { FileCheck2, Handshake, Scale } from "lucide-react"

import { CorporateTopicPage } from "@/components/sections/corporate-topic-page"

export default function KemitraanTataKelolaPage() {
  return (
    <CorporateTopicPage
      eyebrow="partnershipGovernanceEyebrow"
      title="partnershipGovernanceTitle"
      description="partnershipGovernanceDescription"
      breadcrumbs={[
        { label: "sustainability", href: "/keberlanjutan" },
        { label: "governance", href: "/keberlanjutan/kemitraan-tata-kelola" },
      ]}
      introEyebrow="governanceIntroEyebrow"
      introTitle="governanceIntroTitle"
      introDescription="governanceIntroDescription"
      topics={[
        { title: "goodRelationships", description: "goodRelationshipsDescription", icon: Handshake },
        { title: "compliance", description: "complianceDescription", icon: FileCheck2 },
        { title: "integrity", description: "integrityDescription", icon: Scale },
      ]}
      note="governanceNote"
      cta={{ label: "viewPartnerships", href: "/tentang-kami/kemitraan" }}
    />
  )
}
