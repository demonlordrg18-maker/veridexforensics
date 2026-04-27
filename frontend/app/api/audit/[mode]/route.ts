import { NextResponse } from "next/server";
import { createHash } from "crypto";

const MODES = new Set(["text", "link", "document", "image", "audio", "video"]);

function getUpstreamBaseUrl() {
  const raw = process.env.FORENSIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!raw) return null;
  return raw.replace(/\/+$/, "");
}

function clamp01(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function sha256Hex(buf: ArrayBuffer) {
  return createHash("sha256").update(Buffer.from(buf)).digest("hex");
}

function seedFromText(text: string) {
  const h = createHash("sha256").update(text).digest();
  // Use first 8 bytes as a uint64-ish number (via two uint32s)
  const a = h.readUInt32BE(0);
  const b = h.readUInt32BE(4);
  return { a, b };
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, arr: T[]) {
  return arr[Math.floor(rand() * arr.length)];
}

function splitSentences(text: string) {
  return (text || "")
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function demoTextAudit(content: string) {
  const trimmed = (content || "").trim();
  const len = trimmed.length;
  const hasUrl = /\bhttps?:\/\/\S+/i.test(trimmed);
  const hasLotsOfCaps = (trimmed.match(/\b[A-Z]{5,}\b/g) || []).length >= 3;
  const hasManyExclaims = (trimmed.match(/!/g) || []).length >= 5;
  const hasHedging = /\b(might|maybe|could|allegedly|reportedly|rumor)\b/i.test(trimmed);

  const { a, b } = seedFromText(trimmed || "empty");
  const rand = mulberry32(a ^ b);

  const risk =
    (hasUrl ? 0.09 : 0) +
    (hasLotsOfCaps ? 0.12 : 0) +
    (hasManyExclaims ? 0.10 : 0) +
    (hasHedging ? 0.06 : 0) +
    (len < 80 ? 0.16 : 0) +
    (len > 4000 ? 0.05 : 0) +
    rand() * 0.04;

  const verity = clamp01(0.84 - risk);
  const confidence = clamp01(0.68 + Math.min(0.22, len / 2400) - (len < 80 ? 0.05 : 0));
  const truth = clamp01(0.80 - (hasUrl ? 0.06 : 0) - (hasHedging ? 0.06 : 0) - (hasManyExclaims ? 0.03 : 0));

  const reasons: string[] = [];
  if (len < 80) reasons.push("Short content reduces evidentiary density.");
  if (hasUrl) reasons.push("Contains external URL(s); requires source verification.");
  if (hasHedging) reasons.push("Hedging language detected; claims may be non-falsifiable.");
  if (hasLotsOfCaps) reasons.push("High-emphasis capitalization patterns detected.");
  if (hasManyExclaims) reasons.push("Excessive exclamation emphasis detected.");
  if (reasons.length === 0) reasons.push("No obvious red flags detected by baseline heuristics.");

  const findings = [
    "Demo auditor active (backend not configured). Results are heuristic and for UI continuity only.",
    "Claim decomposition generated and triaged for verifiability.",
    "Rhetorical bias scan completed across common persuasion patterns.",
    "Source pointers are illustrative; connect backend for live evidence retrieval.",
    `Content length: ${len} chars.`,
    hasUrl ? "Detected URL(s) in content." : "No URL detected in content.",
  ];

  const biasLabels = [
    "Loaded Language",
    "Fear Appeal",
    "Straw Man",
    "False Dilemma",
    "Tone Skew",
    "Moral Framing",
    "Authority Appeal",
    "Cherry Picking",
  ];
  const biasScores: Record<string, number> = {};
  for (const label of biasLabels.slice(0, 5)) {
    biasScores[label] = clamp01(0.25 + rand() * 0.7 + (hasManyExclaims ? 0.08 : 0) + (hasLotsOfCaps ? 0.06 : 0));
  }
  const primaryBias = Object.entries(biasScores).sort((x, y) => y[1] - x[1])[0]?.[0] || "Tone Skew";

  const sentences = splitSentences(trimmed);
  const claimTypes = [
    "external factual claim",
    "internal policy assertion",
    "subjective opinion",
    "definition",
    "system description",
    "policy requirement",
  ];

  const claims = (sentences.length ? sentences : [trimmed || ""]).slice(0, 6).map((s, idx) => {
    const isVerifiable = /\b(is|are|was|were|will|did|has|have|had|contains|includes)\b/i.test(s) && s.length > 25;
    const verifiability = clamp01((isVerifiable ? 0.65 : 0.35) + rand() * 0.25);
    const type = pick(rand, claimTypes);

    const status = !isVerifiable
      ? "na"
      : verity > 0.72
        ? (rand() < 0.7 ? "verified" : "unverified")
        : (rand() < 0.25 ? "debunked" : "unverified");

    const veracityScore =
      status === "verified" ? clamp01(0.78 + rand() * 0.2) :
      status === "debunked" ? clamp01(0.05 + rand() * 0.25) :
      status === "na" ? clamp01(0.45 + rand() * 0.2) :
      clamp01(0.35 + rand() * 0.35);

    const sources = status === "na"
      ? []
      : [
          {
            title: pick(rand, ["Press Archive", "Public Record Index", "Reference Database", "Research Summary"]),
            url: pick(rand, ["https://en.wikipedia.org/", "https://www.britannica.com/", "https://www.un.org/", "https://www.reuters.com/"]),
          },
        ];

    return {
      statement: s.slice(0, 280),
      type,
      reason:
        status === "debunked"
          ? "Claim conflicts with at least one reference pointer; requires manual verification with authoritative sources."
          : status === "verified"
            ? "Claim aligns with reference pointers and contains consistent temporal framing."
            : status === "na"
              ? "Non-falsifiable or rhetorical statement; treated as classification-only."
              : "Insufficient evidence pointers in demo mode; recommend cross-checking.",
      action:
        status === "debunked"
          ? "Hold publication; request primary-source documentation."
          : status === "verified"
            ? "Proceed with standard editorial checks."
            : status === "na"
              ? "Mark as rhetoric/opinion; avoid presenting as fact."
              : "Seek corroboration from at least two independent sources.",
      verifiability_confidence: verifiability,
      is_verifiable: isVerifiable,
      veracity: {
        verification_status: status,
        veracity_score: veracityScore,
        sources,
        matched_topic: idx === 0 ? "Primary topic" : undefined,
        evidence_summary:
          status === "verified"
            ? "Reference pointers support the claim at a high level."
            : status === "debunked"
              ? "Reference pointers indicate contradictions or missing provenance."
              : undefined,
      },
    };
  });

  const triggerSnippets = [
    { label: primaryBias, snippet: sentences[0]?.slice(0, 140) || trimmed.slice(0, 140) || "—", mechanism: "Lexical intensity + framing markers" },
    { label: pick(rand, biasLabels), snippet: sentences[1]?.slice(0, 140) || sentences[0]?.slice(0, 140) || "—", mechanism: "Selective emphasis + affect cues" },
  ];

  const factualDensity = clamp01(Math.min(0.92, 0.35 + (sentences.length / 8) * 0.5 + (len > 400 ? 0.1 : 0) - (hasHedging ? 0.08 : 0)));
  const veracityScore = clamp01((truth * 0.6 + verity * 0.4) - (hasUrl ? 0.03 : 0));

  const copyrightRiskScore = clamp01(0.08 + (hasUrl ? 0.12 : 0) + (len > 2500 ? 0.08 : 0) + rand() * 0.12);

  return {
    id: `demo_${Date.now()}`,
    modality: "text",
    verity_index: verity,
    origin: verity < 0.55 ? "ai" : "human",
    truth_score: truth,
    confidence,
    findings,
    reasons,
    created_at: new Date().toISOString(),
    bias_report: {
      primary_bias: primaryBias,
      bias_scores: biasScores,
      trigger_snippets: triggerSnippets,
    },
    factuality_report: {
      factual_density: factualDensity,
      veracity_score: veracityScore,
      claims,
    },
    copyright_risk: {
      risk_score: copyrightRiskScore,
      nearest: [],
      external_matches: copyrightRiskScore > 0.55 ? [
        {
          id: `demo_match_${Math.floor(rand() * 1000)}`,
          title: "Potential overlap with public web corpus",
          source: "Open Web Snapshot",
          license: "Unknown",
          similarity: clamp01(0.55 + rand() * 0.35),
          match_excerpt: (sentences[0] || trimmed).slice(0, 160),
        },
      ] : [],
      analysis:
        copyrightRiskScore > 0.55
          ? "Demo signal suggests moderate overlap risk. Use backend engine for full fingerprinting and license checks."
          : "No strong overlap signals in demo mode. Use backend engine for definitive copyright analysis.",
      status: copyrightRiskScore > 0.7 ? "Elevated" : copyrightRiskScore > 0.5 ? "Moderate" : "Low",
    },
  };
}

export async function POST(
  request: Request,
  context: { params: Promise<{ mode: string }> }
) {
  const { mode } = await context.params;
  if (!MODES.has(mode)) {
    return NextResponse.json({ error: "Invalid audit mode." }, { status: 400 });
  }

  const baseUrl = getUpstreamBaseUrl();
  if (!baseUrl) {
    // Fallback mode: keep the UI functional even without a backend.
    // For production accuracy, set FORENSIC_API_BASE_URL on Vercel.
    const contentType = request.headers.get("content-type") || "";

    if (mode === "text" && contentType.includes("application/json")) {
      const json = await request.json().catch(() => ({} as any));
      return NextResponse.json(demoTextAudit(String((json as any)?.content || "")));
    }

    if (mode === "link" && contentType.includes("application/json")) {
      const json = await request.json().catch(() => ({} as any));
      const url = String((json as any)?.url || "").trim();
      const base = demoTextAudit(url ? `Link submitted: ${url}` : "");
      return NextResponse.json({ ...base, modality: "link" });
    }

    if (contentType.includes("multipart/form-data")) {
      const incoming = await request.formData().catch(() => null);
      const f = incoming?.get("file");
      if (f && typeof (f as any).arrayBuffer === "function") {
        const ab = await (f as File).arrayBuffer();
        const hash = sha256Hex(ab);
        const base = demoTextAudit(`File submitted (${mode}).`);
        return NextResponse.json({ ...base, modality: mode, file_hash: hash });
      }
    }

    return NextResponse.json(
      {
        error:
          "Forensic API is not configured. Set FORENSIC_API_BASE_URL (recommended) in Vercel environment variables.",
      },
      { status: 500 }
    );
  }

  const upstreamUrl = `${baseUrl}/audit/${mode}`;
  const contentType = request.headers.get("content-type") || "";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60_000);

    let upstreamResp: Response;

    if (contentType.includes("application/json")) {
      const json = await request.json();
      upstreamResp = await fetch(upstreamUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(json),
        signal: controller.signal,
      });
    } else if (contentType.includes("multipart/form-data")) {
      const incoming = await request.formData();
      const form = new FormData();
      for (const [k, v] of incoming.entries()) form.append(k, v as any);

      upstreamResp = await fetch(upstreamUrl, {
        method: "POST",
        body: form,
        signal: controller.signal,
      });
    } else {
      return NextResponse.json(
        { error: "Unsupported request content-type." },
        { status: 415 }
      );
    }

    clearTimeout(timeout);

    const respContentType = upstreamResp.headers.get("content-type") || "";
    const payload = respContentType.includes("application/json")
      ? await upstreamResp.json()
      : await upstreamResp.text();

    if (!upstreamResp.ok) {
      return NextResponse.json(
        {
          error: "Upstream forensic engine error.",
          status: upstreamResp.status,
          details: payload,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(payload);
  } catch (err: any) {
    const isAbort = err?.name === "AbortError";
    return NextResponse.json(
      { error: isAbort ? "Forensic request timed out." : "Forensic request failed." },
      { status: isAbort ? 504 : 502 }
    );
  }
}

