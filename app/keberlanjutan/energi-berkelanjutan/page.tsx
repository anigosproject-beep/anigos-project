"use client"

import { Droplets, Leaf, Scale } from "lucide-react"

import { CorporateTopicPage } from "@/components/sections/corporate-topic-page"

export default function EnergiBerkelanjutanPage() {
  return (
    <CorporateTopicPage
      eyebrow="sustainableEnergyEyebrow"
      title="sustainableEnergyTitle"
      description="sustainableEnergyDescription"
      breadcrumbs={[
        { label: "sustainability", href: "/keberlanjutan" },
        { label: "sustainableEnergy", href: "/keberlanjutan/energi-berkelanjutan" },
      ]}
      introEyebrow="b40IntroEyebrow"
      introTitle="b40IntroTitle"
      introDescription="b40IntroDescription"
      topics={[
        { title: "biodiesel40Title", description: "biodiesel40Description", icon: Leaf },
        { title: "diesel60Title", description: "diesel60Description", icon: Droplets },
        { title: "specificationTitle", description: "specificationDescription", icon: Scale },
      ]}
      cta={{ label: "productsOverview", href: "/produk/kenali-produk" }}
    />
  )
}
