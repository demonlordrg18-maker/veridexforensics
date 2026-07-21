"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { 
  Zap, 
  ArrowLeft, 
  CreditCard, 
  Share2, 
  Check, 
  Download, 
  Plus, 
  Percent, 
  Sparkles, 
  AlertCircle, 
  TrendingUp, 
  ShieldAlert, 
  Building,
  ArrowUpRight
} from "lucide-react";
import { getCreditTransactions, recordCreditTransaction } from "@/lib/credit-engine";

const SUBSCRIPTION_PLANS = [
  {
    id: "FREE",
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For digital trust investigators starting out.",
    features: [
      "3 Forensic Audits / month",
      "50 MB Encrypted Vault Storage",
      "Linguistic & Claim Analysis",
      "Standard Web Interface",
      "Public Community Support"
    ],
    cta: "Current Plan",
    active: true,
    badge: null
  },
  {
    id: "STUDENT",
    name: "Student",
    price: "$9",
    period: "month",
    description: "Discounted tier for academic and student researchers.",
    features: [
      "100 Credits / month",
      "2 GB Encrypted Vault Storage",
      "Cross-Modality Metadata Inspection",
      "Priority PDF & Document Scan",
      "Academic Verification Required"
    ],
    cta: "Verify & Upgrade",
    active: false,
    badge: "Education"
  },
  {
    id: "PROFESSIONAL",
    name: "Professional",
    price: "$49",
    period: "month",
    description: "Deep forensic audits for journalists & investigators.",
    features: [
      "1,000 Credits / month",
      "20 GB Encrypted Vault Storage",
      "Audio/Video Deepfake Temporal Check",
      "Auto-export Certified PDF Reports",
      "Email & Chat Support (24h)",
      "Single-User API Access"
    ],
    cta: "Upgrade to Pro",
    active: false,
    badge: "Recommended"
  },
  {
    id: "BUSINESS",
    name: "Business",
    price: "$199",
    period: "month",
    description: "Collaborative forensic workflows for trust teams.",
    features: [
      "5,000 Credits / month",
      "100 GB Encrypted Vault Storage",
      "Shared Evidence Vault & Cases",
      "Department-level Usage Analytics",
      "SSO & Directory Sync",
      "Up to 5 Team Members"
    ],
    cta: "Upgrade to Business",
    active: false,
    badge: "Team Growth"
  },
  {
    id: "ENTERPRISE",
    name: "Enterprise",
    price: "Custom",
    period: "annual",
    description: "Hardened security & scale for intelligence agencies.",
    features: [
      "Unlimited Credits & Audits",
      "Multi-TB Custom Storage Node",
      "Dedicated On-Premises Option",
      "Full API Platform with high rate limits",
      "24/7 Security Operations SLA",
      "Unlimited Team Members & Logs"
    ],
    cta: "Contact Enterprise",
    active: false,
    badge: "Hardened"
  }
];

const PREPACKAGED_CREDITS = [
  { amount: 100, cost: 19, tag: "Standard Rate" },
  { amount: 500, cost: 79, tag: "Includes 50 bonus credits", popular: true },
  { amount: 2000, cost: 249, tag: "Best Cost Per Audit" }
];

