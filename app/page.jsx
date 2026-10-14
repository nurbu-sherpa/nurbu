import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import ParallaxSection from "@/components/ParallaxSection";
import ProjectPreviewSection from "@/components/ProjectPreviewSection";
import SkillsCarousel from "@/components/SkillsCarousel";

export const metadata = {
    alternates: { canonical: "/" }
};

const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nurbu Tsering Sherpa",
    alternateName: "Nurbu Sherpa",
    url: "https://nurbusherpa.com.np",
    jobTitle: "Frontend Developer (React)",
    worksFor: { "@type": "Organization", name: "Parijat Infotech Pvt. Ltd." },
    address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "NP" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "KCMIT" },
    knowsAbout: ["React", "JavaScript", "Next.js", "WordPress", "Tailwind CSS"],
    sameAs: [
        "https://github.com/nurbu-sherpa",
        "https://linkedin.com/in/nurbu-tsering-sherpa"
    ]
};

export default function HomePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c")
                }}
            />
            <HeroSection />
            <ParallaxSection />
            <SkillsCarousel />
            <AboutSection />
            <ExperienceSection />
            <ProjectPreviewSection />
        </>
    );
}