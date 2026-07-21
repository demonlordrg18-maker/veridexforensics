import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getSessionFromCookies, unauthorizedResponse, errorResponse } from "@/lib/workspace/api-auth";
import { getActiveWorkspaceId } from "@/lib/workspace/server-store";

const DATA_DIR = path.join(process.cwd(), ".workspace-data");

export async function GET() {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const wsId = await getActiveWorkspaceId(session.id);
    const filePath = path.join(DATA_DIR, `${wsId}.json`);
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw);

    return NextResponse.json({
      webhooks: data.webhooks || [],
      webhookLogs: data.webhookLogs || []
    });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to load webhook details");
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const wsId = await getActiveWorkspaceId(session.id);
    const body = await request.json();
    const filePath = path.join(DATA_DIR, `${wsId}.json`);
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw);

    const { action, webhookId, url, description, events, logId } = body;
    const now = new Date().toISOString();

    if (action === "create") {
      if (!url) {
        return NextResponse.json({ error: "Webhook endpoint URL is required" }, { status: 400 });
      }

      const secret = `whsec_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`;
      const newWebhook = {
        id: `wh_${Date.now()}`,
        url,
        description: description || "SIEM Event Listener",
        secret,
        events: events || ["analysis.completed"],
        createdAt: now,
        status: "ACTIVE" as const
      };

      data.webhooks = [...(data.webhooks || []), newWebhook];

      data.activities.unshift({
        id: `act_${Date.now()}`,
        userId: session.id,
        action: "CASE_UPDATE",
        title: `Registered webhook endpoint: ${url}`,
        createdAt: now
      });
    } else if (action === "toggle") {
      const idx = data.webhooks.findIndex((w: any) => w.id === webhookId);
      if (idx !== -1) {
        data.webhooks[idx].status = data.webhooks[idx].status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      }
    } else if (action === "delete") {
      data.webhooks = data.webhooks.filter((w: any) => w.id !== webhookId);
      data.webhookLogs = data.webhookLogs?.filter((l: any) => l.webhookId !== webhookId) || [];
    } else if (action === "replay") {
      // Find log entry and simulate sending again
      const logIdx = data.webhookLogs?.findIndex((l: any) => l.id === logId);
      if (logIdx !== -1 && data.webhookLogs) {
        const log = data.webhookLogs[logIdx];
        
        // Create new log representing replayed request
        const replayedLog = {
          id: `wlog_${Date.now()}`,
          webhookId: log.webhookId,
          event: log.event,
          payload: log.payload,
          statusCode: 200,
          response: "OK (Replayed)",
          timestamp: now,
          retryCount: log.retryCount + 1
        };

        data.webhookLogs.unshift(replayedLog);
      }
    } else {
      return NextResponse.json({ error: "Invalid webhook action" }, { status: 400 });
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    return NextResponse.json({
      success: true,
      webhooks: data.webhooks,
      webhookLogs: data.webhookLogs || []
    });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to execute webhook action");
  }
}
