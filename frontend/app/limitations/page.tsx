"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../components/Navigation";
import { 
  ShieldAlert, 
  Info, 
  Scale, 
  HelpCircle,
  EyeOff,
  AlertTriangle,
  ZapOff
} from "lucide-react";
import Link from "next/link";

const LimitationCard = ({ icon: Icon, title, description }: any) => (
  <div className="glass p-8 rounded-3xl border border-white/5 bg-white/[0.01]">
    <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6">
      <Icon size={20} />
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default function LimitationsPage() {
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
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-1.5 text-[10px] font-black text-orange-500 border border-orange-500/20 mb-8 uppercase tracking-[0.3em]">
              Disclosure of Limitations
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight">
              Trust Needs <span className="text-gradient">Boundaries.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
              Veridex is an assistive forensic tool. Understanding what we cannot guarantee is essential for professional use in high-stakes environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto glass border-orange-500/20 p-8 rounded-[2rem] bg-orange-500/[0.02] flex flex-col md:flex-row gap-8 items-center">
            <ShieldAlert className="text-orange-500 shrink-0" size={48} />
            <p className="text-slate-300 font-medium">
              Veridex provides probabilistic and heuristic signals. We do not provide absolute legal or factual certainty. Our outputs are intended to support, not replace, the judgment of qualified experts.
            </p>
        </div>
      </section>

      {/* Main Limitations Grid */}
      <section className="py-24 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <LimitationCard 
              icon={EyeOff}
              title="Probabilistic Signaling"
              description="Forensic markers (deepfake detection, bias mapping) are probabilistic, not deterministic. False positives and false negatives can and do occur based on media complexity."
            />
            <LimitationCard 
              icon={Scale}
              title="Not Legal Advice"
              description="Copyright risk assessments and verity profiles are forensic indicators. They are not legal opinions and do not constitute courtroom-ready evidence without human expert testimony."
            />
            <LimitationCard 
              icon={AlertTriangle}
              title="Compression Artifacts"
              description="High levels of media compression (e.g., social media re-uploads) can degrade forensic signals, making synthetic markers more difficult to isolate or generating false anomalies."
            />
            <LimitationCard 
              icon={ZapOff}
              title="Metadata Dependencies"
              description="Provenance and origin analysis often depend on metadata availability and external platform access. Stripped metadata will significantly reduce origin-tracing accuracy."
            />
            <LimitationCard 
               icon={HelpCircle}
               title="Hallucination Detection"
               description="While we audit claims against fact-checking archives, we cannot detect every instance of 'AI hallucination,' especially in niche, emerging, or highly technical domains with limited primary source data."
            />
            <LimitationCard 
               icon={Info}
               title="Human Review Required"
               description="In high-stakes cases (legal, journalistic, intelligence), Veridex outputs must be reviewed by a human professional who understands the specific context of the asset being audited."
            />
        </div>
      </section>

      {/* Specific Domain Notes */}
      <section className="py-24 px-4 md:px-12 bg-slate-900/30">
        <div className="max-w-4xl mx-auto space-y-16">
           <div>
             <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Audio & Video Limitations</h4>
             <p className="text-slate-400 text-sm leading-relaxed">
               As generative audio (voice cloning) becomes more sophisticated, the 'gap' between synthetic and organic signals continues to narrow. Veridex detects current-generation artifacts, but no tool can claim 100% detection rates against future, evolving generative models.
             </p>
           </div>
           
           <div className="pt-16 border-t border-white/5">
              <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Copyright Audit Scope</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our copyright analysis identifies verbatim overlap and significant training-set similarity. It does not assess 'fair use,' licensing status, or jurisdictional legality. It identifies *risk* by showing *where* the content matches existing data.
              </p>
           </div>

           <div className="pt-16 border-t border-white/5">
              <h4 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Jurisdictional Warnings</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Legislation regarding AI-generated evidence and content labeling varies globally (e.g., EU AI Act vs. US State laws). Veridex is a technical audit tool, not a compliance platform. Users are responsible for local legal adherence.
              </p>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 md:px-12 text-center">
        <h3 className="text-xl font-bold text-white mb-10">Questions about our forensic boundaries?</h3>
        <Link href="/request-demo" className="text-teal-400 font-bold hover:underline py-5 block uppercase tracking-[0.2em] text-xs">Request a Technical Walkthrough</Link>
      </section>

      <Footer />
    </div>
  );
}
