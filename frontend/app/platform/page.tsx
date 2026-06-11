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
  <div className="border border-deepslate bg-[#030712] p-8 rounded-none hover:border-amber-signal/30 transition-all flex flex-col h-full relative">
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate hover:bg-amber-signal/30" />
    <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal mb-6 rounded-none">
      <Icon size={20} />
    </div>
    <h3 className="text-lg font-bold text-white mb-4 font-geist uppercase">{title}</h3>
    <p className="text-slate-400 text-xs leading-relaxed mb-8 font-sans">{description}</p>
    <ul className="mt-auto space-y-3 font-mono text-[10px]">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex gap-3 text-slate-500 font-medium">
          <span className="text-amber-signal font-bold">[+]</span>
          {f}
        </li>
      ))}
    </ul>
  </div>
);

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      
      {/* Hero / Engine Header */}
      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none">
              // ENGINE SYSTEM SPECIFICATIONS
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight font-geist uppercase">
              The <span className="text-amber-signal">Veridex Engine</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-10 font-sans">
              A high-assurance, multi-modal forensic layer designed to identify synthetic artifacts, factual hallucinations, and rhetorical bias across the digital content spectrum.
            </p>
            <div className="flex flex-wrap gap-4 font-mono">
              <Link href="/audit" className="btn-switch-primary">
                <span className="led-indicator-amber" />
                Launch Auditor
              </Link>
              <Link href="/request-demo" className="btn-switch-secondary">
                Access Engine API
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Input Spectrum */}
      <section className="py-24 px-6 md:px-12 border-b border-deepslate bg-obsidian">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] font-mono font-bold text-amber-signal uppercase tracking-[0.4em] mb-12">// SUPPORTED INPUT VECTOR SPECTRUM</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 font-mono text-[11px]">
             <div className="p-6 border border-deepslate bg-[#030712] text-center rounded-none relative">
               <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
               <FileText className="mx-auto mb-4 text-slate-500" size={24} />
               <h4 className="font-bold text-white text-xs mb-1 uppercase font-geist">Documents</h4>
               <p className="text-[9px] text-slate-600 uppercase tracking-tighter">[PDF, DOCX, TXT]</p>
             </div>
             <div className="p-6 border border-deepslate bg-[#030712] text-center rounded-none relative">
               <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
               <Monitor className="mx-auto mb-4 text-slate-500" size={24} />
               <h4 className="font-bold text-white text-xs mb-1 uppercase font-geist">Images</h4>
               <p className="text-[9px] text-slate-600 uppercase tracking-tighter">[JPG, PNG, WEBP]</p>
             </div>
             <div className="p-6 border border-deepslate bg-[#030712] text-center rounded-none relative">
               <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
               <Activity className="mx-auto mb-4 text-slate-500" size={24} />
               <h4 className="font-bold text-white text-xs mb-1 uppercase font-geist">Audio</h4>
               <p className="text-[9px] text-slate-600 uppercase tracking-tighter">[MP3, WAV, FLAC]</p>
             </div>
             <div className="p-6 border border-deepslate bg-[#030712] text-center rounded-none relative">
               <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
               <Layers className="mx-auto mb-4 text-slate-500" size={24} />
               <h4 className="font-bold text-white text-xs mb-1 uppercase font-geist">Video</h4>
               <p className="text-[9px] text-slate-600 uppercase tracking-tighter">[MP4, MOV, MKV]</p>
             </div>
             <div className="p-6 border border-amber-signal/20 bg-[#070b19]/30 text-center rounded-none relative">
               <div className="absolute top-0 left-0 right-0 h-[1px] bg-amber-signal/20" />
               <Link href="/audit#link" className="block group">
                 <Zap className="mx-auto mb-4 text-amber-signal animate-pulse" size={24} />
                 <h4 className="font-bold text-white text-xs mb-1 group-hover:text-amber-signal transition-colors uppercase font-geist">Digital Links</h4>
                 <p className="text-[9px] text-amber-signal/60 uppercase tracking-tighter">[YouTube, URLs]</p>
               </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Forensic Visual Screens Section */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-b border-deepslate scanner-grid">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 space-y-4">
            <h2 className="text-[10px] font-mono font-bold text-amber-signal uppercase tracking-[0.4em]">// FORENSIC MODULE VISUAL PROOFS</h2>
            <h3 className="text-3xl font-black text-white font-geist uppercase">Engine Visualizers</h3>
            <p className="text-slate-400 text-sm font-sans max-w-2xl">
              Observe high-stakes capture grids across the four reference modules of Veridex.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-deepslate bg-[#030712] p-4 space-y-4 rounded-none">
              <div className="flex justify-between items-center border-b border-deepslate pb-2">
                <span className="font-mono text-[9px] text-slate-400">// SPECTRAL PLOT</span>
                <span className="text-[8px] font-mono text-red-500 font-bold">SYNTHETIC_CLONE</span>
              </div>
              <div className="relative h-48 w-full bg-black border border-deepslate overflow-hidden">
                <div className="laser-scanner" />
                <img src="/images/spectral_analysis.jpg" alt="Spectral Plot" className="w-full h-full object-cover opacity-85" />
              </div>
              <h4 className="font-bold text-white text-sm uppercase font-geist">Modality Analysis</h4>
            </div>

            <div className="border border-deepslate bg-[#030712] p-4 space-y-4 rounded-none">
              <div className="flex justify-between items-center border-b border-deepslate pb-2">
                <span className="font-mono text-[9px] text-slate-400">// SIGNATURE MAP</span>
                <span className="text-[8px] font-mono text-verity-green font-bold">ORGANIC_BASELINE</span>
              </div>
              <div className="relative h-48 w-full bg-black border border-deepslate overflow-hidden">
                <div className="laser-scanner" />
                <img src="/images/signature_comparison.jpg" alt="Signature Map" className="w-full h-full object-cover opacity-85" />
              </div>
              <h4 className="font-bold text-white text-sm uppercase font-geist">Noise Topography</h4>
            </div>

            <div className="border border-deepslate bg-[#030712] p-4 space-y-4 rounded-none">
              <div className="flex justify-between items-center border-b border-deepslate pb-2">
                <span className="font-mono text-[9px] text-slate-400">// BIOMETRIC MATRIX</span>
                <span className="text-[8px] font-mono text-amber-signal font-bold">PARTIAL_MATCH</span>
              </div>
              <div className="relative h-48 w-full bg-black border border-deepslate overflow-hidden">
                <div className="laser-scanner" />
                <img src="/images/biometric_manifest.jpg" alt="Biometric Matrix" className="w-full h-full object-cover opacity-85" />
              </div>
              <h4 className="font-bold text-white text-sm uppercase font-geist">Mesh Verification</h4>
            </div>

            <div className="border border-deepslate bg-[#030712] p-4 space-y-4 rounded-none">
              <div className="flex justify-between items-center border-b border-deepslate pb-2">
                <span className="font-mono text-[9px] text-slate-400">// LEDGER REGISTRY</span>
                <span className="text-[8px] font-mono text-verity-green font-bold">IMMUTABLE_LOG</span>
              </div>
              <div className="relative h-48 w-full bg-black border border-deepslate overflow-hidden">
                <div className="laser-scanner" />
                <img src="/images/immutable_ledger.jpg" alt="Ledger Registry" className="w-full h-full object-cover opacity-85" />
              </div>
              <h4 className="font-bold text-white text-sm uppercase font-geist">Hash Provenance</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Modules */}
      <section className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 space-y-4">
            <h2 className="text-[10px] font-mono font-bold text-amber-signal uppercase tracking-[0.4em]">// ANALYTICAL PIPELINE SPECS</h2>
            <h3 className="text-3xl font-black text-white font-geist uppercase">The Decomposition Engine</h3>
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
              features={[
                'SHA-256 artifact hashing',
                'Immutable timestamping',
                'Verifiable audit proof',
                'Exportable forensic signatures'
              ]}
            />
            <div className="border border-amber-signal/20 bg-[#070b19]/30 p-8 rounded-none flex flex-col justify-center items-center text-center space-y-6">
               <h4 className="text-lg font-bold text-white uppercase font-geist tracking-wide">// Integrate Veridex API</h4>
               <p className="text-xs text-slate-400 font-sans">Build forensic verification directly into your CMS or discovery workflow.</p>
               <Link href="/request-demo" className="text-amber-signal font-mono font-bold hover:underline flex items-center gap-2 uppercase tracking-widest text-[10px]">
                 Get API Access <ChevronRight size={14} />
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Process */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-t border-deepslate">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] font-mono font-bold text-amber-signal uppercase tracking-[0.4em] mb-16 text-center">// THE PROCEDURAL AUDIT WORKFLOW</h2>
          <div className="grid md:grid-cols-5 gap-8 items-start relative text-center">
             <div className="absolute top-10 left-0 w-full h-[1px] bg-deepslate -z-10 hidden md:block" />
             {[
               { title: "Intake", desc: "Upload file or URL for screening." },
               { title: "Analysis", desc: "Forensic module activation." },
               { title: "Decomposition", desc: "Claim-level granularity audit." },
               { title: "Vetting", desc: "Probabilistic verity indexing." },
               { title: "Reporting", desc: "Evidence trail & Ledger proof." }
             ].map((step, i) => (
               <div key={i} className="space-y-4">
                 <div className="h-20 w-20 rounded-none bg-[#030712] border border-deepslate flex items-center justify-center text-2xl font-black text-white mx-auto shadow-xl backdrop-blur-md relative z-10">
                   <div className="absolute top-0 left-0 right-0 h-[1px] bg-amber-signal/30" />
                   {i + 1}
                 </div>
                 <h4 className="font-bold text-white text-xs font-mono uppercase tracking-tight">{step.title}</h4>
                 <p className="text-[11px] text-slate-500 font-sans leading-relaxed px-4">{step.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Trust & Limitations Note */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-t border-deepslate">
        <div className="max-w-5xl mx-auto border border-deepslate bg-[#030712] p-10 rounded-none relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
          <div className="flex flex-col lg:flex-row gap-12 items-center">
             <div className="lg:w-1/3 text-center lg:text-left space-y-2">
                <ShieldCheck className="text-amber-signal mx-auto lg:mx-0 mb-4" size={48} />
                <h3 className="text-xl font-bold text-white uppercase font-geist">Assistive Intelligence</h3>
                <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-mono font-bold">// Professional Disclosure</p>
             </div>
             <div className="lg:w-2/3 border-t lg:border-t-0 lg:border-l border-deepslate pt-12 lg:pt-0 lg:pl-12 space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed font-sans text-justify">
                  The Veridex Engine provides probabilistic forensic markers designed to support—not replace—professional human review. Our outputs should be interpreted as expert signals rather than absolute truth, especially in high-stakes legal or newsroom environments.
                </p>
                <div className="flex gap-8 font-mono text-[9px]">
                  <Link href="/methodology" className="font-bold text-amber-signal hover:underline uppercase tracking-widest">[ Full Methodology ]</Link>
                  <Link href="/limitations" className="font-bold text-slate-500 hover:text-white uppercase tracking-widest">[ Platform Limitations ]</Link>
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
