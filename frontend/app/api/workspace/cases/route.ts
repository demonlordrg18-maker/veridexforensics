import { createCase, listCases } from "@/lib/workspace/server-store";
import { getSessionFromCookies, unauthorizedResponse, errorResponse } from "@/lib/workspace/api-auth";
import type { CaseFilters } from "@/lib/types/workspace";

export async function GET(request: Request) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const { searchParams } = new URL(request.url);
    const filters: CaseFilters = {
      query: searchParams.get("q") ?? undefined,
      status: (searchParams.get("status") as CaseFilters["status"]) ?? undefined,
      priority: (searchParams.get("priority") as CaseFilters["priority"]) ?? undefined,
      category: (searchParams.get("category") as CaseFilters["category"]) ?? undefined,
    };

    const items = await listCases(session, filters);
    return Response.json({ items });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to list cases");
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const body = await request.json();
    const item = await createCase(session, body);
    return Response.json({ item }, { status: 201 });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to create case");
  }
}
