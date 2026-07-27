import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/dashboard/DashboardShell";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { founderInterest } from "@/lib/data/dashboard";
import { getListing } from "@/lib/data/listings";

export const metadata: Metadata = { title: "Investor interest · Founder" };

export default function FounderInterestPage() {
  return (
    <div>
      <PageHeading
        title="Investor interest"
        description="Investors who saved, messaged, or requested meetings. Profiles are privacy-limited."
      />
      {founderInterest.length === 0 ? (
        <EmptyState
          title="No interest yet"
          body="Activity appears as investors engage with your listings."
        />
      ) : (
        <ul className="divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
          {founderInterest.map((i) => {
            const l = getListing(i.listingSlug);
            return (
              <li
                key={i.id}
                className="flex flex-wrap items-center justify-between gap-3 py-5"
              >
                <div>
                  <p className="font-medium">{i.investorName}</p>
                  <p className="text-sm text-muted">
                    {i.location} · {i.action} ·{" "}
                    {l ? (
                      <Link
                        href={`/listings/${l.slug}`}
                        className="text-brass hover:underline"
                      >
                        {l.title}
                      </Link>
                    ) : (
                      i.listingSlug
                    )}
                  </p>
                </div>
                <span className="text-xs text-muted">
                  {new Date(i.at).toLocaleDateString()}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
