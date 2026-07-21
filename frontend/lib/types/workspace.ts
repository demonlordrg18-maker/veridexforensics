// Veridex Workspace — Types for Dashboard, Evidence Vault & Case Management

export type CaseStatus =
  | "OPEN"
  | "IN_PROGRESS"
  | "WAITING"
  | "COMPLETED"
  | "ARCHIVED"
  | "CUSTOM";

export type CasePriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export type CaseCategory =
  | "OSINT"
  | "ACADEMIC"
  | "HR"
  | "LEGAL"
  | "MEDIA"
  | "GOVERNMENT"
  | "RESEARCH"
  | "ENTERPRISE"
  | "CUSTOM";

export type CaseVisibility = "PRIVATE" | "TEAM" | "ORGANIZATION";

export type EvidenceModality =
  | "text"
  | "image"
  | "audio"
  | "video"
  | "pdf"
  | "url"
  | "document"
  | "screenshot"
  | "archive";

export type AnalysisStatus = "PENDING" | "ANALYZING" | "COMPLETED" | "FAILED";

export type EvidenceStatus = "ACTIVE" | "ARCHIVED";

export type CaseMemberRole = "OWNER" | "EDITOR" | "VIEWER" | "GUEST";

export type ActivityAction =
  | "UPLOAD"
  | "ANALYSIS"
  | "REPORT"
  | "EXPORT"
  | "CASE_CREATE"
  | "CASE_UPDATE"
  | "CASE_STATUS"
  | "EVIDENCE_ADDED"
  | "EVIDENCE_MOVED"
  | "COMMENT"
  | "NOTE_EDIT"
  | "CREDIT_PURCHASE"
  | "DOWNLOAD";

export type VaultViewMode = "grid" | "list" | "compact" | "timeline";

