import type { Listing, VerificationStatus, VerificationTier } from "./listing-types";

/** Format a Crore amount for display (e.g. 4.5 → "PKR 4.5 Cr", 0.9 → "PKR 90 L"). */
export function formatPkrCr(cr: number): string {
  if (cr < 1) {
    const lakh = Math.round(cr * 100);
    return `PKR ${lakh} L`;
  }
  const rounded = Number.isInteger(cr) ? String(cr) : cr.toFixed(1).replace(/\.0$/, "");
  return `PKR ${rounded} Cr`;
}

export function verificationTier(v: VerificationStatus): VerificationTier {
  const n = [v.identity, v.businessClaim, v.humanReviewed].filter(Boolean).length;
  if (n >= 3) return "full";
  if (n >= 1) return "partial";
  return "unverified";
}

export function verificationTierLabel(tier: VerificationTier): string {
  if (tier === "full") return "Fully verified";
  if (tier === "partial") return "Partially verified";
  return "Unverified";
}

export function fundingProgress(listing: Listing): number {
  if (listing.askAmountPkrCr <= 0) return 0;
  return Math.min(100, Math.round((listing.raisedPkrCr / listing.askAmountPkrCr) * 100));
}

export function investmentTermsLabel(listing: Listing): string {
  if (listing.investmentModel === "profit-share" && listing.profitSharePct != null) {
    return `${listing.profitSharePct}% profit-share`;
  }
  if (listing.equityPct != null) {
    return `${listing.equityPct}% equity`;
  }
  if (listing.investmentModel === "either") return "Equity or profit-share";
  return listing.investmentModel === "profit-share" ? "Profit-share" : "Equity";
}

export function businessAgeYears(listing: Listing, now = new Date().getFullYear()): number | null {
  if (!listing.foundedYear) return null;
  return Math.max(0, now - listing.foundedYear);
}
