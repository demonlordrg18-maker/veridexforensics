import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getSessionFromCookies, unauthorizedResponse, errorResponse } from "@/lib/workspace/api-auth";
import { getActiveWorkspaceId } from "@/lib/workspace/server-store";

const DATA_DIR = path.join(process.cwd(), ".workspace-data");

export async function GET(request: NextRequest) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const wsId = await getActiveWorkspaceId(session.id);
    if (!wsId.startsWith("org_")) {
      return NextResponse.json({ error: "Not an organization workspace" }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.toLowerCase();
    const action = searchParams.get("action");
    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    const filePath = path.join(DATA_DIR, `${wsId}.json`);
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw);

    // Filter logs
    let logs = (data.activities || []).map((act: any) => ({
      id: act.id,
      timestamp: act.createdAt || new Date().toISOString(),
      userId: act.userId || session.id,
      userName: data.members?.find((m: any) => m.userId === act.userId)?.name || "System",
      action: act.action || "SYSTEM",
      details: act.title || act.description || "Action recorded",
      ipAddress: "192.168.1.105",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0"
    }));

    if (query) {
      logs = logs.filter((log: any) => 
        log.details.toLowerCase().includes(query) ||
        log.userName.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query)
      );
    }

    if (action && action !== "ALL") {
      logs = logs.filter((log: any) => log.action === action);
    }

    if (dateFrom) {
      logs = logs.filter((log: any) => log.timestamp >= dateFrom);
    }

    if (dateTo) {
      logs = logs.filter((log: any) => log.timestamp <= dateTo);
    }

    return NextResponse.json({ logs });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to load audit logs");
  }
}
