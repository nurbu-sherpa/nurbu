import Link from "next/link";

const socialLinks = [
  { href: "https://github.com/yourusername", label: "GitHub" },
  { href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
  { href: "mailto:sherpanurbu15@gmail.com", label: "Email" }
];

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-900 dark:text-white">
            Nurbu Tsering Sherpa
          </p>
          <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
            Frontend developer with 3 years of experience at Parijat Infotech Pvt. Ltd., focused on building responsive and maintainable web interfaces.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="transition hover:text-accent"
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
