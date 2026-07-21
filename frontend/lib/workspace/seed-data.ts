import type { UserWorkspaceData } from "@/lib/types/workspace";
import { generateCaseNumber, generateId, nowIso } from "@/lib/workspace/utils";

export function createSeedWorkspace(userId: string, userName: string): UserWorkspaceData {
  const now = nowIso();
  const case1Id = generateId("case");
  const case2Id = generateId("case");
  const case3Id = generateId("case");

  const cases = [
    {
      id: case1Id,
      caseNumber: generateCaseNumber(),
      title: "Brussels Press Conference Verification",
      description: "Multimodal audit of leaked press conference footage and transcript alignment.",
      status: "IN_PROGRESS" as const,
      priority: "HIGH" as const,
      category: "MEDIA" as const,
      visibility: "PRIVATE" as const,
      tags: ["deepfake", "audio", "priority"],
      userId,
      evidenceCount: 3,
      reportCount: 1,
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      updatedAt: now,
    },
    {
      id: case2Id,
      caseNumber: generateCaseNumber(),
      title: "Corporate HR Document Review",
      description: "PDF authenticity verification for internal HR investigation.",
      status: "OPEN" as const,
      priority: "MEDIUM" as const,
      category: "HR" as const,
      visibility: "PRIVATE" as const,
      tags: ["pdf", "hr"],
      userId,
      evidenceCount: 2,
      reportCount: 0,
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      updatedAt: now,
    },
    {
      id: case3Id,
      caseNumber: generateCaseNumber(),
      title: "OSINT Social Media Thread Analysis",
      description: "URL and screenshot verification of viral social media claims.",
      status: "WAITING" as const,
      priority: "CRITICAL" as const,
      category: "OSINT" as const,
      visibility: "PRIVATE" as const,
      dueDate: new Date(Date.now() + 86400000 * 7).toISOString(),
      tags: ["osint", "url", "screenshot"],
      userId,
      evidenceCount: 1,
      reportCount: 1,
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      updatedAt: now,
    },
  ];

  const evidence = [
    {
      id: generateId("evd"),
      title: "Brussels Transcript Lip-Sync Audio",
      modality: "audio" as const,
      fileHash: "a3f5c8d2e1b9047f6a8c3d2e1b9047f6a8c3d2e1b9047f6a8c3d2e1b9047f6",
      fileSizeBytes: 4_850_000,
      caseId: case1Id,
      caseTitle: cases[0].title,
      userId,
      analysisStatus: "COMPLETED" as const,
      confidence: 0.88,
      status: "ACTIVE" as const,
      favorite: true,
      version: 1,
      creditsUsed: 8,
      tags: ["audio", "verified"],
      uploaderName: userName,
      originalFilename: "brussels_audio.wav",
      mimeType: "audio/wav",
      analysisHistory: [
        {
          id: generateId("ah"),
          modality: "audio",
          verityIndex: 0.88,
          confidence: 0.88,
          creditsUsed: 8,
          completedAt: now,
        },
      ],
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      updatedAt: now,
    },
    {
      id: generateId("evd"),
      title: "Press Release GAN Image",
      modality: "image" as const,
      fileHash: "b4e6d9c3f2a8158e7b9d4c3f2a8158e7b9d4c3f2a8158e7b9d4c3f2a8158",
      fileSizeBytes: 2_100_000,
      caseId: case1Id,
      caseTitle: cases[0].title,
      userId,
      analysisStatus: "COMPLETED" as const,
      confidence: 0.32,
      status: "ACTIVE" as const,
      favorite: false,
      version: 1,
      creditsUsed: 3,
      tags: ["image", "synthetic"],
      uploaderName: userName,
      originalFilename: "press_release.jpg",
      mimeType: "image/jpeg",
      analysisHistory: [],
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: now,
    },
    {
      id: generateId("evd"),
      title: "HR Policy Document Draft",
      modality: "pdf" as const,
      fileHash: "c5f7e0d4a3b9269f8c0e5d4a3b9269f8c0e5d4a3b9269f8c0e5d4a3b9269",
      fileSizeBytes: 890_000,
      caseId: case2Id,
      caseTitle: cases[1].title,
      userId,
      analysisStatus: "PENDING" as const,
      status: "ACTIVE" as const,
      favorite: false,
      version: 1,
      creditsUsed: 0,
      tags: ["pdf", "hr"],
      uploaderName: userName,
      originalFilename: "policy_draft.pdf",
      mimeType: "application/pdf",
      analysisHistory: [],
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      updatedAt: now,
    },
    {
      id: generateId("evd"),
      title: "Unassigned URL Capture",
      modality: "url" as const,
      fileHash: "d6a8f1e5b4c0370a9d1f6e5b4c0370a9d1f6e5b4c0370a9d1f6e5b4c0370",
      fileSizeBytes: 0,
      userId,
      analysisStatus: "PENDING" as const,
      status: "ACTIVE" as const,
      favorite: false,
      version: 1,
      creditsUsed: 0,
      tags: ["url", "unassigned"],
      uploaderName: userName,
      analysisHistory: [],
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      updatedAt: now,
    },
    {
      id: generateId("evd"),
      title: "Screenshot Thread Archive",
      modality: "screenshot" as const,
      fileHash: "e7b9a2f6c5d1481b0e2a7f6c5d1481b0e2a7f6c5d1481b0e2a7f6c5d1481",
      fileSizeBytes: 450_000,
      caseId: case3Id,
      caseTitle: cases[2].title,
      userId,
      analysisStatus: "COMPLETED" as const,
      confidence: 0.91,
      status: "ACTIVE" as const,
      favorite: true,
      version: 1,
      creditsUsed: 3,
      tags: ["screenshot", "osint"],
      uploaderName: userName,
      originalFilename: "thread_capture.png",
      mimeType: "image/png",
      analysisHistory: [],
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: now,
    },
  ];

  const reports = [
    {
      id: generateId("rpt"),
      title: "Brussels Audio Forensic Report",
      verityIndex: 0.88,
      truthScore: 0.85,
      confidence: 0.88,
      origin: "hybrid",
      evidenceId: evidence[0].id,
      caseId: case1Id,
      createdAt: now,
    },
    {
      id: generateId("rpt"),
      title: "OSINT Thread Verification Summary",
      verityIndex: 0.91,
      truthScore: 0.89,
      confidence: 0.91,
      origin: "human",
      evidenceId: evidence[4].id,
      caseId: case3Id,
      createdAt: new Date(Date.now() - 43200000).toISOString(),
    },
  ];

  const activities = [
    {
      id: generateId("act"),
      userId,
      action: "UPLOAD" as const,
      title: "Uploaded Brussels Transcript Lip-Sync Audio",
      description: "Audio evidence added to Brussels Press Conference case",
      caseId: case1Id,
      evidenceId: evidence[0].id,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: generateId("act"),
      userId,
      action: "ANALYSIS" as const,
      title: "Completed audio forensic analysis",
      description: "Verity Index: 88/100",
      caseId: case1Id,
      evidenceId: evidence[0].id,
      createdAt: new Date(Date.now() - 3500000).toISOString(),
    },
    {
      id: generateId("act"),
      userId,
      action: "CASE_CREATE" as const,
      title: "Created OSINT Social Media Thread Analysis",
      caseId: case3Id,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: generateId("act"),
      userId,
      action: "REPORT" as const,
      title: "Generated OSINT Thread Verification Summary",
      caseId: case3Id,
      createdAt: new Date(Date.now() - 43200000).toISOString(),
    },
  ];

  const pinnedItems = [
    {
      id: generateId("pin"),
      userId,
      itemType: "CASE" as const,
      itemId: case1Id,
      caseId: case1Id,
      pinnedAt: now,
    },
    {
      id: generateId("pin"),
      userId,
      itemType: "CASE" as const,
      itemId: case3Id,
      caseId: case3Id,
      pinnedAt: now,
    },
  ];

  const data: UserWorkspaceData = {
    userId,
    cases,
    evidence,
    reports,
    activities,
    pinnedItems,
    caseActivities: {
      [case1Id]: [
        {
          id: generateId("ca"),
          caseId: case1Id,
          userId,
          userName,
          action: "EVIDENCE_ADDED",
          details: { evidenceTitle: evidence[0].title },
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: generateId("ca"),
          caseId: case1Id,
          userId,
          userName,
          action: "ANALYSIS",
          details: { verityIndex: 0.88 },
          createdAt: new Date(Date.now() - 3500000).toISOString(),
        },
      ],
    },
    caseNotes: {
      [case1Id]: [
        {
          id: generateId("note"),
          caseId: case1Id,
          userId,
          title: "Initial Assessment",
          content: "## Findings\n\nAudio lip-sync anomaly detected at 02:14 timestamp. Recommend spectral analysis follow-up.",
          createdAt: now,
          updatedAt: now,
        },
      ],
    },
    caseComments: {},
    caseMembers: {
      [case1Id]: [{ id: generateId("cm"), caseId: case1Id, userId, userName, role: "OWNER", invitedAt: now }],
      [case2Id]: [{ id: generateId("cm"), caseId: case2Id, userId, userName, role: "OWNER", invitedAt: now }],
      [case3Id]: [{ id: generateId("cm"), caseId: case3Id, userId, userName, role: "OWNER", invitedAt: now }],
    },
    storage: {
      totalBytes: 0,
      evidenceCount: 0,
      caseCount: 0,
      reportCount: 0,
      byModality: {},
      largestFiles: [],
      lastCalculated: now,
    },
    seeded: true,
  };

  return data;
}

