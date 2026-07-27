import type { Metadata } from "next";
import Link from "next/link";
import { StatGrid } from "@/components/dashboard/DashboardShell";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import {
  founderInterest,
  founderListings,
  founderNotifications,
} from "@/lib/data/dashboard";
import { fundingProgress } from "@/lib/data/listings";
import { getCasesForListing, getQueue } from "@/lib/data/verification";

export const metadata: Metadata = { title: "Founder dashboard" };

export default function FounderOverviewPage() {
  const mine = founderListings();
  const inReview = getQueue({ state: "in_review" }).length;
  const needsAction = getQueue().filter((c) =>
    ["rejected", "appeal"].includes(c.state),
  ).length;
  const unread = founderNotifications.filter((n) => !n.read).length;

  return (
    <div>
      <PageHeading
        title="Overview"
        description="Listings, verification, and inbound investor interest."
      />
      <StatGrid
        items={[
          { label: "Listings", value: String(mine.length) },
          { label: "In review", value: String(inReview) },
          { label: "Needs action", value: String(needsAction) },
          { label: "Unread", value: String(unread) },
        ]}
      />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/dashboard/founder/create"
          className="bg-ink px-5 py-3 text-sm text-stone hover:bg-ink-soft"
        >
          Create listing
        </Link>
        <Link
          href="/dashboard/founder/verification"
          className="border border-[var(--line-dark)] px-5 py-3 text-sm hover:border-ink"
        >
          Verification Center
        </Link>
      </div>

      <h3 className="font-display mt-14 text-xl font-semibold">Your listings</h3>
      <ul className="mt-4 divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
        {mine.map((l) => {
          const cases = getCasesForListing(l.slug);
          return (
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
                  Trust {l.trustScore} · {fundingProgress(l)}% funded ·{" "}
                  {cases ? `${cases.length} verification cases` : l.stage}
                </p>
              </div>
              <Link
                href={`/dashboard/founder/raise`}
                className="text-sm text-brass hover:underline"
              >
                Raise progress →
              </Link>
            </li>
          );
        })}
      </ul>

      <h3 className="font-display mt-14 text-xl font-semibold">
        Recent interest
      </h3>
      <ul className="mt-4 divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
        {founderInterest.slice(0, 3).map((i) => (
          <li key={i.id} className="flex justify-between gap-3 py-4 text-sm">
            <span>
              {i.investorName} · {i.action}
            </span>
            <span className="text-muted">{i.location}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/dashboard/founder/interest"
        className="mt-4 inline-block text-sm text-brass hover:underline"
      >
        View all interest →
      </Link>
    </div>
  );
}
