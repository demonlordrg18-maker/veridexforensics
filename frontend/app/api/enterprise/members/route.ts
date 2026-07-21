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

    return NextResponse.json({ members: data.members || [] });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to load members");
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

    const { action, userId, email, name, role, departmentId } = body;

    const now = new Date().toISOString();

    if (action === "invite") {
      if (!email || !name) {
        return NextResponse.json({ error: "Email and Name are required" }, { status: 400 });
      }
      
      const newMember = {
        userId: `usr_${Math.random().toString(36).substring(2, 9)}`,
        name,
        email,
        role: role || "ANALYST",
        status: "PENDING",
        joinedAt: now,
        departmentId
      };
      
      data.members = [...(data.members || []), newMember];
      
      data.activities.unshift({
        id: `act_${Date.now()}`,
        userId: session.id,
        action: "CASE_UPDATE",
        title: `Invited user ${email}`,
        createdAt: now
      });
    } else if (action === "update") {
      const idx = data.members.findIndex((m: any) => m.userId === userId);
      if (idx !== -1) {
        data.members[idx] = {
          ...data.members[idx],
          role: role || data.members[idx].role,
          departmentId: departmentId !== undefined ? departmentId : data.members[idx].departmentId
        };
      }
    } else if (action === "suspend") {
      const idx = data.members.findIndex((m: any) => m.userId === userId);
      if (idx !== -1) {
        data.members[idx].status = data.members[idx].status === "SUSPENDED" ? "ACTIVE" : "SUSPENDED";
        data.activities.unshift({
          id: `act_${Date.now()}`,
          userId: session.id,
          action: "CASE_UPDATE",
          title: `${data.members[idx].status === "SUSPENDED" ? "Suspended" : "Un-suspended"} user ${data.members[idx].email}`,
          createdAt: now
        });
      }
    } else if (action === "remove") {
      data.members = data.members.filter((m: any) => m.userId !== userId);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    return NextResponse.json({ success: true, members: data.members });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to execute action");
  }
}