export function createEmptyWorkspace(userId: string): UserWorkspaceData {
  return {
    userId,
    cases: [],
    evidence: [],
    reports: [],
    activities: [],
    pinnedItems: [],
    caseActivities: {},
    caseNotes: {},
    caseComments: {},
    caseMembers: {},
    storage: {
      totalBytes: 0,
      evidenceCount: 0,
      caseCount: 0,
      reportCount: 0,
      byModality: {},
      largestFiles: [],
      lastCalculated: nowIso(),
    },
    seeded: false,
  };
}

export function createSeedOrgWorkspace(orgId: string, orgName: string, userId: string, userName: string): UserWorkspaceData {
  const now = nowIso();
  const case1Id = generateId("case");
  const case2Id = generateId("case");

  const cases = [
    {
      id: case1Id,
      caseNumber: generateCaseNumber(),
      title: "Enterprise Audit: Synthetic Email Campaign Detection",
      description: "Auditing internal email campaigns to identify potential generative model signatures.",
      status: "IN_PROGRESS" as const,
      priority: "HIGH" as const,
      category: "ENTERPRISE" as const,
      visibility: "ORGANIZATION" as const,
      tags: ["text", "generative-ai", "internal-audit"],
      userId,
      organizationId: orgId,
      evidenceCount: 1,
      reportCount: 1,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: now,
    },
    {
      id: case2Id,
      caseNumber: generateCaseNumber(),
      title: "Regulatory Compliance Document Verification",
      description: "Verification of metadata and structure of submitted research documents.",
      status: "OPEN" as const,
      priority: "CRITICAL" as const,
      category: "RESEARCH" as const,
      visibility: "ORGANIZATION" as const,
      tags: ["pdf", "compliance"],
      userId,
      organizationId: orgId,
      evidenceCount: 1,
      reportCount: 0,
      createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
      updatedAt: now,
    }
  ];

  const evidence = [
    {
      id: generateId("evd"),
      title: "Synthetic Newsletter Content Draft",
      modality: "text" as const,
      fileHash: "e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5",
      fileSizeBytes: 45000,
      caseId: case1Id,
      caseTitle: cases[0].title,
      userId,
      analysisStatus: "COMPLETED" as const,
      confidence: 0.94,
      status: "ACTIVE" as const,
      favorite: true,
      version: 1,
      creditsUsed: 10,
      tags: ["text", "synthetic"],
      uploaderName: userName,
      originalFilename: "newsletter_draft.txt",
      mimeType: "text/plain",
      analysisHistory: [],
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
      updatedAt: now,
    },
    {
      id: generateId("evd"),
      title: "Submitted Research Document PDF",
      modality: "pdf" as const,
      fileHash: "f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6",
      fileSizeBytes: 1800000,
      caseId: case2Id,
      caseTitle: cases[1].title,
      userId,
      analysisStatus: "PENDING" as const,
      status: "ACTIVE" as const,
      favorite: false,
      version: 1,
      creditsUsed: 0,
      tags: ["pdf", "compliance"],
      uploaderName: "Admin User",
      originalFilename: "regulatory_compliance_v2.pdf",
      mimeType: "application/pdf",
      analysisHistory: [],
      createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      updatedAt: now,
    }
  ];

  const reports = [
    {
      id: generateId("rpt"),
      title: "Synthetic Newsletter Content Audit Report",
      verityIndex: 0.94,
      truthScore: 0.06,
      confidence: 0.98,
      origin: "ai",
      evidenceId: evidence[0].id,
      caseId: case1Id,
      createdAt: now,
    }
  ];

  const activities = [
    {
      id: generateId("act"),
      userId,
      action: "UPLOAD" as const,
      title: "Uploaded Synthetic Newsletter Content Draft",
      caseId: case1Id,
      evidenceId: evidence[0].id,
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: generateId("act"),
      userId,
      action: "ANALYSIS" as const,
      title: "Completed text analysis on newsletter draft",
      caseId: case1Id,
      evidenceId: evidence[0].id,
      createdAt: now,
    }
  ];

  const pinnedItems = [
    {
      id: generateId("pin"),
      userId,
      itemType: "CASE" as const,
      itemId: case1Id,
      caseId: case1Id,
      pinnedAt: now,
    }
  ];

  return {
    userId,
    workspaceId: orgId,
    workspaceName: orgName,
    isOrg: true,
    cases,
    evidence,
    reports,
    activities,
    pinnedItems,
    caseActivities: {
      [case1Id]: [
        {
          id: generateId("ca"),
          caseId: case1Id,
          userId,
          userName,
          action: "EVIDENCE_ADDED",
          details: { evidenceTitle: evidence[0].title },
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
        }
      ]
    },
    caseNotes: {},
    caseComments: {},
    caseMembers: {
      [case1Id]: [{ id: generateId("cm"), caseId: case1Id, userId, userName, role: "OWNER", invitedAt: now }],
      [case2Id]: [{ id: generateId("cm"), caseId: case2Id, userId, userName, role: "OWNER", invitedAt: now }],
    },
    storage: {
      totalBytes: 1845000,
      evidenceCount: 2,
      caseCount: 2,
      reportCount: 1,
      byModality: { text: 1, pdf: 1 },
      largestFiles: [
        { id: evidence[1].id, title: evidence[1].title, fileSizeBytes: 1800000 },
        { id: evidence[0].id, title: evidence[0].title, fileSizeBytes: 45000 }
      ],
      lastCalculated: now,
    },
    seeded: true,
    orgLogo: "",
    orgIndustry: "Cybersecurity & Forensic Auditing",
    orgDescription: "Enterprise trust coordination hub for forensic discovery.",
    orgDomain: orgId === "org_democorp" ? "democorp.com" : "veridexuni.edu",
    billingOwnerId: userId,
    primaryContact: userName,
    createdDate: new Date(Date.now() - 86400000 * 30).toISOString(),
    departments: [
      { id: "dept_hr", name: "Human Resources", adminId: userId, memberIds: [userId] },
      { id: "dept_legal", name: "Legal & Compliance", adminId: userId, memberIds: [userId] },
      { id: "dept_sec", name: "Security Operations", adminId: userId, memberIds: [userId] }
    ],
    members: [
      { userId, name: userName, email: "analyst@veridex.ai", role: "OWNER", status: "ACTIVE", joinedAt: new Date(Date.now() - 86400000 * 30).toISOString(), departmentId: "dept_sec" },
      { userId: "usr_alice", name: "Alice Security", email: "alice@democorp.com", role: "SECURITY_ADMINISTRATOR", status: "ACTIVE", joinedAt: new Date(Date.now() - 86400000 * 20).toISOString(), departmentId: "dept_sec" },
      { userId: "usr_bob", name: "Bob Investigator", email: "bob@democorp.com", role: "INVESTIGATOR", status: "ACTIVE", joinedAt: new Date(Date.now() - 86400000 * 15).toISOString(), departmentId: "dept_legal" },
      { userId: "usr_charlie", name: "Charlie Pending", email: "charlie@democorp.com", role: "ANALYST", status: "PENDING", joinedAt: new Date(Date.now() - 86400000 * 1).toISOString() }
    ],
    securitySettings: {
      twoFactorRequired: true,
      passwordPolicy: { minLength: 12, requireSpecial: true },
      sessionTimeout: 30,
      ipRestrictions: "192.168.1.0/24, 10.0.0.0/8",
      domainVerified: true,
    },
    billingSettings: {
      subscriptionTier: "ENTERPRISE",
      subscriptionStatus: "active",
      billingEmail: "billing@democorp.com",
      paymentMethod: "Visa ending in 4242",
      invoiceHistory: [
        { id: "inv_12345", date: new Date(Date.now() - 86400000 * 10).toISOString(), amount: 2499.00, status: "PAID" },
        { id: "inv_12344", date: new Date(Date.now() - 86400000 * 40).toISOString(), amount: 2499.00, status: "PAID" }
      ]
    },
    apiKeys: [
      { id: "key_1", name: "Production Auditing Key", keyPrefix: "vdx_live_prod", keyHash: "sha256_hash_1", scopes: ["evidence:read", "evidence:write", "reports:read"], createdAt: new Date(Date.now() - 86400000 * 12).toISOString(), status: "ACTIVE" },
      { id: "key_2", name: "Staging Testing Key", keyPrefix: "vdx_test_stage", keyHash: "sha256_hash_2", scopes: ["evidence:read", "cases:read"], createdAt: new Date(Date.now() - 86400000 * 5).toISOString(), status: "ACTIVE" }
    ],
    webhooks: [
      { id: "wh_1", url: "https://api.democorp.com/veridex-webhook", description: "SIEM Sync Webhook", secret: "whsec_democorp_secret", events: ["analysis.completed", "credits.low"], createdAt: new Date(Date.now() - 86400000 * 8).toISOString(), status: "ACTIVE" }
    ],
    webhookLogs: [
      { id: "wlog_1", webhookId: "wh_1", event: "analysis.completed", payload: JSON.stringify({ evidenceId: "evd_1", status: "COMPLETED", verityIndex: 0.94 }), statusCode: 200, response: "OK", timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), retryCount: 0 },
      { id: "wlog_2", webhookId: "wh_1", event: "credits.low", payload: JSON.stringify({ orgId: "org_democorp", creditsRemaining: 45 }), statusCode: 500, response: "Internal Server Error", timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), retryCount: 2 }
    ]
  };
}

