import type { Metadata } from "next";
import { CompareBusinesses } from "@/components/dashboard/CompareBusinesses";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { listings } from "@/lib/data/listings";

export const metadata: Metadata = { title: "Compare · Investor" };

export default function InvestorComparePage() {
  return (
    <div>
      <PageHeading
        title="Compare businesses"
        description="Side-by-side financials, ROI, and trust — pick 2 to 4 listings."
      />
      <CompareBusinesses listings={listings} />
    </div>
  );
}
