import type { Listing } from "./listing-types";
import { derivedVerificationFlags } from "./verification";
import {
  computeTrustScore,
  type TrustScoreResult,
  type TrustSignals,
} from "@/lib/trust/compute-trust-score";

/** Extra signals not fully derived from verification cases (seeded). */
const SIGNAL_OVERRIDES: Partial<
  Record<
    string,
    Partial<TrustSignals> & { taxCompliance?: boolean; bankVerified?: boolean }
  >
> = {
  "lahore-precision-parts": {
    taxCompliance: true,
    bankVerified: true,
    previousDeals: 1,
    investorRating: 4.6,
    founderRating: 4.4,
    activityScore: 88,
  },
  "sindh-cold-chain": {
    taxCompliance: true,
    bankVerified: true,
    previousDeals: 0,
    investorRating: 4.2,
    founderRating: 4.5,
    activityScore: 80,
  },
  "karachi-freightlink": {
    taxCompliance: true,
    bankVerified: false,
    previousDeals: 0,
    investorRating: 4.0,
    founderRating: null,
    activityScore: 72,
  },
  clinicstack: {
    taxCompliance: false,
    bankVerified: false,
    previousDeals: 0,
    investorRating: null,
    founderRating: 4.1,
    activityScore: 70,
  },
  learnlocal: {
    taxCompliance: false,
    bankVerified: false,
    previousDeals: 0,
    investorRating: null,
    founderRating: null,
    activityScore: 65,
  },
  "solar-yard-faisalabad": {
    taxCompliance: true,
    bankVerified: true,
    previousDeals: 2,
    investorRating: 4.7,
    founderRating: 4.3,
    activityScore: 90,
  },
  "retail-roots-franchise": {
    taxCompliance: true,
    bankVerified: true,
    previousDeals: 0,
    investorRating: 3.9,
    founderRating: 4.0,
    activityScore: 68,
  },
  "agritech-sensors": {
    taxCompliance: true,
    bankVerified: true,
    previousDeals: 0,
    investorRating: 4.1,
    founderRating: null,
    activityScore: 74,
  },
  "medsupply-north": {
    taxCompliance: true,
    bankVerified: true,
    previousDeals: 1,
    investorRating: 4.3,
    founderRating: 4.2,
    activityScore: 77,
  },
  edufleet: {
    taxCompliance: true,
    bankVerified: true,
    previousDeals: 0,
    investorRating: 4.0,
    founderRating: 4.5,
    activityScore: 75,
  },
  "paystack-lite": {
    taxCompliance: true,
    bankVerified: true,
    previousDeals: 0,
    investorRating: 4.5,
    founderRating: 4.6,
    activityScore: 92,
  },
  "green-kiln": {
    taxCompliance: true,
    bankVerified: false,
    previousDeals: 0,
    investorRating: 3.8,
    founderRating: null,
    activityScore: 66,
  },
  "city-cycle-logistics": {
    taxCompliance: false,
    bankVerified: false,
    previousDeals: 0,
    investorRating: null,
    founderRating: null,
    activityScore: 60,
  },
  "hydro-microgrids": {
    taxCompliance: true,
    bankVerified: true,
    previousDeals: 0,
    investorRating: 4.4,
    founderRating: 4.8,
    activityScore: 85,
  },
  "franchise-pharmacy": {
    taxCompliance: true,
    bankVerified: true,
    previousDeals: 1,
    investorRating: 4.2,
    founderRating: 4.1,
    activityScore: 78,
  },
};

export function buildTrustSignals(listing: Listing): TrustSignals {
  const flags = derivedVerificationFlags(listing.slug);
  const o = SIGNAL_OVERRIDES[listing.slug] ?? {};

  // Fallback to listing.verification flags when no cases exist for slug
  const identityVerified = flags.identity || listing.verification.identity;
  const businessVerified = flags.businessClaim || listing.verification.businessClaim;
  const financialsVerified =
    flags.financialApproved ||
    (listing.verification.identity &&
      listing.verification.businessClaim &&
      listing.verification.humanReviewed);

  return {
    identityVerified,
    businessVerified,
    financialsVerified,
    taxCompliance: o.taxCompliance ?? financialsVerified,
    bankVerified: o.bankVerified ?? financialsVerified,
    previousDeals: o.previousDeals ?? 0,
    investorRating: o.investorRating ?? null,
    founderRating: o.founderRating ?? null,
    activityScore: o.activityScore ?? 50,
  };
}

export function getTrustScoreResult(listing: Listing): TrustScoreResult {
  return computeTrustScore(buildTrustSignals(listing));
}

/** Mutates trustScore on each listing from server-side engine. */
export function applyComputedTrustScores(items: Listing[]): Listing[] {
  for (const item of items) {
    item.trustScore = getTrustScoreResult(item).score;
  }
  return items;
}
