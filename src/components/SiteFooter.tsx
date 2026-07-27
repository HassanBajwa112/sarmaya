import Link from "next/link";
import { POSITIONING } from "@/lib/data/listings";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <p className="font-display text-2xl font-bold text-stone">Sarmaya</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            {POSITIONING}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-2 md:justify-items-end">
          <div className="space-y-3 text-sm">
            <p className="font-display text-xs tracking-[0.2em] text-brass uppercase">
              Explore
            </p>
            <Link href="/browse" className="block text-stone/80 hover:text-brass">
              Browse listings
            </Link>
            <Link
              href="/hubs/investors"
              className="block text-stone/80 hover:text-brass"
            >
              Investor Hub
            </Link>
            <Link
              href="/hubs/founders"
              className="block text-stone/80 hover:text-brass"
            >
              Founder Hub
            </Link>
            <Link href="/partner" className="block text-stone/80 hover:text-brass">
              Partner
            </Link>
            <Link
              href="/for-founders"
              className="block text-stone/80 hover:text-brass"
            >
              For founders
            </Link>
            <Link
              href="/for-investors"
              className="block text-stone/80 hover:text-brass"
            >
              For investors
            </Link>
          </div>
          <div className="space-y-3 text-sm">
            <p className="font-display text-xs tracking-[0.2em] text-brass uppercase">
              Company
            </p>
            <Link href="/about" className="block text-stone/80 hover:text-brass">
              About
            </Link>
            <Link href="/contact" className="block text-stone/80 hover:text-brass">
              Contact
            </Link>
            <Link href="/auth" className="block text-stone/80 hover:text-brass">
              Sign in
            </Link>
            <Link
              href="/dashboard/founder"
              className="block text-stone/80 hover:text-brass"
            >
              Founder dashboard
            </Link>
            <Link
              href="/dashboard/investor"
              className="block text-stone/80 hover:text-brass"
            >
              Investor dashboard
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--line)] px-5 py-6 sm:px-8">
        <p className="mx-auto max-w-6xl text-xs leading-relaxed text-muted">
          Sarmaya is a Tier 1 directory: listings connect founders and investors;
          deals close off-platform. We do not custody funds, structure term sheets,
          or operate as a SECP-licensed crowdfunding platform. Not financial or
          legal advice.
        </p>
      </div>
    </footer>
  );
}
