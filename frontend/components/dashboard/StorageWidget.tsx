/**
 * Storage Widget
 */

"use client";

import { Widget } from "./Widget";
import { formatFileSize, EVIDENCE_MODALITIES } from "@/lib/utils";
import type { StorageSummary, EvidenceModality } from "@/lib/types";

export interface StorageWidgetProps {
  storage?: StorageSummary;
  maxStorage?: number;
  loading?: boolean;
}

export function StorageWidget({ storage, maxStorage = 5368709120, loading }: StorageWidgetProps) {
  if (loading || !storage) {
    return <Widget title="Storage"><div className="text-sm text-slate-400">Loading...</div></Widget>;
  }

  const storageUsed = Number(storage.totalBytes);
  const percentage = (storageUsed / maxStorage) * 100;

  return (
    <Widget title="Storage">
      <div className="space-y-4">
        {/* Usage */}
        <div>
          <div className="text-sm font-medium text-white">{formatFileSize(storageUsed)}</div>
          <p className="text-xs text-slate-400">of {formatFileSize(maxStorage)}</p>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-deepslate rounded-full overflow-hidden">
          <div
            className={`h-full ${percentage > 80 ? "bg-red-500" : "bg-blue-500"}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        {/* Breakdown */}
        <div className="text-xs text-slate-400 space-y-1">
          <p>{storage.evidenceCount} files</p>
          <p>{storage.caseCount} cases</p>
        </div>
      </div>
    </Widget>
  );
}
