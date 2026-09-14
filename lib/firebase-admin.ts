import "server-only"

import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"

function getFirebaseAdminApp() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n")
  const storageBucket = process.env.FIREBASE_STORAGE_BUCKET

  if (!projectId || !clientEmail || !privateKey || !storageBucket) {
    throw new Error("Firebase Admin configuration is incomplete.")
  }

  return getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert({ projectId, clientEmail, privateKey }),
        storageBucket,
      })
}

export function getFirebaseAdminAuth() {
  return getAuth(getFirebaseAdminApp())
}

export function getFirebaseAdminFirestore() {
  return getFirestore(getFirebaseAdminApp())
}

export function getFirebaseAdminStorage() {
  return getStorage(getFirebaseAdminApp())
}
