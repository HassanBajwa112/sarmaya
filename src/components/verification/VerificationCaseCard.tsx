import Link from "next/link";
import type { VerificationCase } from "@/lib/data/verification";
import {
  KIND_LABELS,
  reviewStateLabel,
} from "@/lib/data/verification";

export function CaseStatePill({ state }: { state: VerificationCase["state"] }) {
  const tone =
    state === "approved"
      ? "text-brass border-brass/40 bg-brass/10"
      : state === "rejected"
        ? "text-ink/70 border-[var(--line-dark)] bg-stone-muted"
        : state === "appeal"
          ? "text-brass border-brass/30"
          : "text-muted border-[var(--line-dark)]";

  return (
    <span
      className={`inline-flex border px-2 py-0.5 text-[10px] tracking-widest uppercase ${tone}`}
    >
      {reviewStateLabel(state)}
    </span>
  );
}

export function VerificationTimeline({
  caseItem,
}: {
  caseItem: VerificationCase;
}) {
  return (
    <ol className="mt-4 space-y-3 border-l border-[var(--line-dark)] pl-4">
      {caseItem.timeline.map((e) => (
        <li key={e.id} className="relative">
          <span className="absolute -left-[1.3rem] top-1.5 h-2 w-2 rounded-full bg-brass" />
          <p className="text-sm font-medium text-ink">{e.label}</p>
          <p className="text-xs text-muted">
            {new Date(e.at).toLocaleString()} · {e.actor}
          </p>
          {e.detail && (
            <p className="mt-1 text-sm text-ink/65">{e.detail}</p>
          )}
        </li>
      ))}
    </ol>
  );
}

export function VerificationCaseCard({
  caseItem,
  listingTitle,
  href,
}: {
  caseItem: VerificationCase;
  listingTitle: string;
  href?: string;
}) {
  const body = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs tracking-widest text-muted uppercase">
            {KIND_LABELS[caseItem.kind]}
          </p>
          <p className="font-display mt-1 text-lg font-semibold text-ink">
            {listingTitle}
          </p>
          {caseItem.assignee && (
            <p className="mt-1 text-xs text-muted">Assignee · {caseItem.assignee}</p>
          )}
        </div>
        <CaseStatePill state={caseItem.state} />
      </div>
      {caseItem.rejectionReason && (
        <p className="mt-4 border-l-2 border-[var(--line-dark)] pl-3 text-sm text-ink/70">
          <span className="text-xs tracking-widest text-muted uppercase">
            Rejection reason
          </span>
          <br />
          {caseItem.rejectionReason}
        </p>
      )}
      {caseItem.appealNote && (
        <p className="mt-3 text-sm text-ink/70">
          <span className="text-xs tracking-widest text-brass uppercase">
            Appeal
          </span>
          <br />
          {caseItem.appealNote}
        </p>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block border border-[var(--line-dark)] bg-white p-5 transition hover:border-brass/40"
      >
        {body}
      </Link>
    );
  }

  return (
    <div className="border border-[var(--line-dark)] bg-white p-5">{body}</div>
  );
}
