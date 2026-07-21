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

    return NextResponse.json({ departments: data.departments || [] });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to load departments");
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

    const { action, id, name, adminId } = body;
    const now = new Date().toISOString();

    if (action === "create") {
      if (!name) {
        return NextResponse.json({ error: "Department name is required" }, { status: 400 });
      }

      const newDept = {
        id: `dept_${Math.random().toString(36).substring(2, 9)}`,
        name,
        adminId: adminId || session.id,
        memberIds: [session.id]
      };

      data.departments = [...(data.departments || []), newDept];
      
      data.activities.unshift({
        id: `act_${Date.now()}`,
        userId: session.id,
        action: "CASE_UPDATE",
        title: `Created department: ${name}`,
        createdAt: now
      });
    } else if (action === "update") {
      const idx = data.departments.findIndex((d: any) => d.id === id);
      if (idx !== -1) {
        data.departments[idx] = {
          ...data.departments[idx],
          name: name || data.departments[idx].name,
          adminId: adminId || data.departments[idx].adminId
        };
      }
    } else if (action === "delete") {
      data.departments = data.departments.filter((d: any) => d.id !== id);
      
      // Update members with this departmentId to undefined
      if (data.members) {
        data.members = data.members.map((m: any) => 
          m.departmentId === id ? { ...m, departmentId: undefined } : m
        );
      }
      
      data.activities.unshift({
        id: `act_${Date.now()}`,
        userId: session.id,
        action: "CASE_UPDATE",
        title: `Deleted department ID: ${id}`,
        createdAt: now
      });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    return NextResponse.json({ success: true, departments: data.departments });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to execute department action");
  }
}
