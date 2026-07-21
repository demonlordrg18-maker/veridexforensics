import type { CaseCategory, CasePriority, CaseStatus } from "@/lib/types/workspace";

export const CASE_STATUSES: { value: CaseStatus; label: string }[] = [
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "WAITING", label: "Waiting" },
  { value: "COMPLETED", label: "Completed" },
  { value: "ARCHIVED", label: "Archived" },
  { value: "CUSTOM", label: "Custom" },
];

export const CASE_PRIORITIES: { value: CasePriority; label: string; color: string }[] = [
  { value: "CRITICAL", label: "Critical", color: "text-red-400 border-red-400/30 bg-red-400/10" },
  { value: "HIGH", label: "High", color: "text-orange-400 border-orange-400/30 bg-orange-400/10" },
  { value: "MEDIUM", label: "Medium", color: "text-amber-signal border-amber-signal/30 bg-amber-signal/10" },
  { value: "LOW", label: "Low", color: "text-slate-400 border-slate-400/30 bg-slate-400/10" },
];

export const CASE_CATEGORIES: { value: CaseCategory; label: string }[] = [
  { value: "OSINT", label: "OSINT" },
  { value: "ACADEMIC", label: "Academic" },
  { value: "HR", label: "HR" },
  { value: "LEGAL", label: "Legal" },
  { value: "MEDIA", label: "Media" },
  { value: "GOVERNMENT", label: "Government" },
  { value: "RESEARCH", label: "Research" },
  { value: "ENTERPRISE", label: "Enterprise" },
  { value: "CUSTOM", label: "Custom" },
];

export const MODALITY_LABELS: Record<string, string> = {
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

export const MODALITY_ICONS: Record<string, string> = {
  text: "T",
  image: "I",
  audio: "A",
  video: "V",
  pdf: "P",
  url: "U",
  document: "D",
  screenshot: "S",
  archive: "Z",
};

export const ANALYSIS_STATUS_COLORS: Record<string, string> = {
  PENDING: "text-slate-400 border-slate-400/30 bg-slate-400/10",
  ANALYZING: "text-amber-signal border-amber-signal/30 bg-amber-signal/10",
  COMPLETED: "text-verity-green border-verity-green/30 bg-verity-green/10",
  FAILED: "text-red-400 border-red-400/30 bg-red-400/10",
};

export const STORAGE_LIMIT_BYTES = 5 * 1024 * 1024 * 1024; // 5 GB default
