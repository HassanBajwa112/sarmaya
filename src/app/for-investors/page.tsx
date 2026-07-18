import type { Metadata } from "next";
import Link from "next/link";
import { POSITIONING } from "@/lib/data/listings";

export const metadata: Metadata = {
  title: "For investors",
  description: "Diaspora-first growth investment into Pakistani businesses.",
};

export default function ForInvestorsPage() {
  return (
    <div className="bg-ink text-stone">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
          Investors
        </p>
        <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl text-balance">
          Growth stakes in Pakistan — from wherever you are.
        </h1>
        <p className="mt-6 max-w-xl text-stone/60">{POSITIONING}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/browse"
            className="bg-brass px-7 py-3.5 text-sm font-medium text-ink hover:bg-brass-bright"
          >
            Browse listings
          </Link>
          <Link
            href="/auth"
            className="border border-stone/30 px-7 py-3.5 text-sm hover:border-brass hover:text-brass"
          >
            Create investor account
          </Link>
        </div>
      </div>

      <div className="bg-stone text-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <h2 className="font-display text-3xl font-semibold">Built diaspora-first</h2>
          <p className="mt-4 max-w-2xl text-ink/65">
            Overseas Pakistani professionals in the UK, Gulf, and US are a primary
            audience. Listings that note Roshan Digital Account–friendly intro paths make
            that corridor explicit — without Sarmaya ever holding your capital.
          </p>
          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                t: "Verified first",
                d: "See identity, business-claim, and human-review status before you message.",
              },
              {
                t: "Directory, not escrow",
                d: "Request intros on-platform. Structure and fund the deal with counsel off-platform.",
              },
              {
                t: "Growth, not exits",
                d: "Equity and profit-share into running companies — not buyouts of whole businesses.",
              },
            ].map((item) => (
              <li key={item.t} className="border-t border-[var(--line-dark)] pt-6">
                <h3 className="font-display text-xl font-semibold">{item.t}</h3>
                <p className="mt-3 text-sm text-ink/60">{item.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