export interface AnalysisHistoryEntry {
  id: string;
  modality: string;
  verityIndex?: number;
  confidence?: number;
  creditsUsed: number;
  completedAt: string;
  reportId?: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  modality: EvidenceModality;
  fileHash: string;
  storageUrl?: string;
  fileSizeBytes?: number;
  caseId?: string;
  caseTitle?: string;
  userId: string;
  analysisStatus: AnalysisStatus;
  confidence?: number;
  status: EvidenceStatus;
  favorite: boolean;
  version: number;
  creditsUsed: number;
  notes?: string;
  tags: string[];
  customMetadata?: Record<string, unknown>;
  uploaderName?: string;
  mimeType?: string;
  originalFilename?: string;
  storageLocation?: string;
  analysisHistory: AnalysisHistoryEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface CaseItem {
  id: string;
  caseNumber: string;
  title: string;
  description?: string;
  status: CaseStatus;
  priority: CasePriority;
  category: CaseCategory;
  visibility: CaseVisibility;
  dueDate?: string;
  tags: string[];
  userId: string;
  organizationId?: string;
  evidenceCount: number;
  reportCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CaseMember {
  id: string;
  caseId: string;
  userId: string;
  userName: string;
  role: CaseMemberRole;
  invitedAt: string;
}

export interface CaseActivityEntry {
  id: string;
  caseId: string;
  userId: string;
  userName: string;
  action: ActivityAction;
  details?: Record<string, unknown>;
  createdAt: string;
}

export interface CaseNote {
  id: string;
  caseId: string;
  userId: string;
  title?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseComment {
  id: string;
  caseId: string;
  userId: string;
  userName: string;
  content: string;
  parentId?: string;
  resolved: boolean;
  reactions: Record<string, number>;
  createdAt: string;
  updatedAt: string;
}

export interface ReportSummary {
  id: string;
  title: string;
  verityIndex: number;
  truthScore: number;
  confidence: number;
  origin: string;
  evidenceId?: string;
  caseId?: string;
  createdAt: string;
}

export interface ActivityEntry {
  id: string;
  userId: string;
  action: ActivityAction;
  title: string;
  description?: string;
  details?: Record<string, unknown>;
  caseId?: string;
  evidenceId?: string;
  createdAt: string;
}

export interface PinnedItem {
  id: string;
  userId: string;
  itemType: "CASE" | "EVIDENCE" | "REPORT";
  itemId: string;
  caseId?: string;
  pinnedAt: string;
}

export interface StorageStats {
  totalBytes: number;
  evidenceCount: number;
  caseCount: number;
  reportCount: number;
  byModality: Record<string, number>;
  largestFiles: { id: string; title: string; fileSizeBytes: number }[];
  lastCalculated: string;
}

export interface DashboardData {
  welcomeName: string;
  subscriptionTier: string;
  creditsRemaining: number;
  creditsUsed: number;
  monthlyAllocation: number;
  nextResetDate: string;
  storage: StorageStats;
  recentActivity: ActivityEntry[];
  recentCases: CaseItem[];
  recentEvidence: EvidenceItem[];
  recentReports: ReportSummary[];
  pinnedCases: CaseItem[];
  openInvestigations: number;
  completedInvestigations: number;
  unassignedEvidenceCount: number;
}

export interface EvidenceFilters {
  query?: string;
  modality?: EvidenceModality;
  caseId?: string | "unassigned";
  status?: EvidenceStatus;
  favorite?: boolean;
  archived?: boolean;
  dateFrom?: string;
  dateTo?: string;
  tags?: string[];
  analysisStatus?: AnalysisStatus;
}

export interface CaseFilters {
  query?: string;
  status?: CaseStatus;
  priority?: CasePriority;
  category?: CaseCategory;
  tags?: string[];
}

export interface CreateCaseInput {
  title: string;
  description?: string;
  priority?: CasePriority;
  category?: CaseCategory;
  status?: CaseStatus;
  dueDate?: string;
  visibility?: CaseVisibility;
  tags?: string[];
}

export interface CreateEvidenceInput {
  title: string;
  modality: EvidenceModality;
  fileHash: string;
  fileSizeBytes?: number;
  caseId?: string;
  tags?: string[];
  notes?: string;
  originalFilename?: string;
  mimeType?: string;
}

export interface UpdateEvidenceInput {
  title?: string;
  caseId?: string | null;
  tags?: string[];
  notes?: string;
  favorite?: boolean;
  status?: EvidenceStatus;
  analysisStatus?: AnalysisStatus;
  confidence?: number;
}

export interface UserWorkspaceData {
  userId: string;
  workspaceId?: string;
  workspaceName?: string;
  isOrg?: boolean;
  cases: CaseItem[];
  evidence: EvidenceItem[];
  reports: ReportSummary[];
  activities: ActivityEntry[];
  pinnedItems: PinnedItem[];
  caseActivities: Record<string, CaseActivityEntry[]>;
  caseNotes: Record<string, CaseNote[]>;
  caseComments: Record<string, CaseComment[]>;
  caseMembers: Record<string, CaseMember[]>;
  storage: StorageStats;
  seeded: boolean;

  // Enterprise & Developer Fields
  orgLogo?: string;
  orgIndustry?: string;
  orgDescription?: string;
  orgDomain?: string;
  billingOwnerId?: string;
  primaryContact?: string;
  createdDate?: string;
  departments?: { id: string; name: string; adminId: string; memberIds: string[] }[];
  members?: { userId: string; name: string; email: string; role: string; status: string; joinedAt: string; departmentId?: string }[];
  securitySettings?: {
    twoFactorRequired: boolean;
    passwordPolicy: { minLength: number; requireSpecial: boolean };
    sessionTimeout: number;
    ipRestrictions: string;
    domainVerified: boolean;
  };
  billingSettings?: {
    subscriptionTier: string;
    subscriptionStatus: string;
    billingEmail: string;
    paymentMethod: string;
    invoiceHistory: Array<{ id: string; date: string; amount: number; status: string }>;
  };
  apiKeys?: {
    id: string;
    name: string;
    keyPrefix: string;
    keyHash: string;
    scopes: string[];
    createdAt: string;
    expiresAt?: string;
    lastUsed?: string;
    status: "ACTIVE" | "REVOKED";
  }[];
  webhooks?: {
    id: string;
    url: string;
    description: string;
    secret: string;
    events: string[];
    createdAt: string;
    status: "ACTIVE" | "INACTIVE";
  }[];
  webhookLogs?: {
    id: string;
    webhookId: string;
    event: string;
    payload: string;
    statusCode: number;
    response: string;
    timestamp: string;
    retryCount: number;
  }[];
}
