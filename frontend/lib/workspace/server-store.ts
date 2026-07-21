import { promises as fs } from "fs";
import path from "path";
import { cookies } from "next/headers";
import type { UserSession } from "@/lib/types/auth";
import type {
  CaseActivityEntry,
  CaseComment,
  CaseFilters,
  CaseItem,
  CaseNote,
  CreateCaseInput,
  CreateEvidenceInput,
  DashboardData,
  EvidenceFilters,
  EvidenceItem,
  PinnedItem,
  UpdateEvidenceInput,
  UserWorkspaceData,
} from "@/lib/types/workspace";
import { createEmptyWorkspace, createSeedWorkspace, createEmptyOrgWorkspace, createSeedOrgWorkspace } from "@/lib/workspace/seed-data";
import {
  addActivity,
  computeStorageStats,
  enrichCasesWithCounts,
  filterEvidence,
  generateCaseNumber,
  generateId,
  nowIso,
} from "@/lib/workspace/utils";

const DATA_DIR = path.join(process.cwd(), ".workspace-data");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function getActiveWorkspaceId(userId: string): Promise<string> {
  try {
    const cookieStore = await cookies();
    const wsId = cookieStore.get("veridex_active_workspace")?.value;
    return wsId || userId;
  } catch {
    return userId;
  }
}

async function getWorkspaceFilePath(userId: string) {
  const wsId = await getActiveWorkspaceId(userId);
  return path.join(DATA_DIR, `${wsId}.json`);
}

async function readWorkspace(userId: string): Promise<UserWorkspaceData> {
  await ensureDataDir();
  const wsId = await getActiveWorkspaceId(userId);
  const filePath = path.join(DATA_DIR, `${wsId}.json`);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as UserWorkspaceData;
  } catch {
    if (wsId.startsWith("org_")) {
      return createEmptyOrgWorkspace(wsId, userId);
    }
    return createEmptyWorkspace(userId);
  }
}

