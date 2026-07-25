"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Terminal as TerminalIcon, 
  Cpu, 
  Database, 
  Activity, 
  ShieldAlert, 
  FolderPlus, 
  Plus, 
  FileText,
  FileCheck,
  AlertTriangle,
  RefreshCw,
  Sliders,
  Layers
} from "lucide-react";
import { PageHeader } from "@/components/shared";
import { useCases, useDashboardStats, useStorageSummary } from "@/lib/hooks";
import { useAuth } from "@/components/auth/AuthProvider";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { cases, loading: casesLoading, listCases } = useCases();
  const { stats, loading: statsLoading } = useDashboardStats();
  const { storage, loading: storageLoading } = useStorageSummary();
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[SYS] Forensic Operating System v4.10-STABLE loaded successfully.",
    "[SYS] Zero-storage RAM scan chambers cleared. Status: Ephemeral.",
    "[LEDGER] SHA-256 anchor verified on blockchain. Nodes: 16/16.",
    "[SYS] Observability hooks registered. System load: 0.12."
  ]);

  useEffect(() => {
    listCases({ limit: 5, offset: 0 });

    const logGenerator = setInterval(() => {
      const mockAudits = [
        `[SYS] Processing transient frame buffer scan for EXIF alignment.`,
        `[SPECTRAL] Vocal frequencies evaluated. High vocoder index checked.`,
        `[LEDGER] Hashed and verified case payload on node cluster.`,
        `[SYSTEM] SOC2 ephemeral buffer cleared. 0 bytes written to disk.`,
        `[STYLOGRAPHY] Tone metrics skew parsing completed.`
      ];
      const randomLog = mockAudits[Math.floor(Math.random() * mockAudits.length)];
      setTerminalLogs(prev => [...prev.slice(-6), `${new Date().toLocaleTimeString()} ${randomLog}`]);
    }, 4000);

    return () => clearInterval(logGenerator);
  }, []);

  const handleNewCase = () => {
    router.push("/cases?new=true");
  };

  const handleUploadEvidence = () => {
    router.push("/evidence?upload=true");
  };

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 p-6 lg:p-8 space-y-6 scanline-overlay">
      
      {/* OS Top Command Panel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-900">
        <div>
          <PageHeader
            title="Forensic Operating System"
            description="High-assurance digital evidence control center"
          />
          <div className="flex gap-4 mt-2 font-mono text-[9px] text-slate-500 uppercase tracking-widest">
            <div>Tenant ID: <span className="text-slate-300">vdx-root</span></div>
            <div>Cluster: <span className="text-verity-green">Active (16/16 nodes)</span></div>
            <div>Mode: <span className="text-amber-signal">Strict Ephemeral</span></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => router.push("/dashboard/platform")}
            className="rounded border border-amber-500/20 bg-amber-500/5 px-3 py-1 text-[10px] text-amber-500 hover:bg-amber-500 hover:text-black font-mono transition-all uppercase tracking-wider"
          >
            [ Open Observability Desk ]
          </button>
          <button
            onClick={() => router.push("/audit")}
            className="rounded border border-verity-green/20 bg-verity-green/5 px-3 py-1 text-[10px] text-verity-green hover:bg-verity-green hover:text-black font-mono transition-all uppercase tracking-wider"
          >
            [ Start Instant Audit ]
          </button>
        </div>
      </div>

      {/* Main Forensic OS Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: System Status Telemetry & Live Terminal Queue (col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Scientific Telemetry Panel */}
          <div className="bg-[#030712] border border-deepslate p-5 space-y-4 rounded-none font-mono">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu size={12} className="text-amber-signal" /> Telemetry Status
              </span>
              <span className="text-[9px] text-slate-500 uppercase">// LIVE FEED</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[10px]">
              <div className="border border-slate-900 p-2 bg-[#02050b]">
                <div className="text-slate-500 uppercase tracking-widest text-[8px]">// ACTIVE SCAN ROOMS</div>
                <div className="text-white font-bold mt-1 text-sm">3 / 16</div>
              </div>
              <div className="border border-slate-900 p-2 bg-[#02050b]">
                <div className="text-slate-500 uppercase tracking-widest text-[8px]">// MEMORY LOAD</div>
                <div className="text-white font-bold mt-1 text-sm">0.82 GB <span className="text-slate-500 font-normal">/ 32GB</span></div>
              </div>
              <div className="border border-slate-900 p-2 bg-[#02050b]">
                <div className="text-slate-500 uppercase tracking-widest text-[8px]">// AVG RETENCY TIME</div>
                <div className="text-amber-signal font-bold mt-1 text-sm">178s</div>
              </div>
              <div className="border border-slate-900 p-2 bg-[#02050b]">
                <div className="text-slate-500 uppercase tracking-widest text-[8px]">// LEDGER VALIDATIONS</div>
                <div className="text-verity-green font-bold mt-1 text-sm">99.98%</div>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center text-[9px] text-slate-500 uppercase mb-1">
                <span>Verification Credits Remaining</span>
                <span className="text-amber-signal font-bold">{stats?.creditsRemaining || 0} Credits</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-none border border-slate-800">
                <div 
                  className="bg-amber-signal h-full" 
                  style={{ width: `${Math.min(((stats?.creditsRemaining || 0) / 100) * 100, 100)}%` }} 
                />
              </div>
            </div>
          </div>

          {/* Live Diagnostic Queue Terminal */}
          <div className="bg-black border border-deepslate p-5 space-y-4 rounded-none font-mono">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <TerminalIcon size={12} className="text-amber-signal animate-pulse" /> Diagnostic Queue
              </span>
              <span className="h-2 w-2 bg-amber-signal animate-ping" />
            </div>

            <div className="h-[220px] overflow-y-auto text-[10px] space-y-1.5 custom-scrollbar text-amber-signal/80 leading-normal">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="border-l-2 border-amber-signal/40 pl-2 hover:bg-slate-950/40 py-0.5">
                  {log}
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-900 pt-2 flex items-center justify-between text-[9px] text-slate-500">
              <span>// PIPELINE: SOC2 TRANSITIONAL BUFFERING</span>
              <span className="text-[8px] border border-amber-signal/30 text-amber-signal px-1 bg-amber-signal/5">ZERO-DATA</span>
            </div>
          </div>

        </div>

        {/* Right Column: Case Management Workspace & Storage Profiles (col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Quick Command Bar */}
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={handleUploadEvidence} 
              className="bg-[#030712] border border-deepslate p-4 hover:border-amber-signal/40 transition-colors text-left flex flex-col justify-between h-24 rounded-none group"
            >
              <Database size={16} className="text-amber-signal group-hover:scale-110 transition-transform" />
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Upload Payload</div>
                <div className="text-[8px] text-slate-500 font-mono">Transient Analysis Room</div>
              </div>
            </button>
            <button 
              onClick={handleNewCase} 
              className="bg-[#030712] border border-deepslate p-4 hover:border-amber-signal/40 transition-colors text-left flex flex-col justify-between h-24 rounded-none group"
            >
              <FolderPlus size={16} className="text-amber-signal group-hover:scale-110 transition-transform" />
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Create Case file</div>
                <div className="text-[8px] text-slate-500 font-mono">Assemble Evidence Group</div>
              </div>
            </button>
            <Link 
              href="/reports" 
              className="bg-[#030712] border border-deepslate p-4 hover:border-amber-signal/40 transition-colors text-left flex flex-col justify-between h-24 rounded-none group"
            >
              <FileText size={16} className="text-amber-signal group-hover:scale-110 transition-transform" />
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold text-white uppercase tracking-wider font-mono">Report Vault</div>
                <div className="text-[8px] text-slate-500 font-mono">Browse Defensible Audits</div>
              </div>
            </Link>
          </div>

          {/* Active Case Records */}
          <div className="bg-[#030712] border border-deepslate p-6 rounded-none space-y-4">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Layers size={12} className="text-amber-signal" /> Active Case Files
              </span>
              <button 
                onClick={() => router.push("/cases")}
                className="text-[9px] font-mono text-slate-500 hover:text-white uppercase"
              >
                // View Case Directory
              </button>
            </div>

            {casesLoading ? (
              <div className="py-8 text-center text-slate-500 font-mono text-xs">// FETCHING CASE RECORDS...</div>
            ) : cases.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-slate-900 bg-obsidian rounded-none">
                <p className="text-xs text-slate-500 font-mono">NO ACTIVE EVIDENCE CASES FOUND</p>
                <button onClick={handleNewCase} className="mt-4 px-4 py-2 border border-amber-signal/30 hover:border-amber-signal text-amber-signal font-mono text-[9px] uppercase">
                  Initialize First Case
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cases.slice(0, 3).map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => router.push(`/cases`)}
                    className="p-4 bg-obsidian border border-slate-900 hover:border-amber-signal/30 cursor-pointer flex items-center justify-between transition-colors font-mono"
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-200">{item.title}</div>
                      <div className="text-[8px] text-slate-500 uppercase tracking-widest">Case ID: {item.id.slice(0, 8)} | Category: {item.category}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-[8px] font-bold px-2 py-0.5 border ${
                        item.priority === "CRITICAL" ? "border-red-500 text-red-400 bg-red-500/5" : "border-slate-800 text-slate-400"
                      }`}>
                        {item.priority}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold">&rarr;</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Secure Evidence Vault Storage Summary */}
          <div className="bg-[#030712] border border-deepslate p-6 rounded-none space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center border-b border-slate-900 pb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Database size={12} className="text-amber-signal" /> Evidence Vault Storage
              </span>
              <span className="text-[9px] text-slate-500 uppercase">// AES-256 ENCRYPTED</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Vault Space Utilized</span>
                <span className="text-white font-bold">{storageLoading ? "..." : `${(Number(storage?.totalBytes || 0) / (1024 * 1024)).toFixed(2)} MB / 5.00 GB`}</span>
              </div>
              <div className="w-full bg-slate-900 h-2 border border-slate-800 rounded-none overflow-hidden">
                <div 
                  className="bg-amber-signal h-full" 
                  style={{ width: `${Math.min((Number(storage?.totalBytes || 0) / (5 * 1024 * 1024 * 1024)) * 100, 100)}%` }} 
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[9px] text-slate-500 pt-2 border-t border-slate-900/60">
              <div>IMAGE FILES: <span className="text-slate-300 font-semibold">{storage?.evidenceCount || 0}</span></div>
              <div>AUDIO CLIPS: <span className="text-slate-300 font-semibold">0</span></div>
              <div>CASE FILES: <span className="text-slate-300 font-semibold">{cases.length}</span></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
