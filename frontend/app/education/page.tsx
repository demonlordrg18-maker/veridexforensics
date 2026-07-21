"use client";

import React, { useState } from "react";
import { 
  GraduationCap, 
  BookOpen, 
  Check, 
  ArrowRight, 
  FileCheck, 
  Layers, 
  Lock, 
  Cpu, 
  Terminal, 
  ChevronDown, 
  Compass, 
  Sparkles,
  ArrowRightLeft,
  Users,
  Search,
  MessageSquare,
  HelpCircle,
  FileDown
} from "lucide-react";
import { Navbar, Footer } from "../../components/Navigation";
import { EducationPreviews } from "../../components/shared";

export default function EducationPlatformPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "How does Veridex handle student data privacy under FERPA?",
      answer: "We employ a zero-retention transit buffer design. Once an essay, document, or audio recording is checked for integrity metrics, the payload is parsed entirely in RAM and immediately flushed. We do not store submissions or student details, maintaining compliance with FERPA and GDPR standards."
    },
    {
      question: "Which LMS platforms are supported for integration?",
      answer: "We have architectural blueprints and API routing prepared for Canvas, Moodle, Blackboard, Google Classroom, and Microsoft Teams. Integrations run via LTI v1.3 standards to securely query assignment payloads without storing user records."
    },
    {
      question: "How does the faculty review workflow function?",
      answer: "Instructors receive a detailed, anonymized Verity Index metric. Instead of simple 'Pass/Fail' vibes, the dashboard maps stylistic consistency, sensor signature verification, and citation provenance log blocks, allowing educators to make informed, reproducible decisions."
    },
    {
      question: "Can we purchase pilot licenses for individual departments?",
      answer: "Yes, we support Faculty and Department-level pricing tiers before full institution-wide rollouts. A Department pilot grants shared credit balances and admin dashboard views for up to 25 instructors."
    }
  ];

  return (
    <div className="min-h-screen bg-obsidian text-slate-100 selection:bg-amber-signal selection:text-black font-sans overflow-x-hidden relative scanline-overlay">
      <Navbar />

      {/* Decorative vertical lines and technical grid */}
      <div className="absolute inset-y-0 left-12 w-[1px] bg-slate-900/40 pointer-events-none" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-slate-900/40 pointer-events-none" />
      
      {/* Background active grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 md:px-12 lg:pt-44 lg:pb-32 overflow-hidden border-b border-deepslate">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.02),transparent_70%)] -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left - Hero Text */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-8 relative z-20">
            <div className="flex items-center gap-2 font-mono text-[9px] text-amber-signal uppercase tracking-[0.2em] border border-amber-signal/20 bg-[#0F172A] px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-none bg-amber-signal animate-pulse" />
              VERIDEX ACADEMIC INTEGRITY SUITE
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05]">
              Scientific Integrity <br />
              <span className="font-mono font-normal tracking-wide text-amber-signal uppercase">[For Universities]</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl font-normal">
              Empower schools, departments, and research desks with reproducible digital authenticity audits. Verify files, images, and documents without compromising student privacy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#demo-previews" className="btn-switch-primary py-4 px-8 text-center text-xs">
                <span className="led-indicator-amber" />
                Explore Dashboard Previews
              </a>
              <button className="font-mono text-[10px] uppercase tracking-wider text-slate-400 hover:text-white border border-deepslate py-4 px-8 text-center flex items-center justify-center gap-2">
                Book Institution Demo
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="pt-6 border-t border-deepslate w-full font-mono text-[9px] text-slate-500 uppercase tracking-widest">
              // Supported by researchers, integrity boards, and libraries.
            </div>
          </div>

          {/* Right - Live Dashboard Preview Widget */}
          <div className="lg:col-span-6 w-full relative z-20" id="demo-previews">
            <EducationPreviews />
          </div>

        </div>
      </section>

      {/* Problems & Workflows Section */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// THE ACADEMIC GAP</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Real Educational Workflows</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">Veridex assists writing verification, research transparency, and image authentication, mapping into standard workflows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Academic Integrity", desc: "Understand writing authenticity and structural styling without relying on high-error plagiarism checkers." },
              { title: "Research Verification", desc: "Secure cryptographic provenance proofs of clinical trials, code datasets, and publication archives." },
              { title: "Digital Evidence Vault", desc: "Compile reproducible logs showing time-consistent proof of metadata and location." },
              { title: "Citation Verification", desc: "Verify bibliography sources, detecting hallucinated URLs and broken referencing chains." }
            ].map((item, idx) => (
              <div key={idx} className="bg-obsidian border border-deepslate p-6 text-left space-y-3">
                <div className="h-6 w-6 border border-amber-signal/20 bg-amber-signal/5 flex items-center justify-center font-mono text-[10px] text-amber-signal font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LMS Integration Section */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// CONNECTED CLASSROOMS</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">LMS Integration Architecture</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">Compatible with major LMS standards via LTI v1.3 secure protocols.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Canvas", "Moodle", "Blackboard", "Google Classroom", "Microsoft Teams"].map((lms) => (
              <div 
                key={lms}
                className="p-6 bg-[#02050b] border border-deepslate text-center hover:border-slate-800 transition-colors flex flex-col justify-center items-center gap-3"
              >
                <div className="h-8 w-8 rounded-none border border-amber-signal/10 bg-amber-signal/5 flex items-center justify-center font-mono text-xs text-amber-signal font-bold">
                  {lms[0]}
                </div>
                <span className="font-mono text-[10px] font-bold text-slate-300 uppercase tracking-widest">{lms}</span>
                <span className="font-mono text-[7px] text-slate-500">LTI 1.3 COMPATIBLE</span>
              </div>
            ))}
          </div>

          {/* Technical Details Blueprint */}
          <div className="max-w-4xl mx-auto bg-[#030712] border border-deepslate p-6 text-left space-y-4">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-amber-signal" />
              <span className="font-mono text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                ZK_LMS_API_ROUTE_MAP
              </span>
            </div>
            <div className="bg-black/60 p-4 font-mono text-[8px] text-slate-400 space-y-2 overflow-x-auto">
              <div>// Query LTI payload on student submission trigger</div>
              <div>POST /api/v1/integrations/lms/webhook {"{"} event: "submission.created", user_digest: "sha256(student_id)" {"}"}</div>
              <div>// Transient execution in RAM pipeline</div>
              <div>RUN_SCAN --volatile --type=stylography --temp-ledger-block=true</div>
              <div>// Update LMS assignment gradebook with verity metadata metrics</div>
              <div>PUT /api/v1/integrations/lms/gradebook/{"{id}"} {"{"} verity_score: 0.942, state: "VERIFIED_AUTHENTIC" {"}"}</div>
            </div>
            <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
              * Note: The integration does not persist student writing payloads, preserving absolute data ownership within your Canvas or Moodle databases.
            </p>
          </div>
        </div>
      </section>

      {/* Education Pricing Platform */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// ACADEMIC PLANS</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Specialized Academic Licensing</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto font-sans">Flexible credit pools designed for students, research desks, and institution-wide deployments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Student Individual */}
            <div className="bg-obsidian border border-deepslate p-6 text-left flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">// FOR STUDENTS</div>
                <h3 className="text-lg font-bold text-white">Student Individual</h3>
                <div className="font-mono text-2xl font-black text-white">$9 <span className="text-[10px] text-slate-500 font-normal">/ MONTH</span></div>
                <ul className="space-y-2 text-[10px] text-slate-400 pt-4 border-t border-slate-900">
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> 500 monthly credits</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Export verified PDF reports</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Writing style maps</li>
                </ul>
              </div>
              <button className="font-mono text-[9px] uppercase tracking-wider text-slate-400 hover:text-white border border-deepslate py-2.5">
                Register Student Account
              </button>
            </div>

            {/* Faculty Pool */}
            <div className="bg-obsidian border border-deepslate p-6 text-left flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">// INDIVIDUAL PROFESSORS</div>
                <h3 className="text-lg font-bold text-white">Faculty Plan</h3>
                <div className="font-mono text-2xl font-black text-white">$29 <span className="text-[10px] text-slate-500 font-normal">/ MONTH</span></div>
                <ul className="space-y-2 text-[10px] text-slate-400 pt-4 border-t border-slate-900">
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> 2,000 monthly credits</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Multi-student assignment grids</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Direct PDF reporting export</li>
                </ul>
              </div>
              <button className="font-mono text-[9px] uppercase tracking-wider text-slate-400 hover:text-white border border-deepslate py-2.5">
                Upgrade Faculty Account
              </button>
            </div>

            {/* Department Pilot */}
            <div className="bg-obsidian border border-amber-signal/30 p-6 text-left flex flex-col justify-between space-y-8 relative">
              <div className="absolute top-0 right-0 bg-amber-signal/10 border-l border-b border-amber-signal/20 px-2 py-0.5 font-mono text-[7px] text-amber-signal uppercase tracking-wider">
                RECOMMENDED PILOT
              </div>
              <div className="space-y-4">
                <div className="font-mono text-[8px] text-amber-signal uppercase tracking-widest">// PILOT PROGRAM</div>
                <h3 className="text-lg font-bold text-white">Department Pilot</h3>
                <div className="font-mono text-2xl font-black text-white">$199 <span className="text-[10px] text-slate-500 font-normal">/ MONTH</span></div>
                <ul className="space-y-2 text-[10px] text-slate-400 pt-4 border-t border-slate-900">
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> 15,000 monthly credits pool</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Up to 25 faculty workspaces</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Department Analytics panel</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> CSV/Export integrations</li>
                </ul>
              </div>
              <button className="btn-switch-primary py-2.5 text-[9px]">
                <span className="led-indicator-amber" />
                Request Department Pilot
              </button>
            </div>

            {/* Institution campus-wide */}
            <div className="bg-obsidian border border-deepslate p-6 text-left flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">// FULL DEPLOYMENTS</div>
                <h3 className="text-lg font-bold text-white">Campus Wide</h3>
                <div className="font-mono text-2xl font-black text-white">Custom <span className="text-[10px] text-slate-500 font-normal">/ DEPLOYMENT</span></div>
                <ul className="space-y-2 text-[10px] text-slate-400 pt-4 border-t border-slate-900">
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Unlimited monthly credits</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Canvas/LMS native integrations</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> FERPA compliant privacy locks</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Dedicated enterprise support desk</li>
                </ul>
              </div>
              <button className="font-mono text-[9px] uppercase tracking-wider text-slate-400 hover:text-white border border-deepslate py-2.5">
                Contact Academic Sales
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Academic FAQ Section */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-b border-deepslate">
        <div className="max-w-3xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// EDUCATION FAQ</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Academic Integrity FAQ</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">Common questions regarding privacy, integration, and deployment in higher education.</p>
          </div>

          <div className="space-y-2 text-left">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-[#030712] border border-deepslate"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-[#070b19]/40 transition-all"
                  >
                    <h4 className="text-xs font-mono font-bold text-white flex items-center gap-3">
                      <span className="text-amber-signal">0{index + 1} //</span>
                      {faq.question}
                    </h4>
                    <span className="text-slate-500">
                      <ChevronDown 
                        size={12} 
                        className={`transform transition-transform duration-200 ${isOpen ? "rotate-180 text-amber-signal" : ""}`} 
                      />
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[200px] border-t border-slate-900/50" : "max-h-0"
                    }`}
                  >
                    <p className="p-5 font-sans text-xs text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="pt-8 flex flex-wrap justify-center gap-4">
            <button className="btn-switch-primary py-3 px-6 text-[10px] flex items-center gap-2">
              <Sparkles size={12} />
              Book Institution Demo
            </button>
            <button className="font-mono text-[9px] uppercase tracking-wider text-slate-400 hover:text-white border border-deepslate py-3 px-6">
              Request Pilot Program
            </button>
            <button className="font-mono text-[9px] uppercase tracking-wider text-slate-400 hover:text-white border border-deepslate py-3 px-6 flex items-center gap-2">
              <FileDown size={12} />
              Download Brochure (PDF)
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
