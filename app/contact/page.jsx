import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
    title: "Contact",
    description: "Get in touch with Nurbu Tsering Sherpa about frontend roles, freelance work, or a project."
};

const contactDetails = [
    {
        label: "Email",
        value: "sherpanurbu15@gmail.com",
        href: "mailto:sherpanurbu15@gmail.com"
    },
    {
        label: "Phone",
        value: "+977 9818486480",
        href: "tel:+9779818486480"
    },
    {
        label: "Location",
        value: "Arubari, Kathmandu, Nepal"
    },
    {
        label: "Current role",
        value: "Frontend Developer – React at Parijat Infotech Pvt. Ltd. (previously Frontend Team Lead)"
    },
    {
        label: "Education",
        value: "Bachelor in Information Management (BIM), KCMIT"
    }
];

export default function ContactPage() {
    return (
        <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 pt-10 sm:px-8 sm:pb-28 sm:pt-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
                <SectionHeading
                    eyebrow="Contact"
                    title="Let's connect and discuss opportunities."
                    description="Reach out about frontend roles, freelance work, or a project you have in mind. Use the form or the details below, and I'll get back to you soon."
                />

                <div className="rounded-3xl border border-border/60 bg-panel/80 p-6 shadow-glow backdrop-blur">
                    <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                        {contactDetails.map((item) => (
                            <p key={item.label}>
                                <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                                    {item.label}
                                </span>
                                {item.href ? (
                                    <a href={item.href} className="hover:underline">
                                        {item.value}
                                    </a>
                                ) : (
                                    item.value
                                )}
                            </p>
                        ))}
                    </div>

                    <a
                        href="/Nurbu_Tsering_Sherpa_CV.docx"
                        download
                        className="mt-6 inline-flex rounded-full border border-border/80 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-accent hover:text-accent dark:text-white"
                    >
                        Download CV
                    </a>
                </div>
            </div>

            <ContactForm />
        </section>
    );
}
