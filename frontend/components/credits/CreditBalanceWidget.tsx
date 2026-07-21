"use client";

import React from "react";
import Link from "next/link";
import { Zap, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

export const CreditBalanceWidget: React.FC = () => {
  const { user } = useAuth();

  const remaining = user?.creditsRemaining ?? 50;
  const allocation = user?.monthlyAllocation ?? 50;
  const used = user?.creditsUsed ?? 0;
  const percentUsed = Math.min(100, Math.round((used / allocation) * 100));

  const formattedResetDate = user?.nextResetDate
    ? new Date(user.nextResetDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    : "30 days";

  return (
    <div className="p-6 border border-amber-signal/30 bg-[#070b19] rounded-none shadow-[0_0_20px_rgba(245,158,11,0.08)] font-sans space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-8 w-8 border border-amber-signal/40 bg-amber-signal/10 text-amber-signal rounded-none">
            <Zap size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white font-geist uppercase tracking-tight">Credit Economy</h4>
            <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">// Real-Time Ledger</p>
          </div>
        </div>
        <span className="px-2 py-0.5 border border-amber-signal/20 bg-amber-signal/5 text-amber-signal font-mono text-[9px] font-bold uppercase">
          Active
        </span>
      </div>

      <div className="space-y-1">
        <div className="text-3xl font-black text-white font-mono flex items-baseline gap-2">
          <span>{remaining}</span>
          <span className="text-xs text-slate-500 font-sans font-normal uppercase">Credits Available</span>
        </div>
        <p className="text-[10px] text-slate-400 font-mono">
          Monthly Allocation: <span className="text-amber-signal font-bold">{allocation}</span> • Next Reset: <span className="text-slate-300 font-bold">{formattedResetDate}</span>
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[9px] font-mono text-slate-500 uppercase">
          <span>Usage Meter</span>
          <span>{used} Used ({percentUsed}%)</span>
        </div>
        <div className="w-full bg-obsidian border border-deepslate h-2 overflow-hidden">
          <div
            className="bg-amber-signal h-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(5, (remaining / allocation) * 100))}%` }}
          />
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between gap-2 border-t border-deepslate font-mono text-[10px]">
        <Link
          href="/dashboard/credits"
          className="text-amber-signal hover:underline font-bold uppercase flex items-center gap-1"
        >
          <span>Credit Dashboard & Logs</span>
          <ArrowRight size={12} />
        </Link>
        <Link
          href="/pricing"
          className="px-3 py-1.5 border border-amber-signal bg-amber-signal text-black hover:bg-amber-400 font-bold uppercase transition-all"
        >
          Buy Credits
        </Link>
      </div>
    </div>
  );
};
