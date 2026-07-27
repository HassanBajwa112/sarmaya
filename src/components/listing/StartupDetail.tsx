"use client";

import { useState } from "react";
import type { Listing } from "@/lib/data/listings";
import { formatPkrCr } from "@/lib/data/listings";
import { FinancialTrendChart } from "./FinancialTrendChart";

const TABS = [
  { id: "pitch", label: "Pitch" },
  { id: "market", label: "Market" },
  { id: "team", label: "Team" },
  { id: "traction", label: "Traction" },
  { id: "roadmap", label: "Roadmap" },
  { id: "financials", label: "Financials" },
  { id: "qa", label: "Q&A" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function StartupDetail({ listing }: { listing: Listing }) {
  const [tab, setTab] = useState<TabId>("pitch");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Startup sections"
        className="flex flex-wrap gap-1 border-b border-[var(--line-dark)]"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-sm transition ${
              tab === t.id
                ? "border-b-2 border-brass text-ink"
                : "text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="pt-8" role="tabpanel">
        {tab === "pitch" && <Pitch listing={listing} />}
        {tab === "market" && (
          <Section title="Market" body={listing.market ?? "—"} />
        )}
        {tab === "team" && <Team listing={listing} />}
        {tab === "traction" && <Traction listing={listing} />}
        {tab === "roadmap" && <Roadmap listing={listing} />}
        {tab === "financials" && <Financials listing={listing} />}
        {tab === "qa" && <QA listing={listing} />}
      </div>
    </div>
  );
}

function Pitch({ listing }: { listing: Listing }) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-display text-2xl font-semibold">The opportunity</h2>
        <p className="mt-4 text-base leading-relaxed text-ink/70">
          {listing.longPitch}
        </p>
      </div>
      <Section title="Problem" body={listing.problem ?? "—"} />
      <Section title="Solution" body={listing.solution ?? "—"} />
      {listing.diasporaNote && (
        <div className="border-l-2 border-brass pl-5">
          <p className="text-xs tracking-widest text-brass uppercase">
            Diaspora note
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            {listing.diasporaNote}
          </p>
        </div>
      )}
      {listing.demoUrl && (
        <div>
          <p className="text-xs tracking-widest text-muted uppercase">Demo</p>
          <a
            href={listing.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-brass hover:underline"
          >
            Open product demo →
          </a>
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-3">
        {listing.highlightMetrics.map((m) => (
          <div key={m.label} className="border-t border-[var(--line-dark)] pt-4">
            <p className="text-xs tracking-widest text-muted uppercase">{m.label}</p>
            <p className="font-display mt-2 text-2xl font-semibold">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Team({ listing }: { listing: Listing }) {
  const team = listing.team ?? [];
  if (!team.length) {
    return <p className="text-sm text-muted">Team details coming soon.</p>;
  }
  return (
    <ul className="space-y-6">
      {team.map((m) => (
        <li key={m.name} className="border-t border-[var(--line-dark)] pt-4">
          <p className="font-display text-lg font-semibold">{m.name}</p>
          <p className="text-sm text-brass">{m.role}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">{m.bio}</p>
          {m.linkedin && (
            <a
              href={m.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs text-brass hover:underline"
            >
              LinkedIn →
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

function Traction({ listing }: { listing: Listing }) {
  return (
    <div className="space-y-8">
      <p className="text-base leading-relaxed text-ink/70">
        {listing.traction ?? "—"}
      </p>
      {listing.milestones && listing.milestones.length > 0 && (
        <ul className="space-y-3">
          {listing.milestones.map((m) => (
            <li
              key={m.label}
              className="flex items-start gap-3 border-t border-[var(--line-dark)] pt-3 text-sm"
            >
              <span
                className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                  m.done ? "bg-brass" : "bg-stone-muted"
                }`}
              />
              <span>
                <span className="font-medium text-ink">{m.label}</span>
                <span className="text-muted"> · {m.timing}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Roadmap({ listing }: { listing: Listing }) {
  const items = listing.roadmap ?? [];
  if (!items.length) {
    return <p className="text-sm text-muted">Roadmap not published yet.</p>;
  }
  return (
    <ol className="space-y-4">
      {items.map((item, i) => (
        <li
          key={`${item.label}-${i}`}
          className="flex gap-4 border-t border-[var(--line-dark)] pt-4"
        >
          <span className="font-display text-2xl font-semibold text-brass/50">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-medium text-ink">
              {item.label}
              {item.done ? (
                <span className="ml-2 text-xs text-brass">Done</span>
              ) : null}
            </p>
            <p className="mt-1 text-sm text-muted">{item.timing}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Financials({ listing }: { listing: Listing }) {
  return (
    <div className="space-y-10">
      <div className="grid gap-6 sm:grid-cols-3">
        <Stat label="Revenue / ARR" value={formatPkrCr(listing.revenuePkrCr)} />
        <Stat label="Profit / burn" value={formatPkrCr(listing.profitPkrCr)} />
        <Stat label="Ask" value={formatPkrCr(listing.askAmountPkrCr)} />
      </div>
      <div className="border border-[var(--line-dark)] bg-white p-4 sm:p-6">
        <FinancialTrendChart data={listing.financials} />
      </div>
      <p className="text-sm leading-relaxed text-ink/70">{listing.ownerStory}</p>
      <div className="space-y-6">
        <RiskLine title="Market risk" body={listing.risk.market} />
        <RiskLine title="Financial risk" body={listing.risk.financial} />
        <RiskLine title="Operational risk" body={listing.risk.operational} />
      </div>
    </div>
  );
}

function QA({ listing }: { listing: Listing }) {
  if (!listing.qa.length) {
    return (
      <p className="text-sm text-muted">
        No public Q&amp;A yet. Message the founder to ask a question.
      </p>
    );
  }
  return (
    <ul className="space-y-6">
      {listing.qa.map((item, i) => (
        <li key={i} className="border-t border-[var(--line-dark)] pt-4">
          <p className="font-medium text-ink">{item.question}</p>
          <p className="mt-1 text-xs text-muted">Asked by {item.askedBy}</p>
          {item.answer ? (
            <p className="mt-3 text-sm leading-relaxed text-ink/70">{item.answer}</p>
          ) : (
            <p className="mt-3 text-sm italic text-muted">Awaiting founder reply</p>
          )}
        </li>
      ))}
    </ul>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-t border-[var(--line-dark)] pt-4">
      <h3 className="text-xs tracking-widest text-brass uppercase">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-ink/70">{body}</p>
    </div>
  );
}

function RiskLine({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-t border-[var(--line-dark)] pt-4">
      <h3 className="text-xs tracking-widest text-muted uppercase">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/70">{body}</p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-[var(--line-dark)] pt-4">
      <p className="text-xs tracking-widest text-muted uppercase">{label}</p>
      <p className="font-display mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
