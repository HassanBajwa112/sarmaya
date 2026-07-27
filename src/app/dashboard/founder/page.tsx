import type { Metadata } from "next";
import Link from "next/link";
import { listings } from "@/lib/data/listings";
import { getQueue } from "@/lib/data/verification";

export const metadata: Metadata = { title: "Founder dashboard" };

export default function FounderDashboardPage() {
  const mine = listings.filter((l) => l.type === "existing").slice(0, 3);
  const inReview = getQueue({ state: "in_review" }).length;
  const needsAction = getQueue().filter((c) =>
    ["rejected", "appeal"].includes(c.state),
  ).length;

  return (
    <div className="min-h-screen bg-stone text-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <p className="text-xs tracking-widest text-brass uppercase">Demo shell</p>
        <h1 className="font-display mt-2 text-4xl font-bold">Founder dashboard</h1>
        <p className="mt-2 text-ink/60">
          Listing status, verification, and inbound interest. Wire to auth in Plan B.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Listings", value: String(mine.length) },
            { label: "In review", value: String(inReview) },
            { label: "Needs action", value: String(needsAction) },
          ].map((s) => (
            <div key={s.label} className="border border-[var(--line-dark)] bg-white p-5">
              <p className="text-xs tracking-widest text-muted uppercase">{s.label}</p>
              <p className="font-display mt-2 text-3xl font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link
            href="/dashboard/founder/verification"
            className="bg-ink px-5 py-3 text-stone hover:bg-ink-soft"
          >
            Verification Center
          </Link>
          <Link href="/admin/verification" className="text-brass hover:underline">
            Admin queue →
          </Link>
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
                  {l.stage} · Trust {l.trustScore} · {l.raiseAsk}
                </p>
              </div>
              <div className="flex gap-3 text-sm">
                <Link
                  href={`/listings/${l.slug}/verification`}
                  className="text-brass hover:underline"
                >
                  Verification
                </Link>
                <span className="text-xs tracking-widest text-brass uppercase">Live</span>
              </div>
            </li>
          ))}
        </ul>

        <Link
          href="/for-founders"
          className="mt-10 inline-flex border border-[var(--line-dark)] px-5 py-3 text-sm text-ink hover:border-ink"
        >
          Create new listing
        </Link>
      </div>
    </div>
  );
}
