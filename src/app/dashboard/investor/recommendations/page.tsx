import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/dashboard/DashboardShell";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import {
  DEMO_INVESTOR_PREFS,
  rankListingsForInvestor,
} from "@/lib/data/ai-insights";
import { getListing } from "@/lib/data/listings";

export const metadata: Metadata = { title: "AI recommendations · Investor" };

export default function InvestorRecommendationsPage() {
  const matches = rankListingsForInvestor(DEMO_INVESTOR_PREFS);

  return (
    <div>
      <PageHeading
        title="AI recommendations"
        description="Ranked by fit against your investment preferences."
      />
      {matches.length === 0 ? (
        <EmptyState
          title="No matches"
          body="Widen preferences to see recommendations."
          actionHref="/dashboard/investor/preferences"
          actionLabel="Edit preferences"
        />
      ) : (
        <ul className="divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
          {matches.map((m) => {
            const l = getListing(m.slug);
            if (!l) return null;
            return (
              <li
                key={m.slug}
                className="flex flex-wrap items-center justify-between gap-3 py-5"
              >
                <div>
                  <Link
                    href={`/listings/${l.slug}/ai`}
                    className="font-display text-lg font-semibold hover:text-brass"
                  >
                    {l.title}
                  </Link>
                  <p className="text-sm text-muted">
                    {m.reasons.slice(0, 2).join(" · ")}
                  </p>
                </div>
                <span className="font-display text-2xl font-semibold text-brass">
                  {m.score}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
