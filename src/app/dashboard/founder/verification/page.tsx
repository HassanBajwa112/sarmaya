import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/dashboard/ListingLinkList";
import { getListing } from "@/lib/data/listings";
import { getQueue, verificationCases } from "@/lib/data/verification";
import {
  VerificationCaseCard,
  VerificationTimeline,
} from "@/components/verification/VerificationCaseCard";
import { AppealForm, ResubmitHint } from "@/components/verification/AppealForm";

export const metadata: Metadata = { title: "Verification · Founder" };

export default function FounderVerificationPage() {
  const mine = verificationCases.filter((c) =>
    [
      "lahore-precision-parts",
      "clinicstack",
      "learnlocal",
      "solar-yard-faisalabad",
    ].includes(c.listingSlug),
  );
  const rejected = mine.filter((c) => c.state === "rejected" || c.state === "appeal");
  const open = getQueue().filter((c) =>
    ["pending", "in_review", "appeal"].includes(c.state),
  ).length;

  return (
    <div>
      <PageHeading
        title="Verification Center"
        description="Identity, business, and financial cases with audit trails."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="border border-[var(--line-dark)] bg-white p-5">
          <p className="text-xs tracking-widest text-muted uppercase">Your cases</p>
          <p className="font-display mt-2 text-3xl font-semibold">{mine.length}</p>
        </div>
        <div className="border border-[var(--line-dark)] bg-white p-5">
          <p className="text-xs tracking-widest text-muted uppercase">
            Queue open (site)
          </p>
          <p className="font-display mt-2 text-3xl font-semibold">{open}</p>
        </div>
        <div className="border border-[var(--line-dark)] bg-white p-5">
          <p className="text-xs tracking-widest text-muted uppercase">Needs action</p>
          <p className="font-display mt-2 text-3xl font-semibold">
            {rejected.length}
          </p>
        </div>
      </div>

      <Link href="/admin/verification" className="text-sm text-brass hover:underline">
        Admin review queue →
      </Link>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {mine.map((c) => {
          const listing = getListing(c.listingSlug);
          return (
            <div key={c.id}>
              <VerificationCaseCard
                caseItem={c}
                listingTitle={listing?.title ?? c.listingSlug}
              />
              <div className="border border-t-0 border-[var(--line-dark)] bg-white px-5 pb-5">
                <p className="text-xs tracking-widest text-muted uppercase">
                  Timeline
                </p>
                <VerificationTimeline caseItem={c} />
                <ul className="mt-4 space-y-1 text-sm text-ink/70">
                  {c.documents.map((d) => (
                    <li key={d.id}>· {d.title}</li>
                  ))}
                </ul>
                {c.state === "rejected" && (
                  <>
                    <ResubmitHint />
                    <AppealForm caseId={c.id} />
                  </>
                )}
                {c.state === "appeal" && (
                  <p className="mt-4 text-sm text-brass">
                    Appeal in queue for re-review.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
