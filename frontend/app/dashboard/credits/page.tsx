"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { CREDIT_RATE_CARD, getCreditTransactions, CreditTransactionRecord } from "@/lib/credit-engine";
import { Zap, ArrowLeft, Plus, History, Shield, CheckCircle, RefreshCw, CreditCard, Share2 } from "lucide-react";

export default function CreditDashboardPage() {
  const { user, updateCredits } = useAuth();
  const [transactions, setTransactions] = useState<CreditTransactionRecord[]>([]);
  const [purchasing, setPurchasing] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");

  useEffect(() => {
    if (user?.id) {
      setTransactions(getCreditTransactions(user.id));
    }
  }, [user]);

  const handleBuyCreditsPackage = (amount: number, cost: string) => {
    setPurchasing(true);
    setTimeout(() => {
      if (user) {
        const newTotal = user.creditsRemaining + amount;
        updateCredits(newTotal, 0);
        setSuccessMsg(`Successfully purchased ${amount} credits! New balance: ${newTotal}`);
        setTimeout(() => setSuccessMsg(""), 4000);
      }
      setPurchasing(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />

      <div className="pt-32 pb-20 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto space-y-10">
        {/* Navigation back */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-slate-400 hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Command Dashboard
          </Link>
        </div>

        {/* Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-deepslate">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-signal">
              // Computation Economy Ledger
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight font-geist mt-1">
              Credit <span className="text-amber-signal">Engine & Usage</span>
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Every forensic computation consumes credits based on modal spectral density.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono">
            <div className="p-4 border border-amber-signal/40 bg-amber-signal/10 text-right rounded-none">
              <div className="text-2xl font-black text-white font-mono">{user?.creditsRemaining ?? 50}</div>
              <div className="text-[9px] text-amber-signal uppercase font-bold">Credits Remaining</div>
            </div>
          </div>
        </div>

        {successMsg && (
          <div className="p-4 border border-verity-green/40 bg-verity-green/10 text-verity-green font-mono text-xs flex items-center gap-2">
            <CheckCircle size={16} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Rate Card & Purchase Options */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rate Card Table */}
          <div className="lg:col-span-2 border border-deepslate bg-[#030712] p-8 rounded-none space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-deepslate">
              <div>
                <h3 className="text-lg font-bold text-white uppercase font-geist tracking-tight">
                  Configurable <span className="text-amber-signal">Rate Card</span>
                </h3>
                <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">// Cost Per Modality Execution</p>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Config V2.6</span>
            </div>

            <div className="grid gap-3">
              {Object.values(CREDIT_RATE_CARD).map((item) => (
                <div
                  key={item.modality}
                  className="p-4 border border-deepslate bg-obsidian flex items-center justify-between gap-4 rounded-none hover:border-amber-signal/30 transition-all"
                >
                  <div>
                    <h4 className="text-xs font-bold text-white font-geist uppercase">{item.label}</h4>
                    <p className="text-[10px] text-slate-400 font-sans mt-0.5">{item.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-3 py-1 border border-amber-signal/30 bg-amber-signal/10 font-mono text-xs font-bold text-amber-signal">
                      {item.cost} {item.cost === 1 ? "Credit" : "Credits"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Purchase Credit Packages */}
          <div className="space-y-6">
            <div className="border border-amber-signal/30 bg-[#070b19] p-8 rounded-none space-y-6 shadow-[0_0_30px_rgba(245,158,11,0.08)]">
              <div>
                <span className="text-[9px] font-mono font-bold uppercase text-amber-signal">// INSTANT TOP-UP</span>
                <h3 className="text-lg font-bold text-white uppercase font-geist tracking-tight mt-1">Purchase Credits</h3>
                <p className="text-xs text-slate-400 font-mono mt-1">Add credits on demand. Bonus credits never expire.</p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleBuyCreditsPackage(100, "$19")}
                  disabled={purchasing}
                  className="w-full p-4 border border-deepslate bg-obsidian hover:border-amber-signal text-left transition-all rounded-none flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white font-geist">100 Credit Batch</div>
                    <div className="text-[9px] text-slate-500 font-mono">Standard rate</div>
                  </div>
                  <span className="font-mono text-xs font-bold text-amber-signal">$19</span>
                </button>

                <button
                  onClick={() => handleBuyCreditsPackage(500, "$79")}
                  disabled={purchasing}
                  className="w-full p-4 border border-amber-signal/50 bg-amber-signal/5 hover:bg-amber-signal/10 text-left transition-all rounded-none flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white font-geist flex items-center gap-2">
                      <span>500 Credit Power Batch</span>
                      <span className="px-1.5 py-0.5 bg-amber-signal text-black font-mono text-[8px] font-bold">POPULAR</span>
                    </div>
                    <div className="text-[9px] text-slate-500 font-mono">Includes 50 bonus credits</div>
                  </div>
                  <span className="font-mono text-xs font-bold text-amber-signal">$79</span>
                </button>

                <button
                  onClick={() => handleBuyCreditsPackage(2000, "$249")}
                  disabled={purchasing}
                  className="w-full p-4 border border-deepslate bg-obsidian hover:border-amber-signal text-left transition-all rounded-none flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white font-geist">2,000 Enterprise Batch</div>
                    <div className="text-[9px] text-slate-500 font-mono">Best cost per audit</div>
                  </div>
                  <span className="font-mono text-xs font-bold text-amber-signal">$249</span>
                </button>
              </div>
            </div>

            {/* Referral Widget */}
            <div className="border border-deepslate bg-[#030712] p-6 rounded-none space-y-3 font-mono">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase">
                <Share2 size={16} className="text-amber-signal" />
                Referral Program
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                Share your referral link with colleagues. Each signup earns both of you <span className="text-amber-signal font-bold">25 bonus credits</span>.
              </p>
              <div className="p-3 border border-deepslate bg-obsidian text-xs font-mono text-amber-signal font-bold flex items-center justify-between">
                <span>veridex.ai/signup?ref={user?.referralCode}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`https://veridex.ai/signup?ref=${user?.referralCode}`);
                    alert("Referral link copied!");
                  }}
                  className="text-[9px] text-slate-400 hover:text-white uppercase font-bold"
                >
                  [COPY]
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History Log Feed */}
        <div className="border border-deepslate bg-[#030712] p-8 rounded-none space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-deepslate font-mono">
            <div>
              <h3 className="text-lg font-bold text-white uppercase font-geist tracking-tight">
                Transaction <span className="text-amber-signal">Audit Trail</span>
              </h3>
              <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">// Complete Computation Log</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <History size={14} />
              <span>{transactions.length} Recorded Transactions</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-deepslate text-slate-500 text-[10px] uppercase">
                  <th className="pb-3 font-bold">Timestamp</th>
                  <th className="pb-3 font-bold">Action / Modality</th>
                  <th className="pb-3 font-bold">Credits Used</th>
                  <th className="pb-3 font-bold">Balance Remaining</th>
                  <th className="pb-3 font-bold">Node IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-deepslate/40">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 text-slate-400">{new Date(tx.timestamp).toLocaleString()}</td>
                    <td className="py-3.5 text-white font-bold">{tx.action}</td>
                    <td className="py-3.5 text-amber-signal font-bold">-{tx.creditsUsed}</td>
                    <td className="py-3.5 text-slate-300 font-bold">{tx.remaining}</td>
                    <td className="py-3.5 text-slate-500 text-[10px]">{tx.ipAddress || "127.0.0.1"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
