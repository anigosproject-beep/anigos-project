"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type FormEvent } from "react"
import {
  ArrowLeft,
  ArrowRight,
  CircleAlert,
  FileText,
  Paperclip,
  X,
} from "lucide-react"

import { PageHero } from "@/components/sections"
import { Heading, Text } from "@/components/typography"
import {
  Attachment,
  AttachmentAction,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { buttonVariants } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useLocale } from "@/components/locale-provider"
import { translate, type TranslationKey } from "@/lib/i18n"
import type { SiteSettings } from "@/lib/sanity-site-settings"

const fallbackEmail = "anigospetro@gmail.com"
const formControlClassName = "border-border bg-transparent"
const maxFiles = 5
const maxFileSize = 5 * 1024 * 1024
const acceptedExtensions = new Set([
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "png",
  "jpg",
  "jpeg",
])
const positionOptions = [
  "contactPositionOwner",
  "contactPositionDirector",
  "contactPositionProcurement",
  "contactPositionOperations",
  "contactPositionFinance",
  "contactPositionEngineering",
  "contactPositionHse",
] as const
const otherPosition = "other"
type PositionOption = (typeof positionOptions)[number]
type PositionChoice = PositionOption | typeof otherPosition
const isPositionChoice = (value: string): value is PositionChoice =>
  value === otherPosition ||
  positionOptions.some((option) => option === value)

type EmailForm = {
  name: string
  email: string
  phone: string
  company: string
  position: string
  requirement: string
  message: string
}

type FormField = keyof EmailForm
type FormErrors = Partial<Record<FormField, string>>

const initialForm: EmailForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  position: "",
  requirement: "",
  message: "",
}

const formFieldLabelKeys: Record<FormField, TranslationKey> = {
  name: "contactFormName",
  email: "contactFormReplyEmail",
  phone: "contactFormPhone",
  company: "contactFormCompany",
  position: "contactFormPosition",
  requirement: "contactFormRequirement",
  message: "contactFormMessage",
} as const

