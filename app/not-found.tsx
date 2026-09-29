"use client"

import Link from "next/link"
import { useEffect } from "react"

import { useHeaderAppearance } from "@/components/header-appearance-provider"

export default function NotFound() {
  const { setForceSolid } = useHeaderAppearance()

  useEffect(() => {
    setForceSolid(true)

    return () => {
      setForceSolid(false)
    }
  }, [setForceSolid])

  return (
    <section className="flex min-h-[calc(100svh-5rem)] items-center justify-center px-6 py-32">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-5 text-muted-foreground">
          Halaman yang Anda cari mungkin sudah dipindahkan atau tidak tersedia.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Kembali ke beranda
        </Link>
      </div>
    </section>
  )
}
