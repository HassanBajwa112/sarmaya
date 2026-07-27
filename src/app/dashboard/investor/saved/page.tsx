import type { Metadata } from "next";
import { ListingLinkList, PageHeading } from "@/components/dashboard/ListingLinkList";
import { investorSavedSlugs, resolveListings } from "@/lib/data/dashboard";

export const metadata: Metadata = { title: "Saved · Investor" };

export default function InvestorSavedPage() {
  return (
    <div>
      <PageHeading title="Saved businesses" description="Bookmarks for later review." />
      <ListingLinkList
        listings={resolveListings(investorSavedSlugs)}
        emptyTitle="Nothing saved yet"
        emptyBody="Save listings from Browse to build this list."
      />
    </div>
  );
}
