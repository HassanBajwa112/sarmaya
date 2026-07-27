import type { Metadata } from "next";
import Link from "next/link";
import { getListing } from "@/lib/data/listings";
import { getQueue, verificationCases } from "@/lib/data/verification";
import {
  VerificationCaseCard,
  VerificationTimeline,
} from "@/components/verification/VerificationCaseCard";
import { AppealForm, ResubmitHint } from "@/components/verification/AppealForm";

export const metadata: Metadata = { title: "Verification Center · Founder" };

export default function FounderVerificationPage() {
  // Demo: show cases for listings "owned" by demo founder personas
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
    <div className="min-h-screen bg-stone text-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <Link
          href="/dashboard/founder"
          className="text-xs tracking-widest text-brass uppercase hover:underline"
        >
          ← Founder dashboard
        </Link>
        <p className="mt-6 text-xs tracking-widest text-brass uppercase">
          Verification Center
        </p>
        <h1 className="font-display mt-2 text-4xl font-bold">Your submissions</h1>
        <p className="mt-2 max-w-2xl text-ink/60">
          Identity, business, and financial verification with audit trails. Demo
          seed — no real uploads yet.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Stat label="Your cases" value={String(mine.length)} />
          <Stat label="Queue open (site)" value={String(open)} />
          <Stat
            label="Needs action"
            value={String(rejected.length)}
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link href="/admin/verification" className="text-brass hover:underline">
            Admin review queue →
          </Link>
          <Link href="/auth" className="text-muted hover:underline">
            Sign in to unlock uploads
          </Link>
        </div>

        <h2 className="font-display mt-14 text-2xl font-semibold">Cases</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {mine.map((c) => {
            const listing = getListing(c.listingSlug);
            return (
              <div key={c.id} className="space-y-0">
                <VerificationCaseCard
                  caseItem={c}
                  listingTitle={listing?.title ?? c.listingSlug}
                  href={`/dashboard/founder/verification#${c.id}`}
                />
                <div id={c.id} className="border border-t-0 border-[var(--line-dark)] bg-white px-5 pb-5">
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
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[var(--line-dark)] bg-white p-5">
      <p className="text-xs tracking-widest text-muted uppercase">{label}</p>
      <p className="font-display mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}
