import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/dashboard/DashboardShell";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { investorDownloads } from "@/lib/data/dashboard";
import { getListing } from "@/lib/data/listings";

export const metadata: Metadata = { title: "Documents · Investor" };

export default function InvestorDocumentsPage() {
  const docs = investorDownloads;

  return (
    <div>
      <PageHeading
        title="Documents library"
        description="Pitch decks and financial packs you’ve unlocked (demo)."
      />
      {docs.length === 0 ? (
        <EmptyState
          title="No documents"
          body="Unlock docs from listing pages after sign-in."
          actionHref="/auth"
          actionLabel="Sign in"
        />
      ) : (
        <ul className="divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
          {docs.map((d) => {
            const l = getListing(d.listingSlug);
            return (
              <li
                key={d.id}
                className="flex flex-wrap items-center justify-between gap-3 py-5"
              >
                <div>
                  <p className="font-medium">{d.title}</p>
                  <p className="text-sm text-muted">
                    {l?.title ?? d.listingSlug} · {d.kind}
                  </p>
                </div>
                <Link href="/auth" className="text-sm text-brass hover:underline">
                  Re-download →
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
