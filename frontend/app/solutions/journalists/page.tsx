"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../../components/Navigation";
import { 
  Newspaper, 
  ShieldCheck, 
  Search, 
  ArrowRight,
  ChevronRight,
  Database,
  Globe,
  Radio,
  Video
} from "lucide-react";
import Link from "next/link";

export default function JournalistSolution() {
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
              Newsroom Workflow
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
              Pre-Publication <span className="text-gradient">Verification.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-10">
              Verify leaked video/audio, check manipulated images, and evaluate source authenticity before headers hit the wire. Document an evidence trail for rigorous editorial review.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/request-demo" className="btn-primary flex items-center gap-2">
                Request Newsroom License <ArrowRight size={18} />
              </Link>
              <Link href="/audit" className="px-8 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all">
                Audit a Leak
              </Link>
            </div>
          </motion.div>
          
          <div className="lg:w-2/5 p-8 glass rounded-[3rem] border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 h-40 w-40 bg-teal-500/10 blur-[100px]" />
             <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-teal-500" />
                  <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Live Source Check</span>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-full bg-white/5 rounded-full" />
                  <div className="h-4 w-5/6 bg-teal-500/20 rounded-full" />
                </div>
                <div className="pt-8 border-t border-white/5">
                  <div className="text-[10px] font-black text-slate-600 uppercase mb-4 tracking-widest">Source Authenticity</div>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Provenance Confidence</span>
                    <span className="text-teal-500 font-bold tracking-widest">94% (VERIFIED)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                    <span>Bias Mapping</span>
                    <span className="text-amber-500 font-bold tracking-widest">SKEWED</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-4 md:px-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-16 text-center">Journalistic Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-8">
             {[
               {
                 icon: Radio,
                 title: "Verifying Leaked Audio",
                 desc: "Screen whistle-blower audio for voice-cloning artifacts and spectral inconsistencies before integrating it into reporting."
               },
               {
                 icon: Video,
                 title: "Video Authenticity Check",
                 desc: "Audit social media footage from conflict zones for frame-rate anomalies, AI-insertion markers, or deepfake tampering."
               },
               {
                 icon: Globe,
                 title: "Source Origin Intelligence",
                 desc: "Trace digital fingerprints and metadata signatures to verify the geographical or platform origin of informational assets."
               }
             ].map((useCase, i) => (
               <div key={i} className="glass p-8 rounded-3xl border border-white/5 h-full">
                 <div className="h-12 w-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6">
                   <useCase.icon size={24} />
                 </div>
                 <h4 className="text-xl font-bold text-white mb-4">{useCase.title}</h4>
                 <p className="text-sm text-slate-400 leading-relaxed mb-6">{useCase.desc}</p>
                 <Link href="/features/verity-index" className="text-xs font-bold text-teal-500 uppercase tracking-widest hover:underline flex items-center gap-1">
                   Engine Metrics <ChevronRight size={14} />
                 </Link>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-4 md:px-12 bg-slate-950">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
           <div>
              <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-6">Risks Reduced</h2>
              <h3 className="text-4xl font-black text-white mb-10 leading-tight">Protecting Editorial Integrity in the AI Era.</h3>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed">
                Misinformation moves faster than fact-checking. Veridex gives newsrooms a forensic shield against high-quality synthetic deceptive media.
              </p>
              <ul className="space-y-6">
                 <li className="flex gap-4">
                   <div className="h-6 w-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500 shrink-0"><ShieldCheck size={16} /></div>
                   <div>
                     <span className="font-bold text-white text-sm block mb-1">Brand Defense</span>
                     <p className="text-xs text-slate-500">Prevent the publication of deepfakes that could damage newsroom credibility.</p>
                   </div>
                 </li>
                 <li className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500 shrink-0"><Search size={16} /></div>
                    <div>
                      <span className="font-bold text-white text-sm block mb-1">Claim Verification</span>
                      <p className="text-xs text-slate-500">Decompose viral claims into atomic parts and verify against historical records.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500 shrink-0"><Database size={16} /></div>
                    <div>
                      <span className="font-bold text-white text-sm block mb-1">Evidence Trail</span>
                      <p className="text-xs text-slate-500">Store immutable ledger proof of your verification process for archival integrity.</p>
                    </div>
                  </li>
              </ul>
           </div>
           <div className="glass-dark p-12 rounded-[3.5rem] border border-white/5 relative bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.1),transparent)]">
              <h4 className="text-2xl font-black text-white mb-8 tracking-tight">Standard Newsroom Outputs</h4>
              <div className="space-y-12">
                 {[
                   { label: "Asset Verity Index", value: "0.89", type: "low-risk" },
                   { label: "Rhetorical Mapping", value: "Highly Objective", type: "bias-profile" },
                   { label: "Provenance Score", value: "94% Match", type: "authenticity" },
                   { label: "Source Signature", value: "Verified Press Agency", type: "identity" }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-end border-b border-white/5 pb-4">
                      <div>
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className="text-2xl font-black text-white">{stat.value}</div>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[8px] font-black text-teal-500 uppercase tracking-widest">{stat.type}</div>
                   </div>
                 ))}
              </div>
              <div className="mt-12 text-center">
                 <Link href="/sample-audit" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-[0.2em]">Open News Audit Sample</Link>
              </div>
           </div>
        </div>
      </section>

      {/* Trust & Methodology Note */}
      <section className="py-24 px-4 md:px-12 bg-slate-900/30">
        <div className="max-w-4xl mx-auto glass p-10 rounded-[2.5rem] border border-teal-500/20 relative text-center">
          <p className="text-lg text-slate-300 leading-relaxed mb-6 italic">
            "Veridex forensic outputs are designed for editorial assistants. They provide signals to journalists and editors, but should not replace high-standard editorial verification and cross-referencing."
          </p>
          <div className="flex justify-center gap-8">
            <Link href="/methodology" className="text-xs font-bold text-teal-500 uppercase tracking-widest hover:underline">Newsroom Methodology</Link>
            <Link href="/limitations" className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white">Platform Limitations</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 md:px-12 text-center">
        <h3 className="text-4xl md:text-5xl font-black text-white mb-10 leading-tight">Elevate your newsroom's <br />forensic verification.</h3>
        <Link href="/request-demo" className="btn-primary px-12 py-5 text-xl font-bold">Request a Newsroom Walkthrough</Link>
      </section>

      <Footer />
    </div>
  );
}
