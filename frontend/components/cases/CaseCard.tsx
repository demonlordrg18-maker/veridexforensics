/**
 * Case Card Component
 */

"use client";

import Link from "next/link";
import { Badge, Button } from "@/components/shared";
import type { Case } from "@/lib/types";
import { formatDate, CASE_STATUSES, CASE_PRIORITIES, STATUS_COLORS, PRIORITY_COLORS } from "@/lib/utils";
import { FolderKanban, Calendar, AlertCircle } from "lucide-react";

export interface CaseCardProps {
  case: Case;
  onSelect?: (caseId: string) => void;
}

export function CaseCard({ case: caseItem, onSelect }: CaseCardProps) {
  return (
    <Link
      href={`/cases/${caseItem.id}`}
      onClick={(e) => {
        if (onSelect) {
          e.preventDefault();
          onSelect(caseItem.id);
        }
      }}
      className="block p-6 bg-slate-900 border border-deepslate rounded-lg hover:border-amber-signal/30 transition-all hover:shadow-lg hover:shadow-amber-signal/10"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <FolderKanban size={20} className="text-amber-signal flex-shrink-0" />
          <h3 className="text-sm font-semibold text-white truncate">{caseItem.title}</h3>
        </div>
        <Badge variant="outline" className="ml-2 flex-shrink-0">
          {CASE_STATUSES[caseItem.status as keyof typeof CASE_STATUSES]}
        </Badge>
      </div>

      {/* Description */}
      {caseItem.description && (
        <p className="text-xs text-slate-400 line-clamp-2 mb-3">{caseItem.description}</p>
      )}

      {/* Meta */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          {formatDate(caseItem.updatedAt, "short")}
        </div>
        <div className="flex items-center gap-1">
          <AlertCircle size={14} />
          {CASE_PRIORITIES[caseItem.priority as keyof typeof CASE_PRIORITIES]}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-deepslate">
        <span>{caseItem.evidenceCount || 0} evidence</span>
        <span>{caseItem.reportCount || 0} reports</span>
      </div>
    </Link>
  );
}
