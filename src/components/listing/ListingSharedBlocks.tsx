import Link from "next/link";
import type { Listing } from "@/lib/data/listings";
import {
  formatPkrCr,
  fundingProgress,
  investmentTermsLabel,
  verificationTier,
  verificationTierLabel,
} from "@/lib/data/listings";
import { VerificationBadge } from "@/components/VerificationBadge";

export function FundingSummary({ listing }: { listing: Listing }) {
  const progress = fundingProgress(listing);

  return (
    <div className="border border-[var(--line-dark)] bg-white p-6">
      <h3 className="font-display text-lg font-semibold">Funding</h3>
      <p className="font-display mt-4 text-3xl font-semibold text-ink">
        {formatPkrCr(listing.askAmountPkrCr)}
      </p>
      <p className="mt-1 text-sm text-muted">{investmentTermsLabel(listing)}</p>

      <div className="mt-6">
        <div className="flex justify-between text-xs text-muted">
          <span>Raised {formatPkrCr(listing.raisedPkrCr)}</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden bg-stone-muted">
          <div className="h-full bg-brass" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <dl className="mt-6 space-y-3 text-sm">
        <Row label="Model" value={labelModel(listing.investmentModel)} />
        <Row label="Expected ROI" value={listing.expectedRoi} />
        <Row label="Stage" value={listing.stage} />
        <Row label="Employees" value={String(listing.employees)} />
        <Row label="Trust score" value={String(listing.trustScore)} />
      </dl>
    </div>
  );
}

export function VerificationSummary({ listing }: { listing: Listing }) {
  const tier = verificationTier(listing.verification);

  return (
    <div className="border border-[var(--line-dark)] bg-white p-6">
      <h3 className="font-display text-lg font-semibold">Verification</h3>
      <p className="mt-2 text-sm text-brass">{verificationTierLabel(tier)}</p>
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
  );
}

export function DocumentsPanel({ listing }: { listing: Listing }) {
  return (
    <div className="border border-[var(--line-dark)] bg-white p-6">
      <h3 className="font-display text-lg font-semibold">Documents</h3>
      <p className="mt-2 text-sm text-muted">
        Sign in to request access. Files are not hosted on Sarmaya in Plan A.
      </p>
      <ul className="mt-5 space-y-3">
        {listing.documents.map((doc) => (
          <li
            key={doc.id}
            className="flex items-center justify-between gap-3 border-t border-[var(--line-dark)] pt-3 text-sm"
          >
            <span className="text-ink/80">{doc.title}</span>
            <Link
              href="/auth"
              className="shrink-0 text-xs tracking-wide text-brass uppercase hover:underline"
            >
              Unlock
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ContactNextStep() {
  return (
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
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-t border-[var(--line-dark)] pt-3">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}

function labelModel(model: Listing["investmentModel"]): string {
  if (model === "profit-share") return "Profit-share";
  if (model === "either") return "Equity or profit-share";
  return "Equity";
}
