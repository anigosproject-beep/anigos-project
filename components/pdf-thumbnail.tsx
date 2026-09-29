"use client"

import { useEffect, useRef, useState } from "react"
import { FileText } from "lucide-react"

type PdfThumbnailProps = {
  src: string
  title: string
}

export function PdfThumbnail({src, title}: PdfThumbnailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [containerSize, setContainerSize] = useState({width: 0, height: 0})
  const [failed, setFailed] = useState(false)

  const isAbortError = (error: unknown) =>
    error instanceof DOMException
      ? error.name === "AbortError"
      : error instanceof Error &&
        (error.name === "AbortError" ||
          error.message.toLowerCase().includes("signal is aborted"))

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateSize = () => {
      const {width, height} = container.getBoundingClientRect()
      setContainerSize({width, height})
    }

    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!containerSize.width || !containerSize.height) return

    let cancelled = false
    let cleanup: (() => Promise<void>) | undefined

    void import("pdfjs-dist/legacy/build/pdf.mjs")
      .then(async (pdfjs) => {
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/legacy/build/pdf.worker.mjs",
          import.meta.url,
        ).toString()
        const loadingTask = pdfjs.getDocument({url: src})
        const renderTaskRef: {
          current?: {cancel: () => void; promise: Promise<unknown>}
        } = {}

        cleanup = async () => {
          renderTaskRef.current?.cancel()
          await loadingTask.destroy()
        }

        if (cancelled) {
          await cleanup()
          return
        }

        const documentProxy = await loadingTask.promise
        const page = await documentProxy.getPage(1)
        if (cancelled || !canvasRef.current) return

        const canvas = canvasRef.current
        const unscaledViewport = page.getViewport({scale: 1})
        const scale = Math.min(
          containerSize.width / unscaledViewport.width,
          containerSize.height / unscaledViewport.height,
        )
        const viewport = page.getViewport({scale})
        const devicePixelRatio = window.devicePixelRatio || 1
        canvas.width = Math.floor(viewport.width * devicePixelRatio)
        canvas.height = Math.floor(viewport.height * devicePixelRatio)
        canvas.style.width = `${viewport.width}px`
        canvas.style.height = `${viewport.height}px`

        renderTaskRef.current = page.render({
          canvas,
          viewport,
          transform: [devicePixelRatio, 0, 0, devicePixelRatio, 0, 0],
        })
        await renderTaskRef.current.promise
      })
      .catch((error: unknown) => {
        if (!cancelled && !isAbortError(error)) setFailed(true)
      })

    return () => {
      cancelled = true
      void cleanup?.().catch((error: unknown) => {
        if (!isAbortError(error)) {
          console.error("Failed to clean up PDF thumbnail", error)
        }
      })
    }
  }, [containerSize, src])

  if (failed) {
    return (
      <div ref={containerRef} className="flex size-full items-center justify-center">
        <FileText className="size-8 text-muted-foreground/60" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
      <canvas
        ref={canvasRef}
        aria-label={`Halaman pertama ${title}`}
        className="block"
      />
    </div>
  )
}
