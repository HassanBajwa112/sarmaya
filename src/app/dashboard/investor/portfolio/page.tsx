import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/dashboard/DashboardShell";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import {
  investorPortfolio,
  portfolioStatusLabel,
} from "@/lib/data/dashboard";
import { formatPkrCr, getListing } from "@/lib/data/listings";

export const metadata: Metadata = { title: "Portfolio · Investor" };

export default function InvestorPortfolioPage() {
  return (
    <div>
      <PageHeading
        title="Portfolio"
        description="Closed and in-progress deals. Status is off-platform tracking only — Sarmaya does not custody funds."
      />
      {investorPortfolio.length === 0 ? (
        <EmptyState
          title="No portfolio items"
          body="When you progress intros or close off-platform, they appear here."
          actionHref="/browse"
          actionLabel="Find listings"
        />
      ) : (
        <ul className="divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
          {investorPortfolio.map((item) => {
            const l = getListing(item.listingSlug);
            if (!l) return null;
            return (
              <li
                key={item.listingSlug}
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
                    {portfolioStatusLabel(item.status)}
                    {item.committedPkrCr > 0
                      ? ` · ${formatPkrCr(item.committedPkrCr)} committed`
                      : ""}
                  </p>
                </div>
                <span className="text-xs tracking-widest text-brass uppercase">
                  {portfolioStatusLabel(item.status)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
