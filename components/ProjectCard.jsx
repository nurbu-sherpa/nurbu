"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="liquid-glass group rounded-[2rem] p-6"
        >
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                        {project.category}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                        {project.title}
                    </h3>
                </div>

                <Link
                    href={project.href}
                    className="liquid-chip inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-700 transition group-hover:border-accent group-hover:text-accent dark:text-slate-200"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.title}`}
                >
                    <ArrowUpRight size={18} />
                </Link>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                    <span
                        key={item}
                        className="liquid-chip rounded-full px-3 py-1 text-xs font-medium text-slate-700 dark:text-slate-200"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </motion.article>
    );
}
