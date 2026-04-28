"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, ReactNode, useEffect, useMemo, useState, Suspense } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useSearchParams } from "next/navigation";

// --- Types ---
type AuditResult = {
  id: string;
  modality: string;
  verity_index: number;
  origin: string;
  truth_score: number;
  confidence: number;
  findings: string[];
  reasons: string[];
  created_at: string;
  file_hash?: string;
  bias_report?: {
    primary_bias: string;
    bias_scores: Record<string, number>;
    trigger_snippets: Array<{ label: string; snippet: string; mechanism?: string }>;
  };
  factuality_report?: {
    factual_density: number;
    veracity_score: number;
    claims: Array<{
      statement: string;
      type: string;
      reason: string;
      action: string;
      verifiability_confidence: number;
      is_verifiable: boolean;
      veracity: {
        verification_status: string;
        veracity_score: number;
        sources: Array<{ title: string; url: string }>;
        matched_topic?: string;
        evidence_summary?: string;
      };
    }>;
  };
  image_report?: {
    metadata: {
      width: number;
      height: number;
      format: string;
      ela?: { score: number; mean_luma_diff: number };
      signature_hits: string[];
    };
  };
  audio_report?: {
    metadata: {
      duration_seconds: number;
      sample_rate_hz: number;
      spectral?: { zcr: number; centroid_hz: number };
    };
    transcript?: string;
    sentiment?: { label: string; confidence: number };
  };
  video_report?: {
    frames: any[];
    confidence: number;
  };
  copyright_risk?: {
    risk_score: number;
    nearest: any[];
    external_matches: Array<{
      id: string;
      title: string;
      source: string;
      license: string;
      similarity: number;
      match_excerpt?: string;
    }>;
    analysis: string;
    status: string;
  };
};

type Mode = "text" | "document" | "image" | "audio" | "video" | "link";

// --- Constants ---
const MODES: { id: Mode; label: string; icon: string }[] = [
  { id: "text", label: "Text Analysis", icon: "✍️" },
  { id: "document", label: "Document", icon: "📄" },
  { id: "link", label: "URL / Link", icon: "🔗" },
  { id: "image", label: "Image Forensic", icon: "🖼️" },
  { id: "audio", label: "Audio Audit", icon: "🎙️" },
  { id: "video", label: "Video Verify", icon: "🎬" },
];

const COLORS = ["#0d9488", "#2dd4bf", "#94a3b8", "#f43f5e", "#fb7185"];

import { Navbar, Footer } from "../../components/Navigation";
import { Search, Shield, Zap, Activity, Fingerprint, Lock, Database } from "lucide-react";

// --- Components ---

const LoadingOverlay = ({ isSample }: { isSample?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl"
  >
    <div className="relative mb-12">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="h-32 w-32 rounded-full border-t-4 border-teal-500/40 border-r-4 border-teal-500/20"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 h-32 w-32 rounded-full border-b-4 border-teal-400"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Activity size={32} className="text-teal-400 animate-pulse" />
      </div>
    </div>
    
    <div className="text-center">
      <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">
        {isSample ? "Deep Forensic Analysis In Progress" : "Analyzing Content Signature"}
      </h2>
      <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
        <div className="flex items-center gap-2">
          <Fingerprint size={12} className="text-teal-500" /> Fingerprinting
        </div>
        <div className="flex items-center gap-2">
          <Database size={12} className="text-teal-500" /> Fact Matching
        </div>
        <div className="flex items-center gap-2">
          <Search size={12} className="text-teal-500" /> Signal Scan
        </div>
      </div>
    </div>

    {/* Scanning Line Animation */}
    <motion.div 
      initial={{ top: "20%" }}
      animate={{ top: "80%" }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500/50 to-transparent shadow-[0_0_15px_rgba(20,184,166,0.5)] pointer-events-none"
    />
  </motion.div>
);

export default function AuditPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
      </div>
    }>
      <Dashboard />
    </Suspense>
  );
}

