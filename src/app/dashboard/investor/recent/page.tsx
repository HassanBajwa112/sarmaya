import type { Metadata } from "next";
import { ListingLinkList, PageHeading } from "@/components/dashboard/ListingLinkList";
import { investorRecentSlugs, resolveListings } from "@/lib/data/dashboard";

export const metadata: Metadata = { title: "Recently viewed · Investor" };

export default function InvestorRecentPage() {
  return (
    <div>
      <PageHeading title="Recently viewed" description="Your latest listing visits." />
      <ListingLinkList
        listings={resolveListings(investorRecentSlugs)}
        emptyTitle="No recent views"
        emptyBody="Browse the marketplace to populate this list."
      />
    </div>
  );
}
