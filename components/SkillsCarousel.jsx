"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";

const slides = [
    {
        title: "React Development",
        summary: "Building component-based interfaces and interactive features with React and modern JavaScript.",
        tags: ["React", "JavaScript", "Next.js", "Tailwind CSS"]
    },
    {
        title: "Responsive UI",
        summary: "Turning designs into mobile-first, cross-browser layouts that work on every screen size.",
        tags: ["HTML5", "CSS3", "Mobile-first", "Cross-browser"]
    },
    {
        title: "WordPress",
        summary: "Developing, customizing, and maintaining WordPress themes for client websites.",
        tags: ["Theme development", "Customization", "PHP", "MySQL"]
    },
    {
        title: "Team Leadership",
        summary: "Led the frontend team at Parijat Infotech, planning work, reviewing code, and mentoring developers.",
        tags: ["Mentoring", "Task planning", "Code review", "Design handoff"]
    }
];

export default function SkillsCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const handleSelect = (nextIndex) => {
        setDirection(nextIndex > activeIndex ? 1 : -1);
        setActiveIndex(nextIndex);
    };

    const handleNext = () => handleSelect((activeIndex + 1) % slides.length);
    const handlePrevious = () => handleSelect((activeIndex - 1 + slides.length) % slides.length);

    return (
        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <SectionHeading
                    eyebrow="Skills"
                    title="What I work with."
                    description="Swipe or use the arrows to browse my core skills."
                />

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handlePrevious}
                        data-cursor="interactive"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-panel/80 text-slate-900 transition hover:-translate-y-0.5 hover:border-accent hover:text-accent dark:text-white"
                        aria-label="Show previous slide"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        data-cursor="interactive"
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-panel/80 text-slate-900 transition hover:-translate-y-0.5 hover:border-accent hover:text-accent dark:text-white"
                        aria-label="Show next slide"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <div className="mt-12 overflow-hidden rounded-[2rem] border border-border/60 bg-panel/80 p-6 shadow-glow backdrop-blur sm:p-8">
                <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                        key={slides[activeIndex].title}
                        custom={direction}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(_, info) => {
                            if (info.offset.x < -70) {
                                handleNext();
                            }

                            if (info.offset.x > 70) {
                                handlePrevious();
                            }
                        }}
                        variants={{
                            enter: (currentDirection) => ({
                                x: currentDirection > 0 ? 120 : -120,
                                opacity: 0
                            }),
                            center: {
                                x: 0,
                                opacity: 1
                            },
                            exit: (currentDirection) => ({
                                x: currentDirection > 0 ? -120 : 120,
                                opacity: 0
                            })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="grid gap-8 lg:grid-cols-[1fr_0.9fr]"
                    >
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent">
                                {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                            </p>
                            <h3 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">
                                {slides[activeIndex].title}
                            </h3>
                            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                                {slides[activeIndex].summary}
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {slides[activeIndex].tags.map((tag) => (
                                <motion.div
                                    key={tag}
                                    whileHover={{ scale: 1.03, y: -4 }}
                                    className="rounded-[1.5rem] border border-border/60 bg-surface/70 px-4 py-5 text-sm font-medium text-slate-700 dark:text-slate-200"
                                >
                                    {tag}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
                {slides.map((slide, index) => (
                    <button
                        key={slide.title}
                        type="button"
                        onClick={() => handleSelect(index)}
                        data-cursor="interactive"
                        className={`h-2.5 rounded-full transition ${
                            index === activeIndex ? "w-10 bg-accent" : "w-2.5 bg-slate-300 dark:bg-slate-700"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
