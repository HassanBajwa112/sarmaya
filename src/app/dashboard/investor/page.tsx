import type { Metadata } from "next";
import Link from "next/link";
import { StatGrid } from "@/components/dashboard/DashboardShell";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import {
  DEMO_INVESTOR_PREFS,
  rankListingsForInvestor,
} from "@/lib/data/ai-insights";
import {
  investorAnalytics,
  investorNotifications,
  investorPortfolio,
  investorSavedSlugs,
  investorWatchlistSlugs,
  messages,
} from "@/lib/data/dashboard";
import { getListing } from "@/lib/data/listings";

export const metadata: Metadata = { title: "Investor dashboard" };

export default function InvestorOverviewPage() {
  const matches = rankListingsForInvestor(DEMO_INVESTOR_PREFS).filter(
    (m) => m.score >= 50,
  );
  const unread = messages.filter((m) => m.role === "investor" && m.unread).length;
  const unreadNotifs = investorNotifications.filter((n) => !n.read).length;

  return (
    <div>
      <PageHeading
        title="Overview"
        description="Your diligence workspace. Deals close off-platform."
      />
      <StatGrid
        items={[
          { label: "Portfolio", value: String(investorPortfolio.length) },
          { label: "Saved", value: String(investorSavedSlugs.length) },
          { label: "Watchlist", value: String(investorWatchlistSlugs.length) },
          { label: "Unread", value: String(unread + unreadNotifs) },
        ]}
      />

      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h3 className="font-display text-xl font-semibold">Top AI matches</h3>
          <Link
            href="/dashboard/investor/recommendations"
            className="text-sm text-brass hover:underline"
          >
            View all →
          </Link>
        </div>
        <ul className="mt-4 divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
          {matches.slice(0, 3).map((m) => {
            const l = getListing(m.slug);
            if (!l) return null;
            return (
              <li
                key={m.slug}
                className="flex items-center justify-between gap-3 py-4"
              >
                <Link
                  href={`/listings/${l.slug}/ai`}
                  className="font-medium hover:text-brass"
                >
                  {l.title}
                </Link>
                <span className="text-brass">{m.score}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/dashboard/investor/compare", label: "Compare businesses" },
          { href: "/dashboard/investor/meetings", label: "Meeting requests" },
          { href: "/dashboard/investor/preferences", label: "Edit preferences" },
          { href: "/dashboard/investor/messages", label: "Messages" },
          { href: "/dashboard/investor/analytics", label: "Your analytics" },
          { href: "/browse", label: "Browse marketplace" },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="border border-[var(--line-dark)] bg-white px-5 py-4 text-sm font-medium transition hover:border-brass/50"
          >
            {c.label} →
          </Link>
        ))}
      </section>

      <p className="mt-10 text-xs text-muted">
        Activity snapshot · {investorAnalytics.listingsViewed} views this period
        (seed).
      </p>
    </div>
  );
}
