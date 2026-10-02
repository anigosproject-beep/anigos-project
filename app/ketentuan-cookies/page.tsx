"use client"

import Link from "@/components/site-link"

import { PageHero } from "@/components/sections"
import { SectionContainer, SectionShell } from "@/components/layout/section-shell"
import { Heading, SectionHeading, Text } from "@/components/typography"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"

const cookieTypes = [
  {
    title: "essentialCookies",
    description: "essentialCookiesDescription",
    status: "active",
  },
  {
    title: "preferenceCookies",
    description: "preferenceCookiesDescription",
    status: "limited",
  },
  {
    title: "analyticsAdvertisingCookies",
    description: "analyticsAdvertisingCookiesDescription",
    status: "inactive",
  },
]

export default function KetentuanCookiesPage() {
  const { locale } = useLocale()

  return (
    <main>
      <PageHero
        pageKey="ketentuan-cookies"
        eyebrow={translate(locale, "cookieTerms")}
        title={translate(locale, "cookieTermsTitle")}
        description={translate(locale, "cookieTermsDescription")}
        image="/images/page-hero/tentang-kami.webp"
        breadcrumbs={[{ label: translate(locale, "cookieTerms"), href: "/ketentuan-cookies" }]}
      />

      <SectionShell className="bg-background py-20 lg:py-28">
        <SectionContainer className="px-4 sm:px-6">
          <div className="max-w-3xl">
            <Badge variant="secondary">{translate(locale, "usageTransparency")}</Badge>
            <Heading level={2} className="mt-5">
              {translate(locale, "cookieContextTitle")}
            </Heading>
            <Text variant="lead" className="mt-5">
              {translate(locale, "cookieContextDescription")}
            </Text>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {cookieTypes.map((cookieType) => (
              <Card key={cookieType.title} className="h-full">
                <CardHeader>
                  <Badge variant={cookieType.status === "active" ? "secondary" : "outline"} className="w-fit">
                    {translate(locale, cookieType.status as TranslationKey)}
                  </Badge>
                  <CardTitle className="mt-4">{translate(locale, cookieType.title as TranslationKey)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">{translate(locale, cookieType.description as TranslationKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionContainer>
      </SectionShell>

      <SectionShell className="bg-muted/40 py-20 lg:py-28">
        <SectionContainer className="grid gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            eyebrow={translate(locale, "consentCookies")}
            title={translate(locale, "consentDurationTitle")}
            description={translate(locale, "consentDurationDescription")}
          />
          <div className="space-y-5 text-sm leading-7 text-muted-foreground">
            <p>
              {translate(locale, "necessaryChoiceDescription")}
            </p>
            <p>
              {translate(locale, "futureThirdPartyDescription")}
            </p>
            <p>
              {translate(locale, "clearCookieDescription")}
            </p>
          </div>
        </SectionContainer>
      </SectionShell>

      <SectionShell className="border-b-0 bg-background py-16 lg:py-20">
        <SectionContainer className="px-4 sm:px-6">
          <div className="rounded-4xl bg-base-color p-8 text-base-color-foreground sm:p-12">
            <p className="text-sm font-medium text-base-color-foreground/60">{translate(locale, "termsUpdate")}</p>
            <blockquote className="mt-5 max-w-4xl text-xl leading-relaxed font-medium tracking-tight sm:text-2xl">
              {translate(locale, "termsUpdateDescription")}
            </blockquote>
            <Link href="/kebijakan-data" className="mt-8 inline-block text-sm text-base-color-foreground/70 hover:text-base-color-foreground hover:underline">
              {translate(locale, "viewDataPolicy")}
            </Link>
          </div>
        </SectionContainer>
      </SectionShell>
    </main>
  )
}
