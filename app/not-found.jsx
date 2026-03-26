import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden px-6 py-16 sm:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(248,250,252,0.94),rgba(226,232,240,0.84))] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,0.92))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(100,116,139,0.2)_1px,transparent_1.8px)] bg-[size:24px_24px] opacity-70 dark:bg-[radial-gradient(circle,rgba(148,163,184,0.16)_1px,transparent_1.8px)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.18),transparent_68%)] blur-3xl" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-accent/20 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-accent shadow-sm backdrop-blur dark:bg-white/5">
            Page Not Found
          </span>
          <h1 className="text-6xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-7xl lg:text-8xl">
            404
          </h1>
          <p className="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            This page drifted out of orbit. The route you opened does not exist, but the portfolio is
            still right here and ready to explore.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:shadow-glow dark:bg-white dark:text-slate-950"
            >
              Back Home
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-border/80 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-1 hover:border-accent hover:text-accent dark:bg-white/5 dark:text-white"
            >
              View Projects
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.75rem] border border-white/60 bg-[linear-gradient(145deg,rgba(255,255,255,0.78),rgba(255,255,255,0.34))] p-6 shadow-[0_30px_90px_rgba(15,23,42,0.14)] backdrop-blur-2xl dark:border-white/10 dark:bg-[linear-gradient(145deg,rgba(15,23,42,0.82),rgba(15,23,42,0.42))] dark:shadow-[0_30px_90px_rgba(2,6,23,0.45)]">
          <div className="rounded-[2.2rem] border border-white/50 bg-white/65 p-6 backdrop-blur dark:border-white/10 dark:bg-white/5">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Lost Signal</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.6rem] border border-white/50 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-sm text-slate-500 dark:text-slate-400">Suggested Route</p>
                <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">Home Page</p>
              </div>
              <div className="rounded-[1.6rem] border border-white/50 bg-white/70 p-5 dark:border-white/10 dark:bg-white/5">
                <p className="text-sm text-slate-500 dark:text-slate-400">Best Next Stop</p>
                <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">Projects</p>
              </div>
            </div>
            <div className="mt-6 rounded-[1.8rem] border border-dashed border-accent/30 p-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
              The custom 404 page keeps the same premium visual language as the hero so broken routes
              still feel intentional instead of generic.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
