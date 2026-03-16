"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../components/Navigation";
import { 
  ShieldCheck, 
  Target, 
  Scale, 
  ArrowRight,
  Info,
  Database,
  Globe
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 md:px-12 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-[10px] font-black text-teal-400 border border-teal-500/20 mb-8 uppercase tracking-[0.3em]">
              Evidence, Not Hype
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight">
              Why We Built <span className="text-gradient">Veridex.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
              Veridex exists to provide high-stakes teams with the forensic tools needed to bridge the gap between digital content and defensible evidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem Space */}
      <section className="py-24 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
           <div>
              <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-6">The Context</h2>
              <h3 className="text-4xl font-black text-white mb-10 leading-tight">The Erosion of Public Verification.</h3>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                As generative AI models become the primary producers of digital content, the traditional methods of verification—visual inspection and metadata trust—are failing. We are entering an era where the cost of creating a perfect deepfake is approaching zero, while the cost of verifying it manually is rising exponentially.
              </p>
              <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                This isn't a "Trust & Safety" problem in the abstract. It is a forensic problem for journalists, a discovery problem for lawyers, and an archival problem for researchers.
              </p>
              <div className="flex gap-6">
                <Link href="/platform" className="text-sm font-bold text-teal-400 uppercase tracking-widest flex items-center gap-2">
                  Explore the Engine <ArrowRight size={14} />
                </Link>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-6">
              <div className="glass p-8 rounded-3xl border border-white/5 space-y-4">
                 <div className="h-10 w-10 shrink-0 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400"><Target size={20} /></div>
                 <h4 className="font-bold text-white uppercase tracking-tight text-sm">Targeted Focus</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">We don't build generic AI filters. we build tools for professionals who need an evidence trail.</p>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5 space-y-4 mt-8">
                 <div className="h-10 w-10 shrink-0 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400"><Database size={20} /></div>
                 <h4 className="font-bold text-white uppercase tracking-tight text-sm">Ledger-First</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">Verification is useless if it isn't immutable. Every audit is registered for chain-of-custody.</p>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5 space-y-4">
                 <div className="h-10 w-10 shrink-0 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400"><Scale size={20} /></div>
                 <h4 className="font-bold text-white uppercase tracking-tight text-sm">Assistive Stance</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">We respect expert judgment. Our tools augment human logic, they don't replace it.</p>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5 space-y-4 mt-8">
                 <div className="h-10 w-10 shrink-0 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400"><Globe size={20} /></div>
                 <h4 className="font-bold text-white uppercase tracking-tight text-sm">Global Scale</h4>
                 <p className="text-xs text-slate-500 leading-relaxed">Built for a decentralized world where informational integrity is a global priority.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-4 md:px-12 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-12">Our Product Philosophy</h2>
           <h3 className="text-4xl font-black text-white mb-10">Probabilistic signals for high-trust workflows.</h3>
           <div className="space-y-12 text-left">
              <div className="pb-12 border-b border-white/5">
                 <h4 className="text-xl font-bold text-white mb-4">Integrity-First Infrastructure</h4>
                 <p className="text-slate-400 leading-relaxed">
                   Veridex is built on the belief that informational integrity is the foundation of institutional trust. Whether in a courtroom or a newsroom, the ability to document *how* a piece of media was verified is as important as the verification itself. That’s why we focus on 'Evidence Trails' rather than just 'True/False' labels.
                 </p>
              </div>
              <div className="pb-12 border-b border-white/5">
                 <h4 className="text-xl font-bold text-white mb-4">Algorithmically Honest</h4>
                 <p className="text-slate-400 leading-relaxed">
                   We are honest about our boundaries. Forensic detection in the age of Blackwell-era compute is a cat-and-mouse game. We don't promise 100% detection; we promise 100% transparency into the signals we use, the logic we follow, and the limitations of our heuristics.
                 </p>
              </div>
              <div>
                 <h4 className="text-xl font-bold text-white mb-4">Augmenting the Expert</h4>
                 <p className="text-slate-400 leading-relaxed">
                   Our system is designed to surface 'Anomalies of Interest.' A lawyer doesn't want a machine to win their case; they want a machine to show them where the opposing exhibit's frame-rate is inconsistent. A journalist doesn't want a machine to write their lead; they want a machine to flag the voice-cloning artifacts in a leaked tape.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* Trust Callout */}
      <section className="py-24 px-4 md:px-12 text-center">
        <div className="max-w-3xl mx-auto glass p-10 rounded-[2.5rem] border border-white/5">
           <p className="text-xl text-slate-300 mb-8 italic">
             "We build for the professionals who can’t afford to be'pretty sure.' We build for the teams that need to be defensible."
           </p>
           <Link href="/methodology" className="text-xs font-black text-teal-500 uppercase tracking-widest hover:underline">Read Our Methodology</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
