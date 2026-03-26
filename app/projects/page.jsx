import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects",
  description: "A curated selection of projects highlighting product thinking and engineering craft."
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-8 sm:pb-28 sm:pt-10">
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects built for speed, clarity, and scale."
        description="Each case study is powered by reusable content data, making the portfolio easy to expand without rewriting UI."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}


