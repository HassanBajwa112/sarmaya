import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/dashboard/ListingLinkList";

export const metadata: Metadata = { title: "Subscription · Founder" };

export default function FounderSubscriptionPage() {
  return (
    <div>
      <PageHeading
        title="Subscription"
        description="Plan / tier management. Payment integration pending."
      />
      <div className="border border-dashed border-[var(--line-dark)] bg-white p-6">
        <p className="text-xs tracking-widest text-brass uppercase">
          Pending payment integration
        </p>
        <h3 className="font-display mt-2 text-xl font-semibold">Free · Plan A</h3>
        <p className="mt-2 max-w-lg text-sm text-ink/70">
          Directory listing and verification queue included. Paid tiers (featured
          placement, priority review) will wire when a PKR-capable processor is
          chosen — Stripe is not assumed.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-ink/70">
          <li>· Live listings</li>
          <li>· Verification Center</li>
          <li>· Investor messaging (demo)</li>
        </ul>
        <Link
          href="/auth"
          className="mt-8 inline-flex border border-[var(--line-dark)] px-4 py-2 text-sm hover:border-ink"
        >
          Notify me when billing launches
        </Link>
      </div>
    </div>
  );
}
