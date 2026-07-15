"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const statItems = [
        { label: "Experience", value: "3 Years" },
        { label: "Degree", value: "BIM" },
        { label: "Company", value: "Parijat Infotech" }
];

const insightCards = [
        "Responsive interfaces built for real users and real teams.",
        "Strong attention to detail, layout rhythm, and interaction polish.",
        "Frontend architecture that stays clean as products evolve."
];

function SpawnParticle({ particle }) {
        return (
                <motion.div
                        className="pointer-events-none absolute rounded-full border border-white/15"
                        initial={{ opacity: 0, scale: 0.35 }}
                        animate={{ opacity: [0, 0.85, 0], scale: [0.35, 1, 1.5], y: [0, -12, -28] }}
                        exit={{ opacity: 0, scale: 0.2 }}
                        transition={{ duration: 1.6, ease: "easeOut" }}
                        style={{
                                left: particle.x,
                                top: particle.y,
                                width: particle.size,
                                height: particle.size,
                                background:
                                        particle.variant === "warm"
                                                ? "radial-gradient(circle, rgba(249,115,22,0.9), rgba(249,115,22,0.08))"
                                                : "radial-gradient(circle, rgba(56,189,248,0.9), rgba(56,189,248,0.08))"
                        }}
                />
        );
}

export default function HeroSection() {
        const sectionRef = useRef(null);
        const visualRef = useRef(null);
        const pointerDownRef = useRef(false);
        const lastSpawnRef = useRef(0);
        const [particles, setParticles] = useState([]);
        const [isHeroHovered, setIsHeroHovered] = useState(false);
        const [glowPosition, setGlowPosition] = useState({ x: 50, y: 42 });

        useEffect(() => {
                const handlePointerUp = () => {
                        pointerDownRef.current = false;
                };

                window.addEventListener("pointerup", handlePointerUp);
                return () => window.removeEventListener("pointerup", handlePointerUp);
        }, []);

        const updateGlowPosition = (clientX, clientY) => {
                const container = sectionRef.current;

                if (!container) {
                        return;
                }

                const rect = container.getBoundingClientRect();
                const relativeX = ((clientX - rect.left) / rect.width) * 100;
                const relativeY = ((clientY - rect.top) / rect.height) * 100;

                setGlowPosition({
                        x: Math.max(0, Math.min(100, relativeX)),
                        y: Math.max(0, Math.min(100, relativeY))
                });
        };

        const spawnParticle = (clientX, clientY, variant = "cool") => {
                const container = visualRef.current;

                if (!container) {
                        return;
                }

                const rect = container.getBoundingClientRect();
                const x = clientX - rect.left;
                const y = clientY - rect.top;

                if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                        return;
                }

                const particle = {
                        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                        x,
                        y,
                        size: variant === "warm" ? 60 : 44,
                        variant
                };

                setParticles((current) => [...current, particle]);

                window.setTimeout(() => {
                        setParticles((current) => current.filter((item) => item.id !== particle.id));
                }, 1600);
        };

        const handleHeroMove = (event) => {
                updateGlowPosition(event.clientX, event.clientY);

                if (!pointerDownRef.current) {
                        return;
                }

                const now = Date.now();

                if (now - lastSpawnRef.current < 90) {
                        return;
                }

                lastSpawnRef.current = now;
                spawnParticle(event.clientX, event.clientY, "cool");
        };

        return (
                <section
                        ref={sectionRef}
                        data-cursor-scope="hero"
                        className="hero-cursor-scope relative isolate flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden border-b border-border/40 px-6 py-12 sm:px-8 lg:px-10"
                        onMouseEnter={() => setIsHeroHovered(true)}
                        onMouseLeave={() => setIsHeroHovered(false)}
                        onMouseMove={handleHeroMove}
                >
                        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(248,250,252,0.94),rgba(226,232,240,0.84))] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,0.92))]" />
                        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(100,116,139,0.18)_1px,transparent_1.6px)] bg-[size:24px_24px] opacity-70 dark:bg-[radial-gradient(circle,rgba(148,163,184,0.18)_1px,transparent_1.6px)]" />
                        <motion.div
                                className="pointer-events-none absolute inset-0 -z-10"
                                animate={{ opacity: isHeroHovered ? 1 : 0.72 }}
                                transition={{ duration: 0.35 }}
                                style={{
                                        background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(255,255,255,0.8), rgba(56,189,248,0.16) 14%, rgba(56,189,248,0.04) 26%, transparent 40%), radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, transparent 0, transparent 120px, rgba(56,189,248,0.2) 123px, transparent 126px), radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, transparent 0, transparent 180px, rgba(249,115,22,0.14) 183px, transparent 186px)`
                                }}
                        />
                        <motion.div
                                className="pointer-events-none absolute inset-y-0 -z-10 w-48 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] blur-2xl dark:bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.22),transparent)]"
                                animate={{
                                        x: isHeroHovered ? ["-15%", "115%"] : "-15%",
                                        opacity: isHeroHovered ? 1 : 0
                                }}
                                transition={{
                                        x: { duration: 3.1, repeat: isHeroHovered ? Infinity : 0, ease: "linear" },
                                        opacity: { duration: 0.3 }
                                }}
                        />

                        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
                                <motion.div
                                        initial={{ opacity: 0, y: 28 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="relative z-10"
                                >
                                        <div className="max-w-3xl space-y-6">
                                                <span className="inline-flex rounded-full border border-accent/20 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-accent shadow-sm backdrop-blur dark:bg-white/5">
                                                        Frontend Developer | BIM Graduate
                                                </span>
                                                <h1 className="text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
                                                        Realistic interfaces, motion-led detail, and frontend work that feels refined.
                                                </h1>
                                                <p className="max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                                        I am Nurbu Tsering Sherpa, a frontend developer with 3 years of experience at Parijat
                                                        Infotech Pvt. Ltd. I focus on building modern, responsive products with a realistic
                                                        visual feel and interaction quality that users actually notice.
                                                </p>
                                        </div>

                                        <div className="mt-8 flex flex-wrap gap-4">
                                                <Link
                                                        href="/projects"
                                                        data-cursor="interactive"
                                                        className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:shadow-glow dark:bg-white dark:text-slate-950"
                                                >
                                                        Explore Projects
                                                </Link>
                                                <Link
                                                        href="/contact"
                                                        data-cursor="interactive"
                                                        className="rounded-full border border-border/80 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-1 hover:border-accent hover:text-accent dark:bg-white/5 dark:text-white"
                                                >
                                                        Let&apos;s Talk
                                                </Link>
                                        </div>

                                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                                {statItems.map((item) => (
                                                        <motion.div
                                                                key={item.label}
                                                                whileHover={{ y: -6, scale: 1.02 }}
                                                                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                                                                className="rounded-[1.75rem] border border-white/50 bg-white/55 p-5 shadow-[0_14px_40px_rgba(148,163,184,0.18)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                                                        >
                                                                <p className="text-2xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
                                                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.label}</p>
                                                        </motion.div>
                                                ))}
                                        </div>
                                </motion.div>

                                <motion.div
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
                                        className="relative z-10"
                                >
                                        <div className="absolute -inset-8 rounded-[2.75rem] bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.75),transparent_32%),radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.22),transparent_34%),radial-gradient(circle_at_50%_70%,rgba(249,115,22,0.16),transparent_30%)] blur-3xl dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.2),transparent_34%),radial-gradient(circle_at_50%_70%,rgba(249,115,22,0.16),transparent_30%)]" />

                                        <div
                                                ref={visualRef}
                                                className="relative overflow-hidden rounded-[2.75rem] border border-white/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.78),rgba(255,255,255,0.34))] p-6 shadow-[0_30px_90px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(15,23,42,0.82),rgba(15,23,42,0.42))] dark:shadow-[0_30px_90px_rgba(2,6,23,0.45)]"
                                                onPointerDown={(event) => {
                                                        pointerDownRef.current = true;
                                                        spawnParticle(event.clientX, event.clientY, "warm");
                                                }}
                                                data-cursor="interactive"
                                        >
                                                <div className="relative flex items-center justify-between rounded-[2rem] border border-white/60 bg-white/50 px-5 py-4 backdrop-blur dark:border-white/10 dark:bg-white/5">
                                                        <div>
                                                                <p className="text-xs uppercase tracking-[0.3em] text-accent">Visual Presence</p>
                                                                <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">Cinematic Hero Display</p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                                <span className="h-3 w-3 rounded-full bg-rose-400" />
                                                                <span className="h-3 w-3 rounded-full bg-amber-300" />
                                                                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                                                        </div>
                                                </div>

                                                <div className="relative mt-6 min-h-[31rem] overflow-hidden rounded-[2.2rem] border border-white/50 bg-[linear-gradient(180deg,rgba(226,232,240,0.82),rgba(248,250,252,0.54))] p-6 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.48))]">
                                                        <AnimatePresence>
                                                                {particles.map((particle) => (
                                                                        <SpawnParticle key={particle.id} particle={particle} />
                                                                ))}
                                                        </AnimatePresence>

                                                        <div className="pointer-events-none absolute inset-x-8 top-8 h-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_72%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_72%)]" />

                                                        <motion.div
                                                                animate={{ y: [0, -8, 0], rotate: [0, 0.8, 0] }}
                                                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                                                className="relative mx-auto mt-4 max-w-md rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-[0_20px_70px_rgba(148,163,184,0.22)] backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-none"
                                                        >
                                                                <p className="text-sm uppercase tracking-[0.28em] text-accent">Frontend Craft</p>
                                                                <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">
                                                                        Realistic, premium-looking UI with responsive structure.
                                                                </h2>
                                                                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                                                        Hover the hero for the light sweep, then click or drag in this visual panel to add
                                                                        subtle particles that dissolve naturally.
                                                                </p>
                                                        </motion.div>

                                                        <div className="mt-6 grid gap-4 lg:grid-cols-3">
                                                                {insightCards.map((item, index) => (
                                                                        <motion.div
                                                                                key={item}
                                                                                whileHover={{ y: -6 }}
                                                                                animate={{ y: [0, index % 2 === 0 ? -6 : 6, 0] }}
                                                                                transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
                                                                                className="rounded-[1.5rem] border border-white/50 bg-white/60 p-4 text-sm leading-7 text-slate-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                                                                        >
                                                                                {item}
                                                                        </motion.div>
                                                                ))}
                                                        </div>
                                                </div>
                                        </div>
                                </motion.div>
                        </div>
                </section>
        );
}
