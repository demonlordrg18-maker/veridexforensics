/**
 * Dashboard Page
 * Professional headquarters for forensic investigations
 */

"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DashboardGrid,
  WelcomeWidget,
  CreditsWidget,
  RecentCasesWidget,
  StorageWidget,
  QuickActionsWidget,
} from "@/components/dashboard";
import { PageHeader, LoadingState, Skeleton } from "@/components/shared";
import { useCases, useDashboardStats, useStorageSummary } from "@/lib/hooks";
import { useAuth } from "@/components/auth/AuthProvider";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cases, loading: casesLoading, listCases } = useCases();
  const { stats, loading: statsLoading } = useDashboardStats();
  const { storage, loading: storageLoading } = useStorageSummary();

  useEffect(() => {
    listCases({ limit: 5, offset: 0 });
  }, []);

  const handleNewCase = () => {
    router.push("/cases?new=true");
  };

  const handleUploadEvidence = () => {
    router.push("/evidence?upload=true");
  };

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Dashboard"
          description="Your forensic investigation headquarters"
        />
        <button
          onClick={() => router.push("/dashboard/platform")}
          className="rounded border border-amber-500/20 bg-amber-500/5 px-3 py-1.5 text-xs text-amber-500 hover:bg-amber-500 hover:text-black font-mono transition-all"
        >
          [ Global OS Admin Panel ]
        </button>
      </div>

      {statsLoading || casesLoading || storageLoading ? (
        <Skeleton count={6} variant="card" />
      ) : (
        <DashboardGrid>
          <WelcomeWidget userName={user?.name || "User"} />
          <CreditsWidget
            remaining={stats?.creditsRemaining || 0}
            monthly={50}
            nextReset={new Date(Date.now() + 24 * 60 * 60 * 1000)}
            onPurchase={() => router.push("/billing")}
          />
          <StorageWidget
            storage={storage || undefined}
            loading={storageLoading}
          />
          <QuickActionsWidget
            onUpload={handleUploadEvidence}
            onNewCase={handleNewCase}
            onAnalyze={() => router.push("/audit")}
            onReport={() => router.push("/reports")}
          />
          <RecentCasesWidget
            cases={cases}
            loading={casesLoading}
            onViewAll={() => router.push("/cases")}
          />
        </DashboardGrid>
      )}
    </div>
  );
}

