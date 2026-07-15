/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./data/**/*.{js,jsx}",
        "./utils/**/*.{js,jsx}"
    ],
    theme: {
        extend: {
            colors: {
                surface: "rgb(var(--surface) / <alpha-value>)",
                panel: "rgb(var(--panel) / <alpha-value>)",
                border: "rgb(var(--border) / <alpha-value>)",
                muted: "rgb(var(--muted) / <alpha-value>)",
                accent: "rgb(var(--accent) / <alpha-value>)",
                accentWarm: "rgb(var(--accent-warm) / <alpha-value>)"
            },
            boxShadow: {
                glow: "0 30px 80px -35px rgba(14, 165, 233, 0.35)"
            },
            backgroundImage: {
                grid: "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.18) 1px, transparent 0)"
            }
        }
    },
    plugins: []
};
