"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../../components/Navigation";
import { 
  UserCheck, 
  ShieldCheck, 
  Search, 
  FileText, 
  ArrowRight,
  ChevronRight,
  Database,
  LineChart,
  Network,
  Scale
} from "lucide-react";
import Link from "next/link";

export default function ResearchersSolution() {
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
              // RESEARCH WORKFLOW OPERATIONS
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight font-geist uppercase">
              Evidence-First <span className="text-amber-signal">Content Analysis.</span>
            </h1>
            <p className="text-base text-slate-400 leading-relaxed font-sans">
              Automated provenance assessment, claim decomposition, and rhetorical pattern mapping for archival studies, media research, and disinformation analysis.
            </p>
            <div className="flex flex-wrap gap-4 font-mono">
              <Link href="/request-demo" className="btn-switch-primary">
                <span className="led-indicator-amber" />
                Request Research License
              </Link>
              <Link href="/audit" className="btn-switch-secondary">
                Try a Sample Audit
              </Link>
            </div>
          </motion.div>
          
          <div className="lg:w-2/5 p-8 border border-deepslate bg-[#030712] rounded-none relative overflow-hidden font-mono text-[11px]">
             <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
             <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3 border-b border-deepslate pb-3">
                  <div className="h-1.5 w-1.5 bg-amber-signal rounded-none shadow-[0_0_5px_#F59E0B]" />
                  <span className="text-[9px] font-bold uppercase text-white tracking-widest">// ACTIVE AUDIT NODE</span>
                </div>
                <div className="space-y-4">
                  <div className="h-3 w-full bg-slate-900" />
                  <div className="h-3 w-5/6 bg-amber-signal/20" />
                </div>
                <div className="pt-6 border-t border-deepslate">
                  <div className="text-[9px] font-bold text-slate-500 uppercase mb-4 tracking-widest">// MODULE STATE</div>
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Provenance Check</span>
                    <span className="text-verity-green font-bold tracking-widest">ENABLED</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                    <span>Claim Decomp.</span>
                    <span className="text-verity-green font-bold tracking-widest">ENABLED</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6 md:px-12 border-b border-deepslate bg-obsidian">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[10px] font-mono font-bold text-amber-signal uppercase tracking-[0.4em] mb-16 text-center">// RESEARCH USE CASES</h2>
          <div className="grid md:grid-cols-3 gap-8 font-mono text-[11px]">
             {[
               {
                 icon: Network,
                 title: "Provenance Assessment",
                 desc: "Track the digital origin of content through metadata artifacts and forensic signal correlation across platform archives."
               },
               {
                 icon: Scale,
                 title: "Disinformation Auditing",
                 desc: "Identify rhetorical/bias pattern shifts in large media sets over time using algorithmic mapping of manipulation heuristics."
               },
               {
                 icon: FileText,
                 title: "Claim-Level Studies",
                 desc: "Automate the extraction and cross-referencing of factual claims across thousands of documents for archival verification."
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
                 <Link href="/platform" className="text-[9px] font-bold text-amber-signal uppercase tracking-widest hover:underline flex items-center gap-1 mt-2">
                   [ Research Tools ] <ChevronRight size={12} />
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
              <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// RESEARCH CRITERIA</span>
              <h3 className="text-3xl font-black text-white font-geist uppercase leading-tight">Objective Audits for Repeatable Research.</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-sans">
                Researchers need defensible, repeatable methods. Veridex provides a structured forensic trail for every asset, reducing subjectivity in content analysis.
              </p>
              <ul className="space-y-6 font-mono text-[11px]">
                 <li className="flex gap-4">
                   <div className="h-8 w-8 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal shrink-0 rounded-none"><ShieldCheck size={18} /></div>
                   <div>
                     <span className="font-bold text-white uppercase font-geist text-xs">Algorithmic Objectivity</span>
                     <p className="text-[11px] text-slate-500 font-sans mt-1">Remove human bias from initial content screening and signal detection.</p>
                   </div>
                 </li>
                 <li className="flex gap-4">
                    <div className="h-8 w-8 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal shrink-0 rounded-none"><Database size={18} /></div>
                    <div>
                      <span className="font-bold text-white uppercase font-geist text-xs">Archival Ledger Proof</span>
                      <p className="text-[11px] text-slate-500 font-sans mt-1">Document the forensic scan of every research asset on an immutable ledger.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-8 w-8 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal shrink-0 rounded-none"><Search size={18} /></div>
                    <div>
                      <span className="font-bold text-white uppercase font-geist text-xs">Standardized Analysis</span>
                      <p className="text-[11px] text-slate-500 font-sans mt-1">Use a unified set of forensic markers across multi-modal data sets.</p>
                    </div>
                  </li>
              </ul>
           </div>
           
           <div className="border border-deepslate bg-[#030712] p-12 rounded-none relative font-mono text-[11px] space-y-8">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
              <h4 className="text-xl font-bold text-white uppercase font-geist tracking-wide">// Standard Research Outputs</h4>
              <div className="space-y-8">
                 {[
                   { label: "Synthetic Text Indicator", value: "98.2%", type: "high-assurance" },
                   { label: "Rhetorical Mechanism ID", value: "Loaded Language", type: "signal" },
                   { label: "Factual Assertion Count", value: "24 Atoms", type: "decomp" },
                   { label: "Temporal Accuracy", value: "Verified 2024-03-12", type: "provenance" }
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
                 <Link href="/sample-audit" className="text-[9px] font-bold text-slate-400 hover:text-white uppercase tracking-[0.2em]">[ VIEW RESEARCH AUDIT SAMPLE ]</Link>
              </div>
           </div>
        </div>
      </section>

      {/* Trust & Methodology Note */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-t border-deepslate">
        <div className="max-w-4xl mx-auto border border-amber-signal/20 bg-[#070b19]/30 p-10 rounded-none relative text-center space-y-4">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-amber-signal/20" />
          <p className="text-base text-slate-300 leading-relaxed italic font-sans">
            "Veridex results for researchers are designed to be assistive. Our probabilistic scoring provides a consistent signal across data sets, but final academic or professional conclusions always require expert human context."
          </p>
          <div className="flex justify-center gap-8 font-mono text-[9px]">
            <Link href="/methodology" className="font-bold text-amber-signal uppercase tracking-widest hover:underline">[ Full Methodology ]</Link>
            <Link href="/limitations" className="font-bold text-slate-500 uppercase tracking-widest hover:text-white">[ Platform Limitations ]</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 md:px-12 text-center bg-obsidian border-t border-deepslate">
        <h3 className="text-2xl md:text-3xl font-black text-white font-geist uppercase mb-6">Scale your research with forensic assurance.</h3>
        <div className="font-mono">
          <Link href="/request-demo" className="btn-switch-primary">Request Research Access</Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
