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
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-3/5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none">
              // LEGAL EXHIBIT SCREENING WORKFLOW
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight font-geist uppercase">
              Screen Exhibits with <span className="text-amber-signal">Forensic Clarity.</span>
            </h1>
            <p className="text-base text-slate-400 leading-relaxed font-sans">
              Intake screening for digital evidence, manipulated media detection signals, and structured audit artifacts for defensible internal review and chain-of-custody support.
            </p>
            <div className="flex flex-wrap gap-4 font-mono">
              <Link href="/request-demo" className="btn-switch-primary">
                <span className="led-indicator-amber" />
                Request Legal Demo
              </Link>
              <Link href="/audit" className="btn-switch-secondary">
                Submit an Exhibit
              </Link>
            </div>
          </motion.div>
          
          <div className="lg:w-2/5 p-8 border border-deepslate bg-[#030712] rounded-none relative overflow-hidden font-mono text-[11px]">
             <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
             <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3 border-b border-deepslate pb-3">
                  <div className="h-1.5 w-1.5 bg-red-500 rounded-none shadow-[0_0_5px_#EF4444]" />
                  <span className="text-[9px] font-bold uppercase text-red-500 tracking-widest">// EXHIBIT RISK DETECTED</span>
                </div>
                <div className="space-y-4">
                  <div className="h-3 w-full bg-slate-900" />
                  <div className="h-3 w-5/6 bg-red-950/20" />
                </div>
                <div className="pt-6 border-t border-deepslate">
                  <div className="text-[9px] font-bold text-slate-500 uppercase mb-4 tracking-widest">// INTAKE SUMMARY</div>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Authenticity Score</span>
                    <span className="text-red-500 font-bold tracking-widest">0.280 (LOW)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                    <span>Ledger ID</span>
                    <span className="text-verity-green font-bold tracking-widest">REGISTERED</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6 md:px-12 border-b border-deepslate bg-obsidian">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] font-mono font-bold text-amber-signal uppercase tracking-[0.4em] mb-16 text-center">// LEGAL USE CASES</h2>
          <div className="grid md:grid-cols-3 gap-8 font-mono text-[11px]">
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
               <div key={i} className="border border-deepslate bg-[#030712] p-8 rounded-none flex flex-col justify-between relative">
                 <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
                 <div>
                   <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal mb-6 rounded-none">
                     <useCase.icon size={18} />
                   </div>
                   <h4 className="text-base font-bold text-white mb-4 font-geist uppercase">{useCase.title}</h4>
                   <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">{useCase.desc}</p>
                 </div>
                 <Link href="/features/multimodal-forensics" className="text-[9px] font-bold text-amber-signal uppercase tracking-widest hover:underline flex items-center gap-1 mt-2">
                   [ Feature Specs ] <ChevronRight size={12} />
                 </Link>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-6">
              <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// COMPLIANCE SHIELD</span>
              <h3 className="text-3xl font-black text-white font-geist uppercase leading-tight">Objective Shield Against Synthetic Risk.</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Legal teams face an unprecedented rise in deepfake evidence and synthetic documents. Veridex provides a non-subjective forensic layer for internal review.
              </p>
              <ul className="space-y-6 font-mono text-[11px]">
                 <li className="flex gap-4">
                   <div className="h-8 w-8 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal shrink-0 rounded-none"><ShieldCheck size={18} /></div>
                   <div>
                     <span className="font-bold text-white uppercase font-geist text-xs">Evidentiary Defense</span>
                     <p className="text-[11px] text-slate-500 font-sans mt-1">Defend your intake process with structured audit artifacts and confidence signals.</p>
                   </div>
                 </li>
                 <li className="flex gap-4">
                    <div className="h-8 w-8 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal shrink-0 rounded-none"><Layers size={18} /></div>
                    <div>
                      <span className="font-bold text-white uppercase font-geist text-xs">Workflow Integration</span>
                      <p className="text-[11px] text-slate-500 font-sans mt-1">Seamlessly integrate forensic screening into existing discovery and intake workflows.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-8 w-8 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal shrink-0 rounded-none"><FileCheck size={18} /></div>
                    <div>
                      <span className="font-bold text-white uppercase font-geist text-xs">Standardized Reporting</span>
                      <p className="text-[11px] text-slate-500 font-sans mt-1">Receive consistent report formats for every exhibit, suitable for internal filing.</p>
                    </div>
                  </li>
              </ul>
           </div>
           
           <div className="border border-deepslate bg-[#030712] p-12 rounded-none relative font-mono text-[11px] space-y-8">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
              <h4 className="text-xl font-bold text-white uppercase font-geist tracking-wide">// Legal Exhibit Diagnostics</h4>
              <div className="space-y-8">
                 {[
                   { label: "Exhibit Verity Index", value: "0.220", type: "high-risk" },
                   { label: "Audio Spectral Check", value: "Anomalies Detected", type: "forensic" },
                   { label: "Document Origin ID", value: "Synthetic Markers", type: "origin" },
                   { label: "SHA-256 Ledger ID", value: "8f4e2a1b9c...", type: "immutable" }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-end border-b border-deepslate pb-4">
                      <div>
                        <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</div>
                        <div className="text-2xl font-black text-white">{stat.value}</div>
                      </div>
                      <div className="px-2 py-0.5 border border-deepslate text-[9px] font-bold text-amber-signal uppercase bg-deepslate/30">{stat.type}</div>
                   </div>
                 ))}
              </div>
              <div className="mt-12 text-center">
                 <Link href="/sample-audit" className="text-[9px] font-bold text-slate-400 hover:text-white uppercase tracking-[0.2em]">[ VIEW LEGAL CASE SAMPLE REPORT ]</Link>
              </div>
           </div>
        </div>
      </section>

      {/* Trust & Methodology Note */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-t border-deepslate">
        <div className="max-w-4xl mx-auto border border-amber-signal/20 bg-[#070b19]/30 p-10 rounded-none relative text-center space-y-4">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-amber-signal/20" />
          <p className="text-base text-slate-300 leading-relaxed italic font-sans">
            "Veridex forensic markers are assistive tools for internal discovery and screening. Our outputs are probabilistic and are not substitutes for courtroom expert witness testimony or judicial finality."
          </p>
          <div className="flex justify-center gap-8 font-mono text-[9px]">
            <Link href="/methodology" className="font-bold text-amber-signal uppercase tracking-widest hover:underline">[ Forensic Methodology ]</Link>
            <Link href="/limitations" className="font-bold text-slate-500 uppercase tracking-widest hover:text-white">[ Legal Limitations ]</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 md:px-12 text-center bg-obsidian border-t border-deepslate">
        <h3 className="text-2xl md:text-3xl font-black text-white font-geist uppercase mb-6">Fortify your digital discovery intake process.</h3>
        <div className="font-mono">
          <Link href="/request-demo" className="btn-switch-primary">Request Legal Walkthrough</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
