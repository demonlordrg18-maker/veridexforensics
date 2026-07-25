"use client";

import { useState } from "react";
import { 
  FileText, 
  Activity, 
  Database, 
  Lock, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  CheckCircle, 
  AlertTriangle, 
  Search,
  Eye,
  Check,
  Layers,
  ChevronRight
} from "lucide-react";
import { Navbar, Footer } from "@/components/Navigation";
import Link from "next/link";

interface MockReport {
  id: string;
  title: string;
  type: "AUDIO" | "IMAGE" | "DOCUMENT";
  verdict: "SYNTHETIC" | "SUSPICIOUS" | "NATURAL";
  verityIndex: number;
  confidence: number;
  hash: string;
  timestamp: string;
  details: string;
  findings: string[];
}

const MOCK_REPORTS: MockReport[] = [
  {
    id: "VDX-2026-9810A",
    title: "Leaked Executive Voice Statement",
    type: "AUDIO",
    verdict: "SYNTHETIC",
    verityIndex: 0.22,
    confidence: 98.4,
    hash: "8f4e2a1b9c3d5e7f8g9h0i1j2k3l4m5n",
    timestamp: "2026-07-24 14:22:18 UTC",
    details: "Voice clone analysis of audio file leaked on public forum. Spectral patterns indicate GAN vocoder synthesis.",
    findings: [
      "Spectral vocoder footprints detected at 12.4kHz band gaps.",
      "Identical sentence spacing indicates temporal pattern duplication.",
      "Inconsistent noise floor profiles between speech syllables."
    ]
  },
  {
    id: "VDX-2026-7241B",
    title: "Candidate Profile Image Upload",
    type: "IMAGE",
    verdict: "SUSPICIOUS",
    verityIndex: 0.45,
    confidence: 89.2,
    hash: "7a2d6f8e3c1b0a9f5d4e7c6b9a8f1e2d",
    timestamp: "2026-07-22 09:12:45 UTC",
    details: "Verification of candidate identification passport file. Sensor pattern alignment check indicates localized manipulation.",
    findings: [
      "PRNU (Sensor Pattern Noise) mismatch around portrait box border.",
      "Metadata reveals strip signature of Photoshop v24 package.",
      "Facial boundary pixel gradient inconsistency (32% variance)."
    ]
  },
  {
    id: "VDX-2026-4402C",
    title: "Whistleblower Manifesto Doc",
    type: "DOCUMENT",
    verdict: "NATURAL",
    verityIndex: 0.94,
    confidence: 96.1,
    hash: "9c3d5e7f8g9h0i1j2k3l4m5n8f4e2a1b",
    timestamp: "2026-07-18 18:45:00 UTC",
    details: "Verification of anonymous stylographic writing. Lexical footprint maps human stylistic profiles.",
    findings: [
      "Lexical distribution variance fits natural academic writer curves.",
      "Syntactic structural entropy correlates with public whistleblower credentials.",
      "Zero factual contradictions found in claim index matching."
    ]
  }
];

