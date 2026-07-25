"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../components/Navigation";
import { 
  ShieldAlert, 
  Info, 
  Scale, 
  HelpCircle,
  EyeOff,
  AlertTriangle,
  ZapOff
} from "lucide-react";
import Link from "next/link";

const LimitationCard = ({ icon: Icon, title, description }: any) => (
  <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative">
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
    <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal mb-6 rounded-none">
      <Icon size={18} />
    </div>
    <h3 className="text-lg font-bold text-white mb-4 uppercase">{title}</h3>
    <p className="text-slate-400 text-xs leading-relaxed font-sans">{description}</p>
  </div>
);

export default function LimitationsPage() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal scanline-overlay">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.015),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-4"
          >
            <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none">
              // LIMITATIONS & SCIENTIFIC FAILURE MARGINS
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight uppercase">
              Assurance & <span className="text-amber-signal">Limits.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed font-sans max-w-2xl">
              Veridex does not promise magic solutions. A high-assurance tool must explicitly define its error rates, degraded state boundaries, and validation limits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Warnings Banner */}
      <section className="py-12 px-6 md:px-12 bg-obsidian">
        <div className="max-w-7xl mx-auto border border-amber-signal/20 bg-[#070b19]/30 p-8 rounded-none flex flex-col md:flex-row gap-8 items-center relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-signal" />
            <ShieldAlert className="text-amber-signal shrink-0" size={36} />
            <p className="text-slate-300 text-xs font-sans leading-relaxed text-justify">
              <strong>Core Protocol:</strong> Veridex provides probabilistic signal metrics for human experts. It is not an automated judge or final decision maker. Every output is designed to be cross-examined under professional discretion.
            </p>
        </div>
      </section>

      {/* Structured Limitations Table */}
      <section className="py-12 px-6 md:px-12 bg-[#02050b] border-y border-deepslate font-mono text-[11px]">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-xs font-bold text-white uppercase tracking-wider">// ACCURACY DEGRADATION REGISTER</h2>
          <div className="border border-deepslate bg-[#030712] overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-deepslate bg-[#070b19]/30 text-slate-400 uppercase tracking-widest text-[9px] font-bold">
                  <th className="p-4">Modality</th>
                  <th className="p-4">Degraded State Factor</th>
                  <th className="p-4">Impact on Confidence Metric</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-deepslate text-slate-300">
                <tr>
                  <td className="p-4 font-bold text-white uppercase">Audio (Voice Clones)</td>
                  <td className="p-4">Extreme compression (e.g. 64kbps, WhatsApp audio files)</td>
                  <td className="p-4 text-amber-signal">Reduces confidence by up to 25% due to spectral artifact blurring.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white uppercase">Image (Splicing)</td>
                  <td className="p-4">Low resolution, dark/underexposed sensor captures</td>
                  <td className="p-4 text-amber-signal">Blurs Camera PRNU noise maps, degrading localized mask accuracy.</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-white uppercase">Document (Text)</td>
                  <td className="p-4">Translation layers or short lexical count (under 100 words)</td>
                  <td className="p-4 text-amber-signal">Lacks syntactic variation baseline required for stylographic skews.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Main Limitations Cards */}
      <section className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LimitationCard 
              icon={EyeOff}
              title="Probabilistic Scoring"
              description="Forensic signals are mathematically probabilistic, not binary. The system delivers likelihood values backed by signal anomaly thresholds."
            />
            <LimitationCard 
              icon={Scale}
              title="Not Legal Opinion"
              description="Our checks assist legal discovery and verification, but the reports do not replace qualified counsel or human expert testimonies."
            />
            <LimitationCard 
              icon={AlertTriangle}
              title="Zero permanent storage"
              description="Because we immediately clear transient RAM scan rooms post-audit, historical file payloads cannot be retrieved or re-analyzed by Veridex."
            />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-12 text-center bg-obsidian border-t border-deepslate">
        <h3 className="text-lg font-bold text-white uppercase tracking-wide">Questions about our forensic boundaries?</h3>
        <div className="mt-6 font-mono text-[10px]">
          <Link href="/request-demo" className="btn-switch-primary">
            Request Technical Walkthrough
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
