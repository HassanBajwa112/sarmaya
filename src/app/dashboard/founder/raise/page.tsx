import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { founderListings } from "@/lib/data/dashboard";
import { formatPkrCr, fundingProgress } from "@/lib/data/listings";

export const metadata: Metadata = { title: "Raise progress · Founder" };

export default function FounderRaisePage() {
  const mine = founderListings();

  return (
    <div>
      <PageHeading
        title="Raise progress"
        description="Ask vs raised. Deadlines are optional — none set in seed."
      />
      <div className="space-y-6">
        {mine.map((l) => {
          const pct = fundingProgress(l);
          return (
            <div
              key={l.slug}
              className="border border-[var(--line-dark)] bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link
                    href={`/listings/${l.slug}`}
                    className="font-display text-lg font-semibold hover:text-brass"
                  >
                    {l.title}
                  </Link>
                  <p className="mt-1 text-sm text-muted">
                    {formatPkrCr(l.raisedPkrCr)} of {formatPkrCr(l.askAmountPkrCr)}
                  </p>
                </div>
                <span className="font-display text-2xl font-semibold text-brass">
                  {pct}%
                </span>
              </div>
              <div className="mt-4 h-2 overflow-hidden bg-stone-muted">
                <div className="h-full bg-brass" style={{ width: `${pct}%` }} />
              </div>
              <p className="mt-3 text-xs text-muted">
                No hard deadline on this raise · capital closes off-platform
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
