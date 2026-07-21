/**
 * Constants & Enums
 */

import type { CaseStatus, CasePriority, CaseCategory, EvidenceModality, AnalysisStatus } from "@/lib/types";

export const CASE_STATUSES: Record<CaseStatus, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  WAITING: "Waiting",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
  CUSTOM: "Custom",
};

export const CASE_PRIORITIES: Record<CasePriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

export const CASE_CATEGORIES: Record<CaseCategory, string> = {
  OSINT: "OSINT",
  ACADEMIC: "Academic",
  HR: "HR",
  LEGAL: "Legal",
  MEDIA: "Media",
  GOVERNMENT: "Government",
  RESEARCH: "Research",
  ENTERPRISE: "Enterprise",
  CUSTOM: "Custom",
};

export const EVIDENCE_MODALITIES: Record<EvidenceModality, string> = {
  text: "Text",
  image: "Image",
  audio: "Audio",
  video: "Video",
  pdf: "PDF",
  url: "URL",
  document: "Document",
  screenshot: "Screenshot",
  archive: "Archive",
};

export const ANALYSIS_STATUSES: Record<AnalysisStatus, string> = {
  PENDING: "Pending",
  ANALYZING: "Analyzing",
  COMPLETED: "Completed",
  FAILED: "Failed",
};

export const STATUS_COLORS: Record<string, string> = {
  OPEN: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  WAITING: "bg-gray-100 text-gray-800",
  COMPLETED: "bg-green-100 text-green-800",
  ARCHIVED: "bg-slate-100 text-slate-800",
  PENDING: "bg-gray-100 text-gray-800",
  ANALYZING: "bg-blue-100 text-blue-800",
  FAILED: "bg-red-100 text-red-800",
};

export const PRIORITY_COLORS: Record<CasePriority, string> = {
  LOW: "bg-green-100 text-green-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-orange-100 text-orange-800",
  CRITICAL: "bg-red-100 text-red-800",
};

export const FILE_TYPE_ICONS: Record<string, string> = {
  pdf: "📄",
  doc: "📝",
  docx: "📝",
  xls: "📊",
  xlsx: "📊",
  txt: "📋",
  md: "📝",
  jpg: "🖼️",
  jpeg: "🖼️",
  png: "🖼️",
  gif: "🖼️",
  webp: "🖼️",
  mp3: "🎵",
  mp4: "🎬",
  wav: "🎵",
  zip: "📦",
  tar: "📦",
  rar: "📦",
};

export const ALLOWED_FILE_TYPES = {
  image: ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"],
  video: ["mp4", "webm", "mov", "avi", "mkv"],
  audio: ["mp3", "wav", "m4a", "flac", "aac"],
  document: ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx"],
  text: ["txt", "md", "csv"],
  archive: ["zip", "rar", "tar", "gz"],
};

export const MAX_FILE_SIZES = {
  image: 50 * 1024 * 1024, // 50MB
  video: 500 * 1024 * 1024, // 500MB
  audio: 100 * 1024 * 1024, // 100MB
  document: 50 * 1024 * 1024, // 50MB
  text: 10 * 1024 * 1024, // 10MB
  archive: 100 * 1024 * 1024, // 100MB
};

export const PAGINATION_DEFAULTS = {
  limit: 20,
  offset: 0,
};

export const DASHBOARD_REFRESH_INTERVAL = 60000; // 1 minute
export const ACTIVITY_REFRESH_INTERVAL = 30000; // 30 seconds
export const STORAGE_REFRESH_INTERVAL = 300000; // 5 minutes

export const EMPTY_STATE_MESSAGES = {
  noCases: "No cases yet. Create your first investigation to get started.",
  noEvidence: "No evidence uploaded yet. Start your first upload.",
  noReports: "No reports generated yet. Analyze evidence to create reports.",
  noComments: "Start a discussion by adding the first comment.",
};
