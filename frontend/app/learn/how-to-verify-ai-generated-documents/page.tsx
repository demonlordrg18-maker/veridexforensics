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

export default function VerifyDocumentsArticle() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 md:px-12 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <Link href="/learn" className="inline-flex items-center gap-2 text-xs font-bold text-teal-500 uppercase tracking-widest mb-12 hover:underline">
            <ArrowLeft size={14} /> Back to Knowledge Hub
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-[10px] font-black text-teal-400 border border-teal-500/20 mb-8 uppercase tracking-[0.3em]">
            Technical Guide: Documents
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
            How to Verify AI-Generated <br /><span className="text-gradient">Documents.</span>
          </h1>
          <div className="flex items-center gap-6 text-slate-500 text-sm font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
               <FileText size={16} /> Document Forensics
            </div>
            <div className="flex items-center gap-2">
               <Clock size={16} /> 6 Min Read
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="space-y-12 text-slate-400 leading-relaxed">
            <p className="text-xl text-slate-300">
              The verification of 'synthetic text'—documents produced by Large Language Models (LLMs)—requires a shift from checking facts to auditing linguistic and rhetorical signatures.
            </p>

            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">1. Rhetorical Pattern ID</h2>
              <p>
                Generative models often exhibit 'Low Linguistic Variance.' This means the text relies on highly probable word sequences and repetitive rhetorical structures. Veridex analyzes the complexity and perplexity of document fragments to identify these machine-generated patterns.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 py-12">
               <div className="glass p-8 rounded-3xl border border-white/5">
                 <Zap className="text-teal-500 mb-6" size={24} />
                 <h4 className="font-bold text-white mb-3">Tone Skew Detection</h4>
                 <p className="text-xs text-slate-500">Identifying unnatural sentiment consistency typical of synthetic corporate or legal text.</p>
               </div>
               <div className="glass p-8 rounded-3xl border border-white/5">
                 <Search className="text-teal-500 mb-6" size={24} />
                 <h4 className="font-bold text-white mb-3">Claim Decompositon</h4>
                 <p className="text-xs text-slate-500">Extracting atomic assertions and verifying them against первичный source records.</p>
               </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">2. Factual Hallucinations</h2>
              <p>
                Unlike human error, AI 'hallucinations' often appear as highly confident, grammatically perfect statements that are functionally impossible or chronologically inconsistent. Verification involves cross-referencing named entities (actors, dates, treaty names) against verified temporal archives.
              </p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-slate-900 border border-white/5 space-y-4">
              <h4 className="font-bold text-white">The Verity Index for Text</h4>
              <p className="text-sm text-slate-500">
                A low Verity Index on a document indicates a high density of 'low-perplexity' text segments combined with factual claims that lack primary-source correlation.
              </p>
              <Link href="/platform" className="text-xs font-bold text-teal-400 uppercase tracking-widest hover:underline flex items-center gap-2 mt-4">
                View Platform Methodology <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-6 pt-12">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">3. Practical Verification Steps</h2>
              <ul className="list-disc pl-6 space-y-4">
                <li><span className="text-white font-bold">Audit the Source:</span> Does the document have an immutable ledger proof?</li>
                <li><span className="text-white font-bold">Map the Logic:</span> Use Veridex to surface rhetorical bias and manipulation heuristics.</li>
                <li><span className="text-white font-bold">Verify Atoms:</span> Break the document into claims and audit the highest-risk assertions.</li>
              </ul>
            </div>
          </div>

          <div className="pt-24 mt-24 border-t border-white/5 flex flex-col md:flex-row justify-between gap-12 text-center md:text-left">
             <div>
                <h5 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">Integrate Verification</h5>
                <h3 className="text-2xl font-black text-white mb-6">Auditing a high volume of documents?</h3>
                <Link href="/request-demo" className="btn-primary inline-flex items-center gap-2">
                   Request API Walkthrough <ChevronRight size={18} />
                </Link>
             </div>
             <div className="hidden md:block">
                <FileText className="text-teal-500/10" size={120} />
             </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
