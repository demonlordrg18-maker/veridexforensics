// Veridex Forensics - configurable credit economy engine.

export type Modality = "text" | "image" | "pdf" | "audio" | "video" | "link" | "metadata" | "document";

export interface CreditRateCardItem {
  modality: Modality;
  cost: number;
  label: string;
  description: string;
}

const envNumber = (key: string, fallback: number) => {
  const raw = process.env[key] || process.env[`NEXT_PUBLIC_${key}`];
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
};

export const CREDIT_RATE_CARD: Record<Modality, CreditRateCardItem> = {
  text: { modality: "text", cost: envNumber("CREDIT_COST_TEXT", 1), label: "Text Analysis", description: "Linguistic entropy, perplexity and claim extraction." },
  image: { modality: "image", cost: envNumber("CREDIT_COST_IMAGE", 3), label: "Image Forensic", description: "Error level analysis (ELA) and GAN artifact detection." },
  pdf: { modality: "pdf", cost: envNumber("CREDIT_COST_PDF", 4), label: "PDF Document Scan", description: "PDF metadata, embedded image extraction and text audit." },
  audio: { modality: "audio", cost: envNumber("CREDIT_COST_AUDIO", 8), label: "Audio Audit", description: "Spectral voice synthesis scan and vocoder artifact check." },
  video: { modality: "video", cost: envNumber("CREDIT_COST_VIDEO", 15), label: "Video Verify", description: "Deepfake frame temporal consistency and lip-sync audit." },
  link: { modality: "link", cost: envNumber("CREDIT_COST_URL", 2), label: "URL Audit", description: "Live web article extraction and fact cross-referencing." },
  metadata: { modality: "metadata", cost: envNumber("CREDIT_COST_METADATA", 1), label: "Metadata Inspection", description: "Cryptographic SHA-256 hash and header metadata scan." },
  document: { modality: "document", cost: envNumber("CREDIT_COST_PDF", 4), label: "PDF Document Scan", description: "PDF metadata, embedded image extraction and text audit." },
};

export interface CreditTransactionRecord {
  id: string;
  userId: string;
  action: string;
  creditsUsed: number;
  remaining: number;
  timestamp: string;
  caseId?: string;
  reportId?: string;
  ipAddress?: string;
  deviceInfo?: string;
}

export function getCreditCost(modality: Modality): number {
  return CREDIT_RATE_CARD[modality]?.cost || 1;
}

export function canAffordAudit(userRemainingCredits: number, modality: Modality): boolean {
  return userRemainingCredits >= getCreditCost(modality);
}

export function calculatePostTransactionBalance(currentBalance: number, modality: Modality) {
  const cost = getCreditCost(modality);
  if (currentBalance < cost) {
    return {
      ok: false,
      cost,
      remaining: currentBalance,
      reason: `This ${modality} audit requires ${cost} credits.`,
    };
  }
  return { ok: true, cost, remaining: currentBalance - cost };
}

export function calculateMonthlyResetBalance(monthlyAllocation: number, bonusCredits: number) {
  return Math.max(0, monthlyAllocation) + Math.max(0, bonusCredits);
}

const TRANSACTIONS_KEY = "veridex_credit_transactions";

export function getCreditTransactions(userId: string): CreditTransactionRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`${TRANSACTIONS_KEY}_${userId}`);
    if (!raw) return getInitialMockTransactions(userId);
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read credit transactions:", err);
    return [];
  }
}

export function recordCreditTransaction(
  userId: string,
  action: string,
  creditsUsed: number,
  remaining: number,
  caseId?: string,
  reportId?: string
): CreditTransactionRecord {
  const newTx: CreditTransactionRecord = {
    id: `tx_${Math.random().toString(36).substring(2, 9)}`,
    userId,
    action,
    creditsUsed,
    remaining,
    timestamp: new Date().toISOString(),
    caseId,
    reportId,
    ipAddress: "127.0.0.1 (Node Session)",
    deviceInfo: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
  };

  if (typeof window !== "undefined") {
    const existing = getCreditTransactions(userId);
    const updated = [newTx, ...existing];
    localStorage.setItem(`${TRANSACTIONS_KEY}_${userId}`, JSON.stringify(updated));
  }

  return newTx;
}

function getInitialMockTransactions(userId: string): CreditTransactionRecord[] {
  return [
    {
      id: "tx_1092",
      userId,
      action: "Audio Audit (Brussels Lip-Sync)",
      creditsUsed: 8,
      remaining: 450,
      timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    },
    {
      id: "tx_1091",
      userId,
      action: "Text Claim Audit",
      creditsUsed: 1,
      remaining: 458,
      timestamp: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
    },
    {
      id: "tx_1090",
      userId,
      action: "Monthly Credit Replenishment",
      creditsUsed: 0,
      remaining: 459,
      timestamp: new Date(Date.now() - 3600 * 1000 * 24 * 5).toISOString(),
    },
  ];
}
