"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const items = [
  ["komisaris", "Komisaris"],
  ["direksi", "Direksi"],
  ["tim-divisi", "Tim dan Divisi"],
] as const
const structureParam = "struktur"

function isStructureValue(
  value: string | null
): value is (typeof items)[number][0] {
  return items.some(([itemValue]) => itemValue === value)
}

export function StructureSidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const selectedFromUrl = searchParams.get(structureParam)
  const value = isStructureValue(selectedFromUrl)
    ? selectedFromUrl
    : "komisaris"
  const listRef = React.useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = React.useState({ top: 0, height: 0 })

  const measureIndicator = React.useCallback(() => {
    const list = listRef.current
    const active =
      list?.querySelector<HTMLElement>('[data-active=""]') ??
      list?.querySelector<HTMLElement>("[data-active]")
    if (!list || !active) return

    const listRect = list.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()
    setIndicator({
      top: activeRect.top - listRect.top,
      height: activeRect.height,
    })
  }, [])

  React.useLayoutEffect(() => {
    measureIndicator()
    const list = listRef.current
    if (!list) return

    const observer = new ResizeObserver(measureIndicator)
    observer.observe(list)
    return () => observer.disconnect()
  }, [measureIndicator, value])

  const handleValueChange = (nextValue: string) => {
    if (!isStructureValue(nextValue)) return

    const nextParams = new URLSearchParams(searchParams.toString())
    nextParams.set(structureParam, nextValue)
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false })
    requestAnimationFrame(() => {
      measureIndicator()
    })
  }

  return (
    <Tabs
      value={value}
      onValueChange={handleValueChange}
      orientation="vertical"
      className="grid gap-12 lg:grid-cols-[20%_minmax(0,1fr)] lg:gap-16"
    >
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          Struktur Organisasi
        </p>
        <TabsList
          ref={listRef}
          className="relative mt-8 flex w-full flex-col items-stretch gap-1 rounded-none bg-transparent p-0"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 z-10 w-0.5 bg-primary transition-[transform,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              height: `${indicator.height}px`,
              transform: `translateY(${indicator.top}px)`,
            }}
          />
          {items.map(([itemValue, label]) => (
            <TabsTrigger
              key={itemValue}
              value={itemValue}
              className="h-auto w-full justify-start rounded-none border-0 border-l-2 border-transparent bg-transparent px-4 py-3 text-left text-sm font-medium text-muted-foreground !shadow-none transition-[color] hover:bg-transparent hover:text-foreground data-active:border-transparent data-active:bg-transparent data-active:text-foreground data-active:!shadow-none"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div>{children}</div>
    </Tabs>
  )
}

export { TabsContent }
