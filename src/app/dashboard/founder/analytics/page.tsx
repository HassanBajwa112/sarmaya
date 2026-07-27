import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import {
  founderAnalyticsBySlug,
  founderListings,
} from "@/lib/data/dashboard";

export const metadata: Metadata = { title: "Analytics · Founder" };

export default function FounderAnalyticsPage() {
  const mine = founderListings();

  return (
    <div>
      <PageHeading
        title="Listing analytics"
        description="Views, saves, questions, and messages per listing (seed)."
      />
      <div className="space-y-6">
        {mine.map((l) => {
          const a = founderAnalyticsBySlug[l.slug] ?? {
            views: 0,
            saves: 0,
            questions: 0,
            messages: 0,
          };
          return (
            <div
              key={l.slug}
              className="border border-[var(--line-dark)] bg-white p-5"
            >
              <Link
                href={`/listings/${l.slug}`}
                className="font-display text-lg font-semibold hover:text-brass"
              >
                {l.title}
              </Link>
              <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {(
                  [
                    ["Views", a.views],
                    ["Saves", a.saves],
                    ["Questions", a.questions],
                    ["Messages", a.messages],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs tracking-widest text-muted uppercase">
                      {label}
                    </dt>
                    <dd className="font-display mt-1 text-2xl font-semibold">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>
    </div>
  );
}
