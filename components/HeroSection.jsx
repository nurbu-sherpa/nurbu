"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-8"
      >
        <div className="space-y-5">
          <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-accent">
            Frontend Developer with 3 years of experience
          </span>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
            Nurbu Tsering Sherpa crafting modern and responsive web experiences.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            I studied Bachelor of Information Technology and Management (BIM) and have spent the last 3 years building frontend solutions at Parijat Infotech Pvt. Ltd.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-border/80 bg-panel/80 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-accent hover:text-accent dark:text-white"
          >
            Contact Me
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Experience", value: "3 Years" },
            { label: "Degree", value: "BIM" },
            { label: "Specialization", value: "Frontend Dev" }
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-border/60 bg-panel/80 p-5 backdrop-blur"
            >
              <p className="text-2xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        className="relative"
      >
        <div className="absolute -inset-6 rounded-[2.5rem] bg-[conic-gradient(from_120deg_at_50%_50%,rgba(14,165,233,0.24),rgba(251,146,60,0.2),rgba(99,102,241,0.12),rgba(14,165,233,0.24))] blur-2xl" />
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/50 bg-slate-950 p-8 text-white shadow-glow">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>

          <div className="mt-10 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-sky-300">Professional Background</p>
              <p className="mt-3 text-lg font-medium">
                3 years of frontend development experience delivering clean, user-focused interfaces at Parijat Infotech Pvt. Ltd.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-300">Education</p>
                <p className="mt-2 text-3xl font-semibold">BIM</p>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Bachelor's degree</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-300">Current Focus</p>
                <p className="mt-2 text-3xl font-semibold">UI</p>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Responsive frontend systems</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
