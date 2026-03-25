"use client";

import { useState } from "react";
import { initialContactFormState } from "@/utils/helpers";

export default function ContactForm() {
  const [formData, setFormData] = useState(initialContactFormState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-border/60 bg-panel/80 p-6 shadow-glow backdrop-blur sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Name
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full rounded-2xl border border-border/80 bg-surface/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent dark:text-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-border/80 bg-surface/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent dark:text-white"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Subject
        </span>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Project idea, collaboration, or opportunity"
          className="w-full rounded-2xl border border-border/80 bg-surface/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent dark:text-white"
        />
      </label>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
          Message
        </span>
        <textarea
          name="message"
          rows="6"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about the product, timeline, and goals."
          className="w-full resize-none rounded-2xl border border-border/80 bg-surface/80 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-accent dark:text-white"
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

        {status.message ? (
          <p
            className={`text-sm ${
              status.type === "success" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
