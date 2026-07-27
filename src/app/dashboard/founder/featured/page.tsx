"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { founderListings } from "@/lib/data/dashboard";

export default function FounderFeaturedPage() {
  const mine = founderListings();
  const [featured, setFeatured] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(mine.map((l) => [l.slug, l.featured])),
  );

  return (
    <div>
      <PageHeading
        title="Featured listing"
        description="Upsell toggle for Browse / homepage placement."
      />
      <div className="mb-6 border border-dashed border-[var(--line-dark)] px-4 py-3 text-sm text-muted">
        Pending payment integration — toggles are demo-only and do not change
        production featured flags.
      </div>
      <ul className="divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
        {mine.map((l) => (
          <li
            key={l.slug}
            className="flex flex-wrap items-center justify-between gap-3 py-5"
          >
            <div>
              <Link
                href={`/listings/${l.slug}`}
                className="font-display text-lg font-semibold hover:text-brass"
              >
                {l.title}
              </Link>
              <p className="text-sm text-muted">
                {featured[l.slug] ? "Would be featured" : "Standard placement"}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFeatured((f) => ({ ...f, [l.slug]: !f[l.slug] }))
              }
              className={`px-4 py-2 text-sm ${
                featured[l.slug]
                  ? "bg-brass text-ink"
                  : "border border-[var(--line-dark)]"
              }`}
            >
              {featured[l.slug] ? "Featured on" : "Enable featured"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
