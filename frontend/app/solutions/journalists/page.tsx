"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../../components/Navigation";
import { 
  Newspaper, 
  ShieldCheck, 
  Search, 
  ArrowRight,
  ChevronRight,
  Database,
  Globe,
  Radio,
  Video
} from "lucide-react";
import Link from "next/link";

export default function JournalistSolution() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-3/5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none">
              // EDITORIAL WORKFLOW OPERATIONS
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight font-geist uppercase">
              Pre-Publication <span className="text-amber-signal">Verification.</span>
            </h1>
            <p className="text-base text-slate-400 leading-relaxed font-sans">
              Verify leaked video/audio, check manipulated images, and evaluate source authenticity before headers hit the wire. Document an evidence trail for rigorous editorial review.
            </p>
            <div className="flex flex-wrap gap-4 font-mono">
              <Link href="/request-demo" className="btn-switch-primary">
                <span className="led-indicator-amber" />
                Request License
              </Link>
              <Link href="/audit" className="btn-switch-secondary">
                Audit a Leak
              </Link>
            </div>
          </motion.div>
          
          <div className="lg:w-2/5 p-8 border border-deepslate bg-[#030712] rounded-none relative overflow-hidden font-mono text-[11px]">
             <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
             <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3 border-b border-deepslate pb-3">
                  <div className="h-1.5 w-1.5 bg-amber-signal rounded-none shadow-[0_0_5px_#F59E0B]" />
                  <span className="text-[9px] font-bold uppercase text-white tracking-widest">// SOURCE ANOMALY SCAN</span>
                </div>
                <div className="space-y-4">
                  <div className="h-3 w-full bg-slate-900" />
                  <div className="h-3 w-5/6 bg-amber-signal/20" />
                </div>
                <div className="pt-6 border-t border-deepslate">
                  <div className="text-[9px] font-bold text-slate-500 uppercase mb-4 tracking-widest">// DECOMPOSITION MATRIX</div>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Provenance Confidence</span>
                    <span className="text-verity-green font-bold tracking-widest">94% (PASS)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                    <span>Bias Mapping</span>
                    <span className="text-amber-signal font-bold tracking-widest">SKEWED</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6 md:px-12 border-b border-deepslate bg-obsidian">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] font-mono font-bold text-amber-signal uppercase tracking-[0.4em] mb-16 text-center">// EDITORIAL USE CASES</h2>
          <div className="grid md:grid-cols-3 gap-8 font-mono text-[11px]">
             {[
               {
                 icon: Radio,
                 title: "Verifying Leaked Audio",
                 desc: "Screen whistle-blower audio for voice-cloning artifacts and spectral inconsistencies before integrating it into reporting."
               },
               {
                 icon: Video,
                 title: "Video Authenticity Check",
                 desc: "Audit social media footage from conflict zones for frame-rate anomalies, AI-insertion markers, or deepfake tampering."
               },
               {
                 icon: Globe,
                 title: "Source Origin Intelligence",
                 desc: "Trace digital fingerprints and metadata signatures to verify the geographical or platform origin of informational assets."
               }
             ].map((useCase, i) => (
               <div key={i} className="border border-deepslate bg-[#030712] p-8 rounded-none flex flex-col justify-between relative">
                 <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
                 <div>
                   <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal mb-6 rounded-none">
                     <useCase.icon size={18} />
                   </div>
                   <h4 className="text-base font-bold text-white mb-4 font-geist uppercase">{useCase.title}</h4>
                   <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">{useCase.desc}</p>
                 </div>
                 <Link href="/features/verity-index" className="text-[9px] font-bold text-amber-signal uppercase tracking-widest hover:underline flex items-center gap-1 mt-2">
                   [ Engine Metrics ] <ChevronRight size={12} />
                 </Link>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 30-Second Product Walkthrough */}
      <section className="py-24 px-6 md:px-12 border-b border-deepslate bg-[#02050b]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// 30-SECOND WALKTHROUGH</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">What Happens After You Upload?</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">Follow the automated pipeline from raw media intake to verifiable evidence registry.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="border border-deepslate bg-[#030712] p-8 space-y-4 relative">
              <div className="absolute -top-4 left-6 bg-amber-signal text-black px-2 py-0.5 font-mono text-[10px] font-bold">01 / INTAKE</div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mt-2">Upload Asset or URL</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Drag-and-drop the evidence file (audio, video, PDF, or image) or paste a web address. The payload is transiently written in RAM; we never persist your source files.
              </p>
            </div>
            
            <div className="border border-deepslate bg-[#030712] p-8 space-y-4 relative">
              <div className="absolute -top-4 left-6 bg-amber-signal text-black px-2 py-0.5 font-mono text-[10px] font-bold">02 / DECOMPOSITION</div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mt-2">Automated Modality Scanning</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Parallel validation engines analyze acoustic vocoder signatures, measure EXIF camera profile consistency, and map stylographic writing patterns.
              </p>
            </div>

            <div className="border border-deepslate bg-[#030712] p-8 space-y-4 relative">
              <div className="absolute -top-4 left-6 bg-amber-signal text-black px-2 py-0.5 font-mono text-[10px] font-bold">03 / REGISTRY</div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mt-2">Verity Report & Ledger Lock</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Receive a signed forensic PDF report containing raw confidence metrics, timeline graphs, and a tamper-evident SHA-256 stamp recorded on our immutable ledger.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-6">
              <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// INTEGRITY GUARANTEES</span>
              <h3 className="text-3xl font-black text-white font-geist uppercase leading-tight">Protecting Editorial Integrity in the AI Era.</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Misinformation moves faster than fact-checking. Veridex gives newsrooms a forensic shield against high-quality synthetic deceptive media.
              </p>
              <ul className="space-y-6 font-mono text-[11px]">
                 <li className="flex gap-4">
                   <div className="h-8 w-8 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal shrink-0 rounded-none"><ShieldCheck size={18} /></div>
                   <div>
                     <span className="font-bold text-white uppercase font-geist text-xs">Brand Defense</span>
                     <p className="text-[11px] text-slate-500 font-sans mt-1">Prevent the publication of deepfakes that could damage newsroom credibility.</p>
                   </div>
                 </li>
                 <li className="flex gap-4">
                    <div className="h-8 w-8 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal shrink-0 rounded-none"><Search size={18} /></div>
                    <div>
                      <span className="font-bold text-white uppercase font-geist text-xs">Claim Verification</span>
                      <p className="text-[11px] text-slate-500 font-sans mt-1">Decompose viral claims into atomic parts and verify against historical records.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-8 w-8 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal shrink-0 rounded-none"><Database size={18} /></div>
                    <div>
                      <span className="font-bold text-white uppercase font-geist text-xs">Evidence Trail</span>
                      <p className="text-[11px] text-slate-500 font-sans mt-1">Store immutable ledger proof of your verification process for archival integrity.</p>
                    </div>
                  </li>
              </ul>
           </div>
           
           <div className="border border-deepslate bg-[#030712] p-12 rounded-none relative font-mono text-[11px] space-y-8">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
              <h4 className="text-xl font-bold text-white uppercase font-geist tracking-wide">// Newsroom Output Stats</h4>
              <div className="space-y-8">
                 {[
                   { label: "Asset Verity Index", value: "0.890", type: "low-risk" },
                   { label: "Rhetorical Mapping", value: "Highly Objective", type: "bias-profile" },
                   { label: "Provenance Score", value: "94% Match", type: "authenticity" },
                   { label: "Source Signature", value: "Verified Press Agency", type: "identity" }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-end border-b border-deepslate pb-4">
                      <div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className="text-2xl font-black text-white">{stat.value}</div>
                      </div>
                      <div className="px-2 py-0.5 border border-deepslate text-[9px] font-bold text-amber-signal uppercase bg-deepslate/30">{stat.type}</div>
                   </div>
                 ))}
              </div>
              <div className="mt-12 text-center">
                 <Link href="/sample-audit" className="text-[9px] font-bold text-slate-400 hover:text-white uppercase tracking-[0.2em]">[ OPEN EDITORIAL AUDIT SAMPLE ]</Link>
              </div>
           </div>
        </div>
      </section>

      {/* Trust & Methodology Note */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-t border-deepslate">
        <div className="max-w-4xl mx-auto border border-amber-signal/20 bg-[#070b19]/30 p-10 rounded-none relative text-center space-y-4">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-amber-signal/20" />
          <p className="text-base text-slate-300 leading-relaxed italic font-sans">
            "Veridex forensic outputs are designed for editorial assistants. They provide signals to journalists and editors, but should not replace high-standard editorial verification and cross-referencing."
          </p>
          <div className="flex justify-center gap-8 font-mono text-[9px]">
            <Link href="/methodology" className="font-bold text-amber-signal uppercase tracking-widest hover:underline">[ Newsroom Methodology ]</Link>
            <Link href="/limitations" className="font-bold text-slate-500 uppercase tracking-widest hover:text-white">[ Platform Limitations ]</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 md:px-12 text-center bg-obsidian border-t border-deepslate">
        <h3 className="text-2xl md:text-3xl font-black text-white font-geist uppercase mb-6">Elevate your newsroom's forensic verification.</h3>
        <div className="font-mono">
          <Link href="/request-demo" className="btn-switch-primary">Request Newsroom Walkthrough</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
