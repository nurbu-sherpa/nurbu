"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const tokenClass = {
    kw: "text-violet-600 dark:text-violet-400",
    fn: "text-sky-700 dark:text-sky-300",
    tag: "text-sky-600 dark:text-sky-400",
    attr: "text-amber-700 dark:text-amber-300",
    str: "text-emerald-700 dark:text-emerald-300",
    num: "text-orange-600 dark:text-orange-300",
    pun: "text-slate-500 dark:text-slate-400",
    txt: "text-slate-800 dark:text-slate-200"
};

// Each line is a list of [tokenType, text] pairs.
const files = {
    "Profile.jsx": {
        language: "JavaScript JSX",
        lines: [
            [["kw", "export default function "], ["fn", "Developer"], ["pun", "() {"]],
            [["txt", "  "], ["kw", "const "], ["txt", "skills = "], ["pun", "["], ["str", '"React"'], ["pun", ", "], ["str", '"Next.js"'], ["pun", ", "], ["str", '"WordPress"'], ["pun", "];"]],
            [["txt", "  "], ["kw", "return "], ["pun", "("]],
            [["pun", "    <"], ["tag", "Profile"]],
            [["txt", "      "], ["attr", "name"], ["pun", "="], ["str", '"Nurbu Tsering Sherpa"']],
            [["txt", "      "], ["attr", "role"], ["pun", "="], ["str", '"Frontend Developer"']],
            [["txt", "      "], ["attr", "focus"], ["pun", "="], ["str", '"React"']],
            [["txt", "      "], ["attr", "experience"], ["pun", "={"], ["num", "3"], ["pun", "}"]],
            [["txt", "      "], ["attr", "skills"], ["pun", "={"], ["txt", "skills"], ["pun", "}"]],
            [["pun", "    />"]],
            [["pun", "  );"]],
            [["pun", "}"]]
        ]
    },
    "experience.js": {
        language: "JavaScript",
        lines: [
            [["kw", "export const "], ["txt", "experience = "], ["pun", "["]],
            [["pun", "  { "], ["attr", "role"], ["pun", ": "], ["str", '"Frontend Developer – React"'], ["pun", ","]],
            [["txt", "    "], ["attr", "since"], ["pun", ": "], ["num", "2026"], ["pun", " },"]],
            [["pun", "  { "], ["attr", "role"], ["pun", ": "], ["str", '"Team Lead – Frontend"'], ["pun", ","]],
            [["txt", "    "], ["attr", "from"], ["pun", ": "], ["num", "2025"], ["pun", ", "], ["attr", "to"], ["pun", ": "], ["num", "2026"], ["pun", " },"]],
            [["pun", "  { "], ["attr", "role"], ["pun", ": "], ["str", '"Frontend Developer"'], ["pun", ","]],
            [["txt", "    "], ["attr", "from"], ["pun", ": "], ["num", "2023"], ["pun", ", "], ["attr", "to"], ["pun", ": "], ["num", "2025"], ["pun", " },"]],
            [["pun", "];"]]
        ]
    }
};

const fileNames = Object.keys(files);
const LINE_SLOTS = 12;

const lineLength = (line) => line.reduce((total, [, text]) => total + text.length, 0);

