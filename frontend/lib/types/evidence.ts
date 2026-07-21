/**
 * Evidence Vault Types
 * Digital forensic evidence management
 */

export type EvidenceModality = "text" | "image" | "audio" | "video" | "pdf" | "url" | "document" | "screenshot" | "archive";
export type EvidenceStatus = "ACTIVE" | "ARCHIVED";
export type AnalysisStatus = "PENDING" | "ANALYZING" | "COMPLETED" | "FAILED";
export type EvidenceViewType = "GRID" | "LIST" | "COMPACT" | "TIMELINE";

export interface Evidence {
  id: string;
  title: string;
  modality: EvidenceModality;
  fileHash: string;
  storageUrl?: string;
  fileSizeBytes?: number;
  caseId?: string;
  userId: string;
  analysisStatus: AnalysisStatus;
  confidence?: number;
  status: EvidenceStatus;
  favorite: boolean;
  version: number;
  creditsUsed: number;
  notes?: string;
  customMetadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  
  // Computed
  displayName?: string;
  fileType?: string;
  relativePath?: string;
}

export interface EvidenceTag {
  id: string;
  evidenceId: string;
  tag: string;
  createdAt: Date;
}

export interface EvidenceMetadata {
  id: string;
  evidenceId: string;
  uploaderName?: string;
  mimeType?: string;
  originalFilename?: string;
  storageLocation?: string;
  analysisHistory?: Array<{
    timestamp: Date;
    action: string;
    result?: any;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface EvidenceVersion {
  id: string;
  evidenceId: string;
  versionNumber: number;
  fileHash: string;
  storageUrl?: string;
  fileSizeBytes?: number;
  changeNotes?: string;
  createdAt: Date;
}

export interface EvidenceDetailResponse {
  evidence: Evidence;
  metadata: EvidenceMetadata;
  tags: EvidenceTag[];
  versions: EvidenceVersion[];
  caseInfo?: {
    id: string;
    title: string;
  };
  relatedReports?: Array<{
    id: string;
    title: string;
    createdAt: Date;
  }>;
}

export interface EvidenceUploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  status: "pending" | "uploading" | "processing" | "complete" | "error";
  error?: string;
  evidenceId?: string;
}

// API Request types
export interface CreateEvidenceRequest {
  title: string;
  modality: EvidenceModality;
  caseId?: string;
  tags?: string[];
  notes?: string;
  customMetadata?: Record<string, any>;
}

export interface UpdateEvidenceRequest {
  title?: string;
  notes?: string;
  status?: EvidenceStatus;
  favorite?: boolean;
  caseId?: string;
  customMetadata?: Record<string, any>;
}

export interface EvidenceSearchQuery {
  query?: string;
  modality?: EvidenceModality[];
  status?: EvidenceStatus[];
  analysisStatus?: AnalysisStatus[];
  caseId?: string;
  tags?: string[];
  favorite?: boolean;
  archived?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  minSize?: number;
  maxSize?: number;
  sort?: "createdAt" | "updatedAt" | "title" | "size";
  order?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export interface StorageSummary {
  totalBytes: BigInt;
  evidenceCount: number;
  caseCount: number;
  reportCount: number;
  byModality: Record<EvidenceModality, { count: number; bytes: BigInt }>;
  lastCalculated: Date;
}

export interface EvidenceBulkAction {
  action: "archive" | "delete" | "move_to_case" | "tag" | "analyze";
  evidenceIds: string[];
  caseId?: string;
  tags?: string[];
}
