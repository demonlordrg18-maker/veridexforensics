/**
 * Tabs Component
 */

"use client";

import { useState } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export function Tabs({ tabs, defaultTab, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div>
      {/* Tab list */}
      <div className="flex items-center gap-1 border-b border-deepslate">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-amber-signal text-amber-signal"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-1 rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}
