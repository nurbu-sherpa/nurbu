"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        setMounted(true);

        const storedTheme = window.localStorage.getItem("theme");
        const preferredTheme =
            storedTheme ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

        document.documentElement.classList.toggle("dark", preferredTheme === "dark");
        setTheme(preferredTheme);
    }, []);

    const handleToggle = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        document.documentElement.classList.toggle("dark", nextTheme === "dark");
        window.localStorage.setItem("theme", nextTheme);
        setTheme(nextTheme);
    };

    if (!mounted) {
        return (
            <div className="h-11 w-11 rounded-full border border-border/80 bg-panel/70" aria-hidden="true" />
        );
    }

    return (
        <button
            type="button"
            onClick={handleToggle}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-panel/80 text-slate-900 transition hover:border-accent hover:text-accent dark:text-white"
            aria-label="Toggle dark mode"
        >
            {theme === "dark" ? <SunMedium size={18} /> : <MoonStar size={18} />}
        </button>
    );
}
