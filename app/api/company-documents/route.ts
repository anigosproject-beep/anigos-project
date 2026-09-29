import {NextRequest, NextResponse} from "next/server"

import {getSanityCompanyDocuments, type CompanyDocumentKind} from "@/lib/sanity-company-documents"

export async function GET(request: NextRequest) {
  const kind = request.nextUrl.searchParams.get("type")
  if (kind !== "kemitraan" && kind !== "legalitas") {
    return NextResponse.json({error: "Jenis dokumen tidak valid."}, {status: 400})
  }

  const documents = await getSanityCompanyDocuments(kind as CompanyDocumentKind)
  return NextResponse.json(documents, {headers: {"Cache-Control": "no-store"}})
}
