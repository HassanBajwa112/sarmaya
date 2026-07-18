import type { Metadata } from "next";
import Link from "next/link";
import { getFeaturedListings } from "@/lib/data/listings";

export const metadata: Metadata = { title: "Investor dashboard" };

export default function InvestorDashboardPage() {
  const watched = getFeaturedListings().slice(0, 4);

  return (
    <div className="min-h-screen bg-stone text-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <p className="text-xs tracking-widest text-brass uppercase">Demo shell</p>
        <h1 className="font-display mt-2 text-4xl font-bold">Investor dashboard</h1>
        <p className="mt-2 text-ink/60">
          Saved opportunities and intro requests. Functional messaging lands in Plan B.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Saved", value: "4" },
            { label: "Intros requested", value: "2" },
            { label: "Unread", value: "1" },
          ].map((s) => (
            <div key={s.label} className="border border-[var(--line-dark)] bg-white p-5">
              <p className="text-xs tracking-widest text-muted uppercase">{s.label}</p>
              <p className="font-display mt-2 text-3xl font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display mt-14 text-2xl font-semibold">Watchlist</h2>
        <ul className="mt-4 divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
          {watched.map((l) => (
            <li key={l.slug} className="flex flex-wrap items-center justify-between gap-3 py-5">
              <div>
                <Link
                  href={`/listings/${l.slug}`}
                  className="font-display text-lg font-semibold hover:text-brass"
                >
                  {l.title}
                </Link>
                <p className="text-sm text-muted">
                  {l.city} · {l.category}
                </p>
              </div>
              <span className="text-sm text-ink/70">{l.raiseAsk}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/browse"
          className="mt-10 inline-flex bg-brass px-5 py-3 text-sm font-medium text-ink hover:bg-brass-bright"
        >
          Find more listings
        </Link>
      </div>
    </div>
  );
}
