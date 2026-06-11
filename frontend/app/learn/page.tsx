"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../components/Navigation";
import { 
  BookOpen, 
  Search, 
  ArrowRight,
  ShieldCheck,
  FileText,
  Clock,
  ChevronRight,
  Fingerprint,
  Lock,
  Globe
} from "lucide-react";
import Link from "next/link";

const ArticleCard = ({ title, desc, tag, href, readTime }: any) => (
  <Link href={href} className="group">
    <div className="border border-deepslate bg-[#030712] p-8 rounded-none transition-all h-full flex flex-col relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate group-hover:bg-amber-signal/30" />
      <div className="flex justify-between items-center mb-6">
        <div className="px-3 py-1 border border-deepslate bg-[#070b19]/30 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-widest rounded-none">
          {tag}
        </div>
        <div className="flex items-center gap-1 text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
           <Clock size={10} /> {readTime}
        </div>
      </div>
      <h3 className="text-lg font-bold text-white mb-4 group-hover:text-amber-signal transition-colors leading-tight font-geist uppercase">
        {title}
      </h3>
      <p className="text-slate-400 text-xs leading-relaxed mb-8 flex-1 font-sans">
        {desc}
      </p>
      <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-amber-signal">
        [ Read Article ] <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </Link>
);

export default function LearnHub() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
           <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none">
                // FORENSIC KNOWLEDGE BASE
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight font-geist uppercase">
                Forensic <br /><span className="text-amber-signal">Intelligence.</span>
              </h1>
              <p className="text-base md:text-lg text-slate-400 leading-relaxed font-sans">
                Serious articles and technical guides for professionals navigating the new era of synthetic media and informational risk.
              </p>
           </div>
           <div className="hidden lg:block opacity-25">
              <BookOpen className="text-amber-signal" size={120} />
           </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="max-w-7xl mx-auto">
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ArticleCard 
                tag="Legal"
                readTime="8 MIN"
                title="Deepfake Detection for Legal Evidence"
                desc="A guide for legal professionals on screening digital exhibits for synthetic markers and maintaining chain of custody."
                href="/learn/deepfake-detection-for-legal-evidence"
              />
              <ArticleCard 
                tag="Documents"
                readTime="6 MIN"
                title="How to Verify AI-Generated Documents"
                desc="Identifying structural and rhetorical patterns typical of Large Language Models in corporate and legal documentation."
                href="/learn/how-to-verify-ai-generated-documents"
              />
              <ArticleCard 
                tag="Forensics"
                readTime="10 MIN"
                title="Digital Chain of Custody for Media"
                desc="The role of SHA-256 ledgering and immutable timestamping in modern journalistic and investigations workflows."
                href="/learn/deepfake-detection"
              />
              <ArticleCard 
                tag="Intellectual Property"
                readTime="7 MIN"
                title="Copyright Risk in AI Content"
                desc="Understanding training-data leakage and how to identify verbatim overlap in synthetic media outputs."
                href="/features/copyright-risk-analysis"
              />
              <ArticleCard 
                tag="Provenance"
                readTime="5 MIN"
                title="Provenance Verification Explained"
                desc="Trace the digital fingerprints of informational assets from origin to publication across platform archives."
                href="/features/verity-index"
              />
              <div className="border border-amber-signal/20 bg-[#070b19]/30 p-8 rounded-none flex flex-col justify-center items-center text-center space-y-6">
                 <ShieldCheck className="text-amber-signal" size={36} />
                 <h4 className="text-lg font-bold text-white uppercase font-geist tracking-wide">// Custom Training</h4>
                 <p className="text-xs text-slate-400 font-sans leading-relaxed">Need a custom training module for your newsroom or legal team?</p>
                 <Link href="/request-demo" className="btn-switch-primary py-2 px-6 text-[10px]">Contact Specialist</Link>
              </div>
           </div>
        </div>
      </section>

      {/* Featured Insight */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-t border-deepslate scanner-grid">
        <div className="max-w-7xl mx-auto border border-deepslate bg-[#030712] p-12 rounded-none flex flex-col lg:flex-row gap-12 items-center relative z-10">
           <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
           <div className="lg:w-1/2 space-y-6">
              <h2 className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-[0.4em]">// FORENSIC INSIGHT</h2>
              <h3 className="text-3xl font-black text-white leading-tight font-geist uppercase">Beyond the 'Binary' of Deepfake Detection.</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-sans text-justify">
                As generative models evolve, looking for a simple 'Deepfake' label is no longer enough. Learn how multi-modal signal correlation is replacing traditional singular detection models.
              </p>
              <div className="pt-2 font-mono">
                <Link href="/methodology" className="btn-switch-primary">
                  Read Methodology Paper
                </Link>
              </div>
           </div>
           
           <div className="lg:w-1/2 grid grid-cols-2 gap-4 font-mono text-[11px]">
              <div className="p-6 border border-deepslate bg-deepslate/20 space-y-3 rounded-none relative">
                 <Fingerprint className="text-amber-signal" size={20} />
                 <h4 className="font-bold text-white uppercase font-geist text-xs">// Spectral</h4>
              </div>
              <div className="p-6 border border-deepslate bg-deepslate/20 space-y-3 rounded-none relative">
                 <Lock className="text-amber-signal" size={20} />
                 <h4 className="font-bold text-white uppercase font-geist text-xs">// Ledger</h4>
              </div>
              <div className="p-6 border border-deepslate bg-deepslate/20 space-y-3 rounded-none relative">
                 <Search className="text-amber-signal" size={20} />
                 <h4 className="font-bold text-white uppercase font-geist text-xs">// Decomposition</h4>
              </div>
              <div className="p-6 border border-deepslate bg-deepslate/20 space-y-3 rounded-none relative">
                 <Globe className="text-amber-signal" size={20} />
                 <h4 className="font-bold text-white uppercase font-geist text-xs">// Provenance</h4>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
