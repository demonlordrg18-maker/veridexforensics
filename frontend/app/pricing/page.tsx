"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { 
  CheckCircle2, 
  HelpCircle, 
  Info, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Globe, 
  Lock, 
  Activity, 
  Check, 
  Mail,
  Scale
} from "lucide-react";
import { Navbar, Footer } from "../../components/Navigation";

export default function PricingPage() {
  const [email, setEmail] = useState("");
  const [emailErrors, setEmailErrors] = useState<Record<string, string>>({});

  const handleCheckout = async (plan: string, mode: "payment" | "subscription") => {
    if (!email) {
      setEmailErrors({
        [plan]: "Please enter your email to proceed to checkout."
      });
      const emailField = document.getElementById(`email-input-${plan}`);
      emailField?.focus();
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setEmailErrors({
        [plan]: "Please enter a valid professional email address."
      });
      return;
    }

    setEmailErrors({});

    window.gtag?.('event', 'pricing_click', {
      event_category: 'engagement',
      event_label: plan,
    });

    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, mode, email }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout session creation failed:", data.error);
        alert(`Checkout failed: ${data.error || "Unknown error"}. Please ensure Stripe configuration keys are active.`);
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment connection error. Please try again.");
    }
  };

  const planComparison = [
    {
      feature: "Forensic Credits Included",
      free: "50 onboarding credits",
      student: "500 monthly credits",
      pro: "5,000 monthly credits",
      enterprise: "Custom custom limits",
    },
    {
      feature: "Modality Support",
      free: "Text & Link only",
      student: "All (Text, Link, Docs, Audio, Image)",
      pro: "All + API credential support",
      enterprise: "All + Dedicated hardware tuning",
    },
    {
      feature: "Forensic Analysis Speed",
      free: "Standard Queue (~10s)",
      student: "Fast Queue (~4s)",
      pro: "Priority Queue (~2s)",
      enterprise: "Dedicated Verification Nodes",
    },
    {
      feature: "Chain-of-Custody Logging",
      free: "❌",
      student: "SHA-256 Ledger Registration",
      pro: "SHA-256 Ledger + Verification API",
      enterprise: "Private Ledger integration + custom syncs",
    },
    {
      feature: "Admissible PDF Export",
      free: "❌",
      student: "Standard exports",
      pro: "✅ Cryptographically Signed PDF Reports",
      enterprise: "✅ Fully Custom Auditing templates & signatures",
    },
    {
      feature: "Data Privacy Policy",
      free: "Transient cleared RAM",
      student: "Zero-Storage RAM processing",
      pro: "Zero-Storage SOC2 Transient Buffers",
      enterprise: "Strict custom SLA & Dedicated node security",
    },
  ];

  const faqs = [
    {
      question: "Why should we pay for Veridex instead of using free AI detectors?",
      answer: "Generic AI detectors provide binary 'Real/Fake' answers with no transparent proof or explanation. Veridex decomposes claims atomically, cross-references digital footprints, maps cognitive biases, and assigns an immutable SHA-256 hash to register proof. We don't guess: we show the math, spectral peaks, and rhetorical signatures.",
    },
    {
      question: "How do the credits on the Professional desk plan work?",
      answer: "The Professional plan includes 5,000 monthly credits. 1 credit corresponds to 1 audit check (text, file, or URL analysis). It supports all media types (documents, images, audio, video, URLs) and records your files on our Ledger. Unused credits reset monthly.",
    },
    {
      question: "Is my uploaded content private and secure?",
      answer: "Absolutely. Veridex is designed under strict zero-knowledge protocols. Paid tiers have access to 'Zero-Storage' processing, meaning your content is parsed in memory, mapped to forensic scores, and immediately discarded. Only the cryptographic hash (SHA-256) is recorded on the public ledger for chain-of-custody.",
    }
  ];

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal scanline-overlay">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-16 px-6 md:px-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.015),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.25em]">
            <Scale size={12} className="animate-pulse" />
            // FORENSIC AUDIT ACQUISITION FEES
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-6 uppercase">
            Forensic <span className="text-amber-signal">Desks & Scale</span>
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed">
            Unlock self-serve high-assurance verification. Instantly upgrade to verify digital evidence, media outputs, and corporate assets without sales friction.
          </p>

          {/* Email input field that binds to checkout */}
          <div className="max-w-md mx-auto p-6 border border-deepslate bg-[#030712] text-left rounded-none font-mono text-[11px] relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-amber-signal/30" />
            <label className="block text-[9px] font-black uppercase tracking-widest text-slate-500 mb-2">
              [ STEP 1 ] Enter your professional email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailErrors({});
                }}
                placeholder="you@yourcompany.com"
                className="w-full bg-[#020617] border border-deepslate focus:border-amber-signal/60 rounded-none py-3.5 pl-12 pr-4 text-xs text-white placeholder:text-slate-800 outline-none transition-all"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-3 italic leading-relaxed font-sans">
              We require your professional email to instantly link purchased credits and plans to your audit sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Tiers Grid */}
      <section className="pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6 items-stretch font-mono text-[11px]">
          
          {/* FREE TIER */}
          <div className="border border-deepslate bg-[#030712] p-8 rounded-none flex flex-col justify-between hover:border-slate-800 transition-all relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <div>
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-4">// Evaluation Plan</div>
              <div className="text-3xl font-bold text-white mb-6">$0</div>
              <p className="text-slate-400 font-sans leading-relaxed mb-6 text-xs">
                Evaluate basic verification capabilities. Perfect for onboarding.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> 50 one-time credits
                </li>
                <li className="text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Text & URL Transient analysis
                </li>
              </ul>
            </div>
            <Link 
              href="/audit" 
              className="btn-switch-secondary py-2 text-center"
            >
              Start Free
            </Link>
          </div>

          {/* STUDENT TIER */}
          <div className="border border-deepslate bg-[#030712] p-8 rounded-none flex flex-col justify-between hover:border-amber-signal/30 transition-all relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <div>
              <div className="text-[9px] font-bold text-amber-signal uppercase tracking-widest mb-4">// Student Scholar</div>
              <div className="text-3xl font-bold text-white mb-6">
                $9<span className="text-[10px] text-slate-500 font-bold ml-1 italic font-mono uppercase">/ month</span>
              </div>
              <p className="text-slate-300 font-sans leading-relaxed mb-6 text-xs">
                Academic study plan for researchers. Full multi-modal file uploads.
              </p>
              
              <div className="mb-6 font-mono">
                <input
                  type="email"
                  id="email-input-student"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailErrors({});
                  }}
                  placeholder="Enter email to checkout..."
                  className="w-full bg-[#020617] border border-deepslate focus:border-amber-signal/60 rounded-none px-3 py-2 text-[10px] text-white placeholder:text-slate-800 outline-none"
                />
                {emailErrors["student"] && (
                  <p className="text-[9px] text-red-500 mt-1 font-bold">{emailErrors["student"]}</p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                <li className="text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> 500 monthly credits
                </li>
                <li className="text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Image, Audio & Video
                </li>
                <li className="text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Ledger Recording
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleCheckout('student', 'subscription')}
              className="btn-switch-primary py-2"
            >
              Get Student Plan
            </button>
          </div>

          {/* PROFESSIONAL TIER */}
          <div className="border border-amber-signal/40 bg-[#070b19]/40 p-8 rounded-none relative flex flex-col justify-between shadow-xl z-10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 border border-amber-signal bg-amber-signal px-4 py-0.5 text-[8px] font-bold text-black uppercase tracking-[0.25em]">
              RECOMMENDED
            </div>
            <div>
              <div className="text-[9px] font-bold text-amber-signal uppercase tracking-widest mb-4">// Professional Desk</div>
              <div className="text-3xl font-bold text-white mb-6">
                $49<span className="text-[10px] text-slate-500 font-bold ml-1 italic font-mono uppercase">/ month</span>
              </div>
              <p className="text-slate-200 font-sans leading-relaxed mb-6 font-medium text-xs">
                Full-scale verification capability for newsrooms, legal cases, and media organizations.
              </p>

              <div className="mb-6">
                <input
                  type="email"
                  id="email-input-pro"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailErrors({});
                  }}
                  placeholder="Enter email to checkout..."
                  className="w-full bg-[#020617] border border-deepslate focus:border-amber-signal/60 rounded-none px-3 py-2 text-[10px] text-white placeholder:text-slate-800 outline-none"
                />
                {emailErrors["pro"] && (
                  <p className="text-[9px] text-red-500 mt-1 font-bold">{emailErrors["pro"]}</p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                <li className="text-white flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> 5,000 monthly credits
                </li>
                <li className="text-white flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Priority Queue (&lt;2s)
                </li>
                <li className="text-white flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Cryptographic signed PDFs
                </li>
                <li className="text-white flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> API Credentials Access
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleCheckout('pro', 'subscription')}
              className="btn-switch-primary py-2"
            >
              Deploy Professional
            </button>
          </div>

          {/* ENTERPRISE TIER */}
          <div className="border border-deepslate bg-[#030712] p-8 rounded-none flex flex-col justify-between hover:border-slate-800 transition-all relative">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <div>
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-4">// Enterprise Desk</div>
              <div className="text-3xl font-bold text-white mb-6">CUSTOM</div>
              <p className="text-slate-400 font-sans leading-relaxed mb-6 text-xs">
                Dedicated nodes, custom host compliance configurations for global corporations.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Custom Host Nodes
                </li>
                <li className="text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Dedicated APIs
                </li>
                <li className="text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> SSO / Team Auditing
                </li>
              </ul>
            </div>
            <Link 
              href="/request-demo" 
              className="btn-switch-secondary py-2 text-center"
            >
              Contact Sales
            </Link>
          </div>

        </div>
        
        <p className="mt-12 text-center text-[9px] text-slate-500 font-mono font-bold uppercase tracking-widest italic flex items-center justify-center gap-3">
          <Info size={12} className="text-amber-signal shrink-0" /> 
          Stripe secure self-serve payments are fully supported. No sales friction.
        </p>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 px-6 md:px-12 bg-obsidian border-y border-deepslate">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-[10px] font-mono font-bold text-amber-signal uppercase tracking-[0.4em]">// COMPLETE SPEC breakdown</h2>
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase">Compare Plan Offerings</h3>
            <p className="text-slate-400 text-sm font-sans max-w-xl mx-auto">See exactly why professionals trust our paid forensic tiers over generic AI detection markers.</p>
          </div>

          <div className="border border-deepslate bg-[#030712] rounded-none overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-deepslate bg-[#070b19]/30 text-slate-400 uppercase tracking-widest text-[9px] font-bold">
                    <th className="p-6">Feature / Capability</th>
                    <th className="p-6">Free</th>
                    <th className="p-6 text-amber-signal">Student</th>
                    <th className="p-6 text-amber-signal">Pro</th>
                    <th className="p-6">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-deepslate text-slate-300">
                  {planComparison.map((row, index) => (
                    <tr key={index} className="hover:bg-[#070b19]/25 transition-colors">
                      <td className="p-6 font-bold text-white uppercase text-[10px]">{row.feature}</td>
                      <td className="p-6 text-slate-500">{row.free}</td>
                      <td className="p-6 font-medium text-amber-signal/80">{row.student}</td>
                      <td className="p-6 font-bold text-white">{row.pro}</td>
                      <td className="p-6 text-slate-400">{row.enterprise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto bg-obsidian">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-[10px] font-mono font-bold text-amber-signal uppercase tracking-[0.4em]">// BILLING INTELLIGENCE</h2>
          <h3 className="text-3xl font-black text-white uppercase">Frequently Answered Questions</h3>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-deepslate bg-[#030712] p-8 rounded-none relative">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
              <h4 className="text-base font-bold text-white mb-3 flex items-start gap-3 uppercase">
                <HelpCircle size={16} className="text-amber-signal shrink-0 mt-0.5" />
                {faq.question}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed pl-7 font-sans text-justify">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
