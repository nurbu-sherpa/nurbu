"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const focusAreas = [
  "3 years of frontend development experience at Parijat Infotech Pvt. Ltd.",
  "Bachelor of Information Technology and Management (BIM)",
  "Building responsive, accessible, and user-friendly interfaces",
  "Maintaining clean and scalable frontend architecture"
];

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
      <SectionHeading
        eyebrow="About"
        title="A frontend developer focused on clean interfaces and steady growth."
        description="My background combines formal BIM studies with hands-on professional frontend development, giving me both technical foundation and practical delivery experience."
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
            I am Nurbu Tsering Sherpa, a frontend developer with a Bachelor of Information Technology
            and Management (BIM) and 3 years of industry experience at Parijat Infotech Pvt. Ltd.
          </p>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
            I enjoy building modern web interfaces that are responsive, maintainable, and easy for
            users to navigate. My focus is on translating requirements into polished frontend
            experiences.
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
