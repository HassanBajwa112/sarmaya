import type { Metadata } from "next";
import { StatGrid } from "@/components/dashboard/DashboardShell";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { investorAnalytics } from "@/lib/data/dashboard";

export const metadata: Metadata = { title: "Analytics · Investor" };

export default function InvestorAnalyticsPage() {
  return (
    <div>
      <PageHeading
        title="Your analytics"
        description="Personal activity on Sarmaya — not site-wide metrics."
      />
      <StatGrid
        items={[
          { label: "Listings viewed", value: String(investorAnalytics.listingsViewed) },
          { label: "Saved", value: String(investorAnalytics.saved) },
          { label: "Messaged", value: String(investorAnalytics.messaged) },
          {
            label: "Meetings requested",
            value: String(investorAnalytics.meetingsRequested),
          },
        ]}
      />
      <p className="mt-8 text-sm text-muted">
        Compares run · {investorAnalytics.comparesRun} (seed period).
      </p>
    </div>
  );
}
