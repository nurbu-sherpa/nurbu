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
          title="Reusable content powers every project card."
          description="Project data is separated from presentation so you can add or edit portfolio items without touching the component logic."
        />

        <Link
          href="/projects"
          className="text-sm font-semibold text-slate-700 transition hover:text-accent dark:text-slate-200"
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
