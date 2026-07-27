import type { Metadata } from "next";
import Link from "next/link";
import { adminUsers, siteAnalytics, supportTickets } from "@/lib/data/admin";
import { getQueue } from "@/lib/data/verification";
import { listings } from "@/lib/data/listings";
import { getAiInsights } from "@/lib/data/ai-insights";

export const metadata: Metadata = { title: "Admin" };

export default function AdminOverviewPage() {
  const pending = getQueue().filter((c) =>
    ["pending", "in_review", "appeal"].includes(c.state),
  ).length;
  const fraudCount = listings.filter(
    (l) => (getAiInsights(l.slug)?.fraudFlags.length ?? 0) > 0,
  ).length;
  const openTickets = supportTickets.filter((t) => t.status === "open").length;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-stone">Overview</h1>
      <p className="mt-2 text-sm text-stone/55">
        Site-wide control surface. Distinct from founder/investor dashboards.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Users", value: String(adminUsers.length) },
          { label: "Verification open", value: String(pending) },
          { label: "Fraud flagged", value: String(fraudCount) },
          { label: "Support open", value: String(openTickets) },
        ].map((s) => (
          <div key={s.label} className="border border-stone/15 bg-ink-soft p-5">
            <p className="text-xs tracking-widest text-stone/45 uppercase">
              {s.label}
            </p>
            <p className="font-display mt-2 text-3xl font-semibold text-brass">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-stone/50">
        Ask volume · PKR {siteAnalytics.fundingAskPkrCr} Cr seeded · Raised{" "}
        {siteAnalytics.fundingRaisedPkrCr} Cr
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/admin/verification", label: "Verification queue" },
          { href: "/admin/fraud", label: "Fraud reports" },
          { href: "/admin/users", label: "User management" },
          { href: "/admin/content", label: "Hub content" },
          { href: "/admin/featured", label: "Featured listings" },
          { href: "/admin/support", label: "Support tickets" },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="border border-stone/15 px-5 py-4 text-sm text-stone/80 transition hover:border-brass/40 hover:text-brass"
          >
            {c.label} →
          </Link>
        ))}
      </div>
    </div>
  );
}
