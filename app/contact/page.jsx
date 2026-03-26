import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "Contact",
  description: "Send a message through the built-in contact form API route."
};

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 pt-10 sm:px-8 sm:pb-28 sm:pt-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's connect and discuss opportunities."
          description="You can reach out for frontend roles, freelance collaboration, or project discussions using the form or direct contact details below."
        />

        <div className="rounded-3xl border border-border/60 bg-panel/80 p-6 shadow-glow backdrop-blur">
          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                Email
              </span>
              <a href="mailto:sherpanurbu15@gmail.com" className="hover:underline">
                sherpanurbu15@gmail.com
              </a>
            </p>
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                Number
              </span>
              <a href="tel:9818486480" className="hover:underline">9818486480</a>
            </p>
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                Education
              </span>
              Bachelor of Information Technology and Management (BIM)
            </p>
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                Experience
              </span>
              3 years as a Frontend Developer at Parijat Infotech Pvt. Ltd.
            </p>
          </div>
        </div>
      </div>

      <ContactForm />
    </section>
  );
}


