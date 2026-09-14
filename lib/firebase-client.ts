import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth } from "firebase/auth"
import { getFirestore, type Firestore } from "firebase/firestore"

function getFirebaseApp(): FirebaseApp {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID

  if (!projectId || !apiKey || !authDomain || !storageBucket || !appId) {
    throw new Error("Firebase client configuration is incomplete.")
  }

  const config = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    appId,
  }

  return getApps().length ? getApp() : initializeApp(config)
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp())
}

export function getFirebaseFirestore(): Firestore {
  return getFirestore(getFirebaseApp())
}
