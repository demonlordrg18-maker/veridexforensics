import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { createNewUserSession, MOCK_USERS } from "@/lib/auth";
import { SESSION_COOKIE_NAME, SESSION_TTL_SECONDS, signSession, verifySession } from "@/lib/session";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OAUTH_PROVIDERS = new Set(["google", "microsoft", "github"]);

function sessionCookie(token: string) {
  return {
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

function clearCookie() {
  return {
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ action: string }> }
) {
  const { action } = await context.params;
  if (action !== "session") return NextResponse.json({ error: "Unknown auth action." }, { status: 404 });

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySession(token);
  if (session) {
    const activeWs = request.cookies.get("veridex_active_workspace")?.value || session.id;
    session.organizationId = activeWs.startsWith("org_") ? activeWs : undefined;
    (session as any).activeWorkspaceId = activeWs;

    if (activeWs.startsWith("org_")) {
      try {
        const DATA_DIR = path.join(process.cwd(), ".workspace-data");
        const raw = await fs.readFile(path.join(DATA_DIR, `${activeWs}.json`), "utf8");
        const orgData = JSON.parse(raw);
        if (orgData.billingSettings) {
          session.creditsRemaining = orgData.billingSettings.creditsRemaining ?? 2500;
          session.creditsUsed = orgData.billingSettings.creditsUsed ?? 120;
          session.monthlyAllocation = orgData.billingSettings.monthlyAllocation ?? 5000;
          session.subscriptionTier = orgData.billingSettings.subscriptionTier ?? "ENTERPRISE";
        }
      } catch {
        // Defaults
        session.creditsRemaining = 2450;
        session.creditsUsed = 1550;
        session.monthlyAllocation = 4000;
        session.subscriptionTier = "ENTERPRISE";
      }
    }
  }
  return NextResponse.json({ user: session });
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ action: string }> }
) {
  const { action } = await context.params;

  if (action === "logout") {
    const response = NextResponse.json({ ok: true });
    response.cookies.set(clearCookie());
    return response;
  }

  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").toLowerCase().trim();
  const password = String(body.password || "");
  const name = String(body.name || "").trim();
  const rememberMe = Boolean(body.rememberMe ?? true);

  if (action === "oauth") {
    const provider = String(body.provider || "").toLowerCase();
    if (!OAUTH_PROVIDERS.has(provider)) return badRequest("Unsupported identity provider.");

    const oauthEmail = email || `${provider}.user@veridex.ai`;
    const session = MOCK_USERS[oauthEmail] ?? createNewUserSession(oauthEmail, `${provider[0].toUpperCase()}${provider.slice(1)} Analyst`);
    const token = await signSession(session, rememberMe ? SESSION_TTL_SECONDS : 60 * 60 * 8);
    const response = NextResponse.json({ user: session });
    response.cookies.set(sessionCookie(token));
    return response;
  }

  if (!EMAIL_RE.test(email)) return badRequest("Enter a valid work email address.");
  if ((action === "login" || action === "signup") && password.length < 8) {
    return badRequest("Password must be at least 8 characters.");
  }

  if (action === "login") {
    const session = MOCK_USERS[email] ?? createNewUserSession(email);
    const token = await signSession(session, rememberMe ? SESSION_TTL_SECONDS : 60 * 60 * 8);
    const response = NextResponse.json({ user: session });
    response.cookies.set(sessionCookie(token));
    return response;
  }

  if (action === "signup") {
    if (!name) return badRequest("Full name is required.");
    const session = createNewUserSession(email, name);
    const token = await signSession(session, rememberMe ? SESSION_TTL_SECONDS : 60 * 60 * 8);
    const response = NextResponse.json({ user: session });
    response.cookies.set(sessionCookie(token));
    return response;
  }

  if (action === "forgot-password") {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Unknown auth action." }, { status: 404 });
}
