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
              Copyright Risk <span className="text-gradient">Analysis.</span>
            </h1>
            <p className="mb-10 text-xl leading-relaxed text-slate-400">
              Surface reuse, provenance, and rights-review concerns early so
              teams can escalate faster and document their decision trail.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/audit" className="btn-primary flex items-center gap-2">
                Analyze Content <ArrowRight size={18} />
              </Link>
              <Link
                href="/solutions/legal-teams"
                className="rounded-xl border border-white/10 px-8 py-3 font-bold text-white transition-all hover:bg-white/5"
              >
                Legal Team Workflow
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/5 px-4 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <div className="glass rounded-3xl border border-white/5 p-8">
            <h2 className="mb-6 text-2xl font-black uppercase tracking-tight text-white">
              What this feature does
            </h2>
            <p className="leading-relaxed text-slate-400">
              Copyright Risk Analysis is an intake screen for rights-sensitive
              content. It helps identify material that may contain derivative
              reuse, missing provenance, or suspicious origin gaps before the
              asset moves deeper into publishing or evidence workflows.
            </p>
          </div>
          <div className="glass rounded-3xl border border-white/5 p-8">
            <BookCopy className="mb-4 text-teal-400" size={24} />
            <h3 className="mb-3 text-lg font-bold text-white">
              Best used before release
            </h3>
            <p className="text-sm leading-relaxed text-slate-500">
              It gives teams an operational checkpoint before publication,
              distribution, submission, or commercial reuse.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/20 px-4 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="glass rounded-3xl border border-white/5 p-8">
            <div className="mb-5 flex items-center gap-3">
              <Fingerprint className="text-teal-400" size={20} />
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-teal-500">
                Risk Checks
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              {riskChecks.map((item) => (
                <li key={item} className="flex gap-3">
                  <ChevronRight className="mt-0.5 shrink-0 text-teal-500" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl border border-white/5 p-8">
            <div className="mb-5 flex items-center gap-3">
              <LibraryBig className="text-teal-400" size={20} />
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-teal-500">
                Team Outputs
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              {teamOutputs.map((item) => (
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
            <ShieldAlert className="mb-4 text-teal-400" size={22} />
            <h3 className="mb-3 text-xl font-bold text-white">
              How to interpret results
            </h3>
            <p className="leading-relaxed text-slate-400">
              A higher risk result means the asset deserves a rights or
              provenance review before your team relies on it. It is a routing
              signal, not a final infringement finding.
            </p>
          </div>
          <div className="glass rounded-3xl border border-white/5 p-8">
            <Scale className="mb-4 text-teal-400" size={22} />
            <h3 className="mb-3 text-xl font-bold text-white">
              Why it matters
            </h3>
            <p className="leading-relaxed text-slate-400">
              Rights issues often show up as workflow failures: missing source
              data, inconsistent records, or unexplained transformations. This
              page helps catch those issues before they become expensive.
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
                  This is not legal advice and cannot determine infringement on
                  its own. Counsel still needs to evaluate licenses, fair use,
                  contracts, and jurisdiction-specific rules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 md:px-12">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-10 text-center">
          <FileWarning className="mx-auto mb-5 text-teal-400" size={28} />
          <h3 className="mb-4 text-3xl font-black text-white">
            Catch rights issues before they become a release blocker.
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-slate-400">
            The fastest legal review is the one that starts with a clear risk
            summary and an intact provenance trail.
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
