"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../../components/Navigation";
import { 
  Activity, 
  Fingerprint,
  Info,
  Database,
  Cpu,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function MultimodalForensicsFeature() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      
      {/* Header section with technical scan grid */}
      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1 font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.2em] rounded-none shadow-[0_0_10px_rgba(245,158,11,0.05)]">
              // EV-DECAY STATUS: ACTIVE
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight font-geist leading-tight uppercase">
              Multimodal <br /><span className="text-amber-signal">Forensics.</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl font-sans">
              Correlating spectral anomalies across audio, visual, and metadata domains to identify synthetic deceptive media and deepfakes.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/audit" className="px-6 py-3 border border-amber-signal bg-amber-signal text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-transparent hover:text-amber-signal transition-all duration-300 rounded-none shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                Launch Auditor Terminal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid of the 4 Forensic Images */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4 text-center md:text-left">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// EVIDENCE CAPTURE FEED</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight font-geist uppercase">Forensic Scanning Gallery</h2>
            <p className="text-slate-400 text-sm max-w-xl">Deep visual representation of the verification pipelines executed in real time by the Veridex engine.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Visual 1: Spectral Wave Anomaly */}
            <div className="border border-deepslate bg-[#030712] p-6 space-y-6 flex flex-col justify-between rounded-none relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-deepslate pb-3">
                  <div className="flex items-center gap-2">
                    <Activity size={12} className="text-amber-signal" />
                    <span className="font-mono text-[10px] font-bold text-white tracking-wider">SPECTRAL SIGNAL ANALYSIS</span>
                  </div>
                  <span className="font-mono text-[8px] px-2 py-0.5 border border-red-500/30 text-red-400 bg-red-500/5">ANOMALY DETECTED</span>
                </div>
                <div className="relative h-60 w-full bg-black border border-deepslate overflow-hidden">
                  <div className="laser-scanner" />
                  <img 
                    src="/images/spectral_analysis.jpg" 
                    alt="Spectral Analysis" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <h3 className="text-lg font-bold text-white font-geist uppercase pt-2">Acoustic Artifact Isolation</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Isolates acoustic signatures, analyzing vocal frequency variations at 12.4kHz to expose synthesized generative models, vocoders, and AI clones.
                </p>
              </div>
            </div>

            {/* Visual 2: Topographic Signature Comparison */}
            <div className="border border-deepslate bg-[#030712] p-6 space-y-6 flex flex-col justify-between rounded-none relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-deepslate pb-3">
                  <div className="flex items-center gap-2">
                    <Cpu size={12} className="text-verity-green" />
                    <span className="font-mono text-[10px] font-bold text-white tracking-wider">SIGNATURE COMPARISON (3D MAP)</span>
                  </div>
                  <span className="font-mono text-[8px] px-2 py-0.5 border border-verity-green/30 text-verity-green bg-verity-green/5">COMPARE MODULE</span>
                </div>
                <div className="relative h-60 w-full bg-black border border-deepslate overflow-hidden">
                  <div className="laser-scanner" />
                  <img 
                    src="/images/signature_comparison.jpg" 
                    alt="Signature Comparison" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <h3 className="text-lg font-bold text-white font-geist uppercase pt-2">Natural vs. Synthetic Topography</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Contrasts the smooth geometric contours of a natural vocal signature (green) against the rigid, grid-like block structures of a synthetic voice clone (red).
                </p>
              </div>
            </div>

            {/* Visual 3: Biometric Identity Manifest */}
            <div className="border border-deepslate bg-[#030712] p-6 space-y-6 flex flex-col justify-between rounded-none relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-deepslate pb-3">
                  <div className="flex items-center gap-2">
                    <Fingerprint size={12} className="text-amber-signal" />
                    <span className="font-mono text-[10px] font-bold text-white tracking-wider">BIOMETRIC IDENTITY MANIFEST</span>
                  </div>
                  <span className="font-mono text-[8px] px-2 py-0.5 border border-amber-signal/30 text-amber-signal bg-amber-signal/5">PARTIAL MATCH</span>
                </div>
                <div className="relative h-60 w-full bg-black border border-deepslate overflow-hidden">
                  <div className="laser-scanner" />
                  <img 
                    src="/images/biometric_manifest.jpg" 
                    alt="Biometric Manifest" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <h3 className="text-lg font-bold text-white font-geist uppercase pt-2">Facial Mesh & Acoustic Analysis</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Tracks and overlays 3D geometry node vectors across facial keypoints to cross-verify sync reliability and flag micro-inconsistencies.
                </p>
              </div>
            </div>

            {/* Visual 4: Immutable Ledger Log */}
            <div className="border border-deepslate bg-[#030712] p-6 space-y-6 flex flex-col justify-between rounded-none relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-deepslate pb-3">
                  <div className="flex items-center gap-2">
                    <Database size={12} className="text-verity-green" />
                    <span className="font-mono text-[10px] font-bold text-white tracking-wider">CHAIN-OF-CUSTODY AUDIT LOG</span>
                  </div>
                  <span className="font-mono text-[8px] px-2 py-0.5 border border-verity-green/30 text-verity-green bg-verity-green/5 font-semibold">IMMUTABLE</span>
                </div>
                <div className="relative h-60 w-full bg-black border border-deepslate overflow-hidden">
                  <div className="laser-scanner" />
                  <img 
                    src="/images/immutable_ledger.jpg" 
                    alt="Immutable Ledger Log" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <h3 className="text-lg font-bold text-white font-geist uppercase pt-2">Cryptographic Hash Registry</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Registers SHA-256 fingerprints of every audit run on an append-only distributed ledger to prevent tamper risks and generate defensible audit trails.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Mechanics */}
      <section className="py-24 px-6 md:px-12 border-b border-deepslate bg-obsidian">
        <div className="max-w-4xl mx-auto space-y-12">
           <div className="space-y-6">
              <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// TECHNICAL SPECS</span>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight font-geist">Evidentiary Corroboration Heuristics</h2>
              <p className="text-slate-400 leading-relaxed font-sans text-sm">
                Multimodal Forensics is the core detection layer of the Veridex engine. It doesn't look at one signal in isolation. Instead, it audits the 'Forensic Consistency' between different media streams within a single filename. It looks for the minute mathematical artifacts left behind by generative AI models—specifically GANs (Generative Adversarial Networks) and Diffusion-based architectures.
              </p>
           </div>

           <div className="grid sm:grid-cols-2 gap-8 font-mono text-[11px]">
              <div className="border border-deepslate bg-[#030712] p-8 rounded-none">
                 <h4 className="text-[10px] font-black text-amber-signal uppercase tracking-widest mb-4">// ANALYSIS INPUT VECTORS</h4>
                 <ul className="text-slate-400 space-y-3">
                   <li>[+] Pixel-level frequency data</li>
                   <li>[+] Audio spectral density</li>
                   <li>[+] Temporal frame-boundary data</li>
                   <li>[+] EXIF & Internal metadata</li>
                 </ul>
              </div>
              <div className="border border-deepslate bg-[#030712] p-8 rounded-none">
                 <h4 className="text-[10px] font-black text-amber-signal uppercase tracking-widest mb-4">// FORENSIC OUTPUT SIGNATURES</h4>
                 <ul className="text-slate-400 space-y-3">
                   <li>[+] Probability anomaly heatmap</li>
                   <li>[+] Spectral anomaly report</li>
                   <li>[+] Synthetic marker verification</li>
                   <li>[+] Confidence-scored verity index</li>
                 </ul>
              </div>
           </div>

           <div className="p-8 bg-[#070b19]/40 border border-amber-signal/20 rounded-none flex gap-6">
              <Info className="text-amber-signal shrink-0" size={24} />
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm font-geist uppercase tracking-tight">Assurance Thresholds</h4>
                <p className="text-xs text-slate-500 leading-relaxed italic font-sans text-justify">
                  We cannot guarantee the identification of 'Post-Detection Compression' (PDC) artifacts that are intentionally added to media to mask synthetic signatures. Forensic signals degrade with every re-upload or re-encoding.
                </p>
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
