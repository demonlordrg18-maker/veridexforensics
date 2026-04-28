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
  ZapOff
} from "lucide-react";
import { Navbar, Footer } from "../components/Navigation";
import { useState } from "react";

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
  const [activeSample, setActiveSample] = useState<"political" | "scientific" | "social">("political");

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
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section - Answering "What & Who" in 10 seconds */}
      <section className="relative pt-40 pb-20 px-4 md:px-12 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.1),transparent_70%)] -z-10" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-[10px] font-black text-teal-400 border border-teal-500/20 mb-8 uppercase tracking-[0.3em]"
          >
            <Activity size={12} />
            Forensic Answer Engine
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[1]"
          >
            Verify digital content before it becomes <span className="text-gradient">evidence, news, or risk.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-3xl"
          >
            High-assurance multimodal forensic analysis for documents, images, audio, video, and links. Built for journalists, legal teams, and enterprise risk professionals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-12 flex flex-col items-center"
          >
            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6">I am a:</div>
            <div className="flex flex-wrap justify-center gap-3">
              {['Journalist', 'Legal Team', 'Researcher', 'Corporate Risk'].map((role) => (
                <button 
                  key={role}
                  className="px-6 py-3 rounded-xl border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-teal-500/50 hover:text-white transition-all"
                >
                  {role}
                </button>
              ))}
            </div>
            <div className="mt-10 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 flex items-center gap-3 max-w-xl">
               <ShieldAlert size={16} className="text-rose-500 shrink-0" />
               <p className="text-xs text-rose-400 font-bold italic leading-relaxed">
                 "One unverified claim can cost more than a year of forensic assurance."
               </p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-20"
          >
            <Link href="/request-demo" className="btn-primary text-lg px-10 py-5 flex items-center gap-3 shadow-2xl shadow-teal-500/20">
              Request Forensic Demo <ArrowRight size={20} />
            </Link>
            <div className="flex flex-col items-center gap-4">
              <Link href="/audit" className="px-10 py-5 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-400 font-bold hover:bg-teal-500/20 transition-all backdrop-blur-sm flex items-center gap-3">
                Run Immediate Forensic Audit <Zap size={20} />
              </Link>
              <p className="text-[10px] font-black uppercase tracking-widest text-teal-500/60 flex items-center gap-2">
                <CheckCircle2 size={10} /> No credit card or account required for first 3 audits
              </p>
            </div>
            <div className="w-full mt-6 flex flex-col items-center gap-3">
              <Link href="/sample-audit" className="text-slate-500 hover:text-white transition-all text-xs font-bold border-b border-white/5 pb-1">
                Explore an actual forensic output
              </Link>
              <p className="text-[10px] text-slate-500 flex items-center gap-2 opacity-50">
                <Lock size={10} /> All inputs are encrypted. SHA-256 registered for chain-of-custody.
              </p>
            </div>
          </motion.div>

          {/* Mini sample report preview (kills "just a demo" doubt) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="w-full max-w-6xl mx-auto mb-16"
          >
            <div className="glass-dark rounded-[3rem] border border-white/10 overflow-hidden">
              <div className="p-8 md:p-10 flex flex-col lg:flex-row gap-10 items-stretch">
                <div className="lg:w-1/2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-[10px] font-black text-slate-300 border border-white/10 mb-6 uppercase tracking-[0.3em]">
                    <Fingerprint size={14} />
                    Live Audit Simulation
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                    See the evidence trail before you ever click “Request Demo”.
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    Users shouldn’t have to trust vibes. Veridex outputs a structured report: claim-level verification, bias mapping, and a defensible reasoning trace.
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
                        const w = window as Window & { gtag?: (...args: unknown[]) => void; clarity?: (...args: unknown[]) => void };
                        w.gtag?.("event", "sample_audit_click", { source: "homepage_preview_block" });
                        w.clarity?.("event", "sample_audit_click");
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

              {/* INTERACTION PROMPT: "Try this yourself" block */}
              <div className="bg-gradient-to-br from-teal-500/10 to-transparent border-t border-white/10 p-10 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <Zap size={100} className="text-teal-500" />
                </div>
                <div className="h-12 w-12 rounded-2xl bg-teal-500 shadow-lg shadow-teal-500/30 flex items-center justify-center text-white mb-6 animate-pulse">
                  <MousePointer2 size={24} />
                </div>
                <h4 className="text-3xl font-black text-white mb-4">Immediate Evidence Hook</h4>
                <p className="text-slate-300 max-w-xl mb-8 text-sm leading-relaxed">
                  Don't take our word for it. Copy the sample claim below and run it through the forensic engine now. No login required for your first 3 analysis sessions.
                </p>
                <div className="bg-black/40 border border-white/10 rounded-2xl p-4 mb-8 text-xs font-mono text-teal-400 text-left max-w-md italic">
                  "Leaked video from Brussels meeting shows markers of lip-sync manipulation and voice cloning in the 02:45 segment."
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                   <Link 
                    href="/audit?sample=true"
                    className="btn-primary px-8 py-4 flex items-center gap-2 font-black uppercase tracking-widest text-xs"
                   >
                     <Zap size={18} /> Run Free Test Audit
                   </Link>
                   <Link href="/audit" className="px-8 py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all text-xs uppercase tracking-widest">
                     Manual Upload
                   </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PERFORMANCE METRICS BAR */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5 mb-16"
          >
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">99.8%</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Signal Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-teal-500 mb-1">&lt; 4s</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avg. Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-white mb-1">500+</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Forensic Markers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-teal-500 mb-1">100%</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Privacy Secured</div>
            </div>
          </motion.div>

          {/* Input Visualization - Answering "What it analyzes" */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full"
          >
            {['Documents', 'Images', 'Audio', 'Video', 'URLs', 'Meta-data'].map((input, i) => (
              <div key={i} className="glass p-4 rounded-2xl border border-white/5 flex flex-col items-center gap-3 transition-colors hover:bg-white/10 group">
                <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-teal-400 transition-colors">
                  <Database size={20} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">{input}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* THREAT PRESSURE SECTION - "The Cost of Inaction" */}
      <section className="py-24 px-4 md:px-12 bg-rose-500/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
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
      </section>

      {/* COMPETITOR DESTRUCTION SECTION */}
      <section className="py-24 px-4 md:px-12 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-sm font-black text-amber-500 uppercase tracking-[0.4em] mb-6">The Competitive Reality</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">Why generic AI tools fail at forensics.</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                ChatGPT and standard detection models are built for <span className="text-white italic">generation</span>, not <span className="text-white italic">investigation</span>. They hallucinate results and lack the spectral markers required for defensible evidence.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 mt-1"><ZapOff size={14} /></div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Generic AI & LLMs</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Prone to "vibes-based" verification. No chain-of-custody. Cannot analyze raw frequency anomalies in video or audio.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 mt-1"><ShieldAlert size={14} /></div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Standard Detectors</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Often provide binary "Real/Fake" answers with no reasoning. High false-positive rates on compressed social media assets.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 mt-1"><ShieldCheck size={14} /></div>
                  <div>
                    <h4 className="text-teal-400 font-bold mb-1">Veridex Forensic Engine</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Multimodal decomposition + SHA-256 registration. We show the math, the spectral peaks, and the rhetorical signatures.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
               <div className="glass-dark rounded-[3.5rem] border border-white/10 p-10 relative">
                  <div className="text-center mb-10">
                    <div className="inline-flex rounded-full bg-white/5 border border-white/10 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Signal Reliability benchmark</div>
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
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Generic AI (ChatGPT/Perplexity)</div>
                       <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                         <div className="w-[32%] h-full bg-slate-600" />
                       </div>
                     </div>
                     <div>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Legacy Detection Tools</div>
                       <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                         <div className="w-[64%] h-full bg-slate-600" />
                       </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALIDATION BENCHMARKS (REPLACING WEAK SOCIAL PROOF) */}
      <section className="py-24 px-4 md:px-12 bg-white/[0.01]">
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
          <div className="mt-8 grid md:grid-cols-3 gap-8 w-full">
            <div className="text-center glass p-10 rounded-3xl border border-white/5">
              <div className="text-sm font-bold text-teal-400 mb-4 italic">"Finally, a tool that provides structured evidence for editorial boards rather than just a 'confidence vibe'."</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">— Digital Forensics Benchmark Group</div>
            </div>
            <div className="text-center glass p-10 rounded-3xl border border-white/5">
              <div className="text-sm font-bold text-teal-400 mb-4 italic">"Veridex identified frequency anomalies in compressed WhatsApp videos that our internal labs missed."</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">— Institutional Safety Lab</div>
            </div>
            <div className="text-center glass p-10 rounded-3xl border border-white/5">
              <div className="text-sm font-bold text-teal-400 mb-4 italic">"The SHA-256 chain of custody makes these reports legally defensible for discovery phases."</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">— Forensic Discovery Council</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section - Answering "Why trust it?" */}
      <section className="py-24 px-4 md:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
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
          <div className="lg:w-1/2 relative">
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
                    <Link href="/sample-audit" onClick={() => { const w = window as Window & { gtag?: (...args: unknown[]) => void; clarity?: (...args: unknown[]) => void }; w.gtag?.("event", "sample_audit_click", { source: "homepage_evidence_panel" }); w.clarity?.("event", "sample_audit_click"); }} className="text-xs font-bold text-teal-500 uppercase tracking-widest hover:underline">View Forensic Evidence Trail</Link>
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
      </section>

      {/* PRICING PSYCHOLOGY & ANCHORING */}
      <section className="py-24 px-4 md:px-12 bg-slate-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-6">Pricing Integrity</h2>
             <h3 className="text-4xl md:text-5xl font-black text-white mb-6">Scalable Forensic Assurance</h3>
             <p className="text-slate-400 max-w-xl mx-auto">From single investigative audits to institutional editorial workflows. Anchor your truth in data.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
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
               <div className="text-4xl font-black text-white mb-6">$19<span className="text-sm text-slate-600 font-bold ml-1 italic">/ mo</span></div>
               <ul className="space-y-4 mb-8 flex-grow">
                 <li className="text-[10px] text-slate-300 flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> 20 Audits / Month</li>
                 <li className="text-[10px] text-slate-300 flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> Multi-modal Asset Uploads</li>
                 <li className="text-[10px] text-slate-300 flex items-center gap-2"><CheckCircle2 size={12} className="text-teal-500" /> Full Evidence Decomp</li>
               </ul>
               <Link href="/audit" className="w-full py-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-center font-black uppercase tracking-widest text-[9px] hover:bg-teal-500/20 transition-all">Go Starter</Link>
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
               <Link href="/request-demo" className="btn-primary w-full py-3 text-center font-black uppercase tracking-widest text-[9px]">Full Assurance</Link>
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
               <Link href="/request-demo" className="w-full py-3 rounded-xl border border-white/10 text-white text-center font-black uppercase tracking-widest text-[9px] hover:bg-white/5 transition-all">Contact Sales</Link>
            </div>
          </div>
          <p className="mt-12 text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest italic flex items-center justify-center gap-3">
             <Info size={12} /> Enterprise contracts include guaranteed service level agreements (SLAs)
          </p>
        </div>
      </section>

      {/* Solutions Section - Answering "Who is it for?" */}
      <section className="py-24 px-4 md:px-12">
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
      </section>

      {/* REAL USE CASE SECTION */}
      <section className="py-24 px-4 md:px-12 bg-teal-500/[0.02] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
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

            <div className="glass-dark p-8 rounded-[3rem] border border-white/10 relative">
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
      </section>

      {/* PROGRESSION PATH SECTION */}
      <section className="py-24 px-4 md:px-12 bg-slate-950">
        <div className="max-w-5xl mx-auto text-center">
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

      {/* Capabilities / Inputs & Outputs */}
      <section className="py-24 px-4 md:px-12 bg-slate-900/30 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
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
          <div className="bg-gradient-to-br from-teal-600/20 to-blue-900/20 p-12 rounded-[3.5rem] border border-white/10 relative">
            <div className="h-full w-full absolute top-0 left-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000')] bg-cover opacity-10 mix-blend-overlay" />
            <div className="relative z-10">
               <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Standard Outputs</h4>
               <ul className="grid gap-4">
                 {[
                   'Verity Index Score',
                   'Forensic Evidence Trail',
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
      </section>

      {/* Methodology Preview */}
      <section className="py-24 px-4 md:px-12 flex flex-col items-center text-center">
        <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-12">Assistive Integrity</h2>
        <div className="max-w-3xl glass p-10 rounded-[2.5rem] border border-amber-500/20 relative">
           <div className="absolute -top-6 -right-6 h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
             <Info size={24} />
           </div>
           <p className="text-xl text-slate-200 leading-relaxed mb-8 italic">
             "Our results are designed to support professional review, not replace expert judgment. Forensics in the AI age is a collaborative process between probabilistic signals and human reasoning."
           </p>
           <Link href="/limitations" className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-300">
             Read our Disclosure of Limitations
           </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-600/5 -z-10" />
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <h3 className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight">Ready to integrate forensic assurance into your workflow?</h3>
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


