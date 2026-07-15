import "@/styles/globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
    metadataBase: new URL("https://nurbu.vercel.app"),
    title: {
        default: "Nurbu Tsering Sherpa | Frontend Developer",
        template: "%s | Nurbu Tsering Sherpa"
    },
    description:
        "Portfolio of Nurbu Tsering Sherpa, a frontend developer with 3 years of experience building modern web interfaces.",
    keywords: [
        "developer portfolio",
        "Next.js portfolio",
        "React developer",
        "full-stack developer"
    ],
    openGraph: {
        title: "Nurbu Tsering Sherpa | Frontend Developer",
        description:
            "Explore the experience, projects, and contact details of Nurbu Tsering Sherpa.",
        url: "https://nurbu.vercel.app",
        siteName: "Nurbu Tsering Sherpa Portfolio",
        locale: "en_US",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Nurbu Tsering Sherpa | Frontend Developer",
        description:
            "Explore the experience, projects, and contact details of Nurbu Tsering Sherpa."
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
            <body className="bg-surface text-slate-900 antialiased transition-colors duration-300 dark:text-slate-100" cz-shortcut-listen="false">
                <div className="relative min-h-screen overflow-hidden">
                    <CustomCursor />
                    <ScrollToTop />

                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_58%)]" />
                        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.18),transparent_70%)] blur-3xl" />
                        <div className="absolute inset-0 bg-grid bg-[size:22px_22px] opacity-60" />
                    </div>

                    <Navbar />
                    <main className="pt-28 sm:pt-32">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
