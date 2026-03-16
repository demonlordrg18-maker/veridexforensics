"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../components/Navigation";
import { 
  Database, 
  Cpu, 
  Activity, 
  LineChart, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight,
  FileText,
  Monitor,
  Search,
  Zap,
  Layers,
  Fingerprint
} from "lucide-react";
import Link from "next/link";

const ModuleCard = ({ icon: Icon, title, description, features }: any) => (
  <div className="glass p-8 rounded-3xl border border-white/5 hover:border-teal-500/30 transition-all flex flex-col h-full">
    <div className="h-12 w-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed mb-8">{description}</p>
    <ul className="mt-auto space-y-3">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex gap-3 text-xs text-slate-500 font-medium">
          <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
          {f}
        </li>
      ))}
    </ul>
  </div>
);

export default function PlatformPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero / Engine Header */}
      <section className="pt-32 pb-20 px-4 md:px-12 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-[10px] font-black text-teal-400 border border-teal-500/20 mb-6 uppercase tracking-[0.3em]">
              System Specifications
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
              The <span className="text-gradient">Veridex Engine</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-10">
              A high-assurance, multi-modal forensic layer designed to identify synthetic artifacts, factual hallucinations, and rhetorical bias across the digital content spectrum.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/audit" className="btn-primary flex items-center gap-2">
                Launch Professional Auditor <ArrowRight size={18} />
              </Link>
              <Link href="/request-demo" className="px-8 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all">
                Access Engine API
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Input Spectrum */}
      <section className="py-24 px-4 md:px-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-12">Supported Input Spectrum</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
               <FileText className="mx-auto mb-4 text-slate-400" size={32} />
               <h4 className="font-bold text-white text-sm mb-1">Documents</h4>
               <p className="text-[10px] text-slate-500 uppercase tracking-tighter">PDF, DOCX, TXT</p>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
               <Monitor className="mx-auto mb-4 text-slate-400" size={32} />
               <h4 className="font-bold text-white text-sm mb-1">Images</h4>
               <p className="text-[10px] text-slate-500 uppercase tracking-tighter">JPG, PNG, WEBP, TIFF</p>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
               <Activity className="mx-auto mb-4 text-slate-400" size={32} />
               <h4 className="font-bold text-white text-sm mb-1">Audio</h4>
               <p className="text-[10px] text-slate-500 uppercase tracking-tighter">MP3, WAV, FLAC, M4A</p>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
               <Layers className="mx-auto mb-4 text-slate-400" size={32} />
               <h4 className="font-bold text-white text-sm mb-1">Video</h4>
               <p className="text-[10px] text-slate-500 uppercase tracking-tighter">MP4, MOV, MKV, AVI</p>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
               <Link href="/audit#link" className="block group">
                 <Zap className="mx-auto mb-4 text-teal-500 animate-pulse" size={32} />
                 <h4 className="font-bold text-white text-sm mb-1 group-hover:text-teal-400 transition-colors">Digital Links</h4>
                 <p className="text-[10px] text-slate-500 uppercase tracking-tighter">YouTube, News, Social</p>
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Analysis Modules */}
      <section className="py-24 px-4 md:px-12 bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-4">Core Analysis Modules</h2>
            <h3 className="text-4xl font-black text-white">The Decomposition Engine.</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ModuleCard 
              icon={Fingerprint}
              title="Multimodal Forensics"
              description="Identifies GAN, Diffusion, and Transformer-based synthetic markers across all standard media types."
              features={[
                'Spectral frequency analysis',
                'Error Level Analysis (ELA)',
                'Frame-coherence auditing',
                'Deep-fake behavioral mapping'
              ]}
            />
            <ModuleCard 
              icon={Search}
              title="Claim Decomposition"
              description="Automatically extracts atomic factual statements and audits them against our verity index and primary news archives."
              features={[
                'Named Entity Recognition (NER)',
                'Factual density scoring',
                'Source citation verification',
                'Temporal consistency check'
              ]}
            />
            <ModuleCard 
              icon={LineChart}
              title="Bias Mapping"
              description="Decodes the rhetorical mechanisms used in a piece of content to flag cognitive bias and linguistic manipulation."
              features={[
                'Rhetorical pattern detection',
                'Sentiment variance auditing',
                'Propaganda heuristic mapping',
                'Tone analysis for synthetic text'
              ]}
            />
            <ModuleCard 
              icon={ShieldCheck}
              title="Copyright Risk Audit"
              description="Evaluates content for verbatim overlap with training data and known copyrighted material."
              features={[
                'Similarity threshold mapping',
                'License overlap detection',
                'Source training set correlation',
                'Fragmented evidence extraction'
              ]}
            />
            <ModuleCard 
              icon={Database}
              title="Transparency Ledger"
              description="Maintains an immutable record of every audit performed to support digital chain of custody."
              href="/ledger"
              features={[
                'SHA-256 artifact hashing',
                'Immutable timestamping',
                'Verifiable audit proof',
                'Exportable forensic signatures'
              ]}
            />
            <div className="bg-teal-900/20 p-8 rounded-3xl border border-teal-500/30 flex flex-col justify-center items-center text-center">
               <h4 className="text-xl font-bold text-white mb-4">Integrate Veridex API</h4>
               <p className="text-sm text-slate-400 mb-8">Build forensic verification directly into your CMS or discovery workflow.</p>
               <Link href="/request-demo" className="text-teal-400 font-bold hover:underline flex items-center gap-2 uppercase tracking-widest text-[10px]">
                 Get API Access <ChevronRight size={14} />
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Process */}
      <section className="py-24 px-4 md:px-12 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-16 text-center">The Audit Workflow</h2>
          <div className="grid md:grid-cols-5 gap-8 items-start relative text-center">
             <div className="absolute top-10 left-0 w-full h-0.5 bg-white/5 -z-10 hidden md:block" />
             {[
               { title: "Intake", desc: "Upload file or URL for screening." },
               { title: "Analysis", desc: "Forensic module activation." },
               { title: "Decomposition", desc: "Claim-level granularity audit." },
               { title: "Vetting", desc: "Probabilistic verity indexing." },
               { title: "Reporting", desc: "Evidence trail & Ledger proof." }
             ].map((step, i) => (
               <div key={i} className="space-y-4">
                 <div className="h-20 w-20 rounded-full bg-slate-900 border border-teal-500/40 flex items-center justify-center text-2xl font-black text-white mx-auto shadow-xl shadow-teal-500/10 backdrop-blur-md relative z-10">
                   {i + 1}
                 </div>
                 <h4 className="font-bold text-white text-sm uppercase tracking-tight">{step.title}</h4>
                 <p className="text-xs text-slate-500 leading-relaxed px-4">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Trust & Limitations Note */}
      <section className="py-24 px-4 md:px-12 bg-slate-950">
        <div className="max-w-5xl mx-auto glass p-12 rounded-[3rem] border border-white/5">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
             <div className="lg:w-1/3 text-center lg:text-left">
                <ShieldCheck className="text-teal-500 mx-auto lg:mx-0 mb-6" size={64} />
                <h3 className="text-2xl font-bold text-white mb-2">Assistive Intelligence</h3>
                <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-black">Professional Disclosure</p>
             </div>
             <div className="lg:w-2/3 border-t lg:border-t-0 lg:border-l border-white/10 pt-12 lg:pt-0 lg:pl-12">
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  The Veridex Engine provides probabilistic forensic markers designed to support—not replace—professional human review. Our outputs should be interpreted as expert signals rather than absolute truth, especially in high-stakes legal or newsroom environments.
                </p>
                <div className="flex gap-8">
                  <Link href="/methodology" className="text-xs font-bold text-teal-500 hover:underline uppercase tracking-widest">Full Methodology</Link>
                  <Link href="/limitations" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest">Platform Limitations</Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
