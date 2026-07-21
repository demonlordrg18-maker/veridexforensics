import { getDashboardData } from "@/lib/workspace/server-store";
import { getSessionFromCookies, unauthorizedResponse, errorResponse } from "@/lib/workspace/api-auth";

export async function GET() {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();
    const data = await getDashboardData(session);
    return Response.json(data);
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to load dashboard");
  }
}
