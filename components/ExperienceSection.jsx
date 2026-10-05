import SectionHeading from "@/components/SectionHeading";

const experience = [
    {
        role: "Frontend Developer – React",
        company: "Parijat Infotech Pvt. Ltd.",
        period: "Sep 2026 – Present",
        points: [
            "Build responsive, component-based interfaces with React, JavaScript, HTML, and CSS.",
            "Develop reusable React components and interactive features for client projects."
        ]
    },
    {
        role: "Team Lead – Frontend Development",
        company: "Parijat Infotech Pvt. Ltd.",
        period: "May 2025 – Aug 2026",
        points: [
            "Led the frontend team, planning daily tasks and reviewing work across React and WordPress projects.",
            "Mentored developers and worked with designers to turn mockups into polished pages."
        ]
    },
    {
        role: "Frontend Developer",
        company: "Parijat Infotech Pvt. Ltd.",
        period: "May 2023 – May 2025",
        points: [
            "Built responsive, cross-browser websites with HTML, CSS, JavaScript, and React.",
            "Developed and customized WordPress themes for Japanese clients.",
            "Promoted to Team Lead after two years."
        ]
    },
    {
        role: "Content Management Intern",
        company: "Ultimodeal Pvt. Ltd.",
        period: "2018",
        points: ["Managed WordPress website content and trained junior interns."]
    }
];

const education = [
    { degree: "Bachelor in Information Management (BIM)", school: "KCMIT", period: "2018 – 2023" },
    { degree: "+2, Management & Computer Science", school: "St. Lawrence College", period: "2016 – 2018" }
];

export default function ExperienceSection() {
    return (
        <section id="experience" className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <SectionHeading
                eyebrow="Experience"
                title="Where I've worked."
                description="Three years at Parijat Infotech, from frontend developer to team lead, and now focused on React."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
                <ol className="liquid-glass rounded-[2rem] p-8">
                    {experience.map((job, index) => (
                        <li
                            key={`${job.role}-${job.period}`}
                            className="relative border-l border-accent/30 pb-8 pl-6 last:pb-0"
                        >
                            <span
                                aria-hidden="true"
                                className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-accent" : "bg-slate-300 dark:bg-slate-600"}`}
                            />
                            <p className="text-sm text-slate-500 dark:text-slate-400">{job.period}</p>
                            <h3 className="mt-1 text-xl font-semibold text-slate-950 dark:text-white">{job.role}</h3>
                            <p className="text-sm font-medium text-accent">{job.company}</p>
                            <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                {job.points.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ol>

                <div className="liquid-glass h-fit rounded-[2rem] p-8">
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Education</h3>
                    <div className="mt-5 space-y-5">
                        {education.map((item) => (
                            <div key={item.degree}>
                                <p className="font-medium text-slate-900 dark:text-slate-100">{item.degree}</p>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                                    {item.school}, {item.period}
                                </p>
                            </div>
                        ))}
                    </div>
                    <a
                        href="/Nurbu_Tsering_Sherpa_CV.docx"
                        download
                        className="mt-8 inline-flex rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
                    >
                        Download CV
                    </a>
                </div>
            </div>
        </section>
    );
}
