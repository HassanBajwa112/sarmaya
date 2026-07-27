import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/dashboard/DashboardShell";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { investorNotifications } from "@/lib/data/dashboard";

export const metadata: Metadata = { title: "Notifications · Investor" };

export default function InvestorNotificationsPage() {
  return (
    <div>
      <PageHeading
        title="Notifications"
        description="Matches, replies, and verification updates on watched listings."
      />
      {investorNotifications.length === 0 ? (
        <EmptyState
          title="You’re all caught up"
          body="New matches and replies will show here."
        />
      ) : (
        <ul className="divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
          {investorNotifications.map((n) => (
            <li key={n.id} className="py-5">
              <Link href={n.href} className="block hover:opacity-80">
                <p className="font-medium">
                  {n.title}
                  {!n.read && (
                    <span className="ml-2 text-[10px] tracking-widest text-brass uppercase">
                      New
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm text-ink/70">{n.body}</p>
                <p className="mt-2 text-xs text-muted">
                  {new Date(n.at).toLocaleString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
