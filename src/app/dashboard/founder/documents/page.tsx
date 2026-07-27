import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/dashboard/DashboardShell";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { founderListings } from "@/lib/data/dashboard";

export const metadata: Metadata = { title: "Documents · Founder" };

export default function FounderDocumentsPage() {
  const mine = founderListings();
  const docs = mine.flatMap((l) =>
    l.documents.map((d) => ({ ...d, listingSlug: l.slug, listingTitle: l.title })),
  );

  return (
    <div>
      <PageHeading
        title="Documents"
        description="Uploaded packs tied to Verification Center. Replace is demo-only."
      />
      {docs.length === 0 ? (
        <EmptyState
          title="No documents"
          body="Add docs when creating a listing or from verification."
          actionHref="/dashboard/founder/create"
          actionLabel="Create listing"
        />
      ) : (
        <ul className="divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
          {docs.map((d) => (
            <li
              key={`${d.listingSlug}-${d.id}`}
              className="flex flex-wrap items-center justify-between gap-3 py-5"
            >
              <div>
                <p className="font-medium">{d.title}</p>
                <p className="text-sm text-muted">
                  {d.listingTitle} · {d.kind}
                </p>
              </div>
              <div className="flex gap-3 text-sm">
                <Link href="/auth" className="text-brass hover:underline">
                  Replace
                </Link>
                <Link
                  href="/dashboard/founder/verification"
                  className="text-muted hover:underline"
                >
                  Verification
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
