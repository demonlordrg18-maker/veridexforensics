import React, { useState, useEffect } from 'react';
import { ShieldCheck, ToggleLeft, ToggleRight, Radio, RefreshCw, BarChart } from 'lucide-react';

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
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [flags, setFlags] = useState<Flag[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState('CYBERSECURITY');
  const [retentionDays, setRetentionDays] = useState(365);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/platform');
      const data = await res.json();
      if (data.flags) setFlags(data.flags);
      if (data.metrics) setMetrics(data.metrics);
      if (data.tenant) {
        setRetentionDays(data.tenant.retentionDays);
      }
    } catch (err) {
      console.error('Failed to load dashboard specs', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFlag = async (key: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/platform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'toggle-flag',
          key,
          enabled: !currentStatus
        })
      });
      if (res.ok) {
        setFlags((prev) =>
          prev.map((f) => (f.key === key ? { ...f, enabled: !currentStatus } : f))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateTenant = async (industry: string, days: number) => {
    try {
      await fetch('/api/admin/platform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update-tenant',
          orgId: 'org_cuid',
          industry,
          locale: 'en-US',
          retentionDays: days
        })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleIndustryChange = (val: string) => {
    setSelectedIndustry(val);
    updateTenant(val, retentionDays);
  };

  const handleRetentionChange = (val: number) => {
    setRetentionDays(val);
    updateTenant(selectedIndustry, val);
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-100 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-850 pb-4 gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-wide font-mono text-amber-500 flex items-center gap-2">
            <ShieldCheck size={16} /> GLOBAL ADMINISTRATION & OBSERVABILITY
          </h2>
          <p className="text-xs text-zinc-400 mt-1">Audit operational usage metrics, flag status, and tenant settings.</p>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-[10px] font-mono text-zinc-400 uppercase">ACTIVE INDUSTRY MODULE:</label>
          <select
            value={selectedIndustry}
            onChange={(e) => handleIndustryChange(e.target.value)}
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
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 font-mono">Dynamic Feature Toggles</h3>
            <button onClick={fetchDashboardData} className="text-zinc-500 hover:text-white transition-colors">
              <RefreshCw size={12} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
          <div className="rounded-lg border border-zinc-850 bg-zinc-900/20 divide-y divide-zinc-900">
            {flags.map((f) => (
              <div key={f.key} className="flex items-center justify-between p-4 hover:bg-zinc-900/30 transition-colors">
                <div>
                  <code className="text-xs font-bold text-amber-500 font-mono">{f.key}</code>
                  <p className="text-[10px] text-zinc-400 mt-1">{f.description}</p>
                </div>
                <button
                  onClick={() => toggleFlag(f.key, f.enabled)}
                  className={`rounded-full px-3 py-1 text-[9px] font-semibold font-mono tracking-wider transition-all ${
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
            Tenant Settings & Isolation
          </h3>

          <div className="space-y-4 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-zinc-500">Isolation:</span>
              <span className="font-semibold text-zinc-300">High Sandbox</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-500">Retention Policy (Days):</span>
              <input
                type="number"
                value={retentionDays}
                onChange={(e) => handleRetentionChange(parseInt(e.target.value) || 365)}
                className="w-full rounded bg-zinc-900 border border-zinc-800 p-1 text-xs text-zinc-300 font-mono focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Compliance Scope:</span>
              <span className="font-semibold text-zinc-300">GDPR / SOC-2 Ready</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">RTL UI Support:</span>
              <span className="font-semibold text-zinc-300">Enabled (Ar, He)</span>
            </div>
          </div>

          <div className="rounded border border-amber-500/20 bg-amber-500/5 p-3 text-[10px] text-amber-400/90 leading-relaxed font-mono">
            <strong>NOTICE:</strong> Restructuring workspace settings to ({selectedIndustry}) adapts auditing pipelines and analytics metrics dynamically.
          </div>
        </div>
      </div>
    </div>
  );
}
