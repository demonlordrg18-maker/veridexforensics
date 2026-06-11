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
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  const handleCheckout = async (plan: string, mode: "payment" | "subscription") => {
    // Basic email validation if they try to purchase
    if (!email) {
      setEmailErrors({
        [plan]: "Please enter your email to proceed to checkout."
      });
      // Scroll to email field on card
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

    // Track pricing click
    window.gtag?.('event', 'pricing_click', {
      event_category: 'engagement',
      event_label: plan === 'starter' ? 'pricing_page_starter_49' : 'pricing_page_pro_299',
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
        alert(`Checkout failed: ${data.error || "Unknown error"}. Please ensure your Price IDs are correctly set in the environment variables.`);
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment connection error. Please check your internet and try again.");
    }
  };

  const planComparison = [
    {
      feature: "Monthly Audits Included",
      free: "3 audits",
      starter: "20 credits (lifetime)",
      pro: "Unlimited",
      enterprise: "Unlimited / Custom",
    },
    {
      feature: "Modality Support",
      free: "Text & Link only",
      starter: "All (Text, Link, Docs, Image, Audio, Video)",
      pro: "All (Text, Link, Docs, Image, Audio, Video)",
      enterprise: "All + Custom fine-tuning",
    },
    {
      feature: "Forensic Analysis Speed",
      free: "Standard Queue (~10s)",
      starter: "Fast Queue (~4s)",
      pro: "Priority Queue (~2s)",
      enterprise: "Instant Dedicated Node",
    },
    {
      feature: "Evidence Decomposition",
      free: "Basic summary",
      starter: "Full claim extraction",
      pro: "Advanced (with Rhetorical Mechanisms)",
      enterprise: "Deep Forensic Diagnostics & Source Scrapes",
    },
    {
      feature: "Chain-of-Custody Logging",
      free: "❌",
      starter: "SHA-256 Ledger Registration",
      pro: "SHA-256 Ledger + Verification API",
      enterprise: "Private Ledger Node + Exportable Manifests",
    },
    {
      feature: "Admissible PDF Export",
      free: "❌",
      starter: "❌",
      pro: "✅ Cryptographically Signed",
      enterprise: "✅ Custom Branding & Custom Signatures",
    },
    {
      feature: "API Access",
      free: "❌",
      starter: "❌",
      pro: "Basic API (1,000 reqs/mo)",
      enterprise: "Unlimited Custom API Integration",
    },
    {
      feature: "Data Privacy Policy",
      free: "Standard",
      starter: "Zero-Storage Option",
      pro: "Zero-Storage & Fully Encrypted",
      enterprise: "Custom SLA & Custom Security Protocols",
    },
  ];

  const faqs = [
    {
      question: "Why should we pay for Veridex instead of using free AI detectors?",
      answer: "Generic AI detectors provide binary 'Real/Fake' answers with no transparent proof or explanation. Veridex decomposes claims atomically, cross-references digital footprints, maps cognitive biases, and assigns an immutable SHA-256 hash to register proof. We don't guess: we show the math, spectral peaks, and rhetorical signatures.",
    },
    {
      question: "How do the credits on the Starter plan work?",
      answer: "The Starter plan is a one-time purchase of $49 that grants you 20 forensic audits with no monthly expiration. It supports all media types (documents, images, audio, video, URLs) and records your files on our Ledger. Once you run out of credits, you can simply purchase another batch or upgrade to Pro.",
    },
    {
      question: "What is the benefit of the Editorial Pro tier?",
      answer: "Editorial Pro is designed for active investigators, legal professionals, and newsrooms. It offers unlimited audits, priority queue speeds under 2 seconds, full bias mapping, cryptographically signed PDF reports for court or editorial publication, and basic API access for programmatic verification.",
    },
    {
      question: "Is my uploaded content private and secure?",
      answer: "Absolutely. Veridex is designed under strict zero-knowledge protocols. Paid tiers have access to 'Zero-Storage' processing, meaning your content is parsed in memory, mapped to forensic scores, and immediately discarded. Only the cryptographic hash (SHA-256) is recorded on the public ledger for chain-of-custody.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can manage and cancel your Editorial Pro subscription at any time via your self-serve billing portal. Any remaining days in the billing cycle will remain active, and you will not be charged again.",
    },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-16 px-6 md:px-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.25em]"
          >
            <Scale size={12} className="animate-pulse" />
            // FORENSIC AUDITING ACQUISITION PLANS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-7xl font-black tracking-tight text-white mb-6 font-geist uppercase"
          >
            Sleek & Scalable <span className="text-amber-signal">Forensic Plans</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Unlock self-serve high-assurance verification. Instantly upgrade to verify digital evidence, media outputs, and corporate assets without sales friction.
          </motion.p>

          {/* Email input field that binds to checkout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto p-6 border border-deepslate bg-[#030712] text-left rounded-none font-mono text-[11px] relative"
          >
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
          </motion.div>
        </div>
      </section>

      {/* Tiers Grid */}
      <section className="pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6 items-stretch font-mono text-[11px]">
          
          {/* FREE TIER */}
          <div
            className="border border-deepslate bg-[#030712] p-8 rounded-none flex flex-col justify-between hover:border-slate-800 transition-all relative"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <div>
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-4">// Community Test</div>
              <div className="text-3xl font-bold text-white mb-6 font-geist">FREE</div>
              <p className="text-slate-400 font-sans leading-relaxed mb-6 text-xs">
                Evaluate basic verification capabilities. Perfect for students and curious professionals.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> 3 Audits per Month
                </li>
                <li className="text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Text & URL Analysis
                </li>
                <li className="text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Standard Report
                </li>
                <li className="text-slate-600 flex items-center gap-2 line-through">
                  [-] Multi-modal Files
                </li>
              </ul>
            </div>
            <Link 
              href="/audit" 
              className="btn-switch-secondary py-2"
            >
              Start Free
            </Link>
          </div>

          {/* STARTER TIER (Self-serve payment) */}
          <div
            className="border border-deepslate bg-[#030712] p-8 rounded-none flex flex-col justify-between hover:border-amber-signal/30 transition-all relative"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <div>
              <div className="text-[9px] font-bold text-amber-signal uppercase tracking-widest mb-4">// Starter Investigator</div>
              <div className="text-3xl font-bold text-white mb-6 font-geist">
                $49<span className="text-[10px] text-slate-500 font-bold ml-1 italic font-mono uppercase">/ one-time</span>
              </div>
              <p className="text-slate-300 font-sans leading-relaxed mb-6 text-xs">
                Self-serve package for small assignments and trials. Includes full file uploads.
              </p>
              
              <div className="mb-6 font-mono">
                <input
                  type="email"
                  id="email-input-starter"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailErrors({});
                  }}
                  placeholder="Enter email to checkout..."
                  className="w-full bg-[#020617] border border-deepslate focus:border-amber-signal/60 rounded-none px-3 py-2 text-[10px] text-white placeholder:text-slate-800 outline-none"
                />
                {emailErrors["starter"] && (
                  <p className="text-[9px] text-red-500 mt-1 font-bold">{emailErrors["starter"]}</p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                <li className="text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> 20 Audits (Lifetime)
                </li>
                <li className="text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Image, Audio & Video
                </li>
                <li className="text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Ledger Recording
                </li>
                <li className="text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Zero-Storage Compliance
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleCheckout('starter', 'payment')}
              className="btn-switch-primary py-2"
            >
              Buy Starter Batch
            </button>
          </div>

          {/* PRO TIER (Self-serve subscription) */}
          <div
            className="border border-amber-signal/40 bg-[#070b19]/40 p-8 rounded-none relative flex flex-col justify-between shadow-xl z-10"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 border border-amber-signal bg-amber-signal px-4 py-0.5 text-[8px] font-bold text-black uppercase tracking-[0.25em]">
              RECOMMENDED
            </div>
            <div>
              <div className="text-[9px] font-bold text-amber-signal uppercase tracking-widest mb-4">// Editorial Pro</div>
              <div className="text-3xl font-bold text-white mb-6 font-geist">
                $299<span className="text-[10px] text-slate-500 font-bold ml-1 italic font-mono uppercase">/ mo</span>
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
                  <CheckCircle2 size={12} className="text-amber-signal" /> Unlimited Audits
                </li>
                <li className="text-white flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Priority Queue (&lt;2s)
                </li>
                <li className="text-white flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Bias Fingerprinting
                </li>
                <li className="text-white flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Cryptographic signed PDFs
                </li>
                <li className="text-white flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Basic API Integration
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleCheckout('pro', 'subscription')}
              className="btn-switch-primary py-2"
            >
              Get Full Assurance
            </button>
          </div>

          {/* ENTERPRISE TIER */}
          <div
            className="border border-deepslate bg-[#030712] p-8 rounded-none flex flex-col justify-between hover:border-slate-800 transition-all relative"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
            <div>
              <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-4">// Enterprise Tiers</div>
              <div className="text-3xl font-bold text-white mb-6 font-geist">CUSTOM</div>
              <p className="text-slate-400 font-sans leading-relaxed mb-6 text-xs">
                On-prem, dedicated models, and compliance configurations for global corporations.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Custom Host Nodes
                </li>
                <li className="text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> Dedicated APIs
                </li>
                <li className="text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> 99.9% Uptime SLAs
                </li>
                <li className="text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-amber-signal" /> SSO / Team Auditing
                </li>
              </ul>
            </div>
            <Link 
              href="/request-demo" 
              className="btn-switch-secondary py-2"
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

      {/* Feature Comparison Table - Answering "Why Pay?" value proposition */}
      <section className="py-20 px-6 md:px-12 bg-obsidian border-y border-deepslate">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-[10px] font-mono font-bold text-amber-signal uppercase tracking-[0.4em]">// COMPLETE SPEC BREAKDOWN</h2>
            <h3 className="text-3xl md:text-4xl font-black text-white font-geist uppercase">Compare Plan Offerings</h3>
            <p className="text-slate-400 text-sm font-sans max-w-xl mx-auto">See exactly why professionals trust our paid forensic tiers over generic AI detection markers.</p>
          </div>

          <div className="border border-deepslate bg-[#030712] rounded-none overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono text-[11px]">
                <thead>
                  <tr className="border-b border-deepslate bg-[#070b19]/30 text-slate-400 uppercase tracking-widest text-[9px] font-bold">
                    <th className="p-6">Feature / Capability</th>
                    <th className="p-6">Free</th>
                    <th className="p-6 text-amber-signal">Starter</th>
                    <th className="p-6 text-amber-signal">Pro</th>
                    <th className="p-6">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-deepslate text-slate-300">
                  {planComparison.map((row, index) => (
                    <tr key={index} className="hover:bg-[#070b19]/25 transition-colors">
                      <td className="p-6 font-bold text-white uppercase text-[10px]">{row.feature}</td>
                      <td className="p-6 text-slate-500">{row.free}</td>
                      <td className="p-6 font-medium text-amber-signal/80">{row.starter}</td>
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
          <h3 className="text-3xl font-black text-white font-geist uppercase">Frequently Answered Questions</h3>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-deepslate bg-[#030712] p-8 rounded-none relative">
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
              <h4 className="text-base font-bold text-white mb-3 flex items-start gap-3 uppercase font-geist">
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
