import Link from "next/link";
import type { Listing } from "@/lib/data/listings";
import { EmptyState } from "@/components/dashboard/DashboardShell";

export function ListingLinkList({
  listings,
  emptyTitle,
  emptyBody,
  meta,
}: {
  listings: Listing[];
  emptyTitle: string;
  emptyBody: string;
  meta?: (l: Listing) => string;
}) {
  if (!listings.length) {
    return (
      <EmptyState
        title={emptyTitle}
        body={emptyBody}
        actionHref="/browse"
        actionLabel="Browse listings"
      />
    );
  }

  return (
    <ul className="divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
      {listings.map((l) => (
        <li
          key={l.slug}
          className="flex flex-wrap items-center justify-between gap-3 py-5"
        >
          <div>
            <Link
              href={`/listings/${l.slug}`}
              className="font-display text-lg font-semibold hover:text-brass"
            >
              {l.title}
            </Link>
            <p className="text-sm text-muted">
              {meta ? meta(l) : `${l.city} · Trust ${l.trustScore} · ${l.category}`}
            </p>
          </div>
          <span className="text-sm text-ink/70">{l.raiseAsk}</span>
        </li>
      ))}
    </ul>
  );
}

export function PageHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
      {description && <p className="mt-2 text-sm text-muted">{description}</p>}
    </div>
  );
}
