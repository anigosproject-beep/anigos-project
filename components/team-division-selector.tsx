"use client"

import Image from "next/image"
import { CircleAlert } from "lucide-react"
import { useState } from "react"
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { type TeamDivisionGroup, type TeamMember } from "@/lib/sanity-team"

type DivisionOption = TeamDivisionGroup & {
  description: string
}

type TeamDivisionSelectorProps = {
  divisions: DivisionOption[]
  isFallback: boolean
}

function PersonCards({
  people,
  isFallback,
}: {
  people: readonly TeamMember[]
  isFallback: boolean
}) {
  const { locale } = useLocale()
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {people.map((person) => (
        <div
          key={person.name}
          className="rounded-2xl border border-border bg-background p-5"
        >
          <div className="flex gap-4">
            <Image
              src={person.image}
              alt={`Foto ${person.name}`}
              width={96}
              height={120}
              className="h-24 w-20 shrink-0 rounded-xl object-cover"
            />
            <div>
              <p className="font-medium">{person.name}</p>
              <p className="mt-1 text-sm text-primary">{person.role}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {translate(locale, "profileIllustration")}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {person.description}
          </p>
          <Badge variant="outline" className="mt-4">
            <span className="inline-flex items-center gap-1.5">
              <CircleAlert className="size-3" />
              {translate(locale, isFallback ? "dataFallback" : "dataCms")}
            </span>
          </Badge>
        </div>
      ))}
    </div>
  )
}

export function TeamDivisionSelector({
  divisions,
  isFallback,
}: TeamDivisionSelectorProps) {
  const { locale } = useLocale()
  const [selectedDivision, setSelectedDivision] = useState(
    divisions[0]?.name ?? "",
  )
  const activeDivision =
    divisions.find((division) => division.name === selectedDivision) ??
    divisions[0]

  if (!activeDivision) return null

  return (
    <div className="mt-2 space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label
          htmlFor="team-division-select"
          className="text-sm font-medium"
        >
          {translate(locale, "chooseDivision")}
        </label>
        <Select
          value={selectedDivision}
          onValueChange={(value) => {
            if (value) setSelectedDivision(value)
          }}
        >
          <SelectTrigger
            id="team-division-select"
            className="h-10 w-full rounded-xl border-border/80 bg-background px-3.5 shadow-none sm:w-[min(100%,20rem)]"
            aria-label={translate(locale, "chooseDivision")}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            align="start"
            sideOffset={6}
            className="rounded-2xl border border-border/80 bg-popover p-1.5 shadow-xl"
          >
            {divisions.map((division) => (
              <SelectItem
                key={division.name}
                value={division.name}
                className="rounded-xl px-3 py-2.5"
              >
                {division.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-2xl border border-border p-5">
        <p className="font-medium">{activeDivision.name}</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {activeDivision.description}
        </p>
        <div className="mt-6">
          <PersonCards
            people={activeDivision.members}
            isFallback={isFallback}
          />
        </div>
      </div>
    </div>
  )
}
