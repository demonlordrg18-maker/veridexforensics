/**
 * Permission & Role Utilities
 * Role-based access control (RBAC)
 */

import type { CaseMemberRole } from "@/lib/types";

export const ROLE_PERMISSIONS: Record<CaseMemberRole, string[]> = {
  OWNER: ["read", "create", "update", "delete", "manage_members", "manage_permissions", "manage_settings"],
  EDITOR: ["read", "create", "update", "delete"],
  VIEWER: ["read"],
  GUEST: ["read"],
};

export function hasPermission(role: CaseMemberRole, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

export function canEditCase(role: CaseMemberRole): boolean {
  return hasPermission(role, "update");
}

export function canDeleteCase(role: CaseMemberRole): boolean {
  return hasPermission(role, "delete");
}

export function canManageMembers(role: CaseMemberRole): boolean {
  return hasPermission(role, "manage_members");
}

export function canManageSettings(role: CaseMemberRole): boolean {
  return hasPermission(role, "manage_settings");
}

export function canReadEvidence(role: CaseMemberRole): boolean {
  return hasPermission(role, "read");
}

export function canEditEvidence(role: CaseMemberRole): boolean {
  return hasPermission(role, "update");
}

export function canDeleteEvidence(role: CaseMemberRole): boolean {
  return hasPermission(role, "delete");
}

export function getRoleLabel(role: CaseMemberRole): string {
  const labels: Record<CaseMemberRole, string> = {
    OWNER: "Owner",
    EDITOR: "Editor",
    VIEWER: "Viewer",
    GUEST: "Guest",
  };
  return labels[role] || role;
}

export function getRoleColor(role: CaseMemberRole): string {
  const colors: Record<CaseMemberRole, string> = {
    OWNER: "bg-red-500",
    EDITOR: "bg-blue-500",
    VIEWER: "bg-gray-500",
    GUEST: "bg-gray-400",
  };
  return colors[role] || "bg-gray-500";
}

export function getRoleBadgeVariant(role: CaseMemberRole): "default" | "secondary" | "destructive" | "outline" {
  const variants: Record<CaseMemberRole, "default" | "secondary" | "destructive" | "outline"> = {
    OWNER: "destructive",
    EDITOR: "default",
    VIEWER: "secondary",
    GUEST: "outline",
  };
  return variants[role] || "secondary";
}
