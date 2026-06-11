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

const MethodologySection = ({ title, description, technicalDetails, imageUrl, imageAlt, imageTitle }: any) => (
  <div className="py-20 border-b border-deepslate last:border-0">
    <div className="grid lg:grid-cols-[1.2fr,1.8fr] gap-12 items-start">
      <div className="space-y-6">
        <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em]">// ANALYTICAL FRAMEWORK</span>
        <h3 className="text-2xl font-black text-white uppercase tracking-tight font-geist">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed font-sans">{description}</p>
        <Link href="/limitations" className="text-[10px] font-bold text-slate-400 hover:text-white font-mono uppercase tracking-widest flex items-center gap-2">
          View Limitations <ArrowRight size={12} className="text-amber-signal" />
        </Link>
      </div>
      
      <div className="space-y-6">
        {imageUrl && (
          <div className="border border-deepslate bg-[#030712] p-4 rounded-none relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-amber-signal/30" />
            <div className="flex justify-between items-center border-b border-deepslate pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 bg-amber-signal rounded-none shadow-[0_0_5px_#F59E0B]" />
                <span className="font-mono text-[9px] font-bold text-slate-300 tracking-widest uppercase">{imageTitle || "FORENSIC SIGNAL PLOT"}</span>
              </div>
              <span className="font-mono text-[8px] px-2 py-0.5 border border-deepslate text-slate-400 bg-slate-900/30">AUDIT_ACTIVE</span>
            </div>
            <div className="relative h-64 w-full bg-black border border-deepslate overflow-hidden">
              <div className="laser-scanner" />
              <img 
                src={imageUrl} 
                alt={imageAlt || title} 
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        )}

        <div className="bg-[#030712] p-8 rounded-none border border-deepslate font-mono text-[11px] relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
          <div className="flex items-center gap-2 mb-6 text-amber-signal">
            <Code size={14} />
            <span className="uppercase tracking-widest font-black">// Technical Heuristics</span>
          </div>
          <ul className="space-y-4">
            {technicalDetails.map((detail: string, i: number) => (
              <li key={i} className="flex gap-4 text-slate-400">
                <span className="text-amber-signal font-bold">[0{i+1}]</span>
                <span className="leading-relaxed">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none mb-8"
          >
            // DEFENSIVE ASSURANCES & TRANSPARENCY
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight font-geist uppercase">
            Our <span className="text-amber-signal">Forensic Logic.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto font-sans">
            Veridex does not provide "truth" as a binary service. We provide a rigorous framework for decomposing digital assets into probabilistic forensic markers.
          </p>
        </div>
      </section>

      {/* Philosophy Box */}
      <section className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="max-w-5xl mx-auto border border-amber-signal/20 bg-[#070b19]/30 p-10 rounded-none relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-amber-signal" />
           <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="md:w-1/5 flex justify-center">
                <Info className="text-amber-signal" size={64} />
             </div>
             <div className="md:w-4/5 space-y-4">
                <h4 className="text-lg font-bold text-white uppercase font-geist tracking-wide">// The Veridex Stance: Assistive, Not Final</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-sans text-justify">
                  In a high-stakes legal, journalistic, or research environment, automated tools should be used for screening and signal detection, not final adjudication. Our methodology is designed to augment expert human judgment by surfacing anomalies that are invisible to the naked eye/ear.
                </p>
                <div className="flex flex-wrap gap-6 pt-2 font-mono text-[9px]">
                   <Link href="/limitations" className="font-bold text-amber-signal uppercase tracking-widest hover:underline">[ Read the Limitations Doc ]</Link>
                   <Link href="/request-demo" className="font-bold text-slate-400 uppercase tracking-widest hover:text-white">[ Request a Technical Walkthrough ]</Link>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Concrete pipeline breakdown (defensible > marketing) */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-y border-deepslate relative scanner-grid">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-[10px] font-mono font-bold text-amber-signal uppercase tracking-[0.4em] flex items-center gap-3">
                <Cpu size={14} />
                // The pipeline flow
              </h2>
              <h3 className="text-3xl font-black text-white font-geist uppercase leading-tight">
                Concrete steps, observable artifacts.
              </h3>
              <p className="text-slate-400 text-sm font-sans leading-relaxed">
                Each audit produces intermediate artifacts (claims, sources, bias triggers, hashes) so the final score is explainable and reviewable.
              </p>
            </div>
            <div className="border border-deepslate bg-[#030712] px-5 py-3 rounded-none text-[9px] font-mono uppercase tracking-[0.25em] text-slate-400 flex items-center gap-2">
              <Database size={12} className="text-amber-signal" />
              Output: report + evidence trail
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 font-mono text-[11px]">
            {[
              {
                icon: FileText,
                title: "Step 1 — Input parsing",
                body: "Normalize text/URL/file, extract metadata, and compute SHA-256 fingerprint for chain-of-custody.",
              },
              {
                icon: Layers,
                title: "Step 2 — Claim extraction",
                body: "Break content into claim units, classify verifiability, and attach per-claim rationale + recommended actions.",
              },
              {
                icon: Activity,
                title: "Step 3 — Signal scoring",
                body: "Run modality-specific checks (synthetic artifacts, rhetorical bias, provenance/copyright signals) and produce sub-scores.",
              },
              {
                icon: ShieldCheck,
                title: "Step 4 — Risk aggregation",
                body: "Aggregate sub-signals into Verity Index + confidence. Surface contradictions/unverified claims instead of hiding them.",
              },
            ].map((s, i) => (
              <div key={i} className="border border-deepslate bg-[#030712] p-8 rounded-none flex flex-col justify-between hover:border-amber-signal/30 transition-all group">
                <div>
                  <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal mb-6 rounded-none group-hover:border-amber-signal/30 transition-colors">
                    <s.icon size={18} />
                  </div>
                  <div className="text-xs font-bold text-white uppercase tracking-tight mb-3 font-geist">{s.title}</div>
                  <div className="text-[11px] text-slate-400 leading-relaxed font-sans">{s.body}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid lg:grid-cols-2 gap-6">
            <div className="border border-deepslate bg-[#030712] p-8 rounded-none space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-b border-deepslate pb-3">
                // Target Environments
              </h4>
              <ul className="space-y-3 font-mono text-[11px] text-slate-400">
                <li className="flex gap-3">
                  <span className="text-amber-signal font-bold">[+]</span>
                  Designed for newsroom verification workflows (pre-publication screening + attribution checks).
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-signal font-bold">[+]</span>
                  Built to support legal review checklists (exhibit screening + chain-of-custody hygiene).
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-signal font-bold">[+]</span>
                  Inspired by OSINT and forensic audit practices: evidence trails, not magic answers.
                </li>
              </ul>
            </div>

            <div className="border border-amber-signal/20 bg-[#070b19]/30 p-8 rounded-none space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest border-b border-amber-signal/20 pb-3">
                // Where Veridex Should Not Be Used
              </h4>
              <ul className="space-y-3 font-mono text-[11px] text-slate-400">
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">[-]</span>
                  Not a legal verdict system (it does not determine guilt/innocence or admissibility).
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">[-]</span>
                  Not a real-time fact database (sources change; human corroboration is required).
                </li>
                <li className="flex gap-3">
                  <span className="text-red-500 font-bold">[-]</span>
                  Not safe for fully-automated enforcement; always keep a human in the loop.
                </li>
              </ul>
              <div className="pt-2 font-mono text-[9px]">
                <Link href="/limitations" className="inline-flex font-bold uppercase tracking-[0.2em] text-amber-signal hover:underline">
                  [ READ LIMITATIONS DISCLOSURE ]
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Heuristics Section */}
      <section className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs font-mono font-bold text-amber-signal uppercase tracking-[0.4em] mb-16">// Forensic Domains & Reference Plots</h2>
          
          <MethodologySection 
            title="Multimodal Synthetic Analysis"
            description="Our primary detection layer focuses on identifying artifacts unique to generative models across frequency and spatial domains. We look for the minute mathematical artifacts left behind by GANs and diffusion-based architectures."
            imageUrl="/images/spectral_analysis.jpg"
            imageAlt="Spectral decomposition"
            imageTitle="SPECTRAL SIGNAL COMPOSITION SCAN"
            technicalDetails={[
              "Spectral anomaly detection in audio (e.g., GAN voice artifacts).",
              "Error Level Analysis (ELA) for image compression inconsistencies.",
              "Temporal coherence checks for video (frame-to-frame stability).",
              "Frequency domain pattern identification in synthesized pixels."
            ]}
          />

          <MethodologySection 
            title="Topographic Signature Comparison"
            description="Isolates and models continuous signal traces to contrast natural, organic capture noise against model-generated signal voids."
            imageUrl="/images/signature_comparison.jpg"
            imageAlt="Signature comparison"
            imageTitle="TOPOGRAPHIC FREQUENCY COMPARISON"
            technicalDetails={[
              "Topographic contour mapping of signal density.",
              "Waveform alignment algorithms checking organic phase drift.",
              "Fourier transform frequency boundary validation.",
              "Correlation analysis of ambient baseline noise."
            ]}
          />

          <MethodologySection 
            title="Claim Decomposition & Biometrics"
            description="Content is broken into factual units, and speaker signals are cross-referenced with acquired facial geometry vectors to identify discrepancies."
            imageUrl="/images/biometric_manifest.jpg"
            imageAlt="Biometric Scan"
            imageTitle="BIOMETRIC CORROBORATION MATRIX"
            technicalDetails={[
              "Named Entity Recognition (NER) to isolate actors and events.",
              "Facial geometry acquisition vector alignment checks (98% threshold).",
              "Acoustic phase tracking vs lip vector alignment validation.",
              "Source-citation validation through automated web-provenance."
            ]}
          />

          <MethodologySection 
            title="Cryptographic Chain-of-Custody"
            description="Registers SHA-256 hashes of every audit run on an append-only distributed ledger to verify tamper resistance and generate defensible audit trails."
            imageUrl="/images/immutable_ledger.jpg"
            imageAlt="Blockchain Ledger"
            imageTitle="IMMUTABLE LEDGER HASH REGISTRY"
            technicalDetails={[
              "SHA-256 fingerprinting for every uploaded file.",
              "UTC-timestamped record on an immutable blockchain ledger.",
              "Tamper-evident verification API interfaces.",
              "Court-admissible PDF document signature hashing."
            ]}
          />
        </div>
      </section>

      {/* Confidence Scoring Logic */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-t border-deepslate">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-2xl font-black text-white font-geist uppercase tracking-wide">Understanding the "Verity Index"</h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto font-sans">
            The Verity Index (0.000 to 1.000) is a weighted probabilistic score that aggregates signals from all active modules. A low score indicates a high density of synthetic artifacts, factual inconsistencies, or rhetorical manipulation markers that require human oversight.
          </p>
          <div className="grid md:grid-cols-3 gap-6 font-mono text-left">
             <div className="border border-red-900/30 bg-red-950/10 p-6 rounded-none relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-red-500/20" />
                <div className="text-xl font-bold text-red-500 mb-2">0.000 - 0.400</div>
                <div className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">// High Forensic Risk</div>
             </div>
             <div className="border border-amber-signal/20 bg-amber-signal/5 p-6 rounded-none relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-amber-signal/20" />
                <div className="text-xl font-bold text-amber-signal mb-2">0.400 - 0.700</div>
                <div className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">// Warning Indicator</div>
             </div>
             <div className="border border-verity-green/20 bg-verity-green/5 p-6 rounded-none relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-verity-green/20" />
                <div className="text-xl font-bold text-verity-green mb-2">0.700 - 1.000</div>
                <div className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">// Procedural Verity</div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
