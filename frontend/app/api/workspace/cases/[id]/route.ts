import { getCase, updateCase } from "@/lib/workspace/server-store";
import { getSessionFromCookies, unauthorizedResponse, notFoundResponse, errorResponse } from "@/lib/workspace/api-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const { id } = await context.params;
    const data = await getCase(session, id);
    if (!data) return notFoundResponse("Case not found");
    return Response.json(data);
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to get case");
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const { id } = await context.params;
    const body = await request.json();
    const item = await updateCase(session, id, body);
    return Response.json({ item });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to update case");
  }
}
