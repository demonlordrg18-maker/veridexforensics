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

function demoTextAudit(content: string) {
  const trimmed = (content || "").trim();
  const len = trimmed.length;
  const hasUrl = /\bhttps?:\/\/\S+/i.test(trimmed);
  const hasLotsOfCaps = (trimmed.match(/\b[A-Z]{5,}\b/g) || []).length >= 3;
  const hasManyExclaims = (trimmed.match(/!/g) || []).length >= 5;
  const hasHedging = /\b(might|maybe|could|allegedly|reportedly|rumor)\b/i.test(trimmed);

  const risk =
    (hasUrl ? 0.08 : 0) +
    (hasLotsOfCaps ? 0.12 : 0) +
    (hasManyExclaims ? 0.12 : 0) +
    (hasHedging ? 0.06 : 0) +
    (len < 80 ? 0.15 : 0);

  const verity = clamp01(0.82 - risk);
  const confidence = clamp01(0.65 + Math.min(0.25, len / 2000));
  const truth = clamp01(0.78 - (hasUrl ? 0.05 : 0) - (hasHedging ? 0.05 : 0));

  const reasons: string[] = [];
  if (len < 80) reasons.push("Short content reduces evidentiary density.");
  if (hasUrl) reasons.push("Contains external URL(s); requires source verification.");
  if (hasHedging) reasons.push("Hedging language detected; claims may be non-falsifiable.");
  if (hasLotsOfCaps) reasons.push("High-emphasis capitalization patterns detected.");
  if (hasManyExclaims) reasons.push("Excessive exclamation emphasis detected.");
  if (reasons.length === 0) reasons.push("No obvious red flags detected by baseline heuristics.");

  const findings = [
    "Demo auditor active (backend not configured). Results are heuristic and for UI continuity only.",
    `Content length: ${len} chars.`,
    hasUrl ? "Detected URL(s) in content." : "No URL detected in content.",
  ];

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

