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
import { useLocale } from "@/components/locale-provider"
import { translate } from "@/lib/i18n"

const maxFileSize = 5 * 1024 * 1024
const acceptedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]

export function CareerApplicationForm({
  openings,
  selectedOpening,
}: {
  openings: CareerOpening[]
  selectedOpening?: string
}) {
  const { locale } = useLocale()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function selectFiles(nextFiles: FileList | null) {
    if (!nextFiles?.length) return

    const validFiles: File[] = []
    for (const nextFile of Array.from(nextFiles)) {
      if (!acceptedTypes.includes(nextFile.type)) {
        setError(`${nextFile.name}: ${translate(locale, "cvFormatError")}`)
        return
      }
      if (nextFile.size > maxFileSize) {
        setError(`${nextFile.name}: ${translate(locale, "fileSizeError")}`)
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (files.length === 0) {
      setError(translate(locale, "attachCvError"))
      return
    }

    setError("")
    setSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      formData.delete("cv")
      files.forEach((file) => formData.append("files", file))

      const response = await fetch("/api/career-applications", {
        method: "POST",
        body: formData,
      })
      const payload = (await response.json()) as { error?: string }

      if (!response.ok) {
        throw new Error(payload.error ?? translate(locale, "applicationFailed"))
      }

      setSubmitted(true)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : translate(locale, "applicationFailed"))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge variant="secondary">{translate(locale, "applicationForm")}</Badge>
            <CardTitle className="mt-4 text-2xl">{translate(locale, "sendYourProfile")}</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">{translate(locale, "cvMaximum")}</span>
        </div>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
            <h2 className="font-semibold">{translate(locale, "dataReadyForReview")}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {translate(locale, "applicationThanks")}
            </p>
            <Button type="button" variant="outline" className="mt-5" onClick={() => setSubmitted(false)}>
              {translate(locale, "sendAnotherApplication")}
            </Button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full-name">{translate(locale, "fullName")}</Label>
                <Input id="full-name" name="fullName" required placeholder={translate(locale, "fullNamePlaceholder")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="nama@email.com" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">{translate(locale, "phoneNumber")}</Label>
                <Input id="phone" name="phone" required placeholder="08..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">{translate(locale, "positionInterested")}</Label>
                <select id="position" name="position" required defaultValue={openings.some((opening) => opening.slug === selectedOpening) ? selectedOpening : ""} className="h-9 w-full rounded-3xl border border-transparent bg-input/50 px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30">
                  <option value="" disabled>{translate(locale, "choosePosition")}</option>
                  {openings.map((opening) => <option key={opening.slug} value={opening.slug}>{opening.title}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{translate(locale, "shortMessage")}</Label>
              <Textarea id="message" name="message" placeholder={translate(locale, "shortMessagePlaceholder")} />
            </div>
            <div className="space-y-3">
              <Label htmlFor="cv">{translate(locale, "cvSupportingDocument")}</Label>
              <input ref={fileInputRef} id="cv" name="cv" type="file" multiple accept=".pdf,.doc,.docx" className="sr-only" onChange={(event) => selectFiles(event.target.files)} />
              <div className="space-y-3">
                {files.map((file) => (
                  <Attachment key={`${file.name}-${file.size}`} className="w-full" state="done">
                    <AttachmentMedia><FileText /></AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>{file.name}</AttachmentTitle>
                      <AttachmentDescription>{(file.size / 1024 / 1024).toFixed(2)} MB · {translate(locale, "validatedFile")}</AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentAction type="button" aria-label={`${translate(locale, "removeFile")} ${file.name}`} onClick={() => removeFile(file)}><X /></AttachmentAction>
                  </Attachment>
                ))}
                <button type="button" onClick={() => fileInputRef.current?.click()} className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-muted/30">
                  <Paperclip className="size-5 text-primary" />
                  <span className="mt-3 text-sm font-medium">{files.length ? translate(locale, "addFile") : translate(locale, "chooseFile")}</span>
                  <span className="mt-1 text-xs text-muted-foreground">{translate(locale, "supportedFileTypes")}</span>
                </button>
              </div>
              {error ? <p role="alert" className="text-sm text-destructive">{error}</p> : null}
            </div>
            <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? translate(locale, "sending") : translate(locale, "sendApplication")} <Send data-icon="inline-end" />
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