async function writeWorkspace(data: UserWorkspaceData): Promise<void> {
  await ensureDataDir();
  data.storage = computeStorageStats(data);
  const wsId = data.workspaceId || data.userId;
  const filePath = path.join(DATA_DIR, `${wsId}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

async function getOrSeedWorkspace(user: UserSession): Promise<UserWorkspaceData> {
  const wsId = await getActiveWorkspaceId(user.id);
  let data = await readWorkspace(user.id);
  if (wsId.startsWith("org_")) {
    if (!data.seeded) {
      const orgName = wsId === "org_democorp" ? "Veridex Enterprise Demo" : "Veridex Forensic University";
      data = createSeedOrgWorkspace(wsId, orgName, user.id, user.name);
      await writeWorkspace(data);
    }
  } else {
    if (!data.seeded && data.cases.length === 0 && data.evidence.length === 0) {
      data = createSeedWorkspace(user.id, user.name);
      await writeWorkspace(data);
    }
  }
  data.storage = computeStorageStats(data);
  return data;
}

function assertWorkspacePermission(user: UserSession, data: UserWorkspaceData) {
  if (data.isOrg) {
    const isMember = data.members?.some((m) => m.userId === user.id);
    if (!isMember) {
      throw new Error("Unauthorized access to organization workspace");
    }
  } else {
    if (user.id !== data.userId) {
      throw new Error("Unauthorized access to personal workspace");
    }
  }
}

function checkWorkspaceRBAC(user: UserSession, data: UserWorkspaceData, requiredPermission: string): boolean {
  if (!data.isOrg) return true;
  const member = data.members?.find((m) => m.userId === user.id);
  if (!member) return false;
  if (member.status !== "ACTIVE") return false;

  const rolePermissions: Record<string, string[]> = {
    OWNER: ["read", "write", "delete", "admin", "billing", "security"],
    ADMINISTRATOR: ["read", "write", "delete", "admin", "billing"],
    SECURITY_ADMINISTRATOR: ["read", "write", "security"],
    MANAGER: ["read", "write", "delete"],
    INVESTIGATOR: ["read", "write"],
    ANALYST: ["read", "write"],
    FACULTY: ["read", "write"],
    RESEARCHER: ["read", "write"],
    VIEWER: ["read"],
    GUEST: ["read"]
  };

  const permissions = rolePermissions[member.role] || [];
  return permissions.includes(requiredPermission);
}

function assertWorkspaceRBAC(user: UserSession, data: UserWorkspaceData, requiredPermission: string) {
  assertWorkspacePermission(user, data);
  if (!checkWorkspaceRBAC(user, data, requiredPermission)) {
    throw new Error(`Unauthorized: Missing required permission [${requiredPermission}]`);
  }
}

export async function getDashboardData(user: UserSession): Promise<DashboardData> {
  const data = await getOrSeedWorkspace(user);
  const cases = enrichCasesWithCounts(data);
  const pinnedCaseIds = new Set(
    data.pinnedItems.filter((p) => p.itemType === "CASE").map((p) => p.itemId)
  );

  return {
    welcomeName: user.name,
    subscriptionTier: user.subscriptionTier,
    creditsRemaining: user.creditsRemaining,
    creditsUsed: user.creditsUsed,
    monthlyAllocation: user.monthlyAllocation,
    nextResetDate: user.nextResetDate,
    storage: data.storage,
    recentActivity: data.activities.slice(0, 15),
    recentCases: cases.slice(0, 5),
    recentEvidence: data.evidence.filter((e) => e.status === "ACTIVE").slice(0, 6),
    recentReports: data.reports.slice(0, 5),
    pinnedCases: cases.filter((c) => pinnedCaseIds.has(c.id)),
    openInvestigations: cases.filter((c) => ["OPEN", "IN_PROGRESS", "WAITING"].includes(c.status)).length,
    completedInvestigations: cases.filter((c) => c.status === "COMPLETED").length,
    unassignedEvidenceCount: data.evidence.filter((e) => !e.caseId && e.status === "ACTIVE").length,
  };
}

export async function listEvidence(user: UserSession, filters: EvidenceFilters = {}): Promise<EvidenceItem[]> {
  const data = await getOrSeedWorkspace(user);
  const enriched = data.evidence.map((e) => {
    const caseItem = data.cases.find((c) => c.id === e.caseId);
    return { ...e, caseTitle: caseItem?.title };
  });
  return filterEvidence(enriched, filters).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getEvidence(user: UserSession, evidenceId: string): Promise<EvidenceItem | null> {
  const data = await getOrSeedWorkspace(user);
  const item = data.evidence.find((e) => e.id === evidenceId);
  if (!item) return null;
  assertWorkspaceRBAC(user, data, "read");
  const caseItem = data.cases.find((c) => c.id === item.caseId);
  return { ...item, caseTitle: caseItem?.title };
}

export async function createEvidence(user: UserSession, input: CreateEvidenceInput): Promise<EvidenceItem> {
  const data = await getOrSeedWorkspace(user);
  assertWorkspaceRBAC(user, data, "write");
  if (input.caseId) {
    const caseItem = data.cases.find((c) => c.id === input.caseId);
    if (!caseItem) throw new Error("Case not found");
  }

  const now = nowIso();
  const item: EvidenceItem = {
    id: generateId("evd"),
    title: input.title,
    modality: input.modality,
    fileHash: input.fileHash,
    fileSizeBytes: input.fileSizeBytes,
    caseId: input.caseId,
    caseTitle: input.caseId ? data.cases.find((c) => c.id === input.caseId)?.title : undefined,
    userId: user.id,
    analysisStatus: "PENDING",
    status: "ACTIVE",
    favorite: false,
    version: 1,
    creditsUsed: 0,
    notes: input.notes,
    tags: input.tags ?? [],
    uploaderName: user.name,
    originalFilename: input.originalFilename,
    mimeType: input.mimeType,
    storageLocation: "local-vault",
    analysisHistory: [],
    createdAt: now,
    updatedAt: now,
  };

  data.evidence.unshift(item);
  addActivity(data, {
    userId: user.id,
    action: "UPLOAD",
    title: `Uploaded ${item.title}`,
    caseId: item.caseId,
    evidenceId: item.id,
  });

  if (input.caseId) {
    const activities = data.caseActivities[input.caseId] ?? [];
    activities.unshift({
      id: generateId("ca"),
      caseId: input.caseId,
      userId: user.id,
      userName: user.name,
      action: "EVIDENCE_ADDED",
      details: { evidenceId: item.id, evidenceTitle: item.title },
      createdAt: now,
    });
    data.caseActivities[input.caseId] = activities;
  }

  await writeWorkspace(data);
  return item;
}

export async function updateEvidence(
  user: UserSession,
  evidenceId: string,
  input: UpdateEvidenceInput
): Promise<EvidenceItem> {
  const data = await getOrSeedWorkspace(user);
  const index = data.evidence.findIndex((e) => e.id === evidenceId);
  if (index === -1) throw new Error("Evidence not found");

  const item = data.evidence[index];
  assertWorkspaceRBAC(user, data, "write");

  const oldCaseId = item.caseId;
  const updated: EvidenceItem = {
    ...item,
    ...input,
    caseId: input.caseId === null ? undefined : input.caseId ?? item.caseId,
    updatedAt: nowIso(),
  };

  if (input.caseId !== undefined) {
    updated.caseTitle = input.caseId
      ? data.cases.find((c) => c.id === input.caseId)?.title
      : undefined;
    addActivity(data, {
      userId: user.id,
      action: "EVIDENCE_MOVED",
      title: `Moved ${updated.title}`,
      caseId: updated.caseId,
      evidenceId: updated.id,
    });
  }

  data.evidence[index] = updated;
  await writeWorkspace(data);
  return updated;
}

export async function deleteEvidence(user: UserSession, evidenceId: string): Promise<void> {
  const data = await getOrSeedWorkspace(user);
  const item = data.evidence.find((e) => e.id === evidenceId);
  if (!item) throw new Error("Evidence not found");
  assertWorkspaceRBAC(user, data, "delete");
  data.evidence = data.evidence.filter((e) => e.id !== evidenceId);
  await writeWorkspace(data);
}

export async function listCases(user: UserSession, filters: CaseFilters = {}): Promise<CaseItem[]> {
  const data = await getOrSeedWorkspace(user);
  let cases = enrichCasesWithCounts(data);

  if (filters.query) {
    const q = filters.query.toLowerCase();
    cases = cases.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.caseNumber.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  if (filters.status) cases = cases.filter((c) => c.status === filters.status);
  if (filters.priority) cases = cases.filter((c) => c.priority === filters.priority);
  if (filters.category) cases = cases.filter((c) => c.category === filters.category);

  return cases.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export async function getCase(user: UserSession, caseId: string) {
  const data = await getOrSeedWorkspace(user);
  const caseItem = data.cases.find((c) => c.id === caseId);
  if (!caseItem) return null;
  assertWorkspaceRBAC(user, data, "read");

  const enriched = enrichCasesWithCounts(data).find((c) => c.id === caseId)!;
  const evidence = data.evidence.filter((e) => e.caseId === caseId);
  const reports = data.reports.filter((r) => r.caseId === caseId);
  const activities = data.caseActivities[caseId] ?? [];
  const notes = data.caseNotes[caseId] ?? [];
  const comments = data.caseComments[caseId] ?? [];
  const members = data.caseMembers[caseId] ?? [];

  return { case: enriched, evidence, reports, activities, notes, comments, members };
}

export async function createCase(user: UserSession, input: CreateCaseInput): Promise<CaseItem> {
  const data = await getOrSeedWorkspace(user);
  const now = nowIso();
  const caseItem: CaseItem = {
    id: generateId("case"),
    caseNumber: generateCaseNumber(),
    title: input.title,
    description: input.description,
    status: input.status ?? "OPEN",
    priority: input.priority ?? "MEDIUM",
    category: input.category ?? "RESEARCH",
    visibility: input.visibility ?? "PRIVATE",
    dueDate: input.dueDate,
    tags: input.tags ?? [],
    userId: user.id,
    organizationId: user.organizationId,
    evidenceCount: 0,
    reportCount: 0,
    createdAt: now,
    updatedAt: now,
  };

  data.cases.unshift(caseItem);
  data.caseMembers[caseItem.id] = [
    { id: generateId("cm"), caseId: caseItem.id, userId: user.id, userName: user.name, role: "OWNER", invitedAt: now },
  ];
  data.caseActivities[caseItem.id] = [
    {
      id: generateId("ca"),
      caseId: caseItem.id,
      userId: user.id,
      userName: user.name,
      action: "CASE_CREATE",
      details: { title: caseItem.title },
      createdAt: now,
    },
  ];

  addActivity(data, {
    userId: user.id,
    action: "CASE_CREATE",
    title: `Created case: ${caseItem.title}`,
    caseId: caseItem.id,
  });

  await writeWorkspace(data);
  return caseItem;
}

export async function updateCase(
  user: UserSession,
  caseId: string,
  input: Partial<CreateCaseInput> & { status?: CaseItem["status"] }
): Promise<CaseItem> {
  const data = await getOrSeedWorkspace(user);
  const index = data.cases.findIndex((c) => c.id === caseId);
  if (index === -1) throw new Error("Case not found");
  assertWorkspaceRBAC(user, data, "write");

  const now = nowIso();
  const updated = { ...data.cases[index], ...input, updatedAt: now };
  data.cases[index] = updated;

  const activities = data.caseActivities[caseId] ?? [];
  activities.unshift({
    id: generateId("ca"),
    caseId,
    userId: user.id,
    userName: user.name,
    action: input.status ? "CASE_STATUS" : "CASE_UPDATE",
    details: input as Record<string, unknown>,
    createdAt: now,
  });
  data.caseActivities[caseId] = activities;

  await writeWorkspace(data);
  return enrichCasesWithCounts(data).find((c) => c.id === caseId)!;
}

export async function getActivity(user: UserSession, limit = 30) {
  const data = await getOrSeedWorkspace(user);
  return data.activities.slice(0, limit);
}

export async function togglePin(user: UserSession, itemType: PinnedItem["itemType"], itemId: string): Promise<boolean> {
  const data = await getOrSeedWorkspace(user);
  const existing = data.pinnedItems.find(
    (p) => p.userId === user.id && p.itemType === itemType && p.itemId === itemId
  );

  if (existing) {
    data.pinnedItems = data.pinnedItems.filter((p) => p.id !== existing.id);
    await writeWorkspace(data);
    return false;
  }

  data.pinnedItems.push({
    id: generateId("pin"),
    userId: user.id,
    itemType,
    itemId,
    caseId: itemType === "CASE" ? itemId : undefined,
    pinnedAt: nowIso(),
  });
  await writeWorkspace(data);
  return true;
}

export async function addCaseNote(user: UserSession, caseId: string, content: string, title?: string): Promise<CaseNote> {
  const data = await getOrSeedWorkspace(user);
  const caseItem = data.cases.find((c) => c.id === caseId);
  if (!caseItem) throw new Error("Case not found");
  assertWorkspaceRBAC(user, data, "write");

  const now = nowIso();
  const note: CaseNote = { id: generateId("note"), caseId, userId: user.id, title, content, createdAt: now, updatedAt: now };
  data.caseNotes[caseId] = [...(data.caseNotes[caseId] ?? []), note];
  await writeWorkspace(data);
  return note;
}

export async function addCaseComment(user: UserSession, caseId: string, content: string, parentId?: string): Promise<CaseComment> {
  const data = await getOrSeedWorkspace(user);
  const caseItem = data.cases.find((c) => c.id === caseId);
  if (!caseItem) throw new Error("Case not found");
  assertWorkspaceRBAC(user, data, "write");

  const now = nowIso();
  const comment: CaseComment = {
    id: generateId("cmt"),
    caseId,
    userId: user.id,
    userName: user.name,
    content,
    parentId,
    resolved: false,
    reactions: {},
    createdAt: now,
    updatedAt: now,
  };
  data.caseComments[caseId] = [...(data.caseComments[caseId] ?? []), comment];
  await writeWorkspace(data);
  return comment;
}

export async function getStorageStats(user: UserSession) {
  const data = await getOrSeedWorkspace(user);
  return data.storage;
}

export { getOrSeedWorkspace };
