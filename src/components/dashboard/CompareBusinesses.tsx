"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Listing } from "@/lib/data/listings";
import {
  formatPkrCr,
  fundingProgress,
  investmentTermsLabel,
} from "@/lib/data/listings";

export function CompareBusinesses({ listings }: { listings: Listing[] }) {
  const [selected, setSelected] = useState<string[]>(() =>
    listings.slice(0, 2).map((l) => l.slug),
  );

  const chosen = useMemo(
    () => listings.filter((l) => selected.includes(l.slug)).slice(0, 4),
    [listings, selected],
  );

  const toggle = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 4) return prev;
      return [...prev, slug];
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-muted">Select 2–4 listings to compare.</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {listings.map((l) => (
            <li key={l.slug}>
              <label className="flex cursor-pointer items-center gap-2 border border-[var(--line-dark)] bg-white px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={selected.includes(l.slug)}
                  onChange={() => toggle(l.slug)}
                  className="accent-[var(--brass,#c4a35a)]"
                />
                <span className="min-w-0 truncate">{l.title}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {chosen.length < 2 ? (
        <p className="text-sm text-muted">Pick at least two listings.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--line-dark)] text-xs tracking-widest text-muted uppercase">
                <th className="py-3 pr-4 font-normal">Metric</th>
                {chosen.map((l) => (
                  <th key={l.slug} className="py-3 pr-4 font-normal">
                    <Link href={`/listings/${l.slug}`} className="text-brass hover:underline">
                      {l.title}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Type", (l: Listing) => (l.type === "startup" ? "Startup" : "Existing")],
                  ["Industry", (l: Listing) => l.category],
                  ["City", (l: Listing) => l.city],
                  ["Ask", (l: Listing) => formatPkrCr(l.askAmountPkrCr)],
                  ["Terms", (l: Listing) => investmentTermsLabel(l)],
                  ["Revenue", (l: Listing) => formatPkrCr(l.revenuePkrCr)],
                  ["Profit", (l: Listing) => formatPkrCr(l.profitPkrCr)],
                  ["Expected ROI", (l: Listing) => l.expectedRoi],
                  ["Trust", (l: Listing) => String(l.trustScore)],
                  ["Funded", (l: Listing) => `${fundingProgress(l)}%`],
                  ["Employees", (l: Listing) => String(l.employees)],
                ] as const
              ).map(([label, fn]) => (
                <tr key={label} className="border-b border-[var(--line-dark)]">
                  <td className="py-3 pr-4 font-medium text-ink">{label}</td>
                  {chosen.map((l) => (
                    <td key={l.slug} className="py-3 pr-4 text-ink/70">
                      {fn(l)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