function ProfilePreview() {
    return (
        <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accentWarm text-sm font-semibold text-white">
                NS
            </div>
            <div className="min-w-0">
                <p className="truncate font-semibold text-slate-950 dark:text-white">Nurbu Tsering Sherpa</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">Frontend Developer, 3+ years</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                    {["React", "Next.js", "WordPress"].map((skill) => (
                        <span
                            key={skill}
                            className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-200"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ExperiencePreview() {
    const rows = [
        { role: "Frontend Developer – React", years: "2026 – now", current: true },
        { role: "Team Lead – Frontend", years: "2025 – 2026" },
        { role: "Frontend Developer", years: "2023 – 2025" }
    ];

    return (
        <ul className="space-y-2">
            {rows.map((row) => (
                <li key={row.role} className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                        <span className={`h-2 w-2 rounded-full ${row.current ? "bg-accent" : "bg-slate-300 dark:bg-slate-600"}`} />
                        {row.role}
                    </span>
                    <span className="shrink-0 text-slate-500 dark:text-slate-400">{row.years}</span>
                </li>
            ))}
        </ul>
    );
}

export default function CodeWindow() {
    const reduceMotion = useReducedMotion();
    const [activeFile, setActiveFile] = useState(fileNames[0]);
    const [typed, setTyped] = useState(0);

    const { lines, language } = files[activeFile];
    const totalChars = useMemo(
        () => lines.reduce((total, line) => total + lineLength(line), 0) + lines.length - 1,
        [lines]
    );
    const isDone = typed >= totalChars;

    // Type the active file once; switching tabs replays it.
    useEffect(() => {
        if (reduceMotion) {
            setTyped(totalChars);
            return undefined;
        }

        setTyped(0);
        const intervalId = window.setInterval(() => {
            setTyped((current) => {
                const next = current + 3;
                if (next >= totalChars) {
                    window.clearInterval(intervalId);
                    return totalChars;
                }
                return next;
            });
        }, 24);

        return () => window.clearInterval(intervalId);
    }, [activeFile, totalChars, reduceMotion]);

    // Subtle 3D tilt that follows the mouse (desktop only).
    const tiltX = useMotionValue(0);
    const tiltY = useMotionValue(0);
    const rotateX = useSpring(tiltX, { stiffness: 150, damping: 18 });
    const rotateY = useSpring(tiltY, { stiffness: 150, damping: 18 });

    const handlePointerMove = (event) => {
        if (reduceMotion || event.pointerType !== "mouse") {
            return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        tiltX.set(py * -6);
        tiltY.set(px * 8);
    };

    const resetTilt = () => {
        tiltX.set(0);
        tiltY.set(0);
    };

    let remaining = Math.min(typed, totalChars);
    let caretPlaced = false;

    return (
        <motion.div
            onPointerMove={handlePointerMove}
            onPointerLeave={resetTilt}
            style={{ rotateX, rotateY, transformPerspective: 1400 }}
            className="relative"
        >
            <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.25),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.18),transparent_50%)] blur-2xl"
            />

            <div className="overflow-hidden rounded-[1.6rem] border border-slate-200/80 bg-white/90 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/85 dark:shadow-[0_30px_80px_-20px_rgba(2,6,23,0.8)]">
                {/* Title bar */}
                <div className="flex items-center gap-3 border-b border-slate-200/80 bg-slate-50/90 px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
                    <div className="flex gap-1.5" aria-hidden="true">
                        <span className="h-3 w-3 rounded-full bg-rose-400" />
                        <span className="h-3 w-3 rounded-full bg-amber-300" />
                        <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    </div>
                    <p className="flex-1 text-center text-xs text-slate-500 dark:text-slate-400">nurbu-portfolio</p>
                    <span className="w-[42px]" aria-hidden="true" />
                </div>

                {/* File tabs */}
                <div role="tablist" aria-label="Code files" className="flex border-b border-slate-200/80 dark:border-white/10">
                    {fileNames.map((name) => {
                        const isActive = name === activeFile;
                        return (
                            <button
                                key={name}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => {
                                    if (name === activeFile) return;
                                    setTyped(reduceMotion ? Number.MAX_SAFE_INTEGER : 0);
                                    setActiveFile(name);
                                }}
                                data-cursor="interactive"
                                className={`relative min-h-[44px] cursor-pointer px-4 font-mono text-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
                                    isActive
                                        ? "bg-white text-slate-900 dark:bg-slate-900 dark:text-white"
                                        : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                                }`}
                            >
                                {name}
                                {isActive ? <span className="absolute inset-x-0 top-0 h-0.5 bg-accent" /> : null}
                            </button>
                        );
                    })}
                </div>

                {/* Code */}
                <div className="overflow-x-auto bg-white px-2 py-4 dark:bg-slate-900/70">
                    <pre className="font-mono text-[12.5px] leading-6" aria-label={`${activeFile} source code`}>
                        {Array.from({ length: LINE_SLOTS }, (_, index) => {
                            const line = lines[index];

                            if (!line) {
                                return (
                                    <div key={index} className="flex" aria-hidden="true">
                                        <span className="w-8 shrink-0 select-none pr-3 text-right text-slate-300 dark:text-slate-700">
                                            {index + 1}
                                        </span>
                                    </div>
                                );
                            }

                            const length = lineLength(line);
                            let left = Math.max(0, Math.min(remaining, length));
                            const showCaret = !caretPlaced && remaining <= length;
                            if (showCaret) caretPlaced = true;
                            remaining -= length + 1;

                            return (
                                <div key={index} className="flex whitespace-pre">
                                    <span className="w-8 shrink-0 select-none pr-3 text-right text-slate-400 dark:text-slate-600">
                                        {index + 1}
                                    </span>
                                    <code>
                                        {line.map(([type, text], tokenIndex) => {
                                            const shown = text.slice(0, left);
                                            left -= shown.length;
                                            return shown ? (
                                                <span key={tokenIndex} className={tokenClass[type]}>
                                                    {shown}
                                                </span>
                                            ) : null;
                                        })}
                                        {showCaret ? (
                                            <span
                                                aria-hidden="true"
                                                className={`ml-px inline-block h-4 w-[2px] translate-y-[3px] bg-accent ${isDone ? "animate-pulse" : ""}`}
                                            />
                                        ) : null}
                                    </code>
                                </div>
                            );
                        })}
                    </pre>
                </div>

                {/* Live preview */}
                <div className="border-t border-slate-200/80 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.02]">
                    <p className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">Preview</p>
                    <div className="min-h-[88px]">
                        <AnimatePresence mode="wait">
                            {isDone ? (
                                <motion.div
                                    key={activeFile}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-white/10 dark:bg-slate-900"
                                >
                                    {activeFile === "Profile.jsx" ? <ProfilePreview /> : <ExperiencePreview />}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-2 rounded-2xl border border-dashed border-slate-300/80 p-4 dark:border-white/10"
                                    aria-hidden="true"
                                >
                                    <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                    <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Status bar */}
                <div className="flex items-center justify-between gap-3 bg-accent/90 px-4 py-1.5 font-mono text-[11px] text-white dark:bg-accent/80">
                    <span>main</span>
                    <span className="hidden sm:inline">{language}</span>
                    <span className="flex items-center gap-1.5" aria-live="polite">
                        <span className={`h-1.5 w-1.5 rounded-full ${isDone ? "bg-white" : "animate-pulse bg-white/70"}`} />
                        {isDone ? "Compiled successfully" : "Compiling…"}
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
