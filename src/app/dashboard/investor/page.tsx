import type { Metadata } from "next";
import Link from "next/link";
import {
  DEMO_INVESTOR_PREFS,
  rankListingsForInvestor,
} from "@/lib/data/ai-insights";
import { getFeaturedListings, getListing } from "@/lib/data/listings";

export const metadata: Metadata = { title: "Investor dashboard" };

export default function InvestorDashboardPage() {
  const watched = getFeaturedListings().slice(0, 4);
  const matches = rankListingsForInvestor(DEMO_INVESTOR_PREFS).slice(0, 5);

  return (
    <div className="min-h-screen bg-stone text-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <p className="text-xs tracking-widest text-brass uppercase">Demo shell</p>
        <h1 className="font-display mt-2 text-4xl font-bold">Investor dashboard</h1>
        <p className="mt-2 text-ink/60">
          Watchlist, AI matches from preferences, and intro requests.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Saved", value: "4" },
            { label: "Intros requested", value: "2" },
            { label: "AI matches", value: String(matches.filter((m) => m.score >= 50).length) },
          ].map((s) => (
            <div key={s.label} className="border border-[var(--line-dark)] bg-white p-5">
              <p className="text-xs tracking-widest text-muted uppercase">{s.label}</p>
              <p className="font-display mt-2 text-3xl font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold">
            Investment preferences
          </h2>
          <p className="mt-2 text-sm text-muted">
            Demo stub feeding AI Investment Match — edit in Plan B.
          </p>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div className="border border-[var(--line-dark)] bg-white p-4">
              <dt className="text-xs tracking-widest text-muted uppercase">
                Industries
              </dt>
              <dd className="mt-1">{DEMO_INVESTOR_PREFS.industries.join(", ")}</dd>
            </div>
            <div className="border border-[var(--line-dark)] bg-white p-4">
              <dt className="text-xs tracking-widest text-muted uppercase">
                Ticket (PKR Cr)
              </dt>
              <dd className="mt-1">
                {DEMO_INVESTOR_PREFS.ticketMinPkrCr} –{" "}
                {DEMO_INVESTOR_PREFS.ticketMaxPkrCr}
              </dd>
            </div>
            <div className="border border-[var(--line-dark)] bg-white p-4">
              <dt className="text-xs tracking-widest text-muted uppercase">Cities</dt>
              <dd className="mt-1">{DEMO_INVESTOR_PREFS.cities.join(", ")}</dd>
            </div>
            <div className="border border-[var(--line-dark)] bg-white p-4">
              <dt className="text-xs tracking-widest text-muted uppercase">Models</dt>
              <dd className="mt-1">{DEMO_INVESTOR_PREFS.models.join(", ")}</dd>
            </div>
          </dl>
        </section>

        <h2 className="font-display mt-14 text-2xl font-semibold">
          AI recommendations
        </h2>
        <ul className="mt-4 divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
          {matches.map((m) => {
            const l = getListing(m.slug);
            if (!l) return null;
            return (
              <li
                key={m.slug}
                className="flex flex-wrap items-center justify-between gap-3 py-5"
              >
                <div>
                  <Link
                    href={`/listings/${l.slug}/ai`}
                    className="font-display text-lg font-semibold hover:text-brass"
                  >
                    {l.title}
                  </Link>
                  <p className="text-sm text-muted">
                    {m.reasons.slice(0, 2).join(" · ")}
                  </p>
                </div>
                <span className="font-display text-xl font-semibold text-brass">
                  {m.score}
                </span>
              </li>
            );
          })}
        </ul>

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
                  {l.city} · Trust {l.trustScore} · {l.category}
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
