import type { Metadata } from "next";
import Link from "next/link";
import { listings } from "@/lib/data/listings";
import { getAiInsights } from "@/lib/data/ai-insights";

export const metadata: Metadata = { title: "Admin · Fraud reports" };

export default function AdminFraudPage() {
  const flagged = listings
    .map((l) => {
      const ai = getAiInsights(l.slug);
      return {
        listing: l,
        flags: ai?.fraudFlags ?? [],
      };
    })
    .filter((row) => row.flags.length > 0);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-stone">
        Fraud reports
      </h1>
      <p className="mt-2 text-sm text-stone/55">
        AI inconsistency flags plus room for manual reports. Not shown on public
        listings.
      </p>

      <ul className="mt-10 space-y-6">
        {flagged.map(({ listing, flags }) => (
          <li
            key={listing.slug}
            className="border border-stone/15 bg-stone p-5 text-ink"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href={`/listings/${listing.slug}`}
                className="font-display text-lg font-semibold hover:text-brass"
              >
                {listing.title}
              </Link>
              <span className="text-xs text-muted">
                {flags.length} flag{flags.length === 1 ? "" : "s"}
              </span>
            </div>
            <ul className="mt-4 space-y-3">
              {flags.map((f) => (
                <li
                  key={f.code}
                  className="border-t border-[var(--line-dark)] pt-3 text-sm"
                >
                  <span
                    className={`text-[10px] tracking-widest uppercase ${
                      f.severity === "high" ? "text-brass" : "text-muted"
                    }`}
                  >
                    {f.severity} · {f.code}
                  </span>
                  <p className="mt-1 text-ink/70">{f.detail}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
        {flagged.length === 0 && (
          <li className="py-16 text-center text-stone/50">
            No fraud flags in current seed.
          </li>
        )}
      </ul>
    </div>
  );
}