export default function ContactEmailPage() {
  const { locale } = useLocale()
  const formRef = useRef<HTMLFormElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [recipient, setRecipient] = useState(fallbackEmail)
  const [form, setForm] = useState(initialForm)
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState("")
  const [step, setStep] = useState<1 | 2>(1)
  const [validationErrors, setValidationErrors] = useState<FormErrors>({})
  const [positionChoice, setPositionChoice] = useState<PositionChoice | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    void fetch("/api/site-settings", {
      signal: controller.signal,
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Site settings request failed: ${response.status}`)
        }
        return response.json() as Promise<SiteSettings | null>
      })
      .then((settings) => {
        if (settings?.email) setRecipient(settings.email)
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
        console.error("Failed to load company email address", error)
      })

    return () => controller.abort()
  }, [])

  const validateField = (key: FormField, value: string) => {
    if (!value.trim()) return translate(locale, "contactFormRequiredError")
    if (
      key === "email" &&
      !/^[^\s@]+@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9-]{2,}$/.test(
        value.trim()
      )
    ) {
      return translate(locale, "contactFormEmailInvalid")
    }
    if (key === "phone") {
      const digits = value.replace(/\D/g, "")
      if (!/^\+?[\d\s().-]+$/.test(value) || digits.length < 8 || digits.length > 15) {
        return translate(locale, "contactFormPhoneDigitsError")
      }
    }
    return undefined
  }

  const update = (key: FormField, value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
    if (validationErrors[key]) {
      const error = validateField(key, value)
      setValidationErrors((current) => {
        const next = { ...current }
        if (error) next[key] = error
        else delete next[key]
        return next
      })
    }
  }

  const selectPosition = (value: string | null) => {
    const choice =
      value && isPositionChoice(value) ? value : null
    setPositionChoice(choice)
    update(
      "position",
      choice && choice !== otherPosition ? translate(locale, choice) : ""
    )
  }

  const validateStep = (currentStep: 1 | 2) => {
    const fields: FormField[] =
      currentStep === 1
        ? ["name", "email", "phone", "company", "position"]
        : ["requirement", "message"]
    const nextErrors: FormErrors = {}
    for (const field of fields) {
      const error = validateField(field, form[field])
      if (error) nextErrors[field] = error
    }
    setValidationErrors(nextErrors)

    if (Object.keys(nextErrors).length) {
      const firstInvalidField = fields.find((field) => nextErrors[field])
      if (firstInvalidField) {
        requestAnimationFrame(() => {
          const fieldId =
            firstInvalidField === "position"
              ? positionChoice === otherPosition
                ? "contact-position-other"
                : "contact-position"
              : `contact-${firstInvalidField}`
          document.getElementById(fieldId)?.focus()
        })
      }
      return false
    }
    return true
  }

  const controlClass = (field: FormField) =>
    `${formControlClassName} ${
      validationErrors[field]
        ? "border-destructive pr-10 focus-visible:border-destructive focus-visible:ring-destructive/30"
        : ""
    }`

  const validationIcon = (field: FormField) =>
    validationErrors[field] ? (
      <CircleAlert
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-destructive motion-safe:animate-[contact-vibrate_0.35s_ease-in-out_2]"
      />
    ) : null

  const validationMessage = (field: FormField) =>
    validationErrors[field] ? (
      <p
        id={`contact-${field}-error`}
        aria-live="polite"
        className="mt-1 text-sm text-destructive"
      >
        {validationErrors[field]}
      </p>
    ) : null

  const validationSummary = Object.keys(validationErrors).length ? (
    <div
      role="alert"
      aria-live="polite"
      className="flex gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
    >
      <CircleAlert
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 motion-safe:animate-[contact-vibrate_0.35s_ease-in-out_2]"
      />
      <div>
        <p>{translate(locale, "contactFormValidationSummary")}</p>
        <ul className="mt-1 list-inside list-disc">
          {Object.entries(validationErrors).map(([field, error]) => (
            <li key={field}>
              {translate(locale, formFieldLabelKeys[field as FormField])}: {error}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : null

  const handleStepChange = (nextStep: 1 | 2) => {
    setValidationErrors({})
    setStep(nextStep)
  }

  const selectFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles?.length) return

    const additions: File[] = []
    for (const file of Array.from(selectedFiles)) {
      const extension = file.name.split(".").pop()?.toLowerCase() ?? ""
      if (!acceptedExtensions.has(extension)) {
        setFileError(translate(locale, "contactAttachmentTypeError"))
        if (fileInputRef.current) fileInputRef.current.value = ""
        return
      }
      if (file.size === 0 || file.size > maxFileSize) {
        setFileError(translate(locale, "contactAttachmentSizeError"))
        if (fileInputRef.current) fileInputRef.current.value = ""
        return
      }
      if (
        !files.some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified
        ) &&
        !additions.some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified
        )
      ) {
        additions.push(file)
      }
    }

    if (files.length + additions.length > maxFiles) {
      setFileError(translate(locale, "contactAttachmentCountError"))
      if (fileInputRef.current) fileInputRef.current.value = ""
      return
    }

    setFileError("")
    setFiles((current) => [...current, ...additions])
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const removeFile = (removedFile: File) => {
    setFiles((current) =>
      current.filter(
        (file) =>
          file.name !== removedFile.name ||
          file.size !== removedFile.size ||
          file.lastModified !== removedFile.lastModified
      )
    )
    setFileError("")
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (step === 1) {
      if (validateStep(1)) handleStepChange(2)
      return
    }
    if (!validateStep(2)) return

    const subject = form.requirement.trim()
    const attachmentNames = files.map((file) => file.name)
    const body = [
      `${translate(locale, "contactFormName")}: ${form.name.trim()}`,
      ...(form.company.trim()
        ? [`${translate(locale, "contactFormCompany")}: ${form.company.trim()}`]
        : []),
      `${translate(locale, "contactFormReplyEmail")}: ${form.email.trim()}`,
      `${translate(locale, "contactFormPhone")}: ${form.phone.trim()}`,
      ...(form.position.trim()
        ? [
            `${translate(locale, "contactFormPosition")}: ${
              positionChoice && positionChoice !== otherPosition
                ? translate(locale, positionChoice)
                : form.position.trim()
            }`,
          ]
        : []),
      `${translate(locale, "contactFormRequirement")}: ${subject}`,
      ...(attachmentNames.length
        ? [
            "",
            `${translate(locale, "contactFormAttachmentList")}:`,
            ...attachmentNames.map((name) => `- ${name}`),
            "",
            translate(locale, "contactFormAttachmentReminder"),
          ]
        : []),
      "",
      form.message.trim(),
    ].join("\n")

    window.location.href =
      `mailto:${recipient}?subject=${encodeURIComponent(`${translate(locale, "contactFormEmailSubject")}: ${subject}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <main>
      <PageHero
        eyebrow={translate(locale, "contactEmailPageEyebrow")}
        title={translate(locale, "contactEmailPageTitle")}
        description={translate(locale, "contactEmailPageDescription")}
        image="/images/company/office.png"
        pageKey="hubungi-kami-email"
        breadcrumbs={[
          { label: translate(locale, "contact"), href: "/hubungi-kami" },
          {
            label: translate(locale, "contactEmailLabel"),
            href: "/hubungi-kami/email",
          },
        ]}
      />

      <section className="mt-6 grid h-[calc(100svh-1.5rem)] grid-rows-[minmax(11rem,0.3fr)_minmax(0,0.7fr)] overflow-hidden lg:grid-cols-2 lg:grid-rows-1">
        <div className="relative min-h-0 overflow-y-auto bg-white">
          <div className="mx-auto w-full max-w-3xl px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
            <form
              ref={formRef}
              noValidate
              onSubmit={handleSubmit}
              className="grid gap-4"
            >
              <nav aria-label={translate(locale, "contactFormProgressLabel")}>
                <ol className="grid grid-cols-2 gap-3">
                  {([1, 2] as const).map((stepNumber) => {
                    const isCurrent = step === stepNumber
                    const label = translate(
                      locale,
                      stepNumber === 1
                        ? "contactFormPersonalSection"
                        : "contactFormNeedsSection"
                    )

                    return (
                      <li
                        key={stepNumber}
                        aria-current={isCurrent ? "step" : undefined}
                        className="min-w-0"
                      >
                        <div
                          className={`h-1 rounded-full ${
                            isCurrent ? "bg-primary" : "bg-muted"
                          }`}
                        />
                        <p
                          className={`mt-2 truncate text-sm ${
                            isCurrent
                              ? "font-semibold text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {translate(locale, "contactFormStepLabel")} {stepNumber}: {label}
                        </p>
                      </li>
                    )
                  })}
                </ol>
              </nav>

              {validationSummary}

              {step === 1 ? (
                <>
                <Heading level={2} className="text-xl">
                  {translate(locale, "contactFormPersonalSection")}
                </Heading>
                <Field>
                  <FieldLabel htmlFor="contact-name">
                    {translate(locale, "contactFormName")}
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="contact-name"
                      name="name"
                      className={controlClass("name")}
                      autoComplete="name"
                      placeholder={translate(locale, "contactFormNamePlaceholder")}
                      value={form.name}
                      onChange={(event) => update("name", event.target.value)}
                      required
                      aria-invalid={Boolean(validationErrors.name)}
                      aria-describedby={
                        validationErrors.name ? "contact-name-error" : undefined
                      }
                    />
                    {validationIcon("name")}
                  </div>
                  {validationMessage("name")}
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="contact-email">
                      {translate(locale, "contactFormReplyEmail")}
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id="contact-email"
                        name="email"
                        className={controlClass("email")}
                        type="email"
                        autoComplete="email"
                        spellCheck={false}
                        placeholder={translate(locale, "contactFormEmailPlaceholder")}
                        value={form.email}
                        onChange={(event) => update("email", event.target.value)}
                        required
                        aria-invalid={Boolean(validationErrors.email)}
                        aria-describedby={
                          validationErrors.email ? "contact-email-error" : undefined
                        }
                      />
                      {validationIcon("email")}
                    </div>
                    {validationMessage("email")}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="contact-phone">
                      {translate(locale, "contactFormPhone")}
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id="contact-phone"
                        name="phone"
                        className={controlClass("phone")}
                        type="tel"
                        autoComplete="tel"
                        placeholder={translate(locale, "contactFormPhonePlaceholder")}
                        value={form.phone}
                        onChange={(event) => update("phone", event.target.value)}
                        required
                        maxLength={25}
                        aria-invalid={Boolean(validationErrors.phone)}
                        aria-describedby={
                          validationErrors.phone ? "contact-phone-error" : undefined
                        }
                      />
                      {validationIcon("phone")}
                    </div>
                    {validationMessage("phone")}
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="contact-company">
                      {translate(locale, "contactFormCompany")}
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id="contact-company"
                        name="company"
                        className={controlClass("company")}
                        autoComplete="organization"
                        placeholder={translate(locale, "contactFormCompanyPlaceholder")}
                        value={form.company}
                        onChange={(event) => update("company", event.target.value)}
                        required
                        aria-invalid={Boolean(validationErrors.company)}
                        aria-describedby={
                          validationErrors.company
                            ? "contact-company-error"
                            : undefined
                        }
                      />
                      {validationIcon("company")}
                    </div>
                    {validationMessage("company")}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="contact-position">
                      {translate(locale, "contactFormPosition")}
                    </FieldLabel>
                    <div className="relative">
                      <Select
                        value={positionChoice}
                        onValueChange={selectPosition}
                      >
                        <SelectTrigger
                          id="contact-position"
                          aria-invalid={Boolean(validationErrors.position)}
                          aria-describedby={
                            validationErrors.position
                              ? "contact-position-error"
                              : undefined
                          }
                          className={`w-full bg-transparent ${
                            validationErrors.position
                              ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30"
                              : "border-border"
                          }`}
                        >
                          <SelectValue
                            placeholder={translate(
                              locale,
                              "contactFormPositionPlaceholder"
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl p-1.5">
                          {positionOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {translate(locale, option)}
                            </SelectItem>
                          ))}
                          <SelectItem value={otherPosition}>
                            {translate(locale, "contactPositionOther")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {positionChoice !== otherPosition
                        ? validationIcon("position")
                        : null}
                    </div>
                    {positionChoice === otherPosition ? (
                      <div className="relative mt-2">
                        <Input
                          id="contact-position-other"
                          name="position"
                          className={controlClass("position")}
                          autoComplete="organization-title"
                          placeholder={translate(
                            locale,
                            "contactFormPositionOtherPlaceholder"
                          )}
                          value={form.position}
                          onChange={(event) =>
                            update("position", event.target.value)
                          }
                          required
                          aria-invalid={Boolean(validationErrors.position)}
                          aria-describedby={
                            validationErrors.position
                              ? "contact-position-error"
                              : undefined
                          }
                        />
                        {validationIcon("position")}
                      </div>
                    ) : null}
                    {validationMessage("position")}
                  </Field>
                </div>
                </>
              ) : (
                <>

                <Heading level={2} className="mt-2 border-t border-border pt-4 text-xl">
                  {translate(locale, "contactFormNeedsSection")}
                </Heading>
                <Field>
                  <FieldLabel htmlFor="contact-requirement">
                    {translate(locale, "contactFormRequirement")}
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="contact-requirement"
                      name="requirement"
                      className={controlClass("requirement")}
                      placeholder={translate(locale, "contactFormRequirementPlaceholder")}
                      value={form.requirement}
                      onChange={(event) => update("requirement", event.target.value)}
                      required
                      aria-invalid={Boolean(validationErrors.requirement)}
                      aria-describedby={
                        validationErrors.requirement
                          ? "contact-requirement-error"
                          : undefined
                      }
                    />
                    {validationIcon("requirement")}
                  </div>
                  {validationMessage("requirement")}
                </Field>

                <Field>
                  <FieldLabel htmlFor="contact-message">
                    {translate(locale, "contactFormMessage")}
                  </FieldLabel>
                  <div className="relative">
                    <Textarea
                      id="contact-message"
                      name="message"
                      className={`min-h-24 resize-y border-border bg-transparent ${
                        validationErrors.message
                          ? "border-destructive pr-10 focus-visible:border-destructive focus-visible:ring-destructive/30"
                          : ""
                      }`}
                      value={form.message}
                      placeholder={translate(locale, "contactFormMessagePlaceholder")}
                      onChange={(event) => update("message", event.target.value)}
                      required
                      aria-invalid={Boolean(validationErrors.message)}
                      aria-describedby={
                        validationErrors.message ? "contact-message-error" : undefined
                      }
                    />
                    {validationIcon("message")}
                  </div>
                  {validationMessage("message")}
                </Field>

                <Field>
                  <FieldLabel htmlFor="contact-attachments">
                    {translate(locale, "contactFormAttachments")}
                  </FieldLabel>
                  <input
                    ref={fileInputRef}
                    id="contact-attachments"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                    className="sr-only"
                    onChange={(event) => selectFiles(event.target.files)}
                  />
                  <div className="grid gap-3">
                    {files.length ? (
                      <AttachmentGroup className="flex-col overflow-visible">
                        {files.map((file) => (
                          <Attachment
                            key={`${file.name}-${file.size}-${file.lastModified}`}
                            className="w-full"
                            state="done"
                          >
                            <AttachmentMedia>
                              <FileText aria-hidden="true" />
                            </AttachmentMedia>
                            <AttachmentContent>
                              <AttachmentTitle>{file.name}</AttachmentTitle>
                              <AttachmentDescription>
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </AttachmentDescription>
                            </AttachmentContent>
                            <AttachmentAction
                              type="button"
                              aria-label={`${translate(locale, "contactRemoveAttachment")} ${file.name}`}
                              onClick={() => removeFile(file)}
                            >
                              <X aria-hidden="true" />
                            </AttachmentAction>
                          </Attachment>
                        ))}
                      </AttachmentGroup>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex min-h-20 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-background px-5 py-4 text-center transition-colors hover:border-primary/50 hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/30"
                    >
                      <Paperclip aria-hidden="true" className="size-5 text-primary" />
                      <span className="mt-2 text-sm font-medium">
                        {files.length
                          ? translate(locale, "contactAddAttachments")
                          : translate(locale, "contactChooseAttachments")}
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground">
                        {translate(locale, "contactAttachmentLimits")}
                      </span>
                    </button>
                  </div>
                  {fileError ? (
                    <p
                      role="alert"
                      aria-live="polite"
                      className="text-sm text-destructive"
                    >
                      {fileError}
                    </p>
                  ) : null}
                </Field>

                <p className="text-xs text-muted-foreground">
                  {translate(locale, "contactFormRecipient")}: {recipient}
                </p>
                </>
              )}

              <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
                {step === 2 ? (
                  <button
                    type="button"
                    onClick={() => handleStepChange(1)}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    <ArrowLeft data-icon="inline-start" />
                    {translate(locale, "contactFormPrevious")}
                  </button>
                ) : (
                  <span />
                )}
                <button
                  type="submit"
                  className={buttonVariants({ className: "w-fit" })}
                >
                  {step === 1
                    ? translate(locale, "contactFormNext")
                    : translate(locale, "contactFormSubmit")}
                  {step === 1 ? (
                    <ArrowRight data-icon="inline-end" />
                  ) : null}
                </button>
              </div>
            </form>
          </div>
        </div>

        <aside className="relative min-h-0 overflow-hidden bg-base-color text-base-color-foreground">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-100"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1.3px, transparent 1.8px), repeating-linear-gradient(45deg, transparent 0 25px, rgba(255,255,255,0.13) 25px 27px, transparent 27px 54px), repeating-linear-gradient(-45deg, transparent 0 25px, rgba(255,255,255,0.1) 25px 27px, transparent 27px 54px)",
              backgroundSize: "22px 22px, 78px 78px, 78px 78px",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-28 size-[34rem] rounded-full border-2 border-base-color-foreground/25"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-16 size-[26rem] rounded-full border-2 border-base-color-foreground/25"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-4 size-[18rem] rounded-full border-2 border-base-color-foreground/25"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-28 size-80 rotate-45 rounded-[2.5rem] border-2 border-base-color-foreground/20"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -left-16 size-64 rotate-45 rounded-[2rem] border-2 border-base-color-foreground/20"
          />
          <div className="relative z-10 flex h-full flex-col justify-center p-5 text-base-color-foreground sm:justify-end sm:p-10 lg:justify-center lg:p-12 xl:p-16">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-base-color-foreground/75 sm:text-sm">
              {translate(locale, "contactEmailPageEyebrow")}
            </p>
            <Heading level={2} className="mt-2 max-w-xl text-balance text-xl text-base-color-foreground sm:mt-3 sm:text-2xl">
              {translate(locale, "contactFormHeading")}
            </Heading>
            <Text variant="lead" className="mt-2 max-w-xl text-sm text-base-color-foreground/85 sm:mt-5 sm:text-base">
              {translate(locale, "contactFormDescription")}
            </Text>
            <Text className="mt-4 hidden max-w-xl text-sm text-base-color-foreground/75 sm:block">
              {translate(locale, "contactFormEmailClientNote")}
            </Text>
            <Link
              href="/hubungi-kami"
              className={buttonVariants({
                variant: "outline",
                className:
                  "mt-3 w-fit border-base-color-foreground/50 bg-base-color-foreground/10 text-base-color-foreground hover:bg-base-color-foreground/20 hover:text-base-color-foreground sm:mt-6",
              })}
            >
              <ArrowLeft data-icon="inline-start" />
              {translate(locale, "contactFormBackAction")}
            </Link>
          </div>
        </aside>
      </section>
    </main>
  )
}
