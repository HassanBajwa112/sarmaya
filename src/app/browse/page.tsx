"use client";

import { useMemo, useState } from "react";
import { ListingRow } from "@/components/ListingRow";
import { CATEGORIES, filterListings } from "@/lib/data/listings";

export default function BrowsePage() {
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [q, setQ] = useState("");

  const results = useMemo(
    () => filterListings({ category, type, q }),
    [category, type, q],
  );

  return (
    <div className="min-h-screen bg-stone text-ink">
      <div className="border-b border-[var(--line-dark)] bg-ink text-stone">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
            Marketplace
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Browse listings
          </h1>
          <p className="mt-4 max-w-xl text-stone/60">
            Growth opportunities across Pakistan — filter by category, stage type, or
            search.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-4 border-b border-[var(--line-dark)] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <FilterChip active={category === "All"} onClick={() => setCategory("All")}>
              All
            </FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c}
                active={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </FilterChip>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-[var(--line-dark)] bg-white px-3 py-2 text-sm outline-none focus:border-brass"
            >
              <option value="All">All types</option>
              <option value="existing">Existing business</option>
              <option value="startup">Startup pitch</option>
            </select>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="min-w-[180px] border border-[var(--line-dark)] bg-white px-3 py-2 text-sm outline-none focus:border-brass"
            />
          </div>
        </div>

        <p className="mt-6 text-sm text-muted">
          {results.length} listing{results.length === 1 ? "" : "s"}
        </p>

        <div className="mt-2">
          {results.map((l, i) => (
            <ListingRow key={l.slug} listing={l} index={i} />
          ))}
          {results.length === 0 && (
            <p className="py-16 text-center text-muted">No listings match these filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterChip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-xs tracking-wide transition ${
        active
          ? "bg-ink text-stone"
          : "border border-[var(--line-dark)] text-ink/70 hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}
