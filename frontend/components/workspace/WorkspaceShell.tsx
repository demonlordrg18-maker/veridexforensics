"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Archive, BarChart3, FileText, FolderKanban, LayoutDashboard, Settings, Upload } from "lucide-react";
import { Navbar } from "@/components/Navigation";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cases", label: "Cases", icon: FolderKanban },
  { href: "/evidence", label: "Evidence Vault", icon: Archive },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/audit", label: "Analysis", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div className="min-h-screen bg-obsidian text-slate-300"><Navbar />
    <aside className="fixed left-0 top-[65px] z-30 hidden h-[calc(100vh-65px)] w-60 border-r border-deepslate bg-[#030712] p-4 lg:block"><p className="px-3 pb-3 text-[9px] font-mono font-bold uppercase tracking-[.2em] text-slate-600">Workspace</p><nav className="space-y-1">{links.map(({ href, label, icon: Icon }) => { const active = pathname === href || (href === "/cases" && pathname.startsWith("/cases/")); return <Link key={href} href={href} className={`flex items-center gap-3 px-3 py-2.5 text-xs font-mono transition-colors ${active ? "bg-amber-signal/10 text-amber-signal" : "text-slate-400 hover:bg-deepslate/50 hover:text-white"}`}><Icon size={15} />{label}</Link>; })}</nav><Link href="/evidence?upload=1" className="mt-7 flex items-center justify-center gap-2 border border-amber-signal/30 bg-amber-signal/10 px-3 py-2.5 text-[10px] font-mono font-bold uppercase text-amber-signal hover:bg-amber-signal/20"><Upload size={14} /> Upload evidence</Link></aside>
    <main className="pt-24 lg:pl-60">{children}</main></div>;
}
