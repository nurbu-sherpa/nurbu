"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import CodeWindow from "@/components/hero/CodeWindow";
import HeroCanvas from "@/components/hero/HeroCanvas";

const rotatingRoles = ["React interfaces", "WordPress themes", "responsive sites"];

const stats = [
    { value: "3+", label: "Years building for the web" },
    { value: "5+", label: "Production websites" },
    { value: "React", label: "Current focus" }
];

const clients = ["Yokohama DeNA BayStars", "Sanfrecce Hiroshima", "Akachan Honpo"];

const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

function RotatingRole() {
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (reduceMotion) {
            return undefined;
        }
        const intervalId = window.setInterval(() => {
            setIndex((current) => (current + 1) % rotatingRoles.length);
        }, 2600);
        return () => window.clearInterval(intervalId);
    }, [reduceMotion]);

    return (
        <span className="relative block h-[1.15em] overflow-hidden" aria-hidden="true">
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={rotatingRoles[index]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="absolute inset-x-0 top-0 block whitespace-nowrap bg-gradient-to-r from-accent via-violet-500 to-accentWarm bg-clip-text text-transparent"
                >
                    {rotatingRoles[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

export default function HeroSection() {
    return (
        <section
            data-cursor-scope="hero"
            className="hero-cursor-scope relative isolate flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden border-b border-border/40 px-6 py-16 sm:px-8 lg:px-10"
        >
            {/* Base background */}
            <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(226,232,240,0.86))] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.97),rgba(15,23,42,0.93))]" />

            {/* Interactive constellation */}
            <HeroCanvas className="absolute inset-0 -z-10 h-full w-full" />

            {/* Soft fade behind the text so it stays readable over the canvas */}
            <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full bg-[radial-gradient(ellipse_at_20%_50%,rgba(248,250,252,0.85),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_20%_50%,rgba(2,6,23,0.8),transparent_60%)] lg:w-2/3" />

            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative z-10 min-w-0"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur dark:bg-white/5 dark:text-slate-200">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        </span>
                        Open to new opportunities
                    </span>

                    <p className="mt-6 text-lg font-medium text-slate-600 dark:text-slate-300">
                        Hi, I&apos;m Nurbu Tsering Sherpa
                    </p>

                    <h1 className="mt-3 text-[1.85rem] font-semibold max-[359px]:text-[1.6rem] leading-[1.08] tracking-tight text-slate-950 dark:text-white min-[440px]:text-[2.3rem] sm:text-5xl lg:text-[2.6rem] xl:text-[3.5rem]">
                        <span className="sr-only">
                            I build React interfaces, WordPress themes, and responsive sites that feel fast and
                            polished.
                        </span>
                        <span aria-hidden="true" className="block">
                            I build
                        </span>
                        <RotatingRole />
                        <span aria-hidden="true" className="block">
                            that feel fast and polished.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                        Frontend developer at Parijat Infotech in Kathmandu. Over 3+ years I&apos;ve shipped websites and
                        React apps for clients in Nepal and Japan, and led the company&apos;s frontend team.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                            href="/projects"
                            data-cursor="interactive"
                            className={`rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:shadow-glow dark:bg-white dark:text-slate-950 ${focusRing}`}
                        >
                            Explore projects
                        </Link>
                        <Link
                            href="/contact"
                            data-cursor="interactive"
                            className={`rounded-full border border-border/80 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent dark:bg-white/5 dark:text-white ${focusRing}`}
                        >
                            Let&apos;s talk
                        </Link>
                        <a
                            href="/Nurbu_Tsering_Sherpa_CV.docx"
                            download
                            data-cursor="interactive"
                            className={`rounded-full px-4 py-3 text-sm font-semibold text-slate-700 underline-offset-4 transition duration-200 hover:text-accent hover:underline dark:text-slate-200 ${focusRing}`}
                        >
                            Download CV
                        </a>
                    </div>

                    <dl className="mt-9 grid max-w-xl grid-cols-3 divide-x divide-border/70 rounded-2xl border border-border/60 bg-white/50 backdrop-blur dark:bg-white/[0.03]">
                        {stats.map((item) => (
                            <div key={item.label} className="flex min-w-0 flex-col px-3 py-4 sm:px-5">
                                <dt className="text-xs leading-5 text-slate-500 dark:text-slate-400">{item.label}</dt>
                                <dd className="order-first text-2xl font-semibold text-slate-950 dark:text-white">
                                    {item.value}
                                </dd>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-8">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Client work for</p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                            {clients.map((client) => (
                                <li
                                    key={client}
                                    className="rounded-full border border-border/70 bg-white/60 px-3.5 py-1.5 text-sm text-slate-700 backdrop-blur dark:bg-white/5 dark:text-slate-200"
                                >
                                    {client}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                    className="relative z-10 mx-auto w-full min-w-0 max-w-xl"
                >
                    <CodeWindow />
                    <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
                        Switch files to rebuild the preview.
                        <span className="hidden md:inline"> Move your mouse over the background, or click it.</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
