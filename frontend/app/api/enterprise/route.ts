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
    if (!wsId.startsWith("org_")) {
      return NextResponse.json({ error: "Not an organization workspace" }, { status: 400 });
    }

    const filePath = path.join(DATA_DIR, `${wsId}.json`);
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw);

    return NextResponse.json({
      name: data.workspaceName,
      slug: data.workspaceId,
      logoUrl: data.orgLogo,
      industry: data.orgIndustry,
      description: data.orgDescription,
      domain: data.orgDomain,
      billingOwnerId: data.billingOwnerId,
      primaryContact: data.primaryContact,
      createdDate: data.createdDate,
      storage: data.storage,
      billingSettings: data.billingSettings,
      securitySettings: data.securitySettings
    });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to load org details");
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const wsId = await getActiveWorkspaceId(session.id);
    if (!wsId.startsWith("org_")) {
      return NextResponse.json({ error: "Not an organization workspace" }, { status: 400 });
    }

    const body = await request.json();
    const filePath = path.join(DATA_DIR, `${wsId}.json`);
    const raw = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(raw);

    // Update settings
    if (body.name) data.workspaceName = body.name;
    if (body.description !== undefined) data.orgDescription = body.description;
    if (body.industry) data.orgIndustry = body.industry;
    if (body.domain) data.orgDomain = body.domain;

    if (body.securitySettings) {
      data.securitySettings = { ...data.securitySettings, ...body.securitySettings };
    }

    if (body.billingSettings) {
      data.billingSettings = { ...data.billingSettings, ...body.billingSettings };
    }

    // Add activity log
    const now = new Date().toISOString();
    data.activities.unshift({
      id: `act_${Date.now()}`,
      userId: session.id,
      action: "CASE_UPDATE",
      title: "Updated organization settings",
      createdAt: now
    });

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    return NextResponse.json({ success: true, workspaceName: data.workspaceName });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to save settings");
  }
}
