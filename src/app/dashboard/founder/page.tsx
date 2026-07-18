import type { Metadata } from "next";
import Link from "next/link";
import { listings } from "@/lib/data/listings";

export const metadata: Metadata = { title: "Founder dashboard" };

export default function FounderDashboardPage() {
  const mine = listings.filter((l) => l.type === "existing").slice(0, 3);

  return (
    <div className="min-h-screen bg-stone text-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <p className="text-xs tracking-widest text-brass uppercase">Demo shell</p>
        <h1 className="font-display mt-2 text-4xl font-bold">Founder dashboard</h1>
        <p className="mt-2 text-ink/60">
          Preview of listing status and inbound interest. Wire to auth in Plan B.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Listings", value: "2" },
            { label: "In review", value: "1" },
            { label: "Messages", value: "5" },
          ].map((s) => (
            <div key={s.label} className="border border-[var(--line-dark)] bg-white p-5">
              <p className="text-xs tracking-widest text-muted uppercase">{s.label}</p>
              <p className="font-display mt-2 text-3xl font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display mt-14 text-2xl font-semibold">Your listings</h2>
        <ul className="mt-4 divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
          {mine.map((l) => (
            <li key={l.slug} className="flex flex-wrap items-center justify-between gap-3 py-5">
              <div>
                <Link
                  href={`/listings/${l.slug}`}
                  className="font-display text-lg font-semibold hover:text-brass"
                >
                  {l.title}
                </Link>
                <p className="text-sm text-muted">
                  {l.stage} · {l.raiseAsk}
                </p>
              </div>
              <span className="text-xs tracking-widest text-brass uppercase">Live</span>
            </li>
          ))}
        </ul>

        <Link
          href="/for-founders"
          className="mt-10 inline-flex bg-ink px-5 py-3 text-sm text-stone hover:bg-ink-soft"
        >
          Create new listing
        </Link>
      </div>
    </div>
  );
}
