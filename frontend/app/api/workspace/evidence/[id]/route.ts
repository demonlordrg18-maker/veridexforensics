import { deleteEvidence, getEvidence, updateEvidence } from "@/lib/workspace/server-store";
import { getSessionFromCookies, unauthorizedResponse, notFoundResponse, errorResponse } from "@/lib/workspace/api-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const { id } = await context.params;
    const item = await getEvidence(session, id);
    if (!item) return notFoundResponse("Evidence not found");
    return Response.json({ item });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to get evidence");
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const { id } = await context.params;
    const body = await request.json();
    const item = await updateEvidence(session, id, body);
    return Response.json({ item });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to update evidence");
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const { id } = await context.params;
    await deleteEvidence(session, id);
    return Response.json({ ok: true });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to delete evidence");
  }
}
