import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { FieldValue } from "firebase-admin/firestore"

import {
  getFirebaseAdminFirestore,
  getFirebaseAdminStorage,
} from "@/lib/firebase-admin"

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
  const fullName = formData.get("fullName")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const position = formData.get("position")
  const message = formData.get("message")
  const files = formData.getAll("files")

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
    return NextResponse.json({ error: "Data lamaran tidak valid." }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Format email tidak valid." }, { status: 400 })
  }

  const uploadFiles = files.filter((file): file is File => file instanceof File)
  if (uploadFiles.length === 0 || uploadFiles.length > maxFiles) {
    return NextResponse.json({ error: "Jumlah file lamaran tidak valid." }, { status: 400 })
  }

  if (
    uploadFiles.some(
      (file) => !acceptedTypes.has(file.type) || file.size === 0 || file.size > maxFileSize
    )
  ) {
    return NextResponse.json({ error: "Format atau ukuran file tidak valid." }, { status: 400 })
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

    await getFirebaseAdminFirestore().collection("careerApplications").doc(applicationId).set({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      position: position.trim(),
      message: typeof message === "string" ? message.trim() : "",
      files: uploadedFiles,
      status: "received",
      createdAt: FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ applicationId }, { status: 201 })
  } catch {
    const bucket = getFirebaseAdminStorage().bucket()
    await Promise.all(uploadedPaths.map((path) => bucket.file(path).delete().catch(() => undefined)))
    return NextResponse.json({ error: "Lamaran gagal diproses. Silakan coba lagi." }, { status: 500 })
  }
}
