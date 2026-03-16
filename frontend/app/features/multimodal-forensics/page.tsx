"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../../components/Navigation";
import { 
  Layers, 
  ShieldCheck, 
  Activity, 
  Search, 
  Fingerprint,
  ArrowRight,
  Info,
  ChevronRight,
  Monitor,
  Video,
  Database
} from "lucide-react";
import Link from "next/link";

export default function MultimodalForensicsFeature() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 md:px-12 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-3/5"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-[10px] font-black text-teal-400 border border-teal-500/20 mb-6 uppercase tracking-[0.3em]">
              Feature Spotlight
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
              Multimodal <br /><span className="text-gradient">Forensics.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-10">
              Correlating spectral anomalies across audio, visual, and metadata domains to identify synthetic deceptive media.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/audit" className="btn-primary flex items-center gap-2">
                Launch Auditor <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-12 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-12">
           <div className="space-y-6">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">What this feature does</h2>
              <p className="text-slate-400 leading-relaxed">
                Multimodal Forensics is the core detection layer of the Veridex engine. It doesn't look at one signal in isolation. Instead, it audits the 'Forensic Consistency' between different media streams within a single filename. It looks for the minute mathematical artifacts left behind by generative AI models—specifically GANs (Generative Adversarial Networks) and Diffusion-based architectures.
              </p>
           </div>

           <div className="grid sm:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-3xl border border-white/5">
                 <h4 className="text-[10px] font-black text-teal-500 uppercase tracking-widest mb-4">Read Inputs</h4>
                 <ul className="text-xs text-slate-400 space-y-3">
                   <li>• Pixel-level frequency data</li>
                   <li>• Audio spectral density</li>
                   <li>• Temporal frame-boundary data</li>
                   <li>• EXIF & Internal metadata</li>
                 </ul>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5">
                 <h4 className="text-[10px] font-black text-teal-500 uppercase tracking-widest mb-4">Produces Outputs</h4>
                 <ul className="text-xs text-slate-400 space-y-3">
                   <li>• Probability heatmap</li>
                   <li>• Spectral anomaly report</li>
                   <li>• Synthetic marker verification</li>
                   <li>• Confidence-scored verity index</li>
                 </ul>
              </div>
           </div>

           <div className="space-y-6">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">How to interpret results</h2>
              <p className="text-slate-400 leading-relaxed">
                A high 'Synthetic Marker Detected' flag indicates that the media track contains frequency arrangements or macro-block inconsistencies that are over 90% correlated with known generative model signatures. This is an indicator of risk, not a binary proof of deception.
              </p>
           </div>

           <div className="p-8 rounded-[2.5rem] bg-amber-500/[0.02] border border-amber-500/20 flex gap-6">
              <Info className="text-amber-500 shrink-0" size={24} />
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm uppercase tracking-tight">What it cannot guarantee</h4>
                <p className="text-xs text-slate-500 leading-relaxed italic">
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
