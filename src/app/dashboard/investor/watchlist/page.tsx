import type { Metadata } from "next";
import { ListingLinkList, PageHeading } from "@/components/dashboard/ListingLinkList";
import { investorWatchlistSlugs, resolveListings } from "@/lib/data/dashboard";

export const metadata: Metadata = { title: "Watchlist · Investor" };

export default function InvestorWatchlistPage() {
  return (
    <div>
      <PageHeading
        title="Investment watchlist"
        description="Actively monitored opportunities — distinct from Saved bookmarks."
      />
      <ListingLinkList
        listings={resolveListings(investorWatchlistSlugs)}
        emptyTitle="Watchlist empty"
        emptyBody="Add listings you’re diligence-tracking."
        meta={(l) => `${l.city} · Trust ${l.trustScore} · monitoring`}
      />
    </div>
  );
}
