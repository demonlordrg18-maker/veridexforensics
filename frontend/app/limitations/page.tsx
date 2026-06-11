"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../components/Navigation";
import { 
  ShieldAlert, 
  Info, 
  Scale, 
  HelpCircle,
  EyeOff,
  AlertTriangle,
  ZapOff
} from "lucide-react";
import Link from "next/link";

const LimitationCard = ({ icon: Icon, title, description }: any) => (
  <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative">
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
    <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal mb-6 rounded-none">
      <Icon size={18} />
    </div>
    <h3 className="text-lg font-bold text-white mb-4 font-geist uppercase">{title}</h3>
    <p className="text-slate-400 text-xs leading-relaxed font-sans">{description}</p>
  </div>
);

export default function LimitationsPage() {
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
              // DISCLOSURE OF TECHNICAL LIMITATIONS
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight font-geist uppercase">
              Bridging the <span className="text-amber-signal">Gap.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed font-sans max-w-2xl">
              Veridex is an adaptive forensic platform. We are continuously engineering around traditional detection limits through multi-model consensus and deep-pixel analysis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="py-12 px-6 md:px-12 bg-obsidian">
        <div className="max-w-7xl mx-auto border border-amber-signal/20 bg-[#070b19]/30 p-8 rounded-none flex flex-col md:flex-row gap-8 items-center relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-signal" />
            <ShieldAlert className="text-amber-signal shrink-0" size={36} />
            <p className="text-slate-300 text-xs font-sans leading-relaxed text-justify">
              Veridex provides probabilistic and heuristic signals. We do not provide absolute legal or factual certainty. Our outputs are intended to support, not replace, the judgment of qualified experts.
            </p>
        </div>
      </section>

      {/* Main Limitations Grid */}
      <section className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LimitationCard 
              icon={EyeOff}
              title="Probabilistic Signaling"
              description="Forensic markers (deepfake detection, bias mapping) are probabilistic, not deterministic. False positives and false negatives can and do occur based on media complexity."
            />
            <LimitationCard 
              icon={Scale}
              title="Not Legal Advice"
              description="Copyright risk assessments and verity profiles are forensic indicators. They are not legal opinions and do not constitute courtroom-ready evidence without human expert testimony."
            />
            <LimitationCard 
              icon={AlertTriangle}
              title="Entropy Mapping"
              description="To counter high compression, we use linguistic and visual entropy analysis. This detects structural 'flatness' common in generative models even when surface-level artifacts are obscured."
            />
            <LimitationCard 
              icon={ZapOff}
              title="Post-Metadata Forensics"
              description="Stripped metadata no longer halts analysis. We employ Micro-noise Variance mapping to identify sensor-level inconsistencies and provenance even in scrubbed social media assets."
            />
            <LimitationCard 
               icon={HelpCircle}
               title="Live Fact-Crawl"
               description="Our extraction engine now crawls external links in real-time, cross-referencing claims against active archives to catch hallucinations that traditional static models might miss."
            />
            <LimitationCard 
               icon={Info}
               title="Human Review Required"
               description="In high-stakes cases (legal, journalistic, intelligence), Veridex outputs must be reviewed by a human professional who understands the specific context of the asset being audited."
            />
        </div>
      </section>

      {/* Specific Domain Notes */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-t border-deepslate scanner-grid">
        <div className="max-w-4xl mx-auto space-y-16 relative z-10 font-mono text-[11px]">
           <div className="space-y-4">
             <span className="text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// AUDIO & VIDEO CORE HEURISTICS</span>
             <h4 className="text-xl font-bold text-white uppercase font-geist tracking-wide">Audio & Video Limitations</h4>
             <p className="text-slate-400 text-xs font-sans leading-relaxed text-justify">
               As generative audio (voice cloning) becomes more sophisticated, the 'gap' between synthetic and organic signals continues to narrow. Veridex detects current-generation artifacts, but no tool can claim 100% detection rates against future, evolving generative models.
             </p>
           </div>
           
           <div className="pt-16 border-t border-deepslate space-y-4">
              <span className="text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// COPYRIGHT REGISTRY SCOPE</span>
              <h4 className="text-xl font-bold text-white uppercase font-geist tracking-wide">Copyright Audit Scope</h4>
              <p className="text-slate-400 text-xs font-sans leading-relaxed text-justify">
                Our copyright analysis identifies verbatim overlap and significant training-set similarity. It does not assess 'fair use,' licensing status, or jurisdictional legality. It identifies *risk* by showing *where* the content matches existing data.
              </p>
           </div>

           <div className="pt-16 border-t border-deepslate space-y-4">
              <span className="text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// GLOBAL JURISDICTIONAL COMPLIANCE</span>
              <h4 className="text-xl font-bold text-white uppercase font-geist tracking-wide">Jurisdictional Warnings</h4>
              <p className="text-slate-400 text-xs font-sans leading-relaxed text-justify">
                Legislation regarding AI-generated evidence and content labeling varies globally (e.g., EU AI Act vs. US State laws). Veridex is a technical audit tool, not a compliance platform. Users are responsible for local legal adherence.
              </p>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 text-center bg-obsidian border-t border-deepslate">
        <h3 className="text-lg font-bold text-white uppercase font-geist tracking-wide">Questions about our forensic boundaries?</h3>
        <div className="mt-6 font-mono text-[10px]">
          <Link href="/request-demo" className="btn-switch-primary">
            Request Technical Walkthrough
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
