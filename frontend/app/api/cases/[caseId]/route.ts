/**
 * Case Detail API Routes
 * GET /api/cases/[caseId]
 * PUT /api/cases/[caseId]
 * DELETE /api/cases/[caseId]
 */

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id || session.user.email;
    const { caseId } = await params;
    const caseData = await prisma.case.findUnique({
      where: { id: caseId },
      include: {
        members: { include: { user: { select: { id: true, name: true, email: true, image: true } } } },
        evidence: true,
        reports: true,
      },
    });

    if (!caseData || caseData.userId !== userId) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    return NextResponse.json(caseData);
  } catch (error) {
    console.error("Case GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id || session.user.email;
    const { caseId } = await params;
    const caseData = await prisma.case.findUnique({ where: { id: caseId } });
    if (!caseData || caseData.userId !== userId) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    const data = await req.json();
    const updated = await prisma.case.update({
      where: { id: caseId },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Case PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ caseId: string }> }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id || session.user.email;
    const { caseId } = await params;
    const caseData = await prisma.case.findUnique({ where: { id: caseId } });
    if (!caseData || caseData.userId !== userId) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    await prisma.case.delete({ where: { id: caseId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Case DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
