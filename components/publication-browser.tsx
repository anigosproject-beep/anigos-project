"use client"

import {useMemo, useState} from "react"
import {Search} from "lucide-react"

import {PublicationCard} from "@/components/publication-card"
import {Heading, Text} from "@/components/typography"
import {Input} from "@/components/ui/input"
import {useLocale} from "@/components/locale-provider"
import {translate} from "@/lib/i18n"
import type {Publication} from "@/lib/sanity-publications"

export function PublicationBrowser({publications}: {publications: Publication[]}) {
  const {locale} = useLocale()
  const [category, setCategory] = useState("__all__")
  const [query, setQuery] = useState("")
  const categories = ["__all__", ...Array.from(new Set(publications.map((item) => item.category)))]
  const filteredPublications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return publications.filter((publication) => {
      const matchesCategory = category === "__all__" || publication.category === category
      const matchesQuery =
        !normalizedQuery ||
        `${publication.title} ${publication.description}`.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [category, publications, query])

  return (
    <>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-primary">{translate(locale, "publicationCatalog")}</p>
          <Heading level={2} className="mt-3">{translate(locale, "publicationCatalogTitle")}</Heading>
        </div>
        <div className="relative w-full lg:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={translate(locale, "publicationSearch")} className="pl-9" aria-label={translate(locale, "publicationSearch")} />
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${category === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/50"}`}>
            {item === "__all__" ? translate(locale, "publicationAllCategories") : item}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-4">
        {filteredPublications.map((publication) => <PublicationCard key={publication.slug} {...publication} />)}
      </div>
      {filteredPublications.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-border bg-background p-10 text-center">
          <p className="font-medium">{translate(locale, "publicationEmpty")}</p>
          <Text variant="small" className="mt-2">{translate(locale, "publicationSearchHint")}</Text>
        </div>
      ) : null}
    </>
  )
}
