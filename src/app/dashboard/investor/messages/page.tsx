import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/dashboard/DashboardShell";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { messages } from "@/lib/data/dashboard";
import { getListing } from "@/lib/data/listings";

export const metadata: Metadata = { title: "Messages · Investor" };

export default function InvestorMessagesPage() {
  const threads = messages.filter((m) => m.role === "investor");

  return (
    <div>
      <PageHeading
        title="Messages"
        description="Threads from Contact Founder. Demo shell — not delivered."
      />
      {threads.length === 0 ? (
        <EmptyState
          title="No messages"
          body="Message a founder from a listing page."
          actionHref="/browse"
          actionLabel="Browse"
        />
      ) : (
        <ul className="divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
          {threads.map((m) => {
            const l = getListing(m.listingSlug);
            return (
              <li key={m.id} className="py-5">
                <p className="font-medium">
                  {m.counterpart}
                  {m.unread && (
                    <span className="ml-2 text-[10px] tracking-widest text-brass uppercase">
                      Unread
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm text-ink/70">{m.preview}</p>
                <p className="mt-2 text-xs text-muted">
                  {l ? (
                    <Link
                      href={`/listings/${l.slug}`}
                      className="text-brass hover:underline"
                    >
                      {l.title}
                    </Link>
                  ) : (
                    m.listingSlug
                  )}{" "}
                  · {new Date(m.at).toLocaleString()}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
