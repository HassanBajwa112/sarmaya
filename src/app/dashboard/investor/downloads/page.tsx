import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/dashboard/DashboardShell";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { investorDownloads } from "@/lib/data/dashboard";
import { getListing } from "@/lib/data/listings";

export const metadata: Metadata = { title: "Downloads · Investor" };

export default function InvestorDownloadsPage() {
  return (
    <div>
      <PageHeading
        title="Download history"
        description="Activity log of document downloads — separate from your library."
      />
      {investorDownloads.length === 0 ? (
        <EmptyState
          title="No downloads yet"
          body="Downloads appear here after you unlock files."
        />
      ) : (
        <ul className="divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
          {investorDownloads.map((d) => {
            const l = getListing(d.listingSlug);
            return (
              <li key={d.id} className="flex flex-wrap justify-between gap-3 py-4 text-sm">
                <span>
                  {d.title}
                  <span className="text-muted">
                    {" "}
                    · {l?.title ?? d.listingSlug}
                  </span>
                </span>
                <span className="text-muted">
                  {new Date(d.downloadedAt).toLocaleString()}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      <Link
        href="/dashboard/investor/documents"
        className="mt-6 inline-block text-sm text-brass hover:underline"
      >
        Open documents library →
      </Link>
    </div>
  );
}
