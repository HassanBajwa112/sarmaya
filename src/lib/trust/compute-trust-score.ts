export type TrustSignals = {
  identityVerified: boolean;
  businessVerified: boolean;
  financialsVerified: boolean;
  taxCompliance: boolean;
  bankVerified: boolean;
  previousDeals: number;
  investorRating: number | null; // 1–5
  founderRating: number | null; // 1–5
  activityScore: number; // 0–100
};

export type TrustBreakdownItem = {
  key: keyof TrustSignals | "previousDealsScore" | "investorReviews" | "founderReviews" | "activity";
  label: string;
  points: number;
  maxPoints: number;
  note: string;
};

export type TrustScoreResult = {
  score: number;
  breakdown: TrustBreakdownItem[];
};

const WEIGHTS = {
  identity: 15,
  business: 15,
  financials: 15,
  tax: 10,
  bank: 10,
  previousDeals: 10,
  investorReviews: 10,
  founderReviews: 5,
  activity: 10,
} as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

/** Server-side trust score — call from RSC / route handlers only. */
export function computeTrustScore(signals: TrustSignals): TrustScoreResult {
  const breakdown: TrustBreakdownItem[] = [];

  const bool = (
    key: TrustBreakdownItem["key"],
    label: string,
    on: boolean,
    max: number,
    noteOn: string,
    noteOff: string,
  ) => {
    breakdown.push({
      key,
      label,
      points: on ? max : 0,
      maxPoints: max,
      note: on ? noteOn : noteOff,
    });
  };

  bool(
    "identityVerified",
    "Identity verified",
    signals.identityVerified,
    WEIGHTS.identity,
    "CNIC + selfie approved",
    "Identity not approved",
  );
  bool(
    "businessVerified",
    "Business verified",
    signals.businessVerified,
    WEIGHTS.business,
    "Registration / NTN approved",
    "Business docs not approved",
  );
  bool(
    "financialsVerified",
    "Financials verified",
    signals.financialsVerified,
    WEIGHTS.financials,
    "Financial pack approved",
    "Financials not approved",
  );
  bool(
    "taxCompliance",
    "Tax compliance",
    signals.taxCompliance,
    WEIGHTS.tax,
    "Tax filings verified",
    "Tax compliance pending",
  );
  bool(
    "bankVerified",
    "Bank verification",
    signals.bankVerified,
    WEIGHTS.bank,
    "Bank statements verified",
    "Bank verification pending",
  );

  const dealsPts = clamp(
    Math.round((Math.min(signals.previousDeals, 3) / 3) * WEIGHTS.previousDeals),
    0,
    WEIGHTS.previousDeals,
  );
  breakdown.push({
    key: "previousDealsScore",
    label: "Previous deals",
    points: dealsPts,
    maxPoints: WEIGHTS.previousDeals,
    note:
      signals.previousDeals > 0
        ? `${signals.previousDeals} prior listing(s) on Sarmaya`
        : "No prior deals on platform",
  });

  const invPts =
    signals.investorRating == null
      ? 0
      : Math.round((clamp(signals.investorRating, 1, 5) / 5) * WEIGHTS.investorReviews);
  breakdown.push({
    key: "investorReviews",
    label: "Investor reviews",
    points: invPts,
    maxPoints: WEIGHTS.investorReviews,
    note:
      signals.investorRating == null
        ? "No investor reviews yet"
        : `Avg ${signals.investorRating.toFixed(1)} / 5`,
  });

  const foundPts =
    signals.founderRating == null
      ? 0
      : Math.round((clamp(signals.founderRating, 1, 5) / 5) * WEIGHTS.founderReviews);
  breakdown.push({
    key: "founderReviews",
    label: "Founder reviews",
    points: foundPts,
    maxPoints: WEIGHTS.founderReviews,
    note:
      signals.founderRating == null
        ? "No founder reviews yet"
        : `Avg ${signals.founderRating.toFixed(1)} / 5`,
  });

  const actPts = Math.round(
    (clamp(signals.activityScore, 0, 100) / 100) * WEIGHTS.activity,
  );
  breakdown.push({
    key: "activity",
    label: "Activity",
    points: actPts,
    maxPoints: WEIGHTS.activity,
    note: `Responsiveness / update recency · ${signals.activityScore}/100`,
  });

  const score = clamp(
    breakdown.reduce((sum, b) => sum + b.points, 0),
    0,
    100,
  );

  return { score, breakdown };
}
