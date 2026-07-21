// Veridex Forensics — SaaS Foundation Types

export type UserRole = 
  | "GUEST"
  | "FREE"
  | "STUDENT"
  | "RESEARCHER"
  | "PROFESSIONAL"
  | "BUSINESS"
  | "ENTERPRISE"
  | "ADMINISTRATOR";

export type SubscriptionTier = 
  | "FREE"
  | "STARTER"
  | "PRO"
  | "ENTERPRISE"
  | "ACADEMIC";

export interface UserPermissions {
  canPerformAudit: boolean;
  canExportPdf: boolean;
  canAccessEvidenceVault: boolean;
  canManageCases: boolean;
  canAccessApi: boolean;
  canManageOrganization: boolean;
  canAccessAdminConsole: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  GUEST: {
    canPerformAudit: true, // Limited to 1 audit
    canExportPdf: false,
    canAccessEvidenceVault: false,
    canManageCases: false,
    canAccessApi: false,
    canManageOrganization: false,
    canAccessAdminConsole: false,
  },
  FREE: {
    canPerformAudit: true,
    canExportPdf: false,
    canAccessEvidenceVault: true,
    canManageCases: true,
    canAccessApi: false,
    canManageOrganization: false,
    canAccessAdminConsole: false,
  },
  STUDENT: {
    canPerformAudit: true,
    canExportPdf: true,
    canAccessEvidenceVault: true,
    canManageCases: true,
    canAccessApi: false,
    canManageOrganization: false,
    canAccessAdminConsole: false,
  },
  RESEARCHER: {
    canPerformAudit: true,
    canExportPdf: true,
    canAccessEvidenceVault: true,
    canManageCases: true,
    canAccessApi: true,
    canManageOrganization: false,
    canAccessAdminConsole: false,
  },
  PROFESSIONAL: {
    canPerformAudit: true,
    canExportPdf: true,
    canAccessEvidenceVault: true,
    canManageCases: true,
    canAccessApi: true,
    canManageOrganization: false,
    canAccessAdminConsole: false,
  },
  BUSINESS: {
    canPerformAudit: true,
    canExportPdf: true,
    canAccessEvidenceVault: true,
    canManageCases: true,
    canAccessApi: true,
    canManageOrganization: true,
    canAccessAdminConsole: false,
  },
  ENTERPRISE: {
    canPerformAudit: true,
    canExportPdf: true,
    canAccessEvidenceVault: true,
    canManageCases: true,
    canAccessApi: true,
    canManageOrganization: true,
    canAccessAdminConsole: false,
  },
  ADMINISTRATOR: {
    canPerformAudit: true,
    canExportPdf: true,
    canAccessEvidenceVault: true,
    canManageCases: true,
    canAccessApi: true,
    canManageOrganization: true,
    canAccessAdminConsole: true,
  },
};

export interface UserSession {
  id: string;
  name: string;
  email: string;
  emailVerified?: string;
  avatar?: string;
  role: UserRole;
  subscriptionTier: SubscriptionTier;
  organizationId?: string;
  activeWorkspaceId?: string;
  referralCode: string;
  createdDate: string;
  lastLogin: string;
  onboardingCompleted: boolean;
  useCase?: string;
  creditsRemaining: number;
  creditsUsed: number;
  monthlyAllocation: number;
  nextResetDate: string;
  preferences: {
    theme: "dark";
    defaultModality: "text" | "link" | "document" | "image" | "audio" | "video";
    autoExportPdf: boolean;
  };
  notificationSettings: {
    emailAlerts: boolean;
    creditWarnings: boolean;
    weeklyReport: boolean;
  };
  permissions: UserPermissions;
  sessionExpiresAt?: string;
}
