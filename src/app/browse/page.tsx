import { Suspense } from "react";
import { ListingRow } from "@/components/ListingRow";
import { BrowseFilters } from "@/components/browse/BrowseFilters";
import {
  filterListings,
  parseBrowseSearchParams,
} from "@/lib/data/listings";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BrowsePage({ searchParams }: Props) {
  const sp = await searchParams;
  const opts = parseBrowseSearchParams(sp);
  const results = filterListings(opts);

  return (
    <div className="min-h-screen bg-stone text-ink">
      <div className="border-b border-[var(--line-dark)] bg-ink text-stone">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
            Marketplace
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Browse listings
          </h1>
          <p className="mt-4 max-w-xl text-stone/60">
            Growth opportunities across Pakistan — shareable filters over seed
            listings. Capital closes off-platform.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:px-8 lg:flex-row lg:gap-12">
        <Suspense fallback={<FiltersFallback />}>
          <BrowseFilters resultCount={results.length} />
        </Suspense>

        <div className="min-w-0 flex-1">
          <p className="mb-2 hidden text-sm text-muted lg:block">
            {results.length} listing{results.length === 1 ? "" : "s"}
          </p>

          {results.length === 0 ? (
            <div className="border border-dashed border-[var(--line-dark)] px-6 py-20 text-center">
              <p className="font-display text-xl font-semibold text-ink">
                No listings match
              </p>
              <p className="mt-2 text-sm text-muted">
                Clear filters or broaden ask / revenue ranges.
              </p>
            </div>
          ) : (
            <div>
              {results.map((l, i) => (
                <ListingRow key={l.slug} listing={l} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FiltersFallback() {
  return (
    <aside className="hidden w-64 shrink-0 animate-pulse lg:block">
      <div className="h-8 w-24 bg-stone-muted" />
      <div className="mt-6 space-y-4">
        <div className="h-10 bg-stone-muted" />
        <div className="h-24 bg-stone-muted" />
        <div className="h-24 bg-stone-muted" />
      </div>
    </aside>
  );
}
