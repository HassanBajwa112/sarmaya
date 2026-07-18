"use client";

import { useState } from "react";

const demoThread = [
  {
    from: "investor" as const,
    name: "You",
    body: "Interested in learning more about unit economics and how diaspora capital would be used in the first 12 months.",
  },
  {
    from: "founder" as const,
    name: "Founder",
    body: "Happy to share. We can schedule an intro call — Sarmaya connects you; the deal closes off-platform.",
  },
];

export function MessageShell({ listingTitle }: { listingTitle: string }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="border border-[var(--line-dark)] bg-stone">
      <div className="flex items-center justify-between border-b border-[var(--line-dark)] px-5 py-4">
        <div>
          <p className="font-display text-lg font-semibold text-ink">Message founder</p>
          <p className="text-sm text-muted">Demo shell — messages are not sent yet.</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="bg-ink px-4 py-2 text-sm text-stone transition hover:bg-ink-soft"
        >
          {open ? "Collapse" : "Open thread"}
        </button>
      </div>

      {open && (
        <div className="px-5 py-5">
          <p className="mb-4 text-xs tracking-widest text-muted uppercase">
            Re: {listingTitle}
          </p>
          <ul className="space-y-4">
            {demoThread.map((m, i) => (
              <li
                key={i}
                className={`max-w-md rounded-sm px-4 py-3 text-sm leading-relaxed ${
                  m.from === "investor"
                    ? "ml-auto bg-ink text-stone"
                    : "bg-stone-muted text-ink"
                }`}
              >
                <p className="mb-1 text-xs opacity-60">{m.name}</p>
                {m.body}
              </li>
            ))}
            {sent && (
              <li className="ml-auto max-w-md rounded-sm bg-brass/20 px-4 py-3 text-sm text-ink">
                <p className="mb-1 text-xs text-muted">You · preview</p>
                {draft || "Thanks — looking forward to the intro."}
              </li>
            )}
          </ul>
          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a message…"
              className="flex-1 border border-[var(--line-dark)] bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brass"
            />
            <button
              type="submit"
              className="bg-brass px-5 py-3 text-sm font-medium text-ink hover:bg-brass-bright"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
