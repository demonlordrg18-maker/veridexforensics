"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../../components/Navigation";
import { 
  Gavel, 
  ShieldCheck, 
  Search, 
  FileCheck, 
  ArrowRight,
  ChevronRight,
  Database,
  Briefcase,
  Layers,
  Fingerprint
} from "lucide-react";
import Link from "next/link";

export default function LegalTeamsSolution() {
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
              Legal Exhibit Screening
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
              Screen Exhibits with <span className="text-gradient">Forensic Clarity.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-10">
              Intake screening for digital evidence, manipulated media detection signals, and structured audit artifacts for defensible internal review and chain-of-custody support.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/request-demo" className="btn-primary flex items-center gap-2">
                Request Legal Demo <ArrowRight size={18} />
              </Link>
              <Link href="/audit" className="px-8 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all">
                Submit an Exhibit
              </Link>
            </div>
          </motion.div>
          
          <div className="lg:w-2/5 p-8 glass rounded-[3rem] border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 right-0 h-40 w-40 bg-rose-500/10 blur-[100px]" />
             <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-rose-500" />
                  <span className="text-xs font-black uppercase text-slate-500 tracking-widest">Exhibit Risk detected</span>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-full bg-white/5 rounded-full" />
                  <div className="h-4 w-5/6 bg-rose-500/20 rounded-full" />
                  <div className="h-4 w-4/6 bg-white/5 rounded-full" />
                </div>
                <div className="pt-8 border-t border-white/5">
                  <div className="text-[10px] font-black text-slate-600 uppercase mb-4 tracking-widest">Intake Status</div>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Authenticity Score</span>
                    <span className="text-rose-500 font-bold tracking-widest">0.28 (LOW)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                    <span>Ledger ID</span>
                    <span className="text-teal-500 font-bold tracking-widest">REGISTERED</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-4 md:px-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-16 text-center">Legal Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-8">
             {[
               {
                 icon: Briefcase,
                 title: "Exhibit Intake Screening",
                 desc: "Quickly screen client or opposing party digital exhibits (video, audio, docs) for markers of generative AI or manipulation before entering discovery."
               },
               {
                 icon: Database,
                 title: "Chain-of-Custody Support",
                 desc: "Generate SHA-256 evidence trails for all digital assets, providing a cryptographic record of the asset's state at the moment of discovery."
               },
               {
                 icon: Fingerprint,
                 title: "Manipulated Media Detection",
                 desc: "Identify frame-level inconsistencies and spectral frequency anomalies that indicate synthetic media or deepfake tampering."
               }
             ].map((useCase, i) => (
               <div key={i} className="glass p-8 rounded-3xl border border-white/5 h-full">
                 <div className="h-12 w-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6">
                   <useCase.icon size={24} />
                 </div>
                 <h4 className="text-xl font-bold text-white mb-4">{useCase.title}</h4>
                 <p className="text-sm text-slate-400 leading-relaxed mb-6">{useCase.desc}</p>
                 <Link href="/features/multimodal-forensics" className="text-xs font-bold text-teal-500 uppercase tracking-widest hover:underline flex items-center gap-1">
                   Feature Specs <ChevronRight size={14} />
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
              <h3 className="text-4xl font-black text-white mb-10 leading-tight">Objective Shield Against Synthetic Risk.</h3>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed">
                Legal teams face an unprecedented rise in deepfake evidence and synthetic documents. Veridex provides a non-subjective forensic layer for internal review.
              </p>
              <ul className="space-y-6">
                 <li className="flex gap-4">
                   <div className="h-6 w-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500 shrink-0"><ShieldCheck size={16} /></div>
                   <div>
                     <span className="font-bold text-white text-sm block mb-1">Evidentiary Defense</span>
                     <p className="text-xs text-slate-500">Defend your intake process with structured audit artifacts and confidence signals.</p>
                   </div>
                 </li>
                 <li className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500 shrink-0"><Layers size={16} /></div>
                    <div>
                      <span className="font-bold text-white text-sm block mb-1">Workflow Integration</span>
                      <p className="text-xs text-slate-500">Seamlessly integrate forensic screening into existing discovery and intake workflows.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-6 w-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500 shrink-0"><FileCheck size={16} /></div>
                    <div>
                      <span className="font-bold text-white text-sm block mb-1">Standardized Reporting</span>
                      <p className="text-xs text-slate-500">Receive consistent report formats for every exhibit, suitable for internal filing.</p>
                    </div>
                  </li>
              </ul>
           </div>
           <div className="glass-dark p-12 rounded-[3.5rem] border border-white/5 relative bg-[radial-gradient(circle_at_top_left,rgba(225,29,72,0.1),transparent)]">
              <h4 className="text-2xl font-black text-white mb-8 tracking-tight">Legal Exhibit Assets</h4>
              <div className="space-y-12">
                 {[
                   { label: "Exhibit Verity Index", value: "0.22", type: "high-risk" },
                   { label: "Audio Spectral Check", value: "Anomalies Detected", type: "forensic" },
                   { label: "Document Origin ID", value: "Synthetic Markers", type: "origin" },
                   { label: "SHA-256 Ledger ID", value: "8f4e2a1b9c...", type: "immutable" }
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
                 <Link href="/sample-audit" className="text-xs font-bold text-slate-500 hover:text-white uppercase tracking-[0.2em]">Open Legal Case Sample Report</Link>
              </div>
           </div>
        </div>
      </section>

      {/* Trust & Methodology Note */}
      <section className="py-24 px-4 md:px-12 bg-slate-900/30">
        <div className="max-w-4xl mx-auto glass p-10 rounded-[2.5rem] border border-amber-500/20 relative text-center">
          <p className="text-lg text-slate-300 leading-relaxed mb-6 italic">
            "Veridex forensic markers are assistive tools for internal discovery and screening. Our outputs are probabilistic and are not substitutes for courtroom expert witness testimony or judicial finality."
          </p>
          <div className="flex justify-center gap-8">
            <Link href="/methodology" className="text-xs font-bold text-amber-500 uppercase tracking-widest hover:underline">Forensic Methodology</Link>
            <Link href="/limitations" className="text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white">Legal Limitations</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 md:px-12 text-center">
        <h3 className="text-4xl md:text-5xl font-black text-white mb-10 leading-tight">Fortify your digital discovery <br />intake process.</h3>
        <Link href="/request-demo" className="btn-primary px-12 py-5 text-xl font-bold">Request a Legal Forensic Walkthrough</Link>
      </section>

      <Footer />
    </div>
  );
}
