// Veridex Forensics - Authentication helper engine.

import { ROLE_PERMISSIONS, UserRole, UserSession } from "./types/auth";

const STORAGE_KEY = "veridex_active_session";

export const DEFAULT_USER_PREFERENCES: UserSession["preferences"] = {
  theme: "dark",
  defaultModality: "text",
  autoExportPdf: false,
};

export const DEFAULT_NOTIFICATION_SETTINGS: UserSession["notificationSettings"] = {
  emailAlerts: true,
  creditWarnings: true,
  weeklyReport: false,
};

function daysFromNow(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

function baseUserSession(overrides: Partial<UserSession> & Pick<UserSession, "id" | "name" | "email" | "role">): UserSession {
  const timestamp = new Date().toISOString();
  const role = overrides.role;

  return {
    id: overrides.id,
    name: overrides.name,
    email: overrides.email,
    emailVerified: overrides.emailVerified ?? timestamp,
    avatar: overrides.avatar,
    role,
    subscriptionTier: overrides.subscriptionTier ?? "FREE",
    organizationId: overrides.organizationId,
    referralCode: overrides.referralCode ?? `VDX${Math.floor(1000 + Math.random() * 9000)}`,
    createdDate: overrides.createdDate ?? timestamp,
    lastLogin: timestamp,
    onboardingCompleted: overrides.onboardingCompleted ?? false,
    useCase: overrides.useCase,
    creditsRemaining: overrides.creditsRemaining ?? 50,
    creditsUsed: overrides.creditsUsed ?? 0,
    monthlyAllocation: overrides.monthlyAllocation ?? 50,
    nextResetDate: overrides.nextResetDate ?? daysFromNow(30),
    preferences: overrides.preferences ?? DEFAULT_USER_PREFERENCES,
    notificationSettings: overrides.notificationSettings ?? DEFAULT_NOTIFICATION_SETTINGS,
    permissions: ROLE_PERMISSIONS[role],
    sessionExpiresAt: overrides.sessionExpiresAt,
  };
}

export const MOCK_USERS: Record<string, UserSession> = {
  "analyst@veridex.ai": baseUserSession({
    id: "usr_analyst_01",
    name: "Dr. Evelyn Vance",
    email: "analyst@veridex.ai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    role: "PROFESSIONAL",
    subscriptionTier: "PRO",
    referralCode: "VANCE2026",
    onboardingCompleted: true,
    useCase: "Research",
    creditsRemaining: 450,
    creditsUsed: 150,
    monthlyAllocation: 600,
    nextResetDate: daysFromNow(25),
  }),
  "free@veridex.ai": baseUserSession({
    id: "usr_free_01",
    name: "Alex Mercer",
    email: "free@veridex.ai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    role: "FREE",
    subscriptionTier: "FREE",
    referralCode: "MERCER50",
    onboardingCompleted: true,
    useCase: "Journalist",
    creditsRemaining: 50,
    creditsUsed: 12,
    monthlyAllocation: 50,
    nextResetDate: daysFromNow(18),
  }),
};

export function getStoredSession(): UserSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserSession;
  } catch (err) {
    console.error("Failed to parse stored session:", err);
    return null;
  }
}

export function saveSession(session: UserSession): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function createNewUserSession(email: string, name?: string, role: UserRole = "FREE"): UserSession {
  const normalizedEmail = email.toLowerCase().trim();
  const session = baseUserSession({
    id: `usr_${Math.random().toString(36).substring(2, 9)}`,
    name: name?.trim() || normalizedEmail.split("@")[0],
    email: normalizedEmail,
    role,
  });

  saveSession(session);
  return session;
}
