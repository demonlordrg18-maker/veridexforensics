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
  <div className="py-20 border-b border-slate-900 last:border-0">
    <div className="grid lg:grid-cols-[1.2fr,1.8fr] gap-12 items-start">
      <div className="space-y-6">
        <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em]">// FORENSIC SIGNAL ALGORITHM</span>
        <h3 className="text-2xl font-black text-white uppercase tracking-tight">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed font-sans">{description}</p>
        <Link href="/limitations" className="text-[10px] font-bold text-slate-400 hover:text-white font-mono uppercase tracking-widest flex items-center gap-2">
          View Margin of Errors <ArrowRight size={12} className="text-amber-signal" />
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
            <span className="uppercase tracking-widest font-black">// Mathematical Constraints</span>
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
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal scanline-overlay">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.015),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none mb-8"
          >
            // DEFENSIVE SCIENTIFIC STANDARD
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight uppercase">
            Forensic <span className="text-amber-signal">Methodology.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto font-sans">
            We bypass heuristic guesswork. Veridex evaluates digital evidence using mathematically defined, peer-reviewed signal processing architectures.
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
                <h4 className="text-lg font-bold text-white uppercase tracking-wide">// Technical Admissibility Framework</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-sans text-justify">
                  To serve as legal or journalistic support, verification must not rely on subjective algorithms. Veridex isolates physical sensor noise (PRNU), vocoder frame anomalies, and lexical distributions. You receive complete mathematical signal plots, not a black-box percentage.
                </p>
                <div className="flex flex-wrap gap-6 pt-2 font-mono text-[9px]">
                   <Link href="/limitations" className="font-bold text-amber-signal uppercase tracking-widest hover:underline">[ Read the Limitations Doc ]</Link>
                   <Link href="/request-demo" className="font-bold text-slate-400 uppercase tracking-widest hover:text-white">[ Request a Technical Walkthrough ]</Link>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Pipeline Breakdown */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-y border-deepslate relative scanner-grid">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-[10px] font-mono font-bold text-amber-signal uppercase tracking-[0.4em] flex items-center gap-3">
                <Cpu size={14} />
                // THE PIPELINE FLOW
              </h2>
              <h3 className="text-3xl font-black text-white uppercase leading-tight">
                Transient Verification Pipeline
              </h3>
              <p className="text-slate-400 text-sm font-sans leading-relaxed">
                All uploaded data flows through memory-contained verification rooms with zero permanent disk writes, maintaining a secure chain of custody.
              </p>
            </div>
            <div className="border border-deepslate bg-[#030712] px-5 py-3 rounded-none text-[9px] font-mono uppercase tracking-[0.25em] text-slate-400 flex items-center gap-2">
              <Database size={12} className="text-amber-signal" />
              SOC2 Ephemeral Buffer cleared
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6 font-mono text-[11px]">
            {[
              {
                icon: FileText,
                title: "Step 1 — Fingerprint Payload",
                body: "Compute SHA-256 hash immediately upon memory receipt to anchor original file integrity state.",
              },
              {
                icon: Layers,
                title: "Step 2 — Decompose modality",
                body: "Isolate audio spectral bands, EXIF layers, camera sensor maps, or sentence nodes into independent channels.",
              },
              {
                icon: Activity,
                title: "Step 3 — Run Forensic checks",
                body: "Run PRNU alignment checks, GAN vocoder transition tests, and stylography skews to capture anomalies.",
              },
              {
                icon: ShieldCheck,
                title: "Step 4 — Immutable ledger",
                body: "Register cryptographic signatures to append-only blockchain blocks and purge memory chambers.",
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
        </div>
      </section>

      {/* Core Heuristics Section */}
      <section className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs font-mono font-bold text-amber-signal uppercase tracking-[0.4em] mb-16">// Algorithmic Pillars & Reference Plots</h2>
          
          <MethodologySection 
            title="Image/Video Sensor Anomaly Detection"
            description="Our image audit isolates camera sensor noise pattern anomalies (PRNU). Every video splice, crop, or digital face swap breaks the PRNU signature, revealing exact coordinates of synthetic intervention."
            imageUrl="/images/signature_comparison.jpg"
            imageAlt="PRNU noise map"
            imageTitle="SENSOR PRNU CONTOUR PLOT"
            technicalDetails={[
              "Calculates local PRNU correlation multipliers.",
              "Identifies localized Photoshop or GIMP re-save tags.",
              "Traces facial mesh boundary pixels for spatial artifacts.",
              "Validates geographic coordinate alignment indices."
            ]}
          />

          <MethodologySection 
            title="Audio Clones & Vocoder Spectrography"
            description="Generative neural speech systems leave micro-silences and specific spectral phase shifts. We map voice frequency composition grids to identify synthetic clones."
            imageUrl="/images/spectral_analysis.jpg"
            imageAlt="Spectrograph audio check"
            imageTitle="SPECTRAL AUDIO VOICE CLONE SCAN"
            technicalDetails={[
              "Maps 12.4kHz vocoder band gap anomalies.",
              "Checks phase coherence between syllables.",
              "Identifies GAN waveform repeating distributions.",
              "Evaluates noise floors across speaker pauses."
            ]}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}
