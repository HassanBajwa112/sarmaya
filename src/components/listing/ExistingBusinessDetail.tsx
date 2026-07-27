"use client";

import { useState } from "react";
import type { Listing } from "@/lib/data/listings";
import { formatPkrCr } from "@/lib/data/listings";
import { FinancialTrendChart } from "./FinancialTrendChart";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "financials", label: "Financials" },
  { id: "risk", label: "Risk" },
  { id: "story", label: "Owner story" },
  { id: "qa", label: "Q&A" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ExistingBusinessDetail({ listing }: { listing: Listing }) {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <div>
      <div
        role="tablist"
        aria-label="Listing sections"
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
        {tab === "overview" && <Overview listing={listing} />}
        {tab === "financials" && <Financials listing={listing} />}
        {tab === "risk" && <Risk listing={listing} />}
        {tab === "story" && (
          <p className="max-w-2xl text-base leading-relaxed text-ink/70">
            {listing.ownerStory}
          </p>
        )}
        {tab === "qa" && <QA listing={listing} />}
      </div>
    </div>
  );
}

function Overview({ listing }: { listing: Listing }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold">The opportunity</h2>
      <p className="mt-4 text-base leading-relaxed text-ink/70">{listing.longPitch}</p>
      {listing.diasporaNote && (
        <div className="mt-8 border-l-2 border-brass pl-5">
          <p className="text-xs tracking-widest text-brass uppercase">
            Diaspora note
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            {listing.diasporaNote}
          </p>
        </div>
      )}
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
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

function Financials({ listing }: { listing: Listing }) {
  return (
    <div className="space-y-10">
      <div className="grid gap-6 sm:grid-cols-3">
        <Stat label="Revenue" value={formatPkrCr(listing.revenuePkrCr)} />
        <Stat label="Profit" value={formatPkrCr(listing.profitPkrCr)} />
        <Stat label="Ask" value={formatPkrCr(listing.askAmountPkrCr)} />
      </div>

      <div>
        <h3 className="font-display text-lg font-semibold">
          Revenue &amp; profit trend
        </h3>
        <p className="mt-1 text-sm text-muted">Seed figures in PKR crore.</p>
        <div className="mt-6 border border-[var(--line-dark)] bg-white p-4 sm:p-6">
          <FinancialTrendChart data={listing.financials} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--line-dark)] text-xs tracking-widest text-muted uppercase">
              <th className="py-3 pr-4 font-normal">Year</th>
              <th className="py-3 pr-4 font-normal">Revenue</th>
              <th className="py-3 pr-4 font-normal">Expenses</th>
              <th className="py-3 font-normal">Profit</th>
            </tr>
          </thead>
          <tbody>
            {listing.financials.map((row) => (
              <tr key={row.year} className="border-b border-[var(--line-dark)]">
                <td className="py-3 pr-4 font-medium">{row.year}</td>
                <td className="py-3 pr-4">{formatPkrCr(row.revenuePkrCr)}</td>
                <td className="py-3 pr-4">{formatPkrCr(row.expensesPkrCr)}</td>
                <td className="py-3">{formatPkrCr(row.profitPkrCr)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Risk({ listing }: { listing: Listing }) {
  return (
    <div className="space-y-8">
      <RiskBlock title="Market" body={listing.risk.market} />
      <RiskBlock title="Financial" body={listing.risk.financial} />
      <RiskBlock title="Operational" body={listing.risk.operational} />
    </div>
  );
}

function RiskBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-t border-[var(--line-dark)] pt-4">
      <h3 className="text-xs tracking-widest text-brass uppercase">{title}</h3>
      <p className="mt-2 text-base leading-relaxed text-ink/70">{body}</p>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-[var(--line-dark)] pt-4">
      <p className="text-xs tracking-widest text-muted uppercase">{label}</p>
      <p className="font-display mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
