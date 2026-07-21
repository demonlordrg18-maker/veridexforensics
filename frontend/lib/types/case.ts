/**
 * Case Management Types
 * Forensic investigation cases - core organizational unit
 */

export type CaseStatus = "OPEN" | "IN_PROGRESS" | "WAITING" | "COMPLETED" | "ARCHIVED" | "CUSTOM";
export type CasePriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
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
export type CaseMemberRole = "OWNER" | "EDITOR" | "VIEWER" | "GUEST";
export type CaseActivityAction =
  | "EVIDENCE_ADDED"
  | "ANALYSIS_COMPLETED"
  | "REPORT_GENERATED"
  | "COMMENT"
  | "STATUS_CHANGE"
  | "EXPORT"
  | "NOTE_EDIT"
  | "MEMBER_ADDED"
  | "MEMBER_REMOVED"
  | "CASE_CREATED"
  | "CASE_ARCHIVED";

export interface Case {
  id: string;
  caseNumber: string;
  title: string;
  description?: string;
  status: CaseStatus;
  priority: CasePriority;
  category: CaseCategory;
  visibility: CaseVisibility;
  dueDate?: Date;
  tags: string[];
  userId: string;
  organizationId?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Computed fields
  evidenceCount?: number;
  reportCount?: number;
  memberCount?: number;
}

export interface CaseMember {
  id: string;
  caseId: string;
  userId: string;
  role: CaseMemberRole;
  invitedAt: Date;
  
  // Joined data
  user?: {
    id: string;
    name?: string;
    email: string;
    image?: string;
  };
}

export interface CaseActivity {
  id: string;
  caseId: string;
  userId: string;
  action: CaseActivityAction;
  details?: Record<string, any>;
  createdAt: Date;
  
  // Joined data
  user?: {
    name?: string;
    email: string;
    image?: string;
  };
}

export interface CaseNote {
  id: string;
  caseId: string;
  userId: string;
  title?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Joined data
  user?: {
    name?: string;
    email: string;
  };
}

export interface CaseComment {
  id: string;
  caseId: string;
  userId: string;
  userName: string;
  content: string;
  parentId?: string;
  resolved: boolean;
  reactions?: Record<string, number>;
  createdAt: Date;
  updatedAt: Date;
  
  // Computed
  replies?: CaseComment[];
  replyCount?: number;
}

export interface CaseStats {
  totalCases: number;
  openCases: number;
  inProgressCases: number;
  completedCases: number;
  archivedCases: number;
  totalEvidence: number;
  totalReports: number;
  averagePriority: CasePriority;
}

// API Request/Response types
export interface CreateCaseRequest {
  title: string;
  description?: string;
  priority?: CasePriority;
  category?: CaseCategory;
  visibility?: CaseVisibility;
  dueDate?: Date;
  tags?: string[];
}

export interface UpdateCaseRequest {
  title?: string;
  description?: string;
  status?: CaseStatus;
  priority?: CasePriority;
  category?: CaseCategory;
  visibility?: CaseVisibility;
  dueDate?: Date;
  tags?: string[];
}

export interface CaseListQuery {
  status?: CaseStatus[];
  priority?: CasePriority[];
  category?: CaseCategory[];
  search?: string;
  tag?: string;
  sort?: "createdAt" | "updatedAt" | "dueDate" | "title";
  order?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export interface CaseDetailResponse {
  case: Case;
  members: CaseMember[];
  evidence: Array<{ id: string; title: string; modality: string }>;
  reports: Array<{ id: string; title: string; createdAt: Date }>;
  recentActivity: CaseActivity[];
  stats: {
    evidenceCount: number;
    reportCount: number;
    memberCount: number;
  };
}
