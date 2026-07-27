"use client";

import { useState } from "react";
import Link from "next/link";
import { DemoContactForm } from "@/components/forms/DemoContactForm";

const TOPICS = [
  { id: "investor", label: "Investor" },
  { id: "founder", label: "Founder" },
  { id: "partnerships", label: "Strategic partnerships" },
  { id: "media", label: "Media" },
  { id: "support", label: "Support" },
] as const;

export function ContactClient() {
  const [topic, setTopic] = useState<(typeof TOPICS)[number]["id"]>("investor");

  return (
    <div className="min-h-screen bg-stone text-ink">
      <div className="border-b border-[var(--line-dark)] bg-ink text-stone">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
            Contact
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Talk to Sarmaya
          </h1>
          <p className="mt-4 max-w-xl text-stone/60">
            Route-specific forms for investors, founders, partners, media, and
            support. Demo submit only.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-xs tracking-widest text-muted uppercase">Topic</p>
          <div className="mt-3 flex flex-col gap-2">
            {TOPICS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTopic(t.id)}
                className={`px-4 py-3 text-left text-sm transition ${
                  topic === t.id
                    ? "bg-ink text-stone"
                    : "border border-[var(--line-dark)] text-ink/70 hover:border-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold">
            {TOPICS.find((t) => t.id === topic)?.label} contact
          </h2>
          <p className="mt-2 text-sm text-muted">
            We do not custody funds or provide financial advice via this form.
          </p>
          <div className="mt-6" key={topic}>
            <DemoContactForm topic={topic} />
          </div>

          <section className="mt-14 border-t border-[var(--line-dark)] pt-10">
            <h3 className="font-display text-xl font-semibold">Demo booking</h3>
            <p className="mt-2 text-sm text-ink/70">
              Prefer a live walkthrough? Use the placeholder scheduler link —
              replace with Calendly in production.
            </p>
            <a
              href="https://calendly.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex bg-brass px-5 py-3 text-sm font-medium text-ink hover:bg-brass-bright"
            >
              Open scheduler placeholder →
            </a>
            <p className="mt-3 text-xs text-muted">
              External link stub — not an embedded iframe.
            </p>
          </section>

          <Link
            href="/partner"
            className="mt-10 inline-block text-sm text-brass hover:underline"
          >
            Looking to partner? See the partner page →
          </Link>
        </div>
      </div>
    </div>
  );
}
