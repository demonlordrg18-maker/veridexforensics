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
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-slate-950 px-4 pb-20 pt-32 md:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-teal-400">
              Feature Spotlight
            </div>
            <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-7xl">
              The <span className="text-gradient">Verity Index.</span>
            </h1>
            <p className="mb-10 text-xl leading-relaxed text-slate-400">
              A defensible confidence score that rolls forensic, factual, and
              neutrality signals into one review-ready indicator.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/sample-audit" className="btn-primary flex items-center gap-2">
                View Sample Audit <ArrowRight size={18} />
              </Link>
              <Link
                href="/audit"
                className="rounded-xl border border-white/10 px-8 py-3 font-bold text-white transition-all hover:bg-white/5"
              >
                Open Auditor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/5 px-4 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="glass rounded-3xl border border-white/5 p-8">
            <div className="mb-5 flex items-center gap-3">
              <Gauge className="text-teal-400" size={22} />
              <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                What this feature does
              </h2>
            </div>
            <p className="leading-relaxed text-slate-400">
              The Verity Index gives teams a fast way to rank content by review
              urgency. Rather than replace underlying evidence, it summarizes
              multiple detection layers into a score with component-level
              transparency so people can see why the number moved.
            </p>
          </div>
          <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400">
              <Sigma size={24} />
            </div>
            <h3 className="mb-3 text-lg font-bold text-white">
              Designed for consistency
            </h3>
            <p className="text-sm leading-relaxed text-slate-500">
              It helps teams compare many items against the same rubric instead
              of relying on ad hoc judgment from reviewer to reviewer.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/20 px-4 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="glass rounded-3xl border border-white/5 p-8">
            <div className="mb-5 flex items-center gap-3">
              <Activity className="text-teal-400" size={20} />
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-teal-500">
                Score Drivers
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              {scoreDrivers.map((item) => (
                <li key={item} className="flex gap-3">
                  <ChevronRight className="mt-0.5 shrink-0 text-teal-500" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl border border-white/5 p-8">
            <div className="mb-5 flex items-center gap-3">
              <CircleGauge className="text-teal-400" size={20} />
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-teal-500">
                Where Teams Use It
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              {scoreUses.map((item) => (
                <li key={item} className="flex gap-3">
                  <ChevronRight className="mt-0.5 shrink-0 text-teal-500" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <div className="glass rounded-3xl border border-white/5 p-8">
            <ShieldCheck className="mb-4 text-teal-400" size={22} />
            <h3 className="mb-3 text-xl font-bold text-white">
              How to interpret a high score
            </h3>
            <p className="leading-relaxed text-slate-400">
              A higher Verity Index suggests stronger alignment between forensic
              integrity, supporting evidence, and rhetorical neutrality. It is
              a confidence cue, not a certification stamp.
            </p>
          </div>
          <div className="glass rounded-3xl border border-white/5 p-8">
            <Scale className="mb-4 text-teal-400" size={22} />
            <h3 className="mb-3 text-xl font-bold text-white">
              How to interpret a low score
            </h3>
            <p className="leading-relaxed text-slate-400">
              A lower score usually means multiple signals disagree: metadata is
              weak, claims are under-supported, or language intensity suggests a
              framing problem that deserves review.
            </p>
          </div>
          <div className="rounded-[2.5rem] border border-amber-500/20 bg-amber-500/[0.02] p-8">
            <div className="flex gap-4">
              <Info className="shrink-0 text-amber-500" size={22} />
              <div>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-tight text-white">
                  What it cannot guarantee
                </h4>
                <p className="text-sm leading-relaxed text-slate-500">
                  A single score cannot capture every legal, editorial, or
                  scientific nuance. Reviewers should always inspect the score
                  breakdown and the original evidence trail.
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
