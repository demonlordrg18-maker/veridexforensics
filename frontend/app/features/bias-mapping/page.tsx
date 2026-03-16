"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Compass,
  Eye,
  Info,
  Map,
  Search,
  Target,
} from "lucide-react";
import Link from "next/link";

import { Footer, Navbar } from "../../../components/Navigation";

const biasSignals = [
  "Loaded or emotive word choice",
  "One-sided sourcing and omitted counterpoints",
  "Narrative framing pressure around claims",
  "Confidence language that outruns available evidence",
];

const reviewOutputs = [
  "Bias heatmap across the document",
  "Sentence-level framing annotations",
  "Neutrality risk summary for editors and counsel",
  "Escalation points for human review",
];

export default function BiasMappingFeature() {
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
              Bias <span className="text-gradient">Mapping.</span>
            </h1>
            <p className="mb-10 text-xl leading-relaxed text-slate-400">
              Surface persuasive pressure, narrative imbalance, and framing
              patterns before they distort a newsroom, legal, or research
              workflow.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/audit" className="btn-primary flex items-center gap-2">
                Run Bias Review <ArrowRight size={18} />
              </Link>
              <Link
                href="/limitations"
                className="rounded-xl border border-white/10 px-8 py-3 font-bold text-white transition-all hover:bg-white/5"
              >
                Read Limitations
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
              Bias Mapping looks beyond whether a sentence is simply positive or
              negative. It tries to detect how language placement, omission, and
              framing can steer a reader toward a conclusion before the evidence
              is fully established.
            </p>
          </div>
          <div className="glass rounded-3xl border border-white/5 p-8">
            <Compass className="mb-4 text-teal-400" size={24} />
            <h3 className="mb-3 text-lg font-bold text-white">
              Meant for oversight
            </h3>
            <p className="text-sm leading-relaxed text-slate-500">
              Editors, legal reviewers, and trust teams can use it as an early
              warning layer before publication or evidence submission.
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
                Detects Signals
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              {biasSignals.map((item) => (
                <li key={item} className="flex gap-3">
                  <ChevronRight className="mt-0.5 shrink-0 text-teal-500" size={16} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl border border-white/5 p-8">
            <div className="mb-5 flex items-center gap-3">
              <Map className="text-teal-400" size={20} />
              <h3 className="text-sm font-black uppercase tracking-[0.3em] text-teal-500">
                Returns Outputs
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-400">
              {reviewOutputs.map((item) => (
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
            <Target className="mb-4 text-teal-400" size={22} />
            <h3 className="mb-3 text-xl font-bold text-white">
              How to interpret results
            </h3>
            <p className="leading-relaxed text-slate-400">
              A higher bias signal means the text likely needs more careful
              human review for framing, source balance, and the difference
              between assertion and evidence.
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
                  Bias detection is partly interpretive. The system can flag
                  patterns consistently, but final judgments still depend on
                  domain expertise, publication norms, and context.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 md:px-12">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/5 bg-white/[0.03] p-10 text-center">
          <Eye className="mx-auto mb-5 text-teal-400" size={28} />
          <h3 className="mb-4 text-3xl font-black text-white">
            Neutrality becomes easier to defend when you can point to the text.
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-slate-400">
            Use Bias Mapping to turn vague concerns about tone into a concrete
            review record your team can discuss and document.
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
