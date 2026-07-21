"use client";

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared';
import { AdminDashboard } from '@/components/shared/AdminDashboard';
import { WorkflowBuilder } from '@/components/shared/WorkflowBuilder';
import { AIAssistantDrawer } from '@/components/shared/AIAssistantDrawer';
import { GlobalSearchOverlay } from '@/components/shared/GlobalSearchOverlay';

export default function PlatformDashboard() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 p-6 lg:p-8 space-y-8 relative">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Digital Trust Control Operating System"
          description="Manage global tenant workflows, AI automation pipelines, and platform observability configurations."
        />
        <button
          onClick={() => setIsSearchOpen(true)}
          className="rounded border border-amber-500/30 bg-amber-500/5 px-4 py-2 text-xs font-semibold text-amber-500 hover:bg-amber-500 hover:text-black font-mono transition-all"
        >
          [ PRESS CTRL+K OR SEARCH ]
        </button>
      </div>

      {/* Observability & Settings */}
      <AdminDashboard />

      {/* Automation builder */}
      <WorkflowBuilder />

      {/* Floating AI assistant drawer */}
      <AIAssistantDrawer
        activeContext={{
          type: 'SYSTEM',
          id: 'vdx-root',
          title: 'Global Trust Panel Control'
        }}
      />

      {/* Command Palette Overlay */}
      <GlobalSearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
