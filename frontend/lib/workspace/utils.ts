import type {
  ActivityEntry,
  CaseItem,
  EvidenceFilters,
  EvidenceItem,
  StorageStats,
  UserWorkspaceData,
} from "@/lib/types/workspace";

export function generateId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function generateCaseNumber(): string {
  const year = new Date().getFullYear();
  const seq = Math.floor(Math.random() * 9000 + 1000);
  return `VDX-${year}-${seq}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function computeStorageStats(data: UserWorkspaceData): StorageStats {
  const byModality: Record<string, number> = {};
  let totalBytes = 0;

  for (const item of data.evidence) {
    const size = item.fileSizeBytes ?? 0;
    totalBytes += size;
    byModality[item.modality] = (byModality[item.modality] ?? 0) + 1;
  }

  const largestFiles = [...data.evidence]
    .filter((e) => e.fileSizeBytes)
    .sort((a, b) => (b.fileSizeBytes ?? 0) - (a.fileSizeBytes ?? 0))
    .slice(0, 5)
    .map((e) => ({ id: e.id, title: e.title, fileSizeBytes: e.fileSizeBytes ?? 0 }));

  return {
    totalBytes,
    evidenceCount: data.evidence.filter((e) => e.status === "ACTIVE").length,
    caseCount: data.cases.filter((c) => c.status !== "ARCHIVED").length,
    reportCount: data.reports.length,
    byModality,
    largestFiles,
    lastCalculated: nowIso(),
  };
}

export function enrichCasesWithCounts(data: UserWorkspaceData): CaseItem[] {
  return data.cases.map((c) => ({
    ...c,
    evidenceCount: data.evidence.filter((e) => e.caseId === c.id && e.status === "ACTIVE").length,
    reportCount: data.reports.filter((r) => r.caseId === c.id).length,
  }));
}

export function filterEvidence(items: EvidenceItem[], filters: EvidenceFilters): EvidenceItem[] {
  return items.filter((item) => {
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const match =
        item.title.toLowerCase().includes(q) ||
        item.fileHash.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.originalFilename?.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (filters.modality && item.modality !== filters.modality) return false;
    if (filters.caseId === "unassigned" && item.caseId) return false;
    if (filters.caseId && filters.caseId !== "unassigned" && item.caseId !== filters.caseId) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.favorite && !item.favorite) return false;
    if (filters.archived !== undefined) {
      const isArchived = item.status === "ARCHIVED";
      if (filters.archived !== isArchived) return false;
    }
    if (filters.analysisStatus && item.analysisStatus !== filters.analysisStatus) return false;
    if (filters.tags?.length && !filters.tags.every((t) => item.tags.includes(t))) return false;
    if (filters.dateFrom && item.createdAt < filters.dateFrom) return false;
    if (filters.dateTo && item.createdAt > filters.dateTo) return false;
    return true;
  });
}

export function addActivity(
  data: UserWorkspaceData,
  entry: Omit<ActivityEntry, "id" | "createdAt">
): ActivityEntry {
  const activity: ActivityEntry = {
    ...entry,
    id: generateId("act"),
    createdAt: nowIso(),
  };
  data.activities.unshift(activity);
  data.activities = data.activities.slice(0, 200);
  return activity;
}

export async function computeFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function getModalityFromFile(file: File): string {
  const type = file.type;
  if (type.startsWith("image/")) return "image";
  if (type.startsWith("audio/")) return "audio";
  if (type.startsWith("video/")) return "video";
  if (type === "application/pdf") return "pdf";
  if (type.includes("word") || type.includes("document")) return "document";
  if (type.includes("zip") || type.includes("archive")) return "archive";
  return "document";
}
