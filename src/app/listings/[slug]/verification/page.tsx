import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getListing, listings } from "@/lib/data/listings";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return { title: "Verification" };
  return { title: `Verification · ${listing.title}` };
}

export default async function VerificationPage({ params }: Props) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();

  const layers = [
    {
      key: "identity",
      title: "Layer 1 — Identity",
      done: listing.verification.identity,
      detail:
        "CNIC front/back plus selfie match, reviewed by a person. Required before any listing goes live.",
    },
    {
      key: "business",
      title: "Layer 2 — Business / claim",
      done: listing.verification.businessClaim,
      detail:
        listing.type === "existing"
          ? "NTN/FBR status, SECP registration if incorporated, and financials matching claimed revenue."
          : "Founder professional history cross-check (LinkedIn / prior ventures). Pitch itself is not yet verifiable.",
    },
    {
      key: "human",
      title: "Layer 3 — Human review",
      done: listing.verification.humanReviewed,
      detail:
        "Manual review queue decision recorded. Rejection rates are tracked from day one as a trust signal.",
    },
    {
      key: "custody",
      title: "Layer 4 — No custody",
      done: true,
      detail:
        "Architectural constraint: Sarmaya has no code path that stores or moves investor money for a deal.",
    },
  ];

  return (
    <div className="min-h-screen bg-stone text-ink">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <Link
          href={`/listings/${listing.slug}`}
          className="text-xs tracking-widest text-brass uppercase hover:underline"
        >
          ← {listing.title}
        </Link>
        <h1 className="font-display mt-6 text-4xl font-bold tracking-tight">
          Verification status
        </h1>
        <p className="mt-3 text-ink/60">
          Public trust layers for this listing. Reputation (Layer 5) is deferred —
          outcome data is collected quietly for a later release.
        </p>

        <ul className="mt-12 space-y-0">
          {layers.map((layer) => (
            <li
              key={layer.key}
              className="border-t border-[var(--line-dark)] py-8 first:border-t-0 first:pt-0"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-xl font-semibold">{layer.title}</h2>
                <span
                  className={`shrink-0 text-xs tracking-widest uppercase ${
                    layer.done ? "text-brass" : "text-muted"
                  }`}
                >
                  {layer.done ? "Complete" : "Pending"}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{layer.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
