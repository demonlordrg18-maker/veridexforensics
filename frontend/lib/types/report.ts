/**
 * Report Types
 * Forensic analysis reports and findings
 */

export type ReportType = "executive" | "technical" | "evidence" | "timeline" | "summary";
export type ExportFormat = "pdf" | "docx" | "json";

export interface Finding {
  title: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  description: string;
  evidence: string[];
  recommendation?: string;
}

export interface Report {
  id: string;
  title: string;
  verityIndex: number;
  truthScore: number;
  confidence: number;
  origin: string;
  findings: Finding[];
  biasReport?: Record<string, any>;
  factuality?: Record<string, any>;
  spectral?: Record<string, any>;
  evidenceId?: string;
  caseId?: string;
  userId: string;
  createdAt: Date;
  
  // Computed
  summaryText?: string;
  keyFindings?: Finding[];
}

export interface ReportExport {
  format: ExportFormat;
  reportId: string;
  templateType?: ReportType;
  includeMetadata?: boolean;
  includeCharts?: boolean;
}

// API types
export interface CreateReportRequest {
  title: string;
  type: ReportType;
  evidenceId?: string;
  caseId?: string;
  includeImages?: boolean;
  includeCaseContext?: boolean;
  templateId?: string;
}

export interface ReportListQuery {
  caseId?: string;
  evidenceId?: string;
  sort?: "createdAt" | "title";
  order?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export interface ReportGenerateResponse {
  reportId: string;
  title: string;
  status: "generating" | "completed" | "failed";
  progress?: number;
  estimatedTime?: number;
}
