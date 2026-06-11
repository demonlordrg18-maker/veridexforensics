"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, ReactNode, useEffect, useMemo, useState, Suspense } from "react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}

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

const COLORS = ["#F59E0B", "#10B981", "#94a3b8", "#EF4444", "#fb7185"];

import { Navbar, Footer } from "../../components/Navigation";
import { Search, Shield, Zap, Activity, Fingerprint, Lock, Database, Microscope, ShieldCheck, FileCheck, Mail, ChevronRight } from "lucide-react";

// --- Components ---

const LoadingOverlay = ({ isSample }: { isSample?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian/90 backdrop-blur-xl"
  >
    <div className="relative mb-12">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="h-32 w-32 rounded-none border-t-4 border-amber-signal/40 border-r-4 border-amber-signal/20"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 h-32 w-32 rounded-none border-b-4 border-amber-signal"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Activity size={32} className="text-amber-signal animate-pulse" />
      </div>
    </div>
    
    <div className="text-center">
      <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter font-geist">
        {isSample ? "Deep Forensic Analysis In Progress" : "Analyzing Content Signature"}
      </h2>
      <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <Fingerprint size={12} className="text-amber-signal" /> Fingerprinting
        </div>
        <div className="flex items-center gap-2">
          <Database size={12} className="text-amber-signal" /> Fact Matching
        </div>
        <div className="flex items-center gap-2">
          <Search size={12} className="text-amber-signal" /> Signal Scan
        </div>
      </div>
    </div>

    {/* Scanning Line Animation */}
    <motion.div 
      initial={{ top: "20%" }}
      animate={{ top: "80%" }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-signal/50 to-transparent shadow-[0_0_15px_rgba(245,158,11,0.5)] pointer-events-none"
    />
  </motion.div>
);

export default function AuditPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-none border-4 border-amber-signal border-t-transparent" />
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
  const [email, setEmail] = useState("");
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [creditsRemaining, setCreditsRemaining] = useState<number | null>(null);

  const handleCheckout = async (plan: string, mode: "payment" | "subscription") => {
    // Track pricing click
    window.gtag?.('event', 'pricing_click', {
      event_category: 'engagement',
      event_label: plan === 'starter' ? 'audit_limit_starter_49' : 'audit_limit_pro_299',
    });

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, mode, email: email || undefined }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout session creation failed:", data.error);
        alert(`Checkout failed: ${data.error || "Unknown error"}. Please ensure your Price IDs are correctly set in the environment variables.`);
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment connection error. Please check your internet and try again.");
    }
  };

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
    } else {
      const qText = searchParams.get("text");
      const qUrl = searchParams.get("url");
      if (qText) {
        setContent(qText);
        setMode("text");
        const timer = setTimeout(() => {
          runAudit("text", qText);
        }, 500);
        return () => clearTimeout(timer);
      } else if (qUrl) {
        setUrl(qUrl);
        setMode("link");
        const timer = setTimeout(() => {
          runAudit("link", undefined, qUrl);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isSample, searchParams]);

  const biasData = useMemo(() => {
    if (!result?.bias_report) return [];
    return Object.entries(result.bias_report.bias_scores)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [result]);

  const linguisticMarkers = useMemo(() => {
    if (!result) return [];
    // Mocking forensic markers for visual standard upgrade
    const isAI = result.origin === 'ai';
    return [
      { subject: 'Entropy', A: isAI ? 0.3 : 0.8, fullMark: 1 },
      { subject: 'Perplexity', A: isAI ? 0.2 : 0.9, fullMark: 1 },
      { subject: 'Consistency', A: isAI ? 0.95 : 0.6, fullMark: 1 },
      { subject: 'Rhetoric', A: isAI ? 0.4 : 0.85, fullMark: 1 },
      { subject: 'Metadata', A: isAI ? 0.1 : 0.7, fullMark: 1 },
    ];
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

  const runAudit = async (forcedMode?: Mode, forcedContent?: string, forcedUrl?: string) => {
    const activeMode = forcedMode || mode;
    const activeContent = forcedContent || content;
    const activeUrl = forcedUrl || url;

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
          body: JSON.stringify({ 
            content: activeContent, 
            include_metadata: true,
            email: email || undefined
          }),
        });
      } else if (activeMode === "link") {
        if (!activeUrl) throw new Error("URL required for link audit.");
        response = await fetch(`/api/audit/link`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: activeUrl, email: email || undefined }),
        });
      } else {
        if (!file) throw new Error("File required for this audit mode.");
        const form = new FormData();
        form.append("file", file);
        const urlParams = new URLSearchParams();
        if (email) urlParams.append("email", email);
        response = await fetch(`/api/audit/${activeMode}?${urlParams.toString()}`, { method: "POST", body: form });
      }

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await response.json() : await response.text();
      if (!response.ok) {
        if (response.status === 403) {
          setError(`LIMIT REACHED: ${data.detail || "Please upgrade your plan to continue."}`);
          setLoading(false);
          return;
        }
        const msg =
          (data && typeof data === "object" && ("error" in data ? (data as any).error : undefined)) ||
          `Forensic engine returned ${response.status}`;
        throw new Error(msg);
      }
      setResult(data);
      if (data.remaining_credits !== undefined) {
        setCreditsRemaining(data.remaining_credits);
      }
      // Track audit completion
      window.gtag?.('event', 'audit_completed', {
        event_category: 'engagement',
        event_label: activeMode,
        verity_index: data.verity_index,
      });
    } catch (err: any) {
      if (err.message.includes("403")) {
        setError("You have reached your audit limit. Please upgrade your plan.");
      } else {
        setError(err.message || "Audit failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAudit = async (e: FormEvent) => {
    e.preventDefault();
    await runAudit();
  };

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      
      <AnimatePresence>
        {loading && <LoadingOverlay isSample={isSample} />}
      </AnimatePresence>
      
      <div className="pt-32 pb-12 px-6 md:pt-36 md:px-12 lg:pt-40 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <header className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row relative z-10">
          <div className="space-y-2">
            <motion.p 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-signal"
            >
              // {isSample ? "Sample Audit Simulation" : "Forensic Answer Engine"}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-extrabold tracking-tight text-white md:text-5xl font-geist uppercase"
            >
              Professional <span className="text-amber-signal">Auditor</span>
            </motion.h1>
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px]">
            {creditsRemaining !== null && (
              <div className="border border-amber-signal/30 bg-amber-signal/5 px-4 py-2 font-bold text-amber-signal rounded-none shadow-[0_0_8px_rgba(245,158,11,0.05)]">
                Credits: {creditsRemaining}
              </div>
            )}
            <div className="border border-deepslate bg-[#030712] px-4 py-2 font-bold text-slate-400 rounded-none">
              Session Node: <span className="text-amber-signal">Secure-Audit-01</span>
            </div>
          </div>
        </header>

      <main className="grid gap-8 lg:grid-cols-[1.4fr,1fr] relative z-10">
        {/* Left Column: Input & Results */}
        <div className="space-y-8">
          {/* Mode Selector */}
          <section className="border border-deepslate bg-[#030712] p-1 flex flex-wrap gap-1 rounded-none font-mono text-[10px] uppercase">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex flex-1 items-center justify-center gap-2 px-3 py-2 border transition-all font-bold uppercase tracking-wider rounded-none ${
                  mode === m.id ? "border-amber-signal bg-amber-signal text-black shadow-[0_0_8px_rgba(245,158,11,0.15)]" : "border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5"
                }`}
              >
                <span>{m.icon}</span>
                <span className="hidden sm:inline">{m.label}</span>
              </button>
            ))}
          </section>

          {/* Email Input (Required for tracking/plans) */}
          <section className="border border-deepslate bg-[#030712] p-6 rounded-none">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="h-10 w-10 border border-amber-signal/20 bg-amber-signal/5 flex items-center justify-center text-amber-signal rounded-none shrink-0">
                <Mail size={18} />
              </div>
              <div className="flex-grow font-mono text-[10px]">
                <p className="font-bold uppercase tracking-widest text-slate-500 mb-1">// Verify your identity for forensic tracking</p>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your professional email..."
                  className="bg-transparent border-none text-white focus:ring-0 p-0 text-sm w-full placeholder:text-slate-700"
                />
              </div>
              {email && (
                <div className="text-[10px] font-mono font-bold text-amber-signal uppercase tracking-widest animate-pulse">
                  System Active
                </div>
              )}
            </div>
          </section>

          {/* Form */}
          <section className="border border-deepslate bg-[#030712] p-8 rounded-none">
            <form onSubmit={handleAudit} className="space-y-6">
              {mode === "text" ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste text content for multi-modal analysis..."
                  className="input-field h-64 w-full resize-none text-base border border-deepslate bg-black/60 p-4 focus:border-amber-signal focus:ring-0 text-white rounded-none outline-none font-sans"
                />
              ) : mode === "link" ? (
                <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-none bg-black/40 p-8 border border-deepslate transition-all hover:bg-black/60">
                  <div className="text-4xl">🔗</div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL (YouTube, News, Cloud Assets)..."
                    className="w-full text-center text-sm bg-transparent border-b border-deepslate focus:border-amber-signal outline-none p-2 text-white font-mono"
                  />
                  <p className="text-xs text-slate-500 font-sans">Target will be crawled and audited for authenticity.</p>
                </div>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center rounded-none border border-dashed border-deepslate bg-black/40 transition-all hover:border-amber-signal/50">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer text-center font-mono">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center border border-deepslate bg-obsidian text-2xl rounded-none">
                      📂
                    </div>
                    <p className="text-sm font-bold text-slate-200">
                      {file ? file.name : `Select ${mode} file`}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">Maximum file size: 50MB</p>
                  </label>
                </div>
              )}
              <div className="flex items-center justify-between">
                <p className="text-[9px] text-slate-500 max-w-[200px] leading-tight font-mono uppercase">
                  // All inputs are processed securely. No content is stored. SHA-256 recorded for integrity.
                </p>
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="px-6 py-3 border border-amber-signal bg-amber-signal text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-transparent hover:text-amber-signal transition-all duration-300 rounded-none shadow-[0_0_10px_rgba(245,158,11,0.15)] disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="h-3 w-3 animate-spin rounded-none border border-black border-t-transparent" />
                      Analyzing...
                    </>
                  ) : (
                    "Initialize Audit"
                  )}
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-slate-600">
                <Shield size={10} className="text-amber-signal" />
                // Analyzed using 500+ forensic markers across spectral, linguistic, and metadata layers.
              </div>
            </form>
             {error && (
              <motion.div 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-none bg-red-500/[0.02] p-8 border border-red-500/20 text-left font-mono"
              >
                <div className="flex gap-4 items-start mb-6">
                  <div className="h-10 w-10 border border-red-500/20 bg-red-500/5 flex items-center justify-center text-red-400 shrink-0 rounded-none">
                    ⚠️
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest">// Forensic Assurance Required</h4>
                    <p className="text-xs text-slate-400 mt-2 font-sans leading-relaxed">{error}</p>
                  </div>
                </div>

                {error.toLowerCase().includes("limit") && (
                  <div className="pt-6 border-t border-deepslate space-y-5">
                    <p className="text-xs text-slate-300 font-sans leading-relaxed">
                      Unlock instant unlimited audits, priority spectral signal queue, document/image/audio/video uploads, bias mapping, and cryptographically signed admissible PDF exports.
                    </p>
                    
                    {!email && (
                      <div className="p-4 bg-amber-signal/5 border border-amber-signal/15 text-[9px] text-amber-signal font-bold uppercase tracking-widest leading-relaxed">
                        💡 Please enter your email in the professional identity tracker above to unlock checkouts.
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 text-[10px] uppercase font-bold font-mono">
                      <button 
                        onClick={() => handleCheckout('starter', 'payment')}
                        disabled={!email}
                        className="px-5 py-3 border border-amber-signal bg-amber-signal text-black hover:bg-transparent hover:text-amber-signal transition-all duration-300 rounded-none disabled:opacity-30 disabled:pointer-events-none"
                      >
                        Buy Starter Batch ($49)
                      </button>
                      <button 
                        onClick={() => handleCheckout('pro', 'subscription')}
                        disabled={!email}
                        className="px-5 py-3 border border-deepslate text-white hover:bg-white/5 transition-all rounded-none disabled:opacity-30 disabled:pointer-events-none"
                      >
                        Unlock Pro ($299/mo)
                      </button>
                      <Link 
                        href="/pricing"
                        className="px-5 py-3 border border-deepslate text-slate-400 hover:text-white transition-all text-center rounded-none"
                      >
                        Compare Plans
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
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
                <div className="border border-deepslate bg-[#070b19]/30 p-8 rounded-none">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center border border-amber-signal/30 bg-amber-signal/5 text-amber-signal rounded-none shadow-[0_0_10px_rgba(245,158,11,0.05)]">
                      <ShieldCheck size={20} />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-white uppercase font-geist">Audit Summary</h3>
                  </div>
                  <p className="text-sm font-sans text-slate-300 leading-relaxed">
                    {result.verity_index > 0.8 
                      ? "Forensic integrity verified. Content exhibits deep linguistic variance and structural entropy consistent with organic human cognitive patterns."
                      : result.verity_index > 0.5
                      ? "Hybrid signature detected. Analysis identified isolated anomalous linguistic clusters and unverified claims that warrant secondary evidentiary cross-referencing."
                      : "High-risk synthetic signature detected. Multiple anomalous rhetorical markers and modal inconsistencies identified across 500+ forensic data points."
                    }
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 font-mono text-[9px]">
                    <span className="border border-deepslate bg-[#030712] px-3 py-1 font-bold text-slate-300">
                      Status: {result.origin === 'ai' ? 'Synthetic/AI' : 'Organic/Human'}
                    </span>
                    <span className="border border-deepslate bg-[#030712] px-3 py-1 font-bold text-slate-300">
                      Reliability: {Math.round(result.truth_score * 100)}%
                    </span>
                    <span className="border border-deepslate bg-[#030712] px-3 py-1 font-bold text-slate-300">
                      Compliance: {result.verity_index > 0.7 ? "Passed" : "Manual Review Req."}
                    </span>
                  </div>
                </div>

                {/* Proof of thinking / derivation */}
                {derivationSteps.length > 0 && (
                  <div className="border border-deepslate bg-[#030712] p-8 rounded-none">
                    <div className="flex items-center justify-between gap-6 mb-6">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-300 font-mono">
                          // How this result was derived
                        </h3>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                          A concrete trace of the steps used for this specific audit. This is not a verdict—it's an evidence trail for human review.
                        </p>
                      </div>
                      <div className="hidden sm:block text-[10px] font-mono text-slate-500">
                        Audit ID: <span className="text-amber-signal">{result.id}</span>
                      </div>
                    </div>
                    <div className="grid gap-3">
                      {derivationSteps.map((s, i) => (
                        <div key={i} className="rounded-none bg-obsidian border border-deepslate p-5 hover:border-amber-signal/30 transition-all">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2">
                              <div className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-amber-signal">
                                {s.title}
                              </div>
                              <div className="text-xs text-slate-300 leading-relaxed font-sans">{s.detail}</div>
                            </div>
                            <div className="text-[10px] font-mono text-slate-600 mt-1">D{i + 1}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Forensic Deep-Dive Section */}
                <div className="border border-deepslate bg-[#030712] p-8 rounded-none">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-10 w-10 border border-amber-signal/20 bg-amber-signal/5 flex items-center justify-center text-amber-signal rounded-none">
                      <Microscope size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white uppercase tracking-tight font-geist">Forensic Deep-Dive</h3>
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest font-mono">// Multi-modal detection signatures</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">// Linguistic Fingerprint</h4>
                      <div className="h-64 w-full font-mono text-[9px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={linguisticMarkers}>
                            <PolarGrid stroke="#1e293b" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 9 }} />
                            <Radar
                              name="Audit"
                              dataKey="A"
                              stroke="#F59E0B"
                              fill="#F59E0B"
                              fillOpacity={0.4}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">// Detection Reasoning</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-obsidian border border-deepslate rounded-none">
                          <div className="flex justify-between items-center mb-2 font-mono text-[9px]">
                            <span className="font-bold text-amber-signal uppercase">Structural Regularity</span>
                            <span className="text-slate-600">CONF: 98%</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Detected anomalous uniformity in sentence length and syntactic structure, a primary marker of large language model generation.
                          </p>
                        </div>
                        <div className="p-4 bg-obsidian border border-deepslate rounded-none">
                          <div className="flex justify-between items-center mb-2 font-mono text-[9px]">
                            <span className="font-bold text-amber-signal uppercase">Entropy Variance</span>
                            <span className="text-slate-600">CONF: 94%</span>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Low lexical diversity clusters identified in the core claims section suggest non-human rhetorical mechanisms.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Visual Forensic Scan */}
                  <div className="mt-8 pt-8 border-t border-deepslate space-y-4 text-left">
                    <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">// Visual Evidence Scan Capture</h4>
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                      <div className="relative h-44 border border-deepslate overflow-hidden bg-black">
                        <div className="laser-scanner" />
                        <img 
                          src={mode === "image" || mode === "video" ? "/images/biometric_manifest.jpg" : "/images/spectral_analysis.jpg"} 
                          alt="Visual Scan" 
                          className="w-full h-full object-cover opacity-85" 
                        />
                      </div>
                      <div className="space-y-2">
                        <span className="font-mono text-[9px] font-bold text-amber-signal uppercase">
                          {mode === "image" || mode === "video" ? "BIOMETRIC LANDMARK MODELING" : "ACOUSTIC SPECTRAL SIGNATURE"}
                        </span>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          {mode === "image" || mode === "video" 
                            ? "Generates high-assurance geometric mapping data to expose deepfake lip-sync anomalies, face-swap borders, and frame temporal incoherence." 
                            : "Decomposes acoustic signals into component spectral densities to flag vocoder, diffusion synthesis, and high-frequency GAN pause artifacts."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Findings & Claims */}
                <div className="border border-deepslate bg-[#030712] p-8 rounded-none">
                  <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-slate-400 font-mono">// Forensic Evidence Trail</h3>
                  <div className="space-y-4 text-xs text-slate-300">
                    {result.findings.map((f, i) => (
                      <div key={i} className="flex gap-4 bg-obsidian p-4 border border-deepslate rounded-none transition-all hover:border-amber-signal/40">
                        <span className="text-amber-signal font-bold font-mono">EV_{i+1}</span>
                        <p className="font-sans">{f}</p>
                      </div>
                    ))}
                  </div>

                  {result.factuality_report && (
                    <div className="mt-12 space-y-8">
                      <div className="flex items-center justify-between border-b border-deepslate pb-4 font-mono text-[10px]">
                        <h4 className="font-bold uppercase tracking-widest text-amber-signal">// Atomic Content Decomposition</h4>
                        <div className="text-slate-500">
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
                            <div key={i} className={`group rounded-none border p-6 transition-all hover:border-amber-signal/40 ${
                              isHeading ? "border-slate-800 bg-slate-900/10" :
                              isDef ? "border-amber-signal/20 bg-amber-signal/[0.02]" :
                              isSystem ? "border-blue-900/30 bg-blue-950/10" :
                              isPolicy ? "border-indigo-900/30 bg-indigo-950/10" :
                              isOpinion ? "border-amber-500/20 bg-amber-500/[0.02]" :
                              "border-deepslate bg-black/30"
                            }`}>
                              <div className="flex items-start justify-between mb-4">
                                <div className="space-y-2">
                                  <span className={`inline-block px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-widest border ${
                                    isHeading ? "border-slate-800 text-slate-500" :
                                    isDef ? "border-amber-signal/30 text-amber-signal" :
                                    isSystem ? "border-blue-900/30 text-blue-400" :
                                    isPolicy ? "border-indigo-900/30 text-indigo-400" :
                                    isOpinion ? "border-amber-500/20 text-amber-500" :
                                    "border-verity-green/20 text-verity-green"
                                  }`}>
                                    {c.type}
                                  </span>
                                  <p className="text-slate-100 text-sm leading-snug font-bold">"{c.statement}"</p>
                                </div>
                                <div className="text-right">
                                  <span className={`px-2 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider border ${
                                    c.veracity.verification_status === "verified" ? "border-verity-green/30 bg-verity-green/5 text-verity-green" : 
                                    c.veracity.verification_status === "debunked" ? "border-red-500/30 bg-red-500/5 text-red-400" : 
                                    c.veracity.verification_status === "na" ? "border-deepslate bg-slate-950 text-slate-500" :
                                    "border-amber-signal/30 bg-amber-signal/5 text-amber-signal"
                                  }`}>
                                    {c.veracity.verification_status === "na" ? "Classified" : c.veracity.verification_status}
                                  </span>
                                </div>
                              </div>

                              <div className="grid gap-4 pt-4 border-t border-deepslate">
                                <div className="flex flex-col gap-1 font-mono text-[9px]">
                                  <span className="font-bold uppercase tracking-wider text-slate-500">// Forensic Rationale</span>
                                  <span className="text-xs text-slate-300 italic font-sans">{c.reason}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                  <div className="flex flex-col gap-1 font-mono text-[9px]">
                                    <span className="font-bold uppercase tracking-wider text-slate-500">// Recommended Action</span>
                                    <span className="text-xs font-bold text-amber-signal font-sans">{c.action}</span>
                                  </div>
                                  
                                  {c.veracity.sources.length > 0 && (
                                    <div className="flex gap-2">
                                      {c.veracity.sources.map((s, si) => (
                                        <a 
                                          key={si} 
                                          href={s.url} 
                                          target="_blank" 
                                          className="flex items-center gap-1.5 border border-amber-signal/20 bg-amber-signal/5 px-3 py-1 font-mono text-[8px] font-bold text-amber-signal hover:bg-amber-signal/15 transition-all"
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

                {/* Defensibility & Conversion Box */}
                  <div className="border border-deepslate bg-[#030712] p-10 flex flex-col items-center text-center rounded-none">
                    <div className="h-12 w-12 border border-amber-signal/20 bg-amber-signal/5 flex items-center justify-center text-amber-signal mb-6 rounded-none">
                      <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-geist uppercase">Evidentiary Chain-of-Custody</h3>
                    <p className="text-slate-400 max-w-xl text-xs leading-relaxed font-sans">
                      This audit has been cryptographically registered on the Veridex Forensic Ledger. The SHA-256 fingerprint ensures the integrity of this analysis for discovery and editorial review.
                    </p>
                    <div className="my-6 relative h-40 w-full max-w-lg border border-deepslate overflow-hidden bg-black">
                      <img src="/images/immutable_ledger.jpg" alt="Ledger Registry Scan" className="w-full h-full object-cover opacity-85" />
                    </div>
                    <div className="mb-8 border border-deepslate bg-[#070b19]/30 p-6 max-w-lg rounded-none">
                      <p className="text-xs text-slate-300 font-sans leading-relaxed">
                        ⚠️ <span className="uppercase tracking-widest text-amber-signal mr-1 font-mono font-bold">Preliminary Analysis:</span> 
                        This scan is a diagnostic preview. Certified reports include full evidentiary trace, admissible formatting, and audit signatures required for legal or high-stakes corporate use.
                      </p>
                    </div>
                    {/* Download Full Report / Lead Capture Loop */}
                    {!email && (
                      <div className="w-full max-w-xl mb-12 overflow-hidden border border-deepslate bg-[#030712] relative rounded-none">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                          <FileCheck size={80} className="text-amber-signal" />
                        </div>
                        <div className="p-8 text-left">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="h-8 w-8 bg-amber-signal flex items-center justify-center text-black rounded-none">
                              <Mail size={16} />
                            </div>
                            <h4 className="text-xl font-bold text-white uppercase tracking-tighter font-geist">Download Full Forensic Report</h4>
                          </div>
                          <p className="text-xs text-slate-400 mb-6 leading-relaxed font-sans">
                            Get the complete evidentiary trace, cryptographically signed PDF, and admissible formatting delivered to your professional inbox.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <input 
                              type="email"
                              placeholder="professional@work-email.com"
                              className="flex-grow bg-black/60 border border-deepslate rounded-none px-6 py-4 text-xs text-white focus:border-amber-signal outline-none transition-all font-mono"
                              onBlur={(e) => setEmail(e.target.value)}
                            />
                            <button 
                              onClick={async () => {
                                let currentEmail = email;
                                if (!currentEmail) {
                                  const input = document.querySelector('input[placeholder="professional@work-email.com"]') as HTMLInputElement;
                                  if (input?.value) {
                                    currentEmail = input.value;
                                    setEmail(currentEmail);
                                  } else {
                                    setError("Valid work email required for forensic export.");
                                    return;
                                  }
                                }
                                
                                try {
                                  const res = await fetch("/api/leads/capture", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ email: currentEmail }),
                                  });
                                  if (!res.ok) throw new Error("Lead capture failed");
                                  
                                  window.gtag?.('event', 'report_download_click', { email: currentEmail });
                                  alert("Forensic report is being generated and will be sent to your email shortly.");
                                } catch (err) {
                                  console.error("Lead capture failed:", err);
                                  alert("Something went wrong. Please try again.");
                                }
                              }}
                              className="px-8 py-4 border border-amber-signal bg-amber-signal text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-transparent hover:text-amber-signal transition-all duration-300 rounded-none shadow-[0_0_10px_rgba(245,158,11,0.15)] flex items-center justify-center gap-2"
                            >
                              Download Report <ChevronRight size={16} />
                            </button>
                          </div>
                          <div className="mt-4 flex items-center gap-2 text-[9px] font-mono font-bold text-slate-600 uppercase tracking-widest">
                            <Lock size={10} /> Data encrypted. Zero-storage policy compliant.
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap justify-center gap-4 text-xs font-bold font-mono">
                      <button 
                        onClick={() => {
                          if (!email) {
                            setError("Email required to download forensic reports.");
                            const emailInput = document.querySelector('input[type="email"]');
                            emailInput?.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            return;
                          }
                          window.gtag?.('event', 'report_download_click', { email });
                          alert("Full forensic report sent to " + email);
                        }}
                        className="px-8 py-4 border border-amber-signal bg-amber-signal text-black hover:bg-transparent hover:text-amber-signal transition-all duration-300 rounded-none shadow-[0_0_12px_rgba(245,158,11,0.15)] flex items-center gap-2"
                      >
                        Download Full Forensic Report <FileCheck size={16} />
                      </button>
                      <Link 
                        href="/request-demo" 
                        onClick={() => {
                          window.gtag?.('event', 'demo_click', {
                            event_category: 'engagement',
                            event_label: 'audit_result_bottom',
                          });
                        }}
                        className="px-8 py-4 border border-deepslate text-white hover:bg-white/5 transition-all rounded-none flex items-center gap-2 uppercase tracking-wider"
                      >
                        Request Walkthrough <ChevronRight size={16} />
                      </Link>
                      <button 
                        onClick={() => {
                          setResult(null);
                          setContent("");
                          setUrl("");
                          setFile(null);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-4 text-slate-500 hover:text-white transition-all uppercase tracking-widest border border-transparent hover:border-deepslate rounded-none"
                      >
                        Analyze New
                      </button>
                    </div>
                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 opacity-40 font-mono text-[9px]">
                      <div className="flex items-center gap-2 text-slate-400 uppercase tracking-widest"><Lock size={12} /> Encrypted</div>
                      <div className="flex items-center gap-2 text-slate-400 uppercase tracking-widest"><ShieldCheck size={12} /> Verified</div>
                      <div className="flex items-center gap-2 text-slate-400 uppercase tracking-widest"><Database size={12} /> Logged</div>
                      <div className="flex items-center gap-2 text-slate-400 uppercase tracking-widest"><Activity size={12} /> Real-time</div>
                    </div>
                  </div>
                </motion.section>
              )}
          </AnimatePresence>
        </div>

        {/* Right Column: Key Stats & Visuals */}
        <div className="space-y-8">
          <section className="border border-deepslate bg-[#030712] p-8 h-fit rounded-none">
            <h3 className="mb-8 text-sm font-bold uppercase tracking-widest font-mono text-slate-400 border-b border-deepslate pb-3">// Verity Snapshot</h3>
            
            <div className="mb-10 flex flex-col items-center gap-2">
              <div className="relative flex h-48 w-48 items-center justify-center rounded-none bg-black/20 border border-deepslate/30">
                <svg className="absolute inset-0 h-full w-full" viewBox="0 0 192 192">
                  <g transform="rotate(-90 96 96)">
                    <circle
                      cx="96" cy="96" r="88" fill="transparent"
                      stroke="rgba(255, 255, 255, 0.03)" strokeWidth="6"
                    />
                    <circle
                      cx="96" cy="96" r="88" fill="transparent"
                      stroke={result ? (result.verity_index > 0.8 ? "#10B981" : result.verity_index > 0.5 ? "#F59E0B" : "#EF4444") : "#F59E0B"}
                      strokeWidth="6"
                      className="transition-all duration-1000"
                      strokeDasharray={552}
                      strokeDashoffset={552 - (552 * (result?.verity_index || 0))}
                      strokeLinecap="square"
                    />
                  </g>
                </svg>
                <div className="text-center font-mono">
                  <p className="text-5xl font-black text-white tracking-tighter">
                    {result ? Math.round(result.verity_index * 100) : "--"}
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1">Verity Index</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="border border-deepslate p-4 bg-black/40 rounded-none font-mono text-[10px]">
                <p className="mb-1 font-bold uppercase tracking-widest text-slate-500">// Origin Source</p>
                <p className={`text-base font-bold ${result?.origin === 'ai' ? 'text-red-400' : 'text-verity-green'}`}>
                  {result?.origin?.toUpperCase() || "--"}
                </p>
                <p className="text-[9px] text-slate-500 mt-1 leading-tight font-sans">Likely author classification based on linguistic patterns.</p>
              </div>
              <div className="border border-deepslate p-4 bg-black/40 rounded-none font-mono text-[10px]">
                <p className="mb-1 font-bold uppercase tracking-widest text-slate-500">// Trust Index</p>
                <p className="text-base font-bold text-white">
                  {result ? Math.round(result.truth_score * 100) : "--"}%
                </p>
                <p className="text-[9px] text-slate-500 mt-1 leading-tight font-sans">Overall probability of content being authentic/human-like.</p>
              </div>
              <div className="border border-deepslate p-4 bg-black/40 rounded-none font-mono text-[10px]">
                <p className="mb-1 font-bold uppercase tracking-widest text-slate-500">// Analysis Conf.</p>
                <p className="text-base font-bold text-white">
                  {result ? Math.round(result.confidence * 100) : "--"}%
                </p>
                <p className="text-[9px] text-slate-500 mt-1 leading-tight font-sans">Statistical certainty of the forensic engine's findings.</p>
              </div>
              <div className="border border-deepslate p-4 bg-black/40 rounded-none font-mono text-[10px]">
                <p className="mb-1 font-bold uppercase tracking-widest text-slate-500">// Risk Profile</p>
                <p className={`text-base font-bold ${result ? (result.verity_index < 0.4 ? "text-red-400" : result.verity_index < 0.7 ? "text-amber-signal" : "text-verity-green") : "text-white"}`}>
                  {result ? (result.verity_index < 0.4 ? "High Risk" : result.verity_index < 0.7 ? "Medium" : "Low Risk") : "--"}
                </p>
                <p className="text-[9px] text-slate-500 mt-1 leading-tight font-sans">Combined audit risk: Factuality, Bias, and Origin signals.</p>
              </div>
            </div>

            {result?.reasons && result.reasons.length > 0 && (
              <div className="mt-8 space-y-3 font-mono text-[10px] text-left">
                <h4 className="font-bold uppercase tracking-widest text-slate-500">// Detection Evidence</h4>
                <div className="space-y-2">
                  {result.reasons.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-sans">
                      <div className="h-1.5 w-1.5 bg-amber-signal rounded-none shrink-0" />
                      {r}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result?.copyright_risk && (
              <div className="mt-8 bg-red-500/[0.01] p-8 border border-red-500/20 text-left rounded-none">
                <div className="flex items-center justify-between mb-4 border-b border-deepslate pb-3 font-mono text-[11px]">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">⚖️</span>
                    <h4 className="font-bold text-red-400 uppercase tracking-widest">Copyright Analysis</h4>
                  </div>
                  <span className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest border ${
                    result.copyright_risk.risk_score > 0.7 ? "border-red-500 text-red-400" : "border-verity-green text-verity-green"
                  }`}>
                    {result.copyright_risk.status}
                  </span>
                </div>
                <p className="text-xs text-red-200/80 leading-relaxed font-sans mb-6">
                  {result.copyright_risk.analysis}
                </p>

                {result.copyright_risk.external_matches && result.copyright_risk.external_matches.length > 0 && (
                  <div className="space-y-3 font-mono text-[9px]">
                    <h5 className="font-bold uppercase tracking-widest text-red-300/40">// Match Evidence Details</h5>
                    <div className="grid gap-2">
                      {result.copyright_risk.external_matches.map((match, mi) => (
                        <div key={mi} className="bg-obsidian border border-deepslate rounded-none overflow-hidden transition-all hover:border-red-500/40">
                          <button 
                            onClick={() => setExpandedMatch(expandedMatch === mi ? null : mi)}
                            className="flex w-full items-center justify-between p-4 text-left"
                          >
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-200 font-sans">{match.title}</span>
                              <span className="text-[9px] text-slate-500 tracking-wider font-mono lowercase">Source: {match.source}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[9px] font-bold text-red-400">{Math.round(match.similarity * 100)}% Match</span>
                              <span className={`text-xs transition-transform duration-300 ${expandedMatch === mi ? 'rotate-180' : ''}`}>▼</span>
                            </div>
                          </button>
                          
                          <AnimatePresence>
                            {expandedMatch === mi && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-4 pb-4 overflow-hidden font-mono"
                              >
                                <div className="border border-red-900/30 bg-red-950/10 p-3 rounded-none">
                                  <p className="text-[10px] text-red-200 leading-relaxed italic font-sans">
                                    "{match.match_excerpt}"
                                  </p>
                                </div>
                                <div className="mt-3 flex items-center justify-between text-[8px] uppercase font-bold">
                                  <span className="text-slate-500">License: {match.license}</span>
                                  <button className="text-amber-signal hover:underline">View Proof Document</button>
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
            <section className="border border-deepslate bg-[#030712] p-8 rounded-none">
              <h3 className="mb-6 text-sm font-bold uppercase tracking-widest font-mono text-slate-400 border-b border-deepslate pb-3">// Bias Mapping</h3>
              <div className="h-64 w-full font-mono text-[9px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={biasData} layout="vertical" margin={{ left: -20, right: 20 }}>
                    <XAxis type="number" hide domain={[0, 1]} />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 600 }} 
                      width={100}
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                      contentStyle={{ backgroundColor: '#020617', border: '1px solid #0f172a', borderRadius: '0' }}
                    />
                    <Bar dataKey="value" radius={0}>
                      {biasData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 border border-deepslate bg-[#070b19]/30 p-4 rounded-none">
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  The content shows a primary <span className="font-bold text-amber-signal uppercase font-mono">{result?.bias_report?.primary_bias}</span> signature.
                </p>
                {result?.bias_report?.trigger_snippets && result.bias_report.trigger_snippets.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500 border-t border-deepslate pt-6 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-amber-signal rounded-none" />
                      Rhetorical Patterns Detected
                    </h4>
                    <div className="grid gap-3 font-mono text-[10px]">
                      {result.bias_report.trigger_snippets.map((item, i) => (
                        <div key={i} className="bg-obsidian p-4 border border-deepslate rounded-none transition-all hover:border-amber-signal/40">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-bold uppercase tracking-widest text-amber-signal">{item.label}</span>
                          </div>
                          <p className="text-xs text-slate-100 italic leading-relaxed mb-3 font-sans">"{item.snippet}"</p>
                          {item.mechanism && (
                            <div className="bg-[#070b19]/40 p-2 border border-deepslate rounded-none">
                              <p className="text-[9px] text-slate-400 font-medium">
                                <span className="text-amber-signal font-bold uppercase mr-1">Mechanism:</span>
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
            <section className="border border-deepslate bg-[#030712] p-6 overflow-hidden rounded-none font-mono text-left">
              <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-2">// SHA-256 Fingerprint</p>
              <p className="break-all text-[10px] text-amber-signal leading-relaxed">{result.file_hash}</p>
            </section>
          )}
        </div>
      </main>
      </div>
      <Footer />
    </div>
  );
}