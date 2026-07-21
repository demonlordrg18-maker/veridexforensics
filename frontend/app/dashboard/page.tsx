"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { CreditBalanceWidget } from "@/components/credits/CreditBalanceWidget";
import { Shield, Zap, FileText, Database, Lock, FolderPlus, ArrowUpRight, Search, Activity, User, Key, Building } from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();

  const mockRecentAudits = [
    { id: "aud_9281", title: "Brussels Transcript Lip-Sync Audit", type: "Audio", verityIndex: 0.88, status: "Admissible", date: "Today, 14:20" },
    { id: "aud_9280", title: "Apollo 11 Historical Claim Audit", type: "Text", verityIndex: 0.95, status: "Organic", date: "Yesterday, 18:05" },
    { id: "aud_9279", title: "Press Release GAN Image Scan", type: "Image", verityIndex: 0.32, status: "Synthetic Flagged", date: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />

      <div className="pt-32 pb-16 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto space-y-10">
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-deepslate">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-signal">
                // Command Node Active
              </span>
              <span className="px-2 py-0.5 border border-amber-signal/30 bg-amber-signal/10 text-amber-signal font-mono text-[9px] font-bold uppercase">
                {user?.role || "FREE"} TIER
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight font-geist mt-1">
              Welcome Back, <span className="text-amber-signal">{user?.name || "Analyst"}</span>
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Referral Code: <span className="text-slate-300 font-bold">{user?.referralCode}</span> • Session Domain: <span className="text-slate-300 font-bold">{user?.email}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/audit"
              className="btn-switch-primary text-xs"
            >
              <Zap size={14} />
              <span>New Forensic Audit</span>
            </Link>
          </div>
        </div>

        {/* Top Grid: Credits Widget & Quick Stats */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CreditBalanceWidget />
          </div>

          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            <div className="p-6 border border-deepslate bg-[#030712] rounded-none space-y-3">
              <div className="flex justify-between items-center text-slate-500 font-mono text-[10px] uppercase">
                <span>Vault Evidence Logs</span>
                <Database size={16} className="text-amber-signal" />
              </div>
              <div className="text-3xl font-bold text-white font-mono">14 Items</div>
              <p className="text-[10px] text-slate-500 font-mono">100% Cryptographic SHA-256 Verified</p>
            </div>

            <div className="p-6 border border-deepslate bg-[#030712] rounded-none space-y-3">
              <div className="flex justify-between items-center text-slate-500 font-mono text-[10px] uppercase">
                <span>Active Case Files</span>
                <FolderPlus size={16} className="text-amber-signal" />
              </div>
              <div className="text-3xl font-bold text-white font-mono">3 Open Cases</div>
              <p className="text-[10px] text-slate-500 font-mono">2 In Review • 1 Pending Export</p>
            </div>

            <div className="sm:col-span-2 p-6 border border-deepslate bg-[#030712] rounded-none flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white font-geist uppercase">Organization Workspace</h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {user?.organizationId ? "Connected to enterprise domain" : "Individual workspace • Upgrade to Enterprise for SSO & Team Vaults"}
                </p>
              </div>
              <Link
                href="/enterprise"
                className="px-4 py-2 border border-deepslate text-slate-300 hover:text-white font-mono text-xs font-bold uppercase rounded-none flex items-center gap-1 shrink-0"
              >
                <span>Manage</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Audits Feed */}
        <div className="border border-deepslate bg-[#030712] p-8 rounded-none space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-deepslate">
            <div>
              <h3 className="text-lg font-bold text-white uppercase font-geist tracking-tight">
                Recent <span className="text-amber-signal">Forensic Audits</span>
              </h3>
              <p className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-widest">// Immutable Audit Trail</p>
            </div>
            <Link
              href="/audit"
              className="text-xs font-mono text-amber-signal hover:underline uppercase font-bold"
            >
              View All Audits →
            </Link>
          </div>

          <div className="grid gap-3">
            {mockRecentAudits.map((a) => (
              <div
                key={a.id}
                className="p-4 border border-deepslate bg-obsidian hover:border-amber-signal/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-none"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 border border-deepslate bg-[#030712] text-[9px] font-mono font-bold uppercase text-amber-signal">
                      {a.type}
                    </span>
                    <h4 className="text-sm font-bold text-white font-geist">{a.title}</h4>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Audit ID: {a.id} • {a.date}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs font-bold font-mono text-white">
                      Verity Score: {Math.round(a.verityIndex * 100)}/100
                    </div>
                    <div className={`text-[9px] font-mono font-bold uppercase ${a.verityIndex > 0.7 ? "text-verity-green" : "text-red-400"}`}>
                      {a.status}
                    </div>
                  </div>
                  <Link
                    href={`/audit?sample=true`}
                    className="p-2 border border-deepslate text-slate-400 hover:text-white hover:border-amber-signal"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
