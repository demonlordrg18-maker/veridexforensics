import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifySession } from "@/lib/session";

// Protected routes requiring authentication
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/evidence",
  "/cases",
  "/reports",
  "/settings",
  "/credits",
  "/billing",
  "/enterprise",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
  const session = await verifySession(sessionCookie?.value);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete(SESSION_COOKIE_NAME);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/evidence/:path*",
    "/cases/:path*",
    "/reports/:path*",
    "/settings/:path*",
    "/credits/:path*",
    "/billing/:path*",
    "/enterprise/:path*",
  ],
};
