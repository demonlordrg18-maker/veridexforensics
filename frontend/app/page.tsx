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
  Globe
} from "lucide-react";
import { Navbar, Footer } from "../components/Navigation";

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-20"
          >
            <Link href="/request-demo" onClick={() => { const w = window as Window & { gtag?: (...args: unknown[]) => void; clarity?: (...args: unknown[]) => void }; w.gtag?.("event", "homepage_cta_click", { cta: "request_demo_hero" }); w.clarity?.("event", "homepage_cta_click"); }} className="btn-primary text-lg px-10 py-5 flex items-center gap-3">
              Request Forensic Demo <ArrowRight size={20} />
            </Link>
            <Link href="/sample-audit" onClick={() => { const w = window as Window & { gtag?: (...args: unknown[]) => void; clarity?: (...args: unknown[]) => void }; w.gtag?.("event", "sample_audit_click", { source: "homepage_hero" }); w.clarity?.("event", "sample_audit_click"); }} className="px-10 py-5 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all backdrop-blur-sm">
              View Sample Audit
            </Link>
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
                    Sample audit preview (real report format)
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                    See the evidence trail before you ever click “Request Demo”.
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    Users shouldn’t have to trust vibes. Veridex outputs a structured report: claim-level verification, bias mapping, and a defensible reasoning trace.
                  </p>
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
                  <p className="mt-6 text-[10px] text-slate-500 leading-relaxed">
                    Designed for newsroom verification workflows and legal screening checklists. Inspired by OSINT and forensic audit practices.
                  </p>
                </div>

                <div className="lg:w-1/2 grid gap-4">
                  <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">Audit summary</div>
                      <div className="text-[10px] font-mono text-slate-600">VERITY: 0.34</div>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      High-confidence synthetic markers detected. Multiple claims require corroboration before publication or evidentiary use.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-rose-400">
                        Risk: High
                      </span>
                      <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-300">
                        Chain-of-custody: SHA-256
                      </span>
                      <span className="rounded-full bg-teal-500/10 border border-teal-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-teal-300">
                        Output: claim table + sources
                      </span>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 mb-4">
                      How the result was derived (example)
                    </div>
                    <div className="space-y-3 text-xs text-slate-300">
                      {[
                        "Detected 3 factual claims from the transcript.",
                        "Cross-referenced entity: “Apollo 11” and event date framing.",
                        "No contradiction patterns found in demo example; flagged 1 unverified claim.",
                        "Aggregated signals → Verity Index + confidence + bias profile.",
                      ].map((x, i) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="mt-1 h-2 w-2 rounded-full bg-teal-500/80" />
                          <div className="leading-relaxed">{x}</div>
                        </div>
                      ))}
                    </div>
                  </div>

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
          <div className="flex flex-wrap justify-center gap-6">
             <Link href="/request-demo" className="btn-primary px-12 py-5 text-xl font-bold">Request a Forensic Walkthrough</Link>
             <Link href="/audit" className="px-12 py-5 rounded-2xl border border-white/10 text-white text-xl font-bold hover:bg-white/5 transition-all">Submit a Sample Audit</Link>
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


