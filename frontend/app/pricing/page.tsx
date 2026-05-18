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
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-teal-500 selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-36 pb-16 px-4 md:px-12 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(13,148,136,0.12),transparent_70%)] -z-10" />
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-[10px] font-black text-teal-400 border border-teal-500/20 mb-6 uppercase tracking-[0.25em]"
          >
            <Scale size={12} className="animate-pulse" />
            Flexible Monetization Options
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tight text-white mb-6 leading-none"
          >
            Sleek & Scalable <span className="bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-300 bg-clip-text text-transparent">Forensic Plans</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Unlock self-serve high-assurance verification. Instantly upgrade to verify digital evidence, media outputs, and corporate assets without sales friction.
          </motion.p>

          {/* Email input field that binds to checkout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="max-w-md mx-auto mb-16 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left"
          >
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
              Step 1: Enter your professional email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailErrors({});
                }}
                placeholder="you@yourcompany.com"
                className="w-full bg-slate-950/80 border border-white/10 focus:border-teal-500 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-700 outline-none transition-all focus:ring-1 focus:ring-teal-500/50"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-2 italic leading-relaxed">
              We require your professional email to instantly link purchased credits and plans to your audit sessions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tiers Grid */}
      <section className="pb-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-6 items-stretch">
          
          {/* FREE TIER */}
          <motion.div
            onMouseEnter={() => setHoveredTier("free")}
            onMouseLeave={() => setHoveredTier(null)}
            className="glass-dark p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]"
          >
            <div>
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Community Test</div>
              <div className="text-4xl font-black text-white mb-6">FREE</div>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Evaluate basic verification capabilities. Perfect for students and curious professionals.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="text-[10px] text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-500" /> 3 Audits per Month
                </li>
                <li className="text-[10px] text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-500" /> Text & URL Analysis
                </li>
                <li className="text-[10px] text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-500" /> Standard Forensic Report
                </li>
                <li className="text-[10px] text-slate-600 flex items-center gap-2 line-through">
                  ❌ Multi-modal File Uploads
                </li>
              </ul>
            </div>
            <Link 
              href="/audit" 
              className="w-full py-4 rounded-xl border border-white/10 text-white text-center font-black uppercase tracking-widest text-[9px] hover:bg-white/5 transition-all"
            >
              Start Free Auditor
            </Link>
          </motion.div>

          {/* STARTER TIER (Self-serve payment) */}
          <motion.div
            onMouseEnter={() => setHoveredTier("starter")}
            onMouseLeave={() => setHoveredTier(null)}
            className={`glass p-8 rounded-[2.5rem] flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] border relative ${
              hoveredTier === "starter" ? "border-teal-500/40 bg-teal-500/[0.02]" : "border-teal-500/20"
            }`}
          >
            <div>
              <div className="text-[9px] font-black text-teal-400 uppercase tracking-widest mb-4">Starter Investigator</div>
              <div className="text-4xl font-black text-white mb-6">
                $49<span className="text-xs text-slate-500 font-bold ml-1 italic">/ one-time</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Self-serve package for small assignments and trials. Includes full file modality uploads.
              </p>
              
              <div className="mb-6">
                <input
                  type="email"
                  id="email-input-starter"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailErrors({});
                  }}
                  placeholder="Enter email to checkout..."
                  className="w-full bg-slate-950/60 border border-white/10 focus:border-teal-500 rounded-xl px-3 py-2 text-[10px] text-white placeholder:text-slate-700 outline-none"
                />
                {emailErrors["starter"] && (
                  <p className="text-[9px] text-rose-400 mt-1 font-bold">{emailErrors["starter"]}</p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                <li className="text-[10px] text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-500" /> 20 Audits (No expiration)
                </li>
                <li className="text-[10px] text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-500" /> Image, Audio & Video Forensic
                </li>
                <li className="text-[10px] text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-500" /> SHA-256 Ledger Recording
                </li>
                <li className="text-[10px] text-slate-300 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-500" /> Zero-Storage Compliance
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleCheckout('starter', 'payment')}
              className="w-full py-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 text-center font-black uppercase tracking-widest text-[9px] hover:bg-teal-500/20 transition-all flex items-center justify-center gap-2"
            >
              Buy Starter Batch <ArrowRight size={12} />
            </button>
          </motion.div>

          {/* PRO TIER (Self-serve subscription) */}
          <motion.div
            onMouseEnter={() => setHoveredTier("pro")}
            onMouseLeave={() => setHoveredTier(null)}
            className="glass p-8 rounded-[2.5rem] border-teal-500/40 relative flex flex-col justify-between shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-teal-500/[0.04] z-10"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-teal-500 px-4 py-1 text-[7px] font-black text-white uppercase tracking-[0.25em]">
              MOST POPULAR
            </div>
            <div>
              <div className="text-[9px] font-black text-teal-300 uppercase tracking-widest mb-4">Editorial Pro</div>
              <div className="text-4xl font-black text-white mb-6">
                $299<span className="text-xs text-slate-600 font-bold ml-1 italic">/ mo</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed mb-6 font-medium">
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
                  className="w-full bg-slate-950/60 border border-white/10 focus:border-teal-500 rounded-xl px-3 py-2 text-[10px] text-white placeholder:text-slate-700 outline-none"
                />
                {emailErrors["pro"] && (
                  <p className="text-[9px] text-rose-400 mt-1 font-bold">{emailErrors["pro"]}</p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                <li className="text-[10px] text-white flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-400" /> Unlimited Audits
                </li>
                <li className="text-[10px] text-white flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-400" /> Priority Forensic Queue
                </li>
                <li className="text-[10px] text-white flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-400" /> Bias Fingerprinting
                </li>
                <li className="text-[10px] text-white flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-400" /> Cryptographic signed PDFs
                </li>
                <li className="text-[10px] text-white flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-400" /> Basic API Integration
                </li>
              </ul>
            </div>
            <button 
              onClick={() => handleCheckout('pro', 'subscription')}
              className="w-full py-4 rounded-xl bg-teal-500 text-black text-center font-black uppercase tracking-widest text-[9px] hover:bg-teal-400 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              Get Full Assurance <Zap size={10} fill="currentColor" />
            </button>
          </motion.div>

          {/* ENTERPRISE TIER */}
          <motion.div
            onMouseEnter={() => setHoveredTier("enterprise")}
            onMouseLeave={() => setHoveredTier(null)}
            className="glass-dark p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]"
          >
            <div>
              <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Enterprise Tiers</div>
              <div className="text-3xl font-black text-white mb-6 italic">Custom / SLAs</div>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                On-prem, dedicated models, and compliance configurations for global corporations.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="text-[10px] text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-500" /> Custom Fine-tuned Models
                </li>
                <li className="text-[10px] text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-500" /> Dedicated Host Nodes
                </li>
                <li className="text-[10px] text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-500" /> 99.9% Uptime Guarantee (SLA)
                </li>
                <li className="text-[10px] text-slate-500 flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-teal-500" /> SSO & Team Administration
                </li>
              </ul>
            </div>
            <Link 
              href="/request-demo" 
              className="w-full py-4 rounded-xl border border-white/10 text-white text-center font-black uppercase tracking-widest text-[9px] hover:bg-white/5 transition-all"
            >
              Contact Sales
            </Link>
          </motion.div>

        </div>
        
        <p className="mt-12 text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest italic flex items-center justify-center gap-3">
          <Info size={12} className="text-teal-500 shrink-0" /> 
          Stripe secure self-serve payments are fully supported. No waiting for sales consultation.
        </p>
      </section>

      {/* Feature Comparison Table - Answering "Why Pay?" value proposition */}
      <section className="py-20 px-4 md:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-4">Complete Spec Breakdown</h2>
            <h3 className="text-3xl md:text-4xl font-black text-white">Compare Plan Offerings</h3>
            <p className="text-slate-400 mt-3 text-sm">See exactly why professionals trust our paid forensic tiers over generic AI detection markers.</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-white/10 shadow-2xl glass-dark">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-slate-400 font-black uppercase tracking-widest">
                  <th className="p-6">Feature / Capability</th>
                  <th className="p-6">Free</th>
                  <th className="p-6 text-teal-400">Starter</th>
                  <th className="p-6 text-teal-300">Editorial Pro</th>
                  <th className="p-6">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {planComparison.map((row, index) => (
                  <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-bold text-slate-100">{row.feature}</td>
                    <td className="p-6 text-slate-500">{row.free}</td>
                    <td className="p-6 font-medium text-teal-200/90">{row.starter}</td>
                    <td className="p-6 font-semibold text-teal-100">{row.pro}</td>
                    <td className="p-6 text-slate-400">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-black text-teal-500 uppercase tracking-[0.4em] mb-4">Billing Intelligence</h2>
          <h3 className="text-3xl font-black text-white">Frequently Answered Questions</h3>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="glass p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
              <h4 className="text-base font-bold text-white mb-3 flex items-start gap-3">
                <HelpCircle size={18} className="text-teal-500 shrink-0 mt-0.5" />
                {faq.question}
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed pl-7">
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
