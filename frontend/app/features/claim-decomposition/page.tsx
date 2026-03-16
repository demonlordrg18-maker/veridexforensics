"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  FileSearch,
  GitBranch,
  Info,
  Scale,
  Search,
  Workflow,
} from "lucide-react";
import Link from "next/link";

import { Footer, Navbar } from "../../../components/Navigation";

const signalRows = [
  "Breaks long narratives into discrete factual units",
  "Separates claims, citations, opinions, and rhetorical framing",
  "Flags unsupported leaps between evidence and conclusion",
  "Builds a review queue for high-risk assertions",
];

const outputRows = [
  "Structured claim map",
  "Evidence coverage report",
  "Escalation markers for legal or editorial review",
  "Machine-readable JSON for downstream workflows",
];

export default function ClaimDecompositionFeature() {
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
              Claim <span className="text-gradient">Decomposition.</span>
            </h1>
            <p className="mb-10 text-xl leading-relaxed text-slate-400">
              Turn dense articles, transcripts, and reports into a structured
              map of verifiable claims before you spend analyst time proving or
              disproving them.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/audit" className="btn-primary flex items-center gap-2">
                Launch Auditor <ArrowRight size={18} />
              </Link>
              <Link
                href="/methodology"
                className="rounded-xl border border-white/10 px-8 py-3 font-bold text-white transition-all hover:bg-white/5"
              >
                Review Methodology
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/5 px-4 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <div className="glass rounded-3xl border border-white/5 p-8 lg:col-span-2">
            <h2 className="mb-6 text-2xl font-black uppercase tracking-tight text-white">
              What this feature does
            </h2>
            <p className="leading-relaxed text-slate-400">
              Claim Decomposition parses a piece of content into atomic units of
              meaning. Instead of treating an article or statement as one block,
              it isolates each checkable assertion, labels it by type, and
              preserves the surrounding context. That gives editorial, legal,
              and research teams a cleaner handoff into evidence review.
            </p>
          </div>
          <div className="glass rounded-3xl border border-white/5 p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400">
              <Workflow size={24} />
            </div>
            <h3 className="mb-3 text-lg font-bold text-white">
              Built for triage
            </h3>
            <p className="text-sm leading-relaxed text-slate-500">
              Best used when your team needs to sort dozens of assertions
              quickly and decide what deserves deeper human review.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/20 px-4 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="glass rounded-3xl border border-white/5 p-8">
            <div className="mb-5 flex items-center gap-3">
              <Search className="text-teal-400" size={20} />
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-teal-500">
                Reads Inputs
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              {signalRows.map((item) => (
                <li key={item} className="flex gap-3">
                  <ChevronRight className="mt-0.5 shrink-0 text-teal-500" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl border border-white/5 p-8">
            <div className="mb-5 flex items-center gap-3">
              <GitBranch className="text-teal-400" size={20} />
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-teal-500">
                Produces Outputs
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              {outputRows.map((item) => (
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
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="glass rounded-3xl border border-white/5 p-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
              <FileSearch size={20} />
            </div>
            <h3 className="mb-4 text-xl font-bold text-white">
              How to interpret results
            </h3>
            <p className="leading-relaxed text-slate-400">
              A larger claim count does not automatically mean higher risk. The
              more important signal is claim density without supporting evidence,
              or a large number of claims grouped around one weak source.
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
                  Decomposition can expose ambiguous or unsupported statements,
                  but it cannot independently prove truth. Human reviewers still
                  need to assess source quality, context, and intent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 md:px-12">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-10 text-center">
          <Scale className="mx-auto mb-5 text-teal-400" size={28} />
          <h3 className="mb-4 text-3xl font-black text-white">
            Start with structure before fact-checking.
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-slate-400">
            This feature is designed to reduce analyst fatigue by making the
            review queue smaller, sharper, and easier to defend.
          </p>
          <Link href="/request-demo" className="btn-primary inline-flex items-center gap-2">
            Request Demo <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