export default function BillingPage() {
  const { user, updateCredits } = useAuth();
  
  // Custom states for simulated updates
  const [currentPlan, setCurrentPlan] = useState<string>("FREE");
  const [creditsRemaining, setCreditsRemaining] = useState<number>(50);
  const [storageUsed, setStorageUsed] = useState<number>(34.2); // MB
  const [storageLimit, setStorageLimit] = useState<number>(50); // MB
  const [invoices, setInvoices] = useState([
    { id: "INV-2026-004", date: "2026-07-01", amount: "$0.00", status: "Paid", items: "Free Tier Allocation" },
    { id: "INV-2026-003", date: "2026-06-01", amount: "$0.00", status: "Paid", items: "Free Tier Allocation" },
    { id: "INV-2026-002", date: "2026-05-15", amount: "$19.00", status: "Paid", items: "100 Credits Batch Top-up" },
    { id: "INV-2026-001", date: "2026-05-01", amount: "$0.00", status: "Paid", items: "Free Tier Allocation" }
  ]);
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "pm_1", type: "Visa", last4: "4242", expiry: "12/28", default: true }
  ]);
  
  const [coupon, setCoupon] = useState<string>("");
  const [couponSuccess, setCouponSuccess] = useState<string>("");
  const [couponError, setCouponError] = useState<string>("");
  const [customCreditsToBuy, setCustomCreditsToBuy] = useState<number>(250);
  const [purchasing, setPurchasing] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>("");
  const [newCardNumber, setNewCardNumber] = useState<string>("");
  const [newCardExpiry, setNewCardExpiry] = useState<string>("");
  const [newCardCvc, setNewCardCvc] = useState<string>("");
  const [addingCard, setAddingCard] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setCreditsRemaining(user.creditsRemaining);
      if (user.role && user.role !== "FREE") {
        setCurrentPlan(user.role);
      }
    }
  }, [user]);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    const code = coupon.trim().toUpperCase();
    if (!code) return;

    if (code === "STUDENT50") {
      setCouponSuccess("Promo Code STUDENT50 applied! 50% discount on Student/Academic tiers.");
    } else if (code === "VERIDEXLAUNCH") {
      setCouponSuccess("Promo Code VERIDEXLAUNCH applied! 20% lifetime discount on Professional tier.");
      // Instantly credit 10 bonus credits to simulate coupon bonus
      if (user) {
        const newBal = creditsRemaining + 10;
        updateCredits(newBal, 0);
        setCreditsRemaining(newBal);
        recordCreditTransaction(user.id, "Coupon Reward (VERIDEXLAUNCH)", 0, newBal);
      }
    } else if (code === "FALLVOLUME") {
      setCouponSuccess("Promo Code FALLVOLUME applied! Volume pricing discounts active.");
    } else {
      setCouponError("Invalid or expired coupon code.");
    }
  };

  const handleBuyCredits = (amount: number, cost: number) => {
    setPurchasing(true);
    setFeedbackMsg("");
    setTimeout(() => {
      if (user) {
        const newTotal = creditsRemaining + amount;
        updateCredits(newTotal, 0);
        setCreditsRemaining(newTotal);
        
        // Add invoice entry
        const invNum = `INV-2026-0${invoices.length + 1}`;
        const newInvoice = {
          id: invNum,
          date: new Date().toISOString().split("T")[0],
          amount: `$${cost.toFixed(2)}`,
          status: "Paid",
          items: `${amount} Credits Top-up`
        };
        setInvoices([newInvoice, ...invoices]);
        recordCreditTransaction(user.id, `Purchased ${amount} Credits`, 0, newTotal);
        setFeedbackMsg(`Successfully purchased ${amount} credits! Balance updated.`);
        setTimeout(() => setFeedbackMsg(""), 4000);
      }
      setPurchasing(false);
    }, 1000);
  };

  const handleUpgradePlan = (planId: string) => {
    setFeedbackMsg("");
    if (planId === "ENTERPRISE") {
      alert("Enterprise Inquiry submitted. Our security solutions team will contact you shortly.");
      return;
    }
    
    // Simulate plan upgrade
    setCurrentPlan(planId);
    let creditBonus = 0;
    let newLimit = 50;
    if (planId === "STUDENT") { creditBonus = 100; newLimit = 2000; }
    else if (planId === "PROFESSIONAL") { creditBonus = 1000; newLimit = 20000; }
    else if (planId === "BUSINESS") { creditBonus = 5000; newLimit = 100000; }
    
    setStorageLimit(newLimit);
    if (user) {
      const newBal = creditsRemaining + creditBonus;
      updateCredits(newBal, 0);
      setCreditsRemaining(newBal);
      recordCreditTransaction(user.id, `Upgraded plan to ${planId}`, 0, newBal);
      
      const planPrice = SUBSCRIPTION_PLANS.find(p => p.id === planId)?.price || "$0";
      const invNum = `INV-2026-0${invoices.length + 1}`;
      setInvoices([{
        id: invNum,
        date: new Date().toISOString().split("T")[0],
        amount: planPrice,
        status: "Paid",
        items: `Subscription upgrade to ${planId}`
      }, ...invoices]);
    }
    
    setFeedbackMsg(`Successfully upgraded to ${planId} Tier!`);
    setTimeout(() => setFeedbackMsg(""), 4000);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardNumber || !newCardExpiry) return;
    setAddingCard(true);
    setTimeout(() => {
      const last4 = newCardNumber.slice(-4) || "9999";
      setPaymentMethods([...paymentMethods, {
        id: `pm_${Date.now()}`,
        type: newCardNumber.startsWith("5") ? "Mastercard" : "Visa",
        last4,
        expiry: newCardExpiry,
        default: false
      }]);
      setNewCardNumber("");
      setNewCardExpiry("");
      setNewCardCvc("");
      setAddingCard(false);
    }, 800);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    alert(`Downloading Invoice ${invoiceId} PDF... (Simulated direct pipeline)`);
  };

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />

      <div className="pt-32 pb-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto space-y-12">
        
        {/* Back Link */}
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-slate-400 hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Dashboard
          </Link>
        </div>

        {/* Page Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-deepslate">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-signal">// STACK MONETIZATION ENGINE</span>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight font-geist mt-1">
              Billing & <span className="text-amber-signal">Monetization</span>
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Manage enterprise billing credentials, compute allocations, credit store, and invoices.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 font-mono">
            <div className="p-4 border border-deepslate bg-black text-right min-w-[140px]">
              <div className="text-2xl font-black text-white">{creditsRemaining}</div>
              <div className="text-[9px] text-amber-signal uppercase font-bold">Credits Remaining</div>
            </div>
            <div className="p-4 border border-deepslate bg-black text-right min-w-[140px]">
              <div className="text-2xl font-black text-white">{currentPlan}</div>
              <div className="text-[9px] text-slate-500 uppercase font-bold">Subscription Plan</div>
            </div>
            <div className="p-4 border border-deepslate bg-black text-right min-w-[140px]">
              <div className="text-2xl font-black text-white">{storageUsed.toFixed(1)} / {storageLimit} MB</div>
              <div className="text-[9px] text-slate-500 uppercase font-bold">Vault Storage Used</div>
            </div>
          </div>
        </div>

        {feedbackMsg && (
          <div className="p-4 border border-amber-signal/40 bg-amber-signal/10 text-amber-signal font-mono text-xs flex items-center gap-2 rounded-none">
            <Sparkles size={16} />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Grid 1: Plan Comparison */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white uppercase font-geist tracking-tight">Subscription Plans</h2>
              <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">// Scale computation power on-demand</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {SUBSCRIPTION_PLANS.map((plan) => {
              const isCurrent = currentPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  className={`border p-6 flex flex-col justify-between rounded-none relative transition-all ${
                    isCurrent 
                      ? "border-amber-signal bg-amber-signal/5 shadow-[0_0_20px_rgba(245,158,11,0.05)]" 
                      : "border-deepslate bg-[#030712] hover:border-slate-700"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-2.5 right-4 bg-amber-signal text-black font-mono text-[8px] font-bold px-2 py-0.5 uppercase tracking-wider">
                      {plan.badge}
                    </span>
                  )}
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-3xl font-black text-white font-geist">{plan.price}</span>
                        <span className="text-[10px] text-slate-500 font-mono">/{plan.period}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 leading-relaxed min-h-[40px]">{plan.description}</p>
                    </div>

                    <div className="h-px bg-deepslate w-full" />

                    <ul className="space-y-2 text-[10px] font-mono text-slate-300">
                      {plan.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check size={10} className="text-amber-signal shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleUpgradePlan(plan.id)}
                    disabled={isCurrent}
                    className={`w-full mt-6 py-2 text-center text-xs font-mono font-bold uppercase transition-all rounded-none border ${
                      isCurrent 
                        ? "border-amber-signal/40 bg-amber-signal/10 text-amber-signal cursor-default" 
                        : "border-deepslate bg-obsidian hover:border-white text-slate-200"
                    }`}
                  >
                    {isCurrent ? "Active Plan" : plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Grid 2: Buy Credits and Coupon Code */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Credit Pack Store */}
          <div className="lg:col-span-2 border border-deepslate bg-[#030712] p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white uppercase font-geist tracking-tight">Credit Core Store</h3>
              <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">// Purchase extra tokens for high density audits</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {PREPACKAGED_CREDITS.map((pkg) => (
                <div 
                  key={pkg.amount}
                  className={`p-5 border transition-all flex flex-col justify-between rounded-none ${
                    pkg.popular 
                      ? "border-amber-signal bg-amber-signal/5" 
                      : "border-deepslate bg-obsidian hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono uppercase text-slate-400">Tokens</span>
                      <Zap size={14} className="text-amber-signal" />
                    </div>
                    <div className="text-2xl font-black text-white font-mono mt-2">{pkg.amount}</div>
                    <p className="text-[9px] text-slate-500 font-mono mt-1">{pkg.tag}</p>
                  </div>
                  <button
                    onClick={() => handleBuyCredits(pkg.amount, pkg.cost)}
                    disabled={purchasing}
                    className="w-full mt-6 py-2 bg-amber-signal hover:bg-amber-amber-signal/80 text-black text-xs font-mono font-bold uppercase transition-all"
                  >
                    Buy ${pkg.cost}
                  </button>
                </div>
              ))}
            </div>

            {/* Custom slider */}
            <div className="p-5 border border-deepslate bg-obsidian space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400 font-bold uppercase">Custom Purchase Amount</span>
                <span className="text-amber-signal font-bold">{customCreditsToBuy} Credits (${(customCreditsToBuy * 0.15).toFixed(2)})</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="5000" 
                step="50"
                value={customCreditsToBuy}
                onChange={(e) => setCustomCreditsToBuy(Number(e.target.value))}
                className="w-full accent-amber-signal bg-deepslate h-1" 
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                <span>50 credits ($7.50)</span>
                <span>5,000 credits ($750.00)</span>
              </div>
              <button
                onClick={() => handleBuyCredits(customCreditsToBuy, customCreditsToBuy * 0.15)}
                disabled={purchasing}
                className="py-2.5 px-6 border border-amber-signal/40 bg-amber-signal/10 text-amber-signal hover:bg-amber-signal/20 font-mono text-xs font-bold uppercase transition-all"
              >
                Buy Custom Pack
              </button>
            </div>
          </div>

          {/* Discounts / Coupons & Referrals */}
          <div className="space-y-6">
            
            {/* Coupon widget */}
            <div className="border border-deepslate bg-[#030712] p-6 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white uppercase font-geist tracking-tight">Discounts & Promos</h4>
                <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">// Apply coupon code</p>
              </div>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. STUDENT50"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="bg-obsidian border border-deepslate p-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-amber-signal flex-grow"
                />
                <button
                  type="submit"
                  className="px-4 bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold uppercase transition-all text-white border border-slate-700"
                >
                  Apply
                </button>
              </form>
              {couponSuccess && (
                <p className="text-[10px] text-emerald-400 font-mono leading-relaxed">{couponSuccess}</p>
              )}
              {couponError && (
                <p className="text-[10px] text-rose-400 font-mono leading-relaxed">{couponError}</p>
              )}
              <div className="text-[9px] text-slate-500 font-mono space-y-1">
                <p>Try these promo codes:</p>
                <ul className="list-disc list-inside">
                  <li><span className="text-amber-signal">STUDENT50</span> - 50% discount</li>
                  <li><span className="text-amber-signal">VERIDEXLAUNCH</span> - Free 10 credits</li>
                </ul>
              </div>
            </div>

            {/* Referral Widget */}
            <div className="border border-deepslate bg-[#030712] p-6 space-y-4 font-mono">
              <div className="flex items-center gap-2 text-white text-xs font-bold uppercase">
                <Share2 size={14} className="text-amber-signal" />
                Referral Program
              </div>
              <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                Invite friends and colleagues. When they register, you both earn <span className="text-amber-signal font-bold">25 bonus credits</span>.
              </p>
              <div className="p-3 border border-deepslate bg-obsidian text-[10px] font-mono text-amber-signal font-bold flex items-center justify-between">
                <span className="truncate">veridex.ai/signup?ref={user?.referralCode || "u_ref_398a"}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://veridex.ai/signup?ref=${user?.referralCode || "u_ref_398a"}`);
                    alert("Referral link copied!");
                  }}
                  className="text-[9px] text-slate-500 hover:text-white uppercase font-bold shrink-0 ml-2"
                >
                  [Copy]
                </button>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono border-t border-deepslate/40 pt-2">
                <span>Invited Signups: <strong className="text-white">4</strong></span>
                <span>Credits Earned: <strong className="text-amber-signal">100</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid 3: Invoices & Payment Methods */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Invoice history */}
          <div className="lg:col-span-2 border border-deepslate bg-[#030712] p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white uppercase font-geist tracking-tight">Invoice History</h3>
              <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">// Complete transactional audit logs</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-deepslate text-slate-500 text-[10px] uppercase">
                    <th className="pb-3 font-bold">Invoice Number</th>
                    <th className="pb-3 font-bold">Billing Date</th>
                    <th className="pb-3 font-bold">Description</th>
                    <th className="pb-3 font-bold">Amount</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 font-bold text-right">PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-deepslate/40">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 text-white font-bold">{inv.id}</td>
                      <td className="py-3 text-slate-400">{inv.date}</td>
                      <td className="py-3 text-slate-300">{inv.items}</td>
                      <td className="py-3 text-white font-mono">{inv.amount}</td>
                      <td className="py-3">
                        <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] font-mono uppercase font-bold">
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleDownloadInvoice(inv.id)}
                          className="p-1 hover:text-amber-signal text-slate-500 transition-all inline-flex items-center gap-1"
                        >
                          <Download size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="border border-deepslate bg-[#030712] p-8 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white uppercase font-geist tracking-tight">Payment Methods</h3>
              <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">// Card vault & direct debit</p>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((pm) => (
                <div key={pm.id} className="p-4 border border-deepslate bg-obsidian flex items-center justify-between font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-amber-signal" size={16} />
                    <div>
                      <div className="text-white font-bold">{pm.type} •••• {pm.last4}</div>
                      <div className="text-[10px] text-slate-500">Expires {pm.expiry}</div>
                    </div>
                  </div>
                  {pm.default && (
                    <span className="px-1.5 py-0.5 border border-slate-700 bg-slate-800 text-slate-400 text-[8px] font-bold uppercase">
                      Default
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Add new mock payment method */}
            <form onSubmit={handleAddCard} className="space-y-3 border-t border-deepslate/40 pt-4 font-mono text-xs">
              <div className="text-xs text-white uppercase font-bold tracking-tight font-geist">// Add Card Stub</div>
              <input
                type="text"
                placeholder="Card Number"
                value={newCardNumber}
                onChange={(e) => setNewCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                className="w-full bg-obsidian border border-deepslate p-2 text-white focus:outline-none focus:border-amber-signal font-mono text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={newCardExpiry}
                  onChange={(e) => setNewCardExpiry(e.target.value.slice(0, 5))}
                  className="bg-obsidian border border-deepslate p-2 text-white focus:outline-none focus:border-amber-signal font-mono text-xs text-center"
                />
                <input
                  type="password"
                  placeholder="CVC"
                  value={newCardCvc}
                  onChange={(e) => setNewCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  className="bg-obsidian border border-deepslate p-2 text-white focus:outline-none focus:border-amber-signal font-mono text-xs text-center"
                />
              </div>
              <button
                type="submit"
                disabled={addingCard}
                className="w-full py-2 border border-slate-700 bg-slate-850 hover:bg-slate-800 font-bold uppercase text-[10px] text-white transition-all flex items-center justify-center gap-1"
              >
                <Plus size={12} />
                Add Payment Method
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
