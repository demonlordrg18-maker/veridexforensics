import { NextResponse } from "next/server";

const MODES = new Set(["text", "link", "document", "image", "audio", "video"]);

function getUpstreamBaseUrl() {
  const raw = process.env.FORENSIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!raw) return null;
  return raw.replace(/\/+$/, "");
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

