"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { cn } from "@/utils/helpers";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[80] px-4 py-3 sm:px-6 lg:px-8">
      <div className="liquid-glass-strong mx-auto max-w-7xl overflow-hidden rounded-[1.8rem]">
        <nav className="mx-auto flex items-center justify-between px-6 py-4 sm:px-8">
          <Link href="/" className="group">
            <span className="font-mono text-sm font-semibold uppercase tracking-[0.32em] text-slate-800 dark:text-white">
              Nurbu Tsering Sherpa
            </span>
            <span className="mt-1 block text-xs text-slate-500 transition group-hover:text-accent dark:text-slate-400">
              Frontend Developer
            </span>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition",
                    isActive
                      ? "liquid-chip text-slate-950 dark:text-white"
                      : "text-slate-600 hover:bg-white/55 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen((previous) => !previous)}
              className="liquid-chip inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-900 transition hover:border-accent hover:text-accent dark:text-white"
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {isOpen ? (
          <div className="border-t border-white/30 px-6 py-4 md:hidden dark:border-white/10">
            <div className="mx-auto flex max-w-6xl flex-col gap-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm font-medium transition",
                      isActive
                        ? "liquid-chip text-slate-950 dark:text-white"
                        : "text-slate-600 hover:bg-white/55 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}



