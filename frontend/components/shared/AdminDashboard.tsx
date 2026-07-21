import React, { useState } from 'react';

interface Metric {
  label: string;
  value: string;
  status: 'normal' | 'warning' | 'critical';
}

interface Flag {
  key: string;
  description: string;
  enabled: boolean;
}

export function AdminDashboard() {
  const [metrics] = useState<Metric[]>([
    { label: 'System Health', value: '99.98% uptime', status: 'normal' },
    { label: 'Avg API Latency', value: '42ms', status: 'normal' },
    { label: 'AI Token Load', value: '1.2M tokens / hr', status: 'normal' },
    { label: 'Queue Backlog', value: '3 items', status: 'normal' },
    { label: 'Storage Used', value: '4.8TB / 10TB', status: 'warning' },
  ]);

  const [flags, setFlags] = useState<Flag[]>([
    { key: 'flag-ai-summarizer-beta', description: 'Enable Next-gen GPT-4o hybrid extraction models.', enabled: true },
    { key: 'flag-academic-modality-academic', description: 'Show university-specific plagiarism controls.', enabled: true },
    { key: 'flag-legal-discovery-indexing', description: 'Automatic indexing for legal metadata scans.', enabled: false },
    { key: 'flag-government-multitenant-isolation', description: 'Enforce separate high-security workspace sandboxes.', enabled: true },
  ]);

  const [selectedIndustry, setSelectedIndustry] = useState('CYBERSECURITY');

  const toggleFlag = (key: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.key === key ? { ...f, enabled: !f.enabled } : f))
    );
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-850 pb-4">
        <div>
          <h2 className="text-sm font-semibold tracking-wide font-mono text-amber-500">GLOBAL ADMINISTRATION & OBSERVABILITY</h2>
          <p className="text-xs text-zinc-400 mt-1">Audit usage metrics, flag status, and workspace module engines.</p>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-xs font-mono text-zinc-400">INDUSTRY WORKSPACE MODULE:</label>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="rounded bg-zinc-900 border border-zinc-800 px-3 py-1.5 text-xs text-zinc-100 font-mono focus:border-amber-500 focus:outline-none"
          >
            <option value="CYBERSECURITY">CYBERSECURITY</option>
            <option value="JOURNALISM">JOURNALISM</option>
            <option value="ACADEMIC">ACADEMIC</option>
            <option value="LEGAL">LEGAL</option>
            <option value="GOVERNMENT">GOVERNMENT</option>
          </select>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="rounded-lg border border-zinc-850 bg-zinc-900/30 p-4">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono block">{m.label}</span>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-sm font-bold font-mono text-zinc-100">{m.value}</span>
              <span className={`h-2 w-2 rounded-full ${
                m.status === 'normal' ? 'bg-emerald-500' :
                m.status === 'warning' ? 'bg-amber-500 animate-pulse' : 'bg-red-500'
              }`} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Feature Flags */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">Dynamic Feature Toggles</h3>
          <div className="rounded-lg border border-zinc-850 bg-zinc-900/20 divide-y divide-zinc-900">
            {flags.map((f) => (
              <div key={f.key} className="flex items-center justify-between p-4 hover:bg-zinc-900/30 transition-colors">
                <div>
                  <code className="text-xs font-bold text-amber-500 font-mono">{f.key}</code>
                  <p className="text-[10px] text-zinc-400 mt-1">{f.description}</p>
                </div>
                <button
                  onClick={() => toggleFlag(f.key)}
                  className={`rounded-full px-3 py-1 text-[10px] font-semibold font-mono tracking-wider transition-all ${
                    f.enabled
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
                  }`}
                >
                  {f.enabled ? 'ACTIVE' : 'DISABLED'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Governance & Tenant settings info card */}
        <div className="rounded-lg border border-zinc-850 bg-zinc-900/20 p-4 space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono border-b border-zinc-850 pb-2">
            Tenant Configurations
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-500 font-mono">Isolation Level:</span>
              <span className="font-semibold text-zinc-300 font-mono">High Sandbox</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 font-mono">Retention Policy:</span>
              <span className="font-semibold text-zinc-300 font-mono">365 Days Auto-Purge</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 font-mono">Compliance Scope:</span>
              <span className="font-semibold text-zinc-300 font-mono">GDPR / SOC-2 Ready</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500 font-mono">RTL UI Support:</span>
              <span className="font-semibold text-zinc-300 font-mono">Enabled (Ar, He)</span>
            </div>
          </div>

          <div className="rounded border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] text-amber-400/90 leading-relaxed font-mono">
            <strong>SYSTEM STATUS WARNING:</strong> Selected industry settings ({selectedIndustry}) will alter available auditing models, and dashboard metrics configurations dynamically across members.
          </div>
        </div>
      </div>
    </div>
  );
}
