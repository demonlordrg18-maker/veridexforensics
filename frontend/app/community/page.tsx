"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  MessageSquare, 
  Layers, 
  Settings, 
  Sliders, 
  Check, 
  Share2, 
  ThumbsUp, 
  MessageCircle, 
  Bookmark, 
  User as UserIcon, 
  Plus, 
  Zap, 
  Globe, 
  Link2,
  FolderOpen,
  Eye,
  SlidersHorizontal,
  Bell
} from "lucide-react";

// Mock Knowledge base articles
const KNOWLEDGE_ARTICLES = [
  { id: "art_1", title: "Identifying GAN and Diffusion Artifacts in Deepfakes", category: "Methodology", views: 2450, author: "Dr. Elena Rostova", date: "2026-07-15" },
  { id: "art_2", title: "Linguistic Entropy and claim validation protocols", category: "Guides", views: 1890, author: "Marcus Vance", date: "2026-07-10" },
  { id: "art_3", title: "Configuring API pipelines for automated HR authenticity scans", category: "Tutorials", views: 1420, author: "Veridex SecOps Team", date: "2026-06-28" },
  { id: "art_4", title: "Cryptographic ledger verification models and verification keys", category: "Security", views: 980, author: "Satoshi Tanaka", date: "2026-06-14" }
];

// Mock Discussion threads
const INITIAL_THREADS = [
  { 
    id: "th_1", 
    title: "How to handle false-positives in high-compression JPEG audits?", 
    content: "We are auditing public war-zone photos that have been compressed multiple times. ELA values suggest edits, but it might be compression artifacts. Any best practices?", 
    author: "F_Investigator_33", 
    category: "Questions", 
    upvotes: 42, 
    comments: 15, 
    tags: ["image-forensics", "compression"],
    replies: [
      { author: "Dr. Elena Rostova", content: "Check the DCT coefficient mismatch in metadata. High compression will destroy GAN artifacts, but will leave uniform noise unless modified." }
    ]
  },
  { 
    id: "th_2", 
    title: "Methodology: Verity Index calculation weights on Academic claims", 
    content: "An proposal to adjust bias scores to 20% and factuality scores to 80% for Peer-reviewed scientific reports. Currently it uses default 50-50 splits.", 
    author: "Prof_Amara", 
    category: "Methodology", 
    upvotes: 89, 
    comments: 24, 
    tags: ["methodology", "academic"],
    replies: []
  }
];

// Mock Investigation templates
const SHared_TEMPLATES = [
  { id: "temp_1", name: "High-Confidence Image Audit Pipeline", downloads: 412, author: "Dr. Elena Rostova", type: "Image" },
  { id: "temp_2", name: "Journalistic Claim Verification Schema", downloads: 820, author: "Global Press Trust", type: "Text" },
  { id: "temp_3", name: "Metadata Deep Inspector config file", downloads: 231, author: "OSINT Academy", type: "Metadata" }
];

// Integrations Hub lists
const INTEGRATIONS = [
  { id: "slack", name: "Slack", description: "Push verification alerts directly to channels.", category: "Communication", active: true },
  { id: "msteams", name: "Microsoft Teams", description: "Collaborate on evidence items inside channels.", category: "Communication", active: false },
  { id: "gdrive", name: "Google Drive", description: "Import evidence directly from specific folder paths.", category: "Storage", active: true },
  { id: "github", name: "GitHub Enterprise", description: "Audit source files and track modifications.", category: "Developer", active: false },
  { id: "jira", name: "Jira Service Desk", description: "Create investigative cases directly from issues.", category: "Security", active: false },
  { id: "zapier", name: "Zapier Pipelines", description: "Connect to 5,000+ third-party tools.", category: "Automation", active: false }
];

