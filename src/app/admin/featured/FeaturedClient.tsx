"use client";

import { useState } from "react";
import Link from "next/link";
import { listings } from "@/lib/data/listings";

export default function AdminFeaturedClient() {
  const [featured, setFeatured] = useState(() =>
    Object.fromEntries(listings.map((l) => [l.slug, l.featured])),
  );

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-stone">
        Featured listings
      </h1>
      <p className="mt-2 text-sm text-stone/55">
        Toggle featured placement. Demo only — does not mutate seed permanently.
      </p>
      <div className="mt-4 border border-dashed border-brass/30 px-3 py-2 text-xs text-stone/50">
        Pending payment integration for paid featured upsells.
      </div>
      <ul className="mt-8 divide-y divide-stone/10 border-y border-stone/10">
        {listings.map((l) => (
          <li
            key={l.slug}
            className="flex flex-wrap items-center justify-between gap-3 py-4"
          >
            <div>
              <Link
                href={`/listings/${l.slug}`}
                className="font-medium text-stone hover:text-brass"
              >
                {l.title}
              </Link>
              <p className="text-sm text-stone/50">
                {l.city} · {l.category}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFeatured((f) => ({ ...f, [l.slug]: !f[l.slug] }))
              }
              className={`px-3 py-1.5 text-xs tracking-wide ${
                featured[l.slug]
                  ? "bg-brass text-ink"
                  : "border border-stone/20 text-stone/70"
              }`}
            >
              {featured[l.slug] ? "Featured" : "Standard"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
