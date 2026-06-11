"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../../components/Navigation";
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Search,
  Zap,
  ChevronRight,
  Info
} from "lucide-react";
import Link from "next/link";

const ContentSection = ({ title, children }: any) => (
  <div className="space-y-6 mb-16">
    <h2 className="text-2xl font-black text-white uppercase tracking-tight font-geist">{title}</h2>
    <div className="text-slate-400 leading-relaxed space-y-4 font-sans text-sm text-justify">
      {children}
    </div>
  </div>
);

export default function VerifyDocumentsArticle() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      
      {/* Article Header */}
      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/learn" className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-amber-signal uppercase tracking-widest mb-12 hover:underline">
            <ArrowLeft size={12} /> [ Back to Knowledge Hub ]
          </Link>
          <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none mb-8">
            // TECHNICAL GUIDE // DOCUMENTS
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight font-geist uppercase">
            How to Verify AI-Generated <br /><span className="text-amber-signal">Documents.</span>
          </h1>
          <div className="flex items-center gap-6 text-slate-500 text-xs font-mono font-bold uppercase tracking-widest border-t border-deepslate pt-6">
            <div className="flex items-center gap-2">
               <FileText size={14} className="text-amber-signal" /> Document Forensics
            </div>
            <div className="flex items-center gap-2">
               <Clock size={14} className="text-amber-signal" /> 6 Min Read
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="max-w-4xl mx-auto">
          
          <div className="space-y-12 text-slate-400 leading-relaxed">
            <p className="text-xl text-slate-300 font-sans leading-relaxed">
              The verification of 'synthetic text'—documents produced by Large Language Models (LLMs)—requires a shift from checking facts to auditing linguistic and rhetorical signatures.
            </p>

            <ContentSection title="1. Rhetorical Pattern ID">
              <p>
                Generative models often exhibit 'Low Linguistic Variance.' This means the text relies on highly probable word sequences and repetitive rhetorical structures. Veridex analyzes the complexity and perplexity of document fragments to identify these machine-generated patterns.
              </p>
            </ContentSection>

            <div className="grid sm:grid-cols-2 gap-8 py-12 font-mono text-[11px]">
               <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative">
                 <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
                 <Zap className="text-amber-signal mb-6" size={24} />
                 <h4 className="font-bold text-white mb-3 font-geist uppercase text-xs">// Tone Skew Detection</h4>
                 <p className="text-[10px] text-slate-500 font-sans">Identifying unnatural sentiment consistency typical of synthetic corporate or legal text.</p>
               </div>
               <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative">
                 <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
                 <Search className="text-amber-signal" size={24} />
                 <h4 className="font-bold text-white mb-3 font-geist uppercase text-xs">// Claim Decomposition</h4>
                 <p className="text-[10px] text-slate-500 font-sans">Extracting atomic assertions and verifying them against primary source records.</p>
               </div>
            </div>

            <ContentSection title="2. Factual Hallucinations">
              <p>
                Unlike human error, AI 'hallucinations' often appear as highly confident, grammatically perfect statements that are functionally impossible or chronologically inconsistent. Verification involves cross-referencing named entities (actors, dates, treaty names) against verified temporal archives.
              </p>
            </ContentSection>

            <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative font-mono text-[11px] space-y-4">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
              <h4 className="font-bold text-white uppercase font-geist text-xs">// The Verity Index for Text</h4>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                A low Verity Index on a document indicates a high density of 'low-perplexity' text segments combined with factual claims that lack primary-source correlation.
              </p>
              <div className="pt-2">
                <Link href="/platform" className="inline-flex text-[9px] font-bold text-amber-signal uppercase tracking-widest hover:underline flex items-center gap-2">
                  [ View Platform Methodology ] <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            <ContentSection title="3. Practical Verification Steps">
              <ul className="list-disc pl-6 space-y-4 font-sans text-sm text-slate-400">
                <li><span className="text-white font-bold">Audit the Source:</span> Does the document have an immutable ledger proof?</li>
                <li><span className="text-white font-bold">Map the Logic:</span> Use Veridex to surface rhetorical bias and manipulation heuristics.</li>
                <li><span className="text-white font-bold">Verify Atoms:</span> Break the document into claims and audit the highest-risk assertions.</li>
              </ul>
            </ContentSection>
          </div>

          <div className="pt-24 mt-24 border-t border-deepslate flex flex-col md:flex-row justify-between gap-12 text-center md:text-left font-mono text-[11px]">
             <div className="space-y-4">
                <h5 className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">// Integrate Verification</h5>
                <h3 className="text-2xl font-black text-white font-geist uppercase">Auditing a high volume of documents?</h3>
                <div>
                  <Link href="/request-demo" className="btn-switch-primary py-2 px-6">
                     Request API Walkthrough
                  </Link>
                </div>
             </div>
             <div className="hidden md:block opacity-25">
                <FileText className="text-amber-signal" size={96} />
             </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
