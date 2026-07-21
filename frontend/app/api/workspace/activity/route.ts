import { getActivity } from "@/lib/workspace/server-store";
import { getSessionFromCookies, unauthorizedResponse, errorResponse } from "@/lib/workspace/api-auth";

export async function GET(request: Request) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") ?? "30", 10);
    const items = await getActivity(session, limit);
    return Response.json({ items });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to get activity");
  }
}