export default function ReportsPage() {
  const [selectedReportId, setSelectedReportId] = useState<string>(MOCK_REPORTS[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [downloading, setDownloading] = useState<string | null>(null);

  const selectedReport = MOCK_REPORTS.find(r => r.id === selectedReportId) || MOCK_REPORTS[0];

  const filteredReports = MOCK_REPORTS.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const triggerDownload = (id: string) => {
    setDownloading(id);
    setTimeout(() => setDownloading(null), 1500);
  };

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal scanline-overlay">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1 font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none shadow-[0_0_10px_rgba(245,158,11,0.05)]">
              // FORENSIC RECORD ARCHIVE
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
              Signature <span className="text-amber-signal">Evidence Reports.</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-sm leading-relaxed">
              Explore tamper-evident verification reports. Click any ledger record in the registry to inspect the mathematical signals and forensic proof.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-12 px-6 md:px-12 bg-[#02050b]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Reports List Selector (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#030712] border border-deepslate p-5 space-y-4">
              <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">// LEDGER REGISTRY</div>
              
              <div className="relative bg-[#02050b] border border-slate-900 px-3 py-2 flex items-center gap-2">
                <Search size={12} className="text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Filter by report ID or title..."
                  className="bg-transparent text-xs text-slate-300 focus:outline-none w-full font-mono"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                {filteredReports.map((report) => {
                  const isSelected = report.id === selectedReportId;
                  return (
                    <button
                      key={report.id}
                      onClick={() => setSelectedReportId(report.id)}
                      className={`w-full text-left p-4 transition-all border font-mono ${
                        isSelected 
                          ? "bg-amber-signal/5 border-amber-signal text-white" 
                          : "bg-transparent border-slate-900 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <div className="flex justify-between items-start text-[8px] text-slate-500 uppercase tracking-wider mb-2">
                        <span>{report.id}</span>
                        <span>{report.type}</span>
                      </div>
                      <h4 className="text-xs font-bold font-sans line-clamp-1">{report.title}</h4>
                      
                      <div className="flex items-center justify-between mt-3 text-[9px] border-t border-slate-900/60 pt-2">
                        <span className={`font-bold px-1.5 py-0.5 border ${
                          report.verdict === "SYNTHETIC" ? "border-red-500/30 text-red-400 bg-red-500/5" :
                          report.verdict === "SUSPICIOUS" ? "border-amber-signal/30 text-amber-signal bg-amber-signal/5" :
                          "border-verity-green/30 text-verity-green bg-verity-green/5"
                        }`}>
                          {report.verdict}
                        </span>
                        <span className="text-slate-500 font-bold font-mono">Index: {report.verityIndex}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Report Panel (col-span-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Interactive Panel Window */}
            <div className="bg-[#030712] border border-deepslate p-8 space-y-6">
              
              {/* Header Details */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-900 pb-4 gap-4">
                <div>
                  <div className="font-mono text-[9px] text-amber-signal tracking-widest uppercase">// EVIDENCE INTEGRITY VERDICT</div>
                  <h2 className="text-xl font-bold text-white mt-1">{selectedReport.title}</h2>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">Hash ID: {selectedReport.hash}</p>
                </div>
                
                <button
                  onClick={() => triggerDownload(selectedReport.id)}
                  className="px-4 py-2 border border-amber-signal/20 hover:border-amber-signal text-amber-signal hover:bg-amber-signal hover:text-black font-mono text-[10px] uppercase font-bold tracking-wider transition-all flex items-center gap-2 shrink-0"
                >
                  <Download size={12} />
                  {downloading === selectedReport.id ? "Downloading..." : "Export Defensible PDF"}
                </button>
              </div>

              {/* Analytical Visualizer Panel */}
              <div className="bg-black border border-slate-900 p-6 space-y-6 font-mono text-xs">
                
                {/* Visualizer header */}
                <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                  <span className="font-bold text-slate-400 uppercase tracking-widest text-[9px] flex items-center gap-1.5">
                    <Activity size={10} className="text-amber-signal" /> Interactive Forensic Signal Scope
                  </span>
                  <span className="text-[8px] text-slate-600 uppercase">Veridex Signal Analyser</span>
                </div>

                {/* Displaying visual simulator depending on report type */}
                {selectedReport.type === "AUDIO" && (
                  <div className="space-y-4">
                    <div className="h-28 bg-gradient-to-r from-red-500/20 via-black to-red-500/10 border border-slate-900 relative flex items-center justify-around overflow-hidden">
                      {/* Fake Audio Waveform */}
                      {[30, 80, 45, 90, 15, 60, 75, 40, 95, 20, 85, 30, 70, 10, 80, 50].map((h, i) => (
                        <div 
                          key={i} 
                          className={`w-2.5 bg-red-400 border-t border-black`} 
                          style={{ height: `${h}%` }}
                        />
                      ))}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,#000_100%)] pointer-events-none" />
                      <div className="absolute top-2 left-2 text-[8px] bg-red-500/20 border border-red-500/40 px-1 text-red-400 uppercase font-bold">
                        Spectral Anomaly Identified at 12.4kHz
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal font-sans">
                      * Interactive Spectrum Analysis isolates synthesised neural vocoder noise frequencies (gaps visible in speech transitions).
                    </p>
                  </div>
                )}

                {selectedReport.type === "IMAGE" && (
                  <div className="space-y-4">
                    <div className="h-28 bg-slate-950 border border-slate-900 relative flex items-center justify-center overflow-hidden">
                      <div className="w-24 h-24 border border-dashed border-amber-signal/40 relative flex items-center justify-center">
                        <span className="absolute inset-0 bg-amber-signal/5" />
                        <span className="text-[8px] text-amber-signal font-bold uppercase tracking-wider">PRNU MISALIGN</span>
                      </div>
                      <div className="absolute top-2 left-2 text-[8px] bg-amber-signal/20 border border-amber-signal/40 px-1 text-amber-signal uppercase font-bold">
                        Photoshop File Strip Signature Matches
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal font-sans">
                      * PRNU (Sensor Pattern Noise Alignment) maps noise inconsistencies at passport portrait borders (evident localized splicing).
                    </p>
                  </div>
                )}

                {selectedReport.type === "DOCUMENT" && (
                  <div className="space-y-4">
                    <div className="h-28 bg-slate-950 border border-slate-900 p-4 relative overflow-y-auto text-[10px] text-slate-400 font-sans custom-scrollbar leading-relaxed">
                      "We checked structural writing formatting metrics. <span className="text-verity-green bg-verity-green/5 border border-verity-green/20 px-1">Lexical distribution variance fits natural academic writer curves</span>. Factual assertions aligned with external citation records."
                    </div>
                    <p className="text-[10px] text-slate-400 leading-normal font-sans">
                      * Stylographic decomposition shows regular human entropy curves (lexical selection complexity aligns with credentials).
                    </p>
                  </div>
                )}

                {/* Technical Diagnostic Metrics */}
                <div className="grid grid-cols-3 gap-4 border-t border-slate-900 pt-4 text-[10px]">
                  <div>
                    <span className="text-slate-500 block uppercase tracking-widest text-[8px]">// MODEL VERDICT</span>
                    <span className={`font-bold uppercase tracking-wider block mt-1 ${
                      selectedReport.verdict === "SYNTHETIC" ? "text-red-400" :
                      selectedReport.verdict === "SUSPICIOUS" ? "text-amber-signal" :
                      "text-verity-green"
                    }`}>{selectedReport.verdict}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase tracking-widest text-[8px]">// COGNITIVE CONFIDENCE</span>
                    <span className="text-white font-bold block mt-1">{selectedReport.confidence}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block uppercase tracking-widest text-[8px]">// LEDGER TIMESTAMP</span>
                    <span className="text-slate-300 block mt-1 truncate">{selectedReport.timestamp.split(" ")[0]}</span>
                  </div>
                </div>

              </div>

              {/* Forensic Findings check list */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <Layers size={12} className="text-amber-signal" /> Audited Forensic Findings
                </h3>
                <div className="space-y-2">
                  {selectedReport.findings.map((finding, idx) => (
                    <div key={idx} className="p-3 bg-[#02050b] border border-slate-900 flex items-start gap-3">
                      <span className="mt-0.5 text-amber-signal font-mono text-[10px] font-bold">0{idx + 1}</span>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">{finding}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blockchain Seal Verification */}
              <div className="p-4 bg-amber-signal/[0.02] border border-amber-signal/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="text-[8px] font-mono text-amber-signal font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck size={10} className="text-verity-green" /> Cryptographic Ledger Seal Active
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal font-sans">
                    Any change to this file breaks the validation hash. The SHA-256 block ledger anchor is permanent.
                  </p>
                </div>
                <button 
                  onClick={() => alert(`Ledger block state matching for hash: ${selectedReport.hash}. Signature is VALID.`)}
                  className="px-3 py-1.5 border border-slate-800 hover:border-amber-signal font-mono text-[8px] text-slate-400 hover:text-white uppercase tracking-wider transition-colors shrink-0"
                >
                  Verify Ledger State
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
