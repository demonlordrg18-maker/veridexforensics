// Veridex Forensics — Guest Session & Free Limit Tracker

const GUEST_AUDIT_KEY = "veridex_guest_audits_count";

export function getGuestAuditCount(): number {
  if (typeof window === "undefined") return 0;
  const count = localStorage.getItem(GUEST_AUDIT_KEY);
  return count ? parseInt(count, 10) : 0;
}

export function incrementGuestAuditCount(): number {
  if (typeof window === "undefined") return 1;
  const current = getGuestAuditCount();
  const next = current + 1;
  localStorage.setItem(GUEST_AUDIT_KEY, next.toString());
  return next;
}

export function hasReachedGuestLimit(): boolean {
  return getGuestAuditCount() >= 1;
}

export function resetGuestAuditCount(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(GUEST_AUDIT_KEY);
}
