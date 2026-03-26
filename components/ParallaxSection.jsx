"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";

const parallaxCards = [
  {
    title: "UI Systems",
    copy: "Structured components, clean variants, and reusable layouts."
  },
  {
    title: "Motion Design",
    copy: "Purposeful transitions that guide attention without slowing the page."
  },
  {
    title: "Scalable Frontend",
    copy: "Thoughtful separation of content, components, and interaction logic."
  }
];

export default function ParallaxSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Background moves less than foreground so the section reads as a true parallax layer.
  const backgroundY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const glowLeftY = useTransform(scrollYProgress, [0, 1], [-30, 70]);
  const glowRightY = useTransform(scrollYProgress, [0, 1], [20, -80]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-28">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(249,115,22,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.2),rgba(255,255,255,0.03))] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(249,115,22,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(100,116,139,0.12)_1px,transparent_1.6px)] bg-[size:22px_22px] opacity-65 dark:bg-[radial-gradient(circle,rgba(148,163,184,0.12)_1px,transparent_1.6px)]" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-10 top-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
        style={{ y: glowLeftY }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-10 h-64 w-64 rounded-full bg-accentWarm/20 blur-3xl"
        style={{ y: glowRightY }}
      />

      <motion.div className="mx-auto max-w-6xl px-6 sm:px-8" style={{ y: foregroundY }}>
        <SectionHeading
          eyebrow="Parallax"
          title="Background depth that moves slower than the content."
          description="This section now uses clear layered scrolling: the background drifts gently while the foreground content moves more noticeably, creating a stronger parallax effect."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="liquid-glass rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.32em] text-accent">Parallax Motion</p>
            <h3 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">
              The background glides slowly while the content leads the scroll.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              As you scroll through this section, the decorative background and soft color glows move
              at a slower speed than the cards and text in front. That difference in motion is what
              creates the parallax depth effect.
            </p>
          </div>

          <div className="grid gap-4">
            {parallaxCards.map((card, index) => (
              <motion.article
                key={card.title}
                whileHover={{ y: -6, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="liquid-glass rounded-[1.75rem] p-6"
              >
                <p className="text-lg font-semibold text-slate-950 dark:text-white">{card.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {card.copy}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
