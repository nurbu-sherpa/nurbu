"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { initialContactFormState } from "@/utils/helpers";

export default function ContactForm() {
  const [formData, setFormData] = useState(initialContactFormState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!status.message) {
      return undefined;
    }

    // Auto-dismiss feedback so the popup feels lightweight and unobtrusive.
    const timeoutId = window.setTimeout(() => {
      setStatus({ type: "", message: "" });
    }, 3200);

    return () => window.clearTimeout(timeoutId);
  }, [status]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your message.");
      }

      setStatus({ type: "success", message: result.message });
      setFormData(initialContactFormState);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {status.message ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="pointer-events-none fixed bottom-6 right-6 z-[120] w-[calc(100%-2rem)] max-w-sm"
          >
            <div
              className={`liquid-glass-strong rounded-[1.75rem] border px-5 py-4 shadow-[0_18px_60px_rgba(15,23,42,0.18)] ${
                status.type === "success"
                  ? "border-emerald-300/50 text-emerald-950 dark:border-emerald-400/20 dark:text-emerald-100"
                  : "border-rose-300/50 text-rose-950 dark:border-rose-400/20 dark:text-rose-100"
              }`}
            >
              <p className="text-sm font-semibold">
                {status.type === "success" ? "Message sent" : "Unable to send"}
              </p>
              <p className="mt-1 text-sm opacity-85">{status.message}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit}
        className="rounded-[2rem] border border-border/60 bg-panel/80 p-6 shadow-glow backdrop-blur sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Name<span className="text-red-600 ml-1">*</span>
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-2xl border border-border/80 bg-surface/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent dark:text-white"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
              Email<span className="text-red-600 ml-1">*</span>
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-2xl border border-border/80 bg-surface/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent dark:text-white"
              required
            />
          </label>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Subject<span className="text-red-600 ml-1">*</span>
          </span>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Project idea, collaboration, or opportunity"
            className="w-full rounded-2xl border border-border/80 bg-surface/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent dark:text-white"
            required
          />
        </label>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Message<span className="text-red-600 ml-1">*</span>
          </span>
          <textarea
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about the product, timeline, and goals."
            className="w-full resize-none rounded-2xl border border-border/80 bg-surface/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent dark:text-white"
            required
          />
        </label>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-950"
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
        </div>
      </form>
    </>
  );
}
