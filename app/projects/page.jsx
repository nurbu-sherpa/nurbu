import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";

export const metadata = {
    title: "Projects",
    description: "Client websites and React projects by Nurbu Tsering Sherpa, including work for Yokohama DeNA BayStars and Sanfrecce Hiroshima.",
    alternates: { canonical: "/projects" }
};

export default function ProjectsPage() {
    return (
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-8 sm:pb-28 sm:pt-10">
            <SectionHeading
                eyebrow="Selected Work"
                title="Websites and apps I've built and worked on."
                description="Client websites for Japanese brands, seasonal campaign pages, and personal projects, built with React and WordPress."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </section>
    );
}
