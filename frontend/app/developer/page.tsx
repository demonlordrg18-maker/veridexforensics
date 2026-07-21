"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { WorkspaceShell } from "@/components/workspace/WorkspaceShell";
import {
  Code,
  Key,
  Database,
  Radio,
  FileText,
  Plus,
  RefreshCw,
  Trash,
  Play,
  CheckCircle,
  Copy,
  Terminal,
  Activity,
  AlertCircle,
  Shield,
  Layers,
  Search,
  BookOpen
} from "lucide-react";

export default function DeveloperPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("api-keys");
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [webhooks, setWebhooks] = useState<any[]>([]);
  const [webhookLogs, setWebhookLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Key state
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyScopes, setNewKeyScopes] = useState<string[]>(["evidence:read"]);
  const [recentlyCreatedKey, setRecentlyCreatedKey] = useState<string | null>(null);

  // Playground state
  const [playgroundModality, setPlaygroundModality] = useState("text");
  const [playgroundPayload, setPlaygroundPayload] = useState("Select this text to perform synthetic forensic fingerprinting. The verity engine will scan this corpus for generative signatures.");
  const [playgroundResponse, setPlaygroundResponse] = useState<any>(null);
  const [playgroundLoading, setPlaygroundLoading] = useState(false);

  // New Webhook state
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookDesc, setWebhookDesc] = useState("");
  const [webhookEvents, setWebhookEvents] = useState<string[]>(["analysis.completed"]);

  // System alerts state
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadDeveloperData();
    }
  }, [user, user?.activeWorkspaceId]);

  const loadDeveloperData = async () => {
    setLoading(true);
    try {
      // Load keys
      const keyRes = await fetch("/api/developer/keys");
      if (keyRes.ok) {
        const keyData = await keyRes.json();
        setApiKeys(keyData.apiKeys || []);
      }

      // Load webhooks and logs
      const whRes = await fetch("/api/developer/webhooks");
      if (whRes.ok) {
        const whData = await whRes.json();
        setWebhooks(whData.webhooks || []);
        setWebhookLogs(whData.webhookLogs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName) return;

    try {
      const res = await fetch("/api/developer/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          name: newKeyName,
          scopes: newKeyScopes
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setRecentlyCreatedKey(data.key.rawKey);
        setNewKeyName("");
        showStatus("API Key generated successfully");
        loadDeveloperData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    if (!confirm("Are you sure you want to revoke this API key? This action is permanent and will break active integrations.")) return;
    try {
      const res = await fetch("/api/developer/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "revoke", keyId }),
      });
      if (res.ok) {
        showStatus("API Key revoked");
        loadDeveloperData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegisterWebhook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!webhookUrl) return;

    try {
      const res = await fetch("/api/developer/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          url: webhookUrl,
          description: webhookDesc,
          events: webhookEvents
        }),
      });
      if (res.ok) {
        showStatus("Webhook registered");
        setWebhookUrl("");
        setWebhookDesc("");
        loadDeveloperData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleWebhookAction = async (action: string, webhookId: string) => {
    try {
      const res = await fetch("/api/developer/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, webhookId }),
      });
      if (res.ok) {
        showStatus(action === "delete" ? "Webhook deleted" : "Webhook status toggled");
        loadDeveloperData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplayWebhook = async (logId: string) => {
    try {
      const res = await fetch("/api/developer/webhooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "replay", logId }),
      });
      if (res.ok) {
        showStatus("Webhook delivery replayed");
        loadDeveloperData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunPlayground = async () => {
    setPlaygroundLoading(true);
    try {
      const res = await fetch("/api/developer/playground", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          modality: playgroundModality,
          content: playgroundPayload
        }),
      });
      const data = await res.json();
      setPlaygroundResponse(data);
      if (res.ok) {
        showStatus(`API Call success. Deducted ${data.creditsDeducted} CR.`);
      } else {
        showStatus(`API Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPlaygroundLoading(false);
    }
  };

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const toggleScope = (scope: string) => {
    setNewKeyScopes(prev => 
      prev.includes(scope) ? prev.filter(s => s !== scope) : [...prev, scope]
    );
  };

  return (
    <WorkspaceShell>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Banner Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-deepslate gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-widest text-amber-signal font-bold uppercase bg-amber-signal/10 px-2 py-0.5">
                Developer Infrastructure
              </span>
              <span className="h-2 w-2 rounded-full bg-verity-green animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="text-[8px] font-mono text-slate-500">API VERSION v1.2</span>
            </div>
            <h1 className="text-2xl font-mono uppercase tracking-wider text-slate-100 mt-1 flex items-center gap-2">
              <Code size={20} className="text-amber-signal" />
              Developer Portal
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Programmable forensics, credentials, webhook subscriptions, and interactive playgrounds.
            </p>
          </div>
        </div>

        {statusMessage && (
          <div className="mb-6 p-3 border border-amber-signal/20 bg-amber-signal/5 text-amber-signal font-mono text-[10px] uppercase flex items-center gap-2 animate-pulse">
            <CheckCircle size={12} />
            {statusMessage}
          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex flex-wrap border-b border-deepslate mb-8 text-[10px] font-mono uppercase tracking-wider gap-1">
          <button
            onClick={() => setActiveTab("api-keys")}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === "api-keys" ? "border-amber-signal text-amber-signal bg-amber-signal/5" : "border-transparent text-slate-400 hover:text-white"}`}
          >
            <Key size={12} /> API Credentials
          </button>
          <button
            onClick={() => setActiveTab("playground")}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === "playground" ? "border-amber-signal text-amber-signal bg-amber-signal/5" : "border-transparent text-slate-400 hover:text-white"}`}
          >
            <Terminal size={12} /> Interactive Playground
          </button>
          <button
            onClick={() => setActiveTab("webhooks")}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === "webhooks" ? "border-amber-signal text-amber-signal bg-amber-signal/5" : "border-transparent text-slate-400 hover:text-white"}`}
          >
            <Radio size={12} /> Webhook Subscriptions
          </button>
          <button
            onClick={() => setActiveTab("observability")}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === "observability" ? "border-amber-signal text-amber-signal bg-amber-signal/5" : "border-transparent text-slate-400 hover:text-white"}`}
          >
            <Activity size={12} /> API Observability
          </button>
          <button
            onClick={() => setActiveTab("docs")}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === "docs" ? "border-amber-signal text-amber-signal bg-amber-signal/5" : "border-transparent text-slate-400 hover:text-white"}`}
          >
            <BookOpen size={12} /> Documentation
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center font-mono text-xs text-slate-500 animate-pulse">
            [ SECURING CRYPTOGRAPHIC CREDENTIALS... ]
          </div>
        ) : (
          <div>
            {/* API KEYS TAB */}
            {activeTab === "api-keys" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {recentlyCreatedKey && (
                    <div className="border border-amber-signal/30 bg-amber-signal/5 p-4 space-y-3">
                      <div className="font-mono text-[10px] text-amber-signal uppercase font-bold flex items-center gap-1.5">
                        <AlertCircle size={12} /> Make sure to copy your API key now
                      </div>
                      <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                        For security reasons, this key will not be shown again. Save this somewhere secure.
                      </p>
                      <div className="flex bg-[#030712] border border-deepslate p-3 font-mono text-xs text-slate-200 justify-between items-center select-all">
                        <span className="truncate">{recentlyCreatedKey}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(recentlyCreatedKey);
                            showStatus("API Key copied to clipboard");
                          }}
                          className="text-amber-signal hover:text-white transition-colors"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="border border-deepslate bg-slate-900/40 p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2">
                      Active Credentials
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-[11px] text-slate-400">
                        <thead>
                          <tr className="border-b border-deepslate text-slate-500 uppercase text-[9px]">
                            <th className="pb-3">Key Label</th>
                            <th className="pb-3">Prefix / Ident</th>
                            <th className="pb-3">Scopes</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {apiKeys.map((key) => (
                            <tr key={key.id} className="border-b border-deepslate/30 hover:bg-[#030712]/30 py-3">
                              <td className="py-3 text-slate-200 font-bold">{key.name}</td>
                              <td className="py-3 font-mono text-slate-500">{key.keyPrefix}...</td>
                              <td className="py-3">
                                <div className="flex flex-wrap gap-1">
                                  {key.scopes?.map((s: string) => (
                                    <span key={s} className="px-1 py-0.2 bg-deepslate text-slate-300 text-[8px] border border-slate-700">{s}</span>
                                  ))}
                                </div>
                              </td>
                              <td className="py-3">
                                <span className={`px-1.5 py-0.5 text-[8px] font-bold ${
                                  key.status === "ACTIVE" 
                                    ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20" 
                                    : "bg-red-500/10 text-red-500 border border-red-500/20"
                                }`}>
                                  {key.status}
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                {key.status === "ACTIVE" && (
                                  <button
                                    onClick={() => handleRevokeKey(key.id)}
                                    className="text-[9px] text-red-500 border border-red-500/25 px-2.5 py-1.5 hover:bg-red-500/5 transition-all"
                                  >
                                    Revoke
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border border-deepslate bg-[#030712] p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2 flex items-center gap-1.5">
                      <Plus size={14} className="text-amber-signal" /> Generate New Key
                    </h3>
                    <form onSubmit={handleGenerateKey} className="space-y-4">
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Key Description Label</label>
                        <input
                          type="text"
                          value={newKeyName}
                          onChange={(e) => setNewKeyName(e.target.value)}
                          placeholder="e.g. SIEM Pipeline Sync"
                          className="w-full bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-slate-100 rounded-none focus:outline-none focus:border-amber-signal"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-slate-500 uppercase">Select API Scopes</label>
                        <div className="space-y-1.5 font-mono text-[10px] text-slate-400">
                          {["evidence:read", "evidence:write", "reports:read", "cases:read", "cases:write"].map(scope => (
                            <label key={scope} className="flex items-center gap-2 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={newKeyScopes.includes(scope)}
                                onChange={() => toggleScope(scope)}
                                className="accent-amber-signal"
                              />
                              <span>{scope}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-amber-signal text-black hover:bg-amber-500 py-2.5 font-mono text-[10px] font-bold uppercase transition-all"
                      >
                        Generate API Credentials
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* PLAYGROUND TAB */}
            {activeTab === "playground" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration Panel */}
                <div className="border border-deepslate bg-[#030712] p-6 space-y-6">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 border-b border-deepslate pb-2 flex items-center gap-1.5">
                    <Terminal size={14} className="text-amber-signal" /> Request Payload Simulator
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Modality Engine</label>
                      <select
                        value={playgroundModality}
                        onChange={(e) => {
                          setPlaygroundModality(e.target.value);
                          if (e.target.value === "text") {
                            setPlaygroundPayload("Select this text to perform synthetic forensic fingerprinting. The verity engine will scan this corpus for generative signatures.");
                          } else if (e.target.value === "image") {
                            setPlaygroundPayload("http://storage.veridex.ai/raw_uploads/face_gan_leak_03.jpg");
                          } else if (e.target.value === "pdf") {
                            setPlaygroundPayload("http://storage.veridex.ai/compliance/document_draft_v2.pdf");
                          } else {
                            setPlaygroundPayload("http://storage.veridex.ai/media/forensic_audio_anomaly.wav");
                          }
                        }}
                        className="w-full bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-slate-100 rounded-none focus:outline-none focus:border-amber-signal"
                      >
                        <option value="text">Text Authenticity Audit (5 CR)</option>
                        <option value="image">Image Forensics Scan (10 CR)</option>
                        <option value="pdf">PDF Compliance Scrutiny (8 CR)</option>
                        <option value="audio">Audio Deepfake Isolation (15 CR)</option>
                        <option value="video">Video Face Swap Scan (25 CR)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Payload Content (Text / Source URL)</label>
                      <textarea
                        value={playgroundPayload}
                        onChange={(e) => setPlaygroundPayload(e.target.value)}
                        rows={6}
                        className="w-full bg-[#030712] border border-deepslate p-3 text-xs font-mono text-slate-200 rounded-none focus:outline-none focus:border-amber-signal resize-none"
                      />
                    </div>

                    <button
                      onClick={handleRunPlayground}
                      disabled={playgroundLoading}
                      className="w-full bg-amber-signal text-black hover:bg-amber-500 py-3 font-mono text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      <Play size={12} fill="black" /> {playgroundLoading ? "Auditing Content..." : "Execute Forensic Call"}
                    </button>
                  </div>
                </div>

                {/* Response Display */}
                <div className="border border-deepslate bg-[#030712] p-6 flex flex-col">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 border-b border-deepslate pb-2 flex items-center gap-1.5 mb-4">
                    <Database size={14} className="text-amber-signal" /> API JSON Output Response
                  </h3>
                  
                  <div className="flex-1 bg-[#010409] border border-deepslate/80 p-4 font-mono text-[10px] text-emerald-400 overflow-auto whitespace-pre-wrap select-all max-h-[350px]">
                    {playgroundResponse ? (
                      JSON.stringify(playgroundResponse, null, 2)
                    ) : (
                      <span className="text-slate-600">// Press Execute Forensic Call to simulate a live API payload response.</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* WEBHOOKS TAB */}
            {activeTab === "webhooks" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Active webhooks */}
                  <div className="border border-deepslate bg-slate-900/40 p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2">
                      Webhook Endpoints
                    </h3>
                    <div className="space-y-4">
                      {webhooks.length === 0 ? (
                        <p className="font-mono text-[10px] text-slate-500">// No active webhook listeners registered.</p>
                      ) : (
                        webhooks.map((wh) => (
                          <div key={wh.id} className="border border-deepslate bg-[#030712] p-4 font-mono text-[10px] space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="font-bold text-slate-200 text-xs truncate max-w-sm block">{wh.url}</span>
                                <span className="text-slate-500 block text-[9px] mt-0.5">{wh.description}</span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleWebhookAction("toggle", wh.id)}
                                  className={`px-2 py-1 border border-deepslate text-[9px] uppercase ${wh.status === "ACTIVE" ? "text-emerald-400" : "text-slate-500"}`}
                                >
                                  {wh.status}
                                </button>
                                <button
                                  onClick={() => handleWebhookAction("delete", wh.id)}
                                  className="text-red-500 border border-red-500/20 px-2 py-1"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                            <div className="flex justify-between border-t border-deepslate/40 pt-2 text-[9px] text-slate-500">
                              <span>SECRET: {wh.secret}</span>
                              <span>EVENTS: {wh.events?.join(", ")}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Webhook log history */}
                  <div className="border border-deepslate bg-slate-900/40 p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2">
                      Webhook Delivery Log History
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-[10px] text-slate-400">
                        <thead>
                          <tr className="border-b border-deepslate text-slate-500 uppercase">
                            <th className="pb-3">Timestamp</th>
                            <th className="pb-3">Event</th>
                            <th className="pb-3">Payload Preview</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {webhookLogs.map((log) => (
                            <tr key={log.id} className="border-b border-deepslate/30 hover:bg-[#030712]/30 py-3">
                              <td className="py-3 text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                              <td className="py-3 text-amber-signal">{log.event}</td>
                              <td className="py-3 text-slate-300 truncate max-w-xs">{log.payload}</td>
                              <td className="py-3">
                                <span className={`px-1 py-0.2 text-[8px] font-bold ${log.statusCode === 200 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-500"}`}>
                                  {log.statusCode}
                                </span>
                              </td>
                              <td className="py-3 text-right">
                                <button
                                  onClick={() => handleReplayWebhook(log.id)}
                                  className="text-[9px] text-slate-400 hover:text-white border border-deepslate px-2 py-1"
                                >
                                  Replay
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border border-deepslate bg-[#030712] p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2 flex items-center gap-1.5">
                      <Radio size={14} className="text-amber-signal" /> Register Endpoint
                    </h3>
                    <form onSubmit={handleRegisterWebhook} className="space-y-4">
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Destination URL</label>
                        <input
                          type="url"
                          value={webhookUrl}
                          onChange={(e) => setWebhookUrl(e.target.value)}
                          placeholder="e.g. https://api.yoursite.com/webhooks"
                          className="w-full bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-slate-100 rounded-none focus:outline-none focus:border-amber-signal"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Description</label>
                        <input
                          type="text"
                          value={webhookDesc}
                          onChange={(e) => setWebhookDesc(e.target.value)}
                          placeholder="e.g. SIEM Alerts Listener"
                          className="w-full bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-slate-100 rounded-none focus:outline-none focus:border-amber-signal"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-mono text-[9px] text-slate-500 uppercase">Subscribe Events</label>
                        <div className="space-y-1.5 font-mono text-[10px] text-slate-400">
                          {["analysis.completed", "credits.low", "case.updated"].map(ev => (
                            <label key={ev} className="flex items-center gap-2 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={webhookEvents.includes(ev)}
                                onChange={() => {
                                  setWebhookEvents(prev => prev.includes(ev) ? prev.filter(e => e !== ev) : [...prev, ev]);
                                }}
                                className="accent-amber-signal"
                              />
                              <span>{ev}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-amber-signal text-black hover:bg-amber-500 py-2.5 font-mono text-[10px] font-bold uppercase transition-all"
                      >
                        Register
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* OBSERVABILITY TAB */}
            {activeTab === "observability" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="border border-deepslate bg-[#030712] p-4 font-mono text-[10px]">
                    <span className="text-slate-500 block uppercase">API LATENCY</span>
                    <span className="text-2xl font-black text-slate-200 mt-2 block">124 ms</span>
                    <span className="text-emerald-400 block text-[8px] mt-1">99th percentile: 340ms</span>
                  </div>
                  <div className="border border-deepslate bg-[#030712] p-4 font-mono text-[10px]">
                    <span className="text-slate-500 block uppercase">TOTAL CALLS</span>
                    <span className="text-2xl font-black text-slate-200 mt-2 block">4,812</span>
                    <span className="text-slate-400 block text-[8px] mt-1">This month cycle</span>
                  </div>
                  <div className="border border-deepslate bg-[#030712] p-4 font-mono text-[10px]">
                    <span className="text-slate-500 block uppercase">API ERROR RATE</span>
                    <span className="text-2xl font-black text-red-500 mt-2 block">0.12%</span>
                    <span className="text-emerald-400 block text-[8px] mt-1">Status 200 normal</span>
                  </div>
                  <div className="border border-deepslate bg-[#030712] p-4 font-mono text-[10px]">
                    <span className="text-slate-500 block uppercase">WEBHOOK DELIVERABILITY</span>
                    <span className="text-2xl font-black text-emerald-400 mt-2 block">98.5%</span>
                    <span className="text-slate-400 block text-[8px] mt-1">Average delivery delay: 1s</span>
                  </div>
                </div>

                <div className="border border-deepslate bg-slate-900/40 p-6">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2">
                    Usage Trends (Daily Requests)
                  </h3>
                  
                  {/* Custom SVG line graph */}
                  <div className="h-64 flex items-end justify-between font-mono text-[8px] text-slate-500 relative border-l border-b border-deepslate/60 pb-2 pl-2">
                    {/* SVG Line representation */}
                    <svg className="absolute inset-0 h-full w-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path
                        d="M 5,80 Q 20,40 35,60 T 65,25 T 95,15"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M 5,80 Q 20,40 35,60 T 65,25 T 95,15 L 95,100 L 5,100 Z"
                        fill="rgba(245,158,11,0.05)"
                      />
                    </svg>

                    <span>JUL 15</span>
                    <span>JUL 16</span>
                    <span>JUL 17</span>
                    <span>JUL 18</span>
                    <span>JUL 19</span>
                    <span>JUL 20</span>
                    <span>JUL 21</span>
                  </div>
                </div>
              </div>
            )}

            {/* DOCUMENTATION TAB */}
            {activeTab === "docs" && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar index */}
                <div className="font-mono text-[10px] space-y-4 text-slate-500 border-r border-deepslate/40 pr-6 uppercase">
                  <div className="text-slate-200 font-bold tracking-wider mb-2">Getting Started</div>
                  <a href="#quickstart" className="block hover:text-amber-signal text-amber-signal font-bold">Quickstart API</a>
                  <a href="#auth" className="block hover:text-amber-signal">Authentication</a>
                  <a href="#rate-limits" className="block hover:text-amber-signal">Rate Limiting</a>
                  <div className="text-slate-200 font-bold tracking-wider mb-2 mt-6">Modality Verification</div>
                  <a href="#text" className="block hover:text-amber-signal">Text Verification</a>
                  <a href="#image" className="block hover:text-amber-signal">Image Verification</a>
                  <a href="#video" className="block hover:text-amber-signal">Video Verification</a>
                  <div className="text-slate-200 font-bold tracking-wider mb-2 mt-6">SDK Integrations</div>
                  <a href="#python" className="block hover:text-amber-signal">Python SDK</a>
                  <a href="#js" className="block hover:text-amber-signal">Node / TypeScript</a>
                </div>

                {/* Documentation body */}
                <div className="lg:col-span-3 space-y-8 max-w-3xl">
                  {/* Quickstart */}
                  <section id="quickstart" className="space-y-3">
                    <h2 className="text-lg font-mono text-slate-100 uppercase tracking-wider">// Quickstart API</h2>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Start auditing content synthetics programmatically. Veridex provides production-ready APIs to verification pipelines. Pass an authorization bearer token retrieved from the credential pane.
                    </p>
                    <div className="bg-[#010409] border border-deepslate p-4 font-mono text-[10px] text-slate-300 rounded-none whitespace-pre-wrap select-all">
{`curl -X POST https://api.veridex.ai/v1/verify \\
  -H "Authorization: Bearer vdx_live_prod_xxxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "modality": "text",
    "content": "Perform forensic authenticity check on this payload statement."
  }'`}
                    </div>
                  </section>

                  {/* Authentication */}
                  <section id="auth" className="space-y-3 pt-6 border-t border-deepslate/40">
                    <h2 className="text-sm font-mono text-slate-100 uppercase tracking-wider">// Authentication Model</h2>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      All API requests must contain a valid <code className="bg-[#030712] px-1 py-0.5 border border-deepslate font-mono text-[10px] text-slate-300">Authorization</code> header containing your token.
                    </p>
                  </section>

                  {/* SDK Python */}
                  <section id="python" className="space-y-3 pt-6 border-t border-deepslate/40">
                    <h2 className="text-sm font-mono text-slate-100 uppercase tracking-wider">// Python SDK Integration</h2>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Install our verified library package: <code className="bg-[#030712] px-1.5 py-0.5 border border-deepslate font-mono text-[10px] text-amber-signal">pip install veridex-forensics</code>
                    </p>
                    <div className="bg-[#010409] border border-deepslate p-4 font-mono text-[10px] text-slate-300 rounded-none whitespace-pre-wrap select-all">
{`import veridex

client = veridex.Client(api_key="vdx_live_prod_xxxx")

# Perform forensic modality verification
result = client.verify.text(
    content="Generative AI detection verification payload statements."
)

print(f"Verity Index Score: {result.verity_index * 100}%")`}
                    </div>
                  </section>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </WorkspaceShell>
  );
}