export function createEmptyOrgWorkspace(orgId: string, userId: string): UserWorkspaceData {
  return {
    userId,
    workspaceId: orgId,
    workspaceName: orgId === "org_democorp" ? "Veridex Enterprise Demo" : "Veridex Forensic University",
    isOrg: true,
    cases: [],
    evidence: [],
    reports: [],
    activities: [],
    pinnedItems: [],
    caseActivities: {},
    caseNotes: {},
    caseComments: {},
    caseMembers: {},
    storage: {
      totalBytes: 0,
      evidenceCount: 0,
      caseCount: 0,
      reportCount: 0,
      byModality: {},
      largestFiles: [],
      lastCalculated: nowIso(),
    },
    seeded: false,
    orgLogo: "",
    orgIndustry: "General Enterprise",
    orgDescription: "",
    orgDomain: "",
    billingOwnerId: userId,
    primaryContact: "",
    createdDate: nowIso(),
    departments: [],
    members: [],
    securitySettings: {
      twoFactorRequired: false,
      passwordPolicy: { minLength: 8, requireSpecial: false },
      sessionTimeout: 60,
      ipRestrictions: "",
      domainVerified: false,
    },
    billingSettings: {
      subscriptionTier: "FREE",
      subscriptionStatus: "active",
      billingEmail: "",
      paymentMethod: "",
      invoiceHistory: []
    },
    apiKeys: [],
    webhooks: [],
    webhookLogs: []
  };
}
