import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getSessionFromCookies, unauthorizedResponse, errorResponse } from "@/lib/workspace/api-auth";
import { getActiveWorkspaceId } from "@/lib/workspace/server-store";

const DATA_DIR = path.join(process.cwd(), ".workspace-data");

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const wsId = await getActiveWorkspaceId(session.id);
    const body = await request.json();
    const filePath = path.join(DATA_DIR, `${wsId}.json`);
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw);

    const { modality, content, filename } = body;
    if (!modality) {
      return NextResponse.json({ error: "modality is required" }, { status: 400 });
    }

    // Determine cost in credits
    const costMap: Record<string, number> = {
      text: 5,
      image: 10,
      audio: 15,
      video: 25,
      pdf: 8,
      url: 5,
      metadata: 3
    };

    const cost = costMap[modality] || 5;

    // Check credits
    let creditsRemaining = 0;
    if (data.isOrg && data.billingSettings) {
      creditsRemaining = data.billingSettings.creditsRemaining ?? 0;
    } else {
      // In personal workspaces, credits are stored in the user session or mock profile.
      // Since they are mocked in AuthProvider, we can read/write them from the workspace too.
      creditsRemaining = data.creditsRemaining ?? 200;
    }

    if (creditsRemaining < cost) {
      return NextResponse.json({ error: "Insufficient credit balance for this request." }, { status: 402 });
    }

    // Deduct credits
    if (data.isOrg && data.billingSettings) {
      data.billingSettings.creditsRemaining -= cost;
      data.billingSettings.creditsUsed = (data.billingSettings.creditsUsed || 0) + cost;
    } else {
      data.creditsRemaining = creditsRemaining - cost;
      data.creditsUsed = (data.creditsUsed || 0) + cost;
    }

    // Generate simulated verity index and details
    const verityIndex = parseFloat((0.2 + Math.random() * 0.75).toFixed(2));
    const confidence = parseFloat((0.85 + Math.random() * 0.14).toFixed(2));
    const fileHash = `sha256_${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`;

    const analysisResponse = {
      success: true,
      modality,
      verityIndex,
      confidence,
      fileHash,
      creditsDeducted: cost,
      analysisTimestamp: new Date().toISOString(),
      forensicMetrics: {
        modelFingerprint: verityIndex > 0.6 ? "GAN_SYNTHETIC_V4" : "CAMERA_ORIGINAL",
        spectralAnomalies: verityIndex > 0.6 ? ["High-frequency noise gap at 12kHz", "Blockiness artifact index: 8.5"] : [],
        metadataAuthenticity: "DEFENSIBLE_HASH_VERIFIED"
      }
    };

    // Log the API call in activity logs
    data.activities.unshift({
      id: `act_${Date.now()}`,
      userId: session.id,
      action: "ANALYSIS",
      title: `API Request: ${modality.toUpperCase()} Verification`,
      description: `Credits deducted: ${cost}. Verity Index: ${Math.round(verityIndex * 100)}%`,
      createdAt: new Date().toISOString()
    });

    // Also trigger webhook simulation
    if (data.webhooks && data.webhooks.length > 0) {
      const webhook = data.webhooks[0]; // Take first webhook
      const webhookPayload = JSON.stringify({
        event: "analysis.completed",
        workspaceId: wsId,
        result: analysisResponse
      });

      const newLog = {
        id: `wlog_${Date.now()}`,
        webhookId: webhook.id,
        event: "analysis.completed",
        payload: webhookPayload,
        statusCode: 200,
        response: "OK",
        timestamp: new Date().toISOString(),
        retryCount: 0
      };

      data.webhookLogs = [newLog, ...(data.webhookLogs || [])];
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    return NextResponse.json(analysisResponse);
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "API execution error");
  }
}
