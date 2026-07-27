import type { Metadata } from "next";
import Link from "next/link";
import { listings } from "@/lib/data/listings";
import { getAiInsights } from "@/lib/data/ai-insights";

export const metadata: Metadata = { title: "Admin · AI fraud flags" };

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
    <div className="min-h-screen bg-stone text-ink">
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <Link
          href="/admin/verification"
          className="text-xs tracking-widest text-brass uppercase hover:underline"
        >
          ← Verification queue
        </Link>
        <p className="mt-6 text-xs tracking-widest text-brass uppercase">
          Internal · Admin only
        </p>
        <h1 className="font-display mt-2 text-4xl font-bold">
          AI fraud detection
        </h1>
        <p className="mt-2 text-ink/60">
          Inconsistency flags for reviewer triage. Not shown on public listings.
        </p>

        <ul className="mt-12 space-y-6">
          {flagged.map(({ listing, flags }) => (
            <li
              key={listing.slug}
              className="border border-[var(--line-dark)] bg-white p-5"
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
                        f.severity === "high"
                          ? "text-brass"
                          : "text-muted"
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
            <li className="py-16 text-center text-muted">
              No fraud flags in current seed.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
