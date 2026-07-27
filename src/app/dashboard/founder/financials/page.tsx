import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { founderListings } from "@/lib/data/dashboard";
import { formatPkrCr } from "@/lib/data/listings";

export const metadata: Metadata = { title: "Financial uploads · Founder" };

export default function FounderFinancialsPage() {
  const mine = founderListings();

  return (
    <div>
      <PageHeading
        title="Financial uploads"
        description="Structured years that power Financial Highlights on your listing."
      />
      <div className="space-y-8">
        {mine.map((l) => (
          <section
            key={l.slug}
            className="border border-[var(--line-dark)] bg-white p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link
                href={`/listings/${l.slug}`}
                className="font-display text-lg font-semibold hover:text-brass"
              >
                {l.title}
              </Link>
              <Link href="/auth" className="text-sm text-brass hover:underline">
                Upload / replace →
              </Link>
            </div>
            <table className="mt-4 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--line-dark)] text-xs tracking-widest text-muted uppercase">
                  <th className="py-2 font-normal">Year</th>
                  <th className="py-2 font-normal">Revenue</th>
                  <th className="py-2 font-normal">Expenses</th>
                  <th className="py-2 font-normal">Profit</th>
                </tr>
              </thead>
              <tbody>
                {l.financials.map((row) => (
                  <tr key={row.year} className="border-b border-[var(--line-dark)]">
                    <td className="py-2">{row.year}</td>
                    <td className="py-2">{formatPkrCr(row.revenuePkrCr)}</td>
                    <td className="py-2">{formatPkrCr(row.expensesPkrCr)}</td>
                    <td className="py-2">{formatPkrCr(row.profitPkrCr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </div>
    </div>
  );
}
