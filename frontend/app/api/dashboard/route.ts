/**
 * Dashboard API Routes
 * GET /api/dashboard/stats - Dashboard statistics
 * GET /api/dashboard/activity - Recent activity
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
    const pathname = url.pathname;

    if (pathname.includes("/stats")) {
      // Get dashboard stats
      const userId = (session.user as any).id || session.user.email;
      const [casesCount, evidenceCount, reportsCount, creditsUsed] = await Promise.all([
        prisma.case.count({ where: { userId } }),
        prisma.evidence.count({ where: { userId } }),
        prisma.report.count({ where: { userId } }),
        prisma.creditTransaction.aggregate({
          where: { userId },
          _sum: { creditsUsed: true },
        }),
      ]);

      const credits = await prisma.creditBalance.findUnique({
        where: { userId },
      });

      return NextResponse.json({
        casesCreated: casesCount,
        evidenceUploaded: evidenceCount,
        analysisCompleted: 0, // Would need to track analysis events
        reportsGenerated: reportsCount,
        creditsUsed: creditsUsed._sum.creditsUsed || 0,
        creditsRemaining: credits?.creditsRemaining || 0,
        storageUsed: 0, // Would calculate from evidence files
      });
    } else if (pathname.includes("/activity")) {
      // Get recent activity
      const limit = parseInt(url.searchParams.get("limit") || "20");
      
      const userId = (session.user as any).id || session.user.email;
      const activity = await prisma.activityLog.findMany({
        where: { userId },
        take: limit,
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(activity);
    }

    return NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