export default function CommunityPage() {
  const { user } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<"hub" | "discussions" | "templates" | "integrations" | "notifications">("hub");
  
  // States for search and interaction
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [newThreadTitle, setNewThreadTitle] = useState<string>("");
  const [newThreadContent, setNewThreadContent] = useState<string>("");
  const [showAddThread, setShowAddThread] = useState<boolean>(false);
  const [integrationStates, setIntegrationStates] = useState(INTEGRATIONS);
  
  // Notification States
  const [notifyPreferences, setNotifyPreferences] = useState({
    mentions: true,
    weeklyReport: false,
    creditWarnings: true,
    announcements: true,
    securityAlerts: true
  });

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle || !newThreadContent) return;

    const newThread = {
      id: `th_${Date.now()}`,
      title: newThreadTitle,
      content: newThreadContent,
      author: user?.name || "Anonymous Investigator",
      category: "Questions",
      upvotes: 1,
      comments: 0,
      tags: ["general"],
      replies: []
    };

    setThreads([newThread, ...threads]);
    setNewThreadTitle("");
    setNewThreadContent("");
    setShowAddThread(false);
  };

  const handleUpvote = (id: string) => {
    setThreads(threads.map(t => t.id === id ? { ...t, upvotes: t.upvotes + 1 } : t));
  };

  const toggleIntegration = (id: string) => {
    setIntegrationStates(integrationStates.map(int => 
      int.id === id ? { ...int, active: !int.active } : int
    ));
  };

  // Filtered knowledge articles
  const filteredArticles = KNOWLEDGE_ARTICLES.filter(art => 
    art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    art.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            Back to Dashboard
          </Link>
        </div>

        {/* Header Title */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-deepslate">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-signal">
              // COLLABORATION PROTOCOLS & PLUGINS
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight font-geist mt-1">
              Community & <span className="text-amber-signal">Ecosystem</span>
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Connect external API platforms, import verification guidelines, and share investigative templates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 border border-slate-700 bg-slate-800 text-[10px] text-slate-300 font-mono uppercase">
              Trust Score: A+
            </span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap border-b border-deepslate/60 font-mono text-xs">
          <button
            onClick={() => setActiveSubTab("hub")}
            className={`py-3 px-6 uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeSubTab === "hub"
                ? "border-amber-signal text-amber-signal bg-amber-signal/5"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <BookOpen size={12} />
            Knowledge Hub
          </button>
          <button
            onClick={() => setActiveSubTab("discussions")}
            className={`py-3 px-6 uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeSubTab === "discussions"
                ? "border-amber-signal text-amber-signal bg-amber-signal/5"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <MessageSquare size={12} />
            Discussions
          </button>
          <button
            onClick={() => setActiveSubTab("templates")}
            className={`py-3 px-6 uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeSubTab === "templates"
                ? "border-amber-signal text-amber-signal bg-amber-signal/5"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <Layers size={12} />
            Shared Templates
          </button>
          <button
            onClick={() => setActiveSubTab("integrations")}
            className={`py-3 px-6 uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeSubTab === "integrations"
                ? "border-amber-signal text-amber-signal bg-amber-signal/5"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <Link2 size={12} />
            Integrations & APIs
          </button>
          <button
            onClick={() => setActiveSubTab("notifications")}
            className={`py-3 px-6 uppercase tracking-wider font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeSubTab === "notifications"
                ? "border-amber-signal text-amber-signal bg-amber-signal/5"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            <Bell size={12} />
            Preferences
          </button>
        </div>

        {/* Tab Content 1: Knowledge Hub */}
        {activeSubTab === "hub" && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:max-w-md">
                <Search size={14} className="absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search articles, guides, security bulletins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#030712] border border-deepslate pl-10 pr-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-signal"
                />
              </div>
              <span className="text-[10px] font-mono text-slate-500">{filteredArticles.length} matching bulletins found</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredArticles.map((art) => (
                <div key={art.id} className="p-6 border border-deepslate bg-[#030712] flex flex-col justify-between rounded-none hover:border-amber-signal/30 transition-all">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[9px] font-mono">
                      <span className="px-2 py-0.5 border border-slate-700 text-slate-400 uppercase font-bold">{art.category}</span>
                      <span className="text-slate-500">{art.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white font-geist leading-snug">{art.title}</h3>
                    <p className="text-[10px] font-mono text-slate-500">By {art.author}</p>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] mt-6 border-t border-deepslate/30 pt-3">
                    <span className="text-slate-500">{art.views} total views</span>
                    <button 
                      onClick={() => alert(`Opening Methodology article: ${art.title}`)}
                      className="text-amber-signal hover:text-white uppercase font-bold"
                    >
                      Read Article {"[->]"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 2: Discussions */}
        {activeSubTab === "discussions" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-geist">Discussion Forums</h3>
                <p className="text-[9px] text-slate-500 font-mono">// Exchange forensic telemetry tips with trust teams</p>
              </div>
              <button
                onClick={() => setShowAddThread(!showAddThread)}
                className="px-4 py-2 bg-amber-signal hover:bg-amber-signal/80 text-black text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5"
              >
                <Plus size={12} />
                New Thread
              </button>
            </div>

            {showAddThread && (
              <form onSubmit={handleCreateThread} className="p-6 border border-amber-signal/30 bg-[#030712] space-y-4 font-mono text-xs">
                <div className="text-xs text-white uppercase font-bold">// Create New Discussion Thread</div>
                <input
                  type="text"
                  placeholder="Thread Title"
                  value={newThreadTitle}
                  onChange={(e) => setNewThreadTitle(e.target.value)}
                  className="w-full bg-obsidian border border-deepslate p-3 text-white focus:outline-none focus:border-amber-signal"
                />
                <textarea
                  placeholder="Elaborate details (markdown supported)..."
                  rows={4}
                  value={newThreadContent}
                  onChange={(e) => setNewThreadContent(e.target.value)}
                  className="w-full bg-obsidian border border-deepslate p-3 text-white focus:outline-none focus:border-amber-signal font-sans text-xs leading-relaxed"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddThread(false)}
                    className="px-4 py-2 border border-slate-700 bg-obsidian text-slate-400 uppercase font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-amber-signal text-black uppercase font-bold"
                  >
                    Publish Thread
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {threads.map((t) => (
                <div key={t.id} className="p-6 border border-deepslate bg-[#030712] space-y-4 rounded-none">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-slate-500">Posted by @{t.author} in {t.category}</span>
                      <h4 className="text-sm font-bold text-white font-geist hover:text-amber-signal cursor-pointer">{t.title}</h4>
                      <p className="text-xs text-slate-400 font-sans mt-2 leading-relaxed">{t.content}</p>
                    </div>
                    <button
                      onClick={() => handleUpvote(t.id)}
                      className="flex flex-col items-center p-2 border border-deepslate bg-obsidian hover:border-slate-600 text-slate-400 hover:text-white shrink-0 font-mono text-[10px]"
                    >
                      <ThumbsUp size={12} className="text-amber-signal mb-1" />
                      <span>{t.upvotes}</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {t.tags.map((tag) => (
                      <span key={tag} className="text-[8px] font-mono text-amber-signal/70 bg-amber-signal/5 px-2 py-0.5 border border-amber-signal/10 uppercase">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {t.replies.length > 0 && (
                    <div className="p-4 border-l-2 border-amber-signal/40 bg-obsidian/45 text-xs font-mono space-y-1">
                      <div className="text-[9px] text-slate-500 font-bold">Reply from @{t.replies[0].author}:</div>
                      <p className="text-slate-300 font-sans leading-relaxed">{t.replies[0].content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 3: Shared Templates */}
        {activeSubTab === "templates" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white uppercase font-geist">Shared Verification Pipelines</h3>
                <p className="text-[9px] text-slate-500 font-mono">// Reuse case settings, filters, and custom rate definitions</p>
              </div>
              <button
                onClick={() => alert("Creating a new investigation workflow template config...")}
                className="px-4 py-2 border border-slate-700 bg-obsidian hover:border-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5"
              >
                <Plus size={12} />
                Create Template
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {SHared_TEMPLATES.map((temp) => (
                <div key={temp.id} className="p-6 border border-deepslate bg-[#030712] flex flex-col justify-between rounded-none hover:border-amber-signal/30 transition-all font-mono text-xs">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="text-slate-500">Author: @{temp.author}</span>
                      <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 text-slate-400">{temp.type}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white font-geist leading-tight">{temp.name}</h4>
                  </div>

                  <div className="flex items-center justify-between border-t border-deepslate/30 pt-4 mt-6 text-[10px]">
                    <span className="text-slate-500">{temp.downloads} downloads</span>
                    <button
                      onClick={() => alert(`Importing pipeline config: ${temp.name}`)}
                      className="text-amber-signal hover:text-white uppercase font-bold flex items-center gap-1"
                    >
                      Import Config
                      <Zap size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Marketplace Architecture Section */}
            <div className="border border-amber-signal/30 bg-[#070b19]/25 p-8 rounded-none space-y-4">
              <div>
                <span className="text-[8px] font-mono text-amber-signal font-bold uppercase tracking-wider">// FUTURE-PROOF MARKETPLACE PIPELINE</span>
                <h3 className="text-base font-bold text-white uppercase font-geist tracking-tight mt-1">Ecosystem Plugin Marketplace</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl font-sans mt-1">
                  Deploy custom AI detection plugins, third-party verify scripts, and premium theme layouts to your organization dashboard instantly. (Architecture model prepared).
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-[10px] font-mono text-slate-400">
                <div className="p-3 border border-deepslate bg-black/40">
                  <div className="text-white font-bold">Spectral Noise Check</div>
                  <div className="text-[8px] text-amber-signal font-bold mt-1">PLUGIN (COMMERCIAL)</div>
                </div>
                <div className="p-3 border border-deepslate bg-black/40">
                  <div className="text-white font-bold">OSINT Twitter Crawler</div>
                  <div className="text-[8px] text-emerald-400 font-bold mt-1">FREE TEMPLATE</div>
                </div>
                <div className="p-3 border border-deepslate bg-black/40">
                  <div className="text-white font-bold">Atlassian Jira Hub</div>
                  <div className="text-[8px] text-slate-500 font-bold mt-1">INTEGRATION</div>
                </div>
                <div className="p-3 border border-deepslate bg-black/40">
                  <div className="text-white font-bold">Deepfake Lip Mismatch</div>
                  <div className="text-[8px] text-amber-signal font-bold mt-1">PLUGIN (PREMIUM)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 4: Integrations */}
        {activeSubTab === "integrations" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-geist">Connected APIs & Integrations</h3>
              <p className="text-[9px] text-slate-500 font-mono">// Toggle webhooks and third-party credential vaults</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {integrationStates.map((int) => (
                <div key={int.id} className="p-5 border border-deepslate bg-[#030712] flex flex-col justify-between gap-4 font-mono text-xs">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-white font-geist">{int.name}</h4>
                      <span className="text-[9px] text-slate-500 uppercase">{int.category}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-sans leading-relaxed min-h-[35px]">{int.description}</p>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-deepslate/30">
                    <button
                      onClick={() => alert(`Configuring OAuth metadata for ${int.name}`)}
                      className="text-[9px] text-slate-400 hover:text-white uppercase font-bold"
                    >
                      [Configure Settings]
                    </button>
                    <button
                      onClick={() => toggleIntegration(int.id)}
                      className={`px-3 py-1 text-[9px] font-bold uppercase border transition-all ${
                        int.active
                          ? "border-emerald-500 bg-emerald-950/30 text-emerald-400"
                          : "border-slate-800 bg-slate-900 text-slate-500"
                      }`}
                    >
                      {int.active ? "Active" : "Disabled"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 5: Notification Preferences */}
        {activeSubTab === "notifications" && (
          <div className="border border-deepslate bg-[#030712] p-8 space-y-6 max-w-2xl font-mono text-xs">
            <div>
              <h3 className="text-sm font-bold text-white uppercase font-geist">Notification Configuration</h3>
              <p className="text-[9px] text-slate-500">// Configure personal alert timelines and report updates</p>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 border border-deepslate bg-obsidian">
                <div>
                  <div className="text-white font-bold">Mention Notifications</div>
                  <p className="text-[9px] text-slate-500 font-sans mt-0.5">Alert me when a user mentions my profile in discussions</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifyPreferences.mentions}
                  onChange={() => setNotifyPreferences({ ...notifyPreferences, mentions: !notifyPreferences.mentions })}
                  className="w-4 h-4 accent-amber-signal cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 border border-deepslate bg-obsidian">
                <div>
                  <div className="text-white font-bold">Weekly Activity Digest</div>
                  <p className="text-[9px] text-slate-500 font-sans mt-0.5">Email summary of credits remaining and storage metrics</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifyPreferences.weeklyReport}
                  onChange={() => setNotifyPreferences({ ...notifyPreferences, weeklyReport: !notifyPreferences.weeklyReport })}
                  className="w-4 h-4 accent-amber-signal cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 border border-deepslate bg-obsidian">
                <div>
                  <div className="text-white font-bold">Credit Limit Warnings</div>
                  <p className="text-[9px] text-slate-500 font-sans mt-0.5">Notify when balance drops below 20 credits</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifyPreferences.creditWarnings}
                  onChange={() => setNotifyPreferences({ ...notifyPreferences, creditWarnings: !notifyPreferences.creditWarnings })}
                  className="w-4 h-4 accent-amber-signal cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 border border-deepslate bg-obsidian">
                <div>
                  <div className="text-white font-bold">Ecosystem Announcements</div>
                  <p className="text-[9px] text-slate-500 font-sans mt-0.5">Bulletins on newly published templates or tools</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={notifyPreferences.announcements}
                  onChange={() => setNotifyPreferences({ ...notifyPreferences, announcements: !notifyPreferences.announcements })}
                  className="w-4 h-4 accent-amber-signal cursor-pointer"
                />
              </label>
            </div>

            <button
              onClick={() => alert("Notification settings synchronized successfully.")}
              className="py-2.5 px-6 bg-amber-signal hover:bg-amber-signal/80 text-black text-xs font-bold uppercase transition-all"
            >
              Save Preferences
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
