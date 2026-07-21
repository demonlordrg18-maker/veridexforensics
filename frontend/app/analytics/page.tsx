"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { 
  TrendingUp, 
  ArrowLeft, 
  TrendingDown, 
  Download, 
  RefreshCw, 
  Activity, 
  Database, 
  Briefcase, 
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
  PieChart as PieIcon,
  Filter,
  ArrowUpRight
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend
} from "recharts";

// Mock data for graphs
const CREDIT_USAGE_DATA = [
  { name: "Jul 15", personal: 12, org: 120 },
  { name: "Jul 16", personal: 25, org: 145 },
  { name: "Jul 17", personal: 8, org: 98 },
  { name: "Jul 18", personal: 45, org: 320 },
  { name: "Jul 19", personal: 19, org: 190 },
  { name: "Jul 20", personal: 30, org: 240 },
  { name: "Jul 21", personal: 15, org: 175 }
];

const MODALITY_DATA = [
  { name: "Text Audits", value: 340, color: "#f59e0b" },
  { name: "Images", value: 180, color: "#d97706" },
  { name: "Audio", value: 95, color: "#b45309" },
  { name: "Video", value: 64, color: "#78350f" },
  { name: "PDF / Docs", value: 210, color: "#fbbf24" }
];

const INSIGHTS = [
  { 
    id: 1, 
    type: "warning", 
    message: "Encrypted Storage Vault is nearing capacity limit (89% used). Move active assets to archive.", 
    action: "Archive Vault" 
  },
  { 
    id: 2, 
    type: "info", 
    message: "Linguistic and Claim auditing activity spikes primarily between 14:00 and 16:00 on Tuesdays.", 
    action: "View Heatmap" 
  },
  { 
    id: 3, 
    type: "critical", 
    message: "Detected 4 API authorization failures from unfamiliar IP range (94.12.87.XX). Immediate security audit advised.", 
    action: "View Logs" 
  },
  { 
    id: 4, 
    type: "success", 
    message: "Verity Index overall health rating of organization cases increased to 86.4% this month.", 
    action: "View Index" 
  }
];

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"personal" | "organization">("personal");
  const [timeRange, setTimeRange] = useState<string>("7d");
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const handleExport = (format: string) => {
    alert(`Exporting telemetry metadata as ${format.toUpperCase()}... (Preparing bundle)`);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-obsidian text-slate-300 font-mono text-xs flex items-center justify-center">
        Syncing telemetry charts...
      </div>
    );
  }

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

        {/* Header Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-deepslate">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-signal">
              // TELEMETRY ENGINE & AUDIT LOGS
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight font-geist mt-1">
              Analytics <span className="text-amber-signal">Dashboard</span>
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Interactive case logs, credit utilization timelines, and system health metrics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className={`p-2 border border-deepslate bg-[#030712] hover:border-slate-600 text-slate-400 hover:text-white transition-all ${
                loading ? "animate-spin" : ""
              }`}
            >
              <RefreshCw size={14} />
            </button>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-signal"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last quarter</option>
            </select>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-deepslate/60 font-mono text-xs">
          <button
            onClick={() => setActiveTab("personal")}
            className={`py-3 px-6 uppercase tracking-wider font-bold border-b-2 transition-all ${
              activeTab === "personal"
                ? "border-amber-signal text-amber-signal bg-amber-signal/5"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            Personal Analytics
          </button>
          <button
            onClick={() => setActiveTab("organization")}
            className={`py-3 px-6 uppercase tracking-wider font-bold border-b-2 transition-all ${
              activeTab === "organization"
                ? "border-amber-signal text-amber-signal bg-amber-signal/5"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            Organization telemetry
          </button>
        </div>

        {/* Matrix Metrics Cards */}
        <div className="grid md:grid-cols-4 gap-6 font-mono">
          <div className="p-6 border border-deepslate bg-[#030712] space-y-2">
            <div className="flex justify-between items-center text-slate-500 text-[10px] uppercase font-bold">
              <span>Credits Consumed</span>
              <Activity size={12} className="text-amber-signal" />
            </div>
            <div className="text-2xl font-black text-white">
              {activeTab === "personal" ? "134" : "1,458"}
            </div>
            <div className="text-[9px] text-emerald-400 flex items-center gap-1">
              <TrendingUp size={10} />
              <span>+12.4% vs last week</span>
            </div>
          </div>

          <div className="p-6 border border-deepslate bg-[#030712] space-y-2">
            <div className="flex justify-between items-center text-slate-500 text-[10px] uppercase font-bold">
              <span>Storage Growth</span>
              <Database size={12} className="text-amber-signal" />
            </div>
            <div className="text-2xl font-black text-white">
              {activeTab === "personal" ? "34.2 MB" : "1.2 GB"}
            </div>
            <div className="text-[9px] text-slate-500">
              <span>Limit: {activeTab === "personal" ? "50 MB" : "100 GB"}</span>
            </div>
          </div>

          <div className="p-6 border border-deepslate bg-[#030712] space-y-2">
            <div className="flex justify-between items-center text-slate-500 text-[10px] uppercase font-bold">
              <span>Cases Managed</span>
              <Briefcase size={12} className="text-amber-signal" />
            </div>
            <div className="text-2xl font-black text-white">
              {activeTab === "personal" ? "8" : "48"}
            </div>
            <div className="text-[9px] text-emerald-400 flex items-center gap-1">
              <TrendingUp size={10} />
              <span>+3 new open cases</span>
            </div>
          </div>

          <div className="p-6 border border-deepslate bg-[#030712] space-y-2">
            <div className="flex justify-between items-center text-slate-500 text-[10px] uppercase font-bold">
              <span>Certified Reports</span>
              <FileText size={12} className="text-amber-signal" />
            </div>
            <div className="text-2xl font-black text-white">
              {activeTab === "personal" ? "12" : "189"}
            </div>
            <div className="text-[9px] text-amber-signal">
              <span>Avg Verity: 82.4%</span>
            </div>
          </div>
        </div>

        {/* Charts & Graphs Panel */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Time-series line chart */}
          <div className="lg:col-span-2 border border-deepslate bg-[#030712] p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-deepslate pb-4">
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-geist tracking-tight">Credit Utilization Timeline</h3>
                <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">// Burn rate per computational interval</p>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-mono">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-2.5 h-2.5 bg-amber-500 inline-block" />
                  {activeTab === "personal" ? "Personal Usage" : "Org Total"}
                </span>
              </div>
            </div>

            <div className="h-72 w-full text-xs font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CREDIT_USAGE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" tickLine={false} />
                  <YAxis stroke="#64748b" tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", color: "#f8fafc" }}
                    labelStyle={{ color: "#f59e0b", fontWeight: "bold" }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={activeTab === "personal" ? "personal" : "org"} 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorUsage)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart Modality Distribution */}
          <div className="border border-deepslate bg-[#030712] p-8 space-y-6">
            <div className="border-b border-deepslate pb-4">
              <h3 className="text-sm font-bold text-white uppercase font-geist tracking-tight">Modality Breakdown</h3>
              <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">// Audits classified by source layout</p>
            </div>

            <div className="h-60 w-full text-xs font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MODALITY_DATA} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#64748b" tickLine={false} width={80} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", color: "#f8fafc" }}
                  />
                  <Bar dataKey="value" fill="#f59e0b">
                    {MODALITY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-400 pt-2 border-t border-deepslate/30">
              <div>Total Audits: <strong className="text-white">889</strong></div>
              <div>Success Rate: <strong className="text-emerald-400">99.2%</strong></div>
            </div>
          </div>
        </div>

        {/* Custom Telemetry Exporter */}
        <div className="border border-deepslate bg-[#030712] p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-deepslate pb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-geist tracking-tight">Telemetry Report Builder</h3>
              <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">// Export data logs to local directories</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleExport("csv")}
                className="px-4 py-2 border border-slate-700 hover:border-white bg-obsidian text-xs font-mono font-bold uppercase text-slate-200 transition-all flex items-center gap-1.5"
              >
                <Download size={12} />
                CSV
              </button>
              <button 
                onClick={() => handleExport("xlsx")}
                className="px-4 py-2 border border-slate-700 hover:border-white bg-obsidian text-xs font-mono font-bold uppercase text-slate-200 transition-all flex items-center gap-1.5"
              >
                <Download size={12} />
                XLSX
              </button>
              <button 
                onClick={() => handleExport("json")}
                className="px-4 py-2 border border-slate-700 hover:border-white bg-obsidian text-xs font-mono font-bold uppercase text-slate-200 transition-all flex items-center gap-1.5"
              >
                <Download size={12} />
                JSON
              </button>
              <button 
                onClick={() => handleExport("pdf")}
                className="px-4 py-2 border border-amber-signal/40 bg-amber-signal/10 hover:bg-amber-signal/20 text-xs font-mono font-bold uppercase text-amber-signal transition-all flex items-center gap-1.5"
              >
                <Download size={12} />
                PDF Report
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 font-mono text-xs text-slate-400">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase">// Select Component Filters</label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-amber-signal" />
                  <span>Credit burn rates</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-amber-signal" />
                  <span>Modality logs</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="accent-amber-signal" />
                  <span>API latency profiles</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase">// Storage Node isolation</label>
              <select className="w-full bg-obsidian border border-deepslate p-2 text-white text-xs">
                <option>Active Vault Workspace</option>
                <option>Archive Nodes</option>
                <option>All Systems Unified</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase">// Security classification</label>
              <select className="w-full bg-obsidian border border-deepslate p-2 text-white text-xs">
                <option>Unclassified telemetry</option>
                <option>Under Seal / Confidential logs</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Actionable Insights */}
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white uppercase font-geist tracking-tight">AI Telemetry Insights</h3>
            <p className="text-[9px] text-slate-500 font-mono font-bold uppercase">// Actionable intelligence generated from system usage</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {INSIGHTS.map((ins) => (
              <div 
                key={ins.id}
                className="p-5 border border-deepslate bg-[#030712] flex flex-col justify-between gap-4 rounded-none"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle size={16} className="text-amber-signal shrink-0 mt-0.5" />
                  <p className="text-xs leading-relaxed text-slate-300 font-mono">{ins.message}</p>
                </div>
                <div className="flex justify-between items-center font-mono text-[10px]">
                  <span className="text-slate-500 uppercase">Telemetry Engine V2</span>
                  <button 
                    onClick={() => alert(`Redirecting to corresponding action pipeline: ${ins.action}`)}
                    className="text-amber-signal hover:text-white uppercase font-bold flex items-center gap-1"
                  >
                    {ins.action}
                    <ArrowUpRight size={10} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
