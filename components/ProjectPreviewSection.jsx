import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";

export default function ProjectPreviewSection() {
    const featuredProjects = projects.slice(0, 3);

    return (
        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <SectionHeading
                    eyebrow="Projects"
                    title="Recent work."
                    description="A few highlights from client websites and personal builds."
                />

                <Link
                    href="/projects"
                    data-cursor="interactive"
                    className="text-sm font-semibold text-slate-700 transition hover:translate-x-1 hover:text-accent dark:text-slate-200"
                >
                    See all projects
                </Link>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {featuredProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </section>
    );
}
