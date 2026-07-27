import type { Metadata } from "next";
import Link from "next/link";
import { getListing } from "@/lib/data/listings";
import {
  getQueue,
  REVIEW_STATES,
  type ReviewState,
  type VerificationKind,
} from "@/lib/data/verification";
import {
  CaseStatePill,
  VerificationCaseCard,
  VerificationTimeline,
} from "@/components/verification/VerificationCaseCard";

export const metadata: Metadata = { title: "Admin · Verification" };

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminVerificationPage({ searchParams }: Props) {
  const sp = await searchParams;
  const stateRaw = Array.isArray(sp.state) ? sp.state[0] : sp.state;
  const kindRaw = Array.isArray(sp.kind) ? sp.kind[0] : sp.kind;
  const state = (stateRaw as ReviewState | "all" | undefined) ?? "all";
  const kind = (kindRaw as VerificationKind | "all" | undefined) ?? "all";

  const queue = getQueue({
    state: state === "all" ? "all" : state,
    kind: kind === "all" ? "all" : kind,
  }).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  const counts = REVIEW_STATES.map((s) => ({
    ...s,
    n: getQueue({ state: s.value }).length,
  }));

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-stone">
        Verification queue
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-stone/55">
        Human review workflow with five states. Demo seed — decisions are not
        persisted.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {counts.map((c) => (
          <Link
            key={c.value}
            href={`/admin/verification?state=${c.value}`}
            className={`border px-3 py-1.5 text-xs tracking-wide ${
              state === c.value
                ? "border-brass bg-brass/20 text-brass"
                : "border-stone/20 text-stone/60 hover:border-stone/40"
            }`}
          >
            {c.label} ({c.n})
          </Link>
        ))}
        <Link
          href="/admin/verification"
          className={`border px-3 py-1.5 text-xs tracking-wide ${
            state === "all"
              ? "border-brass bg-brass/20 text-brass"
              : "border-stone/20 text-stone/60"
          }`}
        >
          All
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {(
          [
            ["all", "All kinds"],
            ["identity", "Identity"],
            ["business", "Business"],
            ["financial", "Financial"],
          ] as const
        ).map(([v, label]) => (
          <Link
            key={v}
            href={`/admin/verification?state=${state}&kind=${v}`}
            className={
              kind === v ? "text-brass underline" : "text-stone/45 hover:text-stone"
            }
          >
            {label}
          </Link>
        ))}
      </div>

      <p className="mt-8 text-sm text-stone/50">
        {queue.length} case{queue.length === 1 ? "" : "s"}
      </p>

      <div className="mt-4 space-y-6">
        {queue.map((c) => {
          const listing = getListing(c.listingSlug);
          return (
            <article key={c.id} className="border border-stone/15 bg-stone text-ink">
              <div className="p-5">
                <VerificationCaseCard
                  caseItem={c}
                  listingTitle={listing?.title ?? c.listingSlug}
                />
              </div>
              <div className="border-t border-[var(--line-dark)] px-5 py-5">
                <div className="flex flex-wrap items-center gap-3">
                  <CaseStatePill state={c.state} />
                  {listing && (
                    <Link
                      href={`/listings/${listing.slug}`}
                      className="text-sm text-brass hover:underline"
                    >
                      Open listing →
                    </Link>
                  )}
                </div>
                <VerificationTimeline caseItem={c} />
                <div className="mt-6 flex flex-wrap gap-2">
                  {(["in_review", "approved", "rejected", "appeal"] as const).map(
                    (next) => (
                      <button
                        key={next}
                        type="button"
                        className="border border-[var(--line-dark)] px-3 py-1.5 text-xs tracking-wide text-ink/70 hover:border-ink"
                        title="Demo — not persisted"
                      >
                        Mark {next.replace("_", " ")}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </article>
          );
        })}
        {queue.length === 0 && (
          <p className="py-16 text-center text-stone/50">No cases in this filter.</p>
        )}
      </div>
    </div>
  );
}
