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
      "Screen exhibits, document chain of custody, and support high-trust review workflows.",
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
    <div className="min-h-screen">
      <Navbar />

      <section className="bg-slate-950 px-4 pb-20 pt-32 md:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-teal-400">
              Workflow Library
            </div>
            <h1 className="mb-6 text-4xl font-black tracking-tight text-white md:text-7xl">
              Solutions for <span className="text-gradient">High-Stakes Teams.</span>
            </h1>
            <p className="text-xl leading-relaxed text-slate-400">
              Choose the workflow closest to your review environment and see how
              Veridex fits into evidence, editorial, and research operations.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 py-24 md:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {solutions.map(({ title, description, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="glass rounded-3xl border border-white/5 p-8 transition-all hover:border-teal-500/30 hover:bg-white/[0.04]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400">
                <Icon size={24} />
              </div>
              <h2 className="mb-4 text-2xl font-bold text-white">{title}</h2>
              <p className="mb-8 text-sm leading-relaxed text-slate-400">
                {description}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-500">
                Explore Workflow <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
