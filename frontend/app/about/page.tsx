"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../components/Navigation";
import { 
  ShieldCheck, 
  Target, 
  Scale, 
  ArrowRight,
  Info,
  Database,
  Globe
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none">
              // FORENSIC MISSION STATEMENT
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight font-geist uppercase">
              Why We Built <span className="text-amber-signal">Veridex.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed font-sans max-w-2xl">
              Veridex exists to provide high-stakes teams with the forensic tools needed to bridge the gap between digital content and defensible evidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem Space */}
      <section className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-6">
              <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// CONTEXT ANALYSIS</span>
              <h3 className="text-3xl font-black text-white leading-tight font-geist uppercase">The Erosion of Public Verification.</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans text-justify">
                As generative AI models become the primary producers of digital content, the traditional methods of verification—visual inspection and metadata trust—are failing. We are entering an era where the cost of creating a perfect deepfake is approaching zero, while the cost of verifying it manually is rising exponentially.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed font-sans text-justify">
                This isn't a "Trust & Safety" problem in the abstract. It is a forensic problem for journalists, a discovery problem for lawyers, and an archival problem for researchers.
              </p>
              <div className="pt-2 font-mono text-[9px]">
                <Link href="/platform" className="font-bold text-amber-signal uppercase tracking-widest hover:underline">
                  [ Explore the Engine ]
                </Link>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-6 font-mono text-[11px]">
              <div className="border border-deepslate bg-[#030712] p-8 rounded-none space-y-4 relative">
                 <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
                 <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal"><Target size={18} /></div>
                 <h4 className="font-bold text-white uppercase text-xs font-geist">// Targeted Focus</h4>
                 <p className="text-[10px] text-slate-500 leading-relaxed font-sans">We don't build generic AI filters. We build tools for professionals who need an evidence trail.</p>
              </div>
              <div className="border border-deepslate bg-[#030712] p-8 rounded-none space-y-4 relative">
                 <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
                 <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal"><Database size={18} /></div>
                 <h4 className="font-bold text-white uppercase text-xs font-geist">// Ledger-First</h4>
                 <p className="text-[10px] text-slate-500 leading-relaxed font-sans">Verification is useless if it isn't immutable. Every audit is registered for chain-of-custody.</p>
              </div>
              <div className="border border-deepslate bg-[#030712] p-8 rounded-none space-y-4 relative">
                 <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
                 <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal"><Scale size={18} /></div>
                 <h4 className="font-bold text-white uppercase text-xs font-geist">// Assistive</h4>
                 <p className="text-[10px] text-slate-500 leading-relaxed font-sans">We respect expert judgment. Our tools augment human logic, they don't replace it.</p>
              </div>
              <div className="border border-deepslate bg-[#030712] p-8 rounded-none space-y-4 relative">
                 <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
                 <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal"><Globe size={18} /></div>
                 <h4 className="font-bold text-white uppercase text-xs font-geist">// Global Scale</h4>
                 <p className="text-[10px] text-slate-500 leading-relaxed font-sans">Built for a decentralized world where informational integrity is a global priority.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-t border-deepslate scanner-grid">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-12">
           <h2 className="text-[10px] font-mono font-bold text-amber-signal uppercase tracking-[0.4em] mb-12">// Our Product Heuristics</h2>
           <h3 className="text-3xl md:text-4xl font-black text-white font-geist uppercase">Probabilistic signals for high-trust workflows.</h3>
           <div className="space-y-12 text-left">
              <div className="pb-12 border-b border-deepslate">
                 <h4 className="text-lg font-bold text-white uppercase font-geist tracking-wide">// 01. Integrity-First Infrastructure</h4>
                 <p className="text-slate-400 leading-relaxed text-sm font-sans text-justify mt-2">
                   Veridex is built on the belief that informational integrity is the foundation of institutional trust. Whether in a courtroom or a newsroom, the ability to document *how* a piece of media was verified is as important as the verification itself. That’s why we focus on 'Evidence Trails' rather than just 'True/False' labels.
                 </p>
              </div>
              <div className="pb-12 border-b border-deepslate">
                 <h4 className="text-lg font-bold text-white uppercase font-geist tracking-wide">// 02. Algorithmically Honest</h4>
                 <p className="text-slate-400 leading-relaxed text-sm font-sans text-justify mt-2">
                   We are honest about our boundaries. Forensic detection in the age of Blackwell-era compute is a cat-and-mouse game. We don't promise 100% detection; we promise 100% transparency into the signals we use, the logic we follow, and the limitations of our heuristics.
                 </p>
              </div>
              <div>
                 <h4 className="text-lg font-bold text-white uppercase font-geist tracking-wide">// 03. Augmenting the Expert</h4>
                 <p className="text-slate-400 leading-relaxed text-sm font-sans text-justify mt-2">
                   Our system is designed to surface 'Anomalies of Interest.' A lawyer doesn't want a machine to win their case; they want a machine to show them where the opposing exhibit's frame-rate is inconsistent. A journalist doesn't want a machine to write their lead; they want a machine to flag the voice-cloning artifacts in a leaked tape.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Trust Callout */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-t border-deepslate text-center">
        <div className="max-w-3xl mx-auto border border-amber-signal/20 bg-[#070b19]/30 p-10 rounded-none relative">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-amber-signal/20" />
           <p className="text-lg text-slate-200 mb-8 italic font-sans">
             "We build for the professionals who can’t afford to be 'pretty sure.' We build for the teams that need to be defensible."
           </p>
           <div className="font-mono text-[9px]">
             <Link href="/methodology" className="font-bold text-amber-signal uppercase tracking-widest hover:underline">[ Read Our Methodology ]</Link>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