function Dashboard() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>("text");
  const [content, setContent] = useState("The Apollo 11 mission landed on the Moon in 1969. It was a historic achievement for humanity.");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [expandedMatch, setExpandedMatch] = useState<number | null>(null);

  const isSample = searchParams.get("sample") === "true";

  useEffect(() => {
    if (isSample) {
      const sampleText = "Leaked video from Brussels meeting shows markers of lip-sync manipulation and voice cloning in the 02:45 segment.";
      setContent(sampleText);
      // Give it a tiny bit of time to settle and show the text before starting
      const timer = setTimeout(() => {
        runAudit("text", sampleText);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isSample]);

  const biasData = useMemo(() => {
    if (!result?.bias_report) return [];
    return Object.entries(result.bias_report.bias_scores)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [result]);

  const derivationSteps = useMemo(() => {
    if (!result) return [];

    const claims = result.factuality_report?.claims ?? [];
    const verifiableCount = claims.filter((c) => c.is_verifiable).length;
    const sourcesCount = claims.reduce((acc, c) => acc + (c.veracity?.sources?.length || 0), 0);
    const contradictedCount = claims.filter((c) => c.veracity?.verification_status === "debunked").length;
    const unverifiedCount = claims.filter((c) => c.veracity?.verification_status === "unverified").length;

    const primaryBias = result.bias_report?.primary_bias;
    const topBias = biasData[0]?.name ? `${biasData[0].name} (${Math.round(biasData[0].value * 100)}%)` : undefined;

    const isDemo =
      (result.findings || []).some((f) => typeof f === "string" && f.toLowerCase().includes("demo auditor")) ||
      result.id?.startsWith?.("demo_");

    const steps: Array<{ title: string; detail: string }> = [];

    steps.push({
      title: "Step 1 — Input normalization",
      detail:
        mode === "link"
          ? `Validated URL input and prepared it for crawl + extraction.`
          : mode === "text"
            ? `Parsed and normalized ${content.trim().length} characters of text.`
            : `Prepared uploaded ${mode} asset for hashing + modality scanning.`,
    });

    steps.push({
      title: "Step 2 — Claim extraction",
      detail: claims.length
        ? `Detected ${claims.length} claim units (${verifiableCount} verifiable).`
        : "No claim extraction module output returned for this audit.",
    });

    steps.push({
      title: "Step 3 — Cross-reference & contradiction scan",
      detail: claims.length
        ? `Attached ${sourcesCount} source pointer(s). Flagged ${contradictedCount} contradicted, ${unverifiedCount} unverified.`
        : "No cross-reference pointers available for this audit.",
    });

    steps.push({
      title: "Step 4 — Signal scoring → risk aggregation",
      detail: `Aggregated signals into Verity Index ${Math.round(result.verity_index * 100)}/100 with confidence ${Math.round(
        result.confidence * 100
      )}%.${primaryBias ? ` Primary bias: ${topBias || primaryBias}.` : ""}${isDemo ? " (Demo mode: illustrative evidence pointers.)" : ""}`,
    });

    return steps;
  }, [result, biasData, mode, content]);

  const runAudit = async (forcedMode?: Mode, forcedContent?: string) => {
    const activeMode = forcedMode || mode;
    const activeContent = forcedContent || content;

    setLoading(true);
    setError("");
    setResult(null);

    // Artificial delay for sample audits to enhance "forensic" feel
    if (isSample) {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    try {
      let response: Response;

      if (activeMode === "text") {
        response = await fetch(`/api/audit/text`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: activeContent, include_metadata: true }),
        });
      } else if (activeMode === "link") {
        if (!url) throw new Error("URL required for link audit.");
        response = await fetch(`/api/audit/link`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
      } else {
        if (!file) throw new Error("File required for this audit mode.");
        const form = new FormData();
        form.append("file", file);
        response = await fetch(`/api/audit/${activeMode}`, { method: "POST", body: form });
      }

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await response.json() : await response.text();
      if (!response.ok) {
        const msg =
          (data && typeof data === "object" && ("error" in data ? (data as any).error : undefined)) ||
          `Forensic engine returned ${response.status}`;
        throw new Error(msg);
      }
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Audit failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAudit = async (e: FormEvent) => {
    e.preventDefault();
    await runAudit();
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <AnimatePresence>
        {loading && <LoadingOverlay isSample={isSample} />}
      </AnimatePresence>
      
      <div className="pt-24 p-4 md:p-8 lg:p-12">
        <header className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold uppercase tracking-widest text-teal-500"
            >
              {isSample ? "Sample Audit Simulation" : "Forensic Answer Engine"}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-extrabold tracking-tight text-white md:text-5xl"
            >
              Professional <span className="text-gradient">Auditor</span>
            </motion.h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 border border-white/10">
              Session Node: <span className="text-teal-400">Secure-Audit-01</span>
            </div>
          </div>
        </header>

      <main className="grid gap-8 lg:grid-cols-[1.4fr,1fr]">
        {/* Left Column: Input & Results */}
        <div className="space-y-8">
          {/* Mode Selector */}
          <section className="glass rounded-3xl p-2 flex flex-wrap gap-2">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                  mode === m.id ? "bg-teal-600 text-white shadow-lg" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <span>{m.icon}</span>
                <span className="hidden sm:inline">{m.label}</span>
              </button>
            ))}
          </section>

          {/* Form */}
          <section className="glass-dark rounded-3xl p-8">
            <form onSubmit={handleAudit} className="space-y-6">
              {mode === "text" ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste text content for multi-modal analysis..."
                  className="input-field h-64 w-full resize-none text-lg"
                />
              ) : mode === "link" ? (
                <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-3xl bg-white/5 p-8 border border-white/10 transition-all hover:bg-white/10">
                  <div className="text-4xl">🔗</div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL (YouTube, News, Cloud Assets)..."
                    className="input-field w-full text-center text-lg"
                  />
                  <p className="text-xs text-slate-500 italic">Target will be crawled and audited for authenticity.</p>
                </div>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 transition-all hover:border-teal-500/50">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10 text-3xl">
                      📂
                    </div>
                    <p className="text-lg font-medium text-slate-200">
                      {file ? file.name : `Select ${mode} file`}
                    </p>
                    <p className="text-sm text-slate-500">Maximum file size: 50MB</p>
                  </label>
                </div>
              )}
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-slate-500 max-w-[200px] leading-tight">
                  All inputs are processed securely. No content is stored without consent. SHA-256 recorded for integrity.
                </p>
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="btn-primary flex items-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Analyzing...
                    </>
                  ) : (
                    "Initialize Audit"
                  )}
                </button>
              </div>
            </form>
            {error && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="mt-4 rounded-xl bg-rose-500/10 p-4 text-sm text-rose-400 border border-rose-500/20"
              >
                ⚠️ {error}
              </motion.p>
            )}
          </section>

          {/* Analysis Details (when result exists) */}
          <AnimatePresence>
            {result && (
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-8"
              >
                {/* Summary Executive Box */}
                <div className="rounded-3xl bg-gradient-to-br from-teal-500/20 to-blue-500/20 p-8 border border-teal-500/30 shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-500 text-2xl shadow-lg shadow-teal-500/20">
                      💡
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-white uppercase">Audit Summary</h3>
                  </div>
                  <p className="text-lg font-medium text-teal-100 leading-relaxed">
                    {result.verity_index > 0.8 
                      ? "Content integrity is high. The assets show strong markers of human origin and aligned factual evidence."
                      : result.verity_index > 0.5
                      ? "Audit signature suggests a hybrid or assisted origin. Key sections contain unverified claims that warrant cross-referencing."
                      : "Low verity score detected. Significant synthetic markers or factual inconsistencies identified across multiple modalities."
                    }
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white border border-white/10">
                      Status: {result.origin === 'ai' ? 'Synthetic/AI' : 'Organic/Human'}
                    </span>
                    <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white border border-white/10">
                      Reliability: {Math.round(result.truth_score * 100)}%
                    </span>
                    <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white border border-white/10">
                      Compliance: {result.verity_index > 0.7 ? "Passed" : "Manual Review Req."}
                    </span>
                  </div>
                </div>

                {/* Proof of thinking / derivation */}
                {derivationSteps.length > 0 && (
                  <div className="glass rounded-3xl p-8 border border-white/5">
                    <div className="flex items-center justify-between gap-6 mb-6">
                      <div>
                        <h3 className="text-xl font-bold uppercase tracking-widest text-slate-300">
                          How this result was derived
                        </h3>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                          A concrete trace of the steps used for this specific audit. This is not a verdict—it's an evidence trail for human review.
                        </p>
                      </div>
                      <div className="hidden sm:block text-[10px] font-mono text-slate-500">
                        Audit ID: <span className="text-teal-400">{result.id}</span>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {derivationSteps.map((s, i) => (
                        <div key={i} className="rounded-2xl bg-white/5 border border-white/5 p-5 hover:bg-white/10 transition-all">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2">
                              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-teal-400">
                                {s.title}
                              </div>
                              <div className="text-sm text-slate-200 leading-relaxed">{s.detail}</div>
                            </div>
                            <div className="text-[10px] font-mono text-slate-600 mt-1">D{i + 1}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Findings & Claims */}
                <div className="glass rounded-3xl p-8">
                  <h3 className="mb-6 text-xl font-bold uppercase tracking-widest text-slate-400">Forensic Evidence Trail</h3>
                  <div className="space-y-4 text-sm text-slate-300">
                    {result.findings.map((f, i) => (
                      <div key={i} className="flex gap-4 rounded-2xl bg-white/5 p-4 border border-white/5 transition-all hover:bg-white/10">
                        <span className="text-teal-500 font-bold font-mono">EV_{i+1}</span>
                        <p>{f}</p>
                      </div>
                    ))}
                  </div>

                  {result.factuality_report && (
                    <div className="mt-12 space-y-8">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-teal-500">Atomic Content Decomposition</h4>
                        <div className="text-[10px] font-mono text-slate-500">
                          {Math.round(result.factuality_report.factual_density * 100)}% Information Density
                        </div>
                      </div>
                      <div className="grid gap-6">
                        {result.factuality_report.claims.map((c, i) => {
                          const isHeading = c.type.includes("heading");
                          const isDef = c.type.includes("definition");
                          const isSystem = c.type.includes("system");
                          const isPolicy = c.type.includes("policy");
                          const isOpinion = c.type === "subjective opinion";
                          
                          return (
                            <div key={i} className={`group rounded-3xl border p-6 transition-all hover:translate-x-1 ${
                              isHeading ? "border-slate-500/20 bg-slate-500/5" :
                              isDef ? "border-teal-500/20 bg-teal-500/5" :
                              isSystem ? "border-blue-500/20 bg-blue-500/5" :
                              isPolicy ? "border-indigo-500/20 bg-indigo-500/5" :
                              isOpinion ? "border-amber-500/20 bg-amber-500/5" :
                              "border-white/5 bg-slate-900/40"
                            }`}>
                              <div className="flex items-start justify-between mb-4">
                                <div className="space-y-2">
                                  <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                                    isHeading ? "bg-slate-500/20 text-slate-400" :
                                    isDef ? "bg-teal-500/20 text-teal-400" :
                                    isSystem ? "bg-blue-500/20 text-blue-400" :
                                    isPolicy ? "bg-indigo-500/20 text-indigo-400" :
                                    isOpinion ? "bg-amber-500/20 text-amber-400" :
                                    "bg-emerald-500/20 text-emerald-400"
                                  }`}>
                                    {c.type}
                                  </span>
                                  <p className="text-slate-100 text-lg leading-snug font-medium">"{c.statement}"</p>
                                </div>
                                <div className="text-right">
                                  <span className={`rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-wider shadow-sm border ${
                                    c.veracity.verification_status === "verified" ? "border-teal-500/30 bg-teal-500/10 text-teal-400" : 
                                    c.veracity.verification_status === "debunked" ? "border-rose-500/30 bg-rose-500/10 text-rose-400" : 
                                    c.veracity.verification_status === "na" ? "border-white/10 bg-slate-500/10 text-slate-400" :
                                    "border-amber-500/30 bg-amber-500/10 text-amber-400"
                                  }`}>
                                    {c.veracity.verification_status === "na" ? "Classified" : c.veracity.verification_status}
                                  </span>
                                </div>
                              </div>

                              <div className="grid gap-4 pt-4 border-t border-white/5">
                                <div className="flex flex-col gap-1">
                                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Forensic Rationale</span>
                                  <span className="text-xs text-slate-300 italic">{c.reason}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Recommended Action</span>
                                    <span className="text-xs font-bold text-teal-500">{c.action}</span>
                                  </div>
                                  
                                  {c.veracity.sources.length > 0 && (
                                    <div className="flex gap-2">
                                      {c.veracity.sources.map((s, si) => (
                                        <a 
                                          key={si} 
                                          href={s.url} 
                                          target="_blank" 
                                          className="flex items-center gap-1.5 rounded-lg bg-teal-500/10 px-3 py-1.5 text-[10px] font-bold text-teal-400 border border-teal-500/20 transition-all hover:bg-teal-500/20"
                                        >
                                          🔍 {s.title.includes("Reuters") || s.title.includes("AP") ? "Press Archive" : s.title}
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Key Stats & Visuals */}
        <div className="space-y-8">
          <section className="glass rounded-3xl p-8 h-fit">
            <h3 className="mb-8 text-xl font-bold">Verity Snapshot</h3>
            
            <div className="mb-10 flex flex-col items-center gap-2">
              <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-8 border-white/5">
                <svg className="absolute h-full w-full rotate-[-90deg]">
                  <circle
                    cx="96" cy="96" r="88" fill="transparent"
                    stroke="currentColor" strokeWidth="8"
                    className="text-teal-500 transition-all duration-1000"
                    strokeDasharray={552}
                    strokeDashoffset={552 - (552 * (result?.verity_index || 0))}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="text-center">
                  <p className="text-5xl font-black text-white">
                    {result ? Math.round(result.verity_index * 100) : "--"}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Verity Index</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="stat-card">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Origin Source</p>
                <p className={`text-lg font-bold ${result?.origin === 'ai' ? 'text-rose-400' : 'text-teal-400'}`}>
                  {result?.origin?.toUpperCase() || "--"}
                </p>
                <p className="text-[9px] text-slate-500 mt-1 leading-tight">Likely author classification based on linguistic patterns.</p>
              </div>
              <div className="stat-card">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Trust Index</p>
                <p className="text-lg font-bold text-white">
                  {result ? Math.round(result.truth_score * 100) : "--"}%
                </p>
                <p className="text-[9px] text-slate-500 mt-1 leading-tight">Overall probability of content being authentic/human-like.</p>
              </div>
              <div className="stat-card">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Analysis Conf.</p>
                <p className="text-lg font-bold text-white">
                  {result ? Math.round(result.confidence * 100) : "--"}%
                </p>
                <p className="text-[9px] text-slate-500 mt-1 leading-tight">Statistical certainty of the forensic engine's findings.</p>
              </div>
              <div className="stat-card">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">Risk Profile</p>
                <p className="text-lg font-bold text-amber-400">
                  {result ? (result.verity_index < 0.4 ? "High Risk" : result.verity_index < 0.7 ? "Medium" : "Low Risk") : "--"}
                </p>
                <p className="text-[9px] text-slate-500 mt-1 leading-tight">Combined audit risk: Factuality, Bias, and Origin signals.</p>
              </div>
            </div>

            {result?.reasons && result.reasons.length > 0 && (
              <div className="mt-8 space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Detection Evidence</h4>
                <div className="space-y-2">
                  {result.reasons.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="h-1 w-1 rounded-full bg-teal-500" />
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result?.copyright_risk && (
              <div className="mt-8 rounded-3xl bg-rose-500/10 p-8 border border-rose-500/20 shadow-lg shadow-rose-500/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚖️</span>
                    <h4 className="text-sm font-black text-rose-400 uppercase tracking-widest">Copyright Analysis</h4>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-inner ${
                    result.copyright_risk.risk_score > 0.7 ? "bg-rose-500/20 text-rose-400" : "bg-teal-500/20 text-teal-400"
                  }`}>
                    {result.copyright_risk.status}
                  </span>
                </div>
                <p className="text-sm text-rose-200/80 leading-relaxed font-medium mb-6">
                  {result.copyright_risk.analysis}
                </p>

                {result.copyright_risk.external_matches && result.copyright_risk.external_matches.length > 0 && (
                  <div className="space-y-3">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-rose-300/50">Match Evidence Details</h5>
                    <div className="grid gap-2">
                      {result.copyright_risk.external_matches.map((match, mi) => (
                        <div key={mi} className="rounded-2xl bg-black/40 border border-white/5 overflow-hidden transition-all hover:bg-black/60">
                          <button 
                            onClick={() => setExpandedMatch(expandedMatch === mi ? null : mi)}
                            className="flex w-full items-center justify-between p-4 text-left"
                          >
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-200">{match.title}</span>
                              <span className="text-[9px] text-slate-500 tracking-wider font-mono lowercase">Source: {match.source}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-rose-400">{Math.round(match.similarity * 100)}% Match</span>
                              <span className={`text-xs transition-transform duration-300 ${expandedMatch === mi ? 'rotate-180' : ''}`}>▼</span>
                            </div>
                          </button>
                          
                          <AnimatePresence>
                            {expandedMatch === mi && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4 overflow-hidden"
                              >
                                <div className="rounded-xl bg-rose-500/5 p-3 border border-rose-500/10">
                                  <p className="text-[11px] text-rose-200 leading-relaxed italic">
                                    "{match.match_excerpt}"
                                  </p>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">License: {match.license}</span>
                                  <button className="text-[9px] font-bold text-teal-400 uppercase tracking-widest hover:underline">View Proof Document</button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Bias Breakdown */}
          {biasData.length > 0 && (
            <section className="glass rounded-3xl p-8">
              <h3 className="mb-6 text-xl font-bold">Bias Mapping</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={biasData} layout="vertical" margin={{ left: -20, right: 20 }}>
                    <XAxis type="number" hide domain={[0, 1]} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }} 
                      width={100}
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {biasData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 rounded-xl bg-teal-500/10 p-4 border border-teal-500/10">
                <p className="text-xs text-teal-200/70 leading-relaxed mb-4">
                  The content shows a primary <span className="font-bold text-teal-400 uppercase">{result?.bias_report?.primary_bias}</span> signature.
                </p>
                {result?.bias_report?.trigger_snippets && result.bias_report.trigger_snippets.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-t border-white/5 pt-6 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-teal-500" />
                      Rhetorical Patterns Detected
                    </h4>
                    <div className="grid gap-3">
                      {result.bias_report.trigger_snippets.map((item, i) => (
                        <div key={i} className="rounded-2xl bg-black/40 p-4 border border-white/5 backdrop-blur-sm transition-all hover:bg-black/60">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-teal-400">{item.label}</span>
                          </div>
                          <p className="text-xs text-slate-100 italic leading-relaxed mb-3">"{item.snippet}"</p>
                          {item.mechanism && (
                            <div className="rounded-lg bg-teal-500/5 px-3 py-2 border border-teal-500/10">
                              <p className="text-[10px] text-teal-200/70 font-medium">
                                <span className="text-teal-400 font-bold uppercase mr-1">Mechanism:</span>
                                {item.mechanism}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Artifact Hash */}
          {result?.file_hash && (
            <section className="glass rounded-2xl p-6 overflow-hidden">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">SHA-256 Fingerprint</p>
              <p className="mono break-all text-[10px] text-teal-500/80 leading-relaxed">{result.file_hash}</p>
            </section>
          )}
        </div>
      </main>
      </div>
      <Footer />
    </div>
  );
}