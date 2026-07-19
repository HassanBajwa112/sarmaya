import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingHero } from "@/components/ListingHero";
import { MessageShell } from "@/components/MessageShell";
import { VerificationBadge } from "@/components/VerificationBadge";
import { getListing, listings } from "@/lib/data/listings";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return { title: "Listing" };
  return {
    title: listing.title,
    description: listing.shortPitch,
    openGraph: { images: [listing.imageUrl] },
  };
}

export default async function ListingPage({ params }: Props) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();

  return (
    <div className="bg-stone text-ink">
      <ListingHero listing={listing} />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="font-display text-2xl font-semibold">The opportunity</h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70">{listing.longPitch}</p>

          {listing.diasporaNote && (
            <div className="mt-8 border-l-2 border-brass pl-5">
              <p className="text-xs tracking-widest text-brass uppercase">
                Diaspora note
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {listing.diasporaNote}
              </p>
            </div>
          )}

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {listing.highlightMetrics.map((m) => (
              <div key={m.label} className="border-t border-[var(--line-dark)] pt-4">
                <p className="text-xs tracking-widest text-muted uppercase">{m.label}</p>
                <p className="font-display mt-2 text-2xl font-semibold">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <MessageShell listingTitle={listing.title} />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="border border-[var(--line-dark)] bg-white p-6">
            <h3 className="font-display text-lg font-semibold">Verification</h3>
            <div className="mt-4">
              <VerificationBadge verification={listing.verification} />
            </div>
            <Link
              href={`/listings/${listing.slug}/verification`}
              className="mt-6 inline-block text-sm text-brass hover:underline"
            >
              View full verification status →
            </Link>
          </div>
          <div className="border border-[var(--line-dark)] bg-white p-6">
            <h3 className="font-display text-lg font-semibold">Next step</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              Message the founder to request an intro call. Capital and legal close
              off-platform — Sarmaya does not custody funds.
            </p>
            <Link
              href="/auth"
              className="mt-6 inline-flex bg-ink px-5 py-3 text-sm text-stone hover:bg-ink-soft"
            >
              Sign in to continue
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
