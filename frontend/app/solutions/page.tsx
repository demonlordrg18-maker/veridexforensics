"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gavel, Microscope, Newspaper } from "lucide-react";
import Link from "next/link";
import type { Route } from "next";

import { Footer, Navbar } from "../../components/Navigation";

const solutions = [
  {
    title: "Journalists",
    description:
      "Verify leaked media, assess provenance, and reduce newsroom risk before publication.",
    href: "/solutions/journalists" as Route,
    icon: Newspaper,
  },
  {
    title: "Legal Teams",
    description:
      "Screen digital exhibits, document chain of custody, and support high-trust review workflows.",
    href: "/solutions/legal-teams" as Route,
    icon: Gavel,
  },
  {
    title: "Researchers",
    description:
      "Map disinformation patterns, analyze archives, and turn large corpora into structured claims.",
    href: "/solutions/researchers" as Route,
    icon: Microscope,
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />

      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none">
              // WORKFLOW OPERATIONAL LIBRARY
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white font-geist uppercase">
              Solutions for <span className="text-amber-signal">High-Stakes Teams.</span>
            </h1>
            <p className="text-base text-slate-400 font-sans leading-relaxed">
              Choose the workflow closest to your review environment and see how Veridex fits into evidence, editorial, and research operations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 bg-obsidian">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3 font-mono text-[11px]">
          {solutions.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="border border-deepslate bg-[#030712] p-8 rounded-none transition-all hover:border-amber-signal/30 flex flex-col justify-between group relative"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate group-hover:bg-amber-signal/30" />
              <div>
                <div className="mb-6 flex h-10 w-10 items-center justify-center border border-deepslate bg-deepslate/30 text-amber-signal rounded-none">
                  <Icon size={18} />
                </div>
                <h2 className="mb-4 text-xl font-bold text-white font-geist uppercase">{title}</h2>
                <p className="mb-8 text-xs leading-relaxed text-slate-400 font-sans">
                  {description}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-widest text-amber-signal mt-4">
                [ Explore Workflow ] <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
