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
    <motion.div 
      whileHover={{ y: -5, borderColor: "rgba(20, 184, 166, 0.5)" }}
      className="glass rounded-3xl p-8 border border-white/5 transition-all h-full flex flex-col"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[10px] font-black text-teal-400 uppercase tracking-widest">
          {tag}
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
           <Clock size={12} /> {readTime}
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-teal-400 transition-colors leading-tight">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
        {desc}
      </p>
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-teal-500">
        Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  </Link>
);

export default function LearnHub() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 md:px-12 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
           <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-[10px] font-black text-teal-400 border border-teal-500/20 mb-6 uppercase tracking-[0.3em]">
                Knowledge Hub
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">
                Forensic <br /><span className="text-gradient">Intelligence.</span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed">
                Serious articles and technical guides for professionals navigating the new era of synthetic media and informational risk.
              </p>
           </div>
           <div className="hidden lg:block">
              <BookOpen className="text-teal-500/20" size={160} />
           </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-24 px-4 md:px-12">
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
                href="/learn/digital-chain-of-custody-for-media"
              />
              <ArticleCard 
                tag="Intellectual Property"
                readTime="7 MIN"
                title="Copyright Risk in AI-Generated Content"
                desc="Understanding training-data leakage and how to identify verbatim overlap in synthetic media outputs."
                href="/learn/copyright-risk-in-ai-generated-content"
              />
              <ArticleCard 
                tag="Provenance"
                readTime="5 MIN"
                title="Provenance Verification Explained"
                desc="Trace the digital fingerprints of informational assets from origin to publication across platform archives."
                href="/learn/provenance-verification-explained"
              />
              <div className="glass p-8 rounded-3xl border border-teal-500/30 bg-teal-500/[0.02] flex flex-col justify-center items-center text-center">
                 <ShieldCheck className="text-teal-500 mb-6" size={48} />
                 <h4 className="text-xl font-bold text-white mb-4">Request Technical Guide</h4>
                 <p className="text-xs text-slate-500 mb-8 leading-relaxed">Need a custom training module for your newsroom or legal team?</p>
                 <Link href="/request-demo" className="btn-primary w-full py-4 text-xs font-black uppercase tracking-widest">Contact Specialist</Link>
              </div>
           </div>
        </div>
      </section>

      {/* Featured Insight */}
      <section className="py-24 px-4 md:px-12 bg-slate-900/20">
        <div className="max-w-7xl mx-auto glass p-12 rounded-[3.5rem] border border-white/5 flex flex-col lg:flex-row gap-12 items-center">
           <div className="lg:w-1/2">
              <h2 className="text-sm font-black text-rose-500 uppercase tracking-[0.4em] mb-6">Expert Insight</h2>
              <h3 className="text-3xl font-black text-white mb-8 leading-tight">Beyond the 'Binary' of Deepfake Detection.</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                As generative models evolve, looking for a simple 'Deepfake' label is no longer enough. Learn how multi-modal signal correlation is replacing traditional singular detection models.
              </p>
              <Link href="/methodology" className="btn-primary inline-flex items-center gap-3">
                Read our Methodology Paper <ChevronRight size={18} />
              </Link>
           </div>
           <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                 <Fingerprint className="text-teal-500" size={24} />
                 <h4 className="font-bold text-white text-xs uppercase tracking-tight">Spectral Analysis</h4>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                 <Lock className="text-teal-500" size={24} />
                 <h4 className="font-bold text-white text-xs uppercase tracking-tight">Ledger Integrity</h4>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                 <Search className="text-teal-500" size={24} />
                 <h4 className="font-bold text-white text-xs uppercase tracking-tight">Claim Decomp</h4>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                 <Globe className="text-teal-500" size={24} />
                 <h4 className="font-bold text-white text-xs uppercase tracking-tight">Provenance</h4>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
