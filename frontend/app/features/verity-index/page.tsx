"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  ChevronRight,
  CircleGauge,
  Gauge,
  Info,
  Scale,
  ShieldCheck,
  Sigma,
} from "lucide-react";
import Link from "next/link";

import { Footer, Navbar } from "../../../components/Navigation";

const scoreDrivers = [
  "Origin confidence from forensic and metadata signals",
  "Bias and framing pressure across the analyzed text",
  "Factuality support across extracted claims",
  "Media integrity confidence from cross-modal checks",
];

const scoreUses = [
  "Single headline score for analyst triage",
  "Score breakdown by forensic category",
  "Readable explanation layer for non-technical teams",
  "Consistent baseline for repeated internal reviews",
];

export default function VerityIndexFeature() {
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
              // FEATURE SPOTLIGHT // VERITY INDEXING
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white font-geist uppercase">
              The <span className="text-amber-signal">Verity Index.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 font-sans leading-relaxed">
              A defensible confidence score that rolls forensic, factual, and neutrality signals into one review-ready indicator.
            </p>
            <div className="flex flex-wrap gap-4 font-mono">
              <Link href="/sample-audit" className="btn-switch-primary">
                <span className="led-indicator-amber" />
                View Sample Audit
              </Link>
              <Link href="/audit" className="btn-switch-secondary">
                Open Auditor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-deepslate bg-obsidian px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="border border-deepslate bg-[#030712] p-8 rounded-none space-y-6 relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// RATIONALE MATRIX</span>
            <div className="flex items-center gap-3">
              <Gauge className="text-amber-signal" size={20} />
              <h2 className="text-2xl font-black uppercase tracking-tight text-white font-geist">
                What this feature does
              </h2>
            </div>
            <p className="leading-relaxed text-slate-400 font-sans text-sm">
              The Verity Index gives teams a fast way to rank content by review urgency. Rather than replace underlying evidence, it summarizes multiple detection layers into a score with component-level transparency so people can see why the number moved.
            </p>
          </div>
          
          <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative flex flex-col justify-between">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <div>
              <Sigma className="mb-4 text-amber-signal" size={24} />
              <h3 className="mb-3 text-sm font-bold text-white uppercase font-mono tracking-wider">
                // System Consensus
              </h3>
              <p className="text-xs leading-relaxed text-slate-500 font-sans">
                It helps teams compare many items against the same rubric instead of relying on ad hoc judgment from reviewer to reviewer.
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
              <span className="font-mono text-[9px] font-bold text-slate-300 tracking-widest uppercase">// CHAIN-OF-CUSTODY AUDIT LOG</span>
            </div>
            <span className="font-mono text-[8px] px-2 py-0.5 border border-verity-green/30 text-verity-green bg-verity-green/5">IMMUTABLE</span>
          </div>
          <div className="relative h-64 w-full bg-black border border-deepslate overflow-hidden">
            <div className="laser-scanner" />
            <img 
              src="/images/immutable_ledger.jpg" 
              alt="Immutable Ledger Log" 
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <p className="text-xs text-slate-500 font-mono text-center uppercase tracking-widest">
            Figure 4.1: Cryptographic blockchain hash registry logs showing verifiable audit proof.
          </p>
        </div>
      </section>

      <section className="bg-obsidian border-b border-deepslate px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 font-mono text-[11px]">
          <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <div className="mb-5 flex items-center gap-3 border-b border-deepslate pb-3">
              <Activity className="text-amber-signal" size={16} />
              <h3 className="font-bold uppercase tracking-[0.2em] text-white">
                // SCORE DRIVERS
              </h3>
            </div>
            <ul className="space-y-4 text-slate-400">
              {scoreDrivers.map((item) => (
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
              <CircleGauge className="text-amber-signal" size={16} />
              <h3 className="font-bold uppercase tracking-[0.2em] text-white">
                // WHERE TEAMS USE IT
              </h3>
            </div>
            <ul className="space-y-4 text-slate-400">
              {scoreUses.map((item) => (
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
            <ShieldCheck className="mb-4 text-amber-signal" size={22} />
            <h3 className="mb-3 text-lg font-bold text-white uppercase font-geist tracking-wide">
              // High Index Meaning
            </h3>
            <p className="text-xs leading-relaxed text-slate-400 font-sans">
              A higher Verity Index suggests stronger alignment between forensic integrity, supporting evidence, and rhetorical neutrality. It is a confidence cue, not a certification stamp.
            </p>
          </div>
          <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <Scale className="mb-4 text-amber-signal" size={22} />
            <h3 className="mb-3 text-lg font-bold text-white uppercase font-geist tracking-wide">
              // Low Index Meaning
            </h3>
            <p className="text-xs leading-relaxed text-slate-400 font-sans">
              A lower score usually means multiple signals disagree: metadata is weak, claims are under-supported, or language intensity suggests a framing problem that deserves review.
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
                  A single score cannot capture every legal, editorial, or scientific nuance. Reviewers should always inspect the score breakdown and the original evidence trail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
