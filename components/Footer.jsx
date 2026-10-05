import Link from "next/link";

const socialLinks = [
    { href: "https://github.com/nurbu-sherpa", label: "GitHub" },
    { href: "https://linkedin.com/in/nurbu-tsering-sherpa", label: "LinkedIn" },
    { href: "mailto:sherpanurbu15@gmail.com", label: "Email" }
];

export default function Footer() {
    return (
        <footer className="px-6 pb-8 pt-4 sm:px-8">
            <div className="liquid-glass mx-auto flex max-w-6xl flex-col gap-6 rounded-[2rem] px-6 py-10 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-900 dark:text-white">
                        Nurbu Tsering Sherpa
                    </p>
                    <p className="mt-2 max-w-md text-sm text-slate-600 dark:text-slate-300">
                        React frontend developer at Parijat Infotech Pvt. Ltd. in Kathmandu, with 3+ years of experience building responsive websites and web apps.
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
                    {socialLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="liquid-chip rounded-full px-4 py-2 transition hover:text-accent"
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
