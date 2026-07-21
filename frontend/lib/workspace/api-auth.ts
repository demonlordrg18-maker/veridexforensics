import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME, verifySession } from "@/lib/session";
import type { UserSession } from "@/lib/types/auth";

export async function getSessionFromCookies(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySession(token);
}

export function unauthorizedResponse() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

export function notFoundResponse(message = "Not found") {
  return Response.json({ error: message }, { status: 404 });
}

export function errorResponse(message: string, status = 500) {
  return Response.json({ error: message }, { status });
}
