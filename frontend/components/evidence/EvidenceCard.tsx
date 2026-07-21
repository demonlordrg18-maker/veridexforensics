/**
 * Evidence Card Component
 */

"use client";

import Link from "next/link";
import { Badge } from "@/components/shared";
import type { Evidence } from "@/lib/types";
import { formatDate, formatFileSize, EVIDENCE_MODALITIES } from "@/lib/utils";
import { FileIcon, Star } from "lucide-react";

export interface EvidenceCardProps {
  evidence: Evidence;
  onSelect?: (evidenceId: string) => void;
}

export function EvidenceCard({ evidence, onSelect }: EvidenceCardProps) {
  const icon = {
    image: "🖼️",
    video: "🎬",
    audio: "🎵",
    pdf: "📄",
    document: "📝",
    text: "📋",
    url: "🔗",
    screenshot: "📸",
    archive: "📦",
  }[evidence.modality] || "📁";

  return (
    <Link
      href={`/evidence/${evidence.id}`}
      onClick={(e) => {
        if (onSelect) {
          e.preventDefault();
          onSelect(evidence.id);
        }
      }}
      className="block p-4 bg-slate-900 border border-deepslate rounded-lg hover:border-amber-signal/30 transition-all"
    >
      {/* Icon & Title */}
      <div className="flex items-start justify-between mb-2">
        <div className="text-2xl">{icon}</div>
        {evidence.favorite && <Star size={16} className="text-amber-signal fill-amber-signal" />}
      </div>

      {/* Title */}
      <h4 className="text-sm font-medium text-white truncate mb-1">{evidence.title}</h4>

      {/* Meta */}
      <div className="text-xs text-slate-500 space-y-1">
        <p>{formatDate(evidence.createdAt, "relative")}</p>
        {evidence.fileSizeBytes && <p>{formatFileSize(evidence.fileSizeBytes)}</p>}
      </div>

      {/* Confidence */}
      {evidence.confidence !== undefined && (
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400">Confidence</span>
            <span className="text-white">{(evidence.confidence * 100).toFixed(0)}%</span>
          </div>
          <div className="h-1.5 bg-deepslate rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-signal"
              style={{ width: `${evidence.confidence * 100}%` }}
            />
          </div>
        </div>
      )}
    </Link>
  );
}
