/**
 * Recent Cases Widget
 */

"use client";

import Link from "next/link";
import { Widget } from "./Widget";
import { Badge } from "@/components/shared";
import type { Case } from "@/lib/types";
import { formatDate, CASE_STATUSES, STATUS_COLORS } from "@/lib/utils";

export interface RecentCasesWidgetProps {
  cases: Case[];
  loading?: boolean;
  onViewAll?: () => void;
}

export function RecentCasesWidget({ cases, loading, onViewAll }: RecentCasesWidgetProps) {
  return (
    <Widget title="Recent Cases" action={{ label: "View all", onClick: onViewAll || (() => {}) }}>
      <div className="space-y-3">
        {loading ? (
          <div className="text-sm text-slate-400">Loading...</div>
        ) : cases.length === 0 ? (
          <p className="text-sm text-slate-400">No cases yet. Create your first investigation.</p>
        ) : (
          cases.slice(0, 5).map((caseItem) => (
            <Link
              key={caseItem.id}
              href={`/cases/${caseItem.id}`}
              className="block p-3 rounded-lg bg-deepslate/50 hover:bg-deepslate transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">{caseItem.title}</h4>
                  <p className="text-xs text-slate-400 mt-1">{formatDate(caseItem.updatedAt, "relative")}</p>
                </div>
                <Badge variant="outline" className="whitespace-nowrap">
                  {CASE_STATUSES[caseItem.status as keyof typeof CASE_STATUSES]}
                </Badge>
              </div>
            </Link>
          ))
        )}
      </div>
    </Widget>
  );
}
