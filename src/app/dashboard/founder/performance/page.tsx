import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { founderListings, peerFundingVelocity } from "@/lib/data/dashboard";

export const metadata: Metadata = { title: "Performance · Founder" };

export default function FounderPerformancePage() {
  const mine = founderListings();

  return (
    <div>
      <PageHeading
        title="Performance"
        description="Your funding velocity vs similar listings (category / type peers)."
      />
      <div className="space-y-8">
        {mine.map((l) => {
          const { peers, avgProgress, ownProgress } = peerFundingVelocity(l);
          return (
            <section
              key={l.slug}
              className="border border-[var(--line-dark)] bg-white p-5"
            >
              <Link
                href={`/listings/${l.slug}`}
                className="font-display text-lg font-semibold hover:text-brass"
              >
                {l.title}
              </Link>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs tracking-widest text-muted uppercase">
                    Your funded %
                  </dt>
                  <dd className="font-display mt-1 text-3xl font-semibold text-brass">
                    {ownProgress}%
                  </dd>
                </div>
                <div>
                  <dt className="text-xs tracking-widest text-muted uppercase">
                    Peer average
                  </dt>
                  <dd className="font-display mt-1 text-3xl font-semibold">
                    {avgProgress}%
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-xs tracking-widest text-muted uppercase">
                Similar businesses
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {peers.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/listings/${p.slug}`}
                      className="text-brass hover:underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
                {peers.length === 0 && (
                  <li className="text-muted">No peers in seed set.</li>
                )}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
