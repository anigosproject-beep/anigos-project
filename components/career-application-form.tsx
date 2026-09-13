"use client"

import { useRef, useState } from "react"
import { FileText, Paperclip, Send, X } from "lucide-react"

import type { CareerOpening } from "@/lib/careers-data"
import { Attachment, AttachmentAction, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from "@/components/ui/attachment"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const maxFileSize = 5 * 1024 * 1024
const acceptedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

export function CareerApplicationForm({
  openings,
  selectedOpening,
}: {
  openings: CareerOpening[]
  selectedOpening?: string
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  function selectFiles(nextFiles: FileList | null) {
    if (!nextFiles?.length) return

    const validFiles: File[] = []
    for (const nextFile of Array.from(nextFiles)) {
      if (!acceptedTypes.includes(nextFile.type)) {
        setError(`${nextFile.name}: CV harus berupa PDF, DOC, atau DOCX.`)
        return
      }
      if (nextFile.size > maxFileSize) {
        setError(`${nextFile.name}: ukuran file maksimal 5 MB.`)
        return
      }
      if (!files.some((file) => file.name === nextFile.name && file.size === nextFile.size)) {
        validFiles.push(nextFile)
      }
    }

    setError("")
    setFiles((currentFiles) => [...currentFiles, ...validFiles])
  }

  function removeFile(fileToRemove: File) {
    setFiles((currentFiles) =>
      currentFiles.filter(
        (file) => file.name !== fileToRemove.name || file.size !== fileToRemove.size
      )
    )
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (files.length === 0) {
      setError("Silakan lampirkan setidaknya satu file CV terlebih dahulu.")
      return
    }
    setError("")
    setSubmitted(true)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge variant="secondary">Form lamaran</Badge>
            <CardTitle className="mt-4 text-2xl">Kirim profilmu</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">CV maksimal 5 MB</span>
        </div>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h2 className="font-semibold">Data siap ditinjau</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Terima kasih. Form dan CV sudah tervalidasi di browser. Hubungkan
              handler pengiriman ke CMS atau email rekrutmen sebelum digunakan
              di produksi.
            </p>
            <Button type="button" variant="outline" className="mt-5" onClick={() => setSubmitted(false)}>
              Kirim lamaran lain
            </Button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full-name">Nama lengkap</Label>
                <Input id="full-name" name="fullName" required placeholder="Nama lengkap" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="nama@email.com" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Nomor telepon</Label>
                <Input id="phone" name="phone" required placeholder="08..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Posisi yang diminati</Label>
                <select id="position" name="position" required defaultValue={openings.some((opening) => opening.slug === selectedOpening) ? selectedOpening : ""} className="h-9 w-full rounded-3xl border border-transparent bg-input/50 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30">
                  <option value="" disabled>Pilih posisi</option>
                  {openings.map((opening) => <option key={opening.slug} value={opening.slug}>{opening.title}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Pesan singkat</Label>
              <Textarea id="message" name="message" placeholder="Ceritakan pengalaman atau alasan kamu tertarik..." />
            </div>
            <div className="space-y-3">
              <Label htmlFor="cv">CV / dokumen pendukung</Label>
              <input ref={fileInputRef} id="cv" name="cv" type="file" multiple accept=".pdf,.doc,.docx" className="sr-only" onChange={(event) => selectFiles(event.target.files)} />
              <div className="space-y-3">
                {files.map((file) => (
                  <Attachment key={`${file.name}-${file.size}`} className="w-full" state="done">
                    <AttachmentMedia><FileText /></AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>{file.name}</AttachmentTitle>
                      <AttachmentDescription>{(file.size / 1024 / 1024).toFixed(2)} MB · File tervalidasi</AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentAction type="button" aria-label={`Hapus ${file.name}`} onClick={() => removeFile(file)}><X /></AttachmentAction>
                  </Attachment>
                ))}
                <button type="button" onClick={() => fileInputRef.current?.click()} className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/30">
                  <Paperclip className="size-5 text-primary" />
                  <span className="mt-3 text-sm font-medium">{files.length ? "Tambah file" : "Pilih file"}</span>
                  <span className="mt-1 text-xs text-muted-foreground">PDF, DOC, atau DOCX · maksimal 5 MB per file</span>
                </button>
              </div>
              {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              Kirim lamaran <Send data-icon="inline-end" />
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
