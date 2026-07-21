"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Upload, 
  FileText, 
  Link as LinkIcon, 
  ArrowRight, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle,
  Loader2, 
  FileCode, 
  BarChart4, 
  Lock, 
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";

type DemoTab = "upload" | "text" | "url";
type ScanStep = {
  text: string;
  duration: number;
};

const SCAN_STEPS: ScanStep[] = [
  { text: "INITIATING CRYPTOGRAPHIC PROVENANCE CHECK", duration: 800 },
  { text: "COMPUTING LOCAL ENVELOPE SHA-256 HASH", duration: 700 },
  { text: "DECOMPOSING MULTIMODAL SPECTRAL ANOMALIES", duration: 1000 },
  { text: "PARSING STYLOGRAPHIC WRITING PATTERNS", duration: 800 },
  { text: "EXTRACTING GEOLOCATION & HARDWARE METADATA", duration: 900 },
  { text: "REGISTERING TEMPORARY LEDGER PROOFS", duration: 600 }
];

export function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState<DemoTab>("text");
  
  // Inputs
  const [textInput, setTextInput] = useState(
    "In the modern era of deep learning and neural systems, human collaboration has evolved. As we integrate generative intelligence, the line between original creation and automated responses blur significantly. However, deep structural models often leave subtle semantic anomalies and repetitive distribution patterns that are invisible to the naked eye."
  );
  const [urlInput, setUrlInput] = useState("https://www.example-news-feed.org/leaked-audio-report");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // States
  const [isScanning, setIsScanning] = useState(false);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [showReport, setShowReport] = useState(false);
  
  // Results
  const [verityIndex, setVerityIndex] = useState(0.85);
  const [classification, setClassification] = useState<"SYNTHETIC" | "NATURAL" | "SUSPICIOUS">("SUSPICIOUS");
  const [confidence, setConfidence] = useState(94.2);
  const [ledgerHash, setLedgerHash] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const startScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "text" && textInput.trim().length < 20) return;
    if (activeTab === "url" && !urlInput.trim().startsWith("http")) return;
    if (activeTab === "upload" && !uploadedFile) return;

    setIsScanning(true);
    setCurrentStepIdx(0);
    setProgress(0);
    setLogs([]);
    setShowReport(false);
    
    // Generate a random mock SHA-256 for this scan
    const randomHash = Array.from({ length: 64 }, () => 
      "0123456789abcdef"[Math.floor(Math.random() * 16)]
    ).join("");
    setLedgerHash(randomHash);
  };

  useEffect(() => {
    if (!isScanning) return;

    let stepTimer: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;

    const runStep = (idx: number) => {
      if (idx >= SCAN_STEPS.length) {
        // Complete scan
        setProgress(100);
        setIsScanning(false);
        setShowReport(true);
        // Determine mock result based on input content length or types
        if (activeTab === "text") {
          if (textInput.toLowerCase().includes("deep learning") || textInput.toLowerCase().includes("generative")) {
            setVerityIndex(0.24);
            setClassification("SYNTHETIC");
            setConfidence(98.4);
          } else {
            setVerityIndex(0.92);
            setClassification("NATURAL");
            setConfidence(91.7);
          }
        } else if (activeTab === "url") {
          setVerityIndex(0.48);
          setClassification("SUSPICIOUS");
          setConfidence(86.5);
        } else {
          setVerityIndex(0.12);
          setClassification("SYNTHETIC");
          setConfidence(99.1);
        }
        return;
      }

      const step = SCAN_STEPS[idx];
      setLogs(prev => [...prev, `[SYS] ${step.text}...`]);
      setCurrentStepIdx(idx);

      // Increment progress slowly during the step
      const stepDuration = step.duration;
      const startProgress = (idx / SCAN_STEPS.length) * 100;
      const endProgress = ((idx + 1) / SCAN_STEPS.length) * 100;
      let elapsed = 0;

      progressInterval = setInterval(() => {
        elapsed += 50;
        const ratio = Math.min(elapsed / stepDuration, 1);
        setProgress(Math.floor(startProgress + ratio * (endProgress - startProgress)));
      }, 50);

      stepTimer = setTimeout(() => {
        clearInterval(progressInterval);
        setLogs(prev => [...prev, `[SUCCESS] COMPLETED ${step.text.split(" ").slice(1).join(" ")}`]);
        runStep(idx + 1);
      }, stepDuration);
    };

    runStep(0);

    return () => {
      clearTimeout(stepTimer);
      clearInterval(progressInterval);
    };
  }, [isScanning, activeTab, textInput, urlInput, uploadedFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full bg-[#02050a]/90 border border-deepslate relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
      {/* Visual background grid effect inside widget */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {/* Terminal Bar */}
      <div className="px-4 py-2.5 bg-[#030712] border-b border-deepslate flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-amber-signal" />
          <span className="font-mono text-[9px] font-bold text-slate-400 tracking-wider">VDX_STANDALONE_AUDIT_CONSOLE_v1.0</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 bg-amber-signal shadow-[0_0_6px_#F59E0B] animate-pulse" />
          <span className="font-mono text-[8px] font-bold text-amber-signal uppercase tracking-widest">LIVE_PORTAL</span>
        </div>
      </div>

      {/* Tab Selectors */}
      <div className="flex bg-[#030712]/50 border-b border-deepslate font-mono text-[9px] relative z-10">
        <button
          onClick={() => { if (!isScanning) { setActiveTab("text"); setShowReport(false); } }}
          disabled={isScanning}
          className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-r border-deepslate transition-all ${
            activeTab === "text" ? "bg-obsidian text-amber-signal font-bold" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <FileText size={12} />
          <span>[ PASTE TEXT ]</span>
        </button>
        <button
          onClick={() => { if (!isScanning) { setActiveTab("url"); setShowReport(false); } }}
          disabled={isScanning}
          className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-r border-deepslate transition-all ${
            activeTab === "url" ? "bg-obsidian text-amber-signal font-bold" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <LinkIcon size={12} />
          <span>[ AUDIT URL ]</span>
        </button>
        <button
          onClick={() => { if (!isScanning) { setActiveTab("upload"); setShowReport(false); } }}
          disabled={isScanning}
          className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-all ${
            activeTab === "upload" ? "bg-obsidian text-amber-signal font-bold" : "text-slate-500 hover:text-slate-300"
          }`}
        >
          <Upload size={12} />
          <span>[ FILE UPLOAD ]</span>
        </button>
      </div>

      {/* Interactive Body */}
      <div className="p-5 min-h-[220px] relative z-10">
        {!isScanning && !showReport && (
          <form onSubmit={startScan} className="space-y-4">
            {activeTab === "text" && (
              <div className="space-y-2">
                <label className="block font-mono text-[8px] text-slate-500 uppercase tracking-widest">SUBMIT BODY FOR AI ANALYSIS</label>
                <textarea
                  className="w-full h-28 bg-[#030712] border border-deepslate p-3 text-xs text-slate-300 focus:outline-none focus:border-amber-signal/50 font-sans resize-none"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Paste text/essay/articles to check styling integrity..."
                />
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-500">
                  <span>MINIMUM CHARACTERS: 20</span>
                  <span>{textInput.length} CHARS</span>
                </div>
              </div>
            )}

            {activeTab === "url" && (
              <div className="space-y-2">
                <label className="block font-mono text-[8px] text-slate-500 uppercase tracking-widest">TARGET WEB ADDRESS</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 bg-[#030712] border border-deepslate px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-signal/50 font-mono"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://example.com/source-document"
                  />
                </div>
                <p className="font-mono text-[8px] text-slate-500">Direct integration checks content extraction from target DOM elements.</p>
              </div>
            )}

            {activeTab === "upload" && (
              <div className="space-y-2">
                <label className="block font-mono text-[8px] text-slate-500 uppercase tracking-widest">DRAG AND DROP EVIDENCE PAYLOAD</label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-deepslate hover:border-amber-signal/50 bg-[#030712]/50 hover:bg-[#070b19]/25 py-8 flex flex-col items-center justify-center cursor-pointer transition-all gap-2"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadedFile(e.target.files[0]);
                      }
                    }}
                  />
                  <Upload className="text-slate-500 group-hover:text-amber-signal transition-colors" size={24} />
                  <p className="font-mono text-[9px] text-slate-400 uppercase tracking-wider">
                    {uploadedFile ? uploadedFile.name : "Drag files here or click to select"}
                  </p>
                  <p className="font-mono text-[8px] text-slate-600">SUPPORTED: PDF, DOCX, PNG, JPG, FLAC, MP3 (MAX 10MB)</p>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-900/60 flex justify-between items-center">
              <span className="font-mono text-[8px] text-slate-500 flex items-center gap-1">
                <Lock size={8} />
                VOLATILE TRANSITIONAL MEMORY CHECKOUT
              </span>
              <button
                type="submit"
                disabled={
                  (activeTab === "text" && textInput.trim().length < 20) ||
                  (activeTab === "url" && !urlInput.trim().startsWith("http")) ||
                  (activeTab === "upload" && !uploadedFile)
                }
                className="btn-switch-primary group px-4 py-2 text-[10px]"
              >
                <span className="led-indicator-amber" />
                <span>Run Free Forensic Audit</span>
                <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </form>
        )}

        {/* Scanning Panel */}
        {isScanning && (
          <div className="space-y-5 py-2">
            <div className="flex justify-between items-center font-mono text-[9px] text-slate-400">
              <span className="flex items-center gap-2">
                <Loader2 size={12} className="animate-spin text-amber-signal" />
                ANALYZING SIGNAL SIGNATURE...
              </span>
              <span>{progress}%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#030712] border border-deepslate">
              <div 
                className="h-full bg-amber-signal shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Log list */}
            <div className="bg-[#030712] border border-deepslate p-3 h-24 font-mono text-[8px] text-slate-500 overflow-y-auto space-y-1 scrollbar-thin">
              {logs.map((log, index) => (
                <div key={index} className={log.includes("[SUCCESS]") ? "text-verity-green" : "text-slate-400"}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Partial Forensic Report */}
        {showReport && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-[#030712] border border-deepslate p-4">
              <div className="space-y-1 text-left">
                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">// PRELIMINARY FORENSIC SCORE</span>
                <h4 className="text-base font-bold text-white tracking-tight">Verity Authenticity Assessment</h4>
                <div className="font-mono text-[8px] text-slate-400 mt-1">
                  BLOCK RESOLVED: <span className="text-amber-signal">{ledgerHash.substring(0, 16)}...{ledgerHash.substring(48)}</span>
                </div>
              </div>

              {/* Index Glow */}
              <div className="flex items-center gap-3 self-start sm:self-center">
                <div className="text-right">
                  <span className="font-mono block text-[8px] text-slate-500 uppercase tracking-wider">VERITY INDEX</span>
                  <span className={`font-mono text-lg font-black ${
                    verityIndex > 0.8 ? "text-verity-green" : verityIndex > 0.4 ? "text-amber-signal" : "text-red-500"
                  }`}>
                    {verityIndex.toFixed(3)}
                  </span>
                </div>
                <div className={`px-2.5 py-1 border font-mono text-[9px] font-bold ${
                  classification === "NATURAL" 
                    ? "bg-verity-green/10 border-verity-green/30 text-verity-green" 
                    : classification === "SUSPICIOUS"
                    ? "bg-amber-signal/10 border-amber-signal/30 text-amber-signal"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                }`}>
                  {classification}
                </div>
              </div>
            </div>

            {/* Analysis Grid & Gated Overlay */}
            <div className="relative border border-deepslate">
              <div className="grid grid-cols-2 divide-x divide-deepslate border-b border-deepslate font-mono text-[8px] text-slate-500 bg-[#030712]/30">
                <div className="p-3 space-y-2 text-left">
                  <div className="flex items-center gap-1.5">
                    <BarChart4 size={10} className="text-slate-400" />
                    <span>SPECTRAL SHAPE COEFFICIENT</span>
                  </div>
                  <div className="font-bold text-slate-300">
                    {verityIndex > 0.8 ? "DEVIATION: 0.04% [LOW]" : "DEVIATION: 88.42% [CRITICAL_SPIKE]"}
                  </div>
                </div>
                <div className="p-3 space-y-2 text-left">
                  <div className="flex items-center gap-1.5">
                    <FileCode size={10} className="text-slate-400" />
                    <span>METADATA TAMPERING SCAN</span>
                  </div>
                  <div className="font-bold text-slate-300">
                    {verityIndex > 0.8 ? "INTEGRITY: INTRACT [OK]" : "INTEGRITY: EXIF_REMOVED // RE-ENCODED"}
                  </div>
                </div>
              </div>

              {/* Redacted details section with blur to incentivize signup */}
              <div className="p-4 bg-black/40 relative overflow-hidden min-h-[90px] flex flex-col justify-end">
                <div className="absolute inset-0 backdrop-blur-[2.5px] bg-black/70 flex flex-col items-center justify-center p-4 text-center z-20 space-y-3">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-amber-signal tracking-widest uppercase">
                    <ShieldCheck size={12} className="text-amber-signal" />
                    <span>SIGN UP TO UNLOCK DEEP FORENSICS</span>
                  </div>
                  <p className="font-sans text-[10px] text-slate-400 max-w-sm">
                    Access metadata GPS grids, sentence-by-sentence linguistic authenticity maps, and claims chain verification tools.
                  </p>
                  <div className="flex gap-3 pt-1">
                    <Link
                      href="/signup"
                      className="btn-switch-primary py-1.5 px-4 text-[9px] flex items-center gap-1"
                    >
                      <Zap size={10} />
                      Create Free Account (+50 Credits)
                    </Link>
                    <button
                      onClick={() => setShowReport(false)}
                      className="font-mono text-[9px] uppercase tracking-wider text-slate-400 hover:text-white border border-deepslate px-3 py-1.5"
                    >
                      New Audit
                    </button>
                  </div>
                </div>

                <div className="space-y-1 text-left opacity-15 pointer-events-none select-none font-mono text-[7px] text-slate-500">
                  <div>[MUTATION LEVEL 1: DETECTED RECURRENT SENTENCE CONTEXT]</div>
                  <div>[MUTATION LEVEL 2: DETECTED NON-HUMAN COMPILING SIGNATURE]</div>
                  <div>[SYS_LOG] TRANSIENT BUFFERS CLEARED SUCCESSFUL</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
