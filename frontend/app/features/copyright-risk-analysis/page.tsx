"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookCopy,
  ChevronRight,
  FileWarning,
  Fingerprint,
  Info,
  LibraryBig,
  Scale,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

import { Footer, Navbar } from "../../../components/Navigation";

const riskChecks = [
  "Similarity cues in phrasing and structure",
  "Known provenance gaps in uploaded assets",
  "Metadata irregularities tied to reuse or stripping",
  "Sections that may warrant rights review before publication",
];

const teamOutputs = [
  "Risk summary for editorial or legal review",
  "Highlighted passages or assets needing escalation",
  "Provenance notes for chain-of-custody records",
  "A cleaner starting point for counsel, not a legal opinion",
];

export default function CopyrightRiskAnalysisFeature() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />

      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none">
              // FEATURE SPOTLIGHT // COPYRIGHT RISK ANALYSIS
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white font-geist uppercase">
              Copyright Risk <span className="text-amber-signal">Analysis.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 font-sans leading-relaxed">
              Surface reuse, provenance, and rights-review concerns early so teams can escalate faster and document their decision trail.
            </p>
            <div className="flex flex-wrap gap-4 font-mono">
              <Link href="/audit" className="btn-switch-primary">
                <span className="led-indicator-amber" />
                Analyze Content
              </Link>
              <Link href="/solutions/legal-teams" className="btn-switch-secondary">
                Legal Team Workflow
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-deepslate bg-obsidian px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="border border-deepslate bg-[#030712] p-8 rounded-none space-y-6 relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// FUNCTIONAL OVERVIEW</span>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white font-geist">
              What this feature does
            </h2>
            <p className="leading-relaxed text-slate-400 font-sans text-sm">
              Copyright Risk Analysis is an intake screen for rights-sensitive content. It helps identify material that may contain derivative reuse, missing provenance, or suspicious origin gaps before the asset moves deeper into publishing or evidence workflows.
            </p>
          </div>
          
          <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <div>
              <BookCopy className="mb-4 text-amber-signal" size={24} />
              <h3 className="mb-3 text-sm font-bold text-white uppercase font-mono tracking-wider">
                // Operational Checkpoint
              </h3>
              <p className="text-xs leading-relaxed text-slate-500 font-sans">
                It gives teams an operational checkpoint before publication, distribution, submission, or commercial reuse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Component Section */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-b border-deepslate scanner-grid">
        <div className="max-w-4xl mx-auto border border-deepslate bg-[#030712] p-6 rounded-none relative z-10 space-y-6">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-amber-signal/30" />
          <div className="flex justify-between items-center border-b border-deepslate pb-3">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 bg-amber-signal rounded-none shadow-[0_0_5px_#F59E0B]" />
              <span className="font-mono text-[9px] font-bold text-slate-300 tracking-widest uppercase">// SPECTRAL SYNTHETIC PLOT</span>
            </div>
            <span className="font-mono text-[8px] px-2 py-0.5 border border-red-500/30 text-red-500 bg-red-500/5">SYNTHETIC_CLONE</span>
          </div>
          <div className="relative h-64 w-full bg-black border border-deepslate overflow-hidden">
            <div className="laser-scanner" />
            <img 
              src="/images/spectral_analysis.jpg" 
              alt="Spectral Analysis" 
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <p className="text-xs text-slate-500 font-mono text-center uppercase tracking-widest">
            Figure 3.1: Fourier transform and phase irregularities mapping.
          </p>
        </div>
      </section>

      <section className="bg-obsidian border-b border-deepslate px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 font-mono text-[11px]">
          <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <div className="mb-5 flex items-center gap-3 border-b border-deepslate pb-3">
              <Fingerprint className="text-amber-signal" size={16} />
              <h3 className="font-bold uppercase tracking-[0.2em] text-white">
                // RISK CHECKS
              </h3>
            </div>
            <ul className="space-y-4 text-slate-400">
              {riskChecks.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-amber-signal font-bold">[+]</span>
                  <span className="font-sans text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <div className="mb-5 flex items-center gap-3 border-b border-deepslate pb-3">
              <LibraryBig className="text-amber-signal" size={16} />
              <h3 className="font-bold uppercase tracking-[0.2em] text-white">
                // TEAM OUTPUTS
              </h3>
            </div>
            <ul className="space-y-4 text-slate-400">
              {teamOutputs.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-amber-signal font-bold">[+]</span>
                  <span className="font-sans text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 bg-obsidian">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <ShieldAlert className="mb-4 text-amber-signal" size={22} />
            <h3 className="mb-3 text-lg font-bold text-white uppercase font-geist tracking-wide">
              // How to interpret
            </h3>
            <p className="text-xs leading-relaxed text-slate-400 font-sans">
              A higher risk result means the asset deserves a rights or provenance review before your team relies on it. It is a routing signal, not a final infringement finding.
            </p>
          </div>
          <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <Scale className="mb-4 text-amber-signal" size={22} />
            <h3 className="mb-3 text-lg font-bold text-white uppercase font-geist tracking-wide">
              // Why it matters
            </h3>
            <p className="text-xs leading-relaxed text-slate-400 font-sans">
              Rights issues often show up as workflow failures: missing source data, inconsistent records, or unexplained transformations. Catch those issues before they become expensive.
            </p>
          </div>
          <div className="border border-amber-signal/20 bg-[#070b19]/30 p-8 rounded-none relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-amber-signal/20" />
            <div className="flex gap-4">
              <Info className="shrink-0 text-amber-signal" size={20} />
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-tight text-white font-geist">
                  // Assurance Thresholds
                </h4>
                <p className="text-xs leading-relaxed text-slate-500 font-sans text-justify">
                  This is not legal advice and cannot determine infringement on its own. Counsel still needs to evaluate licenses, fair use, contracts, and jurisdiction-specific rules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-12 bg-obsidian">
        <div className="mx-auto max-w-5xl border border-deepslate bg-[#030712] p-10 text-center rounded-none relative">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
          <FileWarning className="mx-auto mb-5 text-amber-signal" size={24} />
          <h3 className="text-2xl md:text-3xl font-black text-white font-geist uppercase mb-4">
            Catch rights issues before they become a release blocker.
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-xs text-slate-400 font-sans leading-relaxed">
            The fastest legal review is the one that starts with a clear risk summary and an intact provenance trail.
          </p>
          <div className="font-mono">
            <Link href="/request-demo" className="btn-switch-primary">
              Request Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
