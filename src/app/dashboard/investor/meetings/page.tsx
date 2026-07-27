import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/dashboard/DashboardShell";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import {
  investorMeetings,
  meetingStatusLabel,
} from "@/lib/data/dashboard";
import { getListing } from "@/lib/data/listings";

export const metadata: Metadata = { title: "Meetings · Investor" };

export default function InvestorMeetingsPage() {
  return (
    <div>
      <PageHeading
        title="Meeting requests"
        description="Intro calls with founders. Scheduling is off-platform."
      />
      {investorMeetings.length === 0 ? (
        <EmptyState
          title="No meetings"
          body="Request intros from listing pages."
          actionHref="/browse"
          actionLabel="Browse"
        />
      ) : (
        <ul className="divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
          {investorMeetings.map((m) => {
            const l = getListing(m.listingSlug);
            return (
              <li key={m.id} className="py-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-lg font-semibold">
                      {l ? (
                        <Link href={`/listings/${l.slug}`} className="hover:text-brass">
                          {l.title}
                        </Link>
                      ) : (
                        m.listingSlug
                      )}
                    </p>
                    <p className="text-sm text-muted">
                      With {m.withName} · {new Date(m.at).toLocaleString()}
                    </p>
                    {m.note && (
                      <p className="mt-2 text-sm text-ink/70">{m.note}</p>
                    )}
                  </div>
                  <span className="text-xs tracking-widest text-brass uppercase">
                    {meetingStatusLabel(m.status)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
