export default function SectionHeading({ eyebrow, title, description }) {
    return (
        <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-accent">{eyebrow}</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                {title}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{description}</p>
        </div>
    );
}
