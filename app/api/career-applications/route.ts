import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { CAREER_APPLICATION_FIELDS } from "@/lib/form-contract"
import { FieldValue } from "firebase-admin/firestore"

import {
  getFirebaseAdminFirestore,
  getFirebaseAdminStorage,
} from "@/lib/firebase-admin"
import { isSanityAvailabilityError } from "@/lib/sanity-client"
import { getActiveCareerOpening } from "@/lib/sanity-careers"

export const runtime = "nodejs"

const maxFileSize = 5 * 1024 * 1024
const maxFiles = 5
const maxFieldLength = 500
const acceptedTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
])

function isString(value: FormDataEntryValue | null): value is string {
  return typeof value === "string" && value.trim().length > 0
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const fullName = formData.get(CAREER_APPLICATION_FIELDS.fullName)
  const email = formData.get(CAREER_APPLICATION_FIELDS.email)
  const phone = formData.get(CAREER_APPLICATION_FIELDS.phone)
  const position = formData.get(CAREER_APPLICATION_FIELDS.position)
  const message = formData.get(CAREER_APPLICATION_FIELDS.message)
  const files = formData.getAll(CAREER_APPLICATION_FIELDS.files)

  if (
    !isString(fullName) ||
    !isString(email) ||
    !isString(phone) ||
    !isString(position) ||
    ![fullName, email, phone, position, message].every(
      (value) => value === null || typeof value === "string"
    ) ||
    [fullName, email, phone, position, message].some(
      (value) => typeof value === "string" && value.length > maxFieldLength
    )
  ) {
    return NextResponse.json(
      { error: "Data lamaran tidak valid." },
      { status: 400 }
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Format email tidak valid." },
      { status: 400 }
    )
  }

  const uploadFiles = files.filter((file): file is File => file instanceof File)
  if (uploadFiles.length === 0 || uploadFiles.length > maxFiles) {
    return NextResponse.json(
      { error: "Jumlah file lamaran tidak valid." },
      { status: 400 }
    )
  }

  if (
    uploadFiles.some(
      (file) =>
        !acceptedTypes.has(file.type) ||
        file.size === 0 ||
        file.size > maxFileSize
    )
  ) {
    return NextResponse.json(
      { error: "Format atau ukuran file tidak valid." },
      { status: 400 }
    )
  }

  let activeOpening
  try {
    activeOpening = await getActiveCareerOpening(position.trim(), "id")
  } catch (error) {
    if (isSanityAvailabilityError(error)) {
      console.warn(
        "Unable to verify the selected career opening with Sanity.",
        error
      )
    } else {
      console.error("Failed to verify the selected career opening.", error)
    }
    return NextResponse.json(
      { errorCode: "openings-unavailable" },
      { status: 503 }
    )
  }

  if (!activeOpening) {
    return NextResponse.json(
      { errorCode: "opening-unavailable" },
      { status: 409 }
    )
  }

  const applicationId = randomUUID()
  const uploadedPaths: string[] = []

  try {
    const bucket = getFirebaseAdminStorage().bucket()
    const uploadedFiles = []

    for (const file of uploadFiles) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
      const path = `career-applications/${applicationId}/${safeName}`
      const buffer = Buffer.from(await file.arrayBuffer())

      await bucket.file(path).save(buffer, {
        metadata: {
          contentType: file.type,
          metadata: { applicationId },
        },
        resumable: false,
        validation: "md5",
      })

      uploadedPaths.push(path)
      uploadedFiles.push({
        name: file.name,
        path,
        contentType: file.type,
        size: file.size,
      })
    }

    await getFirebaseAdminFirestore()
      .collection("careerApplications")
      .doc(applicationId)
      .set({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        position: activeOpening.slug,
        positionTitle: activeOpening.title,
        sanityOpeningId: activeOpening.sanityId,
        message: typeof message === "string" ? message.trim() : "",
        files: uploadedFiles,
        status: "received",
        createdAt: FieldValue.serverTimestamp(),
      })

    return NextResponse.json({ applicationId }, { status: 201 })
  } catch {
    const bucket = getFirebaseAdminStorage().bucket()
    await Promise.all(
      uploadedPaths.map((path) =>
        bucket
          .file(path)
          .delete()
          .catch(() => undefined)
      )
    )
    return NextResponse.json(
      { error: "Lamaran gagal diproses. Silakan coba lagi." },
      { status: 500 }
    )
  }
}
