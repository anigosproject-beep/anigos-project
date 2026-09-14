"use client"

import { Handshake, Leaf, ShieldCheck } from "lucide-react"

import { CorporateTopicPage } from "@/components/sections/corporate-topic-page"

export default function KeberlanjutanPage() {
  return (
    <CorporateTopicPage
      eyebrow="sustainabilityPageEyebrow"
      title="sustainabilityPageTitle"
      description="sustainabilityPageDescription"
      breadcrumbs={[{ label: "sustainability", href: "/keberlanjutan" }]}
      introEyebrow="ourApproach"
      introTitle="sustainabilityIntroTitle"
      introDescription="sustainabilityIntroDescription"
      topics={[
        {
          title: "cleanerEnergy",
          description: "cleanerEnergyDescription",
          icon: Leaf,
        },
        {
          title: "operationalSafety",
          description: "operationalSafetyDescription",
          icon: ShieldCheck,
        },
        {
          title: "socialContribution",
          description: "socialContributionDescription",
          icon: Handshake,
        },
      ]}
      note="transparencyNote"
      cta={{ label: "productsOverview", href: "/produk/kenali-produk" }}
    />
  )
}
