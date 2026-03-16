"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../components/Navigation";
import { 
  FileText, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  ArrowRight,
  Info,
  Database,
  Activity,
  Code
} from "lucide-react";
import Link from "next/link";

const MethodologySection = ({ title, description, technicalDetails }: any) => (
  <div className="py-16 border-b border-white/5 last:border-0">
    <div className="grid lg:grid-cols-[1fr,1.5fr] gap-12">
      <div>
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{description}</p>
        <Link href="/limitations" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest flex items-center gap-2">
          View Limitations <ArrowRight size={14} />
        </Link>
      </div>
      <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 font-mono text-xs">
        <div className="flex items-center gap-2 mb-6 text-teal-400">
          <Code size={16} />
          <span className="uppercase tracking-widest font-black">Technical Logic</span>
        </div>
        <ul className="space-y-4">
          {technicalDetails.map((detail: string, i: number) => (
            <li key={i} className="flex gap-4 text-slate-500">
              <span className="text-teal-600">0{i+1}</span>
              <span className="leading-relaxed">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default function MethodologyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 px-4 md:px-12 bg-slate-950">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-[10px] font-black text-teal-400 border border-teal-500/20 mb-8 uppercase tracking-[0.3em]"
          >
            Sober & Transparent
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight">
            Our <span className="text-gradient">Forensic Logic.</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Veridex does not provide "truth" as a binary service. We provide a rigorous framework for decomposing digital assets into probabilistic forensic markers.
          </p>
        </div>
      </section>

      {/* Philosophy Box */}
      <section className="py-24 px-4 md:px-12">
        <div className="max-w-5xl mx-auto glass p-12 rounded-[3rem] border border-amber-500/20 relative overflow-hidden bg-amber-500/[0.02]">
           <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="md:w-1/4">
                <Info className="text-amber-500 mx-auto" size={80} />
             </div>
             <div className="md:w-3/4">
                <h4 className="text-xl font-bold text-white mb-4">The Veridex Stance: Assistive, Not Final.</h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  In a high-stakes legal, journalistic, or research environment, automated tools should be used for screening and signal detection, not final adjudication. Our methodology is designed to augment expert human judgment by surfacing anomalies that are invisible to the naked eye/ear.
                </p>
                <div className="flex gap-6">
                   <Link href="/limitations" className="text-xs font-black text-amber-500 uppercase tracking-widest hover:underline">Read the Limitations Doc</Link>
                   <Link href="/request-demo" className="text-xs font-black text-slate-500 uppercase tracking-widest hover:text-white">Request a Technical Walkthrough</Link>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Core Heuristics Section */}
      <section className="py-24 px-4 md:px-12 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-16">Forensic Domains</h2>
          
          <MethodologySection 
            title="Multimodal Synthetic Analysis"
            description="Our primary detection layer focuses on identifying artifacts unique to generative models across frequency and spatial domains."
            technicalDetails={[
              "Spectral anomaly detection in audio (e.g., GAN voice artifacts).",
              "Error Level Analysis (ELA) for image compression inconsistencies.",
              "Temporal coherence checks for video (frame-to-frame stability).",
              "Frequency domain pattern identification in synthesized pixels."
            ]}
          />

          <MethodologySection 
            title="Claim Decomposition Heuristics"
            description="Content is broken into 'Atomic Truth Claims' using NLP models to assess the factual density and source correlation."
            technicalDetails={[
              "Named Entity Recognition (NER) to isolate actors and events.",
              "Cross-referencing against primary news agency archives (AP/Reuters).",
              "Temporal consistency audits (Checking dates vs event histories).",
              "Source-citation validation through automated web-provenance."
            ]}
          />

          <MethodologySection 
            title="Rhetorical Bias Mapping"
            description="We identify manipulation mechanisms by analyzing the linguistic structure and emotional variance of the text."
            technicalDetails={[
              "Mapping of 'Propaganda Heuristics' (e.g., loaded language, fear appeals).",
              "Sentiment variance analysis for synthetic text detection.",
              "Correlation of rhetorical patterns with known disinformation playbooks.",
              "Complexity scoring to flag machine-generated repetitive structures."
            ]}
          />

          <MethodologySection 
            title="Copyright & Origin Logic"
            description="We assess the risk of training-data leakage and verbatim overlap with known copyrighted or trademarked materials."
            technicalDetails={[
              "Embedding-based similarity threshold checks against open data sets.",
              "Fragmented match evidence for LLM 'leakage' identification.",
              "SHA-256 ledger registration for every audit artifact.",
              "Source-correlating copyright risks to specific platform training sets."
            ]}
          />
        </div>
      </section>

      {/* Confidence Scoring Logic */}
      <section className="py-24 px-4 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-black text-white mb-8">Understanding the "Verity Index"</h2>
          <p className="text-slate-400 mb-12 leading-relaxed">
            The Verity Index (0.0 to 1.0) is a weighted probabilistic score. It aggregated signals from all active modules. A low score (e.g., 0.2) does not definitively prove "falsehood," but indicates a high density of synthetic artifacts, factual inconsistencies, or rhetorical manipulation markers that require investigation.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-xl font-black text-rose-500 mb-2">0.0 - 0.4</div>
                <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">High Forensic Risk</div>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-xl font-black text-amber-500 mb-2">0.4 - 0.7</div>
                <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Intermediate Warning</div>
             </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-xl font-black text-teal-500 mb-2">0.7 - 1.0</div>
                <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Procedural Verity</div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
