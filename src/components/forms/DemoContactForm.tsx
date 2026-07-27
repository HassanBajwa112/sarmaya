"use client";

import { useState } from "react";

export function DemoContactForm({
  topic,
  fields,
}: {
  topic: string;
  fields?: { name: string; label: string; type?: string }[];
}) {
  const [sent, setSent] = useState(false);
  const defaults = fields ?? [
    { name: "name", label: "Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "message", label: "Message" },
  ];

  if (sent) {
    return (
      <p className="border border-brass/30 bg-brass/10 px-4 py-3 text-sm text-ink">
        Thanks — {topic} request recorded for this demo. Nothing was emailed.
      </p>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {defaults.map((f) =>
        f.name === "message" ? (
          <label key={f.name} className="block text-sm">
            <span className="text-xs tracking-widest text-muted uppercase">
              {f.label}
            </span>
            <textarea
              name={f.name}
              required
              rows={4}
              className="mt-2 w-full border border-[var(--line-dark)] bg-white px-3 py-2 outline-none focus:border-brass"
            />
          </label>
        ) : (
          <label key={f.name} className="block text-sm">
            <span className="text-xs tracking-widest text-muted uppercase">
              {f.label}
            </span>
            <input
              name={f.name}
              type={f.type ?? "text"}
              required
              className="mt-2 w-full border border-[var(--line-dark)] bg-white px-3 py-2 outline-none focus:border-brass"
            />
          </label>
        ),
      )}
      <button
        type="submit"
        className="bg-ink px-5 py-3 text-sm text-stone hover:bg-ink-soft"
      >
        Send
      </button>
    </form>
  );
}

export function PartnerMeetingForm() {
  return (
    <DemoContactForm
      topic="partner meeting"
      fields={[
        { name: "name", label: "Name" },
        { name: "email", label: "Email", type: "email" },
        { name: "org", label: "Organization" },
        { name: "message", label: "Why partner / agenda" },
      ]}
    />
  );
}
