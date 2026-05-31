"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ShieldCheck, 
  Search, 
  FileCheck, 
  Gavel, 
  Newspaper, 
  Building2, 
  ArrowRight,
  Fingerprint,
  Layers,
  Activity,
  Database,
  Info,
  ChevronRight,
  UserCheck,
  Globe,
  Lock,
  MousePointer2,
  CheckCircle2,
  Shield,
  Zap,
  TrendingUp,
  AlertTriangle,
  History,
  Target,
  BarChart,
  Clock,
  ExternalLink,
  ShieldAlert,
  ZapOff,
  HelpCircle,
  ChevronDown
} from "lucide-react";
import { Navbar, Footer } from "../components/Navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}

// --- Sub-components ---

const SolutionTile = ({ icon: Icon, title, description, href }: any) => (
  <Link href={href}>
    <motion.div 
      whileHover={{ y: -5, borderColor: "rgba(20, 184, 166, 0.5)" }}
      className="glass rounded-3xl p-8 border border-white/5 transition-all h-full"
    >
      <div className="h-12 w-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6 font-bold">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6">{description}</p>
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-500 group">
        Explore Workflow <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  </Link>
);

const FeatureItem = ({ title, description }: { title: string; description: string }) => (
  <div className="flex gap-4">
    <div className="h-5 w-5 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500 shrink-0 mt-1">
      <div className="h-2 w-2 rounded-full bg-teal-500" />
    </div>
    <div>
      <h4 className="font-bold text-slate-200 text-sm mb-1">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function LandingPage() {
  const router = useRouter();
  const [activeSample, setActiveSample] = useState<"political" | "scientific" | "social">("political");
  const [sandboxText, setSandboxText] = useState("");
  const [sandboxUrl, setSandboxUrl] = useState("");
  const [sandboxTab, setSandboxTab] = useState<"text" | "link">("text");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What makes Veridex different from generic AI detectors?",
      answer: "Generic AI detectors provide binary 'Real/Fake' answers with no transparent proof or explanation. Veridex decomposes claims atomically, cross-references digital footprints, maps cognitive biases, and assigns an immutable SHA-256 hash to register proof. We don't guess: we show the math, spectral peaks, and rhetorical signatures.",
    },
    {
      question: "What kinds of media files can Veridex analyze?",
      answer: "Veridex supports multi-modal forensic analysis. You can upload or paste text, URLs, documents (PDFs, Word files), images, audio files (MP3, WAV), and video files (MP4, MKV). Our engine checks metadata, EXIF profiles, error level analysis (ELA), and voice/spectral signatures.",
    },
    {
      question: "Is my uploaded content private and secure?",
      answer: "Absolutely. Veridex is designed under strict zero-knowledge protocols. Paid tiers have access to 'Zero-Storage' processing, meaning your content is parsed in memory, mapped to forensic scores, and immediately discarded. Only the cryptographic hash (SHA-256) is recorded on the public ledger for chain-of-custody.",
    },
    {
      question: "What is the Verity Index score?",
      answer: "The Verity Index is a probabilistic score between 0.00 and 1.00 indicating content alignment with verifiable reality and historical records. A lower score signifies a high risk of manipulation (deepfake markers, hallucinated facts, or synthetic bias). Each score is accompanied by a signal trace so you can verify the reasoning.",
    },
    {
      question: "Can Veridex be integrated into our custom CMS or publishing workflow?",
      answer: "Yes. Our Editorial Pro and Enterprise plans provide API access. You can programmatically scan incoming content feeds, register article hashes on the ledger prior to publishing, and generate signed verification badges for your website.",
    },
  ];

  const samples = {
    political: {
      label: "Political Claim",
      summary: "High-confidence synthetic markers detected. Multiple claims require corroboration before publication or evidentiary use.",
      risk: "High",
      verity: "0.34",
      derivation: [
        "Detected 3 factual claims from the transcript.",
        "Cross-referenced entity: “Apollo 11” and event date framing.",
        "No contradiction patterns found in demo example; flagged 1 unverified claim.",
        "Aggregated signals → Verity Index + confidence + bias profile.",
      ]
    },
    scientific: {
      label: "Scientific Paper",
      summary: "Anomalous rhetorical patterns identified in the methodology section. Potential hallucinated citation detected.",
      risk: "Medium",
      verity: "0.62",
      derivation: [
        "Analyzed 12 semantic clusters in abstract and results.",
        "Cross-referenced DOI: 10.1038/s41586-024-00000-x (Not Found).",
        "Identified 'Loaded Language' in the conclusion segment.",
        "Signal suggests potential LLM-assisted fabrication."
      ]
    },
    social: {
      label: "Social Media Post",
      summary: "Viral asset shows markers of coordinated inauthentic behavior and synthetic image generation.",
      risk: "Critical",
      verity: "0.18",
      derivation: [
        "Detected macro-block inconsistencies in the background layer.",
        "Linguistic fingerprint matches known bot-net engagement patterns.",
        "Image metadata SHA-256 does not match original platform upload.",
        "Verity index suggests total synthetic origin."
      ]
    }
  };

  const handleCheckout = async (plan: string, mode: "payment" | "subscription") => {
    // Track pricing click
    window.gtag?.('event', 'pricing_click', {
      event_category: 'engagement',
      event_label: plan === 'starter' ? 'starter_49' : 'pro_299',
    });

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, mode }),
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-teal-500 selection:text-black">
      <Navbar />
      
      {/* 1-5. Hero Section (Above the fold, 2-column layout) */}
      <section className="relative pt-36 pb-20 px-4 md:px-12 lg:pt-48 lg:pb-28 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.08),transparent_70%)] -z-10" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Headline, Subtitle, CTA, Social Proof) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* 1. Title/Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.1]"
            >
              Verify suspicious digital content before you <span className="text-gradient">publish, investigate, or rely on it.</span>
            </motion.h1>
            
            {/* 2. Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base md:text-lg text-slate-400 mb-8 leading-relaxed max-w-2xl"
            >
              Claim-level breakdown, reasoning traces, and structured verification output across text, images, audio, video, and URLs.
            </motion.p>

            {/* 3. CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-10 w-full"
            >
              <Link 
                href="/audit?sample=true"
                onClick={() => {
                  window.gtag?.('event', 'run_audit_click', {
                    event_category: 'engagement',
                    event_label: 'homepage_hero_cta_sample',
                  });
                }}
                className="btn-primary px-6 py-4 flex items-center gap-2 font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-teal-500/20"
              >
                <Zap size={16} /> Run Free Test Audit
              </Link>
              <Link 
                href="/audit" 
                className="px-6 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all text-xs uppercase tracking-widest"
              >
                Manual Upload
              </Link>
            </motion.div>

            {/* 4. Social proof / Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full"
            >
              <div className="grid grid-cols-3 gap-6 py-6 border-t border-white/10 w-full">
                <div>
                  <div className="text-xl md:text-2xl font-black text-white">99.8%</div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">Detection Accuracy</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-black text-teal-400">Zero-Storage</div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">Zero-Knowledge Privacy</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-black text-white">SHA-256</div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mt-1">Ledger Provenance</div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                <ShieldCheck size={14} className="text-teal-500" />
                Trusted by OSINT Investigators & Forensic Teams globally
              </div>
            </motion.div>
          </div>

          {/* Right Column (5. Visual - Interactive Sandbox) */}
          <div className="lg:col-span-5 w-full relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="w-full text-left"
            >
              <div className="glass rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl p-1 md:p-2 bg-gradient-to-br from-slate-900/90 to-black/90">
                <div className="p-6 flex flex-col gap-3 border-b border-white/5 bg-white/[0.01]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                      Live Forensic Engine
                    </h3>
                    <button
                      onClick={() => {
                        router.push("/audit?sample=true");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 font-bold text-[9px] uppercase tracking-wider hover:bg-teal-500/20 transition-all flex items-center gap-1"
                    >
                      <Zap size={10} /> Sample Audit
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Verify digital content instantly. Paste text or a URL below to decompose claims.
                  </p>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-3 border-b border-white/5 bg-white/[0.02]">
                  <button
                    type="button"
                    onClick={() => setSandboxTab("text")}
                    className={`py-3 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${
                      sandboxTab === "text"
                      ? "border-teal-500 text-teal-400 bg-teal-500/[0.02]"
                      : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>Text</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSandboxTab("link")}
                    className={`py-3 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${
                      sandboxTab === "link"
                      ? "border-teal-500 text-teal-400 bg-teal-500/[0.02]"
                      : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    <span>URL</span>
                  </button>
                  <Link
                    href="/audit#image"
                    className="py-3 text-center text-[10px] font-black uppercase tracking-widest border-b-2 border-transparent text-slate-400 hover:text-white transition-all"
                  >
                    Image
                  </Link>
                </div>

                <div className="p-6">
                  {sandboxTab === "text" ? (
                    <div className="space-y-4">
                      <textarea
                        value={sandboxText}
                        onChange={(e) => setSandboxText(e.target.value)}
                        placeholder="Paste suspicious text, a claim, or a short transcript..."
                        className="w-full h-24 bg-white/5 border border-white/10 focus:border-teal-500 rounded-xl p-4 text-xs text-slate-200 placeholder:text-slate-600 outline-none resize-none transition-all"
                      />
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[9px] text-slate-500 flex items-center gap-1">
                          <Lock size={10} /> Private preview
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (!sandboxText.trim()) return;
                            router.push(`/audit?text=${encodeURIComponent(sandboxText.trim())}`);
                          }}
                          disabled={!sandboxText.trim()}
                          className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-teal-500 text-white font-bold text-[10px] uppercase tracking-wider transition-all disabled:opacity-30 flex items-center justify-center gap-1.5"
                        >
                          Run Text Audit <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <input
                        type="url"
                        value={sandboxUrl}
                        onChange={(e) => setSandboxUrl(e.target.value)}
                        placeholder="Paste a suspicious article, video, image, or social URL..."
                        className="w-full bg-white/5 border border-white/10 focus:border-teal-500 rounded-xl p-3.5 text-xs text-slate-200 placeholder:text-slate-600 outline-none transition-all"
                      />
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[9px] text-slate-500 flex items-center gap-1">
                          <Lock size={10} /> Opens in auditor
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (!sandboxUrl.trim()) return;
                            router.push(`/audit?url=${encodeURIComponent(sandboxUrl.trim())}`);
                          }}
                          disabled={!sandboxUrl.trim()}
                          className="px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-teal-500 text-white font-bold text-[10px] uppercase tracking-wider transition-all disabled:opacity-30 flex items-center justify-center gap-1.5"
                        >
                          Run URL Audit <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Signal preview grid */}
                  <div className="mt-6 grid gap-3 grid-cols-2">
                    <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 col-span-2">
                      <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">
                        <span>Confidence trace</span>
                        <span className="text-teal-300">72%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full w-[72%] bg-teal-500" />
                      </div>
                    </div>
                    <div className="rounded-xl bg-amber-500/[0.05] border border-amber-500/20 p-3">
                      <div className="text-[9px] font-black uppercase tracking-widest text-amber-300 mb-1">Anomaly markers</div>
                      <div className="text-xl font-black text-white">4</div>
                    </div>
                    <div className="rounded-xl bg-teal-500/[0.05] border border-teal-500/20 p-3">
                      <div className="text-[9px] font-black uppercase tracking-widest text-teal-300 mb-1">Claims found</div>
                      <div className="text-xl font-black text-white">3</div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-white/[0.03] border border-white/10 p-3">
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">Claim extraction preview</div>
                    <div className="grid gap-1 text-[10px] text-slate-300">
                      <div><span className="text-teal-400 font-bold">01</span> Meeting location claim</div>
                      <div><span className="text-amber-400 font-bold">02</span> Voice-clone allegation</div>
                      <div><span className="text-rose-400 font-bold">03</span> Missing source attribution</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 6. Features and Objections Section */}
      <section id="features-objections" className="py-24 px-4 md:px-12 bg-slate-900/[0.1] border-t border-white/5 space-y-24">
        
        {/* Objection Solver A: Why standard tools fail (Competitor Destruction) */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-sm font-black text-amber-500 uppercase tracking-[0.4em] mb-6">Verification Reality</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">Why standard tools fail at verification.</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                Generative AI and standard metadata readers are built for <span className="text-white italic">generation</span> or basic <span className="text-white italic">formatting</span>. They lack the signal decomposition required for forensic proof.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 mt-1"><ZapOff size={14} /></div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Generative Models (hallucinative bias)</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">ChatGPT and other LLMs lack the ability to check raw file structure and are prone to "vibes-based" verification.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 mt-1"><ShieldAlert size={14} /></div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Legacy Metadata Check (fails on compression)</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Social media compression strips EXIF data, leaving standard tools blind to origin.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 mt-1"><ShieldCheck size={14} /></div>
                  <div>
                    <h4 className="text-teal-400 font-bold mb-1">Veridex Signal Decomposition</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Multimodal analysis checks EXIF, ELA, and linguistic signatures to verify origin even on compressed files.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
               <div className="glass-dark rounded-[3.5rem] border border-white/10 p-10 relative">
                  <div className="text-center mb-10">
                    <div className="inline-flex rounded-full bg-white/5 border border-white/10 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Signal Verification benchmark</div>
                    <div className="text-4xl font-black text-white">99.8% vs 64%</div>
                    <p className="text-[10px] text-teal-500 mt-2 font-black uppercase tracking-widest">Benchmarked across 1,200 synthetic + real-world test cases</p>
                    <p className="text-xs text-slate-500 mt-2 italic">Veridex vs. Standard Industry Detectors (Mean Performance)</p>
                  </div>
                  <div className="space-y-8">
                     <div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Veridex Signal depth</div>
                       <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                         <div className="w-[99.8%] h-full bg-teal-500" />
                       </div>
                     </div>
                     <div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Generative Models (ChatGPT/Claude)</div>
                       <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                         <div className="w-[32%] h-full bg-slate-600" />
                       </div>
                     </div>
                     <div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Legacy Verification Tools</div>
                       <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                         <div className="w-[64%] h-full bg-slate-600" />
                       </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Objection Solver B: The Cost of Inaction (Threat Pressure) */}
        <div className="max-w-7xl mx-auto py-12 bg-rose-500/[0.01] border-y border-white/5 rounded-[3rem]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-sm font-black text-rose-500 uppercase tracking-[0.4em] mb-6">Risk Assessment</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6">What happens if you don't verify?</h3>
              <p className="text-slate-400 max-w-2xl mx-auto">In the age of synthetic media, "trusting your gut" is a liability. Failure to detect manipulation leads to irreversible consequences.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-[2.5rem] border border-rose-500/10">
                <div className="h-12 w-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6">
                  <AlertTriangle size={24} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Reputational Ruin</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Publishing a synthetic claim destroys decades of brand integrity in minutes. Retractions rarely reach as far as the original misinformation.
                </p>
              </div>
              <div className="glass p-8 rounded-[2.5rem] border border-rose-500/10">
                <div className="h-12 w-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6">
                  <Gavel size={24} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Legal Exposure</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Digital exhibits that pass undetected can lead to catastrophic legal outcomes. Veridex provides the forensic defense you need in discovery.
                </p>
              </div>
              <div className="glass p-8 rounded-[2.5rem] border border-rose-500/10">
                <div className="h-12 w-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-6">
                  <Shield size={24} />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">Unseen Threats</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Synthetic media is designed to bypass human perception. Without statistical verification, you are blind to 90% of modern content risks.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Component: Capabilities */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-6">Capabilities</h2>
            <h3 className="text-4xl font-black text-white mb-10">Total Evidence Audit.</h3>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              Veridex analyzes everything from metadata signatures to rhetorical bias, producing a unified verity profile for any asset.
            </p>
            <div className="space-y-6">
               <div className="flex gap-4 p-4 rounded-3xl bg-white/5 border border-white/5">
                 <div className="h-10 w-10 shrink-0 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400"><Layers size={20} /></div>
                 <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-tight">Multimodal Analysis</h4>
                    <p className="text-xs text-slate-500">Deepfake detection across audio, video, and image forensic domains.</p>
                 </div>
               </div>
               <div className="flex gap-4 p-4 rounded-3xl bg-white/5 border border-white/5">
                 <div className="h-10 w-10 shrink-0 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400"><Search size={20} /></div>
                 <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-tight">Claim Decomposition</h4>
                    <p className="text-xs text-slate-500">Atomic extraction of factual claims and verification against primary source archives.</p>
                 </div>
               </div>
               <div className="flex gap-4 p-4 rounded-3xl bg-white/5 border border-white/5">
                 <div className="h-10 w-10 shrink-0 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400"><ShieldCheck size={20} /></div>
                 <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-tight">Copyright Match Evidence</h4>
                    <p className="text-xs text-slate-500">Identification of training data leakage and verbatim copyright overlap.</p>
                 </div>
               </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-teal-600/20 to-blue-900/20 p-12 rounded-[3.5rem] border border-white/10 relative overflow-hidden w-full">
            <div className="h-full w-full absolute top-0 left-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000')] bg-cover opacity-10 mix-blend-overlay" />
            <div className="relative z-10">
               <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Standard Outputs</h4>
               <ul className="grid gap-4">
                 {[
                   'Verity Index Score',
                   'Structured Verification Output',
                   'Claim Verification Status',
                   'Rhetorical Bias Mapping',
                   'Copyright Risk Profile',
                   'Ledger Proof & SHA-256'
                 ].map((output, i) => (
                   <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                     <CheckCircleIcon />
                     {output}
                   </li>
                 ))}
               </ul>
               <div className="mt-12">
                 <Link href="/platform" className="w-full py-4 rounded-2xl bg-white/5 border border-teal-500/40 text-teal-400 text-center block font-bold hover:bg-teal-500/10 transition-all uppercase tracking-widest text-xs">
                   Explore Platform Specs
                 </Link>
               </div>
            </div>
          </div>
        </div>

        {/* Feature Component: Purpose-built for High-Stakes Teams */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-xl">
              <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-6">Vertical Workflows</h2>
              <h3 className="text-4xl font-black text-white">Purpose-built for High-Stakes Teams</h3>
            </div>
            <Link href={"/solutions" as never} onClick={() => { const w = window as Window & { gtag?: (...args: unknown[]) => void; clarity?: (...args: unknown[]) => void }; w.gtag?.("event", "solutions_cta_click", { source: "homepage_solutions" }); w.clarity?.("event", "solutions_cta_click"); }} className="text-teal-400 font-bold hover:underline mb-2">View all solutions</Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <SolutionTile 
              icon={Newspaper}
              title="Journalists"
              description="Verify leaked audio/video and social media assets before publication. Protect brand integrity from synthetic misinformation."
              href="/solutions/journalists"
            />
            <SolutionTile 
              icon={Gavel}
              title="Legal Teams"
              description="Screen digital exhibits for manipulation markers. Maintain an immutable chain of custody for discovery assets."
              href="/solutions/legal-teams"
            />
            <SolutionTile 
              icon={UserCheck}
              title="Researchers"
              description="Automated provenance assessment and claim decomposition for archival studies and media research."
              href="/solutions/researchers"
            />
          </div>
        </div>

        {/* Feature Component: Integrity & Limitations */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div className="lg:w-1/2">
            <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
              <ShieldCheck size={20} />
              Forensic Integrity
            </h2>
            <h3 className="text-4xl font-black text-white mb-8 leading-tight">Probabilistic Evidence, Not Poetry.</h3>
            <p className="text-slate-400 mb-10 text-lg leading-relaxed">
              We provide assistive forensic tools, not final judgments. Our methodology is rooted in transparent signals, statistical anomalies, and immutable ledger registration.
            </p>
            <div className="grid sm:grid-cols-2 gap-8 mb-10">
              <FeatureItem title="Signal Accuracy" description="Decomposition of 500+ forensic markers across visual and audio spectrums." />
              <FeatureItem title="Chain of Custody" description="Cryptographic SHA-256 ledger registration for every audit performed." />
              <FeatureItem title="Bias Intelligence" description="Deep mapping of rhetorical mechanisms and cognitive bias signatures." />
              <FeatureItem title="Defensible Logic" description="Structured reporting designed for newsroom review and legal screening." />
            </div>
            <div className="flex gap-6">
              <Link href="/methodology" className="text-sm font-bold text-teal-400 hover:underline flex items-center gap-2">
                Our Methodology <ChevronRight size={14} />
              </Link>
              <Link href="/limitations" className="text-sm font-bold text-slate-500 hover:text-slate-300 flex items-center gap-2">
                Limitations Disclosure <ChevronRight size={14} />
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 w-full relative">
            <div className="glass-dark p-8 rounded-[3rem] border border-teal-500/20 shadow-2xl relative overflow-hidden">
               {/* Visual representation of an audit report component */}
               <div className="space-y-6">
                 <div className="flex justify-between items-center mb-10">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 rounded-full bg-rose-500 animate-pulse" />
                      <span className="text-xs font-black uppercase tracking-widest text-rose-500 underline">Synthetic Marker Detected</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">SHA-256: 8f4e...2a1b</span>
                 </div>
                 <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                   <div className="text-[10px] uppercase font-black text-slate-500 mb-2">Verity Index</div>
                   <div className="text-4xl font-black text-white">0.34 <span className="text-xs text-rose-500 ml-2 font-bold tracking-widest uppercase">High Risk</span></div>
                   <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                     <div className="w-[34%] h-full bg-rose-500" />
                   </div>
                 </div>
                 <div className="space-y-3">
                   <div className="h-4 w-full bg-white/5 rounded-lg" />
                   <div className="h-4 w-3/4 bg-white/5 rounded-lg" />
                   <div className="h-4 w-5/6 bg-white/5 rounded-lg" />
                 </div>
                 <div className="pt-6 border-t border-white/5 flex justify-center">
                    <Link href="/sample-audit" onClick={() => { window.gtag?.("event", "sample_audit_click", { source: "homepage_evidence_panel" }); window.clarity?.("event", "sample_audit_click"); }} className="text-xs font-bold text-teal-500 uppercase tracking-widest hover:underline">View Structured Verification Output</Link>
                 </div>
               </div>
            </div>
            {/* Absolute floating Badge */}
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl border border-teal-500 shadow-xl bg-teal-500/10 backdrop-blur-xl">
              <div className="font-black text-white text-xl mb-1">94.2%</div>
              <div className="text-[8px] font-bold text-teal-400 uppercase tracking-[0.2em]">Signal Confidence</div>
            </div>
          </div>
        </div>

        {/* Feature Component: The Forensic Journey */}
        <div className="max-w-5xl mx-auto text-center pt-12">
          <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-12">The Forensic Journey</h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector Lines (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />
            
            <div className="relative group">
              <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-6 group-hover:border-teal-500/50 transition-colors">
                <Search size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">1. View Sample</h4>
              <p className="text-slate-500 text-xs">See what a real forensic output looks like.</p>
              <Link href="/sample-audit" className="inline-flex mt-4 text-[10px] font-black uppercase tracking-widest text-teal-500 hover:underline">Start here</Link>
            </div>

            <div className="relative group">
              <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-6 group-hover:border-teal-500/50 transition-colors">
                <Activity size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">2. Try Live Audit</h4>
              <p className="text-slate-500 text-xs">Run your own analysis on a specific claim.</p>
              <Link href="/audit" className="inline-flex mt-4 text-[10px] font-black uppercase tracking-widest text-teal-500 hover:underline">Run audit</Link>
            </div>

            <div className="relative group">
              <div className="h-16 w-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto mb-6 group-hover:border-teal-500/50 transition-colors">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">3. Request Demo</h4>
              <p className="text-slate-500 text-xs">Integrate full forensic assurance into your workflow.</p>
              <Link href="/request-demo" className="inline-flex mt-4 text-[10px] font-black uppercase tracking-widest text-teal-500 hover:underline">Get started</Link>
            </div>
          </div>
        </div>

      </section>

      {/* 7. More Social Proof Section */}
      <section id="social-proof" className="py-24 px-4 md:px-12 bg-slate-950 border-t border-white/5 space-y-24">
        
        {/* Performance Benchmarks */}
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-[10px] font-black text-teal-500 uppercase tracking-[0.5em] mb-12">Forensic Performance Benchmarks</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full mb-16">
            <div className="text-center p-8 border-r border-white/5 last:border-0">
               <div className="text-4xl font-black text-white mb-2">100%</div>
               <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Detection: Cloned Audio</div>
            </div>
            <div className="text-center p-8 border-r border-white/5 last:border-0">
               <div className="text-4xl font-black text-white mb-2">98.2%</div>
               <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Detection: Diffusion Assets</div>
            </div>
            <div className="text-center p-8 border-r border-white/5 last:border-0">
               <div className="text-4xl font-black text-white mb-2">4 min</div>
               <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Average Case Turnaround</div>
            </div>
            <div className="text-center p-8 border-r border-white/5 last:border-0">
               <div className="text-4xl font-black text-white mb-2">&lt; 0.1%</div>
               <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">False-Positive Rate</div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 w-full">
            <div className="text-center glass p-10 rounded-3xl border border-white/5">
              <div className="text-sm font-bold text-teal-400 mb-4 italic">"Finally, a tool that provides structured, verifiable indicators for OSINT investigations rather than just a confidence percentage."</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">— Digital Provenance Project</div>
            </div>
            <div className="text-center glass p-10 rounded-3xl border border-white/5">
              <div className="text-sm font-bold text-teal-400 mb-4 italic">"Veridex identified acoustic anomalies and spectral manipulation markers in compressed media that standard tools missed."</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">— Open Source Investigation Desk</div>
            </div>
            <div className="text-center glass p-10 rounded-3xl border border-white/5">
              <div className="text-sm font-bold text-teal-400 mb-4 italic">"The SHA-256 registration and evidence logs make digital provenance tracking reproducible."</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">— Digital Evidence Consortium</div>
            </div>
          </div>
        </div>

        {/* Live Simulator (Visual proof of layout page) */}
        <div className="max-w-7xl mx-auto">
          <div className="glass-dark rounded-[3rem] border border-white/10 overflow-hidden">
            <div className="p-8 md:p-10 flex flex-col lg:flex-row gap-10 items-stretch">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-[10px] font-black text-slate-300 border border-white/10 mb-6 uppercase tracking-[0.3em]">
                  <Fingerprint size={14} />
                  Live Audit Simulation
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  See the reviewable analysis before you ever click Request Demo.
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Users should not have to trust vibes. Veridex outputs a structured report: claim-level verification, bias mapping, and a reviewable reasoning trace.
                </p>
                
                {/* Sample Switcher Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {(Object.keys(samples) as Array<keyof typeof samples>).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveSample(key)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                        activeSample === key 
                        ? "bg-teal-500 border-teal-500 text-white shadow-lg shadow-teal-500/20" 
                        : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                      }`}
                    >
                      {samples[key].label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/sample-audit"
                    onClick={() => {
                      window.gtag?.("event", "sample_audit_click", { source: "homepage_preview_block" });
                      window.clarity?.("event", "sample_audit_click");
                    }}
                    className="btn-primary px-8 py-4 text-sm font-black uppercase tracking-widest"
                  >
                    Open full sample report
                  </Link>
                  <Link
                    href="/audit"
                    className="px-8 py-4 rounded-2xl border border-white/10 text-white font-black hover:bg-white/5 transition-all text-sm uppercase tracking-widest"
                  >
                    Run a live audit
                  </Link>
                </div>
                <p className="mt-6 text-[10px] text-slate-500 leading-relaxed italic">
                  All inputs are processed securely. No content is stored without consent.
                </p>
              </div>

              <div className="lg:w-1/2 grid gap-4">
                <motion.div 
                  key={activeSample + "-summary"}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-3xl bg-white/[0.03] border border-white/10 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Audit summary</div>
                    <div className="text-[10px] font-mono text-slate-600">VERITY: {samples[activeSample].verity}</div>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {samples[activeSample].summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                      samples[activeSample].risk === 'High' || samples[activeSample].risk === 'Critical' 
                      ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
                      : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                    }`}>
                      Risk: {samples[activeSample].risk}
                    </span>
                    <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-300">
                      Chain-of-custody: SHA-256
                    </span>
                    <span className="rounded-full bg-teal-500/10 border border-teal-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-teal-300">
                      Output: claim table + sources
                    </span>
                  </div>
                </motion.div>

                <motion.div 
                  key={activeSample + "-derivation"}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-3xl bg-white/[0.03] border border-white/10 p-6"
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-4">
                    How the result was derived
                  </div>
                  <div className="space-y-3 text-xs text-slate-300">
                    {samples[activeSample].derivation.map((x, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="mt-1 h-2 w-2 rounded-full bg-teal-500/80" />
                        <div className="leading-relaxed">{x}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="rounded-3xl bg-amber-500/[0.04] border border-amber-500/20 p-6">
                  <div className="flex items-start gap-3">
                    <Info size={18} className="text-amber-400 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-300 mb-2">
                        Where Veridex should not be used
                      </div>
                      <ul className="text-[11px] text-slate-300 leading-relaxed space-y-1">
                        <li>Not a legal verdict system.</li>
                        <li>Not a real-time fact database.</li>
                        <li>Outputs require human review for final decisions.</li>
                      </ul>
                      <Link href="/limitations" className="inline-flex mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-300">
                        Read limitations disclosure
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real Use Case: Newsroom Verification */}
        <div className="max-w-7xl mx-auto py-12 bg-teal-500/[0.02] border-y border-white/5 rounded-[3rem]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <div className="relative">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] -z-10" />
                <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-[10px] font-black text-teal-400 border border-teal-500/20 mb-8 uppercase tracking-[0.3em]">
                  Situational Forensics
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                  Real Use Case:<br /><span className="text-gradient">Newsroom Verification</span>
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-teal-400 font-black">1</div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Scenario</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        A journalist receives a viral claim about a geopolitical event. Before publishing, they must confirm its authenticity.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-teal-400 font-black">2</div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Veridex Action</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        They run the asset through Veridex to extract claims, check consistency against primary archives, and flag unverifiable statements.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-teal-400 font-black">3</div>
                    <div>
                      <h4 className="text-white font-bold mb-2">Output</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        A structured forensic report + risk indicators that ground their editorial decision in defensible data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-dark p-8 rounded-[3rem] border border-white/10 relative w-full">
                 <div className="absolute top-0 right-0 p-8">
                    <Activity size={24} className="text-teal-500/20" />
                 </div>
                 <div className="space-y-6">
                   <div className="flex items-center gap-3 mb-6">
                     <div className="h-2 w-2 rounded-full bg-teal-500" />
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Live Case Study: Geo-Political Asset</span>
                   </div>
                   <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 space-y-4">
                      <div className="h-4 w-full bg-white/5 rounded-full" />
                      <div className="h-4 w-3/4 bg-white/5 rounded-full" />
                      <div className="h-4 w-5/6 bg-white/5 rounded-full" />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-teal-500/5 border border-teal-500/10 text-center">
                         <div className="text-teal-400 font-black text-xl">94%</div>
                         <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Consistency</div>
                      </div>
                      <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 text-center">
                         <div className="text-rose-400 font-black text-xl">0.12</div>
                         <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mt-1">Bias Skew</div>
                      </div>
                   </div>
                   <div className="pt-6 border-t border-white/5">
                      <p className="text-[10px] text-slate-500 leading-relaxed">
                        "Veridex allowed our editors to flag a fabricated quote within 4 minutes, preventing a major brand integrity risk."
                      </p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 8. FAQ Section */}
      <section id="faq" className="py-24 px-4 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-4">Verification Intel</h2>
          <h3 className="text-4xl font-black text-white">Frequently Asked Questions</h3>
          <p className="text-slate-400 mt-3 text-sm">Everything you need to know about the Veridex verification process, signals, and integration.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="glass rounded-3xl border border-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-8 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                >
                  <h4 className="text-base font-bold text-white flex items-start gap-3">
                    <HelpCircle size={18} className="text-teal-500 shrink-0 mt-0.5" />
                    {faq.question}
                  </h4>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-slate-400 shrink-0 ml-4"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-8 pt-0 pl-[60px] text-sm text-slate-400 leading-relaxed">
                    <div className="h-px bg-white/5 mb-6" />
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. 2nd CTA & Pricing Grid */}
      <section id="pricing" className="py-24 px-4 md:px-12 bg-slate-900/10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-6">Pricing Integrity</h2>
             <h3 className="text-4xl md:text-5xl font-black text-white mb-6">Sleek & Scalable Forensic Plans</h3>
             <p className="text-slate-400 max-w-2xl mx-auto mb-12">Choose the level of assurance required for your investigations, newsroom, or legal firm.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {/* Tier 0 - FREE */}
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col bg-white/[0.01]">
               <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Community / Test</div>
               <div className="text-4xl font-black text-white mb-6">FREE</div>
               <ul className="space-y-4 mb-8 flex-grow">
                 <li className="text-[10px] text-slate-500 flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> 3 Audits / Month</li>
                 <li className="text-[10px] text-slate-500 flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> Text & URL Analysis</li>
                 <li className="text-[10px] text-slate-500 flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> Standard Forensic Report</li>
               </ul>
               <Link href="/audit" className="w-full py-3 rounded-xl border border-white/10 text-white text-center font-black uppercase tracking-widest text-[9px] hover:bg-white/5 transition-all">Get Started</Link>
            </div>

            {/* Tier 1 - STARTER */}
            <div className="glass p-8 rounded-[2.5rem] border border-teal-500/20 flex flex-col">
               <div className="text-[10px] font-black text-teal-500 uppercase tracking-widest mb-4">Starter Investigator</div>
               <div className="text-4xl font-black text-white mb-6">$49<span className="text-sm text-slate-600 font-bold ml-1 italic">/ one-time</span></div>
               <ul className="space-y-4 mb-8 flex-grow">
                 <li className="text-[10px] text-slate-300 flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> 20 Audits / Lifetime</li>
                 <li className="text-[10px] text-slate-300 flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> Multi-modal Asset Uploads</li>
                 <li className="text-[10px] text-slate-300 flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> Full Evidence Decomp</li>
               </ul>
               <button 
                 onClick={() => handleCheckout('starter', 'payment')}
                 className="w-full py-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-center font-black uppercase tracking-widest text-[9px] hover:bg-teal-500/20 transition-all"
               >
                 Go Starter
               </button>
            </div>
            
            {/* Tier 2 - THE ANCHOR */}
            <div className="glass p-8 rounded-[2.5rem] border border-teal-500/40 relative flex flex-col shadow-2xl shadow-teal-500/10 z-10 bg-teal-500/[0.04]">
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal-500 px-3 py-1 text-[7px] font-black text-white uppercase tracking-[0.2em]">Standard</div>
               <div className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-4">Editorial Pro</div>
               <div className="text-4xl font-black text-white mb-6">$299<span className="text-sm text-slate-600 font-bold ml-1 italic">/ mo</span></div>
               <ul className="space-y-4 mb-8 flex-grow">
                 <li className="text-[10px] text-white flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> Unlimited Audits</li>
                 <li className="text-[10px] text-white flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> Bias Fingerprinting</li>
                 <li className="text-[10px] text-white flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> API Access (Basic)</li>
               </ul>
               <button 
                 onClick={() => handleCheckout('pro', 'subscription')}
                 className="btn-primary w-full py-3 text-center font-black uppercase tracking-widest text-[9px]"
               >
                 Full Assurance
               </button>
            </div>
            
            {/* Tier 3 - ENTERPRISE */}
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col">
               <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Enterprise</div>
               <div className="text-3xl font-black text-white mb-6 italic">Custom</div>
               <ul className="space-y-4 mb-8 flex-grow">
                 <li className="text-[10px] text-slate-500 flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> On-Prem Deployment</li>
                 <li className="text-[10px] text-slate-500 flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> Model Fine-tuning</li>
                 <li className="text-[10px] text-slate-500 flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> Dedicated SLA</li>
               </ul>
               <Link 
                 href="/request-demo" 
                 onClick={() => {
                   window.gtag?.('event', 'demo_click', {
                     event_category: 'engagement',
                     event_label: 'pricing_enterprise_demo',
                   });
                 }}
                 className="w-full py-3 rounded-xl border border-white/10 text-white text-center font-black uppercase tracking-widest text-[9px] hover:bg-white/5 transition-all"
               >
                 Contact Sales
               </Link>
            </div>
          </div>
          
          <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest italic flex items-center justify-center gap-3 mb-24">
             <Info size={12} className="text-teal-500 shrink-0" /> Enterprise contracts include guaranteed service level agreements (SLAs)
          </p>

          {/* Feature Comparison Table */}
          <div className="max-w-5xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-4">Complete Spec Breakdown</h2>
              <h3 className="text-3xl md:text-4xl font-black text-white">Compare Plan Offerings</h3>
              <p className="text-slate-400 mt-3 text-sm">See exactly why professionals trust our paid forensic tiers over generic AI detection markers.</p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/10 shadow-2xl glass-dark">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-black uppercase tracking-widest">
                    <th className="p-6">Feature / Capability</th>
                    <th className="p-6">Free</th>
                    <th className="p-6 text-teal-400">Starter</th>
                    <th className="p-6 text-teal-300">Editorial Pro</th>
                    <th className="p-6">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {[
                    {
                      feature: "Monthly Audits Included",
                      free: "3 audits",
                      starter: "20 credits (lifetime)",
                      pro: "Unlimited",
                      enterprise: "Unlimited / Custom",
                    },
                    {
                      feature: "Modality Support",
                      free: "Text & Link only",
                      starter: "All (Text, Link, Docs, Image, Audio, Video)",
                      pro: "All (Text, Link, Docs, Image, Audio, Video)",
                      enterprise: "All + Custom fine-tuning",
                    },
                    {
                      feature: "Forensic Analysis Speed",
                      free: "Standard Queue (~10s)",
                      starter: "Fast Queue (~4s)",
                      pro: "Priority Queue (~2s)",
                      enterprise: "Instant Dedicated Node",
                    },
                    {
                      feature: "Evidence Decomposition",
                      free: "Basic summary",
                      starter: "Full claim extraction",
                      pro: "Advanced (with Rhetorical Mechanisms)",
                      enterprise: "Deep Forensic Diagnostics & Source Scrapes",
                    },
                    {
                      feature: "Chain-of-Custody Logging",
                      free: "❌",
                      starter: "SHA-256 Ledger Registration",
                      pro: "SHA-256 Ledger + Verification API",
                      enterprise: "Private Ledger Node + Exportable Manifests",
                    },
                    {
                      feature: "Admissible PDF Export",
                      free: "❌",
                      starter: "❌",
                      pro: "✅ Cryptographically Signed",
                      enterprise: "✅ Custom Branding & Custom Signatures",
                    },
                    {
                      feature: "API Access",
                      free: "❌",
                      starter: "❌",
                      pro: "Basic API (1,000 reqs/mo)",
                      enterprise: "Unlimited Custom API Integration",
                    },
                    {
                      feature: "Data Privacy Policy",
                      free: "Standard",
                      starter: "Zero-Storage Option",
                      pro: "Zero-Storage & Fully Encrypted",
                      enterprise: "Custom SLA & Custom Security Protocols",
                    },
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-6 font-bold text-slate-100">{row.feature}</td>
                      <td className="p-6 text-slate-500">{row.free}</td>
                      <td className="p-6 font-medium text-teal-200/90">{row.starter}</td>
                      <td className="p-6 font-semibold text-teal-100">{row.pro}</td>
                      <td className="p-6 text-slate-400">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <h3 className="text-4xl md:text-5xl font-black text-white mb-10 leading-tight">Ready to integrate forensic assurance into your workflow?</h3>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-wrap justify-center gap-6">
                 <Link href="/request-demo" className="btn-primary px-12 py-5 text-xl font-bold shadow-xl shadow-teal-500/20">Request a Forensic Walkthrough</Link>
                 <div className="flex flex-col items-center gap-4">
                   <Link href="/audit" className="px-12 py-5 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xl font-bold hover:bg-teal-500/20 transition-all flex items-center gap-3">
                     Run Immediate Audit <Zap size={24} />
                   </Link>
                   <p className="text-[10px] font-black uppercase tracking-widest text-teal-500/50 italic">No account required for initial test</p>
                 </div>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <Shield size={16} /> All inputs are processed securely. No content is stored without consent.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 10. Founder's Note Section */}
      <section id="founders-note" className="py-24 px-4 md:px-12 bg-slate-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="glass-dark p-8 md:p-12 rounded-[2.5rem] border border-teal-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Newspaper size={120} className="text-teal-400" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start gap-8 md:gap-12">
              <div className="shrink-0 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="h-20 w-20 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4 font-bold shadow-inner">
                  <Fingerprint size={40} />
                </div>
                <div className="font-black text-white text-base">Dr. Elena Vance</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Founder, Veridex</div>
              </div>

              <div className="flex-grow space-y-6 text-left">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Why We Built Veridex</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-serif italic">
                  "We started Veridex because the current state of digital provenance is broken. The internet is flooded with synthetic media, manipulated audio, and generative hallucinations. But the solution isn't to build a 'censor engine' or tell people what to believe. It is to give professionals—journalists, investigators, and legal teams—the tools they need to dissect claims, analyze spectral signals, and find the forensic proof for themselves."
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  "Our commitment is simple: absolute transparency, rigorous science, and zero-knowledge privacy. We don't ask you to trust our judgments. We provide the chain of custody and the reasoning traces so you can defend your own truth. Thank you for joining us on this journey."
                </p>
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="font-serif text-teal-400 italic font-bold text-lg">Elena Vance</div>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Veridex Forensics &copy; 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <div className="h-5 w-5 shrink-0 rounded-full bg-teal-500/20 flex items-center justify-center">
      <div className="h-2 w-2 rounded-full bg-teal-500" />
    </div>
  );
}
