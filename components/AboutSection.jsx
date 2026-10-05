"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const focusAreas = [
    "React development with reusable, well-structured components",
    "WordPress theme development and customization",
    "Responsive, cross-browser layouts from design files",
    "Former frontend team lead: planning, reviews, and mentoring"
];

export default function AboutSection() {
    return (
        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <SectionHeading
                eyebrow="About"
                title="A frontend developer who has built, shipped, and led."
                description="A BIM degree from KCMIT gave me a foundation in both business and technology. Three years at Parijat Infotech turned that into hands-on delivery experience."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5 }}
                    className="liquid-glass rounded-[2rem] p-8"
                >
                    <p className="text-base leading-8 text-slate-600 dark:text-slate-300">
                        I&apos;m Nurbu Tsering Sherpa, a frontend developer at Parijat Infotech Pvt. Ltd. I joined in
                        2023, was promoted to lead the frontend team in 2025, and now focus on React development.
                    </p>
                    <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                        I&apos;ve worked on production websites for Japanese clients such as Yokohama DeNA
                        BayStars, Sanfrecce Hiroshima, and Akachan Honpo. I enjoy turning designs into
                        interfaces that are responsive, maintainable, and easy to use.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.5, delay: 0.08 }}
                    className="liquid-glass rounded-[2rem] p-8"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">
                        Core Focus
                    </p>
                    <div className="mt-5 space-y-4">
                        {focusAreas.map((item) => (
                            <motion.div
                                key={item}
                                whileHover={{ x: 6, scale: 1.01 }}
                                className="liquid-chip rounded-2xl px-4 py-3 text-sm leading-7 text-slate-700 dark:text-slate-200"
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
