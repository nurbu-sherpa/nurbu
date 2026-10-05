import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import HeroSection from "@/components/HeroSection";
import ParallaxSection from "@/components/ParallaxSection";
import ProjectPreviewSection from "@/components/ProjectPreviewSection";
import SkillsCarousel from "@/components/SkillsCarousel";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <ParallaxSection />
            <SkillsCarousel />
            <AboutSection />
            <ExperienceSection />
            <ProjectPreviewSection />
        </>
    );
}
