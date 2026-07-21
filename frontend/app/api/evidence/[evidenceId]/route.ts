/**
 * Evidence Detail API Routes
 * GET /api/evidence/[evidenceId]
 * PUT /api/evidence/[evidenceId]
 * DELETE /api/evidence/[evidenceId]
 */

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { evidenceId: string } }) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const evidence = await prisma.evidence.findUnique({
      where: { id: params.evidenceId },
      include: { tags: true, metadata: true, versions: true },
    });

    if (!evidence || evidence.userId !== session.user.id) {
      return NextResponse.json({ error: "Evidence not found" }, { status: 404 });
    }

    return NextResponse.json(evidence);
  } catch (error) {
    console.error("Evidence GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { evidenceId: string } }) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const evidence = await prisma.evidence.findUnique({ where: { id: params.evidenceId } });
    if (!evidence || evidence.userId !== session.user.id) {
      return NextResponse.json({ error: "Evidence not found" }, { status: 404 });
    }

    const data = await req.json();
    const updated = await prisma.evidence.update({
      where: { id: params.evidenceId },
      data,
      include: { tags: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Evidence PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { evidenceId: string } }) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const evidence = await prisma.evidence.findUnique({ where: { id: params.evidenceId } });
    if (!evidence || evidence.userId !== session.user.id) {
      return NextResponse.json({ error: "Evidence not found" }, { status: 404 });
    }

    await prisma.evidence.delete({ where: { id: params.evidenceId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Evidence DELETE error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
