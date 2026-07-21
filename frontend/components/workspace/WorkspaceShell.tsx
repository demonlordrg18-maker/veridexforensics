"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Archive,
  BarChart3,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Upload,
  Code,
  Shield,
  ChevronDown,
  Building,
  User,
  GraduationCap
} from "lucide-react";
import { Navbar } from "@/components/Navigation";
import { useAuth } from "@/components/auth/AuthProvider";

const baseLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cases", label: "Cases", icon: FolderKanban },
  { href: "/evidence", label: "Evidence Vault", icon: Archive },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/audit", label: "Analysis", icon: BarChart3 },
];

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, updateUserSession } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState({ id: "", name: "Personal Workspace", type: "personal" });

  useEffect(() => {
    if (user) {
      const activeId = (user as any).activeWorkspaceId || user.id;
      if (activeId === "org_democorp") {
        setActiveWorkspace({ id: "org_democorp", name: "Veridex Enterprise Demo", type: "enterprise" });
      } else if (activeId === "org_veridexuni") {
        setActiveWorkspace({ id: "org_veridexuni", name: "Veridex Forensic University", type: "academic" });
      } else {
        setActiveWorkspace({ id: user.id, name: "Personal Workspace", type: "personal" });
      }
    }
  }, [user]);

  const switchWorkspace = async (workspaceId: string) => {
    try {
      const res = await fetch("/api/workspace/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workspaceId }),
      });
      if (res.ok) {
        setDropdownOpen(false);
        // Refresh session from API and reload
        const sessRes = await fetch("/api/auth/session");
        const data = await sessRes.json();
        if (data.user) {
          updateUserSession(data.user);
        }
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isOrg = activeWorkspace.id.startsWith("org_");

  const links = [...baseLinks];
  
  // Conditionally add Enterprise and Developer links
  if (isOrg) {
    links.push({ href: "/enterprise", label: "Enterprise Control", icon: Shield });
  }
  links.push({ href: "/developer", label: "Developer Portal", icon: Code });
  links.push({ href: "/settings", label: "Settings", icon: Settings });

  return (
    <div className="min-h-screen bg-obsidian text-slate-300">
      <Navbar />
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-[65px] z-30 hidden h-[calc(100vh-65px)] w-60 border-r border-deepslate bg-[#030712] p-4 lg:block flex flex-col justify-between">
        <div>
          {/* Workspace Switcher */}
          <div className="relative mb-6">
            <p className="px-3 pb-2 text-[9px] font-mono font-bold uppercase tracking-[.2em] text-slate-600">
              Active Workspace
            </p>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 border border-deepslate bg-slate-900/60 hover:bg-slate-900 text-slate-100 hover:text-white transition-all font-mono text-[11px] uppercase tracking-wider rounded-none"
            >
              <span className="flex items-center gap-2 truncate">
                {activeWorkspace.type === "personal" ? (
                  <User size={13} className="text-amber-signal" />
                ) : activeWorkspace.type === "academic" ? (
                  <GraduationCap size={13} className="text-cyan-400" />
                ) : (
                  <Building size={13} className="text-emerald-400" />
                )}
                <span className="truncate">{activeWorkspace.name}</span>
              </span>
              <ChevronDown size={12} className={`text-slate-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 right-0 mt-1 z-50 bg-[#030712] border border-deepslate p-1 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <button
                  onClick={() => switchWorkspace(user?.id || "")}
                  className={`w-full flex items-center gap-2 px-3 py-2 font-mono text-[10px] text-left hover:bg-deepslate/40 transition-colors uppercase ${activeWorkspace.type === "personal" ? "text-amber-signal bg-amber-signal/5" : "text-slate-400"}`}
                >
                  <User size={12} />
                  <span>Personal Workspace</span>
                </button>
                <button
                  onClick={() => switchWorkspace("org_democorp")}
                  className={`w-full flex items-center gap-2 px-3 py-2 font-mono text-[10px] text-left hover:bg-deepslate/40 transition-colors uppercase ${activeWorkspace.id === "org_democorp" ? "text-emerald-400 bg-emerald-400/5" : "text-slate-400"}`}
                >
                  <Building size={12} />
                  <span>Veridex Enterprise Demo</span>
                </button>
                <button
                  onClick={() => switchWorkspace("org_veridexuni")}
                  className={`w-full flex items-center gap-2 px-3 py-2 font-mono text-[10px] text-left hover:bg-deepslate/40 transition-colors uppercase ${activeWorkspace.id === "org_veridexuni" ? "text-cyan-400 bg-cyan-400/5" : "text-slate-400"}`}
                >
                  <GraduationCap size={12} />
                  <span>Forensic University</span>
                </button>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {links.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href === "/cases" && pathname.startsWith("/cases/")) || (href === "/evidence" && pathname.startsWith("/evidence/")) || (href === "/reports" && pathname.startsWith("/reports/"));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-xs font-mono transition-colors ${
                    active
                      ? "bg-amber-signal/10 text-amber-signal border-l-2 border-amber-signal font-bold"
                      : "text-slate-400 hover:bg-deepslate/30 hover:text-white"
                  }`}
                >
                  <Icon size={14} className={active ? "text-amber-signal" : "text-slate-500"} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Upload Button */}
        <div className="pt-4 border-t border-deepslate/40">
          <Link
            href="/evidence?upload=1"
            className="flex items-center justify-center gap-2 border border-amber-signal/30 bg-amber-signal/10 px-3 py-2.5 text-[10px] font-mono font-bold uppercase text-amber-signal hover:bg-amber-signal/20 transition-all hover:shadow-[0_0_12px_rgba(245,158,11,0.15)]"
          >
            <Upload size={14} />
            Upload evidence
          </Link>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="pt-24 lg:pl-60 min-h-screen pb-12">{children}</main>
    </div>
  );
}
