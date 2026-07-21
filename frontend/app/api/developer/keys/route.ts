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

    return NextResponse.json({ apiKeys: data.apiKeys || [] });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to load keys");
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

    const { action, keyId, name, scopes } = body;
    const now = new Date().toISOString();

    if (action === "create") {
      if (!name) {
        return NextResponse.json({ error: "Key label name is required" }, { status: 400 });
      }

      // Generate a mock API key
      const keyPrefix = `vdx_${wsId.startsWith("org_") ? "live" : "test"}_${Math.random().toString(36).substring(2, 6)}`;
      const rawSecret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const generatedKey = `${keyPrefix}_${rawSecret}`;
      
      const newKey = {
        id: `key_${Date.now()}`,
        name,
        keyPrefix,
        keyHash: `hash_${Math.random().toString(36).substring(2, 9)}`, // simulator mock
        scopes: scopes || ["evidence:read"],
        createdAt: now,
        status: "ACTIVE" as const,
        rawKey: generatedKey // Exposed only once upon creation
      };

      data.apiKeys = [...(data.apiKeys || []), newKey];

      data.activities.unshift({
        id: `act_${Date.now()}`,
        userId: session.id,
        action: "CASE_UPDATE",
        title: `Created API key: ${name}`,
        createdAt: now
      });

      await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
      return NextResponse.json({ success: true, key: newKey });
    } else if (action === "revoke") {
      const idx = data.apiKeys.findIndex((k: any) => k.id === keyId);
      if (idx !== -1) {
        data.apiKeys[idx].status = "REVOKED";
        data.activities.unshift({
          id: `act_${Date.now()}`,
          userId: session.id,
          action: "CASE_UPDATE",
          title: `Revoked API key: ${data.apiKeys[idx].name}`,
          createdAt: now
        });
      }
    } else {
      return NextResponse.json({ error: "Invalid key action" }, { status: 400 });
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    return NextResponse.json({ success: true, apiKeys: data.apiKeys });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to execute key action");
  }
}
