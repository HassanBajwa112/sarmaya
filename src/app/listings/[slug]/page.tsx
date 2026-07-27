import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingHero } from "@/components/ListingHero";
import { MessageShell } from "@/components/MessageShell";
import { ExistingBusinessDetail } from "@/components/listing/ExistingBusinessDetail";
import { StartupDetail } from "@/components/listing/StartupDetail";
import {
  ContactNextStep,
  DocumentsPanel,
  FundingSummary,
  VerificationSummary,
} from "@/components/listing/ListingSharedBlocks";
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
          {listing.type === "startup" ? (
            <StartupDetail listing={listing} />
          ) : (
            <ExistingBusinessDetail listing={listing} />
          )}

          <div className="mt-14">
            <MessageShell listingTitle={listing.title} />
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <FundingSummary listing={listing} />
          <VerificationSummary listing={listing} />
          <DocumentsPanel listing={listing} />
          <ContactNextStep />
        </aside>
      </div>
    </div>
  );
}
