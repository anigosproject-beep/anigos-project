export const CAREER_APPLICATION_FIELDS = {
  fullName: "fullName",
  email: "email",
  phone: "phone",
  position: "position",
  message: "message",
  files: "files",
} as const

export type CareerApplicationField =
  (typeof CAREER_APPLICATION_FIELDS)[keyof typeof CAREER_APPLICATION_FIELDS]

export const CAREER_APPLICATION_FIELD_KEYS = Object.values(CAREER_APPLICATION_FIELDS)
