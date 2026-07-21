/**
 * Evidence Page (Vault)
 * Digital forensic evidence archive
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader, Dialog, Button, LoadingState, EmptyState, Skeleton } from "@/components/shared";
import { EvidenceCard } from "@/components/evidence";
import { useEvidence } from "@/lib/hooks";
import { Upload } from "lucide-react";

export default function EvidencePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { evidence, loading, listEvidence } = useEvidence();
  const [showUploadDialog, setShowUploadDialog] = useState(searchParams.get("upload") === "true");

  useEffect(() => {
    listEvidence({ limit: 100, offset: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 p-6 lg:p-8">
      <PageHeader
        title="Evidence Vault"
        description="Your forensic evidence archive"
        action={{
          label: "Upload Evidence",
          icon: <Upload size={16} />,
          onClick: () => setShowUploadDialog(true),
        }}
      />

      {loading ? (
        <Skeleton count={6} variant="card" />
      ) : evidence.length === 0 ? (
        <EmptyState
          title="No evidence uploaded"
          description="Upload your first piece of evidence to get started"
          action={{
            label: "Upload Evidence",
            onClick: () => setShowUploadDialog(true),
          }}
          icon="📦"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {evidence.map((item) => (
            <EvidenceCard
              key={item.id}
              evidence={item}
              onSelect={(id) => router.push(`/evidence/${id}`)}
            />
          ))}
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog
        open={showUploadDialog}
        onOpenChange={setShowUploadDialog}
        title="Upload Evidence"
        description="Add evidence to your vault"
        size="lg"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setShowUploadDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setShowUploadDialog(false)}>
              Upload
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {/* Drag & drop area */}
          <div
            className="border-2 border-dashed border-slate-600 rounded-lg p-12 text-center hover:border-amber-signal/50 transition-colors cursor-pointer"
            onDragOver={(e) => {
              e.preventDefault();
              e.currentTarget.classList.add("border-amber-signal/50");
            }}
            onDragLeave={(e) => {
              e.currentTarget.classList.remove("border-amber-signal/50");
            }}
          >
            <div className="text-4xl mb-3">📁</div>
            <p className="text-white font-medium">Drag files here</p>
            <p className="text-sm text-slate-400">or click to select</p>
          </div>

          {/* URL input */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Or enter a URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 bg-deepslate border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-signal"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
