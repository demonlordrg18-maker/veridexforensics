"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { WorkspaceShell } from "@/components/workspace/WorkspaceShell";
import {
  Building,
  Users,
  ShieldAlert,
  CreditCard,
  HardDrive,
  FileText,
  Search,
  Plus,
  UserX,
  CheckCircle,
  AlertTriangle,
  Download,
  Info,
  Key,
  Database
} from "lucide-react";

export default function EnterprisePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [orgData, setOrgData] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state for Audit Logs
  const [auditQuery, setAuditQuery] = useState("");
  const [auditAction, setAuditAction] = useState("ALL");

  // Invite member form
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("ANALYST");
  const [inviteDept, setInviteDept] = useState("");

  // Create department form
  const [deptName, setDeptName] = useState("");

  // System status state
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadAllData();
    }
  }, [user, user?.activeWorkspaceId]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const activeWs = (user as any)?.activeWorkspaceId || user?.id;
      if (!activeWs.startsWith("org_")) {
        setOrgData(null);
        setLoading(false);
        return;
      }

      // Fetch org details
      const orgRes = await fetch("/api/enterprise");
      if (orgRes.ok) {
        const details = await orgRes.json();
        setOrgData(details);
      }

      // Fetch members
      const memRes = await fetch("/api/enterprise/members");
      if (memRes.ok) {
        const data = await memRes.json();
        setMembers(data.members || []);
      }

      // Fetch departments
      const deptRes = await fetch("/api/enterprise/departments");
      if (deptRes.ok) {
        const data = await deptRes.json();
        setDepartments(data.departments || []);
      }

      // Fetch audit logs
      const logRes = await fetch(`/api/enterprise/audit-logs?query=${auditQuery}&action=${auditAction}`);
      if (logRes.ok) {
        const data = await logRes.json();
        setAuditLogs(data.logs || []);
      }

    } catch (err) {
      console.error("Failed to load enterprise data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSettings = async (updates: any) => {
    try {
      const res = await fetch("/api/enterprise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        showStatus("Settings updated successfully!");
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;

    try {
      const res = await fetch("/api/enterprise/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "invite",
          name: inviteName,
          email: inviteEmail,
          role: inviteRole,
          departmentId: inviteDept || undefined
        }),
      });
      if (res.ok) {
        showStatus(`Invitation sent to ${inviteEmail}`);
        setInviteEmail("");
        setInviteName("");
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSuspendMember = async (memberId: string) => {
    try {
      const res = await fetch("/api/enterprise/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "suspend", userId: memberId }),
      });
      if (res.ok) {
        showStatus("Member status updated");
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm("Are you sure you want to remove this member?")) return;
    try {
      const res = await fetch("/api/enterprise/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", userId: memberId }),
      });
      if (res.ok) {
        showStatus("Member removed");
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateDept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deptName) return;

    try {
      const res = await fetch("/api/enterprise/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", name: deptName }),
      });
      if (res.ok) {
        showStatus(`Department "${deptName}" created`);
        setDeptName("");
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDept = async (id: string) => {
    if (!confirm("Are you sure you want to delete this department?")) return;
    try {
      const res = await fetch("/api/enterprise/departments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      if (res.ok) {
        showStatus("Department deleted");
        loadAllData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Filter logs locally
  useEffect(() => {
    if (user && orgData) {
      fetch(`/api/enterprise/audit-logs?query=${auditQuery}&action=${auditAction}`)
        .then(res => res.json())
        .then(data => setAuditLogs(data.logs || []));
    }
  }, [auditQuery, auditAction]);

  const activeWs = (user as any)?.activeWorkspaceId || user?.id;
  const isOrg = activeWs?.startsWith("org_");

  if (!isOrg) {
    return (
      <WorkspaceShell>
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <div className="h-16 w-16 border border-amber-signal/30 bg-amber-signal/5 flex items-center justify-center font-mono text-xl text-amber-signal mx-auto mb-6 shadow-[inset_0_0_10px_rgba(245,158,11,0.1)]">
            //
          </div>
          <h2 className="text-xl font-mono uppercase tracking-wider text-slate-100 mb-3">
            Enterprise Console Isolated
          </h2>
          <p className="text-slate-400 text-xs font-sans max-w-md mx-auto mb-8 leading-relaxed">
            You are currently accessing Veridex through your Personal Workspace. To view administrative dashboards, SSO controls, audits, and budgets, please select an Organization Workspace from the sidebar.
          </p>
        </div>
      </WorkspaceShell>
    );
  }

  return (
    <WorkspaceShell>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Banner header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-deepslate gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono tracking-widest text-amber-signal font-bold uppercase bg-amber-signal/10 px-2 py-0.5">
                Enterprise Workspace
              </span>
              <span className="h-2 w-2 rounded-full bg-verity-green animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="text-[8px] font-mono text-slate-500">ZK-COMPLIANT NODE</span>
            </div>
            <h1 className="text-2xl font-mono uppercase tracking-wider text-slate-100 mt-1 flex items-center gap-2">
              <Building size={20} className="text-amber-signal" />
              {orgData?.name || "Loading Organization..."}
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              {orgData?.industry || "Enterprise Trust Workspace"} // {orgData?.domain || "no domain"}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="font-mono text-right text-[10px]">
              <div className="text-slate-400">CREDITS REMAINING</div>
              <div className="text-amber-signal font-bold text-sm">
                {orgData?.billingSettings?.creditsRemaining ?? 0} <span className="text-[9px] text-slate-500">CR</span>
              </div>
            </div>
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
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === "overview" ? "border-amber-signal text-amber-signal bg-amber-signal/5" : "border-transparent text-slate-400 hover:text-white"}`}
          >
            <Building size={12} /> Overview
          </button>
          <button
            onClick={() => setActiveTab("members")}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === "members" ? "border-amber-signal text-amber-signal bg-amber-signal/5" : "border-transparent text-slate-400 hover:text-white"}`}
          >
            <Users size={12} /> Members & Teams
          </button>
          <button
            onClick={() => setActiveTab("departments")}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === "departments" ? "border-amber-signal text-amber-signal bg-amber-signal/5" : "border-transparent text-slate-400 hover:text-white"}`}
          >
            <Database size={12} /> Departments
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === "audit" ? "border-amber-signal text-amber-signal bg-amber-signal/5" : "border-transparent text-slate-400 hover:text-white"}`}
          >
            <FileText size={12} /> Audit Logs
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === "security" ? "border-amber-signal text-amber-signal bg-amber-signal/5" : "border-transparent text-slate-400 hover:text-white"}`}
          >
            <ShieldAlert size={12} /> Security Center
          </button>
          <button
            onClick={() => setActiveTab("billing")}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === "billing" ? "border-amber-signal text-amber-signal bg-amber-signal/5" : "border-transparent text-slate-400 hover:text-white"}`}
          >
            <CreditCard size={12} /> Billing & Budget
          </button>
          <button
            onClick={() => setActiveTab("storage")}
            className={`px-4 py-2 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === "storage" ? "border-amber-signal text-amber-signal bg-amber-signal/5" : "border-transparent text-slate-400 hover:text-white"}`}
          >
            <HardDrive size={12} /> Storage
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center font-mono text-xs text-slate-500 animate-pulse">
            [ LOADING SECURE ORGANIZATION DATA... ]
          </div>
        ) : (
          <div>
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Org Profile info */}
                  <div className="border border-deepslate bg-slate-900/40 p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2">
                      Organization Information
                    </h3>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      handleUpdateSettings({
                        name: formData.get("orgName"),
                        description: formData.get("orgDesc"),
                        industry: formData.get("orgIndustry"),
                        domain: formData.get("orgDomain"),
                      });
                    }} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Org Name</label>
                          <input
                            type="text"
                            name="orgName"
                            defaultValue={orgData?.name || ""}
                            className="w-full bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-slate-100 rounded-none focus:outline-none focus:border-amber-signal"
                          />
                        </div>
                        <div>
                          <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Primary Domain</label>
                          <input
                            type="text"
                            name="orgDomain"
                            defaultValue={orgData?.domain || ""}
                            className="w-full bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-slate-100 rounded-none focus:outline-none focus:border-amber-signal"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Description</label>
                        <textarea
                          name="orgDesc"
                          defaultValue={orgData?.description || ""}
                          rows={2}
                          className="w-full bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-slate-100 rounded-none focus:outline-none focus:border-amber-signal resize-none"
                        />
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-[9px] font-mono text-slate-500 uppercase">Created: {new Date(orgData?.createdDate).toLocaleDateString()}</span>
                        <button
                          type="submit"
                          className="bg-amber-signal text-black hover:bg-amber-500 px-4 py-2 font-mono text-[10px] font-bold uppercase transition-all"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Department List overview */}
                  <div className="border border-deepslate bg-slate-900/40 p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2">
                      Active Departments
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {departments.map((dept) => (
                        <div key={dept.id} className="border border-deepslate/60 bg-[#030712]/50 p-4 hover:border-amber-signal/30 transition-all">
                          <div className="font-mono text-[10px] text-slate-400 font-bold uppercase truncate">{dept.name}</div>
                          <div className="font-mono text-2xl font-black text-slate-200 mt-2">
                            {dept.memberIds?.length || 1} <span className="text-[10px] text-slate-500 font-normal">MEMBERS</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Secure Node Info */}
                  <div className="border border-deepslate bg-[#030712] p-5 font-mono text-[10px] space-y-4">
                    <div className="text-slate-100 font-bold uppercase pb-2 border-b border-deepslate tracking-wider">// System Compliance Status</div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">SSO DEPLOYED</span>
                      <span className="text-emerald-400 font-bold">[ COMPLIANT ]</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">RESTRICTIONS</span>
                      <span className="text-amber-signal font-bold">{orgData?.securitySettings?.ipRestrictions ? "IP RULE ACTIVE" : "NONE"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">2FA ENFORCEMENT</span>
                      <span className={orgData?.securitySettings?.twoFactorRequired ? "text-emerald-400 font-bold" : "text-red-500"}>
                        {orgData?.securitySettings?.twoFactorRequired ? "MANDATORY" : "INACTIVE"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">SUBSCRIBED TIER</span>
                      <span className="text-amber-signal font-bold">{orgData?.billingSettings?.subscriptionTier}</span>
                    </div>
                  </div>

                  {/* Quick Usage Stats */}
                  <div className="border border-deepslate bg-[#030712] p-5 font-mono text-[10px] space-y-3">
                    <div className="text-slate-100 font-bold uppercase pb-2 border-b border-deepslate tracking-wider">// Storage Growth Stats</div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">TOTAL EVIDENCE</span>
                      <span className="text-slate-200 font-bold">{orgData?.storage?.evidenceCount ?? 0} Files</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">TOTAL CASES</span>
                      <span className="text-slate-200 font-bold">{orgData?.storage?.caseCount ?? 0} Cases</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">REPORTS COMPILED</span>
                      <span className="text-slate-200 font-bold">{orgData?.storage?.reportCount ?? 0} Generated</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MEMBERS TAB */}
            {activeTab === "members" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Member List */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="border border-deepslate bg-slate-900/40 p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2">
                      Workspace Membership ({members.length})
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-[11px] text-slate-400">
                        <thead>
                          <tr className="border-b border-deepslate text-slate-500 uppercase text-[9px]">
                            <th className="pb-3">Name / Email</th>
                            <th className="pb-3">Role</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {members.map((member) => (
                            <tr key={member.userId} className="border-b border-deepslate/30 hover:bg-[#030712]/30">
                              <td className="py-3">
                                <div className="text-slate-200 font-bold">{member.name}</div>
                                <div className="text-[9px] text-slate-500">{member.email}</div>
                              </td>
                              <td className="py-3 text-amber-signal">{member.role}</td>
                              <td className="py-3">
                                <span className={`px-1.5 py-0.5 text-[8px] font-bold ${
                                  member.status === "ACTIVE" 
                                    ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20" 
                                    : member.status === "SUSPENDED" 
                                    ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                    : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                }`}>
                                  {member.status}
                                </span>
                              </td>
                              <td className="py-3 text-right space-x-2">
                                <button
                                  onClick={() => handleSuspendMember(member.userId)}
                                  className="text-[9px] text-slate-400 hover:text-white border border-deepslate px-2 py-1"
                                >
                                  {member.status === "SUSPENDED" ? "Activate" : "Suspend"}
                                </button>
                                <button
                                  onClick={() => handleRemoveMember(member.userId)}
                                  className="text-[9px] text-red-500 hover:text-red-400 border border-red-500/20 px-2 py-1"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Invite panel */}
                <div>
                  <div className="border border-deepslate bg-[#030712] p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2 flex items-center gap-1.5">
                      <Plus size={14} className="text-amber-signal" /> Invite Team Member
                    </h3>
                    <form onSubmit={handleInviteMember} className="space-y-4">
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Full Name</label>
                        <input
                          type="text"
                          value={inviteName}
                          onChange={(e) => setInviteName(e.target.value)}
                          placeholder="e.g. Alice Vance"
                          className="w-full bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-slate-100 rounded-none focus:outline-none focus:border-amber-signal"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Work Email</label>
                        <input
                          type="email"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          placeholder="e.g. alice@organization.com"
                          className="w-full bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-slate-100 rounded-none focus:outline-none focus:border-amber-signal"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Default Role</label>
                        <select
                          value={inviteRole}
                          onChange={(e) => setInviteRole(e.target.value)}
                          className="w-full bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-slate-100 rounded-none focus:outline-none focus:border-amber-signal"
                        >
                          <option value="ANALYST">ANALYST</option>
                          <option value="INVESTIGATOR">INVESTIGATOR</option>
                          <option value="MANAGER">MANAGER</option>
                          <option value="SECURITY_ADMINISTRATOR">SECURITY ADMINISTRATOR</option>
                          <option value="ADMINISTRATOR">ADMINISTRATOR</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Department (Optional)</label>
                        <select
                          value={inviteDept}
                          onChange={(e) => setInviteDept(e.target.value)}
                          className="w-full bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-slate-100 rounded-none focus:outline-none focus:border-amber-signal"
                        >
                          <option value="">Unassigned</option>
                          {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-amber-signal text-black hover:bg-amber-500 py-2.5 font-mono text-[10px] font-bold uppercase transition-all"
                      >
                        Send Invitation
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* DEPARTMENTS TAB */}
            {activeTab === "departments" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <div className="border border-deepslate bg-slate-900/40 p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2">
                      Department Units
                    </h3>
                    <div className="space-y-3">
                      {departments.map((dept) => (
                        <div key={dept.id} className="flex justify-between items-center p-4 border border-deepslate bg-[#030712] hover:border-amber-signal/20 transition-all">
                          <div>
                            <div className="font-mono text-sm font-bold text-slate-200">{dept.name}</div>
                            <div className="font-mono text-[9px] text-slate-500 uppercase mt-1">
                              ID: {dept.id} // {dept.memberIds?.length || 1} Member(s)
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteDept(dept.id)}
                            className="font-mono text-[9px] text-red-500 border border-red-500/20 px-3 py-1.5 hover:bg-red-500/5 transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="border border-deepslate bg-[#030712] p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2 flex items-center gap-1.5">
                      <Plus size={14} className="text-amber-signal" /> Create Department
                    </h3>
                    <form onSubmit={handleCreateDept} className="space-y-4">
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Department Name</label>
                        <input
                          type="text"
                          value={deptName}
                          onChange={(e) => setDeptName(e.target.value)}
                          placeholder="e.g. Legal & Compliance"
                          className="w-full bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-slate-100 rounded-none focus:outline-none focus:border-amber-signal"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-amber-signal text-black hover:bg-amber-500 py-2.5 font-mono text-[10px] font-bold uppercase transition-all"
                      >
                        Create
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* AUDIT LOGS TAB */}
            {activeTab === "audit" && (
              <div className="border border-deepslate bg-slate-900/40 p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 border-b border-deepslate pb-4">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100">
                    Cryptographic Audit History
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-initial">
                      <Search size={12} className="absolute left-3 top-2.5 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Search logs..."
                        value={auditQuery}
                        onChange={(e) => setAuditQuery(e.target.value)}
                        className="bg-[#030712] border border-deepslate pl-8 pr-3 py-1.5 text-[10px] font-mono text-slate-200 rounded-none focus:outline-none focus:border-amber-signal w-full md:w-56"
                      />
                    </div>
                    <select
                      value={auditAction}
                      onChange={(e) => setAuditAction(e.target.value)}
                      className="bg-[#030712] border border-deepslate px-3 py-1.5 text-[10px] font-mono text-slate-200 rounded-none focus:outline-none focus:border-amber-signal"
                    >
                      <option value="ALL">All Actions</option>
                      <option value="UPLOAD">UPLOAD</option>
                      <option value="ANALYSIS">ANALYSIS</option>
                      <option value="CASE_CREATE">CASE_CREATE</option>
                      <option value="CASE_UPDATE">CASE_UPDATE</option>
                    </select>
                    <button
                      onClick={() => {
                        const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
                        const downloadAnchor = document.createElement('a');
                        downloadAnchor.setAttribute("href", jsonStr);
                        downloadAnchor.setAttribute("download", `veridex_audit_export_${Date.now()}.json`);
                        document.body.appendChild(downloadAnchor);
                        downloadAnchor.click();
                        downloadAnchor.remove();
                      }}
                      className="flex items-center gap-1.5 font-mono text-[9px] uppercase border border-deepslate px-3 py-1.5 hover:text-white transition-all bg-[#030712]"
                    >
                      <Download size={12} /> Export JSON
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-[10px] text-slate-400">
                    <thead>
                      <tr className="border-b border-deepslate text-slate-500 uppercase">
                        <th className="pb-3">Timestamp</th>
                        <th className="pb-3">User</th>
                        <th className="pb-3">Action</th>
                        <th className="pb-3">Audit Details</th>
                        <th className="pb-3 text-right">Node Signature</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="border-b border-deepslate/30 hover:bg-[#030712]/30 py-3">
                          <td className="py-3 text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                          <td className="py-3 text-slate-300 font-bold">{log.userName}</td>
                          <td className="py-3 text-amber-signal">{log.action}</td>
                          <td className="py-3 text-slate-300">{log.details}</td>
                          <td className="py-3 text-right text-slate-500 text-[8px]">{log.id}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === "security" && (
              <div className="max-w-3xl space-y-6">
                <div className="border border-deepslate bg-slate-900/40 p-6">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-6 border-b border-deepslate pb-2">
                    Access & Identity Controls
                  </h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleUpdateSettings({
                      securitySettings: {
                        twoFactorRequired: formData.get("twoFactor") === "on",
                        sessionTimeout: parseInt(formData.get("timeout") as string) || 30,
                        ipRestrictions: formData.get("ips") as string
                      }
                    });
                  }} className="space-y-6">
                    <div className="flex items-start justify-between p-4 border border-deepslate bg-[#030712]/40">
                      <div className="space-y-1">
                        <div className="font-mono text-xs text-slate-200 uppercase font-bold">Enforce Two-Factor Authentication (2FA)</div>
                        <p className="text-[10px] text-slate-500 max-w-md">Mandate MFA registration for all investigators, managers, and analysts accessing this workspace.</p>
                      </div>
                      <input
                        type="checkbox"
                        name="twoFactor"
                        defaultChecked={orgData?.securitySettings?.twoFactorRequired}
                        className="w-4 h-4 accent-amber-signal"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Session Inactivity Timeout (Minutes)</label>
                        <input
                          type="number"
                          name="timeout"
                          defaultValue={orgData?.securitySettings?.sessionTimeout || 30}
                          className="w-full bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-slate-100 rounded-none focus:outline-none focus:border-amber-signal"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[9px] text-slate-500 uppercase mb-1">Allowed IP Restrictions (CIDR blocks)</label>
                        <input
                          type="text"
                          name="ips"
                          placeholder="e.g. 192.168.1.0/24, 10.0.0.0/8"
                          defaultValue={orgData?.securitySettings?.ipRestrictions || ""}
                          className="w-full bg-[#030712] border border-deepslate px-3 py-2 text-xs font-mono text-slate-100 rounded-none focus:outline-none focus:border-amber-signal"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        className="bg-amber-signal text-black hover:bg-amber-500 px-6 py-2.5 font-mono text-[10px] font-bold uppercase transition-all"
                      >
                        Save Policy Settings
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* BILLING TAB */}
            {activeTab === "billing" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Active plan */}
                  <div className="border border-deepslate bg-slate-900/40 p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2">
                      Active Enterprise Plan
                    </h3>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-mono text-lg font-bold text-slate-100 uppercase flex items-center gap-2">
                          <CheckCircle className="text-emerald-400" size={18} />
                          {orgData?.billingSettings?.subscriptionTier || "ENTERPRISE PRO"}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 font-sans">
                          Includes unlimited cases, 250 GB secure storage vault, active webhooks, and 24/7 dedicated forensic engineer support.
                        </p>
                      </div>
                      <span className="bg-amber-signal/15 text-amber-signal border border-amber-signal/30 font-mono text-[8px] font-bold px-2 py-0.5 uppercase">
                        {orgData?.billingSettings?.subscriptionStatus || "active"}
                      </span>
                    </div>
                  </div>

                  {/* Invoice History */}
                  <div className="border border-deepslate bg-slate-900/40 p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2">
                      Invoice History
                    </h3>
                    <table className="w-full text-left font-mono text-[10px] text-slate-400">
                      <thead>
                        <tr className="border-b border-deepslate text-slate-500 uppercase">
                          <th className="pb-3">Invoice ID</th>
                          <th className="pb-3">Date</th>
                          <th className="pb-3">Amount</th>
                          <th className="pb-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orgData?.billingSettings?.invoiceHistory?.map((inv: any) => (
                          <tr key={inv.id} className="border-b border-deepslate/30 py-3">
                            <td className="py-3 text-slate-300 font-bold">{inv.id}</td>
                            <td className="py-3 text-slate-500">{new Date(inv.date).toLocaleDateString()}</td>
                            <td className="py-3 text-slate-300">${inv.amount.toFixed(2)}</td>
                            <td className="py-3 text-right text-emerald-400">[ {inv.status} ]</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  {/* Payment Method */}
                  <div className="border border-deepslate bg-[#030712] p-6 space-y-4">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 border-b border-deepslate pb-2">
                      Payment Details
                    </h3>
                    <div className="font-mono text-[10px] space-y-2">
                      <div className="text-slate-500">BILLING CONTACT</div>
                      <div className="text-slate-300 font-bold">{orgData?.billingSettings?.billingEmail || "billing@democorp.com"}</div>
                    </div>
                    <div className="font-mono text-[10px] space-y-2">
                      <div className="text-slate-500">PAYMENT METHOD</div>
                      <div className="text-slate-300 font-bold">{orgData?.billingSettings?.paymentMethod || "Visa ending in 4242"}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STORAGE TAB */}
            {activeTab === "storage" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  {/* Stats bar */}
                  <div className="border border-deepslate bg-slate-900/40 p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2">
                      Vault Quota Utilization
                    </h3>
                    
                    {/* Fake usage progress bar */}
                    <div className="w-full bg-[#030712] h-4 border border-deepslate mb-2">
                      <div className="bg-amber-signal h-full" style={{ width: "35%" }} />
                    </div>
                    
                    <div className="flex justify-between font-mono text-[10px] text-slate-500 mt-2">
                      <span>3.5 GB USED</span>
                      <span>10.0 GB TOTAL CAP</span>
                    </div>
                  </div>

                  {/* Largest Files Table */}
                  <div className="border border-deepslate bg-slate-900/40 p-6">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-slate-100 mb-4 border-b border-deepslate pb-2">
                      Largest Evidence Records
                    </h3>
                    <table className="w-full text-left font-mono text-[10px] text-slate-400">
                      <thead>
                        <tr className="border-b border-deepslate text-slate-500 uppercase">
                          <th className="pb-3">Filename</th>
                          <th className="pb-3 text-right">Size</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orgData?.storage?.largestFiles?.map((file: any) => (
                          <tr key={file.id} className="border-b border-deepslate/30 py-3">
                            <td className="py-3 text-slate-300 truncate max-w-md">{file.title}</td>
                            <td className="py-3 text-right text-slate-400">{(file.fileSizeBytes / 1024 / 1024).toFixed(2)} MB</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  {/* Breakdown details */}
                  <div className="border border-deepslate bg-[#030712] p-6 space-y-4 font-mono text-[10px]">
                    <h3 className="text-xs uppercase tracking-wider text-slate-100 border-b border-deepslate pb-2">
                      Modality Distribution
                    </h3>
                    {Object.entries(orgData?.storage?.byModality || {}).map(([modality, count]: any) => (
                      <div key={modality} className="flex justify-between uppercase">
                        <span className="text-slate-500">{modality}</span>
                        <span className="text-slate-200 font-bold">{count} items</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </WorkspaceShell>
  );
}
