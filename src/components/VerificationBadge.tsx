import type { VerificationStatus } from "@/lib/data/listings";
import { verificationScore } from "@/lib/data/listings";

export function VerificationBadge({
  verification,
  compact = false,
}: {
  verification: VerificationStatus;
  compact?: boolean;
}) {
  const score = verificationScore(verification);
  const label =
    score === 3 ? "Fully verified" : score === 2 ? "Partially verified" : "Identity verified";

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs tracking-wide text-brass">
        <span className="h-1.5 w-1.5 rounded-full bg-brass" aria-hidden />
        {label}
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Layer on={verification.identity} label="Identity" />
      <Layer on={verification.businessClaim} label="Business claim" />
      <Layer on={verification.humanReviewed} label="Human reviewed" />
    </div>
  );
}

function Layer({ on, label }: { on: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1.5 text-xs tracking-wide ${
        on
          ? "border-brass/40 bg-brass/10 text-brass-bright"
          : "border-stone/15 text-muted"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${on ? "bg-brass" : "bg-muted"}`}
        aria-hidden
      />
      {label}
    </span>
  );
}
