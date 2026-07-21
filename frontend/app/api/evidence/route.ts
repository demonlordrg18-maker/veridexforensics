/**
 * Evidence API Routes
 * GET /api/evidence - List evidence
 * POST /api/evidence - Create evidence
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
    const caseId = url.searchParams.get("caseId");
    const query = url.searchParams.get("query");
    const sort = url.searchParams.get("sort") || "createdAt";
    const order = url.searchParams.get("order") || "desc";

    const userId = (session.user as any).id || session.user.email;
    const where: any = { userId };
    if (caseId) where.caseId = caseId;
    if (query) {
      where.OR = [
        { title: { contains: query, mode: "insensitive" } },
        { notes: { contains: query, mode: "insensitive" } },
      ];
    }

    const evidence = await prisma.evidence.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { [sort]: order },
      include: { tags: true },
    });

    const total = await prisma.evidence.count({ where });

    return NextResponse.json({
      items: evidence,
      pagination: { total, limit, offset, hasMore: offset + limit < total },
    });
  } catch (error) {
    console.error("Evidence GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id || session.user.email;
    const data = await req.json();
    const newEvidence = await prisma.evidence.create({
      data: {
        ...data,
        userId,
      },
      include: { tags: true },
    });

    return NextResponse.json(newEvidence, { status: 201 });
  } catch (error) {
    console.error("Evidence POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
