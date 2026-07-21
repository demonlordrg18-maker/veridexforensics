/**
 * Cases API Routes
 * GET /api/cases - List cases
 * POST /api/cases - Create case
 * GET /api/cases/[caseId] - Get case
 * PUT /api/cases/[caseId] - Update case
 * DELETE /api/cases/[caseId] - Delete case
 */

import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const offset = parseInt(url.searchParams.get("offset") || "0");
    const status = url.searchParams.get("status");
    const sort = url.searchParams.get("sort") || "updatedAt";
    const order = url.searchParams.get("order") || "desc";

    const userId = (session.user as any).id || session.user.email;
    const where: any = { userId };
    if (status) {
      where.status = { in: status.split(",") };
    }

    const cases = await prisma.case.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { [sort]: order },
      include: {
        _count: {
          select: { evidence: true, reports: true, members: true },
        },
      },
    });

    const total = await prisma.case.count({ where });

    return NextResponse.json({
      items: cases.map((c: any) => ({
        ...c,
        evidenceCount: c._count.evidence,
        reportCount: c._count.reports,
        memberCount: c._count.members,
      })),
      pagination: { total, limit, offset, hasMore: offset + limit < total },
    });
  } catch (error) {
    console.error("Cases GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const userId = (session.user as any).id || session.user.email;
    const caseNumber = `CASE-${Date.now()}`;
    const newCase = await prisma.case.create({
      data: {
        ...data,
        caseNumber,
        userId,
      },
    });

    return NextResponse.json(newCase, { status: 201 });
  } catch (error) {
    console.error("Cases POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
