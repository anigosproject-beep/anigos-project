"use client"

import { Clock3, Route, ShieldCheck } from "lucide-react"

import { CorporateTopicPage } from "@/components/sections/corporate-topic-page"

export default function KeselamatanOperasionalPage() {
  return (
    <CorporateTopicPage
      eyebrow="operationalSafetyEyebrow"
      title="operationalSafetyPageTitle"
      description="operationalSafetyPageDescription"
      breadcrumbs={[
        { label: "sustainability", href: "/keberlanjutan" },
        { label: "safety", href: "/keberlanjutan/keselamatan-operasional" },
      ]}
      introEyebrow="operationalPriorityEyebrow"
      introTitle="operationalPriorityTitle"
      introDescription="operationalPriorityDescription"
      topics={[
        { title: "accidentFree", description: "accidentFreeDescription", icon: ShieldCheck },
        { title: "punctuality", description: "punctualityDescription", icon: Clock3 },
        { title: "routeCoordination", description: "routeCoordinationDescription", icon: Route },
      ]}
      note="safetyNote"
      cta={{ label: "viewCoverage", href: "/jangkauan" }}
    />
  )
}
