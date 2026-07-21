/**
 * Cases Page
 * Manage forensic investigations
 */

"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PageHeader, Dialog, Button, LoadingState, EmptyState, Skeleton } from "@/components/shared";
import { CaseCard } from "@/components/cases";
import { useCases } from "@/lib/hooks";
import { Plus } from "lucide-react";

export default function CasesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-obsidian text-slate-300 p-6 lg:p-8">
        <PageHeader title="Cases" description="Manage your forensic investigations" />
        <Skeleton count={6} variant="card" />
      </div>
    }>
      <CasesContent />
    </Suspense>
  );
}

function CasesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { cases, loading, listCases, createCase } = useCases();
  const [showNewDialog, setShowNewDialog] = useState(searchParams.get("new") === "true");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM" as const,
    category: "RESEARCH" as const,
  });

  useEffect(() => {
    listCases({ limit: 100, offset: 0 });
  }, []);

  const handleCreateCase = async () => {
    if (!formData.title.trim()) return;

    try {
      await createCase(formData);
      setShowNewDialog(false);
      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        category: "RESEARCH",
      });
    } catch (error) {
      console.error("Failed to create case:", error);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 p-6 lg:p-8">
      <PageHeader
        title="Cases"
        description="Manage your forensic investigations"
        action={{
          label: "New Case",
          icon: <Plus size={16} />,
          onClick: () => setShowNewDialog(true),
        }}
      />

      {loading ? (
        <Skeleton count={6} variant="card" />
      ) : cases.length === 0 ? (
        <EmptyState
          title="No cases yet"
          description="Create your first forensic investigation to get started"
          action={{
            label: "Create Case",
            onClick: () => setShowNewDialog(true),
          }}
          icon="🔍"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((caseItem) => (
            <CaseCard
              key={caseItem.id}
              case={caseItem}
              onSelect={(id) => router.push(`/cases/${id}` as any)}
            />
          ))}
        </div>
      )}

      {/* New Case Dialog */}
      <Dialog
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
        title="Create New Case"
        description="Start a new forensic investigation"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setShowNewDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateCase}
              disabled={!formData.title.trim()}
            >
              Create Case
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Case Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter case title"
              className="w-full px-3 py-2 bg-deepslate border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-signal"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Description (optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the investigation"
              rows={3}
              className="w-full px-3 py-2 bg-deepslate border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-signal"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as any,
                  })
                }
                className="w-full px-3 py-2 bg-deepslate border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-signal"
              >
                <option>LOW</option>
                <option>MEDIUM</option>
                <option>HIGH</option>
                <option>CRITICAL</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as any })
                }
                className="w-full px-3 py-2 bg-deepslate border border-slate-600 rounded-lg text-white focus:outline-none focus:border-amber-signal"
              >
                <option>OSINT</option>
                <option>ACADEMIC</option>
                <option>HR</option>
                <option>LEGAL</option>
                <option>MEDIA</option>
                <option>RESEARCH</option>
              </select>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
