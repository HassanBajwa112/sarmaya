import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AiCenterPanel } from "@/components/listing/AiCenterPanel";
import {
  getAiInsights,
  scoreInvestmentMatch,
} from "@/lib/data/ai-insights";
import { getListing, listings } from "@/lib/data/listings";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return { title: "AI Center" };
  return { title: `AI Center · ${listing.title}` };
}

export default async function ListingAiPage({ params }: Props) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();

  const insights = getAiInsights(slug);
  if (!insights) notFound();

  const match = scoreInvestmentMatch(slug);
  const similarTitles = insights.similarSlugs
    .map((s) => {
      const l = getListing(s);
      return l ? { slug: s, title: l.title } : null;
    })
    .filter(Boolean) as { slug: string; title: string }[];

  return (
    <div className="min-h-screen bg-stone text-ink">
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <Link
          href={`/listings/${listing.slug}`}
          className="text-xs tracking-widest text-brass uppercase hover:underline"
        >
          ← {listing.title}
        </Link>
        <div className="mt-10">
          <AiCenterPanel
            slug={slug}
            initial={insights}
            match={match}
            similarTitles={similarTitles}
          />
        </div>
      </div>
    </div>
  );
}
