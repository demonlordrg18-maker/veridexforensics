import { createEvidence, listEvidence } from "@/lib/workspace/server-store";
import { getSessionFromCookies, unauthorizedResponse, errorResponse } from "@/lib/workspace/api-auth";
import type { EvidenceFilters } from "@/lib/types/workspace";

export async function GET(request: Request) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const { searchParams } = new URL(request.url);
    const filters: EvidenceFilters = {
      query: searchParams.get("q") ?? undefined,
      modality: (searchParams.get("modality") as EvidenceFilters["modality"]) ?? undefined,
      caseId: searchParams.get("caseId") ?? undefined,
      status: (searchParams.get("status") as EvidenceFilters["status"]) ?? undefined,
      favorite: searchParams.get("favorite") === "true" ? true : undefined,
      archived: searchParams.get("archived") === "true" ? true : searchParams.get("archived") === "false" ? false : undefined,
      analysisStatus: (searchParams.get("analysisStatus") as EvidenceFilters["analysisStatus"]) ?? undefined,
    };

    const items = await listEvidence(session, filters);
    return Response.json({ items });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to list evidence");
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const body = await request.json();
    const item = await createEvidence(session, body);
    return Response.json({ item }, { status: 201 });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to create evidence");
  }
}
