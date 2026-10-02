import Link from "@/components/site-link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { TeamBiography } from "@/components/team-biography"
import { StructureEmptyMessage } from "@/components/structure-empty-message"
import { TranslatedPageHero } from "@/components/sections/translated-page-hero"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { buttonVariants } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TabsContent as StructureTabsContent } from "@/components/structure-sidebar"
import { StructureSidebar } from "@/components/structure-sidebar"
import { TeamDivisionSelector } from "@/components/team-division-selector"
import { LeadershipGallery } from "@/components/commissioner-gallery"
import { getSanityTeam, getSanityTeamDivisions, type TeamMember } from "@/lib/sanity-team"

function LeadershipProfile({ person }: { person: TeamMember }) {
  return (
    <article className="max-w-5xl">
      <header className="max-w-3xl border-b border-border pb-8">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
          Profil Biografi
        </p>
      </header>

      <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-x-14 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-x-16">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
            {person.image ? (
              <Image
                src={person.image}
                alt={`Foto ${person.name}`}
                fill
                sizes="(min-width: 1024px) 18rem, 15rem"
                className="object-cover object-center"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-4xl font-semibold text-muted-foreground">
                {person.initials}
              </div>
            )}
          </div>
        </figure>

        <div className="flex max-w-2xl flex-col justify-start">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {person.name}
          </h2>
          <p className="mt-3 text-base text-primary">{person.role}</p>
          {person.quote ? (
            <blockquote className="mt-10 border-l-2 border-primary/40 pl-5 text-xl leading-9 font-medium tracking-tight text-foreground sm:text-2xl sm:leading-10">
              “{person.quote}”
            </blockquote>
          ) : null}
        </div>

        {person.biography?.length ? (
          <div className="max-w-none md:col-span-2">
            <TeamBiography blocks={person.biography} />
          </div>
        ) : null}

        {person.image || person.gallery?.length ? (
          <div className="md:col-span-2">
            <LeadershipGallery
              personName={person.name}
              personRole={person.role}
              profileImage={person.image}
              gallery={person.gallery}
            />
          </div>
        ) : null}
      </div>
    </article>
  )
}

function LeadershipTabs({
  people,
  kind,
  emptyMessage,
}: {
  people: TeamMember[]
  kind: "commissioner" | "director"
  emptyMessage: "structureNoCommissioners" | "structureNoDirectors"
}) {
  if (!people.length) {
    return <StructureEmptyMessage messageKey={emptyMessage} />
  }

  return (
    <Tabs
      defaultValue={`${kind}-0`}
      orientation="horizontal"
      className="gap-8"
    >
      <TabsList
        variant="line"
        className="w-full flex-row flex-nowrap justify-start overflow-x-auto rounded-none border-b border-border p-0"
      >
        {people.map((person, index) => (
          <TabsTrigger
            key={`${person.name}-${index}`}
            value={`${kind}-${index}`}
            className="h-auto w-auto min-w-max flex-none shrink-0 rounded-none px-4 py-3 text-left"
          >
            {person.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {people.map((person, index) => (
        <TabsContent
          key={`${person.name}-${index}`}
          value={`${kind}-${index}`}
        >
          <LeadershipProfile person={person} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export const revalidate = 60

export default async function StrukturPerusahaanPage() {
  const [people, divisions] = await Promise.all([
    getSanityTeam(),
    getSanityTeamDivisions(),
  ])

  return (
    <main>
      <TranslatedPageHero
        eyebrowKey="companyStructureEyebrow"
        titleKey="companyStructureTitle"
        descriptionKey="companyStructureDescription"
        image="/images/page-hero/tentang-kami.webp"
        pageKey="struktur-perusahaan"
        breadcrumbKey="about"
        breadcrumbHref="/tentang-kami/profil-perusahaan"
      />

      <section className="border-b border-border bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StructureSidebar>
            <StructureTabsContent value="komisaris">
              <LeadershipTabs
                people={people.komisaris}
                kind="commissioner"
                emptyMessage="structureNoCommissioners"
              />
            </StructureTabsContent>
            <StructureTabsContent value="direksi">
              <LeadershipTabs
                people={people.direksi}
                kind="director"
                emptyMessage="structureNoDirectors"
              />
            </StructureTabsContent>
            <StructureTabsContent value="tim-divisi">
              <Card>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    Tim dan Divisi
                  </Badge>
                  <CardTitle className="mt-4 text-2xl">
                    Fungsi kerja yang mendukung layanan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {divisions.length ? (
                    <TeamDivisionSelector divisions={divisions} />
                  ) : (
                    <StructureEmptyMessage messageKey="structureNoDivisions" />
                  )}
                </CardContent>
              </Card>
            </StructureTabsContent>
          </StructureSidebar>
        </div>
      </section>

      <section className="bg-background px-6 py-24 text-foreground lg:px-8 lg:py-32">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Badge variant="outline" className="border-border text-foreground">
              Struktur dan legalitas
            </Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">
              Kenali dasar hukum dan jaringan operasional kami.
            </h2>
            <p className="mt-5 leading-7 text-muted-foreground">
              Informasi legalitas dan jangkauan yang tersedia dapat menjadi
              referensi awal mengenai fondasi operasional perusahaan.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tentang-kami/legalitas"
              className={buttonVariants({
                className:
                  "bg-base-color text-base-color-foreground hover:bg-base-color/90",
              })}
            >
              Lihat Legalitas
              <ArrowRight data-icon="inline-end" />
            </Link>
            <Link
              href="/jangkauan"
              className={buttonVariants({
                variant: "outline",
                className:
                  "border-border text-foreground hover:bg-base-color/10 hover:text-base-color",
              })}
            >
              Lihat Jangkauan
            </Link>
          </div>
        </div>
        <Separator className="mx-auto mt-12 max-w-7xl bg-border" />
      </section>
    </main>
  )
}
